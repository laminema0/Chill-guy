// Chill Guy's conversation, step by step. No AI: every reply is written here and picked
// using what `understand()` found in the person's own words, so Chill Guy stays on topic.
//
// Flow: story → anger 0–10 → (breathe first if 7+) → "what did you tell yourself?" →
// four angles → re-rate → next step (save log, plan, let it go, talk to a human).
// Every message goes through the safety check first; crisis topics are never reframed.
import { checkSafety } from './safety';
import { readRating, understand, type Feeling, type Reading, type Situation, type Trap } from './understand';

export type Step =
  | 'story'
  | 'offTopic'
  | 'rate'
  | 'breathe'
  | 'thought'
  | 'angles'
  | 'rerate'
  | 'next'
  | 'done'
  | 'harmCheck'
  | 'crisis'
  | 'support';

export type Angle = 'honest' | 'aboutThem' | 'useful' | 'notOk';

export type Chip = {
  id: string;
  label: string;
  highlighted?: boolean;
  /** Screen to open when tapped. */
  href?: '/breathe' | '/plan' | '/specialists' | '/get-help';
  /** Opens the "Save this as a log?" dialog. */
  save?: boolean;
};

export type BotTurn = {
  messages: string[];
  chips: Chip[];
  /** Show the 0–10 slider under the messages. */
  askRating?: boolean;
  /** Show the red "Get help now" card. */
  helpCard?: boolean;
};

export type ChatState = {
  step: Step;
  story: string;
  reading?: Reading;
  firstRating?: number;
  secondRating?: number;
  angle?: Angle;
  /** Where to continue after the "do you mean it?" check, and what was said. */
  resume?: Step;
  pending?: string;
  askedForMore: boolean;
};

export type Input = { text?: string; chip?: string; rating?: number };

export const initialState: ChatState = { step: 'story', story: '', askedForMore: false };

export const openingTurn: BotTurn = {
  messages: ['Hey — tell me what happened. Your own words are perfect.'],
  chips: [],
};

// ---------- What Chill Guy says ----------

function reflect(r: Reading): string {
  const about = r.topic ? ` on ${r.topic}` : '';
  const lines: Record<Situation, string> = {
    criticism: `That sounds frustrating — ${r.person} commenting${about || ' on you'}.`,
    interrupted: 'Being interrupted when you’re focused is really annoying.',
    ignored: `Feeling ignored hurts${r.personNamed ? `, especially by ${r.person}` : ''}.`,
    unfair: 'It stings when something feels unfair.',
    blamed: 'Being blamed is hard — especially when it doesn’t feel deserved.',
    insulted: 'That sounds hurtful. Nobody likes being spoken to like that.',
    lied: 'Being lied to can really shake your trust.',
    waiting: 'Waiting when you’d planned your time is frustrating.',
    traffic: 'Moments like that on the road can spike anger fast.',
    mess: 'Living with that every day wears you down.',
    other: 'Thanks for telling me. It sounds like it really got to you.',
  };
  return lines[r.situation];
}

function feelingEcho(r: Reading): string | undefined {
  if (r.feelings.includes('embarrassed')) return 'Feeling embarrassed on top of angry is a heavy mix.';
  if (r.feelings.includes('dismissed')) return 'It sounds like it felt as if your work or your voice didn’t count.';
  if (r.feelings.includes('hurt')) return 'Sometimes anger is sitting right on top of hurt.';
  return undefined;
}

function trapLine(trap: Trap, r: Reading): string {
  switch (trap) {
    case 'mindReading':
      return 'I notice you’re guessing what they think. We can’t see inside their head — so let’s look at a few possibilities.';
    case 'always':
      return `You said “${r.alwaysWord ?? 'always'}”. Is it really every time — or does it feel that way right now?`;
    case 'labeling':
      return 'Calling them a name makes sense when you’re angry — but it makes the whole person the problem, instead of one moment.';
    case 'should':
      return 'There’s a “should” in there. It’s fair to want that — but people don’t always act how they should, and that gap is where the anger lives.';
    case 'catastrophe':
      return 'It feels huge right now. Will it still matter this much in a week?';
    case 'selfBlame':
      return 'You’re being hard on yourself. One moment doesn’t define you.';
  }
}

const angleLabels: Record<Situation, [string, string, string, string]> = {
  criticism: ['It’s just their taste or opinion', 'It’s more about them — their mood or style', 'There’s something useful in it', 'It really wasn’t OK'],
  interrupted: ['They got excited and didn’t notice', 'It’s how they talk with everyone', 'I could speak up earlier', 'It really wasn’t OK'],
  ignored: ['They were busy or distracted', 'Something’s going on with them', 'I could ask them directly', 'It really wasn’t OK'],
  unfair: ['They don’t see the full picture', 'It’s their pressure, not about me', 'I can calmly show what I did', 'It really wasn’t OK'],
  blamed: ['They were stressed and grabbed an answer', 'It says more about them', 'A small part might be mine to own', 'It really wasn’t OK'],
  insulted: ['They said it without thinking', 'It says more about them than me', 'Is there a real point hidden in it?', 'It really wasn’t OK'],
  lied: ['They were scared of how I’d react', 'It’s about their own problems', 'I can tell them how it affected me', 'It really wasn’t OK'],
  waiting: ['Something came up for them', 'It’s their habit — not about me', 'I can plan for it next time', 'It really wasn’t OK'],
  traffic: ['They might be having a bad day', 'A stranger — it’s not personal', 'I can leave a bit earlier', 'It really wasn’t OK'],
  mess: ['They don’t notice it like I do', 'It’s their habit, not a message to me', 'We could agree on a plan', 'It really wasn’t OK'],
  other: ['It wasn’t meant the way it felt', 'It’s more about them than me', 'There’s something I can learn', 'It really wasn’t OK'],
};

const angleIds: Angle[] = ['honest', 'aboutThem', 'useful', 'notOk'];

function angleChips(r: Reading): Chip[] {
  return angleLabels[r.situation].map((label, i) => ({ id: `angle:${angleIds[i]}`, label }));
}

// "When you ___, I felt ___. Next time, could you ___?"
const calmSentence: Record<Situation, [string, string] | undefined> = {
  criticism: ['you commented on {topic}', 'keep comments like that to yourself, or say them privately'],
  interrupted: ['you interrupted me', 'let me finish first'],
  ignored: ['I didn’t hear back from you', 'let me know when you’re busy'],
  unfair: ['that decision was made', 'talk it through with me first'],
  blamed: ['I was blamed for this', 'check with me before deciding whose fault it is'],
  insulted: ['you spoke to me like that', 'talk to me with respect, even when you’re upset'],
  lied: ['you didn’t tell me the truth', 'be honest with me, even when it’s hard'],
  waiting: ['you were late', 'text me if you’re running late'],
  traffic: undefined,
  mess: ['things were left like that', 'agree with me on who does what'],
  other: ['that happened', 'talk to me about it'],
};

const feelingWord: Partial<Record<Feeling, string>> = {
  hurt: 'hurt',
  embarrassed: 'embarrassed',
  dismissed: 'dismissed',
  stressed: 'stressed',
};

function angleReply(angle: Angle, r: Reading): string[] {
  switch (angle) {
    case 'honest':
      return ['That’s a generous reading. If it was just an honest, clumsy moment, it doesn’t have to cost you this much energy.'];
    case 'aboutThem':
      return ['Often people’s words say more about their day than about us. It doesn’t make it pleasant — but it makes it less personal.'];
    case 'useful':
      return ['That takes guts. Keeping the useful part and leaving the rest is a real skill.'];
    case 'notOk': {
      const lines = ['Then your anger is pointing at something real. The goal isn’t to swallow it — it’s to respond in a way you’re proud of.'];
      const sentence = calmSentence[r.situation];
      if (sentence) {
        const [what, ask] = sentence;
        const feeling = r.feelings.map((f) => feelingWord[f]).find(Boolean) ?? 'frustrated';
        lines.push(
          `When you’ve cooled down, you could try: “When ${what.replace('{topic}', r.topic?.replace('your', 'my') ?? 'that')}, I felt ${feeling}. Next time, could you ${ask}?”`,
        );
      } else {
        lines.push('You can’t change how strangers drive — but you can get home safe and calm. That part is yours.');
      }
      if (r.traps.includes('always')) {
        lines.push('If it keeps happening, it may be worth talking to someone you trust — or a specialist.');
      }
      return lines;
    }
  }
}

function matchAngle(text: string): Angle | undefined {
  const t = text.toLowerCase();
  if (/\b(not ok|wasn'?t ok|not okay|out of line|unacceptable|crossed a line|disrespect)/.test(t)) return 'notOk';
  if (/\b(maybe (they|she|he)('?s| is| are)? right|a point|learn|useful|my part|fair enough|i could|next time i)\b/.test(t)) return 'useful';
  if (/\b(their (problem|issue|mood|day|stuff)|about them|like that with everyone|not personal|their habit|always like that)\b/.test(t)) return 'aboutThem';
  if (/\b(taste|opinion|honest|didn'?t mean|without thinking|busy|distracted|excited|bad day|by accident)\b/.test(t)) return 'honest';
  return undefined;
}

// ---------- Building each turn ----------

const ratingQuestion = (again: boolean) =>
  again ? 'Check in with yourself — how strong is it now, from 0 to 10?' : 'How strong is the anger right now, from 0 to 10?';

function askRating(again = false): BotTurn {
  return { messages: [ratingQuestion(again)], chips: [], askRating: true };
}

function thoughtTurn(prefix: string[]): BotTurn {
  return {
    messages: [...prefix, 'What went through your mind when it happened? What did you tell yourself it meant?'],
    chips: [{ id: 'dontKnow', label: 'I don’t know' }],
  };
}

function anglesTurn(state: ChatState, prefix: string[]): BotTurn {
  return {
    messages: [...prefix, 'Let’s look at it from a few angles. Which one feels closest?'],
    chips: angleChips(state.reading!),
  };
}

const nextStepChips: Chip[] = [
  { id: 'save', label: 'Save this as a log', highlighted: true, save: true },
  { id: 'plan', label: 'Make an If-Then plan', href: '/plan' },
  { id: 'letGo', label: 'Let it go' },
  { id: 'human', label: 'Talk to a human', href: '/specialists' },
];

const helpChips: Chip[] = [
  { id: 'getHelp', label: 'Get help now', highlighted: true, href: '/get-help' },
  { id: 'human', label: 'Talk to a specialist', href: '/specialists' },
];

function safetyTurn(flag: ReturnType<typeof checkSafety>, state: ChatState, text: string): [ChatState, BotTurn] | undefined {
  switch (flag) {
    case 'selfHarm':
      return [
        { ...state, step: 'crisis' },
        {
          messages: [
            'I’m really glad you told me. This is bigger than what I can help with — and you deserve a real person right now.',
            'Please reach out to one of these. They’re free, and someone answers day and night.',
          ],
          chips: helpChips,
          helpCard: true,
        },
      ];
    case 'beingHarmed':
      return [
        { ...state, step: 'support' },
        {
          messages: [
            'That’s not OK — and it’s not something to “see from another angle”. Your safety matters most.',
            'If you’re in danger, please call for help now. You can also talk it through with a specialist, or save this so you have a record.',
          ],
          chips: [...helpChips, { id: 'save', label: 'Save this as a log', save: true }],
          helpCard: true,
        },
      ];
    case 'harmOthers':
      return [
        { ...state, step: 'harmCheck', resume: state.step, pending: text },
        {
          messages: ['When you say that — do you mean you might actually hurt someone, or is it the anger talking?'],
          chips: [
            { id: 'angerTalking', label: 'It’s the anger talking' },
            { id: 'worried', label: 'I’m worried I might' },
          ],
        },
      ];
    default:
      return undefined;
  }
}

function startStory(state: ChatState, text: string): [ChatState, BotTurn] {
  const story = state.story ? `${state.story} ${text}` : text;
  const reading = understand(story);
  const latest = understand(text);

  if (latest.isGreeting && !state.story) {
    return [state, { messages: ['Hey! Whenever you’re ready — what happened?'], chips: [] }];
  }
  if (latest.isOffTopic) {
    return [
      { ...state, step: 'offTopic' },
      {
        messages: [
          'I’m only good at one thing: helping with moments that made you angry or upset.',
          'Did something like that happen?',
        ],
        chips: [
          { id: 'yesHappened', label: 'Yes, something happened' },
          { id: 'notNow', label: 'Not right now' },
        ],
      },
    ];
  }
  // Too little to work with: ask once for who and what.
  if (!state.askedForMore && !reading.personNamed && reading.situation === 'other' && reading.wordCount < 8) {
    return [
      { ...state, story, askedForMore: true },
      { messages: ['Tell me a bit more — who was it, and what did they say or do?'], chips: [] },
    ];
  }

  const messages = [reflect(reading)];
  const echo = feelingEcho(reading);
  if (echo) messages.push(echo);
  messages.push(ratingQuestion(false));
  return [{ ...state, story, reading, step: 'rate' }, { messages, chips: [], askRating: true }];
}

function afterRating(state: ChatState, rating: number): [ChatState, BotTurn] {
  const next = { ...state, firstRating: rating };
  if (rating >= 7) {
    return [
      { ...next, step: 'breathe' },
      {
        messages: [
          `${rating} out of 10 — that’s a lot. When anger is this high, your body is in alarm mode and thinking it through is hard.`,
          'Want to breathe for a minute first?',
        ],
        chips: [
          { id: 'breathe', label: 'Breathe first', highlighted: true, href: '/breathe' },
          { id: 'okToTalk', label: 'I’m OK to talk' },
        ],
      },
    ];
  }
  const ack = rating <= 2 ? `${rating} out of 10 — you’re pretty calm. Good moment to look at it.` : `Okay, ${rating} out of 10.`;
  return [{ ...next, step: 'thought' }, thoughtTurn([ack])];
}

function finishRerate(state: ChatState, rating: number): [ChatState, BotTurn] {
  const first = state.firstRating ?? rating;
  const drop = first - rating;
  const messages: string[] = [];
  if (drop >= 2) messages.push(`From ${first} to ${rating} — that’s you cooling down by thinking it through. Nice work.`);
  else if (drop === 1) messages.push(`A little lower — ${first} to ${rating}. Every point counts.`);
  else messages.push(`Still ${rating}. That’s okay — some things need more time. Your body might need to catch up.`);
  messages.push('What would you like to do with this?');
  const chips = rating >= 7 ? [{ id: 'breathe', label: 'Breathe first', href: '/breathe' } as Chip, ...nextStepChips] : nextStepChips;
  return [{ ...state, secondRating: rating, step: 'next' }, { messages, chips }];
}

// ---------- The main function ----------

export function respond(state: ChatState, input: Input): [ChatState, BotTurn] {
  const text = input.text?.trim() ?? '';

  // 1. Safety always comes first, at every step.
  if (text) {
    const safety = safetyTurn(checkSafety(text), state, text);
    if (safety) return safety;
  }

  // 2. Buttons and messages that mean the same thing at any step.
  if (input.chip === 'restart' || /^(start over|new one|restart)$/i.test(text)) {
    return [{ ...initialState }, { messages: ['Sure. What happened this time?'], chips: [] }];
  }
  if (/\b(talk to a (human|person|therapist|specialist)|real person|therapist)\b/i.test(text)) {
    return [state, { messages: ['Good idea. A specialist can go deeper than I can.'], chips: nextStepChips.filter((c) => c.id === 'human') }];
  }

  switch (state.step) {
    case 'story':
      if (!text) return [state, openingTurn];
      return startStory(state, text);

    case 'offTopic':
      if (input.chip === 'yesHappened' || /^(yes|yeah|yep|ja|sure)\b/i.test(text)) return [{ ...state, step: 'story' }, { messages: ['I’m listening. What happened?'], chips: [] }];
      if (input.chip === 'notNow' || /^(no|nope|nein|not now)\b/i.test(text)) return [{ ...initialState, step: 'done' }, { messages: ['Good to hear. I’m here whenever you need me.'], chips: [{ id: 'restart', label: 'Actually, something happened' }] }];
      return startStory({ ...state, step: 'story' }, text);

    case 'rate': {
      const rating = input.rating ?? readRating(text);
      if (rating === undefined) {
        return [state, { messages: ['Just a number from 0 to 10 is enough — or use the slider.'], chips: [], askRating: true }];
      }
      return afterRating(state, rating);
    }

    case 'breathe':
      if (input.chip === 'breathe') {
        return [state, { messages: ['Take your time. I’ll be right here.'], chips: [{ id: 'back', label: 'I’m back — let’s talk', highlighted: true }] }];
      }
      return [{ ...state, step: 'thought' }, thoughtTurn(input.chip === 'back' ? ['Welcome back.'] : ['Okay, let’s go gently.'])];

    case 'thought': {
      if (input.chip === 'dontKnow' || /^(i don'?t know|idk|no idea|dunno)\W*$/i.test(text)) {
        return [{ ...state, step: 'angles' }, anglesTurn(state, ['That’s okay. Sometimes it’s just a feeling in the body.'])];
      }
      const thought = understand(text);
      const reading: Reading = {
        ...state.reading!,
        traps: [...new Set([...thought.traps, ...state.reading!.traps])],
        alwaysWord: thought.alwaysWord ?? state.reading!.alwaysWord,
        feelings: [...new Set([...state.reading!.feelings, ...thought.feelings])],
      };
      const next = { ...state, reading, story: `${state.story} ${text}`, step: 'angles' as Step };
      const prefix = thought.traps.length > 0 ? [trapLine(thought.traps[0], reading)] : ['Thanks — putting it into words already helps.'];
      return [next, anglesTurn(next, prefix)];
    }

    case 'angles': {
      const angle = (input.chip?.startsWith('angle:') ? (input.chip.slice(6) as Angle) : undefined) ?? matchAngle(text);
      if (!angle) {
        return [
          state,
          { messages: ['More than one can be true at the same time. Tap the one that feels closest — or tell me more.'], chips: angleChips(state.reading!) },
        ];
      }
      const turn = askRating(true);
      return [{ ...state, angle, step: 'rerate' }, { ...turn, messages: [...angleReply(angle, state.reading!), ...turn.messages] }];
    }

    case 'rerate': {
      const rating = input.rating ?? readRating(text);
      if (rating === undefined) {
        return [state, { messages: ['A number from 0 to 10 is enough — or use the slider.'], chips: [], askRating: true }];
      }
      return finishRerate(state, rating);
    }

    case 'next':
      if (input.chip === 'letGo') {
        return [
          { ...state, step: 'done' },
          {
            messages: ['Good call. You looked at it, felt it, and chose your next step. That’s the whole skill.'],
            chips: [{ id: 'restart', label: 'Talk about something else' }],
          },
        ];
      }
      if (input.chip === 'breathe') {
        return [state, { messages: ['Take your time. I’ll be right here.'], chips: nextStepChips }];
      }
      if (input.chip) return [state, { messages: [], chips: nextStepChips }];
      // Typing something new starts a new story.
      return startStory({ ...initialState }, text);

    case 'done':
      if (!text) return [state, { messages: [], chips: [{ id: 'restart', label: 'Talk about something else' }] }];
      return startStory({ ...initialState }, text);

    case 'harmCheck':
      if (input.chip === 'worried' || /\b(yes|i might|worried|scared i)\b/i.test(text)) {
        return [
          { ...state, step: 'crisis' },
          {
            messages: [
              'Thank you for being honest — that took courage. Right now, put some distance between you and the other person, if you can.',
              'Then please talk to someone. They’re free and answer day and night.',
            ],
            chips: helpChips,
            helpCard: true,
          },
        ];
      }
      if (input.chip === 'angerTalking' || /\b(no|just|anger|expression|didn'?t mean)\b/i.test(text)) {
        const resume = state.resume ?? 'story';
        const back = { ...state, step: resume };
        const line = 'Got it. Anger can make words come out big — that’s okay here.';
        if (resume === 'story' || !state.reading) {
          // Use what they already told us, instead of asking again.
          const [storyState, storyTurn] = startStory({ ...back, step: 'story' }, state.pending ?? '');
          return [storyState, { ...storyTurn, messages: [line, ...storyTurn.messages] }];
        }
        if (resume === 'rate' || resume === 'rerate') return [back, { messages: [line, ratingQuestion(resume === 'rerate')], chips: [], askRating: true }];
        if (resume === 'angles') return [back, anglesTurn(back, [line])];
        return [{ ...back, step: 'thought' }, thoughtTurn([line])];
      }
      return [state, { messages: ['Just so I understand — are you worried you might actually hurt someone?'], chips: [
        { id: 'angerTalking', label: 'It’s the anger talking' },
        { id: 'worried', label: 'I’m worried I might' },
      ] }];

    case 'crisis':
    case 'support':
      return [
        state,
        {
          messages: ['I’m still here. Please reach out to one of these first — then we can keep talking.'],
          chips: helpChips,
          helpCard: true,
        },
      ];
  }
}

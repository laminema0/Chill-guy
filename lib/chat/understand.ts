// Reads a message and pulls out what Chill Guy needs to answer on topic:
// who was involved, what kind of situation it was, what it was about, feelings, and thinking traps.
// No AI: just word lists. Easy to extend — add words to the lists below.

export type Situation =
  | 'criticism'
  | 'interrupted'
  | 'ignored'
  | 'unfair'
  | 'blamed'
  | 'insulted'
  | 'lied'
  | 'waiting'
  | 'traffic'
  | 'mess'
  | 'other';

export type Feeling = 'angry' | 'frustrated' | 'hurt' | 'embarrassed' | 'dismissed' | 'stressed';

export type Trap = 'mindReading' | 'always' | 'labeling' | 'should' | 'catastrophe' | 'selfBlame';

export type Reading = {
  /** "your colleague", "your boss", or "they" when nobody is named. */
  person: string;
  personNamed: boolean;
  situation: Situation;
  /** What it was about, e.g. "your shoes". */
  topic?: string;
  feelings: Feeling[];
  traps: Trap[];
  /** The exact "always / never / everyone" word, to quote it back. */
  alwaysWord?: string;
  /** A rough guess at how strong the anger is, from the words used. */
  intensityHint?: number;
  /** Is this about something that happened (on topic for Chill Guy)? */
  isEvent: boolean;
  isGreeting: boolean;
  isOffTopic: boolean;
  wordCount: number;
};

const people: [RegExp, string][] = [
  [/\b(colleague|co-?worker|workmate|teammate)s?\b/, 'your colleague'],
  [/\b(boss|manager|supervisor|team ?lead|chef)\b/, 'your boss'],
  [/\b(client|customer)s?\b/, 'the client'],
  [/\b(teacher|professor|tutor)\b/, 'your teacher'],
  [/\b(boyfriend|girlfriend|husband|wife|partner|fiance|fiancee)\b/, 'your $1'],
  [/\b(mom|mum|mother|dad|father|parents?|brother|sister|son|daughter|kids?|children|family)\b/, 'your $1'],
  [/\b(friend|best friend|roommate|flatmate|neighbou?r)s?\b/, 'your $1'],
  [/\b(driver|stranger|cyclist|cashier|waiter|someone|somebody|a guy|a woman|a man)\b/, 'that person'],
];

// First match wins, so the more specific situations come first.
const situations: [Situation, RegExp][] = [
  ['traffic', /\b(traffic|driver|drove|honk(ed)?|road|parking|cyclist|tram|train|bus|queue|line at|cut in)\b/],
  ['lied', /\b(lied|lying|lie to me|cheated|betray(ed)?|broke (a|the|their|his|her) promise|went behind my back)\b/],
  ['blamed', /\b(blam(e|ed|ing)|accus(e|ed|ing)|said it was my fault|pointed at me)\b/],
  [
    'insulted',
    /\b(insult(ed)?|called me|yell(ed)?|shout(ed)?|scream(ed)?|swore|rude|disrespect(ed|ful)?|humiliat(ed|ing)|mock(ed)?|made fun|laughed at me|sarcastic)\b/,
  ],
  ['unfair', /\b(unfair|not fair|took (the )?credit|promotion|favou?rite|double standard|overlooked|passed over)\b/],
  ['interrupted', /\b(interrupt(ed|ing|s)?|cut me off|talk(ed|s)? over me|kept talking|didn'?t let me finish)\b/],
  [
    'ignored',
    /\b(ignor(e|ed|ing)|didn'?t (reply|answer|listen|call|text)|no reply|left me on read|not listening|excluded|left out|didn'?t invite|forgot (me|my))\b/,
  ],
  [
    'criticism',
    /\b(criticis|criticiz|comment(ed|s)? on|judg(ed|ing)|feedback|complain(ed)? about|(don'?t|doesn'?t|didn'?t) like my|said my|ugly|weird|wrong with my|not good enough)/,
  ],
  ['waiting', /\b(late|waited|waiting|kept me waiting|delay(ed)?|cancel(l)?ed|no-?show|stood me up)\b/],
  ['mess', /\b(mess|messy|dishes|didn'?t clean|chores|laundry|noise|noisy|loud music)\b/],
];

const feelings: [Feeling, RegExp][] = [
  ['angry', /\b(angry|mad|furious|pissed|rage|raging|livid|fuming)\b/],
  ['frustrated', /\b(annoyed|irritated|frustrat(ed|ing)|fed up)\b/],
  ['hurt', /\b(hurt|sad|upset|disappointed)\b/],
  ['embarrassed', /\b(embarrass(ed|ing)|humiliat(ed|ing)|ashamed|stupid in front)\b/],
  ['dismissed', /\b(dismissed|disrespected|invisible|unheard|not taken seriously|ignored|useless comments)\b/],
  ['stressed', /\b(stress(ed)?|overwhelmed|exhausted|tired)\b/],
];

const traps: [Trap, RegExp][] = [
  [
    'mindReading',
    /\b((he|she|they|everyone|people) (think|thinks|thought|believe|believes)|(on purpose|deliberately)|just wants? to|trying to (make|annoy|hurt|get))\b/,
  ],
  ['always', /\b(always|never|every time|everyone|nobody|no one|all the time)\b/],
  ['selfBlame', /\b(my fault|because of me|i'?m (so )?(stupid|useless|a failure|worthless|an idiot)|i always mess)\b/],
  ['labeling', /\b(idiot|stupid|moron|jerk|useless|loser|incompetent|dumb|asshole|clown)\b/],
  ['should', /\b(should(n'?t)?|supposed to|has to|have to|must(n'?t)?|ought to)\b/],
  ['catastrophe', /\b(ruined|disaster|worst|terrible|unbearable|can'?t stand|never recover|everything is)\b/],
];

// Words after "my" that are not the topic ("my colleague", "my own", ...).
const notTopic =
  /^(self|own|fault|colleague|coworker|co-worker|boss|manager|friend|mom|mum|mother|dad|father|brother|sister|partner|wife|husband|boyfriend|girlfriend|kids?|son|daughter|team|family|neighbou?r|roommate|flatmate|god|head|mind|life|day)$/;

const greeting = /^(hi|hey|hello|hallo|yo|hiya|good (morning|evening|afternoon))\b[\s!.?]*$/;
const offTopic =
  /\b(weather|recipe|cook|football|movie|song|joke|code|program|math|homework|capital of|who are you|what are you|are you (an? )?(ai|bot|robot|human)|bitcoin|stock)\b/;
const eventVerb =
  /\b(said|told|did|made|happened|called|asked|got|was|were|kept|started|left|took|gave|yelled|texted|wrote|looked|walked)\b/;

export function understand(message: string): Reading {
  const text = message.toLowerCase().replace(/[’`]/g, "'");
  const words = text.split(/\s+/).filter(Boolean);

  let person = 'they';
  let personNamed = false;
  for (const [pattern, label] of people) {
    const found = text.match(pattern);
    if (found) {
      person = label.replace('$1', found[1] ?? '');
      personNamed = true;
      break;
    }
  }

  const situation = situations.find(([, pattern]) => pattern.test(text))?.[0] ?? 'other';

  let topic: string | undefined;
  for (const found of text.matchAll(/\bmy ([a-z]+)/g)) {
    if (!notTopic.test(found[1])) {
      topic = `your ${found[1]}`;
      break;
    }
  }

  const foundFeelings = feelings.filter(([, p]) => p.test(text)).map(([f]) => f);
  const foundTraps = traps.filter(([, p]) => p.test(text)).map(([t]) => t);
  const alwaysWord = text.match(traps.find(([t]) => t === 'always')![1])?.[0];

  let intensityHint: number | undefined;
  const shouting = message.split(/\s+/).filter((w) => w.length > 2 && w === w.toUpperCase() && /[A-Z]/.test(w)).length;
  if (/\b(furious|rage|raging|livid|fuming|so angry|so mad)\b/.test(text) || /!!/.test(text) || shouting >= 2) {
    intensityHint = 8;
  } else if (/\b(annoyed|irritated|a bit|slightly)\b/.test(text)) {
    intensityHint = 4;
  }

  const isGreeting = greeting.test(text.trim());
  const isEvent =
    !isGreeting && (personNamed || situation !== 'other' || foundFeelings.length > 0 || eventVerb.test(text));
  const isOffTopic = !isEvent && offTopic.test(text);

  return {
    person,
    personNamed,
    situation,
    topic,
    feelings: foundFeelings,
    traps: foundTraps,
    alwaysWord,
    intensityHint,
    isEvent,
    isGreeting,
    isOffTopic,
    wordCount: words.length,
  };
}

/** Read a 0–10 number from a typed answer ("maybe a 7", "8/10"). */
export function readRating(message: string): number | undefined {
  const found = message.match(/\b(10|[0-9])\b/);
  return found ? Number(found[1]) : undefined;
}

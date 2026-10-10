// Chill Guy chat, from Figma "7 · Chill Guy chat" and "8 · Chat — save as log".
// AI replies use our Cloudflare backend. Emergency support still works locally.
import { useEffect, useRef, useState } from 'react';
import { Image, KeyboardAvoidingView, Linking, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BackButton, HelpPill, IntensitySlider } from '../components';
import { MicIcon, PhoneIcon } from '../components/icons/MoreIcons';
import { initialState, openingTurn, respond, type BotTurn, type ChatState, type Chip, type Input } from '../lib/chat/engine';
import { askChillGuy, type ChatMessage } from '../lib/chat/ai';
import { checkSafety } from '../lib/chat/safety';
import { color, layout, radius, size, space, text } from '../theme/tokens';

type Item = { kind: 'guy' | 'me'; text: string } | { kind: 'help' };

// The AI notice is accepted once per app session, so coming back to the chat does not ask again.
let consentedThisSession = false;

const consentPoints = [
  'I am an AI, not a therapist. I can help you slow down and think things through, but I can be wrong.',
  'To answer, your messages and my recent replies go through our server at Cloudflare to Groq. We do not save them. Please leave out names and private details.',
  'If you might hurt yourself or someone else, tap Help or call 112.',
];

const aiChips: Chip[] = [
  { id: 'breathe', label: 'Take a breathing break', href: '/breathe' },
  { id: 'plan', label: 'Make an If-Then plan', href: '/plan' },
  { id: 'human', label: 'Talk to a human', href: '/specialists' },
];

const toItems = (turn: BotTurn): Item[] => [
  ...turn.messages.map((t): Item => ({ kind: 'guy', text: t })),
  ...(turn.helpCard ? [{ kind: 'help' } as Item] : []),
];

export default function ChatScreen() {
  const insets = useSafeAreaInsets();
  const scroll = useRef<ScrollView>(null);
  const state = useRef<ChatState>(initialState);
  const [items, setItems] = useState<Item[]>(toItems(openingTurn));
  const [turn, setTurn] = useState<BotTurn>(openingTurn);
  const [typing, setTyping] = useState(false);
  const [rating, setRating] = useState(5);
  const [draft, setDraft] = useState('');
  const [consented, setConsented] = useState(consentedThisSession);
  const accept = () => { consentedThisSession = true; setConsented(true); };
  const [error, setError] = useState<string | null>(null);
  const history = useRef<ChatMessage[]>([]);
  const pending = useRef(false);
  const request = useRef<AbortController | null>(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; request.current?.abort(); };
  }, []);

  const scrollDown = () => setTimeout(() => scroll.current?.scrollToEnd({ animated: true }), 60);

  const talk = async (input: Input, shown: string) => {
    if (pending.current || !consented) return;
    pending.current = true;
    setError(null);
    setItems((list) => [...list, { kind: 'me', text: shown }]);
    setTurn({ messages: [], chips: [] });
    setTyping(true);
    scrollDown();
    try {
      const safetyFlow = ['harmCheck', 'crisis', 'support'].includes(state.current.step);
      if (checkSafety(shown) || safetyFlow) {
        const [next, reply] = respond(state.current, input);
        state.current = next;
        // Do not forward locally detected crisis messages or their history to Groq.
        history.current = [];
        setItems((list) => [...list, ...toItems(reply)]);
        setTurn({ ...reply, chips: reply.chips.filter((chip) => !chip.save) });
      } else {
        const messages: ChatMessage[] = [...history.current, { role: 'user', content: shown }];
        request.current = new AbortController();
        const result = await askChillGuy(messages, request.current);
        if (!mounted.current) return;
        history.current = result.help ? [] : [...messages, { role: 'assistant' as const, content: result.reply }].slice(-10);
        const reply: BotTurn = {
          messages: [result.reply],
          chips: result.help ? [{ id: 'getHelp', label: 'Get help now', href: '/get-help', highlighted: true }] : aiChips,
          helpCard: result.help,
        };
        if (result.help) state.current = { ...initialState, step: 'crisis' };
        setItems((list) => [...list, ...toItems(reply)]);
        setTurn(reply);
      }
    } catch (cause) {
      if (!mounted.current) return;
      setError(cause instanceof Error ? cause.message : 'Could not connect. Please try again.');
      // Restore the unsent message for an explicit retry; never substitute a scripted answer.
      setDraft(shown);
      setItems((list) => list.slice(0, -1));
      setTurn({ messages: [], chips: aiChips });
    } finally {
      pending.current = false;
      request.current = null;
      if (mounted.current) { setTyping(false); scrollDown(); }
    }
  };

  const send = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed || pending.current || !consented) return;
    setDraft('');
    talk({ text: trimmed }, trimmed);
  };

  const pressChip = (chip: Chip) => {
    if (chip.href) { router.push(chip.href); return; }
    talk({ chip: chip.id }, chip.label);
  };

  return (
    <KeyboardAvoidingView style={styles.fill} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 14 }]}>
        <BackButton />
        <Image source={require('../assets/images/chill-guy-mascot.png')} style={styles.headerAvatar} />
        <View>
          <Text style={styles.headerName}>Chill Guy</Text>
          <Text style={styles.headerStatus}>AI, not a therapist</Text>
        </View>
        <View style={styles.headerSpacer} />
        <HelpPill />
      </View>

      <ScrollView ref={scroll} contentContainerStyle={styles.messages} onContentSizeChange={scrollDown}>
        <Text style={styles.disclaimer}>
          AI replies can be wrong and do not replace a therapist. In an emergency, tap Help.{' '}
          <Text style={styles.disclaimerLink} accessibilityRole="link" onPress={() => router.push('/how-it-works')}>
            How Chill Guy works
          </Text>
        </Text>
        {!consented ? (
          <View style={styles.consent}>
            <Text style={styles.consentTitle}>Before we start</Text>
            {consentPoints.map((point) => (
              <View key={point} style={styles.consentLine}>
                <View style={styles.consentBullet} />
                <Text style={styles.consentText}>{point}</Text>
              </View>
            ))}
            <Text style={styles.consentText}>This chat is kept only while it is open and is not saved as a log.</Text>
            <View style={styles.consentButtons}>
              <QuickReply label="I understand, start chat" highlighted onPress={accept} />
              <QuickReply label="How Chill Guy works" onPress={() => router.push('/how-it-works')} />
              <QuickReply label="Use breathing instead" onPress={() => router.push('/breathe')} />
            </View>
          </View>
        ) : null}
        {error ? <Text accessibilityRole="alert" style={styles.disclaimer}>{error}</Text> : null}
        {items.map((item, i) =>
          item.kind === 'help' ? (
            <HelpCard key={i} />
          ) : (
            <View key={i} style={item.kind === 'me' ? styles.me : styles.guy}>
              <Text style={[styles.messageText, item.kind === 'me' && { color: color.text.onBrand }]}>{item.text}</Text>
            </View>
          ),
        )}
        {typing ? (
          <View style={[styles.guy, styles.typing]}>
            <Text style={styles.messageText}>…</Text>
          </View>
        ) : null}

        {!typing && turn.askRating ? (
          <View style={styles.ratingCard}>
            <IntensitySlider value={rating} onChange={setRating} />
            <Pressable style={styles.ratingButton} onPress={() => talk({ rating }, `${rating} / 10`)}>
              <Text style={styles.ratingButtonLabel}>That’s it — {rating}</Text>
            </Pressable>
          </View>
        ) : null}

        {!typing && turn.chips.length > 0 ? (
          <View style={styles.quickReplies}>
            {turn.chips.map((chip) => (
              <QuickReply key={chip.id} label={chip.label} highlighted={chip.highlighted} onPress={() => pressChip(chip)} />
            ))}
          </View>
        ) : null}
      </ScrollView>

      {/* Message box */}
      <View style={[styles.composer, { marginBottom: insets.bottom + layout.navBottomGap }]}>
        <TextInput
          editable={consented && !typing}
          maxLength={2000}
          value={draft}
          onChangeText={setDraft}
          placeholder="Type how you feel…"
          placeholderTextColor={color.extra.placeholder}
          style={styles.composerInput}
          onSubmitEditing={() => send(draft)}
          returnKeyType="send"
        />
        <Pressable disabled={!consented || typing} style={styles.micButton} onPress={() => send(draft)} accessibilityLabel="Send">
          <MicIcon />
        </Pressable>
      </View>

    </KeyboardAvoidingView>
  );
}

// Red card shown when the safety check finds something. Same content as "Get help now".
function HelpCard() {
  return (
    <View style={styles.helpCard}>
      <Text style={styles.helpTitle}>You deserve support right now</Text>
      <Pressable style={styles.helpCall} onPress={() => Linking.openURL('tel:112')}>
        <PhoneIcon color={color.text.onBrand} size={16} />
        <Text style={styles.helpCallLabel}>Emergency · 112</Text>
      </Pressable>
      <Pressable style={styles.helpRow} onPress={() => Linking.openURL('tel:08001110111')}>
        <PhoneIcon color={color.feedback.danger} size={14} />
        <Text style={styles.helpRowLabel}>TelefonSeelsorge · 0800 111 0 111</Text>
      </Pressable>
    </View>
  );
}

function QuickReply({ label, highlighted = false, onPress }: { label: string; highlighted?: boolean; onPress: () => void }) {
  return (
    <Pressable style={[styles.quickReply, highlighted && styles.quickReplyHighlighted]} onPress={onPress}>
      <Text style={[styles.quickReplyLabel, highlighted && { color: color.brand.primary }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: color.surface.page,
  },
  headerSpacer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    paddingBottom: 14,
    backgroundColor: color.surface.default,
  },
  headerAvatar: {
    width: 32,
    height: 36,
  },
  headerName: {
    ...text.personName,
    color: color.text.heading,
  },
  headerStatus: {
    ...text.tiny,
    color: color.brand.hover,
  },
  messages: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: space[5],
    gap: 10,
  },
  guy: {
    alignSelf: 'flex-start',
    width: 280,
    maxWidth: '78%',
    paddingHorizontal: space[4],
    paddingVertical: space[3],
    borderRadius: radius.md,
    borderTopLeftRadius: 4,
    backgroundColor: color.surface.default,
  },
  me: {
    alignSelf: 'flex-end',
    width: 280,
    maxWidth: '78%',
    paddingHorizontal: space[4],
    paddingVertical: space[3],
    borderRadius: radius.md,
    borderTopRightRadius: 4,
    backgroundColor: color.brand.hover,
    marginVertical: 10,
  },
  messageText: {
    ...text.chatText,
    color: color.text.body,
  },
  disclaimer: {
    ...text.caption,
    color: color.text.muted,
    textAlign: 'center',
    marginBottom: space[1],
  },
  disclaimerLink: {
    color: color.brand.primary,
    textDecorationLine: 'underline',
  },
  consent: {
    gap: space[2],
    padding: space[4],
    borderRadius: radius.md,
    backgroundColor: color.surface.default,
  },
  consentTitle: {
    ...text.personName,
    color: color.text.heading,
  },
  consentLine: {
    flexDirection: 'row',
    gap: space[2],
  },
  consentBullet: {
    width: 5,
    height: 5,
    marginTop: 8,
    borderRadius: 3,
    backgroundColor: color.brand.primary,
  },
  consentText: {
    ...text.chatText,
    flex: 1,
    color: color.text.body,
  },
  consentButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: space[2],
    marginTop: space[1],
  },
  typing: {
    width: 56,
  },
  ratingCard: {
    alignSelf: 'flex-end',
    width: '86%',
    padding: space[4],
    gap: space[3],
    borderRadius: radius.md,
    backgroundColor: color.surface.default,
  },
  ratingButton: {
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: radius.quickLink,
    backgroundColor: color.brand.primary,
  },
  ratingButtonLabel: {
    ...text.labelDefault,
    color: color.text.onBrand,
  },
  helpCard: {
    padding: space[4],
    gap: 10,
    borderRadius: radius.lg,
    backgroundColor: color.extra.dangerSubtle,
  },
  helpTitle: {
    ...text.rowTitle,
    color: color.feedback.danger,
  },
  helpCall: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space[2],
    height: size.controlMd,
    borderRadius: radius.quickLink,
    backgroundColor: color.feedback.danger,
  },
  helpCallLabel: {
    ...text.bodyEmphasis,
    color: color.text.onBrand,
  },
  helpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[2],
  },
  helpRowLabel: {
    ...text.labelDefault,
    color: color.feedback.danger,
  },
  quickReplies: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    gap: space[2],
    marginTop: 10,
  },
  quickReply: {
    paddingHorizontal: 14,
    paddingVertical: space[2],
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: color.border.default,
    backgroundColor: color.surface.default,
  },
  quickReplyHighlighted: {
    backgroundColor: color.surface.subtle,
  },
  quickReplyLabel: {
    ...text.labelDefault,
    color: color.text.body,
  },
  composer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 20,
    paddingLeft: 18,
    paddingRight: space[3],
    paddingVertical: space[3],
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: color.border.default,
    backgroundColor: color.surface.default,
  },
  composerInput: {
    ...text.lead,
    flex: 1,
    color: color.text.body,
    paddingVertical: 0,
  },
  micButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.brand.primary,
  },
  scrim: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: space[6],
    backgroundColor: color.extra.scrim,
  },
  dialog: {
    padding: space[5],
    gap: space[4],
    borderRadius: radius.pill,
    backgroundColor: color.surface.default,
  },
  dialogTitle: {
    ...text.profileName,
    color: color.text.heading,
  },
  dialogBody: {
    ...text.lead,
    color: color.text.muted,
  },
  dialogButtons: {
    flexDirection: 'row',
    gap: space[3],
  },
  dialogButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 13,
    borderRadius: radius.card,
  },
  discard: {
    backgroundColor: color.extra.dangerSubtle,
  },
  save: {
    backgroundColor: color.brand.primary,
  },
  dialogButtonLabel: {
    ...text.rowTitle,
  },
});

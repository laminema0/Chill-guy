// Chill Guy chat, from Figma "7 · Chill Guy chat" and "8 · Chat — save as log".
// Chill Guy is not an AI: `lib/chat` reads each message (who, what happened, feelings, thinking traps)
// and picks a written reply, so it stays on topic. Every message passes the safety check first.
import { useRef, useState } from 'react';
import { Image, KeyboardAvoidingView, Linking, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BackButton, HelpPill, IntensitySlider } from '../components';
import { MicIcon, PhoneIcon } from '../components/icons/MoreIcons';
import { initialState, openingTurn, respond, type BotTurn, type ChatState, type Chip, type Input } from '../lib/chat/engine';
import { color, layout, radius, size, space, text } from '../theme/tokens';

type Item = { kind: 'guy' | 'me'; text: string } | { kind: 'help' };

const REPLY_DELAY = 450; // a short pause so Chill Guy doesn't answer instantly

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
  const [saveOpen, setSaveOpen] = useState(false);

  const scrollDown = () => setTimeout(() => scroll.current?.scrollToEnd({ animated: true }), 60);

  const talk = (input: Input, shown: string) => {
    setItems((list) => [...list, { kind: 'me', text: shown }]);
    setTurn({ messages: [], chips: [] });
    setTyping(true);
    scrollDown();
    const [next, reply] = respond(state.current, input);
    state.current = next;
    setTimeout(() => {
      setTyping(false);
      setItems((list) => [...list, ...toItems(reply)]);
      // An empty reply (e.g. after opening another screen) keeps the current buttons.
      setTurn((current) => (reply.messages.length > 0 || reply.chips.length > 0 ? reply : current));
      if (reply.askRating) setRating(5);
      scrollDown();
    }, REPLY_DELAY);
  };

  const send = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    setDraft('');
    talk({ text: trimmed }, trimmed);
  };

  const pressChip = (chip: Chip) => {
    if (chip.save) {
      setSaveOpen(true);
      return;
    }
    if (chip.href) router.push(chip.href);
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
          <Text style={styles.headerStatus}>always here</Text>
        </View>
        <View style={styles.headerSpacer} />
        <HelpPill />
      </View>

      <ScrollView ref={scroll} contentContainerStyle={styles.messages} onContentSizeChange={scrollDown}>
        <Text style={styles.disclaimer}>Chill Guy is a guide, not a therapist. In an emergency, tap Help.</Text>
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
          value={draft}
          onChangeText={setDraft}
          placeholder="Type how you feel…"
          placeholderTextColor={color.extra.placeholder}
          style={styles.composerInput}
          onSubmitEditing={() => send(draft)}
          returnKeyType="send"
        />
        <Pressable style={styles.micButton} onPress={() => send(draft)} accessibilityLabel="Send">
          <MicIcon />
        </Pressable>
      </View>

      {/* Save this as a log? */}
      <Modal transparent visible={saveOpen} animationType="fade" onRequestClose={() => setSaveOpen(false)}>
        <View style={styles.scrim}>
          <View style={styles.dialog}>
            <Text style={styles.dialogTitle}>Save this as a log?</Text>
            <Text style={styles.dialogBody}>
              This conversation becomes a log in My Story, so you can revisit it later with calmer eyes.
            </Text>
            <View style={styles.dialogButtons}>
              <Pressable style={[styles.dialogButton, styles.discard]} onPress={() => setSaveOpen(false)}>
                <Text style={[styles.dialogButtonLabel, { color: color.feedback.danger }]}>Discard</Text>
              </Pressable>
              <Pressable
                style={[styles.dialogButton, styles.save]}
                onPress={() => {
                  setSaveOpen(false);
                  router.push('/story');
                }}
              >
                <Text style={[styles.dialogButtonLabel, { color: color.text.onBrand }]}>Save log</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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

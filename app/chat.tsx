// Chill Guy chat, from Figma "7 · Chill Guy chat" and "8 · Chat — save as log".
// Prototype: the conversation is the example from Figma. You can type and send; Chill Guy
// answers with a gentle placeholder line (no AI and no internet in this version).
import { useRef, useState } from 'react';
import { Image, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BackButton } from '../components';
import { MicIcon } from '../components/icons/MoreIcons';
import { color, layout, radius, space, text } from '../theme/tokens';

type Message = { from: 'guy' | 'me'; text: string };

const firstMessages: Message[] = [
  { from: 'guy', text: 'Hey — tell me what happened.' },
  { from: 'me', text: 'I was working on a project. My colleague kept interrupting with useless comments.' },
  { from: 'guy', text: 'That sounds frustrating — being interrupted when you’re focused.' },
  { from: 'guy', text: 'It seems her comments felt like they dismissed your work. Does that fit?' },
];

export default function ChatScreen() {
  const insets = useSafeAreaInsets();
  const scroll = useRef<ScrollView>(null);
  const [messages, setMessages] = useState<Message[]>(firstMessages);
  const [draft, setDraft] = useState('');
  const [saveOpen, setSaveOpen] = useState(false);

  const send = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    setMessages((m) => [
      ...m,
      { from: 'me', text: trimmed },
      { from: 'guy', text: 'Thanks for telling me. Take a slow breath — what do you notice in your body right now?' },
    ]);
    setDraft('');
    setTimeout(() => scroll.current?.scrollToEnd({ animated: true }), 50);
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
      </View>

      <ScrollView ref={scroll} contentContainerStyle={styles.messages}>
        {messages.map((m, i) => (
          <View key={i} style={m.from === 'me' ? styles.me : styles.guy}>
            <Text style={[styles.messageText, m.from === 'me' && { color: color.text.onBrand }]}>{m.text}</Text>
          </View>
        ))}
        <View style={styles.quickReplies}>
          <QuickReply label="Yes, exactly" onPress={() => send('Yes, exactly')} />
          <QuickReply label="No" onPress={() => send('No')} />
          <QuickReply label="Save this as a log" highlighted onPress={() => setSaveOpen(true)} />
        </View>
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

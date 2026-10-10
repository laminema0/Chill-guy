// How Chill Guy works: what the app and its AI chat are, what they are not, and how
// messages, privacy and safety are handled. Linked from the chat notice, the chat
// header line and Settings. Plain words, no clinical claims, no "you should".
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router, type Href } from 'expo-router';

import { BackButton, Screen } from '../components';
import { color, radius, space, text } from '../theme/tokens';

type Section = { title: string; lines: string[]; tone?: 'danger' };

const sections: Section[] = [
  {
    title: 'What Chill Guy is',
    lines: [
      'A self-help companion for moments of anger: slowing down, naming what you feel, and choosing a next step.',
      'It draws on ideas from cognitive behavioural therapy (CBT), such as noticing thoughts and planning ahead.',
      'It is meant for adults (18+).',
    ],
  },
  {
    title: 'What it is not',
    lines: [
      'Not a therapist, counsellor or doctor, and not a replacement for one.',
      'It does not diagnose, treat or promise any result.',
      'Not an emergency or crisis service.',
    ],
  },
  {
    title: 'About the AI chat',
    lines: [
      'Replies are written by an AI model (gpt-oss-120b, run by Groq), not by a person.',
      'The AI can be wrong, miss context or sound off. Your own judgement comes first.',
      'It only sees the last few messages of this chat. When you leave the chat, the conversation is gone.',
      'It cannot book specialists, read your check-ins or plans, save logs or search the web.',
    ],
  },
  {
    title: 'Your privacy',
    lines: [
      'To get a reply, your messages and the recent replies go through our server at Cloudflare to Groq.',
      'Our server does not store or log what you write. Cloudflare and Groq process it under their own policies.',
      'Please leave out names, addresses and other details that identify you or someone else.',
      'Your check-ins, plans and profile are never sent to the AI.',
    ],
  },
  {
    title: 'Safety',
    tone: 'danger',
    lines: [
      'Every message is checked for signs of danger before it reaches the AI. If something is found, it is not sent to the AI and help numbers are shown instead.',
      'These checks look for words and can miss things. If you or someone else is in danger, call 112 directly.',
      'The red Help button on every screen opens the emergency and support numbers.',
    ],
  },
  {
    title: 'When to talk to a professional',
    lines: [
      'When anger leads to hurting yourself or someone else, or to breaking things.',
      'When it scares you or the people around you, or keeps coming back most days.',
      'When it affects work, relationships, or comes together with alcohol or drugs.',
      'A GP (Hausarzt) or a psychotherapist is a good first step. Specialists in this app is another.',
    ],
  },
  {
    title: 'About this app',
    lines: [
      'Chill Guy was designed for an MA thesis in Social Design at SRH Berlin.',
      'It is a working prototype. It has not been clinically evaluated, and some screens show example content.',
    ],
  },
];

const actions: { label: string; href: Href; primary?: boolean; danger?: boolean }[] = [
  { label: 'Get help now', href: '/get-help', danger: true },
  { label: 'Talk to a human', href: '/specialists' },
  { label: 'Open the chat', href: '/chat', primary: true },
];

export default function HowItWorksScreen() {
  return (
    <Screen gap={space[3]}>
      <BackButton />
      <Text style={styles.title}>How Chill Guy works</Text>
      <Text style={styles.lead}>
        Chill Guy helps you calm down and think things through. It does not replace a therapist. Here is what it can and
        cannot do.
      </Text>

      {sections.map((section) => (
        <View key={section.title} style={[styles.card, section.tone === 'danger' && styles.cardDanger]}>
          <Text style={[styles.cardTitle, section.tone === 'danger' && styles.danger]}>{section.title}</Text>
          {section.lines.map((line) => (
            <View key={line} style={styles.line}>
              <View style={[styles.bullet, section.tone === 'danger' && styles.bulletDanger]} />
              <Text style={styles.lineText}>{line}</Text>
            </View>
          ))}
        </View>
      ))}

      <View style={styles.actions}>
        {actions.map((action) => (
          <Pressable
            key={action.label}
            accessibilityRole="button"
            onPress={() => router.push(action.href)}
            style={[styles.action, action.primary && styles.actionPrimary, action.danger && styles.actionDanger]}
          >
            <Text style={[styles.actionLabel, (action.primary || action.danger) && styles.actionLabelOnColor]}>
              {action.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    ...text.screenTitle,
    color: color.text.heading,
  },
  lead: {
    ...text.bodyDefault,
    color: color.text.body,
  },
  card: {
    padding: space[4],
    gap: space[2],
    borderRadius: radius.card,
    backgroundColor: color.surface.default,
  },
  cardDanger: {
    backgroundColor: color.extra.dangerSubtle,
  },
  cardTitle: {
    ...text.personName,
    color: color.text.heading,
  },
  danger: {
    color: color.feedback.danger,
  },
  line: {
    flexDirection: 'row',
    gap: space[2],
  },
  bullet: {
    width: 5,
    height: 5,
    marginTop: 8,
    borderRadius: 3,
    backgroundColor: color.brand.primary,
  },
  bulletDanger: {
    backgroundColor: color.feedback.danger,
  },
  lineText: {
    ...text.bodyDefault,
    flex: 1,
    color: color.text.body,
  },
  actions: {
    gap: space[2],
    marginTop: space[1],
  },
  action: {
    alignItems: 'center',
    paddingVertical: 13,
    borderRadius: radius.quickLink,
    borderWidth: 1.5,
    borderColor: color.border.default,
    backgroundColor: color.surface.default,
  },
  actionPrimary: {
    borderColor: color.brand.primary,
    backgroundColor: color.brand.primary,
  },
  actionDanger: {
    borderColor: color.feedback.danger,
    backgroundColor: color.feedback.danger,
  },
  actionLabel: {
    ...text.bodyEmphasis,
    color: color.text.body,
  },
  actionLabelOnColor: {
    color: color.text.onBrand,
  },
});

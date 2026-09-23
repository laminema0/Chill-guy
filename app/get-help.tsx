// Get help now, from Figma "13 · Get help now" (node 2241:1614).
// Hard rule: reachable in one tap from every screen (the "Help" pill). Numbers open the phone app.
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { router, type Href } from 'expo-router';

import { BackButton, Screen } from '../components';
import { PhoneIcon } from '../components/icons/MoreIcons';
import { color, radius, size, space, text } from '../theme/tokens';

const call = (number: string) => Linking.openURL(`tel:${number.replace(/\s/g, '')}`);

const listenerNumbers = ['0800 111 0 111', '0800 111 0 222'];

const calmLinks: { title: string; body: string; href: Href }[] = [
  { title: 'Breathe with me', body: '4-7-8 · 2 min', href: '/breathe' },
  { title: 'Open my plan', body: 'Your If-Then steps', href: '/plan' },
];

export default function GetHelpScreen() {
  return (
    <Screen gap={space[3]} help={false}>
      <BackButton />
      <Text style={styles.title}>You’re not alone</Text>
      <Text style={styles.lead}>
        If you feel you might hurt yourself or someone else, call now. It’s free and someone answers day and night.
      </Text>

      <View style={[styles.card, { backgroundColor: color.extra.dangerSubtle }]}>
        <View style={styles.cardText}>
          <Text style={styles.overline}>EMERGENCY</Text>
          <Text style={styles.emergencyNumber}>112</Text>
          <Text style={styles.cardBody}>Police, ambulance, fire — anywhere in the EU.</Text>
        </View>
        <Pressable style={styles.emergencyButton} onPress={() => call('112')} accessibilityRole="button">
          <PhoneIcon color={color.text.onBrand} size={18} />
          <Text style={styles.emergencyLabel}>Call 112</Text>
        </Pressable>
      </View>

      <View style={[styles.card, { backgroundColor: color.surface.default }]}>
        <View style={styles.cardText}>
          <Text style={styles.cardTitle}>TelefonSeelsorge</Text>
          <Text style={[styles.cardBody, { color: color.text.muted }]}>
            Talk to a trained listener. Free, anonymous, 24/7.
          </Text>
        </View>
        {listenerNumbers.map((number) => (
          <Pressable key={number} style={styles.callRow} onPress={() => call(number)} accessibilityRole="button">
            <PhoneIcon />
            <Text style={styles.callNumber}>{number}</Text>
            <Text style={styles.callLabel}>Call</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.sectionLabel}>WHILE YOU WAIT</Text>
      <View style={styles.links}>
        {calmLinks.map((link) => (
          <Pressable key={link.title} style={styles.link} onPress={() => router.push(link.href)}>
            <Text style={styles.linkTitle}>{link.title}</Text>
            <Text style={styles.linkBody}>{link.body}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.note}>Chill Guy is not a crisis service. If you are in danger, please call.</Text>
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
    padding: 18,
    gap: space[3],
    borderRadius: radius.lg,
  },
  cardText: {
    gap: 2,
  },
  overline: {
    ...text.sectionLabel,
    letterSpacing: 0.7,
    color: color.feedback.danger,
  },
  emergencyNumber: {
    ...text.emergencyNumber,
    color: color.feedback.danger,
  },
  cardTitle: {
    ...text.personName,
    color: color.text.heading,
  },
  cardBody: {
    ...text.rowBody,
    color: color.text.body,
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space[2],
    height: size.controlLg,
    borderRadius: radius.quickLink,
    backgroundColor: color.feedback.danger,
  },
  emergencyLabel: {
    ...text.question,
    color: color.text.onBrand,
  },
  callRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 48,
    paddingHorizontal: space[4],
    borderRadius: radius.quickLink,
    backgroundColor: color.surface.subtle,
  },
  callNumber: {
    ...text.rowTitle,
    color: color.brand.primary,
    flex: 1,
  },
  callLabel: {
    ...text.labelDefault,
    color: color.brand.primary,
  },
  sectionLabel: {
    ...text.sectionLabel,
    letterSpacing: 0.7,
    color: color.text.muted,
    marginTop: space[1],
  },
  links: {
    flexDirection: 'row',
    gap: 10,
  },
  link: {
    flex: 1,
    gap: 2,
    paddingHorizontal: space[4],
    paddingVertical: 14,
    borderRadius: radius.card,
    backgroundColor: color.surface.default,
  },
  linkTitle: {
    ...text.bodyEmphasis,
    color: color.text.heading,
  },
  linkBody: {
    ...text.caption,
    color: color.text.muted,
  },
  note: {
    ...text.caption,
    color: color.text.muted,
    textAlign: 'center',
  },
});

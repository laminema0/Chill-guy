// Profile, from Figma "20 · Profile" (node 2019:1618). Opened from the profile picture on Home.
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import { BackButton, Screen } from '../components';
import { CheckIcon, DocSmallIcon } from '../components/icons/MoreIcons';
import { session } from '../lib/session';
import { color, radius, space, text } from '../theme/tokens';

const details = [
  ['Birth date', '10 · 03 · 1995'],
  ['Email', 'amin.ranjbar77@gmail.com'],
  ['Phone', '+49 176 6142 9479'],
];

const records = ['Records_Health_Doc_2025.pdf', 'Records_Health_Doc_2026.pdf'];

export default function ProfileScreen() {
  return (
    <Screen gap={space[4]}>
      <BackButton />
      <View style={styles.person}>
        <View style={styles.avatar}>
          <Image source={require('../assets/images/chill-guy-mascot.png')} style={styles.avatarImage} />
        </View>
        <Text style={styles.name}>{session.name} Ranjbar</Text>
        <View style={styles.chapter}>
          <Text style={styles.chapterLabel}>Chapter 3 · Preparing</Text>
        </View>
      </View>

      <View style={styles.details}>
        {details.map(([label, value]) => (
          <View key={label} style={styles.detailRow}>
            <Text style={styles.detailLabel}>{label}</Text>
            <Text style={styles.detailValue}>{value}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.section}>Health records</Text>
      {records.map((file) => (
        <View key={file} style={styles.record}>
          <DocSmallIcon />
          <Text style={styles.recordName}>{file}</Text>
          <View style={styles.verified}>
            <CheckIcon />
            <Text style={styles.verifiedLabel}>Verified</Text>
          </View>
        </View>
      ))}

      <Pressable style={styles.browse}>
        <Text style={styles.browseLabel}>+  Browse files</Text>
      </Pressable>

      <Pressable style={styles.settings} onPress={() => router.push('/settings')}>
        <Text style={styles.settingsLabel}>Settings</Text>
        <Text style={styles.chevron}>›</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  person: {
    alignItems: 'center',
    gap: space[2],
    marginBottom: space[6],
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: 70,
    height: 80,
  },
  name: {
    ...text.profileName,
    color: color.text.heading,
  },
  chapter: {
    paddingHorizontal: space[3],
    paddingVertical: 5,
    borderRadius: space[3],
    backgroundColor: color.surface.subtle,
  },
  chapterLabel: {
    ...text.dateLabel,
    color: color.brand.primary,
  },
  details: {
    borderRadius: radius.card,
    overflow: 'hidden',
    backgroundColor: color.surface.default,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: space[4],
    paddingVertical: 15,
  },
  detailLabel: {
    ...text.bodyDefault,
    color: color.text.muted,
  },
  detailValue: {
    ...text.bodyEmphasis,
    color: color.text.body,
  },
  section: {
    ...text.rowTitle,
    color: color.text.body,
    marginTop: space[2],
  },
  record: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[3],
    paddingHorizontal: space[4],
    paddingVertical: 14,
    borderRadius: radius.card,
    backgroundColor: color.surface.default,
    marginTop: -6,
  },
  recordName: {
    ...text.labelDefault,
    color: color.text.body,
    flex: 1,
  },
  verified: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: space[2],
    paddingVertical: 3,
    borderRadius: radius.sm,
    backgroundColor: color.surface.subtle,
  },
  verifiedLabel: {
    ...text.tag,
    color: color.brand.primary,
  },
  browse: {
    alignItems: 'center',
    paddingVertical: 13,
    borderRadius: radius.card,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: color.brand.primary,
  },
  browseLabel: {
    ...text.bodyEmphasis,
    color: color.brand.primary,
  },
  settings: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 52,
    paddingHorizontal: space[4],
    borderRadius: radius.card,
    backgroundColor: color.surface.default,
  },
  settingsLabel: {
    ...text.rowTitle,
    color: color.text.body,
  },
  chevron: {
    ...text.arrow,
    color: color.extra.placeholder,
  },
});

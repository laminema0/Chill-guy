// Journey, from Figma "V2 — Journey" (node 2011:3629). Opened from the Chapter card on Home.
import type { ComponentType } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { BackButton, Screen } from '../components';
import { BrainIcon, CompassIcon, EyeIcon, LeafIcon, ZapIcon } from '../components/icons/MoreIcons';
import { color, radius, space, text } from '../theme/tokens';

type Status = 'done' | 'current' | 'locked';

const chapters: { title: string; line: string; status: Status; Icon: ComponentType }[] = [
  { title: 'Chapter 1 · Noticing', line: 'Anger as a signal, not an enemy.', status: 'done', Icon: EyeIcon },
  { title: 'Chapter 2 · Understanding', line: 'You mapped your triggers.', status: 'done', Icon: BrainIcon },
  { title: 'Chapter 3 · Preparing', line: 'Building plans & repair skills.', status: 'current', Icon: CompassIcon },
  { title: 'Chapter 4 · Acting', line: 'Tools inside real episodes.', status: 'locked', Icon: ZapIcon },
  { title: 'Chapter 5 · Keeping calm', line: 'Anger visits, but doesn’t stay.', status: 'locked', Icon: LeafIcon },
];

const badgeColor: Record<Status, string> = {
  done: color.brand.primary,
  current: color.brand.hover,
  locked: color.text.muted,
};

const tagLabel: Record<Status, string> = { done: 'DONE', current: 'YOU ARE HERE', locked: 'LOCKED' };

export default function JourneyScreen() {
  return (
    <Screen gap={space[3]}>
      <BackButton />
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Chill Guy’s Journey</Text>
        <Text style={styles.heroLine}>Five chapters, walked together</Text>
      </View>

      {chapters.map(({ title, line, status, Icon }) => (
        <View key={title} style={[styles.chapter, status === 'current' && styles.current]}>
          <View style={[styles.badge, { backgroundColor: badgeColor[status] }]}>
            <Icon />
          </View>
          <View style={styles.chapterText}>
            <View style={styles.titleRow}>
              <Text style={styles.chapterTitle}>{title}</Text>
              <View style={[styles.tag, status === 'current' && { backgroundColor: color.brand.hover }]}>
                <Text style={[styles.tagLabel, status === 'current' && { color: color.text.onBrand }]}>
                  {tagLabel[status]}
                </Text>
              </View>
            </View>
            <Text style={styles.chapterLine}>{line}</Text>
          </View>
        </View>
      ))}

      <View style={styles.note}>
        <Text style={styles.noteText}>No streaks, no shame. A bad week never takes your story away.</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    height: 80,
    justifyContent: 'center',
    paddingHorizontal: 18,
    borderRadius: radius.card,
    backgroundColor: color.surface.subtle,
    gap: 2,
  },
  heroTitle: {
    ...text.headerTitle,
    color: color.text.heading,
  },
  heroLine: {
    ...text.rowBody,
    color: color.text.heading,
  },
  chapter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[3],
    paddingHorizontal: 14,
    paddingVertical: space[3],
    borderRadius: radius.card,
    backgroundColor: color.surface.default,
  },
  current: {
    borderWidth: 2,
    borderColor: color.brand.hover,
  },
  badge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chapterText: {
    flex: 1,
    gap: 2,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  chapterTitle: {
    ...text.bodyEmphasis,
    color: color.text.heading,
  },
  tag: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 7,
    backgroundColor: color.surface.muted,
  },
  tagLabel: {
    ...text.tinyBold,
    color: color.text.muted,
  },
  chapterLine: {
    ...text.caption,
    color: color.text.muted,
  },
  note: {
    paddingHorizontal: space[4],
    paddingVertical: space[3],
    borderRadius: radius.card,
    backgroundColor: color.surface.subtle,
  },
  noteText: {
    ...text.rowBody,
    color: color.text.heading,
  },
});

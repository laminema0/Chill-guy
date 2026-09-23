// My Story, from Figma "V2 — Story & Logs" (Pattern: node 2010:3578, Logs: node 2137:1595).
// Prototype: shows the example content from Figma. Milestone 5 fills it with real check-ins.
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';

import { BackButton, Screen, SearchIcon, SegmentedControl, Tag } from '../components';
import { color, radius, space, text } from '../theme/tokens';

const tabs = ['Pattern', 'Logs'] as const;

const episode = [
  { label: 'Trigger', value: 'Family issues · 8/12', bar: color.brand.primary },
  { label: 'Hot thought', value: '“They never listen to me”', bar: color.brand.hover },
  { label: 'Urge → Expression', value: 'Argue verbally → raised voice', bar: color.extra.indigo },
  { label: 'Outcome', value: 'Regret afterwards · 9/12', bar: color.feedback.danger },
];

const logs = [
  { date: 'Oct 24, 2026', title: 'Having an argument with my friend', tag: '9 → 4', ready: false },
  { date: 'Oct 23, 2026', title: 'The conflict due to the deadline in the office', tag: 'Revisit ready', ready: true },
  { date: 'Oct 20, 2026', title: 'Traffic on the way to work', tag: '7 → 3', ready: false },
];

export default function StoryScreen() {
  const [tab, setTab] = useState<(typeof tabs)[number]>('Pattern');

  return (
    <Screen gap={14}>
      <BackButton />
      <Text style={styles.title}>My Story</Text>
      <SegmentedControl options={tabs} value={tab} onChange={setTab} />
      {tab === 'Pattern' ? <PatternView onShowLogs={() => setTab('Logs')} /> : <LogsView />}
    </Screen>
  );
}

function PatternView({ onShowLogs }: { onShowLogs: () => void }) {
  return (
    <>
      <View style={styles.patternCard}>
        <Text style={styles.cardLabel}>YOUR MOST COMMON EPISODE</Text>
        {episode.map((row) => (
          <View key={row.label} style={styles.episodeRow}>
            <View style={[styles.bar, { backgroundColor: row.bar }]} />
            <View style={styles.episodeText}>
              <Text style={styles.episodeLabel}>{row.label}</Text>
              <Text style={styles.episodeValue}>{row.value}</Text>
            </View>
          </View>
        ))}
        <Pressable
          style={styles.fullStory}
          onPress={() => router.push({ pathname: '/coming-later', params: { feature: 'My Anger Story' } })}
        >
          <Text style={styles.fullStoryLabel}>See the full story →</Text>
        </Pressable>
      </View>

      <Text style={styles.sectionTitle}>Recent logs</Text>
      <Pressable style={styles.logCard} onPress={onShowLogs}>
        <Text style={styles.logTitle}>Oct 24 · Argument with my friend</Text>
        <Tag label="REVISITED · 9 → 4" />
      </Pressable>
      <Pressable style={styles.logCard} onPress={onShowLogs}>
        <Text style={styles.logTitle}>Oct 23 · Deadline conflict at the office</Text>
        <Tag label="REVISIT READY" tone="danger" />
      </Pressable>
    </>
  );
}

function LogsView() {
  const [query, setQuery] = useState('');
  const shown = logs.filter((log) => log.title.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <>
      <View style={styles.search}>
        <SearchIcon />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search logs"
          placeholderTextColor={color.extra.placeholder}
          style={styles.searchInput}
        />
      </View>
      <View style={styles.logList}>
        {shown.map((log) => (
          <View key={log.date} style={[styles.logCard, styles.logCardFull]}>
            <View style={styles.logTop}>
              <Text style={styles.logDate}>{log.date}</Text>
              <Tag label={log.tag} tone={log.ready ? 'danger' : 'brand'} />
            </View>
            <Text style={styles.logTitle}>{log.title}</Text>
          </View>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    ...text.screenTitle,
    color: color.text.heading,
  },
  patternCard: {
    backgroundColor: color.surface.default,
    borderRadius: radius.card,
    paddingHorizontal: 18,
    paddingVertical: space[4],
    gap: space[2],
  },
  cardLabel: {
    ...text.sectionLabel,
    color: color.brand.primary,
  },
  episodeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bar: {
    width: 5,
    height: 26,
    borderRadius: 2.5,
  },
  episodeText: {
    flex: 1,
  },
  episodeLabel: {
    ...text.overline,
    color: color.text.muted,
  },
  episodeValue: {
    ...text.bodyEmphasis,
    color: color.text.body,
  },
  fullStory: {
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: radius.lg,
    backgroundColor: color.surface.subtle,
  },
  fullStoryLabel: {
    ...text.bodyEmphasis,
    color: color.brand.primary,
  },
  sectionTitle: {
    ...text.sectionTitle,
    color: color.text.body,
  },
  logCard: {
    backgroundColor: color.surface.default,
    borderRadius: radius.card,
    paddingHorizontal: space[4],
    paddingVertical: 14,
    gap: 6,
  },
  logCardFull: {
    padding: space[4],
  },
  logTitle: {
    ...text.rowTitle,
    color: color.text.body,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[2],
    paddingHorizontal: space[4],
    borderRadius: radius.card,
    borderWidth: 1.5,
    borderColor: color.border.default,
    backgroundColor: color.surface.default,
  },
  searchInput: {
    ...text.lead,
    flex: 1,
    paddingVertical: 13,
    color: color.text.body,
  },
  logList: {
    gap: space[3],
  },
  logTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logDate: {
    ...text.dateLabel,
    color: color.text.muted,
  },
});

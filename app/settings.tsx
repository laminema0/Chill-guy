// Settings, from Figma "19 · Settings" (node 2019:1574). Opened from the profile picture on Home.
// Prototype: switches work on screen; Milestone 8 connects export, delete and app lock.
import { useState, type ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import {
  BackButton,
  ChartIcon,
  DownloadIcon,
  HandshakeIcon,
  KeyIcon,
  Screen,
  SettingsBellIcon,
  Toggle,
  TrashIcon,
} from '../components';
import { color, radius, space, text } from '../theme/tokens';

export default function SettingsScreen() {
  const [reminders, setReminders] = useState(true);
  const [weekly, setWeekly] = useState(true);
  const [share, setShare] = useState(false);
  const later = (feature: string) => router.push({ pathname: '/coming-later', params: { feature } });

  return (
    <Screen gap={space[3]}>
      <BackButton />
      <Text style={styles.title}>Settings</Text>

      <Text style={styles.group}>NOTIFICATIONS</Text>
      <Row icon={<SettingsBellIcon />} title="Wellness reminders" subtitle="Gentle nudges to check in">
        <Toggle label="Wellness reminders" value={reminders} onChange={setReminders} />
      </Row>
      <Row icon={<ChartIcon />} title="Weekly story summary">
        <Toggle label="Weekly story summary" value={weekly} onChange={setWeekly} />
      </Row>

      <Text style={styles.group}>{'PRIVACY & DATA'}</Text>
      <Row icon={<HandshakeIcon />} title="Share with specialists" subtitle="Consent per session">
        <Toggle label="Share with specialists" value={share} onChange={setShare} />
      </Row>
      <Row icon={<DownloadIcon />} title="Download personal logs" onPress={() => later('Download personal logs')} />
      <Row icon={<KeyIcon />} title="Manage data & consent" onPress={() => later('Manage data & consent')} />

      <Text style={styles.group}>ACCOUNT</Text>
      <Row icon={<TrashIcon />} title="Delete account permanently" danger onPress={() => later('Delete data')} />

      <Pressable style={styles.logout} onPress={() => later('Log out')}>
        <Text style={styles.logoutLabel}>Log out</Text>
      </Pressable>

      <Pressable style={styles.logout} onPress={() => router.push('/dev/components')}>
        <Text style={styles.devLabel}>Design system (dev)</Text>
      </Pressable>
    </Screen>
  );
}

type RowProps = {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  danger?: boolean;
  onPress?: () => void;
  /** A switch on the right. Without it, the row shows a "›" and is tappable. */
  children?: ReactNode;
};

function Row({ icon, title, subtitle, danger = false, onPress, children }: RowProps) {
  return (
    <Pressable style={styles.row} onPress={onPress} disabled={!onPress}>
      {icon}
      <View style={styles.rowText}>
        <Text style={[styles.rowTitle, danger && styles.danger]}>{title}</Text>
        {subtitle ? <Text style={styles.rowSubtitle}>{subtitle}</Text> : null}
      </View>
      {children ?? <Text style={styles.chevron}>›</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  title: {
    ...text.screenTitle,
    color: color.text.heading,
    marginBottom: space[1],
  },
  group: {
    ...text.groupLabel,
    color: color.text.muted,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[3],
    padding: space[4],
    borderRadius: radius.card,
    backgroundColor: color.surface.default,
  },
  rowText: {
    flex: 1,
    gap: 2,
  },
  rowTitle: {
    ...text.rowTitle,
    color: color.text.body,
  },
  danger: {
    color: color.feedback.danger,
  },
  rowSubtitle: {
    ...text.caption,
    color: color.text.muted,
  },
  chevron: {
    ...text.arrow,
    color: color.extra.placeholder,
  },
  logout: {
    alignItems: 'center',
    paddingVertical: space[1],
  },
  logoutLabel: {
    ...text.bodyEmphasis,
    color: color.text.muted,
  },
  devLabel: {
    ...text.caption,
    color: color.extra.placeholder,
  },
});

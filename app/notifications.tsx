// Notifications, from Figma "16 · Notifications" (node 2018:1609). Opened from the bell on Home.
import type { ReactNode } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { router, type Href } from 'expo-router';

import { BackButton, Screen } from '../components';
import { BulbIcon, CalendarIcon, LeafSmallIcon } from '../components/icons/MoreIcons';
import { color, radius, space, text } from '../theme/tokens';

type Item = { title: string; body: string; when: string; unread?: boolean; icon: ReactNode; href: Href };

const items: Item[] = [
  { title: 'Cool-Down Revisit', body: 'Tuesday’s episode is ready to revisit calmly.', when: 'Now', unread: true, icon: <BulbIcon />, href: '/story' },
  {
    title: 'Chill Guy',
    body: 'Hey, chiiiill! Come talk when you have a sec.',
    when: '1h ago',
    unread: true,
    icon: <Image source={require('../assets/images/chill-guy-mascot.png')} style={{ width: 30, height: 34 }} />,
    href: '/chat',
  },
  { title: 'Dr. Elena Martinez', body: 'I’ll see you in 30 minutes — bring your logs.', when: '2h ago', icon: <CalendarIcon />, href: '/sessions' },
  { title: 'Plan triggered', body: 'Heart-rate spike detected — your plan opened.', when: 'Yesterday', icon: <Text style={{ fontSize: 18 }}>⌚</Text>, href: '/plan' },
  { title: 'Journey', body: 'You’re close to unlocking Chapter 4 · Acting.', when: '2d ago', icon: <LeafSmallIcon />, href: '/journey' },
];

export default function NotificationsScreen() {
  return (
    <Screen gap={space[3]}>
      <BackButton />
      <Text style={styles.title}>Notifications</Text>
      {items.map((item) => (
        <Pressable
          key={item.title}
          onPress={() => router.push(item.href)}
          style={[styles.item, { backgroundColor: item.unread ? color.surface.subtle : color.surface.default }]}
        >
          <View style={styles.iconCircle}>{item.icon}</View>
          <View style={styles.texts}>
            <View style={styles.topRow}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.when}>{item.when}</Text>
            </View>
            <Text style={styles.body}>{item.body}</Text>
          </View>
        </Pressable>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    ...text.screenTitle,
    color: color.text.heading,
    marginBottom: space[1],
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: space[3],
    paddingHorizontal: space[4],
    paddingVertical: 14,
    borderRadius: radius.card,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: color.surface.default,
  },
  texts: {
    flex: 1,
    gap: 3,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemTitle: {
    ...text.rowTitle,
    color: color.text.heading,
  },
  when: {
    ...text.tiny,
    color: color.text.muted,
  },
  body: {
    ...text.rowBody,
    color: color.text.body,
  },
});

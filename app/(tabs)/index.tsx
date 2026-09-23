// Home, from Figma "V2 — Home" (node 2009:3580).
// Prototype: it looks like Figma; parts that are not in V1 open "Coming later".
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Redirect, router, useLocalSearchParams } from 'expo-router';

import { BellIcon, Chip, CompassBadge, HeartIcon, HelpPill, LinkCard, Screen } from '../../components';
import { session } from '../../lib/session';
import { color, radius, size, space, text } from '../../theme/tokens';

const feelings = ['Calm', 'Dismissed', 'Overwhelmed', 'Treated unfairly'];


export default function HomeScreen() {
  const [selected, setSelected] = useState<string[]>(['Calm']);
  // "?skipIntro=1" opens Home directly (used for previews).
  const { skipIntro } = useLocalSearchParams<{ skipIntro?: string }>();
  if (skipIntro) session.onboarded = true;

  const toggle = (feeling: string) =>
    setSelected((current) => (current.includes(feeling) ? current.filter((f) => f !== feeling) : [...current, feeling]));

  // First time the app opens: start with the intro and sign-up.
  if (!session.onboarded) {
    return <Redirect href="/intro" />;
  }

  return (
    <Screen gap={space[4]} help={false}>
      {/* Greeting, help, notifications bell, profile picture */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Hi, {session.name}</Text>
        <HelpPill />
        <Pressable onPress={() => router.push('/notifications')} accessibilityLabel="Notifications" hitSlop={8}>
          <BellIcon />
        </Pressable>
        <Pressable onPress={() => router.push('/profile')} accessibilityLabel="Profile" style={styles.avatar}>
          <Text style={styles.avatarInitial}>A</Text>
        </Pressable>
      </View>

      <LinkCard
        leading={<CompassBadge />}
        title="Chapter 3 · Preparing"
        subtitle="2 of 4 plan cards built — keep going"
        onPress={() => router.push('/journey')}
      />

      {/* My Story / My Plan */}
      <View style={styles.quickLinks}>
        <Pressable style={styles.quickLink} onPress={() => router.push('/story')}>
          <Text style={styles.quickLinkLabel}>My Story</Text>
        </Pressable>
        <Pressable style={styles.quickLink} onPress={() => router.push('/plan')}>
          <Text style={styles.quickLinkLabel}>My Plan</Text>
        </Pressable>
      </View>

      {/* What's underneath today? */}
      <View style={styles.whiteCard}>
        <Text style={styles.cardTitle}>What’s underneath today?</Text>
        <View style={styles.chips}>
          {feelings.map((feeling) => (
            <Chip key={feeling} label={feeling} selected={selected.includes(feeling)} onPress={() => toggle(feeling)} />
          ))}
          <Chip label="More…" onPress={() => router.push('/check-in')} />
        </View>
      </View>

      {/* Feeling the heat? */}
      <View style={styles.heatCard}>
        <View style={styles.heatText}>
          <Text style={styles.heatTitle}>Feeling the heat?{'\n'}Enter the Chill Guy Zone</Text>
          <Pressable style={styles.talkButton} onPress={() => router.push('/chat')}>
            <Text style={styles.talkLabel}>Talk it out</Text>
          </Pressable>
        </View>
        <Image source={require('../../assets/images/chill-guy-mascot.png')} style={styles.mascot} accessibilityIgnoresInvertColors />
      </View>

      <LinkCard
        tone="danger"
        title="Cool-Down Revisit ready"
        subtitle="Tuesday’s episode, seen with calmer eyes"
        onPress={() => router.push('/story')}
      />

      {/* Heart rate */}
      <Pressable style={[styles.whiteCard, styles.heartCard]} onPress={() => router.push('/heart')}>
        <View style={styles.heartRow}>
          <HeartIcon />
          <Text style={styles.heartLabel}>Heart rate</Text>
          <Text style={styles.heartValue}>72 BPM · steady</Text>
        </View>
        <Text style={styles.muted}>If it spikes, your plan is ready: step away + 4-7-8 breathing.</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[4],
    paddingTop: space[2],
  },
  greeting: {
    ...text.screenTitle,
    color: color.text.heading,
    flex: 1,
  },
  avatar: {
    width: size.avatarHeader,
    height: size.avatarHeader,
    borderRadius: size.avatarHeader / 2,
    borderWidth: 2,
    borderColor: color.surface.subtle,
    backgroundColor: color.surface.subtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    ...text.labelDefault,
    color: color.brand.primary,
  },
  quickLinks: {
    flexDirection: 'row',
    gap: 10,
  },
  quickLink: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: radius.quickLink,
    backgroundColor: color.surface.subtle,
  },
  quickLinkLabel: {
    ...text.labelDefault,
    color: color.brand.primary,
  },
  whiteCard: {
    backgroundColor: color.surface.default,
    borderRadius: radius.card,
    paddingHorizontal: 18,
    paddingVertical: space[4],
    gap: 10,
  },
  cardTitle: {
    ...text.sectionTitle,
    color: color.text.body,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: space[2],
  },
  heatCard: {
    height: 150,
    borderRadius: radius.card,
    backgroundColor: color.surface.subtle,
    flexDirection: 'row',
    paddingLeft: 18,
    paddingRight: 14,
    overflow: 'hidden',
  },
  heatText: {
    flex: 1,
    paddingTop: 28,
    gap: 12,
  },
  heatTitle: {
    ...text.sectionTitle,
    color: color.text.heading,
  },
  talkButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: space[2],
    borderRadius: radius.md,
    backgroundColor: color.brand.primary,
  },
  talkLabel: {
    ...text.labelDefault,
    color: color.text.onBrand,
  },
  mascot: {
    width: 105,
    height: 120,
    marginTop: 15,
  },
  heartCard: {
    paddingHorizontal: space[4],
    paddingVertical: 14,
    gap: space[2],
  },
  heartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[2],
  },
  heartLabel: {
    ...text.bodyEmphasis,
    color: color.text.body,
  },
  heartValue: {
    ...text.bodyEmphasis,
    color: color.brand.primary,
  },
  muted: {
    ...text.rowBody,
    color: color.text.muted,
  },
});

// My sessions, from Figma "12 · My sessions (booked)" (node 2018:1574).
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { BackButton, Screen, SegmentedControl } from '../components';
import { LockIcon } from '../components/icons/MoreIcons';
import { specialists } from '../lib/specialists';
import { color, radius, space, text } from '../theme/tokens';

const tabs = ['Upcoming', 'Past'] as const;

export default function SessionsScreen() {
  const [tab, setTab] = useState<(typeof tabs)[number]>('Upcoming');
  const [elena, laura] = specialists;

  return (
    <Screen gap={space[4]}>
      <BackButton />
      <Text style={styles.title}>My sessions</Text>
      <SegmentedControl options={tabs} value={tab} onChange={setTab} />

      {tab === 'Upcoming' ? (
        <>
          <View style={styles.next}>
            <Text style={styles.nextLabel}>NEXT SESSION · IN 2 DAYS</Text>
            <View style={styles.person}>
              <Image source={elena.photo} style={styles.photoLarge} />
              <View style={styles.personText}>
                <Text style={[styles.name, { color: color.text.onBrand }]}>{elena.name}</Text>
                <Text style={styles.nextWhen}>Wed, Oct 10 · 10:30 · 50 min</Text>
              </View>
            </View>
            <View style={styles.nextButtons}>
              <Pressable style={[styles.nextButton, { backgroundColor: color.surface.default }]}>
                <Text style={[styles.nextButtonLabel, { color: color.brand.primary }]}>Join call</Text>
              </Pressable>
              <Pressable style={[styles.nextButton, { backgroundColor: color.brand.hover }]}>
                <Text style={[styles.nextButtonLabel, { color: color.text.onBrand }]}>Bring my logs</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.consent}>
            <LockIcon />
            <Text style={styles.consentText}>
              Sharing your Anger Story with Dr. Martinez — you can revoke consent anytime.
            </Text>
          </View>

          <View style={styles.booked}>
            <Image source={laura.photo} style={styles.photoSmall} />
            <View style={styles.personText}>
              <Text style={styles.bookedName}>{laura.name}</Text>
              <Text style={styles.bookedWhen}>Mon, Oct 22 · 14:00</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeLabel}>Booked</Text>
            </View>
          </View>
        </>
      ) : (
        <Text style={styles.empty}>No past sessions yet.</Text>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    ...text.screenTitle,
    color: color.text.heading,
  },
  next: {
    padding: 18,
    gap: space[3],
    borderRadius: radius.lg,
    backgroundColor: color.brand.primary,
  },
  nextLabel: {
    ...text.sectionLabel,
    color: color.extra.tealSoft,
  },
  person: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[3],
  },
  photoLarge: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  photoSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  personText: {
    flex: 1,
    gap: 2,
  },
  name: {
    ...text.personName,
  },
  nextWhen: {
    ...text.rowBody,
    color: color.extra.tealSoft,
  },
  nextButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  nextButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 11,
    borderRadius: radius.card,
  },
  nextButtonLabel: {
    ...text.labelDefault,
  },
  consent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[2],
    paddingHorizontal: space[4],
    paddingVertical: space[3],
    borderRadius: radius.card,
    backgroundColor: color.surface.subtle,
  },
  consentText: {
    ...text.rowBody,
    color: color.text.heading,
    flex: 1,
  },
  booked: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[3],
    padding: space[4],
    borderRadius: radius.lg,
    backgroundColor: color.surface.default,
  },
  bookedName: {
    ...text.rowTitle,
    color: color.text.heading,
  },
  bookedWhen: {
    ...text.caption,
    color: color.text.muted,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: color.surface.subtle,
  },
  badgeLabel: {
    ...text.sectionLabel,
    color: color.brand.primary,
  },
  empty: {
    ...text.bodyDefault,
    color: color.text.muted,
    textAlign: 'center',
    marginTop: space[6],
  },
});

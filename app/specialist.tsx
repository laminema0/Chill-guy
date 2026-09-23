// Specialist profile and time slots, from Figma "11 · Therapist — profile & slots" (node 2017:1628).
// Prototype: booking opens "My sessions"; nothing is sent anywhere.
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { BackButton, Button, Screen } from '../components';
import { ClockIcon, StarOutlineIcon } from '../components/icons/MoreIcons';
import { findSpecialist } from '../lib/specialists';
import { color, radius, space, text } from '../theme/tokens';

const days = [
  { day: 'Mon', date: 8 },
  { day: 'Tue', date: 9 },
  { day: 'Wed', date: 10 },
  { day: 'Thu', date: 11 },
  { day: 'Fri', date: 12 },
];
const times = ['09:00', '10:30', '13:00', '15:30', '17:00'];

export default function SpecialistScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const s = findSpecialist(id);
  const [day, setDay] = useState(2);
  const [time, setTime] = useState('10:30');
  const surname = s.name.split(' ').slice(-1)[0];
  const title = s.name.startsWith('Dr.') ? `Dr. ${surname}` : s.name.split(' ')[0];

  return (
    <Screen gap={space[4]}>
      <BackButton />
      <View style={styles.person}>
        <Image source={s.photo} style={styles.photo} />
        <Text style={styles.name}>{s.name}</Text>
        <Text style={styles.role}>{s.role}</Text>
      </View>

      <View style={styles.facts}>
        <View style={styles.fact}>
          <StarOutlineIcon />
          <Text style={styles.factLabel}>{s.rating}</Text>
        </View>
        <View style={styles.fact}>
          <ClockIcon />
          <Text style={styles.factLabel}>1:1 · 50 min</Text>
        </View>
        <View style={styles.fact}>
          <Text style={styles.factLabel}>€ {s.price}/hr</Text>
        </View>
      </View>

      <Text style={styles.about}>
        {title} {s.about.replace(/\.$/, '')} through CBT and reappraisal work.
      </Text>

      <Text style={styles.section}>Pick a day</Text>
      <View style={styles.days}>
        {days.map((d, i) => {
          const on = i === day;
          return (
            <Pressable key={d.date} onPress={() => setDay(i)} style={[styles.day, on && styles.dayOn]}>
              <Text style={[styles.dayName, on && { color: color.extra.tealSoft }]}>{d.day}</Text>
              <Text style={[styles.dayDate, on && { color: color.text.onBrand }]}>{d.date}</Text>
              <Text style={[styles.dayMonth, on && { color: color.extra.tealSoft }]}>May</Text>
            </Pressable>
          );
        })}
        <View style={[styles.day, styles.more]}>
          <Text style={styles.dayName}>More</Text>
        </View>
      </View>

      <Text style={styles.section}>Available times</Text>
      <View style={styles.times}>
        {times.map((t) => (
          <Pressable key={t} onPress={() => setTime(t)} style={[styles.time, t === time && styles.timeOn]}>
            <Text style={[styles.timeLabel, t === time && { color: color.brand.primary }]}>{t}</Text>
          </Pressable>
        ))}
      </View>

      <Button
        large
        style={styles.book}
        label={`Book ${days[day].day} ${days[day].date}th of May · ${time} — €${s.price}`}
        onPress={() => router.push('/sessions')}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  person: {
    alignItems: 'center',
    gap: space[2],
  },
  photo: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  name: {
    ...text.profileName,
    color: color.text.heading,
  },
  role: {
    ...text.rowBody,
    color: color.text.muted,
  },
  facts: {
    flexDirection: 'row',
    gap: space[2],
    marginTop: space[6],
  },
  fact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: space[2],
    borderRadius: radius.quickLink,
    backgroundColor: color.surface.subtle,
  },
  factLabel: {
    ...text.labelDefault,
    color: color.text.heading,
  },
  about: {
    ...text.bodyDefault,
    color: color.text.body,
  },
  section: {
    ...text.rowTitle,
    color: color.text.body,
  },
  days: {
    flexDirection: 'row',
    gap: space[2],
    marginTop: -space[1],
  },
  day: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: space[1],
    paddingHorizontal: space[3],
    paddingVertical: 10,
    borderRadius: radius.quickLink,
    borderWidth: 1.5,
    borderColor: color.border.default,
    backgroundColor: color.surface.default,
  },
  dayOn: {
    borderColor: color.brand.primary,
    backgroundColor: color.brand.primary,
  },
  more: {
    width: 43,
    paddingHorizontal: 0,
  },
  dayName: {
    ...text.overline,
    color: color.text.muted,
  },
  dayDate: {
    ...text.personName,
    color: color.text.heading,
  },
  dayMonth: {
    ...text.tiny,
    color: color.text.muted,
  },
  times: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: -space[1],
  },
  time: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: radius.quickLink,
    borderWidth: 1.5,
    borderColor: color.border.default,
    backgroundColor: color.surface.default,
  },
  timeOn: {
    borderWidth: 2,
    borderColor: color.brand.primary,
    backgroundColor: color.surface.subtle,
  },
  timeLabel: {
    ...text.bodyEmphasis,
    color: color.text.body,
  },
  book: {
    marginTop: space[6],
  },
});

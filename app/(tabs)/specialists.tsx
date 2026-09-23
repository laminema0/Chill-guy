// Specialists tab, from Figma "10 · Therapist booking — list" (node 2017:1574).
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';

import { Screen, SearchIcon } from '../../components';
import { StarOutlineIcon } from '../../components/icons/MoreIcons';
import { specialists } from '../../lib/specialists';
import { color, radius, space, text } from '../../theme/tokens';

const filters = ['All', 'Psychologists', 'Coaches'] as const;

export default function SpecialistsScreen() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All');
  const [query, setQuery] = useState('');

  const shown = specialists.filter(
    (s) =>
      (filter === 'All' || s.kind === filter) &&
      `${s.name} ${s.role}`.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <Screen gap={space[4]}>
      <Text style={styles.title}>Talk to a human</Text>
      <View style={styles.search}>
        <SearchIcon />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search specialists"
          placeholderTextColor={color.extra.placeholder}
          style={styles.searchInput}
        />
      </View>
      <View style={styles.filters}>
        {filters.map((f) => (
          <Pressable key={f} onPress={() => setFilter(f)} style={[styles.filter, filter === f && styles.filterOn]}>
            <Text style={[styles.filterLabel, filter === f && { color: color.text.onBrand }]}>{f}</Text>
          </Pressable>
        ))}
      </View>

      {shown.map((s) => {
        const open = () => router.push({ pathname: '/specialist', params: { id: s.id } });
        return (
          <Pressable key={s.id} style={styles.card} onPress={open}>
            <View style={styles.person}>
              <Image source={s.photo} style={styles.photo} />
              <View style={styles.personText}>
                <Text style={styles.name}>{s.name}</Text>
                <Text style={styles.role}>{s.role}</Text>
              </View>
            </View>
            <View style={styles.rating}>
              <StarOutlineIcon />
              <Text style={styles.score}>{s.rating}</Text>
              <Text style={styles.count}>· {s.ratings}</Text>
            </View>
            <Text style={styles.about}>{s.about}</Text>
            <View style={styles.bottom}>
              <Text style={styles.price}>€{s.price} / hour</Text>
              <Pressable style={styles.book} onPress={open}>
                <Text style={styles.bookLabel}>Book</Text>
              </Pressable>
            </View>
          </Pressable>
        );
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    ...text.headerTitle,
    color: color.text.heading,
    marginTop: space[3],
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
  filters: {
    flexDirection: 'row',
    gap: space[2],
  },
  filter: {
    paddingHorizontal: 14,
    paddingVertical: space[2],
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: color.border.default,
    backgroundColor: color.surface.default,
  },
  filterOn: {
    borderColor: color.brand.primary,
    backgroundColor: color.brand.primary,
  },
  filterLabel: {
    ...text.labelDefault,
    color: color.text.body,
  },
  card: {
    padding: space[4],
    gap: 10,
    borderRadius: radius.lg,
    backgroundColor: color.surface.default,
  },
  person: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[3],
  },
  photo: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  personText: {
    flex: 1,
    gap: 2,
  },
  name: {
    ...text.personName,
    color: color.text.heading,
  },
  role: {
    ...text.caption,
    color: color.text.muted,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  score: {
    ...text.bodyEmphasis,
    color: color.text.heading,
  },
  count: {
    ...text.caption,
    color: color.text.muted,
  },
  about: {
    ...text.rowBody,
    color: color.text.body,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    ...text.bodyEmphasis,
    color: color.brand.primary,
  },
  book: {
    paddingHorizontal: 20,
    paddingVertical: 9,
    borderRadius: radius.md,
    backgroundColor: color.brand.primary,
  },
  bookLabel: {
    ...text.labelDefault,
    color: color.text.onBrand,
  },
});

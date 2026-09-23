// My Plan, from Figma "V2 — Plan & Tools" (node 2010:3625).
// Prototype: shows the example plans from Figma. Milestone 6 makes plans real.
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import { BackButton, LinkCard, Screen, Tag } from '../components';
import { color, radius, space, text } from '../theme/tokens';

const plans = [
  { when: 'family criticizes my choices', then: '4-7-8 breathing · 60s', whenTone: 'solid', thenTone: 'brand' },
  { when: 'heart-rate spike at work', then: 'step away + Chill Guy chat', whenTone: 'solidSoft', thenTone: 'softHover' },
] as const;

export default function PlanScreen() {
  return (
    <Screen gap={14}>
      <BackButton />
      <Text style={styles.title}>My Plan</Text>
      <Text style={styles.intro}>Decided calmly, ready instantly — on phone and watch.</Text>

      {plans.map((plan) => (
        <View key={plan.when} style={styles.planCard}>
          <View style={styles.planRow}>
            <Tag label="WHEN" tone={plan.whenTone} />
            <Text style={styles.planText}>{plan.when}</Text>
          </View>
          <View style={styles.planRow}>
            <Tag label="THEN" tone={plan.thenTone} />
            <Text style={styles.planText}>{plan.then}</Text>
          </View>
        </View>
      ))}

      <Pressable style={styles.newPlan} onPress={() => router.push('/story')}>
        <Text style={styles.newPlanLabel}>+  New plan from My Story</Text>
      </Pressable>

      <LinkCard
        title="Talk to a human"
        subtitle="Book a session · bring your logs with consent"
        onPress={() => router.navigate('/specialists')}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    ...text.screenTitle,
    color: color.text.heading,
  },
  intro: {
    ...text.bodyDefault,
    color: color.text.muted,
  },
  planCard: {
    backgroundColor: color.surface.default,
    borderRadius: radius.card,
    paddingHorizontal: space[4],
    paddingVertical: 14,
    gap: 7,
  },
  planRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[2],
  },
  planText: {
    ...text.bodyEmphasis,
    color: color.text.body,
    flex: 1,
  },
  newPlan: {
    alignItems: 'center',
    paddingVertical: 11,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: color.brand.primary,
  },
  newPlanLabel: {
    ...text.bodyEmphasis,
    color: color.brand.primary,
  },
});

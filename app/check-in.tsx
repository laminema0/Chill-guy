// Check-in, from Figma "V2 — Check-in (+ tab)" (node 2011:3578).
// Prototype: choices work on screen; Milestone 5 saves them to the database.
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import { BackButton, Button, Chip, IntensitySlider, Screen } from '../components';
import { color, radius, space, text } from '../theme/tokens';

const feelings = ['Dismissed', 'Treated unfairly', 'Blocked', 'Disrespected', 'Ignored', 'Overwhelmed', 'Betrayed', 'Powerless'];
const bodyAreas = ['Chest', 'Jaw', 'Fists', 'Stomach', 'Head'];

export default function CheckInScreen() {
  const [intensity, setIntensity] = useState(7);
  const [feeling, setFeeling] = useState<string | null>('Treated unfairly');
  const [area, setArea] = useState<string | null>('Jaw');

  return (
    <Screen gap={18}>
      <BackButton />
      <Text style={styles.title}>What’s underneath?</Text>
      <Text style={styles.intro}>Anger rarely travels alone. Naming it precisely helps you regulate it.</Text>

      <Text style={styles.question}>How strong is it?</Text>
      <IntensitySlider value={intensity} onChange={setIntensity} />

      <Text style={styles.question}>Pick what fits best</Text>
      <View style={styles.chips}>
        {feelings.map((f) => (
          <Chip key={f} variant="outlined" label={f} selected={feeling === f} onPress={() => setFeeling(feeling === f ? null : f)} />
        ))}
      </View>

      <Text style={styles.question}>Where do you feel it?</Text>
      <View style={styles.chips}>
        {bodyAreas.map((a) => (
          <Chip
            key={a}
            variant="outlined"
            label={a}
            selectedColor={color.brand.hover}
            selected={area === a}
            onPress={() => setArea(area === a ? null : a)}
          />
        ))}
      </View>

      <View style={styles.note}>
        <Text style={styles.noteText}>This check-in feeds straight into My Story — that’s how your pattern is built.</Text>
      </View>

      <Button large label="Save" onPress={() => router.back()} />
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
  question: {
    ...text.question,
    color: color.text.body,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  note: {
    backgroundColor: color.surface.subtle,
    borderRadius: radius.card,
    paddingHorizontal: space[4],
    paddingVertical: space[3],
  },
  noteText: {
    ...text.rowBody,
    color: color.text.heading,
  },
});

// Setup step 1, from Figma "3 · Identity — name & birth date" (node 2016:1593).
import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { router } from 'expo-router';

import { BackButton, Button, Screen } from '../../components';
import { FormField, StepBar } from '../../components/Form';
import { session } from '../../lib/session';
import { color, text } from '../../theme/tokens';

export default function IdentityScreen() {
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [birth, setBirth] = useState('');

  const next = () => {
    if (first.trim()) session.name = first.trim();
    router.push('/setup/verify');
  };

  return (
    <Screen gap={20}>
      <BackButton />
      <StepBar step={1} />
      <Text style={styles.title}>Tell us your name</Text>
      <Text style={styles.subtitle}>So Chill Guy knows what to call you.</Text>
      <FormField label="First name" placeholder="Amin" value={first} onChangeText={setFirst} />
      <FormField label="Last name" placeholder="Ranjbar" value={last} onChangeText={setLast} />
      <FormField label="Date of birth" placeholder="12 · 04 · 1996" value={birth} onChangeText={setBirth} />
      <Button label="Continue" onPress={next} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    ...text.introTitle,
    color: color.text.heading,
  },
  subtitle: {
    ...text.lead,
    color: color.text.muted,
  },
});

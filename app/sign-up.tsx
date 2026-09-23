// Sign up, from Figma "1 · Sign up" (node 2015:1574).
// Prototype: no account is created (V1 keeps everything on the phone); it moves on to setup.
import { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import { Button, Screen } from '../components';
import { FormField, SocialSignIn, TextLink } from '../components/Form';
import { color, space, text } from '../theme/tokens';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const next = () => router.push('/setup/identity');

  return (
    <Screen gap={18} contentStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Let’s Chill{'\n'}You down!</Text>
        <Image source={require('../assets/images/chill-guy-mascot.png')} style={styles.mascot} />
      </View>
      <Text style={styles.subtitle}>Create your account</Text>
      <FormField label="Email address" placeholder="you@email.com" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <FormField label="Password" placeholder="••••••••" value={password} onChangeText={setPassword} secureTextEntry />
      <FormField label="Confirm password" placeholder="••••••••" value={confirm} onChangeText={setConfirm} secureTextEntry />
      <Button label="Create account" onPress={next} />
      <SocialSignIn onPress={next} />
      <TextLink label="Already have an account? Sign in" onPress={() => router.push('/sign-in')} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 72,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  title: {
    ...text.authTitle,
    color: color.text.heading,
  },
  mascot: {
    width: 42,
    height: 48,
    marginTop: space[5],
    marginRight: space[1],
  },
  subtitle: {
    ...text.lead,
    color: color.text.muted,
  },
});

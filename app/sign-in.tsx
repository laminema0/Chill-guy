// Sign in, from Figma "2 · Sign in" (node 2016:1574).
// Prototype: "Sign in" goes straight to Home.
import { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import { Button, Screen } from '../components';
import { FormField, SocialSignIn, TextLink } from '../components/Form';
import { session } from '../lib/session';
import { color, space, text } from '../theme/tokens';

export default function SignInScreen() {
  const [email, setEmail] = useState('amin@email.com');
  const [password, setPassword] = useState('password');

  const enter = () => {
    session.onboarded = true;
    router.replace('/');
  };

  return (
    <Screen gap={18} contentStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome back</Text>
        <Image source={require('../assets/images/chill-guy-mascot.png')} style={styles.mascot} />
      </View>
      <Text style={styles.subtitle}>Chill Guy missed you</Text>
      <FormField label="Email address" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <FormField label="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <View style={styles.forgot}>
        <TextLink label="Forgot password?" />
      </View>
      <Button large label="Sign in" onPress={enter} />
      <SocialSignIn onPress={enter} />
      <TextLink label="New here? Create an account" onPress={() => router.replace('/sign-up')} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 110,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  title: {
    ...text.authTitle,
    color: color.text.heading,
  },
  mascot: {
    width: 42,
    height: 48,
    marginRight: space[1],
    marginBottom: space[2],
  },
  subtitle: {
    ...text.lead,
    color: color.text.muted,
  },
  forgot: {
    alignItems: 'flex-end',
  },
});

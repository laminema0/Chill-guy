// Setup step 2, from Figma "4 · Phone verification" (node 2016:1616).
// Prototype: any 4 digits are accepted.
import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';

import { BackButton, Button, Screen } from '../../components';
import { StepBar } from '../../components/Form';
import { color, radius, text } from '../../theme/tokens';

export default function VerifyScreen() {
  const [code, setCode] = useState('');
  const [seconds, setSeconds] = useState(24);
  const input = useRef<TextInput>(null);

  // "Resend code in 0:24" counts down once a second.
  useEffect(() => {
    if (seconds <= 0) return;
    const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds]);

  return (
    <Screen gap={20}>
      <BackButton />
      <StepBar step={2} />
      <Text style={styles.title}>Verify your number</Text>
      <Text style={styles.subtitle}>We sent a 4-digit code to +49 176 •• •• 23.</Text>

      {/* Four boxes; one hidden text field underneath receives the typing. */}
      <Pressable style={styles.boxes} onPress={() => input.current?.focus()}>
        {[0, 1, 2, 3].map((i) => (
          <View key={i} style={[styles.box, i < code.length && styles.boxFilled]}>
            <Text style={styles.digit}>{code[i] ?? ' '}</Text>
          </View>
        ))}
        <TextInput
          ref={input}
          value={code}
          onChangeText={(v) => setCode(v.replace(/\D/g, '').slice(0, 4))}
          keyboardType="number-pad"
          maxLength={4}
          style={styles.hiddenInput}
          autoFocus
        />
      </Pressable>

      <Text style={styles.resend} onPress={() => seconds === 0 && setSeconds(24)}>
        {seconds > 0 ? `Resend code in 0:${String(seconds).padStart(2, '0')}` : 'Resend code'}
      </Text>
      <Button label="Verify" onPress={() => router.push('/setup/vault')} />
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
  boxes: {
    flexDirection: 'row',
    gap: 12,
  },
  box: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: radius.card,
    borderWidth: 1.5,
    borderColor: color.border.default,
    backgroundColor: color.surface.default,
  },
  boxFilled: {
    borderWidth: 2,
    borderColor: color.brand.primary,
  },
  digit: {
    ...text.screenTitle,
    color: color.text.heading,
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 1,
    height: 1,
  },
  resend: {
    ...text.bodyDefault,
    color: color.text.muted,
  },
});

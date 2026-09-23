// Pieces shared by the sign-up and setup screens (Figma Stage 2).
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';

import { color, radius, space, text } from '../theme/tokens';

/** Label above a large text field. The border turns teal while typing or once filled. */
export function FormField({ label, value, style, onFocus, onBlur, ...rest }: TextInputProps & { label: string }) {
  const [focused, setFocused] = useState(false);
  const active = focused || Boolean(value);
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        placeholderTextColor={color.extra.placeholder}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
        style={[styles.input, active && styles.inputActive, style]}
        {...rest}
      />
    </View>
  );
}

/** The 3-part progress bar at the top of the setup screens. */
export function StepBar({ step, total = 3 }: { step: number; total?: number }) {
  return (
    <View style={styles.steps}>
      {Array.from({ length: total }, (_, i) => (
        <View key={i} style={[styles.step, i < step && styles.stepDone]} />
      ))}
    </View>
  );
}

/** "—— or ——" divider plus the Google and Apple buttons. */
export function SocialSignIn({ onPress }: { onPress?: () => void }) {
  return (
    <>
      <View style={styles.orRow}>
        <View style={styles.orLine} />
        <Text style={styles.orText}>or</Text>
        <View style={styles.orLine} />
      </View>
      <View style={styles.socialRow}>
        {['Google', 'Apple'].map((provider) => (
          <Pressable key={provider} style={styles.socialButton} onPress={onPress}>
            <Text style={styles.socialLabel}>{provider}</Text>
          </Pressable>
        ))}
      </View>
    </>
  );
}

/** Centered teal text link, e.g. "Already have an account? Sign in". */
export function TextLink({ label, onPress, muted = false }: { label: string; onPress?: () => void; muted?: boolean }) {
  return (
    <Pressable onPress={onPress} style={styles.link} hitSlop={8}>
      <Text style={[styles.linkLabel, muted && { color: color.text.muted }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  field: {
    gap: 6,
  },
  label: {
    ...text.labelDefault,
    color: color.text.muted,
  },
  input: {
    ...text.bodyLarge,
    lineHeight: undefined,
    color: color.text.body,
    paddingHorizontal: space[4],
    paddingVertical: 15,
    borderRadius: radius.card,
    borderWidth: 1.5,
    borderColor: color.border.default,
    backgroundColor: color.surface.default,
  },
  inputActive: {
    borderWidth: 2,
    borderColor: color.brand.primary,
  },
  steps: {
    flexDirection: 'row',
    gap: 6,
  },
  step: {
    flex: 1,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: color.surface.subtle,
  },
  stepDone: {
    backgroundColor: color.brand.primary,
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  orLine: {
    width: 120,
    height: 1,
    backgroundColor: color.border.default,
  },
  orText: {
    ...text.rowBody,
    color: color.text.muted,
  },
  socialRow: {
    flexDirection: 'row',
    gap: space[3],
  },
  socialButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 13,
    borderRadius: radius.card,
    borderWidth: 1.5,
    borderColor: color.border.default,
    backgroundColor: color.surface.default,
  },
  socialLabel: {
    ...text.rowTitle,
    color: color.text.body,
  },
  link: {
    alignItems: 'center',
  },
  linkLabel: {
    ...text.bodyEmphasis,
    color: color.brand.primary,
  },
});

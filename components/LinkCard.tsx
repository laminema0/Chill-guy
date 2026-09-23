// Tappable card with a title, a short line and an arrow, e.g. "Chapter 3 · Preparing",
// "Cool-Down Revisit ready", "Talk to a human".
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { color, radius, space, text } from '../theme/tokens';

type LinkCardProps = {
  title: string;
  subtitle?: string;
  tone?: 'subtle' | 'danger';
  leading?: ReactNode;
  onPress?: () => void;
};

export function LinkCard({ title, subtitle, tone = 'subtle', leading, onPress }: LinkCardProps) {
  const isDanger = tone === 'danger';
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.card, isDanger ? styles.danger : styles.subtle, pressed && styles.pressed]}
    >
      {leading}
      <View style={styles.texts}>
        <Text style={[text.rowTitle, { color: isDanger ? color.feedback.danger : color.text.heading }]}>{title}</Text>
        {subtitle ? <Text style={[text.caption, styles.subtitle]}>{subtitle}</Text> : null}
      </View>
      <Text style={[text.arrow, { color: isDanger ? color.feedback.danger : color.brand.primary }]}>→</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[3],
    paddingHorizontal: space[4],
    paddingVertical: 14,
    borderRadius: radius.card,
  },
  subtle: {
    backgroundColor: color.surface.subtle,
  },
  danger: {
    backgroundColor: color.extra.dangerSubtle,
  },
  pressed: {
    opacity: 0.85,
  },
  texts: {
    flex: 1,
    gap: 2,
  },
  subtitle: {
    color: color.text.muted,
  },
});

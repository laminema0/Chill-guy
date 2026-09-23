// Small rounded label, e.g. "REVISITED · 9 → 4", "Revisit ready", "WHEN", "THEN".
import { StyleSheet, Text, View } from 'react-native';

import { color, radius, text } from '../theme/tokens';

type TagProps = {
  label: string;
  tone?: 'brand' | 'danger' | 'solid' | 'solidSoft' | 'softHover';
};

const tones = {
  brand: { background: color.surface.subtle, text: color.brand.primary }, // light teal
  danger: { background: color.extra.dangerSubtle, text: color.feedback.danger }, // light red
  solid: { background: color.brand.primary, text: color.text.onBrand }, // WHEN, first plan
  solidSoft: { background: color.brand.hover, text: color.text.onBrand }, // WHEN, second plan
  softHover: { background: color.surface.subtle, text: color.brand.hover }, // THEN, second plan
};

export function Tag({ label, tone = 'brand' }: TagProps) {
  const t = tones[tone];
  return (
    <View style={[styles.tag, { backgroundColor: t.background }]}>
      <Text style={[text.tag, { color: t.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.sm,
  },
});

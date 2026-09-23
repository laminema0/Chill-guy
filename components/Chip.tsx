// Chip from Figma (node 2187:1618). Emotion / filter tag, tap to select.
// "soft" is the Design System chip (Home). "outlined" is the bigger white chip on Check-in.
import { Pressable, StyleSheet, Text } from 'react-native';

import { color, radius, size, space, text } from '../theme/tokens';

type ChipProps = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  variant?: 'soft' | 'outlined';
  /** Background when selected (Check-in uses a lighter teal for body areas). */
  selectedColor?: string;
};

export function Chip({ label, selected = false, onPress, variant = 'soft', selectedColor = color.brand.primary }: ChipProps) {
  const outlined = variant === 'outlined';
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={[
        outlined ? styles.outlined : styles.soft,
        selected && { backgroundColor: selectedColor, borderColor: selectedColor },
      ]}
    >
      <Text style={[outlined ? text.chipLarge : text.labelDefault, { color: selected ? color.text.onBrand : color.text.body }]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  soft: {
    height: size.chip,
    paddingHorizontal: 13,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    backgroundColor: color.surface.muted,
  },
  outlined: {
    paddingHorizontal: space[4],
    paddingVertical: 9,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderColor: color.border.default,
    alignSelf: 'flex-start',
    backgroundColor: color.surface.default,
  },
});

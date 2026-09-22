// Chip from Figma (node 2187:1618). Emotion / filter tag, tap to select.
import { Pressable, StyleSheet, Text } from 'react-native';

import { color, radius, size, space, text } from '../theme/tokens';

type ChipProps = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
};

export function Chip({ label, selected = false, onPress }: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={[styles.chip, selected && styles.chipSelected]}
    >
      <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    height: size.chip,
    paddingHorizontal: space[3],
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    backgroundColor: color.surface.muted,
  },
  chipSelected: {
    backgroundColor: color.brand.primary,
  },
  label: {
    ...text.labelDefault,
    color: color.text.body,
  },
  labelSelected: {
    color: color.text.onBrand,
  },
});

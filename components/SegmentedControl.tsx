// Two-option switch, e.g. "Pattern | Logs" on My Story.
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { color, radius, space, text } from '../theme/tokens';

type SegmentedControlProps<T extends string> = {
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
};

export function SegmentedControl<T extends string>({ options, value, onChange }: SegmentedControlProps<T>) {
  return (
    <View style={styles.track} accessibilityRole="tablist">
      {options.map((option) => {
        const selected = option === value;
        return (
          <Pressable
            key={option}
            onPress={() => onChange(option)}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            style={[styles.segment, selected && styles.segmentSelected]}
          >
            <Text style={[text.chipLarge, { color: selected ? color.brand.primary : color.text.muted }]}>{option}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    gap: space[2],
    padding: 5,
    borderRadius: radius.pill,
    backgroundColor: color.surface.subtle,
  },
  segment: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 9,
    borderRadius: radius.lg,
  },
  segmentSelected: {
    backgroundColor: color.surface.default,
  },
});

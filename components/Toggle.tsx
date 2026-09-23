// On/off switch from the Settings screen (46x28, teal when on, light teal when off).
import { Pressable, StyleSheet, View } from 'react-native';

import { color } from '../theme/tokens';

type ToggleProps = {
  value: boolean;
  onChange: (value: boolean) => void;
  label: string;
};

export function Toggle({ value, onChange, label }: ToggleProps) {
  return (
    <Pressable
      onPress={() => onChange(!value)}
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      accessibilityLabel={label}
      hitSlop={8}
      style={[styles.track, { backgroundColor: value ? color.brand.primary : color.surface.subtle }]}
    >
      <View style={[styles.knob, value ? styles.knobOn : styles.knobOff]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: 46,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
  },
  knob: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: color.surface.default,
  },
  knobOn: {
    marginLeft: 21,
  },
  knobOff: {
    marginLeft: 3,
  },
});

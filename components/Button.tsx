// Button from Figma (node 2187:1613).
// Primary = key action (h52, pill). Secondary = alternative (h44, bordered). Ghost = tertiary/inline.
// Inverse = white button on a teal background (Breathe screen).
// `large` uses the bigger 17pt label the Final Journey screens use for their main action.
// The "Pressed" state happens automatically while a finger is on the button.
import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';

import { color, radius, size, space, text } from '../theme/tokens';

type ButtonType = 'primary' | 'secondary' | 'ghost' | 'inverse';

type ButtonProps = {
  label: string;
  onPress?: () => void;
  type?: ButtonType;
  large?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Button({ label, onPress, type = 'primary', large = false, disabled = false, style }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        styles.base,
        styles[type],
        pressed && pressedStyles[type],
        disabled && disabledStyles[type],
        style,
      ]}
    >
      <Text
        style={[
          large ? text.primaryAction : text.buttonLabel,
          labelStyles[type],
          disabled && type !== 'primary' && styles.labelDisabled,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space[2],
    paddingHorizontal: space[5],
  },
  primary: {
    height: size.controlLg,
    borderRadius: radius.pill,
    backgroundColor: color.brand.primary,
  },
  secondary: {
    height: size.controlMd,
    borderRadius: radius.md,
    backgroundColor: color.surface.default,
    borderWidth: 1,
    borderColor: color.border.default,
  },
  ghost: {
    height: size.controlMd,
    borderRadius: radius.md,
  },
  inverse: {
    height: size.controlLg,
    borderRadius: radius.pill,
    backgroundColor: color.surface.default,
  },
  labelDisabled: {
    color: color.text.disabled,
  },
});

const labelStyles = StyleSheet.create({
  primary: { color: color.text.onBrand },
  secondary: { color: color.text.body },
  ghost: { color: color.brand.primary },
  inverse: { color: color.brand.primary },
});

const pressedStyles = StyleSheet.create({
  primary: { backgroundColor: color.brand.active },
  secondary: { borderColor: color.border.strong },
  ghost: {},
  inverse: { backgroundColor: color.surface.subtle },
});

const disabledStyles = StyleSheet.create({
  primary: { backgroundColor: color.text.disabled },
  secondary: { opacity: 0.6 },
  ghost: { opacity: 0.6 },
  inverse: { opacity: 0.6 },
});

// Input from Figma (node 2187:1627). Text field, h49.
// States: Default (empty, placeholder), Filled, Focus (while typing), Error.
import { useState } from 'react';
import { StyleSheet, TextInput, type TextInputProps } from 'react-native';

import { color, radius, size, space, text } from '../theme/tokens';

type InputProps = TextInputProps & {
  error?: boolean;
};

export function Input({ error = false, style, onFocus, onBlur, ...rest }: InputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <TextInput
      placeholderTextColor={color.text.muted}
      onFocus={(e) => {
        setFocused(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocused(false);
        onBlur?.(e);
      }}
      style={[styles.input, focused && styles.focus, error && styles.error, style]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    ...text.bodyDefault,
    lineHeight: undefined, // lets the text sit centred in the field
    height: size.input,
    paddingHorizontal: space[4],
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: color.border.default,
    backgroundColor: color.surface.default,
    color: color.text.body,
  },
  focus: {
    borderWidth: 1.5,
    borderColor: color.brand.primary,
  },
  error: {
    borderColor: color.feedback.danger,
    color: color.feedback.danger,
  },
});

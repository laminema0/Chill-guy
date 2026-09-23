// The small red "Help" pill in the top-right corner of every screen.
// One tap opens "Get help now" (hard rule: reachable in one tap from everywhere).
import { Pressable, StyleSheet, Text } from 'react-native';
import { router } from 'expo-router';

import { color, size, space, text } from '../theme/tokens';
import { PhoneIcon } from './icons/MoreIcons';

export function HelpPill() {
  return (
    <Pressable
      onPress={() => router.push('/get-help')}
      accessibilityRole="button"
      accessibilityLabel="Get help now"
      hitSlop={8}
      style={styles.pill}
    >
      <PhoneIcon color={color.feedback.danger} size={13} />
      <Text style={styles.label}>Help</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: size.chip,
    paddingHorizontal: space[3],
    borderRadius: size.chip / 2,
    backgroundColor: color.extra.dangerSubtle,
  },
  label: {
    ...text.labelDefault,
    color: color.feedback.danger,
  },
});

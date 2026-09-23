// The "‹" back arrow at the top of inner screens.
import { Pressable, StyleSheet, Text } from 'react-native';
import { router } from 'expo-router';

import { color, text } from '../theme/tokens';

export function BackButton({ onPress }: { onPress?: () => void }) {
  const goBack = () => (router.canGoBack() ? router.back() : router.replace('/'));
  return (
    <Pressable
      onPress={onPress ?? goBack}
      accessibilityRole="button"
      accessibilityLabel="Back"
      hitSlop={12}
      style={styles.button}
    >
      <Text style={styles.arrow}>‹</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
  },
  arrow: {
    ...text.back,
    color: color.brand.primary,
  },
});

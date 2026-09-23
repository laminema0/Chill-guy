// Speech bubbles used in the intros and the Chill Guy chat.
// "guy" = Chill Guy speaking (white, left, sharp top-left corner).
// "me"  = the user speaking (teal, right, sharp top-right corner).
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { color, text } from '../theme/tokens';

type ChatBubbleProps = {
  message: string;
  from?: 'guy' | 'me';
  /** Bubble on a teal background (Breathing intro). */
  onBrand?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function ChatBubble({ message, from = 'guy', onBrand = false, style }: ChatBubbleProps) {
  if (from === 'me') {
    return (
      <View style={[styles.me, style]}>
        <Text style={styles.meText}>{message}</Text>
      </View>
    );
  }
  return (
    <View style={[styles.guy, onBrand && styles.guyOnBrand, style]}>
      <Text style={[styles.guyText, onBrand && styles.guyTextOnBrand]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  guy: {
    alignSelf: 'flex-start',
    maxWidth: '90%',
    backgroundColor: color.surface.default,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 18,
    borderTopLeftRadius: 4,
  },
  guyOnBrand: {
    backgroundColor: color.extra.bubbleOnBrand,
  },
  guyText: {
    ...text.bubble,
    color: color.text.heading,
  },
  guyTextOnBrand: {
    ...text.rowTitle,
    color: color.text.onBrand,
  },
  me: {
    alignSelf: 'flex-end',
    maxWidth: '78%',
    backgroundColor: color.brand.hover,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderTopRightRadius: 4,
  },
  meText: {
    ...text.bodyDefault,
    lineHeight: 17,
    color: color.text.onBrand,
  },
});

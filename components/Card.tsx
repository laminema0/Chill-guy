// Card from Figma (node 2188:1583). Container for logs, plans and insights.
// Default has a thin border; Elevated has the soft card shadow instead.
// Pass `title` and `body` for the standard layout, or your own `children`.
import type { ReactNode } from 'react';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { color, elevation, radius, space, text } from '../theme/tokens';

type CardProps = {
  title?: string;
  body?: string;
  children?: ReactNode;
  type?: 'default' | 'elevated';
  style?: StyleProp<ViewStyle>;
};

export function Card({ title, body, children, type = 'default', style }: CardProps) {
  return (
    <View style={[styles.card, type === 'elevated' ? styles.elevated : styles.bordered, style]}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      {body ? <Text style={styles.body}>{body}</Text> : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: color.surface.default,
    borderRadius: radius.lg,
    padding: space[4],
    gap: space[2],
  },
  bordered: {
    borderWidth: 1,
    borderColor: color.border.default,
  },
  elevated: {
    ...elevation.card,
  },
  title: {
    ...text.cardTitle,
    color: color.text.heading,
  },
  body: {
    ...text.cardBody,
    color: color.text.muted,
  },
});

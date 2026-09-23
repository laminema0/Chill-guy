// Page wrapper used by every screen: safe-area top padding, 24pt side padding,
// scrolling content, and room at the bottom so nothing hides behind the nav bar.
import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { color, layout, space } from '../theme/tokens';

type ScreenProps = {
  children: ReactNode;
  /** Gap between the blocks on the page (Figma uses 14–18). */
  gap?: number;
  background?: string;
  scroll?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
};

export function Screen({ children, gap = space[4], background = color.surface.page, scroll = true, contentStyle }: ScreenProps) {
  const insets = useSafeAreaInsets();
  const padding = {
    paddingTop: insets.top + space[2],
    paddingHorizontal: layout.screenPadding,
    paddingBottom: layout.navClearance + insets.bottom,
    gap,
  };

  if (!scroll) {
    return <View style={[styles.fill, { backgroundColor: background }, padding, contentStyle]}>{children}</View>;
  }

  return (
    <ScrollView style={[styles.fill, { backgroundColor: background }]} contentContainerStyle={[padding, contentStyle]}>
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
});

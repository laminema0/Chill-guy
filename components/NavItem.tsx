// NavItem from Figma (node 2189:1606). One bottom-nav tab: icon + label.
// Active tab gets the light teal background.
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { color, radius, size, space, text } from '../theme/tokens';

type NavItemProps = {
  label: string;
  /** Draws the icon in the colour it is given. */
  renderIcon: (iconColor: string) => ReactNode;
  active?: boolean;
  onPress?: () => void;
};

export function NavItem({ label, renderIcon, active = false, onPress }: NavItemProps) {
  const tint = active ? color.brand.active : color.text.disabled;
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="tab"
      accessibilityState={{ selected: active }}
      accessibilityLabel={label}
      style={[styles.item, active && styles.itemActive]}
    >
      {renderIcon(tint)}
      <Text style={[styles.label, { color: tint }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    width: size.navItemWidth,
    height: size.navItemHeight,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    gap: space[1],
  },
  itemActive: {
    backgroundColor: color.surface.subtle,
  },
  label: {
    ...text.overline,
  },
});

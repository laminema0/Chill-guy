// NavItem from Figma (node 2189:1606), styled as it appears on the Final Journey screens:
// icon + small label; the active tab gets a soft teal highlight.
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { color, radius, space, text } from '../theme/tokens';

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
      <Text style={[active ? text.navLabelActive : text.navLabel, { color: tint }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    height: 58,
    borderRadius: radius.navItem,
    alignItems: 'center',
    justifyContent: 'center',
    gap: space[1],
  },
  itemActive: {
    backgroundColor: color.extra.navActive,
  },
});

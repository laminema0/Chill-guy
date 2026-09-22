// BottomNav from Figma (node 2189:8977): a floating white bar of NavItems,
// plus the round Chat button. The Chat button is hidden in V1 (showChat = false).
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { color, elevation, size, space, text } from '../theme/tokens';
import { ChatBubbleIcon } from './icons/NavIcons';
import { NavItem } from './NavItem';

export type BottomNavTab = {
  key: string;
  label: string;
  renderIcon: (iconColor: string) => ReactNode;
};

type BottomNavProps = {
  tabs: BottomNavTab[];
  activeKey: string;
  onSelect: (key: string) => void;
  showChat?: boolean;
  onChatPress?: () => void;
};

export function BottomNav({ tabs, activeKey, onSelect, showChat = false, onChatPress }: BottomNavProps) {
  return (
    <View style={styles.row}>
      <View style={styles.bar} accessibilityRole="tablist">
        {tabs.map((tab) => (
          <NavItem
            key={tab.key}
            label={tab.label}
            renderIcon={tab.renderIcon}
            active={tab.key === activeKey}
            onPress={() => onSelect(tab.key)}
          />
        ))}
      </View>

      {showChat ? (
        <Pressable onPress={onChatPress} accessibilityRole="button" accessibilityLabel="Chat" style={styles.fab}>
          <ChatBubbleIcon color={color.text.onBrand} dotColor={color.brand.primary} />
          <Text style={styles.fabLabel}>Chat</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space[2],
  },
  bar: {
    ...elevation.card,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[1],
    height: size.nav,
    paddingHorizontal: space[2],
    borderRadius: size.nav / 2,
    backgroundColor: color.surface.default,
  },
  fab: {
    ...elevation.card,
    width: size.nav,
    height: size.nav,
    borderRadius: size.nav / 2,
    alignItems: 'center',
    justifyContent: 'center',
    gap: space[1],
    backgroundColor: color.brand.primary,
  },
  fabLabel: {
    ...text.fabLabel,
    color: color.text.onBrand,
  },
});

// BottomNav as it appears on the Final Journey screens (e.g. node 2028:4392):
// a floating frosted bar of NavItems plus the round gradient Chat button.
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { color, elevation, radius, size, space, text } from '../theme/tokens';
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
          <ChatBubbleIcon color={color.text.onBrand} dotColor={color.brand.active} />
          <Text style={[text.navLabelActive, styles.fabLabel]}>Chat</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
    height: size.nav,
    width: '100%',
    maxWidth: 358,
    alignSelf: 'center',
  },
  bar: {
    ...elevation.navBar,
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    paddingTop: 5,
    paddingHorizontal: 5,
    borderRadius: radius.navBar,
    backgroundColor: color.extra.navBar,
  },
  fab: {
    ...elevation.fab,
    width: size.nav,
    height: size.nav,
    borderRadius: radius.navBar,
    alignItems: 'center',
    justifyContent: 'center',
    gap: space[1],
    backgroundColor: color.brand.active,
    experimental_backgroundImage: `linear-gradient(135deg, ${color.brand.active} 0%, ${color.extra.fabGradientEnd} 100%)`,
  },
  fabLabel: {
    color: color.text.onBrand,
  },
});

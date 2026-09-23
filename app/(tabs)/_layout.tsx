// The three tabs from the Figma bottom nav, plus the round Chat button.
// The nav floats above the screen content, 14pt from the bottom, like in Figma.
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { Tabs, type BottomTabBarProps } from 'expo-router/js-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomNav, BreatheIcon, HomeIcon, SpecialistsIcon, type BottomNavTab } from '../../components';
import { layout } from '../../theme/tokens';

const tabs: BottomNavTab[] = [
  { key: 'index', label: 'Home', renderIcon: (c) => <HomeIcon color={c} /> },
  { key: 'breathe', label: 'Breathe', renderIcon: (c) => <BreatheIcon color={c} /> },
  { key: 'specialists', label: 'Specialists', renderIcon: (c) => <SpecialistsIcon color={c} /> },
];

function FloatingNav({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const current = state.routes[state.index]?.name ?? 'index';
  // Heart rate is opened from Home, so Home stays highlighted there.
  const activeKey = current === 'heart' ? 'index' : current;

  return (
    <View style={[styles.navHolder, { bottom: insets.bottom + layout.navBottomGap }]} pointerEvents="box-none">
      <BottomNav
        tabs={tabs}
        activeKey={activeKey}
        onSelect={(key) => navigation.navigate(key)}
        showChat
        onChatPress={() => router.push('/chat')}
      />
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }} tabBar={(props) => <FloatingNav {...props} />}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="breathe" />
      <Tabs.Screen name="specialists" />
      <Tabs.Screen name="heart" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  navHolder: {
    position: 'absolute',
    left: layout.navSide,
    right: layout.navSide,
  },
});

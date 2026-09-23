// Web only: on a laptop or desktop browser, shows the app inside an iPhone frame at the Figma
// screen size (402 x 874), scaled as one piece to fit the window. Zooming the browser never
// stretches or squeezes the layout inside. On a phone, or in a narrow embed (the portfolio),
// the app fills the screen as usual.
import { createContext, useContext, type ReactNode } from 'react';
import { Platform, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { usePathname } from 'expo-router';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';

import { color, device, text } from '../theme/tokens';

const FramedWidth = createContext<number | null>(null);

/** Width of the app screen: the phone frame's screen on desktop web, otherwise the window. */
export function useAppWidth() {
  const window = useWindowDimensions();
  return useContext(FramedWidth) ?? window.width;
}

const insets = { top: device.statusBarHeight, bottom: device.homeIndicatorHeight, left: 0, right: 0 };

// Screens with a dark (teal) top, where the clock and battery turn white.
const lightStatusBar = ['/breathe'];

export function DeviceFrame({ children }: { children: ReactNode }) {
  const window = useWindowDimensions();
  const pathname = usePathname();
  if (Platform.OS !== 'web' || window.width < device.minWindowWidth) return <>{children}</>;

  const outerWidth = device.screenWidth + device.bezel * 2;
  const outerHeight = device.screenHeight + device.bezel * 2;
  const scale = Math.min(
    1,
    (window.height - device.windowMargin * 2) / outerHeight,
    (window.width - device.windowMargin * 2) / outerWidth,
  );

  const statusColor = lightStatusBar.includes(pathname) ? color.text.onBrand : color.text.heading;

  return (
    <View style={styles.backdrop}>
      {/* This box has the scaled size, so the phone stays centred at any zoom. */}
      <View style={{ width: outerWidth * scale, height: outerHeight * scale }}>
        <View
          style={[
            styles.phone,
            {
              width: outerWidth,
              height: outerHeight,
              left: (outerWidth * scale - outerWidth) / 2,
              top: (outerHeight * scale - outerHeight) / 2,
              transform: [{ scale }],
            },
          ]}
        >
          <View style={styles.screen}>
            <FramedWidth.Provider value={device.screenWidth}>
              <SafeAreaInsetsContext.Provider value={insets}>{children}</SafeAreaInsetsContext.Provider>
            </FramedWidth.Provider>

            {/* Status bar, Dynamic Island and home indicator, drawn on top of the app. */}
            <View style={styles.statusBar} pointerEvents="none">
              <Text style={[styles.time, { color: statusColor }]}>9:41</Text>
              <View style={[styles.battery, { borderColor: statusColor }]}>
                <View style={[styles.batteryLevel, { backgroundColor: statusColor }]} />
              </View>
            </View>
            <View style={styles.island} pointerEvents="none" />
            <View style={[styles.homeIndicator, { backgroundColor: statusColor }]} pointerEvents="none" />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: color.surface.subtle,
  },
  phone: {
    position: 'absolute',
    padding: device.bezel,
    borderRadius: device.screenRadius + device.bezel,
    backgroundColor: color.extra.deviceBezel,
    boxShadow: '0px 30px 80px 0px rgba(31, 65, 82, 0.28)',
  },
  screen: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: device.screenRadius,
    backgroundColor: color.surface.page,
  },
  statusBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: device.statusBarHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: device.statusBarPadding,
  },
  time: {
    ...text.deviceTime,
    color: color.text.heading,
  },
  battery: {
    width: 25,
    height: 12,
    padding: 1.5,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: color.text.heading,
  },
  batteryLevel: {
    flex: 1,
    borderRadius: 2,
    backgroundColor: color.text.heading,
  },
  island: {
    position: 'absolute',
    top: device.islandTop,
    alignSelf: 'center',
    width: device.islandWidth,
    height: device.islandHeight,
    borderRadius: device.islandHeight / 2,
    backgroundColor: color.extra.deviceBezel,
  },
  homeIndicator: {
    position: 'absolute',
    bottom: 8,
    alignSelf: 'center',
    width: device.homeIndicatorWidth,
    height: 5,
    borderRadius: 3,
    backgroundColor: color.text.heading,
    opacity: 0.35,
  },
});

import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { DeviceFrame } from '../components/DeviceFrame';
import { color, fontFiles } from '../theme/tokens';

// Keep the splash screen up until Rubik has loaded, so text never flashes in the wrong font.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(fontFiles);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  // (tabs) holds the screens with the bottom nav (Home, Breathe, Specialists).
  // Every other screen opens on top of them without the nav, like in Figma.
  const app = (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: color.surface.page },
        }}
      />
    </>
  );

  // On a laptop browser the app sits in an iPhone frame (components/DeviceFrame.tsx).
  return <DeviceFrame>{app}</DeviceFrame>;
}


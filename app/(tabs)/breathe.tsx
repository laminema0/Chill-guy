// Breathe, from Figma "9 · Breathing exercise" (node 2025:1598).
// Prototype: the circles are still. Milestone 4 makes them move with the breathing
// rhythm, adds haptics and keeps the screen awake.
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router, useIsFocused } from 'expo-router';

import { Button, Screen } from '../../components';
import { color, space, text } from '../../theme/tokens';

export default function BreatheScreen() {
  const focused = useIsFocused();

  return (
    <Screen background={color.brand.primary} scroll={false} gap={0}>
      {focused ? <StatusBar style="light" /> : null}

      <View style={styles.header}>
        <Text style={styles.title}>Breathe with me</Text>
        <Text style={styles.subtitle}>4-7-8 method · inhale, hold, exhale</Text>
      </View>

      <View style={styles.center}>
        <View style={[styles.ring, styles.outer]}>
          <View style={[styles.ring, styles.middle]}>
            <View style={[styles.ring, styles.inner]}>
              <Text style={styles.phase}>Inhale</Text>
              <Text style={styles.count}>4</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.actions}>
        <Button type="inverse" large label="Start · 4 cycles" onPress={() => {}} />
        <Text style={styles.calmer} onPress={() => router.navigate('/')} suppressHighlighting>
          I feel calmer now
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: space[5],
    gap: space[2],
  },
  title: {
    ...text.screenTitle,
    color: color.text.onBrand,
  },
  subtitle: {
    ...text.lead,
    color: color.extra.tealSoft,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  outer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: color.extra.breatheRingOuter,
  },
  middle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: color.extra.breatheRingMiddle,
  },
  inner: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: color.surface.default,
  },
  phase: {
    ...text.screenTitle,
    color: color.brand.primary,
  },
  count: {
    ...text.counter,
    color: color.brand.hover,
  },
  actions: {
    gap: space[5],
    alignItems: 'stretch',
  },
  calmer: {
    ...text.bodyEmphasis,
    color: color.extra.tealSoft,
    textAlign: 'center',
  },
});

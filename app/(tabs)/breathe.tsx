// Breathe, from Figma "9 · Breathing exercise" (node 2025:1598).
// 4-7-8 breathing, 4 cycles: the circles grow while you breathe in (4s), stay while you
// hold (7s) and shrink while you breathe out (8s). A soft vibration marks each change,
// and the screen stays awake while it runs. Leaving the tab stops it.
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Platform, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router, useIsFocused } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';

import { Button, Screen } from '../../components';
import { color, space, text } from '../../theme/tokens';

const PHASES = [
  { label: 'Inhale', seconds: 4, target: 1 },
  { label: 'Hold', seconds: 7, target: 1 },
  { label: 'Exhale', seconds: 8, target: 0 },
];
const CYCLES = 4;
const KEEP_AWAKE_TAG = 'breathe';
const nativeDriver = Platform.OS !== 'web';

type Status = 'idle' | 'running' | 'done';
type Position = { cycle: number; phase: number; left: number };

const buzz = (kind: 'phase' | 'done') => {
  if (Platform.OS === 'web') return;
  const vibration =
    kind === 'done'
      ? Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
      : Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  vibration.catch(() => {});
};

export default function BreatheScreen() {
  const focused = useIsFocused();
  const [status, setStatus] = useState<Status>('idle');
  const [view, setView] = useState<Position>({ cycle: 1, phase: 0, left: PHASES[0].seconds });
  const position = useRef<Position>(view);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const breath = useRef(new Animated.Value(0)).current;

  const clearTimer = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  };

  const animateTo = (target: number, seconds: number) => {
    breath.stopAnimation();
    Animated.timing(breath, {
      toValue: target,
      duration: seconds * 1000,
      easing: Easing.inOut(Easing.sin),
      useNativeDriver: nativeDriver,
    }).start();
  };

  const beginPhase = (phase: number) => {
    animateTo(PHASES[phase].target, PHASES[phase].seconds);
    buzz('phase');
  };

  const move = (next: Position) => {
    position.current = next;
    setView(next);
  };

  const finish = () => {
    clearTimer();
    animateTo(0, 0.6);
    setStatus('done');
    buzz('done');
  };

  const tick = () => {
    const { cycle, phase, left } = position.current;
    if (left > 1) {
      move({ cycle, phase, left: left - 1 });
      return;
    }
    let nextPhase = phase + 1;
    let nextCycle = cycle;
    if (nextPhase === PHASES.length) {
      nextPhase = 0;
      nextCycle += 1;
      if (nextCycle > CYCLES) {
        finish();
        return;
      }
    }
    move({ cycle: nextCycle, phase: nextPhase, left: PHASES[nextPhase].seconds });
    beginPhase(nextPhase);
  };

  const start = () => {
    clearTimer();
    move({ cycle: 1, phase: 0, left: PHASES[0].seconds });
    setStatus('running');
    beginPhase(0);
    timer.current = setInterval(tick, 1000);
  };

  const stop = () => {
    clearTimer();
    animateTo(0, 0.6);
    setStatus('idle');
    move({ cycle: 1, phase: 0, left: PHASES[0].seconds });
  };

  // Stop when leaving the tab, and clean up when the screen closes.
  useEffect(() => {
    if (!focused && timer.current) stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focused]);
  useEffect(() => clearTimer, []);

  // Keep the screen awake only while breathing.
  useEffect(() => {
    if (status !== 'running') return;
    activateKeepAwakeAsync(KEEP_AWAKE_TAG).catch(() => {});
    return () => {
      deactivateKeepAwake(KEEP_AWAKE_TAG).catch(() => {});
    };
  }, [status]);

  const grow = (from: number, to: number) => ({
    transform: [{ scale: breath.interpolate({ inputRange: [0, 1], outputRange: [from, to] }) }],
  });

  const phase = PHASES[view.phase];
  const centerTitle = status === 'running' ? phase.label : status === 'done' ? 'Well done' : 'Ready?';
  const centerSub = status === 'running' ? String(view.left) : `${CYCLES} cycles`;

  return (
    <Screen background={color.brand.primary} scroll={false} gap={0}>
      {focused ? <StatusBar style="light" /> : null}

      <View style={styles.header}>
        <Text style={styles.title}>Breathe with me</Text>
        <Text style={styles.subtitle}>4-7-8 method · inhale, hold, exhale</Text>
      </View>

      <View style={styles.center}>
        <Animated.View style={[styles.ring, styles.outer, grow(0.88, 1.05)]} />
        <Animated.View style={[styles.ring, styles.middle, grow(0.78, 1.12)]} />
        <Animated.View style={[styles.ring, styles.inner, grow(0.8, 1.3)]} />
        <View style={styles.label} pointerEvents="none">
          <Text style={styles.phase}>{centerTitle}</Text>
          <Text style={styles.count}>{centerSub}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        {status === 'running' ? (
          <>
            <Text style={styles.progress}>
              Cycle {view.cycle} of {CYCLES}
            </Text>
            <Button type="inverse" large label="Stop" onPress={stop} />
          </>
        ) : (
          <Button type="inverse" large label={status === 'done' ? 'Once more' : `Start · ${CYCLES} cycles`} onPress={start} />
        )}
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
    position: 'absolute',
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
  label: {
    alignItems: 'center',
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
    gap: space[4],
    alignItems: 'stretch',
  },
  progress: {
    ...text.labelDefault,
    color: color.extra.tealSoft,
    textAlign: 'center',
  },
  calmer: {
    ...text.bodyEmphasis,
    color: color.extra.tealSoft,
    textAlign: 'center',
  },
});

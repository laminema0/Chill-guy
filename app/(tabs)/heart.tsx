// Heart rate, from Figma "17 · Wearable — heart rate" (node 2049:1589).
// Lives under the Home tab, so the bottom nav stays visible. Prototype: example data, no watch connection.
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';

import { BackButton, HeartIcon, Screen, SegmentedControl } from '../../components';
import { color, radius, space, text } from '../../theme/tokens';

const tabs = ['Daily', 'Weekly'] as const;

// Chart geometry taken from the Figma frame (354 x 220).
const CHART = { left: 47, top: 42, height: 136, hourWidth: 20, hours: 13, max: 160 };
// [x, y, diameter, light] — dot positions exactly as placed in Figma.
const dots: [number, number, number, boolean][] = [
  [62, 121, 8.7, false], [81, 76, 11.5, false], [61, 100, 11.3, false], [61, 80, 10.5, false],
  [83.6, 97, 6, true], [83, 50, 7, true], [103, 74, 8, true], [103, 79, 8, true], [123, 91, 7, true],
  [122, 107, 8.6, false], [143, 76, 7.8, false], [103, 100, 7.3, true], [101, 67, 11.5, false],
];
const yLabels = [160, 140, 120, 100, 80, 60, 40, 20];

export default function HeartScreen() {
  const [tab, setTab] = useState<(typeof tabs)[number]>('Daily');

  return (
    <Screen gap={space[4]}>
      <BackButton />
      <Text style={styles.title}>Your heart</Text>

      <View style={styles.watch}>
        <HeartIcon color={color.feedback.danger} size={20} />
        <Text style={styles.watchLabel}>Apple Watch connected</Text>
        <Text style={styles.bpm}>118 BPM</Text>
      </View>

      <SegmentedControl options={tabs} value={tab} onChange={setTab} />

      <View style={styles.chart}>
        <Svg width={354} height={220} style={StyleSheet.absoluteFill}>
          {Array.from({ length: CHART.hours }, (_, i) => (
            <Line
              key={i}
              x1={CHART.left + i * CHART.hourWidth}
              x2={CHART.left + i * CHART.hourWidth}
              y1={CHART.top}
              y2={CHART.top + CHART.height}
              stroke={color.border.strong}
              strokeWidth={i === 0 ? 1 : 0.5}
            />
          ))}
          <Line x1={CHART.left} x2={CHART.left + 260} y1={CHART.top + CHART.height} y2={CHART.top + CHART.height} stroke={color.border.strong} strokeWidth={1} />
          {dots.map(([x, y, d, light], i) => (
            <Circle key={i} cx={x + d / 2} cy={y + d / 2} r={d / 2} fill={light ? color.extra.chartDotLight : color.brand.hover} />
          ))}
        </Svg>
        {yLabels.map((v, i) => (
          <Text key={v} style={[styles.axis, { left: 22, top: 40 + i * 17 }]}>
            {v}
          </Text>
        ))}
        {Array.from({ length: CHART.hours }, (_, h) => (
          <Text key={h} style={[styles.axis, { left: 60 + h * 20.2, top: 183 }]}>
            {h}h
          </Text>
        ))}
      </View>

      <View style={styles.stats}>
        <View style={[styles.stat, { backgroundColor: color.surface.default }]}>
          <Text style={styles.statLabel}>Daily average</Text>
          <Text style={[styles.statValue, { color: color.text.heading }]}>98 BPM</Text>
        </View>
        <View style={[styles.stat, { backgroundColor: color.surface.subtle }]}>
          <Text style={styles.statLabel}>Current mood</Text>
          <Text style={[styles.statValue, { color: color.brand.primary }]}>Calm</Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    ...text.screenTitle,
    color: color.text.heading,
  },
  watch: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: space[4],
    paddingVertical: 14,
    borderRadius: radius.card,
    backgroundColor: color.surface.default,
    marginBottom: space[3],
  },
  watchLabel: {
    ...text.bodyEmphasis,
    color: color.text.body,
    flex: 1,
  },
  bpm: {
    ...text.bpm,
    color: color.feedback.danger,
  },
  chart: {
    height: 220,
    borderRadius: radius.card,
    backgroundColor: color.surface.default,
    overflow: 'hidden',
  },
  axis: {
    ...text.tiny,
    position: 'absolute',
    color: color.extra.placeholder,
  },
  stats: {
    flexDirection: 'row',
    gap: space[3],
  },
  stat: {
    flex: 1,
    padding: space[4],
    gap: space[1],
    borderRadius: radius.card,
  },
  statLabel: {
    ...text.caption,
    color: color.text.muted,
  },
  statValue: {
    ...text.statValue,
  },
});

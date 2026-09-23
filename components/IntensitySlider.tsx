// "How strong is it?" slider from the Check-in screen: 0–10, tap or drag along the bar.
import { useState } from 'react';
import { StyleSheet, Text, View, type GestureResponderEvent } from 'react-native';

import { color, text } from '../theme/tokens';

type IntensitySliderProps = {
  value: number;
  onChange: (value: number) => void;
  max?: number;
};

const THUMB = 26;

export function IntensitySlider({ value, onChange, max = 10 }: IntensitySliderProps) {
  const [width, setWidth] = useState(0);

  const setFromTouch = (event: GestureResponderEvent) => {
    if (width === 0) return;
    const x = Math.min(Math.max(event.nativeEvent.locationX, 0), width);
    onChange(Math.round((x / width) * max));
  };

  const filled = width * (value / max);

  return (
    <View style={styles.row}>
      <View
        style={styles.touchArea}
        onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true}
        onResponderGrant={setFromTouch}
        onResponderMove={setFromTouch}
        accessibilityRole="adjustable"
        accessibilityLabel="How strong is it?"
        accessibilityValue={{ min: 0, max, now: value }}
      >
        <View style={styles.track} pointerEvents="none" />
        <View style={[styles.fill, { width: filled }]} pointerEvents="none" />
        <View style={[styles.thumb, { left: filled - THUMB / 2 }]} pointerEvents="none" />
      </View>
      <Text style={styles.value}>
        {value}/{max}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  touchArea: {
    flex: 1,
    height: 36,
    justifyContent: 'center',
  },
  track: {
    height: 10,
    borderRadius: 5,
    backgroundColor: color.surface.subtle,
  },
  fill: {
    position: 'absolute',
    height: 10,
    borderRadius: 5,
    backgroundColor: color.brand.primary,
  },
  thumb: {
    position: 'absolute',
    width: THUMB,
    height: THUMB,
    borderRadius: THUMB / 2,
    borderWidth: 3,
    borderColor: color.brand.primary,
    backgroundColor: color.surface.default,
  },
  value: {
    ...text.rowTitle,
    color: color.brand.primary,
    width: 34,
    textAlign: 'right',
  },
});

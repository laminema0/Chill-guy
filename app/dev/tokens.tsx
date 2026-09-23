// Design tokens test screen: shows every text style and colour token so you can
// compare the phone with Figma. Opened from the components test screen.
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { color, elevation, radius, space, text } from '../../theme/tokens';

const textStyles = [
  ['Display/H1', text.displayH1],
  ['Heading/H2', text.headingH2],
  ['Heading/Title', text.headingTitle],
  ['Body/Large', text.bodyLarge],
  ['Body/Default', text.bodyDefault],
  ['Body/Emphasis', text.bodyEmphasis],
  ['Label/Default', text.labelDefault],
  ['Caption', text.caption],
  ['Overline', text.overline],
] as const;

const swatches = [
  ['brand/primary', color.brand.primary],
  ['brand/active', color.brand.active],
  ['brand/hover', color.brand.hover],
  ['text/heading', color.text.heading],
  ['text/body', color.text.body],
  ['text/muted', color.text.muted],
  ['surface/subtle', color.surface.subtle],
  ['surface/muted', color.surface.muted],
  ['feedback/danger', color.feedback.danger],
  ['feedback/rating', color.feedback.rating],
] as const;

export default function TokensTestScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Chill Guy</Text>
        <Text style={styles.subtitle}>Design tokens test screen</Text>

        <View style={styles.card}>
          <Text style={styles.sectionLabel}>TEXT STYLES</Text>
          {textStyles.map(([name, style]) => (
            <Text key={name} style={[style, styles.sample]}>
              {name}
            </Text>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionLabel}>COLOURS</Text>
          {swatches.map(([name, value]) => (
            <View key={name} style={styles.swatchRow}>
              <View style={[styles.swatch, { backgroundColor: value }]} />
              <Text style={styles.swatchName}>{name}</Text>
              <Text style={styles.swatchValue}>{value}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: color.surface.page,
  },
  content: {
    padding: space[4],
    gap: space[4],
  },
  title: {
    ...text.displayH1,
    color: color.text.heading,
  },
  subtitle: {
    ...text.bodyLarge,
    color: color.text.muted,
  },
  card: {
    ...elevation.card,
    backgroundColor: color.surface.default,
    borderRadius: radius.md,
    padding: space[4],
    gap: space[2],
  },
  sectionLabel: {
    ...text.overline,
    color: color.brand.primary,
  },
  sample: {
    color: color.text.heading,
  },
  swatchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[3],
  },
  swatch: {
    width: space[6],
    height: space[6],
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: color.border.default,
  },
  swatchName: {
    ...text.bodyEmphasis,
    color: color.text.body,
    flex: 1,
  },
  swatchValue: {
    ...text.caption,
    color: color.text.muted,
  },
});

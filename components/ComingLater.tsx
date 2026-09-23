// Placeholder for parts of the Figma journey that are not in V1 yet
// (chat, specialists, journey chapters, heart rate, ...).
import { StyleSheet, Text, View } from 'react-native';

import { color, radius, space, text } from '../theme/tokens';
import { BackButton } from './BackButton';
import { Screen } from './Screen';

type ComingLaterProps = {
  feature: string;
  showBack?: boolean;
  onBack?: () => void;
};

export function ComingLater({ feature, showBack = true, onBack }: ComingLaterProps) {
  return (
    <Screen gap={space[4]}>
      {showBack ? <BackButton onPress={onBack} /> : null}
      <Text style={[styles.title, !showBack && styles.titleNoBack]}>{feature}</Text>
      <View style={styles.card}>
        <Text style={styles.label}>COMING LATER</Text>
        <Text style={styles.body}>
          This part of Chill Guy is in the design, but not in the first version of the app yet.
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    ...text.screenTitle,
    color: color.text.heading,
  },
  titleNoBack: {
    marginTop: space[5],
  },
  card: {
    backgroundColor: color.surface.subtle,
    borderRadius: radius.card,
    paddingHorizontal: space[4],
    paddingVertical: space[3],
    gap: space[1],
  },
  label: {
    ...text.sectionLabel,
    color: color.brand.primary,
  },
  body: {
    ...text.bodyDefault,
    color: color.text.heading,
  },
});

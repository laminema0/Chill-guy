// Rating from Figma (node 2188:1589): star + score + count.
// Also usable for "how did that feel" results, e.g. score "4" with count "· after breathing".
import { StyleSheet, Text, View } from 'react-native';

import { color, space, text } from '../theme/tokens';
import { StarIcon } from './icons/NavIcons';

type RatingProps = {
  score: string;
  count?: string;
};

export function Rating({ score, count }: RatingProps) {
  return (
    <View style={styles.row}>
      <StarIcon />
      <Text style={styles.score}>{score}</Text>
      {count ? <Text style={styles.count}>{count}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[1],
  },
  score: {
    ...text.bodyEmphasis,
    color: color.text.heading,
  },
  count: {
    ...text.caption,
    color: color.text.muted,
  },
});

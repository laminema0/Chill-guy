// Avatar from Figma (node 2188:1588). Shows an initial; a photo can replace it later.
import { StyleSheet, Text, View } from 'react-native';

import { color, font, size } from '../theme/tokens';

type AvatarProps = {
  initial: string;
  size?: 'small' | 'medium';
};

export function Avatar({ initial, size: avatarSize = 'medium' }: AvatarProps) {
  const isSmall = avatarSize === 'small';
  return (
    <View style={[styles.avatar, isSmall ? styles.small : styles.medium]}>
      <Text style={[styles.initial, { fontSize: isSmall ? 13 : 16 }]}>{initial.charAt(0).toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: color.surface.subtle,
  },
  small: {
    width: size.avatarSm,
    height: size.avatarSm,
    borderRadius: size.avatarSm / 2,
  },
  medium: {
    width: size.avatar,
    height: size.avatar,
    borderRadius: size.avatar / 2,
  },
  initial: {
    fontFamily: font.medium,
    color: color.brand.primary,
  },
});

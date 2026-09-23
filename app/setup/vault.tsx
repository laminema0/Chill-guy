// Setup step 3, from Figma "5 · Context vault" (node 2016:1637). "Finish & enter" opens Home.
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import { BackButton, Button, Screen } from '../../components';
import { StepBar, TextLink } from '../../components/Form';
import { AudioIcon, DocIcon, LockIcon, NoteIcon } from '../../components/icons/MoreIcons';
import { session } from '../../lib/session';
import { color, radius, space, text } from '../../theme/tokens';

export default function VaultScreen() {
  const enter = () => {
    session.onboarded = true;
    if (router.canDismiss()) router.dismissAll();
    router.replace('/');
  };

  return (
    <Screen gap={18}>
      <BackButton />
      <StepBar step={3} />
      <Text style={styles.title}>Your context vault</Text>
      <Text style={styles.subtitle}>
        Optional — add anything that helps Chill Guy understand you. Encrypted, private, yours to delete anytime.
      </Text>
      <VaultItem icon={<DocIcon />} title="Therapy notes or reports" kind="PDF, image" />
      <VaultItem icon={<NoteIcon />} title="A note about your triggers" kind="Free text" />
      <VaultItem icon={<AudioIcon />} title="A voice memo" kind="Audio" />
      <View style={styles.note}>
        <LockIcon />
        <Text style={styles.noteText}>End-to-end encrypted. You control consent per item.</Text>
      </View>
      <Button large label="Finish & enter" onPress={enter} />
      <TextLink label="Skip for now" muted onPress={enter} />
    </Screen>
  );
}

function VaultItem({ icon, title, kind }: { icon: ReactNode; title: string; kind: string }) {
  return (
    <Pressable style={styles.item}>
      {icon}
      <View style={styles.itemText}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemKind}>{kind}</Text>
      </View>
      <Text style={styles.plus}>+</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  title: {
    ...text.introTitle,
    color: color.text.heading,
  },
  subtitle: {
    ...text.lead,
    color: color.text.muted,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[3],
    padding: space[4],
    borderRadius: radius.card,
    backgroundColor: color.surface.default,
  },
  itemText: {
    flex: 1,
    gap: 2,
  },
  itemTitle: {
    ...text.rowTitle,
    color: color.text.body,
  },
  itemKind: {
    ...text.caption,
    color: color.text.muted,
  },
  plus: {
    ...text.plus,
    color: color.brand.primary,
  },
  note: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: space[4],
    paddingVertical: space[3],
    borderRadius: radius.card,
    backgroundColor: color.surface.subtle,
  },
  noteText: {
    ...text.rowBody,
    color: color.text.heading,
    flex: 1,
  },
});

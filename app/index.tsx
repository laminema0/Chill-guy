// Milestone 2 test screen: every design system component in every state,
// so you can compare the phone with the Figma Design System page.
// It will be replaced by the real Home screen in Milestone 3.
import { useState, type ReactNode } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import {
  Avatar,
  BottomNav,
  BreatheIcon,
  Button,
  Card,
  ChatBubbleIcon,
  Chip,
  HomeIcon,
  Input,
  Rating,
  SpecialistsIcon,
  type BottomNavTab,
} from '../components';
import { color, space, text } from '../theme/tokens';

const feelings = ['Overwhelmed', 'Hurt', 'Ignored', 'Tired'];

const figmaTabs: BottomNavTab[] = [
  { key: 'home', label: 'Home', renderIcon: (c) => <HomeIcon color={c} filled /> },
  { key: 'breathe', label: 'Breathe', renderIcon: (c) => <BreatheIcon color={c} /> },
  { key: 'specialists', label: 'Specialists', renderIcon: (c) => <SpecialistsIcon color={c} filled /> },
];

export default function ComponentsTestScreen() {
  const [selectedFeelings, setSelectedFeelings] = useState<string[]>(['Overwhelmed']);
  const [email, setEmail] = useState('you@email.com');
  const [activeTab, setActiveTab] = useState('home');

  const toggleFeeling = (feeling: string) => {
    setSelectedFeelings((current) =>
      current.includes(feeling) ? current.filter((f) => f !== feeling) : [...current, feeling],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Components</Text>
        <Text style={styles.subtitle}>Hold a button to see its pressed state.</Text>

        <Section label="BUTTON">
          <Button label="Primary" onPress={() => {}} />
          <Button label="Primary disabled" disabled />
          <Button label="Secondary" type="secondary" onPress={() => {}} />
          <Button label="Secondary disabled" type="secondary" disabled />
          <Button label="Ghost" type="ghost" onPress={() => {}} />
          <Button label="Ghost disabled" type="ghost" disabled />
        </Section>

        <Section label="INPUT">
          <Input placeholder="you@email.com" />
          <Input value={email} onChangeText={setEmail} />
          <Input value="Something went wrong" error editable={false} />
          <Text style={styles.hint}>Tap a field to see the focus state.</Text>
        </Section>

        <Section label="CHIP">
          <View style={styles.wrapRow}>
            {feelings.map((feeling) => (
              <Chip
                key={feeling}
                label={feeling}
                selected={selectedFeelings.includes(feeling)}
                onPress={() => toggleFeeling(feeling)}
              />
            ))}
          </View>
        </Section>

        <Section label="CARD">
          <Card title="Card title" body="Supporting line of text inside the card." />
          <Card type="elevated" title="Card title" body="Supporting line of text inside the card." />
        </Section>

        <Section label="AVATAR AND RATING">
          <View style={styles.row}>
            <Avatar initial="A" size="small" />
            <Avatar initial="A" />
            <Rating score="4.9" count="· 128 ratings" />
          </View>
        </Section>

        <Section label="ICONS">
          <View style={styles.row}>
            <HomeIcon />
            <BreatheIcon />
            <SpecialistsIcon />
            <View style={styles.chatIconBackground}>
              <ChatBubbleIcon />
            </View>
          </View>
        </Section>

        <Section label="BOTTOM NAV (FIGMA VERSION)">
          <BottomNav tabs={figmaTabs} activeKey={activeTab} onSelect={setActiveTab} showChat />
          <Text style={styles.hint}>Tap the tabs to switch. V1 will use Home, Breathe, Plans and History, without Chat.</Text>
        </Section>

        <Button label="View design tokens" type="secondary" onPress={() => router.push('/tokens')} />
      </ScrollView>
    </SafeAreaView>
  );
}

function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionLabel}>{label}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: color.surface.page,
  },
  content: {
    padding: space[4],
    gap: space[5],
  },
  title: {
    ...text.displayH1,
    color: color.text.heading,
  },
  subtitle: {
    ...text.bodyLarge,
    color: color.text.muted,
    marginTop: -space[4],
  },
  section: {
    gap: space[3],
  },
  sectionLabel: {
    ...text.overline,
    color: color.brand.primary,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[5],
  },
  wrapRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: space[2],
  },
  chatIconBackground: {
    padding: space[1],
    borderRadius: space[2],
    backgroundColor: color.brand.primary,
  },
  hint: {
    ...text.caption,
    color: color.text.muted,
  },
});

// Intro carousel, from Figma "Intro 01" to "Intro 10" (Stage 1 of the Final Journey).
// Swipe or tap the button to move on. "Skip" and the last button go to Sign up.
import { useRef, useState, type ReactNode } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, ChatBubble, HeartIcon, Tag } from '../components';
import { color, layout, radius, space, text } from '../theme/tokens';

const mascot = require('../assets/images/chill-guy-mascot.png');
const drMartinez = require('../assets/images/dr-martinez.jpg');

type Page = {
  key: string;
  background: string;
  /** Teal page: white Skip, white button, light dots. */
  onBrand?: boolean;
  button: string;
  showSkip?: boolean;
  content: ReactNode;
};

// Built on render (not at load time) because it uses the styles defined at the bottom.
function buildPages(): Page[] {
  return [
    {
      key: 'angry',
      background: color.surface.page,
      button: 'Yes, sometimes',
      content: (
        <Hero>
          <Text style={styles.heroTitle}>Are you</Text>
          <Text style={styles.heroTitle}>
            <Text style={{ color: color.feedback.danger }}>ANGRY</Text> sometimes?
          </Text>
        </Hero>
      ),
    },
    {
      key: 'calmer',
      background: color.surface.page,
      button: 'Show me how',
      content: (
        <Hero>
          <Text style={styles.heroSmall}>You wanna be</Text>
          <Text style={[styles.heroTitle, { color: color.brand.hover }]}>CALMER?</Text>
          <Text style={styles.heroSub}>You’re in the right place.</Text>
        </Hero>
      ),
    },
    {
      key: 'organize',
      background: color.surface.page,
      button: 'Next',
      content: (
        <>
          <Text style={styles.title}>Here you can organize{'\n'}your thoughts</Text>
          <ChatBubble message="First, let’s name what’s underneath the anger." style={styles.bubbleGap} />
          <View style={[styles.whiteCard, styles.cardGap]}>
            <Text style={styles.cardLabel}>How strong is it? · 7/10</Text>
            <View style={styles.track}>
              <View style={[styles.trackFill, { width: '69%' }]} />
            </View>
            <View style={styles.miniChips}>
              <MiniChip label="Dismissed" />
              <MiniChip label="Treated unfairly" selected />
              <MiniChip label="Overwhelmed" />
            </View>
          </View>
        </>
      ),
    },
    {
      key: 'ai',
      background: color.surface.page,
      button: 'Next',
      content: (
        <>
          <Text style={styles.title}>By talking with a{'\n'}trained AI</Text>
          <Text style={styles.lead}>Through a calm Cognitive Behavioral Therapy–style conversation.</Text>
          <View style={styles.chat}>
            <ChatBubble message="Tell me what happened." />
            <ChatBubble from="me" message="My colleague kept interrupting my work…" />
            <ChatBubble message="That sounds frustrating — being interrupted when you’re focused." />
          </View>
        </>
      ),
    },
    {
      key: 'watch',
      background: color.surface.page,
      button: 'Next',
      content: (
        <>
          <Text style={styles.titleSmall}>We watch your calm{'\n'}through your smart watch</Text>
          <Text style={styles.lead}>When arousal rises, we notice before anger takes over.</Text>
          <View style={styles.alertCard}>
            <View style={styles.alertRow}>
              <HeartIcon />
              <Text style={styles.alertLabel}>Heart rate</Text>
              <Text style={styles.alertValue}>118 BPM</Text>
            </View>
            <Text style={styles.alertText}>Heart rate spiking — calm the arousal now.</Text>
            <View style={styles.alertButton}>
              <Text style={styles.alertButtonLabel}>Take a breath</Text>
            </View>
          </View>
          <ChatBubble message="And we send you a gentle notification." style={styles.fullBubble} />
        </>
      ),
    },
    {
      key: 'story',
      background: color.surface.page,
      button: 'Next',
      content: (
        <>
          <Text style={styles.title}>Every check-in writes{'\n'}your story</Text>
          <ChatBubble
            message="Your logs reveal your personal anger pattern — so you see where to step in."
            style={styles.bubbleGapSmall}
          />
          <View style={[styles.whiteCard, styles.cardGapSmall]}>
            <Text style={styles.sectionLabel}>YOUR MOST COMMON EPISODE</Text>
            <EpisodeRow bar={color.brand.primary} label="Trigger" value="Family issues" />
            <EpisodeRow bar={color.brand.hover} label="Hot thought" value="“They never listen to me”" />
            <EpisodeRow bar={color.feedback.danger} label="Outcome" value="Regret afterwards" />
          </View>
        </>
      ),
    },
    {
      key: 'revisit',
      background: color.surface.page,
      button: 'Next',
      content: (
        <>
          <Text style={styles.title}>Come back calmer,{'\n'}plan ahead</Text>
          <Text style={styles.lead}>
            Two days later we revisit — then turn what you learn into ready if-then plans.
          </Text>
          <View style={styles.revisitCard}>
            <Text style={styles.sectionLabel}>COOL-DOWN REVISIT</Text>
            <Text style={styles.revisitValue}>Then: 9/10 → Today: 4/10</Text>
            <Text style={styles.revisitText}>Anger fades. Better decisions come after.</Text>
          </View>
          <View style={styles.planCard}>
            <View style={styles.planRow}>
              <Tag label="WHEN" tone="solid" />
              <Text style={styles.planWhen}>family criticizes me</Text>
            </View>
            <View style={styles.planRow}>
              <Tag label="THEN" />
              <Text style={styles.planThen}>4-7-8 breathing · 60s</Text>
            </View>
          </View>
        </>
      ),
    },
    {
      key: 'breathing',
      background: color.brand.primary,
      onBrand: true,
      button: 'Next',
      content: (
        <>
          <Text style={[styles.title, { color: color.text.onBrand }]}>Like what? Breathing.</Text>
          <Text style={[styles.lead, styles.leadTight, { color: color.extra.tealSoft }]}>
            Based on the 4-7-8 method.
          </Text>
          <View style={styles.ringsWrap}>
            <View style={[styles.ring, styles.ringOuter]}>
              <View style={[styles.ring, styles.ringMiddle]}>
                <View style={[styles.ring, styles.ringInner]}>
                  <Text style={styles.phase}>Inhale</Text>
                </View>
              </View>
            </View>
          </View>
          <ChatBubble onBrand message="Then you find out you can do something to feel better." />
        </>
      ),
    },
    {
      key: 'specialist',
      background: color.surface.page,
      button: 'Next',
      content: (
        <>
          <Text style={styles.title}>Or talking with{'\n'}a specialist</Text>
          <Text style={styles.lead}>
            Book a session and — only with your consent — share your story and logs so they truly understand you.
          </Text>
          <View style={styles.specialistCard}>
            <Image source={drMartinez} style={styles.photo} />
            <View style={styles.specialistText}>
              <Text style={styles.specialistName}>Dr. Elena Martinez</Text>
              <Text style={styles.specialistMeta}>Anger regulation · €60/hr</Text>
            </View>
            <View style={styles.bookButton}>
              <Text style={styles.bookLabel}>Book</Text>
            </View>
          </View>
        </>
      ),
    },
    {
      key: 'meet',
      background: color.surface.subtle,
      button: 'Let’s begin',
      showSkip: false,
      content: (
        <Hero>
          <Text style={styles.meetTitle}>No worries — you’re{'\n'}not alone</Text>
          <Text style={styles.meetBody}>I’ll walk every chapter with you, all the steps. Because I’m…</Text>
          <Text style={styles.giant}>Chill Guy</Text>
        </Hero>
      ),
    },
  ];
}

export default function IntroScreen() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const pager = useRef<ScrollView>(null);
  const pages = buildPages();
  const [index, setIndex] = useState(0);
  const page = pages[index];

  const finish = () => router.replace('/sign-up');
  const next = () => {
    if (index === pages.length - 1) return finish();
    pager.current?.scrollTo({ x: width * (index + 1), animated: true });
    setIndex(index + 1);
  };
  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) =>
    setIndex(Math.round(e.nativeEvent.contentOffset.x / width));

  return (
    <View style={[styles.fill, { backgroundColor: page.background }]}>
      <StatusBar style={page.onBrand ? 'light' : 'dark'} />
      <ScrollView
        ref={pager}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
      >
        {pages.map((p) => (
          <View
            key={p.key}
            style={[styles.page, { width, backgroundColor: p.background, paddingTop: insets.top + space[2] }]}
          >
            <View style={styles.skipRow}>
              {p.showSkip !== false ? (
                <Pressable onPress={finish} hitSlop={12}>
                  <Text style={[styles.skip, p.onBrand && { color: color.extra.tealSoft }]}>Skip</Text>
                </Pressable>
              ) : null}
            </View>
            {p.content}
          </View>
        ))}
      </ScrollView>

      {/* Dots and button stay in place while the pages slide */}
      <View
        style={[styles.footer, { paddingBottom: insets.bottom + layout.navBottomGap + space[5] }]}
        pointerEvents="box-none"
      >
        <Dots count={pages.length} active={index} page={page} />
        <Button label={page.button} type={page.onBrand ? 'inverse' : 'primary'} large={page.onBrand} onPress={next} />
      </View>
    </View>
  );
}

function Hero({ children }: { children: ReactNode }) {
  return (
    <View style={styles.hero}>
      <Image source={mascot} style={styles.mascot} />
      <View style={styles.heroText}>{children}</View>
    </View>
  );
}

function MiniChip({ label, selected = false }: { label: string; selected?: boolean }) {
  return (
    <View style={[styles.miniChip, selected && { backgroundColor: color.brand.primary }]}>
      <Text style={[styles.miniChipLabel, selected && { color: color.text.onBrand }]}>{label}</Text>
    </View>
  );
}

function EpisodeRow({ bar, label, value }: { bar: string; label: string; value: string }) {
  return (
    <View style={styles.episodeRow}>
      <View style={[styles.episodeBar, { backgroundColor: bar }]} />
      <View>
        <Text style={styles.episodeLabel}>{label}</Text>
        <Text style={styles.episodeValue}>{value}</Text>
      </View>
    </View>
  );
}

function Dots({ count, active, page }: { count: number; active: number; page: Page }) {
  // Figma: inactive dots are light teal, or page-coloured on the teal and light-teal pages.
  const inactive = page.key === 'meet' ? color.surface.page : color.surface.subtle;
  const activeColor = page.onBrand ? color.surface.page : color.brand.primary;
  return (
    <View style={styles.dots}>
      {Array.from({ length: count }, (_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            i === active ? [styles.dotActive, { backgroundColor: activeColor }] : { backgroundColor: inactive },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  page: {
    flex: 1,
    paddingHorizontal: layout.screenPadding,
  },
  skipRow: {
    height: 32,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: space[2],
  },
  skip: {
    ...text.bodyEmphasis,
    color: color.text.muted,
    marginRight: space[5],
  },
  hero: {
    alignItems: 'stretch',
  },
  mascot: {
    width: 150,
    height: 171,
    alignSelf: 'center',
    marginTop: 42,
  },
  heroText: {
    marginTop: 49,
  },
  heroTitle: {
    ...text.introHero,
    color: color.text.heading,
  },
  heroSmall: {
    ...text.introHeroSmall,
    color: color.text.heading,
  },
  heroSub: {
    ...text.introSub,
    color: color.text.muted,
    marginTop: space[2],
  },
  title: {
    ...text.introTitle,
    color: color.text.heading,
  },
  titleSmall: {
    ...text.screenTitle,
    color: color.text.heading,
  },
  lead: {
    ...text.lead,
    color: color.text.muted,
    marginTop: 26,
  },
  leadTight: {
    marginTop: 10,
  },
  bubbleGap: {
    marginTop: 28,
  },
  bubbleGapSmall: {
    marginTop: 38,
  },
  fullBubble: {
    maxWidth: '100%',
    alignSelf: 'stretch',
    marginTop: 10,
  },
  whiteCard: {
    backgroundColor: color.surface.default,
    borderRadius: radius.lg,
    padding: 18,
    gap: 10,
  },
  cardGap: {
    marginTop: 34,
  },
  cardGapSmall: {
    marginTop: 34,
  },
  cardLabel: {
    ...text.bodyEmphasis,
    color: color.text.body,
  },
  track: {
    height: 10,
    borderRadius: 5,
    backgroundColor: color.surface.subtle,
    overflow: 'hidden',
  },
  trackFill: {
    height: 10,
    borderRadius: 5,
    backgroundColor: color.brand.primary,
  },
  miniChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: space[2],
  },
  miniChip: {
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: radius.card,
    backgroundColor: color.surface.muted,
  },
  miniChipLabel: {
    ...text.dateLabel,
    color: color.text.body,
  },
  chat: {
    marginTop: 56,
    gap: 22,
  },
  alertCard: {
    marginTop: 64,
    backgroundColor: color.extra.dangerSubtle,
    borderRadius: radius.lg,
    padding: 18,
    gap: space[2],
  },
  alertRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  alertLabel: {
    ...text.rowTitle,
    color: color.text.body,
    flex: 1,
  },
  alertValue: {
    ...text.cardName,
    color: color.feedback.danger,
  },
  alertText: {
    ...text.rowBody,
    color: color.feedback.danger,
  },
  alertButton: {
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: radius.card,
    backgroundColor: color.feedback.danger,
  },
  alertButtonLabel: {
    ...text.bodyEmphasis,
    color: color.text.onBrand,
  },
  sectionLabel: {
    ...text.sectionLabel,
    color: color.brand.primary,
  },
  episodeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  episodeBar: {
    width: 5,
    height: 24,
    borderRadius: 2.5,
  },
  episodeLabel: {
    ...text.overline,
    color: color.text.muted,
  },
  episodeValue: {
    ...text.bodyEmphasis,
    color: color.text.body,
  },
  revisitCard: {
    marginTop: 64,
    backgroundColor: color.surface.subtle,
    borderRadius: radius.card,
    paddingHorizontal: 18,
    paddingVertical: space[4],
    gap: 6,
  },
  revisitValue: {
    ...text.rowTitle,
    color: color.text.heading,
  },
  revisitText: {
    ...text.rowBody,
    color: color.extra.slate,
  },
  planCard: {
    marginTop: 30,
    backgroundColor: color.surface.default,
    borderRadius: radius.card,
    paddingHorizontal: 18,
    paddingVertical: space[4],
    gap: 7,
  },
  planRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[2],
  },
  planWhen: {
    ...text.bodyEmphasis,
    color: color.text.body,
  },
  planThen: {
    ...text.bodyDefault,
    color: color.text.body,
  },
  ringsWrap: {
    alignItems: 'center',
    marginTop: 110,
    marginBottom: 40,
  },
  ring: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringOuter: {
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: color.extra.breatheRingOuter,
  },
  ringMiddle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: color.extra.breatheRingMiddle,
  },
  ringInner: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: color.surface.default,
  },
  phase: {
    ...text.introPhase,
    color: color.brand.primary,
  },
  specialistCard: {
    marginTop: 64,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[3],
    padding: space[4],
    borderRadius: radius.lg,
    backgroundColor: color.surface.default,
  },
  photo: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  specialistText: {
    flex: 1,
    gap: 2,
  },
  specialistName: {
    ...text.cardName,
    color: color.text.heading,
  },
  specialistMeta: {
    ...text.caption,
    color: color.text.muted,
  },
  bookButton: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: radius.card,
    backgroundColor: color.brand.primary,
  },
  bookLabel: {
    ...text.labelDefault,
    color: color.text.onBrand,
  },
  meetTitle: {
    ...text.introMeet,
    color: color.text.heading,
  },
  meetBody: {
    ...text.introBody,
    color: color.extra.slate,
    marginTop: space[5],
  },
  giant: {
    ...text.introGiant,
    color: color.brand.primary,
    marginTop: space[2],
  },
  footer: {
    position: 'absolute',
    left: layout.screenPadding,
    right: layout.screenPadding,
    bottom: 0,
    gap: 21,
  },
  dots: {
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  dotActive: {
    width: 22,
  },
});

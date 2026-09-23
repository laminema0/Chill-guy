/**
 * Chill Guy design tokens.
 *
 * Copied from the Figma Design System page (file f3OmSGrAC7YBQVRNW2Hvj8, node 2187:1594).
 * Screens and components must take every colour, size and text style from here.
 * If a value changes in Figma, change it here too.
 */
import type { TextStyle } from 'react-native';

// ---------------------------------------------------------------------------
// Primitives: the raw palette. Screens should use `color` below, not these.
// ---------------------------------------------------------------------------
export const primitives = {
  teal900: '#1F4152',
  teal600: '#1F81A8',
  teal500: '#2E8FA3',
  teal400: '#4897B6',
  teal200: '#9DC7D8',
  teal100: '#DFEDF5',
  teal50: '#D3E7EF',
  neutral0: '#FFFFFF',
  neutral50: '#F8FAFC',
  neutral100: '#F0F3F5',
  neutral300: '#B8C4CF',
  neutral400: '#9A9A9A',
  neutral500: '#8C8C8C',
  neutral700: '#404040',
  red500: '#B6484A',
  amber500: '#E5A53B',
} as const;

// ---------------------------------------------------------------------------
// Color: what each colour is for (Figma "Color" collection, Light mode).
// ---------------------------------------------------------------------------
export const color = {
  brand: {
    primary: primitives.teal600,
    hover: primitives.teal400,
    active: primitives.teal500,
  },
  surface: {
    default: primitives.neutral0,
    page: primitives.neutral50,
    subtle: primitives.teal100,
    muted: primitives.neutral100,
  },
  text: {
    heading: primitives.teal900,
    body: primitives.neutral700,
    muted: primitives.neutral500,
    disabled: primitives.neutral400,
    onBrand: primitives.neutral0,
  },
  border: {
    default: primitives.teal100,
    strong: primitives.teal200,
  },
  feedback: {
    danger: primitives.red500,
    rating: primitives.amber500,
  },

  // Used on the Final Journey screens but not Figma variables yet.
  extra: {
    dangerSubtle: '#FEF2F2', // Cool-Down Revisit card, "Revisit ready" tag
    tealSoft: primitives.teal50, // Breathe subtitle and text on brand background
    indigo: '#3668A8', // "Urge → Expression" bar in My Story
    placeholder: primitives.neutral300, // search placeholder, row chevrons
    navBar: 'rgba(255, 255, 255, 0.92)', // frosted bottom nav bar
    navActive: 'rgba(46, 143, 163, 0.08)', // active tab background
    fabGradientEnd: '#3AABBC', // Chat button gradient end colour
    breatheRingOuter: 'rgba(255, 255, 255, 0.12)',
    breatheRingMiddle: 'rgba(255, 255, 255, 0.18)',
    slate: '#4A6572', // soft body text on light teal (Intro 07, Intro 10)
    bubbleOnBrand: 'rgba(255, 255, 255, 0.16)', // speech bubble on the teal Breathing intro
    scrim: 'rgba(31, 65, 82, 0.35)', // dark layer behind the "Save this as a log?" dialog
    chartDotLight: '#76B7D1', // lighter dots in the heart-rate chart
  },
} as const;

// ---------------------------------------------------------------------------
// Spacing, radius and sizes (in points).
// ---------------------------------------------------------------------------
export const space = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 24,
  6: 32,
} as const;

export const radius = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 18,
  pill: 22,
  full: 999,

  // Used on the Final Journey screens but not Figma variables yet.
  card: 15, // screen cards (Home, My Story, My Plan, Settings)
  quickLink: 14, // My Story / My Plan buttons on Home
  navBar: 34, // bottom nav bar and Chat button
  navItem: 30, // active tab highlight
} as const;

export const size = {
  controlSm: 35,
  controlMd: 44,
  input: 49,
  controlLg: 52, // primary button height
  nav: 68, // bottom nav height
  icon: 22,
  avatar: 44,
  avatarSm: 32, // Avatar Size=Small; not a Figma variable yet
  chip: 30, // Chip height in the Figma component; not a Figma variable yet
  navItemWidth: 72,
  navItemHeight: 56,
  avatarHeader: 34, // profile picture at the top of Home
} as const;

// ---------------------------------------------------------------------------
// Fonts. Each weight is its own font file, so pick the family, not fontWeight.
// The names must match the keys loaded in app/_layout.tsx.
// ---------------------------------------------------------------------------
export const fontFiles = {
  'Rubik-Regular': require('../assets/fonts/Rubik-Regular.ttf'),
  'Rubik-Medium': require('../assets/fonts/Rubik-Medium.ttf'),
  'Rubik-Bold': require('../assets/fonts/Rubik-Bold.ttf'),
};

export const font = {
  regular: 'Rubik-Regular',
  medium: 'Rubik-Medium',
  bold: 'Rubik-Bold',
} as const;

// ---------------------------------------------------------------------------
// Text styles (the 9 Figma text styles).
// ---------------------------------------------------------------------------
export const text = {
  displayH1: { fontFamily: font.bold, fontSize: 30, lineHeight: 36 },
  headingH2: { fontFamily: font.bold, fontSize: 24, lineHeight: 30 },
  headingTitle: { fontFamily: font.bold, fontSize: 17, lineHeight: 22 },
  bodyLarge: { fontFamily: font.regular, fontSize: 16, lineHeight: 24 },
  bodyDefault: { fontFamily: font.regular, fontSize: 14, lineHeight: 21 },
  bodyEmphasis: { fontFamily: font.medium, fontSize: 14, lineHeight: 21 },
  labelDefault: { fontFamily: font.medium, fontSize: 13, lineHeight: 18 },
  caption: { fontFamily: font.regular, fontSize: 12, lineHeight: 16 },
  overline: { fontFamily: font.medium, fontSize: 11, lineHeight: 14 },

  // Used inside Figma components but not saved as Figma text styles yet.
  buttonLabel: { fontFamily: font.medium, fontSize: 15, lineHeight: 20 },
  cardTitle: { fontFamily: font.bold, fontSize: 15, lineHeight: 20 },
  cardBody: { fontFamily: font.regular, fontSize: 13, lineHeight: 18 },
  fabLabel: { fontFamily: font.medium, fontSize: 10, lineHeight: 12 },

  // Text used on the Final Journey screens (sizes from Figma, not saved as text styles yet).
  screenTitle: { fontFamily: font.bold, fontSize: 24, lineHeight: 29 },
  sectionTitle: { fontFamily: font.medium, fontSize: 17, lineHeight: 21 },
  question: { fontFamily: font.medium, fontSize: 16, lineHeight: 20 },
  rowTitle: { fontFamily: font.medium, fontSize: 15, lineHeight: 19 },
  rowBody: { fontFamily: font.regular, fontSize: 13, lineHeight: 17 },
  chipLarge: { fontFamily: font.medium, fontSize: 14, lineHeight: 17 },
  primaryAction: { fontFamily: font.medium, fontSize: 17, lineHeight: 21 },
  arrow: { fontFamily: font.medium, fontSize: 18, lineHeight: 22 },
  back: { fontFamily: font.medium, fontSize: 30, lineHeight: 36 },
  tag: { fontFamily: font.bold, fontSize: 10, lineHeight: 12 },
  sectionLabel: { fontFamily: font.bold, fontSize: 11, lineHeight: 13 },
  navLabel: { fontFamily: font.medium, fontSize: 10, lineHeight: 12, letterSpacing: 0.1 },
  navLabelActive: { fontFamily: font.bold, fontSize: 10, lineHeight: 12, letterSpacing: 0.1 },
  groupLabel: { fontFamily: font.bold, fontSize: 12, lineHeight: 15 },
  dateLabel: { fontFamily: font.medium, fontSize: 12, lineHeight: 15 },
  lead: { fontFamily: font.regular, fontSize: 15, lineHeight: 19 },
  counter: { fontFamily: font.regular, fontSize: 18, lineHeight: 22 },

  // Intro carousel
  introHero: { fontFamily: font.bold, fontSize: 36, lineHeight: 43 },
  introHeroSmall: { fontFamily: font.bold, fontSize: 32, lineHeight: 38 },
  introTitle: { fontFamily: font.bold, fontSize: 26, lineHeight: 31 },
  introMeet: { fontFamily: font.bold, fontSize: 30, lineHeight: 36 },
  introGiant: { fontFamily: font.bold, fontSize: 128, lineHeight: 104 },
  introSub: { fontFamily: font.regular, fontSize: 18, lineHeight: 22 },
  introBody: { fontFamily: font.regular, fontSize: 16, lineHeight: 20 },
  bubble: { fontFamily: font.medium, fontSize: 16, lineHeight: 20 },
  introPhase: { fontFamily: font.bold, fontSize: 20, lineHeight: 24 },
  cardName: { fontFamily: font.bold, fontSize: 15, lineHeight: 19 },

  // Sign up, chat, specialists, profile
  authTitle: { fontFamily: font.bold, fontSize: 28, lineHeight: 34 },
  plus: { fontFamily: font.medium, fontSize: 22, lineHeight: 26 },
  personName: { fontFamily: font.bold, fontSize: 16, lineHeight: 20 },
  profileName: { fontFamily: font.bold, fontSize: 20, lineHeight: 24 },
  headerTitle: { fontFamily: font.bold, fontSize: 22, lineHeight: 27 },
  chatText: { fontFamily: font.regular, fontSize: 14, lineHeight: 17 },
  tiny: { fontFamily: font.regular, fontSize: 11, lineHeight: 13 },
  tinyBold: { fontFamily: font.bold, fontSize: 9, lineHeight: 11 },
  statValue: { fontFamily: font.bold, fontSize: 20, lineHeight: 24 },
  bpm: { fontFamily: font.bold, fontSize: 18, lineHeight: 22 },
  emergencyNumber: { fontFamily: font.bold, fontSize: 32, lineHeight: 38 },
} satisfies Record<string, TextStyle>;

// ---------------------------------------------------------------------------
// Elevation (Figma effect style "Elevation/Card").
// ---------------------------------------------------------------------------
export const elevation = {
  card: { boxShadow: '0px 2px 8px 0px rgba(31, 64, 82, 0.08)' },
  // Bottom nav shadows from the Final Journey screens.
  navBar: { boxShadow: '0px 4px 24px 0px rgba(0, 0, 0, 0.1)' },
  fab: { boxShadow: '0px 6px 11px 0px rgba(46, 143, 163, 0.44)' },
} as const;

// Layout values shared by every screen (Figma frames are 402 wide with 24 side padding).
export const layout = {
  screenPadding: space[5],
  navBottomGap: 14, // space under the floating bottom nav
  navSide: 22, // space left and right of the floating bottom nav
  navClearance: 110, // bottom padding so content can scroll above the nav
} as const;

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
} satisfies Record<string, TextStyle>;

// ---------------------------------------------------------------------------
// Elevation (Figma effect style "Elevation/Card").
// ---------------------------------------------------------------------------
export const elevation = {
  card: { boxShadow: '0px 2px 8px 0px rgba(31, 64, 82, 0.08)' },
} as const;

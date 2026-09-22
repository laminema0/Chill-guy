// Navigation icons from Figma ("Icons (nav)", node 2189:1591).
// Path data is copied exactly from the Figma SVG export; only the colours are props.
import Svg, { Path } from 'react-native-svg';

import { color as tokens } from '../../theme/tokens';

export type IconProps = {
  color?: string;
  /** Filled version, used for the tab icons inside the bottom nav. */
  filled?: boolean;
};

const STROKE = 1.74167;

export function HomeIcon({ color = tokens.brand.active, filled = false }: IconProps) {
  return (
    <Svg width={22} height={22} viewBox="0 0 22 22" fill="none">
      <Path
        d="M2.75 9.3335L11 2.75L19.25 9.3335V18.3333C19.25 18.5764 19.1534 18.8096 18.9815 18.9815C18.8096 19.1534 18.5764 19.25 18.3333 19.25H4.58333C4.34022 19.25 4.10706 19.1534 3.93515 18.9815C3.76324 18.8096 3.66667 18.5764 3.66667 18.3333V9.3335H2.75Z"
        fill={color}
        fillOpacity={filled ? 1 : 0.094}
        stroke={color}
        strokeWidth={STROKE}
        strokeLinejoin="round"
      />
      <Path d="M8.25 19.25V11.9167H13.75V19.25" stroke={color} strokeWidth={STROKE} strokeLinejoin="round" />
    </Svg>
  );
}

export function BreatheIcon({ color = tokens.text.disabled }: IconProps) {
  const wave = { stroke: color, strokeWidth: 1.7417, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;
  return (
    <Svg width={22} height={22} viewBox="0 0 22 22" fill="none">
      <Path d="M3 5.49999C5.66667 3.23332 8.33333 3.23332 11 5.49999C13.6667 7.76665 16.3333 7.76665 19 5.49999" {...wave} />
      <Path d="M3 11C5.66667 8.73332 8.33333 8.73332 11 11C13.6667 13.2667 16.3333 13.2667 19 11" {...wave} />
      <Path d="M3 16.5C5.66667 14.2333 8.33333 14.2333 11 16.5C13.6667 18.7667 16.3333 18.7667 19 16.5" {...wave} />
    </Svg>
  );
}

export function SpecialistsIcon({ color = tokens.text.disabled, filled = false }: IconProps) {
  return (
    <Svg width={22} height={22} viewBox="0 0 22 22" fill="none">
      <Path
        d="M8.25 9.16669C9.76878 9.16669 11 7.93547 11 6.41669C11 4.8979 9.76878 3.66669 8.25 3.66669C6.73122 3.66669 5.5 4.8979 5.5 6.41669C5.5 7.93547 6.73122 9.16669 8.25 9.16669Z"
        fill={filled ? color : 'none'}
        stroke={color}
        strokeWidth={STROKE}
      />
      <Path
        d="M15.125 9.62502C16.3906 9.62502 17.4167 8.59901 17.4167 7.33335C17.4167 6.0677 16.3906 5.04169 15.125 5.04169C13.8593 5.04169 12.8333 6.0677 12.8333 7.33335C12.8333 8.59901 13.8593 9.62502 15.125 9.62502Z"
        stroke={color}
        strokeWidth={STROKE}
      />
      <Path d="M2.75 17.4167C2.75 14.3917 5.225 11.9167 8.25 11.9167C11.275 11.9167 13.75 14.3917 13.75 17.4167" stroke={color} strokeWidth={STROKE} strokeLinecap="round" />
      <Path d="M17.875 17.4166C17.875 15.4 16.6833 13.75 15.125 12.8333" stroke={color} strokeWidth={STROKE} strokeLinecap="round" />
    </Svg>
  );
}

// Plans and History are not in Figma yet. Drawn in the same style (22x22, same stroke)
// so the V1 tab bar is complete; replace them if Figma icons are made later.
export function PlansIcon({ color = tokens.text.disabled, filled = false }: IconProps) {
  return (
    <Svg width={22} height={22} viewBox="0 0 22 22" fill="none">
      <Path
        d="M6.41667 3.66667H15.5833C16.5958 3.66667 17.4167 4.48748 17.4167 5.5V17.4167C17.4167 18.4292 16.5958 19.25 15.5833 19.25H6.41667C5.40414 19.25 4.58333 18.4292 4.58333 17.4167V5.5C4.58333 4.48748 5.40414 3.66667 6.41667 3.66667Z"
        fill={color}
        fillOpacity={filled ? 1 : 0}
        stroke={color}
        strokeWidth={STROKE}
        strokeLinejoin="round"
      />
      <Path
        d="M8.25 2.29167H13.75V5.04167H8.25V2.29167Z"
        fill={filled ? color : tokens.surface.default}
        stroke={color}
        strokeWidth={STROKE}
        strokeLinejoin="round"
      />
      <Path
        d="M8.25 11.9167L10.0833 13.75L13.75 10.0833"
        stroke={filled ? tokens.surface.default : color}
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function HistoryIcon({ color = tokens.text.disabled, filled = false }: IconProps) {
  return (
    <Svg width={22} height={22} viewBox="0 0 22 22" fill="none">
      {filled ? <Path d="M11 3.20833A7.79167 7.79167 0 1 1 11 18.7917A7.79167 7.79167 0 0 1 11 3.20833Z" fill={color} /> : null}
      <Path d="M5.49051 5.49051A7.79167 7.79167 0 1 1 3.20833 11" stroke={color} strokeWidth={STROKE} strokeLinecap="round" />
      <Path d="M5.49051 2.74051V5.49051H8.24051" stroke={color} strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round" />
      <Path
        d="M11 7.33333V11L13.75 12.8333"
        stroke={filled ? tokens.surface.default : color}
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

type ChatBubbleIconProps = {
  color?: string;
  dotColor?: string;
};

export function ChatBubbleIcon({ color = tokens.text.onBrand, dotColor = tokens.brand.active }: ChatBubbleIconProps) {
  return (
    <Svg width={22} height={21} viewBox="0 0 22 21" fill="none">
      <Path
        d="M19.25 13.25C19.25 13.7362 19.0568 14.2025 18.713 14.5464C18.3692 14.8902 17.9029 15.0833 17.4167 15.0833H6.41667L2.75 18.75V4.08333C2.75 3.5971 2.94315 3.13079 3.28697 2.78697C3.63079 2.44315 4.0971 2.25 4.58333 2.25H17.4167C17.9029 2.25 18.3692 2.44315 18.713 2.78697C19.0568 3.13079 19.25 3.5971 19.25 4.08333V13.25Z"
        fill={color}
        stroke={color}
        strokeWidth={1.375}
        strokeLinejoin="round"
      />
      <Path d="M7.79167 10.6833C8.39918 10.6833 8.89167 10.1909 8.89167 9.58334C8.89167 8.97582 8.39918 8.48334 7.79167 8.48334C7.18415 8.48334 6.69167 8.97582 6.69167 9.58334C6.69167 10.1909 7.18415 10.6833 7.79167 10.6833Z" fill={dotColor} />
      <Path d="M11 10.6833C11.6075 10.6833 12.1 10.1909 12.1 9.58334C12.1 8.97582 11.6075 8.48334 11 8.48334C10.3925 8.48334 9.89999 8.97582 9.89999 9.58334C9.89999 10.1909 10.3925 10.6833 11 10.6833Z" fill={dotColor} />
      <Path d="M14.2083 10.6833C14.8159 10.6833 15.3083 10.1909 15.3083 9.58334C15.3083 8.97582 14.8159 8.48334 14.2083 8.48334C13.6008 8.48334 13.1083 8.97582 13.1083 9.58334C13.1083 10.1909 13.6008 10.6833 14.2083 10.6833Z" fill={dotColor} />
    </Svg>
  );
}

export function StarIcon({ color = tokens.feedback.rating }: { color?: string }) {
  return (
    <Svg width={14} height={13} viewBox="0 0 14 13" fill="none">
      <Path
        d="M6.65741 0L8.3855 4.62149L13.3148 4.83688L9.45352 7.90851L10.7719 12.6631L6.65741 9.94L2.54291 12.6631L3.8613 7.90851L1.38283e-05 4.83688L4.92932 4.62149L6.65741 0Z"
        fill={color}
      />
    </Svg>
  );
}

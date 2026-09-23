// Small icons used on the Final Journey screens (Home, My Story, Settings).
// Path data is copied exactly from the Figma SVG export; only the colours are props.
import Svg, { Circle, Path } from 'react-native-svg';

import { color as tokens } from '../../theme/tokens';

type Props = { color?: string };

const line = { strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

export function BellIcon({ color = tokens.text.heading }: Props) {
  return (
    <Svg width={22} height={22} viewBox="0 0 22 22" fill="none">
      <Path d="M5.5 7.33398C5.5 5.87529 6.07946 4.47635 7.11091 3.4449C8.14236 2.41345 9.54131 1.83398 11 1.83398C12.4587 1.83398 13.8576 2.41345 14.8891 3.4449C15.9205 4.47635 16.5 5.87529 16.5 7.33398C16.5 13.7507 19.25 15.584 19.25 15.584H2.75C2.75 15.584 5.5 13.7507 5.5 7.33398Z" stroke={color} {...line} />
      <Path d="M9.44141 19.25C9.58595 19.5396 9.80832 19.7832 10.0836 19.9534C10.3588 20.1237 10.6761 20.2138 10.9997 20.2138C11.3234 20.2138 11.6406 20.1237 11.9159 19.9534C12.1912 19.7832 12.4135 19.5396 12.5581 19.25" stroke={color} {...line} />
    </Svg>
  );
}

/** The compass in a filled circle, used on the Chapter card on Home. */
export function CompassBadge() {
  return (
    <Svg width={30} height={30} viewBox="0 0 30 30" fill="none">
      <Circle cx={15} cy={15} r={15} fill={tokens.brand.hover} />
      <Path d="M15 21.25C18.4518 21.25 21.25 18.4518 21.25 15C21.25 11.5482 18.4518 8.75 15 8.75C11.5482 8.75 8.75 11.5482 8.75 15C8.75 18.4518 11.5482 21.25 15 21.25Z" stroke={tokens.text.onBrand} strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M17.6496 12.3496L16.3246 16.3246L12.3496 17.6496L13.6746 13.6746L17.6496 12.3496Z" stroke={tokens.text.onBrand} strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function HeartIcon({ color = tokens.text.body }: Props) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Path d="M13.8661 3.73425C13.2607 3.10537 12.4327 2.73911 11.5601 2.71418C10.6874 2.68924 9.83987 3.00763 9.19948 3.60091L8.66615 4.13424L8.13281 3.60091C7.84627 3.21885 7.48097 2.90283 7.06166 2.67423C6.64235 2.44564 6.17882 2.30982 5.70244 2.27596C5.22607 2.24211 4.74799 2.31101 4.30056 2.47801C3.85314 2.645 3.44682 2.90619 3.10912 3.24389C2.77143 3.58158 2.51024 3.9879 2.34324 4.43533C2.17625 4.88275 2.10734 5.36084 2.1412 5.83721C2.17505 6.31358 2.31088 6.77712 2.53947 7.19643C2.76806 7.61574 3.08409 7.98103 3.46615 8.26758L3.99948 8.80091L8.66615 13.4676L13.3328 8.80091L13.8661 8.26758C14.4005 7.65928 14.6953 6.87727 14.6953 6.06758C14.6953 5.25789 14.4005 4.47587 13.8661 3.86758V3.73425Z" stroke={color} {...line} />
    </Svg>
  );
}

export function SearchIcon({ color = tokens.extra.placeholder }: Props) {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
      <Path d="M8.25 13.5C11.1495 13.5 13.5 11.1495 13.5 8.25C13.5 5.35051 11.1495 3 8.25 3C5.35051 3 3 5.35051 3 8.25C3 11.1495 5.35051 13.5 8.25 13.5Z" stroke={color} {...line} />
      <Path d="M15.7504 15.7504L12.5254 12.5254" stroke={color} {...line} />
    </Svg>
  );
}

// Settings row icons (20x20).
export function SettingsBellIcon({ color = tokens.text.body }: Props) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Path d="M5 6.66602C5 5.33993 5.52678 4.06816 6.46447 3.13048C7.40215 2.1928 8.67392 1.66602 10 1.66602C11.3261 1.66602 12.5979 2.1928 13.5355 3.13048C14.4732 4.06816 15 5.33993 15 6.66602C15 12.4993 17.5 14.166 17.5 14.166H2.5C2.5 14.166 5 12.4993 5 6.66602Z" stroke={color} {...line} />
      <Path d="M8.58398 17.5C8.71539 17.7633 8.91754 17.9847 9.16778 18.1395C9.41801 18.2942 9.70642 18.3762 10.0007 18.3762C10.2949 18.3762 10.5833 18.2942 10.8335 18.1395C11.0838 17.9847 11.2859 17.7633 11.4173 17.5" stroke={color} {...line} />
    </Svg>
  );
}

export function ChartIcon({ color = tokens.text.body }: Props) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Path d="M2.5 2.5V17.5H17.5" stroke={color} {...line} />
      <Path d="M5.83398 12.5007L8.33398 9.16732L10.834 10.834L14.1673 5.83398" stroke={color} {...line} />
    </Svg>
  );
}

export function HandshakeIcon({ color = tokens.text.body }: Props) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Path d="M9.16602 14.1673L10.8327 15.834C11.1642 16.1655 11.6138 16.3518 12.0827 16.3518C12.5515 16.3518 13.0012 16.1655 13.3327 15.834C13.6642 15.5025 13.8504 15.0528 13.8504 14.584C13.8504 14.1151 13.6642 13.6655 13.3327 13.334" stroke={color} {...line} />
      <Path d="M11.6668 11.6676L13.7502 13.7509C14.0817 14.0824 14.5313 14.2687 15.0002 14.2687C15.469 14.2687 15.9187 14.0824 16.2502 13.7509C16.5817 13.4194 16.7679 12.9698 16.7679 12.5009C16.7679 12.0321 16.5817 11.5824 16.2502 11.2509L13.0002 8.00092C12.6886 7.69554 12.2698 7.52449 11.8335 7.52449C11.3973 7.52449 10.9784 7.69554 10.6668 8.00092L9.50018 9.16759C9.19076 9.477 8.77109 9.65083 8.33351 9.65083C7.89593 9.65083 7.47626 9.477 7.16684 9.16759C6.85742 8.85817 6.68359 8.4385 6.68359 8.00092C6.68359 7.56333 6.85742 7.14367 7.16684 6.83425L9.16684 4.83425C9.55328 4.44701 10.0291 4.16083 10.5523 4.00096C11.0755 3.8411 11.63 3.81246 12.1668 3.91759L13.4168 4.16759" stroke={color} {...line} />
      <Path d="M6.6662 6.66602L2.9162 10.416C2.58468 10.7475 2.39844 11.1972 2.39844 11.666C2.39844 12.1349 2.58468 12.5845 2.9162 12.916C3.24773 13.2475 3.69736 13.4338 4.1662 13.4338C4.63505 13.4338 5.08468 13.2475 5.4162 12.916" stroke={color} {...line} />
    </Svg>
  );
}

export function DownloadIcon({ color = tokens.text.body }: Props) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Path d="M9.99935 2.5V12.5M14.166 9.16667L9.99935 12.5L5.83268 9.16667M4.16602 17.5H15.8327" stroke={color} {...line} />
    </Svg>
  );
}

export function KeyIcon({ color = tokens.text.body }: Props) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Path d="M6.25 16.666C8.32107 16.666 10 14.9871 10 12.916C10 10.8449 8.32107 9.16602 6.25 9.16602C4.17893 9.16602 2.5 10.8449 2.5 12.916C2.5 14.9871 4.17893 16.666 6.25 16.666Z" stroke={color} {...line} />
      <Path d="M8.75 10.4167L15.4167 3.75M14.1667 4.16667L16.6667 6.66667M12.5 5.83333L14.1667 7.5" stroke={color} {...line} />
    </Svg>
  );
}

export function TrashIcon({ color = tokens.feedback.danger }: Props) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Path d="M2.5 5H17.5M6.66667 5V3.33333C6.66667 3.11232 6.75446 2.90036 6.91074 2.74408C7.06702 2.5878 7.27899 2.5 7.5 2.5H12.5C12.721 2.5 12.933 2.5878 13.0893 2.74408C13.2455 2.90036 13.3333 3.11232 13.3333 3.33333V5M15.8333 5L15 16.6667C15 17.1087 14.8244 17.5326 14.5118 17.8452C14.1993 18.1577 13.7754 18.3333 13.3333 18.3333H6.66667C6.22464 18.3333 5.80072 18.1577 5.48816 17.8452C5.17559 17.5326 5 17.1087 5 16.6667L4.16667 5M8.33333 9.16667V14.1667M11.6667 9.16667V14.1667" stroke={color} {...line} />
    </Svg>
  );
}

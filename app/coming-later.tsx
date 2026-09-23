// Opened from any button whose feature is not in V1 yet, e.g. "Talk it out" or the Chat button.
import { useLocalSearchParams } from 'expo-router';

import { ComingLater } from '../components/ComingLater';

export default function ComingLaterScreen() {
  const { feature } = useLocalSearchParams<{ feature?: string }>();
  return <ComingLater feature={feature ?? 'Coming later'} />;
}

// Specialists tab. Therapist booking is not in V1, so this shows "Coming later".
import { ComingLater } from '../../components/ComingLater';

export default function SpecialistsScreen() {
  return <ComingLater feature="Talk to a human" showBack={false} />;
}

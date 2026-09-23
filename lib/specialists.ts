// Example specialists from the Figma "Talk to a human" screens.
import type { ImageSourcePropType } from 'react-native';

export type Specialist = {
  id: string;
  name: string;
  role: string;
  kind: 'Psychologists' | 'Coaches';
  rating: string;
  ratings: string;
  about: string;
  price: number;
  photo: ImageSourcePropType;
};

export const specialists: Specialist[] = [
  {
    id: 'elena-martinez',
    name: 'Dr. Elena Martinez',
    role: 'Clinical Psychologist · Anger regulation',
    kind: 'Psychologists',
    rating: '4.9',
    ratings: '128 ratings',
    about: 'helps individuals understand and regulate intense anger responses.',
    price: 60,
    photo: require('../assets/images/dr-martinez.jpg'),
  },
  {
    id: 'laura-schneider',
    name: 'Laura Schneider',
    role: 'Psychotherapist · Emotional regulation',
    kind: 'Psychologists',
    rating: '4.7',
    ratings: '86 ratings',
    about: 'works with suppressed anger, outbursts and recurring conflict.',
    price: 50,
    photo: require('../assets/images/laura-schneider.jpg'),
  },
  {
    id: 'sam-klein',
    name: 'Sam Klein',
    role: 'Licensed Counselor · Stress & anger',
    kind: 'Coaches',
    rating: '4.6',
    ratings: '54 ratings',
    about: 'supports individuals struggling with stress-induced anger.',
    price: 55,
    photo: require('../assets/images/sam-klein.jpg'),
  },
];

export const findSpecialist = (id?: string) => specialists.find((s) => s.id === id) ?? specialists[0];

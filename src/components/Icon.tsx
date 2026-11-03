import {Car, CookingPot, Flame, MapPin, Tv, Wifi, type LucideProps} from 'lucide-react';
import type {ComponentType} from 'react';

const icons: Record<string, ComponentType<LucideProps>> = {
  wifi: Wifi,
  car: Car,
  flame: Flame,
  kitchen: CookingPot,
  tv: Tv,
  pin: MapPin,
};

/** Amenity icons by the names used in content.ts; always decorative beside a label. */
export function Icon({name, ...rest}: {name: string} & LucideProps) {
  const C = icons[name];
  return C ? <C aria-hidden strokeWidth={1.4} {...rest} /> : null;
}

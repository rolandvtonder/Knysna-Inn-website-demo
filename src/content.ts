/**
 * All copy lives here. Facts come from the old knysnainn.co.za site and the
 * inn's public listings (Lekkeslaap, Hotels.com) as of Nov 2026 — anything
 * marked TODO must be confirmed by the owner before the site goes live.
 */

export const media = (f: string) => `${import.meta.env.BASE_URL}media/${f}`;

export const brand = {name: 'Knysna Inn', tagline: 'Boutique self-catering · Main Street'};

export const contact = {
  street: '42 Main Street',
  town: 'Knysna, 6570',
  region: 'Western Cape, South Africa',
  phone: '044 382 0325',
  phoneHref: 'tel:+27443820325',
  // TODO: confirm the inn's real enquiries address.
  email: 'info@knysnainn.co.za',
  // TODO: confirm the WhatsApp number (international format, digits only).
  whatsapp: '27443820325',
  checkIn: '14:00',
  checkOut: '10:00',
  mapEmbed: 'https://maps.google.com/maps?q=42%20Main%20Street%2C%20Knysna%2C%206570&z=16&output=embed',
  mapLink: 'https://www.google.com/maps/search/?api=1&query=Knysna+Inn+42+Main+Street+Knysna',
};

/** Keep in sync with ROUTES in vite.config.ts. */
export const routes = [
  {path: '/', label: 'Home', title: 'Knysna Inn — Boutique self-catering on Main Street, Knysna'},
  {path: '/rooms', label: 'Rooms & rates', title: 'Rooms & rates — Knysna Inn'},
  {path: '/the-inn', label: 'The Inn', title: 'The Inn & gallery — Knysna Inn'},
  {path: '/explore', label: 'Explore Knysna', title: 'Explore Knysna — Knysna Inn'},
  {path: '/contact', label: 'Contact & booking', title: 'Contact & booking — Knysna Inn'},
] as const;

/** A headline line; `i` lines are set in italic. */
export type Line = {t: string; i?: boolean};

export const home = {
  hero: {
    kicker: 'Boutique self-catering · Knysna',
    lines: [{t: 'Your door on'}, {t: 'Main Street,', i: true}, {t: 'your garden in'}, {t: 'Knysna.', i: true}] as Line[],
    body: 'Stylish self-catering units, each with its own entrance, set around a leafy courtyard in the middle of town. The Waterfront is a ten-minute walk away.',
    images: ['street-front.webp', 'courtyard.webp', 'garden-walk.webp', 'deck.webp'],
    alt: 'Knysna Inn: the white double-storey building on Main Street, the green-chaired courtyard, the garden walkway and the sunny deck',
  },
  intro: {
    kicker: 'Welcome',
    lines: [{t: 'A quiet courtyard'}, {t: 'behind a busy street.', i: true}] as Line[],
    body: [
      'Knysna Inn sits right on Main Street, so coffee shops, restaurants and the lagoon are all a short walk away. Step through the arched gate and the street noise drops away. A paved courtyard, lanterns and a garden path lead to your own front door.',
      'Every unit is self-catering and has its own entrance. Bring your own food or eat out on Main Street, then fire up one of the two braai areas in the evening.',
    ],
    stats: [
      ['Unit types', '4'],
      ['Sleeps', '2–4'],
      ['Check-in from', '14:00'],
    ] as [string, string][],
  },
  inn: {
    kicker: 'The Inn',
    lines: [{t: 'One courtyard,'}, {t: 'many corners.', i: true}] as Line[],
    body: 'A courtyard of lanterns and green chairs, a garden walk past ferns and an old wagon wheel, and a sunny deck above the rooftops.',
  },
  explore: {
    kicker: 'On the doorstep',
    lines: [{t: 'Out the gate,'}, {t: 'into Knysna.', i: true}] as Line[],
  },
};

export const amenities = [
  {icon: 'wifi', label: 'Free Wi-Fi', note: 'In every unit and the courtyard'},
  {icon: 'car', label: 'Secure parking', note: 'Free, on site'},
  {icon: 'flame', label: 'Two braai areas', note: 'Shared by all guests'},
  {icon: 'kitchen', label: 'Self-catering', note: 'From kitchenettes to a full kitchen'},
  {icon: 'tv', label: 'DStv', note: 'Selected channels in each unit'},
  {icon: 'pin', label: 'Central', note: 'Waterfront ~10 min on foot'},
] as const;

export type Unit = {
  id: string;
  name: [string, string];
  sleeps: string;
  beds: string;
  // TODO: confirm current rates; these are the lowest published "from" prices.
  from: string;
  summary: string;
  features: string[];
  images: {src: string; alt: string}[];
  tint: string;
};

export const units: Unit[] = [
  {
    id: 'courtyard',
    name: ['Courtyard', 'Unit'],
    sleeps: '2 guests',
    beds: '1 queen',
    from: 'R750',
    summary: 'A snug studio that opens onto the courtyard, with a copper-washed feature wall, damask panels and pendant lights on either side of the bed.',
    features: ['Private entrance off the courtyard', 'En-suite shower & toilet', 'Bar fridge, microwave & kettle', 'Tea & coffee', 'TV with selected DStv channels', 'Braai access'],
    images: [
      {src: 'courtyard-unit.webp', alt: 'Queen bed against a copper feature wall, with black-and-white damask panels and pendant lamps'},
      {src: 'courtyard-unit-night.webp', alt: 'The same bed at night, with a leopard-print throw and patterned cushions'},
      {src: 'bathroom.webp', alt: 'En-suite with large stone-look tiles, a glass shower and fresh towels'},
    ],
    tint: '#16213a',
  },
  {
    id: 'queen-single',
    name: ['Courtyard', 'Queen & Single'],
    sleeps: '3 guests',
    beds: '1 queen, 1 single',
    from: 'R790',
    summary: 'The courtyard studio with room for a third guest. It has a single bed, a small dining table and a kitchenette with a granite top.',
    features: ['Private entrance off the courtyard', 'Shower en-suite', 'Kitchenette: bar fridge, microwave, kettle', 'Fan & essential toiletries', 'TV with selected DStv channels', 'Braai access'],
    images: [
      {src: 'queen-single.webp', alt: 'Queen bed with leopard throw, French doors open to the courtyard'},
      {src: 'queen-single-studio.webp', alt: 'Studio with a lit bed, dining table for two and kitchenette behind'},
      {src: 'kitchenette.webp', alt: 'White kitchenette with microwave, sink, kettle, toaster and bar fridge'},
    ],
    tint: '#c98a4b',
  },
  {
    id: 'street-facing',
    name: ['Street-Facing', 'Unit'],
    sleeps: '4 guests',
    beds: '1 queen, 2 singles',
    from: 'R810',
    summary: 'Our most affordable unit for a group. It is open-plan with wooden floors, a dining table and a kitchen with a stove, and it is on the Main Street side of the building.',
    features: ['Open-plan layout', 'Shower', 'Fridge, microwave & stove', 'Tea & coffee', 'TV with selected DStv channels', 'Braai access'],
    images: [
      {src: 'street-unit.webp', alt: 'Open-plan room with wooden floors, two beds, a table with white chairs and a wall-mounted TV'},
      {src: 'street-unit-dining.webp', alt: 'Dining table for two beside a kitchenette with a lit copper splashback'},
    ],
    tint: '#4e6b45',
  },
  {
    id: 'family-suite',
    name: ['Family', 'Suite'],
    sleeps: '4 guests',
    beds: '1 king, 1 bunk bed',
    from: 'R900',
    summary: 'Two bedrooms and a full kitchen with an oven and induction stove. The suite shares a sunny deck with a swing chair that looks out over the rooftops.',
    features: ['Two bedrooms, one bathroom', 'Full kitchen: oven & induction stove', 'Fridge & microwave', 'Shared deck with swing chair', 'Fan & essential toiletries', 'TV with selected DStv channels'],
    images: [
      {src: 'family-suite.webp', alt: 'King bed under recessed lights with a colourful portrait on the wall'},
      {src: 'family-kitchen.webp', alt: 'Full kitchen with black granite tops, oven, fridge and kettle'},
      {src: 'deck.webp', alt: 'Sunlit deck with a wooden table, white chairs and leafy trees under a blue sky'},
    ],
    tint: '#232d4a',
  },
];

export const rooms = {
  hero: {
    kicker: 'Rooms & rates',
    lines: [{t: 'Four ways'}, {t: 'to stay.', i: true}] as Line[],
    body: 'All units are self-catering and have their own entrance. Choose a courtyard studio for two or a two-bedroom suite for the family.',
    images: ['courtyard-unit.webp', 'queen-single.webp', 'family-suite.webp'],
    alt: 'Knysna Inn bedrooms with copper feature walls, damask panels and crisp white linen',
  },
  note: 'Rates are per unit per night, self-catering, and change with the season. Send us your dates and we will reply with an exact quote.',
  included: ['Free Wi-Fi', 'Free secure parking', 'Braai areas', 'Linen & towels', 'Check-in 14:00 · Check-out 10:00'],
};

export const inn = {
  hero: {
    kicker: 'The Inn',
    lines: [{t: 'Behind the'}, {t: 'gate,', i: true}, {t: 'a garden'}, {t: 'courtyard.', i: true}] as Line[],
    body: 'Lanterns, lattice and green chairs in the courtyard. Ferns and bamboo along the walk. A sunny deck above the tin roofs.',
    images: ['courtyard.webp', 'garden-walk.webp', 'rooftops.webp'],
    alt: 'The Knysna Inn courtyard, garden walkway and view over the rooftops',
  },
  stories: [
    {
      id: 'courtyard',
      kicker: '01 · The courtyard',
      lines: [{t: 'Coffee under'}, {t: 'the pergola.', i: true}] as Line[],
      body: 'Reception opens onto a paved courtyard with a reed pergola. There are tables under the trees, flowers in the beds and lanterns that come on at dusk. It is the place for morning coffee or a glass of wine after a day out.',
      image: 'courtyard.webp',
      alt: 'Paved courtyard with wooden tables, green chairs, potted flowers and a reed pergola',
    },
    {
      id: 'garden',
      kicker: '02 · The garden walk',
      lines: [{t: 'Ferns, bamboo'}, {t: '& a wagon wheel.', i: true}] as Line[],
      body: 'A stone path leads from the gate past a wall of white reeds, an old clay pot and a wagon wheel among the ferns. Every unit has its own door off the garden.',
      image: 'garden-walk.webp',
      alt: 'Stone garden path between bamboo, ferns and a wooden wagon wheel, with a reception sign on a reed fence',
    },
    {
      id: 'deck',
      kicker: '03 · The deck',
      lines: [{t: 'Sun on'}, {t: 'the rooftops.', i: true}] as Line[],
      body: 'Upstairs, a timber deck catches the morning sun and looks out over corrugated roofs and treetops to the hills behind town.',
      image: 'deck.webp',
      alt: 'Wooden table with white chairs on a sunny deck framed by French doors and leafy trees',
    },
    {
      id: 'street',
      kicker: '04 · On Main Street',
      lines: [{t: 'In the middle'}, {t: 'of everything.', i: true}] as Line[],
      body: 'Out front, the white building with navy window frames faces Main Street. Cafés, shops and restaurants are within a few minutes on foot, and the lagoon is just beyond them.',
      image: 'street-front.webp',
      alt: 'White double-storey building with navy window frames, an accommodation awning and flags on Main Street',
    },
  ],
  gallery: [
    {src: 'street-front.webp', alt: 'The inn from Main Street', tall: true},
    {src: 'courtyard.webp', alt: 'The courtyard with green chairs'},
    {src: 'entrance-arch.webp', alt: 'The black wrought-iron Knysna Inn entrance arch', tall: true},
    {src: 'garden-walk.webp', alt: 'The garden walk with a wagon wheel'},
    {src: 'courtyard-unit.webp', alt: 'Courtyard unit bed and copper feature wall', tall: true},
    {src: 'deck.webp', alt: 'The sunny deck'},
    {src: 'unit-door.webp', alt: 'A private unit entrance beside a garden lantern', tall: true},
    {src: 'rooftops.webp', alt: 'View over the rooftops to the hills'},
    {src: 'queen-single.webp', alt: 'Queen bed with French doors to the courtyard', tall: true},
    {src: 'night-front.webp', alt: 'The inn lit up at night on Main Street'},
    {src: 'covered-walk.webp', alt: 'Covered walkway with terracotta steps', tall: true},
    {src: 'family-kitchen.webp', alt: 'Family Suite kitchen'},
    {src: 'courtyard-umbrellas.webp', alt: 'Courtyard tables under red umbrellas'},
    {src: 'courtyard-unit-night.webp', alt: 'Courtyard unit at night', tall: true},
    {src: 'street-unit-dining.webp', alt: 'Dining corner and kitchenette'},
    {src: 'bathroom.webp', alt: 'Tiled en-suite with glass shower'},
  ],
};

export const explore = {
  hero: {
    kicker: 'Explore Knysna',
    lines: [{t: 'Out the gate,'}, {t: 'into the'}, {t: 'Garden Route.', i: true}] as Line[],
    body: 'Knysna has a lagoon, the Heads, beaches and some of the oldest forest in the country. You can walk to most of the town from your front door.',
    images: ['rooftops.webp', 'night-front.webp'],
    alt: 'View over Knysna rooftops to the hills, and the inn lit up at night',
  },
  // Distances are approximate travel times from 42 Main Street.
  places: [
    {name: 'Main Street', kind: 'Cafés & restaurants', time: 'On the doorstep', body: 'Coffee shops, bakeries and restaurants line Main Street. Most are a few minutes on foot.'},
    {name: 'Knysna Waterfront', kind: 'Harbour & lagoon', time: '~10 min walk', body: 'Shops, oyster bars and restaurants on the water. Lagoon cruises leave from here.'},
    {name: 'Thesen Island', kind: 'Island village', time: '~5 min drive', body: 'Canals, boardwalks, boutiques and restaurants on an island in the lagoon.'},
    {name: 'The Knysna Heads', kind: 'Viewpoint', time: '~10 min drive', body: 'Sandstone cliffs where the lagoon meets the Indian Ocean. Head to the eastern viewpoint for sunset.'},
    {name: 'Featherbed Nature Reserve', kind: 'Ferry & reserve', time: 'Ferry from the Waterfront', body: 'A private reserve on the western Head, reached by ferry across the lagoon.'},
    {name: 'Leisure Isle', kind: 'Lagoon beaches', time: '~10 min drive', body: 'Calm lagoon beaches for swimming, paddling and an evening walk.'},
    {name: 'Knysna Forests', kind: 'Hiking & nature', time: '~25 min drive', body: 'Ancient indigenous forest with shaded trails, giant yellowwoods and quiet picnic spots.'},
    {name: 'Brenton-on-Sea', kind: 'Ocean beach', time: '~20 min drive', body: 'A long, wild beach backed by fynbos-covered dunes.'},
  ],
  getting: [
    ['By car', 'The N2 runs through town as Main Street, so you drive right up to our door. Free secure parking is on site.'],
    ['By air', 'George Airport is about an hour west on the N2.'],
    ['On foot', 'Once you are here, you can walk to Main Street, the Waterfront and the Quays.'],
  ] as [string, string][],
};

export const contactPage = {
  hero: {
    kicker: 'Contact & booking',
    lines: [{t: 'Book your'}, {t: 'stay.', i: true}] as Line[],
    body: 'Send us your dates and we will reply with availability and an exact quote. You can also phone or WhatsApp us.',
    images: ['entrance-arch.webp', 'unit-door.webp'],
    alt: 'The wrought-iron Knysna Inn entrance arch and a private unit door',
  },
};

export const footer = {
  blurb: 'Boutique self-catering on Main Street, Knysna. Private entrances, a garden courtyard and secure parking, in the middle of town.',
};

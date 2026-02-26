export interface EventItem {
  id: string;
  tag?: string;
  date: string;
  title: string;
  location: string;
  price: string;
  image: string;
  alt: string;
  isFeatured: boolean;
}

export const mockCategories = [
  { name: 'Music', icon: 'music_note', active: true },
  { name: 'Tech', icon: 'memory', active: false },
  { name: 'Workshops', icon: 'edit', active: false },
  { name: 'Food & Drink', icon: 'restaurant', active: false },
  { name: 'Sports', icon: 'fitness_center', active: false },
];

export const mockEvents: EventItem[] = [
  {
    id: 'f1',
    tag: 'PREMIUM',
    date: 'DEC 12 • OPERA HOUSE',
    title: 'Grand Symphony Night',
    location: 'Experience the magic of classical masterpieces.',
    price: 'From $120',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEb4WbMXEVqSJO0siNuVPK6hls88GpVA_ui4VxtbUL91D_uKy8Ew8skNtr4yszHB8Llg6Vq3X1rDDDffz8ray6J6mOFHLF50QB3C0_2H4EhudBj3yp1NOMOgo55f07K5ocB94i5UXbgK401xoPWRd0SkHsLGSPwnv5ExtOa0wbkP5XiR9hupGzVZWEc0DUv2IUJzaEG4W0s2l1y_PBoud66abX2H2r25QGlkQsExmmrhq-ljO5Ybs2_e3qycn8vND5ew7vxDk4dhI',
    alt: 'Grand symphony orchestra performing in a luxury hall',
    isFeatured: true,
  },
  {
    id: 'f2',
    tag: 'EXCLUSIVE',
    date: 'JAN 15 • TECH HUB',
    title: 'Tech Innovators Summit',
    location: 'Networking with world-class tech visionaries.',
    price: 'From $250',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFeDJ0JTjxYbCzVxnwN1QG__-E1Bp3JI066c9TvKxWDkkiA9r5LI23OM8NHveOG0cem2VRek06c23JTQu8NoQAf9iji3u7RBMyfvTaqJyOzsX207p6C-4SXZ5k2_kwyDdf7wR8cakQRJenGlT-mhOHocyTmT-BJRlXtW7bXWPYm_wSjBFmjZtzI72sWu5YdT_GSz3FJQYuKatmC3uMN6fwEV9JFZIWOL8tg9bMFJ0wfFMJC4el-opTot12XktrJQvWDww4Nsjylwk',
    alt: 'Futuristic technology conference with neon lights',
    isFeatured: true,
  },
  {
    id: 'f3',
    tag: 'LIMITED',
    date: 'FEB 05 • VINEYARD ESTATE',
    title: 'Luxury Wine Tasting',
    location: 'Premium selection of vintage estate wines.',
    price: 'From $150',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFU6E6wvy9N4Ddop8Nszzg6ugLrsPs0yJkXSuVXboJ71rmtmLbnuGxVf-6iJuLb0BpyPP2tq9c_ZhnTzZDRaKlA27iJq18eFNu2TEF1tt0SUgOlNGVhIGHGIg92V-lemiBR_WCgGiCRXXwFlQ075DCmiyskR2Xls_8go2hIWRcSa2isaJMtQYpxhfDi8FreDHpFiumfnt2RobS8zB-XEVQelVrs44zx2i3DovlDt61qHU5igs5jUuZYTDRtt6xSK-7r-jSeBqbRK8',
    alt: 'Elegantly arranged wine tasting event at a vineyard',
    isFeatured: true,
  },
  {
    id: 'u1',
    tag: '',
    date: 'FRI, JUL 12 • 8:00 PM',
    title: 'Summer Rooftop Mix',
    location: 'Central Park West, New York',
    price: '$45',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB31tgh6JHDH2DQ4BHD3Ogu2T49uQH6KadKcw7lGfsJIi6AXdW4WxNfDZa1Dvv52o9vbEXHIOEHXW46qDmIPljO13_jsqFJpMISnqivZDs6HLgR2wKruqgyViK8RcsyMGgbw6MULYn6e7iUOGI1PJF0w0pYIe3XmgxClcfZrf-8O0g-lGxpZ6ersOdlUFTYPQvNo_fWgWVDgzQ5LkQ0EYnhWCB7rKaXUBAqX8C-NatDJPYy7yNpNn0ZhZaU02nPpEcsQEGlD7AeA1g',
    alt: 'Summer rooftop party with sunset view',
    isFeatured: false,
  },
  {
    id: 'u2',
    tag: '',
    date: 'MON, JUL 15 • 10:00 AM',
    title: 'Design Thinking Workshop',
    location: 'Innovation Center, Brooklyn',
    price: '$80',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9jrXCoC4JHFenp-kqYGMmAkd6BY7Wc9j_Mt0X2JrdH36WfWJXdXHkLiBZnJ6nEiwpDiJzGdFSqm8-mb5HuxqjC6vXvYImZANhf0TymX8fT6Q1NlIpz9YmgHiYfV8rCHc55Q3t7P5iIM2TwtwyOn0gdXu4CWLO7Ul78pIQvxgiy1brnREtI9Rf77hLL99FhiYAA-N5NVz6tvFUUWUkGyLmdw8h2aDbJhbTaFkUjgPfLQyMokNK9-j2QAG06GRQurfxrn5Y25RU2QI',
    alt: 'Creative professional workshop session',
    isFeatured: false,
  },
  {
    id: 'u3',
    tag: '',
    date: 'SAT, JUL 20 • 1:00 PM',
    title: 'Brooklyn Food Fest',
    location: 'Waterfront Park, Brooklyn',
    price: 'Free',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAizHcTJ_8OWKqmfDoAxm4vgURYud9CyO9-D8bmX2auJNyV-DNObRhMeUoDwjuwGczkN2uev7bwdgcd2_KVsjnMmg684tpkdrBjokgJXvTTYWpt5gg6wCDgyuwiLDGv9WgHpSsT8cXpDXFWrmbW6ZU9a0OU2_arP04fQ9ODpG06Ml86F9aE7MWBBnNtAPuJeyE7z0n-hwlza8lI_kn7NEcgS67kN5lldSfCXgpzuhyzrFz9gHahH_T7nk4DU7pFPE4i7r10xljVXUU',
    alt: 'Gourmet food festival stalls',
    isFeatured: false,
  }
];

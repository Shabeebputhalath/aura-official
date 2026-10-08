export interface WorkProject {
  id: string;
  title: string;
  category: string;
  categoryFilter: string;
  year: string;
  client: string;
  description: string;
  image: string;
  creativeDirection: string;
  productionDetails: string;
  behindScenes: string[];
  featured?: boolean;
  span: 'wide' | 'tall' | 'normal';
}

export const workProjects: WorkProject[] = [
  {
    id: 'neon-future',
    title: 'NEON FUTURE',
    category: 'Brand Film',
    categoryFilter: 'brand',
    year: '2026',
    client: 'VOLT Industries',
    description: 'A cinematic futuristic campaign created entirely with AI — exploring a world where technology and humanity converge in a neon-lit metropolis. Every frame was generated, directed, and composited to feel like a blockbuster film opening.',
    image: 'https://images.pexels.com/photos/35161171/pexels-photo-35161171.jpeg?auto=compress&cs=tinysrgb&w=1400',
    creativeDirection: 'Directed by the AURA creative team, the film blends cyberpunk aesthetics with high-fashion cinematography to create a world that feels both alien and familiar.',
    productionDetails: 'AI generation, cinematic color grading, custom sound design, motion graphics. Delivered in 16:9 and 9:16 formats.',
    behindScenes: [
      'https://images.pexels.com/photos/35171253/pexels-photo-35171253.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/35161189/pexels-photo-35161189.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/18545013/pexels-photo-18545013.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    featured: true,
    span: 'wide',
  },
  {
    id: 'origin',
    title: 'ORIGIN',
    category: 'Product Commercial',
    categoryFilter: 'product',
    year: '2026',
    client: 'Lumière',
    description: 'A luxury product film combining AI-generated environments with cinematic storytelling. The film follows the journey of a fragrance bottle through surreal, dreamlike landscapes.',
    image: 'https://images.pexels.com/photos/9202892/pexels-photo-9202892.jpeg?auto=compress&cs=tinysrgb&w=1000',
    creativeDirection: 'Minimalist luxury aesthetic with warm gold tones and soft, diffused lighting to evoke elegance and desire.',
    productionDetails: 'AI environments, product compositing, color treatment, sound design. 30-second and 60-second cuts delivered.',
    behindScenes: [
      'https://images.pexels.com/photos/13186049/pexels-photo-13186049.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/23384400/pexels-photo-23384400.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1595233/pexels-photo-1595233.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    span: 'tall',
  },
  {
    id: 'dreamscape',
    title: 'DREAMSCAPE',
    category: 'Fashion Film',
    categoryFilter: 'fashion',
    year: '2026',
    client: 'Atelier Noir',
    description: 'An experimental fashion campaign built around surreal AI-generated worlds. The film blurs the line between reality and dream, with each scene transitioning into a more abstract visual landscape.',
    image: 'https://images.pexels.com/photos/32321598/pexels-photo-32321598.jpeg?auto=compress&cs=tinysrgb&w=1000',
    creativeDirection: 'Surreal, painterly fashion direction with bold red accents against dark, moody backgrounds. Inspired by avant-garde editorial photography.',
    productionDetails: 'AI character generation, environment design, editorial color grading, original score.',
    behindScenes: [
      'https://images.pexels.com/photos/12264712/pexels-photo-12264712.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/4616822/pexels-photo-4616822.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/31542338/pexels-photo-31542338.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    span: 'normal',
  },
  {
    id: 'beyond-earth',
    title: 'BEYOND EARTH',
    category: 'Concept Film',
    categoryFilter: 'brand',
    year: '2026',
    client: 'Orbital Tech',
    description: 'A sci-fi cinematic experience created for a global technology brand. The film imagines humanity\'s first encounter with a ringed planet, blending awe with isolation.',
    image: 'https://images.pexels.com/photos/36941390/pexels-photo-36941390.jpeg?auto=compress&cs=tinysrgb&w=1400',
    creativeDirection: 'Epic sci-fi visual language with deep space cinematography, volumetric lighting, and a sense of vast scale.',
    productionDetails: 'AI space environments, spacecraft design, atmospheric effects, cinematic sound design, 4K delivery.',
    behindScenes: [
      'https://images.pexels.com/photos/36775812/pexels-photo-36775812.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/8474423/pexels-photo-8474423.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/38741115/pexels-photo-38741115.png?auto=compress&cs=tinysrgb&w=600',
    ],
    span: 'wide',
  },
  {
    id: 'midnight-run',
    title: 'MIDNIGHT RUN',
    category: 'Automotive',
    categoryFilter: 'automotive',
    year: '2026',
    client: 'Apex Motors',
    description: 'A high-energy AI automotive commercial. The film captures a luxury sports car tearing through neon-lit city streets at midnight, with motion blur and light trails creating pure adrenaline.',
    image: 'https://images.pexels.com/photos/28984433/pexels-photo-28984433.jpeg?auto=compress&cs=tinysrgb&w=1000',
    creativeDirection: 'High-contrast automotive cinematography with neon reflections, wet asphalt, and a sense of raw speed.',
    productionDetails: 'AI car rendering, city environments, motion effects, sound design, social media cuts.',
    behindScenes: [
      'https://images.pexels.com/photos/24589327/pexels-photo-24589327.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/20398056/pexels-photo-20398056.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/94272/sports-car-pkw-auto-vehicle-94272.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    span: 'normal',
  },
  {
    id: 'the-last-light',
    title: 'THE LAST LIGHT',
    category: 'Short Film',
    categoryFilter: 'brand',
    year: '2026',
    client: 'Ember Pictures',
    description: 'An emotional cinematic short created with generative AI. The film tells the story of the last person on Earth watching the final sunset, a meditation on memory and loss.',
    image: 'https://images.pexels.com/photos/19615558/pexels-photo-19615558.jpeg?auto=compress&cs=tinysrgb&w=1000',
    creativeDirection: 'Intimate, painterly direction with dramatic chiaroscuro lighting. Every frame composed as a fine-art photograph.',
    productionDetails: 'AI character generation, environment design, emotional color grading, original score, sound design.',
    behindScenes: [
      'https://images.pexels.com/photos/7277907/pexels-photo-7277907.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/6695554/pexels-photo-6695554.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/14424552/pexels-photo-14424552.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    span: 'tall',
  },
  {
    id: 'echo',
    title: 'ECHO',
    category: 'Music Visual',
    categoryFilter: 'music',
    year: '2026',
    client: 'Sonance Records',
    description: 'A cinematic music visual that syncs AI-generated imagery with the rhythm and emotion of the track. Each beat triggers a new visual world, creating a synesthetic journey.',
    image: 'https://images.pexels.com/photos/6270135/pexels-photo-6270135.jpeg?auto=compress&cs=tinysrgb&w=1000',
    creativeDirection: 'Pulsating, rhythmic visuals that mirror the music\'s energy — from intimate moments to explosive crescendos.',
    productionDetails: 'AI visual generation, audio-reactive compositing, color treatment, motion graphics, vertical and horizontal delivery.',
    behindScenes: [
      'https://images.pexels.com/photos/8041226/pexels-photo-8041226.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/12745500/pexels-photo-12745500.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/5642756/pexels-photo-5642756.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    span: 'normal',
  },
  {
    id: 'void',
    title: 'VOID',
    category: 'Experimental Film',
    categoryFilter: 'experimental',
    year: '2026',
    client: 'Self-Initiated',
    description: 'An experimental AI film exploring the space between form and abstraction. The piece dissolves recognizable imagery into pure light, color, and motion — a visual meditation on the void.',
    image: 'https://images.pexels.com/photos/15578335/pexels-photo-15578335.png?auto=compress&cs=tinysrgb&w=1000',
    creativeDirection: 'Pure abstraction with metallic textures, liquid forms, and shifting color fields. No narrative — only sensation.',
    productionDetails: 'AI generation, abstract compositing, color manipulation, ambient sound design. Art installation format.',
    behindScenes: [
      'https://images.pexels.com/photos/13026924/pexels-photo-13026924.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/4486666/pexels-photo-4486666.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/39033732/pexels-photo-39033732.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    span: 'normal',
  },
];

export const workFilters = [
  { id: 'all', label: 'All' },
  { id: 'brand', label: 'Brand Films' },
  { id: 'commercials', label: 'Commercials' },
  { id: 'product', label: 'Product' },
  { id: 'fashion', label: 'Fashion' },
  { id: 'automotive', label: 'Automotive' },
  { id: 'music', label: 'Music' },
  { id: 'experimental', label: 'Experimental' },
];


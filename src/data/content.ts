export interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  description: string;
  image: string;
  span: 'wide' | 'tall' | 'normal';
}

export const projects: Project[] = [
  {
    id: 'neon-future',
    title: 'NEON FUTURE',
    client: 'VOLT Industries',
    category: 'Brand Film',
    description: 'Cinematic futuristic campaign created entirely with AI.',
    image: 'https://images.pexels.com/photos/35161171/pexels-photo-35161171.jpeg?auto=compress&cs=tinysrgb&w=1200',
    span: 'wide',
  },
  {
    id: 'origin',
    title: 'ORIGIN',
    client: 'Lumière',
    category: 'Product Commercial',
    description: 'Luxury product film combining AI environments and cinematic storytelling.',
    image: 'https://images.pexels.com/photos/9202892/pexels-photo-9202892.jpeg?auto=compress&cs=tinysrgb&w=800',
    span: 'tall',
  },
  {
    id: 'dreamscape',
    title: 'DREAMSCAPE',
    client: 'Atelier Noir',
    category: 'Fashion Film',
    description: 'Experimental fashion campaign built around surreal AI-generated worlds.',
    image: 'https://images.pexels.com/photos/32321598/pexels-photo-32321598.jpeg?auto=compress&cs=tinysrgb&w=800',
    span: 'normal',
  },
  {
    id: 'beyond-earth',
    title: 'BEYOND EARTH',
    client: 'Orbital Tech',
    category: 'Concept Film',
    description: 'Sci-fi cinematic experience created for a global technology brand.',
    image: 'https://images.pexels.com/photos/36941390/pexels-photo-36941390.jpeg?auto=compress&cs=tinysrgb&w=1200',
    span: 'wide',
  },
  {
    id: 'midnight-run',
    title: 'MIDNIGHT RUN',
    client: 'Apex Motors',
    category: 'Automotive',
    description: 'High-energy AI automotive commercial.',
    image: 'https://images.pexels.com/photos/28984433/pexels-photo-28984433.jpeg?auto=compress&cs=tinysrgb&w=800',
    span: 'normal',
  },
  {
    id: 'the-last-light',
    title: 'THE LAST LIGHT',
    client: 'Ember Pictures',
    category: 'Short Film',
    description: 'Emotional cinematic storytelling created with generative AI.',
    image: 'https://images.pexels.com/photos/19615558/pexels-photo-19615558.jpeg?auto=compress&cs=tinysrgb&w=800',
    span: 'tall',
  },
];

export interface Service {
  icon: string;
  title: string;
  description: string;
}

export const services: Service[] = [
  {
    icon: 'Film',
    title: 'AI Commercials',
    description: 'Cinematic advertisements designed for brands, products, and campaigns.',
  },
  {
    icon: 'Clapperboard',
    title: 'AI Brand Films',
    description: 'High-concept visual storytelling that builds brand identity.',
  },
  {
    icon: 'Package',
    title: 'Product Videos',
    description: 'Premium product visualization without traditional production limitations.',
  },
  {
    icon: 'Smartphone',
    title: 'Social Media Content',
    description: 'High-volume, scroll-stopping AI content for Instagram, TikTok, YouTube, and more.',
  },
  {
    icon: 'Music',
    title: 'AI Music Videos',
    description: 'Experimental and cinematic music visuals powered by AI.',
  },
  {
    icon: 'Lightbulb',
    title: 'Concept & Pre-Visualization',
    description: 'Turn ideas, scripts, and concepts into cinematic visual experiences before production.',
  },
  {
    icon: 'Users',
    title: 'AI Character & World Creation',
    description: 'Build original characters, environments, and visual worlds.',
  },
  {
    icon: 'Scissors',
    title: 'Post-Production',
    description: 'Editing, sound design, color treatment, compositing, motion graphics, and final delivery.',
  },
];

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'DISCOVER',
    description: 'Understand the brand, audience, objective, and creative direction.',
  },
  {
    number: '02',
    title: 'CONCEPT',
    description: 'Develop the story, visual language, references, and creative concept.',
  },
  {
    number: '03',
    title: 'GENERATE',
    description: 'Create characters, environments, shots, and cinematic sequences using AI.',
  },
  {
    number: '04',
    title: 'REFINE',
    description: 'Edit, upscale, animate, color-grade, composite, and polish every frame.',
  },
  {
    number: '05',
    title: 'DELIVER',
    description: 'Final cinematic video optimized for advertising, social media, or campaigns.',
  },
];

export interface Capability {
  label: string;
  image: string;
}

export const capabilities: Capability[] = [
  { label: 'Cinematic Worlds', image: 'https://images.pexels.com/photos/35161189/pexels-photo-35161189.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { label: 'Product Visualization', image: 'https://images.pexels.com/photos/13186049/pexels-photo-13186049.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { label: 'AI Characters', image: 'https://images.pexels.com/photos/8107826/pexels-photo-8107826.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { label: 'Fashion & Editorial', image: 'https://images.pexels.com/photos/12264712/pexels-photo-12264712.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { label: 'Architecture', image: 'https://images.pexels.com/photos/3137084/pexels-photo-3137084.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { label: 'Automotive', image: 'https://images.pexels.com/photos/24589327/pexels-photo-24589327.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { label: 'Sci-Fi', image: 'https://images.pexels.com/photos/36775812/pexels-photo-36775812.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { label: 'Fantasy', image: 'https://images.pexels.com/photos/4616822/pexels-photo-4616822.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { label: 'Luxury', image: 'https://images.pexels.com/photos/9202892/pexels-photo-9202892.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { label: 'Food & Beverage', image: 'https://images.pexels.com/photos/12584751/pexels-photo-12584751.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { label: 'Technology', image: 'https://images.pexels.com/photos/8640331/pexels-photo-8640331.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { label: 'Music Videos', image: 'https://images.pexels.com/photos/6270135/pexels-photo-6270135.jpeg?auto=compress&cs=tinysrgb&w=600' },
];

export interface PricingPlan {
  name: string;
  price: string;
  tagline: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

export const pricingPlans: PricingPlan[] = [
  {
    name: 'STARTER',
    price: '$499',
    tagline: 'For creators and small campaigns.',
    features: [
      '1 AI video',
      'Up to 30 seconds',
      'Creative concept',
      'AI generation',
      'Basic editing',
      '1 revision',
      'Social media delivery',
    ],
    cta: 'Get Started',
  },
  {
    name: 'STUDIO',
    price: '$1,499',
    tagline: 'Most Popular',
    features: [
      'Up to 3 AI videos',
      'Up to 60 seconds each',
      'Creative direction',
      'Storyboarding',
      'Advanced AI generation',
      'Cinematic editing',
      'Sound design',
      '2 revisions',
      'Multiple aspect ratios',
    ],
    cta: 'Start a Project',
    popular: true,
  },
  {
    name: 'SIGNATURE',
    price: '$3,999+',
    tagline: 'For brands and major campaigns.',
    features: [
      'Custom campaign',
      'Multiple videos',
      'Full creative direction',
      'Advanced cinematic AI production',
      'Custom characters/worlds',
      'Professional sound design',
      'Motion graphics',
      'Color grading',
      'Multiple revisions',
      'Dedicated creative support',
    ],
    cta: 'Talk to Our Team',
  },
];

export interface Testimonial {
  quote: string;
  name: string;
  position: string;
  company: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: 'AURA AI transformed our brand campaign into something that felt like a Hollywood production — at a fraction of the cost and timeline. The cinematic quality stunned our entire team.',
    name: 'Sarah Chen',
    position: 'VP of Marketing',
    company: 'VOLT Industries',
    avatar: 'https://images.pexels.com/photos/38197025/pexels-photo-38197025.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    quote: 'We needed a product film that felt premium and otherworldly. What they delivered exceeded every expectation. It became our highest-performing ad creative of the year.',
    name: 'Marcus Webb',
    position: 'Creative Director',
    company: 'Lumière',
    avatar: 'https://images.pexels.com/photos/36687799/pexels-photo-36687799.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    quote: 'The level of artistic direction combined with AI generation is unmatched. They don\'t just use AI — they direct it like filmmakers. That difference shows in every frame.',
    name: 'Elena Rodriguez',
    position: 'Head of Brand',
    company: 'Atelier Noir',
    avatar: 'https://images.pexels.com/photos/36623225/pexels-photo-36623225.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
];

export interface FAQItem {
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    question: 'What exactly is AI video production?',
    answer: 'AI video production combines generative AI tools with traditional filmmaking techniques — creative direction, cinematography, editing, sound design — to create cinematic videos without the need for physical cameras, sets, or large crews. We direct AI like a film crew, not just generate content.',
  },
  {
    question: 'Can you create videos from our existing brand assets?',
    answer: 'Yes. We can incorporate your brand guidelines, logos, color palettes, product photography, and existing visual assets into the AI production process to ensure every video feels authentically yours.',
  },
  {
    question: 'Can you create realistic product advertisements?',
    answer: 'Absolutely. Product visualization is one of our specialties. We can create photorealistic product films with AI-generated environments, lighting, and cinematic camera moves that would traditionally require a full studio shoot.',
  },
  {
    question: 'How long does a project take?',
    answer: 'Timelines vary by scope. A Starter package typically delivers in 5–7 business days. Studio packages take 2–3 weeks. Signature campaigns with multiple videos and custom worlds can take 4–8 weeks depending on complexity.',
  },
  {
    question: 'Can you create videos for social media?',
    answer: 'Yes — we deliver in any aspect ratio you need. Vertical for TikTok and Instagram Reels, square for feeds, and wide for YouTube. We optimize every format for maximum engagement on each platform.',
  },
  {
    question: 'Do you provide voiceovers and music?',
    answer: 'Yes. We offer AI-generated voiceovers in multiple languages and styles, licensed music selection, custom sound design, and original score creation as part of our post-production services.',
  },
  {
    question: 'Can you work from an existing script?',
    answer: 'Definitely. Share your script, treatment, or even a rough concept document. Our creative team will develop it into a full cinematic production plan with visual direction, shot lists, and style references.',
  },
  {
    question: 'Can you create custom characters and environments?',
    answer: 'Yes. We build original AI characters with consistent appearance across multiple shots and scenes, as well as fully realized environments and worlds tailored to your brand and story.',
  },
  {
    question: 'Do you offer custom pricing?',
    answer: 'For projects that don\'t fit our standard packages, we offer fully custom production plans. Tell us about your campaign and we\'ll build a tailored proposal around your goals and budget.',
  },
  {
    question: 'What formats do you deliver?',
    answer: 'We deliver in all major formats — MP4, MOV, ProRes — at resolutions up to 4K. We also provide web-optimized versions, social media formats, and any specific delivery specs you require.',
  },
];

export const clientLogos: string[] = [
  'VOLT',
  'LUMIÈRE',
  'ATELIER NOIR',
  'ORBITAL',
  'APEX',
  'EMBER',
  'NOVAFORGE',
];


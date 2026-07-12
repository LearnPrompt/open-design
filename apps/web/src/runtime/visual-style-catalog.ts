import type { FormOption } from '../artifacts/question-form';

export type VisualStyleContext = 'deck' | 'prototype';

export type VisualStyleVariant =
  | 'editorial'
  | 'minimal'
  | 'playful'
  | 'utility'
  | 'luxury'
  | 'brutalist'
  | 'human';

export interface VisualStyleCard {
  value: string;
  title: string;
  description: string;
  variant: VisualStyleVariant;
  recommended?: boolean;
}

interface VisualStylePreset {
  match: RegExp;
  variant: VisualStyleVariant;
  title: string;
  description: string;
  recommended?: boolean;
}

const DECK_PRESETS: VisualStylePreset[] = [
  {
    match: /editorial|magazine/i,
    variant: 'editorial',
    title: 'Editorial narrative',
    description: 'Strong hierarchy, considered pacing, confident typography.',
  },
  {
    match: /modern|minimal/i,
    variant: 'minimal',
    title: 'Product keynote',
    description: 'Quiet layouts, generous space, one clear idea per slide.',
    recommended: true,
  },
  {
    match: /playful|illustrative/i,
    variant: 'playful',
    title: 'Bold storytelling',
    description: 'Expressive shapes and lively compositions for memorable beats.',
  },
  {
    match: /tech|utility/i,
    variant: 'utility',
    title: 'Data briefing',
    description: 'Dense but legible systems for metrics, diagrams, and decisions.',
  },
  {
    match: /luxury|refined/i,
    variant: 'luxury',
    title: 'Premium pitch',
    description: 'Restrained color, elegant type, and polished product framing.',
  },
  {
    match: /brutalist|experimental/i,
    variant: 'brutalist',
    title: 'Experimental grid',
    description: 'High contrast, assertive type, and unconventional pacing.',
  },
  {
    match: /human|approachable/i,
    variant: 'human',
    title: 'Warm workshop',
    description: 'Friendly typography and accessible, people-first storytelling.',
  },
];

const PROTOTYPE_PRESETS: VisualStylePreset[] = [
  {
    match: /editorial|magazine/i,
    variant: 'editorial',
    title: 'Content-led product',
    description: 'Editorial rhythm, expressive type, and immersive content surfaces.',
  },
  {
    match: /modern|minimal/i,
    variant: 'minimal',
    title: 'Quiet SaaS',
    description: 'Precise spacing, calm controls, and a focused product hierarchy.',
    recommended: true,
  },
  {
    match: /playful|illustrative/i,
    variant: 'playful',
    title: 'Expressive consumer',
    description: 'Friendly color, rounded interactions, and moments of delight.',
  },
  {
    match: /tech|utility/i,
    variant: 'utility',
    title: 'Dense utility',
    description: 'Compact navigation and information-rich views for expert workflows.',
  },
  {
    match: /luxury|refined/i,
    variant: 'luxury',
    title: 'Premium commerce',
    description: 'Image-led layouts, refined details, and deliberate restraint.',
  },
  {
    match: /brutalist|experimental/i,
    variant: 'brutalist',
    title: 'Experimental interface',
    description: 'Graphic contrast, raw structure, and unconventional interaction cues.',
  },
  {
    match: /human|approachable/i,
    variant: 'human',
    title: 'Friendly service',
    description: 'Comfortable density, reassuring language, and welcoming surfaces.',
  },
];

export function visualStyleCardsForOptions(
  context: VisualStyleContext,
  options: FormOption[],
): VisualStyleCard[] {
  const presets = context === 'deck' ? DECK_PRESETS : PROTOTYPE_PRESETS;
  return options.map((option, index) => {
    const preset = presets.find(
      (candidate) => candidate.match.test(option.label) || candidate.match.test(option.value),
    );
    return {
      value: option.value,
      title: preset?.title ?? option.label,
      description:
        option.description ??
        preset?.description ??
        (context === 'deck'
          ? 'A distinct presentation system for this story.'
          : 'A distinct interface system for this product.'),
      variant: preset?.variant ?? fallbackVariant(index),
      recommended: preset?.recommended,
    };
  });
}

function fallbackVariant(index: number): VisualStyleVariant {
  const variants: VisualStyleVariant[] = [
    'editorial',
    'minimal',
    'playful',
    'utility',
    'luxury',
    'brutalist',
    'human',
  ];
  return variants[index % variants.length] ?? 'minimal';
}

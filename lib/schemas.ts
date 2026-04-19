import { z } from 'zod';

export const SERVICE_VALUES = [
  'photography',
  'videography',
  'web-design',
  'social-media',
  'ai-business',
  'other',
] as const;

export const BUDGET_VALUES = [
  'under-500',
  '500-1500',
  '1500-5000',
  '5000-plus',
  'not-sure',
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name').max(80),
  email: z.string().trim().email('Enter a valid email').max(120),
  phone: z
    .string()
    .trim()
    .max(20)
    .optional()
    .or(z.literal(''))
    .refine((v) => !v || v.length >= 7, { message: 'Phone looks a bit short' }),
  service: z.enum(SERVICE_VALUES, { errorMap: () => ({ message: 'Pick a service' }) }),
  eventDate: z.string().optional().or(z.literal('')),
  budget: z.enum(BUDGET_VALUES).optional().or(z.literal('')),
  message: z
    .string()
    .trim()
    .min(10, 'A line or two helps')
    .max(2000, "That's a lot — keep it under 2,000 chars"),
  website: z.string().max(0).optional(), // honeypot
  turnstileToken: z.string().min(1, 'Please complete the challenge'),
});

export type ContactPayload = z.infer<typeof contactSchema>;

export const SERVICE_LABELS: Record<(typeof SERVICE_VALUES)[number], string> = {
  photography: 'Photography',
  videography: 'Videography',
  'web-design': 'Web Design',
  'social-media': 'Social Media',
  'ai-business': 'AI Assistance',
  other: 'Something else',
};

export const BUDGET_LABELS: Record<(typeof BUDGET_VALUES)[number], string> = {
  'under-500': 'Under £500',
  '500-1500': '£500 – £1,500',
  '1500-5000': '£1,500 – £5,000',
  '5000-plus': '£5,000+',
  'not-sure': 'Not sure yet',
};

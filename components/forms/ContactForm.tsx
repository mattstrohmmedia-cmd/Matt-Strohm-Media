'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  contactSchema, SERVICE_VALUES, SERVICE_LABELS, BUDGET_VALUES, BUDGET_LABELS,
  type ContactPayload,
} from '@/lib/schemas';
import { Turnstile } from './Turnstile';
import { Arrow } from '@/components/primitives/Button';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const {
    register, handleSubmit, setValue, watch, reset,
    formState: { errors },
  } = useForm<ContactPayload>({
    resolver: zodResolver(contactSchema),
    defaultValues: { service: 'photography', website: '' },
    mode: 'onBlur',
  });

  const onSubmit = async (data: ContactPayload) => {
    setStatus('submitting');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || 'Something went wrong. Please try again.');
      }
      setStatus('success');
      reset();
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Unexpected error.');
    }
  };

  return (
    <AnimatePresence mode="wait">
      {status === 'success' ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
          className="bg-surface border border-accent/30 p-10 text-center"
        >
          <div className="font-display text-accent text-3xl mb-3">Message sent.</div>
          <p className="text-text-dim text-sm leading-relaxed max-w-sm mx-auto">
            I&apos;ll be in touch within one working day. Check your inbox — you should have a confirmation email.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="text-xs tracking-[0.2em] uppercase text-accent mt-6 hover:text-accent-bright transition-colors"
          >
            Send another
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          id="contact-form"
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="space-y-5"
          noValidate
        >
          {/* Honeypot */}
          <input type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden {...register('website')} />

          <div className="grid md:grid-cols-2 gap-5">
            <Field label="Your name" error={errors.name?.message}>
              <input className="field-input" autoComplete="name" {...register('name')} aria-invalid={!!errors.name} />
            </Field>
            <Field label="Email" error={errors.email?.message}>
              <input type="email" className="field-input" autoComplete="email" {...register('email')} aria-invalid={!!errors.email} />
            </Field>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <Field label="Phone (optional)" error={errors.phone?.message}>
              <input type="tel" className="field-input" autoComplete="tel" {...register('phone')} />
            </Field>
            <Field label="Service" error={errors.service?.message}>
              <select className="field-input" {...register('service')}>
                {SERVICE_VALUES.map(v => (
                  <option key={v} value={v}>{SERVICE_LABELS[v]}</option>
                ))}
              </select>
            </Field>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <Field label="Event date (optional)" error={errors.eventDate?.message}>
              <input type="date" className="field-input" {...register('eventDate')} />
            </Field>
            <Field label="Budget (optional)" error={errors.budget?.message}>
              <select className="field-input" {...register('budget')}>
                <option value="">Select budget</option>
                {BUDGET_VALUES.map(v => (
                  <option key={v} value={v}>{BUDGET_LABELS[v]}</option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Tell me about your project" error={errors.message?.message}>
            <textarea rows={6} className="field-input resize-y" {...register('message')} aria-invalid={!!errors.message} />
          </Field>

          {status === 'error' && (
            <div role="alert" className="text-sm text-[#e07a6b] border border-[#e07a6b]/30 bg-[#e07a6b]/5 px-4 py-3">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? 'Sending…' : (<>Send enquiry <Arrow /></>)}
          </button>

          <p className="text-xs text-text-muted">
            By submitting, you agree to be contacted about your enquiry. No marketing, no list.
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      {children}
      {error && <p className="field-error">{error}</p>}
    </label>
  );
}

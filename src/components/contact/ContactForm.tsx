/**
 * components/contact/ContactForm.tsx
 * ─────────────────────────────────────────────────────────────────
 * SENO Studio inquiry form.
 *
 * Key behaviours:
 *  • Reads ?service=SIG_UI_01 and ?tier=SIG_CURRENT_02 from the URL
 *    via react-router-dom's useSearchParams — pre-selects the matching
 *    option in the Service dropdown on mount.
 *  • Controlled form with full client-side validation.
 *  • Three-state UI: idle → submitting (spinner) → success / error.
 *  • POSTs to /api/contact (Vercel serverless function).
 *  • Framer Motion field-by-field stagger reveal.
 *  • All inputs use consistent SENO token styling.
 * ─────────────────────────────────────────────────────────────────
 */

'use client';

import React, { useState, useEffect, useId } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { SignalLine } from '../shared/SignalLine';
import { services } from '../../lib/content';
import { staggerContainer, listItem, fadeUp, EASE_SIGNAL } from '../../lib/motion-variants';

// ─── Types ────────────────────────────────────────────────────────

interface FormFields {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface FieldError {
  name?: string;
  email?: string;
  message?: string;
}

// ─── Constants ────────────────────────────────────────────────────

const BUDGET_OPTIONS = [
  'Under ₹50K',
  '₹50K – ₹1.5L',
  '₹1.5L – ₹4L',
  '₹4L – ₹10L',
  '₹10L+',
  'Let\'s discuss',
];

const EMPTY_FORM: FormFields = {
  name: '',
  email: '',
  company: '',
  service: '',
  budget: '',
  message: '',
};

// ─── Input primitives ─────────────────────────────────────────────

const inputBase: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  fontSize: '14px',
  fontFamily: 'var(--font-body)',
  color: 'var(--color-ink)',
  backgroundColor: 'var(--color-ivory)',
  border: '1px solid var(--border-light)',
  borderRadius: '10px',
  outline: 'none',
  transition: 'border-color 0.15s, box-shadow 0.15s',
  appearance: 'none',
  WebkitAppearance: 'none',
};

const focusStyle = {
  borderColor: 'var(--color-violet)',
  boxShadow: '0 0 0 3px rgba(139,108,255,0.12)',
};

const errorStyle = {
  borderColor: '#EF4444',
  boxShadow: '0 0 0 3px rgba(239,68,68,0.1)',
};

interface FieldProps {
  label: string;
  id: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

const Field: React.FC<FieldProps> = ({ label, id, required, error, children }) => (
  <div className="flex flex-col gap-1.5">
    <label
      htmlFor={id}
      className="text-sm font-medium"
      style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-body)' }}
    >
      {label}
      {required && (
        <span style={{ color: 'var(--color-violet)', marginLeft: 3 }} aria-hidden="true">
          *
        </span>
      )}
    </label>
    {children}
    <AnimatePresence>
      {error && (
        <motion.p
          key="err"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="text-xs"
          style={{ color: '#EF4444', fontFamily: 'var(--font-body)' }}
          role="alert"
        >
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

// ─── Main form component ──────────────────────────────────────────

export const ContactForm: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const searchParams = useSearchParams();
  const formId = useId();

  const [fields, setFields] = useState<FormFields>({ ...EMPTY_FORM });
  const [errors, setErrors] = useState<FieldError>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Focus tracking for border styling
  const [focused, setFocused] = useState<string | null>(null);

  // ── Pre-fill from URL query params ──
  useEffect(() => {
    if (!searchParams) return;
    
    const serviceParam = searchParams.get('service');
    const tierParam    = searchParams.get('tier');

    if (serviceParam) {
      // Match against service IDs in content.ts
      const matched = services.find((s) => s.id === serviceParam);
      if (matched) {
        setFields((prev) => ({ ...prev, service: matched.id }));
      }
    } else if (tierParam) {
      setFields((prev) => ({ ...prev, service: `Tier: ${tierParam}` }));
    }
  }, [searchParams]);

  // ── Validation ──
  function validate(): boolean {
    const errs: FieldError = {};
    if (!fields.name.trim()) errs.name = 'Name is required.';
    if (!fields.email.trim()) {
      errs.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!fields.message.trim()) errs.message = 'Tell us about your project.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  // ── Submit ──
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });

      const data = await res.json();

      if (data.ok) {
        setStatus('success');
        setFields({ ...EMPTY_FORM });
      } else {
        throw new Error(data.error ?? 'Unknown error');
      }
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please email senowebstudio@gmail.com directly.'
      );
    }
  }

  function getInputStyle(name: string, hasError?: boolean): React.CSSProperties {
    return {
      ...inputBase,
      ...(focused === name ? focusStyle : {}),
      ...(hasError ? errorStyle : {}),
    };
  }

  // ─ Success state ───────────────────────────────────────────────
  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE_SIGNAL }}
        className="flex flex-col items-center gap-6 py-12 text-center"
        role="status"
        aria-live="polite"
      >
        {/* Animated signal line */}
        <div className="w-40">
          <SignalLine
            height={40}
            amplitude={14}
            strokeWidth={1.5}
            speed={2}
            showDot
            animate={!prefersReduced}
            drawOnMount
          />
        </div>

        {/* Lime pulse dot */}
        <motion.div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: 'var(--color-gold)' }}
          animate={prefersReduced ? {} : { scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          aria-hidden="true"
        />

        <div className="flex flex-col gap-2">
          <p className="label-micro-primary tracking-[0.14em]">/ Signal Received</p>
          <h3
            className="font-display italic text-3xl leading-tight"
            style={{ color: 'var(--color-ink)' }}
          >
            We're on it.
          </h3>
          <p
            className="text-sm leading-relaxed max-w-[38ch] mx-auto"
            style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}
          >
            Your brief came through loud and clear. Expect a reply within 1–2 business days — no radio silence.
          </p>
        </div>

        <button
          onClick={() => setStatus('idle')}
          className="text-sm font-medium underline"
          style={{ color: 'var(--color-violet)', fontFamily: 'var(--font-body)' }}
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  // ─ Form ────────────────────────────────────────────────────────
  return (
    <motion.form
      onSubmit={handleSubmit}
      variants={staggerContainer(0.07, 0.05)}
      initial="hidden"
      animate={prefersReduced ? 'reducedMotion' : 'visible'}
      noValidate
      aria-label="Project inquiry form"
      id={`${formId}-form`}
      className="flex flex-col gap-5"
    >
      {/* ── Row 1: Name + Email ── */}
      <motion.div variants={listItem} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Name" id={`${formId}-name`} required error={errors.name}>
          <input
            id={`${formId}-name`}
            type="text"
            name="name"
            value={fields.name}
            onChange={(e) => setFields((p) => ({ ...p, name: e.target.value }))}
            onFocus={() => setFocused('name')}
            onBlur={() => setFocused(null)}
            placeholder="Your name"
            autoComplete="name"
            style={getInputStyle('name', !!errors.name)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${formId}-name-err` : undefined}
          />
        </Field>
        <Field label="Email" id={`${formId}-email`} required error={errors.email}>
          <input
            id={`${formId}-email`}
            type="email"
            name="email"
            value={fields.email}
            onChange={(e) => setFields((p) => ({ ...p, email: e.target.value }))}
            onFocus={() => setFocused('email')}
            onBlur={() => setFocused(null)}
            placeholder="you@company.com"
            autoComplete="email"
            style={getInputStyle('email', !!errors.email)}
            aria-invalid={!!errors.email}
          />
        </Field>
      </motion.div>

      {/* ── Row 2: Company + Budget ── */}
      <motion.div variants={listItem} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Company" id={`${formId}-company`}>
          <input
            id={`${formId}-company`}
            type="text"
            name="company"
            value={fields.company}
            onChange={(e) => setFields((p) => ({ ...p, company: e.target.value }))}
            onFocus={() => setFocused('company')}
            onBlur={() => setFocused(null)}
            placeholder="Company or project name"
            autoComplete="organization"
            style={getInputStyle('company')}
          />
        </Field>
        <Field label="Approximate Budget" id={`${formId}-budget`}>
          <div className="relative">
            <select
              id={`${formId}-budget`}
              name="budget"
              value={fields.budget}
              onChange={(e) => setFields((p) => ({ ...p, budget: e.target.value }))}
              onFocus={() => setFocused('budget')}
              onBlur={() => setFocused(null)}
              style={{
                ...getInputStyle('budget'),
                paddingRight: '36px',
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236B7280' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 14px center',
              }}
            >
              <option value="">Select a range</option>
              {BUDGET_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </Field>
      </motion.div>

      {/* ── Service / interest ── */}
      <motion.div variants={listItem}>
        <Field label="Service interested in" id={`${formId}-service`}>
          <div className="relative">
            <select
              id={`${formId}-service`}
              name="service"
              value={fields.service}
              onChange={(e) => setFields((p) => ({ ...p, service: e.target.value }))}
              onFocus={() => setFocused('service')}
              onBlur={() => setFocused(null)}
              style={{
                ...getInputStyle('service'),
                paddingRight: '36px',
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236B7280' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 14px center',
              }}
            >
              <option value="">Not sure yet / Just exploring</option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.id} — {s.name}
                </option>
              ))}
            </select>
          </div>
        </Field>
      </motion.div>

      {/* ── Message ── */}
      <motion.div variants={listItem}>
        <Field label="Tell us about your project" id={`${formId}-message`} required error={errors.message}>
          <textarea
            id={`${formId}-message`}
            name="message"
            rows={5}
            value={fields.message}
            onChange={(e) => setFields((p) => ({ ...p, message: e.target.value }))}
            onFocus={() => setFocused('message')}
            onBlur={() => setFocused(null)}
            placeholder="What are you building? What's the timeline? Any constraints we should know about?"
            style={{
              ...getInputStyle('message', !!errors.message),
              resize: 'vertical',
              minHeight: '120px',
            }}
            aria-invalid={!!errors.message}
          />
        </Field>
      </motion.div>

      {/* ── Error banner ── */}
      <AnimatePresence>
        {status === 'error' && (
          <motion.div
            key="error-banner"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-xl border p-4 text-sm"
            style={{
              borderColor: 'rgba(239,68,68,0.3)',
              backgroundColor: 'rgba(239,68,68,0.05)',
              color: '#DC2626',
              fontFamily: 'var(--font-body)',
            }}
            role="alert"
          >
            ⚡ {errorMsg || 'Something misfired. Please try again or email senowebstudio@gmail.com.'}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Submit button ── */}
      <motion.div variants={listItem}>
        <motion.button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full py-4 text-sm font-medium text-white"
          style={{
            backgroundColor: 'var(--color-violet)',
            fontFamily: 'var(--font-body)',
            opacity: status === 'submitting' ? 0.7 : 1,
            cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
          }}
          whileHover={prefersReduced || status === 'submitting' ? {} : {
            scale: 1.02,
            boxShadow: '0 12px 36px -8px rgba(139,108,255,0.45)',
          }}
          whileTap={prefersReduced || status === 'submitting' ? {} : { scale: 0.98 }}
          transition={{ duration: 0.18, ease: EASE_SIGNAL }}
          aria-busy={status === 'submitting'}
        >
          {status === 'submitting' ? (
            <>
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                aria-hidden="true"
              />
              Transmitting...
            </>
          ) : (
            <>
              Send the Brief
              <motion.span
                style={{ color: 'var(--color-gold)' }}
                animate={prefersReduced ? {} : { opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                aria-hidden="true"
              >
                ✦
              </motion.span>
            </>
          )}
        </motion.button>
      </motion.div>

      {/* ── Privacy note ── */}
      <motion.p
        variants={fadeUp}
        className="label-micro text-center"
        style={{ color: 'var(--color-muted)' }}
      >
        No spam. No retainers you didn't ask for. Just current.
      </motion.p>
    </motion.form>
  );
};

export default ContactForm;

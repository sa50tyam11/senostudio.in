/**
 * api/contact.ts — Vercel Edge/Serverless function
 * ─────────────────────────────────────────────────────────────────
 * Handles POST /api/contact from the ContactForm.
 * Uses Resend to send the inquiry email to senowebstudio@gmail.com.
 *
 * SETUP (one-time):
 *  1. npm install resend  (or add to package.json)
 *  2. Add RESEND_API_KEY to your .env.local and Vercel env vars
 *  3. Verify senowebstudio@gmail.com as a sender in Resend dashboard
 *
 * The front-end form will POST JSON with:
 *  { name, email, company?, service?, message, budget? }
 *
 * This function:
 *  - Validates required fields
 *  - Sends a notification email to senowebstudio@gmail.com
 *  - Sends a confirmation email to the user
 *  - Returns { ok: true } or { ok: false, error: string }
 * ─────────────────────────────────────────────────────────────────
 */

import { NextRequest, NextResponse } from 'next/server';

// ── Types ─────────────────────────────────────────────────────────

interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  service?: string;
  message: string;
  budget?: string;
  tier?: string;
}

// ── Email templates ───────────────────────────────────────────────

function notificationHtml(p: ContactPayload): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>New Inquiry — SENO Studio</title>
</head>
<body style="margin:0;padding:0;background:#FAFAFA;font-family:'Inter',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border-radius:12px;border:1px solid rgba(10,10,10,0.08);overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="background:#8B6CFF;padding:28px 32px;">
              <p style="margin:0;color:rgba(255,255,255,0.6);font-size:11px;letter-spacing:0.12em;text-transform:uppercase;font-weight:500;">
                SENO STUDIO · NEW SIGNAL
              </p>
              <h1 style="margin:8px 0 0;color:#FFFFFF;font-size:22px;font-weight:600;">
                New Project Inquiry
              </h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr><td style="padding-bottom:16px;border-bottom:1px solid rgba(10,10,10,0.07);">
                  <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#6B7280;">From</p>
                  <p style="margin:0;font-size:16px;font-weight:600;color:#0A0A0A;">${p.name}</p>
                  <a href="mailto:${p.email}" style="color:#8B6CFF;font-size:14px;">${p.email}</a>
                  ${p.company ? `<p style="margin:4px 0 0;font-size:13px;color:#6B7280;">${p.company}</p>` : ''}
                </td></tr>
                ${p.service || p.tier ? `
                <tr><td style="padding:16px 0;border-bottom:1px solid rgba(10,10,10,0.07);">
                  <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#6B7280;">Interested In</p>
                  ${p.service ? `<p style="margin:0;font-size:14px;color:#8B6CFF;font-weight:500;">${p.service}</p>` : ''}
                  ${p.tier ? `<p style="margin:4px 0 0;font-size:13px;color:#6B7280;">Tier: ${p.tier}</p>` : ''}
                </td></tr>` : ''}
                ${p.budget ? `
                <tr><td style="padding:16px 0;border-bottom:1px solid rgba(10,10,10,0.07);">
                  <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#6B7280;">Budget</p>
                  <p style="margin:0;font-size:14px;color:#0A0A0A;">${p.budget}</p>
                </td></tr>` : ''}
                <tr><td style="padding:16px 0;">
                  <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#6B7280;">Message</p>
                  <p style="margin:0;font-size:14px;color:#0A0A0A;line-height:1.7;white-space:pre-wrap;">${p.message}</p>
                </td></tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px;background:#FAFAFA;border-top:1px solid rgba(10,10,10,0.06);">
              <p style="margin:0;font-size:11px;color:#6B7280;letter-spacing:0.08em;text-transform:uppercase;">
                SENO Studio · senowebstudio@gmail.com · Muzaffarpur, Bihar, India
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function confirmationHtml(name: string): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><title>Signal Received — SENO Studio</title></head>
<body style="margin:0;padding:0;background:#FAFAFA;font-family:'Inter',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border-radius:12px;border:1px solid rgba(10,10,10,0.08);">
        <tr>
          <td style="padding:40px 40px 32px;text-align:center;">
            <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#8B6CFF;font-weight:500;">
              / SIGNAL RECEIVED
            </p>
            <h1 style="margin:0 0 20px;font-size:26px;color:#0A0A0A;font-weight:600;line-height:1.3;">
              Hey ${name}, we're on it.
            </h1>
            <p style="margin:0 0 24px;font-size:15px;color:#6B7280;line-height:1.7;max-width:420px;margin-left:auto;margin-right:auto;">
              Your message came through loud and clear. We'll review your project brief and be in touch within <strong style="color:#0A0A0A;">1–2 business days</strong> — no radio silence.
            </p>
            <a href="https://senostudio.in" style="display:inline-block;background:#8B6CFF;color:#FFFFFF;text-decoration:none;font-size:14px;font-weight:500;padding:14px 32px;border-radius:100px;">
              Back to SENO Studio ✦
            </a>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 40px;border-top:1px solid rgba(10,10,10,0.06);text-align:center;">
            <p style="margin:0;font-size:11px;color:#6B7280;letter-spacing:0.08em;text-transform:uppercase;">
              SENO Studio · senowebstudio@gmail.com
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ── Handler ───────────────────────────────────────────────────────

export async function POST(req: NextRequest) {

  let payload: ContactPayload;
  try {
    payload = await req.json();
  } catch (err) {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  // ── Validation ──
  if (!payload?.name?.trim() || !payload?.email?.trim() || !payload?.message?.trim()) {
    return NextResponse.json(
      { ok: false, error: 'Name, email, and message are required.' },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(payload.email)) {
    return NextResponse.json({ ok: false, error: 'Invalid email address.' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY not set');
    return NextResponse.json({ ok: false, error: 'Server configuration error.' }, { status: 500 });
  }

  try {
    // Dynamic import — Resend must be installed: npm install resend
    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);

    // Send notification to SENO
    await resend.emails.send({
      from: 'SENO Studio <noreply@senostudio.in>',
      to: ['senowebstudio@gmail.com'],
      replyTo: payload.email,
      subject: `New Inquiry from ${payload.name}${payload.service ? ` — ${payload.service}` : ''}`,
      html: notificationHtml(payload),
    });

    // Send confirmation to the user
    await resend.emails.send({
      from: 'SENO Studio <senowebstudio@gmail.com>',
      to: [payload.email],
      subject: 'Signal received — SENO Studio',
      html: confirmationHtml(payload.name),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Resend error:', err);
    return NextResponse.json(
      { ok: false, error: 'Failed to send message. Please try senowebstudio@gmail.com directly.' },
      { status: 500 }
    );
  }
}

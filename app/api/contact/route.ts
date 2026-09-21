import { NextRequest, NextResponse } from 'next/server';
import type { ContactFormPayload, ContactFormResponse } from '@/lib/types';

// Rate limiting: simple in-memory store (upgrade to Redis for production)
const submissions = new Map<string, { count: number; firstAt: number }>();
const WINDOW_MS = 60_000; // 1 minute
const MAX_PER_WINDOW = 3;

function getRateKey(req: NextRequest) {
  return req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown';
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const record = submissions.get(key);
  if (!record || now - record.firstAt > WINDOW_MS) {
    submissions.set(key, { count: 1, firstAt: now });
    return false;
  }
  if (record.count >= MAX_PER_WINDOW) return true;
  record.count++;
  return false;
}

export async function POST(req: NextRequest): Promise<NextResponse<ContactFormResponse>> {
  try {
    // Rate-limit check
    const rateKey = getRateKey(req);
    if (isRateLimited(rateKey)) {
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please wait a minute before trying again.' },
        { status: 429 }
      );
    }

    const body: ContactFormPayload = await req.json();

    // Validate required fields
    const { name, email, message } = body;
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, message: 'Please fill in all required fields (name, email, message).' },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // Sanitise / trim all fields
    const payload: ContactFormPayload = {
      name: name.trim().slice(0, 100),
      email: email.trim().toLowerCase().slice(0, 200),
      subject: (body.subject ?? '').trim().slice(0, 200),
      message: message.trim().slice(0, 2000),
      budget: (body.budget ?? '').trim(),
      projectType: (body.projectType ?? '').trim(),
    };

    // ── Log to console (placeholder — swap for email/DB in production) ────
    console.log('📬 New Contact Form Submission:', {
      timestamp: new Date().toISOString(),
      ...payload,
    });

    // ── TODO: Add production email sending here ────────────────────────────
    // Example with Nodemailer (once SMTP creds are configured):
    //
    // import nodemailer from 'nodemailer';
    // const transporter = nodemailer.createTransport({
    //   host: process.env.SMTP_HOST,
    //   port: Number(process.env.SMTP_PORT),
    //   auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    // });
    // await transporter.sendMail({
    //   from: `"${payload.name}" <${process.env.SMTP_USER}>`,
    //   to: process.env.CONTACT_EMAIL,
    //   replyTo: payload.email,
    //   subject: `[Uyota.film] ${payload.projectType || 'New Enquiry'} — ${payload.subject || payload.name}`,
    //   text: `Name: ${payload.name}\nEmail: ${payload.email}\nProject Type: ${payload.projectType}\nBudget: ${payload.budget}\n\n${payload.message}`,
    // });

    return NextResponse.json(
      { success: true, message: 'Your message has been received. Francis will be in touch shortly.' },
      { status: 200 }
    );
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred. Please email hello@uyota.film directly.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}

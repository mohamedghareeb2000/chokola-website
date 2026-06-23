import { NextResponse } from 'next/server';

const MESSAGE_MAX_LENGTH = 500;
const PHONE_DIGIT_LENGTH = 10;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalize(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function validateContactPayload(payload) {
  const fieldErrors = {};
  const name = normalize(payload?.name);
  const phone = normalize(payload?.phone).replace(/\D/g, '');
  const email = normalize(payload?.email);
  const subject = normalize(payload?.subject);
  const message = normalize(payload?.message);

  if (!name) fieldErrors.name = 'Please enter your name.';
  if (!email) {
    fieldErrors.email = 'Please enter your email address.';
  } else if (!EMAIL_PATTERN.test(email)) {
    fieldErrors.email = 'Please enter a valid email address.';
  }
  if (!phone || phone.length !== PHONE_DIGIT_LENGTH) {
    fieldErrors.phone = 'Please enter a valid US phone number.';
  }
  if (!subject) fieldErrors.subject = 'Please enter a subject.';
  if (!message) {
    fieldErrors.message = 'Please write your message.';
  } else if (message.length > MESSAGE_MAX_LENGTH) {
    fieldErrors.message = 'Message cannot exceed 500 characters.';
  }

  if (name.length > 120) fieldErrors.name = 'Name is too long.';
  if (email.length > 160) fieldErrors.email = 'Email address is too long.';
  if (subject.length > 160) fieldErrors.subject = 'Subject is too long.';

  return {
    isValid: Object.keys(fieldErrors).length === 0,
    fieldErrors,
    data: { name, phone: `+1 ${phone}`, email, subject, message },
  };
}

export async function POST(request) {
  try {
    const contentType = request.headers.get('content-type') || '';

    if (!contentType.includes('application/json')) {
      return NextResponse.json(
        { ok: false, error: 'Content-Type must be application/json.' },
        { status: 415 }
      );
    }

    const body = await request.json();
    const validation = validateContactPayload(body);

    if (!validation.isValid) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Please complete the required fields.',
          fieldErrors: validation.fieldErrors,
        },
        { status: 400 }
      );
    }

    // Server-side integration point for email, CRM, or notification providers.
    // Use environment variables only, for example: process.env.CONTACT_EMAIL_API_KEY
    // Do not expose private keys in frontend code.
    console.info('Contact form submission received', {
      name: validation.data.name,
      phone: validation.data.phone,
      email: validation.data.email,
      subject: validation.data.subject,
      messageLength: validation.data.message.length,
      receivedAt: new Date().toISOString(),
      hasEmailProviderConfigured: Boolean(process.env.CONTACT_EMAIL_API_KEY),
    });

    return NextResponse.json({
      ok: true,
      message: 'Thank you. Your message has been received.',
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: 'Invalid request body.' },
      { status: 400 }
    );
  }
}

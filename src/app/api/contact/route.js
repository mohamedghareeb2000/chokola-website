import { NextResponse } from 'next/server';

const MESSAGE_MAX_LENGTH = 500;
const TEXT_FIELD_MAX_LENGTH = 50;
const PHONE_MIN_DIGITS = 7;
const PHONE_MAX_DIGITS = 12;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const US_COUNTRY_CODE = '+1';
const CONTACT_REASON_OPTIONS = [
  'Menu question',
  'Branch visit',
  'Celebration or event',
  'Collaboration',
  'Feedback',
  'Other',
];

function normalize(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function validateContactPayload(payload) {
  const fieldErrors = {};
  const name = normalize(payload?.name);
  const phone = normalize(payload?.phone).replace(/\D/g, '');
  const email = normalize(payload?.email);
  const reason = normalize(payload?.reason);
  const message = normalize(payload?.message);

  if (!name) {
    fieldErrors.name = 'Please enter your name.';
  } else if (name.length > TEXT_FIELD_MAX_LENGTH) {
    fieldErrors.name = 'Name cannot exceed 50 characters.';
  }
  if (!email) {
    fieldErrors.email = 'Please enter your email address.';
  } else if (email.length > TEXT_FIELD_MAX_LENGTH) {
    fieldErrors.email = 'Email cannot exceed 50 characters.';
  } else if (!EMAIL_PATTERN.test(email)) {
    fieldErrors.email = 'Please enter a valid email address.';
  }
  if (!phone || phone.length < PHONE_MIN_DIGITS || phone.length > PHONE_MAX_DIGITS) {
    fieldErrors.phone = 'Please enter a valid contact number.';
  }
  if (!reason || !CONTACT_REASON_OPTIONS.includes(reason)) {
    fieldErrors.reason = 'Please choose a reason for contact.';
  }
  if (!message) {
    fieldErrors.message = 'Please write your message.';
  } else if (message.length > MESSAGE_MAX_LENGTH) {
    fieldErrors.message = 'Message cannot exceed 500 characters.';
  }

  return {
    isValid: Object.keys(fieldErrors).length === 0,
    fieldErrors,
    data: { name, phone: `${US_COUNTRY_CODE} ${phone}`, email, reason, message },
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
      reason: validation.data.reason,
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

import { NextResponse } from 'next/server';

const MAX_FIELD_LENGTH = 1000;

function normalize(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function validateContactPayload(payload) {
  const fieldErrors = {};
  const name = normalize(payload?.name);
  const phone = normalize(payload?.phone);
  const message = normalize(payload?.message);

  if (!name) fieldErrors.name = 'Please enter your name.';
  if (!phone) fieldErrors.phone = 'Please enter your phone number.';
  if (!message) fieldErrors.message = 'Please write your message.';

  if (name.length > 120) fieldErrors.name = 'Name is too long.';
  if (phone.length > 40) fieldErrors.phone = 'Phone number is too long.';
  if (message.length > MAX_FIELD_LENGTH) fieldErrors.message = 'Message is too long.';

  return {
    isValid: Object.keys(fieldErrors).length === 0,
    fieldErrors,
    data: { name, phone, message },
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

const ENV_PATTERNS = {
  NEXT_PUBLIC_SANITY_PROJECT_ID: /^[a-z0-9]+$/,
  NEXT_PUBLIC_SANITY_DATASET: /^[a-zA-Z0-9_-]+$/,
  NEXT_PUBLIC_SANITY_API_VERSION: /^\d{4}-\d{2}-\d{2}$/,
}

function readEnv(name) {
  return String(process.env[name] || '')
    .trim()
    .replace(/^["']|["']$/g, '')
}

function requireSanityEnv(name) {
  const value = readEnv(name)

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  if (!ENV_PATTERNS[name].test(value)) {
    throw new Error(`Invalid ${name}: "${value}"`)
  }

  return value
}

export const projectId = requireSanityEnv('NEXT_PUBLIC_SANITY_PROJECT_ID')
export const dataset = requireSanityEnv('NEXT_PUBLIC_SANITY_DATASET')
export const apiVersion = requireSanityEnv('NEXT_PUBLIC_SANITY_API_VERSION')

export const sanityConfig = {
  projectId,
  dataset,
  apiVersion,
}

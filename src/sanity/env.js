function requireEnv(name, value) {
  if (!value?.trim()) {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  return value.trim()
}

export const apiVersion = requireEnv(
  'NEXT_PUBLIC_SANITY_API_VERSION',
  process.env.NEXT_PUBLIC_SANITY_API_VERSION,
)

export const dataset = requireEnv(
  'NEXT_PUBLIC_SANITY_DATASET',
  process.env.NEXT_PUBLIC_SANITY_DATASET,
)

export const projectId = requireEnv(
  'NEXT_PUBLIC_SANITY_PROJECT_ID',
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
)

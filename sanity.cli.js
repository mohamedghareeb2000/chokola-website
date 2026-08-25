/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import {existsSync, readFileSync} from 'node:fs'
import {resolve} from 'node:path'
import { defineCliConfig } from 'sanity/cli'

function loadEnvFile(filePath) {
  const envPath = resolve(process.cwd(), filePath)

  if (!existsSync(envPath)) {
    return
  }

  const contents = readFileSync(envPath, 'utf8')

  for (const line of contents.split(/\r?\n/)) {
    const trimmed = line.trim()

    if (!trimmed || trimmed.startsWith('#')) {
      continue
    }

    const separatorIndex = trimmed.indexOf('=')

    if (separatorIndex === -1) {
      continue
    }

    const key = trimmed.slice(0, separatorIndex).trim()
    const rawValue = trimmed.slice(separatorIndex + 1).trim()
    const value = rawValue.replace(/^["']|["']$/g, '')

    if (!process.env[key]) {
      process.env[key] = value
    }
  }
}

loadEnvFile('.env.local')

const {dataset, projectId} = await import('./src/sanity/env.js')

export default defineCliConfig({ api: { projectId, dataset } })

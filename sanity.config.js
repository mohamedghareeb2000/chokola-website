'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...tool]]\page.jsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool, usePaneRouter} from 'sanity/structure'
import {createElement, useEffect, useMemo, useRef} from 'react'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {DashboardTool} from './src/sanity/dashboard/DashboardTool.jsx'
import {apiVersion, dataset, projectId} from './src/sanity/env.js'
import {schema} from './src/sanity/schemaTypes/index.js'
import {structure} from './src/sanity/structure.js'

const SITE_SETTINGS_GROUP_BY_VIEW_ID = {
  navigation: 'Navigation',
  hero: 'Hero',
  about: 'About',
  menu: 'Menu Section',
  branch: 'Branch',
  contact: 'Contact',
  footer: 'Footer',
}

function getTabText(tab) {
  return (tab?.textContent || '').replace(/\s+/g, ' ').trim()
}

function getGroupIdFromPaneId(paneId) {
  const match = String(paneId || '').match(/siteSettings-(navigation|hero|about|menu|branch|contact|footer)/)

  return match?.[1]
}

function SiteSettingsDocumentLayout(props) {
  const rootRef = useRef(null)
  const paneRouter = usePaneRouter()
  const currentPaneId = paneRouter.routerPanesState?.[paneRouter.groupIndex]?.[paneRouter.siblingIndex]?.id
  const groupId = getGroupIdFromPaneId(globalThis.location?.pathname) || getGroupIdFromPaneId(currentPaneId)
  const groupTitle = SITE_SETTINGS_GROUP_BY_VIEW_ID[groupId]
  const layoutStyles = useMemo(
    () => `
      .site-settings-focused-form h1 {
        display: none !important;
      }

      .site-settings-focused-form [data-testid='field-groups'],
      .site-settings-focused-form [role='tablist'] {
        display: none !important;
      }

      body:has(.site-settings-focused-form) [data-testid='field-groups'] {
        display: none !important;
      }
    `,
    [],
  )

  useEffect(() => {
    if (!groupTitle) return undefined

    let cancelled = false
    let attempts = 0

    function selectGroup() {
      if (cancelled) return

      const root = rootRef.current
      const tabs = root ? Array.from(root.querySelectorAll('[role="tab"]')) : []
      const groupTab = tabs.find((tab) => getTabText(tab) === groupTitle)

      if (groupTab) {
        groupTab.click()
        return
      }

      if (attempts < 30) {
        attempts += 1
        window.setTimeout(selectGroup, 100)
      }
    }

    selectGroup()

    return () => {
      cancelled = true
    }
  }, [groupTitle])

  if (props.documentType !== 'siteSettings') {
    return props.renderDefault(props)
  }

  return createElement(
    'div',
    {ref: rootRef, className: 'site-settings-focused-form'},
    createElement('style', null, layoutStyles),
    props.renderDefault(props),
  )
}

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema: {
    ...schema,
    templates: (templates) => templates.filter(({schemaType}) => schemaType !== 'siteSettings'),
  },
  document: {
    unstable_layout: SiteSettingsDocumentLayout,
    actions: (prev, {schemaType}) =>
      schemaType === 'siteSettings' ? prev.filter(({action}) => action !== 'duplicate') : prev,
  },
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
  tools: (prev) => [
    ...prev,
    {
      name: 'dashboard',
      title: 'Dashboard',
      component: DashboardTool,
      controlsDocumentTitle: true,
    },
  ],
})

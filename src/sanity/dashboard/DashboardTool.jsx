'use client'

import {useEffect, useMemo, useState} from 'react'
import {Badge, Box, Card, Container, Flex, Grid, Heading, Spinner, Stack, Text} from '@sanity/ui'
import {useClient} from 'sanity'

import {apiVersion, dataset, projectId} from '../env'

const DASHBOARD_QUERY = /* groq */ `
{
  "settings": *[_id == "siteSettings" && _type == "siteSettings"][0] {
    _updatedAt,
    titleLineOne,
    titleLineTwo,
    menuTitle,
    branchSubtitle,
    contactPhoneDisplay,
    "navigationCount": count(navigationItems[active == true]),
    "heroStatisticCount": count(heroStatistics[active == true]),
    "socialLinkCount": count(socialLinks[active == true])
  },
  "categories": *[_type == "menuCategory"] | order(order asc, categoryName asc) {
    _id,
    _updatedAt,
    categoryName,
    active,
    order,
    "productCount": count(products[active == true])
  },
  "counts": {
    "siteSettings": count(*[_type == "siteSettings"]),
    "menuCategories": count(*[_type == "menuCategory"]),
    "activeMenuCategories": count(*[_type == "menuCategory" && active == true])
  }
}
`

function StatCard({label, value, tone = 'default'}) {
  return (
    <Card border padding={4} radius={2} tone={tone}>
      <Stack space={3}>
        <Text muted size={1} weight="semibold">
          {label}
        </Text>
        <Heading size={4}>{value}</Heading>
      </Stack>
    </Card>
  )
}

function LoadingState() {
  return (
    <Flex align="center" justify="center" padding={5}>
      <Stack space={4}>
        <Flex justify="center">
          <Spinner muted />
        </Flex>
        <Text muted>Loading dashboard data...</Text>
      </Stack>
    </Flex>
  )
}

function ErrorState({message}) {
  return (
    <Card border padding={5} radius={2} tone="critical">
      <Stack space={3}>
        <Heading size={2}>Dashboard could not load</Heading>
        <Text>{message}</Text>
      </Stack>
    </Card>
  )
}

function EmptyState() {
  return (
    <Card border padding={5} radius={2} tone="caution">
      <Stack space={3}>
        <Heading size={2}>No Sanity content found</Heading>
        <Text>
          Add Site Settings or Menu Categories in Structure to populate this dashboard.
        </Text>
      </Stack>
    </Card>
  )
}

function CategoryList({categories}) {
  return (
    <Card border radius={2}>
      <Box padding={4}>
        <Heading size={2}>Menu categories</Heading>
      </Box>
      <Stack>
        {categories.map((category) => (
          <Flex
            align="center"
            gap={3}
            key={category._id}
            padding={4}
            style={{borderTop: '1px solid var(--card-border-color)'}}
          >
            <Box flex={1}>
              <Stack space={2}>
                <Text weight="semibold">{category.categoryName || 'Untitled category'}</Text>
                <Text muted size={1}>
                  {category.productCount || 0} active products
                </Text>
              </Stack>
            </Box>
            <Badge tone={category.active ? 'positive' : 'default'}>
              {category.active ? 'Active' : 'Inactive'}
            </Badge>
          </Flex>
        ))}
      </Stack>
    </Card>
  )
}

export function DashboardTool() {
  const client = useClient({
    apiVersion,
    projectId,
    dataset,
  })
  const [state, setState] = useState({data: null, error: null, loading: true})

  useEffect(() => {
    let cancelled = false

    async function loadDashboard() {
      setState((current) => ({...current, loading: true, error: null}))

      try {
        const data = await client.fetch(DASHBOARD_QUERY)

        if (!cancelled) {
          setState({data, error: null, loading: false})
        }
      } catch (error) {
        if (!cancelled) {
          setState({
            data: null,
            error: error instanceof Error ? error.message : 'Unknown Sanity fetch error',
            loading: false,
          })
        }
      }
    }

    loadDashboard()

    return () => {
      cancelled = true
    }
  }, [client])

  const categories = state.data?.categories || []
  const settings = state.data?.settings
  const counts = state.data?.counts || {}
  const hasContent = Boolean(settings) || categories.length > 0
  const updatedAt = useMemo(() => {
    if (!settings?._updatedAt) return null

    return new Intl.DateTimeFormat('en', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(settings._updatedAt))
  }, [settings?._updatedAt])

  return (
    <Container width={3}>
      <Box padding={5}>
        <Stack space={5}>
          <Stack space={3}>
            <Heading size={4}>Dashboard</Heading>
            <Text muted>
              Live overview of the Chokola content currently stored in Sanity.
            </Text>
          </Stack>

          {state.loading && <LoadingState />}
          {!state.loading && state.error && <ErrorState message={state.error} />}
          {!state.loading && !state.error && !hasContent && <EmptyState />}

          {!state.loading && !state.error && hasContent && (
            <Stack space={5}>
              <Grid columns={[1, 1, 3]} gap={4}>
                <StatCard label="Site settings documents" value={counts.siteSettings || 0} />
                <StatCard label="Active categories" value={counts.activeMenuCategories || 0} tone="positive" />
                <StatCard label="Total menu categories" value={counts.menuCategories || 0} />
              </Grid>

              {settings && (
                <Card border padding={4} radius={2}>
                  <Stack space={4}>
                    <Flex align="center" gap={3}>
                      <Box flex={1}>
                        <Heading size={2}>Site settings</Heading>
                      </Box>
                      {updatedAt && <Badge tone="primary">Updated {updatedAt}</Badge>}
                    </Flex>
                    <Grid columns={[1, 1, 2]} gap={4}>
                      <Stack space={2}>
                        <Text muted size={1}>
                          Hero
                        </Text>
                        <Text weight="semibold">
                          {[settings.titleLineOne, settings.titleLineTwo].filter(Boolean).join(' ') || 'Untitled'}
                        </Text>
                      </Stack>
                      <Stack space={2}>
                        <Text muted size={1}>
                          Branch
                        </Text>
                        <Text weight="semibold">{settings.branchSubtitle || 'No branch title'}</Text>
                      </Stack>
                      <Stack space={2}>
                        <Text muted size={1}>
                          Navigation links
                        </Text>
                        <Text weight="semibold">{settings.navigationCount || 0}</Text>
                      </Stack>
                      <Stack space={2}>
                        <Text muted size={1}>
                          Contact phone
                        </Text>
                        <Text weight="semibold">{settings.contactPhoneDisplay || 'Not set'}</Text>
                      </Stack>
                    </Grid>
                  </Stack>
                </Card>
              )}

              {categories.length > 0 && <CategoryList categories={categories} />}
            </Stack>
          )}
        </Stack>
      </Box>
    </Container>
  )
}

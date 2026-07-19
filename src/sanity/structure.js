const SITE_SETTINGS_DOCUMENT_ID = 'siteSettings'

const SITE_SETTINGS_SECTIONS = [
  {id: 'navigation', title: 'Navigation'},
  {id: 'hero', title: 'Hero Section'},
  {id: 'about', title: 'About Section'},
  {id: 'menu', title: 'Menu'},
  {id: 'branch', title: 'Our Branch'},
  {id: 'contact', title: 'Contact Us'},
  {id: 'footer', title: 'Footer'},
]

function siteSettingsSectionItem(S, section) {
  return S.listItem()
    .id(`siteSettings-${section.id}`)
    .title(section.title)
    .schemaType('siteSettings')
    .child(
      S.document()
        .id(`siteSettings-${section.id}`)
        .title(section.title)
        .schemaType('siteSettings')
        .documentId(SITE_SETTINGS_DOCUMENT_ID)
        .views([S.view.form().id(section.id).title(section.title)])
        .defaultPanes([section.id]),
    )
}

export const structure = (S) =>
  S.list()
    .title('Website CMS')
    .items([
      ...SITE_SETTINGS_SECTIONS.map((section) => siteSettingsSectionItem(S, section)),
      S.listItem()
        .title('Menu Categories')
        .schemaType('menuCategory')
        .child(S.documentTypeList('menuCategory').title('Menu Categories')),
    ])

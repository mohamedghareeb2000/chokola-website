// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Homepage Content')
        .schemaType('homePage')
        .child(S.document().schemaType('homePage').documentId('homePage')),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => item.getId() !== 'homePage'),
    ])

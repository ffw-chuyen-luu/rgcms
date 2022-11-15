export const PAGE_GRAPHQL_FIELDS = `
title
slug
seo {
  title
  description
  image {
    title
    description
    contentType
    fileName
    size
    url
    width
    height
  }
}
modularBlocksCollection(limit: 20) {
  items {
    cpType: __typename
    ... on CpHeroBanner {
      sys {
        id
      }
      style
      image {
        title
        description
        contentType
        fileName
        size
        url
        width
        height
      }
      title
      description
      ctasCollection(limit: 10) {
        items {
          title
          url
          title
          target
        }
      }
    }
    ... on CpCards {
      sys {
        id
      }
      title
      description
      cardItemsCollection(limit: 10) {
        items {
          image {
            title
            description
            contentType
            fileName
            size
            url
            width
            height
          }
          title
          description
          url
        }
      }
    }
    ... on CpText {
      sys {
        id
      }
      title
      text {
        json
      }
    }
  }
}
`

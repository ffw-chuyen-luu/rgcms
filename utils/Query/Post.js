export const POST_TEASER_GRAPHQL_FIELDS = `
sys {
  publishedAt
}
title
slug
content {
  json
}
imageCover {
  url
  title
}
`

export const POST_GRAPHQL_FIELDS = `
sys {
  publishedAt
}
title
slug
seo {
  title
  description
  image {
    url
  }
  keywordsCollection(limit: 5) {
    items {
      name
    }
  }
}
content {
  json
}
imageCover {
  url
  title
}
tagsCollection(limit: 10) {
  items {
    sys {
      id
    }
    name
  }
}
`

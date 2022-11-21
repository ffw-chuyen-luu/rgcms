import { Config } from "./Config";

export default class ContentfulApi {

  static async callContentful(query, variables, preview = false) {
    const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;

    const fetchOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    };

    try {
      const data = await fetch(fetchUrl, fetchOptions).then((response) =>
        response.json(),
      );
      return data;
    }
    catch (error) {
      throw new Error("Could not fetch data from Contentful!");
    }
  }

  static async getPaginatedSlugs(page, contentType = 'page') {
    const collection = `${contentType}Collection`;
    const queryLimit = 100;
    const skipMultiplier = page === 1 ? 0 : page - 1;
    const skip = skipMultiplier > 0 ? queryLimit * skipMultiplier : 0;

    const variables = { limit: queryLimit, skip };

    const query = `
      query GetPaginatedSlugs($limit: Int!, $skip: Int!) {
        ${collection}(limit: $limit, skip: $skip) {
          total
          items {
            slug
          }
        }
      }`;

    const response = await this.callContentful(query, variables);

    const { total } = response.data[collection];
    const slugs = response.data[collection].items
      ? response.data[collection].items.map((item) => item.slug)
      : [];

    return { slugs, total };
  }

  static async getAllPageSlugs(contentType = 'page') {
    let page = 1;
    let shouldQueryMoreSlugs = true;
    const returnSlugs = [];

    while (shouldQueryMoreSlugs) {
      const response = await this.getPaginatedSlugs(page, contentType);

      if (response.slugs.length > 0) {
        returnSlugs.push(...response.slugs);
      }

      shouldQueryMoreSlugs = returnSlugs.length < response.total;
      page++;
    }

    return returnSlugs;
  }

  static async getContentBySlug(slug, graphql_field, contentType = 'page', preview = false) {
    const collection = `${contentType}Collection`;
    const variables = { slug, preview }
    const query = `
      query getBySlug($slug: String!, $preview: Boolean) {
        ${collection}(limit: 1, preview: $preview, where: {slug: $slug}) {
          items {
            ${graphql_field}
          }
        }
      }
    `

    const response = await this.callContentful(query, variables, preview);

    return response.data[collection].items[0]
      ? response.data[collection].items[0]
      : null;
  }

  static async getPaginatedContent(page, graphql_field, contentType = 'page') {
    const collection = `${contentType}Collection`;
    const skipMultiplier = page === 1 ? 0 : page - 1;
    const skip = skipMultiplier > 0 ? Config.pagination.pageSize * skipMultiplier : 0;

    const variables = { limit: Config.pagination.pageSize, skip };

    const query = `query GetPaginatedContent($limit: Int!, $skip: Int!) {
      ${collection}(limit: $limit, skip: $skip, order: sys_publishedAt_DESC) {
        total
        items {
          ${graphql_field}
        }
      }
    }`;

    const response = await this.callContentful(query, variables);

    const paginatedContent = response.data[collection]
      ? response.data[collection]
      : { total: 0, items: [] };

    return paginatedContent;
  }

}

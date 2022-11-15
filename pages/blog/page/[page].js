import Head from "next/head";

import BlogCard from "@components/blogCard";

import ContentfulApi from "@utils/ContentfulApi";
import { Config } from "@utils/Config";
import { POST_TEASER_GRAPHQL_FIELDS } from "@utils/Query/Post";
import Pagination from "@components/pagination";

export default function BlogIndex(props) {

  const { totalPages, currentPage, pageContent } = props;

  return (
    <>
      <Head>
        <title>Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Blog
        </h1>

        <p className="mt-1.5 text-sm text-gray-500">
          Lorem ipsum text here ...! 🚀
        </p>

        <br />

        {
          pageContent.items ? (
            pageContent.items.map((blog) => <BlogCard {...blog} key={blog.slug} />)
          ) : null
        }

        {
          (totalPages > 1) ? (
            <Pagination
              basePath="blog"
              currentPage={currentPage}
              totalPages={totalPages} />
          ) : null
        }
      </section>
    </>
  )

}

export async function getStaticPaths() {
  const pageContent = await ContentfulApi.getPaginatedContent(1, `sys { id }`, 'blog');
  const totalPages = Math.ceil(pageContent.total / Config.pagination.pageSize);

  const paths = [];

  /**
   * Start from page 2, so we don't replicate /blog
   * which is page 1
   */
  for (let page = 2; page <= totalPages; page++) {
    paths.push({ params: { page: page.toString() } });
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const pageContent = await ContentfulApi.getPaginatedContent(params.page, POST_TEASER_GRAPHQL_FIELDS, 'blog');

  const totalPages = Math.ceil(
    pageContent.total / Config.pagination.pageSize,
  );

  return {
    props: {
      totalPages,
      currentPage: parseInt(params.page, 10),
      pageContent: pageContent || null,
    },
  };
}

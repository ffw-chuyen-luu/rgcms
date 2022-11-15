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
        <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-8">
          Blog
        </h1>

        <p className="mb-4 text-sm text-gray-600">
          Lorem ipsum text here ...! 🚀
        </p>

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

export async function getStaticProps() {
  const pageContent = await ContentfulApi.getPaginatedContent(1, POST_TEASER_GRAPHQL_FIELDS, 'blog');

  const totalPages = Math.ceil(
    pageContent.total / Config.pagination.pageSize,
  );

  return {
    props: {
      totalPages,
      currentPage: "1",
      pageContent: pageContent || null,
    },
  };
}

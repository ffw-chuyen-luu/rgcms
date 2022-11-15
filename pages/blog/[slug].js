import Head from "next/head";

import ContentfulApi from "@utils/ContentfulApi";
import { POST_GRAPHQL_FIELDS } from "@utils/Query/Post";
import RichText from "@components/richText";
import Image from "next/image";
import moment from 'moment';

export default function PostDetail({data}) {
  const { title, content, imageCover, sys } = data;
  const imageUrl = imageCover?.url || null;
  return (
    <>
      <Head>
        <title>{data.seo.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        {
          imageUrl ? (
            <Image
              src={imageUrl}
              alt={imageCover.title}
              width={1140}
              height={500}
              priority
              className="border w-full" />
          ) : null
        }
        <div className="container mx-auto px-6 md:px-12 xl:px-32">
          <div className="text-center text-gray-900">
            <div className="px-6 py-12 md:py-16 md:px-12">
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12">{title}</h1>
              <time dateTime={sys.publishedAt} className="block text-gray-600">
                {moment(sys.publishedAt).format('DD MMM, YYYY')}
              </time>
            </div>
          </div>
        </div>

        <RichText text={content} />
      </section>
    </>
  )
}

export async function getStaticPaths() {
  const pageSlugs = await ContentfulApi.getAllPageSlugs('blog');

  const paths = pageSlugs.map((slug) => {
    return { params: { slug } };
  });

  // Using fallback: "blocking" here enables preview mode
  // for unpublished page slugs on production.
  return {
    paths,
    fallback: "blocking",
  };
}

export const getStaticProps = async ({ params }) => {
  const { slug } = params;
  const pageContent = await ContentfulApi.getContentBySlug(slug, POST_GRAPHQL_FIELDS, 'blog');

  if (!pageContent) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      data: pageContent
    },
    revalidate: 300
  }
}

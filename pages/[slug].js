import Head from 'next/head';
import DynamicBlock from '@components/dynamicBlock';
import ContentfulApi from "@utils/ContentfulApi";
import { PAGE_GRAPHQL_FIELDS } from "@utils/Query/Page";

export default function Page({ data }) {
  const components = data.modularBlocksCollection.items.map((block) => DynamicBlock(block.cpType, block));

  return (
    <>
      <Head>
        <title>{data.seo.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {components}
    </>
  )
}

export const getStaticPaths = async () => {
  const pageSlugs = await ContentfulApi.getAllPageSlugs('page');

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

export const getStaticProps = async ({ params, preview = false }) => {
  const { slug } = params;
  const pageContent = await ContentfulApi.getContentBySlug(slug, PAGE_GRAPHQL_FIELDS, 'page', preview);

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

import Image from "next/image";
import Link from 'next/link';
import moment from 'moment';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Config } from "@utils/Config";

export default function blogCard(props) {
  const paragraphs = props.content.json.content.filter(node => node?.nodeType && node.nodeType === "paragraph");

  return (
    <div className="shadow-lg flex flex-wrap w-full mx-auto mb-8">
      <Image
        src={props.imageCover.url}
        alt={props.imageCover.title}
        width={1140}
        height={500}
        priority
        className="border w-full md:w-1/3 h-64 md:h-auto relative" />
      <div className="bg-white w-full md:w-2/3 p-4 sm:p-6">
        <time dateTime={props.sys.publishedAt} className="block text-xs text-gray-500">
          {moment(props.sys.publishedAt).format('DD MMM, YYYY')}
        </time>

        <Link href={`${Config.pageMeta.blogIndex.slug}/${props.slug}`}>
          <h3 className="mt-0.5 text-lg text-gray-900">
            {props.title}
          </h3>
        </Link>

        {
          paragraphs.length > 0 ? (
            <div className="mt-2 text-sm leading-relaxed text-gray-600 line-clamp-3">
              {documentToReactComponents(paragraphs[0])}
            </div>
          ) : null
        }
      </div>
    </div>
  )
}

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <strong>{text}</strong>,
  },
  renderNode: {
    [BLOCKS.HEADING_1]: (node, children) => <h1 className='font-medium leading-tight text-5xl mt-0 mb-2'>{children}</h1>,
    [BLOCKS.HEADING_2]: (node, children) => <h2 className='font-medium leading-tight text-4xl mt-0 mb-2'>{children}</h2>,
    [BLOCKS.HEADING_3]: (node, children) => <h3 className='font-medium leading-tight text-3xl mt-0 mb-2'>{children}</h3>,
    [BLOCKS.HEADING_4]: (node, children) => <h4 className='font-medium leading-tight text-2xl mt-0 mb-2'>{children}</h4>,
    [BLOCKS.HEADING_5]: (node, children) => <h5 className='font-medium leading-tight text-xl mt-0 mb-2'>{children}</h5>,
    [BLOCKS.HEADING_6]: (node, children) => <h6 className='font-medium leading-tight text-base mt-0 mb-2'>{children}</h6>,
    [BLOCKS.PARAGRAPH]: (node, children) => <p className='text-base font-light leading-relaxed mt-0 mb-4'>{children}</p>,
    [INLINES.HYPERLINK]: (node, children) => <a href={node.data.uri} className='text-blue-600 hover:text-blue-700'>{children}</a>
  },
  renderText: text => text.replace('!', '?'),
};

export default function RichText({ text }) {

  return (
    <div className='text-gray-900'>
      {documentToReactComponents(text.json, options)}
    </div>
  )
}

import ContentfulApi from "@utils/ContentfulApi";
import { Config } from "@utils/Config";

export default async function preview(req, res) {
  const { secret, slug, type } = req.query

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET || !slug) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  // Fetch the headless CMS to check if the provided `slug` exists
  const post = await ContentfulApi.getContentBySlug(slug, 'slug', type, true)

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!post) {
    return res.status(401).json({ message: 'Invalid slug' })
  }

  let prefix = '/';
  switch (type) {
    case 'blog':
      prefix = '/blog/';
      break;

    default:
      break;
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({})

  // Redirect to the path from the fetched data.
  const url = `${prefix}${post.slug}`
  res.setHeader('Content-Type', 'text/html')
  res.write(
    `<!DOCTYPE html><html><head><meta http-equiv="Refresh" content="0; url=${url}" />
    <script>window.location.href = '${url}'</script>
    </head>
    </html>`
  )
  res.end()
}

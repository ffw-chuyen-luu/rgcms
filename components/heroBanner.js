import Link from 'next/link';

export default function HeroBanner(props) {
  const { style, title, description, image , ctasCollection } = props;
  const cpStyle = style[0] || null;
  const imageUrl = image?.url || null;

  const cpClass = imageUrl ? 'bg-cover bg-center bg-no-repeat' : '';
  const cpStyleInline = imageUrl ? { backgroundImage: `url(${imageUrl})` } : {};
  return (
    <section className={"relative " + cpClass} style={cpStyleInline}>
      {
        cpStyle === 'gradient' ?
          <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:bg-gradient-to-r sm:from-white/95 sm:to-white/25"></div>
          : null
      }

      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        <div className="max-w-xl text-center sm:text-left">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            {title}
          </h1>

          <p className="mt-4 max-w-lg sm:text-xl sm:leading-relaxed">
            {description}
          </p>

          {
            ctasCollection.items ?
            (
              <div className="mt-8 flex flex-wrap gap-4 text-center">
                { ctasCollection.items.map((cta, index = 0) => (
                  <Link key={index} href={cta.url} className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto">
                    {cta.title}
                  </Link>
                )) }
              </div>
            ) : null
          }

        </div>
      </div>
    </section>
  )
}

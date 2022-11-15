import Link from 'next/link';

export default function Cards(props) {
  const { title, description, cardItemsCollection } = props;

  return (
    <section className="bg-gray-900 text-white">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>

          <p className="mt-4 text-gray-300">
            {description}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cardItemsCollection.items.map((card, index) => (
            <Link
              key={index}
              className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
              href={card.url}>
              <img
                src={card.image.url}
                alt={card.image.title}
                className="h-10 w-10 text-pink-500" />

              <h3 className="mt-4 text-xl font-bold text-white">{card.title}</h3>

              <p className="mt-1 text-sm text-gray-300">
                {card.description}
              </p>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}

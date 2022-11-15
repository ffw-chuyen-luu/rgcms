import RichText from "./richText";

export default function Text(props) {

  return (
    <section className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
      <h2 className="font-medium leading-tight text-4xl">
        {props.title}
      </h2>

      <RichText text={props.text} />
    </section>
  )
}

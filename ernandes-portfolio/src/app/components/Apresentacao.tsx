type Props = {
  nome: string
  titulo: string
}

export default function Apresentacao({ nome, titulo }: Props) {
  return (
    <section className="text-center">
      <h1 className="text-4xl font-bold text-emerald-400 ">{nome}</h1>
      <p className="text-lg text-gray-300 mt-2">{titulo}</p>
    </section>
  )
}

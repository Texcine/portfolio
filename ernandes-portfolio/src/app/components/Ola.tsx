type Testes = {
    nome: string
    mensagem: string
    data: number
}

export default function Olazao({nome, mensagem, data}: Testes){
    return(
        <section className="text-center">
            <h1 className="text-4x1 font-bold text-blue-400">{nome}</h1>
            <p className="text-lg text-gray-200 mt-2 ">{mensagem}</p>
            <p className="text-lg2 text-gray-200 mt-2">{data}</p>
        </section>
    )
}
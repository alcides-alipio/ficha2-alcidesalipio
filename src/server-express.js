import express from "express"

const PORT = 3000

const app = express()
const router = express.Router()

const cards = [
    { name: "Dragão de Cobalto", type: "Criatura", attack: 7, defense: 5 },
    { name: "Guardiã das Marés", type: "Criatura", attack: 4, defense: 8 },
    { name: "Guardiã das Montanhas", type: "Criatura", attack: 4, defense: 7 },
    { name: "Lagarto de Lava", type: "Criatura", attack: 6, defense: 3 },
    { name: "Guaxinin de Pedra", type: "Criatura", attack: 2, defense: 10 }
]

router.get("/", (_, res) => {

    res.send(`
        <h1>Página Inicial</h1>

        <h2>Links</h2>

        <ul>
            <li>
                <a href="/">Página Inicial</a>
            </li>
            <li>
                <a href="/sobre">Sobre</a>
            </li>
            <li>
                <a href="/cartas">Cartas</a>
            </li>
            <li>
                <a href="/cartas/aleatoria">
                    Carta Aleatória
                </a>
            </li>
            <li>
                <a href="/agora">
                    Agora
                </a>
            </li>
        </ul>

        <p>Existem ${cards.length} cartas.</p>
    `)

})

router.get("/sobre", (_, res) => {

    res.send(`
        <h1>Sobre</h1>

        <h2>Aluno</h2>

        <div style="margin: 0 0 0 40px">
            <p>
                <strong>Nome:</strong>
                Alcides Alipio
            </p>
            <p>
                <strong>Turma:</strong>
                TGPSI 24U
            </p>
        </div>

        <a href="/">
            ← Voltar à Página Inicial
        </a>
    `)

})

router.get("/cartas", (_, res) => {

    const cardList = cards
        .map(card => `
            <li>
                <strong>${card.name}</strong>
                <br>
                Tipo: ${card.type}
                <br>
                Ataque: ${card.attack}
                <br>
                Defesa: ${card.defense}
            </li>
        `)
        .join("<br>")

    res.send(`
        <h1>Cartas</h1>

        <h2>Lista de Cartas</h2>

        <ul>
            ${cardList}
        </ul>

        <a href="/">
            ← Voltar à Página Inicial
        </a>
    `)

})

router.get("/cartas/aleatoria", (_, res) => {

    const card =
        cards[Math.floor(Math.random() * cards.length)]

    res.send(`
        <h1>Carta Aleatória</h1>

        <h2>${card.name}</h2>

        <div style="margin-left: 40px">
            <p><strong>Tipo:</strong> ${card.type}</p>
            <p><strong>Ataque:</strong>${card.attack}</p>
            <p><strong>Defesa:</strong>${card.defense}</p>
        </div>

        <a href="/">
            ← Voltar à Página Inicial
        </a>
    `)

})

router.get("/agora", (_, res) => {

    const now = new Date()

    res.send(`
        <h1>Agora</h1>

        <p>
            <strong>Data:</strong>
            ${now.toLocaleDateString("pt-PT")}
        </p>

        <p>
            <strong>Hora:</strong>
            ${now.toLocaleTimeString("pt-PT")}
        </p>

        <a href="/">
            ← Voltar à Página Inicial
        </a>
    `)

})

app.use(router)

app.use((req, _, next) => {
    console.log(`${req.method} ${req.originalUrl}`)

    next()
})

app.use((req, res) => {

    res.status(404).send(`
        <h1>404</h1>

        <h2>Página não encontrada</h2>
        <p>
            A página que estás a tentar
            aceder não existe.
        </p>
        <p>
            <strong>Endereço:</strong>
            ${req.originalUrl}
        </p>

        <a href="/">
            ← Voltar à Página Inicial
        </a>
    `)

})

app.listen(PORT, () => {
    console.log(
        `Server a correr em http://localhost:${PORT}`
    )
})

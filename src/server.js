import http from 'http'

const PORT = 3000;

const cards = [
    { name: "Dragão de Cobalto", type: "Criatura", attack: 7, defense: 5 },
    { name: "Guardiã das Marés", type: "Criatura", attack: 4, defense: 8 },
    { name: "Guardiã das Montanhas", type: "Criatura", attack: 4, defense: 7 },
    { name: "Lagarto de Lava", type: "Criatura", attack: 6, defense: 3 },
    { name: "Guaxinin de Pedra", type: "Criatura", attack: 2, defense: 10 }
]

function renderPage(title, body) {
    return `
        <!DOCTYPE html>
        <html lang="pt-pt">
        <head>
            <meta charset="UTF-8">
            <meta content="width=device-width, initial-scale=1" id="viewport" name="viewport">
            <title>${title}</title>
        </head>
        <body>
            ${body}
        </body>
        </html>
    `;
}

const pages = {
    home: {
        route: "/",
        title: "Página Inicial",
        build: (page) => {
            const links = Object.values(pages)
                .map(p => `<li><a href="${p.route}">${p.title}</a></li>`)
                .join("")

            return `
                <h1>${page.title}</h1>

                <h2>Links</h2>
                <ul>
                    ${links}
                </ul>

                <p>Existem ${cards.length} cartas.</p>
            `
        }
    },

    about: {
        route: "/sobre",
        title: "Sobre",
        build: (page) => {
            return `
                <h1>${page.title}</h1>

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
            `
        }
    },

    cards: {
        route: "/cartas",
        title: "Cartas",
        build: (page) => {
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

            return `
                <h1>${page.title}</h1>

                <h2>Lista de Cartas</h2>

                <ul>
                    ${cardList}
                </ul>

                <a href="/">
                    ← Voltar à Página Inicial
                </a>
            `
        }
    },

    randomCard: {
        route: "/cartas/aleatoria",
        title: "Carta Aleatória",

        build: (page) => {
            const card = cards[Math.floor(Math.random() * cards.length)]

            return `
                <h1>${page.title}</h1>

                <h2>${card.name}</h2>

                <div style="margin-left: 40px;">
                    <p><strong>Tipo:</strong> ${card.type}</p>
                    <p><strong>Ataque:</strong> ${card.attack}</p>
                    <p><strong>Defesa:</strong> ${card.defense}</p>
                </div>

                <a href="/">
                    ← Voltar à Página Inicial
                </a>
            `
        }
    },

    now: {
        route: "/agora",
        title: "Agora",

        build: (page) => {
            const now = new Date();

            return `
                <h1>${page.title}</h1>

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
            `
        }
    }
}

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`)

    const routes = Object.fromEntries(
        Object.values(pages).map(page => [page.route, page])
    )

    if (routes[req.url]) {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })

        const title = routes[req.url].title
        const body = routes[req.url].build(routes[req.url])

        return res.end(renderPage(title, body))
    }

    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" })

    return res.end(renderPage(
        "Erro 404",
        `
            <div style="
                text-align: center;
                margin-top: 100px;
                font-family: Arial, sans-serif;
            ">
                <h1 style="
                    font-size: 100px;
                    margin: 0;
                    color: #e74c3c;
                ">
                    404
                </h1>

                <h2>Página não encontrada</h2>
                <p>A página que estás a tentar aceder não existe.</p>
                <p><strong>Endereço:</strong> ${req.url}</p>

                <a href="/" style="
                    display: inline-block;
                    margin-top: 20px;
                    padding: 10px 20px;
                    background: #3498db;
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                ">
                    ← Voltar à Página Inicial
                </a>
            </div>
        `
    ))
})

server.listen(PORT, () => {
    console.log(`Server a correr em http://localhost:${PORT}`);
})
// PONTO DE PARTIDA DA AULA 4
//
// É exatamente onde o professor acabou o live coding do Bloco 1:
// uma app React criada com o Vite, já sem o código de exemplo.
//
// Para pôr a correr (dentro da pasta client/ do teu repo):
//     npm install
//     npm run dev
// e abrir http://localhost:5173
//
// Tarefa 1: substitui este array vazio pelo array cards do teu server

import { useState } from "react";
import Card from "./Card";

// (o que fizeste na aula 2).
const CardTypes = {
  CREATURE: "Criatura",
  SPELL: "Feitiço"
}

const cards = [
  { name: "Dragão de Cobalto", type: CardTypes.CREATURE, attack: 7, defense: 5 },
  { name: "Guardiã das Marés", type: CardTypes.CREATURE, attack: 4, defense: 8 },
  { name: "Guardiã das Montanhas", type: CardTypes.SPELL, attack: 4, defense: 7 },
  { name: "Lagarto de Lava", type: CardTypes.SPELL, attack: 6, defense: 3 },
  { name: "Guaxinin de Pedra", type: CardTypes.CREATURE, attack: 2, defense: 10 }
]

function App() {
  const [filter, setFilter] = useState({
    name: null,
    type: null,
    index: null
  })

  return (
    <main>
      <h1>A minha coleção</h1>
      <h3>Existem {cards.length} cartas</h3>

      <button onClick={() => {
        setFilter({
          ...filter,
          type: CardTypes.CREATURE
        })
      }}>
        Mostrar somente Criaturas
      </button>

      <button onClick={() => {
        setFilter({
          ...filter,
          type: CardTypes.SPELL
        })
      }}>
        Mostrar somente Feitiços
      </button>

      <button onClick={() => {
        setFilter({
          ...filter,
          index: Math.floor(Math.random() * cards.length)
        })
      }}>
        Mostrar carta aleatoria
      </button>

      <button onClick={() => {
        setFilter({
          ...filter,
          type: null,
          index: null
        })
      }}>
        Mostrar todos
      </button>

      <input type="string" onChange={(e) => {
        setFilter({
          ...filter,
          name: e.target.value || null
        })
      }} />

      {
        cards.filter((value, index) => {
          if (filter.index !== null && filter.index === index)
            return true
          else if (filter.index !== null)
            return false

          if (filter.type !== null && filter.type !== value.type)
            return false

          if (filter.name !== null &&
            !value.name.toLowerCase()
              .includes(filter.name.toLowerCase()))
            return false

          return true

        }).map((value, index) => {
          return Card(value, index)
        })
      }
    </main>
  );
}

export default App;

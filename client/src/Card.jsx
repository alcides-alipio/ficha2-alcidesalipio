import { useState } from "react";

/**
 * 
 * @param {Object} props 
 * @param {string} props.name
 * @param {string} props.type
 * @param {number} props.attack
 * @param {number} props.defense
 * @param {number} key 
 * @returns {React.JSX.Element}
 */
function Card({ name, type, attack, defense }, key) {
    const [number, setNumber] = useState(0)

    let text = <p>
        Nome: {name} |
        Tipo: {type} |
        Ataque: {attack} |
        Defesa: {defense}
    </p>

    let jsx = (
        <div key={key}>
            {attack >= 6
                ? <strong>{text}</strong>
                : text}

            <button onClick={() => {
                setNumber(number + 1)
            }}>
                ♥ {number}
            </button>
        </div>
    );

    return jsx;
}
export default Card
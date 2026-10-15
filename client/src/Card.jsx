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
    let jsx = <p key={key}>
        Nome: {name} |
        Tipo: {type} |
        Ataque: {attack} |
        Defesa: {defense}
    </p>

    if (attack >= 6)
        return <strong>{jsx}</strong>
        
    return jsx
}

export default Card
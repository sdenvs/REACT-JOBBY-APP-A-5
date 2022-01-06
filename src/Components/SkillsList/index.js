import './index.css'

const SkillsList = props => {
  const {details} = props
  return (
    <li className="skills-item-container">
      <img className="skills-logo" src={details.imageUrl} alt={details.name} />
      <p>{details.name}</p>
    </li>
  )
}

export default SkillsList

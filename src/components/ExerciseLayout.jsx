import PropTypes from 'prop-types'

const ExerciseLayout = ({ title, score, children }) => {
  return (
    <div className="exercise-container">
      <h2>{title}</h2>
      {score !== undefined && <p className="score">Puntuación: {score}</p>}
      {children}
    </div>
  )
}

ExerciseLayout.propTypes = {
  title: PropTypes.string.isRequired,
  score: PropTypes.number,
  children: PropTypes.node.isRequired
}

export default ExerciseLayout
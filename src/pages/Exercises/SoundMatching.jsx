import { useState, useEffect } from 'react'
import { soundExercises } from '../../utils/exercises'
import ExerciseLayout from '../../components/ExerciseLayout'
import AudioPlayer from '../../components/AudioPlayer'
import './ExerciseStyles.css'

export default function SoundMatching() {
  const [currentExercise, setCurrentExercise] = useState(0)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    // Efecto para reiniciar el ejercicio cuando cambia
    setFeedback('')
  }, [currentExercise])

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(prev => prev + 1)
      setFeedback('¡Correcto! 🎉')
    } else {
      setFeedback('Inténtalo de nuevo 💪')
    }
    
    setTimeout(() => {
      setCurrentExercise(prev => (prev + 1) % soundExercises.length)
    }, 1500)
  }

  return (
    <ExerciseLayout title="Emparejamiento de Sonidos" score={score}>
      <div className="exercise-content">
        <AudioPlayer src={soundExercises[currentExercise].audio} />
        
        <div className="options">
          {soundExercises[currentExercise].options.map((option, index) => (
            <button 
              key={index}
              onClick={() => handleAnswer(option.isCorrect)}
              className="option-button"
            >
              <img src={option.image} alt={option.text} />
              <span>{option.text}</span>
            </button>
          ))}
        </div>
      </div>
      
      {feedback && <div className="feedback">{feedback}</div>}
    </ExerciseLayout>
  )
}
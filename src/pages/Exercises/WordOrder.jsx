import { useState, useEffect, useCallback } from 'react'
import { wordExercises } from '../../utils/exercises'
import ExerciseLayout from '../../components/ExerciseLayout'
import './ExerciseStyles.css'

export default function WordOrder() {
  const [currentExercise, setCurrentExercise] = useState(0)
  const [shuffledWords, setShuffledWords] = useState([])
  const [selectedWords, setSelectedWords] = useState([])
  const [isCorrect, setIsCorrect] = useState(null)

  const shuffleArray = useCallback((array) => {
    return [...array].sort(() => Math.random() - 0.5)
  }, [])

  const resetExercise = useCallback(() => {
    const words = [...wordExercises[currentExercise].words]
    setShuffledWords(shuffleArray(words))
    setSelectedWords([])
    setIsCorrect(null)
  }, [currentExercise, shuffleArray])

  useEffect(() => {
    resetExercise()
  }, [resetExercise])

  const handleWordSelect = (word) => {
    if (selectedWords.includes(word)) return
    setSelectedWords([...selectedWords, word])
  }

  const handleWordRemove = (word) => {
    setSelectedWords(selectedWords.filter(w => w !== word))
  }

  const checkAnswer = () => {
    const correct = JSON.stringify(selectedWords) === 
      JSON.stringify(wordExercises[currentExercise].words)
    setIsCorrect(correct)
    
    if (correct) {
      setTimeout(() => {
        setCurrentExercise(prev => (prev + 1) % wordExercises.length)
      }, 2000)
    }
  }

  return (
    <ExerciseLayout title="Ordenar Palabras">
      <div className="word-exercise">
        <div className="sentence-preview">
          {selectedWords.length > 0 ? (
            selectedWords.map((word, index) => (
              <span 
                key={index} 
                className="word-tag"
                onClick={() => handleWordRemove(word)}
              >
                {word}
              </span>
            ))
          ) : (
            <span className="placeholder">Selecciona palabras para formar la oración</span>
          )}
        </div>
        
        <div className="word-bank">
          {shuffledWords.map((word, index) => (
            <button
              key={index}
              onClick={() => handleWordSelect(word)}
              disabled={selectedWords.includes(word)}
              className="word-button"
            >
              {word}
            </button>
          ))}
        </div>
        
        <div className="exercise-actions">
          <button onClick={checkAnswer} className="check-button">
            Comprobar
          </button>
          <button onClick={resetExercise} className="reset-button">
            Reiniciar
          </button>
        </div>
        
        {isCorrect !== null && (
          <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? '¡Correcto! 😊' : 'Sigue intentando 💪'}
          </div>
        )}
      </div>
    </ExerciseLayout>
  )
}
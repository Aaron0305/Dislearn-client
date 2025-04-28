import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ExerciseLayout from '../../components/ExerciseLayout';
import './CompletarPalabras.css';

export default function CompletarPalabras() {
  const navigate = useNavigate();
  const { user, addPoints } = useUser();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);

  // Ejercicios de completar palabras
  const completeWordsExercises = [
    {
      id: 1,
      type: "complete_words",
      title: "Completar con la letra correcta",
      instruction: "Elige la letra correcta para completar cada palabra",
      words: [
        { text: "ca_a", options: ["s", "m", "z"], correct: "s" },
        { text: "_eso", options: ["p", "b", "q"], correct: "p" },
        { text: "árbo_", options: ["l", "r", "n"], correct: "l" },
        { text: "_ibro", options: ["l", "n", "r"], correct: "l" }
      ],
      difficulty: "easy",
      explanation: "Algunas letras pueden confundirse al leer. Practica identificando la letra correcta."
    },
    {
      id: 2,
      type: "complete_words",
      title: "Completa la palabra correcta",
      instruction: "Elige la letra que completa correctamente cada palabra",
      words: [
        { text: "piz_rra", options: ["a", "e", "i"], correct: "a" },
        { text: "cuader_o", options: ["m", "n", "ñ"], correct: "n" },
        { text: "ma_zana", options: ["n", "m", "s"], correct: "n" },
        { text: "co_pañero", options: ["n", "m", "p"], correct: "m" }
      ],
      difficulty: "medium",
      explanation: "Las letras que suenan similar pueden causar confusión. Practicar ayuda a mejorar la ortografía."
    },
    {
      id: 3,
      type: "complete_words",
      title: "Completa con la letra correcta",
      instruction: "Selecciona la letra que completa correctamente la palabra",
      words: [
        { text: "tele_isión", options: ["v", "b", "f"], correct: "v" },
        { text: "_utbolista", options: ["f", "p", "j"], correct: "f" },
        { text: "ca_allo", options: ["v", "b", "p"], correct: "b" },
        { text: "es_uela", options: ["c", "k", "q"], correct: "c" }
      ],
      difficulty: "hard",
      explanation: "Algunos sonidos pueden escribirse con diferentes letras. Es importante aprender las reglas ortográficas."
    }
  ];

  const currentExercise = completeWordsExercises[currentExerciseIndex];

  useEffect(() => {
    if (currentExercise && currentExercise.words) {
      setUserAnswers(Array(currentExercise.words.length).fill(""));
    }
  }, [currentExerciseIndex]);

  const handleLetterSelect = (wordIndex, letter) => {
    if (isCompleted) return;
    
    const newAnswers = [...userAnswers];
    newAnswers[wordIndex] = letter;
    setUserAnswers(newAnswers);
  };

  const checkAnswers = () => {
    if (!currentExercise) return;
    
    let correctCount = 0;
    currentExercise.words.forEach((word, index) => {
      if (userAnswers[index] === word.correct) {
        correctCount++;
      }
    });
    
    const totalPoints = correctCount * 5;
    setScore(totalPoints);
    addPoints(totalPoints);
    
    if (correctCount === currentExercise.words.length) {
      setFeedback(`¡Excelente! ${totalPoints} puntos ganados.`);
    } else {
      setFeedback(`Has acertado ${correctCount} de ${currentExercise.words.length}.`);
    }
    
    setIsCompleted(true);
  };

  const nextExercise = () => {
    if (currentExerciseIndex < completeWordsExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      resetExercise();
    } else {
      navigate('/exercises');
    }
  };

  const resetExercise = () => {
    setUserAnswers(Array(currentExercise.words.length).fill(""));
    setIsCompleted(false);
    setFeedback('');
  };

  const handleBackToExercises = () => {
    navigate('/exercises');
  };

  if (!currentExercise) {
    return (
      <ExerciseLayout title="Completar Palabras">
        <div>Cargando ejercicios...</div>
      </ExerciseLayout>
    );
  }

  return (
    <ExerciseLayout title="Completar Palabras">
      <div className="completar-palabras-container">
        <div className="exercise-header">
          <h2>{currentExercise.title}</h2>
          <p className="instruction">{currentExercise.instruction}</p>
        </div>

        <div className="words-grid">
          {currentExercise.words.map((word, wordIndex) => {
            const parts = word.text.split('_');
            return (
              <div key={wordIndex} className="word-card">
                <div className="word-display">
                  <span>{parts[0]}</span>
                  <span className={`letter-space ${userAnswers[wordIndex] ? 'filled' : ''}`}>
                    {userAnswers[wordIndex] || '_'}
                  </span>
                  {parts.length > 1 && <span>{parts[1]}</span>}
                </div>
                
                <div className="options-container">
                  {word.options.map((option, optionIndex) => (
                    <button
                      key={optionIndex}
                      className={`option-button ${userAnswers[wordIndex] === option ? 'selected' : ''}
                                 ${isCompleted && option === word.correct ? 'correct' : ''}
                                 ${isCompleted && userAnswers[wordIndex] === option && option !== word.correct ? 'incorrect' : ''}`}
                      onClick={() => handleLetterSelect(wordIndex, option)}
                      disabled={isCompleted}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="exercise-explanation">
          <p>{currentExercise.explanation}</p>
        </div>

        {feedback && (
          <div className={`feedback-message ${isCompleted ? 'visible' : ''}`}>
            <p>{feedback}</p>
          </div>
        )}

        <div className="exercise-actions">
          {!isCompleted ? (
            <button
              className="check-button"
              onClick={checkAnswers}
              disabled={userAnswers.some(answer => answer === "")}
            >
              Comprobar
            </button>
          ) : (
            <div className="completed-actions">
              <button className="retry-button" onClick={resetExercise}>
                Reintentar
              </button>
              <button className="next-button" onClick={nextExercise}>
                {currentExerciseIndex < completeWordsExercises.length - 1 ? 'Siguiente' : 'Finalizar'}
              </button>
            </div>
          )}
        </div>

        <div className="navigation-buttons">
          <button 
            onClick={handleBackToExercises}
            className="back-button"
          >
            Volver a Ejercicios
          </button>
        </div>
      </div>
    </ExerciseLayout>
  );
}

// Contexto de usuario simplificado (deberías usar tu propio contexto real)
function useUser() {
  return {
    user: { name: 'Usuario' },
    addPoints: (points) => console.log(`Se añadieron ${points} puntos`)
  };
}
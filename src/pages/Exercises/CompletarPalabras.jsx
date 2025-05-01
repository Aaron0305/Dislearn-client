import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ExerciseLayout from '../../components/ExerciseLayout';

export default function CompletarPalabras() {
  const navigate = useNavigate();
  const { addPoints } = useUser();
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

  // Initialize user answers when the component mounts or when the exercise changes
  useEffect(() => {
    if (currentExercise && currentExercise.words) {
      // Initialize with empty strings only if we don't already have answers
      setUserAnswers(prev => {
        if (prev.length !== currentExercise.words.length) {
          return Array(currentExercise.words.length).fill("");
        }
        return prev;
      });
    }
  }, [currentExerciseIndex, currentExercise]);

  // Función estable para seleccionar letras
  const handleLetterSelect = (wordIndex, letter) => {
    if (isCompleted) return;
    
    setUserAnswers(prevAnswers => {
      const newAnswers = [...prevAnswers];
      newAnswers[wordIndex] = letter;
      return newAnswers;
    });
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
    
    // Solo añadir puntos cuando se completa por primera vez
    if (!isCompleted) {
      addPoints(totalPoints);
    }
    
    if (correctCount === currentExercise.words.length) {
      setFeedback(`¡Excelente! ${totalPoints} puntos ganados.`);
    } else {
      setFeedback(`Has acertado ${correctCount} de ${currentExercise.words.length}.`);
    }
    
    setIsCompleted(true);
  };

  const nextExercise = () => {
    if (currentExerciseIndex < completeWordsExercises.length - 1) {
      setCurrentExerciseIndex(prevIndex => prevIndex + 1);
      resetExercise();
    } else {
      // Asegurarse de usar el método correcto para navegar
      try {
        navigate('/exercises');
      } catch (error) {
        console.error("Error de navegación:", error);
        // Fallback para navegación
        window.location.href = '/exercises';
      }
    }
  };

  const resetExercise = () => {
    if (!currentExercise) return;
    setUserAnswers(Array(currentExercise.words.length).fill(""));
    setIsCompleted(false);
    setFeedback('');
  };

  const handleBackToExercises = () => {
    // Mejorado el manejo de navegación
    try {
      navigate('/exercises');
    } catch (error) {
      console.error("Error de navegación:", error);
      // Fallback para navegación
      window.location.href = '/exercises';
    }
  };

  if (!currentExercise) {
    return (
      <ExerciseLayout title="Completar Palabras">
        <div className="flex justify-center items-center h-full">
          <p className="text-lg text-gray-600">Cargando ejercicios...</p>
        </div>
      </ExerciseLayout>
    );
  }

  return (
    <ExerciseLayout title="Completar Palabras">
      <div className="w-full max-w-4xl mx-auto px-4 py-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-lg">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-indigo-700 mb-2">{currentExercise.title}</h2>
          <p className="text-lg text-gray-600 font-medium">{currentExercise.instruction}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {currentExercise.words.map((word, wordIndex) => {
            const parts = word.text.split('_');
            return (
              <div key={wordIndex} className="bg-indigo-50/20 rounded-lg shadow-md p-4 transition-all duration-300 hover:shadow-lg">
                <div className="flex justify-center items-center text-2xl font-bold mb-4 text-gray-800">
                  <span>{parts[0]}</span>
                  <span className={`inline-block w-8 text-center mx-1 border-b-2 ${userAnswers[wordIndex] ? 'border-indigo-500' : 'border-gray-400'}`}>
                    {userAnswers[wordIndex] || '_'}
                  </span>
                  {parts.length > 1 && <span>{parts[1]}</span>}
                </div>
                
                <div className="flex justify-center space-x-3">
                  {word.options.map((option, optionIndex) => {
                    // Calcular las clases del botón de manera más estable
                    let buttonClasses = "w-10 h-10 rounded-full flex items-center justify-center text-lg font-medium transition-colors duration-300";
                    
                    if (isCompleted) {
                      if (option === word.correct) {
                        buttonClasses += " bg-green-500 text-white";
                      } else if (userAnswers[wordIndex] === option && option !== word.correct) {
                        buttonClasses += " bg-red-500 text-white";
                      } else {
                        buttonClasses += " bg-gray-200 text-gray-500";
                      }
                    } else {
                      if (userAnswers[wordIndex] === option) {
                        buttonClasses += " bg-indigo-600 text-white";
                      } else {
                        buttonClasses += " bg-indigo-100 text-gray-800 hover:bg-indigo-200";
                      }
                    }
                    
                    return (
                      <button
                        key={optionIndex}
                        className={buttonClasses}
                        onClick={() => handleLetterSelect(wordIndex, option)}
                        disabled={isCompleted}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-indigo-50 p-4 rounded-lg mb-6">
          <p className="text-indigo-800 italic">{currentExercise.explanation}</p>
        </div>

        {feedback && (
          <div className={`mb-6 p-4 rounded-lg text-center text-lg font-medium ${isCompleted ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 ${score === currentExercise.words.length * 5 ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
            <p>{feedback}</p>
          </div>
        )}

        <div className="flex justify-center mb-6">
          {!isCompleted ? (
            <button
              className={`px-8 py-3 rounded-full font-bold text-white transition-all duration-300 ${userAnswers.some(answer => answer === "") ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg'}`}
              onClick={checkAnswers}
              disabled={userAnswers.some(answer => answer === "")}
            >
              Comprobar
            </button>
          ) : (
            <div className="flex space-x-4">
              <button 
                className="px-6 py-3 rounded-full font-bold text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-50 transition-colors duration-300"
                onClick={resetExercise}
              >
                Reintentar
              </button>
              <button 
                className="px-8 py-3 rounded-full font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all duration-300"
                onClick={nextExercise}
              >
                {currentExerciseIndex < completeWordsExercises.length - 1 ? 'Siguiente' : 'Finalizar'}
              </button>
            </div>
          )}
        </div>

        <div className="text-center">
          {/* Botón mejorado para volver a ejercicios */}
          <button 
            onClick={handleBackToExercises}
            className="px-6 py-2 text-gray-600 hover:text-indigo-600 font-medium transition-colors duration-300 flex items-center justify-center mx-auto"
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
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
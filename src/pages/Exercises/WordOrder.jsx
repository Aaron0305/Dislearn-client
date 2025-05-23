import { useState, useEffect, useCallback } from 'react';
import ExerciseLayout from '../../components/ExerciseLayout';
import { wordExercises } from '../../utils/exercises';

export default function WordOrder() {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [shuffledWords, setShuffledWords] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);

  const shuffleArray = useCallback((array) => {
    return [...array].sort(() => Math.random() - 0.5);
  }, []);

  const resetExercise = useCallback(() => {
    const words = [...wordExercises[currentExercise].words];
    setShuffledWords(shuffleArray(words));
    setSelectedWords([]);
    setIsCorrect(null);
  }, [currentExercise, shuffleArray]);

  useEffect(() => {
    resetExercise();
  }, [resetExercise]);

  const handleWordSelect = (word) => {
    if (selectedWords.includes(word)) return;
    setSelectedWords([...selectedWords, word]);
  };

  const handleWordRemove = (word) => {
    setSelectedWords(selectedWords.filter((w) => w !== word));
  };

  const checkAnswer = () => {
    const correct = JSON.stringify(selectedWords) === 
      JSON.stringify(wordExercises[currentExercise].words);
    setIsCorrect(correct);

    if (correct) {
      setTimeout(() => {
        setCurrentExercise((prev) => (prev + 1) % wordExercises.length);
      }, 2000);
    }
  };

  return (
    <ExerciseLayout title="Ordenar Palabras">
      <div className="flex flex-col gap-8 items-center w-full">
        {/* Sentence Preview */}
        <div className="w-full max-w-3xl min-h-24 bg-white/80 rounded-xl shadow-lg p-4 flex flex-wrap items-center justify-center gap-2 border-2 border-[#809BCE]">
          {selectedWords.length > 0 ? (
            selectedWords.map((word, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full bg-[#EAC4D5]/80 text-[#232526] font-semibold cursor-pointer hover:bg-[#EAC4D5] transition-colors duration-200"
                onClick={() => handleWordRemove(word)}
              >
                {word}
              </span>
            ))
          ) : (
            <span className="text-[#809BCE] font-medium italic">
              Selecciona palabras para formar la oración
            </span>
          )}
        </div>

        {/* Word Bank */}
        <div className="w-full max-w-3xl flex flex-wrap gap-3 justify-center">
          {shuffledWords.map((word, index) => (
            <button
              key={index}
              onClick={() => handleWordSelect(word)}
              disabled={selectedWords.includes(word)}
              className={`px-4 py-2 rounded-lg font-bold shadow-md transition-all duration-200 
                ${selectedWords.includes(word) 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-[#809BCE] text-white hover:bg-[#B8E0D2] hover:text-[#232526] hover:scale-105'
                }`}
            >
              {word}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button 
            onClick={checkAnswer} 
            className="px-6 py-2 rounded-full font-bold text-white bg-gradient-to-r from-[#809BCE] to-[#EAC4D5] shadow-lg hover:scale-105 transition-all duration-200"
          >
            Comprobar
          </button>
          <button 
            onClick={resetExercise} 
            className="px-6 py-2 rounded-full font-bold text-[#809BCE] border-2 border-[#809BCE] bg-white/80 shadow-lg hover:bg-[#EAC4D5]/20 transition-all duration-200"
          >
            Reiniciar
          </button>
        </div>

        {/* Feedback Message */}
        {isCorrect !== null && (
          <div 
            className={`w-full max-w-md text-center p-4 rounded-xl font-bold text-lg transition-all duration-500 ${
              isCorrect 
                ? 'bg-[#B8E0D2]/80 text-[#232526]' 
                : 'bg-[#EAC4D5]/80 text-[#232526]'
            }`}
          >
            {isCorrect ? '¡Correcto! 😊' : 'Sigue intentando 💪'}
          </div>
        )}
      </div>
    </ExerciseLayout>
  );
}
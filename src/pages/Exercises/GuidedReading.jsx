import { useState, useEffect } from 'react';
import ExerciseLayout from '../../components/ExerciseLayout';
import { guidedReadingExercises } from '../../utils/exercises';

export default function GuidedReading() {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [fontSize, setFontSize] = useState('medium');
  const [fontType, setFontType] = useState('dyslexic');
  const [highlighting, setHighlighting] = useState('word');
  const [showingDefinition, setShowingDefinition] = useState(null);

  const exercise = guidedReadingExercises[currentExercise];

  useEffect(() => {
    setShowingDefinition(null);
  }, [currentExercise]);

  const handleNextExercise = () => {
    setCurrentExercise((prev) => (prev + 1) % guidedReadingExercises.length);
  };

  const handlePreviousExercise = () => {
    setCurrentExercise((prev) => (prev - 1 + guidedReadingExercises.length) % guidedReadingExercises.length);
  };

  const handleWordClick = (word) => {
    const definition = exercise.definitions[word.toLowerCase()];
    if (definition) {
      setShowingDefinition({ word, definition });
    }
  };

  // Función para dividir el texto en líneas en lugar de párrafos
  const splitTextIntoLines = (text) => {
    return text.split('\n').flatMap(paragraph => 
      paragraph.split(/(\.\s+|\?\s+|\!\s+)/).filter(Boolean)
    );
  };

  // Función para aplicar resaltado según la configuración
  const renderText = () => {
    if (!exercise) return null;

    const lines = splitTextIntoLines(exercise.text);
    const content = [];

    lines.forEach((line, lineIndex) => {
      if (line.trim() === '') {
        content.push(<br key={`br-${lineIndex}`} />);
        return;
      }

      const words = line.split(' ');
      const lineContent = words.map((word, wordIndex) => (
        <span 
          key={`${lineIndex}-${wordIndex}`} 
          className={`${highlighting === 'word' ? 'hover:bg-[#B8E0D2]/50 hover:rounded cursor-pointer' : ''}`}
          onClick={() => handleWordClick(word.replace(/[.,;!?]$/, ''))}
        >
          {word}{' '}
        </span>
      ));

      content.push(
        <div 
          key={lineIndex} 
          className={`${highlighting === 'line' ? 'hover:bg-[#B8E0D2]/30' : ''}`}
        >
          {lineContent}
        </div>
      );
    });

    return content;
  };

  // Determinar las clases de tamaño de fuente
  const fontSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-xl'
  };

  // Determinar las clases de tipo de fuente
  const fontTypeClasses = {
    dyslexic: 'font-["OpenDyslexic",sans-serif]',
    sans: 'font-sans',
    serif: 'font-serif'
  };

  if (!exercise) {
    return (
      <ExerciseLayout title="Lectura Guiada">
        <div className="flex items-center justify-center p-8 text-[#809BCE] font-medium">
          No hay ejercicios disponibles. Por favor, inténtalo más tarde.
        </div>
      </ExerciseLayout>
    );
  }

  return (
    <ExerciseLayout title="Lectura Guiada">
      <div className="flex flex-col gap-6 items-center w-full max-w-4xl mx-auto">
        {/* Controles de lectura */}
        <div className="w-full bg-white/90 rounded-xl shadow-lg p-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <label className="text-[#809BCE] font-semibold">Tamaño de letra:</label>
                <div className="flex gap-2">
                  <button 
                    className={`px-3 py-1 rounded-md font-medium text-sm transition-all ${
                      fontSize === 'small' 
                        ? 'bg-[#809BCE] text-white' 
                        : 'bg-[#809BCE]/20 text-[#809BCE] hover:bg-[#809BCE]/30'
                    }`}
                    onClick={() => setFontSize('small')}
                  >
                    Pequeña
                  </button>
                  <button 
                    className={`px-3 py-1 rounded-md font-medium text-sm transition-all ${
                      fontSize === 'medium' 
                        ? 'bg-[#809BCE] text-white' 
                        : 'bg-[#809BCE]/20 text-[#809BCE] hover:bg-[#809BCE]/30'
                    }`}
                    onClick={() => setFontSize('medium')}
                  >
                    Mediana
                  </button>
                  <button 
                    className={`px-3 py-1 rounded-md font-medium text-sm transition-all ${
                      fontSize === 'large' 
                        ? 'bg-[#809BCE] text-white' 
                        : 'bg-[#809BCE]/20 text-[#809BCE] hover:bg-[#809BCE]/30'
                    }`}
                    onClick={() => setFontSize('large')}
                  >
                    Grande
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[#809BCE] font-semibold">Tipo de letra:</label>
                <div className="flex gap-2">
                  <button 
                    className={`px-3 py-1 rounded-md font-medium text-sm transition-all ${
                      fontType === 'dyslexic' 
                        ? 'bg-[#809BCE] text-white' 
                        : 'bg-[#809BCE]/20 text-[#809BCE] hover:bg-[#809BCE]/30'
                    }`}
                    onClick={() => setFontType('dyslexic')}
                  >
                    Dislexia
                  </button>
                  <button 
                    className={`px-3 py-1 rounded-md font-medium text-sm transition-all ${
                      fontType === 'sans' 
                        ? 'bg-[#809BCE] text-white' 
                        : 'bg-[#809BCE]/20 text-[#809BCE] hover:bg-[#809BCE]/30'
                    }`}
                    onClick={() => setFontType('sans')}
                  >
                    Sin serifa
                  </button>
                  <button 
                    className={`px-3 py-1 rounded-md font-medium text-sm transition-all ${
                      fontType === 'serif' 
                        ? 'bg-[#809BCE] text-white' 
                        : 'bg-[#809BCE]/20 text-[#809BCE] hover:bg-[#809BCE]/30'
                    }`}
                    onClick={() => setFontType('serif')}
                  >
                    Con serifa
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[#809BCE] font-semibold">Resaltado:</label>
              <div className="flex gap-2">
                <button 
                  className={`px-3 py-1 rounded-md font-medium text-sm transition-all ${
                    highlighting === 'none' 
                      ? 'bg-[#809BCE] text-white' 
                      : 'bg-[#809BCE]/20 text-[#809BCE] hover:bg-[#809BCE]/30'
                  }`}
                  onClick={() => setHighlighting('none')}
                >
                  Ninguno
                </button>
                <button 
                  className={`px-3 py-1 rounded-md font-medium text-sm transition-all ${
                    highlighting === 'word' 
                      ? 'bg-[#809BCE] text-white' 
                      : 'bg-[#809BCE]/20 text-[#809BCE] hover:bg-[#809BCE]/30'
                  }`}
                  onClick={() => setHighlighting('word')}
                >
                  Por palabra
                </button>
                <button 
                  className={`px-3 py-1 rounded-md font-medium text-sm transition-all ${
                    highlighting === 'line' 
                      ? 'bg-[#809BCE] text-white' 
                      : 'bg-[#809BCE]/20 text-[#809BCE] hover:bg-[#809BCE]/30'
                  }`}
                  onClick={() => setHighlighting('line')}
                >
                  Por línea
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido de lectura */}
        <div className="w-full bg-white/95 rounded-xl shadow-xl p-6 mb-4">
          <h3 className="text-2xl font-bold text-[#EAC4D5] mb-4 text-center">{exercise.title}</h3>
          
          {exercise.image && (
            <div className="flex justify-center mb-6">
              <img src={exercise.image} alt={exercise.title} className="max-w-full h-auto rounded-lg shadow-md" />
            </div>
          )}
          
          <div 
            className={`${fontSizeClasses[fontSize]} ${fontTypeClasses[fontType]} text-[#232526] leading-relaxed mb-12`}
          >
            {renderText()}
          </div>
        </div>

        {/* Definición de palabra */}
        {showingDefinition && (
          <div className="w-full bg-[#B8E0D2]/50 border border-[#B8E0D2] rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-lg font-bold text-[#809BCE]">{showingDefinition.word}</h4>
              <button 
                className="text-2xl text-[#809BCE] hover:text-[#EAC4D5] transition-colors"
                onClick={() => setShowingDefinition(null)}
              >
                &times;
              </button>
            </div>
            <p className="text-[#232526]">{showingDefinition.definition}</p>
          </div>
        )}

        {/* Navegación */}
        <div className="w-full flex justify-between items-center p-4 bg-white/80 rounded-xl shadow-md">
          <button 
            onClick={handlePreviousExercise}
            className="px-4 py-2 rounded-lg bg-[#809BCE] text-white font-medium hover:bg-[#EAC4D5] transition-colors"
          >
            &larr; Anterior
          </button>
          
          <span className="font-medium text-[#809BCE]">
            {currentExercise + 1} / {guidedReadingExercises.length}
          </span>
          
          <button 
            onClick={handleNextExercise}
            className="px-4 py-2 rounded-lg bg-[#809BCE] text-white font-medium hover:bg-[#EAC4D5] transition-colors"
          >
            Siguiente &rarr;
          </button>
        </div>
      </div>
    </ExerciseLayout>
  );
}
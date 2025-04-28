import { useState, useEffect } from 'react';
import ExerciseLayout from '../../components/ExerciseLayout';
import { guidedReadingExercises } from '../../utils/exercises';
import './GuidedReading.css';

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
          className={`word ${highlighting === 'word' ? 'highlightable' : ''}`}
          onClick={() => handleWordClick(word.replace(/[.,;!?]$/, ''))}
        >
          {word}{' '}
        </span>
      ));

      content.push(
        <div key={lineIndex} className={highlighting === 'line' ? 'line-highlight' : ''}>
          {lineContent}
        </div>
      );
    });

    return content;
  };

  if (!exercise) {
    return (
      <ExerciseLayout title="Lectura Guiada">
        <div className="no-exercise">
          No hay ejercicios disponibles. Por favor, inténtalo más tarde.
        </div>
      </ExerciseLayout>
    );
  }

  return (
    <ExerciseLayout title="Lectura Guiada">
      <div className="guided-reading">
        <div className="reading-controls">
          <div className="control-section">
            <div className="control-group">
              <label>Tamaño de letra:</label>
              <div className="control-options">
                <button 
                  className={fontSize === 'small' ? 'active' : ''} 
                  onClick={() => setFontSize('small')}
                >
                  Pequeña
                </button>
                <button 
                  className={fontSize === 'medium' ? 'active' : ''} 
                  onClick={() => setFontSize('medium')}
                >
                  Mediana
                </button>
                <button 
                  className={fontSize === 'large' ? 'active' : ''} 
                  onClick={() => setFontSize('large')}
                >
                  Grande
                </button>
              </div>
            </div>

            <div className="control-group">
              <label>Tipo de letra:</label>
              <div className="control-options">
                <button 
                  className={fontType === 'dyslexic' ? 'active' : ''} 
                  onClick={() => setFontType('dyslexic')}
                >
                  Dislexia
                </button>
                <button 
                  className={fontType === 'sans' ? 'active' : ''} 
                  onClick={() => setFontType('sans')}
                >
                  Sin serifa
                </button>
                <button 
                  className={fontType === 'serif' ? 'active' : ''} 
                  onClick={() => setFontType('serif')}
                >
                  Con serifa
                </button>
              </div>
            </div>
          </div>

          <div className="control-section">
            <div className="control-group">
              <label>Resaltado:</label>
              <div className="control-options">
                <button 
                  className={highlighting === 'none' ? 'active' : ''} 
                  onClick={() => setHighlighting('none')}
                >
                  Ninguno
                </button>
                <button 
                  className={highlighting === 'word' ? 'active' : ''} 
                  onClick={() => setHighlighting('word')}
                >
                  Por palabra
                </button>
                <button 
                  className={highlighting === 'line' ? 'active' : ''} 
                  onClick={() => setHighlighting('line')}
                >
                  Por línea
                </button>
              </div>
            </div>
          </div>
        </div>

        <div 
          className={`reading-content ${fontSize} ${fontType}`}
        >
          <h3 className="reading-title">{exercise.title}</h3>
          {exercise.image && (
            <div className="reading-image-container">
              <img src={exercise.image} alt={exercise.title} className="reading-image" />
            </div>
          )}
          <div className="reading-text" style={{ marginBottom: '50px' }}>
            {renderText()}
          </div>
        </div>

        {showingDefinition && (
          <div className="word-definition">
            <div className="definition-header">
              <h4>{showingDefinition.word}</h4>
              <button 
                className="close-definition" 
                onClick={() => setShowingDefinition(null)}
              >
                &times;
              </button>
            </div>
            <p>{showingDefinition.definition}</p>
          </div>
        )}

        <div className="reading-navigation">
          <button 
            onClick={handlePreviousExercise}
            className="nav-button prev"
          >
            &larr; Anterior
          </button>
          <span className="exercise-counter">
            {currentExercise + 1} / {guidedReadingExercises.length}
          </span>
          <button 
            onClick={handleNextExercise}
            className="nav-button next"
          >
            Siguiente &rarr;
          </button>
        </div>
      </div>
    </ExerciseLayout>
  );
}
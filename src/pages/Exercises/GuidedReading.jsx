import { useState, useEffect } from 'react';
import ExerciseLayout from '../../components/ExerciseLayout';
import { guidedReadingExercises } from '../../utils/exercises';
import './GuidedReading.css';

export default function GuidedReading() {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [readingSpeed, setReadingSpeed] = useState('normal');
  const [fontSize, setFontSize] = useState('medium');
  const [fontType, setFontType] = useState('dyslexic');
  const [highlighting, setHighlighting] = useState('word');
  const [showingDefinition, setShowingDefinition] = useState(null);
  const [progress, setProgress] = useState(0);

  const exercise = guidedReadingExercises[currentExercise];

  useEffect(() => {
    setProgress(0);
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

  const handleProgressChange = (e) => {
    setProgress(e.target.value);
  };

  // Función para aplicar resaltado según la configuración
  const renderText = () => {
    if (!exercise) return null;

    const words = exercise.text.split(' ');
    const paragraphs = [];
    let currentParagraph = [];

    words.forEach((word, index) => {
      // Detectar final de párrafo
      if (word.includes('\n')) {
        const parts = word.split('\n');
        if (parts[0]) {
          currentParagraph.push(
            <span 
              key={`${index}-a`} 
              className={`word ${highlighting === 'word' ? 'highlightable' : ''}`}
              onClick={() => handleWordClick(parts[0].replace(/[.,;!?]$/, ''))}
            >
              {parts[0]}{' '}
            </span>
          );
        }
        paragraphs.push(
          <p key={paragraphs.length}>
            {currentParagraph}
          </p>
        );
        currentParagraph = [];
        
        if (parts[1]) {
          currentParagraph.push(
            <span 
              key={`${index}-b`} 
              className={`word ${highlighting === 'word' ? 'highlightable' : ''}`}
              onClick={() => handleWordClick(parts[1].replace(/[.,;!?]$/, ''))}
            >
              {parts[1]}{' '}
            </span>
          );
        }
      } else {
        currentParagraph.push(
          <span 
            key={index} 
            className={`word ${highlighting === 'word' ? 'highlightable' : ''}`}
            onClick={() => handleWordClick(word.replace(/[.,;!?]$/, ''))}
          >
            {word}{' '}
          </span>
        );
      }
    });

    // Añadir el último párrafo
    if (currentParagraph.length > 0) {
      paragraphs.push(
        <p key={paragraphs.length}>
          {currentParagraph}
        </p>
      );
    }

    return paragraphs;
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
          <div className="control-group">
            <label>Velocidad:</label>
            <div className="control-options">
              <button 
                className={readingSpeed === 'slow' ? 'active' : ''} 
                onClick={() => setReadingSpeed('slow')}
              >
                Lenta
              </button>
              <button 
                className={readingSpeed === 'normal' ? 'active' : ''} 
                onClick={() => setReadingSpeed('normal')}
              >
                Normal
              </button>
              <button 
                className={readingSpeed === 'fast' ? 'active' : ''} 
                onClick={() => setReadingSpeed('fast')}
              >
                Rápida
              </button>
            </div>
          </div>

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

        <div className="reading-progress">
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={progress} 
            onChange={handleProgressChange}
            className="progress-slider"
          />
          <div className="progress-label">
            Progreso: {progress}%
          </div>
        </div>

        <div 
          className={`reading-content ${readingSpeed} ${fontSize} ${fontType} ${highlighting === 'line' ? 'line-highlight' : ''}`}
          style={{ transform: `translateY(-${progress}%)` }}
        >
          <h3 className="reading-title">{exercise.title}</h3>
          {exercise.image && (
            <div className="reading-image-container">
              <img src={exercise.image} alt={exercise.title} className="reading-image" />
            </div>
          )}
          <div className="reading-text">
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
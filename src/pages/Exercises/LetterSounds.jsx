import { useState, useEffect, useRef } from 'react';
import ExerciseLayout from '../../components/ExerciseLayout';
import { spanishAlphabet } from '../../utils/exercises';
import './LetterSounds.css';

export default function LetterSounds() {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [view, setView] = useState('grid'); // 'grid' o 'single'
  const [history, setHistory] = useState([]);
  const [difficultyLevel, setDifficultyLevel] = useState('all');
  const audioRef = useRef(null);

  // Filtrar letras por dificultad si es necesario
  const getFilteredLetters = () => {
    if (difficultyLevel === 'all') {
      return spanishAlphabet;
    } else {
      return spanishAlphabet.filter(letter => letter.difficulty === difficultyLevel);
    }
  };

  const handleLetterClick = (letter) => {
    setSelectedLetter(letter);
    playLetterSound(letter.id);
    
    // Actualizar historial de práctica
    setHistory(prev => {
      const newHistory = [...prev];
      const existingIndex = newHistory.findIndex(item => item.id === letter.id);
      
      if (existingIndex >= 0) {
        newHistory[existingIndex].count += 1;
      } else {
        newHistory.push({ ...letter, count: 1 });
      }
      
      return newHistory;
    });
  };

  const playLetterSound = (letterId) => {
    if (playing) return;
    
    setPlaying(true);
    
    // En una aplicación real, se usaría una API de texto a voz o archivos de audio
    // Aquí simulamos con la API de voz del navegador
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = spanishAlphabet.find(l => l.id === letterId).phonetic;
      utterance.lang = 'es-ES';
      utterance.rate = 0.8; // Un poco más lento para mayor claridad
      
      utterance.onend = () => {
        setPlaying(false);
      };
      
      window.speechSynthesis.speak(utterance);
    } else {
      // Fallback si la API de voz no está disponible
      setTimeout(() => {
        setPlaying(false);
      }, 1000);
    }
  };

  const handleRepeatSound = () => {
    if (selectedLetter && !playing) {
      playLetterSound(selectedLetter.id);
    }
  };

  const handleNextLetter = () => {
    if (!selectedLetter) return;
    
    const filteredLetters = getFilteredLetters();
    const currentIndex = filteredLetters.findIndex(l => l.id === selectedLetter.id);
    const nextIndex = (currentIndex + 1) % filteredLetters.length;
    setSelectedLetter(filteredLetters[nextIndex]);
    playLetterSound(filteredLetters[nextIndex].id);
  };

  const handlePrevLetter = () => {
    if (!selectedLetter) return;
    
    const filteredLetters = getFilteredLetters();
    const currentIndex = filteredLetters.findIndex(l => l.id === selectedLetter.id);
    const prevIndex = (currentIndex - 1 + filteredLetters.length) % filteredLetters.length;
    setSelectedLetter(filteredLetters[prevIndex]);
    playLetterSound(filteredLetters[prevIndex].id);
  };

  const renderLetterGrid = () => {
    const filteredLetters = getFilteredLetters();
    
    return (
      <div className="letter-grid">
        {filteredLetters.map((letter) => (
          <button
            key={letter.id}
            className={`letter-button ${selectedLetter?.id === letter.id ? 'selected' : ''} ${letter.difficulty}`}
            onClick={() => handleLetterClick(letter)}
            aria-label={`Letra ${letter.letter}`}
          >
            <span className="letter-display">{letter.letter}</span>
            {letter.example && <span className="letter-example">{letter.example}</span>}
          </button>
        ))}
      </div>
    );
  };

  const renderSingleView = () => {
    if (!selectedLetter) {
      return (
        <div className="no-letter-selected">
          <p>Selecciona una letra del abecedario para escuchar su sonido</p>
        </div>
      );
    }

    return (
      <div className="single-letter-view">
        <div className="navigation-buttons">
          <button 
            onClick={handlePrevLetter}
            className="nav-button"
            aria-label="Letra anterior"
          >
            &larr;
          </button>
          
          <div className="large-letter-container">
            <div className={`large-letter ${selectedLetter.difficulty}`}>
              {selectedLetter.letter}
            </div>
            <div className="letter-info">
              <p className="letter-phonetic">Sonido: <strong>{selectedLetter.phonetic}</strong></p>
              <p className="letter-example">Ejemplo: <strong>{selectedLetter.example}</strong></p>
            </div>
            <button 
              className={`play-sound-button ${playing ? 'playing' : ''}`}
              onClick={handleRepeatSound}
              disabled={playing}
            >
              {playing ? 'Reproduciendo...' : 'Escuchar Sonido'}
            </button>
          </div>
          
          <button 
            onClick={handleNextLetter}
            className="nav-button"
            aria-label="Siguiente letra"
          >
            &rarr;
          </button>
        </div>
      </div>
    );
  };

  return (
    <ExerciseLayout title="Sonido de la Letra">
      <div className="letter-sounds-exercise">
        <div className="exercise-controls">
          <div className="view-toggle">
            <button
              className={`toggle-button ${view === 'grid' ? 'active' : ''}`}
              onClick={() => setView('grid')}
            >
              Todas las Letras
            </button>
            <button
              className={`toggle-button ${view === 'single' ? 'active' : ''}`}
              onClick={() => setView('single')}
              disabled={!selectedLetter}
            >
              Vista Individual
            </button>
          </div>
          
          <div className="difficulty-filter">
            <label>Dificultad:</label>
            <select 
              value={difficultyLevel} 
              onChange={(e) => setDifficultyLevel(e.target.value)}
            >
              <option value="all">Todas las letras</option>
              <option value="easy">Fácil</option>
              <option value="medium">Media</option>
              <option value="hard">Difícil</option>
            </select>
          </div>
        </div>

        <div className="exercise-content">
          {view === 'grid' ? renderLetterGrid() : renderSingleView()}
        </div>

        {history.length > 0 && (
          <div className="practice-history">
            <h4>Letras Practicadas</h4>
            <div className="history-list">
              {history.sort((a, b) => b.count - a.count).map((item) => (
                <div key={item.id} className="history-item">
                  <span className="history-letter">{item.letter}</span>
                  <span className="history-count">{item.count} veces</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ExerciseLayout>
  );
}
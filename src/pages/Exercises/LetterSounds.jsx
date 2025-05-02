import { useState } from 'react';
import ExerciseLayout from '../../components/ExerciseLayout';
import { spanishAlphabet } from '../../utils/exercises';

export default function LetterSounds() {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [history, setHistory] = useState([]);

  // Usa SpeechSynthesis como fallback si el audio externo falla
  const getAudioUrl = (letter) =>
    `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(letter)}&tl=es&client=tw-ob`;

  // Solución: Forzar la carga de voces antes de reproducir el sonido
  const playLetterSound = async (letter) => {
    if (playing) return;
    setPlaying(true);

    // Asegura que las voces estén cargadas antes de buscar la voz
    let voices = [];
    if ('speechSynthesis' in window) {
      voices = window.speechSynthesis.getVoices();
      if (!voices.length) {
        // Forzar carga de voces
        await new Promise(resolve => {
          window.speechSynthesis.onvoiceschanged = resolve;
        });
        voices = window.speechSynthesis.getVoices();
      }
    }

    // Buscar una voz española más natural
    let voice =
      voices.find(v => v.lang === 'es-ES' && v.name.toLowerCase().includes('female')) ||
      voices.find(v => v.lang === 'es-ES' && v.name.toLowerCase().includes('españa')) ||
      voices.find(v => v.lang === 'es-ES') ||
      voices.find(v => v.lang && v.lang.startsWith('es'));

    // Usa SpeechSynthesis con la mejor voz encontrada
    if ('speechSynthesis' in window && voice) {
      const utter = new window.SpeechSynthesisUtterance(letter);
      utter.voice = voice;
      utter.lang = voice.lang;
      utter.rate = 0.8;
      utter.pitch = 1.1;
      utter.onend = () => setPlaying(false);
      window.speechSynthesis.speak(utter);
    } else {
      // Fallback: intenta reproducir el audio externo
      const audio = new window.Audio(getAudioUrl(letter));
      audio.onended = () => setPlaying(false);
      audio.onerror = () => setPlaying(false);
      try {
        await audio.play();
      } catch {
        setPlaying(false);
      }
    }

    // Actualizar historial
    setHistory((prev) => {
      const idx = prev.findIndex((item) => item.letter === letter);
      if (idx >= 0) {
        const newHistory = [...prev];
        newHistory[idx].count += 1;
        return newHistory;
      } else {
        return [...prev, { letter, count: 1 }];
      }
    });
  };

  return (
    <ExerciseLayout title="Sonido de la Letra">
      <div className="flex flex-col gap-8 items-center w-full">
        {/* Grid de letras */}
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-4 w-full max-w-3xl">
          {spanishAlphabet.map((l) => (
            <button
              key={l.id}
              className={`flex flex-col items-center justify-center rounded-xl border-2 border-[#809BCE] bg-white/80 shadow-lg hover:bg-[#EAC4D5]/40 transition-all duration-200 p-4 cursor-pointer ${
                selectedLetter?.id === l.id ? 'ring-4 ring-[#B8E0D2]' : ''
              }`}
              onClick={async () => {
                setSelectedLetter(l);
                await playLetterSound(l.letter);
              }}
              aria-label={`Letra ${l.letter}`}
            >
              <span className="text-3xl font-extrabold text-[#809BCE] drop-shadow">{l.letter}</span>
              <span className="text-xs text-[#232526] mt-1">{l.example}</span>
            </button>
          ))}
        </div>

        {/* Vista individual */}
        <div className="w-full max-w-md">
          {selectedLetter ? (
            <div className="flex flex-col items-center bg-white/90 rounded-2xl shadow-xl p-6 mt-4">
              <span className="text-6xl font-extrabold text-[#EAC4D5] mb-2">{selectedLetter.letter}</span>
              <span className="text-lg text-[#809BCE] mb-2">Ejemplo: <b>{selectedLetter.example}</b></span>
              <button
                className={`mt-2 px-6 py-2 rounded-full font-bold text-white bg-gradient-to-r from-[#809BCE] to-[#EAC4D5] shadow-lg hover:scale-105 transition-all duration-200 ${
                  playing ? 'opacity-60 cursor-not-allowed' : ''
                }`}
                onClick={() => playLetterSound(selectedLetter.letter)}
                disabled={playing}
              >
                {playing ? 'Reproduciendo...' : 'Escuchar sonido'}
              </button>
            </div>
          ) : (
            <div className="text-center text-[#809BCE] font-semibold mt-4">
              Selecciona una letra para escuchar su sonido.
            </div>
          )}
        </div>

        {/* Historial de práctica */}
        {history.length > 0 && (
          <div className="w-full max-w-md bg-[#232526]/80 rounded-xl shadow-lg p-4 mt-4">
            <h4 className="text-[#B8E0D2] font-bold mb-2">Letras practicadas</h4>
            <div className="flex flex-wrap gap-2">
              {history
                .sort((a, b) => b.count - a.count)
                .map((item) => (
                  <span
                    key={item.letter}
                    className="px-3 py-1 rounded-full bg-[#B8E0D2]/70 text-[#232526] font-semibold text-sm"
                  >
                    {item.letter} <span className="ml-1 text-xs text-[#809BCE]">({item.count})</span>
                  </span>
                ))}
            </div>
          </div>
        )}
      </div>
    </ExerciseLayout>
  );
}
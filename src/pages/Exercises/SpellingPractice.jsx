import { useState } from 'react';
import ExerciseLayout from '../../components/ExerciseLayout';

export default function SpellingPractice() {
  const [activeExercise, setActiveExercise] = useState(null);
  const [history, setHistory] = useState([]);

  const exercises = [
    {
      id: 1,
      title: "Ejercicio 1: Completa con R o RR",
      wordGroups: [
        {
          words: ["ANA", "A__OGANTE", "A__DÍA", "Á__ABE"],
          solutions: ["ANA", "ARROGANTE", "ARDÍA", "ÁRABE"]
        },
        {
          words: ["A__ANCAR", "__ISAR", "__UANTE", "__ONDA", "__ERRA"],
          solutions: ["ARRANCAR", "RISAR", "RUANTE", "RONDA", "GUERRA"]
        }
      ]
    },
    {
      id: 2,
      title: "Ejercicio 2: Completa con G o GU",
      wordGroups: [
        {
          words: ["__ATO", "__ITARRA", "__ERRA", "__ÍA"],
          solutions: ["GATO", "GUITARRA", "GUERRA", "GUÍA"]
        }
      ]
    },
    {
      id: 3,
      title: "Ejercicio 3: Completa con B o V",
      wordGroups: [
        {
          words: ["__ARCO", "__ANCO", "__UENO", "__OTAR"],
          solutions: ["BARCO", "BANCO", "BUENO", "VOTAR"]
        }
      ]
    }
  ];

  const handleSelectExercise = (exercise) => {
    setActiveExercise(exercise);
    
    // Actualizar historial
    setHistory((prev) => {
      const idx = prev.findIndex((item) => item.id === exercise.id);
      if (idx >= 0) {
        const newHistory = [...prev];
        newHistory[idx].count += 1;
        return newHistory;
      } else {
        return [...prev, { id: exercise.id, title: exercise.title, count: 1 }];
      }
    });
  };

  return (
    <ExerciseLayout title="Práctica de Ortografía">
      <div className="flex flex-col gap-8 items-center w-full">
        {/* Descripción */}
        <p className="text-center text-lg text-[#809BCE] font-medium">
          Ejercicios para mejorar la ortografía arbitraria
        </p>
        
        {/* Grid de ejercicios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-3xl">
          {exercises.map((exercise) => (
            <button
              key={exercise.id}
              className={`flex flex-col items-center justify-center rounded-xl border-2 border-[#809BCE] bg-white/80 shadow-lg hover:bg-[#EAC4D5]/40 transition-all duration-200 p-4 cursor-pointer ${
                activeExercise?.id === exercise.id ? 'ring-4 ring-[#B8E0D2]' : ''
              }`}
              onClick={() => handleSelectExercise(exercise)}
              aria-label={exercise.title}
            >
              <span className="text-xl font-bold text-[#809BCE] drop-shadow text-center">{exercise.title}</span>
            </button>
          ))}
        </div>

        {/* Vista individual del ejercicio */}
        <div className="w-full max-w-2xl">
          {activeExercise ? (
            <div className="flex flex-col items-center bg-white/90 rounded-2xl shadow-xl p-6 mt-4">
              <h3 className="text-2xl font-bold text-[#EAC4D5] mb-4">{activeExercise.title}</h3>
              
              {activeExercise.wordGroups.map((group, idx) => (
                <div key={idx} className="w-full mb-6 last:mb-0">
                  <div className="bg-[#809BCE]/10 rounded-lg p-4 mb-2">
                    <p className="text-lg font-medium text-[#232526]">
                      {group.words.join(" / ")}
                    </p>
                  </div>
                  <div className="bg-[#B8E0D2]/20 rounded-lg p-4">
                    <p className="text-lg font-medium text-[#809BCE]">
                      Solución: {group.solutions.join(" / ")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-[#809BCE] font-semibold mt-4">
              Selecciona un ejercicio para practicar.
            </div>
          )}
        </div>

        {/* Historial de práctica */}
        {history.length > 0 && (
          <div className="w-full max-w-md bg-[#232526]/80 rounded-xl shadow-lg p-4 mt-4">
            <h4 className="text-[#B8E0D2] font-bold mb-2">Ejercicios practicados</h4>
            <div className="flex flex-wrap gap-2">
              {history
                .sort((a, b) => b.count - a.count)
                .map((item) => (
                  <span
                    key={item.id}
                    className="px-3 py-1 rounded-full bg-[#B8E0D2]/70 text-[#232526] font-semibold text-sm"
                  >
                    Ejercicio {item.id} <span className="ml-1 text-xs text-[#809BCE]">({item.count})</span>
                  </span>
                ))}
            </div>
          </div>
        )}
      </div>
    </ExerciseLayout>
  );
}
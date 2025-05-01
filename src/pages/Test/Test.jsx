import { useState } from "react";
import { Link } from "react-router-dom";

const preguntas = [
  {
    texto: "¿Tiene dificultad para leer palabras nuevas?",
    opciones: [
      { texto: "Nunca", valor: 0 },
      { texto: "A veces", valor: 1 },
      { texto: "Frecuentemente", valor: 2 },
      { texto: "Siempre", valor: 3 },
    ],
  },
  {
    texto: "¿Confunde letras similares como b/d o p/q?",
    opciones: [
      { texto: "Nunca", valor: 0 },
      { texto: "A veces", valor: 1 },
      { texto: "Frecuentemente", valor: 2 },
      { texto: "Siempre", valor: 3 },
    ],
  },
  {
    texto: "¿Tiene problemas para deletrear palabras?",
    opciones: [
      { texto: "Nunca", valor: 0 },
      { texto: "A veces", valor: 1 },
      { texto: "Frecuentemente", valor: 2 },
      { texto: "Siempre", valor: 3 },
    ],
  },
  {
    texto: "¿Evita actividades que implican leer o escribir?",
    opciones: [
      { texto: "Nunca", valor: 0 },
      { texto: "A veces", valor: 1 },
      { texto: "Frecuentemente", valor: 2 },
      { texto: "Siempre", valor: 3 },
    ],
  },
  {
    texto: "¿Tiene dificultad para comprender instrucciones escritas?",
    opciones: [
      { texto: "Nunca", valor: 0 },
      { texto: "A veces", valor: 1 },
      { texto: "Frecuentemente", valor: 2 },
      { texto: "Siempre", valor: 3 },
    ],
  },
];

function obtenerResultado(puntaje) {
  if (puntaje <= 3) {
    return {
      texto: "Bajo riesgo de dislexia. Si tienes dudas, consulta con un especialista.",
      color: "text-green-600",
    };
  } else if (puntaje <= 7) {
    return {
      texto: "Riesgo moderado de dislexia. Se recomienda observación y apoyo.",
      color: "text-yellow-600",
    };
  } else {
    return {
      texto: "Alto riesgo de dislexia. Consulta con un profesional para una evaluación completa.",
      color: "text-red-600",
    };
  }
}

export default function Test() {
  const [respuestas, setRespuestas] = useState(Array(preguntas.length).fill(null));
  const [enviado, setEnviado] = useState(false);

  const puntaje = respuestas.reduce((acc, val) => acc + (val !== null ? val : 0), 0);
  const resultado = obtenerResultado(puntaje);

  const handleOpcion = (preguntaIdx, valor) => {
    const nuevas = [...respuestas];
    nuevas[preguntaIdx] = valor;
    setRespuestas(nuevas);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
  };

  return (
    <div className="min-h-screen bg-[#F3F7FA] flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-[#809BCE]">Test de Detección de Dislexia</h1>
        {!enviado ? (
          <form onSubmit={handleSubmit}>
            {preguntas.map((pregunta, idx) => (
              <div key={idx} className="mb-6">
                <p className="font-semibold mb-2">{idx + 1}. {pregunta.texto}</p>
                <div className="flex flex-wrap gap-2">
                  {pregunta.opciones.map((opcion, oidx) => (
                    <label key={oidx} className={`px-3 py-2 rounded-md cursor-pointer border ${respuestas[idx] === opcion.valor ? "bg-[#809BCE] text-white border-[#809BCE]" : "bg-gray-100 border-gray-300"}`}>
                      <input
                        type="radio"
                        name={`pregunta-${idx}`}
                        value={opcion.valor}
                        checked={respuestas[idx] === opcion.valor}
                        onChange={() => handleOpcion(idx, opcion.valor)}
                        className="hidden"
                      />
                      {opcion.texto}
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-[#809BCE] text-white font-semibold py-3 rounded-md hover:bg-[#EAC4D5] transition-colors"
              disabled={respuestas.some(r => r === null)}
            >
              Ver resultado
            </button>
          </form>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Tu puntaje: <span className="text-[#809BCE]">{puntaje}</span> / {preguntas.length * 3}</h2>
            <p className={`text-lg font-semibold mb-6 ${resultado.color}`}>{resultado.texto}</p>
            <Link to="/" className="inline-block bg-[#B8E0D2] text-black px-6 py-2 rounded-md font-semibold hover:bg-[#EAC4D5] transition-colors">
              Volver al inicio
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

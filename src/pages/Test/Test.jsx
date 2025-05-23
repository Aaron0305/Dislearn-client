import { useState } from "react";

const preguntas = [
  {
    texto: "¿Tienes dificultad para leer palabras en voz alta correctamente?",
    opciones: [
      { texto: "Nunca", valor: 0 },
      { texto: "A veces", valor: 1 },
      { texto: "Frecuentemente", valor: 2 },
      { texto: "Siempre", valor: 3 },
    ],
  },
  {
    texto: "¿Confundes letras similares como b/d, p/q, m/w al leer o escribir?",
    opciones: [
      { texto: "Nunca", valor: 0 },
      { texto: "A veces", valor: 1 },
      { texto: "Frecuentemente", valor: 2 },
      { texto: "Siempre", valor: 3 },
    ],
  },
  {
    texto: "¿Te cuesta trabajo seguir la línea al leer y te pierdes en el texto?",
    opciones: [
      { texto: "Nunca", valor: 0 },
      { texto: "A veces", valor: 1 },
      { texto: "Frecuentemente", valor: 2 },
      { texto: "Siempre", valor: 3 },
    ],
  },
  {
    texto: "¿Lees más lentamente que otras personas de tu edad?",
    opciones: [
      { texto: "Nunca", valor: 0 },
      { texto: "A veces", valor: 1 },
      { texto: "Frecuentemente", valor: 2 },
      { texto: "Siempre", valor: 3 },
    ],
  },
  {
    texto: "¿Tienes dificultad para comprender lo que lees, aunque entiendas las palabras individualmente?",
    opciones: [
      { texto: "Nunca", valor: 0 },
      { texto: "A veces", valor: 1 },
      { texto: "Frecuentemente", valor: 2 },
      { texto: "Siempre", valor: 3 },
    ],
  },
  {
    texto: "¿Cometes errores frecuentes de ortografía, incluso en palabras comunes?",
    opciones: [
      { texto: "Nunca", valor: 0 },
      { texto: "A veces", valor: 1 },
      { texto: "Frecuentemente", valor: 2 },
      { texto: "Siempre", valor: 3 },
    ],
  },
  {
    texto: "¿Tienes dificultad para escribir a mano de forma legible?",
    opciones: [
      { texto: "Nunca", valor: 0 },
      { texto: "A veces", valor: 1 },
      { texto: "Frecuentemente", valor: 2 },
      { texto: "Siempre", valor: 3 },
    ],
  },
  {
    texto: "¿Olvidas instrucciones que acabas de escuchar?",
    opciones: [
      { texto: "Nunca", valor: 0 },
      { texto: "A veces", valor: 1 },
      { texto: "Frecuentemente", valor: 2 },
      { texto: "Siempre", valor: 3 },
    ],
  },
  {
    texto: "¿Tienes dificultad para recordar secuencias como los días de la semana o el alfabeto?",
    opciones: [
      { texto: "Nunca", valor: 0 },
      { texto: "A veces", valor: 1 },
      { texto: "Frecuentemente", valor: 2 },
      { texto: "Siempre", valor: 3 },
    ],
  },
  {
    texto: "¿Te cuesta trabajo recordar nombres de personas o lugares?",
    opciones: [
      { texto: "Nunca", valor: 0 },
      { texto: "A veces", valor: 1 },
      { texto: "Frecuentemente", valor: 2 },
      { texto: "Siempre", valor: 3 },
    ],
  },
  {
    texto: "¿Tienes dificultad para encontrar la palabra correcta cuando hablas?",
    opciones: [
      { texto: "Nunca", valor: 0 },
      { texto: "A veces", valor: 1 },
      { texto: "Frecuentemente", valor: 2 },
      { texto: "Siempre", valor: 3 },
    ],
  },
  {
    texto: "¿Tienes problemas para organizar tus pensamientos al hablar o escribir?",
    opciones: [
      { texto: "Nunca", valor: 0 },
      { texto: "A veces", valor: 1 },
      { texto: "Frecuentemente", valor: 2 },
      { texto: "Siempre", valor: 3 },
    ],
  },
  {
    texto: "¿Te cuesta trabajo calcular el tiempo que necesitas para completar tareas?",
    opciones: [
      { texto: "Nunca", valor: 0 },
      { texto: "A veces", valor: 1 },
      { texto: "Frecuentemente", valor: 2 },
      { texto: "Siempre", valor: 3 },
    ],
  },
  {
    texto: "¿Tienes dificultad para seguir instrucciones de múltiples pasos?",
    opciones: [
      { texto: "Nunca", valor: 0 },
      { texto: "A veces", valor: 1 },
      { texto: "Frecuentemente", valor: 2 },
      { texto: "Siempre", valor: 3 },
    ],
  },
  {
    texto: "¿Confundes direcciones como izquierda/derecha o arriba/abajo?",
    opciones: [
      { texto: "Nunca", valor: 0 },
      { texto: "A veces", valor: 1 },
      { texto: "Frecuentemente", valor: 2 },
      { texto: "Siempre", valor: 3 },
    ],
  },
  {
    texto: "¿Tienes dificultad para aprender las tablas de multiplicar?",
    opciones: [
      { texto: "Nunca", valor: 0 },
      { texto: "A veces", valor: 1 },
      { texto: "Frecuentemente", valor: 2 },
      { texto: "Siempre", valor: 3 },
    ],
  },
  {
    texto: "¿Confundes números similares como 6/9 o 17/71?",
    opciones: [
      { texto: "Nunca", valor: 0 },
      { texto: "A veces", valor: 1 },
      { texto: "Frecuentemente", valor: 2 },
      { texto: "Siempre", valor: 3 },
    ],
  },
  {
    texto: "¿Te cuesta trabajo hacer cálculos mentales simples?",
    opciones: [
      { texto: "Nunca", valor: 0 },
      { texto: "A veces", valor: 1 },
      { texto: "Frecuentemente", valor: 2 },
      { texto: "Siempre", valor: 3 },
    ],
  },
  {
    texto: "¿Evitas leer en voz alta frente a otros porque te sientes inseguro/a?",
    opciones: [
      { texto: "Nunca", valor: 0 },
      { texto: "A veces", valor: 1 },
      { texto: "Frecuentemente", valor: 2 },
      { texto: "Siempre", valor: 3 },
    ],
  },
  {
    texto: "¿Te sientes frustrado/a o ansioso/a cuando tienes que leer o escribir?",
    opciones: [
      { texto: "Nunca", valor: 0 },
      { texto: "A veces", valor: 1 },
      { texto: "Frecuentemente", valor: 2 },
      { texto: "Siempre", valor: 3 },
    ],
  },
];

function obtenerResultado(puntaje) {
  if (puntaje <= 15) {
    return {
      texto: "Es poco probable que tengas dislexia.",
      color: "text-green-600",
    };
  } else if (puntaje <= 30) {
    return {
      texto: "Podrías tener algunas características de dislexia leve.",
      color: "text-yellow-600",
    };
  } else if (puntaje <= 45) {
    return {
      texto: "Es posible que tengas dislexia moderada. ",
      color: "text-orange-600",
    };
  } else {
    return {
      texto: "Es probable que tengas dislexia significativa.",
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

  const handleSubmit = () => {
    setEnviado(true);
  };

  const reiniciarTest = () => {
    setRespuestas(Array(preguntas.length).fill(null));
    setEnviado(false);
  };

  return (
    <div className="min-h-screen bg-[#F3F7FA] flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-[#809BCE] text-center">Test de Detección de Dislexia</h1>
        
        {!enviado ? (
          <div>
            {preguntas.map((pregunta, idx) => (
              <div key={idx} className="mb-6 p-4 border border-gray-200 rounded-lg">
                <p className="font-semibold mb-3 text-gray-800">{idx + 1}. {pregunta.texto}</p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {pregunta.opciones.map((opcion, oidx) => (
                    <label key={oidx} className={`px-3 py-2 rounded-md cursor-pointer border text-center transition-colors ${respuestas[idx] === opcion.valor ? "bg-[#809BCE] text-white border-[#809BCE]" : "bg-gray-100 border-gray-300 hover:bg-gray-200"}`}>
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
              onClick={handleSubmit}
              className="w-full bg-[#809BCE] text-white font-semibold py-3 rounded-md hover:bg-[#6B82A8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={respuestas.some(r => r === null)}
            >
              {respuestas.some(r => r === null) ? `Faltan ${respuestas.filter(r => r === null).length} respuestas` : 'Ver resultado'}
            </button>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Tu puntaje: <span className="text-[#809BCE]">{puntaje}</span> / {preguntas.length * 3}</h2>
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <p className={`text-lg font-semibold mb-4 ${resultado.color}`}>{resultado.texto}</p>
              <div className="text-center bg-blue-50 p-4 rounded-md border border-blue-200">
                <p className="text-blue-800 font-medium mb-2">¿Quieres mejorar tus habilidades de lectura, escritura o reducir tu nivel de dislexia?</p>
                <p className="text-blue-600 text-sm mb-3">Inicia sesión para acceder a ejercicios personalizados que te ayudarán a desarrollar tus capacidades.</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Iniciar Sesión
                </button>
              </div>
            </div>
            <div className="flex gap-4 justify-center">
              <button 
                onClick={reiniciarTest}
                className="bg-[#B8E0D2] text-black px-6 py-2 rounded-md font-semibold hover:bg-[#A0D4C4] transition-colors"
              >
                Repetir test
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
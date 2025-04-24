export const soundExercises = [
    {
      id: 1,
      audio: '/assets/sounds/initial-m.mp3',
      question: "¿Qué palabra empieza con este sonido?",
      options: [
        { text: "Mano", image: "/assets/images/hand.png", isCorrect: true },
        { text: "Pato", image: "/assets/images/duck.png", isCorrect: false },
        { text: "Silla", image: "/assets/images/chair.png", isCorrect: false },
        { text: "Luna", image: "/assets/images/moon.png", isCorrect: false }
      ]
    },
    {
      id: 2,
      audio: '/assets/sounds/initial-p.mp3',
      question: "¿Qué palabra empieza con este sonido?",
      options: [
        { text: "Pato", image: "/assets/images/duck.png", isCorrect: true },
        { text: "Gato", image: "/assets/images/cat.png", isCorrect: false },
        { text: "Mesa", image: "/assets/images/table.png", isCorrect: false },
        { text: "Rosa", image: "/assets/images/rose.png", isCorrect: false }
      ]
    }
  ]
  
  export const wordExercises = [
    {
      id: 1,
      sentence: "El gato juega en el jardín",
      words: ["El", "gato", "juega", "en", "el", "jardín"]
    },
    {
      id: 2,
      sentence: "Mi mamá hace comida rica",
      words: ["Mi", "mamá", "hace", "comida", "rica"]
    }
  ]
  
  export const readingExercises = [
    {
      id: 1,
      title: "El perro y el hueso",
      content: "Había una vez un perro que encontró un hueso grande. Lo llevó en su boca cruzando un puente. Al verse en el agua, pensó que era otro perro con un hueso más grande. Quiso tomar ese hueso y al abrir la boca, perdió el suyo.",
      questions: [
        {
          question: "¿Qué encontró el perro?",
          options: ["Un juguete", "Un hueso", "Un pan", "Una piedra"],
          correctAnswer: 1
        },
        {
          question: "¿Dónde vio al otro perro?",
          options: ["En un espejo", "En el agua", "En la casa", "En el parque"],
          correctAnswer: 1
        }
      ]
    }
  ]
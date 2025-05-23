import { Link } from 'react-router-dom';
import React from 'react';

export default function Exercises() {
  // Exercise card component
  const ExerciseCard = ({ title, description, path, bgColor, shadowColor1, shadowColor2, textColor, descColor }) => (
    <Link 
      to={path}
      className="block rounded-2xl p-6 transition-all duration-300 cursor-pointer no-underline" 
      style={{ 
        backgroundColor: bgColor,
        boxShadow: `8px 8px 16px ${shadowColor1}, -8px -8px 16px ${shadowColor2}`
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.boxShadow = `inset 8px 8px 16px ${shadowColor1}, inset -8px -8px 16px ${shadowColor2}`;
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.boxShadow = `8px 8px 16px ${shadowColor1}, -8px -8px 16px ${shadowColor2}`;
      }}
    >
      <div className="p-4">
        <h3 className="text-xl font-bold mb-3" style={{ color: textColor }}>{title}</h3>
        <p style={{ color: descColor }}>{description}</p>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen p-8" style={{ 
      backgroundColor: '#e9c8ff',
      backgroundImage: 'linear-gradient(135deg, #e9c8ff 0%, #9d8cee 100%)'
    }}>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12" style={{ color: '#000012' }}>Ejercicios para Dislexia</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <ExerciseCard 
            title="Sonido de la Letra"
            description="Aprende la pronunciación de cada letra del abecedario"
            path="/exercises/letter-sounds"
            bgColor="#9d8cee"
            shadowColor1="#8475ca"
            shadowColor2="#b6a3ff"
            textColor="#000012"
            descColor="#2a2a4e"
          />
          
          <ExerciseCard 
            title="Lectura Guiada"
            description="Textos con tipografía especial y apoyo visual"
            path="/exercises/guided-reading"
            bgColor="#5d5798"
            shadowColor1="#4e4a81"
            shadowColor2="#6c64af"
            textColor="#ffffff"
            descColor="#e9e9e9"
          />
          
          <ExerciseCard 
            title="Ordenar Palabras"
            description="Forma oraciones con palabras desordenadas"
            path="/exercises/word-order"
            bgColor="#2a2a4e"
            shadowColor1="#232342"
            shadowColor2="#31315a"
            textColor="#ffffff"
            descColor="#e9e9e9"
          />
          
          <ExerciseCard 
            title="Práctica de Ortografía"
            description="Ejercicios para mejorar la ortografía arbitraria"
            path="/exercises/spelling-practice"
            bgColor="#e9c8ff"
            shadowColor1="#c6aadb"
            shadowColor2="#ffe6ff"
            textColor="#2a2a4e"
            descColor="#5d5798"
          />
          
          <ExerciseCard 
            title="Completar Palabras"
            description="Completa palabras eligiendo la letra correcta"
            path="/exercises/complete-words"
            bgColor="#b6a3ff" 
            shadowColor1="#9a8bd8"
            shadowColor2="#d2bbff"
            textColor="#2a2a4e"
            descColor="#5d5798"
          />
        </div>
      </div>
    </div>
  );
}
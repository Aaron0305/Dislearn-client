import { Link } from 'react-router-dom';
import './Exercises.css';

export default function Exercises() {
  return (
    <div className="exercises">
      <h1>Ejercicios para Dislexia</h1>
      <div className="exercise-list">
        <Link to="/exercises/letter-sounds" className="exercise-card">
          <h3>Sonido de la Letra</h3>
          <p>Aprende la pronunciación de cada letra del abecedario</p>
        </Link>
        <Link to="/exercises/guided-reading" className="exercise-card">
          <h3>Lectura Guiada</h3>
          <p>Textos con tipografía especial y apoyo visual</p>
        </Link>
        <Link to="/exercises/word-order" className="exercise-card">
          <h3>Ordenar Palabras</h3>
          <p>Forma oraciones con palabras desordenadas</p>
        </Link>
        <Link to="/exercises/spelling-practice" className="exercise-card">
          <h3>Práctica de Ortografía</h3>
          <p>Ejercicios para mejorar la ortografía arbitraria</p>
        </Link>
        <Link to="/exercises/complete-words" className="exercise-card">
          <h3>Completar Palabras</h3>
          <p>Completa palabras eligiendo la letra correcta</p>
        </Link>
      </div>
    </div>
  );
}
import { Link } from 'react-router-dom';
import './Exercises.css';

export default function Exercises() {
  return (
    <div className="exercises">
      <h1>Ejercicios para Dislexia</h1>
      <div className="exercise-list">
        <Link to="/exercises/sound-matching" className="exercise-card">
          <h3>Emparejamiento de Sonidos</h3>
          <p>Relaciona imágenes con sus sonidos iniciales</p>
        </Link>
        <Link to="/exercises/guided-reading" className="exercise-card">
          <h3>Lectura Guiada</h3>
          <p>Textos con tipografía especial y apoyo visual</p>
        </Link>
        <Link to="/exercises/word-order" className="exercise-card">
          <h3>Ordenar Palabras</h3>
          <p>Forma oraciones con palabras desordenadas</p>
        </Link>
      </div>
    </div>
  );
}
import { Link } from 'react-router-dom';
import './ExerciseLayout.css';

export default function ExerciseLayout({ title, children }) {
  return (
    <div className="exercise-layout">
      <div className="exercise-header">
        <Link to="/exercises" className="back-button">
          ← Volver a Ejercicios
        </Link>
        <h2>{title}</h2>
      </div>
      <div className="exercise-content">
        {children}
      </div>
    </div>
  );
}
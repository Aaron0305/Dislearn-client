import React from 'react';
import './SpellingPractice.css';

export default function SpellingPractice() {
  return (
    <div className="spelling-practice">
      <h2>Práctica de Ortografía</h2>
      <p className="description">Ejercicios para mejorar la ortografía arbitraria</p>
      
      <div className="exercise">
        <h3>Ejercicio 1: Completa con R o RR</h3>
        <div className="word-group">
          <p>ANA / A__OGANTE / A__DÍA / Á__ABE</p>
          <p>Solución: ANA / ARROGANTE / ARDÍA / ÁRRABE</p>
        </div>
        
        <div className="word-group">
          <p>A__ARRAR / __ISAR / __UANTE / __ORILA / __ERRA</p>
          <p>Solución: ARRANCAR / RISAR / RUANTE / RORILA / RERRA</p>
        </div>
      </div>
      
      <div className="exercise">
        <h3>Ejercicio 2: Completa con G o GU</h3>
        <div className="word-group">
          <p>__ATO / __ITARRA / __ARRA / __ÍA</p>
          <p>Solución: GATO / GUITARRA / GUARRA / GÍA</p>
        </div>
      </div>
    </div>
  );
}
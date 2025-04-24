import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import ProgressChart from '../components/ProgressChart'
import './ProgressPage.css'

export default function Progress() {
  const { user } = useContext(UserContext)
  const [progressData, setProgressData] = useState({
    reading: [],
    writing: [],
    comprehension: []
  })

  useEffect(() => {
    // Simular datos de progreso (en una app real vendría de una API)
    const fetchProgressData = () => {
      const mockData = {
        reading: Array(7).fill(0).map((_, i) => ({
          date: new Date(Date.now() - (6 - i) * 86400000).toLocaleDateString(),
          score: Math.min(100, 30 + Math.floor(Math.random() * 80))
        })),
        writing: Array(7).fill(0).map((_, i) => ({
          date: new Date(Date.now() - (6 - i) * 86400000).toLocaleDateString(),
          score: Math.min(100, 20 + Math.floor(Math.random() * 90))
        })),
        comprehension: Array(7).fill(0).map((_, i) => ({
          date: new Date(Date.now() - (6 - i) * 86400000).toLocaleDateString(),
          score: Math.min(100, 40 + Math.floor(Math.random() * 70))
        }))
      }
      setProgressData(mockData)
    }
    
    fetchProgressData()
  }, [])

  return (
    <div className="progress-page">
      <h1>Progreso de {user?.name || 'Usuario'}</h1>
      
      <div className="stats-summary">
        <div className="stat-card">
          <h3>Ejercicios Completados</h3>
          <p className="stat-value">{user?.completedExercises || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Días Consecutivos</h3>
          <p className="stat-value">{user?.streak || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Mejoría General</h3>
          <p className="stat-value">+{user?.improvement || 0}%</p>
        </div>
      </div>
      
      <div className="progress-charts">
        <div className="chart-container">
          <h3>Progreso en Lectura</h3>
          <ProgressChart data={progressData.reading} color="#4a6fa5" />
        </div>
        <div className="chart-container">
          <h3>Progreso en Escritura</h3>
          <ProgressChart data={progressData.writing} color="#ff9e1b" />
        </div>
        <div className="chart-container">
          <h3>Progreso en Comprensión</h3>
          <ProgressChart data={progressData.comprehension} color="#6bbf59" />
        </div>
      </div>
      
      <div className="badges-section">
        <h3>Logros Obtenidos</h3>
        <div className="badges-grid">
          {user?.badges?.map((badge, index) => (
            <div key={index} className="badge">
              <img src={`/assets/badges/${badge}.png`} alt={badge} />
              <p>{badge.replace('-', ' ')}</p>
            </div>
          )) || <p>No hay logros todavía. ¡Sigue practicando!</p>}
        </div>
      </div>
    </div>
  )
}
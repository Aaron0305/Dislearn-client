import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import ProgressChart from './ProgressChart'
import './Progress.css'

export default function Progress() {
  const { user } = useContext(UserContext)

  // Datos de progreso (en una app real vendrían de una API)
  const progressData = {
    reading: [
      { date: '2023-05-01', score: 30 },
      { date: '2023-05-08', score: 45 },
      { date: '2023-05-15', score: 60 },
      { date: '2023-05-22', score: 75 },
      { date: '2023-05-29', score: 80 }
    ],
    writing: [
      { date: '2023-05-01', score: 20 },
      { date: '2023-05-08', score: 35 },
      { date: '2023-05-15', score: 50 },
      { date: '2023-05-22', score: 65 },
      { date: '2023-05-29', score: 70 }
    ],
    comprehension: [
      { date: '2023-05-01', score: 40 },
      { date: '2023-05-08', score: 55 },
      { date: '2023-05-15', score: 65 },
      { date: '2023-05-22', score: 75 },
      { date: '2023-05-29', score: 85 }
    ]
  }

  // Calcular estadísticas
  const stats = {
    completedExercises: user?.completedExercises || 0,
    improvement: calculateImprovement(progressData),
    streak: user?.streak || 0
  }

  return (
    <div className="progress-page">
      <h1>Progreso de {user?.name || 'Usuario'}</h1>
      
      <div className="stats-summary">
        <StatCard 
          title="Ejercicios Completados" 
          value={stats.completedExercises}
          icon="✅"
        />
        <StatCard 
          title="Días Consecutivos" 
          value={stats.streak}
          icon="🔥"
        />
        <StatCard 
          title="Mejoría General" 
          value={`+${stats.improvement}%`}
          icon="📈"
        />
      </div>
      
      <div className="progress-charts">
        <ProgressSection 
          title="Lectura" 
          data={progressData.reading} 
          color="#4a6fa5"
        />
        <ProgressSection 
          title="Escritura" 
          data={progressData.writing} 
          color="#ff9e1b"
        />
        <ProgressSection 
          title="Comprensión" 
          data={progressData.comprehension} 
          color="#6bbf59"
        />
      </div>
      
      <RecentActivities />
    </div>
  )
}

// Componentes auxiliares
function StatCard({ title, value, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <h3>{title}</h3>
      <p className="stat-value">{value}</p>
    </div>
  )
}

function ProgressSection({ title, data, color }) {
  return (
    <div className="progress-section">
      <h2>{title}</h2>
      <ProgressChart data={data} color={color} />
    </div>
  )
}

function RecentActivities() {
  const activities = [
    { id: 1, name: 'Emparejamiento de Sonidos', date: '2023-05-28', score: 80 },
    { id: 2, name: 'Ordenar Palabras', date: '2023-05-27', score: 65 },
    { id: 3, name: 'Lectura Guiada', date: '2023-05-25', score: 90 }
  ]

  return (
    <div className="recent-activities">
      <h2>Actividades Recientes</h2>
      <ul>
        {activities.map(activity => (
          <li key={activity.id}>
            <span className="activity-name">{activity.name}</span>
            <span className="activity-date">{formatDate(activity.date)}</span>
            <span className={`activity-score ${getScoreClass(activity.score)}`}>
              {activity.score}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Funciones utilitarias
function calculateImprovement(data) {
  // Lógica para calcular la mejoría general
  return 35 // Valor de ejemplo
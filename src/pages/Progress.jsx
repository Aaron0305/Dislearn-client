import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import ProgressChart from '../components/ProgressChart'

export default function Progress() {
  const { user } = useContext(UserContext)
  const [progressData, setProgressData] = useState({
    reading: [],
    writing: [],
    comprehension: []
  })
  const [selectedExercise, setSelectedExercise] = useState('reading')
  const [showStats, setShowStats] = useState(null)

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

  const handleTabClick = (statType) => {
    setShowStats(statType)
  }

  const handleExerciseSelect = (exercise) => {
    setSelectedExercise(exercise)
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-green-800 mb-8">
        Progreso de {user?.name || 'Usuario'}
      </h1>
      
      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div 
          className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-700 cursor-pointer"
          onClick={() => handleTabClick('exercises')}
        >
          <h3 className="text-lg font-medium text-gray-700 mb-2">Ejercicios Completados</h3>
          <p className="text-4xl font-bold text-green-700">{user?.completedExercises || 0}</p>
        </div>
        <div 
          className="bg-white rounded-lg shadow-md p-6 border-l-4 border-lime-500 cursor-pointer"
          onClick={() => handleTabClick('streak')}
        >
          <h3 className="text-lg font-medium text-gray-700 mb-2">Días Consecutivos</h3>
          <p className="text-4xl font-bold text-lime-500">{user?.streak || 0}</p>
        </div>
        <div 
          className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-400 cursor-pointer"
          onClick={() => handleTabClick('improvement')}
        >
          <h3 className="text-lg font-medium text-gray-700 mb-2">Proceso General</h3>
          <p className="text-4xl font-bold text-yellow-400">+{user?.improvement || 0}%</p>
        </div>
      </div>
      
      {/* Dynamic Stats View */}
      {showStats === 'exercises' && (
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-green-800 mb-4">Estadísticas por Ejercicio</h3>
          <div className="mb-4">
            <label htmlFor="exercise" className="mr-2 text-lg font-medium text-gray-700">Selecciona un Ejercicio</label>
            <select
              id="exercise"
              value={selectedExercise}
              onChange={(e) => handleExerciseSelect(e.target.value)}
              className="p-2 border rounded-md"
            >
              <option value="reading">Lectura</option>
              <option value="writing">Escritura</option>
              <option value="comprehension">Comprensión</option>
            </select>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-green-800 mb-4">Progreso en {selectedExercise.charAt(0).toUpperCase() + selectedExercise.slice(1)}</h3>
            <ProgressChart data={progressData[selectedExercise]} colorName={selectedExercise === 'reading' ? 'teal' : selectedExercise === 'writing' ? 'yellow' : 'lime'} />
          </div>
        </div>
      )}
      {showStats === 'streak' && <div className="text-center">Estadísticas de Días Consecutivos</div>}
      {showStats === 'improvement' && <div className="text-center">Estadísticas de Mejoría General</div>}
    </div>
  )
}

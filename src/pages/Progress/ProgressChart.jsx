import { useEffect, useRef } from 'react'
import './ProgressChart.css'

export default function ProgressChart({ data, color }) {
  const canvasRef = useRef(null)
  
  useEffect(() => {
    if (!data || data.length === 0) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height
    const margin = 30
    const maxValue = Math.max(...data.map(item => item.score), 100)
    
    // Limpiar canvas
    ctx.clearRect(0, 0, width, height)
    
    // Dibujar eje Y
    ctx.beginPath()
    ctx.moveTo(margin, margin)
    ctx.lineTo(margin, height - margin)
    ctx.strokeStyle = '#bdc3c7'
    ctx.lineWidth = 2
    ctx.stroke()
    
    // Dibujar eje X
    ctx.beginPath()
    ctx.moveTo(margin, height - margin)
    ctx.lineTo(width - margin, height - margin)
    ctx.stroke()
    
    // Dibujar líneas horizontales
    ctx.strokeStyle = '#ecf0f1'
    ctx.lineWidth = 1
    const steps = 5
    for (let i = 0; i <= steps; i++) {
      const y = height - margin - (i * (height - 2 * margin) / steps)
      ctx.beginPath()
      ctx.moveTo(margin, y)
      ctx.lineTo(width - margin, y)
      ctx.stroke()
      
      // Etiquetas del eje Y
      ctx.fillStyle = '#7f8c8d'
      ctx.font = '12px Arial'
      ctx.textAlign = 'right'
      ctx.fillText(Math.round((i / steps) * maxValue), margin - 10, y + 4)
    }
    
    // Dibujar línea de datos
    ctx.strokeStyle = color
    ctx.lineWidth = 3
    ctx.beginPath()
    
    const xStep = (width - 2 * margin) / (data.length - 1)
    data.forEach((item, index) => {
      const x = margin + index * xStep
      const y = height - margin - (item.score / maxValue) * (height - 2 * margin)
      
      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
      
      // Puntos de datos
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc(x, y, 5, 0, Math.PI * 2)
      ctx.fill()
      
      // Etiquetas del eje X
      ctx.fillStyle = '#7f8c8d'
      ctx.font = '10px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(item.date.substring(5), x, height - margin + 15)
    })
    
    ctx.stroke()
    
  }, [data, color])
  
  return (
    <div className="chart-container">
      <canvas 
        ref={canvasRef} 
        width={600} 
        height={300}
        aria-label="Gráfico de progreso"
        role="img"
      />
    </div>
  )
}
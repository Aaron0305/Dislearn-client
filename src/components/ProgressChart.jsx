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
    const margin = 20
    const maxValue = Math.max(...data.map(item => item.score), 100)
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height)
    
    // Draw grid
    ctx.strokeStyle = '#e0e0e0'
    ctx.lineWidth = 1
    
    // Horizontal grid lines
    const gridLines = 5
    for (let i = 0; i <= gridLines; i++) {
      const y = margin + (height - 2 * margin) * (1 - i / gridLines)
      ctx.beginPath()
      ctx.moveTo(margin, y)
      ctx.lineTo(width - margin, y)
      ctx.stroke()
      
      // Y-axis labels
      ctx.fillStyle = '#666'
      ctx.font = '12px Arial'
      ctx.fillText(Math.round((i / gridLines) * maxValue), 5, y + 4)
    }
    
    // Draw data line
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
      
      // Draw data points
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc(x, y, 5, 0, Math.PI * 2)
      ctx.fill()
      
      // X-axis labels (dates)
      ctx.fillStyle = '#666'
      ctx.font = '10px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(item.date.split('/')[0], x, height - margin + 15)
    })
    
    ctx.stroke()
    
  }, [data, color])
  
  return (
    <div className="progress-chart">
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
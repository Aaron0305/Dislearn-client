import { useState } from 'react';

const ProgressChart = ({ data, color }) => {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  
  if (!data || data.length === 0) {
    return <div className="empty-chart">No hay datos disponibles</div>;
  }

  const maxScore = 100; // Asumimos puntuación máxima de 100
  const chartHeight = 200;
  const chartWidth = '100%';

  return (
    <div className="chart" style={{ height: `${chartHeight}px`, width: chartWidth }}>
      <div className="chart-points">
        {data.map((point, index) => {
          const heightPercentage = (point.score / maxScore) * 100;
          
          return (
            <div 
              key={index} 
              className="chart-column"
              onMouseEnter={() => setHoveredPoint(index)}
              onMouseLeave={() => setHoveredPoint(null)}
            >
              {hoveredPoint === index && (
                <div className="tooltip">
                  {point.date}: {point.score}%
                </div>
              )}
              <div 
                className="chart-bar" 
                style={{ 
                  height: `${heightPercentage}%`, 
                  backgroundColor: color 
                }}
              />
              <div className="chart-label">{point.date.split('/')[0]}</div>
            </div>
          );
        })}
      </div>
      <div className="chart-baseline" />
    </div>
  );
};

export default ProgressChart;
"use client"

import * as React from "react"
import { 
  AreaChart, 
  Area as RechartsArea, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip as RechartsTooltip, 
  XAxis as RechartsXAxis, 
  YAxis as RechartsYAxis 
} from "recharts"

interface ProgressChartProps {
  data: Array<{
    date: string;
    score: number;
  }>;
  colorName: string;
}

// Configuración de colores según el colorName proporcionado
const colorMap = {
  teal: {
    main: "rgb(20, 184, 166)",
    light: "rgba(20, 184, 166, 0.2)",
    gradient: "rgb(20, 184, 166)",
  },
  yellow: {
    main: "rgb(250, 204, 21)",
    light: "rgba(250, 204, 21, 0.2)",
    gradient: "rgb(250, 204, 21)",
  },
  lime: {
    main: "rgb(132, 204, 22)",
    light: "rgba(132, 204, 22, 0.2)",
    gradient: "rgb(132, 204, 22)",
  },
  green: {
    main: "rgb(34, 197, 94)",
    light: "rgba(34, 197, 94, 0.2)",
    gradient: "rgb(34, 197, 94)",
  },
}

// Componente para mostrar la tarjeta de progreso
const ProgressChart: React.FC<ProgressChartProps> = ({ data, colorName = "teal" }) => {
  // Obtenemos los colores basados en el colorName
  const colors = colorMap[colorName as keyof typeof colorMap] || colorMap.teal;
    
  // Formateador para mostrar el porcentaje en el tooltip
  const formatPercent = (value: number) => `${value}%`;
    
  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`color${colorName}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors.gradient} stopOpacity={0.8} />
              <stop offset="95%" stopColor={colors.gradient} stopOpacity={0} />
            </linearGradient>
          </defs>
          <RechartsXAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            tickLine={false}
          />
          <RechartsYAxis
            domain={[0, 100]}
            tick={{ fontSize: 12 }}
            tickFormatter={formatPercent}
            tickLine={false}
          />
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <RechartsTooltip
            formatter={formatPercent}
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderColor: colors.main,
              borderRadius: '0.375rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
            labelStyle={{
              color: '#374151',
              fontWeight: 'bold',
              fontSize: '0.875rem'
            }}
          />
          <RechartsArea
            type="monotone"
            dataKey="score"
            stroke={colors.main}
            fill={`url(#color${colorName})`}
            strokeWidth={2}
            name="Puntuación"
          />
        </AreaChart>
      </ResponsiveContainer>
          
      {/* Leyenda personalizada */}
      <div className="flex items-center justify-start mt-2 pl-4">
        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: colors.main }}></div>
        <span className="text-sm text-gray-700">Puntuación</span>
      </div>
    </div>
  );
}

export default ProgressChart;
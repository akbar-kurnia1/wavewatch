import React from 'react';
import styled from 'styled-components';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';

const ChartContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 15px;
  margin: 1rem 0;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const ChartTitle = styled.h4`
  color: white;
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const CustomTooltip = styled.div`
  background: rgba(0, 0, 0, 0.8);
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 0.9rem;
`;

const WaveHeightChart = ({ hourlyForecast }) => {
  // Transform the hourly forecast data for the chart
  const chartData = hourlyForecast?.map((hour, index) => {
    // Handle both camelCase (mock data) and snake_case (API data) formats
    const time = hour.time.includes(':') ? hour.time : new Date(hour.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return {
      time: time,
      waveHeight: parseFloat(hour.waveHeight || hour.wave_height) || 0,
      windSpeed: parseFloat(hour.windSpeed || hour.wind_speed) || 0,
      windDirection: parseFloat(hour.windDirection || hour.wind_direction) || 0,
      tide: parseFloat(hour.tide) || 0,
      airTemperature: parseFloat(hour.airTemperature || hour.air_temperature) || 0,
      fullTime: hour.time
    };
  }) || [];

  const WaveHeightTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <CustomTooltip>
          <p><strong>Time:</strong> {label}</p>
          <p><strong>Wave Height:</strong> {data.waveHeight}ft</p>
        </CustomTooltip>
      );
    }
    return null;
  };

  const WindSpeedTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const direction = getWindDirectionText(data.windDirection);
      return (
        <CustomTooltip>
          <p><strong>Time:</strong> {label}</p>
          <p><strong>Wind Speed:</strong> {data.windSpeed}mph</p>
          <p><strong>Wind Direction:</strong> {direction} ({data.windDirection}°)</p>
        </CustomTooltip>
      );
    }
    return null;
  };

  // Helper function to convert wind direction degrees to text
  const getWindDirectionText = (degrees) => {
    if (degrees >= 337.5 || degrees < 22.5) return 'N';
    if (degrees >= 22.5 && degrees < 67.5) return 'NE';
    if (degrees >= 67.5 && degrees < 112.5) return 'E';
    if (degrees >= 112.5 && degrees < 157.5) return 'SE';
    if (degrees >= 157.5 && degrees < 202.5) return 'S';
    if (degrees >= 202.5 && degrees < 247.5) return 'SW';
    if (degrees >= 247.5 && degrees < 292.5) return 'W';
    if (degrees >= 292.5 && degrees < 337.5) return 'NW';
    return 'N';
  };

  if (!hourlyForecast || hourlyForecast.length === 0) {
    return (
      <ChartContainer>
        <ChartTitle>📈 Wave Height Throughout the Day</ChartTitle>
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center', padding: '2rem' }}>
          No hourly forecast data available
        </p>
      </ChartContainer>
    );
  }

  return (
    <ChartContainer>
      <ChartTitle>📈 Wave Height Throughout the Day</ChartTitle>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <defs>
            <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4A90E2" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#4A90E2" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.2)" />
          <XAxis 
            dataKey="time" 
            stroke="rgba(255, 255, 255, 0.7)"
            fontSize={12}
            tick={{ fill: 'rgba(255, 255, 255, 0.8)' }}
          />
          <YAxis 
            stroke="rgba(255, 255, 255, 0.7)"
            fontSize={12}
            tick={{ fill: 'rgba(255, 255, 255, 0.8)' }}
            label={{ 
              value: 'Wave Height (ft)', 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle', fill: 'rgba(255, 255, 255, 0.8)' }
            }}
          />
          <Tooltip content={<WaveHeightTooltip />} />
          <Area
            type="monotone"
            dataKey="waveHeight"
            stroke="#4A90E2"
            strokeWidth={3}
            fill="url(#waveGradient)"
            dot={{ fill: '#4A90E2', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#4A90E2', strokeWidth: 2, fill: 'white' }}
          />
        </AreaChart>
      </ResponsiveContainer>
      
      {/* Additional chart for wind speed */}
      <div style={{ marginTop: '2rem' }}>
        <h5 style={{ color: 'white', marginBottom: '1rem', fontSize: '1rem' }}>💨 Wind Speed</h5>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.2)" />
            <XAxis 
              dataKey="time" 
              stroke="rgba(255, 255, 255, 0.7)"
              fontSize={12}
              tick={{ fill: 'rgba(255, 255, 255, 0.8)' }}
            />
            <YAxis 
              stroke="rgba(255, 255, 255, 0.7)"
              fontSize={12}
              tick={{ fill: 'rgba(255, 255, 255, 0.8)' }}
              label={{ 
                value: 'Wind Speed (mph)', 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle', fill: 'rgba(255, 255, 255, 0.8)' }
            }}
          />
          <Tooltip content={<WindSpeedTooltip />} />
          <Line
              type="monotone"
              dataKey="windSpeed"
              stroke="#FF6B6B"
              strokeWidth={2}
              dot={{ fill: '#FF6B6B', strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5, stroke: '#FF6B6B', strokeWidth: 2, fill: 'white' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
    </ChartContainer>
  );
};

export default WaveHeightChart;

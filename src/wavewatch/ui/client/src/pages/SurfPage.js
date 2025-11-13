import React, { useState } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import surfApi from '../services/surfApi';
import WaveHeightChart from '../components/features/surf/WaveHeightChart';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Card from '../components/common/Card';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { theme } from '../styles/theme';

const SurfContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.lg};
`;

const SearchForm = styled.form`
  display: flex;
  gap: ${theme.spacing.sm};
  align-items: center;
  flex-wrap: wrap;
`;

const ResultsSection = styled(Card)`
  color: ${theme.colors.white};
`;

const SurfPage = () => {
  const [beachName, setBeachName] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [surfData, setSurfData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!beachName.trim()) return;

    setLoading(true);
    setError('');
    
    try {
          const data = await surfApi.getSurfData(beachName, selectedDate);
          setSurfData(data);
          setLoading(false);
    } catch (err) {
      setError('Failed to fetch surf data');
      setLoading(false);
    }
  };

  return (
    <SurfContainer>
      <Card marginBottom={theme.spacing.lg}>
        <h2 style={{ color: theme.colors.white, marginBottom: theme.spacing.sm }}>🌊 Check Surf Conditions</h2>
        <SearchForm onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Enter beach name (e.g., pleasure point)"
            value={beachName}
            onChange={(e) => setBeachName(e.target.value)}
          />
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Get Surf Data'}
          </Button>
        </SearchForm>
      </Card>

      <ResultsSection>
        {loading && <LoadingSpinner message="Fetching surf conditions..." />}
        {error && <ErrorMessage message={error} />}
                {surfData && (
                  <div>
                    <h3>🏖️ {surfData.beachName}</h3>
                    <p>📅 {surfData.date}</p>
                    <p style={{ color: theme.colors.accent.green, fontWeight: 'bold', marginBottom: theme.spacing.sm }}>
                      ✅ Real Stormglass API Data
                    </p>
            
            {/* One Sentence Summary */}
            <Card marginBottom={theme.spacing.lg} padding={theme.spacing.sm}>
              <h4>🌊 Summary</h4>
              <p>{surfData.oneSentenceSummary}</p>
            </Card>

                    {/* Current Conditions */}
                    <div style={{ marginBottom: theme.spacing.lg }}>
                      <h4>📊 Current Conditions</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: theme.spacing.sm, marginTop: theme.spacing.sm }}>
                        <div>Wave Height: <strong>{surfData.currentConditions?.wave_height || 'N/A'}ft</strong></div>
                        <div>Wave Period: <strong>{surfData.currentConditions?.wave_period || 'N/A'}s</strong></div>
                        <div>Wind Speed: <strong>{surfData.currentConditions?.wind_speed || 'N/A'}mph</strong></div>
                        <div>Wind Direction: <strong>{surfData.currentConditions?.wind_direction || 'N/A'}°</strong></div>
                        <div>Water Temp: <strong>{surfData.currentConditions?.water_temperature || 'N/A'}°F</strong></div>
                        <div>Air Temp: <strong>{surfData.currentConditions?.air_temperature || 'N/A'}°F</strong></div>
                      </div>
                    </div>

                    {/* Wave Height Chart */}
                    <WaveHeightChart 
                      hourlyForecast={surfData.hourlyForecast} 
                      tideData={surfData.tideData}
                    />

                    {/* Best Surf Times */}
                    <div style={{ marginBottom: theme.spacing.lg }}>
                      <h4>🏄‍♂️ Best Surf Times</h4>
                      {Array.isArray(surfData.bestSurfTimes) && surfData.bestSurfTimes.length > 0 ? (
                        surfData.bestSurfTimes.map((time, index) => (
                          <Card key={index} marginBottom={theme.spacing.sm} padding={theme.spacing.sm}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm, marginBottom: theme.spacing.xs, flexWrap: 'wrap' }}>
                              <strong style={{ fontSize: '1.1rem', color: theme.colors.accent.blue }}>{time.time || 'N/A'}</strong>
                              {time.rating && (
                                <span style={{ background: `rgba(74, 144, 226, 0.3)`, padding: `${theme.spacing.xs} ${theme.spacing.md}`, borderRadius: '20px', fontWeight: 'bold' }}>
                                  Rating: {time.rating}/100
                                </span>
                              )}
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: theme.spacing.sm, marginBottom: theme.spacing.sm, fontSize: '0.95rem' }}>
                              {time.wave_height_range && (
                                <div>🌊 Wave: <strong>{time.wave_height_range}</strong></div>
                              )}
                              {time.period && (
                                <div>⏱️ Period: <strong>{time.period}s</strong></div>
                              )}
                              {time.wind_speed_range && (
                                <div>💨 Wind: <strong>{time.wind_speed_range}</strong></div>
                              )}
                            </div>
                            {time.reason && (
                              <div style={{ marginTop: theme.spacing.sm, paddingTop: theme.spacing.sm, borderTop: `1px solid ${theme.colors.background.glassHover}`, lineHeight: '1.6', color: theme.colors.text.primary }}>
                                <strong style={{ color: theme.colors.accent.blue, display: 'block', marginBottom: theme.spacing.xs }}>Why this time:</strong>
                                <div style={{ whiteSpace: 'pre-line' }}>{time.reason}</div>
                              </div>
                            )}
                          </Card>
                        ))
                      ) : (
                        <p style={{ opacity: 0.8, fontStyle: 'italic' }}>
                          {typeof surfData.bestSurfTimes === 'string' ? surfData.bestSurfTimes : 'No surf time data available'}
                        </p>
                      )}
                    </div>

                    {/* Break-Specific Ideal Conditions */}
                    {surfData.breakSpecificConditions && surfData.breakSpecificConditions.trim() !== "" && 
                     surfData.breakSpecificConditions !== "No break-specific information available. Using general surf forecasting principles." && (
                      <Card marginBottom={theme.spacing.lg} padding={theme.spacing.sm} style={{ background: `rgba(74, 144, 226, 0.1)`, border: `1px solid rgba(74, 144, 226, 0.3)` }}>
                        <h4 style={{ color: theme.colors.accent.blue, marginBottom: theme.spacing.sm }}>📍 Ideal Conditions for {surfData.beachName}</h4>
                        <div style={{ lineHeight: '1.6', color: theme.colors.text.primary, fontSize: '0.95rem' }}>
                          <ReactMarkdown
                            components={{
                              h1: ({children}) => <h1 style={{color: theme.colors.accent.blue, fontSize: '1.1rem', margin: `${theme.spacing.sm} 0 ${theme.spacing.xs} 0`, fontWeight: 'bold'}}>{children}</h1>,
                              h2: ({children}) => <h2 style={{color: theme.colors.accent.blue, fontSize: '1rem', margin: `${theme.spacing.sm} 0 ${theme.spacing.xs} 0`, fontWeight: 'bold'}}>{children}</h2>,
                              h3: ({children}) => <h3 style={{color: theme.colors.accent.blue, fontSize: '0.95rem', margin: `${theme.spacing.sm} 0 ${theme.spacing.xs} 0`, fontWeight: 'bold'}}>{children}</h3>,
                              p: ({children}) => <p style={{margin: `${theme.spacing.xs} 0`, color: theme.colors.text.primary}}>{children}</p>,
                              strong: ({children}) => <strong style={{color: theme.colors.accent.blue, fontWeight: 'bold'}}>{children}</strong>,
                              ul: ({children}) => <ul style={{margin: `${theme.spacing.xs} 0`, paddingLeft: '1.5rem', color: theme.colors.text.primary}}>{children}</ul>,
                              li: ({children}) => <li style={{margin: `${theme.spacing.xs} 0`, color: theme.colors.text.primary}}>{children}</li>,
                              ol: ({children}) => <ol style={{margin: `${theme.spacing.xs} 0`, paddingLeft: '1.5rem', color: theme.colors.text.primary}}>{children}</ol>
                            }}
                          >
                            {surfData.breakSpecificConditions}
                          </ReactMarkdown>
                        </div>
                      </Card>
                    )}

            {/* AI Analysis */}
            <div>
              <h4>🤖 AI Analysis</h4>
              <Card padding={theme.spacing.sm} marginBottom={theme.spacing.lg} style={{ lineHeight: '1.6' }}>
                <ReactMarkdown
                  components={{
                    h1: ({children}) => <h1 style={{color: theme.colors.accent.blue, fontSize: '1.5rem', margin: `${theme.spacing.sm} 0 ${theme.spacing.xs} 0`}}>{children}</h1>,
                    h2: ({children}) => <h2 style={{color: theme.colors.accent.blue, fontSize: '1.3rem', margin: `${theme.spacing.sm} 0 ${theme.spacing.xs} 0`}}>{children}</h2>,
                    h3: ({children}) => <h3 style={{color: theme.colors.accent.blue, fontSize: '1.1rem', margin: `${theme.spacing.sm} 0 ${theme.spacing.xs} 0`}}>{children}</h3>,
                    p: ({children}) => <p style={{margin: `${theme.spacing.xs} 0`, color: theme.colors.text.primary}}>{children}</p>,
                    strong: ({children}) => <strong style={{color: theme.colors.accent.blue, fontWeight: 'bold'}}>{children}</strong>,
                    ul: ({children}) => <ul style={{margin: `${theme.spacing.xs} 0`, paddingLeft: '1.5rem', color: theme.colors.text.primary}}>{children}</ul>,
                    li: ({children}) => <li style={{margin: `${theme.spacing.xs} 0`, color: theme.colors.text.primary}}>{children}</li>,
                    ol: ({children}) => <ol style={{margin: `${theme.spacing.xs} 0`, paddingLeft: '1.5rem', color: theme.colors.text.primary}}>{children}</ol>
                  }}
                >
                  {typeof surfData.aiAnalysis === 'string' ? surfData.aiAnalysis : JSON.stringify(surfData.aiAnalysis)}
                </ReactMarkdown>
              </Card>
            </div>
          </div>
        )}
        {!loading && !error && !surfData && (
          <p style={{ textAlign: 'center', color: theme.colors.text.secondary }}>
            Enter a beach name and date to get surf conditions
          </p>
        )}
      </ResultsSection>
    </SurfContainer>
  );
};

export default SurfPage;

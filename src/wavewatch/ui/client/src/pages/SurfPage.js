import React, { useState } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import surfApi from '../services/surfApi';
import WaveHeightChart from '../components/features/surf/WaveHeightChart';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Card from '../components/common/Card';
import MetricCard from '../components/common/MetricCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { theme } from '../styles/theme';

const SurfContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${theme.spacing.lg};
`;

const SearchCard = styled(Card)`
  margin-bottom: ${theme.spacing.xl};
`;

const SearchTitle = styled.h2`
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md};
  font-family: ${theme.typography.fontFamily};
`;

const SearchForm = styled.form`
  display: flex;
  gap: ${theme.spacing.md};
  align-items: flex-end;
  flex-wrap: wrap;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
  flex: 1;
  min-width: 200px;
`;

const FormLabel = styled.label`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const BeachHeader = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const BeachTitle = styled.h1`
  font-size: ${theme.typography.fontSize['4xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs};
  font-family: ${theme.typography.fontFamily};
`;

const BeachDate = styled.p`
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.md};
`;

const SummaryCard = styled(Card)`
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%);
  color: ${theme.colors.white};
  margin-bottom: ${theme.spacing.xl};
`;

const SummaryTitle = styled.h3`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.bold};
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.white};
`;

const SummaryText = styled.p`
  font-size: ${theme.typography.fontSize.lg};
  line-height: 1.6;
  color: ${theme.colors.white};
  opacity: 0.95;
`;

const SectionTitle = styled.h3`
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md};
  font-family: ${theme.typography.fontFamily};
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
`;

const BestTimesGrid = styled.div`
  display: grid;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
`;

const BestTimeCard = styled(Card)`
  border-left: 4px solid ${theme.colors.primary};
`;

const BestTimeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.sm};
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
`;

const BestTimeTitle = styled.div`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.primary};
`;

const BestTimeRating = styled.span`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.bold};
`;

const BestTimeMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.sm};
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.text.secondary};
`;

const BestTimeReason = styled.div`
  margin-top: ${theme.spacing.sm};
  padding-top: ${theme.spacing.sm};
  border-top: 1px solid ${theme.colors.border.light};
  color: ${theme.colors.text.primary};
  line-height: 1.6;
`;

const ReasonLabel = styled.strong`
  display: block;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.xs};
  font-weight: ${theme.typography.fontWeight.semibold};
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
      <SearchCard>
        <SearchTitle>Surf Forecast</SearchTitle>
        <SearchForm onSubmit={handleSubmit}>
          <FormGroup>
            <FormLabel>Beach Name</FormLabel>
            <Input
              type="text"
              placeholder="e.g., Pleasure Point, Malibu"
              value={beachName}
              onChange={(e) => setBeachName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Date</FormLabel>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </FormGroup>
          <Button type="submit" disabled={loading} size="large">
            {loading ? 'Loading...' : 'Get Forecast'}
          </Button>
        </SearchForm>
      </SearchCard>

      {loading && <LoadingSpinner message="Fetching surf conditions..." />}
      {error && <ErrorMessage message={error} />}
      
      {surfData && (
        <>
          <BeachHeader>
            <BeachTitle>{surfData.beachName}</BeachTitle>
            <BeachDate>{new Date(surfData.date).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</BeachDate>
          </BeachHeader>

          {/* Summary */}
          {surfData.oneSentenceSummary && (
            <SummaryCard>
              <SummaryTitle>Forecast Summary</SummaryTitle>
              <SummaryText>{surfData.oneSentenceSummary}</SummaryText>
            </SummaryCard>
          )}

          {/* Current Conditions */}
          <SectionTitle>Current Conditions</SectionTitle>
          <MetricsGrid>
            <MetricCard 
              label="Wave Height" 
              value={surfData.currentConditions?.wave_height || 'N/A'} 
              unit="ft"
              size="large"
            />
            <MetricCard 
              label="Wave Period" 
              value={surfData.currentConditions?.wave_period || 'N/A'} 
              unit="s"
            />
            <MetricCard 
              label="Wind Speed" 
              value={surfData.currentConditions?.wind_speed || 'N/A'} 
              unit="mph"
            />
            <MetricCard 
              label="Wind Direction" 
              value={surfData.currentConditions?.wind_direction || 'N/A'} 
              unit="°"
            />
            <MetricCard 
              label="Water Temp" 
              value={surfData.currentConditions?.water_temperature || 'N/A'} 
              unit="°F"
            />
            <MetricCard 
              label="Air Temp" 
              value={surfData.currentConditions?.air_temperature || 'N/A'} 
              unit="°F"
            />
          </MetricsGrid>

          {/* Wave Height Chart */}
          <WaveHeightChart 
            hourlyForecast={surfData.hourlyForecast} 
            tideData={surfData.tideData}
          />

          {/* Best Surf Times */}
          {Array.isArray(surfData.bestSurfTimes) && surfData.bestSurfTimes.length > 0 && (
            <>
              <SectionTitle>Best Surf Times</SectionTitle>
              <BestTimesGrid>
                {surfData.bestSurfTimes.map((time, index) => (
                  <BestTimeCard key={index}>
                    <BestTimeHeader>
                      <BestTimeTitle>
                        {new Date(time.time).toLocaleTimeString('en-US', { 
                          hour: 'numeric', 
                          minute: '2-digit',
                          hour12: true 
                        })}
                      </BestTimeTitle>
                      {time.rating && (
                        <BestTimeRating>Rating: {time.rating}/100</BestTimeRating>
                      )}
                    </BestTimeHeader>
                    <BestTimeMetrics>
                      {time.wave_height_range && (
                        <div><strong>Wave:</strong> {time.wave_height_range}</div>
                      )}
                      {time.period && (
                        <div><strong>Period:</strong> {time.period}s</div>
                      )}
                      {time.wind_speed_range && (
                        <div><strong>Wind:</strong> {time.wind_speed_range}</div>
                      )}
                    </BestTimeMetrics>
                    {time.reason && (
                      <BestTimeReason>
                        <ReasonLabel>Why this time:</ReasonLabel>
                        <div style={{ whiteSpace: 'pre-line' }}>{time.reason}</div>
                      </BestTimeReason>
                    )}
                  </BestTimeCard>
                ))}
              </BestTimesGrid>
            </>
          )}

          {/* Break-Specific Ideal Conditions */}
          {surfData.breakSpecificConditions && 
           surfData.breakSpecificConditions.trim() !== "" && 
           surfData.breakSpecificConditions !== "No break-specific information available. Using general surf forecasting principles." && (
            <Card marginBottom={theme.spacing.xl} style={{ borderLeft: `4px solid ${theme.colors.primary}` }}>
              <SectionTitle style={{ marginBottom: theme.spacing.md }}>
                Ideal Conditions for {surfData.beachName}
              </SectionTitle>
              <div style={{ lineHeight: '1.8', color: theme.colors.text.primary }}>
                <ReactMarkdown
                  components={{
                    h1: ({children}) => <h1 style={{color: theme.colors.primary, fontSize: theme.typography.fontSize.xl, margin: `${theme.spacing.md} 0 ${theme.spacing.sm} 0`, fontWeight: theme.typography.fontWeight.bold}}>{children}</h1>,
                    h2: ({children}) => <h2 style={{color: theme.colors.primary, fontSize: theme.typography.fontSize.lg, margin: `${theme.spacing.md} 0 ${theme.spacing.sm} 0`, fontWeight: theme.typography.fontWeight.bold}}>{children}</h2>,
                    h3: ({children}) => <h3 style={{color: theme.colors.primary, fontSize: theme.typography.fontSize.base, margin: `${theme.spacing.sm} 0 ${theme.spacing.xs} 0`, fontWeight: theme.typography.fontWeight.semibold}}>{children}</h3>,
                    p: ({children}) => <p style={{margin: `${theme.spacing.sm} 0`, color: theme.colors.text.primary}}>{children}</p>,
                    strong: ({children}) => <strong style={{color: theme.colors.primary, fontWeight: theme.typography.fontWeight.bold}}>{children}</strong>,
                    ul: ({children}) => <ul style={{margin: `${theme.spacing.sm} 0`, paddingLeft: '1.5rem', color: theme.colors.text.primary}}>{children}</ul>,
                    li: ({children}) => <li style={{margin: `${theme.spacing.xs} 0`, color: theme.colors.text.primary}}>{children}</li>,
                    ol: ({children}) => <ol style={{margin: `${theme.spacing.sm} 0`, paddingLeft: '1.5rem', color: theme.colors.text.primary}}>{children}</ol>
                  }}
                >
                  {surfData.breakSpecificConditions}
                </ReactMarkdown>
              </div>
            </Card>
          )}

          {/* AI Analysis */}
          {surfData.aiAnalysis && (
            <Card marginBottom={theme.spacing.xl}>
              <SectionTitle>AI Analysis</SectionTitle>
              <div style={{ lineHeight: '1.8', color: theme.colors.text.primary }}>
                <ReactMarkdown
                  components={{
                    h1: ({children}) => <h1 style={{color: theme.colors.primary, fontSize: theme.typography.fontSize['2xl'], margin: `${theme.spacing.md} 0 ${theme.spacing.sm} 0`, fontWeight: theme.typography.fontWeight.bold}}>{children}</h1>,
                    h2: ({children}) => <h2 style={{color: theme.colors.primary, fontSize: theme.typography.fontSize.xl, margin: `${theme.spacing.md} 0 ${theme.spacing.sm} 0`, fontWeight: theme.typography.fontWeight.bold}}>{children}</h2>,
                    h3: ({children}) => <h3 style={{color: theme.colors.primary, fontSize: theme.typography.fontSize.lg, margin: `${theme.spacing.sm} 0 ${theme.spacing.xs} 0`, fontWeight: theme.typography.fontWeight.semibold}}>{children}</h3>,
                    p: ({children}) => <p style={{margin: `${theme.spacing.sm} 0`, color: theme.colors.text.primary}}>{children}</p>,
                    strong: ({children}) => <strong style={{color: theme.colors.primary, fontWeight: theme.typography.fontWeight.bold}}>{children}</strong>,
                    ul: ({children}) => <ul style={{margin: `${theme.spacing.sm} 0`, paddingLeft: '1.5rem', color: theme.colors.text.primary}}>{children}</ul>,
                    li: ({children}) => <li style={{margin: `${theme.spacing.xs} 0`, color: theme.colors.text.primary}}>{children}</li>,
                    ol: ({children}) => <ol style={{margin: `${theme.spacing.sm} 0`, paddingLeft: '1.5rem', color: theme.colors.text.primary}}>{children}</ol>
                  }}
                >
                  {typeof surfData.aiAnalysis === 'string' ? surfData.aiAnalysis : JSON.stringify(surfData.aiAnalysis)}
                </ReactMarkdown>
              </div>
            </Card>
          )}
        </>
      )}
      
      {!loading && !error && !surfData && (
        <Card>
          <p style={{ textAlign: 'center', color: theme.colors.text.secondary, fontSize: theme.typography.fontSize.lg }}>
            Enter a beach name and date to get surf conditions
          </p>
        </Card>
      )}
    </SurfContainer>
  );
};

export default SurfPage;

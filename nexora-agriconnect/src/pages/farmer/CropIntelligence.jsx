import React, { useState } from 'react';
import { Sprout, Sun, Droplet, ShieldCheck, HelpCircle, Wand2 } from 'lucide-react';
import { PageShell } from '../../components/layout/PageShell';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Select';
import { VoiceButton } from '../../components/ui/VoiceButton';
import { useApp } from '../../context/AppContext';

export const CropIntelligence = () => {
  const { predictCrop, showToast } = useApp();
  const [form, setForm] = useState({
    soilType: 'Alluvial Loam',
    season: 'Rabi',
    waterAvailability: 'Medium',
    rainfall: 40,
    temperature: 26
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    const value = e?.target ? e.target.value : e;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handlePredict = async () => {
    setLoading(true);
    try {
      const data = await predictCrop(form);
      setResult(data);
    } catch (err) {
      // predictCrop already shows a toast on failure
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell title="Crop Intelligence">
      <div className="page-header">
        <div className="page-title-group">
          <div className="page-title">
            <span>Crop Intelligence</span>
            <VoiceButton textToRead="Crop Intelligence. Agro-climatic health indicators and stage-wise crop recommendations for your farmland." />
          </div>
          <span className="page-subtitle">Agro-climatic health indicators & stage-wise crop recommendations.</span>
        </div>
      </div>

      <div className="grid-3" style={{ marginBottom: 'var(--space-6)' }}>
        <Card title="North Field (Wheat)" icon={Sprout}>
          <div style={{ marginBottom: 'var(--space-3)' }}>
            <Badge variant="success">Booting Stage (Day 62)</Badge>
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div className="flex-between">
              <span>Nitrogen (N) Index:</span>
              <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>Optimal (84%)</span>
            </div>
            <div className="flex-between">
              <span>Soil Moisture Level:</span>
              <span style={{ fontWeight: 600, color: 'var(--color-secondary)' }}>Moderate (42%)</span>
            </div>
            <div className="flex-between">
              <span>Pest Risk Factor:</span>
              <span style={{ fontWeight: 600, color: 'var(--color-danger)' }}>Elevated (Aphids)</span>
            </div>
          </div>
          <div style={{ fontSize: '10px', color: 'var(--color-text-subtle)', marginTop: 'var(--space-3)', borderTop: '1px solid var(--color-border)', paddingTop: '6px' }}>
            Freshness: Last satellite & sensor cycle 2 hours ago
          </div>
        </Card>

        <Card title="River Side (Mustard)" icon={Sprout}>
          <div style={{ marginBottom: 'var(--space-3)' }}>
            <Badge variant="info">Pod Formation (Day 48)</Badge>
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div className="flex-between">
              <span>Sulfur (S) Index:</span>
              <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>Good (78%)</span>
            </div>
            <div className="flex-between">
              <span>Soil Moisture Level:</span>
              <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>Adequate (58%)</span>
            </div>
            <div className="flex-between">
              <span>Fungal Risk Factor:</span>
              <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>Low (White Rust)</span>
            </div>
          </div>
          <div style={{ fontSize: '10px', color: 'var(--color-text-subtle)', marginTop: 'var(--space-3)', borderTop: '1px solid var(--color-border)', paddingTop: '6px' }}>
            Freshness: Last satellite & sensor cycle 3 hours ago
          </div>
        </Card>

        <Card title="Contributing Factors" icon={HelpCircle}>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', lineHeight: 1.4, margin: 0 }}>
            Every score is explained through soil organic carbon measurements, regional temperature indices, and historical weather cycles to ensure explainable agronomic guidance.
          </p>
        </Card>
      </div>

      {/* AI Crop Recommendation */}
      <Card title="AI Crop Recommendation" icon={Wand2} style={{ marginBottom: 'var(--space-6)' }}>
        <div className="grid-3" style={{ marginBottom: 'var(--space-4)' }}>
          <Select
            label="Soil Type"
            value={form.soilType}
            onChange={handleChange('soilType')}
            options={['Alluvial Loam', 'Sandy Loam', 'Clay', 'Clay Loam', 'Black Soil', 'Loamy'].map((v) => ({ value: v, label: v }))}
          />
          <Select
            label="Season"
            value={form.season}
            onChange={handleChange('season')}
            options={['Rabi', 'Kharif', 'Summer', 'Winter', 'Monsoon'].map((v) => ({ value: v, label: v }))}
          />
          <Select
            label="Water Availability"
            value={form.waterAvailability}
            onChange={handleChange('waterAvailability')}
            options={['Low', 'Medium', 'High'].map((v) => ({ value: v, label: v }))}
          />
        </div>

        <Button icon={Wand2} onClick={handlePredict} disabled={loading}>
          {loading ? 'Analyzing…' : 'Get AI Recommendation'}
        </Button>

        {result && (
          <div style={{ marginTop: 'var(--space-4)', borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-4)' }}>
            <div className="flex-between" style={{ marginBottom: '6px' }}>
              <span style={{ fontSize: 'var(--text-md)', fontWeight: 700 }}>{result.recommendedCrop}</span>
              <Badge variant={result.confidence === 'High' ? 'success' : result.confidence === 'Medium' ? 'info' : 'warning'}>
                {result.suitabilityScore}% Suitable · {result.confidence} Confidence
              </Badge>
            </div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
              {result.reason}
            </p>
            {result.alternatives?.length > 0 && (
              <div style={{ fontSize: '11px', color: 'var(--color-text-subtle)', marginTop: '6px' }}>
                Alternatives: {result.alternatives.map((a) => `${a.crop} (${a.suitabilityScore}%)`).join(', ')}
              </div>
            )}
          </div>
        )}
      </Card>
    </PageShell>
  );
};

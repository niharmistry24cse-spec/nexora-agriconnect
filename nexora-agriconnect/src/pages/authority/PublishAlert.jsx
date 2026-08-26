import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  Info,
  AlertCircle,
  Play,
  MapPin,
  FileText
} from 'lucide-react';
import { PageShell } from '../../components/layout/PageShell';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Textarea } from '../../components/ui/Textarea';
import { VoiceButton } from '../../components/ui/VoiceButton';
import { useApp } from '../../context/AppContext';

export const PublishAlert = () => {
  const navigate = useNavigate();
  const { publishAlert, showToast } = useApp();

  const [form, setForm] = useState({
    headline: '',
    message: '',
    severity: 'Normal', // Normal | Urgent | Emergency
    district: 'Ludhiana',
    village: 'All Villages'
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.headline) {
      setErrors({ headline: 'Headline is required' });
      return;
    }
    if (!form.message) {
      setErrors({ message: 'Detailed message is required' });
      return;
    }

    publishAlert({
      headline: form.headline,
      message: form.message,
      severity: form.severity,
      district: form.district,
      village: form.village
    });

    navigate('/authority/dashboard');
  };

  return (
    <PageShell title="Announcements & Alerts" contentMaxWidth="780px">
      <div className="page-header" style={{ marginBottom: 'var(--space-4)' }}>
        <div className="page-title-group">
          <div className="page-title">
            <span>Publish Alert</span>
            <VoiceButton textToRead="Publish Alert. Broadcast critical information, weather advisories, or pest outbreaks to targeted regions." />
          </div>
          <span className="page-subtitle">Broadcast critical information to targeted regions.</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
        {/* Card 1: Message Content */}
        <Card
          title="Message Content"
          icon={FileText}
          enableVoice
          voiceText="Message content section. Enter alert headline and detailed broadcast instructions."
        >
          <Input
            label="Alert Headline"
            placeholder="e.g., Heavy Rainfall Warning"
            value={form.headline}
            onChange={(e) => setForm({ ...form, headline: e.target.value })}
            helperText="Keep it short and clear."
            error={errors.headline}
            required
          />

          <Textarea
            label="Detailed Message"
            placeholder="Provide full details, instructions, and precautions for local farmers…"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            error={errors.message}
            rows={4}
            required
          />
        </Card>

        {/* Card 2: Severity Level */}
        <Card
          title="Severity Level"
          icon={AlertTriangle}
          enableVoice
          voiceText="Select severity level: Normal, Urgent, or Emergency."
        >
          <div className="grid-3" style={{ gap: 'var(--space-3)' }}>
            {[
              { level: 'Normal', icon: Info, color: 'var(--color-primary)' },
              { level: 'Urgent', icon: AlertCircle, color: 'var(--color-secondary)' },
              { level: 'Emergency', icon: AlertTriangle, color: 'var(--color-danger)' }
            ].map(({ level, icon: Icon, color }) => {
              const isSelected = form.severity === level;
              return (
                <div
                  key={level}
                  onClick={() => setForm({ ...form, severity: level })}
                  style={{
                    border: `2px solid ${isSelected ? color : 'var(--color-border)'}`,
                    borderRadius: 'var(--radius-md)',
                    padding: 'var(--space-4)',
                    textAlign: 'center',
                    backgroundColor: isSelected ? 'var(--color-surface-subtle)' : 'var(--color-surface)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'inline-flex', marginBottom: '4px', color }}>
                    <Icon size={20} />
                  </div>
                  <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text)' }}>
                    {level}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Card 3: Location Targeting */}
        <Card
          title="Location Targeting"
          icon={MapPin}
          enableVoice
          voiceText="Targeting: District and Village block selection."
        >
          <div className="grid-2">
            <Select
              label="District"
              value={form.district}
              onChange={(e) => setForm({ ...form, district: e.target.value })}
              options={['Ludhiana', 'Sangrur', 'Patiala', 'Amritsar', 'Jalandhar', 'All Districts']}
            />

            <Select
              label="Village / Block"
              value={form.village}
              onChange={(e) => setForm({ ...form, village: e.target.value })}
              options={['All Villages', 'Pratappur', 'Khanna', 'Samrala', 'Payal', 'Doraha']}
            />
          </div>
        </Card>

        {/* Footer Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
          <Button
            variant="outline"
            onClick={() => navigate('/authority/dashboard')}
          >
            Cancel
          </Button>

          <Button
            variant="primary"
            type="submit"
            icon={Play}
          >
            Publish Alert
          </Button>
        </div>
      </form>
    </PageShell>
  );
};

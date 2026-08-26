import React, { useState } from 'react';
import { Settings, Save, Globe, Lock, Bell } from 'lucide-react';
import { PageShell } from '../../components/layout/PageShell';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Toggle } from '../../components/ui/Toggle';
import { VoiceButton } from '../../components/ui/VoiceButton';
import { useApp } from '../../context/AppContext';

export const PlatformConfiguration = () => {
  const { showToast } = useApp();
  const [config, setConfig] = useState({
    siteName: 'AgriConnect — Digital Stewardship',
    supportPhone: '1800-180-1551 (Kisan Call Center)',
    allowSelfRegistration: true,
    enableGeoTargeting: true,
    maintenanceMode: false
  });

  const handleSave = () => {
    showToast('Platform settings saved successfully', 'success');
  };

  return (
    <PageShell title="Platform Configuration" contentMaxWidth="780px">
      <div className="page-header">
        <div className="page-title-group">
          <div className="page-title">
            <span>Platform Configuration</span>
            <VoiceButton textToRead="Platform Configuration. General parameters, security settings, and localization controls." />
          </div>
          <span className="page-subtitle">Configure system parameters, regional boundaries, and access rules.</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
        <Card title="General System Parameters" icon={Settings}>
          <Input
            label="Platform Title"
            value={config.siteName}
            onChange={(e) => setConfig({ ...config, siteName: e.target.value })}
          />
          <Input
            label="National Toll-Free Helpline"
            value={config.supportPhone}
            onChange={(e) => setConfig({ ...config, supportPhone: e.target.value })}
          />
        </Card>

        <Card title="Operational Controls" icon={Lock}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <Toggle
              label="Allow Farmer Self-Onboarding"
              description="Enable new farmers to register and complete the 5-step onboarding wizard."
              checked={config.allowSelfRegistration}
              onChange={(c) => setConfig({ ...config, allowSelfRegistration: c })}
            />
            <Toggle
              label="Geo-Targeted Weather & Advisories"
              description="Deliver automated agro-climatic advisories based on district coordinates."
              checked={config.enableGeoTargeting}
              onChange={(c) => setConfig({ ...config, enableGeoTargeting: c })}
            />
            <Toggle
              label="Scheduled Maintenance Mode"
              description="Temporarily restrict write access across non-critical services."
              checked={config.maintenanceMode}
              onChange={(c) => setConfig({ ...config, maintenanceMode: c })}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-5)' }}>
            <Button variant="primary" icon={Save} onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </Card>
      </div>
    </PageShell>
  );
};

import React from 'react';
import { Activity, Server, Database, Wifi, CheckCircle2 } from 'lucide-react';
import { PageShell } from '../../components/layout/PageShell';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { VoiceButton } from '../../components/ui/VoiceButton';

export const SystemMonitoring = () => {
  const services = [
    { name: 'eNAM Market Prices Gateway', status: 'Operational', latency: '28ms', uptime: '99.99%', icon: Wifi },
    { name: 'PAU & IMD Agromet Advisory Engine', status: 'Operational', latency: '45ms', uptime: '100%', icon: Activity },
    { name: 'National Soil Registry Sync', status: 'Operational', latency: '62ms', uptime: '99.95%', icon: Database },
    { name: 'Core Farmer Profile Ledger', status: 'Operational', latency: '18ms', uptime: '100%', icon: Server }
  ];

  return (
    <PageShell title="System Monitoring">
      <div className="page-header">
        <div className="page-title-group">
          <div className="page-title">
            <span>System Health & Monitoring</span>
            <VoiceButton textToRead="System Health and Monitoring. Real-time status of government gateways, advisory feeds, and database ledgers." />
          </div>
          <span className="page-subtitle">Real-time status of government gateways, advisory feeds, and database ledgers.</span>
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: 'var(--space-6)' }}>
        {services.map((svc) => {
          const Icon = svc.icon;
          return (
            <Card key={svc.name}>
              <div className="flex-between" style={{ marginBottom: 'var(--space-3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--color-primary-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
                    <Icon size={16} />
                  </div>
                  <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{svc.name}</h4>
                </div>
                <Badge variant="success">
                  <CheckCircle2 size={11} /> {svc.status}
                </Badge>
              </div>

              <div className="flex-between" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', paddingTop: 'var(--space-2)', borderTop: '1px solid var(--color-border)' }}>
                <span>Latency: <strong style={{ color: 'var(--color-text)' }}>{svc.latency}</strong></span>
                <span>30-Day Uptime: <strong style={{ color: 'var(--color-primary)' }}>{svc.uptime}</strong></span>
              </div>
            </Card>
          );
        })}
      </div>
    </PageShell>
  );
};

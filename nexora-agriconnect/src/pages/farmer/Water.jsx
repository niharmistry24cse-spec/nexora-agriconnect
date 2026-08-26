import React, { useState } from 'react';
import { Droplet, Calendar, Plus, Clock, AlertCircle } from 'lucide-react';
import { PageShell } from '../../components/layout/PageShell';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { VoiceButton } from '../../components/ui/VoiceButton';
import { useApp } from '../../context/AppContext';

export const FarmerWater = () => {
  const { waterRequests, showToast } = useApp();
  const [isRequesting, setIsRequesting] = useState(false);

  return (
    <PageShell title="Water & Irrigation">
      <div className="page-header">
        <div className="page-title-group">
          <div className="page-title">
            <span>Water & Irrigation</span>
            <VoiceButton textToRead="Water and Irrigation. Manage canal water turns, borewell permits, and allocation requests." />
          </div>
          <span className="page-subtitle">Manage canal water turns, borewell permits, and allocation requests.</span>
        </div>

        <div className="page-actions">
          <Button
            variant="primary"
            icon={Plus}
            onClick={() => showToast('New Water Allocation Request form opened', 'info')}
          >
            Request Water Allocation
          </Button>
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: 'var(--space-6)' }}>
        <Card title="Upcoming Canal Water Turn" icon={Calendar}>
          <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '4px' }}>
            Tuesday, 06:00 AM
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-3)' }}>
            Duration: 6 Hours · Outflow: Sirhind Canal Distributary #4
          </div>
          <Badge variant="success">Scheduled & Verified by Canal Officer</Badge>
        </Card>

        <Card title="Groundwater Table Index" icon={Droplet}>
          <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-secondary)', marginBottom: '4px' }}>
            Safe Depth: 24.2m
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-3)' }}>
            Pratappur Block Assessment: Moderate recharge rate
          </div>
          <Badge variant="info">Central Ground Water Board (CGWB)</Badge>
        </Card>
      </div>

      <Card title="Water Allocation Request History">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {waterRequests.map((req) => (
            <div key={req.id} className="flex-between" style={{ padding: 'var(--space-3)', backgroundColor: 'var(--color-surface-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>
                  {req.source} ({req.id})
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                  {req.volumeRequested} · {req.submittedDate}
                </div>
                {req.reason && (
                  <div style={{ fontSize: '11px', color: 'var(--color-danger)', marginTop: '4px' }}>
                    Reason: {req.reason}
                  </div>
                )}
              </div>
              <Badge variant={req.statusVariant || 'info'}>{req.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </PageShell>
  );
};

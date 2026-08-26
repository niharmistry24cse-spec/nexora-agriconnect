import React from 'react';
import { FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { PageShell } from '../../components/layout/PageShell';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { VoiceButton } from '../../components/ui/VoiceButton';
import { useApp } from '../../context/AppContext';

export const FarmerSchemes = () => {
  const { schemes, showToast } = useApp();

  return (
    <PageShell title="Government Schemes">
      <div className="page-header">
        <div className="page-title-group">
          <div className="page-title">
            <span>Government Schemes</span>
            <VoiceButton textToRead="Government Schemes. Central and State agricultural subsidy programs tailored to your farm profile." />
          </div>
          <span className="page-subtitle">Central and State subsidy programs tailored to your registered land profile.</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {schemes.map((scheme) => (
          <Card key={scheme.id}>
            <div className="flex-between" style={{ marginBottom: 'var(--space-2)' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-muted)' }}>{scheme.category}</span>
                <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, marginTop: '2px' }}>{scheme.name}</h3>
              </div>
              <Badge variant={scheme.statusVariant || 'success'}>{scheme.status}</Badge>
            </div>

            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-3)' }}>
              {scheme.description}
            </p>

            <div className="flex-between" style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-3)', fontSize: 'var(--text-xs)' }}>
              <div>
                <span style={{ color: 'var(--color-text-muted)' }}>Benefit: </span>
                <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{scheme.benefit}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => showToast(`Opening scheme portal for ${scheme.name}`, 'info')}
              >
                View Scheme Details
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </PageShell>
  );
};

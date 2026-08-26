import React from 'react';
import { Droplets, Share2, Bug, Sparkles, Filter, AlertTriangle, Calendar, Languages } from 'lucide-react';
import { PageShell } from '../../components/layout/PageShell';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { VoiceButton } from '../../components/ui/VoiceButton';
import { useApp } from '../../context/AppContext';

export const FarmerAdvisories = () => {
  const { advisories, showToast, openTranslator, t } = useApp();
  const current = advisories.current;

  return (
    <PageShell title={t('Advisories', 'Advisories')} simplifiedTopbar={true} contentMaxWidth="880px">
      <div className="page-header" style={{ marginBottom: 'var(--space-4)' }}>
        <div className="page-title-group">
          <div className="page-title">
            <span>{t('Current Advisory', 'Current Advisory')}</span>
            <VoiceButton textToRead={`Current Advisory: ${current.title}. ${current.body}`} />
          </div>
          <span className="page-subtitle">{t('Timely guidance for your farm.', 'Timely guidance for your farm.')}</span>
        </div>
      </div>

      {/* Featured Advisory Card */}
      <div style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-card)',
        marginBottom: 'var(--space-6)'
      }}>
        {/* Cracked Earth Image Banner with Overlaid Badge and Title */}
        <div style={{
          position: 'relative',
          height: '200px',
          backgroundImage: `url(${current.heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 'var(--space-5)'
        }}>
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.45)' }} />

          <div style={{ position: 'relative', zIndex: 2 }}>
            <Badge variant="solid-danger">
              <AlertTriangle size={12} /> {current.badge}
            </Badge>
          </div>

          <div style={{ position: 'relative', zIndex: 2 }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#fff', textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}>
              {current.title}
            </h2>
          </div>
        </div>

        {/* Advisory Body & Actions */}
        <div style={{ padding: 'var(--space-5)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-3)' }}>
            <Calendar size={14} />
            <span>{current.issuedDate} · Source: {current.sourceAuthority}</span>
          </div>

          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text)', lineHeight: 1.5, marginBottom: 'var(--space-5)' }}>
            {current.body}
          </p>

          <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
            <Button
              variant="primary"
              icon={Droplets}
              onClick={() => showToast('Irrigation event logged to farm activity ledger', 'success')}
            >
              Log Irrigation
            </Button>
            <Button
              variant="outline"
              icon={Languages}
              onClick={() => openTranslator(`${current.title}: ${current.body}`)}
            >
              Translate Advisory
            </Button>
            <Button
              variant="outline"
              icon={Share2}
              onClick={() => showToast('Advisory link copied to clipboard', 'info')}
            >
              Share Advisory
            </Button>
          </div>
        </div>
      </div>

      {/* Past Advisories Section */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <div className="flex-between" style={{ marginBottom: 'var(--space-4)' }}>
          <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 700 }}>Past Advisories</h3>
          <Button
            variant="outline"
            size="sm"
            icon={Filter}
            onClick={() => showToast('Filtering past advisories...', 'info')}
          >
            Filter
          </Button>
        </div>

        <div className="grid-2">
          {advisories.past.map((adv) => (
            <Card key={adv.id}>
              <div className="flex-between" style={{ marginBottom: '6px' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'var(--color-primary)',
                  backgroundColor: 'var(--color-primary-soft)',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-pill)'
                }}>
                  {adv.category === 'Pest Control' ? <Bug size={11} /> : <Sparkles size={11} />}
                  {adv.category}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                  {adv.timeAgo}
                </span>
              </div>

              <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, marginBottom: '4px', color: 'var(--color-text)' }}>
                {adv.title}
              </h4>

              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', lineHeight: 1.4, margin: 0 }}>
                {adv.body}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </PageShell>
  );
};

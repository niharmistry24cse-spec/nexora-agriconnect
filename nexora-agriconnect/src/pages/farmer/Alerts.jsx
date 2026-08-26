import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  Check,
  Settings,
  Bug,
  CloudRain,
  Sun,
  TrendingUp,
  Clock,
  CheckCheck
} from 'lucide-react';
import { PageShell } from '../../components/layout/PageShell';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { VoiceButton } from '../../components/ui/VoiceButton';
import { useApp } from '../../context/AppContext';

export const FarmerAlerts = () => {
  const { alerts, markAlertRead, markAllAlertsRead, showToast } = useApp();
  const navigate = useNavigate();

  return (
    <PageShell title="Alert Center" contentMaxWidth="960px">
      <div className="page-header" style={{ marginBottom: 'var(--space-4)' }}>
        <div className="page-title-group">
          <div className="page-title">
            <span>Alerts</span>
            <VoiceButton textToRead="Unified Alert Center. Stay updated with critical farm, weather, and market alerts." />
          </div>
          <span className="page-subtitle">Stay updated with critical farm, weather, and market alerts.</span>
        </div>

        <div className="page-actions">
          <Button
            variant="secondary"
            size="sm"
            icon={CheckCheck}
            onClick={markAllAlertsRead}
          >
            Mark All Read
          </Button>
          <button
            type="button"
            onClick={() => showToast('Opening notification settings...', 'info')}
            className="topbar-icon-btn"
            title="Notification Settings"
          >
            <Settings size={18} />
          </button>
        </div>
      </div>

      {/* Priority Alerts Section */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: 'var(--color-danger)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-3)' }}>
          <AlertTriangle size={14} />
          <span>PRIORITY ALERTS</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {alerts.priorityAlerts.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderLeft: '4px solid var(--color-danger)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-4) var(--space-5)',
                boxShadow: 'var(--shadow-card)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 'var(--space-4)',
                opacity: item.read ? 0.75 : 1
              }}
            >
              <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--color-danger-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-danger)', flexShrink: 0 }}>
                  <Bug size={18} />
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <Badge variant="danger">{item.category}</Badge>
                    <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{item.timeAgo}</span>
                    {item.sourceAuthority && (
                      <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>· {item.sourceAuthority}</span>
                    )}
                  </div>

                  <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--color-text)', marginBottom: '2px' }}>
                    {item.headline}
                  </h3>

                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', margin: 0 }}>
                    {item.body}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px', flexShrink: 0 }}>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate('/farmer/advisories')}
                >
                  View Advisory
                </Button>

                {!item.read && (
                  <button
                    type="button"
                    onClick={() => markAlertRead(item.id)}
                    style={{ background: 'none', border: 'none', fontSize: '11px', color: 'var(--color-text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '2px' }}
                  >
                    <Check size={12} /> Mark Read
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two-Column Row: Weather Updates & Market Shifts */}
      <div className="grid-2" style={{ alignItems: 'start' }}>
        {/* Weather Updates Column */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-3)' }}>
            <CloudRain size={14} />
            <span>WEATHER UPDATES</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {alerts.weatherUpdates.map((item) => (
              <Card key={item.id} style={{ opacity: item.resolved ? 0.65 : 1 }}>
                <div className="flex-between" style={{ marginBottom: '4px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{item.time}</span>
                  {item.read && (
                    <span style={{ fontSize: '11px', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '2px', fontWeight: 600 }}>
                      <Check size={12} /> Read
                    </span>
                  )}
                </div>

                <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, textDecoration: item.resolved ? 'line-through' : 'none', color: 'var(--color-text)' }}>
                  {item.headline}
                </h4>

                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: '4px', margin: 0 }}>
                  {item.body}
                </p>

                <div style={{ fontSize: '10px', color: 'var(--color-text-subtle)', marginTop: '6px' }}>
                  Source: {item.sourceAuthority}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Market Shifts Column */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-3)' }}>
            <TrendingUp size={14} />
            <span>MARKET SHIFTS</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {alerts.marketShifts.map((item) => (
              <Card key={item.id}>
                <div className="flex-between" style={{ marginBottom: '4px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{item.market} · {item.timeAgo}</span>
                  {item.read && (
                    <span style={{ fontSize: '11px', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '2px', fontWeight: 600 }}>
                      <Check size={12} /> Read
                    </span>
                  )}
                </div>

                <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--color-primary)' }}>
                  {item.headline}
                </h4>

                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: '4px', margin: 0 }}>
                  {item.body}
                </p>

                <div style={{ marginTop: 'var(--space-3)', display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/farmer/market')}
                  >
                    View Market
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
};

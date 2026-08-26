import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  ShieldAlert,
  Server,
  Activity,
  ArrowRight,
  TrendingUp,
  ShoppingCart
} from 'lucide-react';
import { PageShell } from '../../components/layout/PageShell';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { VoiceButton } from '../../components/ui/VoiceButton';

export const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <PageShell title="Admin Dashboard">
      <div className="page-header">
        <div className="page-title-group">
          <div className="page-title">
            <span>Admin Platform Dashboard</span>
            <VoiceButton textToRead="Admin Platform Dashboard. System status, active user statistics, and platform operations overview." />
          </div>
          <span className="page-subtitle">Oversee platform health, access control, and user registries.</span>
        </div>
      </div>

      <div className="grid-3" style={{ marginBottom: 'var(--space-6)' }}>
        <Card title="Total Registered Users" icon={Users}>
          <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--color-primary)' }}>156</div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: '4px', marginBottom: 'var(--space-3)' }}>
            118 Farmers · 32 Buyers · 6 Authorities
          </div>
          <Button variant="primary" size="sm" fullWidth onClick={() => navigate('/admin/users')}>
            Manage Users →
          </Button>
        </Card>

        <Card title="Marketplace Listings" icon={ShoppingCart}>
          <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--color-secondary)' }}>48</div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: '4px', marginBottom: 'var(--space-3)' }}>
            46 Active · 2 Under Review
          </div>
          <Button variant="secondary" size="sm" fullWidth onClick={() => navigate('/admin/moderation')}>
            Moderate Listings →
          </Button>
        </Card>

        <Card title="System Performance" icon={Server}>
          <div style={{ fontSize: '32px', fontWeight: 700, color: '#155724' }}>99.98%</div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: '4px', marginBottom: 'var(--space-3)' }}>
            Latency: 42ms · Zero active outages
          </div>
          <Button variant="outline" size="sm" fullWidth onClick={() => navigate('/admin/monitoring')}>
            View Monitoring →
          </Button>
        </Card>
      </div>
    </PageShell>
  );
};

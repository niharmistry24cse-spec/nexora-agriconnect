import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BadgeCheck,
  Droplet,
  TrendingUp,
  History,
  ExternalLink,
  FileText,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { PageShell } from '../../components/layout/PageShell';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Table } from '../../components/ui/Table';
import { VoiceButton } from '../../components/ui/VoiceButton';
import { useApp } from '../../context/AppContext';

export const AuthorityDashboard = () => {
  const { authorityQueue, showToast } = useApp();
  const navigate = useNavigate();

  const columns = [
    {
      key: 'id',
      header: 'ID',
      render: (row) => <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{row.id}</span>
    },
    {
      key: 'type',
      header: 'Type',
      render: (row) => <span>{row.type}</span>
    },
    {
      key: 'applicant',
      header: 'Applicant',
      render: (row) => <span style={{ fontWeight: 500 }}>{row.applicant}</span>
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => {
        let variant = 'neutral';
        if (row.status === 'Approved') variant = 'solid-success';
        else if (row.status === 'Denied') variant = 'solid-danger';
        else if (row.status === 'Processed') variant = 'solid-warning';
        return <Badge variant={variant}>{row.status}</Badge>;
      }
    },
    {
      key: 'actionDate',
      header: 'Action Date',
      align: 'right',
      render: (row) => <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-xs)' }}>{row.actionDate}</span>
    }
  ];

  return (
    <PageShell title="Authority Dashboard Overview">
      {/* Daily Queue Review Header */}
      <div className="page-header" style={{ marginBottom: 'var(--space-5)' }}>
        <div className="page-title-group">
          <div className="page-title">
            <span>Daily Queue Review</span>
            <VoiceButton textToRead="Authority Daily Queue Review for Tuesday, October 24th, 2024. 142 pending certifications and 38 water allocation requests." />
          </div>
          <span className="page-subtitle">Tuesday, October 24th, 2024</span>
        </div>
        <div className="page-actions">
          <Button
            variant="secondary"
            icon={FileText}
            onClick={() => showToast('Daily Authority Compliance Report generated (PDF).', 'success')}
          >
            Generate Report
          </Button>
        </div>
      </div>

      {/* Three Metric Cards */}
      <div className="grid-3" style={{ marginBottom: 'var(--space-6)' }}>
        {/* Pending Certifications Card */}
        <Card
          title="Pending Certifications"
          icon={BadgeCheck}
          enableVoice
          voiceText="Pending Certifications: 142 applications awaiting approval."
        >
          <div style={{ textAlign: 'center', padding: 'var(--space-2) 0' }}>
            <div style={{ fontSize: '38px', fontWeight: 700, color: 'var(--color-primary)', lineHeight: 1.1 }}>
              {authorityQueue.stats.pendingCertifications}
            </div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: '4px', marginBottom: 'var(--space-4)' }}>
              Awaiting Approval
            </p>
            <Button
              variant="primary"
              fullWidth
              iconRight={ArrowRight}
              onClick={() => navigate('/authority/certifications/DOC-8892-REV')}
            >
              Review Batch
            </Button>
          </div>
        </Card>

        {/* Water Requests Card */}
        <Card
          title="Water Requests"
          icon={Droplet}
          enableVoice
          voiceText="Water Requests: 38 critical allocation needs across canal blocks."
        >
          <div style={{ textAlign: 'center', padding: 'var(--space-2) 0' }}>
            <div style={{ fontSize: '38px', fontWeight: 700, color: 'var(--color-secondary)', lineHeight: 1.1 }}>
              {authorityQueue.stats.waterRequests}
            </div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: '4px', marginBottom: 'var(--space-4)' }}>
              Critical Allocation Needs
            </p>
            <Button
              variant="secondary"
              fullWidth
              iconRight={ArrowRight}
              onClick={() => navigate('/authority/water-requests')}
            >
              Assess Allocations
            </Button>
          </div>
        </Card>

        {/* System Metrics Card */}
        <Card
          title="System Metrics"
          icon={TrendingUp}
          enableVoice
          voiceText="System Metrics: Average review time 2.4 days. Scheme uptake up 12 percent this week. 3 critical active alerts."
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '4px' }}>
            <div className="flex-between" style={{ padding: '8px 10px', backgroundColor: 'var(--color-surface-subtle)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Avg Review Time</span>
              <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>{authorityQueue.stats.avgReviewTime}</span>
            </div>

            <div className="flex-between" style={{ padding: '8px 10px', backgroundColor: 'var(--color-surface-subtle)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Scheme Uptake</span>
              <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-primary)' }}>{authorityQueue.stats.schemeUptake}</span>
            </div>

            <div className="flex-between" style={{ padding: '8px 10px', backgroundColor: 'var(--color-surface-subtle)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Active Alerts</span>
              <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-danger)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <AlertTriangle size={12} /> {authorityQueue.stats.activeAlerts}
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Processed Items Table */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <div className="flex-between" style={{ marginBottom: 'var(--space-3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <History size={18} color="var(--color-text)" />
            <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 600 }}>Recent Processed Items</h3>
          </div>
          <Link
            to="/authority/audit-log"
            style={{ fontSize: 'var(--text-xs)', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}
          >
            View All <ExternalLink size={12} />
          </Link>
        </div>

        <Table
          columns={columns}
          data={authorityQueue.recentItems}
          keyField="id"
        />
      </div>
    </PageShell>
  );
};

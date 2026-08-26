import React from 'react';
import { FileText, Plus, CheckCircle, Clock } from 'lucide-react';
import { PageShell } from '../../components/layout/PageShell';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Table } from '../../components/ui/Table';
import { VoiceButton } from '../../components/ui/VoiceButton';
import { useApp } from '../../context/AppContext';

export const AuthoritySchemeManagement = () => {
  const { schemes, showToast } = useApp();

  const columns = [
    { key: 'name', header: 'Scheme Title', render: (r) => <span style={{ fontWeight: 600 }}>{r.name}</span> },
    { key: 'category', header: 'Category' },
    { key: 'benefit', header: 'Disbursal Amount' },
    { key: 'status', header: 'System Status', render: (r) => <Badge variant={r.statusVariant}>{r.status}</Badge> },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (r) => (
        <Button variant="outline" size="sm" onClick={() => showToast(`Reviewing disbursals for ${r.name}`, 'info')}>
          Manage Disbursals
        </Button>
      )
    }
  ];

  return (
    <PageShell title="Scheme Management">
      <div className="page-header">
        <div className="page-title-group">
          <div className="page-title">
            <span>Scheme Management</span>
            <VoiceButton textToRead="Authority Scheme Management. Manage farmer subsidy disbursals and eligibility criteria." />
          </div>
          <span className="page-subtitle">Manage farmer subsidy disbursals, batch allocations, and eligibility criteria.</span>
        </div>

        <div className="page-actions">
          <Button
            variant="secondary"
            icon={Plus}
            onClick={() => showToast('New Government Scheme creation dialog', 'info')}
          >
            Create New Scheme
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        data={schemes}
        keyField="id"
      />
    </PageShell>
  );
};

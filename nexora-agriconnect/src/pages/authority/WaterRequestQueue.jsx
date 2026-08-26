import React from 'react';
import { Droplet, Check, X, Filter } from 'lucide-react';
import { PageShell } from '../../components/layout/PageShell';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Table } from '../../components/ui/Table';
import { VoiceButton } from '../../components/ui/VoiceButton';
import { useApp } from '../../context/AppContext';

export const AuthorityWaterQueue = () => {
  const { waterRequests, showToast } = useApp();

  const columns = [
    { key: 'id', header: 'Request ID', render: (r) => <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{r.id}</span> },
    { key: 'applicant', header: 'Applicant / Farm', render: (r) => <span style={{ fontWeight: 600 }}>{r.applicant}</span> },
    { key: 'source', header: 'Water Source' },
    { key: 'district', header: 'District' },
    { key: 'volumeRequested', header: 'Requested Volume' },
    { key: 'status', header: 'Status', render: (r) => <Badge variant={r.statusVariant}>{r.status}</Badge> },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (r) => (
        <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
          <Button variant="primary" size="sm" onClick={() => showToast(`Approved water allocation ${r.id}`, 'success')}>
            Approve
          </Button>
          <Button variant="outline-danger" size="sm" onClick={() => showToast(`Rejected water allocation ${r.id}`, 'info')}>
            Reject
          </Button>
        </div>
      )
    }
  ];

  return (
    <PageShell title="Water Request Queue">
      <div className="page-header">
        <div className="page-title-group">
          <div className="page-title">
            <span>Water Allocation Review Queue</span>
            <VoiceButton textToRead="Water Request Queue. Assess borewell permits, canal turns, and deep ground extraction limits." />
          </div>
          <span className="page-subtitle">Assess borewell permits, canal turns, and deep ground extraction limits per CGWB rules.</span>
        </div>
      </div>

      <Table
        columns={columns}
        data={waterRequests}
        keyField="id"
      />
    </PageShell>
  );
};

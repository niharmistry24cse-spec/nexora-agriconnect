import React from 'react';
import { History, Download, ShieldCheck } from 'lucide-react';
import { PageShell } from '../../components/layout/PageShell';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Table } from '../../components/ui/Table';
import { VoiceButton } from '../../components/ui/VoiceButton';
import { useApp } from '../../context/AppContext';

export const AuthorityAuditLog = () => {
  const { authorityQueue, showToast } = useApp();

  const auditEvents = [
    ...authorityQueue.recentItems,
    {
      id: 'AUD-9912',
      type: 'Soil Sample Verification',
      applicant: 'PAU Soil Test Lab #81',
      status: 'Approved',
      statusVariant: 'success',
      actionDate: 'Oct 22, 11:20 AM'
    },
    {
      id: 'AUD-9908',
      type: 'MSP Procurement Batch #10',
      applicant: 'FCI Depot Khanna',
      status: 'Processed',
      statusVariant: 'warning',
      actionDate: 'Oct 21, 15:40 PM'
    }
  ];

  const columns = [
    { key: 'id', header: 'Audit Reference', render: (r) => <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{r.id}</span> },
    { key: 'type', header: 'Compliance Event' },
    { key: 'applicant', header: 'Entity Involved', render: (r) => <span style={{ fontWeight: 600 }}>{r.applicant}</span> },
    { key: 'status', header: 'Outcome', render: (r) => <Badge variant={r.statusVariant}>{r.status}</Badge> },
    { key: 'actionDate', header: 'Timestamp', align: 'right' }
  ];

  return (
    <PageShell title="Audit Log">
      <div className="page-header">
        <div className="page-title-group">
          <div className="page-title">
            <span>Compliance Audit Log</span>
            <VoiceButton textToRead="Compliance Audit Log. Complete verifiable record of all certification reviews, water allocation permits, and government decisions." />
          </div>
          <span className="page-subtitle">Verifiable record of certification approvals, rejections, and water allocation permits.</span>
        </div>

        <div className="page-actions">
          <Button
            variant="outline"
            icon={Download}
            onClick={() => showToast('Exporting compliance audit trail CSV...', 'success')}
          >
            Export Log
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        data={auditEvents}
        keyField="id"
      />
    </PageShell>
  );
};

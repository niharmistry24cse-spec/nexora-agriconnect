import React from 'react';
import { Newspaper, Plus, Edit2, Trash2 } from 'lucide-react';
import { PageShell } from '../../components/layout/PageShell';
import { Table } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { VoiceButton } from '../../components/ui/VoiceButton';
import { useApp } from '../../context/AppContext';

export const ContentManagement = () => {
  const { news, showToast } = useApp();

  const columns = [
    { key: 'headline', header: 'Article / Notice Title', render: (n) => <span style={{ fontWeight: 600 }}>{n.headline}</span> },
    { key: 'category', header: 'Category', render: (n) => <Badge variant={n.badgeVariant || 'info'}>{n.category}</Badge> },
    { key: 'sourceAuthority', header: 'Source' },
    { key: 'timeAgo', header: 'Published' },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (n) => (
        <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
          <Button variant="outline" size="sm" onClick={() => showToast(`Editing article: ${n.headline}`, 'info')}>
            Edit
          </Button>
        </div>
      )
    }
  ];

  return (
    <PageShell title="Content Management">
      <div className="page-header">
        <div className="page-title-group">
          <div className="page-title">
            <span>Content Management</span>
            <VoiceButton textToRead="Content Management. Publish agricultural bulletins, government directives, and extension updates." />
          </div>
          <span className="page-subtitle">Publish agricultural bulletins, ministry directives, and regional news.</span>
        </div>

        <div className="page-actions">
          <Button
            variant="primary"
            icon={Plus}
            onClick={() => showToast('New Article creation dialog opened', 'info')}
          >
            New Article
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        data={news}
        keyField="id"
      />
    </PageShell>
  );
};

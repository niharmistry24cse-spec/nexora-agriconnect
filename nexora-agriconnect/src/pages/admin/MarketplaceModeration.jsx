import React from 'react';
import { ShoppingCart, Check, X, ShieldAlert } from 'lucide-react';
import { PageShell } from '../../components/layout/PageShell';
import { Table } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { VoiceButton } from '../../components/ui/VoiceButton';
import { useApp } from '../../context/AppContext';

export const MarketplaceModeration = () => {
  const { products, showToast } = useApp();

  const columns = [
    {
      key: 'name',
      header: 'Product Listing',
      render: (p) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src={p.image} alt={p.name} style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />
          <div>
            <div style={{ fontWeight: 600 }}>{p.name}</div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{p.category} · {p.currency}{p.price}</div>
          </div>
        </div>
      )
    },
    { key: 'seller', header: 'Seller', render: (p) => <span>{p.seller}</span> },
    {
      key: 'certified',
      header: 'Certification Tag',
      render: (p) => <Badge variant={p.isCertified ? 'success' : 'neutral'}>{p.isCertified ? 'Verified' : 'Uncertified'}</Badge>
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (p) => (
        <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
          <Button variant="outline" size="sm" onClick={() => showToast(`Listing "${p.name}" verified`, 'success')}>
            Approve
          </Button>
          <Button variant="outline-danger" size="sm" onClick={() => showToast(`Listing "${p.name}" flagged for review`, 'info')}>
            Flag
          </Button>
        </div>
      )
    }
  ];

  return (
    <PageShell title="Marketplace Moderation">
      <div className="page-header">
        <div className="page-title-group">
          <div className="page-title">
            <span>Marketplace Moderation</span>
            <VoiceButton textToRead="Marketplace Moderation. Review agricultural product listings and verified seller credentials." />
          </div>
          <span className="page-subtitle">Review agricultural produce listings, organic claim verifications, and pricing integrity.</span>
        </div>
      </div>

      <Table
        columns={columns}
        data={products}
        keyField="id"
      />
    </PageShell>
  );
};

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, CheckCircle2, Bookmark, ExternalLink } from 'lucide-react';
import { PageShell } from '../../components/layout/PageShell';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Tabs } from '../../components/ui/Tabs';
import { VoiceButton } from '../../components/ui/VoiceButton';
import { EmptyState } from '../../components/ui/EmptyState';
import { useApp } from '../../context/AppContext';

export const BuyerMarketplace = () => {
  const { products, orders, createOrder, showToast } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('browse');

  const tabs = [
    { id: 'browse', label: 'Browse Products' },
    { id: 'orders', label: 'My Orders', count: orders.length },
    { id: 'saved', label: 'Saved Items', count: 0 }
  ];

  const handleOrderProduct = (prod) => {
    const newOrder = createOrder(prod, 1);
    navigate(`/buyer/orders/${newOrder.id}`);
  };

  return (
    <PageShell title="Buyer Marketplace">
      <div className="page-header" style={{ marginBottom: 'var(--space-3)' }}>
        <div className="page-title-group">
          <div className="page-title">
            <span>Buyer Marketplace</span>
            <VoiceButton textToRead="Buyer Marketplace. Source verified agricultural products directly from trusted stewards." />
          </div>
          <span className="page-subtitle">Source verified agricultural products directly from trusted stewards.</span>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* Tab: Browse Products */}
      {activeTab === 'browse' && (
        <div className="grid-2">
          {products.map((prod) => (
            <div
              key={prod.id}
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-card)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Image & Badges */}
              <div style={{ position: 'relative', height: '180px', width: '100%', overflow: 'hidden' }}>
                <img
                  src={prod.image}
                  alt={prod.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                  {prod.isCertified ? (
                    <Badge variant="solid-success">
                      <CheckCircle2 size={12} strokeWidth={2.5} /> {prod.certType || 'Certified Organic'}
                    </Badge>
                  ) : prod.statusTag ? (
                    <Badge variant="neutral">
                      {prod.statusTag}
                    </Badge>
                  ) : null}
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--color-text)', marginBottom: '4px' }}>
                    {prod.name}
                  </h3>

                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', lineHeight: 1.4, marginBottom: 'var(--space-2)' }}>
                    {prod.description}
                  </p>

                  <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: 'var(--space-3)' }}>
                    Freshness: {prod.lastUpdated}
                  </div>
                </div>

                <div className="flex-between" style={{ paddingTop: 'var(--space-3)', borderTop: '1px solid var(--color-border)' }}>
                  <div>
                    <div style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--color-text)' }}>
                      {prod.currency}{prod.price.toLocaleString()} <span style={{ fontSize: 'var(--text-xs)', fontWeight: 400, color: 'var(--color-text-muted)' }}>/ {prod.priceUnit || prod.unit || 'Quintal'}</span>
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                      Qty: {prod.availableQty || 50}Q Available
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    icon={ShoppingCart}
                    onClick={() => handleOrderProduct(prod)}
                  >
                    Order Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: My Orders */}
      {activeTab === 'orders' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {orders.map((ord) => (
            <Card key={ord.id}>
              <div className="flex-between">
                <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
                  <img src={ord.productThumbnail} alt={ord.productName} style={{ width: '56px', height: '56px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                  <div>
                    <h4 style={{ fontSize: 'var(--text-base)' }}>{ord.productName}</h4>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                      {ord.orderNumber} · {ord.quantity} · ₹{ord.totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <Badge variant={ord.statusVariant || 'info'}>{ord.status}</Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/buyer/orders/${ord.id}`)}
                  >
                    Track Order
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Tab: Saved Items */}
      {activeTab === 'saved' && (
        <EmptyState
          icon={Bookmark}
          title="No saved items yet"
          description="Bookmark products from the browse tab to quickly reorder or monitor price changes."
          actionLabel="Browse Products"
          onAction={() => setActiveTab('browse')}
        />
      )}
    </PageShell>
  );
};

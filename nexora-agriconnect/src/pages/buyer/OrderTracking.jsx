import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Truck, Package, Phone, FileText, CheckCircle2, ChevronRight, Download, X } from 'lucide-react';
import { PageShell } from '../../components/layout/PageShell';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Stepper } from '../../components/ui/Stepper';
import { VoiceButton } from '../../components/ui/VoiceButton';
import { useApp } from '../../context/AppContext';

export const OrderTracking = () => {
  const { id } = useParams();
  const { orders, showToast } = useApp();
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const order = orders.find(o => o.id === id) || orders[0];

  return (
    <PageShell title="Order Tracking">
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-3)' }}>
        <Link to="/buyer/marketplace">Marketplace</Link>
        <ChevronRight size={12} />
        <span>Order Tracking</span>
      </div>

      <div className="page-header" style={{ marginBottom: 'var(--space-5)' }}>
        <div className="page-title-group">
          <div className="page-title">
            <span>Order Tracking</span>
            <VoiceButton textToRead={`Order Tracking for Order ${order.orderNumber}. Current status: ${order.status}. Delivery in progress.`} />
          </div>
          <span className="page-subtitle">Order {order.orderNumber}</span>
        </div>
      </div>

      {/* Two-card row */}
      <div className="grid-2" style={{ alignItems: 'start' }}>
        {/* Card 1: Delivery Status */}
        <Card
          title="Delivery Status"
          icon={Truck}
          action={<Badge variant={order.statusVariant || 'info'}>{order.status}</Badge>}
          enableVoice
          voiceText={`Delivery status: ${order.status}. Steps: Requested on Oct 12, Confirmed on Oct 12, In Transit estimated Oct 14, Completed Pending.`}
        >
          <Stepper steps={order.steps} />
          <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-3)', backgroundColor: 'var(--color-surface-subtle)', borderRadius: 'var(--radius-sm)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
            🚚 Courier Partner: Kisan Express Logistics (Tracking ID: KEL-9821882)
          </div>
        </Card>

        {/* Card 2: Order Details */}
        <Card
          title="Order Details"
          icon={Package}
          enableVoice
          voiceText={`Order details: ${order.productName}, Quantity ${order.quantity}, Total Price ₹${order.totalPrice}. Seller ${order.sellerName}, ${order.sellerLocation}.`}
        >
          <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--color-border)', flexShrink: 0 }}>
              <img src={order.productThumbnail} alt={order.productName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}>{order.productName}</h4>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                Qty: {order.quantity}
              </div>
              <div style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--color-primary)', marginTop: '4px' }}>
                ₹{order.totalPrice.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Seller Info Sub-row */}
          <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--color-surface-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                SELLER INFO
              </div>
              <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)', marginTop: '2px' }}>
                {order.sellerName}
              </div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                {order.sellerLocation}
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              icon={Phone}
              onClick={() => showToast(`Calling seller: ${order.sellerPhone}`, 'info')}
            >
              Contact
            </Button>
          </div>

          {/* Full-width View Invoice CTA */}
          <Button
            variant="primary"
            fullWidth
            icon={FileText}
            onClick={() => setShowInvoiceModal(true)}
          >
            🧾 View Invoice
          </Button>
        </Card>
      </div>

      {/* Invoice Modal Simulation */}
      {showInvoiceModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: 'var(--space-4)'
        }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: 'var(--radius-lg)',
            width: '100%',
            maxWidth: '520px',
            padding: 'var(--space-6)',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div className="flex-between" style={{ marginBottom: 'var(--space-4)', borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-3)' }}>
              <div>
                <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>Tax Invoice</h3>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{order.orderNumber} · {order.invoice.date}</span>
              </div>
              <button
                type="button"
                onClick={() => setShowInvoiceModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ fontSize: 'var(--text-sm)', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: 'var(--space-5)' }}>
              <div className="flex-between">
                <span style={{ color: 'var(--color-text-muted)' }}>GSTIN / Tax ID:</span>
                <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{order.invoice.taxId}</span>
              </div>
              <div className="flex-between">
                <span style={{ color: 'var(--color-text-muted)' }}>Item Subtotal:</span>
                <span>₹{order.invoice.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex-between">
                <span style={{ color: 'var(--color-text-muted)' }}>Agricultural Delivery Fee:</span>
                <span>₹{order.invoice.deliveryFee.toLocaleString()}</span>
              </div>
              <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: '4px 0' }} />
              <div className="flex-between" style={{ fontWeight: 700, fontSize: 'var(--text-md)' }}>
                <span>Total Paid:</span>
                <span style={{ color: 'var(--color-primary)' }}>₹{order.invoice.total.toLocaleString()}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <Button variant="outline" onClick={() => setShowInvoiceModal(false)}>Close</Button>
              <Button
                variant="primary"
                icon={Download}
                onClick={() => {
                  showToast('Invoice PDF downloaded', 'success');
                  setShowInvoiceModal(false);
                }}
              >
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
};

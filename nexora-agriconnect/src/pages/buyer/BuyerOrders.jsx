import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ClipboardList, TrendingDown, Truck, CheckCircle2, Store,
  Search, Eye, FileText, Download, X, Phone,
  Calendar, Package, IndianRupee, Hash, CreditCard,
  ShoppingCart, Clock, BadgeCheck
} from 'lucide-react';
import { PageShell } from '../../components/layout/PageShell';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Tabs } from '../../components/ui/Tabs';
import { VoiceButton } from '../../components/ui/VoiceButton';
import { EmptyState } from '../../components/ui/EmptyState';
import { useApp } from '../../context/AppContext';

const MetricCard = ({ icon: Icon, label, value, sub, color }) => (
  <div style={{
    background: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--space-5)',
    boxShadow: 'var(--shadow-card)',
    display: 'flex',
    gap: 'var(--space-4)',
    alignItems: 'flex-start',
    flex: 1,
    minWidth: 0
  }}>
    <div style={{
      width: 44, height: 44, borderRadius: 'var(--radius-md)',
      background: `${color}18`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0
    }}>
      <Icon size={22} color={color} strokeWidth={2} />
    </div>
    <div style={{ minWidth: 0 }}>
      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>
        {label}
      </div>
      <div style={{ fontSize: '1.55rem', fontWeight: 800, color: 'var(--color-text)', lineHeight: 1.15 }}>
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: 2 }}>
          {sub}
        </div>
      )}
    </div>
  </div>
);

const InvoiceModal = ({ order, onClose, showToast }) => {
  if (!order) return null;
  return (
    <div style={{
      position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.55)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 10000, padding: 'var(--space-4)'
    }}>
      <div style={{
        backgroundColor: '#fff', borderRadius: 'var(--radius-xl)',
        width: '100%', maxWidth: '540px', boxShadow: '0 24px 48px rgba(0,0,0,0.2)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #1565C0 0%, #1976D2 100%)',
          padding: 'var(--space-5) var(--space-6)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'
        }}>
          <div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.65)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
              Buyer Tax Invoice / GST Receipt
            </div>
            <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 800, color: '#fff', margin: 0 }}>
              {order.invoice?.invoiceNo || order.orderNumber}
            </h3>
            <div style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>
              Order Date: {order.invoice?.date || order.orderDate}
            </div>
          </div>
          <button type="button" onClick={onClose} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: 'var(--space-5) var(--space-6)' }}>
          {/* Parties */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
            <div style={{ padding: 'var(--space-3)', background: 'var(--color-surface-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 6 }}>Buyer (You)</div>
              <div style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--color-text)' }}>AgriCorp Traders</div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: 2 }}>New Delhi Wholesale Mandi</div>
              <div style={{ fontSize: '10px', color: 'var(--color-text-muted)', fontFamily: 'monospace', marginTop: 4 }}>
                GSTIN: {order.invoice?.taxId || '—'}
              </div>
            </div>
            <div style={{ padding: 'var(--space-3)', background: 'var(--color-surface-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 6 }}>Seller / Farmer</div>
              <div style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--color-text)' }}>{order.sellerName}</div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: 2 }}>{order.sellerLocation}</div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: 2 }}>{order.sellerPhone}</div>
            </div>
          </div>

          {/* Line Items */}
          <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: 'var(--space-4)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '8px', padding: '8px 12px', background: '#1565C010', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
              <span>Description</span>
              <span style={{ textAlign: 'right', minWidth: 80 }}>Quantity</span>
              <span style={{ textAlign: 'right', minWidth: 90 }}>Amount</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '8px', padding: '10px 12px', borderTop: '1px solid var(--color-border)', fontSize: 'var(--text-sm)' }}>
              <span style={{ fontWeight: 500, color: 'var(--color-text)' }}>{order.productName}</span>
              <span style={{ textAlign: 'right', color: 'var(--color-text-muted)', minWidth: 80 }}>{order.quantity}</span>
              <span style={{ textAlign: 'right', fontWeight: 600, minWidth: 90 }}>₹{(order.invoice?.subtotal || order.totalPrice)?.toLocaleString()}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '8px', padding: '8px 12px', borderTop: '1px solid var(--color-border)', fontSize: 'var(--text-sm)' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Agricultural Delivery Fee</span>
              <span style={{ minWidth: 80 }}></span>
              <span style={{ textAlign: 'right', minWidth: 90 }}>₹{(order.invoice?.deliveryFee || 0).toLocaleString()}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '8px', padding: '10px 12px', borderTop: '2px solid var(--color-border)', background: 'var(--color-surface-subtle)' }}>
              <span style={{ fontWeight: 700, fontSize: 'var(--text-base)' }}>Total Paid</span>
              <span style={{ minWidth: 80 }}></span>
              <span style={{ textAlign: 'right', fontWeight: 800, fontSize: 'var(--text-md)', color: '#1565C0', minWidth: 90 }}>
                ₹{(order.invoice?.total || order.totalPrice)?.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Order Ref */}
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Hash size={13} />
            <span>Order Reference: <strong style={{ fontFamily: 'monospace' }}>{order.orderNumber}</strong></span>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button variant="outline" onClick={onClose}>Close</Button>
            <Button
              variant="primary"
              icon={Download}
              onClick={() => {
                showToast('Invoice PDF downloaded successfully', 'success');
                onClose();
              }}
            >
              Download PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const BuyerOrders = () => {
  const { orders, showToast } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const tabs = [
    { id: 'all', label: 'All Orders', count: orders.length },
    { id: 'transit', label: 'In Transit', count: orders.filter(o => o.status === 'In Transit' || o.status === 'Confirmed').length },
    { id: 'delivered', label: 'Delivered', count: orders.filter(o => o.status === 'Delivered').length },
  ];

  const filteredOrders = useMemo(() => {
    let result = orders;
    if (activeTab === 'transit') result = result.filter(o => o.status === 'In Transit' || o.status === 'Confirmed');
    else if (activeTab === 'delivered') result = result.filter(o => o.status === 'Delivered');

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(o =>
        o.productName?.toLowerCase().includes(q) ||
        o.sellerName?.toLowerCase().includes(q) ||
        o.orderNumber?.toLowerCase().includes(q) ||
        o.id?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [orders, activeTab, search]);

  // Metrics
  const totalSpend = orders.reduce((sum, o) => sum + (o.invoice?.total || o.totalPrice || 0), 0);
  const inTransitCount = orders.filter(o => o.status === 'In Transit' || o.status === 'Confirmed').length;
  const deliveredCount = orders.filter(o => o.status === 'Delivered').length;
  const uniqueSellers = new Set(orders.map(o => o.sellerName)).size;

  const getStatusVariant = (status) => {
    if (status === 'Delivered') return 'success';
    if (status === 'In Transit') return 'info';
    if (status === 'Confirmed') return 'warning';
    return 'neutral';
  };

  return (
    <PageShell title="Purchase Records">
      {/* Header */}
      <div className="page-header" style={{ marginBottom: 'var(--space-4)' }}>
        <div className="page-title-group">
          <div className="page-title">
            <span>Purchase Records</span>
            <VoiceButton textToRead={`Purchase Records. Total procurement spend ₹${totalSpend.toLocaleString()} across ${orders.length} orders. ${inTransitCount} in transit, ${deliveredCount} delivered.`} />
          </div>
          <span className="page-subtitle">All your procurement history, shipment tracking, and GST invoices in one place.</span>
        </div>
        <Button
          variant="primary"
          icon={ShoppingCart}
          onClick={() => navigate('/buyer/marketplace')}
        >
          Browse Marketplace
        </Button>
      </div>

      {/* Metric Cards */}
      <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', marginBottom: 'var(--space-5)' }}>
        <MetricCard
          icon={IndianRupee}
          label="Total Procurement Spend"
          value={`₹${totalSpend.toLocaleString()}`}
          sub="All-time total"
          color="#1565C0"
        />
        <MetricCard
          icon={ClipboardList}
          label="Total Orders"
          value={orders.length}
          sub="All procurement records"
          color="#7B1FA2"
        />
        <MetricCard
          icon={Truck}
          label="In-Transit Shipments"
          value={inTransitCount}
          sub="Awaiting delivery"
          color="#F57C00"
        />
        <MetricCard
          icon={BadgeCheck}
          label="Verified Suppliers"
          value={uniqueSellers}
          sub="Trusted farmers & agri-sellers"
          color="#2E7D32"
        />
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: 'var(--space-4)', marginTop: 'var(--space-3)' }}>
        <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)', pointerEvents: 'none' }} />
        <input
          type="text"
          placeholder="Search by product name, seller, or Order ID..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%', boxSizing: 'border-box',
            padding: '10px 12px 10px 38px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            fontSize: 'var(--text-sm)',
            background: 'var(--color-surface)',
            color: 'var(--color-text)',
            outline: 'none'
          }}
        />
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <EmptyState
          icon={ClipboardList}
          title="No purchase records found"
          description={search ? 'Try adjusting your search or filter.' : 'Place orders in the Buyer Marketplace to see your records here.'}
          actionLabel="Browse Marketplace"
          onAction={() => navigate('/buyer/marketplace')}
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {filteredOrders.map(order => (
            <div
              key={order.id}
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-card)',
                overflow: 'hidden',
                transition: 'box-shadow 0.2s ease'
              }}
            >
              {/* Top Row: Product + Price */}
              <div style={{
                display: 'flex', gap: 'var(--space-4)', padding: 'var(--space-4)',
                borderBottom: '1px solid var(--color-border)', alignItems: 'center', flexWrap: 'wrap'
              }}>
                {/* Thumbnail */}
                <div style={{ width: 64, height: 64, borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--color-border)', flexShrink: 0 }}>
                  <img src={order.productThumbnail} alt={order.productName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                    <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--color-text)', margin: 0 }}>
                      {order.productName}
                    </h4>
                    <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontFamily: 'monospace', background: 'var(--color-surface-subtle)', padding: '2px 6px', borderRadius: 4, border: '1px solid var(--color-border)' }}>
                      {order.orderNumber}
                    </span>
                  </div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                    {order.quantity} &nbsp;·&nbsp; ₹{(order.pricePerUnit || 0).toLocaleString()}/{order.unit || 'Unit'}
                    {order.orderDate && <> &nbsp;·&nbsp; Ordered: {order.orderDate}</>}
                  </div>
                </div>

                {/* Total */}
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1565C0' }}>
                    ₹{(order.invoice?.total || order.totalPrice)?.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: 2 }}>
                    Total Paid
                  </div>
                </div>
              </div>

              {/* Bottom Row: Seller + Status + Actions */}
              <div style={{ padding: 'var(--space-3) var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                {/* Seller */}
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flex: 1, minWidth: 160 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#1B433218', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Store size={16} color="#1B4332" />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--color-text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {order.sellerName}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                      {order.sellerLocation}
                    </div>
                  </div>
                </div>

                {/* Expected Delivery */}
                {order.expectedDelivery && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', flexShrink: 0 }}>
                    <Calendar size={13} />
                    <span>{order.expectedDelivery}</span>
                  </div>
                )}

                {/* Status */}
                <Badge variant={getStatusVariant(order.status)}>
                  {order.status === 'Delivered' && <CheckCircle2 size={11} strokeWidth={2.5} style={{ marginRight: 3 }} />}
                  {(order.status === 'In Transit' || order.status === 'Confirmed') && <Truck size={11} strokeWidth={2.5} style={{ marginRight: 3 }} />}
                  {order.status}
                </Badge>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 8, marginLeft: 'auto', flexShrink: 0 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={Truck}
                    onClick={() => navigate(`/buyer/orders/${order.id}`)}
                  >
                    Track Order
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={FileText}
                    onClick={() => setSelectedOrder(order)}
                  >
                    Invoice
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Invoice Modal */}
      {selectedOrder && (
        <InvoiceModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          showToast={showToast}
        />
      )}
    </PageShell>
  );
};

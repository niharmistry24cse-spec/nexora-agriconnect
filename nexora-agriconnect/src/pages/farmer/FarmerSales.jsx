import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Receipt, TrendingUp, Package, CheckCircle2, Truck,
  Search, Filter, Eye, Download, X, IndianRupee,
  Store, Phone, Calendar, Hash, CreditCard, FileText,
  Plus, ArrowUpRight, Loader2, Clock
} from 'lucide-react';
import { PageShell } from '../../components/layout/PageShell';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Tabs } from '../../components/ui/Tabs';
import { VoiceButton } from '../../components/ui/VoiceButton';
import { EmptyState } from '../../components/ui/EmptyState';
import { useApp } from '../../context/AppContext';

const StatusBadge = ({ status, variant }) => {
  const variantMap = {
    success: 'success',
    info: 'info',
    warning: 'warning',
    danger: 'danger',
    neutral: 'neutral'
  };
  return (
    <Badge variant={variantMap[variant] || 'neutral'}>
      {status === 'Delivered' && <CheckCircle2 size={11} strokeWidth={2.5} style={{ marginRight: 3 }} />}
      {status === 'In Transit' && <Truck size={11} strokeWidth={2.5} style={{ marginRight: 3 }} />}
      {(status?.includes('Pending') || status?.includes('Escrow')) && <Clock size={11} strokeWidth={2.5} style={{ marginRight: 3 }} />}
      {status}
    </Badge>
  );
};

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

const InvoiceModal = ({ sale, onClose, showToast }) => {
  if (!sale) return null;
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
          background: 'linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)',
          padding: 'var(--space-5) var(--space-6)', display: 'flex',
          justifyContent: 'space-between', alignItems: 'flex-start'
        }}>
          <div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.65)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
              Tax Invoice / Sales Receipt
            </div>
            <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 800, color: '#fff', margin: 0 }}>
              {sale.invoice?.invoiceNo || sale.saleNumber}
            </h3>
            <div style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>
              Issued: {sale.invoice?.date || sale.saleDate}
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
              <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 6 }}>Seller (You)</div>
              <div style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--color-text)' }}>Ramesh Kumar</div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: 2 }}>Village Pratappur, Ludhiana, Punjab</div>
              <div style={{ fontSize: '10px', color: 'var(--color-text-muted)', fontFamily: 'monospace', marginTop: 4 }}>
                GSTIN: {sale.invoice?.taxId || '—'}
              </div>
            </div>
            <div style={{ padding: 'var(--space-3)', background: 'var(--color-surface-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 6 }}>Buyer</div>
              <div style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--color-text)' }}>{sale.buyerName}</div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: 2 }}>{sale.buyerLocation}</div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: 2 }}>{sale.buyerType}</div>
            </div>
          </div>

          {/* Line Items */}
          <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: 'var(--space-4)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '8px', padding: '8px 12px', background: '#1B433210', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
              <span>Description</span>
              <span style={{ textAlign: 'right', minWidth: 70 }}>Qty</span>
              <span style={{ textAlign: 'right', minWidth: 90 }}>Amount</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '8px', padding: '10px 12px', borderTop: '1px solid var(--color-border)', fontSize: 'var(--text-sm)' }}>
              <span style={{ fontWeight: 500, color: 'var(--color-text)' }}>{sale.productName}</span>
              <span style={{ textAlign: 'right', color: 'var(--color-text-muted)', minWidth: 70 }}>{sale.quantity}</span>
              <span style={{ textAlign: 'right', fontWeight: 600, minWidth: 90 }}>₹{(sale.invoice?.subtotal || sale.totalAmount)?.toLocaleString()}</span>
            </div>
            {sale.invoice?.mandiFee > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '8px', padding: '8px 12px', borderTop: '1px solid var(--color-border)', fontSize: 'var(--text-sm)' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Mandi Commission Fee</span>
                <span style={{ textAlign: 'right', minWidth: 70 }}></span>
                <span style={{ textAlign: 'right', color: '#dc2626', minWidth: 90 }}>-₹{sale.invoice.mandiFee.toLocaleString()}</span>
              </div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '8px', padding: '10px 12px', borderTop: '2px solid var(--color-border)', background: 'var(--color-surface-subtle)' }}>
              <span style={{ fontWeight: 700, fontSize: 'var(--text-base)' }}>Net Earnings</span>
              <span style={{ minWidth: 70 }}></span>
              <span style={{ textAlign: 'right', fontWeight: 800, fontSize: 'var(--text-md)', color: '#1B4332', minWidth: 90 }}>
                ₹{(sale.invoice?.netEarnings || sale.totalAmount)?.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Payment / Delivery Details */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 'var(--space-5)', fontSize: 'var(--text-xs)' }}>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', color: 'var(--color-text-muted)' }}>
              <CreditCard size={13} />
              <span><strong>Payment:</strong> {sale.paymentMethod}</span>
            </div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', color: 'var(--color-text-muted)' }}>
              <Hash size={13} />
              <span><strong>Ref:</strong> {sale.transactionRef}</span>
            </div>
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

export const FarmerSales = () => {
  const { sales, showToast } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedSale, setSelectedSale] = useState(null);

  // Tabs
  const tabs = [
    { id: 'all', label: 'All Sales Records', count: sales.length },
    { id: 'completed', label: 'Completed & Paid', count: sales.filter(s => s.deliveryStatus === 'Delivered').length },
    { id: 'transit', label: 'In Transit / Pending', count: sales.filter(s => s.deliveryStatus === 'In Transit').length },
  ];

  // Filtered sales
  const filteredSales = useMemo(() => {
    let result = sales;
    if (activeTab === 'completed') result = result.filter(s => s.deliveryStatus === 'Delivered');
    else if (activeTab === 'transit') result = result.filter(s => s.deliveryStatus !== 'Delivered');

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(s =>
        s.productName?.toLowerCase().includes(q) ||
        s.buyerName?.toLowerCase().includes(q) ||
        s.saleNumber?.toLowerCase().includes(q) ||
        s.id?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [sales, activeTab, search]);

  // Metrics
  const totalRevenue = sales.reduce((sum, s) => sum + (s.totalAmount || 0), 0);
  const totalQuantity = sales.reduce((sum, s) => sum + (s.quantityNum || 0), 0);
  const completedSales = sales.filter(s => s.deliveryStatus === 'Delivered').length;
  const inTransit = sales.filter(s => s.deliveryStatus === 'In Transit').length;

  return (
    <PageShell title="Sell List">
      {/* Header */}
      <div className="page-header" style={{ marginBottom: 'var(--space-4)' }}>
        <div className="page-title-group">
          <div className="page-title">
            <span>Sell List & Sales Records</span>
            <VoiceButton textToRead={`Sell List and Sales Records. Total revenue ₹${totalRevenue.toLocaleString()} from ${sales.length} sales. ${completedSales} completed, ${inTransit} in transit.`} />
          </div>
          <span className="page-subtitle">Track all your sold produce, buyer payments, and earnings in one place.</span>
        </div>
        <Button
          variant="primary"
          icon={Plus}
          onClick={() => navigate('/farmer/marketplace/sell')}
        >
          List New Produce
        </Button>
      </div>

      {/* Metric Cards */}
      <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', marginBottom: 'var(--space-5)' }}>
        <MetricCard
          icon={IndianRupee}
          label="Total Revenue"
          value={`₹${totalRevenue.toLocaleString()}`}
          sub="All-time gross earnings"
          color="#1B4332"
        />
        <MetricCard
          icon={Package}
          label="Total Quantity Sold"
          value={`${totalQuantity} Qtl`}
          sub="Across all produce"
          color="#2D6A4F"
        />
        <MetricCard
          icon={CheckCircle2}
          label="Completed Sales"
          value={completedSales}
          sub="Payment received"
          color="#40916C"
        />
        <MetricCard
          icon={Truck}
          label="In Transit"
          value={inTransit}
          sub="Awaiting delivery"
          color="#1565C0"
        />
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Search Bar */}
      <div style={{ position: 'relative', marginBottom: 'var(--space-4)', marginTop: 'var(--space-3)' }}>
        <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)', pointerEvents: 'none' }} />
        <input
          type="text"
          placeholder="Search by crop name, buyer name, or Sale ID..."
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

      {/* Sales Records */}
      {filteredSales.length === 0 ? (
        <EmptyState
          icon={Receipt}
          title="No sales records found"
          description={search ? 'Try adjusting your search or filter.' : 'Start selling produce from the Marketplace to see your records here.'}
          actionLabel="List Produce for Sale"
          onAction={() => navigate('/farmer/marketplace/sell')}
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {filteredSales.map(sale => (
            <div
              key={sale.id}
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-card)',
                overflow: 'hidden'
              }}
            >
              {/* Card Header: Product + Amount */}
              <div style={{
                display: 'flex', gap: 'var(--space-4)', padding: 'var(--space-4)',
                borderBottom: '1px solid var(--color-border)', alignItems: 'center',
                flexWrap: 'wrap'
              }}>
                {/* Thumbnail */}
                <div style={{ width: 64, height: 64, borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--color-border)', flexShrink: 0 }}>
                  <img src={sale.thumbnail} alt={sale.productName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                    <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--color-text)', margin: 0 }}>
                      {sale.productName}
                    </h4>
                    <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontFamily: 'monospace', background: 'var(--color-surface-subtle)', padding: '2px 6px', borderRadius: 4, border: '1px solid var(--color-border)' }}>
                      {sale.saleNumber}
                    </span>
                  </div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                    {sale.category} &nbsp;·&nbsp; {sale.quantity} &nbsp;·&nbsp; ₹{sale.pricePerUnit?.toLocaleString()}/{sale.unit}
                  </div>
                </div>

                {/* Revenue */}
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1B4332' }}>
                    ₹{sale.totalAmount?.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: 2 }}>
                    Total Revenue
                  </div>
                </div>
              </div>

              {/* Card Body: Buyer + Status + Actions */}
              <div style={{ padding: 'var(--space-3) var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                {/* Buyer Avatar + Info */}
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', flex: 1, minWidth: 160 }}>
                  <img
                    src={sale.buyerAvatar}
                    alt={sale.buyerName}
                    style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-border)', flexShrink: 0 }}
                  />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--color-text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {sale.buyerName}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                      {sale.buyerType}
                    </div>
                  </div>
                </div>

                {/* Date */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', flexShrink: 0 }}>
                  <Calendar size={13} />
                  <span>{sale.saleDate}</span>
                </div>

                {/* Delivery Status */}
                <StatusBadge status={sale.deliveryStatus} variant={sale.deliveryStatusVariant} />

                {/* Payment Status */}
                <StatusBadge status={sale.paymentStatus} variant={sale.paymentStatusVariant} />

                {/* Actions */}
                <div style={{ display: 'flex', gap: 8, marginLeft: 'auto', flexShrink: 0 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={FileText}
                    onClick={() => setSelectedSale(sale)}
                  >
                    View Receipt
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Invoice Modal */}
      {selectedSale && (
        <InvoiceModal
          sale={selectedSale}
          onClose={() => setSelectedSale(null)}
          showToast={showToast}
        />
      )}
    </PageShell>
  );
};

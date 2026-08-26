import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  BadgeCheck,
  ShoppingCart,
  Star,
  Phone,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { PageShell } from '../../components/layout/PageShell';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Avatar } from '../../components/ui/Avatar';
import { VoiceButton } from '../../components/ui/VoiceButton';
import { useApp } from '../../context/AppContext';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, createOrder, showToast } = useApp();

  const product = products.find(p => p.id === id) || products.find(p => p.id === 'prod-golden-wheat') || products[0];

  const [quantity, setQuantity] = useState(1);

  const handleBuyNow = () => {
    const order = createOrder(product, quantity);
    navigate(`/buyer/orders/${order.id}`);
  };

  return (
    <PageShell title="Product Detail">
      {/* Breadcrumb / Back link */}
      <div style={{ marginBottom: 'var(--space-4)' }}>
        <button
          type="button"
          onClick={() => navigate(-1)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--color-primary)',
            fontSize: 'var(--text-sm)',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer'
          }}
        >
          <ArrowLeft size={16} /> Back to Marketplace
        </button>
      </div>

      <div className="grid-2" style={{ alignItems: 'start', gap: 'var(--space-6)' }}>
        {/* Left Column: Image + Certification Detail Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {/* Main Product Image Container */}
          <div style={{
            position: 'relative',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-card)',
            height: '320px',
            backgroundColor: '#f3ede0'
          }}>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {product.isCertified && (
              <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
                <Badge variant="solid-success">
                  <CheckCircle2 size={13} strokeWidth={2.5} /> {product.certType || 'Certified Organic'}
                </Badge>
              </div>
            )}
          </div>

          {/* Certification Detail Card */}
          {product.isCertified && (
            <Card
              title="Certification Detail"
              icon={BadgeCheck}
              enableVoice
              voiceText={`Certification Detail: Issued by ${product.certAuthority || 'National Organic Standards Board'}, validity ${product.certValidity || 'Dec 2025'}, Registration number ${product.certRegNumber || 'ORG-IN-2024-8832'}`}
            >
              <div className="grid-2" style={{ gap: 'var(--space-3)' }}>
                <div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Issuing Authority</div>
                  <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{product.certAuthority || 'National Organic Standards Board'}</div>
                </div>

                <div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Validity</div>
                  <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{product.certValidity || 'Valid until Dec 2025'}</div>
                </div>
              </div>

              <div style={{ marginTop: 'var(--space-3)', paddingTop: 'var(--space-3)', borderTop: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Reg. Number</div>
                <div style={{ fontSize: 'var(--text-sm)', fontFamily: 'monospace', fontWeight: 600, color: 'var(--color-primary)' }}>
                  {product.certRegNumber || 'ORG-IN-2024-8832'}
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Right Column: Title, Price, Description, Buy CTA, Seller Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>{product.name}</h1>
              <VoiceButton textToRead={`${product.name}. Price: ${product.currency}${product.price} per ${product.priceUnit || 'Quintal'}. ${product.description}`} />
            </div>

            <div style={{ fontSize: '26px', fontWeight: 700, color: 'var(--color-primary)', margin: 'var(--space-2) 0' }}>
              {product.currency}{product.price.toLocaleString()}
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 400, color: 'var(--color-text-muted)' }}> / {product.priceUnit || product.unit || 'Quintal'}</span>
            </div>

            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: 'var(--space-4)' }}>
              {product.description}
            </p>

            <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)' }}>
              Listing Freshness: {product.lastUpdated}
            </div>

            {/* Quantity Selector */}
            <div style={{ marginBottom: 'var(--space-3)' }}>
              <Input
                label={`Quantity (${product.priceUnit || product.unit || 'Quintals'})`}
                type="number"
                min="1"
                max={product.availableQty || 100}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value || '1', 10)))}
                helperText={`Available: ${product.availableQty || 50} ${product.priceUnit || product.unit || 'Quintals'}`}
              />
            </div>

            {/* Full Width Buy Now Button */}
            <Button
              variant="primary"
              fullWidth
              size="lg"
              icon={ShoppingCart}
              onClick={handleBuyNow}
            >
              Buy Now
            </Button>
          </div>

          {/* Seller Information Card */}
          <Card
            title="SELLER INFORMATION"
            enableVoice={false}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <Avatar
                  src={product.sellerAvatar}
                  name={product.seller || 'Ramesh Singh'}
                  size="md"
                />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>
                    {product.seller || 'Ramesh Singh'}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                    <Star size={12} fill="#E5A93B" color="#E5A93B" />
                    <span>{product.sellerRating || '4.8 (124 Ratings)'}</span>
                  </div>
                  {product.sellerLocation && (
                    <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                      {product.sellerLocation}
                    </div>
                  )}
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                icon={Phone}
                onClick={() => showToast(`Contact details for ${product.seller}: +91 98765 22334`, 'info')}
              >
                Contact Seller
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </PageShell>
  );
};

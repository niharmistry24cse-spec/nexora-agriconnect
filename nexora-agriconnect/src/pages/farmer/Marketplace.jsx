import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SlidersHorizontal, ShoppingCart, Star, Plus, Check } from 'lucide-react';
import { PageShell } from '../../components/layout/PageShell';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Toggle } from '../../components/ui/Toggle';
import { VoiceButton } from '../../components/ui/VoiceButton';
import { EmptyState } from '../../components/ui/EmptyState';
import { useApp } from '../../context/AppContext';

export const FarmerMarketplace = () => {
  const { products, showToast } = useApp();
  const navigate = useNavigate();

  // Filters state
  const [selectedCategories, setSelectedCategories] = useState(['Seeds']);
  const [certifiedOnly, setCertifiedOnly] = useState(false);

  const toggleCategory = (cat) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter(c => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category filter
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(p.category);
      // Certified filter
      const certifiedMatch = !certifiedOnly || p.isCertified;
      return categoryMatch && certifiedMatch;
    });
  }, [products, selectedCategories, certifiedOnly]);

  return (
    <PageShell title="Marketplace">
      <div className="page-header">
        <div className="page-title-group">
          <div className="page-title">
            <span>Marketplace</span>
            <VoiceButton textToRead="Farmer Marketplace. Browse quality seeds, fertilizers, and farming tools." />
          </div>
          <span className="page-subtitle">Browse quality seeds and farming tools.</span>
        </div>
        <div className="page-actions">
          <Button
            variant="outline"
            icon={Plus}
            onClick={() => navigate('/farmer/marketplace/sell')}
          >
            Sell a Product
          </Button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 'var(--space-6)', alignItems: 'start' }}>
        {/* Left Filter Panel */}
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, fontSize: 'var(--text-sm)' }}>
              <SlidersHorizontal size={16} />
              <span>Filters</span>
            </div>
            {(selectedCategories.length > 0 || certifiedOnly) && (
              <button
                type="button"
                onClick={() => { setSelectedCategories([]); setCertifiedOnly(false); }}
                style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
              >
                Reset
              </button>
            )}
          </div>

          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', letterSpacing: '0.05em', marginBottom: 'var(--space-3)' }}>
            CATEGORIES
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {['Seeds', 'Tools', 'Fertilizers', 'Crops'].map((cat) => {
              const checked = selectedCategories.includes(cat);
              return (
                <label
                  key={cat}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-text)',
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleCategory(cat)}
                    style={{ accentColor: 'var(--color-primary)', width: '16px', height: '16px' }}
                  />
                  <span>{cat}</span>
                </label>
              );
            })}
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: 'var(--space-4) 0' }} />

          <Toggle
            label="Certified Only"
            checked={certifiedOnly}
            onChange={setCertifiedOnly}
          />
        </Card>

        {/* Right Products Grid */}
        <div>
          {filteredProducts.length === 0 ? (
            <EmptyState
              icon={ShoppingCart}
              title="No products match filters"
              description="Try selecting different categories or toggling off the certified-only filter."
              actionLabel="Clear Filters"
              onAction={() => { setSelectedCategories([]); setCertifiedOnly(false); }}
            />
          ) : (
            <div className="grid-2">
              {filteredProducts.map((prod) => (
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
                  <div style={{ position: 'relative', height: '160px', width: '100%', overflow: 'hidden' }}>
                    <img
                      src={prod.image}
                      alt={prod.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    {prod.isCertified && (
                      <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                        <Badge variant="solid-success">
                          <Check size={11} strokeWidth={3} /> Certified
                        </Badge>
                      </div>
                    )}
                  </div>

                  <div style={{ padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                    <div>
                      <Link
                        to={`/marketplace/product/${prod.id}`}
                        style={{ fontWeight: 600, fontSize: 'var(--text-base)', color: 'var(--color-text)', display: 'block', marginBottom: '4px' }}
                      >
                        {prod.name}
                      </Link>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-3)' }}>
                        <Star size={13} fill="#E5A93B" color="#E5A93B" />
                        <span style={{ fontWeight: 600, color: 'var(--color-text)' }}>{prod.rating}</span>
                        <span>({prod.reviewsCount} reviews)</span>
                      </div>

                      <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                        Freshness: {prod.lastUpdated}
                      </div>
                    </div>

                    <div className="flex-between" style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-3)', borderTop: '1px solid var(--color-border)' }}>
                      <div style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--color-text)' }}>
                        {prod.currency}{prod.price.toLocaleString()}
                        {prod.priceUnit && <span style={{ fontSize: 'var(--text-xs)', fontWeight: 400, color: 'var(--color-text-muted)' }}> / {prod.priceUnit}</span>}
                      </div>

                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => navigate(`/marketplace/product/${prod.id}`)}
                      >
                        Buy
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
};

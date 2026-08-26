import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, X, Check, Package, UploadCloud } from 'lucide-react';
import { PageShell } from '../../components/layout/PageShell';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Textarea } from '../../components/ui/Textarea';
import { VoiceButton } from '../../components/ui/VoiceButton';
import { useApp } from '../../context/AppContext';

export const SellProduct = () => {
  const navigate = useNavigate();
  const { addProduct, showToast } = useApp();

  const [form, setForm] = useState({
    name: '',
    category: 'Seeds',
    description: '',
    price: '',
    quantity: '',
    unit: 'Kilogram',
    photos: [
      'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&auto=format&fit=crop&q=80'
    ]
  });

  const [errors, setErrors] = useState({});

  const handleRemovePhoto = (index) => {
    setForm(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleAddSamplePhoto = () => {
    if (form.photos.length >= 5) {
      showToast('Maximum 5 photos allowed', 'warning');
      return;
    }
    setForm(prev => ({
      ...prev,
      photos: [...prev.photos, 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200&auto=format&fit=crop&q=80']
    }));
    showToast('Photo uploaded successfully', 'info');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name) {
      setErrors({ name: 'Product Name is required' });
      return;
    }
    if (!form.price || isNaN(form.price)) {
      setErrors({ price: 'Enter a valid price' });
      return;
    }

    addProduct({
      name: form.name,
      category: form.category,
      description: form.description || 'Harvested directly from certified stewardship farmland.',
      price: parseFloat(form.price),
      priceUnit: form.unit,
      currency: '₹',
      availableQty: parseInt(form.quantity || '50', 10),
      unit: form.unit,
      image: form.photos[0] || 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80',
      isCertified: true,
      certType: 'Certified'
    });

    navigate('/farmer/marketplace');
  };

  return (
    <PageShell title="Sell a Product" contentMaxWidth="680px">
      <div className="page-header" style={{ marginBottom: 'var(--space-4)' }}>
        <div className="page-title-group">
          <div className="page-title">
            <span>Sell a Product</span>
            <VoiceButton textToRead="Sell a product. List your harvest or farm goods for direct sale to verified buyers." />
          </div>
          <span className="page-subtitle">List your harvest or farm goods for direct sale.</span>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          {/* Product Photos Dropzone */}
          <div className="form-group">
            <label className="form-label">
              <span>Product Photos</span>
            </label>

            <div
              onClick={handleAddSamplePhoto}
              style={{
                border: '2px dashed var(--color-border-dark)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-6)',
                textAlign: 'center',
                backgroundColor: 'var(--color-surface-subtle)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'inline-flex', padding: '10px', backgroundColor: 'var(--color-surface)', borderRadius: '50%', marginBottom: '8px', border: '1px solid var(--color-border)' }}>
                <Camera size={24} color="var(--color-primary)" />
              </div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text)' }}>
                Tap to capture or select photos
              </div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                Maximum 5 photos (JPEG, PNG)
              </div>
            </div>

            {/* Thumbnail Preview Row */}
            {form.photos.length > 0 && (
              <div style={{ display: 'flex', gap: '10px', marginTop: '12px', flexWrap: 'wrap' }}>
                {form.photos.map((url, idx) => (
                  <div key={idx} style={{ position: 'relative', width: '64px', height: '64px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                    <img src={url} alt="Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(idx)}
                      style={{
                        position: 'absolute',
                        top: '2px',
                        right: '2px',
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(0,0,0,0.65)',
                        color: '#fff',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: 'var(--space-4) 0' }} />

          {/* Category Select */}
          <Select
            label="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            options={['Seeds', 'Tools', 'Fertilizers', 'Crops', 'Vegetables']}
            helperText="Helps buyers find your product quickly in the market."
            required
          />

          {/* Product Name */}
          <Input
            label="Product Name"
            placeholder="e.g., Organic Basmati Rice - A Grade"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            error={errors.name}
            required
          />

          {/* Description */}
          <Textarea
            label="Description"
            placeholder="Detail the quality, harvest date, farming method, and any minimum order requirements…"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={4}
          />

          {/* Two-up Row: Price & Quantity */}
          <div className="grid-2">
            <Input
              label="Price"
              placeholder="0.00"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              unitChip="/ unit"
              error={errors.price}
              required
            />

            <div className="form-group">
              <label className="form-label">
                <span>Total Available Quantity</span>
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="number"
                  placeholder="0"
                  value={form.quantity}
                  onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                  className="form-input"
                  style={{ flex: 1 }}
                />
                <select
                  value={form.unit}
                  onChange={(e) => setForm({ ...form, unit: e.target.value })}
                  className="form-select"
                  style={{ width: '130px' }}
                >
                  <option value="Kilogram">Kilogram</option>
                  <option value="Quintal">Quintal</option>
                  <option value="Ton">Ton</option>
                  <option value="Bag">Bag</option>
                  <option value="Unit">Unit</option>
                </select>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', marginTop: 'var(--space-6)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--color-border)' }}>
            <Button
              variant="outline"
              onClick={() => navigate('/farmer/marketplace')}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              icon={Package}
            >
              List Product
            </Button>
          </div>
        </form>
      </Card>
    </PageShell>
  );
};

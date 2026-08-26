import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Tractor,
  X,
  Volume2,
  Globe,
  Ruler,
  Sprout,
  MapPin,
  User,
  Droplet,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { VoiceButton } from '../../components/ui/VoiceButton';

export const OnboardingWizard = () => {
  const { step } = useParams();
  const navigate = useNavigate();
  const currentStep = parseInt(step || '2', 10);
  const { farmer, setFarmer, language, setLanguage, showToast } = useApp();

  const [formData, setFormData] = useState({
    name: farmer.name || 'Ramesh Kumar',
    village: farmer.village || 'Village Pratappur',
    district: farmer.district || 'District Ludhiana',
    state: farmer.state || 'Punjab',
    language: 'English',
    landArea: '17.7',
    soilType: 'Alluvial Loam',
    crops: ['Wheat (Rabi)', 'Mustard (Rabi)', 'Paddy (Kharif)'],
    irrigationSource: 'Canal & Borewell',
    farmingType: 'Mixed Organic & Modern'
  });

  const [errors, setErrors] = useState({});

  const handleNext = () => {
    if (currentStep < 5) {
      navigate(`/onboarding/${currentStep + 1}`);
    } else {
      // Step 5 Submit
      setFarmer(prev => ({
        ...prev,
        name: formData.name,
        village: formData.village,
        district: formData.district,
        state: formData.state
      }));
      showToast('Farm Profile setup completed successfully!', 'success');
      navigate('/farmer/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      navigate(`/onboarding/${currentStep - 1}`);
    }
  };

  const soilOptions = [
    { value: 'Alluvial Loam', label: 'Alluvial Loam (Rich, high fertility)' },
    { value: 'Sandy Loam', label: 'Sandy Loam (Light, well-draining)' },
    { value: 'Clay Loam', label: 'Clay Loam (Heavy moisture retention)' },
    { value: 'Black Soil (Regur)', label: 'Black Soil / Regur (Cotton & Wheat)' },
    { value: 'Red & Yellow Soil', label: 'Red & Yellow Soil' }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      {/* Left Rail (Cream background with brand & caption) */}
      <div style={{
        width: '260px',
        backgroundColor: 'var(--color-bg)',
        borderRight: '1px solid var(--color-border)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'var(--space-6) var(--space-5)',
        flexShrink: 0
      }}>
        <div>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div style={{
              width: '36px',
              height: '36px',
              backgroundColor: 'var(--color-primary)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff'
            }}>
              <Tractor size={22} />
            </div>
            <div>
              <div style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--color-primary)' }}>
                AgriConnect
              </div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                Digital Stewardship
              </div>
            </div>
          </Link>
        </div>

        <div style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontStyle: 'italic', fontSize: 'var(--text-sm)' }}>
          Setup in progress…
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <VoiceButton textToRead="AgriConnect farm profile setup wizard. Step 2 of 5: Land size and soil type." />
          <button
            type="button"
            onClick={() => setLanguage(language === 'English' ? 'हिंदी' : 'English')}
            className="language-btn"
            style={{ padding: '4px 8px' }}
          >
            <Globe size={14} />
            <span>{language}</span>
          </button>
        </div>
      </div>

      {/* Right Content Column */}
      <div style={{ flex: 1, padding: 'var(--space-8) var(--space-10)', maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
        {/* Cancel Setup Header Row */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'var(--space-4)' }}>
          <Link
            to="/farmer/dashboard"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}
          >
            <X size={16} />
            <span>Cancel Setup</span>
          </Link>
        </div>

        {/* Heading Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
          <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--color-text)' }}>
            Farm Profile Setup
          </h1>
          <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-muted)' }}>
            Step {currentStep} of 5
          </span>
        </div>

        {/* Segmented Progress Bar */}
        <ProgressBar totalSteps={5} currentStep={currentStep} />

        {/* Step 1: Personal & Location */}
        {currentStep === 1 && (
          <Card
            title="Personal & Location Details"
            enableVoice
            voiceText="Step 1: Personal and Location Details. Please provide your farmer name, village, district, and state."
            style={{ marginTop: 'var(--space-4)' }}
          >
            <p className="form-helper" style={{ marginBottom: 'var(--space-4)' }}>
              We use your location to deliver targeted agro-climatic advisories, mandi rates, and local schemes.
            </p>
            <Input
              label="Farmer Full Name"
              icon={User}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <div className="grid-2">
              <Input
                label="Village / Block"
                icon={MapPin}
                value={formData.village}
                onChange={(e) => setFormData({ ...formData, village: e.target.value })}
              />
              <Input
                label="District"
                icon={MapPin}
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
              />
            </div>
            <Input
              label="State"
              icon={MapPin}
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            />
            <div style={{ marginTop: 'var(--space-2)' }}>
              <Button
                variant="outline"
                size="sm"
                icon={Sparkles}
                onClick={() => showToast('Location detected: Village Pratappur, Ludhiana, Punjab', 'info')}
              >
                Use Current GPS Location
              </Button>
            </div>
          </Card>
        )}

        {/* Step 2: Land Size & Soil Type (Exact Wireframe 6.1 Fidelity) */}
        {currentStep === 2 && (
          <Card
            title="Land Size & Soil Type"
            enableVoice
            voiceText="Land Size and Soil Type. Tell us about your land to help us provide more accurate weather, scheme, and market recommendations."
            style={{ marginTop: 'var(--space-4)' }}
          >
            <p className="form-helper" style={{ marginBottom: 'var(--space-4)' }}>
              Tell us about your land to help us provide more accurate weather, scheme, and market recommendations.
            </p>

            <Input
              label="Total Cultivable Land Area"
              icon={Ruler}
              placeholder="e.g. 5.5"
              value={formData.landArea}
              onChange={(e) => setFormData({ ...formData, landArea: e.target.value })}
              unitChip="Acres"
              helperText="Enter total area you currently farm."
            />

            <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: 'var(--space-5) 0' }} />

            <Select
              label="Primary Soil Type"
              icon={Sprout}
              placeholder="Select soil type…"
              options={soilOptions}
              value={formData.soilType}
              onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
              helperText="Select the most dominant soil type across your fields."
            />

            {/* Inline Photo Banner (Hand holding soil) */}
            <div style={{
              marginTop: 'var(--space-5)',
              position: 'relative',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              height: '140px',
              border: '1px solid var(--color-border)'
            }}>
              <img
                src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop&q=80"
                alt="Soil testing in field"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(27, 67, 50, 0.75)',
                display: 'flex',
                alignItems: 'center',
                padding: 'var(--space-5)',
                color: 'var(--color-text-on-dark)'
              }}>
                <p style={{ fontSize: 'var(--text-sm)', fontWeight: 500, lineHeight: 1.4, maxWidth: '420px', margin: 0 }}>
                  Not sure? Our local extension officers can assist with soil testing.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Step 3: Crops */}
        {currentStep === 3 && (
          <Card
            title="Crops Cultivated"
            enableVoice
            voiceText="Step 3: Crops Cultivated. Select or add the crops you sow across seasons."
            style={{ marginTop: 'var(--space-4)' }}
          >
            <p className="form-helper" style={{ marginBottom: 'var(--space-4)' }}>
              Add current or upcoming seasonal crops to receive personalized pest advisories and mandi alerts.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
              {formData.crops.map((c, i) => (
                <span
                  key={i}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: 'var(--color-primary-soft)',
                    color: 'var(--color-primary-text)',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600
                  }}
                >
                  <Sprout size={14} />
                  {c}
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, crops: formData.crops.filter((_, idx) => idx !== i) })}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <Input
              label="Add Another Crop"
              placeholder="e.g. Sugarcane, Cotton, Maize"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  e.preventDefault();
                  setFormData({ ...formData, crops: [...formData.crops, e.target.value.trim()] });
                  e.target.value = '';
                }
              }}
              helperText="Press Enter to add multiple crops."
            />
          </Card>
        )}

        {/* Step 4: Water & Preferences */}
        {currentStep === 4 && (
          <Card
            title="Water & Farming Preferences"
            enableVoice
            voiceText="Step 4: Water and Farming Preferences. Tell us your irrigation source and methods."
            style={{ marginTop: 'var(--space-4)' }}
          >
            <p className="form-helper" style={{ marginBottom: 'var(--space-4)' }}>
              Helps us assess water turnaround schedules and eligible micro-irrigation subsidies.
            </p>
            <Select
              label="Primary Irrigation Source"
              icon={Droplet}
              value={formData.irrigationSource}
              onChange={(e) => setFormData({ ...formData, irrigationSource: e.target.value })}
              options={[
                'Canal & Borewell',
                'Canal Only',
                'Borewell / Tube well Only',
                'Rainfed',
                'Drip / Sprinkler Micro-irrigation'
              ]}
            />
            <Select
              label="Farming Practice"
              icon={Sprout}
              value={formData.farmingType}
              onChange={(e) => setFormData({ ...formData, farmingType: e.target.value })}
              options={[
                'Mixed Organic & Modern',
                '100% Certified Organic',
                'Conventional Mechanized',
                'Natural / Zero-Budget Farming'
              ]}
            />
          </Card>
        )}

        {/* Step 5: Review & Submit */}
        {currentStep === 5 && (
          <Card
            title="Review & Complete Setup"
            enableVoice
            voiceText="Step 5: Review and Complete Setup. Verify your details before completing setup."
            style={{ marginTop: 'var(--space-4)' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div className="flex-between" style={{ padding: '8px 0', borderBottom: '1px solid var(--color-border)' }}>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Farmer & Location</div>
                  <div style={{ fontWeight: 600 }}>{formData.name} · {formData.village}, {formData.district}</div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => navigate('/onboarding/1')}>Edit</Button>
              </div>

              <div className="flex-between" style={{ padding: '8px 0', borderBottom: '1px solid var(--color-border)' }}>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Land & Soil</div>
                  <div style={{ fontWeight: 600 }}>{formData.landArea} Acres · {formData.soilType}</div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => navigate('/onboarding/2')}>Edit</Button>
              </div>

              <div className="flex-between" style={{ padding: '8px 0', borderBottom: '1px solid var(--color-border)' }}>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Crops</div>
                  <div style={{ fontWeight: 600 }}>{formData.crops.join(', ')}</div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => navigate('/onboarding/3')}>Edit</Button>
              </div>

              <div className="flex-between" style={{ padding: '8px 0' }}>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Irrigation & Practice</div>
                  <div style={{ fontWeight: 600 }}>{formData.irrigationSource} · {formData.farmingType}</div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => navigate('/onboarding/4')}>Edit</Button>
              </div>
            </div>
          </Card>
        )}

        {/* Footer Navigation Buttons */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 'var(--space-6)',
          paddingTop: 'var(--space-4)'
        }}>
          {currentStep > 1 ? (
            <Button
              variant="outline"
              icon={ArrowLeft}
              onClick={handleBack}
            >
              Back
            </Button>
          ) : <div />}

          <Button
            variant="primary"
            iconRight={currentStep === 5 ? CheckCircle2 : ArrowRight}
            onClick={handleNext}
          >
            {currentStep === 5 ? 'Complete Setup' : 'Continue →'}
          </Button>
        </div>
      </div>
    </div>
  );
};

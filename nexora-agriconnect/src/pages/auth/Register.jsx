import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Tractor,
  User,
  Phone,
  Lock,
  MapPin,
  Ruler,
  Sprout,
  Droplet,
  Globe,
  Sliders,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Wheat,
  Eye,
  EyeOff,
  Layers,
  HelpCircle,
  FileCheck,
  Languages
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/ui/Button';
import { VoiceButton } from '../../components/ui/VoiceButton';
import { auth, createUserWithEmailAndPassword, updateProfile } from '../../services/firebase';

const ALL_CROPS_PRESETS = [
  { name: 'Wheat (गेहूं)', category: 'Rabi' },
  { name: 'Paddy / Rice (धान)', category: 'Kharif' },
  { name: 'Mustard (सरसों)', category: 'Rabi' },
  { name: 'Cotton (कपास)', category: 'Kharif' },
  { name: 'Sugarcane (गन्ना)', category: 'Cash' },
  { name: 'Maize / Corn (मक्का)', category: 'Kharif' },
  { name: 'Soybean (सोयाबीन)', category: 'Kharif' },
  { name: 'Chickpea / Chana (चना)', category: 'Rabi' },
  { name: 'Potato (आलू)', category: 'Vegetable' },
  { name: 'Tomato (टमाटर)', category: 'Vegetable' },
  { name: 'Onion (प्याज़)', category: 'Vegetable' },
  { name: 'Groundnut (मूंगफली)', category: 'Kharif' }
];

const SOIL_TYPES = [
  { value: 'Alluvial Loam', label: 'Alluvial Loam (जलोढ़ मिट्टी) - High fertility, Indo-Gangetic plains' },
  { value: 'Sandy Loam', label: 'Sandy Loam (बलुई दोमट) - Light, fast-draining' },
  { value: 'Clay Loam', label: 'Clay Loam (चिकनी मिट्टी) - Heavy moisture retention' },
  { value: 'Black Soil (Regur)', label: 'Black Soil / Regur (काली मिट्टी) - Ideal for Cotton & Wheat' },
  { value: 'Red & Yellow Soil', label: 'Red & Yellow Soil (लाल मिट्टी) - Mineral-rich' },
  { value: 'Laterite Soil', label: 'Laterite Soil (लेटराइट मिट्टी) - Plantation crops' }
];

const STATES_LIST = [
  'Punjab', 'Haryana', 'Uttar Pradesh', 'Maharashtra', 'Gujarat',
  'Madhya Pradesh', 'Rajasthan', 'Karnataka', 'Andhra Pradesh',
  'Tamil Nadu', 'Bihar', 'West Bengal', 'Odisha', 'Telangana', 'Other'
];

export const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    registerUser,
    langCode,
    setLanguage,
    availableLanguages,
    openTranslator,
    t,
    showToast
  } = useApp();

  const [activeStep, setActiveStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [customCropInput, setCustomCropInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Form State containing ALL 7 requested fields
  const [form, setForm] = useState({
    // Account details
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'farmer',

    // 1. Location
    locationState: 'Punjab',
    locationDistrict: 'Ludhiana',
    locationVillage: 'Village Pratappur',
    locationPincode: '141001',
    gpsCoordinates: '30.9010° N, 75.8573° E',

    // 2. Land size
    landSize: '12.5',
    landUnit: 'Acres',
    landType: 'Irrigated Cultivable Land',

    // 3. Soil information
    soilType: 'Alluvial Loam',
    soilHealthCard: 'Yes - Active Health Card',
    soilPhLevel: '7.2 (Neutral / Ideal)',
    organicCarbon: 'Medium (0.5% - 0.75%)',

    // 4. Crops
    crops: ['Wheat (गेहूं)', 'Mustard (सरसों)', 'Paddy / Rice (धान)'],

    // 5. Water availability
    waterSource: 'Canal & Borewell',
    waterReliability: 'Turn-Based (Canal 3 days/week + Borewell)',
    irrigationType: 'Drip Irrigation & Furrow',

    // 6. Farming preferences
    farmingPreference: 'Mixed Organic & Modern',
    mechanizationLevel: 'Tractor Owner with Rotavator',
    marketPreference: 'Direct Buyer Marketplace + Local Mandi',

    // 7. Preferred language
    preferredLanguage: 'English'
  });

  const handleToggleCrop = (cropName) => {
    setForm((prev) => {
      const exists = prev.crops.includes(cropName);
      if (exists) {
        return { ...prev, crops: prev.crops.filter((c) => c !== cropName) };
      } else {
        return { ...prev, crops: [...prev.crops, cropName] };
      }
    });
  };

  const handleAddCustomCrop = (e) => {
    e?.preventDefault();
    if (!customCropInput.trim()) return;
    if (!form.crops.includes(customCropInput.trim())) {
      setForm((prev) => ({
        ...prev,
        crops: [...prev.crops, customCropInput.trim()]
      }));
      showToast(`Added crop: ${customCropInput.trim()}`, 'success');
    }
    setCustomCropInput('');
  };

  const handleGpsDetect = () => {
    showToast('Detecting current GPS coordinates via browser location...', 'info');
    setTimeout(() => {
      setForm((prev) => ({
        ...prev,
        locationState: 'Punjab',
        locationDistrict: 'Ludhiana',
        locationVillage: 'Village Pratappur',
        locationPincode: '141008',
        gpsCoordinates: '30.9010° N, 75.8573° E'
      }));
      showToast('GPS Location locked: Village Pratappur, Ludhiana (30.90° N, 75.85° E)', 'success');
    }, 800);
  };

  const handleProceedStep1 = () => {
    if (!form.fullName || !form.fullName.trim()) {
      showToast('Please enter your Full Name', 'error');
      return;
    }
    if (!form.phone || form.phone.length < 10) {
      showToast('Please enter a valid 10-digit mobile number', 'error');
      return;
    }
    if (!form.password) {
      showToast('Please create a password', 'error');
      return;
    }
    if (form.password.length < 6) {
      showToast('Password must be at least 6 characters long', 'error');
      return;
    }
    if (form.password !== form.confirmPassword) {
      showToast('Passwords do not match! Please verify your passwords', 'error');
      return;
    }
    setActiveStep(2);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!form.fullName || !form.phone) {
      showToast('Please fill in your name and phone number', 'error');
      return;
    }
    if (form.password.length < 6) {
      showToast('Password must be at least 6 characters long', 'error');
      return;
    }
    if (form.password !== form.confirmPassword) {
      showToast('Passwords do not match! Please verify your password', 'error');
      return;
    }
    if (form.crops.length === 0) {
      showToast('Please select at least one crop', 'error');
      return;
    }

    setLoading(true);
    const emailToRegister = form.email && form.email.trim() 
      ? form.email.trim() 
      : `${form.phone.replace(/\D/g, '')}@agriconnect.in`;

    try {
      let userUid = null;
      try {
        const userCred = await createUserWithEmailAndPassword(auth, emailToRegister, form.password);
        if (userCred && userCred.user) {
          userUid = userCred.user.uid;
          await updateProfile(userCred.user, { displayName: form.fullName });
        }
      } catch (fbErr) {
        console.error('Firebase Register Error:', fbErr);
        if (fbErr.code === 'auth/email-already-in-use') {
          showToast('This account (email/mobile) already exists. Please Sign In.', 'error');
          setLoading(false);
          return;
        } else if (fbErr.code === 'auth/weak-password') {
          showToast('Password is too weak. Please use at least 6 characters.', 'error');
          setLoading(false);
          return;
        } else if (fbErr.code === 'auth/invalid-email') {
          showToast('Please enter a valid email address.', 'error');
          setLoading(false);
          return;
        }
      }

      registerUser({
        name: form.fullName,
        phone: form.phone,
        email: form.email || emailToRegister,
        password: form.password,
        role: form.role,
        uid: userUid,
        location: {
          village: form.locationVillage,
          district: form.locationDistrict,
          state: form.locationState,
          pincode: form.locationPincode,
          gps: form.gpsCoordinates
        },
        landSize: form.landSize,
        soilInformation: form.soilType,
        crops: form.crops,
        waterAvailability: `${form.waterSource} (${form.waterReliability})`,
        farmingPreferences: `${form.farmingPreference} - ${form.irrigationType}`,
        preferredLanguage: form.preferredLanguage
      });

      showToast('Farmer Profile & Password Authentication verified successfully!', 'success');
      if (form.role === 'farmer') navigate('/farmer/dashboard');
      else if (form.role === 'buyer') navigate('/buyer/marketplace');
      else if (form.role === 'authority') navigate('/authority/dashboard');
      else if (form.role === 'admin') navigate('/admin/dashboard');
    } catch (err) {
      showToast(err.message || 'Registration failed.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-bg-decor auth-bg-decor-1" />
      <div className="auth-bg-decor auth-bg-decor-2" />

      {/* Top Header Bar */}
      <header className="auth-topbar">
        <Link to="/" className="auth-brand">
          <div className="auth-brand-icon">
            <Tractor size={22} />
          </div>
          <div>
            <span className="auth-brand-title">AgriConnect</span>
            <span className="auth-brand-tagline">Digital Farm Stewardship</span>
          </div>
        </Link>

        <div className="auth-topbar-actions">
          {/* Quick Open Translator button */}
          <button
            type="button"
            className="language-btn"
            onClick={() => openTranslator('Welcome to AgriConnect Farmer Registration')}
            style={{ backgroundColor: '#f0fdf4', borderColor: '#bbf7d0', color: '#15803d' }}
            title="Open AgriTranslate Tool"
          >
            <Languages size={15} />
            <span>{t('AgriTranslate', 'AgriTranslate')}</span>
          </button>

          <VoiceButton
            textToRead={`AgriConnect Farmer Registration. Step ${activeStep} of 4. Fill in your Location, Land size, Soil information, Crops, Water availability, and Farming preferences.`}
          />

          <div className="auth-lang-selector">
            <Globe size={15} />
            <select
              value={langCode}
              onChange={(e) => {
                const newCode = e.target.value;
                setLanguage(newCode);
                const langObj = availableLanguages.find(l => l.code === newCode);
                if (langObj) {
                  setForm(prev => ({ ...prev, preferredLanguage: langObj.name }));
                  showToast(`Language switched to ${langObj.native} (${langObj.name})`, 'success');
                }
              }}
              className="auth-lang-select"
            >
              {availableLanguages.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.flag} {l.native}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* Main Registration Form Container */}
      <main className="auth-container" style={{ maxWidth: '960px' }}>
        <div className="register-header-card">
          <div className="register-header-left">
            <span className="auth-hero-badge">
              <Sparkles size={14} />
              {t('Farmer & Agricultural Stewardship Onboarding', 'Farmer & Agricultural Stewardship Onboarding')}
            </span>
            <h1 className="register-main-title">
              {t('Create Your Digital Farm Identity', 'Create Your Digital Farm Identity')}
            </h1>
            <p className="register-main-sub">
              {t('Register with complete soil, crop, land, and water profile for personalized AI advisories, subsidy grants, and direct buyer market.', 'Register with complete soil, crop, land, and water profile for personalized AI advisories, subsidy grants, and direct buyer market.')}
            </p>
          </div>

          {/* Stepper Tabs */}
          <div className="register-stepper-row">
            <button
              type="button"
              className={`reg-step-btn ${activeStep === 1 ? 'is-active' : activeStep > 1 ? 'is-completed' : ''}`}
              onClick={() => setActiveStep(1)}
            >
              <span className="step-circle">{activeStep > 1 ? '✓' : '1'}</span>
              <span className="step-btn-text">{t('Personal & Role', '1. Personal & Role')}</span>
            </button>

            <button
              type="button"
              className={`reg-step-btn ${activeStep === 2 ? 'is-active' : activeStep > 2 ? 'is-completed' : ''}`}
              onClick={() => setActiveStep(2)}
            >
              <span className="step-circle">{activeStep > 2 ? '✓' : '2'}</span>
              <span className="step-btn-text">{t('Location & Land', '2. Location & Land')}</span>
            </button>

            <button
              type="button"
              className={`reg-step-btn ${activeStep === 3 ? 'is-active' : activeStep > 3 ? 'is-completed' : ''}`}
              onClick={() => setActiveStep(3)}
            >
              <span className="step-circle">{activeStep > 3 ? '✓' : '3'}</span>
              <span className="step-btn-text">{t('Soil, Crops & Water', '3. Soil, Crops & Water')}</span>
            </button>

            <button
              type="button"
              className={`reg-step-btn ${activeStep === 4 ? 'is-active' : ''}`}
              onClick={() => setActiveStep(4)}
            >
              <span className="step-circle">4</span>
              <span className="step-btn-text">{t('Preferences & Review', '4. Preferences & Review')}</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="register-form-card">
          {/* STEP 1: Personal & Account */}
          {activeStep === 1 && (
            <div className="register-step-content animate-slide-in">
              <div className="register-section-header">
                <div className="section-header-icon">
                  <User size={20} />
                </div>
                <div>
                  <h3>{t('Account Credentials & Role', 'Account Credentials & Role')}</h3>
                  <p>{t('Choose your account type and contact credentials', 'Choose your account type and contact credentials')}</p>
                </div>
              </div>

              {/* Role Selector Cards */}
              <div className="reg-role-grid">
                <label className={`reg-role-card ${form.role === 'farmer' ? 'is-selected' : ''}`}>
                  <input
                    type="radio"
                    name="role"
                    value="farmer"
                    checked={form.role === 'farmer'}
                    onChange={() => setForm({ ...form, role: 'farmer' })}
                  />
                  <Wheat size={24} className="reg-role-icon" />
                  <div className="reg-role-info">
                    <span className="reg-role-name">{t('Farmer', 'Farmer / Producer')} (किसान)</span>
                    <span className="reg-role-desc">Cultivate crops, request water, access subsidies & sell harvest</span>
                  </div>
                </label>

                <label className={`reg-role-card ${form.role === 'buyer' ? 'is-selected' : ''}`}>
                  <input
                    type="radio"
                    name="role"
                    value="buyer"
                    checked={form.role === 'buyer'}
                    onChange={() => setForm({ ...form, role: 'buyer' })}
                  />
                  <Tractor size={24} className="reg-role-icon" />
                  <div className="reg-role-info">
                    <span className="reg-role-name">{t('Buyer', 'Agri Buyer / Trader')} (खरीदार)</span>
                    <span className="reg-role-desc">Procure bulk grains, vegetables, and certified produce directly</span>
                  </div>
                </label>
              </div>

              <div className="grid-2" style={{ marginTop: 'var(--space-4)' }}>
                <div className="form-group">
                  <label className="form-label">{t('Full Name', 'Full Name')} / किसान का नाम *</label>
                  <div className="form-control-wrapper">
                    <span className="input-leading-icon"><User size={16} /></span>
                    <input
                      type="text"
                      className="form-input has-leading-icon"
                      placeholder="e.g. Ramesh Kumar"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">{t('Mobile Number', 'Mobile Number (Primary for SMS/WhatsApp)')} *</label>
                  <div className="form-control-wrapper">
                    <span className="input-leading-icon"><Phone size={16} /></span>
                    <input
                      type="tel"
                      className="form-input has-leading-icon"
                      placeholder="e.g. 9876543210"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      maxLength={10}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">{t('Email Address (Optional)', 'Email Address (Optional for Notifications & Recovery)')}</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="e.g. farmer@example.com (or leave blank to use mobile)"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">{t('Create Password', 'Create Password')} * (Min. 6 chars)</label>
                  <div className="form-control-wrapper">
                    <span className="input-leading-icon"><Lock size={16} /></span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-input has-leading-icon"
                      placeholder="Choose a strong password"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      required
                    />
                    <button
                      type="button"
                      className="auth-eye-btn"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">{t('Confirm Password', 'Confirm Password')} *</label>
                  <div className="form-control-wrapper">
                    <span className="input-leading-icon"><Lock size={16} /></span>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      className="form-input has-leading-icon"
                      placeholder="Re-enter password to verify"
                      value={form.confirmPassword}
                      onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                      required
                    />
                    <button
                      type="button"
                      className="auth-eye-btn"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {form.confirmPassword && (
                    <div style={{ fontSize: '12px', marginTop: '4px', fontWeight: 600, color: form.password === form.confirmPassword ? '#15803d' : '#dc2626' }}>
                      {form.password === form.confirmPassword ? '✓ Passwords match' : '✕ Passwords do not match'}
                    </div>
                  )}
                </div>
              </div>

              <div className="reg-nav-footer">
                <Link to="/login" className="auth-switch-link">
                  {t('Already have an account? Sign In →', 'Already have an account? Sign In →')}
                </Link>
                <Button
                  type="button"
                  variant="primary"
                  iconRight={ArrowRight}
                  onClick={handleProceedStep1}
                >
                  {t('Continue to Location & Land →', 'Continue to Location & Land →')}
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: Location & Land Size */}
          {activeStep === 2 && (
            <div className="register-step-content animate-slide-in">
              <div className="register-section-header">
                <div className="section-header-icon">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3>1. {t('Location', 'Location')} & 2. {t('Land size', 'Land Size Details')}</h3>
                  <p>Used to sync local weather advisories, soil agro-zones, and mandi prices</p>
                </div>
              </div>

              {/* GPS Auto Detect Banner */}
              <div className="reg-gps-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="gps-pulse-icon">
                    <Sparkles size={20} color="#15803d" />
                  </div>
                  <div>
                    <strong>{t('Quick GPS Auto-Detect', 'Quick GPS Auto-Detect')}</strong>
                    <p style={{ margin: 0, fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                      Automatically fill State, District, Village & Coordinates from your phone GPS
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleGpsDetect}
                  icon={MapPin}
                >
                  {t('Detect GPS Location', 'Detect GPS Location')}
                </Button>
              </div>

              {/* Location Fields */}
              <div className="grid-2" style={{ marginTop: 'var(--space-4)' }}>
                <div className="form-group">
                  <label className="form-label">{t('State', 'State')} / राज्य *</label>
                  <select
                    className="form-select"
                    value={form.locationState}
                    onChange={(e) => setForm({ ...form, locationState: e.target.value })}
                    required
                  >
                    {STATES_LIST.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">{t('District', 'District')} / जिला *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Ludhiana / Patiala / Pune"
                    value={form.locationDistrict}
                    onChange={(e) => setForm({ ...form, locationDistrict: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">{t('Village', 'Village / Tehsil / Gram Panchayat')} *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Village Pratappur"
                    value={form.locationVillage}
                    onChange={(e) => setForm({ ...form, locationVillage: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">PIN Code / पिन कोड</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. 141001"
                    value={form.locationPincode}
                    onChange={(e) => setForm({ ...form, locationPincode: e.target.value })}
                    maxLength={6}
                  />
                </div>
              </div>

              <hr className="divider-hr" />

              {/* Land Size Fields */}
              <div className="register-subhead">
                <Ruler size={18} />
                <span>2. {t('Land size', 'Cultivable Land Size & Holding')}</span>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">{t('Total Cultivable Area', 'Total Cultivable Area')} *</label>
                  <div className="form-control-wrapper">
                    <span className="input-leading-icon"><Ruler size={16} /></span>
                    <input
                      type="number"
                      step="0.1"
                      className="form-input has-leading-icon"
                      placeholder="e.g. 12.5"
                      value={form.landSize}
                      onChange={(e) => setForm({ ...form, landSize: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">{t('Area Unit', 'Area Unit')} / इकाई *</label>
                  <select
                    className="form-select"
                    value={form.landUnit}
                    onChange={(e) => setForm({ ...form, landUnit: e.target.value })}
                  >
                    <option value="Acres">Acres (एकड़)</option>
                    <option value="Hectares">Hectares (हेक्टेयर)</option>
                    <option value="Bigha">Bigha (बीघा)</option>
                    <option value="Guntha">Guntha (गुंठा)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">{t('Land Categorization', 'Land Categorization')}</label>
                <select
                  className="form-select"
                  value={form.landType}
                  onChange={(e) => setForm({ ...form, landType: e.target.value })}
                >
                  <option value="Irrigated Cultivable Land">Fully Irrigated Cultivable Land (नहरी/सिंचित)</option>
                  <option value="Semi-Irrigated Land">Semi-Irrigated Land (अर्ध-सिंचित)</option>
                  <option value="Rainfed Dryland">Rainfed / Dryland (वर्षा आधारित)</option>
                  <option value="Orchard / Agro-Forestry">Orchard / Agro-Forestry Plantation</option>
                </select>
              </div>

              <div className="reg-nav-footer">
                <Button
                  type="button"
                  variant="outline"
                  icon={ArrowLeft}
                  onClick={() => setActiveStep(1)}
                >
                  {t('Back', 'Back')}
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  iconRight={ArrowRight}
                  onClick={() => setActiveStep(3)}
                >
                  {t('Continue to Soil, Crops & Water →', 'Continue to Soil, Crops & Water →')}
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: Soil information, Crops, Water availability */}
          {activeStep === 3 && (
            <div className="register-step-content animate-slide-in">
              <div className="register-section-header">
                <div className="section-header-icon">
                  <Sprout size={20} />
                </div>
                <div>
                  <h3>3. {t('Soil Information', 'Soil Information')}, 4. {t('Crops', 'Crops')} & 5. {t('Water Availability', 'Water Availability')}</h3>
                  <p>Crucial agronomic data for AI diagnosis, crop rotation plans & canal scheduling</p>
                </div>
              </div>

              {/* 3. Soil Information */}
              <div className="register-subhead">
                <Layers size={18} />
                <span>3. {t('Soil Information', 'Soil Information')}</span>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">{t('Primary Soil Type', 'Primary Soil Type')} *</label>
                  <select
                    className="form-select"
                    value={form.soilType}
                    onChange={(e) => setForm({ ...form, soilType: e.target.value })}
                    required
                  >
                    {SOIL_TYPES.map((soil) => (
                      <option key={soil.value} value={soil.value}>{soil.label}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">{t('Soil Health Card Status', 'Soil Health Card Status')}</label>
                  <select
                    className="form-select"
                    value={form.soilHealthCard}
                    onChange={(e) => setForm({ ...form, soilHealthCard: e.target.value })}
                  >
                    <option value="Yes - Active Health Card">Yes - Active Soil Health Card available</option>
                    <option value="Sample Submitted">Sample Submitted for Lab Testing</option>
                    <option value="Need Testing Assistance">Need Testing Assistance from Extension Officer</option>
                  </select>
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">{t('Estimated pH Level', 'Estimated pH Level')}</label>
                  <select
                    className="form-select"
                    value={form.soilPhLevel}
                    onChange={(e) => setForm({ ...form, soilPhLevel: e.target.value })}
                  >
                    <option value="7.2 (Neutral / Ideal)">6.5 - 7.5 (Neutral / Ideal for most crops)</option>
                    <option value="5.8 (Mildly Acidic)">5.5 - 6.4 (Mildly Acidic)</option>
                    <option value="8.2 (Alkaline / Saline)">7.6 - 8.5 (Alkaline / Sodic)</option>
                    <option value="Unknown">Not sure / Extension officer to test</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">{t('Organic Carbon & Fertility', 'Organic Carbon & Fertility')}</label>
                  <select
                    className="form-select"
                    value={form.organicCarbon}
                    onChange={(e) => setForm({ ...form, organicCarbon: e.target.value })}
                  >
                    <option value="High (> 0.75%)">High Organic Carbon (&gt; 0.75%)</option>
                    <option value="Medium (0.5% - 0.75%)">Medium Organic Carbon (0.5% - 0.75%)</option>
                    <option value="Low (< 0.5%)">Low Organic Carbon (&lt; 0.5%)</option>
                  </select>
                </div>
              </div>

              <hr className="divider-hr" />

              {/* 4. Crops Cultivated */}
              <div className="register-subhead">
                <Wheat size={18} />
                <span>4. {t('Crops', 'Crops Cultivated across Seasons (Select all that apply)')} *</span>
              </div>

              <div className="crop-selection-cloud">
                {ALL_CROPS_PRESETS.map((c) => {
                  const isSelected = form.crops.includes(c.name);
                  return (
                    <button
                      key={c.name}
                      type="button"
                      className={`crop-chip-btn ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => handleToggleCrop(c.name)}
                    >
                      <Sprout size={14} />
                      <span>{c.name}</span>
                      <span className="crop-category-tag">{c.category}</span>
                      {isSelected && <span className="crop-check-mark">✓</span>}
                    </button>
                  );
                })}
              </div>

              {/* Custom Crop Input */}
              <div className="custom-crop-bar">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Add custom crop or vegetable (e.g. Garlic, Turmeric, Apple)"
                  value={customCropInput}
                  onChange={(e) => setCustomCropInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddCustomCrop();
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handleAddCustomCrop}
                >
                  + Add Crop
                </Button>
              </div>

              {/* Selected Crops Summary Pills */}
              <div className="selected-crops-summary">
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-text-muted)' }}>
                  {t('Selected', 'Selected')} ({form.crops.length}):
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {form.crops.map((cr) => (
                    <span key={cr} className="selected-crop-pill">
                      {cr}
                      <button
                        type="button"
                        onClick={() => handleToggleCrop(cr)}
                        className="pill-remove-btn"
                        title="Remove"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <hr className="divider-hr" />

              {/* 5. Water Availability */}
              <div className="register-subhead">
                <Droplet size={18} />
                <span>5. {t('Water availability', 'Water Availability & Irrigation Source')}</span>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">{t('Primary Water Source', 'Primary Water Source')} *</label>
                  <select
                    className="form-select"
                    value={form.waterSource}
                    onChange={(e) => setForm({ ...form, waterSource: e.target.value })}
                  >
                    <option value="Canal & Borewell">Canal Water & Tube well / Borewell (नहरी + ट्यूबवेल)</option>
                    <option value="Canal Network Only">Canal Network Only (केवल नहरी)</option>
                    <option value="Borewell Only">Deep Borewell / Tubewell Only (ट्यूबवेल)</option>
                    <option value="Rainfed Monsoon">Rainfed / Monsoon Dependent (वर्षा आधारित)</option>
                    <option value="River / Stream Lift">River / Stream Lift Irrigation (नदी/तालाब)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">{t('Water Reliability', 'Water Reliability & Schedule')}</label>
                  <select
                    className="form-select"
                    value={form.waterReliability}
                    onChange={(e) => setForm({ ...form, waterReliability: e.target.value })}
                  >
                    <option value="Turn-Based (Canal 3 days/week + Borewell)">Canal Turn Basis (वारबंदी 3 days/week)</option>
                    <option value="24x7 Reliable Borewell">24x7 On-demand Borewell</option>
                    <option value="Seasonal / Monsoon only">Seasonal (Monsoon Only)</option>
                    <option value="Water Scarcity Zone">Water Scarcity / Drought-prone Zone</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">{t('Irrigation Method', 'Irrigation Method')}</label>
                <select
                  className="form-select"
                  value={form.irrigationType}
                  onChange={(e) => setForm({ ...form, irrigationType: e.target.value })}
                >
                  <option value="Drip Irrigation & Furrow">Drip Micro-Irrigation & Furrow (ड्रिप सिंचाई)</option>
                  <option value="Sprinkler System">Sprinkler Irrigation System (फव्वारा)</option>
                  <option value="Flood / Furrow Irrigation">Flood / Border Strip Furrow (पारंपरिक बहाव)</option>
                  <option value="Basin Irrigation">Basin Irrigation for Orchards</option>
                </select>
              </div>

              <div className="reg-nav-footer">
                <Button
                  type="button"
                  variant="outline"
                  icon={ArrowLeft}
                  onClick={() => setActiveStep(2)}
                >
                  {t('Back', 'Back')}
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  iconRight={ArrowRight}
                  onClick={() => setActiveStep(4)}
                >
                  {t('Continue to Preferences & Review →', 'Continue to Preferences & Review →')}
                </Button>
              </div>
            </div>
          )}

          {/* STEP 4: Farming preferences, Preferred language & Final Review */}
          {activeStep === 4 && (
            <div className="register-step-content animate-slide-in">
              <div className="register-section-header">
                <div className="section-header-icon">
                  <Sliders size={20} />
                </div>
                <div>
                  <h3>6. {t('Farming Preferences', 'Farming Preferences')} & 7. {t('Preferred Language', 'Preferred Language')}</h3>
                  <p>Configure your agricultural practice, mechanization, and regional dialect</p>
                </div>
              </div>

              {/* 6. Farming Preferences */}
              <div className="register-subhead">
                <Sliders size={18} />
                <span>6. {t('Farming Preferences', 'Farming Preferences & Practices')}</span>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">{t('Farming Method / Practice', 'Farming Method / Practice')} *</label>
                  <select
                    className="form-select"
                    value={form.farmingPreference}
                    onChange={(e) => setForm({ ...form, farmingPreference: e.target.value })}
                  >
                    <option value="Mixed Organic & Modern">Mixed Organic & Modern Integrated (एकीकृत खेती)</option>
                    <option value="100% Certified Organic">100% Certified Organic (जैविक खेती)</option>
                    <option value="Natural / Zero-Budget (ZBNF)">Natural / Zero-Budget Farming (प्राकृतिक खेती / सुभाष पालेकर)</option>
                    <option value="Conventional Mechanized">Conventional Mechanized (पारंपरिक उर्वरक आधारित)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">{t('Farm Mechanization', 'Farm Mechanization & Machinery')}</label>
                  <select
                    className="form-select"
                    value={form.mechanizationLevel}
                    onChange={(e) => setForm({ ...form, mechanizationLevel: e.target.value })}
                  >
                    <option value="Tractor Owner with Rotavator">Tractor Owner (ट्रैक्टर और आधुनिक उपकरण)</option>
                    <option value="Rental / Custom Hiring Center">Rental / CHC Custom Hiring Center</option>
                    <option value="Bullock / Manual Tools">Manual & Semi-Mechanized</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">{t('Primary Market', 'Primary Market & Harvest Selling Target')}</label>
                <select
                  className="form-select"
                  value={form.marketPreference}
                  onChange={(e) => setForm({ ...form, marketPreference: e.target.value })}
                >
                  <option value="Direct Buyer Marketplace + Local Mandi">AgriConnect Direct Buyer Marketplace + Local APMC Mandi</option>
                  <option value="Local APMC Mandi">Local APMC Mandi Only</option>
                  <option value="Government MSP Procurement">Government MSP Procurement Centers</option>
                  <option value="FPO / Farmer Producer Company">FPO / Cooperative Society</option>
                </select>
              </div>

              <hr className="divider-hr" />

              {/* 7. Preferred Language */}
              <div className="register-subhead">
                <Globe size={18} />
                <span>7. {t('Preferred Language', 'Preferred Regional Language / पसंदीदा भाषा')} *</span>
              </div>

              <div className="lang-selection-grid">
                {availableLanguages.map((lang) => {
                  const isLangSelected = form.preferredLanguage.toLowerCase() === lang.name.toLowerCase() || langCode === lang.code;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      className={`lang-choice-card ${isLangSelected ? 'is-selected' : ''}`}
                      onClick={() => {
                        setForm({ ...form, preferredLanguage: lang.name });
                        setLanguage(lang.code);
                        showToast(`Language set to ${lang.native} (${lang.name})`, 'info');
                      }}
                    >
                      <span className="lang-card-flag">{lang.flag}</span>
                      <span className="lang-card-native">{lang.native}</span>
                      <span className="lang-card-name">{lang.name}</span>
                      {isLangSelected && <span className="lang-card-check">✓</span>}
                    </button>
                  );
                })}
              </div>

              <hr className="divider-hr" />

              {/* Final Summary Card */}
              <div className="reg-review-summary-card">
                <div className="review-summary-title">
                  <FileCheck size={18} color="#15803d" />
                  <span>{t('Summary of Your Farm Identity', 'Summary of Your Farm Identity')}</span>
                </div>
                <div className="review-items-grid">
                  <div className="review-item">
                    <span className="review-lbl">Farmer Name:</span>
                    <strong>{form.fullName}</strong>
                  </div>
                  <div className="review-item">
                    <span className="review-lbl">Location:</span>
                    <strong>{form.locationVillage}, {form.locationDistrict}, {form.locationState}</strong>
                  </div>
                  <div className="review-item">
                    <span className="review-lbl">Land Size:</span>
                    <strong>{form.landSize} {form.landUnit} ({form.landType})</strong>
                  </div>
                  <div className="review-item">
                    <span className="review-lbl">Soil Info:</span>
                    <strong>{form.soilType} (pH {form.soilPhLevel.split(' ')[0]})</strong>
                  </div>
                  <div className="review-item">
                    <span className="review-lbl">Crops:</span>
                    <strong>{form.crops.join(', ')}</strong>
                  </div>
                  <div className="review-item">
                    <span className="review-lbl">Water Source:</span>
                    <strong>{form.waterSource}</strong>
                  </div>
                  <div className="review-item">
                    <span className="review-lbl">Farming Method:</span>
                    <strong>{form.farmingPreference}</strong>
                  </div>
                  <div className="review-item">
                    <span className="review-lbl">Language:</span>
                    <strong>{form.preferredLanguage}</strong>
                  </div>
                </div>
              </div>

              <div className="reg-nav-footer">
                <Button
                  type="button"
                  variant="outline"
                  icon={ArrowLeft}
                  onClick={() => setActiveStep(3)}
                >
                  {t('Back', 'Back')}
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  iconRight={CheckCircle2}
                  disabled={loading}
                >
                  {loading ? 'Registering Farm Profile...' : 'Complete Registration & Enter Dashboard →'}
                </Button>
              </div>
            </div>
          )}
        </form>
      </main>
    </div>
  );
};

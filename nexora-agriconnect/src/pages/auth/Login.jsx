import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Tractor,
  Phone,
  Lock,
  ArrowRight,
  ShieldCheck,
  Globe,
  Sparkles,
  UserCheck,
  CheckCircle2,
  HelpCircle,
  Wheat,
  ShoppingBag,
  Building2,
  KeyRound,
  Eye,
  EyeOff,
  Languages
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/ui/Button';
import { VoiceButton } from '../../components/ui/VoiceButton';
import { auth, signInWithEmailAndPassword, sendPasswordResetEmail } from '../../services/firebase';

export const LoginPage = () => {
  const navigate = useNavigate();
  const {
    loginUser,
    setRole,
    langCode,
    setLanguage,
    availableLanguages,
    openTranslator,
    t,
    showToast
  } = useApp();

  const [authMethod, setAuthMethod] = useState('password'); // 'password' | 'otp'
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [selectedRole, setSelectedRole] = useState('farmer');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!identifier || identifier.length < 10) {
      showToast('Please enter a valid 10-digit mobile number', 'error');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
      setOtp('7482'); // Demo pre-fill OTP
      showToast('Demo OTP 7482 sent to ' + identifier, 'info');
    }, 600);
  };

  const handleForgotPassword = async () => {
    if (!identifier) {
      showToast('Please enter your email or phone above first', 'warning');
      return;
    }
    const emailToReset = identifier.includes('@') ? identifier.trim() : `${identifier.trim()}@agriconnect.in`;
    try {
      await sendPasswordResetEmail(auth, emailToReset);
      showToast(`Password reset email sent to ${emailToReset}! Check your inbox.`, 'success');
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        showToast('No registered user found with this email.', 'error');
      } else {
        showToast(err.message || 'Could not send reset email.', 'error');
      }
    }
  };

  const handleLogin = async (e) => {
    e?.preventDefault();
    
    if (authMethod === 'password') {
      if (!identifier.trim()) {
        showToast('Please enter your email or mobile number.', 'error');
        return;
      }
      if (!password) {
        showToast('Please enter your password.', 'error');
        return;
      }

      setLoading(true);
      const emailToAuth = identifier.includes('@') ? identifier.trim() : `${identifier.replace(/\D/g, '')}@agriconnect.in`;

      try {
        const userCredential = await signInWithEmailAndPassword(auth, emailToAuth, password);
        const fbUser = userCredential.user;
        
        loginUser({
          identifier: fbUser.email || identifier,
          name: fbUser.displayName || identifier,
          role: selectedRole,
          uid: fbUser.uid
        });

        showToast(`Welcome back! Successfully authenticated.`, 'success');
        if (selectedRole === 'farmer') navigate('/farmer/dashboard');
        else if (selectedRole === 'buyer') navigate('/buyer/marketplace');
        else if (selectedRole === 'authority') navigate('/authority/dashboard');
        else if (selectedRole === 'admin') navigate('/admin/dashboard');
      } catch (err) {
        console.error('Firebase Auth Error:', err);
        if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
          showToast('Incorrect password. Please verify and try again.', 'error');
        } else if (err.code === 'auth/user-not-found') {
          showToast('No user found with this account. Please register first.', 'error');
        } else if (err.code === 'auth/invalid-email') {
          showToast('Please enter a valid email address.', 'error');
        } else if (err.code === 'auth/too-many-requests') {
          showToast('Too many failed attempts. Please try again later or reset password.', 'error');
        } else {
          // Fallback if demo or network error
          showToast(err.message || 'Authentication failed. Please check credentials.', 'error');
        }
      } finally {
        setLoading(false);
      }
      return;
    }

    // OTP Flow
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      loginUser({
        identifier,
        password,
        role: selectedRole
      });

      // Route according to role
      if (selectedRole === 'farmer') navigate('/farmer/dashboard');
      else if (selectedRole === 'buyer') navigate('/buyer/marketplace');
      else if (selectedRole === 'authority') navigate('/authority/dashboard');
      else if (selectedRole === 'admin') navigate('/admin/dashboard');
    }, 500);
  };

  const handleQuickDemoLogin = (roleKey, phoneNum) => {
    setSelectedRole(roleKey);
    setIdentifier(phoneNum);
    loginUser({
      identifier: phoneNum,
      role: roleKey
    });
    if (roleKey === 'farmer') navigate('/farmer/dashboard');
    else if (roleKey === 'buyer') navigate('/buyer/marketplace');
    else if (roleKey === 'authority') navigate('/authority/dashboard');
    else if (roleKey === 'admin') navigate('/admin/dashboard');
  };

  return (
    <div className="auth-page-wrapper">
      {/* Background Decorative Circles */}
      <div className="auth-bg-decor auth-bg-decor-1" />
      <div className="auth-bg-decor auth-bg-decor-2" />

      {/* Top Header Bar with Language Picker */}
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
          <button
            type="button"
            className="language-btn"
            onClick={() => openTranslator('Welcome to AgriConnect. Sign In with your mobile number')}
            style={{ backgroundColor: '#f0fdf4', borderColor: '#bbf7d0', color: '#15803d' }}
            title="Open AgriTranslate Tool"
          >
            <Languages size={15} />
            <span>{t('AgriTranslate', 'AgriTranslate')}</span>
          </button>

          <VoiceButton
            textToRead="Welcome to AgriConnect Login. Enter your mobile number or select a demo role to sign in to your dashboard."
          />
          <div className="auth-lang-selector">
            <Globe size={15} />
            <select
              value={langCode}
              onChange={(e) => {
                setLanguage(e.target.value);
                const langObj = availableLanguages.find(l => l.code === e.target.value);
                if (langObj) showToast(`Language switched to ${langObj.native} (${langObj.name})`, 'success');
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

      {/* Main Login Split Container */}
      <main className="auth-container">
        <div className="auth-split-grid">
          {/* Left Promo / Value Proposition Column */}
          <div className="auth-hero-column">
            <div className="auth-hero-badge">
              <Sparkles size={14} />
              <span>Smart India Hackathon 2026 Initiative</span>
            </div>

            <h1 className="auth-hero-title">
              Empowering India's Farmers with AI & Real-Time Intelligence
            </h1>

            <p className="auth-hero-desc">
              Direct access to weather forecasting, soil intelligence, government MSP subsidies, canal water turnaround, and zero-commission buyers.
            </p>

            {/* Feature Badges */}
            <div className="auth-features-list">
              <div className="auth-feature-item">
                <div className="auth-feature-icon">
                  <CheckCircle2 size={16} color="#15803d" />
                </div>
                <div>
                  <strong>Voice-Guided & 9 Regional Languages</strong>
                  <p>Speak in your regional mother tongue or listen to voice advisories.</p>
                </div>
              </div>

              <div className="auth-feature-item">
                <div className="auth-feature-icon">
                  <CheckCircle2 size={16} color="#15803d" />
                </div>
                <div>
                  <strong>Instant Soil & Crop Analytics</strong>
                  <p>AI diagnosis for pest alerts and automated fertilizer dosages.</p>
                </div>
              </div>

              <div className="auth-feature-item">
                <div className="auth-feature-icon">
                  <CheckCircle2 size={16} color="#15803d" />
                </div>
                <div>
                  <strong>Direct Mandi & Buyer Marketplace</strong>
                  <p>Sell harvested produce directly to verified buyers with zero middleman fee.</p>
                </div>
              </div>
            </div>

            {/* Quick Demo Credentials Panel */}
            <div className="auth-demo-presets">
              <div className="auth-demo-header">
                <UserCheck size={16} />
                <span>One-Click Demo Instant Access:</span>
              </div>
              <div className="auth-demo-grid">
                <button
                  type="button"
                  className="auth-demo-btn farmer-demo"
                  onClick={() => handleQuickDemoLogin('farmer', '+91 98765 43210')}
                >
                  <Wheat size={14} />
                  <span>Farmer Demo (Ramesh)</span>
                </button>
                <button
                  type="button"
                  className="auth-demo-btn buyer-demo"
                  onClick={() => handleQuickDemoLogin('buyer', '+91 98765 22334')}
                >
                  <ShoppingBag size={14} />
                  <span>Buyer (AgriCorp)</span>
                </button>
                <button
                  type="button"
                  className="auth-demo-btn authority-demo"
                  onClick={() => handleQuickDemoLogin('authority', '+91 98765 99881')}
                >
                  <Building2 size={14} />
                  <span>Govt Authority</span>
                </button>
                <button
                  type="button"
                  className="auth-demo-btn admin-demo"
                  onClick={() => handleQuickDemoLogin('admin', '+91 99887 76655')}
                >
                  <ShieldCheck size={14} />
                  <span>Platform Admin</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Login Card Column */}
          <div className="auth-card-column">
            <div className="auth-card">
              <div className="auth-card-header">
                <h2>{t('Sign In', 'Sign In to AgriConnect')}</h2>
                <p>{t('Enter your credentials or mobile number to continue', 'Enter your credentials or mobile number to continue')}</p>
              </div>

              {/* Role Selection Tabs */}
              <div className="auth-role-tabs">
                <button
                  type="button"
                  className={`auth-role-tab ${selectedRole === 'farmer' ? 'is-active' : ''}`}
                  onClick={() => setSelectedRole('farmer')}
                >
                  <Wheat size={16} />
                  <span>{t('Farmer', 'Farmer')}</span>
                </button>
                <button
                  type="button"
                  className={`auth-role-tab ${selectedRole === 'buyer' ? 'is-active' : ''}`}
                  onClick={() => setSelectedRole('buyer')}
                >
                  <ShoppingBag size={16} />
                  <span>{t('Buyer', 'Buyer')}</span>
                </button>
                <button
                  type="button"
                  className={`auth-role-tab ${selectedRole === 'authority' ? 'is-active' : ''}`}
                  onClick={() => setSelectedRole('authority')}
                >
                  <Building2 size={16} />
                  <span>{t('Authority', 'Authority')}</span>
                </button>
              </div>

              {/* Login Method Toggle: OTP vs Password */}
              <div className="auth-method-toggle">
                <button
                  type="button"
                  className={`auth-method-btn ${authMethod === 'otp' ? 'is-active' : ''}`}
                  onClick={() => {
                    setAuthMethod('otp');
                    setOtpSent(false);
                  }}
                >
                  <Phone size={14} />
                  <span>Mobile OTP</span>
                </button>
                <button
                  type="button"
                  className={`auth-method-btn ${authMethod === 'password' ? 'is-active' : ''}`}
                  onClick={() => setAuthMethod('password')}
                >
                  <KeyRound size={14} />
                  <span>Password</span>
                </button>
              </div>

              {/* OTP Form */}
              {authMethod === 'otp' && (
                <form onSubmit={otpSent ? handleLogin : handleSendOtp} className="auth-form">
                  <div className="form-group">
                    <label className="form-label">
                      <span>{t('Registered Mobile Number', 'Registered Mobile Number')}</span>
                      <span style={{ fontSize: '11px', color: 'var(--color-primary)', fontWeight: 600 }}>10 Digits</span>
                    </label>
                    <div className="form-control-wrapper">
                      <span className="auth-country-code">+91</span>
                      <input
                        type="tel"
                        className="form-input auth-tel-input"
                        placeholder="98765 43210"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        maxLength={10}
                        required
                      />
                    </div>
                  </div>

                  {otpSent && (
                    <div className="form-group animate-slide-down">
                      <label className="form-label">
                        <span>Enter 4-Digit OTP</span>
                        <button
                          type="button"
                          className="auth-resend-link"
                          onClick={() => showToast('New OTP sent to ' + identifier, 'info')}
                        >
                          Resend OTP
                        </button>
                      </label>
                      <input
                        type="text"
                        className="form-input auth-otp-input"
                        placeholder="Enter 4-digit code (Demo: 7482)"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        maxLength={6}
                        autoFocus
                        required
                      />
                      <span className="form-helper" style={{ color: '#15803d' }}>
                        ✓ Demo pre-filled code: <strong>7482</strong>
                      </span>
                    </div>
                  )}

                  <div className="auth-submit-wrapper">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      iconRight={ArrowRight}
                      disabled={loading}
                      style={{ width: '100%' }}
                    >
                      {loading
                        ? 'Processing...'
                        : otpSent
                        ? 'Verify OTP & Log In'
                        : 'Send OTP SMS →'}
                    </Button>
                  </div>
                </form>
              )}

              {/* Password Form */}
              {authMethod === 'password' && (
                <form onSubmit={handleLogin} className="auth-form">
                  <div className="form-group">
                    <label className="form-label">{t('Mobile Number or Email', 'Mobile Number or Email')}</label>
                    <div className="form-control-wrapper">
                      <span className="input-leading-icon">
                        <Phone size={16} />
                      </span>
                      <input
                        type="text"
                        className="form-input has-leading-icon"
                        placeholder="e.g. 9876543210 or ramesh@agri.in"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="flex-between" style={{ marginBottom: '4px' }}>
                      <label className="form-label" style={{ margin: 0 }}>{t('Password', 'Password')}</label>
                      <button
                        type="button"
                        className="auth-forgot-link"
                        onClick={handleForgotPassword}
                        title="Send password reset link"
                      >
                        Forgot?
                      </button>
                    </div>
                    <div className="form-control-wrapper">
                      <span className="input-leading-icon">
                        <Lock size={16} />
                      </span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="form-input has-leading-icon"
                        placeholder="Enter your account password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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

                  <div className="auth-submit-wrapper">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      iconRight={ArrowRight}
                      disabled={loading}
                      style={{ width: '100%' }}
                    >
                      {loading ? 'Authenticating...' : 'Sign In to Account →'}
                    </Button>
                  </div>
                </form>
              )}

              {/* Bottom Switch to Register */}
              <div className="auth-footer-prompt">
                <span>New to AgriConnect?</span>
                <Link to="/register" className="auth-switch-link">
                  Create Farmer Profile / Register →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

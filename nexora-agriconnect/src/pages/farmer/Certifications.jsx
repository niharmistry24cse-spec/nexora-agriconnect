import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BadgeCheck,
  Sprout,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileText,
  Download,
  QrCode,
  Search,
  UploadCloud,
  Layers,
  Leaf,
  Sparkles,
  Calendar,
  Building2,
  ArrowUpRight,
  Filter,
  Check,
  FileCheck,
  Plus
} from 'lucide-react';
import { PageShell } from '../../components/layout/PageShell';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Stepper } from '../../components/ui/Stepper';
import { VoiceButton } from '../../components/ui/VoiceButton';
import { useApp } from '../../context/AppContext';

export const FarmerCertifications = () => {
  const { farmer, certifications, submitCertificationRequest, showToast, t } = useApp();

  const [filterType, setFilterType] = useState('all');
  const [verifyCertId, setVerifyCertId] = useState('');
  const [verifiedResult, setVerifiedResult] = useState(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedQrCrop, setSelectedQrCrop] = useState(null);

  // New Application Form State
  const [newApp, setNewApp] = useState({
    cropName: 'Basmati Rice (Pusa 1121)',
    parcelName: 'North Field',
    certType: '100% Certified Organic (NPOP)',
    acres: '5.5',
    lastChemicalUse: 'More than 3 years ago',
    soilTestAttached: true
  });

  // Mock crop certifications dataset
  const cropCertificationsList = [
    {
      id: 'cert-org-wheat',
      cropName: 'Wheat (PBW 550 / Sharbati)',
      parcelName: 'North Field (Khasra 45/2)',
      acres: '12.5 Acres',
      organicStatus: '100% Certified Organic',
      statusVariant: 'success',
      standard: 'NPOP & Jaivik Bharat (APEDA)',
      certNumber: 'ORG-IN-2024-8832',
      validUntil: '31 Dec 2026',
      residueTest: '0.00 ppm (Clean - Lab Verified)',
      soilCarbon: '0.82% (High Organic)',
      issuedBy: 'Punjab State Organic Certification Agency (PSOCA)',
      qrCodeData: 'https://agriconnect.gov.in/verify/ORG-IN-2024-8832',
      isOrganic: true
    },
    {
      id: 'cert-pgs-mustard',
      cropName: 'Mustard (Pusa Bold)',
      parcelName: 'River Side (Khasra 12/1)',
      acres: '5.2 Acres',
      organicStatus: 'In-Conversion (Year 2 PGS-India)',
      statusVariant: 'warning',
      standard: 'PGS-India Green Transition',
      certNumber: 'PGS-PB-2024-9120',
      validUntil: '15 Mar 2026',
      residueTest: '0.01 ppm (Transition Stage)',
      soilCarbon: '0.64% (Medium Organic)',
      issuedBy: 'Regional Council PGS-India Ludhiana',
      qrCodeData: 'https://agriconnect.gov.in/verify/PGS-PB-2024-9120',
      isOrganic: false,
      isConversion: true
    },
    {
      id: 'cert-zbnf-paddy',
      cropName: 'Basmati Rice (Pusa 1121)',
      parcelName: 'South Canal Basin (Khasra 88/3)',
      acres: '4.0 Acres',
      organicStatus: 'Natural / Zero-Budget (ZBNF)',
      statusVariant: 'success',
      standard: 'Natural Farming Stewardship Seal',
      certNumber: 'ZBNF-REG-5529',
      validUntil: '28 Oct 2025',
      residueTest: '0.00 ppm (Jeevamrutha Treated)',
      soilCarbon: '0.78% (High Organic)',
      issuedBy: 'Department of Agriculture & Farmers Welfare',
      qrCodeData: 'https://agriconnect.gov.in/verify/ZBNF-REG-5529',
      isOrganic: true
    },
    {
      id: 'cert-gap-cotton',
      cropName: 'Cotton (Bt RCH-659)',
      parcelName: 'West High Field',
      acres: '6.0 Acres',
      organicStatus: 'Good Agricultural Practices (GAP)',
      statusVariant: 'info',
      standard: 'IndGAP Residue-Safe Protocol',
      certNumber: 'GAP-IN-4421-99',
      validUntil: '30 Nov 2025',
      residueTest: 'Passes Safe MRL Limits',
      soilCarbon: '0.55% (Standard)',
      issuedBy: 'National Accreditation Board for Certification',
      qrCodeData: 'https://agriconnect.gov.in/verify/GAP-IN-4421-99',
      isOrganic: false,
      isGap: true
    }
  ];

  const filteredCrops = cropCertificationsList.filter((c) => {
    if (filterType === 'organic') return c.isOrganic;
    if (filterType === 'conversion') return c.isConversion;
    if (filterType === 'gap') return c.isGap;
    return true;
  });

  const handleVerifyCertificate = (e) => {
    e?.preventDefault();
    if (!verifyCertId.trim()) return;

    const found = cropCertificationsList.find(
      (c) => c.certNumber.toLowerCase() === verifyCertId.trim().toLowerCase()
    );

    if (found) {
      setVerifiedResult({
        found: true,
        crop: found.cropName,
        status: found.organicStatus,
        standard: found.standard,
        certNumber: found.certNumber,
        validUntil: found.validUntil,
        issuer: found.issuedBy,
        farmer: farmer.name,
        location: `${farmer.village}, ${farmer.district}`
      });
      showToast(`Certificate ${found.certNumber} is VALID & ACTIVE!`, 'success');
    } else {
      setVerifiedResult({
        found: false,
        query: verifyCertId
      });
      showToast(`No active certificate found for ${verifyCertId}`, 'error');
    }
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    submitCertificationRequest({
      certificationType: newApp.certType,
      cropDetail: `${newApp.cropName} (${newApp.acres} Acres - ${newApp.parcelName})`
    });
    setShowApplyModal(false);
    showToast('New Crop Certification Application submitted to Authority Review Queue!', 'success');
  };

  return (
    <PageShell title={t('Crop Certifications', 'Crop Certifications')}>
      {/* Top Banner */}
      <div style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-5) var(--space-6)',
        boxShadow: 'var(--shadow-card)',
        marginBottom: 'var(--space-6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 'var(--space-4)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 800, color: 'var(--color-primary)' }}>
              {t('Crop Certifications', 'Crop Certifications & Organic Compliance')}
            </h1>
            <VoiceButton
              textToRead={`Crop Certifications. Manage your organic and residue-free certificates. 12.5 out of 17.7 acres are 100% certified organic.`}
            />
          </div>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginTop: '4px', maxWidth: '650px' }}>
            Track whether your harvested crops are <strong>100% Certified Organic (NPOP)</strong>, <strong>In-Conversion</strong>, or <strong>Residue-Free GAP</strong> to command up to 35% higher prices on the AgriConnect Marketplace.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <Button
            variant="primary"
            icon={Plus}
            onClick={() => setShowApplyModal(true)}
          >
            {t('Apply for Certification', 'Apply for New Certification')}
          </Button>
        </div>
      </div>

      {/* 4 Stat Overview Metrics */}
      <div className="grid-4" style={{ marginBottom: 'var(--space-6)' }}>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                Organic Acreage
              </div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#15803d', marginTop: '2px' }}>
                12.5 / 17.7 <span style={{ fontSize: '14px', fontWeight: 600 }}>Acres</span>
              </div>
              <div style={{ fontSize: '11px', color: '#15803d', fontWeight: 600, marginTop: '2px' }}>
                ✓ 70.6% Certified Organic
              </div>
            </div>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#15803d' }}>
              <Leaf size={22} />
            </div>
          </div>
        </Card>

        <Card>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                Active Certificates
              </div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-text)', marginTop: '2px' }}>
                3 <span style={{ fontSize: '14px', fontWeight: 600 }}>Crops</span>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                NPOP + PGS-India + ZBNF
              </div>
            </div>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'var(--color-primary-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
              <BadgeCheck size={22} />
            </div>
          </div>
        </Card>

        <Card>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                Chemical Residue Score
              </div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#15803d', marginTop: '2px' }}>
                0.00 <span style={{ fontSize: '14px', fontWeight: 600 }}>ppm</span>
              </div>
              <div style={{ fontSize: '11px', color: '#15803d', fontWeight: 600, marginTop: '2px' }}>
                ✓ Clean (Lab Tested Oct 2025)
              </div>
            </div>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1d4ed8' }}>
              <ShieldCheck size={22} />
            </div>
          </div>
        </Card>

        <Card>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                Organic Mandi Premium
              </div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#b45309', marginTop: '2px' }}>
                +22% <span style={{ fontSize: '14px', fontWeight: 600 }}>vs MSP</span>
              </div>
              <div style={{ fontSize: '11px', color: '#b45309', fontWeight: 600, marginTop: '2px' }}>
                Direct Buyer Verified Price
              </div>
            </div>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#b45309' }}>
              <Sparkles size={22} />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Grid: Crop-by-Crop Certification Cards & Verifier Tool */}
      <div className="grid-3" style={{ gridTemplateColumns: '2fr 1fr', alignItems: 'start', marginBottom: 'var(--space-6)' }}>
        {/* Left: Crop Certifications List */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--color-text)', margin: 0 }}>
                Crop Organic & Quality Status
              </h2>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', margin: '2px 0 0 0' }}>
                Detailed compliance status for each field parcel
              </p>
            </div>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '4px', background: 'var(--color-surface)', padding: '3px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <button
                type="button"
                className={`btn btn-sm ${filterType === 'all' ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setFilterType('all')}
              >
                All Crops
              </button>
              <button
                type="button"
                className={`btn btn-sm ${filterType === 'organic' ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setFilterType('organic')}
              >
                100% Organic
              </button>
              <button
                type="button"
                className={`btn btn-sm ${filterType === 'conversion' ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setFilterType('conversion')}
              >
                In-Conversion
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {filteredCrops.map((crop) => (
              <Card key={crop.id} style={{ position: 'relative', overflow: 'hidden' }}>
                {crop.isOrganic && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    backgroundColor: '#15803d',
                    color: '#fff',
                    padding: '4px 12px',
                    fontSize: '11px',
                    fontWeight: 700,
                    borderBottomLeftRadius: 'var(--radius-md)'
                  }}>
                    ★ 100% ORGANIC CERTIFIED
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: 'var(--radius-lg)',
                      backgroundColor: crop.isOrganic ? '#dcfce7' : '#fef3c7',
                      color: crop.isOrganic ? '#15803d' : '#b45309',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Sprout size={24} />
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--color-text)', margin: 0 }}>
                          {crop.cropName}
                        </h3>
                        <Badge variant={crop.statusVariant}>
                          {crop.organicStatus}
                        </Badge>
                      </div>

                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                        {crop.parcelName} · <strong>{crop.acres}</strong> · Standard: <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>{crop.standard}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                  gap: '12px',
                  backgroundColor: 'var(--color-surface-subtle)',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  marginTop: 'var(--space-4)'
                }}>
                  <div>
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 700, display: 'block' }}>
                      Certificate No.
                    </span>
                    <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, fontFamily: 'monospace', color: 'var(--color-primary)' }}>
                      {crop.certNumber}
                    </span>
                  </div>

                  <div>
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 700, display: 'block' }}>
                      Validity Date
                    </span>
                    <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-text)' }}>
                      {crop.validUntil}
                    </span>
                  </div>

                  <div>
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 700, display: 'block' }}>
                      Pesticide Residue
                    </span>
                    <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: crop.isOrganic ? '#15803d' : 'var(--color-text)' }}>
                      {crop.residueTest}
                    </span>
                  </div>

                  <div>
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 700, display: 'block' }}>
                      Issuing Board
                    </span>
                    <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                      {crop.issuedBy}
                    </span>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'var(--space-3)', paddingTop: 'var(--space-2)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                    <CheckCircle2 size={14} color="#15803d" />
                    <span>Geo-tagged to Ludhiana Revenue Block</span>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Button
                      variant="outline"
                      size="sm"
                      icon={QrCode}
                      onClick={() => setSelectedQrCrop(crop)}
                    >
                      QR Traceability
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      icon={Download}
                      onClick={() => showToast(`Downloaded official PDF certificate: ${crop.certNumber}`, 'success')}
                    >
                      Download PDF
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Sidebar: Certificate Verifier & Quick Checklist */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {/* Certificate Authenticity Verifier */}
          <Card title="Certificate Verifier">
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-3)' }}>
              Verify validity, NPOP standards, and authenticity of any Indian organic certificate number:
            </p>

            <form onSubmit={handleVerifyCertificate}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. ORG-IN-2024-8832"
                  value={verifyCertId}
                  onChange={(e) => setVerifyCertId(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  icon={Search}
                  style={{ flex: 1 }}
                >
                  Verify Certificate
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setVerifyCertId('ORG-IN-2024-8832');
                    setTimeout(() => handleVerifyCertificate(), 50);
                  }}
                >
                  Demo Code
                </Button>
              </div>
            </form>

            {verifiedResult && (
              <div style={{
                marginTop: 'var(--space-3)',
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: verifiedResult.found ? '#F0FDF4' : '#FEF2F2',
                border: `1px solid ${verifiedResult.found ? '#BBF7D0' : '#FECACA'}`
              }}>
                {verifiedResult.found ? (
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#15803d', fontWeight: 700, fontSize: 'var(--text-sm)' }}>
                      <CheckCircle2 size={16} /> VERIFIED & GENUINE
                    </div>
                    <div style={{ fontSize: 'var(--text-xs)', marginTop: '4px', color: 'var(--color-text)' }}>
                      <strong>Crop:</strong> {verifiedResult.crop}<br />
                      <strong>Status:</strong> {verifiedResult.status}<br />
                      <strong>Standard:</strong> {verifiedResult.standard}<br />
                      <strong>Valid Until:</strong> {verifiedResult.validUntil}<br />
                      <strong>Accreditation:</strong> {verifiedResult.issuer}
                    </div>
                  </div>
                ) : (
                  <div style={{ color: '#B91C1C', fontSize: 'var(--text-xs)' }}>
                    <strong>No record found</strong> for certificate "{verifiedResult.query}". Please check the ID.
                  </div>
                )}
              </div>
            )}
          </Card>

          {/* Organic Compliance Checklist */}
          <Card title="Organic Compliance Guidelines">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', gap: '8px', fontSize: 'var(--text-xs)' }}>
                <Check size={16} color="#15803d" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Zero synthetic chemical pesticide or urea usage for 36 consecutive months.</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', fontSize: 'var(--text-xs)' }}>
                <Check size={16} color="#15803d" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Non-GMO, indigenous or certified organic seeds utilized.</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', fontSize: 'var(--text-xs)' }}>
                <Check size={16} color="#15803d" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Annual soil microbial & heavy metal residue lab test score &lt; 0.01 ppm.</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', fontSize: 'var(--text-xs)' }}>
                <Check size={16} color="#15803d" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Maintain farm logbook with bio-fertilizers & neem cake applications.</span>
              </div>
            </div>
          </Card>

          {/* Active Application Pipeline */}
          <Card title="Pending Applications">
            {certifications.filter(c => c.steps).map((cert) => (
              <div key={cert.id} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div>
                    <span style={{ fontWeight: 700, fontSize: 'var(--text-xs)' }}>{cert.title}</span>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{cert.crop}</div>
                  </div>
                  <Badge variant={cert.statusVariant || 'warning'}>{cert.status}</Badge>
                </div>
                <Stepper steps={cert.steps} />
              </div>
            ))}
          </Card>
        </div>
      </div>

      {/* QR Modal */}
      {selectedQrCrop && (
        <div className="modal-backdrop" onClick={() => setSelectedQrCrop(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '420px', textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '10px' }}>
              <h3 style={{ margin: 0, fontSize: 'var(--text-md)', fontWeight: 700 }}>
                Traceability QR Code
              </h3>
              <button type="button" onClick={() => setSelectedQrCrop(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}>×</button>
            </div>

            <div style={{ padding: 'var(--space-4) 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: '180px',
                height: '180px',
                backgroundColor: '#fff',
                border: '2px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-md)',
                marginBottom: '14px'
              }}>
                <QrCode size={130} color="var(--color-primary)" />
              </div>

              <div style={{ fontWeight: 700, fontSize: 'var(--text-base)' }}>{selectedQrCrop.cropName}</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                Certificate: <strong>{selectedQrCrop.certNumber}</strong>
              </div>
              <Badge variant="success" style={{ marginTop: '8px' }}>
                {selectedQrCrop.organicStatus}
              </Badge>
              <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '8px' }}>
                Buyers and consumers scan this QR to trace the farmer, farm location, and lab test reports.
              </p>
            </div>

            <Button variant="primary" size="md" onClick={() => {
              showToast('QR Code saved as printable packaging label sticker', 'success');
              setSelectedQrCrop(null);
            }}>
              Download Label Sticker
            </Button>
          </div>
        </div>
      )}

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="modal-backdrop" onClick={() => setShowApplyModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Leaf size={20} color="#15803d" />
                <h3 style={{ margin: 0, fontSize: 'var(--text-md)', fontWeight: 800 }}>
                  Apply for Crop Certification
                </h3>
              </div>
              <button type="button" onClick={() => setShowApplyModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px' }}>×</button>
            </div>

            <form onSubmit={handleApplySubmit} style={{ marginTop: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div className="form-group">
                <label className="form-label">Select Crop to Certify *</label>
                <select
                  className="form-select"
                  value={newApp.cropName}
                  onChange={(e) => setNewApp({ ...newApp, cropName: e.target.value })}
                  required
                >
                  <option value="Basmati Rice (Pusa 1121)">Basmati Rice (Pusa 1121)</option>
                  <option value="Wheat (PBW 550)">Wheat (PBW 550)</option>
                  <option value="Mustard (Pusa Bold)">Mustard (Pusa Bold)</option>
                  <option value="Cotton (Bt RCH-659)">Cotton (Bt RCH-659)</option>
                  <option value="Sugarcane (Co 0238)">Sugarcane (Co 0238)</option>
                </select>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Field Parcel *</label>
                  <select
                    className="form-select"
                    value={newApp.parcelName}
                    onChange={(e) => setNewApp({ ...newApp, parcelName: e.target.value })}
                  >
                    <option value="North Field">North Field (12.5 Acres)</option>
                    <option value="River Side">River Side (5.2 Acres)</option>
                    <option value="South Canal Basin">South Canal Basin (4.0 Acres)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Acreage under Request *</label>
                  <input
                    type="number"
                    className="form-input"
                    value={newApp.acres}
                    onChange={(e) => setNewApp({ ...newApp, acres: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Certification Standard Desired *</label>
                <select
                  className="form-select"
                  value={newApp.certType}
                  onChange={(e) => setNewApp({ ...newApp, certType: e.target.value })}
                >
                  <option value="100% Certified Organic (NPOP)">100% Certified Organic (NPOP - APEDA Standard)</option>
                  <option value="PGS-India Organic Green (Participatory)">PGS-India Organic Green (Participatory Guarantee)</option>
                  <option value="Good Agricultural Practices (GAP)">Good Agricultural Practices (IndGAP Residue-Safe)</option>
                  <option value="Natural / Zero-Budget (ZBNF)">Natural / Zero-Budget Farming (ZBNF Seal)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Supporting Lab & Field Reports</label>
                <div style={{ border: '2px dashed var(--color-border)', padding: '16px', borderRadius: 'var(--radius-md)', textAlign: 'center', backgroundColor: 'var(--color-surface-subtle)' }}>
                  <UploadCloud size={24} color="var(--color-primary)" style={{ margin: '0 auto 4px auto' }} />
                  <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>Soil & Water Testing Report Attached (Auto-Linked)</div>
                  <span style={{ fontSize: '11px', color: '#15803d', fontWeight: 600 }}>✓ Soil_Health_Ludhiana_2025.pdf</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: 'var(--space-3)' }}>
                <Button type="button" variant="outline" onClick={() => setShowApplyModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" icon={CheckCircle2}>
                  Submit Application →
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PageShell>
  );
};

import React, { useState } from 'react';
import { Sprout, UploadCloud, Play, FileCheck, CheckCircle2 } from 'lucide-react';
import { PageShell } from '../../components/layout/PageShell';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Select } from '../../components/ui/Select';
import { Input } from '../../components/ui/Input';
import { Stepper } from '../../components/ui/Stepper';
import { VoiceButton } from '../../components/ui/VoiceButton';
import { useApp } from '../../context/AppContext';

export const CertificationRequest = () => {
  const { certifications, submitCertificationRequest, showToast } = useApp();

  const [form, setForm] = useState({
    certificationType: 'Organic Transition',
    cropDetail: '',
    uploadedFiles: []
  });

  const handleSimulateUpload = () => {
    setForm(prev => ({
      ...prev,
      uploadedFiles: [...prev.uploadedFiles, 'Soil_Testing_Report_Ludhiana.pdf']
    }));
    showToast('Soil_Testing_Report_Ludhiana.pdf attached successfully', 'info');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.cropDetail) {
      showToast('Please specify crop and acreage detail', 'danger');
      return;
    }

    submitCertificationRequest({
      certificationType: form.certificationType,
      cropDetail: form.cropDetail
    });

    setForm({
      certificationType: 'Organic Transition',
      cropDetail: '',
      uploadedFiles: []
    });
  };

  return (
    <PageShell title="Certification Request" sidebarCollapsed={true} contentMaxWidth="820px">
      <div className="page-header" style={{ marginBottom: 'var(--space-4)' }}>
        <div className="page-title-group">
          <div className="page-title">
            <span>Certification Request</span>
            <VoiceButton textToRead="Certification Request. Submit and track your product quality certifications." />
          </div>
          <span className="page-subtitle">Submit and track your product quality certifications.</span>
        </div>
      </div>

      {/* Active Requests Section */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 700, marginBottom: 'var(--space-3)' }}>
          Active Requests
        </h3>

        {certifications.filter(c => c.steps).map((cert) => (
          <Card key={cert.id} style={{ marginBottom: 'var(--space-4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--color-primary-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
                  <Sprout size={18} />
                </div>
                <div>
                  <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}>{cert.title}</h4>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                    {cert.requestId || cert.id} · {cert.crop}
                  </div>
                </div>
              </div>

              <Badge variant={cert.statusVariant || 'warning'}>
                {cert.status}
              </Badge>
            </div>

            {/* Stepper */}
            <Stepper steps={cert.steps} />
          </Card>
        ))}
      </div>

      {/* New Application Form Card */}
      <Card title="New Application">
        <form onSubmit={handleSubmit}>
          <div className="grid-2">
            <Select
              label="Certification Type"
              value={form.certificationType}
              onChange={(e) => setForm({ ...form, certificationType: e.target.value })}
              options={[
                'Organic Transition',
                'Certified Organic (Full)',
                'Good Agricultural Practices (GAP)',
                'Zero Budget Natural Farming (ZBNF)'
              ]}
              required
            />

            <Input
              label="Crop / Product Detail"
              placeholder="e.g., Basmati Rice - 50 Acres"
              value={form.cropDetail}
              onChange={(e) => setForm({ ...form, cropDetail: e.target.value })}
              required
            />
          </div>

          {/* Upload Drop Zone */}
          <div className="form-group" style={{ marginTop: 'var(--space-3)' }}>
            <label className="form-label">
              <span>Upload Supporting Documents</span>
            </label>
            <p className="form-helper" style={{ marginBottom: 'var(--space-2)' }}>
              Please provide soil test reports and previous season records.
            </p>

            <div
              onClick={handleSimulateUpload}
              style={{
                border: '2px dashed var(--color-border-dark)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-6)',
                textAlign: 'center',
                backgroundColor: 'var(--color-surface-subtle)',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'inline-flex', padding: '10px', backgroundColor: 'var(--color-surface)', borderRadius: '50%', marginBottom: '8px', border: '1px solid var(--color-border)' }}>
                <UploadCloud size={24} color="var(--color-primary)" />
              </div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                Tap to upload files
              </div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                PDF, JPG up to 10MB
              </div>
            </div>

            {form.uploadedFiles.length > 0 && (
              <div style={{ marginTop: '8px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {form.uploadedFiles.map((f, i) => (
                  <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: 'var(--text-xs)', padding: '4px 8px', backgroundColor: 'var(--color-surface-subtle)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }}>
                    <FileCheck size={13} color="var(--color-primary)" /> {f}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-5)' }}>
            <Button
              variant="primary"
              type="submit"
              icon={Play}
            >
              Submit Request
            </Button>
          </div>
        </form>
      </Card>
    </PageShell>
  );
};

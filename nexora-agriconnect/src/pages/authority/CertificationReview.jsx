import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FileText,
  ZoomIn,
  ZoomOut,
  Download,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  FileCheck,
  User
} from 'lucide-react';
import { PageShell } from '../../components/layout/PageShell';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Textarea } from '../../components/ui/Textarea';
import { Avatar } from '../../components/ui/Avatar';
import { VoiceButton } from '../../components/ui/VoiceButton';
import { useApp } from '../../context/AppContext';

export const CertificationReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authorityQueue, approveReviewDoc, rejectReviewDoc, showToast } = useApp();
  const doc = authorityQueue.activeReviewDoc;

  const [decisionReason, setDecisionReason] = useState(
    'Meets all regional organic stewardship compliance standards. Soil laboratory test results verified with zero pesticide residuals.'
  );
  const [zoomLevel, setZoomLevel] = useState(100);

  const handleApprove = () => {
    approveReviewDoc(decisionReason);
    setTimeout(() => {
      navigate('/authority/dashboard');
    }, 1200);
  };

  const handleReject = () => {
    if (!decisionReason) {
      showToast('Please enter a reasoning for rejection', 'danger');
      return;
    }
    rejectReviewDoc(decisionReason);
    setTimeout(() => {
      navigate('/authority/dashboard');
    }, 1200);
  };

  return (
    <PageShell title="Certification Review" sidebarCollapsed={true}>
      <div className="page-header" style={{ marginBottom: 'var(--space-4)' }}>
        <div className="page-title-group">
          <div className="page-title">
            <span>Certification Review</span>
            <VoiceButton textToRead={`Certification Review for applicant ${doc.farmerName}, Farm ID ${doc.farmId}. Status: ${doc.status}.`} />
          </div>
          <span className="page-subtitle">Evaluate submitted documentation and render verification decisions.</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 'var(--space-6)', alignItems: 'start' }}>
        {/* Left Column: PDF Document Viewer Chrome */}
        <div style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-card)'
        }}>
          {/* Document Viewer Toolbar */}
          <div className="flex-between" style={{
            padding: '10px 16px',
            backgroundColor: 'var(--color-surface-subtle)',
            borderBottom: '1px solid var(--color-border)',
            fontSize: 'var(--text-xs)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: 'var(--color-text)' }}>
              <FileText size={16} color="var(--color-primary)" />
              <span>{doc.filename}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Page {doc.currentPage} of {doc.totalPages}</span>
              <div style={{ display: 'flex', gap: '4px' }}>
                <button
                  type="button"
                  onClick={() => setZoomLevel(prev => Math.max(80, prev - 10))}
                  className="topbar-icon-btn"
                  style={{ width: '28px', height: '28px' }}
                  title="Zoom Out"
                >
                  <ZoomOut size={14} />
                </button>
                <span style={{ fontSize: '11px', lineHeight: '28px', color: 'var(--color-text-muted)' }}>{zoomLevel}%</span>
                <button
                  type="button"
                  onClick={() => setZoomLevel(prev => Math.min(130, prev + 10))}
                  className="topbar-icon-btn"
                  style={{ width: '28px', height: '28px' }}
                  title="Zoom In"
                >
                  <ZoomIn size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => showToast('Downloading document copy...', 'info')}
                  className="topbar-icon-btn"
                  style={{ width: '28px', height: '28px' }}
                  title="Download File"
                >
                  <Download size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Rendered Certificate Sheet Simulation */}
          <div style={{
            padding: 'var(--space-6)',
            backgroundColor: '#ECE7DD',
            minHeight: '440px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '100%',
              maxWidth: '460px',
              backgroundColor: '#fff',
              border: '2px solid var(--color-primary)',
              borderRadius: 'var(--radius-sm)',
              padding: 'var(--space-6)',
              boxShadow: 'var(--shadow-md)',
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: 'top center',
              transition: 'transform 0.15s ease'
            }}>
              {/* Document Seal / Header */}
              <div style={{ textAlign: 'center', marginBottom: 'var(--space-4)', borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-3)' }}>
                <div style={{ width: '40px', height: '40px', margin: '0 auto 6px', borderRadius: '50%', backgroundColor: 'var(--color-primary-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
                  <ShieldCheck size={24} />
                </div>
                <h2 style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--color-primary)' }}>
                  {doc.documentTitle}
                </h2>
                <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                  Issued by the {doc.issuingAuthority}
                </div>
              </div>

              {/* Certificate Meta Grid */}
              <div style={{ fontSize: 'var(--text-xs)', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: 'var(--space-4)' }}>
                <div className="flex-between">
                  <span style={{ color: 'var(--color-text-muted)' }}>Farmer Name:</span>
                  <span style={{ fontWeight: 700 }}>{doc.farmerName}</span>
                </div>
                <div className="flex-between">
                  <span style={{ color: 'var(--color-text-muted)' }}>Farm ID:</span>
                  <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{doc.farmId}</span>
                </div>
                <div className="flex-between">
                  <span style={{ color: 'var(--color-text-muted)' }}>Location:</span>
                  <span>{doc.location}</span>
                </div>
                <div className="flex-between">
                  <span style={{ color: 'var(--color-text-muted)' }}>Certification Period:</span>
                  <span>{doc.certificationPeriod}</span>
                </div>
              </div>

              {/* Inspector Notes Box */}
              <div style={{
                backgroundColor: 'var(--color-surface-subtle)',
                border: '1px dashed var(--color-border-dark)',
                borderRadius: 'var(--radius-sm)',
                padding: 'var(--space-3)',
                fontSize: '11px'
              }}>
                <div style={{ fontWeight: 700, color: 'var(--color-primary)', marginBottom: '4px' }}>
                  Inspector Notes:
                </div>
                <p style={{ color: 'var(--color-text)', margin: 0, lineHeight: 1.4 }}>
                  {doc.inspectorNotes}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Review Details Card */}
        <Card
          title="Review Details"
          action={<Badge variant={doc.statusVariant || 'warning'}>{doc.status}</Badge>}
          enableVoice
          voiceText={`Review details for applicant ${doc.farmerName}, document type ${doc.docType}. Authority ${doc.authorityName}.`}
        >
          {/* Submitter Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-3)', borderBottom: '1px solid var(--color-border)' }}>
            <Avatar name={doc.farmerName} size="md" />
            <div>
              <div style={{ fontWeight: 700, fontSize: 'var(--text-sm)' }}>{doc.farmerName}</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{doc.submittedTimeAgo}</div>
            </div>
          </div>

          {/* Doc Type & Authority 2-up meta */}
          <div className="grid-2" style={{ marginBottom: 'var(--space-4)', fontSize: 'var(--text-xs)' }}>
            <div>
              <div style={{ color: 'var(--color-text-muted)' }}>Doc Type</div>
              <div style={{ fontWeight: 600, marginTop: '2px' }}>{doc.docType}</div>
            </div>
            <div>
              <div style={{ color: 'var(--color-text-muted)' }}>Authority</div>
              <div style={{ fontWeight: 600, marginTop: '2px' }}>{doc.authorityName}</div>
            </div>
          </div>

          {/* Decision Reason Textarea */}
          <Textarea
            label="Reason for Decision"
            required
            rows={4}
            value={decisionReason}
            onChange={(e) => setDecisionReason(e.target.value)}
            helperText="This reasoning will be visible to the farmer if rejected or approved."
          />

          {/* Stacked Decision Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginTop: 'var(--space-5)' }}>
            <Button
              variant="primary"
              fullWidth
              icon={CheckCircle2}
              onClick={handleApprove}
            >
              ✓ Approve Certification
            </Button>

            <Button
              variant="outline-danger"
              fullWidth
              icon={XCircle}
              onClick={handleReject}
            >
              ✕ Reject Submission
            </Button>
          </div>
        </Card>
      </div>
    </PageShell>
  );
};

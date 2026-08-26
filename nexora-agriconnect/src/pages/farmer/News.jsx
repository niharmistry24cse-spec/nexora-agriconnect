import React, { useState } from 'react';
import { Newspaper, ArrowRight, TrendingUp, CloudRain, ExternalLink } from 'lucide-react';
import { PageShell } from '../../components/layout/PageShell';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { VoiceButton } from '../../components/ui/VoiceButton';
import { useApp } from '../../context/AppContext';

export const FarmerNews = () => {
  const { news, showToast } = useApp();
  const [filter, setFilter] = useState('All');

  const filteredNews = news.filter(item => {
    if (filter === 'All') return true;
    if (filter === 'Government' && item.category.includes('Government')) return true;
    if (filter === 'Market' && item.category.includes('Market')) return true;
    return false;
  });

  return (
    <PageShell title="News Feed" contentMaxWidth="880px">
      <div className="page-header" style={{ marginBottom: 'var(--space-3)' }}>
        <div className="page-title-group">
          <div className="page-title">
            <span>News Feed</span>
            <VoiceButton textToRead="Agriculture News Feed. Latest updates and official agricultural announcements." />
          </div>
          <span className="page-subtitle">Stay informed with critical agricultural announcements.</span>
        </div>
      </div>

      {/* Filter Pill Row */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: 'var(--space-5)' }}>
        {['All', 'Government', 'Market'].map((category) => (
          <button
            key={category}
            type="button"
            className={`btn btn-sm ${filter === category ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Vertical News Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {filteredNews.map((article) => (
          <div
            key={article.id}
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-card)',
              display: 'grid',
              gridTemplateColumns: '240px 1fr',
              gap: 'var(--space-4)'
            }}
          >
            {/* Left Image Area with Category Badge */}
            <div style={{ position: 'relative', height: '100%', minHeight: '180px' }}>
              <img
                src={article.image}
                alt={article.headline}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                <Badge variant={article.badgeVariant || 'info'}>
                  {article.category}
                </Badge>
              </div>
            </div>

            {/* Right Content */}
            <div style={{ padding: 'var(--space-4) var(--space-5) var(--space-4) 0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div className="flex-between" style={{ marginBottom: '6px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                    Source: {article.sourceAuthority}
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                    {article.timeAgo}
                  </span>
                </div>

                <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 700, lineHeight: 1.3, marginBottom: '6px', color: 'var(--color-text)' }}>
                  {article.headline}
                </h3>

                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 1.4, margin: 0 }}>
                  {article.body}
                </p>
              </div>

              <div style={{ marginTop: 'var(--space-4)', display: 'flex', justifyContent: 'flex-start' }}>
                <Button
                  variant={article.badgeVariant === 'danger' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => showToast(`Opening article: ${article.headline}`, 'info')}
                >
                  {article.cta}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
};

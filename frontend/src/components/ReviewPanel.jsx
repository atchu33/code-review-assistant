import React, { useState } from 'react';
import IssueBadge from './IssueBadge';
import { Bug, Shield, Zap, Award, FileText, Copy, Check } from 'lucide-react';

const ReviewPanel = ({ review, loading }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const handleCopyFixedCode = async () => {
    try {
      await navigator.clipboard.writeText(review.fixed_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (loading) {
    return (
      <div className="h-full flex flex-col bg-theme-card rounded-lg p-8 border border-theme-border transition-colors duration-300">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-theme-text-muted">Analyzing your code...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!review) {
    return (
      <div className="h-full flex flex-col bg-theme-card rounded-lg p-8 border border-theme-border transition-colors duration-300">
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-theme-text-muted">
            <FileText size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg">No review yet</p>
            <p className="text-sm mt-2">Paste or upload code and click "Review Code"</p>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'bugs', label: `Bugs (${review.bugs.length})`, icon: Bug },
    { id: 'security', label: `Security (${review.security.length})`, icon: Shield },
    { id: 'performance', label: `Performance (${review.performance.length})`, icon: Zap },
    { id: 'fixed', label: 'Fixed Code', icon: Check },
  ];

  return (
    <div className="h-full flex flex-col bg-theme-card rounded-lg overflow-hidden border border-theme-border transition-colors duration-300">
      {/* Header with Score */}
      <div className="p-4 border-b border-theme-border bg-theme-bg-secondary">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-theme-text">Review Results</h2>
          <div className="flex items-center gap-2">
            <Award className="text-primary" size={20} />
            <span className="text-2xl font-bold text-theme-text">
              {review.quality.score}
              <span className="text-sm text-theme-text-muted">/100</span>
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-theme-border bg-theme-bg-secondary overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-theme-text-muted hover:text-theme-text'
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Summary */}
            <div className="bg-theme-bg-secondary rounded-lg p-4 border border-theme-border">
              <h3 className="text-sm font-semibold text-theme-text-secondary mb-2">Summary</h3>
              <p className="text-theme-text-secondary">{review.summary}</p>
            </div>

            {/* Quality Metrics */}
            <div className="bg-theme-bg-secondary rounded-lg p-4 border border-theme-border">
              <h3 className="text-sm font-semibold text-theme-text-secondary mb-3">Quality Metrics</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-theme-text-muted">Overall Score</span>
                    <span className="text-theme-text font-medium">{review.quality.score}/100</span>
                  </div>
                  <div className="w-full bg-theme-border rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${review.quality.score}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-theme-text-muted">Readability:</span>
                  <p className="text-theme-text-secondary text-sm mt-1">{review.quality.readability}</p>
                </div>
                <div>
                  <span className="text-sm text-theme-text-muted">Maintainability:</span>
                  <p className="text-theme-text-secondary text-sm mt-1">{review.quality.maintainability}</p>
                </div>
              </div>
            </div>

            {/* Issue Summary */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 text-center">
                <Bug className="mx-auto mb-2 text-red-400" size={24} />
                <p className="text-2xl font-bold text-theme-text">{review.bugs.length}</p>
                <p className="text-sm text-theme-text-muted">Bugs</p>
              </div>
              <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4 text-center">
                <Shield className="mx-auto mb-2 text-yellow-400" size={24} />
                <p className="text-2xl font-bold text-theme-text">{review.security.length}</p>
                <p className="text-sm text-theme-text-muted">Security</p>
              </div>
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 text-center">
                <Zap className="mx-auto mb-2 text-blue-400" size={24} />
                <p className="text-2xl font-bold text-theme-text">{review.performance.length}</p>
                <p className="text-sm text-theme-text-muted">Performance</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bugs' && (
          <div className="space-y-3">
            {review.bugs.length === 0 ? (
              <div className="text-center py-8 text-theme-text-muted">
                <Bug size={48} className="mx-auto mb-2 opacity-50" />
                <p>No bugs detected! 🎉</p>
              </div>
            ) : (
              review.bugs.map((bug, idx) => (
                <div key={idx} className="bg-theme-bg-secondary rounded-lg p-4 border-l-4 border-red-500">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs text-theme-text-muted">Line {bug.line}</span>
                    <IssueBadge severity={bug.severity} />
                  </div>
                  <p className="text-theme-text-secondary mb-2">{bug.description}</p>
                  <div className="bg-theme-card rounded p-3 mt-2 border border-theme-border">
                    <p className="text-xs text-theme-text-muted mb-1">Suggested Fix:</p>
                    <code className="text-sm text-green-400">{bug.fix}</code>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-3">
            {review.security.length === 0 ? (
              <div className="text-center py-8 text-theme-text-muted">
                <Shield size={48} className="mx-auto mb-2 opacity-50" />
                <p>No security issues found! 🔒</p>
              </div>
            ) : (
              review.security.map((issue, idx) => (
                <div key={idx} className="bg-theme-bg-secondary rounded-lg p-4 border-l-4 border-yellow-500">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs text-theme-text-muted">Line {issue.line}</span>
                  </div>
                  <p className="text-theme-text-secondary mb-2 font-medium">{issue.issue}</p>
                  <div className="bg-theme-card rounded p-3 mt-2 border border-theme-border">
                    <p className="text-xs text-theme-text-muted mb-1">Recommendation:</p>
                    <p className="text-sm text-theme-text-secondary">{issue.recommendation}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="space-y-3">
            {review.performance.length === 0 ? (
              <div className="text-center py-8 text-theme-text-muted">
                <Zap size={48} className="mx-auto mb-2 opacity-50" />
                <p>Performance looks good! ⚡</p>
              </div>
            ) : (
              review.performance.map((perf, idx) => (
                <div key={idx} className="bg-theme-bg-secondary rounded-lg p-4 border-l-4 border-blue-500">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs text-theme-text-muted">Line {perf.line}</span>
                  </div>
                  <p className="text-theme-text-secondary">{perf.suggestion}</p>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'fixed' && (
          <div className="space-y-3">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-semibold text-theme-text-secondary">Auto-Fixed Code</h3>
              <button
                onClick={handleCopyFixedCode}
                className="flex items-center gap-2 px-3 py-2 bg-primary hover:bg-primary-dark text-white rounded text-sm transition-colors"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy Code'}
              </button>
            </div>
            <pre className="bg-theme-bg-secondary rounded-lg p-4 overflow-x-auto border border-theme-border">
              <code className="text-sm text-theme-text-secondary">{review.fixed_code}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewPanel;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getHistory, deleteReview, getStats } from '../services/api';
import { ArrowLeft, Trash2, Eye, Code2, TrendingUp } from 'lucide-react';
import IssueBadge from '../components/IssueBadge';
import ThemeToggle from '../components/ThemeToggle';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../contexts/ThemeContext';

const History = () => {
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedReview, setSelectedReview] = useState(null);
  const { theme } = useTheme();

  useEffect(() => {
    fetchData();
  }, [selectedLanguage]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [historyData, statsData] = await Promise.all([
        getHistory(selectedLanguage || null, 50, 0),
        getStats()
      ]);
      setReviews(historyData);
      setStats(statsData);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reviewId) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    
    try {
      await deleteReview(reviewId);
      setReviews(reviews.filter(r => r.id !== reviewId));
      if (selectedReview?.id === reviewId) {
        setSelectedReview(null);
      }
    } catch (err) {
      console.error('Error deleting review:', err);
      alert('Failed to delete review');
    }
  };

  const handleViewReview = (review) => {
    setSelectedReview(review);
  };

  // Prepare chart data
  const chartData = reviews.slice(0, 10).reverse().map((review, idx) => ({
    name: `#${idx + 1}`,
    score: review.score || 0,
    date: new Date(review.created_at).toLocaleDateString()
  }));

  return (
    <div className="min-h-screen bg-theme-bg-darker transition-colors duration-300">
      {/* Header - Fixed with backdrop filter and solid background */}
      <header className="bg-theme-card/95 backdrop-blur-md border-b border-theme-border sticky top-0 z-[100] transition-colors duration-300 shadow-lg">
        <div className="max-w-[1800px] mx-auto px-6 py-4 bg-theme-card">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 bg-theme-bg-secondary hover:bg-theme-hover text-theme-text rounded-lg transition-colors border border-theme-border"
            >
              <ArrowLeft size={18} />
              <span>Back to Review</span>
            </Link>
            
            <div className="flex items-center gap-3">
              <Code2 size={24} className="text-primary" />
              <h1 className="text-xl font-bold text-theme-text">Review History</h1>
            </div>
            
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-[1800px] mx-auto px-6 py-6 relative z-0">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 relative z-0 isolate">
            <div className="bg-theme-card rounded-lg p-6 border border-theme-border transition-colors duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-theme-text-muted text-sm">Total Reviews</p>
                  <p className="text-3xl font-bold text-theme-text mt-1">{stats.total_reviews}</p>
                </div>
                <div className="bg-primary/20 p-3 rounded-lg">
                  <Code2 className="text-primary" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-theme-card rounded-lg p-6 border border-theme-border transition-colors duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-theme-text-muted text-sm">Average Score</p>
                  <p className="text-3xl font-bold text-theme-text mt-1">{stats.average_score.toFixed(1)}</p>
                </div>
                <div className="bg-green-500/20 p-3 rounded-lg">
                  <TrendingUp className="text-green-400" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-theme-card rounded-lg p-6 border border-theme-border transition-colors duration-300">
              <p className="text-theme-text-muted text-sm mb-3">Languages</p>
              <div className="space-y-2">
                {stats.by_language.slice(0, 3).map((lang) => (
                  <div key={lang.language} className="flex justify-between text-sm">
                    <span className="text-theme-text-secondary capitalize">{lang.language}</span>
                    <span className="text-theme-text font-medium">{lang.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Score Trend Chart */}
        {chartData.length > 0 && (
          <div className="bg-theme-card rounded-lg p-6 border border-theme-border mb-6 transition-colors duration-300 relative z-0 isolate">
            <h2 className="text-lg font-semibold text-theme-text mb-4">Score Trend (Last 10 Reviews)</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#E5E7EB'} />
                <XAxis dataKey="name" stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'} />
                <YAxis domain={[0, 100]} stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: theme === 'dark' ? '#1E293B' : '#FFFFFF', 
                    border: `1px solid ${theme === 'dark' ? '#374151' : '#E5E7EB'}`, 
                    borderRadius: '8px',
                    color: theme === 'dark' ? '#F3F4F6' : '#111827'
                  }}
                  labelStyle={{ color: theme === 'dark' ? '#F3F4F6' : '#111827' }}
                />
                <Line type="monotone" dataKey="score" stroke="#7C3AED" strokeWidth={2} dot={{ fill: '#7C3AED', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Filter */}
        <div className="mb-6 flex gap-4 items-center">
          <label className="text-theme-text-secondary text-sm font-medium">Filter by Language:</label>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="bg-theme-card text-theme-text px-4 py-2 rounded-lg border border-theme-border focus:outline-none focus:border-primary transition-colors"
          >
            <option value="">All Languages</option>
            {stats?.by_language.map((lang) => (
              <option key={lang.language} value={lang.language}>
                {lang.language.charAt(0).toUpperCase() + lang.language.slice(1)} ({lang.count})
              </option>
            ))}
          </select>
        </div>

        {/* Reviews Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-theme-text-muted mt-4">Loading reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12 bg-theme-card rounded-lg border border-theme-border transition-colors duration-300">
            <Code2 size={48} className="mx-auto text-theme-text-muted mb-4" />
            <p className="text-theme-text-muted">No reviews found</p>
            <Link to="/" className="text-primary hover:underline mt-2 inline-block">
              Create your first review
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {reviews.map((review) => {
              let reviewData;
              try {
                reviewData = JSON.parse(review.review_json);
              } catch (e) {
                reviewData = null;
              }

              return (
                <div
                  key={review.id}
                  className="bg-theme-card rounded-lg p-4 border border-theme-border hover:border-primary transition-colors duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full capitalize">
                          {review.language}
                        </span>
                        <span className="text-theme-text-muted text-sm">
                          {new Date(review.created_at).toLocaleString()}
                        </span>
                        {review.score && (
                          <span className="text-theme-text font-semibold">
                            Score: {review.score}/100
                          </span>
                        )}
                      </div>
                      
                      {reviewData && (
                        <div className="flex gap-4 mt-3 text-sm">
                          <span className="text-theme-text-muted">
                            🐛 {reviewData.bugs?.length || 0} bugs
                          </span>
                          <span className="text-theme-text-muted">
                            🔒 {reviewData.security?.length || 0} security
                          </span>
                          <span className="text-theme-text-muted">
                            ⚡ {reviewData.performance?.length || 0} performance
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewReview(review)}
                        className="p-2 bg-theme-bg-secondary hover:bg-theme-hover text-theme-text rounded transition-colors border border-theme-border"
                        title="View details"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(review.id)}
                        className="p-2 bg-red-900/30 hover:bg-red-900 text-red-400 hover:text-white rounded transition-colors border border-red-500/50"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Review Details Modal */}
        {selectedReview && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-[200]" onClick={() => setSelectedReview(null)}>
            <div className="bg-theme-card rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-theme-border transition-colors duration-300" onClick={(e) => e.stopPropagation()}>
              <div className="sticky top-0 bg-theme-bg-secondary p-4 border-b border-theme-border flex justify-between items-center">
                <h3 className="text-lg font-semibold text-theme-text">Review Details</h3>
                <button
                  onClick={() => setSelectedReview(null)}
                  className="text-theme-text-muted hover:text-theme-text"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-theme-text-muted mb-2">Original Code</h4>
                  <pre className="bg-theme-bg-secondary rounded p-4 overflow-x-auto text-sm text-theme-text-secondary border border-theme-border">
                    {selectedReview.original_code}
                  </pre>
                </div>
                
                {(() => {
                  try {
                    const data = JSON.parse(selectedReview.review_json);
                    return (
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold text-theme-text-muted mb-2">Summary</h4>
                          <p className="text-theme-text-secondary">{data.summary}</p>
                        </div>
                        
                        {data.bugs?.length > 0 && (
                          <div>
                            <h4 className="text-sm font-semibold text-theme-text-muted mb-2">Bugs ({data.bugs.length})</h4>
                            <div className="space-y-2">
                              {data.bugs.map((bug, idx) => (
                                <div key={idx} className="bg-theme-bg-secondary rounded p-3 border-l-4 border-red-500">
                                  <div className="flex items-start justify-between mb-1">
                                    <span className="text-xs text-theme-text-muted">Line {bug.line}</span>
                                    <IssueBadge severity={bug.severity} />
                                  </div>
                                  <p className="text-sm text-theme-text-secondary">{bug.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  } catch (e) {
                    return <p className="text-theme-text-muted">Could not parse review data</p>;
                  }
                })()}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default History;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CodeEditor from '../components/CodeEditor';
import ReviewPanel from '../components/ReviewPanel';
import ThemeToggle from '../components/ThemeToggle';
import { reviewCode } from '../services/api';
import { Code2, History, Sparkles } from 'lucide-react';

const Home = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleReview = async () => {
    if (!code.trim()) {
      setError('Please enter some code to review');
      return;
    }

    setLoading(true);
    setError(null);
    setReview(null);

    try {
      const result = await reviewCode(code, language);
      setReview(result);
    } catch (err) {
      console.error('Review error:', err);
      setError(err.response?.data?.detail || 'Failed to review code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-theme-bg-darker transition-colors duration-300">
      {/* Header - Fixed with backdrop filter and solid background */}
      <header className="bg-theme-card/95 backdrop-blur-md border-b border-theme-border sticky top-0 z-[100] transition-colors duration-300 shadow-lg">
        <div className="max-w-[1800px] mx-auto px-6 py-4 bg-theme-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-lg">
                <Code2 size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-theme-text">AI Code Review Assistant</h1>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Link
                to="/history"
                className="flex items-center gap-2 px-4 py-2 bg-theme-bg-secondary hover:bg-theme-hover text-theme-text rounded-lg transition-colors border border-theme-border"
              >
                <History size={18} />
                <span>Review History</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1800px] mx-auto px-6 py-6 relative z-0">
        {/* Error Message */}
        {error && (
          <div className="mb-4 bg-red-900/30 border border-red-500 text-red-200 px-4 py-3 rounded-lg dark:bg-red-900/30 dark:border-red-500 dark:text-red-200 light:bg-red-100 light:border-red-400 light:text-red-800">
            {error}
          </div>
        )}

        {/* Action Button */}
        <div className="mb-6 flex justify-center">
          <button
            onClick={handleReview}
            disabled={loading || !code.trim()}
            className="flex items-center gap-3 px-8 py-4 bg-primary hover:bg-primary-dark disabled:bg-gray-500 disabled:cursor-not-allowed text-white rounded-lg transition-colors text-lg font-semibold shadow-lg shadow-primary/30 disabled:shadow-none"
          >
            <Sparkles size={24} />
            {loading ? 'Analyzing...' : 'Review Code'}
          </button>
        </div>

        {/* Split Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-250px)]">
          {/* Code Editor */}
          <CodeEditor
            code={code}
            setCode={setCode}
            language={language}
            setLanguage={setLanguage}
          />

          {/* Review Panel */}
          <ReviewPanel review={review} loading={loading} />
        </div>
      </main>
    </div>
  );
};

export default Home;

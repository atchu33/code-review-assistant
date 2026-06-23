import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Upload, Copy, Trash2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const SUPPORTED_LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'cpp', label: 'C++' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'swift', label: 'Swift' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'sql', label: 'SQL' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
];

const CodeEditor = ({ code, setCode, language, setLanguage }) => {
  const [fileName, setFileName] = useState('');
  const { theme } = useTheme();

  const handleEditorChange = (value) => {
    setCode(value || '');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCode(event.target.result);
        setFileName(file.name);
        
        // Auto-detect language from file extension
        const ext = file.name.split('.').pop().toLowerCase();
        const langMap = {
          js: 'javascript', jsx: 'javascript', mjs: 'javascript',
          ts: 'typescript', tsx: 'typescript',
          py: 'python',
          java: 'java',
          cs: 'csharp',
          cpp: 'cpp', cc: 'cpp', cxx: 'cpp', h: 'cpp', hpp: 'cpp',
          go: 'go',
          rs: 'rust',
          php: 'php',
          rb: 'ruby',
          swift: 'swift',
          kt: 'kotlin', kts: 'kotlin',
          sql: 'sql',
          html: 'html', htm: 'html',
          css: 'css', scss: 'css',
        };
        if (langMap[ext]) {
          setLanguage(langMap[ext]);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleClear = () => {
    setCode('');
    setFileName('');
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setCode(text);
    } catch (err) {
      console.error('Failed to read clipboard:', err);
    }
  };

  return (
    <div className="h-full flex flex-col bg-theme-card rounded-lg overflow-hidden border border-theme-border transition-colors duration-300">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-theme-border">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-theme-text">Code Input</h2>
          {fileName && (
            <span className="text-sm text-theme-text-muted">
              {fileName}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-theme-bg-secondary text-theme-text px-3 py-2 rounded border border-theme-border focus:outline-none focus:border-primary text-sm transition-colors"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
          
          <label className="cursor-pointer bg-theme-bg-secondary hover:bg-theme-hover text-theme-text px-3 py-2 rounded border border-theme-border transition-colors flex items-center gap-2">
            <Upload size={16} />
            <span className="text-sm">Upload</span>
            <input
              type="file"
              onChange={handleFileUpload}
              accept=".js,.jsx,.ts,.tsx,.py,.java,.cs,.cpp,.go,.rs,.php,.rb,.swift,.kt,.sql,.html,.css"
              className="hidden"
            />
          </label>
          
          <button
            onClick={handlePaste}
            className="bg-theme-bg-secondary hover:bg-theme-hover text-theme-text px-3 py-2 rounded border border-theme-border transition-colors flex items-center gap-2"
            title="Paste from clipboard"
          >
            <Copy size={16} />
          </button>
          
          <button
            onClick={handleClear}
            className="bg-theme-bg-secondary hover:bg-red-900 text-theme-text px-3 py-2 rounded border border-theme-border transition-colors flex items-center gap-2"
            title="Clear editor"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={handleEditorChange}
          theme={theme === 'dark' ? 'vs-dark' : 'light'}
          options={{
            minimap: { enabled: true },
            fontSize: 14,
            lineNumbers: 'on',
            rulers: [80, 120],
            wordWrap: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            formatOnPaste: true,
            formatOnType: true,
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;

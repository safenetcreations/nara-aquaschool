// src/components/GitHub/CodeViewer.jsx - Component to display code with syntax highlighting
import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  Chip,
  Alert
} from '@mui/material';
import {
  ContentCopy,
  Download,
  GitHub
} from '@mui/icons-material';

/**
 * CodeViewer Component
 * Displays code with syntax highlighting and copy functionality
 */
const CodeViewer = ({ code, language = 'javascript', fileName = '', githubUrl = '' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName || 'code.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getLanguageColor = (lang) => {
    const colors = {
      javascript: '#f7df1e',
      typescript: '#3178c6',
      python: '#3776ab',
      java: '#007396',
      cpp: '#00599c',
      csharp: '#239120',
      go: '#00add8',
      rust: '#000000',
      php: '#777bb4',
      ruby: '#cc342d',
      html: '#e34c26',
      css: '#1572b6',
      jsx: '#61dafb',
      tsx: '#61dafb'
    };
    return colors[lang?.toLowerCase()] || '#666';
  };

  return (
    <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 2,
          backgroundColor: '#1e1e1e',
          borderBottom: '1px solid #333'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {fileName && (
            <Typography variant="body2" sx={{ color: '#fff', fontFamily: 'monospace' }}>
              {fileName}
            </Typography>
          )}
          {language && (
            <Chip
              label={language.toUpperCase()}
              size="small"
              sx={{
                backgroundColor: getLanguageColor(language),
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '0.7rem'
              }}
            />
          )}
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          {githubUrl && (
            <Tooltip title="View on GitHub">
              <IconButton
                size="small"
                sx={{ color: '#fff' }}
                onClick={() => window.open(githubUrl, '_blank')}
              >
                <GitHub />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title={copied ? 'Copied!' : 'Copy code'}>
            <IconButton
              size="small"
              sx={{ color: '#fff' }}
              onClick={handleCopy}
            >
              <ContentCopy />
            </IconButton>
          </Tooltip>
          <Tooltip title="Download">
            <IconButton
              size="small"
              sx={{ color: '#fff' }}
              onClick={handleDownload}
            >
              <Download />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Code Content */}
      <Box
        sx={{
          backgroundColor: '#1e1e1e',
          color: '#d4d4d4',
          padding: 2,
          overflowX: 'auto',
          maxHeight: '600px',
          fontFamily: 'monospace',
          fontSize: '0.875rem',
          lineHeight: 1.6
        }}
      >
        <pre style={{ margin: 0 }}>
          <code>{code}</code>
        </pre>
      </Box>

      {copied && (
        <Alert
          severity="success"
          sx={{ borderRadius: 0 }}
        >
          Code copied to clipboard!
        </Alert>
      )}
    </Paper>
  );
};

export default CodeViewer;

import React, { useEffect, useState } from 'react';
import { useTranslation } from './TranslationProvider';

export const TranslationMonitor = ({
  position = 'bottom-right',
  showInProduction = false,
  compact = false
}) => {
  const { agentStatus, triggerQualityCheck, isLoading, error } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show monitor in development or if explicitly enabled
    setIsVisible(showInProduction || process.env.NODE_ENV === 'development');
  }, [showInProduction]);

  const handleManualCheck = async () => {
    try {
      await triggerQualityCheck();
    } catch (error) {
      console.error('Manual quality check failed:', error);
    }
  };

  const getPositionStyles = () => {
    const base = {
      position: 'fixed',
      zIndex: 9999,
      fontFamily: 'monospace',
      fontSize: '12px',
      borderRadius: '6px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      border: '1px solid #e1e5e9'
    };

    switch (position) {
      case 'top-left':
        return { ...base, top: '10px', left: '10px' };
      case 'top-right':
        return { ...base, top: '10px', right: '10px' };
      case 'bottom-left':
        return { ...base, bottom: '10px', left: '10px' };
      case 'bottom-right':
      default:
        return { ...base, bottom: '10px', right: '10px' };
    }
  };

  if (!isVisible) return null;

  const statusColor = agentStatus.connected ? '#10b981' : '#ef4444';
  const statusBg = agentStatus.connected ? '#f0fdf4' : '#fef2f2';

  if (compact) {
    return (
      <div style={{
        ...getPositionStyles(),
        background: statusBg,
        color: statusColor,
        padding: '4px 8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
      }} onClick={() => setIsExpanded(!isExpanded)}>
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: statusColor
        }} />
        <span>TA</span>
      </div>
    );
  }

  return (
    <div style={{
      ...getPositionStyles(),
      background: 'white',
      color: '#374151',
      minWidth: isExpanded ? '280px' : '200px',
      maxWidth: '320px'
    }}>
      {/* Header */}
      <div
        style={{
          background: statusBg,
          color: statusColor,
          padding: '8px 12px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: statusColor
          }} />
          <span style={{ fontWeight: 'bold', fontSize: '11px' }}>
            TRANSLATION AGENT
          </span>
        </div>
        <span style={{ fontSize: '10px' }}>
          {isExpanded ? '−' : '+'}
        </span>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div style={{ padding: '12px' }}>
          {/* Connection Status */}
          <div style={{ marginBottom: '8px' }}>
            <div style={{ fontSize: '10px', color: '#6b7280', marginBottom: '2px' }}>
              Status
            </div>
            <div style={{
              fontSize: '11px',
              fontWeight: 'bold',
              color: statusColor
            }}>
              {agentStatus.connected ? 'Connected' : 'Disconnected'}
            </div>
          </div>

          {/* Stats */}
          {agentStatus.connected && agentStatus.stats && (
            <>
              <div style={{ marginBottom: '8px' }}>
                <div style={{ fontSize: '10px', color: '#6b7280', marginBottom: '2px' }}>
                  Quality Checks
                </div>
                <div style={{ fontSize: '11px' }}>
                  Total: {agentStatus.stats.checker?.stats?.totalChecks || 0} |
                  Issues: {agentStatus.stats.checker?.stats?.issuesFound || 0} |
                  Fixed: {agentStatus.stats.checker?.stats?.autoFixed || 0}
                </div>
              </div>

              <div style={{ marginBottom: '8px' }}>
                <div style={{ fontSize: '10px', color: '#6b7280', marginBottom: '2px' }}>
                  Average Quality
                </div>
                <div style={{ fontSize: '11px' }}>
                  {(agentStatus.stats.checker?.stats?.averageQualityScore || 0).toFixed(1)}%
                </div>
              </div>
            </>
          )}

          {/* Last Check */}
          {agentStatus.lastCheck && (
            <div style={{ marginBottom: '8px' }}>
              <div style={{ fontSize: '10px', color: '#6b7280', marginBottom: '2px' }}>
                Last Check
              </div>
              <div style={{ fontSize: '10px' }}>
                {new Date(agentStatus.lastCheck).toLocaleTimeString()}
              </div>
            </div>
          )}

          {/* Manual Check Button */}
          <button
            onClick={handleManualCheck}
            disabled={isLoading || !agentStatus.connected}
            style={{
              width: '100%',
              padding: '6px 12px',
              background: agentStatus.connected ? '#3b82f6' : '#9ca3af',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '11px',
              cursor: agentStatus.connected ? 'pointer' : 'not-allowed',
              opacity: isLoading ? 0.7 : 1
            }}
          >
            {isLoading ? 'Checking...' : 'Run Quality Check'}
          </button>

          {/* Error Display */}
          {error && (
            <div style={{
              marginTop: '8px',
              padding: '4px 8px',
              background: '#fef2f2',
              color: '#dc2626',
              borderRadius: '4px',
              fontSize: '10px'
            }}>
              {error}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Compact status indicator for production
export const TranslationStatusIndicator = () => {
  const { agentStatus } = useTranslation();

  return (
    <div
      title={`Translation Agent: ${agentStatus.connected ? 'Connected' : 'Disconnected'}`}
      style={{
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        background: agentStatus.connected ? '#10b981' : '#ef4444',
        border: '2px solid white',
        boxShadow: '0 0 4px rgba(0,0,0,0.2)',
        zIndex: 9999,
        cursor: 'pointer'
      }}
      onClick={() => {
        if (agentStatus.connected) {
          console.log('Translation Agent Stats:', agentStatus.stats);
        }
      }}
    />
  );
};
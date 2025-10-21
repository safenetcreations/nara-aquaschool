import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { Waves } from '@mui/icons-material';

/**
 * LoadingScreen Component
 * Full-screen loading animation with ocean/marine theme
 * Used throughout the app for async operations
 */
const LoadingScreen = ({ message = 'Loading...', fullScreen = true }) => {
  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        ...(fullScreen && {
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }),
        ...(!fullScreen && {
          padding: 4,
        })
      }}
    >
      {/* Ocean Wave Animation Container */}
      <Box
        sx={{
          position: 'relative',
          width: 120,
          height: 120,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Outer spinning circle */}
        <CircularProgress
          size={120}
          thickness={2}
          sx={{
            color: fullScreen ? 'rgba(255, 255, 255, 0.3)' : 'primary.main',
            position: 'absolute',
          }}
        />

        {/* Inner spinning circle (opposite direction) */}
        <CircularProgress
          size={90}
          thickness={3}
          sx={{
            color: fullScreen ? 'rgba(255, 255, 255, 0.6)' : 'primary.light',
            position: 'absolute',
            animationDirection: 'reverse',
          }}
        />

        {/* Center wave icon */}
        <Box
          sx={{
            position: 'absolute',
            animation: 'wave 2s ease-in-out infinite',
            '@keyframes wave': {
              '0%, 100%': {
                transform: 'translateY(0px)',
              },
              '50%': {
                transform: 'translateY(-10px)',
              },
            },
          }}
        >
          <Waves
            sx={{
              fontSize: 48,
              color: fullScreen ? 'white' : 'primary.main',
            }}
          />
        </Box>
      </Box>

      {/* Loading Message */}
      <Typography
        variant="h6"
        sx={{
          color: fullScreen ? 'white' : 'text.primary',
          fontWeight: 500,
          textAlign: 'center',
          animation: 'pulse 2s ease-in-out infinite',
          '@keyframes pulse': {
            '0%, 100%': {
              opacity: 1,
            },
            '50%': {
              opacity: 0.6,
            },
          },
        }}
      >
        {message}
      </Typography>

      {/* Animated dots */}
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          alignItems: 'center',
        }}
      >
        {[0, 1, 2].map((index) => (
          <Box
            key={index}
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: fullScreen ? 'white' : 'primary.main',
              animation: 'bounce 1.4s ease-in-out infinite',
              animationDelay: `${index * 0.2}s`,
              '@keyframes bounce': {
                '0%, 80%, 100%': {
                  transform: 'scale(0)',
                  opacity: 0.5,
                },
                '40%': {
                  transform: 'scale(1)',
                  opacity: 1,
                },
              },
            }}
          />
        ))}
      </Box>

      {/* Ocean-themed decorative elements (only for full screen) */}
      {fullScreen && (
        <>
          {/* Floating bubbles */}
          {[...Array(6)].map((_, index) => (
            <Box
              key={index}
              sx={{
                position: 'absolute',
                width: `${10 + Math.random() * 20}px`,
                height: `${10 + Math.random() * 20}px`,
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                left: `${10 + Math.random() * 80}%`,
                bottom: -20,
                animation: `float ${3 + Math.random() * 3}s ease-in infinite`,
                animationDelay: `${Math.random() * 3}s`,
                '@keyframes float': {
                  '0%': {
                    transform: 'translateY(0) translateX(0)',
                    opacity: 0,
                  },
                  '50%': {
                    opacity: 0.5,
                  },
                  '100%': {
                    transform: `translateY(-100vh) translateX(${-20 + Math.random() * 40}px)`,
                    opacity: 0,
                  },
                },
              }}
            />
          ))}
        </>
      )}
    </Box>
  );

  return content;
};

/**
 * LoadingOverlay Component
 * Semi-transparent overlay with loading spinner
 * Used for loading states on top of existing content
 */
export const LoadingOverlay = ({ message = 'Processing...' }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          borderRadius: 2,
          padding: 4,
          minWidth: 300,
          textAlign: 'center',
        }}
      >
        <LoadingScreen message={message} fullScreen={false} />
      </Box>
    </Box>
  );
};

/**
 * InlineLoader Component
 * Small inline loading spinner
 * Used for button loading states or inline content
 */
export const InlineLoader = ({ size = 24, color = 'primary' }) => {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress size={size} color={color} />
    </Box>
  );
};

export default LoadingScreen;

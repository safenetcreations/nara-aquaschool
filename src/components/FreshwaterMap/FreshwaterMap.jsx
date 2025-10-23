import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Typography, Paper, Alert, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { freshwaterCategories, getLocalizedFeature } from '../../data/freshwaterFeatures';

const MAP_CENTER = { lat: 7.8731, lng: 80.7718 };

const getLegendItems = () =>
  Object.entries(freshwaterCategories).map(([key, value]) => ({
    key,
    label: value.label,
    color: value.color
  }));

const buildInfoContent = (feature, t) => {
  const detailRows = [];

  if (feature.lengthKm) {
    detailRows.push(
      `<div><strong>${t('freshwater.labels.length', 'Length')}:</strong> ${feature.lengthKm} km</div>`
    );
  }
  if (feature.basinAreaSqKm) {
    detailRows.push(
      `<div><strong>${t('freshwater.labels.basinArea', 'Basin area')}:</strong> ${feature.basinAreaSqKm.toLocaleString()} km²</div>`
    );
  }
  if (feature.annualFlowMcm) {
    detailRows.push(
      `<div><strong>${t('freshwater.labels.annualFlow', 'Annual flow')}:</strong> ${feature.annualFlowMcm.toLocaleString()} million m³</div>`
    );
  }
  if (feature.capacityMcm) {
    detailRows.push(
      `<div><strong>${t('freshwater.labels.storage', 'Storage')}:</strong> ${feature.capacityMcm.toLocaleString()} million m³</div>`
    );
  }
  if (feature.surfaceAreaSqKm) {
    detailRows.push(
      `<div><strong>${t('freshwater.labels.surfaceArea', 'Surface area')}:</strong> ${feature.surfaceAreaSqKm.toLocaleString()} km²</div>`
    );
  }
  if (feature.areaHectares) {
    detailRows.push(
      `<div><strong>${t('freshwater.labels.area')}:</strong> ${feature.areaHectares.toLocaleString()} ha</div>`
    );
  }
  if (feature.maxDepthM) {
    detailRows.push(
      `<div><strong>${t('freshwater.labels.maxDepth', 'Max depth')}:</strong> ${feature.maxDepthM} m</div>`
    );
  }
  if (feature.heightM) {
    detailRows.push(
      `<div><strong>${t('freshwater.labels.height', 'Height')}:</strong> ${feature.heightM} m</div>`
    );
  }
  if (feature.designation) {
    detailRows.push(
      `<div><strong>${t('freshwater.labels.designation')}:</strong> ${feature.designation}</div>`
    );
  }
  if (feature.yearCompleted) {
    detailRows.push(
      `<div><strong>${t('freshwater.labels.commissioned', 'Commissioned')}:</strong> ${feature.yearCompleted}</div>`
    );
  }
  if (feature.purpose && feature.purpose.length) {
    detailRows.push(
      `<div><strong>${t('freshwater.labels.purpose', 'Purpose')}:</strong> ${feature.purpose.join(', ')}</div>`
    );
  }
  if (feature.notableInfrastructure && feature.notableInfrastructure.length) {
    detailRows.push(
      `<div><strong>${t('freshwater.labels.infrastructure', 'Linked projects')}:</strong> ${feature.notableInfrastructure.join(', ')}</div>`
    );
  }
  if (feature.provinces && feature.provinces.length) {
    detailRows.push(
      `<div><strong>${t('freshwater.labels.provinces')}:</strong> ${feature.provinces.join(', ')}</div>`
    );
  }
  if (feature.ecosystems && feature.ecosystems.length) {
    detailRows.push(
      `<div><strong>${t('freshwater.labels.ecosystems')}:</strong> ${feature.ecosystems.join(', ')}</div>`
    );
  }

  return `
    <div style="max-width: 260px">
      <h3 style="margin: 0 0 8px 0; font-size: 16px;">${feature.name}</h3>
      <div style="margin-bottom: 8px; color: #455a64;">${feature.description}</div>
      ${detailRows.join('')}
    </div>
  `;
};

const FreshwaterMap = ({ features, activeTypes, height = 520 }) => {
  const { t, i18n } = useTranslation();
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const infoWindowRef = useRef(null);

  const localizedFeatures = useMemo(
    () => features.map((feature) => getLocalizedFeature(feature, i18n.language)),
    [features, i18n.language]
  );

  const [isReady, setIsReady] = useState(false);
  const [mapError, setMapError] = useState(null);

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (!apiKey) {
      setMapError(
        'Google Maps API key missing. Set REACT_APP_GOOGLE_MAPS_API_KEY to enable the freshwater explorer map.'
      );
      return;
    }

    const initialise = () => {
      if (window.google && window.google.maps) {
        setIsReady(true);
      }
    };

    if (window.google && window.google.maps) {
      initialise();
      return;
    }

    const existingScript = document.getElementById('google-maps-script');
    if (existingScript) {
      existingScript.addEventListener('load', initialise);
      existingScript.addEventListener('error', () =>
        setMapError('Failed to load Google Maps. Check your network connection and API key.')
      );

      return () => {
        existingScript.removeEventListener('load', initialise);
      };
    }

    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;
    script.onload = initialise;
    script.onerror = () =>
      setMapError('Failed to load Google Maps. Check your network connection and API key.');

    document.body.appendChild(script);

    return () => {
      script.onload = null;
      script.onerror = null;
    };
  }, [apiKey]);

  useEffect(() => {
    if (!isReady || !mapRef.current || !window.google?.maps) {
      return;
    }

    if (!mapInstanceRef.current) {
      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        center: MAP_CENTER,
        zoom: 7,
        mapTypeId: 'terrain',
        streetViewControl: false,
        fullscreenControl: true,
        mapTypeControl: true,
        styles: [
          {
            featureType: 'water',
            elementType: 'geometry.fill',
            stylers: [{ color: '#a2daf2' }]
          },
          {
            featureType: 'administrative',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#37474f' }]
          }
        ]
      });
      infoWindowRef.current = new window.google.maps.InfoWindow();
    }
  }, [isReady]);

  useEffect(() => {
    if (!mapInstanceRef.current || !window.google?.maps) {
      return;
    }

    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    const filtered = localizedFeatures.filter(
      (feature) => activeTypes.includes(feature.type) && feature.coordinates
    );

    if (filtered.length === 0) {
      mapInstanceRef.current.setCenter(MAP_CENTER);
      mapInstanceRef.current.setZoom(7);
      return;
    }

    const bounds = new window.google.maps.LatLngBounds();

    filtered.forEach((feature) => {
      const category = freshwaterCategories[feature.type];
      const iconColor = category?.color || '#1976d2';

      const marker = new window.google.maps.Marker({
        position: feature.coordinates,
        map: mapInstanceRef.current,
        title: feature.name,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: iconColor,
          fillOpacity: 0.9,
          strokeColor: '#ffffff',
          strokeWeight: 2
        }
      });

      marker.addListener('click', () => {
        if (!infoWindowRef.current) {
          infoWindowRef.current = new window.google.maps.InfoWindow();
        }

        infoWindowRef.current.setContent(buildInfoContent(feature, t));
        infoWindowRef.current.open({
          anchor: marker,
          map: mapInstanceRef.current,
          shouldFocus: false
        });
      });

      markersRef.current.push(marker);
      bounds.extend(marker.getPosition());
    });

    mapInstanceRef.current.fitBounds(bounds, 48);
  }, [localizedFeatures, activeTypes, t]);

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      {mapError && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {mapError}
        </Alert>
      )}

      <Box
        ref={mapRef}
        sx={{
          width: '100%',
          height,
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: 3,
          backgroundColor: '#e0f2f1'
        }}
      />

      <Paper
        elevation={3}
        sx={{
          position: 'absolute',
          bottom: 16,
          left: 16,
          padding: 2,
          borderRadius: 2,
          backgroundColor: 'rgba(255,255,255,0.92)'
        }}
      >
        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
          Water Feature Legend
        </Typography>
        <Stack spacing={1}>
          {getLegendItems().map((item) => (
            <Box key={item.key} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: item.color,
                  border: '2px solid white',
                  boxShadow: '0 0 0 1px rgba(0,0,0,0.2)'
                }}
              />
              <Typography variant="body2">{item.label}</Typography>
            </Box>
          ))}
        </Stack>
      </Paper>
    </Box>
  );
};

export default FreshwaterMap;

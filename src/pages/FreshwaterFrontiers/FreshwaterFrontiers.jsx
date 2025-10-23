import React, { useMemo, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Paper,
  Tabs,
  Tab,
  Typography
} from '@mui/material';
import {
  Water,
  Waves,
  Terrain,
  ExpandMore,
  MenuBook,
  EmojiNature,
  FilterAlt,
  Landscape
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import FreshwaterMap from '../../components/FreshwaterMap/FreshwaterMap';
import {
  freshwaterCategories,
  freshwaterFeatureList,
  freshwaterStatsSummary,
  naturalLakes,
  reservoirSystems,
  riverSystems,
  waterfalls,
  wetlands,
  getLocalizedFeature
} from '../../data/freshwaterFeatures';

const formatNumber = (value) =>
  typeof value === 'number' ? value.toLocaleString('en-US') : value;

const FreshwaterFrontiers = () => {
  const { t, i18n } = useTranslation();
  const freshwaterContent = t('freshwater', { returnObjects: true }) || {};
  const conservationSection = freshwaterContent.conservationSection || {};

  const [activeTab, setActiveTab] = useState(0);
  const currentLanguage = i18n.language;

  const categoryKeys = useMemo(() => Object.keys(freshwaterCategories), []);
  const [activeMapTypes, setActiveMapTypes] = useState(categoryKeys);

  const featureCounts = useMemo(() => {
    const counts = {};
    categoryKeys.forEach((key) => {
      counts[key] = freshwaterFeatureList.filter((item) => item.type === key).length;
    });
    return counts;
  }, [categoryKeys]);

  const toggleMapType = (type) => {
    setActiveMapTypes((prev) => {
      if (prev.includes(type)) {
        return prev.length === 1 ? prev : prev.filter((item) => item !== type);
      }
      return [...prev, type];
    });
  };

  const showOnlyType = (type) => {
    setActiveMapTypes([type]);
  };

  const resetMapFilters = () => {
    setActiveMapTypes(categoryKeys);
  };

  const localizedWetlands = useMemo(
    () => wetlands.map((wetland) => getLocalizedFeature(wetland, currentLanguage)),
    [currentLanguage]
  );

  const tabConfig = [
    {
      key: 'rivers',
      label: freshwaterContent.tabs?.rivers || 'Rivers',
      icon: <Waves />,
      content: (
        <Grid container spacing={3}>
          {riverSystems.map((river) => (
            <Grid item xs={12} md={6} key={river.id}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: 3, height: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" fontWeight={700}>
                    {river.name}
                  </Typography>
                  <Chip label={`${river.lengthKm} km`} color="primary" size="small" />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Provinces: {river.provinces.join(', ')}
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  {river.description}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                  <Chip
                    label={`Basin area: ${formatNumber(river.basinAreaSqKm)} km²`}
                    size="small"
                    variant="outlined"
                  />
                  <Chip
                    label={`Annual flow: ${formatNumber(river.annualFlowMcm)} million m³`}
                    size="small"
                    variant="outlined"
                  />
                </Box>
                {river.notableInfrastructure?.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Infrastructure links
                    </Typography>
                    <Typography variant="body2">
                      {river.notableInfrastructure.join(', ')}
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      )
    },
    {
      key: 'reservoirs',
      label: freshwaterContent.tabs?.reservoirs || 'Reservoirs & Dams',
      icon: <Water />,
      content: (
        <Grid container spacing={3}>
          {reservoirSystems.map((reservoir) => (
            <Grid item xs={12} md={4} key={reservoir.id}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: 3, height: '100%' }}>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  {reservoir.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  River: {reservoir.river}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1.5 }}>
                  {reservoir.description}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                  <Chip
                    label={`Storage: ${formatNumber(reservoir.capacityMcm)} million m³`}
                    size="small"
                    color="primary"
                  />
                  <Chip
                    label={`Surface: ${formatNumber(reservoir.surfaceAreaSqKm)} km²`}
                    size="small"
                    variant="outlined"
                  />
                  <Chip
                    label={`Commissioned: ${reservoir.yearCompleted}`}
                    size="small"
                    variant="outlined"
                  />
                </Box>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  Purpose: {reservoir.purpose.join(', ')}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Provinces: {reservoir.provinces.join(', ')}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )
    },
    {
      key: 'lakes',
      label: freshwaterContent.tabs?.lakes || 'Natural Lakes & Lagoons',
      icon: <Terrain />,
      content: (
        <Grid container spacing={3}>
          {naturalLakes.map((lake) => (
            <Grid item xs={12} md={4} key={lake.id}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: 3, height: '100%' }}>
                <Typography variant="h6" fontWeight={700}>
                  {lake.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  Provinces: {lake.provinces.join(', ')}
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  {lake.description}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                  <Chip
                    label={`Area: ${formatNumber(lake.areaHectares)} ha`}
                    size="small"
                    color="success"
                  />
                  <Chip
                    label={`Max depth: ${lake.maxDepthM} m`}
                    size="small"
                    variant="outlined"
                  />
                </Box>
                <Typography variant="body2" sx={{ mt: 1.5 }}>
                  Ecosystems: {lake.ecosystems.join(', ')}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )
    },
    {
      key: 'waterfalls',
      label: freshwaterContent.tabs?.waterfalls || 'Waterfalls',
      icon: <Landscape />,
      content: (
        <Grid container spacing={3}>
          {waterfalls.map((fall) => (
            <Grid item xs={12} md={4} key={fall.id}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  height: '100%',
                  background: 'linear-gradient(180deg, #f5f5ff 0%, #ffffff 100%)'
                }}
              >
                <Typography variant="h6" fontWeight={700}>
                  {fall.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  River: {fall.river}
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  {fall.description}
                </Typography>
                <Chip
                  label={`Height: ${fall.heightM} m`}
                  size="small"
                  color="secondary"
                  sx={{ mt: 2 }}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
      )
    },
    {
      key: 'wetlands',
      label: freshwaterContent.tabs?.wetlands || 'Wetlands & Marshes',
      icon: <EmojiNature />,
      content: (
        <Grid container spacing={3}>
          {localizedWetlands.map((wetland) => (
            <Grid item xs={12} md={6} key={wetland.id}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: 3, height: '100%' }}>
                <Typography variant="h6" fontWeight={700}>
                  {wetland.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {t('freshwater.labels.provinces')}: {wetland.provinces.join(', ')}
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  {wetland.description}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                  <Chip
                    label={`${t('freshwater.labels.area')}: ${formatNumber(wetland.areaHectares)} ha`}
                    size="small"
                    color="info"
                  />
                  <Chip
                    label={wetland.designation}
                    size="small"
                    variant="outlined"
                  />
                </Box>
                <Typography variant="body2" sx={{ mt: 1.5 }}>
                  {t('freshwater.labels.ecosystems')}: {wetland.ecosystems.join(', ')}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )
    }
  ];

  const statsCards = freshwaterStatsSummary;

  const accordions = conservationSection.accordions || [];
  const conservationTips = conservationSection.tips || [];

  const accordionButtonIcons = {
    waterCycle: <MenuBook />,
    freshwaterThreats: <MenuBook />
  };

  return (
    <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            p: 4,
            borderRadius: 3,
            background: 'linear-gradient(135deg, #0288d1 0%, #26c6da 100%)',
            color: '#fff',
            mb: 4
          }}
        >
          <Typography variant="h3" fontWeight={800} gutterBottom>
            <Water sx={{ fontSize: 40, verticalAlign: 'middle', mr: 1 }} />
            {freshwaterContent.title || 'Sri Lankan Freshwater Atlas'}
          </Typography>
          <Typography variant="h6">
            {freshwaterContent.subtitle ||
              'Explore real data about rivers, reservoirs, wetlands, and waterfalls across Sri Lanka.'}
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {statsCards.map((stat) => (
            <Grid item xs={12} md={3} key={stat.id}>
              <Paper elevation={3} sx={{ p: 3, textAlign: 'center', borderRadius: 3 }}>
                <Typography variant="h3" fontWeight={800} color="primary">
                  {formatNumber(stat.value)}
                </Typography>
                <Typography variant="subtitle1" fontWeight={600} sx={{ mt: 1 }}>
                  {stat.label}
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                  {stat.source}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <FilterAlt color="primary" />
            <Typography variant="h5" fontWeight={700}>
              {freshwaterContent.mapSection?.heading || 'Interactive Freshwater Map'}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {freshwaterContent.mapSection?.description ||
              'Toggle the filters to view different freshwater features and click on markers to read field data.'}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 2 }}>
            {categoryKeys.map((categoryKey) => {
              const category = freshwaterCategories[categoryKey];
              const isActive = activeMapTypes.includes(categoryKey);
              return (
                <Chip
                  key={categoryKey}
                  label={`${category.label} (${featureCounts[categoryKey]})`}
                  onClick={() => toggleMapType(categoryKey)}
                  onDoubleClick={() => showOnlyType(categoryKey)}
                  sx={{
                    borderColor: category.color,
                    borderWidth: 2,
                    borderStyle: 'solid',
                    backgroundColor: isActive ? category.color : 'transparent',
                    color: isActive ? '#fff' : 'text.primary',
                    fontWeight: 600
                  }}
                  variant={isActive ? 'filled' : 'outlined'}
                />
              );
            })}
            <Button variant="outlined" size="small" onClick={resetMapFilters}>
              Show all
            </Button>
          </Box>

          <FreshwaterMap features={freshwaterFeatureList} activeTypes={activeMapTypes} />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Double-click a filter chip to focus on a single category. Data sources: Mahaweli Authority, Irrigation
            Department, Survey Department, Ramsar Secretariat.
          </Typography>
        </Paper>

        <Paper elevation={3} sx={{ borderRadius: 3, mb: 4 }}>
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: '1px solid #e0e0e0' }}
          >
            {tabConfig.map((tab, index) => (
              <Tab
                key={tab.key}
                label={tab.label}
                icon={tab.icon}
                iconPosition="start"
                sx={{ fontWeight: 600 }}
                value={index}
              />
            ))}
          </Tabs>
          <Box sx={{ p: 3 }}>{tabConfig[activeTab].content}</Box>
        </Paper>

        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            {conservationSection.heading || 'Freshwater Stewardship Actions'}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ p: 0 }}>
                <Typography variant="subtitle1" fontWeight={700} color="primary">
                  {conservationSection.helpTitle || 'How students can help'}
                </Typography>
                <Box component="ul" sx={{ pl: 3, mt: 1 }}>
                  {conservationTips.map((tip, index) => (
                    <Typography component="li" key={`tip-${index}`} variant="body2" sx={{ mb: 1.5 }}>
                      {tip}
                    </Typography>
                  ))}
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ p: 0 }}>
                <Typography variant="subtitle1" fontWeight={700} color="secondary">
                  {conservationSection.learnTitle || 'Learn more'}
                </Typography>
                {(accordions || []).map((item) => (
                  <Accordion key={item.id} sx={{ boxShadow: 'none' }}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography fontWeight={600}>{item.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2">{item.description}</Typography>
                      <Button
                        startIcon={accordionButtonIcons[item.id] || <MenuBook />}
                        sx={{ mt: 1 }}
                        size="small"
                      >
                        {item.buttonText}
                      </Button>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default FreshwaterFrontiers;

import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Fab,
  Tooltip
} from '@mui/material';
import {
  Add,
  PlayArrow,
  Save,
  ChevronLeft
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import FlashcardSystem from './FlashcardSystem';
import { aquaticAnimalFlashcards } from '../../data/aquaticAnimalFlashcards';
import { waterfallFlashcards } from '../../data/waterfallFlashcards';
import { reservoirFlashcards } from '../../data/reservoirFlashcards';

/**
 * FlashcardManager Component
 * Manages different flashcard categories and provides creation/editing functionality
 */
const FlashcardManager = ({ onBack }) => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [flashcardData, setFlashcardData] = useState({
    animals: [...aquaticAnimalFlashcards],
    waterfalls: [...waterfallFlashcards],
    reservoirs: [...reservoirFlashcards]
  });
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [newCard, setNewCard] = useState({
    english: '',
    tamil: '',
    sinhala: '',
    color: '#87CEEB',
    emoji: '🐟',
    scientificName: '',
    family: '',
    englishDescription: '',
    sinhalaDescription: '',
    tamilDescription: ''
  });

  const categories = [
    {
      id: 'animals',
      name: t('flashcards.categories.aquaticAnimals', 'Sri Lankan Aquatic Animals'),
      icon: '🐋',
      description: t('flashcards.categories.aquaticAnimalsDesc', 'Discover Sri Lanka\'s amazing marine life and sea creatures'),
      gradient: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)',
      count: flashcardData.animals.length
    },
    {
      id: 'waterfalls',
      name: t('flashcards.categories.waterfalls', 'Sri Lankan Waterfalls'),
      icon: '💧',
      description: t('flashcards.categories.waterfallsDesc', 'Discover Sri Lanka\'s beautiful waterfalls'),
      gradient: 'linear-gradient(135deg, #1E90FF 0%, #00BFFF 100%)',
      count: flashcardData.waterfalls.length
    },
    {
      id: 'reservoirs',
      name: t('flashcards.categories.reservoirs', 'Sri Lankan Reservoirs'),
      icon: '🏞️',
      description: t('flashcards.categories.reservoirsDesc', 'Explore ancient and modern water systems'),
      gradient: 'linear-gradient(135deg, #4169E1 0%, #4682B4 100%)',
      count: flashcardData.reservoirs.length
    }
  ];

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleCreateNew = () => {
    setEditingCard(null);
    setNewCard({
      english: '',
      tamil: '',
      sinhala: '',
      color: '#87CEEB',
      emoji: '🐟',
      scientificName: '',
      family: '',
      englishDescription: '',
      sinhalaDescription: '',
      tamilDescription: ''
    });
    setCreateDialogOpen(true);
  };

  const handleSaveCard = () => {
    if (!newCard.english || !newCard.sinhala || !newCard.tamil) {
      alert(t('flashcards.fillRequired', 'Please fill in all required fields'));
      return;
    }

    setFlashcardData(prev => {
      const updated = { ...prev };
      if (editingCard) {
        // Edit existing card
        updated[selectedCategory][editingCard.index] = { ...newCard };
      } else {
        // Add new card
        updated[selectedCategory] = [...updated[selectedCategory], { ...newCard }];
      }
      return updated;
    });

    setCreateDialogOpen(false);
    setEditingCard(null);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  if (selectedCategory) {
    const category = categories.find(cat => cat.id === selectedCategory);
    const data = flashcardData[selectedCategory];

    return (
      <FlashcardSystem
        categoryData={data}
        categoryName={category.name}
        categoryIcon={category.icon}
        backgroundGradient={category.gradient}
        onHomeClick={handleBackToCategories}
        onSettingsClick={() => {}}
        onCreateNew={handleCreateNew}
      />
    );
  }

  return (
    <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', padding: 4 }}>
      {/* Header */}
      <Box sx={{ marginBottom: 4, textAlign: 'center' }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          🎴 {t('flashcards.title', 'Educational Flashcards')}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t('flashcards.subtitle', 'Learn about Sri Lanka\'s nature and heritage')}
        </Typography>
        {onBack && (
          <Button
            variant="outlined"
            onClick={onBack}
            sx={{ mt: 2 }}
            startIcon={<ChevronLeft />}
          >
            {t('common.back', 'Back')}
          </Button>
        )}
      </Box>

      {/* Categories Grid */}
      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.id}>
            <Card
              elevation={3}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 3,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6
                },
                cursor: 'pointer'
              }}
              onClick={() => handleCategorySelect(category.id)}
            >
              <Box
                sx={{
                  height: 160,
                  background: category.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}
              >
                <Typography variant="h1">{category.icon}</Typography>
                <Chip
                  label={`${category.count} ${t('flashcards.cards', 'cards')}`}
                  sx={{
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    color: 'black'
                  }}
                />
              </Box>

              <CardContent sx={{ flexGrow: 1, paddingBottom: 1 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {category.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {category.description}
                </Typography>
              </CardContent>

              <Box sx={{ padding: 2, paddingTop: 0 }}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<PlayArrow />}
                  sx={{
                    fontWeight: 'bold',
                    backgroundColor: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'primary.dark'
                    }
                  }}
                >
                  {t('flashcards.startLearning', 'Start Learning')}
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Floating Action Button for Creating New Cards */}
      <Tooltip title={t('flashcards.createNew', 'Create New Flashcard')}>
        <Fab
          color="primary"
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 1000
          }}
          onClick={handleCreateNew}
        >
          <Add />
        </Fab>
      </Tooltip>

      {/* Create/Edit Dialog */}
      <Dialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editingCard ? t('flashcards.editCard', 'Edit Flashcard') : t('flashcards.createCard', 'Create New Flashcard')}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={t('flashcards.english', 'English')}
                value={newCard.english}
                onChange={(e) => setNewCard(prev => ({ ...prev, english: e.target.value }))}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={t('flashcards.sinhala', 'Sinhala (සිංහල)')}
                value={newCard.sinhala}
                onChange={(e) => setNewCard(prev => ({ ...prev, sinhala: e.target.value }))}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={t('flashcards.tamil', 'Tamil (தமிழ்)')}
                value={newCard.tamil}
                onChange={(e) => setNewCard(prev => ({ ...prev, tamil: e.target.value }))}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={t('flashcards.emoji', 'Emoji')}
                value={newCard.emoji}
                onChange={(e) => setNewCard(prev => ({ ...prev, emoji: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={t('flashcards.scientificName', 'Scientific Name')}
                value={newCard.scientificName}
                onChange={(e) => setNewCard(prev => ({ ...prev, scientificName: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={t('flashcards.family', 'Family')}
                value={newCard.family}
                onChange={(e) => setNewCard(prev => ({ ...prev, family: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t('flashcards.englishDescription', 'English Description')}
                value={newCard.englishDescription}
                onChange={(e) => setNewCard(prev => ({ ...prev, englishDescription: e.target.value }))}
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t('flashcards.sinhalaDescription', 'Sinhala Description (සිංහල විස්තරය)')}
                value={newCard.sinhalaDescription}
                onChange={(e) => setNewCard(prev => ({ ...prev, sinhalaDescription: e.target.value }))}
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t('flashcards.tamilDescription', 'Tamil Description (தமிழ் விளக்கம்)')}
                value={newCard.tamilDescription}
                onChange={(e) => setNewCard(prev => ({ ...prev, tamilDescription: e.target.value }))}
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>{t('flashcards.category', 'Category')}</InputLabel>
                <Select
                  value={selectedCategory || ''}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  disabled={!!editingCard}
                >
                  {categories.map(cat => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateDialogOpen(false)}>
            {t('common.cancel', 'Cancel')}
          </Button>
          <Button onClick={handleSaveCard} variant="contained" startIcon={<Save />}>
            {t('common.save', 'Save')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FlashcardManager;
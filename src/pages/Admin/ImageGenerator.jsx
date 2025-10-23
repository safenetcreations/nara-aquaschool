// Image Generator for Existing Marine Species Content
import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  LinearProgress,
  Alert,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Checkbox
} from '@mui/material';
import {
  Image,
  Download,
  CloudUpload,
  Refresh,
  CheckCircle,
  Error as ErrorIcon,
  Visibility,
  Delete,
  SelectAll
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  generateSpeciesImage,
  generateBatchImages,
  getAvailableProviders,
  downloadImageAsBlob,
  saveImageToFirebase,
  saveImageToSpeciesDocument,
  IMAGE_PROVIDERS
} from '../../services/imageGenerationService';
import { saveSpeciesImage } from '../../services/speciesImageService';
import { REAL_SL_MARINE_SPECIES } from '../../data/realMarineSpecies';

const ImageGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [selectedSpecies, setSelectedSpecies] = useState([]);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [provider, setProvider] = useState(IMAGE_PROVIDERS.GEMINI); // Default to Gemini Nano Banana 🍌
  const [batchProgress, setBatchProgress] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [availableProviders, setAvailableProviders] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    setAvailableProviders(getAvailableProviders());
  }, []);

  // Get all species from the data - it's a flat array
  const allSpecies = REAL_SL_MARINE_SPECIES.map(species => ({
    commonName: species.commonName?.en || species.commonName || 'Unknown',
    scientificName: species.scientificName || '',
    habitat: species.habitat?.en || species.habitat || 'ocean',
    description: species.description?.en || species.description || '',
    category: species.category || 'marine-life'
  }));

  const handleSelectSpecies = (species) => {
    setSelectedSpecies(prev => {
      const exists = prev.find(s => s.commonName === species.commonName);
      if (exists) {
        return prev.filter(s => s.commonName !== species.commonName);
      } else {
        return [...prev, species];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedSpecies([]);
    } else {
      setSelectedSpecies([...allSpecies]);
    }
    setSelectAll(!selectAll);
  };

  const handleGenerateSingle = async (species) => {
    setLoading(true);
    try {
      const result = await generateSpeciesImage(species, { provider });
      setGeneratedImages(prev => [...prev, result]);
      toast.success(`Image generated for ${species.commonName}!`);
    } catch (error) {
      toast.error(`Failed to generate image: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateBatch = async () => {
    if (selectedSpecies.length === 0) {
      toast.error('Please select at least one species');
      return;
    }

    setLoading(true);
    setBatchProgress({ current: 0, total: selectedSpecies.length });

    try {
      const results = await generateBatchImages(selectedSpecies, {
        provider,
        delayBetweenRequests: 2000,
        onProgress: (progress) => {
          setBatchProgress(progress);
        }
      });

      console.log('🔍 Generation Results:', results);

      const successful = results.filter(r => r.success);
      const failed = results.filter(r => !r.success);

      console.log('✅ Successful images:', successful.length, successful);
      console.log('❌ Failed images:', failed.length, failed);

      setGeneratedImages(prev => {
        const newImages = [...prev, ...successful];
        console.log('📸 Updated generatedImages state:', newImages);
        return newImages;
      });

      if (failed.length > 0) {
        toast.error(`${failed.length} images failed to generate`);
      }
      if (successful.length > 0) {
        toast.success(`Successfully generated ${successful.length} images!`);
      }
    } catch (error) {
      console.error('❌ Batch generation error:', error);
      toast.error(`Batch generation failed: ${error.message}`);
    } finally {
      setLoading(false);
      setBatchProgress(null);
    }
  };

  const handleDownloadImage = async (imageData) => {
    try {
      const blob = await downloadImageAsBlob(imageData.imageUrl);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${imageData.speciesName.toLowerCase().replace(/\s+/g, '-')}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('Image downloaded!');
    } catch (error) {
      toast.error('Failed to download image');
    }
  };

  const handleDeleteImage = (index) => {
    setGeneratedImages(prev => prev.filter((_, i) => i !== index));
    toast.success('Image removed');
  };

  const handleUploadToFirebase = async (imageData, index) => {
    try {
      toast.loading('Uploading to Firebase...', { id: `upload-${index}` });

      // Convert image URL to blob
      const blob = await downloadImageAsBlob(imageData.imageUrl);

      // Upload to Firebase Storage
      const firebaseUrl = await saveImageToFirebase(blob, imageData.speciesName);

      // Save to Firestore to link with species
      await saveSpeciesImage(imageData.speciesName, firebaseUrl, {
        provider: imageData.provider,
        prompt: imageData.prompt,
        generatedAt: imageData.generatedAt
      });

      // Update the image data with Firebase URL
      setGeneratedImages(prev => {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          firebaseUrl,
          uploaded: true,
          uploadedAt: new Date().toISOString()
        };
        return updated;
      });

      toast.success('Image uploaded & linked to species!', { id: `upload-${index}` });
      console.log('✅ Uploaded to Firebase & Firestore:', firebaseUrl);
    } catch (error) {
      console.error('❌ Upload failed:', error);
      toast.error(`Upload failed: ${error.message}`, { id: `upload-${index}` });
    }
  };

  const handleUploadAllToFirebase = async () => {
    const unuploadedImages = generatedImages.filter(img => !img.uploaded);

    if (unuploadedImages.length === 0) {
      toast.error('All images are already uploaded!');
      return;
    }

    setLoading(true);
    toast.loading(`Uploading ${unuploadedImages.length} images to Firebase...`, { id: 'upload-all' });

    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < generatedImages.length; i++) {
      if (!generatedImages[i].uploaded) {
        try {
          await handleUploadToFirebase(generatedImages[i], i);
          successCount++;
        } catch (error) {
          failCount++;
        }
      }
    }

    setLoading(false);
    toast.success(`Uploaded ${successCount} images! ${failCount > 0 ? `(${failCount} failed)` : ''}`, { id: 'upload-all' });
  };

  const handleExportAll = () => {
    const exportData = generatedImages.map(img => ({
      speciesName: img.speciesName,
      imageUrl: img.imageUrl,
      prompt: img.prompt,
      provider: img.provider,
      generatedAt: img.generatedAt
    }));

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `marine-species-images-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Image data exported!');
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #1565C0 0%, #1976D2 100%)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Image sx={{ fontSize: 40, color: 'white' }} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>
              Marine Species Image Generator
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', mt: 1 }}>
              Generate AI images for your existing marine species content
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Provider Selection */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Image Generation Provider
        </Typography>
        <Grid container spacing={2}>
          {availableProviders.map(prov => (
            <Grid item xs={12} md={4} key={prov.id}>
              <Card
                sx={{
                  cursor: 'pointer',
                  border: provider === prov.id ? 2 : 1,
                  borderColor: provider === prov.id ? 'primary.main' : 'divider',
                  opacity: prov.available ? 1 : 0.5
                }}
                onClick={() => prov.available && setProvider(prov.id)}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                    <Typography variant="h6">{prov.name}</Typography>
                    {prov.recommended && <Chip label="⭐ RECOMMENDED" size="small" color="primary" />}
                    {prov.free && <Chip label="FREE" size="small" color="success" />}
                    {!prov.available && <Chip label="No API Key" size="small" color="error" />}
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Quality: {prov.quality} | Speed: {prov.speed}
                  </Typography>
                  {prov.cost && (
                    <Typography variant="body2" color="text.secondary">
                      Cost: {prov.cost}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Species Selection */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            Select Species ({selectedSpecies.length} selected)
          </Typography>
          <Box>
            <Button
              startIcon={<SelectAll />}
              onClick={handleSelectAll}
              variant="outlined"
              sx={{ mr: 1 }}
            >
              {selectAll ? 'Deselect All' : 'Select All'}
            </Button>
            <Button
              startIcon={<Image />}
              onClick={handleGenerateBatch}
              variant="contained"
              disabled={loading || selectedSpecies.length === 0}
            >
              Generate {selectedSpecies.length} Images
            </Button>
          </Box>
        </Box>

        {batchProgress && (
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">
                Generating: {batchProgress.speciesName}
              </Typography>
              <Typography variant="body2">
                {batchProgress.current} / {batchProgress.total}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(batchProgress.current / batchProgress.total) * 100}
            />
          </Box>
        )}

        <Grid container spacing={2} sx={{ maxHeight: 400, overflowY: 'auto' }}>
          {allSpecies.map((species, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  cursor: 'pointer',
                  border: selectedSpecies.find(s => s.commonName === species.commonName) ? 2 : 1,
                  borderColor: selectedSpecies.find(s => s.commonName === species.commonName)
                    ? 'primary.main'
                    : 'divider'
                }}
                onClick={() => handleSelectSpecies(species)}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'start', gap: 1 }}>
                    <Checkbox
                      checked={!!selectedSpecies.find(s => s.commonName === species.commonName)}
                      onChange={() => handleSelectSpecies(species)}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {species.commonName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                        {species.scientificName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {species.category}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Debug Info - ALWAYS VISIBLE */}
      <Paper sx={{ p: 3, mb: 3, bgcolor: '#fff3cd', border: '2px solid #ff9800' }}>
        <Typography variant="h6" color="error" gutterBottom>
          🔍 DEBUG PANEL - Image Display Diagnostics
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Generated Images Count: <strong style={{ fontSize: '24px', color: generatedImages.length > 0 ? 'green' : 'red' }}>{generatedImages.length}</strong>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {generatedImages.length > 0 ? '✅ Images are in state - Gallery should be visible below' : '⚠️ No images generated yet - Select species and click Generate'}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
          Open browser console (F12) for detailed logs
        </Typography>
        {generatedImages.length > 0 && (
          <Box sx={{ mt: 2, p: 2, bgcolor: '#e8f5e9', borderRadius: 1 }}>
            <Typography variant="body2" fontWeight="bold">First Image Data:</Typography>
            <Typography variant="caption" sx={{ display: 'block', wordBreak: 'break-all' }}>
              Species: {generatedImages[0]?.speciesName}<br/>
              Provider: {generatedImages[0]?.provider}<br/>
              URL Length: {generatedImages[0]?.imageUrl?.length} characters<br/>
              URL Start: {generatedImages[0]?.imageUrl?.substring(0, 80)}...
            </Typography>
          </Box>
        )}
      </Paper>

      {/* SIMPLE TEST - Always show this to verify rendering works */}
      <Paper sx={{ p: 2, mb: 3, bgcolor: '#e3f2fd', border: '2px dashed #2196f3' }}>
        <Typography variant="body2" fontWeight="bold" color="primary">
          🧪 RENDERING TEST (Always Visible)
        </Typography>
        <Typography variant="caption">
          If you can see this blue box, React rendering is working. Images should appear below when count {">"} 0.
        </Typography>
      </Paper>

      {/* Generated Images */}
      {generatedImages.length > 0 ? (
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ bgcolor: 'success.light', p: 1, borderRadius: 1 }}>
              ✅ Generated Images ({generatedImages.length})
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                startIcon={<CloudUpload />}
                onClick={handleUploadAllToFirebase}
                variant="contained"
                color="primary"
                disabled={loading || generatedImages.every(img => img.uploaded)}
              >
                Upload All to Firebase
              </Button>
              <Button
                startIcon={<Download />}
                onClick={handleExportAll}
                variant="outlined"
              >
                Export All Data
              </Button>
            </Box>
          </Box>

          <Grid container spacing={3}>
            <AnimatePresence>
              {generatedImages.map((imageData, index) => {
                console.log(`🖼️ Rendering image ${index}:`, {
                  speciesName: imageData.speciesName,
                  imageUrl: imageData.imageUrl,
                  provider: imageData.provider
                });
                return (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card>
                      <CardMedia
                        component="img"
                        height="250"
                        image={imageData.imageUrl}
                        alt={imageData.speciesName}
                        sx={{ objectFit: 'cover', cursor: 'pointer' }}
                        onClick={() => setPreviewImage(imageData)}
                        onError={(e) => {
                          console.error('❌ Image failed to load:', imageData.imageUrl);
                          console.error('Error event:', e);
                        }}
                        onLoad={() => {
                          console.log('✅ Image loaded successfully:', imageData.speciesName);
                        }}
                      />
                      <CardContent>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {imageData.speciesName}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                          <Chip
                            label={imageData.provider}
                            size="small"
                            color="primary"
                          />
                          {imageData.uploaded && (
                            <Chip
                              label="✓ Uploaded"
                              size="small"
                              color="success"
                            />
                          )}
                        </Box>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                          {new Date(imageData.generatedAt).toLocaleString()}
                        </Typography>
                        {imageData.firebaseUrl && (
                          <Typography variant="caption" color="success.main" sx={{ display: 'block', mt: 0.5, wordBreak: 'break-all' }}>
                            Firebase: {imageData.firebaseUrl.substring(0, 50)}...
                          </Typography>
                        )}
                      </CardContent>
                      <CardActions sx={{ justifyContent: 'space-between' }}>
                        <Box>
                          <IconButton
                            size="small"
                            onClick={() => setPreviewImage(imageData)}
                            color="primary"
                            title="Preview"
                          >
                            <Visibility />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDownloadImage(imageData)}
                            color="primary"
                            title="Download"
                          >
                            <Download />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteImage(index)}
                            color="error"
                            title="Delete"
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                        {!imageData.uploaded && (
                          <IconButton
                            size="small"
                            onClick={() => handleUploadToFirebase(imageData, index)}
                            color="success"
                            title="Upload to Firebase"
                            sx={{ ml: 'auto' }}
                          >
                            <CloudUpload />
                          </IconButton>
                        )}
                      </CardActions>
                    </Card>
                  </motion.div>
                </Grid>
                );
              })}
            </AnimatePresence>
          </Grid>
        </Paper>
      ) : (
        <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#f5f5f5' }}>
          <Typography variant="body1" color="text.secondary">
            No images generated yet. Select species above and click "Generate Images" to start.
          </Typography>
        </Paper>
      )}

      {/* Image Preview Dialog */}
      <Dialog
        open={!!previewImage}
        onClose={() => setPreviewImage(null)}
        maxWidth="lg"
        fullWidth
      >
        {previewImage && (
          <>
            <DialogTitle>{previewImage.speciesName}</DialogTitle>
            <DialogContent>
              <img
                src={previewImage.imageUrl}
                alt={previewImage.speciesName}
                style={{ width: '100%', height: 'auto' }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                <strong>Prompt:</strong> {previewImage.prompt}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                <strong>Provider:</strong> {previewImage.provider}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setPreviewImage(null)}>Close</Button>
              <Button
                onClick={() => handleDownloadImage(previewImage)}
                variant="contained"
                startIcon={<Download />}
              >
                Download
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default ImageGenerator;

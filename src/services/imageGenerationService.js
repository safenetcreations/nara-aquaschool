// Image Generation Service for Marine Species Content
// Supports multiple image generation providers

/**
 * IMAGE GENERATION OPTIONS:
 *
 * 1. 🍌 Google Gemini 2.5 Flash Image "Nano Banana" (FREE - Uses your Gemini API key)
 *    - ⭐ RECOMMENDED - Google's state-of-the-art image generation model (Released Aug 2025)
 *    - Best for: High-quality, production-ready image generation
 *    - Quality: Excellent (tops AI image-editing leaderboards)
 *    - Speed: Fast
 *    - Cost: FREE with API key ($0.039 per image if using paid tier)
 *    - Features: Character consistency, image editing, blending, natural language control
 *
 * 2. Pollinations.ai (FREE - No API key needed)
 *    - Best for: Quick testing, reliable backup
 *    - Quality: Good
 *    - Speed: Fast
 *    - Cost: Completely FREE, no API key needed
 *
 * 3. OpenAI DALL-E 3 (Paid - Requires API key)
 *    - Best for: High-quality production images
 *    - Quality: Excellent
 *    - Speed: Medium
 *    - Cost: $0.04 per image (1024x1024)
 *
 * 4. Stability AI (Paid - Requires API key)
 *    - Best for: Customizable, artistic images
 *    - Quality: Excellent
 *    - Speed: Fast
 */

// Configuration
export const IMAGE_PROVIDERS = {
  GEMINI: 'gemini',        // 🍌 Nano Banana - Google's latest
  POLLINATIONS: 'pollinations',
  DALLE: 'dalle',
  STABILITY: 'stability'
};

const CURRENT_PROVIDER = IMAGE_PROVIDERS.GEMINI; // Default to Gemini Nano Banana (Highest quality!)

// API Keys (add to .env file)
const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const STABILITY_API_KEY = process.env.REACT_APP_STABILITY_API_KEY;

/**
 * Generate an optimized image prompt for marine species
 * @param {Object} speciesData - Marine species content data
 * @returns {string} Optimized prompt for image generation
 */
export const createImagePrompt = (speciesData) => {
  const { commonName, scientificName, habitat, description } = speciesData;

  // Create a detailed, optimized prompt for realistic marine photography
  const prompt = `
Professional underwater photography of ${commonName} (${scientificName}),
swimming in its natural ${habitat} habitat in Sri Lankan waters.
Crystal clear water, natural lighting, photorealistic, National Geographic quality,
highly detailed, vibrant colors, sharp focus, marine biology documentation style.
${description ? description.substring(0, 200) : ''}
  `.trim().replace(/\s+/g, ' ');

  return prompt;
};

/**
 * Generate image using Google Gemini 2.5 Flash Image "Nano Banana" (FREE - Uses your Gemini API key)
 * This is Google's official image generation model released in August 2025
 * @param {string} prompt - Image generation prompt
 * @param {Object} options - Generation options
 * @returns {Promise<string>} Image URL (base64 data URL)
 */
export const generateImageGemini = async (prompt, options = {}) => {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not configured. Add REACT_APP_GEMINI_API_KEY to your .env file');
  }

  try {
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

    // Use Gemini 2.5 Flash Image (Nano Banana) - the official image generation model
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-image' });

    console.log('🍌 Using Gemini 2.5 Flash Image (Nano Banana) for generation...');

    // Generate the image using Gemini's native image generation
    const result = await model.generateContent([
      {
        text: prompt
      }
    ]);

    const response = await result.response;

    // Check if the response contains image data
    if (response.candidates && response.candidates[0].content.parts) {
      const parts = response.candidates[0].content.parts;

      // Look for inline image data
      for (const part of parts) {
        if (part.inlineData && part.inlineData.mimeType.startsWith('image/')) {
          // Convert base64 to data URL
          const dataUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
          console.log('✅ Nano Banana generated image successfully!');
          return dataUrl;
        }
      }
    }

    // Fallback: If no image generated, use Pollinations as backup
    console.warn('⚠️ Gemini did not return image data, falling back to Pollinations');
    return await generateImagePollinations(prompt, options);

  } catch (error) {
    console.error('❌ Gemini Nano Banana generation failed:', error);

    // Fallback to Pollinations if Gemini fails
    console.log('🔄 Falling back to Pollinations.ai');
    return await generateImagePollinations(prompt, options);
  }
};

/**
 * Generate image using Pollinations.ai (FREE - No API key needed)
 * @param {string} prompt - Image generation prompt
 * @param {Object} options - Generation options
 * @returns {Promise<string>} Image URL
 */
export const generateImagePollinations = async (prompt, options = {}) => {
  try {
    const {
      width = 1024,
      height = 1024,
      seed = Date.now(),
      model = 'flux', // flux, flux-realism, or turbo
      nologo = true,
      enhance = true
    } = options;

    // Pollinations.ai uses a simple URL-based API
    const encodedPrompt = encodeURIComponent(prompt);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&seed=${seed}&model=${model}&nologo=${nologo}&enhance=${enhance}`;

    // Test if image loads
    await testImageUrl(imageUrl);

    return imageUrl;
  } catch (error) {
    console.error('Pollinations image generation failed:', error);
    throw new Error('Failed to generate image with Pollinations: ' + error.message);
  }
};

/**
 * Generate image using OpenAI DALL-E 3
 * @param {string} prompt - Image generation prompt
 * @param {Object} options - Generation options
 * @returns {Promise<string>} Image URL
 */
export const generateImageDALLE = async (prompt, options = {}) => {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured. Add REACT_APP_OPENAI_API_KEY to your .env file');
  }

  try {
    const {
      size = '1024x1024', // 1024x1024, 1024x1792, or 1792x1024
      quality = 'standard', // standard or hd
      style = 'natural' // natural or vivid
    } = options;

    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: size,
        quality: quality,
        style: style
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'DALL-E API request failed');
    }

    const data = await response.json();
    return data.data[0].url;
  } catch (error) {
    console.error('DALL-E image generation failed:', error);
    throw new Error('Failed to generate image with DALL-E: ' + error.message);
  }
};

/**
 * Generate image using Stability AI
 * @param {string} prompt - Image generation prompt
 * @param {Object} options - Generation options
 * @returns {Promise<string>} Base64 encoded image
 */
export const generateImageStability = async (prompt, options = {}) => {
  if (!STABILITY_API_KEY) {
    throw new Error('Stability AI API key not configured. Add REACT_APP_STABILITY_API_KEY to your .env file');
  }

  try {
    const {
      width = 1024,
      height = 1024,
      steps = 30,
      cfg_scale = 7
    } = options;

    const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STABILITY_API_KEY}`
      },
      body: JSON.stringify({
        text_prompts: [
          {
            text: prompt,
            weight: 1
          }
        ],
        cfg_scale: cfg_scale,
        height: height,
        width: width,
        steps: steps,
        samples: 1
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Stability AI API request failed');
    }

    const data = await response.json();
    return `data:image/png;base64,${data.artifacts[0].base64}`;
  } catch (error) {
    console.error('Stability AI image generation failed:', error);
    throw new Error('Failed to generate image with Stability AI: ' + error.message);
  }
};

/**
 * Main function to generate image based on current provider
 * @param {Object} speciesData - Marine species content data
 * @param {Object} options - Generation options
 * @returns {Promise<Object>} Generated image data
 */
export const generateSpeciesImage = async (speciesData, options = {}) => {
  try {
    const prompt = createImagePrompt(speciesData);
    let imageUrl;
    let provider = options.provider || CURRENT_PROVIDER;

    console.log(`🎨 Generating image for ${speciesData.commonName} using ${provider}...`);
    console.log('📝 Prompt:', prompt);

    switch (provider) {
      case IMAGE_PROVIDERS.GEMINI:
        imageUrl = await generateImageGemini(prompt, options);
        break;

      case IMAGE_PROVIDERS.DALLE:
        imageUrl = await generateImageDALLE(prompt, options);
        break;

      case IMAGE_PROVIDERS.STABILITY:
        imageUrl = await generateImageStability(prompt, options);
        break;

      case IMAGE_PROVIDERS.POLLINATIONS:
      default:
        imageUrl = await generateImagePollinations(prompt, options);
        break;
    }

    const result = {
      imageUrl,
      prompt,
      provider,
      speciesName: speciesData.commonName,
      generatedAt: new Date().toISOString()
    };

    console.log('✅ Image generated successfully:', {
      speciesName: result.speciesName,
      provider: result.provider,
      imageUrlLength: imageUrl?.length || 0,
      imageUrlStart: imageUrl?.substring(0, 100) + '...'
    });

    return result;
  } catch (error) {
    console.error('❌ Image generation failed:', error);
    throw error;
  }
};

/**
 * Generate images for multiple species (batch generation)
 * @param {Array} speciesArray - Array of species data objects
 * @param {Object} options - Generation options
 * @returns {Promise<Array>} Array of generated image data
 */
export const generateBatchImages = async (speciesArray, options = {}) => {
  const {
    delayBetweenRequests = 2000, // 2 second delay to avoid rate limiting
    onProgress = null
  } = options;

  const results = [];

  for (let i = 0; i < speciesArray.length; i++) {
    try {
      const species = speciesArray[i];

      if (onProgress) {
        onProgress({
          current: i + 1,
          total: speciesArray.length,
          speciesName: species.commonName
        });
      }

      const imageData = await generateSpeciesImage(species, options);
      results.push({
        success: true,
        ...imageData
      });

      // Delay between requests to avoid rate limiting
      if (i < speciesArray.length - 1) {
        await new Promise(resolve => setTimeout(resolve, delayBetweenRequests));
      }
    } catch (error) {
      results.push({
        success: false,
        speciesName: speciesArray[i].commonName,
        error: error.message
      });
    }
  }

  return results;
};

/**
 * Download image from URL and convert to blob
 * @param {string} imageUrl - URL of the image
 * @returns {Promise<Blob>} Image blob
 */
export const downloadImageAsBlob = async (imageUrl) => {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error('Failed to download image');
    }
    return await response.blob();
  } catch (error) {
    console.error('Image download failed:', error);
    throw error;
  }
};

/**
 * Save generated image to Firebase Storage
 * @param {Blob} imageBlob - Image blob
 * @param {string} speciesName - Name of species for filename
 * @param {string} speciesId - ID of the species (optional)
 * @returns {Promise<string>} Download URL from Firebase
 */
export const saveImageToFirebase = async (imageBlob, speciesName, speciesId = null) => {
  try {
    const { storage } = await import('../config/firebase');
    const { ref, uploadBytes, getDownloadURL } = await import('firebase/storage');

    // Create a unique filename
    const timestamp = Date.now();
    const cleanName = speciesName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const fileName = `marine-species/${cleanName}-${timestamp}.png`;

    const storageRef = ref(storage, fileName);

    console.log('Uploading image to Firebase Storage:', fileName);

    await uploadBytes(storageRef, imageBlob, {
      contentType: 'image/png',
      customMetadata: {
        speciesName: speciesName,
        generatedAt: new Date().toISOString(),
        ...(speciesId && { speciesId })
      }
    });

    const downloadUrl = await getDownloadURL(storageRef);
    console.log('Image uploaded successfully:', downloadUrl);

    return downloadUrl;
  } catch (error) {
    console.error('Firebase upload failed:', error);
    throw error;
  }
};

/**
 * Save image URL to Firestore species document
 * @param {string} speciesId - Species ID
 * @param {string} imageUrl - Firebase Storage URL
 * @param {Object} metadata - Additional metadata
 * @returns {Promise<void>}
 */
export const saveImageToSpeciesDocument = async (speciesId, imageUrl, metadata = {}) => {
  try {
    const { db } = await import('../config/firebase');
    const { doc, updateDoc, arrayUnion } = await import('firebase/firestore');

    const speciesRef = doc(db, 'species', speciesId);

    await updateDoc(speciesRef, {
      images: arrayUnion({
        url: imageUrl,
        generatedAt: new Date().toISOString(),
        provider: metadata.provider || 'unknown',
        prompt: metadata.prompt || '',
        isPrimary: metadata.isPrimary || false
      }),
      updatedAt: new Date().toISOString()
    });

    console.log('Image URL saved to Firestore for species:', speciesId);
  } catch (error) {
    console.error('Failed to save image URL to Firestore:', error);
    // Don't throw - image is already uploaded to Storage
  }
};

/**
 * Test if an image URL is accessible
 * @param {string} url - Image URL to test
 * @returns {Promise<boolean>}
 */
const testImageUrl = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => reject(new Error('Image failed to load'));
    img.src = url;
  });
};

/**
 * Get available image generation providers
 * @returns {Array} List of available providers with their status
 */
export const getAvailableProviders = () => {
  return [
    {
      id: IMAGE_PROVIDERS.POLLINATIONS,
      name: 'Pollinations.ai',
      available: true,
      free: true,
      quality: 'Good',
      speed: 'Fast',
      recommended: true
    },
    {
      id: IMAGE_PROVIDERS.GEMINI,
      name: 'Google Gemini 2.0 Flash',
      available: !!GEMINI_API_KEY,
      free: true,
      quality: 'Text Only (No Images Yet)',
      speed: 'Fast',
      note: 'Coming Soon - Currently uses Pollinations as fallback'
    },
    {
      id: IMAGE_PROVIDERS.DALLE,
      name: 'OpenAI DALL-E 3',
      available: !!OPENAI_API_KEY,
      free: false,
      quality: 'Excellent',
      speed: 'Medium',
      cost: '$0.04/image'
    },
    {
      id: IMAGE_PROVIDERS.STABILITY,
      name: 'Stability AI',
      available: !!STABILITY_API_KEY,
      free: false,
      quality: 'Excellent',
      speed: 'Fast',
      cost: 'Credits-based'
    }
  ];
};

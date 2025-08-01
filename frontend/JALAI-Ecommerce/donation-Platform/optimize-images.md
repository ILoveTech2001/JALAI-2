# Image Optimization Guide

## Current Issues
Your images are loading slowly because some are very large:
- `fan-2.jpg` = 1.6MB (should be ~100KB)
- `kids-smiling.jpeg` = 1.3MB (should be ~200KB)
- `orphanage-2.jpg` = 1.3MB (should be ~200KB)
- `sofa-1.webp` = 935KB (should be ~150KB)

## Quick Fixes Applied
✅ Added lazy loading to all images
✅ Added loading placeholders
✅ Added image preloading for critical images
✅ Added error handling for broken images

## Recommended Image Sizes
- **Product thumbnails**: 300x300px, ~50-100KB
- **Hero images**: 800x600px, ~150-300KB
- **Category images**: 400x400px, ~80-150KB

## Tools to Optimize Images

### Online Tools (Easy):
1. **TinyPNG** - https://tinypng.com/
2. **Squoosh** - https://squoosh.app/
3. **Compressor.io** - https://compressor.io/

### Command Line (Advanced):
```bash
# Install ImageMagick
brew install imagemagick

# Resize and compress images
magick input.jpg -resize 400x400^ -gravity center -extent 400x400 -quality 80 output.jpg

# Convert to WebP (better compression)
magick input.jpg -resize 400x400^ -quality 80 output.webp
```

## Priority Images to Optimize
1. `public/clothings/fan-2.jpg` (1.6MB → ~100KB)
2. `public/kids-smiling.jpeg` (1.3MB → ~200KB)
3. `public/assets/orphanage-2.jpg` (1.3MB → ~200KB)
4. `public/clothings/sofa-1.webp` (935KB → ~150KB)
5. `public/clothings/table-1.webp` (352KB → ~100KB)

## Performance Improvements Expected
- **Before**: 5-10 seconds loading time
- **After optimization**: 1-2 seconds loading time
- **Data savings**: ~80% reduction in image sizes

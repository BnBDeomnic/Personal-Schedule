# Export Guide

## Overview
The schedule can be exported in two formats: **PNG (Image)** and **PDF (Print-ready)**.

## Export Features

### 📄 PDF Export
- **Format**: A4 Landscape
- **Quality**: 2x resolution
- **Use case**: Print-ready, professional documents
- **File size**: Smaller than PNG
- **Filename**: `StudentName_Semester.pdf`
- **Supports**: All modern CSS (gradients, backdrop-blur, etc.)

### 🖼️ PNG Export
- **Format**: PNG Image
- **Quality**: 3x resolution (High-definition)
- **Use case**: Share on social media, WhatsApp, presentations
- **File size**: Larger than PDF
- **Filename**: `StudentName_Semester.png`
- **Supports**: All modern CSS (gradients, backdrop-blur, etc.)

## How to Export

1. **Create or Edit Schedule**
   - Go to Dashboard → Create/Edit Schedule
   - Add courses and save

2. **Preview Schedule**
   - Click "👁️ Preview" button
   - Review your schedule layout

3. **Export**
   - Click **"📄 Export as PDF"** for print-ready document
   - Click **"🖼️ Export as Image"** for high-res PNG
   - Wait for processing (3-5 seconds)
   - File will download automatically

## Technical Details

### Export Library
- **modern-screenshot**: Modern HTML to image converter (supports all CSS features)
- **jsPDF**: Generates PDF from canvas

### Why modern-screenshot?
Unlike html2canvas, modern-screenshot supports:
- ✅ CSS Gradients (linear, radial, conic)
- ✅ Backdrop filters (blur, brightness, etc.)
- ✅ Modern color functions (lab, lch, oklch)
- ✅ CSS transforms and animations
- ✅ Shadow DOM
- ✅ Better font rendering

### Export Quality Settings

**PNG Export:**
```typescript
scale: 3              // 3x resolution (HD)
backgroundColor: "#ffffff"
quality: 1            // Maximum quality
```

**PDF Export:**
```typescript
scale: 2              // 2x resolution
orientation: "landscape"
format: "a4"
size: 297mm x 210mm
```

### File Naming Convention
Files are automatically named based on:
- Student Name
- Semester
- Spaces replaced with underscores

Example: `John_Doe_Fall_2024.pdf`

## Troubleshooting

### Export Failed
- **Check browser console** for errors
- **Ensure schedule has courses** (at least 1)
- **Try different browser** (Chrome recommended)
- **Disable browser extensions** that block downloads

### Low Quality Export
- PNG uses 3x scale (highest quality)
- PDF uses 2x scale (optimized for print)
- Canvas size: 3508 x dynamic height (based on courses)

### File Not Downloading
- **Check browser download settings**
- **Allow pop-ups** for the site
- **Check download folder** permissions

## Best Practices

1. **For Printing**: Use PDF export
2. **For Sharing**: Use PNG export
3. **Preview First**: Always preview before exporting
4. **Check Layout**: Ensure no overlapping courses
5. **File Size**: PNG is larger but higher quality

## Browser Compatibility

✅ **Fully Supported:**
- Chrome/Edge (Recommended)
- Firefox
- Safari

⚠️ **Not Supported:**
- Internet Explorer

## Performance

- **Export Time**: 3-5 seconds
- **Canvas Size**: ~3508 x 2000px (varies)
- **PNG File Size**: ~500KB - 2MB
- **PDF File Size**: ~200KB - 800KB

## Modern CSS Support

Thanks to modern-screenshot, your exported schedules will include:
- Beautiful gradient backgrounds
- Backdrop blur effects
- Modern color schemes
- All Tailwind CSS features
- Perfect font rendering

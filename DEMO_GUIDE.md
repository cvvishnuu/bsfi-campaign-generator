# Interactive Demo Guide

## Overview

The BFSI Campaign Generator now includes a **1-minute interactive demo** with professional voiceover narration that showcases the full workflow.

## Features

✅ **Interactive Tour** - Guided step-by-step walkthrough using Shepherd.js
✅ **Voiceover Narration** - Professional female voice using browser's Web Speech API
✅ **Auto-advancing Steps** - Smooth 7-10 second transitions
✅ **Full Workflow Simulation** - Upload → Configure → Generate → Review → Download
✅ **No Video Files** - Pure interactive experience, lightweight (~9KB library)

## How to Access

### From Landing Page
1. Visit the homepage: `http://localhost:3000`
2. Click the **"View Demo"** button in the hero section
3. Demo starts automatically

### Direct URL
- Navigate directly to: `http://localhost:3000/demo`

## Demo Flow (65 seconds total)

### Step 1: Welcome (7s)
- Introduction to BFSI Campaign Generator
- Overview of capabilities

### Step 2: CSV Upload (8s)
- Shows how to upload customer data
- Pre-loaded sample file with 3 customers

### Step 3: Campaign Prompt (7s)
- Demonstrates prompt configuration
- Example: "Generate credit card offers with cashback benefits"

### Step 4: Tone Selection (8s)
- Message tone options: Professional, Friendly, Urgent
- Brand voice matching

### Step 5: AI Generation (10s)
- Personalized message creation
- Automatic compliance checking (RBI, SEBI, IRDAI, TRAI)

### Step 6: Review & Edit (10s)
- Message approval interface
- Edit and regenerate functionality

### Step 7: Compliance Transparency (8s)
- Compliance scores
- AI explainability (XAI)
- Regulatory references

### Step 8: Download & Complete (7s)
- Excel export
- CTA to sign up

## Technical Implementation

### Stack
- **Tour Library**: Shepherd.js v14.5.1
- **Voiceover**: Browser Web Speech API (en-US-Wavenet-F equivalent)
- **Data**: Pre-configured sample data in `lib/demo-data.ts`

### Key Files

```
components/
  demo-tour.tsx          # Main tour component with Shepherd.js

app/
  demo/
    page.tsx             # Dedicated demo page

lib/
  demo-data.ts           # Sample CSV, messages, voiceover scripts

app/
  globals.css            # Shepherd.js custom styles
  page.tsx               # Landing page with "View Demo" button wired
```

## Voiceover

### Browser-based (Default)
The demo uses the **Web Speech API** built into all modern browsers. No setup required!

**Voice**: Browser's default female voice (varies by browser/OS)
- **Chrome/Edge**: Google US Female
- **Safari**: Samantha (macOS) / Victoria (iOS)
- **Firefox**: eSpeak Female

**Quality**: Good - suitable for demos and presentations

### Optional: Google Cloud TTS (High Quality)

For production deployment with higher quality voiceover:

1. **Install Google Cloud TTS client**:
   ```bash
   cd /Users/user/Desktop/NDWProjects/bfsi-campaign-generator
   pnpm add @google-cloud/text-to-speech
   ```

2. **Set up credentials**:
   ```bash
   # Create service account at https://console.cloud.google.com
   export GOOGLE_APPLICATION_CREDENTIALS="/path/to/credentials.json"
   ```

3. **Generate audio files**:
   ```bash
   npx tsx scripts/generate-demo-audio.ts
   ```

4. **Update tour component** to load MP3 files instead of using Web Speech API

**Voice**: Wavenet-F (professional female)
**Quality**: Excellent - broadcast quality
**Cost**: Free tier (1M characters/month)

## Customization

### Change Demo Duration

Edit `lib/demo-data.ts`:

```typescript
export const DEMO_VOICEOVER_SCRIPTS = [
  {
    step: 1,
    duration: 7000, // Change to 10000 for 10 seconds
    text: '...',
  },
  // ...
];
```

### Modify Voiceover Text

Update the `text` field in `DEMO_VOICEOVER_SCRIPTS`:

```typescript
{
  step: 2,
  duration: 8000,
  text: 'Your custom narration here...',
}
```

### Change Sample Data

Edit `DEMO_CSV_DATA` and `DEMO_GENERATED_MESSAGES` in `lib/demo-data.ts`.

### Customize Tour Steps

Modify `components/demo-tour.tsx`:

```typescript
tour.addStep({
  id: 'custom-step',
  text: `<div class="demo-step">...</div>`,
  attachTo: {
    element: '[data-demo-step="your-element"]',
    on: 'bottom',
  },
  buttons: [...],
});
```

## Troubleshooting

### Voiceover Not Playing

**Issue**: No sound during demo

**Solutions**:
1. Check browser sound permissions
2. Try Chrome (best Web Speech API support)
3. Ensure volume is not muted
4. Click "Start Demo" button (browser requires user interaction)

### Tour Not Starting

**Issue**: Demo page loads but tour doesn't appear

**Solutions**:
1. Check browser console for errors
2. Ensure Shepherd.js CSS is loaded (`@import "shepherd.js/dist/css/shepherd.css"`)
3. Clear browser cache and hard reload (Cmd+Shift+R)

### Steps Not Auto-advancing

**Issue**: Tour gets stuck on one step

**Solutions**:
1. Check `duration` values in `demo-data.ts`
2. Ensure voiceover is playing (may block auto-advance)
3. Manually click "Next" to proceed

## Browser Compatibility

✅ Chrome 90+
✅ Safari 14+
✅ Firefox 88+
✅ Edge 90+

**Note**: Web Speech API availability varies. Chrome provides the best experience.

## Performance

- **Bundle Size**: +9KB (Shepherd.js minified)
- **CSS**: +5KB (Shepherd.js styles)
- **Audio**: 0KB (browser-based) or ~300KB (Google TTS pre-generated)
- **Load Time**: <100ms

## Next Steps

1. **Test the demo**: Visit `/demo` and run through the full flow
2. **Customize content**: Update `demo-data.ts` with your branding
3. **Optional**: Set up Google Cloud TTS for production-quality audio
4. **Deploy**: No special configuration needed - works on all hosting platforms

## Support

For issues or questions:
- Check browser console for errors
- Review `components/demo-tour.tsx` for tour logic
- Ensure `shepherd.js` is installed: `pnpm list shepherd.js`

---

**Demo Duration**: 65 seconds (1 minute, 5 seconds)
**Narrator**: Professional female voice
**Interactive**: Full UI interaction enabled
**Compliance**: Showcases RBI, SEBI, IRDAI, TRAI checking

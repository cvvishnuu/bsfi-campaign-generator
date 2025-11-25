/**
 * Generate demo audio files using a free TTS service
 * Uses gTTS (Google Translate TTS) which is free and doesn't require API keys
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { DEMO_VOICEOVER_SCRIPTS } from '../lib/demo-data';

async function generateAudioFiles() {
  console.log('🎤 Generating demo audio files using Google Translate TTS...\n');

  const outputDir = join(process.cwd(), 'public', 'demo', 'audio');

  // Ensure directory exists
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
    console.log('📁 Created directory:', outputDir, '\n');
  }

  for (let i = 0; i < DEMO_VOICEOVER_SCRIPTS.length; i++) {
    const script = DEMO_VOICEOVER_SCRIPTS[i];
    const text = encodeURIComponent(script.text);

    // Using Google Translate TTS endpoint (free, no API key required)
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${text}&tl=en&client=tw-ob`;

    console.log(`🔊 Step ${i}: "${script.text.substring(0, 50)}..."`);

    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const buffer = await response.arrayBuffer();
      const outputPath = join(outputDir, `step-${i}.mp3`);

      writeFileSync(outputPath, Buffer.from(buffer));
      console.log(`✅ Saved: step-${i}.mp3\n`);

      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (error) {
      console.error(`❌ Error generating step ${i}:`, error);
      throw error;
    }
  }

  console.log('✨ All audio files generated successfully!');
  console.log('📁 Location: public/demo/audio/');
  console.log('🎉 Ready to use in demo tour!\n');
}

generateAudioFiles().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});

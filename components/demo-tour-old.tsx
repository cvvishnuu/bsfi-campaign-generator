/**
 * Interactive Demo Tour Component
 * Professional cinematic demo with voiceover narration
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';
import { DEMO_VOICEOVER_SCRIPTS } from '@/lib/demo-data';

interface DemoTourProps {
  onComplete?: () => void;
  autoStart?: boolean;
}

export function DemoTour({ onComplete, autoStart = false }: DemoTourProps) {
  const tourRef = useRef<Shepherd.Tour | null>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [voicesLoaded, setVoicesLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Load voices on mount
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setVoicesLoaded(true);
        console.log('✅ Voices loaded:', voices.length);
      }
    };

    // Load voices immediately if available
    loadVoices();

    // Listen for voiceschanged event (Chrome/Edge)
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
  }, []);

  useEffect(() => {
    if (!voicesLoaded) return;

    // Initialize Shepherd tour
    const tour = new Shepherd.Tour({
      useModalOverlay: true,
      defaultStepOptions: {
        classes: 'shepherd-theme-cinematic',
        scrollTo: { behavior: 'smooth', block: 'center' },
        cancelIcon: {
          enabled: true,
        },
        when: {
          show() {
            const stepIndex = tour.steps.indexOf(tour.getCurrentStep()!);
            setCurrentStep(stepIndex);
            // Don't auto-play voice on step 0 (welcome) - button will trigger it
            if (stepIndex > 0) {
              playVoiceover(stepIndex);
            }
          },
          hide() {
            stopVoiceover();
          },
        },
      },
    });

    // Define tour steps with cinematic styling
    tour.addStep({
      id: 'welcome',
      text: `
        <div class="demo-step">
          <div class="demo-step-header">
            <div class="demo-icon-wrapper">
              <svg class="demo-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3>Welcome to BFSI Campaign Generator!</h3>
          </div>
          <p class="demo-description">
            Let me show you how to create compliant marketing campaigns in minutes using AI.
          </p>
          <div class="demo-info-box">
            <svg class="info-icon" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9a1 1 0 012 0v4a1 1 0 11-2 0V9zm1-5a1 1 0 100 2 1 1 0 000-2z"/>
            </svg>
            <span>This 1-minute demo runs automatically with voiceover. Click Start to begin!</span>
          </div>
        </div>
      `,
      buttons: [
        {
          text: '▶ Start Demo',
          action: () => {
            console.log('👆 User clicked Start Demo - initiating voice playback');
            // Manually play the welcome voice after user interaction
            playVoiceover(0);
            // Then advance to next step
            setTimeout(() => {
              if (tour.isActive()) {
                tour.next();
              }
            }, 7000); // Welcome script is 7 seconds
          },
          classes: 'shepherd-button-primary',
        },
      ],
    });

    tour.addStep({
      id: 'csv-upload',
      text: `
        <div class="demo-step">
          <div class="demo-step-header">
            <div class="demo-icon-wrapper">
              <svg class="demo-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <h3>Step 1: Upload Customer Data</h3>
          </div>
          <p class="demo-description">
            Upload a CSV file with customer details like name, email, and occupation.
          </p>
          <div class="demo-highlight">
            ✨ Sample file loaded: 3 customers ready
          </div>
        </div>
      `,
      attachTo: {
        element: '[data-demo-step="csv-upload"]',
        on: 'bottom',
      },
      buttons: [],
    });

    tour.addStep({
      id: 'campaign-prompt',
      text: `
        <div class="demo-step">
          <div class="demo-step-header">
            <div class="demo-icon-wrapper">
              <svg class="demo-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3>Step 2: Describe Your Campaign</h3>
          </div>
          <p class="demo-description">
            Tell the AI what kind of message you want to generate.
          </p>
          <div class="demo-example">
            💡 "Generate credit card offers with cashback benefits"
          </div>
        </div>
      `,
      attachTo: {
        element: '[data-demo-step="prompt"]',
        on: 'bottom',
      },
      buttons: [],
    });

    tour.addStep({
      id: 'tone-selection',
      text: `
        <div class="demo-step">
          <div class="demo-step-header">
            <div class="demo-icon-wrapper">
              <svg class="demo-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </div>
            <h3>Step 3: Choose Message Tone</h3>
          </div>
          <p class="demo-description">
            Select professional, friendly, or urgent to match your brand voice.
          </p>
        </div>
      `,
      attachTo: {
        element: '[data-demo-step="tone"]',
        on: 'bottom',
      },
      buttons: [],
    });

    tour.addStep({
      id: 'generation',
      text: `
        <div class="demo-step">
          <div class="demo-step-header">
            <div class="demo-icon-wrapper">
              <svg class="demo-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3>Step 4: AI Generation & Compliance</h3>
          </div>
          <p class="demo-description">
            Our AI generates personalized messages and automatically checks compliance.
          </p>
          <div class="demo-badges">
            <span class="demo-badge">RBI</span>
            <span class="demo-badge">SEBI</span>
            <span class="demo-badge">IRDAI</span>
            <span class="demo-badge">TRAI</span>
          </div>
        </div>
      `,
      buttons: [],
    });

    tour.addStep({
      id: 'review-edit',
      text: `
        <div class="demo-step">
          <div class="demo-step-header">
            <div class="demo-icon-wrapper">
              <svg class="demo-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3>Step 5: Review & Edit</h3>
          </div>
          <p class="demo-description">
            Review each message in the approval screen.
          </p>
          <div class="demo-actions">
            <span>✏️ Edit content</span>
            <span>🔄 Regenerate with feedback</span>
          </div>
        </div>
      `,
      buttons: [],
    });

    tour.addStep({
      id: 'compliance-xai',
      text: `
        <div class="demo-step">
          <div class="demo-step-header">
            <div class="demo-icon-wrapper">
              <svg class="demo-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3>Step 6: Compliance Transparency</h3>
          </div>
          <p class="demo-description">
            See compliance scores and AI explanations for every decision.
          </p>
          <div class="demo-highlight">
            🎯 Full transparency with regulatory references
          </div>
        </div>
      `,
      buttons: [],
    });

    tour.addStep({
      id: 'download',
      text: `
        <div class="demo-step">
          <div class="demo-step-header">
            <div class="demo-icon-wrapper">
              <svg class="demo-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
            <h3>Step 7: Download & Deploy</h3>
          </div>
          <p class="demo-description">
            Approve and download your campaign as Excel - ready to use!
          </p>
          <div class="demo-success">
            <div class="success-icon">✓</div>
            <div>
              <strong>Demo Complete!</strong>
              <p>Ready to create your own campaigns?</p>
            </div>
          </div>
        </div>
      `,
      buttons: [
        {
          text: '🚀 Get Started',
          action: () => {
            tour.complete();
            if (onComplete) onComplete();
          },
          classes: 'shepherd-button-primary',
        },
      ],
    });

    tourRef.current = tour;

    // Start tour if autoStart is enabled
    if (autoStart) {
      // Small delay to ensure everything is loaded
      setTimeout(() => {
        tour.start();
      }, 300);
    }

    // Cleanup
    return () => {
      if (tour) {
        tour.complete();
      }
      stopVoiceover();
    };
  }, [voicesLoaded, autoStart, onComplete]);

  // Play voiceover using Web Speech API with proper voice selection
  const playVoiceover = (stepIndex: number) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      console.warn('⚠️ Speech Synthesis not available');
      return;
    }

    const script = DEMO_VOICEOVER_SCRIPTS[stepIndex];
    if (!script) return;

    const utterance = new SpeechSynthesisUtterance(script.text);

    // Get available voices
    const voices = window.speechSynthesis.getVoices();
    console.log('🎤 Available voices:', voices.length);

    // Try to find best female voice
    const femaleVoice = voices.find(
      (voice) =>
        (voice.lang.startsWith('en-US') || voice.lang.startsWith('en-GB')) &&
        (voice.name.includes('Female') ||
          voice.name.includes('Samantha') ||
          voice.name.includes('Victoria') ||
          voice.name.includes('Karen') ||
          voice.name.includes('Zira') ||
          voice.name.toLowerCase().includes('female'))
    ) || voices.find((voice) => voice.lang.startsWith('en') && voice.name.includes('Google'));

    if (femaleVoice) {
      utterance.voice = femaleVoice;
      console.log('✅ Selected voice:', femaleVoice.name);
    } else {
      console.log('⚠️ Using default voice');
    }

    utterance.rate = 0.95; // Slightly slower for clarity
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    utterance.onstart = () => {
      setIsPlaying(true);
      console.log('🔊 Playing audio for step', stepIndex + 1);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      console.log('✓ Audio finished for step', stepIndex + 1);

      // Auto-advance to next step after speech completes (except last step)
      const tour = tourRef.current;
      if (tour && tour.isActive()) {
        const currentIndex = tour.steps.indexOf(tour.getCurrentStep()!);
        // Auto-advance all steps except the last one (which has "Get Started" button)
        if (currentIndex < tour.steps.length - 1) {
          setTimeout(() => {
            if (tour.isActive()) {
              console.log('→ Advancing from step', currentIndex, 'to step', currentIndex + 1);
              tour.next();
            }
          }, 500); // Small delay for smoother transition
        } else {
          console.log('✓ Demo complete - waiting for user to click "Get Started"');
        }
      }
    };

    utterance.onerror = (event) => {
      console.log('⚠️ Speech event:', event.error, '(this is normal during step changes)');
      setIsPlaying(false);
    };

    speechSynthesisRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const stopVoiceover = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    // Silently stop speech without throwing errors
    try {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    } catch (e) {
      // Ignore any errors from cancel
    }

    speechSynthesisRef.current = null;
    setIsPlaying(false);
  };

  // Expose start method
  useEffect(() => {
    (window as any).__demoTour = {
      start: () => tourRef.current?.start(),
      isPlaying,
      currentStep,
    };
    return () => {
      delete (window as any).__demoTour;
    };
  }, [isPlaying, currentStep]);

  // Render audio indicator
  return (
    <>
      {isPlaying && (
        <div className="demo-audio-indicator">
          <div className="audio-wave">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span className="audio-text">Playing narration...</span>
        </div>
      )}
    </>
  );
}

// Export helper to trigger demo from anywhere
export function startDemo() {
  if (typeof window !== 'undefined' && (window as any).__demoTour) {
    (window as any).__demoTour.start();
  }
}

/**
 * Interactive Demo Tour Component
 * Professional cinematic demo with MP3 voiceover narration
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';

interface DemoTourProps {
  onComplete?: () => void;
  autoStart?: boolean;
  onStepChange?: (stepIndex: number) => void;
  onScreenChange?: (screen: 'upload' | 'execution' | 'review') => void;
}

export function DemoTour({ onComplete, autoStart = false, onStepChange, onScreenChange }: DemoTourProps) {
  const tourRef = useRef<Shepherd.Tour | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [tourStarted, setTourStarted] = useState(false);

  // Play audio for a step (steps 1-7)
  const playStepAudio = (stepNumber: number) => {
    console.log(`🔊 [${new Date().toISOString()}] Playing audio for step ${stepNumber}`);

    // Create new audio
    const audio = new Audio(`/demo/audio/step-${stepNumber}.mp3`);
    audioRef.current = audio;

    audio.onloadeddata = () => {
      console.log(`✅ Step ${stepNumber} audio loaded`);
    };

    audio.onplay = () => {
      setIsPlaying(true);
      console.log(`▶️ Step ${stepNumber} audio playing`);
    };

    audio.onended = () => {
      setIsPlaying(false);
      console.log(`✓ Step ${stepNumber} audio finished`);

      // Wait for audio to fully finish
      setTimeout(() => {
        const tour = tourRef.current;
        if (!tour || !tour.isActive()) return;

        const currentIndex = tour.steps.indexOf(tour.getCurrentStep()!);

        // Handle screen changes based on step
        if (stepNumber === 3 && onScreenChange) {
          console.log('→ Changing to execution screen');
          onScreenChange('execution');
        }

        if (stepNumber === 4 && onScreenChange) {
          console.log('→ Changing to review screen');
          onScreenChange('review');
        }

        // Advance to next step
        if (currentIndex < tour.steps.length - 1) {
          console.log(`→ Advancing to step ${stepNumber + 1}`);
          tour.next();

          // Play audio for next step after tour advances
          playStepAudio(stepNumber + 1);
        } else {
          console.log('✓ Demo tour complete!');
        }
      }, 1000);
    };

    audio.onerror = (e) => {
      console.error(`❌ Step ${stepNumber} audio error:`, e);
      setIsPlaying(false);
    };

    // Start playing immediately
    audio.play().catch((error) => {
      console.error('❌ Failed to play audio:', error);
      setIsPlaying(false);
    });
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setIsPlaying(false);
  };

  useEffect(() => {
    // Initialize Shepherd tour (without welcome step)
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
            const stepNumber = stepIndex + 1;
            console.log(`📍 Showing step ${stepNumber}`);

            // Notify parent component (step numbers are now 1-7 instead of 0-7)
            if (onStepChange) {
              onStepChange(stepNumber);
            }

            // Note: Audio is now manually controlled from onended handlers
            // No automatic audio playback here to prevent race conditions
          },
        },
      },
    });

    // Step 1: CSV Upload
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

    // Step 2: Campaign Prompt
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

    // Step 3: Tone Selection
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

    // Step 4: AI Generation
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

    // Step 5: Review & Edit
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
      attachTo: {
        element: '[data-demo-step="review-edit"]',
        on: 'bottom',
      },
      buttons: [],
    });

    // Step 6: Compliance XAI
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
      attachTo: {
        element: '[data-demo-step="compliance-xai"]',
        on: 'left',
      },
      buttons: [],
    });

    // Step 7: Download
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
      attachTo: {
        element: '[data-demo-step="download"]',
        on: 'top',
      },
      buttons: [
        {
          text: '🚀 Get Started',
          action: () => {
            stopAudio();
            tour.complete();
            if (onComplete) onComplete();
          },
          classes: 'shepherd-button-primary',
        },
      ],
    });

    tourRef.current = tour;

    // Cleanup
    return () => {
      stopAudio();
      if (tour) {
        tour.complete();
      }
    };
  }, [onComplete, onStepChange]); // Do NOT include playStepAudio - it causes infinite re-renders

  // Handle Start Demo button click
  const handleStartDemo = () => {
    console.log('👆 User clicked Start Demo');

    // Hide welcome modal
    setShowWelcome(false);

    // Play welcome audio
    playWelcomeAudio();
  };

  // Play welcome audio, then start tour
  const playWelcomeAudio = () => {
    console.log('🔊 Playing welcome audio');

    const audio = new Audio('/demo/audio/step-0.mp3');
    audioRef.current = audio;

    audio.onloadeddata = () => {
      console.log('✅ Welcome audio loaded');
    };

    audio.onplay = () => {
      setIsPlaying(true);
      console.log('▶️ Welcome audio playing');
    };

    audio.onended = () => {
      setIsPlaying(false);
      console.log('✓ Welcome audio finished, starting tour');

      // Start tour from step 1 and manually play step 1 audio
      setTimeout(() => {
        const tour = tourRef.current;
        if (tour) {
          setTourStarted(true);
          tour.start();

          // Manually play step 1 audio after tour starts
          setTimeout(() => {
            playStepAudio(1);
          }, 500);
        }
      }, 500);
    };

    audio.onerror = (e) => {
      console.error('❌ Welcome audio error:', e);
      setIsPlaying(false);
    };

    audio.play().catch((error) => {
      console.error('❌ Failed to play welcome audio:', error);
      setIsPlaying(false);
    });
  };

  // Render
  return (
    <>
      {/* Welcome Modal */}
      {showWelcome && autoStart && !tourStarted && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50">
          <div className="demo-step max-w-md bg-white rounded-2xl p-8 shadow-2xl">
            <div className="demo-step-header">
              <div className="demo-icon-wrapper">
                <svg className="demo-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Welcome to BFSI Campaign Generator!</h3>
            </div>
            <p className="demo-description text-gray-700 my-4">
              Let me show you how to create compliant marketing campaigns in minutes using AI.
            </p>
            <div className="demo-info-box bg-blue-50 p-4 rounded-lg flex items-start gap-3 mb-6">
              <svg className="info-icon w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9a1 1 0 012 0v4a1 1 0 11-2 0V9zm1-5a1 1 0 100 2 1 1 0 000-2z"/>
              </svg>
              <span className="text-sm text-gray-700">This 1-minute demo runs automatically with voiceover. Click Start to begin!</span>
            </div>
            <button
              onClick={handleStartDemo}
              className="shepherd-button-primary w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              ▶ Start Demo
            </button>
          </div>
        </div>
      )}

      {/* Audio Indicator */}
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

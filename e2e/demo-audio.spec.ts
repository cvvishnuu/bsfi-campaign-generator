/**
 * Playwright test for demo audio sequencing
 */

import { test, expect } from '@playwright/test';

test('Demo audio plays Steps 1→2→3→4 sequentially', async ({ page }) => {
  const consoleLogs: string[] = [];

  // Collect console logs
  page.on('console', (msg) => {
    const text = msg.text();
    consoleLogs.push(text);
    console.log(`[BROWSER] ${text}`);
  });

  // Navigate to demo page
  console.log('📄 Navigating to demo page...');
  await page.goto('http://localhost:3000/demo', {
    waitUntil: 'networkidle',
  });

  // Wait for welcome modal
  console.log('⏳ Waiting for welcome modal...');
  await page.waitForSelector('.demo-step', { timeout: 10000 });

  // Click "Start Demo"
  console.log('👆 Clicking Start Demo button...');
  await page.click('button.shepherd-button-primary');

  // Wait for Step 1 tooltip to appear
  console.log('⏳ Waiting for Step 1 tooltip...');
  await page.waitForSelector('text=Step 1: Upload Customer Data', { timeout: 15000 });

  // Wait 60 seconds for steps to complete
  console.log('⏳ Waiting 60 seconds for Steps 1-4...');
  await page.waitForTimeout(60000);

  // Analyze console logs
  console.log('\n📊 Analyzing results...\n');

  const step1Start = consoleLogs.find((log) => log.includes('🔊') && log.includes('step 1'));
  const step1End = consoleLogs.find((log) => log.includes('✓') && log.includes('Step 1 audio finished'));
  const step2Start = consoleLogs.find((log) => log.includes('🔊') && log.includes('step 2'));
  const step2End = consoleLogs.find((log) => log.includes('✓') && log.includes('Step 2 audio finished'));
  const step3Start = consoleLogs.find((log) => log.includes('🔊') && log.includes('step 3'));
  const step3End = consoleLogs.find((log) => log.includes('✓') && log.includes('Step 3 audio finished'));
  const step4Start = consoleLogs.find((log) => log.includes('🔊') && log.includes('step 4'));

  const interruptErrors = consoleLogs.filter((log) =>
    log.includes('interrupted by a call to pause')
  );

  // Print findings
  console.log('═══════════════════════════════════════');
  console.log('           TEST RESULTS');
  console.log('═══════════════════════════════════════\n');

  if (step1Start) console.log('✅ Step 1 audio started');
  else console.log('❌ Step 1 audio did NOT start');

  if (step1End) console.log('✅ Step 1 audio finished');
  else console.log('❌ Step 1 audio did NOT finish');

  if (step2Start) console.log('✅ Step 2 audio started');
  else console.log('❌ Step 2 audio did NOT start');

  if (step2End) console.log('✅ Step 2 audio finished');
  else console.log('❌ Step 2 audio did NOT finish');

  if (step3Start) console.log('✅ Step 3 audio started');
  else console.log('❌ Step 3 audio did NOT start');

  if (step3End) console.log('✅ Step 3 audio finished');
  else console.log('❌ Step 3 audio did NOT finish');

  if (step4Start) console.log('✅ Step 4 audio started');
  else console.log('❌ Step 4 audio did NOT start');

  if (interruptErrors.length > 0) {
    console.log(`❌ Found ${interruptErrors.length} audio interruption errors`);
  } else {
    console.log('✅ No audio interruption errors');
  }

  console.log('\n═══════════════════════════════════════\n');

  // Print relevant logs for debugging
  if (!step2Start) {
    console.log('\n🔍 DEBUGGING: Logs around Step 1 end:\n');
    const step1EndIndex = consoleLogs.findIndex((log) => log.includes('✓ Step 1 audio finished'));
    if (step1EndIndex >= 0) {
      consoleLogs.slice(Math.max(0, step1EndIndex - 2), step1EndIndex + 10).forEach((log) => {
        console.log(`  ${log}`);
      });
    }
  }

  // Assertions
  expect(step1Start, 'Step 1 audio should start').toBeTruthy();
  expect(step1End, 'Step 1 audio should finish').toBeTruthy();
  expect(step2Start, 'Step 2 audio should start').toBeTruthy();
  expect(step2End, 'Step 2 audio should finish').toBeTruthy();
  expect(interruptErrors.length, 'Should have no interruption errors').toBe(0);
});

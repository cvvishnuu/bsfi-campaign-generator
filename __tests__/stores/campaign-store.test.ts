/**
 * Campaign Store Tests
 * Target: 95% coverage
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { useCampaignStore } from '@/stores/campaign-store';
import { mockCSVData, mockExecutionId } from '@/mocks/test-data';

describe('Campaign Store', () => {
  beforeEach(() => {
    // Reset store state before each test
    useCampaignStore.setState({
      currentCampaign: null,
      currentExecutionId: null,
    });
  });

  describe('setCampaignData', () => {
    it('should set campaign data', () => {
      const { setCampaignData } = useCampaignStore.getState();

      const campaignData = {
        csv: null,
        rows: mockCSVData,
        prompt: 'Generate marketing content',
        tone: 'professional' as const,
      };

      setCampaignData(campaignData);

      const { currentCampaign } = useCampaignStore.getState();

      expect(currentCampaign).toEqual(campaignData);
      expect(currentCampaign?.rows).toHaveLength(3);
      expect(currentCampaign?.prompt).toBe('Generate marketing content');
    });

    it('should update existing campaign data', () => {
      const { setCampaignData } = useCampaignStore.getState();

      setCampaignData({
        csv: null,
        rows: mockCSVData,
        prompt: 'First prompt',
        tone: 'professional' as const,
      });

      setCampaignData({
        csv: null,
        rows: mockCSVData,
        prompt: 'Updated prompt',
        tone: 'friendly' as const,
      });

      const { currentCampaign } = useCampaignStore.getState();

      expect(currentCampaign?.prompt).toBe('Updated prompt');
      expect(currentCampaign?.tone).toBe('friendly');
    });
  });

  describe('setExecutionId', () => {
    it('should set execution ID', () => {
      const { setExecutionId } = useCampaignStore.getState();

      setExecutionId(mockExecutionId);

      const { currentExecutionId } = useCampaignStore.getState();

      expect(currentExecutionId).toBe(mockExecutionId);
    });

    it('should update existing execution ID', () => {
      const { setExecutionId } = useCampaignStore.getState();

      setExecutionId('exec-1');
      setExecutionId('exec-2');

      const { currentExecutionId } = useCampaignStore.getState();

      expect(currentExecutionId).toBe('exec-2');
    });
  });

  describe('resetCampaign', () => {
    it('should clear all campaign data', () => {
      const { setCampaignData, setExecutionId, resetCampaign } = useCampaignStore.getState();

      // Set some data
      setCampaignData({
        csv: null,
        rows: mockCSVData,
        prompt: 'Test prompt',
        tone: 'professional' as const,
      });
      setExecutionId(mockExecutionId);

      // Reset
      resetCampaign();

      const { currentCampaign, currentExecutionId } = useCampaignStore.getState();

      expect(currentCampaign).toBeNull();
      expect(currentExecutionId).toBeNull();
    });

    it('should be idempotent (safe to call multiple times)', () => {
      const { resetCampaign } = useCampaignStore.getState();

      resetCampaign();
      resetCampaign();
      resetCampaign();

      const { currentCampaign, currentExecutionId } = useCampaignStore.getState();

      expect(currentCampaign).toBeNull();
      expect(currentExecutionId).toBeNull();
    });
  });

  describe('Integration: Full workflow', () => {
    it('should handle complete campaign lifecycle', () => {
      const { setCampaignData, setExecutionId, resetCampaign } = useCampaignStore.getState();

      // 1. Create campaign
      setCampaignData({
        csv: null,
        rows: mockCSVData,
        prompt: 'Generate offer',
        tone: 'professional' as const,
      });

      expect(useCampaignStore.getState().currentCampaign).not.toBeNull();

      // 2. Start execution
      setExecutionId(mockExecutionId);

      expect(useCampaignStore.getState().currentExecutionId).toBe(mockExecutionId);

      // 3. Complete and reset
      resetCampaign();

      expect(useCampaignStore.getState().currentCampaign).toBeNull();
      expect(useCampaignStore.getState().currentExecutionId).toBeNull();
    });
  });
});

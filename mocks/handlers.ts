/**
 * MSW (Mock Service Worker) handlers for API mocking in tests
 */
import { http, HttpResponse } from 'msw';
import {
  mockExecutionResponse,
  mockExecutionStatus,
  mockPendingApprovalData,
} from './test-data';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
const WORKFLOW_ID = process.env.NEXT_PUBLIC_WORKFLOW_ID || 'workflow_bfsi_marketing_template';

export const handlers = [
  // Start campaign execution
  http.post(`${API_URL}/public/agents/${WORKFLOW_ID}/execute`, async () => {
    return HttpResponse.json(mockExecutionResponse);
  }),

  // Get execution status
  http.get(`${API_URL}/public/executions/:executionId/status`, ({ params }) => {
    return HttpResponse.json({
      ...mockExecutionStatus,
      executionId: params.executionId,
    });
  }),

  // Get execution results
  http.get(`${API_URL}/public/executions/:executionId/results`, ({ params }) => {
    return HttpResponse.json({
      executionId: params.executionId,
      status: 'completed',
      output: { message: 'Execution completed successfully' },
      results: [],
    });
  }),

  // Get pending approval data
  http.get(`${API_URL}/public/executions/:executionId/pending-approval`, ({ params }) => {
    return HttpResponse.json({
      ...mockPendingApprovalData,
      executionId: params.executionId,
    });
  }),

  // Approve campaign
  http.post(`${API_URL}/public/executions/:executionId/approve`, ({ params }) => {
    return HttpResponse.json({
      executionId: params.executionId,
      status: 'approved',
      message: 'Campaign approved successfully',
    });
  }),

  // Reject campaign
  http.post(`${API_URL}/public/executions/:executionId/reject`, ({ params }) => {
    return HttpResponse.json({
      executionId: params.executionId,
      status: 'rejected',
      message: 'Campaign rejected successfully',
    });
  }),

  // Error handlers for testing error scenarios
  http.post(`${API_URL}/public/agents/${WORKFLOW_ID}/execute-error`, async () => {
    return HttpResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }),

  http.get(`${API_URL}/public/executions/not-found/status`, () => {
    return HttpResponse.json(
      { error: 'Execution not found' },
      { status: 404 }
    );
  }),
];

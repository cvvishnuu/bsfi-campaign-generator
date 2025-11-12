/**
 * Mock test data for unit and integration tests
 */

export const mockUser = {
  id: 'test-user-1',
  email: 'test@example.com',
  name: 'Test User',
  plan: 'free' as const,
  trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
  createdAt: new Date().toISOString(),
};

export const mockUsageStats = {
  userId: 'test-user-1',
  campaignsGenerated: 1,
  campaignsLimit: 3,
  rowsProcessed: 10,
  rowsLimit: 30,
  periodStart: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  periodEnd: new Date().toISOString(),
};

export const mockCSVData = [
  { name: 'John Doe', product: 'Credit Card', email: 'john@example.com', age: 35 },
  { name: 'Jane Smith', product: 'Personal Loan', email: 'jane@example.com', age: 28 },
  { name: 'Bob Johnson', product: 'Home Mortgage', email: 'bob@example.com', age: 42 },
];

export const mockExecutionId = 'exec-123456';

export const mockExecutionResponse = {
  executionId: mockExecutionId,
  status: 'pending' as const,
  message: 'Execution started successfully',
};

export const mockExecutionStatus = {
  executionId: mockExecutionId,
  workflowId: 'workflow_bfsi_marketing_template',
  status: 'running' as const,
  startedAt: new Date().toISOString(),
};

export const mockPendingApprovalData = {
  executionId: mockExecutionId,
  workflowId: 'workflow_bfsi_marketing_template',
  status: 'pending_approval',
  approvalData: {
    generatedContent: [
      {
        row: 1,
        name: 'John Doe',
        product: 'Credit Card',
        message: 'Dear John, discover exclusive cashback benefits with our Premium Credit Card.',
        complianceScore: 98,
        complianceStatus: 'pass',
        violations: [],
      },
      {
        row: 2,
        name: 'Jane Smith',
        product: 'Personal Loan',
        message: 'Hi Jane, our Personal Loan offers competitive rates for your financial goals.',
        complianceScore: 92,
        complianceStatus: 'pass',
        violations: [],
      },
      {
        row: 3,
        name: 'Bob Johnson',
        product: 'Home Mortgage',
        message: 'Hello Bob, make your dream home a reality with our flexible mortgage options.',
        complianceScore: 75,
        complianceStatus: 'warning',
        violations: ['Consider adding rate disclaimer'],
      },
    ],
  },
  startedAt: new Date().toISOString(),
};

export const mockCSVFile = new File(
  [
    'name,product,email,age\n' +
    'John Doe,Credit Card,john@example.com,35\n' +
    'Jane Smith,Personal Loan,jane@example.com,28\n' +
    'Bob Johnson,Home Mortgage,bob@example.com,42'
  ],
  'test-customers.csv',
  { type: 'text/csv' }
);

export const mockInvalidCSVFile = new File(
  ['invalid,data,without,required,columns\n1,2,3,4,5'],
  'invalid.csv',
  { type: 'text/csv' }
);

export const mockLargeCSVFile = new File(
  [
    'name,product\n' +
    Array.from({ length: 101 }, (_, i) => `Customer ${i + 1},Product ${i + 1}`).join('\n')
  ],
  'large.csv',
  { type: 'text/csv' }
);

'use client';

import { CsvPreviewData } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

interface ColumnPreviewProps {
  preview: CsvPreviewData;
}

const REQUIRED_COLUMNS = ['customer_id', 'name', 'phone', 'email', 'age', 'location', 'occupation'];

export function ColumnPreview({ preview }: ColumnPreviewProps) {
  const { columns, sampleRows, totalRows, missingColumns, hasAllRequired } = preview;

  return (
    <Card className={hasAllRequired ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-gray-900">
              {hasAllRequired ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span>CSV Preview - All Required Columns Found</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  <span>CSV Preview - Missing Required Columns</span>
                </>
              )}
            </CardTitle>
            <CardDescription className="text-gray-700">
              {totalRows} rows loaded " {columns.length} columns detected
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Column Status */}
        <div>
          <p className="text-sm font-semibold mb-2 text-gray-900">Column Status:</p>
          <div className="flex flex-wrap gap-2">
            {REQUIRED_COLUMNS.map((col) => {
              const isPresent = columns.includes(col);
              return (
                <Badge
                  key={col}
                  variant={isPresent ? 'default' : 'destructive'}
                  className="flex items-center gap-1"
                >
                  {isPresent ? (
                    <CheckCircle2 className="w-3 h-3" />
                  ) : (
                    <XCircle className="w-3 h-3" />
                  )}
                  {col}
                </Badge>
              );
            })}
          </div>
          {columns.filter((col) => !REQUIRED_COLUMNS.includes(col)).length > 0 && (
            <div className="mt-3">
              <p className="text-sm font-semibold mb-2 text-gray-700">Additional Columns:</p>
              <div className="flex flex-wrap gap-2">
                {columns
                  .filter((col) => !REQUIRED_COLUMNS.includes(col))
                  .map((col) => (
                    <Badge key={col} variant="secondary" className="text-gray-700">
                      {col}
                    </Badge>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Missing Columns Warning */}
        {!hasAllRequired && (
          <div className="p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
            <p className="text-sm font-semibold text-yellow-900 mb-1">

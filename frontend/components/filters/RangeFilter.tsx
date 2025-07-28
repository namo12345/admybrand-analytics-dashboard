// Component Type: Manual
// Custom numeric range filter component - manually implemented

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface RangeFilterProps {
  label: string;
  min: number | null;
  max: number | null;
  onRangeChange: (min: number | null, max: number | null) => void;
  placeholder?: {
    min?: string;
    max?: string;
  };
  formatValue?: (value: number) => string;
}

export default function RangeFilter({
  label,
  min,
  max,
  onRangeChange,
  placeholder = {},
  formatValue = (value) => value.toString()
}: RangeFilterProps) {
  const [minValue, setMinValue] = useState<string>(min?.toString() || '');
  const [maxValue, setMaxValue] = useState<string>(max?.toString() || '');
  const [isValid, setIsValid] = useState(true);

  // Update local state when props change
  useEffect(() => {
    setMinValue(min?.toString() || '');
    setMaxValue(max?.toString() || '');
  }, [min, max]);

  // Validate range values
  const validateRange = (minStr: string, maxStr: string): boolean => {
    if (!minStr && !maxStr) return true;
    
    const minNum = minStr ? parseFloat(minStr) : null;
    const maxNum = maxStr ? parseFloat(maxStr) : null;
    
    // Check for valid numbers
    if (minStr && (isNaN(minNum!) || minNum! < 0)) return false;
    if (maxStr && (isNaN(maxNum!) || maxNum! < 0)) return false;
    
    // Check if min <= max
    if (minNum !== null && maxNum !== null && minNum > maxNum) return false;
    
    return true;
  };

  const handleMinChange = (value: string) => {
    setMinValue(value);
    const valid = validateRange(value, maxValue);
    setIsValid(valid);
    
    if (valid) {
      const minNum = value ? parseFloat(value) : null;
      const maxNum = maxValue ? parseFloat(maxValue) : null;
      onRangeChange(minNum, maxNum);
    }
  };

  const handleMaxChange = (value: string) => {
    setMaxValue(value);
    const valid = validateRange(minValue, value);
    setIsValid(valid);
    
    if (valid) {
      const minNum = minValue ? parseFloat(minValue) : null;
      const maxNum = value ? parseFloat(value) : null;
      onRangeChange(minNum, maxNum);
    }
  };

  const clearRange = () => {
    setMinValue('');
    setMaxValue('');
    setIsValid(true);
    onRangeChange(null, null);
  };

  const hasValue = minValue || maxValue;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium text-gray-700">{label}</Label>
        {hasValue && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearRange}
            className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="flex-1">
          <Input
            type="number"
            placeholder={placeholder.min || 'Min'}
            value={minValue}
            onChange={(e) => handleMinChange(e.target.value)}
            className={`text-sm ${!isValid ? 'border-red-300 focus:border-red-500' : ''}`}
            min="0"
            step="1000"
          />
        </div>
        
        <span className="text-gray-400 text-sm">to</span>
        
        <div className="flex-1">
          <Input
            type="number"
            placeholder={placeholder.max || 'Max'}
            value={maxValue}
            onChange={(e) => handleMaxChange(e.target.value)}
            className={`text-sm ${!isValid ? 'border-red-300 focus:border-red-500' : ''}`}
            min="0"
            step="1000"
          />
        </div>
      </div>
      
      {!isValid && (
        <p className="text-xs text-red-600">
          Please enter valid range values (min ≤ max)
        </p>
      )}
      
      {hasValue && isValid && (
        <p className="text-xs text-gray-500">
          {minValue && `Min: ${formatValue(parseFloat(minValue))}`}
          {minValue && maxValue && ' • '}
          {maxValue && `Max: ${formatValue(parseFloat(maxValue))}`}
        </p>
      )}
    </div>
  );
}

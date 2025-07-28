// Component Type: Manual
// Modal for importing campaign and inventory data

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { X, Upload, FileText, Download, CheckCircle } from 'lucide-react';

interface ImportDataModalProps {
  onClose: () => void;
}

export default function ImportDataModal({ onClose }: ImportDataModalProps) {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    const csvFiles = droppedFiles.filter(file => 
      file.type === 'text/csv' || file.name.endsWith('.csv')
    );
    
    if (csvFiles.length > 0) {
      setFiles(prev => [...prev, ...csvFiles]);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload CSV files only.",
        variant: "destructive",
      });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    
    setIsUploading(true);
    
    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Import successful!",
        description: `Successfully imported ${files.length} file(s).`,
      });
      
      setFiles([]);
      onClose();
    } catch (error) {
      toast({
        title: "Import failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const downloadTemplate = (type: 'campaigns' | 'inventory') => {
    const templates = {
      campaigns: 'campaign_name,media_type,channel,start_date,end_date,budget,status\nSample Campaign,Digital,Google Ads,2024-01-01,2024-03-31,50000,Active',
      inventory: 'type,location,media_owner,size,availability_start,availability_end,price,status\nBillboard,Times Square NYC,Clear Channel,14x48 ft,2024-01-01,2024-12-31,85000,Available'
    };
    
    const blob = new Blob([templates[type]], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}_template.csv`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Template downloaded",
      description: `${type} template has been downloaded.`,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
              <Upload className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg">Import Data</CardTitle>
              <p className="text-sm text-gray-500">Upload CSV files to import campaigns or inventory</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Templates */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-900">Download Templates</h3>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => downloadTemplate('campaigns')}
                className="flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Campaign Template</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => downloadTemplate('inventory')}
                className="flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Inventory Template</span>
              </Button>
            </div>
          </div>

          {/* File Upload Area */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-900">Upload Files</h3>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-blue-400 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-900 mb-2">
                Drop CSV files here, or{' '}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  browse
                </button>
              </p>
              <p className="text-sm text-gray-500">
                Supports CSV files up to 10MB
              </p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".csv"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-900">Selected Files</h3>
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-500">
                          {(file.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              disabled={files.length === 0 || isUploading}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              {isUploading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <CheckCircle className="w-4 h-4 mr-2" />
              )}
              {isUploading ? 'Importing...' : `Import ${files.length} File(s)`}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

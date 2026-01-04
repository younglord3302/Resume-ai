import React, { useRef, useState } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import Button from './Button'; 

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
  error?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, selectedFile, error }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (validTypes.includes(file.type)) {
      onFileSelect(file);
    } else {
      // Parent component handles error display via prop, but we could enforce types here too
      onFileSelect(file); // Let parent validtion logic handle specific errors or re-check
    }
  };

  return (
    <div className="space-y-4">
      <div 
        className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 text-center cursor-pointer
          ${isDragging 
            ? 'border-primary bg-primary/10 scale-[1.02]' 
            : 'border-slate-700 hover:border-slate-500 bg-slate-900/50'
          }
          ${error ? 'border-red-500 bg-red-500/5' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept=".pdf,.docx,.txt"
          onChange={handleFileInput}
        />

        {selectedFile ? (
          <div className="flex flex-col items-center animate-fade-in">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4 text-primary">
              <FileText className="w-8 h-8" />
            </div>
            <p className="text-lg font-medium text-white mb-1">{selectedFile.name}</p>
            <p className="text-sm text-slate-400 mb-4">{(selectedFile.size / 1024).toFixed(1)} KB</p>
            <Button 
              size="sm" 
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                onFileSelect(null);
              }}
            >
              Remove File
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
             <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-400 group-hover:text-white transition-colors">
              <Upload className="w-8 h-8" />
            </div>
            <p className="text-lg font-medium text-white mb-2">
              <span className="text-primary">Click to upload</span> or drag and drop
            </p>
            <p className="text-sm text-slate-400 max-w-xs mx-auto">
              Supported formats: PDF, DOCX, TXT (Max 5MB)
            </p>
          </div>
        )}
      </div>
      {error && (
        <p className="text-red-400 text-sm text-center flex items-center justify-center gap-2">
          <X className="w-4 h-4" /> {error}
        </p>
      )}
    </div>
  );
};

export default FileUpload;

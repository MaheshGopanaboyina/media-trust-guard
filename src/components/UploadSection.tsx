
import { useState, useRef } from 'react';
import { Upload, Video, Image, AudioWaveform, Loader2, AlertCircle } from 'lucide-react';

interface UploadSectionProps {
  onFileUpload: (file: File) => void;
  isProcessing: boolean;
}

export const UploadSection = ({ onFileUpload, isProcessing }: UploadSectionProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Validate file type
    const validTypes = ['video/', 'audio/', 'image/'];
    const isValid = validTypes.some(type => file.type.startsWith(type));
    
    if (!isValid) {
      alert('Please upload a video, audio, or image file.');
      return;
    }

    // Simulate upload progress
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          onFileUpload(file);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const getFileTypeIcon = (type: string) => {
    if (type.startsWith('video/')) return Video;
    if (type.startsWith('audio/')) return AudioWaveform;
    return Image;
  };

  if (isProcessing) {
    return (
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-12 text-center">
            <div className="relative mb-8">
              <Loader2 className="h-16 w-16 text-blue-400 mx-auto animate-spin" />
              <div className="absolute inset-0 bg-blue-400 blur-xl opacity-20"></div>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-4">Analyzing Media</h3>
            <p className="text-gray-300 mb-8">
              Our AI models are examining your file for signs of manipulation...
            </p>
            
            <div className="max-w-md mx-auto">
              <div className="bg-slate-700 rounded-full h-2 mb-4">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-400">Processing... This may take a few seconds</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Upload Media for Analysis
          </h2>
          <p className="text-gray-300 text-lg">
            Support for video, audio, and image files up to 100MB
          </p>
        </div>

        {/* Upload Area */}
        <div
          className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
            dragActive
              ? 'border-blue-400 bg-blue-500/10'
              : 'border-slate-600 hover:border-blue-500 bg-slate-800/30'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*,audio/*,image/*"
            onChange={handleChange}
            className="hidden"
          />

          <div className="space-y-6">
            <div className="relative">
              <Upload className="h-16 w-16 text-blue-400 mx-auto" />
              <div className="absolute inset-0 bg-blue-400 blur-xl opacity-20"></div>
            </div>

            <div>
              <p className="text-xl text-white font-semibold mb-2">
                Drop your files here, or{' '}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  browse
                </button>
              </p>
              <p className="text-gray-400">
                Supports MP4, MOV, MP3, WAV, JPG, PNG files
              </p>
            </div>

            {/* File Type Icons */}
            <div className="flex justify-center space-x-8 pt-4">
              {[
                { icon: Video, label: 'Video', color: 'text-red-400' },
                { icon: AudioWaveform, label: 'Audio', color: 'text-green-400' },
                { icon: Image, label: 'Image', color: 'text-purple-400' }
              ].map((type, index) => {
                const Icon = type.icon;
                return (
                  <div key={index} className="flex flex-col items-center space-y-2">
                    <Icon className={`h-8 w-8 ${type.color}`} />
                    <span className="text-xs text-gray-400">{type.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="mt-8">
              <div className="bg-slate-700 rounded-full h-2 mb-2">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-400">Uploading... {uploadProgress}%</p>
            </div>
          )}
        </div>

        {/* Security Notice */}
        <div className="mt-8 flex items-start space-x-3 bg-slate-800/30 border border-blue-500/20 rounded-lg p-4">
          <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-gray-300">
            <strong className="text-white">Security Notice:</strong> Your files are processed securely and deleted after analysis. 
            We never store or share your media content.
          </div>
        </div>
      </div>
    </section>
  );
};

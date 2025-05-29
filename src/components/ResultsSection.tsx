
import { CheckCircle, XCircle, AlertTriangle, Clock, ArrowLeft, Download, Share2 } from 'lucide-react';
import type { DetectionResult } from '../pages/Index';

interface ResultsSectionProps {
  result: DetectionResult;
  onBackToUpload: () => void;
}

export const ResultsSection = ({ result, onBackToUpload }: ResultsSectionProps) => {
  const getVerdictIcon = () => {
    if (result.verdict === 'Real') {
      return <CheckCircle className="h-16 w-16 text-green-400" />;
    } else {
      return <XCircle className="h-16 w-16 text-red-400" />;
    }
  };

  const getVerdictColor = () => {
    return result.verdict === 'Real' 
      ? 'from-green-600 to-emerald-600' 
      : 'from-red-600 to-rose-600';
  };

  const getConfidenceColor = () => {
    if (result.confidence >= 80) return 'text-green-400';
    if (result.confidence >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <section className="py-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBackToUpload}
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Upload</span>
          </button>
          
          <div className="flex space-x-4">
            <button className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors">
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </button>
            <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              <Share2 className="h-4 w-4" />
              <span>Share Results</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Result */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8">
              <div className="text-center mb-8">
                <div className="relative mb-6">
                  {getVerdictIcon()}
                  <div className="absolute inset-0 bg-current blur-xl opacity-20"></div>
                </div>
                
                <h2 className="text-3xl font-bold text-white mb-2">
                  Detection Complete
                </h2>
                
                <div className={`inline-block bg-gradient-to-r ${getVerdictColor()} text-white px-6 py-2 rounded-full font-semibold text-lg`}>
                  {result.verdict} Content
                </div>
              </div>

              {/* File Info */}
              <div className="bg-slate-700/50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">File Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Filename:</span>
                    <p className="text-white font-medium">{result.fileName}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Type:</span>
                    <p className="text-white font-medium capitalize">{result.fileType}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Processed:</span>
                    <p className="text-white font-medium">{result.timestamp.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Processing Time:</span>
                    <p className="text-white font-medium">{result.processingTime}ms</p>
                  </div>
                </div>
              </div>

              {/* Analysis Details */}
              <div className="bg-slate-700/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Analysis Details</h3>
                <p className="text-gray-300">{result.analysisDetails}</p>
                
                {result.verdict === 'Fake' && (
                  <div className="mt-4 flex items-start space-x-3 bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-red-200">
                      <strong>Manipulation Detected:</strong> This content shows signs of artificial generation or modification. 
                      Exercise caution when sharing or using this media.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Confidence Score & Metrics */}
          <div className="space-y-6">
            {/* Confidence Score */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Confidence Score</h3>
              
              <div className="text-center mb-6">
                <div className={`text-4xl font-bold ${getConfidenceColor()} mb-2`}>
                  {result.confidence}%
                </div>
                <p className="text-gray-400 text-sm">Detection Certainty</p>
              </div>

              <div className="bg-slate-700 rounded-full h-3 mb-4">
                <div 
                  className={`h-3 rounded-full transition-all duration-1000 ${
                    result.confidence >= 80 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                    result.confidence >= 60 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                    'bg-gradient-to-r from-red-500 to-rose-500'
                  }`}
                  style={{ width: `${result.confidence}%` }}
                ></div>
              </div>

              <div className="space-y-2 text-xs text-gray-400">
                <div className="flex justify-between">
                  <span>Low Confidence</span>
                  <span>High Confidence</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Detection Metrics</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Processing Speed</span>
                  <span className="text-white font-medium">Fast</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Model Accuracy</span>
                  <span className="text-white font-medium">99.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Analysis Depth</span>
                  <span className="text-white font-medium">Comprehensive</span>
                </div>
              </div>
            </div>

            {/* Processing Timeline */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Processing Timeline</h3>
              
              <div className="space-y-3">
                {[
                  { step: 'File Upload', time: '0ms', status: 'complete' },
                  { step: 'Pre-processing', time: '200ms', status: 'complete' },
                  { step: 'AI Analysis', time: `${result.processingTime - 300}ms`, status: 'complete' },
                  { step: 'Result Generation', time: '100ms', status: 'complete' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <div className="flex-1">
                      <p className="text-white text-sm">{item.step}</p>
                      <p className="text-gray-400 text-xs">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

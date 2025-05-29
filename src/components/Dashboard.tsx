
import { Clock, FileText, TrendingUp, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import type { DetectionResult } from '../pages/Index';

interface DashboardProps {
  detectionHistory: DetectionResult[];
  onSelectResult: (result: DetectionResult) => void;
}

export const Dashboard = ({ detectionHistory, onSelectResult }: DashboardProps) => {
  const totalScans = detectionHistory.length;
  const fakeDetected = detectionHistory.filter(r => r.verdict === 'Fake').length;
  const realDetected = detectionHistory.filter(r => r.verdict === 'Real').length;
  const avgConfidence = totalScans > 0 
    ? Math.round(detectionHistory.reduce((sum, r) => sum + r.confidence, 0) / totalScans)
    : 0;

  const getVerdictIcon = (verdict: string) => {
    return verdict === 'Real' 
      ? <CheckCircle className="h-5 w-5 text-green-400" />
      : <XCircle className="h-5 w-5 text-red-400" />;
  };

  const getVerdictBadge = (verdict: string) => {
    return verdict === 'Real'
      ? 'bg-green-500/20 text-green-400 border-green-500/30'
      : 'bg-red-500/20 text-red-400 border-red-500/30';
  };

  return (
    <section className="py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Detection Dashboard
          </h1>
          <p className="text-gray-300 text-lg">
            Monitor your deepfake detection history and analytics
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <FileText className="h-8 w-8 text-blue-400" />
              <TrendingUp className="h-5 w-5 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{totalScans}</div>
            <div className="text-gray-400 text-sm">Total Scans</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-green-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="h-8 w-8 text-green-400" />
              <div className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded">
                {totalScans > 0 ? Math.round((realDetected / totalScans) * 100) : 0}%
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{realDetected}</div>
            <div className="text-gray-400 text-sm">Real Content</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-red-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <AlertCircle className="h-8 w-8 text-red-400" />
              <div className="text-xs text-red-400 bg-red-500/20 px-2 py-1 rounded">
                {totalScans > 0 ? Math.round((fakeDetected / totalScans) * 100) : 0}%
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{fakeDetected}</div>
            <div className="text-gray-400 text-sm">Fake Detected</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-8 w-8 text-purple-400" />
              <div className="text-xs text-purple-400 bg-purple-500/20 px-2 py-1 rounded">
                AVG
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{avgConfidence}%</div>
            <div className="text-gray-400 text-sm">Avg Confidence</div>
          </div>
        </div>

        {/* Detection History */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-slate-700">
            <h2 className="text-xl font-semibold text-white">Recent Detections</h2>
            <p className="text-gray-400 text-sm mt-1">Click on any detection to view detailed results</p>
          </div>

          {detectionHistory.length === 0 ? (
            <div className="p-12 text-center">
              <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No Detections Yet</h3>
              <p className="text-gray-400">Upload your first file to start detecting deepfakes</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-700">
              {detectionHistory.map((result) => (
                <div
                  key={result.id}
                  onClick={() => onSelectResult(result)}
                  className="p-6 hover:bg-slate-700/30 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {getVerdictIcon(result.verdict)}
                      <div>
                        <h3 className="text-white font-medium">{result.fileName}</h3>
                        <p className="text-gray-400 text-sm">
                          {result.timestamp.toLocaleDateString()} at {result.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-white font-medium">{result.confidence}%</div>
                        <div className="text-gray-400 text-sm">Confidence</div>
                      </div>
                      
                      <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getVerdictBadge(result.verdict)}`}>
                        {result.verdict}
                      </div>
                      
                      <div className="px-3 py-1 bg-slate-600/50 text-gray-300 rounded-full text-xs font-medium">
                        {result.fileType}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

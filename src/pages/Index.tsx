
import { useState } from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { UploadSection } from '../components/UploadSection';
import { ResultsSection } from '../components/ResultsSection';
import { Dashboard } from '../components/Dashboard';
import { Footer } from '../components/Footer';

export interface DetectionResult {
  id: string;
  fileName: string;
  fileType: 'video' | 'audio' | 'image';
  confidence: number;
  verdict: 'Real' | 'Fake';
  timestamp: Date;
  analysisDetails: string;
  processingTime: number;
}

const Index = () => {
  const [currentView, setCurrentView] = useState<'upload' | 'results' | 'dashboard'>('upload');
  const [currentResult, setCurrentResult] = useState<DetectionResult | null>(null);
  const [detectionHistory, setDetectionHistory] = useState<DetectionResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);
    
    // Simulate AI processing with realistic timing
    const processingTime = Math.random() * 3000 + 2000; // 2-5 seconds
    
    setTimeout(() => {
      const confidence = Math.random() * 100;
      const verdict = confidence > 50 ? 'Real' : 'Fake';
      
      const result: DetectionResult = {
        id: Date.now().toString(),
        fileName: file.name,
        fileType: file.type.startsWith('video') ? 'video' : 
                 file.type.startsWith('audio') ? 'audio' : 'image',
        confidence: Math.round(confidence),
        verdict,
        timestamp: new Date(),
        analysisDetails: `Advanced ${file.type.startsWith('video') ? 'XceptionNet' : 
                        file.type.startsWith('audio') ? 'Resemblyzer' : 'GAN-detection'} analysis completed`,
        processingTime: Math.round(processingTime)
      };
      
      setCurrentResult(result);
      setDetectionHistory(prev => [result, ...prev]);
      setCurrentView('results');
      setIsProcessing(false);
    }, processingTime);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Header currentView={currentView} setCurrentView={setCurrentView} />
      
      <main className="relative">
        {currentView === 'upload' && (
          <>
            <Hero />
            <UploadSection onFileUpload={handleFileUpload} isProcessing={isProcessing} />
          </>
        )}
        
        {currentView === 'results' && currentResult && (
          <ResultsSection 
            result={currentResult} 
            onBackToUpload={() => setCurrentView('upload')}
          />
        )}
        
        {currentView === 'dashboard' && (
          <Dashboard 
            detectionHistory={detectionHistory}
            onSelectResult={(result) => {
              setCurrentResult(result);
              setCurrentView('results');
            }}
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

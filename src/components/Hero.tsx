
import { Shield, Zap, Globe, Lock } from 'lucide-react';

export const Hero = () => {
  const features = [
    { icon: Zap, text: 'Real-time Detection' },
    { icon: Globe, text: 'Global Scale Ready' },
    { icon: Lock, text: 'Enterprise Security' }
  ];

  return (
    <section className="relative pt-20 pb-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Hero Content */}
          <div className="relative mb-8">
            <Shield className="h-20 w-20 text-blue-400 mx-auto mb-6" />
            <div className="absolute inset-0 bg-blue-400 blur-xl opacity-20"></div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Detect
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}Truth
            </span>
            <br />in Media
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
            Professional-grade deepfake detection powered by advanced AI. 
            Protect your content, verify authenticity, and maintain trust in digital media.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-full px-6 py-3 text-blue-200 hover:bg-slate-700/50 transition-all duration-200"
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="relative inline-block">
            <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-lg font-semibold px-12 py-4 rounded-xl shadow-2xl shadow-blue-500/30 transition-all duration-300 transform hover:scale-105 hover:shadow-blue-500/40">
              Start Detection
            </button>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl blur-xl opacity-30 group-hover:opacity-40 transition-opacity"></div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { number: '99.2%', label: 'Detection Accuracy' },
            { number: '<2s', label: 'Average Processing' },
            { number: '24/7', label: 'API Availability' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-gray-400 text-sm uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

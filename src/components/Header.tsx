
import { Shield, Upload, BarChart3, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  currentView: 'upload' | 'results' | 'dashboard';
  setCurrentView: (view: 'upload' | 'results' | 'dashboard') => void;
}

export const Header = ({ currentView, setCurrentView }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Detect', view: 'upload' as const, icon: Upload },
    { name: 'Dashboard', view: 'dashboard' as const, icon: BarChart3 },
  ];

  return (
    <header className="relative z-50 bg-slate-900/90 backdrop-blur-md border-b border-blue-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setCurrentView('upload')}
          >
            <div className="relative">
              <Shield className="h-8 w-8 text-blue-400" />
              <div className="absolute inset-0 bg-blue-400 blur-lg opacity-30"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">DeepShield</h1>
              <p className="text-xs text-blue-300 -mt-1">Detect Truth in Media</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => setCurrentView(item.view)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    currentView === item.view
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                      : 'text-gray-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
            <div className="h-6 w-px bg-slate-600"></div>
            <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-lg shadow-blue-500/25">
              API Access
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-blue-500/20">
            <div className="px-4 py-4 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      setCurrentView(item.view);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      currentView === item.view
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{item.name}</span>
                  </button>
                );
              })}
              <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-3 rounded-lg font-medium">
                API Access
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

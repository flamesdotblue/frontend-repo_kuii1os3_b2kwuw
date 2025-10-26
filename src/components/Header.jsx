import React from 'react';
import { Shield, Radar, CreditCard, Activity } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-white/70 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30">
            <Shield size={22} />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">ATM Fraud Guard</h1>
            <p className="text-xs text-gray-500">Real-time anomaly insights for card withdrawals</p>
          </div>
        </div>
        <nav className="hidden sm:flex items-center gap-5 text-gray-600">
          <span className="inline-flex items-center gap-2 text-sm"><Radar size={16}/>Monitor</span>
          <span className="inline-flex items-center gap-2 text-sm"><CreditCard size={16}/>Cards</span>
          <span className="inline-flex items-center gap-2 text-sm"><Activity size={16}/>Signals</span>
        </nav>
      </div>
    </header>
  );
}

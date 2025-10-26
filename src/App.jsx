import React, { useMemo, useState } from 'react';
import Header from './components/Header';
import RiskSummary from './components/RiskSummary';
import FraudForm from './components/FraudForm';
import TransactionsTable from './components/TransactionsTable';

function computeRisk(tx) {
  // Heuristic scoring: 0-100
  let score = 0;
  // Amount weighting
  score += Math.min(tx.amount / 20, 25); // $500 -> 25
  // Time of day (late night higher risk)
  const night = tx.hour >= 0 && tx.hour <= 5;
  const late = tx.hour >= 22 || tx.hour <= 5;
  score += night ? 15 : late ? 10 : 0;
  // Geo distance from last known location
  score += Math.min(tx.distanceKm / 5, 20); // 100km -> 20
  // Country mismatch heavy weight
  score += tx.countryMismatch ? 20 : 0;
  // PIN retries
  score += Math.min(tx.pinRetries * 6, 18);
  // Velocity: transactions in last hour
  score += Math.min(Math.max(tx.recentCount - 1, 0) * 8, 24);
  // Cap at 100
  return Math.max(0, Math.min(100, Math.round(score)));
}

export default function App() {
  const [transactions, setTransactions] = useState(() => {
    const seed = [
      { cardLast4: '8421', amount: 60, hour: 10, distanceKm: 1, countryMismatch: false, pinRetries: 0, recentCount: 1 },
      { cardLast4: '1290', amount: 400, hour: 1, distanceKm: 35, countryMismatch: true, pinRetries: 2, recentCount: 4 },
      { cardLast4: '5532', amount: 160, hour: 19, distanceKm: 8, countryMismatch: false, pinRetries: 1, recentCount: 2 },
    ];
    return seed.map(s => {
      const risk = computeRisk(s);
      return { ...s, risk, flagged: risk >= 60 };
    });
  });

  const handleAnalyze = (payload) => {
    const risk = computeRisk(payload);
    const cardLast4 = String(Math.floor(1000 + Math.random()*9000));
    const tx = { ...payload, risk, flagged: risk >= 60, cardLast4 };
    setTransactions(prev => [tx, ...prev].slice(0, 25));
  };

  const kpis = useMemo(() => transactions, [transactions]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-50">
      <Header />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <RiskSummary transactions={kpis} />
            <TransactionsTable items={transactions} />
          </div>
          <div className="lg:col-span-1">
            <FraudForm onAnalyze={handleAnalyze} />
          </div>
        </div>
      </main>
      <footer className="py-8 text-center text-xs text-gray-500">
        Built for interactive exploration only. Not financial advice.
      </footer>
    </div>
  );
}

import React from 'react';
import { AlertTriangle, CheckCircle2, TrendingUp } from 'lucide-react';

const colorMap = {
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600' },
  orange: { bg: 'bg-orange-50', text: 'text-orange-600' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600' },
};

function StatCard({ title, value, delta, icon: Icon, color = 'indigo' }) {
  const colors = colorMap[color] || colorMap.indigo;
  return (
    <div className="p-5 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-start gap-4">
      <div className={`p-2.5 rounded-xl ${colors.bg} ${colors.text}`}>
        <Icon size={20} />
      </div>
      <div className="flex-1">
        <p className="text-xs text-gray-500">{title}</p>
        <div className="flex items-end gap-2">
          <p className="text-2xl font-semibold leading-tight">{value}</p>
          {delta !== undefined && (
            <span className="text-xs text-gray-500">{delta}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function RiskSummary({ transactions = [] }) {
  const total = transactions.length;
  const flagged = transactions.filter(t => t.flagged).length;
  const avgRisk = total ? Math.round(transactions.reduce((s, t) => s + t.risk, 0) / total) : 0;

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard
        title="Total Transactions (24h)"
        value={total}
        delta={total > 0 ? `Avg risk ${avgRisk}%` : undefined}
        icon={TrendingUp}
        color="indigo"
      />
      <StatCard
        title="Flagged for Review"
        value={flagged}
        delta={total ? `${Math.round((flagged/total)*100)}%` : '0%'}
        icon={AlertTriangle}
        color="orange"
      />
      <StatCard
        title="Cleared"
        value={total - flagged}
        delta={total ? `${Math.round(((total-flagged)/total)*100)}%` : '0%'}
        icon={CheckCircle2}
        color="emerald"
      />
    </section>
  );
}

import React from 'react';

function Badge({ children, type = 'ok' }) {
  const styles = {
    ok: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100',
    warn: 'bg-orange-50 text-orange-700 ring-1 ring-orange-100',
    danger: 'bg-red-50 text-red-700 ring-1 ring-red-100',
  }[type];
  return <span className={`px-2 py-1 rounded-md text-xs font-medium ${styles}`}>{children}</span>;
}

export default function TransactionsTable({ items = [] }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-semibold">Latest transactions</h3>
        <span className="text-xs text-gray-500">Showing {items.length}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left font-medium px-6 py-3">Card</th>
              <th className="text-left font-medium px-6 py-3">Amount</th>
              <th className="text-left font-medium px-6 py-3">Hour</th>
              <th className="text-left font-medium px-6 py-3">Dist (km)</th>
              <th className="text-left font-medium px-6 py-3">Retries</th>
              <th className="text-left font-medium px-6 py-3">Velocity</th>
              <th className="text-left font-medium px-6 py-3">Risk</th>
              <th className="text-left font-medium px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((t, i) => (
              <tr key={i} className="border-t border-gray-100 hover:bg-gray-50/50">
                <td className="px-6 py-3 font-mono text-xs">**** **** **** {t.cardLast4}</td>
                <td className="px-6 py-3">${'{'}t.amount.toFixed(2){'}'}</td>
                <td className="px-6 py-3">{t.hour}:00</td>
                <td className="px-6 py-3">{t.distanceKm}</td>
                <td className="px-6 py-3">{t.pinRetries}</td>
                <td className="px-6 py-3">{t.recentCount}/hr</td>
                <td className="px-6 py-3">
                  <Badge type={t.risk > 75 ? 'danger' : t.risk > 45 ? 'warn' : 'ok'}>{t.risk}%</Badge>
                </td>
                <td className="px-6 py-3">
                  {t.flagged ? <Badge type="danger">Review</Badge> : <Badge>Clear</Badge>}
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={8} className="px-6 py-8 text-center text-gray-500">No data yet. Analyze a transaction to get started.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

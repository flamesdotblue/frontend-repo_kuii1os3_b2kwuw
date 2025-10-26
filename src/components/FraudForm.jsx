import React, { useState } from 'react';
import { CreditCard, MapPin, Clock, ArrowRight } from 'lucide-react';

export default function FraudForm({ onAnalyze }) {
  const [form, setForm] = useState({
    amount: 120,
    hour: 14,
    distanceKm: 2,
    countryMismatch: false,
    pinRetries: 0,
    recentCount: 1,
  });

  const update = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    onAnalyze?.(form);
  };

  return (
    <form onSubmit={submit} className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 space-y-5">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600"><CreditCard size={18}/></div>
        <h2 className="font-semibold">Analyze a new ATM withdrawal</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-xs text-gray-600">Amount ($)</label>
          <input type="number" value={form.amount} onChange={(e)=>update('amount', Number(e.target.value))}
                 className="mt-1 w-full rounded-lg border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" min={0} />
        </div>
        <div>
          <label className="text-xs text-gray-600 inline-flex items-center gap-1"><Clock size={14}/>Hour (0-23)</label>
          <input type="number" value={form.hour} onChange={(e)=>update('hour', Number(e.target.value))}
                 className="mt-1 w-full rounded-lg border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" min={0} max={23} />
        </div>
        <div>
          <label className="text-xs text-gray-600 inline-flex items-center gap-1"><MapPin size={14}/>Distance from last location (km)</label>
          <input type="number" value={form.distanceKm} onChange={(e)=>update('distanceKm', Number(e.target.value))}
                 className="mt-1 w-full rounded-lg border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" min={0} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-xs text-gray-600">Country mismatch</label>
          <select value={form.countryMismatch ? 'yes' : 'no'} onChange={(e)=>update('countryMismatch', e.target.value==='yes')}
                  className="mt-1 w-full rounded-lg border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-600">PIN retries</label>
          <input type="number" value={form.pinRetries} onChange={(e)=>update('pinRetries', Number(e.target.value))}
                 className="mt-1 w-full rounded-lg border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" min={0} />
        </div>
        <div>
          <label className="text-xs text-gray-600">Transactions in last hour</label>
          <input type="number" value={form.recentCount} onChange={(e)=>update('recentCount', Number(e.target.value))}
                 className="mt-1 w-full rounded-lg border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" min={0} />
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <p className="text-xs text-gray-500">Heuristic scoring model: amount, velocity, geodistance, time-of-day, retries, and country mismatch.</p>
        <button type="submit" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
          Analyze <ArrowRight size={16}/>
        </button>
      </div>
    </form>
  );
}

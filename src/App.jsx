import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  MapPin, 
  Calculator, 
  Info, 
  RefreshCw,
  Search,
  CheckCircle2,
  Coins,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

const CITIES_DATA = {
  mumbai: {
    name: 'Mumbai',
    state: 'Maharashtra',
    gold24k: 73540,
    gold24kDelta: 220,
    gold22k: 67410,
    gold22kDelta: 200,
    gold18k: 55150,
    gold18kDelta: 160,
    silver1kg: 84500,
    silver1kgDelta: -350,
    history: [
      { day: '6d ago', rate: 73100 },
      { day: '5d ago', rate: 73250 },
      { day: '4d ago', rate: 73180 },
      { day: '3d ago', rate: 73400 },
      { day: '2d ago', rate: 73320 },
      { day: 'Yesterday', rate: 73320 },
      { day: 'Today', rate: 73540 },
    ]
  },
  delhi: {
    name: 'Delhi',
    state: 'National Capital Territory',
    gold24k: 73690,
    gold24kDelta: 220,
    gold22k: 67560,
    gold22kDelta: 200,
    gold18k: 55270,
    gold18kDelta: 160,
    silver1kg: 84500,
    silver1kgDelta: -350,
    history: [
      { day: '6d ago', rate: 73250 },
      { day: '5d ago', rate: 73400 },
      { day: '4d ago', rate: 73330 },
      { day: '3d ago', rate: 73550 },
      { day: '2d ago', rate: 73470 },
      { day: 'Yesterday', rate: 73470 },
      { day: 'Today', rate: 73690 },
    ]
  },
  lucknow: {
    name: 'Lucknow',
    state: 'Uttar Pradesh',
    gold24k: 73690,
    gold24kDelta: 220,
    gold22k: 67560,
    gold22kDelta: 200,
    gold18k: 55270,
    gold18kDelta: 160,
    silver1kg: 84500,
    silver1kgDelta: -350,
    history: [
      { day: '6d ago', rate: 73200 },
      { day: '5d ago', rate: 73380 },
      { day: '4d ago', rate: 73310 },
      { day: '3d ago', rate: 73530 },
      { day: '2d ago', rate: 73470 },
      { day: 'Yesterday', rate: 73470 },
      { day: 'Today', rate: 73690 },
    ]
  },
  jaipur: {
    name: 'Jaipur',
    state: 'Rajasthan',
    gold24k: 73690,
    gold24kDelta: 220,
    gold22k: 67560,
    gold22kDelta: 200,
    gold18k: 55270,
    gold18kDelta: 160,
    silver1kg: 84500,
    silver1kgDelta: -350,
    history: [
      { day: '6d ago', rate: 73220 },
      { day: '5d ago', rate: 73390 },
      { day: '4d ago', rate: 73300 },
      { day: '3d ago', rate: 73520 },
      { day: '2d ago', rate: 73470 },
      { day: 'Yesterday', rate: 73470 },
      { day: 'Today', rate: 73690 },
    ]
  }
};

export default function App() {
  const [selectedCityKey, setSelectedCityKey] = useState('lucknow');
  const [weight, setWeight] = useState(10);
  const [selectedKarat, setSelectedKarat] = useState('22k');
  const [makingCharge, setMakingCharge] = useState(12);

  const cityData = CITIES_DATA[selectedCityKey];

  const getBaseRatePerGram = () => {
    if (selectedKarat === '24k') return cityData.gold24k / 10;
    if (selectedKarat === '22k') return cityData.gold22k / 10;
    return cityData.gold18k / 10;
  };

  const basePrice = getBaseRatePerGram() * (weight || 0);
  const makingChargesAmount = (basePrice * (makingCharge || 0)) / 100;
  const taxableAmount = basePrice + makingChargesAmount;
  const gstAmount = taxableAmount * 0.03;
  const totalPayable = taxableAmount + gstAmount;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 pb-12 font-sans">
      <header className="max-w-md mx-auto flex items-center justify-between py-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-amber-400">स्वर्ण भाव (Gold Rates)</h1>
          <p className="text-xs text-slate-400">Daily Gold & Silver Rates India</p>
        </div>
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg px-2 py-1">
          <MapPin className="w-4 h-4 text-amber-400" />
          <select 
            value={selectedCityKey}
            onChange={(e) => setSelectedCityKey(e.target.value)}
            className="bg-transparent text-sm font-medium focus:outline-none text-slate-200"
          >
            {Object.entries(CITIES_DATA).map(([key, item]) => (
              <option key={key} value={key} className="bg-slate-900 text-slate-200">
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </header>

      <main className="max-w-md mx-auto mt-4 space-y-4">
        {/* 24K Rate Card */}
        <div className="bg-gradient-to-br from-amber-900/30 via-slate-900 to-slate-900 border border-amber-500/40 rounded-2xl p-4 shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-400/20 text-amber-300">
                24K PURE GOLD (99.9%)
              </span>
              <h2 className="text-2xl font-bold text-slate-50 mt-1">
                ₹{cityData.gold24k.toLocaleString('en-IN')}
              </h2>
              <p className="text-xs text-slate-400">per 10 grams (₹{(cityData.gold24k / 10).toLocaleString('en-IN')}/g)</p>
            </div>
            <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded ${
              cityData.gold24kDelta >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
            }`}>
              {cityData.gold24kDelta >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              <span>{cityData.gold24kDelta >= 0 ? `+₹${cityData.gold24kDelta}` : `-₹${Math.abs(cityData.gold24kDelta)}`}</span>
            </div>
          </div>
        </div>

        {/* 22K Rate Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-400/10 text-amber-400">
                22K JEWELLERY GOLD (91.6%)
              </span>
              <h2 className="text-2xl font-bold text-slate-50 mt-1">
                ₹{cityData.gold22k.toLocaleString('en-IN')}
              </h2>
              <p className="text-xs text-slate-400">per 10 grams (₹{(cityData.gold22k / 10).toLocaleString('en-IN')}/g)</p>
            </div>
            <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded ${
              cityData.gold22kDelta >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
            }`}>
              {cityData.gold22kDelta >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              <span>{cityData.gold22kDelta >= 0 ? `+₹${cityData.gold22kDelta}` : `-₹${Math.abs(cityData.gold22kDelta)}`}</span>
            </div>
          </div>
        </div>

        {/* Silver Rate Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-700/50 text-slate-300">
                SILVER (99.9%)
              </span>
              <h2 className="text-2xl font-bold text-slate-50 mt-1">
                ₹{cityData.silver1kg.toLocaleString('en-IN')}
              </h2>
              <p className="text-xs text-slate-400">per 1 kg (₹{(cityData.silver1kg / 100).toLocaleString('en-IN')} per 10g)</p>
            </div>
            <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded ${
              cityData.silver1kgDelta >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
            }`}>
              {cityData.silver1kgDelta >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              <span>{cityData.silver1kgDelta >= 0 ? `+₹${cityData.silver1kgDelta}` : `-₹${Math.abs(cityData.silver1kgDelta)}`}</span>
            </div>
          </div>
        </div>

        {/* Jewellery Price & GST Calculator */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            <Calculator className="w-5 h-5 text-amber-400" />
            <h3 className="font-semibold text-sm">Jewellery Bill Calculator</h3>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">Weight (grams)</label>
              <input 
                type="number"
                value={weight}
                onChange={(e) => setWeight(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white font-semibold focus:outline-none"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Purity</label>
              <select 
                value={selectedKarat}
                onChange={(e) => setSelectedKarat(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white font-semibold focus:outline-none"
              >
                <option value="24k">24K (99.9%)</option>
                <option value="22k">22K (91.6%)</option>
                <option value="18k">18K (75.0%)</option>
              </select>
            </div>
          </div>

          <div className="text-xs">
            <label className="text-slate-400 block mb-1">Making Charges (%)</label>
            <input 
              type="number"
              value={makingCharge}
              onChange={(e) => setMakingCharge(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white font-semibold focus:outline-none"
            />
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Gold Price:</span>
              <span>₹{Math.round(basePrice).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Making ({makingCharge}%):</span>
              <span>₹{Math.round(makingChargesAmount).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>GST (3%):</span>
              <span>₹{Math.round(gstAmount).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between font-bold text-amber-400 text-sm pt-2 border-t border-slate-800">
              <span>Total Bill:</span>
              <span>₹{Math.round(totalPayable).toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

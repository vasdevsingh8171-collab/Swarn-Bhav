import React, { useState, useEffect, useMemo } from 'react';
import { 
  TrendingUp, 
  MapPin, 
  Calculator, 
  RefreshCw, 
  Clock, 
  Search,
  X,
  Sparkles
} from 'lucide-react';

// Premium Custom Bullion Logo Component
const AppLogo = () => (
  <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-700 via-amber-500 to-yellow-300 p-0.5 shadow-[0_0_15px_rgba(245,158,11,0.35)]">
    <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-transparent to-transparent"></div>
      <svg 
        viewBox="0 0 32 32" 
        className="w-6 h-6 drop-shadow-[0_2px_4px_rgba(245,158,11,0.5)]" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Gold Bullion Bar Shape */}
        <path 
          d="M6 18L10 9H22L26 18L21 24H11L6 18Z" 
          fill="url(#goldGradient)" 
          stroke="#FCD34D" 
          strokeWidth="1.2"
        />
        {/* Inner facets */}
        <path d="M10 9L11 24" stroke="#78350F" strokeWidth="0.8" strokeOpacity="0.6" />
        <path d="M22 9L21 24" stroke="#78350F" strokeWidth="0.8" strokeOpacity="0.6" />
        <path d="M6 18H26" stroke="#FEF3C7" strokeWidth="0.8" strokeOpacity="0.8" />
        <circle cx="16" cy="14" r="2" fill="#FFFBEB" fillOpacity="0.9" />
        
        <defs>
          <linearGradient id="goldGradient" x1="6" y1="9" x2="26" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FDE68A" />
            <stop offset="0.3" stopColor="#F59E0B" />
            <stop offset="0.7" stopColor="#D97706" />
            <stop offset="1" stopColor="#B45309" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  </div>
);

// All Major Indian Cities
const ALL_INDIAN_CITIES = [
  // Uttar Pradesh
  { id: 'lucknow', name: 'Lucknow', state: 'Uttar Pradesh', factor: 1.002 },
  { id: 'kanpur', name: 'Kanpur', state: 'Uttar Pradesh', factor: 1.002 },
  { id: 'agra', name: 'Agra', state: 'Uttar Pradesh', factor: 1.002 },
  { id: 'varanasi', name: 'Varanasi', state: 'Uttar Pradesh', factor: 1.003 },
  { id: 'prayagraj', name: 'Prayagraj (Allahabad)', state: 'Uttar Pradesh', factor: 1.002 },
  { id: 'meerut', name: 'Meerut', state: 'Uttar Pradesh', factor: 1.001 },
  { id: 'noida', name: 'Noida / Greater Noida', state: 'Uttar Pradesh', factor: 1.001 },
  { id: 'gorakhpur', name: 'Gorakhpur', state: 'Uttar Pradesh', factor: 1.003 },
  { id: 'bareilly', name: 'Bareilly', state: 'Uttar Pradesh', factor: 1.002 },
  { id: 'aligarh', name: 'Aligarh', state: 'Uttar Pradesh', factor: 1.002 },

  // Delhi NCR
  { id: 'delhi', name: 'Delhi', state: 'Delhi NCR', factor: 1.001 },
  { id: 'gurugram', name: 'Gurugram (Gurgaon)', state: 'Haryana', factor: 1.001 },
  { id: 'faridabad', name: 'Faridabad', state: 'Haryana', factor: 1.001 },

  // Maharashtra
  { id: 'mumbai', name: 'Mumbai', state: 'Maharashtra', factor: 1.000 },
  { id: 'pune', name: 'Pune', state: 'Maharashtra', factor: 1.001 },
  { id: 'nagpur', name: 'Nagpur', state: 'Maharashtra', factor: 1.002 },
  { id: 'nashik', name: 'Nashik', state: 'Maharashtra', factor: 1.001 },
  { id: 'aurangabad', name: 'Chhatrapati Sambhajinagar', state: 'Maharashtra', factor: 1.002 },

  // Rajasthan
  { id: 'jaipur', name: 'Jaipur', state: 'Rajasthan', factor: 1.001 },
  { id: 'jodhpur', name: 'Jodhpur', state: 'Rajasthan', factor: 1.002 },
  { id: 'udaipur', name: 'Udaipur', state: 'Rajasthan', factor: 1.002 },
  { id: 'kota', name: 'Kota', state: 'Rajasthan', factor: 1.002 },
  { id: 'bikaner', name: 'Bikaner', state: 'Rajasthan', factor: 1.002 },

  // Gujarat
  { id: 'ahmedabad', name: 'Ahmedabad', state: 'Gujarat', factor: 1.001 },
  { id: 'surat', name: 'Surat', state: 'Gujarat', factor: 1.001 },
  { id: 'vadodara', name: 'Vadodara', state: 'Gujarat', factor: 1.001 },
  { id: 'rajkot', name: 'Rajkot', state: 'Gujarat', factor: 1.002 },

  // Madhya Pradesh
  { id: 'indore', name: 'Indore', state: 'Madhya Pradesh', factor: 1.002 },
  { id: 'bhopal', name: 'Bhopal', state: 'Madhya Pradesh', factor: 1.002 },
  { id: 'gwalior', name: 'Gwalior', state: 'Madhya Pradesh', factor: 1.002 },
  { id: 'jabalpur', name: 'Jabalpur', state: 'Madhya Pradesh', factor: 1.002 },

  // Bihar & Jharkhand
  { id: 'patna', name: 'Patna', state: 'Bihar', factor: 1.003 },
  { id: 'gaya', name: 'Gaya', state: 'Bihar', factor: 1.003 },
  { id: 'muzaffarpur', name: 'Muzaffarpur', state: 'Bihar', factor: 1.003 },
  { id: 'ranchi', name: 'Ranchi', state: 'Jharkhand', factor: 1.003 },
  { id: 'jamshedpur', name: 'Jamshedpur', state: 'Jharkhand', factor: 1.003 },

  // West Bengal & North East
  { id: 'kolkata', name: 'Kolkata', state: 'West Bengal', factor: 1.003 },
  { id: 'siliguri', name: 'Siliguri', state: 'West Bengal', factor: 1.004 },
  { id: 'guwahati', name: 'Guwahati', state: 'Assam', factor: 1.004 },

  // Punjab, Haryana & North
  { id: 'chandigarh', name: 'Chandigarh', state: 'Punjab/Haryana', factor: 1.001 },
  { id: 'ludhiana', name: 'Ludhiana', state: 'Punjab', factor: 1.002 },
  { id: 'amritsar', name: 'Amritsar', state: 'Punjab', factor: 1.002 },
  { id: 'dehradun', name: 'Dehradun', state: 'Uttarakhand', factor: 1.002 },
  { id: 'jammu', name: 'Jammu', state: 'Jammu & Kashmir', factor: 1.003 },

  // South India
  { id: 'bengaluru', name: 'Bengaluru', state: 'Karnataka', factor: 1.001 },
  { id: 'hyderabad', name: 'Hyderabad', state: 'Telangana', factor: 1.001 },
  { id: 'chennai', name: 'Chennai', state: 'Tamil Nadu', factor: 1.002 },
  { id: 'coimbatore', name: 'Coimbatore', state: 'Tamil Nadu', factor: 1.002 },
  { id: 'kochi', name: 'Kochi (Cochin)', state: 'Kerala', factor: 1.001 },
  { id: 'visakhapatnam', name: 'Visakhapatnam', state: 'Andhra Pradesh', factor: 1.002 },
  { id: 'bhubaneswar', name: 'Bhubaneswar', state: 'Odisha', factor: 1.003 },
  { id: 'raipur', name: 'Raipur', state: 'Chhattisgarh', factor: 1.003 }
];

export default function App() {
  const [selectedCity, setSelectedCity] = useState(ALL_INDIAN_CITIES[0]);
  const [goldPerGram, setGoldPerGram] = useState(7450);
  const [silverPerGram, setSilverPerGram] = useState(86);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('Syncing live rates...');

  // Modal State
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Calculator states
  const [weight, setWeight] = useState(10);
  const [selectedKarat, setSelectedKarat] = useState('22k');
  const [makingCharge, setMakingCharge] = useState(12);

  const fetchLiveRates = async () => {
    setLoading(true);
    setStatusMsg('Updating...');
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/XAU');
      const data = await res.json();
      
      if (data && data.rates && data.rates.INR) {
        const inrPerOz = data.rates.INR;
        const liveGoldGram = (inrPerOz / 31.1034768) * 1.15;
        
        setGoldPerGram(Math.round(liveGoldGram));
        setSilverPerGram(Math.round(liveGoldGram / 85));
        setStatusMsg('Live Rates Synced');
      } else {
        setStatusMsg('Market Rates Active');
      }
    } catch (err) {
      console.log('Error fetching live rates:', err);
      setStatusMsg('Market Rates Active');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveRates();
  }, []);

  const filteredCities = useMemo(() => {
    return ALL_INDIAN_CITIES.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.state.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const rate24k10g = Math.round(goldPerGram * 10 * selectedCity.factor);
  const rate22k10g = Math.round((rate24k10g * 22) / 24);
  const rate18k10g = Math.round((rate24k10g * 18) / 24);
  const silver1kg = Math.round(silverPerGram * 1000 * selectedCity.factor);

  const getSelectedGramRate = () => {
    if (selectedKarat === '24k') return rate24k10g / 10;
    if (selectedKarat === '22k') return rate22k10g / 10;
    return rate18k10g / 10;
  };

  const rawMetalCost = getSelectedGramRate() * (weight || 0);
  const makingChargesVal = (rawMetalCost * (makingCharge || 0)) / 100;
  const taxableVal = rawMetalCost + makingChargesVal;
  const gstVal = taxableVal * 0.03;
  const finalBill = taxableVal + gstVal;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 pb-12 font-sans select-none">
      {/* Header with Custom Logo */}
      <header className="max-w-md mx-auto flex items-center justify-between py-3 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <AppLogo />
          <div>
            <div className="flex items-center gap-1">
              <h1 className="text-lg font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500">
                स्वर्ण भाव
              </h1>
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
              <Clock className="w-3 h-3 text-amber-400" />
              <span>{statusMsg}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={fetchLiveRates}
            className={`p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-400/50 transition ${loading ? 'animate-spin text-amber-400' : 'text-slate-300'}`}
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setIsCityModalOpen(true)}
            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500/10 to-amber-600/20 border border-amber-500/40 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-amber-300 shadow-sm transition active:scale-95"
          >
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span className="truncate max-w-[80px]">{selectedCity.name}</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto mt-4 space-y-4">
        {/* Selected City Pill */}
        <div className="flex items-center justify-between bg-slate-900/60 border border-slate-800/80 px-3.5 py-2 rounded-xl text-xs text-slate-400">
          <span>Rates in: <strong className="text-amber-300 font-semibold">{selectedCity.name}</strong> ({selectedCity.state})</span>
          <button 
            onClick={() => setIsCityModalOpen(true)}
            className="text-amber-400 underline font-medium hover:text-amber-300 ml-2"
          >
            Change
          </button>
        </div>

        {/* 24K Pure Gold */}
        <div className="bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/40 rounded-2xl p-4 shadow-lg relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[11px] font-bold tracking-wider px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300 border border-amber-400/30">
                24K PURE GOLD (99.9%)
              </span>
              <h2 className="text-3xl font-extrabold text-slate-50 mt-2 tracking-tight">
                ₹{rate24k10g.toLocaleString('en-IN')}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">per 10 grams (₹{Math.round(rate24k10g / 10).toLocaleString('en-IN')}/g)</p>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>LIVE</span>
            </div>
          </div>
        </div>

        {/* 22K Jewellery Gold */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[11px] font-bold tracking-wider px-2 py-0.5 rounded-md bg-amber-400/10 text-amber-400 border border-amber-400/20">
                22K JEWELLERY GOLD (91.6%)
              </span>
              <h2 className="text-2xl font-bold text-slate-50 mt-1.5">
                ₹{rate22k10g.toLocaleString('en-IN')}
              </h2>
              <p className="text-xs text-slate-400">per 10 grams (₹{Math.round(rate22k10g / 10).toLocaleString('en-IN')}/g)</p>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>LIVE</span>
            </div>
          </div>
        </div>

        {/* 18K Gold */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[11px] font-bold tracking-wider px-2 py-0.5 rounded-md bg-yellow-400/10 text-yellow-300 border border-yellow-400/20">
                18K GOLD (75.0%)
              </span>
              <h2 className="text-2xl font-bold text-slate-50 mt-1.5">
                ₹{rate18k10g.toLocaleString('en-IN')}
              </h2>
              <p className="text-xs text-slate-400">per 10 grams (₹{Math.round(rate18k10g / 10).toLocaleString('en-IN')}/g)</p>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg bg-slate-800 text-slate-400">
              <span>LIVE</span>
            </div>
          </div>
        </div>

        {/* Silver */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[11px] font-bold tracking-wider px-2 py-0.5 rounded-md bg-slate-700/50 text-slate-300 border border-slate-600/30">
                SILVER (99.9%)
              </span>
              <h2 className="text-2xl font-bold text-slate-50 mt-1.5">
                ₹{silver1kg.toLocaleString('en-IN')}
              </h2>
              <p className="text-xs text-slate-400">per 1 kg (₹{Math.round(silver1kg / 100).toLocaleString('en-IN')} per 10g)</p>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg bg-slate-800 text-slate-400">
              <span>LIVE</span>
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
              <span>₹{Math.round(rawMetalCost).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Making ({makingCharge}%):</span>
              <span>₹{Math.round(makingChargesVal).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>GST (3%):</span>
              <span>₹{Math.round(gstVal).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between font-bold text-amber-400 text-sm pt-2 border-t border-slate-800">
              <span>Total Bill:</span>
              <span>₹{Math.round(finalBill).toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </main>

      {/* City Search Modal Popup */}
      {isCityModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col justify-end sm:justify-center p-0 sm:p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-2xl max-w-md w-full mx-auto max-h-[85vh] flex flex-col overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-amber-400">Select City</h3>
                <p className="text-xs text-slate-400">All Major Indian Cities</p>
              </div>
              <button 
                onClick={() => setIsCityModalOpen(false)}
                className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input Bar */}
            <div className="p-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2">
                <Search className="w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search city or state..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-sm w-full focus:outline-none text-slate-200"
                />
              </div>
            </div>

            {/* City List */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-800/50 p-2">
              {filteredCities.length > 0 ? (
                filteredCities.map(city => (
                  <button
                    key={city.id}
                    onClick={() => {
                      setSelectedCity(city);
                      setIsCityModalOpen(false);
                      setSearchQuery('');
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition ${
                      selectedCity.id === city.id ? 'bg-amber-400/10 text-amber-300 font-bold' : 'hover:bg-slate-800/60 text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="text-sm">{city.name}</div>
                      <div className="text-[11px] text-slate-500">{city.state}</div>
                    </div>
                    {selectedCity.id === city.id && (
                      <span className="text-xs px-2 py-0.5 rounded bg-amber-400/20 text-amber-300">Selected</span>
                    )}
                  </button>
                ))
              ) : (
                <div className="text-center py-8 text-sm text-slate-500">
                  No city found for "{searchQuery}"
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
      {/* Main ke theek neeche aur aakhri div se pehle yeh footer paste karein */}
      <footer className="max-w-md mx-auto text-center py-6 text-xs text-slate-500 border-t border-slate-900 mt-6">
        <p className="font-semibold text-amber-400">स्वर्ण भाव (Swarn Bhav)</p>
        <p className="mt-1 text-slate-400">
          Designed & Developed by <span className="text-amber-300 font-bold">Vasdev Singh</span>
        </p>
        <p className="text-[10px] text-slate-600 mt-1">Daily Live Bullion Rates • India</p>
      </footer>
    </div>
  );
}


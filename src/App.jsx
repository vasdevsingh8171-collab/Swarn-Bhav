import React, { useState, useEffect, useMemo } from 'react';
import { 
  TrendingUp, 
  MapPin, 
  Calculator, 
  RefreshCw, 
  Clock, 
  Search,
  X
} from 'lucide-react';

// All Major Indian Cities with Local Market Premia
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
  { id: 'hyderabad', name: 'Hyderabad', state: '

/**
 * MandiMitra Initial Seed Data
 * Contains realistic baseline data for Indian agricultural markets.
 * Primary focus: West Bengal (Durgapur, Burdwan, Bankura, Asansol, Birbhum, Hooghly, Nadia)
 * Additional regions: Bihar, Uttar Pradesh, Maharashtra, Punjab.
 */

export const initialCrops = [
  {
    id: 'crop-potato',
    name: 'Potato',
    hindiName: 'आलू',
    bengaliName: 'আলু',
    category: 'Vegetables',
    unit: 'Quintal',
    icon: '🥔',
    basePrice: 2400,
    msp: null,
    perishability: 'Medium (30-60 days with cold storage)',
    season: 'Rabi / Winter',
    active: true
  },
  {
    id: 'crop-rice',
    name: 'Rice (Paddy)',
    hindiName: 'धान / चावल',
    bengaliName: 'ধান / চাল',
    category: 'Grains',
    unit: 'Quintal',
    icon: '🌾',
    basePrice: 3200,
    msp: 2300,
    perishability: 'Low (6-12 months)',
    season: 'Kharif / Monsoon',
    active: true
  },
  {
    id: 'crop-onion',
    name: 'Onion',
    hindiName: 'प्याज',
    bengaliName: 'পেঁয়াজ',
    category: 'Vegetables',
    unit: 'Quintal',
    icon: '🧅',
    basePrice: 2800,
    msp: null,
    perishability: 'Medium (20-40 days)',
    season: 'Rabi & Kharif',
    active: true
  },
  {
    id: 'crop-tomato',
    name: 'Tomato',
    hindiName: 'टमाटर',
    bengaliName: 'টমেটো',
    category: 'Vegetables',
    unit: 'Quintal',
    icon: '🍅',
    basePrice: 2350,
    msp: null,
    perishability: 'High (3-7 days)',
    season: 'Year-round',
    active: true
  },
  {
    id: 'crop-brinjal',
    name: 'Brinjal (Eggplant)',
    hindiName: 'बैंगन',
    bengaliName: 'বেগুন',
    category: 'Vegetables',
    unit: 'Quintal',
    icon: '🍆',
    basePrice: 2050,
    msp: null,
    perishability: 'High (4-8 days)',
    season: 'Year-round',
    active: true
  },
  {
    id: 'crop-cabbage',
    name: 'Cabbage',
    hindiName: 'पत्तागोभी',
    bengaliName: 'বাঁধাকপি',
    category: 'Vegetables',
    unit: 'Quintal',
    icon: '🥬',
    basePrice: 1650,
    msp: null,
    perishability: 'Medium (10-15 days)',
    season: 'Winter',
    active: true
  },
  {
    id: 'crop-cauliflower',
    name: 'Cauliflower',
    hindiName: 'फूलगोभी',
    bengaliName: 'ফুলকপি',
    category: 'Vegetables',
    unit: 'Quintal',
    icon: '🥦',
    basePrice: 1900,
    msp: null,
    perishability: 'High (5-10 days)',
    season: 'Winter',
    active: true
  },
  {
    id: 'crop-wheat',
    name: 'Wheat',
    hindiName: 'गेहूं',
    bengaliName: 'গম',
    category: 'Grains',
    unit: 'Quintal',
    icon: '🌾',
    basePrice: 2420,
    msp: 2275,
    perishability: 'Low (12+ months)',
    season: 'Rabi',
    active: true
  },
  {
    id: 'crop-maize',
    name: 'Maize (Corn)',
    hindiName: 'मक्का',
    bengaliName: 'ভুট্টা',
    category: 'Grains',
    unit: 'Quintal',
    icon: '🌽',
    basePrice: 2150,
    msp: 2090,
    perishability: 'Low (6-9 months)',
    season: 'Kharif',
    active: true
  },
  {
    id: 'crop-mustard',
    name: 'Mustard',
    hindiName: 'सरसों',
    bengaliName: 'সরিষা',
    category: 'Oilseeds',
    unit: 'Quintal',
    icon: '🟡',
    basePrice: 5450,
    msp: 5650,
    perishability: 'Low (12 months)',
    season: 'Rabi',
    active: true
  },
  {
    id: 'crop-jute',
    name: 'Jute',
    hindiName: 'जूट / पटसन',
    bengaliName: 'পাট',
    category: 'Cash Crops',
    unit: 'Quintal',
    icon: '🧵',
    basePrice: 5350,
    msp: 5050,
    perishability: 'Low (12 months)',
    season: 'Monsoon',
    active: true
  }
];

export const initialMarkets = [
  {
    id: 'mandi-durgapur',
    name: 'Durgapur Mandi',
    state: 'West Bengal',
    district: 'Paschim Bardhaman',
    address: 'City Centre Market Yard, Durgapur, PIN 713216',
    latitude: 23.5204,
    longitude: 87.3119,
    marketType: 'APMC Regulated Market',
    operatingHours: '04:00 AM - 02:00 PM',
    facilities: ['Electronic Weighbridge', 'Cold Storage (500 MT)', 'Auction Shed'],
    contactPhone: '+91 343 254 8812',
    active: true
  },
  {
    id: 'mandi-burdwan',
    name: 'Burdwan Mandi',
    state: 'West Bengal',
    district: 'Purba Bardhaman',
    address: 'Krishak Bazar, Nababhat, Bardhaman, PIN 713101',
    latitude: 23.2324,
    longitude: 87.8615,
    marketType: 'Principal Market Yard',
    operatingHours: '03:30 AM - 04:00 PM',
    facilities: ['Agri-Testing Lab', 'Warehouse (2000 MT)', 'Banking Terminal', 'Weighbridge'],
    contactPhone: '+91 342 266 1930',
    active: true
  },
  {
    id: 'mandi-bankura',
    name: 'Bankura Mandi',
    state: 'West Bengal',
    district: 'Bankura',
    address: 'Kapasaria Market Complex, Bankura, PIN 722101',
    latitude: 23.2319,
    longitude: 87.0784,
    marketType: 'APMC Sub-Yard',
    operatingHours: '05:00 AM - 01:00 PM',
    facilities: ['Auction Hall', 'Farmer Rest Shed', 'Cold Storage (1200 MT)'],
    contactPhone: '+91 3242 250 441',
    active: true
  },
  {
    id: 'mandi-asansol',
    name: 'Asansol Mandi',
    state: 'West Bengal',
    district: 'Paschim Bardhaman',
    address: 'Burnpur Road Sub-Market Yard, Asansol, PIN 713325',
    latitude: 23.6889,
    longitude: 86.9661,
    marketType: 'APMC Regulated Market',
    operatingHours: '04:00 AM - 12:30 PM',
    facilities: ['Electronic Weighing', 'Loading Bay', 'Trader Stalls'],
    contactPhone: '+91 341 228 1410',
    active: true
  },
  {
    id: 'mandi-birbhum',
    name: 'Suri (Birbhum) Mandi',
    state: 'West Bengal',
    district: 'Birbhum',
    address: 'Suri Kishan Mandi, Sainthia Road, PIN 731101',
    latitude: 23.9056,
    longitude: 87.5246,
    marketType: 'APMC Regulated Market',
    operatingHours: '05:00 AM - 02:00 PM',
    facilities: ['Grain Grading Unit', 'Auction Platforms', 'Weighbridge'],
    contactPhone: '+91 3462 255 120',
    active: true
  },
  {
    id: 'mandi-kalna',
    name: 'Kalna (Hooghly) Mandi',
    state: 'West Bengal',
    district: 'Hooghly',
    address: 'Kalna APMC Yard, GT Road Link, PIN 713409',
    latitude: 23.2194,
    longitude: 88.3683,
    marketType: 'Sub-Market Yard',
    operatingHours: '04:00 AM - 03:00 PM',
    facilities: ['Direct River Transport Access', 'Cold Store', 'Wholesale Stalls'],
    contactPhone: '+91 3454 252 090',
    active: true
  },
  {
    id: 'mandi-ranaghat',
    name: 'Ranaghat (Nadia) Mandi',
    state: 'West Bengal',
    district: 'Nadia',
    address: 'Ranaghat Agricultural Market, Station Rd, PIN 741201',
    latitude: 23.1804,
    longitude: 88.5804,
    marketType: 'Principal Yard',
    operatingHours: '03:00 AM - 01:00 PM',
    facilities: ['Rail Cargo Siding', 'Cold Rooms', 'Weighbridge'],
    contactPhone: '+91 3473 210 500',
    active: true
  },
  {
    id: 'mandi-patna',
    name: 'Patna Bazaar Samiti Mandi',
    state: 'Bihar',
    district: 'Patna',
    address: 'Musallahpur Bazar Samiti, Patna, PIN 800006',
    latitude: 25.5941,
    longitude: 85.1376,
    marketType: 'Wholesale Agri Hub',
    operatingHours: '03:00 AM - 06:00 PM',
    facilities: ['Interstate Transport Bay', 'Agri Testing Lab', 'Cold Chain'],
    contactPhone: '+91 612 268 7721',
    active: true
  },
  {
    id: 'mandi-varanasi',
    name: 'Varanasi Pahariya Mandi',
    state: 'Uttar Pradesh',
    district: 'Varanasi',
    address: 'Pahariya Mandi Complex, Varanasi, PIN 221007',
    latitude: 25.3176,
    longitude: 82.9739,
    marketType: 'Special e-NAM Mandi',
    operatingHours: '04:00 AM - 04:00 PM',
    facilities: ['e-NAM Online Bidding', 'Assay Lab', 'Cold Storage (3000 MT)'],
    contactPhone: '+91 542 258 3310',
    active: true
  },
  {
    id: 'mandi-nashik',
    name: 'Lasalgaon Onion Mandi',
    state: 'Maharashtra',
    district: 'Nashik',
    address: 'Lasalgaon APMC, Niphad Taluka, Nashik, PIN 422306',
    latitude: 20.1478,
    longitude: 74.2269,
    marketType: 'National Onion Trading Hub',
    operatingHours: '06:00 AM - 05:00 PM',
    facilities: ['e-NAM Platform', 'Ventilated Onion Godowns', 'Export Logistics'],
    contactPhone: '+91 2550 266 225',
    active: true
  },
  {
    id: 'mandi-khanna',
    name: 'Khanna Grain Mandi',
    state: 'Punjab',
    district: 'Ludhiana',
    address: 'GT Road Asia Mandi Yard, Khanna, PIN 141401',
    latitude: 30.7071,
    longitude: 76.2166,
    marketType: "Asia's Largest Grain Market",
    operatingHours: '05:00 AM - 07:00 PM',
    facilities: ['Mechanized Cleaning & Bagging', 'Rail Head', 'Silo Storage'],
    contactPhone: '+91 1628 227 001',
    active: true
  }
];

export const initialPrices = [
  // Potato in West Bengal Mandis (Matches exact user numbers!)
  {
    id: 'price-pot-durgapur',
    cropId: 'crop-potato',
    marketId: 'mandi-durgapur',
    minimumPrice: 2200,
    maximumPrice: 2500,
    modalPrice: 2400,
    unit: 'Quintal',
    arrivals: '450 Quintals',
    trend: 'up', // ↑
    previousModalPrice: 2350,
    date: '2026-10-06',
    updatedAt: 'Today, 10:30 AM',
    source: 'West Bengal Agri Marketing Dept / Demo Feed',
    isDemo: true
  },
  {
    id: 'price-pot-burdwan',
    cropId: 'crop-potato',
    marketId: 'mandi-burdwan',
    minimumPrice: 2450,
    maximumPrice: 2700,
    modalPrice: 2650,
    unit: 'Quintal',
    arrivals: '820 Quintals',
    trend: 'up', // ↑
    previousModalPrice: 2580,
    date: '2026-10-06',
    updatedAt: 'Today, 10:15 AM',
    source: 'West Bengal Agri Marketing Dept / Demo Feed',
    isDemo: true
  },
  {
    id: 'price-pot-bankura',
    cropId: 'crop-potato',
    marketId: 'mandi-bankura',
    minimumPrice: 2600,
    maximumPrice: 2900,
    modalPrice: 2780, // Best price!
    unit: 'Quintal',
    arrivals: '340 Quintals',
    trend: 'up', // ↑
    previousModalPrice: 2600,
    date: '2026-10-06',
    updatedAt: 'Today, 10:45 AM',
    source: 'West Bengal Agri Marketing Dept / Demo Feed',
    isDemo: true
  },
  {
    id: 'price-pot-asansol',
    cropId: 'crop-potato',
    marketId: 'mandi-asansol',
    minimumPrice: 2300,
    maximumPrice: 2600,
    modalPrice: 2520,
    unit: 'Quintal',
    arrivals: '290 Quintals',
    trend: 'down', // ↓
    previousModalPrice: 2570,
    date: '2026-10-06',
    updatedAt: 'Today, 09:50 AM',
    source: 'West Bengal Agri Marketing Dept / Demo Feed',
    isDemo: true
  },
  {
    id: 'price-pot-birbhum',
    cropId: 'crop-potato',
    marketId: 'mandi-birbhum',
    minimumPrice: 2380,
    maximumPrice: 2640,
    modalPrice: 2510,
    unit: 'Quintal',
    arrivals: '210 Quintals',
    trend: 'stable',
    previousModalPrice: 2510,
    date: '2026-10-06',
    updatedAt: 'Today, 08:30 AM',
    source: 'West Bengal Agri Marketing Dept / Demo Feed',
    isDemo: true
  },
  {
    id: 'price-pot-kalna',
    cropId: 'crop-potato',
    marketId: 'mandi-kalna',
    minimumPrice: 2500,
    maximumPrice: 2750,
    modalPrice: 2680,
    unit: 'Quintal',
    arrivals: '600 Quintals',
    trend: 'up',
    previousModalPrice: 2620,
    date: '2026-10-06',
    updatedAt: 'Today, 09:10 AM',
    source: 'West Bengal Agri Marketing Dept / Demo Feed',
    isDemo: true
  },

  // Rice (Paddy) in West Bengal
  {
    id: 'price-rice-burdwan',
    cropId: 'crop-rice',
    marketId: 'mandi-burdwan',
    minimumPrice: 3100,
    maximumPrice: 3400,
    modalPrice: 3250, // Best price for rice!
    unit: 'Quintal',
    arrivals: '1400 Quintals',
    trend: 'up',
    previousModalPrice: 3180,
    date: '2026-10-06',
    updatedAt: 'Today, 10:15 AM',
    source: 'Burdwan Paddy Board / Demo Feed',
    isDemo: true
  },
  {
    id: 'price-rice-durgapur',
    cropId: 'crop-rice',
    marketId: 'mandi-durgapur',
    minimumPrice: 2950,
    maximumPrice: 3200,
    modalPrice: 3080,
    unit: 'Quintal',
    arrivals: '680 Quintals',
    trend: 'stable',
    previousModalPrice: 3080,
    date: '2026-10-06',
    updatedAt: 'Today, 10:30 AM',
    source: 'APMC Durgapur / Demo Feed',
    isDemo: true
  },
  {
    id: 'price-rice-bankura',
    cropId: 'crop-rice',
    marketId: 'mandi-bankura',
    minimumPrice: 3000,
    maximumPrice: 3280,
    modalPrice: 3140,
    unit: 'Quintal',
    arrivals: '510 Quintals',
    trend: 'up',
    previousModalPrice: 3090,
    date: '2026-10-06',
    updatedAt: 'Today, 10:45 AM',
    source: 'Bankura Agri Board / Demo Feed',
    isDemo: true
  },
  {
    id: 'price-rice-asansol',
    cropId: 'crop-rice',
    marketId: 'mandi-asansol',
    minimumPrice: 2900,
    maximumPrice: 3150,
    modalPrice: 3020,
    unit: 'Quintal',
    arrivals: '350 Quintals',
    trend: 'down',
    previousModalPrice: 3060,
    date: '2026-10-06',
    updatedAt: 'Today, 09:50 AM',
    source: 'Asansol Yard / Demo Feed',
    isDemo: true
  },

  // Onion in West Bengal
  {
    id: 'price-onion-durgapur',
    cropId: 'crop-onion',
    marketId: 'mandi-durgapur',
    minimumPrice: 2750,
    maximumPrice: 3050,
    modalPrice: 2900, // Best nearby onion price!
    unit: 'Quintal',
    arrivals: '310 Quintals',
    trend: 'up',
    previousModalPrice: 2820,
    date: '2026-10-06',
    updatedAt: 'Today, 10:30 AM',
    source: 'Durgapur APMC / Demo Feed',
    isDemo: true
  },
  {
    id: 'price-onion-burdwan',
    cropId: 'crop-onion',
    marketId: 'mandi-burdwan',
    minimumPrice: 2600,
    maximumPrice: 2900,
    modalPrice: 2750,
    unit: 'Quintal',
    arrivals: '540 Quintals',
    trend: 'down',
    previousModalPrice: 2800,
    date: '2026-10-06',
    updatedAt: 'Today, 10:15 AM',
    source: 'Burdwan Yard / Demo Feed',
    isDemo: true
  },
  {
    id: 'price-onion-bankura',
    cropId: 'crop-onion',
    marketId: 'mandi-bankura',
    minimumPrice: 2650,
    maximumPrice: 2920,
    modalPrice: 2810,
    unit: 'Quintal',
    arrivals: '220 Quintals',
    trend: 'stable',
    previousModalPrice: 2810,
    date: '2026-10-06',
    updatedAt: 'Today, 10:45 AM',
    source: 'Bankura Yard / Demo Feed',
    isDemo: true
  },

  // Tomato in West Bengal
  {
    id: 'price-tomato-durgapur',
    cropId: 'crop-tomato',
    marketId: 'mandi-durgapur',
    minimumPrice: 2100,
    maximumPrice: 2400,
    modalPrice: 2280,
    unit: 'Quintal',
    arrivals: '240 Quintals',
    trend: 'up',
    previousModalPrice: 2190,
    date: '2026-10-06',
    updatedAt: 'Today, 10:30 AM',
    source: 'Durgapur APMC / Demo Feed',
    isDemo: true
  },
  {
    id: 'price-tomato-bankura',
    cropId: 'crop-tomato',
    marketId: 'mandi-bankura',
    minimumPrice: 2250,
    maximumPrice: 2550,
    modalPrice: 2400,
    unit: 'Quintal',
    arrivals: '190 Quintals',
    trend: 'up',
    previousModalPrice: 2320,
    date: '2026-10-06',
    updatedAt: 'Today, 10:45 AM',
    source: 'Bankura APMC / Demo Feed',
    isDemo: true
  },

  // Mustard
  {
    id: 'price-mustard-burdwan',
    cropId: 'crop-mustard',
    marketId: 'mandi-burdwan',
    minimumPrice: 5300,
    maximumPrice: 5750,
    modalPrice: 5600,
    unit: 'Quintal',
    arrivals: '480 Quintals',
    trend: 'up',
    previousModalPrice: 5520,
    date: '2026-10-06',
    updatedAt: 'Today, 10:15 AM',
    source: 'Burdwan Agri Market / Demo Feed',
    isDemo: true
  },
  {
    id: 'price-mustard-durgapur',
    cropId: 'crop-mustard',
    marketId: 'mandi-durgapur',
    minimumPrice: 5200,
    maximumPrice: 5600,
    modalPrice: 5450,
    unit: 'Quintal',
    arrivals: '180 Quintals',
    trend: 'stable',
    previousModalPrice: 5450,
    date: '2026-10-06',
    updatedAt: 'Today, 10:30 AM',
    source: 'Durgapur APMC / Demo Feed',
    isDemo: true
  },

  // Jute
  {
    id: 'price-jute-kalna',
    cropId: 'crop-jute',
    marketId: 'mandi-kalna',
    minimumPrice: 5200,
    maximumPrice: 5700,
    modalPrice: 5500,
    unit: 'Quintal',
    arrivals: '950 Quintals',
    trend: 'up',
    previousModalPrice: 5400,
    date: '2026-10-06',
    updatedAt: 'Today, 09:10 AM',
    source: 'Jute Corporation / Demo Feed',
    isDemo: true
  },
  {
    id: 'price-jute-ranaghat',
    cropId: 'crop-jute',
    marketId: 'mandi-ranaghat',
    minimumPrice: 5100,
    maximumPrice: 5550,
    modalPrice: 5380,
    unit: 'Quintal',
    arrivals: '720 Quintals',
    trend: 'stable',
    previousModalPrice: 5380,
    date: '2026-10-06',
    updatedAt: 'Today, 09:00 AM',
    source: 'Nadia Yard / Demo Feed',
    isDemo: true
  }
];

// Historical Price Trends (Potato, Rice, Onion, Tomato) matching prompt
export const initialPriceTrends = {
  'crop-potato': {
    'mandi-bankura': [
      { date: 'Oct 1', price: 2350, arrivals: 420 },
      { date: 'Oct 2', price: 2390, arrivals: 410 },
      { date: 'Oct 3', price: 2410, arrivals: 390 },
      { date: 'Oct 4', price: 2450, arrivals: 370 },
      { date: 'Oct 5', price: 2600, arrivals: 350 },
      { date: 'Oct 6', price: 2780, arrivals: 340 }
    ],
    'mandi-burdwan': [
      { date: 'Oct 1', price: 2320, arrivals: 780 },
      { date: 'Oct 2', price: 2360, arrivals: 810 },
      { date: 'Oct 3', price: 2390, arrivals: 800 },
      { date: 'Oct 4', price: 2430, arrivals: 820 },
      { date: 'Oct 5', price: 2580, arrivals: 840 },
      { date: 'Oct 6', price: 2650, arrivals: 820 }
    ],
    'mandi-durgapur': [
      { date: 'Oct 1', price: 2280, arrivals: 440 },
      { date: 'Oct 2', price: 2300, arrivals: 460 },
      { date: 'Oct 3', price: 2320, arrivals: 450 },
      { date: 'Oct 4', price: 2350, arrivals: 470 },
      { date: 'Oct 5', price: 2380, arrivals: 460 },
      { date: 'Oct 6', price: 2400, arrivals: 450 }
    ],
    'mandi-asansol': [
      { date: 'Oct 1', price: 2400, arrivals: 280 },
      { date: 'Oct 2', price: 2450, arrivals: 290 },
      { date: 'Oct 3', price: 2500, arrivals: 310 },
      { date: 'Oct 4', price: 2550, arrivals: 300 },
      { date: 'Oct 5', price: 2570, arrivals: 320 },
      { date: 'Oct 6', price: 2520, arrivals: 290 }
    ]
  },
  'crop-rice': {
    'mandi-burdwan': [
      { date: 'Oct 1', price: 3050, arrivals: 1200 },
      { date: 'Oct 2', price: 3080, arrivals: 1250 },
      { date: 'Oct 3', price: 3120, arrivals: 1300 },
      { date: 'Oct 4', price: 3150, arrivals: 1340 },
      { date: 'Oct 5', price: 3180, arrivals: 1380 },
      { date: 'Oct 6', price: 3250, arrivals: 1400 }
    ],
    'mandi-durgapur': [
      { date: 'Oct 1', price: 2980, arrivals: 620 },
      { date: 'Oct 2', price: 3000, arrivals: 640 },
      { date: 'Oct 3', price: 3020, arrivals: 650 },
      { date: 'Oct 4', price: 3050, arrivals: 670 },
      { date: 'Oct 5', price: 3080, arrivals: 660 },
      { date: 'Oct 6', price: 3080, arrivals: 680 }
    ]
  },
  'crop-onion': {
    'mandi-durgapur': [
      { date: 'Oct 1', price: 2650, arrivals: 280 },
      { date: 'Oct 2', price: 2700, arrivals: 290 },
      { date: 'Oct 3', price: 2740, arrivals: 310 },
      { date: 'Oct 4', price: 2780, arrivals: 300 },
      { date: 'Oct 5', price: 2820, arrivals: 310 },
      { date: 'Oct 6', price: 2900, arrivals: 310 }
    ]
  }
};

export const initialUsers = [
  {
    id: 'user-rahul',
    name: 'Rahul Mondal',
    phone: '9876543210',
    email: 'rahul.farmer@gmail.com',
    role: 'farmer',
    state: 'West Bengal',
    district: 'Paschim Bardhaman',
    village: 'Gopalpur, Durgapur',
    latitude: 23.5204,
    longitude: 87.3119,
    preferredLanguage: 'en',
    mainCrops: ['crop-potato', 'crop-rice', 'crop-onion'],
    approxQuantity: '100 Quintals',
    favoriteMarkets: ['mandi-bankura', 'mandi-burdwan', 'mandi-durgapur'],
    createdAt: '2026-09-15T08:00:00.000Z'
  },
  {
    id: 'user-admin',
    name: 'MandiMitra Admin',
    phone: '9999999999',
    email: 'admin@mandimitra.in',
    role: 'admin',
    state: 'West Bengal',
    district: 'Kolkata',
    village: 'Salt Lake Sector V',
    latitude: 22.5726,
    longitude: 88.3639,
    preferredLanguage: 'en',
    mainCrops: [],
    approxQuantity: '',
    favoriteMarkets: [],
    createdAt: '2026-09-01T00:00:00.000Z'
  }
];

export const initialAlerts = [
  {
    id: 'alert-1',
    userId: 'user-rahul',
    cropId: 'crop-potato',
    cropName: 'Potato',
    marketId: 'mandi-bankura',
    marketName: 'Bankura Mandi',
    targetPrice: 2700,
    condition: 'above',
    status: 'triggered',
    currentPrice: 2780,
    message: '🎉 Bankura Mandi reached ₹2,780/q, exceeding your target of ₹2,700/q!',
    createdAt: '2026-10-04T09:00:00.000Z',
    triggeredAt: '2026-10-06T10:45:00.000Z'
  },
  {
    id: 'alert-2',
    userId: 'user-rahul',
    cropId: 'crop-rice',
    cropName: 'Rice (Paddy)',
    marketId: 'mandi-burdwan',
    marketName: 'Burdwan Mandi',
    targetPrice: 2800,
    condition: 'below',
    status: 'active',
    currentPrice: 3250,
    message: 'Active monitoring: Rice price currently ₹3,250/q in Burdwan.',
    createdAt: '2026-10-05T14:30:00.000Z',
    triggeredAt: null
  }
];

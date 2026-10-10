export type Language = 'en' | 'hi' | 'bn';

export interface Translations {
  appName: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  btnCheckPrices: string;
  btnExploreMandis: string;
  greetingFarmer: string;
  yourLocation: string;
  changeLocation: string;
  bestMarketNearYou: string;
  todaysHighlights: string;
  searchCropPlaceholder: string;
  allCrops: string;
  todayMainPrice: string;
  minPrice: string;
  maxPrice: string;
  trend: string;
  distance: string;
  compareButton: string;
  calculateNetProfit: string;
  recommendedMarket: string;
  estimatedAdditionalEarning: string;
  transportEstimateDisclaimer: string;
  demoDataDisclaimer: string;
  liveBadge: string;
  updatedToday: string;
  navHome: string;
  navPrices: string;
  navCompare: string;
  navBestMarket: string;
  navNearbyMap: string;
  navTrends: string;
  navMyCrops: string;
  navAlerts: string;
  navAiSaathi: string;
  navAdmin: string;
  navAbout: string;
  navHowItWorks: string;
  navLogin: string;
  navRegister: string;
  crops: {
    potato: string;
    rice: string;
    onion: string;
    tomato: string;
    brinjal: string;
    cabbage: string;
    cauliflower: string;
    wheat: string;
    maize: string;
    mustard: string;
    jute: string;
  };
  units: {
    quintal: string;
    km: string;
    rupeePerQuintal: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: 'MandiMitra',
    tagline: 'Know the Price. Choose the Market. Earn Better.',
    heroHeadline: "Know Today's Mandi Price Before You Sell.",
    heroSubheadline: 'MandiMitra helps farmers compare crop prices across nearby markets so they can make smarter selling decisions.',
    btnCheckPrices: "Check Today's Prices",
    btnExploreMandis: 'Explore Nearby Mandis',
    greetingFarmer: 'Namaste, Rahul',
    yourLocation: 'Your Location',
    changeLocation: 'Change',
    bestMarketNearYou: 'Best Market Near You',
    todaysHighlights: "Today's Highlights",
    searchCropPlaceholder: 'Search your crop (Potato, Rice, Onion, Tomato...)...',
    allCrops: 'All Crops',
    todayMainPrice: "Today's Main Price",
    minPrice: 'Min Price',
    maxPrice: 'Max Price',
    trend: 'Trend',
    distance: 'Distance',
    compareButton: 'Compare Markets',
    calculateNetProfit: 'Calculate Net Profit',
    recommendedMarket: 'Recommended Market',
    estimatedAdditionalEarning: 'Estimated Additional Earning',
    transportEstimateDisclaimer: 'Transportation costs are realistic estimates. Actual costs and spot auction prices may vary.',
    demoDataDisclaimer: 'Demo data — not for real trading decisions.',
    liveBadge: 'LIVE FEED',
    updatedToday: 'Updated Today, 10:30 AM',
    navHome: 'Home',
    navPrices: 'Market Prices',
    navCompare: 'Compare Mandis',
    navBestMarket: 'Best Market For Me',
    navNearbyMap: 'Nearby Mandis Map',
    navTrends: 'Price Trends',
    navMyCrops: 'My Crops',
    navAlerts: 'Price Alerts',
    navAiSaathi: 'AI Saathi',
    navAdmin: 'Admin Dashboard',
    navAbout: 'About MandiMitra',
    navHowItWorks: 'How It Works',
    navLogin: 'Login',
    navRegister: 'Register as Farmer',
    crops: {
      potato: 'Potato',
      rice: 'Rice (Paddy)',
      onion: 'Onion',
      tomato: 'Tomato',
      brinjal: 'Brinjal',
      cabbage: 'Cabbage',
      cauliflower: 'Cauliflower',
      wheat: 'Wheat',
      maize: 'Maize',
      mustard: 'Mustard',
      jute: 'Jute'
    },
    units: {
      quintal: 'quintal',
      km: 'km',
      rupeePerQuintal: '₹/quintal'
    }
  },

  hi: {
    appName: 'मंडीमित्र',
    tagline: 'भाव जानो। मंडी चुनो। बेहतर कमाओ।',
    heroHeadline: 'फसल बेचने से पहले आज का मंडी भाव जानें।',
    heroSubheadline: 'मंडीमित्र किसानों को पास की सभी मंडियों के भावों की तुलना करने में मदद करता है ताकि वे सही मंडी चुनकर ज्यादा मुनाफा कमा सकें।',
    btnCheckPrices: 'आज का भाव देखें',
    btnExploreMandis: 'आस-पास की मंडियां देखें',
    greetingFarmer: 'नमस्ते, राहुल जी',
    yourLocation: 'आपका स्थान',
    changeLocation: 'बदलें',
    bestMarketNearYou: 'आपके लिए सर्वोत्तम मंडी',
    todaysHighlights: 'आज के मुख्य भाव',
    searchCropPlaceholder: 'अपनी फसल खोजें (आलू, धान, प्याज, टमाटर...)...',
    allCrops: 'सभी फसलें',
    todayMainPrice: 'आज का मुख्य भाव (मॉडल भाव)',
    minPrice: 'न्यूनतम भाव',
    maxPrice: 'अधिकतम भाव',
    trend: 'रुझान',
    distance: 'दूरी',
    compareButton: 'मंडियों की तुलना करें',
    calculateNetProfit: 'शुद्ध मुनाफे की गणना करें',
    recommendedMarket: 'सुझाई गई सर्वोत्तम मंडी',
    estimatedAdditionalEarning: 'अनुमानित अतिरिक्त कमाई',
    transportEstimateDisclaimer: 'परिवहन लागत अनुमानित है। वास्तविक किराया और मंडी की बोली भिन्न हो सकती है।',
    demoDataDisclaimer: 'डेमो डेटा — वास्तविक व्यापारिक निर्णयों के लिए नहीं।',
    liveBadge: 'लाइव अपडेट',
    updatedToday: 'आज अपडेट: सुबह 10:30 बजे',
    navHome: 'होम',
    navPrices: 'मंडी भाव',
    navCompare: 'मंडी तुलना',
    navBestMarket: 'मेरे लिए बेस्ट मंडी',
    navNearbyMap: 'मंडी नक्शा (मैप)',
    navTrends: 'भाव के रुझान',
    navMyCrops: 'मेरी फसलें',
    navAlerts: 'भाव अलर्ट',
    navAiSaathi: 'एआई साथी',
    navAdmin: 'एडमिन पैनल',
    navAbout: 'मंडीमित्र के बारे में',
    navHowItWorks: 'यह कैसे काम करता है',
    navLogin: 'लॉग इन',
    navRegister: 'किसान पंजीकरण',
    crops: {
      potato: 'आलू',
      rice: 'धान / चावल',
      onion: 'प्याज',
      tomato: 'टमाटर',
      brinjal: 'बैंगन',
      cabbage: 'पत्तागोभी',
      cauliflower: 'फूलगोभी',
      wheat: 'गेहूं',
      maize: 'मक्का',
      mustard: 'सरसों',
      jute: 'जूट / पटसन'
    },
    units: {
      quintal: 'क्विंटल',
      km: 'किमी',
      rupeePerQuintal: '₹/क्विंटल'
    }
  },

  bn: {
    appName: 'মান্ডিমিত্র',
    tagline: 'দর জানুন। বাজার বাছুন। বেশি লাভ করুন।',
    heroHeadline: 'ফসল বিক্রির আগে জেনে নিন আজকের সঠিক মান্ডি দর।',
    heroSubheadline: 'মান্ডিমিত্র চাষীদের আশেপাশের বিভিন্ন বাজারের দর তুলনা করতে সাহায্য করে, যাতে তারা সেরা দামে ফসল বিক্রি করতে পারেন।',
    btnCheckPrices: 'আজকের বাজারদর দেখুন',
    btnExploreMandis: 'কাছের মান্ডিগুলি দেখুন',
    greetingFarmer: 'নমস্কার, রাহুল বাবু',
    yourLocation: 'আপনার অবস্থান',
    changeLocation: 'বদলান',
    bestMarketNearYou: 'আপনার জন্য সেরা মান্ডি',
    todaysHighlights: 'আজকের বিশেষ দর',
    searchCropPlaceholder: 'আপনার ফসল খুঁজুন (আলু, ধান, পেঁয়াজ, টমেটো...)...',
    allCrops: 'সমস্ত ফসল',
    todayMainPrice: 'আজকের মূল দর (মডেল প্রাইস)',
    minPrice: 'সর্বনিম্ন দর',
    maxPrice: 'সর্বোচ্চ দর',
    trend: 'গতিবিধি',
    distance: 'দূরত্ব',
    compareButton: 'বাজার তুলনা করুন',
    calculateNetProfit: 'নিট লাভ গণনা করুন',
    recommendedMarket: 'পরামর্শকৃত সেরা বাজার',
    estimatedAdditionalEarning: 'আনুমানিক অতিরিক্ত লাভ',
    transportEstimateDisclaimer: 'পরিবহন খরচ আনুমানিক হিসেব। জ্বালানির দাম এবং বাজারের নিলামের ওপর ভিত্তি করে প্রকৃত খরচ ভিন্ন হতে পারে।',
    demoDataDisclaimer: 'ডেমো ডেটা — বাস্তব আর্থিক লেনদেনের সিদ্ধান্ত নেওয়ার জন্য নয়।',
    liveBadge: 'লাইভ ফিড',
    updatedToday: 'আজকের আপডেট: সকাল ১০:৩০',
    navHome: 'হোম',
    navPrices: 'বাজার দর',
    navCompare: 'মান্ডি তুলনা',
    navBestMarket: 'আমার জন্য সেরা বাজার',
    navNearbyMap: 'কাছের মান্ডির মানচিত্র',
    navTrends: 'দরের ওঠা-পড়া',
    navMyCrops: 'আমার ফসল',
    navAlerts: 'দর অ্যালার্ট',
    navAiSaathi: 'এআই সাথী',
    navAdmin: 'অ্যাডমিন প্যানেল',
    navAbout: 'মান্ডিমিত্র সম্পর্কে',
    navHowItWorks: 'কীভাবে কাজ করে',
    navLogin: 'লগইন',
    navRegister: 'কৃষক নিবন্ধন',
    crops: {
      potato: 'আলু',
      rice: 'ধান / চাল',
      onion: 'পেঁয়াজ',
      tomato: 'টমেটো',
      brinjal: 'বেগুন',
      cabbage: 'বাঁধাকপি',
      cauliflower: 'ফুলকপি',
      wheat: 'গম',
      maize: 'ভুট্টা',
      mustard: 'সরিষা',
      jute: 'পাট'
    },
    units: {
      quintal: 'কুইন্টাল',
      km: 'কিমি',
      rupeePerQuintal: '₹/কুইন্টাল'
    }
  }
};

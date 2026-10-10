import React, { useState } from 'react';
import { MandiProvider } from './context/MandiContext';
import { Navbar } from './components/Navbar';
import { MobileNav } from './components/MobileNav';
import { ToastContainer } from './components/ToastContainer';
import { LocationModal } from './components/LocationModal';
import { AuthModal } from './components/AuthModal';
import { LandingPage } from './pages/LandingPage';
import { FarmerDashboard } from './pages/FarmerDashboard';
import { MarketPricesPage } from './pages/MarketPricesPage';
import { CompareMarketsPage } from './pages/CompareMarketsPage';
import { BestMarketCalculatorPage } from './pages/BestMarketCalculatorPage';
import { NearbyMarketsMapPage } from './pages/NearbyMarketsMapPage';
import { PriceTrendsPage } from './pages/PriceTrendsPage';
import { PriceAlertsPage } from './pages/PriceAlertsPage';
import { AiSaathiPage } from './pages/AiSaathiPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AboutPage } from './pages/AboutPage';
import { HowItWorksPage } from './pages/HowItWorksPage';

function AppContent() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedCropId, setSelectedCropId] = useState<string>('crop-potato');

  const renderPage = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingPage setActiveTab={setActiveTab} />;
      case 'dashboard':
        return <FarmerDashboard setActiveTab={setActiveTab} setSelectedCropId={setSelectedCropId} />;
      case 'prices':
        return (
          <MarketPricesPage
            selectedCropId={selectedCropId}
            setSelectedCropId={setSelectedCropId}
            setActiveTab={setActiveTab}
          />
        );
      case 'compare':
        return (
          <CompareMarketsPage
            selectedCropId={selectedCropId}
            setSelectedCropId={setSelectedCropId}
            setActiveTab={setActiveTab}
          />
        );
      case 'calculator':
        return (
          <BestMarketCalculatorPage
            selectedCropId={selectedCropId}
            setSelectedCropId={setSelectedCropId}
            setActiveTab={setActiveTab}
          />
        );
      case 'map':
        return (
          <NearbyMarketsMapPage
            setActiveTab={setActiveTab}
            setSelectedCropId={setSelectedCropId}
          />
        );
      case 'trends':
        return (
          <PriceTrendsPage
            selectedCropId={selectedCropId}
            setSelectedCropId={setSelectedCropId}
          />
        );
      case 'alerts':
        return <PriceAlertsPage />;
      case 'ai':
        return <AiSaathiPage />;
      case 'admin':
        return <AdminDashboardPage />;
      case 'about':
        return <AboutPage />;
      case 'how-it-works':
        return <HowItWorksPage setActiveTab={setActiveTab} />;
      default:
        return <FarmerDashboard setActiveTab={setActiveTab} setSelectedCropId={setSelectedCropId} />;
    }
  };

  return (
    <div className="app-container">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content">
        {renderPage()}
      </main>
      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <LocationModal />
      <AuthModal />
      <ToastContainer />
    </div>
  );
}

function App() {
  return (
    <MandiProvider>
      <AppContent />
    </MandiProvider>
  );
}

export default App;

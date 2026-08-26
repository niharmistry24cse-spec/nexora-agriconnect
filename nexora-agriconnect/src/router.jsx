import React from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';

// Layout global overlays
import { RoleSwitcher } from './components/layout/RoleSwitcher';
import { Toast } from './components/layout/Toast';
import { AgriTranslateModal } from './components/ui/AgriTranslateModal';

// Auth Pages
import { LoginPage } from './pages/auth/Login';
import { RegisterPage } from './pages/auth/Register';

// Onboarding
import { OnboardingWizard } from './pages/onboarding/OnboardingWizard';

// Farmer
import { FarmerDashboard } from './pages/farmer/Dashboard';
import { FarmerProfile } from './pages/farmer/Profile';
import { FarmerMarketplace } from './pages/farmer/Marketplace';
import { ProductDetail } from './pages/farmer/ProductDetail';
import { SellProduct } from './pages/farmer/SellProduct';
import { FarmerCertifications } from './pages/farmer/Certifications';
import { FarmerNews } from './pages/farmer/News';
import { FarmerAlerts } from './pages/farmer/Alerts';
import { CropIntelligence } from './pages/farmer/CropIntelligence';
import { MarketPrices } from './pages/farmer/MarketPrices';
import { FarmerSchemes } from './pages/farmer/Schemes';
import { FarmerWater } from './pages/farmer/Water';
import { FarmerSales } from './pages/farmer/FarmerSales';

// Buyer
import { BuyerMarketplace } from './pages/buyer/BuyerMarketplace';
import { OrderTracking } from './pages/buyer/OrderTracking';
import { BuyerOrders } from './pages/buyer/BuyerOrders';

// Authority
import { AuthorityDashboard } from './pages/authority/AuthorityDashboard';
import { CertificationReview } from './pages/authority/CertificationReview';
import { PublishAlert } from './pages/authority/PublishAlert';
import { AuthoritySchemeManagement } from './pages/authority/SchemeManagement';
import { AuthorityWaterQueue } from './pages/authority/WaterRequestQueue';
import { AuthorityAuditLog } from './pages/authority/AuditLog';

// Admin
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminUserManagement } from './pages/admin/UserManagement';
import { MarketplaceModeration } from './pages/admin/MarketplaceModeration';
import { ContentManagement } from './pages/admin/ContentManagement';
import { PlatformConfiguration } from './pages/admin/PlatformConfiguration';
import { SystemMonitoring } from './pages/admin/SystemMonitoring';

const AppErrorBoundary = () => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      backgroundColor: '#F6F1E6',
      textAlign: 'center'
    }}>
      <div style={{
        backgroundColor: '#fff',
        border: '1px solid #E7DFCE',
        borderRadius: '16px',
        padding: '32px',
        maxWidth: '480px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.06)'
      }}>
        <h2 style={{ color: '#1B4332', fontSize: '20px', fontWeight: 800, marginBottom: '8px' }}>
          AgriConnect Navigation
        </h2>
        <p style={{ color: '#6B6355', fontSize: '14px', marginBottom: '20px' }}>
          Something unexpected happened while loading this screen.
        </p>
        <a
          href="/farmer/dashboard"
          style={{
            display: 'inline-block',
            backgroundColor: '#1B4332',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '14px',
            textDecoration: 'none'
          }}
        >
          Return to Farmer Dashboard →
        </a>
      </div>
    </div>
  );
};

const RootLayout = () => {
  return (
    <>
      <Outlet />
      <RoleSwitcher />
      <Toast />
      <AgriTranslateModal />
    </>
  );
};

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <AppErrorBoundary />,
    children: [
      {
        path: '/',
        element: <Navigate to="/farmer/dashboard" replace />
      },
      {
        path: '/dashboard',
        element: <Navigate to="/farmer/dashboard" replace />
      },

      // Auth Routes
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/auth/login',
        element: <LoginPage />
      },
      {
        path: '/register',
        element: <RegisterPage />
      },
      {
        path: '/auth/register',
        element: <RegisterPage />
      },

      // Onboarding Wizard
      {
        path: '/onboarding',
        element: <Navigate to="/onboarding/2" replace />
      },
      {
        path: '/onboarding/:step',
        element: <OnboardingWizard />
      },

      // Farmer Routes
      {
        path: '/farmer/dashboard',
        element: <FarmerDashboard />
      },
      {
        path: '/farmer/profile',
        element: <FarmerProfile />
      },
      {
        path: '/farmer/marketplace',
        element: <FarmerMarketplace />
      },
      {
        path: '/farmer/marketplace/sell',
        element: <SellProduct />
      },
      {
        path: '/marketplace/product/:id',
        element: <ProductDetail />
      },
      {
        path: '/farmer/certification',
        element: <FarmerCertifications />
      },
      {
        path: '/farmer/certifications',
        element: <FarmerCertifications />
      },
      {
        path: '/farmer/news',
        element: <FarmerNews />
      },
      {
        path: '/farmer/advisories',
        element: <Navigate to="/farmer/certifications" replace />
      },
      {
        path: '/farmer/alerts',
        element: <FarmerAlerts />
      },
      {
        path: '/farmer/intelligence',
        element: <CropIntelligence />
      },
      {
        path: '/farmer/market',
        element: <MarketPrices />
      },
      {
        path: '/farmer/schemes',
        element: <FarmerSchemes />
      },
      {
        path: '/farmer/water',
        element: <FarmerWater />
      },
      {
        path: '/farmer/sales',
        element: <FarmerSales />
      },

      // Buyer Routes
      {
        path: '/buyer/marketplace',
        element: <BuyerMarketplace />
      },
      {
        path: '/buyer/orders',
        element: <BuyerOrders />
      },
      {
        path: '/buyer/orders/:id',
        element: <OrderTracking />
      },
      {
        path: '/buyer/saved',
        element: <BuyerMarketplace />
      },

      // Authority Routes
      {
        path: '/authority/dashboard',
        element: <AuthorityDashboard />
      },
      {
        path: '/authority/certifications/:id',
        element: <CertificationReview />
      },
      {
        path: '/authority/alerts/publish',
        element: <PublishAlert />
      },
      {
        path: '/authority/schemes',
        element: <AuthoritySchemeManagement />
      },
      {
        path: '/authority/water-requests',
        element: <AuthorityWaterQueue />
      },
      {
        path: '/authority/audit-log',
        element: <AuthorityAuditLog />
      },

      // Admin Routes
      {
        path: '/admin/dashboard',
        element: <AdminDashboard />
      },
      {
        path: '/admin/users',
        element: <AdminUserManagement />
      },
      {
        path: '/admin/moderation',
        element: <MarketplaceModeration />
      },
      {
        path: '/admin/content',
        element: <ContentManagement />
      },
      {
        path: '/admin/config',
        element: <PlatformConfiguration />
      },
      {
        path: '/admin/monitoring',
        element: <SystemMonitoring />
      },

      // Informational links fallback
      {
        path: '/help',
        element: <Navigate to="/farmer/advisories" replace />
      },
      {
        path: '/contact',
        element: <Navigate to="/farmer/profile" replace />
      },
      {
        path: '/privacy',
        element: <Navigate to="/farmer/dashboard" replace />
      },
      {
        path: '/terms',
        element: <Navigate to="/farmer/dashboard" replace />
      },

      // Catch-all
      {
        path: '*',
        element: <Navigate to="/farmer/dashboard" replace />
      }
    ]
  }
]);

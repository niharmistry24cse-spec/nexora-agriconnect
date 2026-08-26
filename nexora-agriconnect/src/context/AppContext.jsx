import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { api } from '../services/api';
import { initialFarmerData } from '../data/mockFarmer';
import { initialProducts } from '../data/mockProducts';
import { initialCertifications } from '../data/mockCertifications';
import { initialAuthorityQueue } from '../data/mockAuthorityQueue';
import { initialAlerts } from '../data/mockAlerts';
import { initialNews } from '../data/mockNews';
import { initialAdvisories } from '../data/mockAdvisories';
import { initialUsers } from '../data/mockUsers';
import { initialOrders } from '../data/mockOrders';
import { initialSales } from '../data/mockSales';
import { initialSchemes } from '../data/mockSchemes';
import { initialWaterRequests } from '../data/mockWaterRequests';
import { LANGUAGES, TRANSLATIONS, AGRI_GLOSSARY } from '../data/translations';
import { translateText, playTextSpeech, stopTextSpeech, getStaticTranslation } from '../services/translator';
import { auth, onAuthStateChanged, signOut } from '../services/firebase';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Current active role: 'farmer' | 'buyer' | 'authority' | 'admin'
  const [role, setRole] = useState('farmer');
  
  // Mobile Sidebar Drawer State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = useCallback(() => setIsMobileMenuOpen(prev => !prev), []);
  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    name: 'Ramesh Kumar',
    phone: '+91 98765 43210',
    email: 'ramesh.kumar@agriconnect.in',
    role: 'farmer',
    location: 'Village Pratappur, Ludhiana, Punjab'
  });

  // Sync Firebase authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        setIsAuthenticated(true);
        setCurrentUser(prev => ({
          ...prev,
          name: fbUser.displayName || prev?.name || 'Farmer Member',
          email: fbUser.email || prev?.email || '',
          uid: fbUser.uid
        }));
      }
    });
    return () => unsubscribe();
  }, []);

  // Current language code: 'en' | 'hi' | 'pa' | 'mr' | 'te' | 'ta' | 'bn' | 'gu' | 'kn'
  const [langCode, setLangCode] = useState('en');

  // Translation Modal State
  const [isTranslatorOpen, setIsTranslatorOpen] = useState(false);
  const [translatorInitialText, setTranslatorInitialText] = useState('');

  const openTranslator = useCallback((text = '') => {
    setTranslatorInitialText(text);
    setIsTranslatorOpen(true);
  }, []);

  const currentLanguage = useMemo(() => {
    return LANGUAGES.find(l => l.code === langCode) || LANGUAGES[0];
  }, [langCode]);

  const setLanguage = useCallback((lang) => {
    // Handle both code ('hi') and legacy names ('हिंदी', 'English')
    if (lang === 'English') {
      setLangCode('en');
    } else if (lang === 'हिंदी' || lang === 'Hindi') {
      setLangCode('hi');
    } else {
      const match = LANGUAGES.find(l => l.code === lang || l.name.toLowerCase() === String(lang).toLowerCase() || l.native === lang);
      setLangCode(match ? match.code : 'en');
    }
  }, []);

  // Instant UI translation helper
  const t = useCallback((key, fallback) => {
    if (!key) return '';
    if (langCode === 'en') return fallback || key;
    const translated = getStaticTranslation(key, langCode);
    return translated || fallback || key;
  }, [langCode]);

  // Farmer profile & parcels state
  const [farmer, setFarmer] = useState(initialFarmerData);

  // Products state (farmer & buyer marketplace)
  const [products, setProducts] = useState(initialProducts);

  // Certifications state (farmer requests & authority queue)
  const [certifications, setCertifications] = useState(initialCertifications);

  // Authority queue & active review document
  const [authorityQueue, setAuthorityQueue] = useState(initialAuthorityQueue);

  // Alerts state (unified alert center)
  const [alerts, setAlerts] = useState(initialAlerts);

  // News state
  const [news] = useState(initialNews);

  // Advisories state
  const [advisories, setAdvisories] = useState(initialAdvisories);

  // Users state (admin management)
  const [users, setUsers] = useState(initialUsers);

  // Orders state (buyer tracking)
  const [orders, setOrders] = useState(initialOrders);

  // Sales state (farmer sell list & records)
  const [sales, setSales] = useState(initialSales);

  // Schemes & Water Requests
  const [schemes, setSchemes] = useState(initialSchemes);
  const [waterRequests, setWaterRequests] = useState(initialWaterRequests);

  // Live weather & market prices from backend (fall back to sensible defaults until loaded)
  const [weather, setWeather] = useState(null);
  const [marketPrices, setMarketPrices] = useState(null);
  const [backendConnected, setBackendConnected] = useState(false);
  const [weatherLocationInput, setWeatherLocationInput] = useState('');

  // Fetches weather for a given city/place string (e.g. "Jaipur, Rajasthan").
  // Also usable directly from the UI via a location search box.
  const refreshWeather = useCallback((location) => {
    return api.getWeather({ location })
      .then((data) => { setWeather(data); return data; })
      .catch((err) => {
        console.warn('Falling back to mock weather:', err.message);
        showToast('Could not find that location — showing fallback weather', 'error');
      });
  }, []);

  // Pull live data from the backend on load. If the backend isn't running,
  // everything silently keeps using the local mock data already set above.
  useEffect(() => {
    api.getHealth().then(() => setBackendConnected(true)).catch(() => setBackendConnected(false));

    // Uses the farmer's district + state so weather matches whoever's logged in.
    // Falls back to Ludhiana, Punjab if that's ever missing.
    const defaultLocation = (farmer?.district && farmer?.state)
      ? `${farmer.district.replace(/^District\s+/i, '')}, ${farmer.state}`
      : 'Ludhiana, Punjab';
    refreshWeather(defaultLocation);

    api.getMarketPrices({ state: 'Punjab' }).then(setMarketPrices).catch((err) => {
      console.warn('Falling back to mock market prices:', err.message);
    });

    api.getProducts().then((data) => { if (data?.length) setProducts(data); }).catch((err) => {
      console.warn('Falling back to mock products:', err.message);
    });

    api.getSchemes().then((data) => { if (data?.length) setSchemes(data); }).catch((err) => {
      console.warn('Falling back to mock schemes:', err.message);
    });

    api.getAlerts().then((data) => { if (data) setAlerts(data); }).catch((err) => {
      console.warn('Falling back to mock alerts:', err.message);
    });
  }, []);

  // AI crop recommendation (calls backend /api/crop-prediction, which uses
  // mock scoring today and can be swapped for a real Python model later)
  const predictCrop = useCallback(async (input) => {
    try {
      return await api.predictCrop(input);
    } catch (err) {
      showToast('Could not reach prediction service — is the backend running?', 'error');
      throw err;
    }
  }, []);

  // Toast notifications
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'info', duration = 3500) => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, duration);
  }, []);

  // Voice read-aloud simulation with regional voice synthesis
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingText, setSpeakingText] = useState('');

  const speakText = useCallback((text, targetLang) => {
    if (!text) return;
    if (isSpeaking) {
      stopTextSpeech();
      setIsSpeaking(false);
      setSpeakingText('');
      showToast('Audio playback stopped', 'info', 2000);
      return;
    }

    setIsSpeaking(true);
    setSpeakingText(text);
    showToast(`Reading aloud: "${text.length > 40 ? text.slice(0, 40) + '...' : text}"`, 'info', 3000);

    const played = playTextSpeech(text, targetLang || langCode, () => {
      setIsSpeaking(false);
      setSpeakingText('');
    });

    if (!played) {
      setTimeout(() => {
        setIsSpeaking(false);
        setSpeakingText('');
      }, 4000);
    }
  }, [isSpeaking, langCode, showToast]);

  // Farmer actions
  const updateFarmerPreferences = useCallback((newPrefs) => {
    setFarmer(prev => ({
      ...prev,
      preferredLanguage: newPrefs.preferredLanguage || prev.preferredLanguage,
      notifications: {
        ...prev.notifications,
        ...newPrefs.notifications
      }
    }));
    showToast('Preferences updated successfully', 'success');
  }, [showToast]);

  const addLandParcel = useCallback((parcel) => {
    const newParcel = {
      id: `parcel-${Date.now()}`,
      ...parcel,
      status: 'PENDING VERIFICATION',
      lastUpdated: 'Just now'
    };
    setFarmer(prev => ({
      ...prev,
      landParcels: [...prev.landParcels, newParcel]
    }));
    showToast(`Land parcel "${parcel.name}" added for verification`, 'success');
  }, [showToast]);

  // Product listing action (Seller)
  const addProduct = useCallback((productData) => {
    const newProd = {
      id: `prod-${Date.now()}`,
      ...productData,
      rating: 5.0,
      reviewsCount: 1,
      seller: farmer.name,
      sellerAvatar: farmer.avatarUrl,
      sellerLocation: `${farmer.village}, ${farmer.district}`,
      sellerRating: '5.0 (New Seller)',
      lastUpdated: 'Just now'
    };
    setProducts(prev => [newProd, ...prev]);
    showToast(`Product "${productData.name}" listed successfully on Marketplace!`, 'success');
  }, [farmer, showToast]);

  // Certification request action (Farmer)
  const submitCertificationRequest = useCallback((requestData) => {
    const newCert = {
      id: `REQ-${Date.now().toString().slice(-4)}A`,
      title: requestData.certificationType || 'Organic Transition Cert.',
      requestId: `REQ-${Date.now().toString().slice(-4)}A`,
      crop: requestData.cropDetail || 'Farm Crop',
      submittedDate: 'Today',
      status: 'Under Review',
      statusVariant: 'warning',
      issuingAuthority: 'Regional Agricultural Authority',
      currentStep: 2,
      steps: [
        { id: 1, name: 'Submitted', date: 'Today', status: 'completed' },
        { id: 2, name: 'Review', date: 'In Progress', status: 'current' },
        { id: 3, name: 'Approved', date: 'Pending', status: 'upcoming' }
      ],
      lastUpdated: 'Just now'
    };
    setCertifications(prev => [newCert, ...prev]);
    setAuthorityQueue(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        pendingCertifications: prev.stats.pendingCertifications + 1
      }
    }));
    showToast('Certification request submitted to Authority queue', 'success');
  }, [showToast]);

  // Authority actions: Approve / Reject document
  const approveReviewDoc = useCallback((reason) => {
    setAuthorityQueue(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        pendingCertifications: Math.max(0, prev.stats.pendingCertifications - 1)
      },
      recentItems: [
        {
          id: prev.activeReviewDoc.farmId,
          type: prev.activeReviewDoc.docType,
          applicant: `${prev.activeReviewDoc.farmerName} (${prev.activeReviewDoc.farmId})`,
          status: 'Approved',
          statusVariant: 'success',
          actionDate: 'Just now'
        },
        ...prev.recentItems
      ],
      activeReviewDoc: {
        ...prev.activeReviewDoc,
        status: 'Approved',
        statusVariant: 'success'
      }
    }));
    showToast('Document approved and compliance certificate issued!', 'success');
  }, [showToast]);

  const rejectReviewDoc = useCallback((reason) => {
    setAuthorityQueue(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        pendingCertifications: Math.max(0, prev.stats.pendingCertifications - 1)
      },
      recentItems: [
        {
          id: prev.activeReviewDoc.farmId,
          type: prev.activeReviewDoc.docType,
          applicant: `${prev.activeReviewDoc.farmerName} (${prev.activeReviewDoc.farmId})`,
          status: 'Denied',
          statusVariant: 'danger',
          actionDate: 'Just now'
        },
        ...prev.recentItems
      ],
      activeReviewDoc: {
        ...prev.activeReviewDoc,
        status: 'Denied',
        statusVariant: 'danger'
      }
    }));
    showToast('Document rejected. Feedback sent to applicant.', 'info');
  }, [showToast]);

  // Authority action: Publish Alert
  const publishAlert = useCallback(({ headline, message, severity, district, village }) => {
    const newAlert = {
      id: `alert-${Date.now()}`,
      category: severity === 'Emergency' ? 'Emergency Alert' : severity === 'Urgent' ? 'Priority Advisory' : 'General Notice',
      timeAgo: 'Just now',
      headline,
      body: message,
      read: false,
      severity,
      sourceAuthority: `District Authority (${district || 'All Districts'})`,
      targetLocation: village ? `${village}, ${district}` : (district || 'All Regions'),
      lastUpdated: 'Just now'
    };

    setAlerts(prev => ({
      ...prev,
      priorityAlerts: [newAlert, ...prev.priorityAlerts]
    }));
    showToast(`Alert "${headline}" published to all farmers in ${district || 'Target Region'}!`, 'success');
  }, [showToast]);

  // Alerts actions
  const markAlertRead = useCallback((alertId) => {
    setAlerts(prev => ({
      ...prev,
      priorityAlerts: prev.priorityAlerts.map(a => a.id === alertId ? { ...a, read: true } : a),
      weatherUpdates: prev.weatherUpdates.map(w => w.id === alertId ? { ...w, read: true } : w),
      marketShifts: prev.marketShifts.map(m => m.id === alertId ? { ...m, read: true } : m)
    }));
  }, []);

  const markAllAlertsRead = useCallback(() => {
    setAlerts(prev => ({
      priorityAlerts: prev.priorityAlerts.map(a => ({ ...a, read: true })),
      weatherUpdates: prev.weatherUpdates.map(w => ({ ...w, read: true })),
      marketShifts: prev.marketShifts.map(m => ({ ...m, read: true }))
    }));
    showToast('All alerts marked as read', 'success');
  }, [showToast]);

  // Admin action: update user role
  const updateUserRole = useCallback((userId, newRole) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    showToast(`User role updated to ${newRole}`, 'success');
  }, [showToast]);

  // Helper: add a farmer sale entry
  const addSale = useCallback((saleData) => {
    const newSale = {
      id: saleData.id || `SL-${Date.now().toString().slice(-4)}`,
      saleNumber: saleData.saleNumber || `#SL-${Date.now().toString().slice(-4)}`,
      ...saleData,
      lastUpdated: 'Just now'
    };
    setSales(prev => [newSale, ...prev]);
  }, []);

  // Buyer action: create order (also auto-generates a matching farmer sale record)
  const createOrder = useCallback((product, quantity) => {
    const qtyNum = Number(quantity) || 1;
    const total = product.price * qtyNum;
    const orderId = `AC-${Date.now().toString().slice(-4)}-MK`;
    const saleId = `SL-${Date.now().toString().slice(-4)}`;
    const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

    const newOrder = {
      id: orderId,
      orderNumber: `#${orderId}`,
      status: 'Confirmed',
      statusVariant: 'success',
      productName: product.name,
      productThumbnail: product.image,
      quantity: `${qtyNum} x ${product.priceUnit || product.unit || 'Units'}`,
      quantityNum: qtyNum,
      unit: product.priceUnit || product.unit || 'Units',
      pricePerUnit: product.price,
      totalPrice: total,
      currency: '₹',
      sellerName: product.seller || 'Verified Agri Seller',
      sellerLocation: product.sellerLocation || 'Punjab Mandi',
      sellerPhone: '+91 98765 11223',
      orderDate: today,
      expectedDelivery: 'Est. 2 Days',
      steps: [
        { id: 1, name: 'Requested', time: 'Just now', status: 'completed' },
        { id: 2, name: 'Confirmed', time: 'Just now', status: 'completed' },
        { id: 3, name: 'In Transit', time: 'Estimated 2 Days', status: 'current', icon: 'truck' },
        { id: 4, name: 'Completed', time: 'Pending', status: 'upcoming', icon: 'package' }
      ],
      invoice: {
        invoiceNo: `INV-BYR-${Date.now().toString().slice(-4)}`,
        date: today,
        taxId: 'GSTIN03AAAAA1234A1Z5',
        subtotal: total,
        deliveryFee: 150,
        total: total + 150
      },
      lastUpdated: 'Just now'
    };

    // Auto-create corresponding farmer sale record
    const newSale = {
      id: saleId,
      saleNumber: `#${saleId}`,
      productName: product.name,
      category: product.category || 'Agricultural Produce',
      thumbnail: product.image,
      quantity: `${qtyNum} ${product.priceUnit || product.unit || 'Units'}`,
      quantityNum: qtyNum,
      unit: product.priceUnit || product.unit || 'Units',
      pricePerUnit: product.price,
      totalAmount: total,
      currency: '₹',
      buyerName: 'AgriCorp Traders (Buyer)',
      buyerType: 'Platform Buyer',
      buyerLocation: 'New Delhi Wholesale Mandi',
      buyerPhone: '+91 98765 22334',
      buyerAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80',
      saleDate: today,
      deliveryStatus: 'In Transit',
      deliveryStatusVariant: 'info',
      paymentStatus: 'Escrow Deposited (Pending Delivery)',
      paymentStatusVariant: 'warning',
      paymentMethod: 'AgriConnect Secure Escrow',
      transactionRef: `ESC-${Date.now().toString().slice(-9)}`,
      invoice: {
        invoiceNo: `INV-FARM-${Date.now().toString().slice(-4)}`,
        date: today,
        taxId: 'GSTIN03AAAAA1234A1Z5',
        subtotal: total,
        mandiFee: 0,
        netEarnings: total
      },
      notes: `Order placed via AgriConnect Buyer Marketplace. Order Ref: #${orderId}`,
      linkedOrderId: orderId
    };

    setOrders(prev => [newOrder, ...prev]);
    setSales(prev => [newSale, ...prev]);
    showToast(`Order #${orderId} placed successfully!`, 'success');
    return newOrder;
  }, [showToast]);

  // Auth handlers
  const loginUser = useCallback(({ identifier, password, role: loginRole, rememberMe }) => {
    const targetRole = loginRole || 'farmer';
    setRole(targetRole);
    setIsAuthenticated(true);

    let userObj = {
      name: 'Ramesh Kumar',
      phone: identifier.includes('@') ? '+91 98765 43210' : identifier,
      email: identifier.includes('@') ? identifier : 'farmer.ramesh@agriconnect.in',
      role: targetRole,
      location: 'Village Pratappur, Ludhiana, Punjab'
    };

    if (targetRole === 'buyer') {
      userObj = {
        name: 'AgriCorp Traders',
        phone: '+91 98765 22334',
        email: 'procurement@agricorp.in',
        role: 'buyer',
        location: 'New Delhi Wholesale Mandi'
      };
    } else if (targetRole === 'authority') {
      userObj = {
        name: 'Dr. Harvinder Singh',
        phone: '+91 98765 99881',
        email: 'officer.ludhiana@agri.gov.in',
        role: 'authority',
        location: 'District Agriculture Office, Ludhiana'
      };
    } else if (targetRole === 'admin') {
      userObj = {
        name: 'Suresh Singh (Admin)',
        phone: '+91 99887 76655',
        email: 'admin@agriconnect.in',
        role: 'admin',
        location: 'State HQ Chandigarh'
      };
    }

    setCurrentUser(userObj);
    showToast(`Welcome back, ${userObj.name}! Logged in as ${targetRole.toUpperCase()}`, 'success');
    return userObj;
  }, [showToast]);

  const registerUser = useCallback((regData) => {
    const {
      name,
      phone,
      email,
      password,
      role: regRole = 'farmer',
      // Requested fields
      location = {},
      landSize = '5.0',
      soilInformation = 'Alluvial Loam',
      crops = ['Wheat', 'Paddy'],
      waterAvailability = 'Canal & Borewell',
      farmingPreferences = 'Mixed Organic & Modern',
      preferredLanguage = 'English'
    } = regData;

    setRole(regRole);
    setIsAuthenticated(true);
    setLanguage(preferredLanguage);

    const newUser = {
      name: name || 'New Agricultural Producer',
      phone: phone || '+91 98765 00000',
      email: email || 'farmer@agriconnect.in',
      role: regRole,
      location: location.village ? `${location.village}, ${location.district || ''}, ${location.state || ''}` : (location.state || 'Punjab')
    };
    setCurrentUser(newUser);

    if (regRole === 'farmer') {
      setFarmer(prev => ({
        ...prev,
        name: newUser.name,
        phone: newUser.phone,
        village: location.village || 'Village Pratappur',
        district: location.district || 'Ludhiana',
        state: location.state || 'Punjab',
        preferredLanguage,
        landParcels: [
          {
            id: `parcel-${Date.now()}`,
            name: `${location.village || 'Main'} Field`,
            khasraNumber: '101/A',
            acres: parseFloat(landSize) || 5.0,
            currentCrop: crops[0] || 'Wheat',
            soilType: soilInformation,
            status: 'VERIFIED',
            verifiedBy: 'Self-Registered (AgriConnect GPS)',
            lastUpdated: 'Just now'
          }
        ]
      }));
    }

    showToast(`Registration completed! Welcome to AgriConnect, ${newUser.name}.`, 'success');
    return newUser;
  }, [setLanguage, showToast]);

  const logoutUser = useCallback(() => {
    signOut(auth).catch(() => {});
    setIsAuthenticated(false);
    showToast('You have been logged out safely.', 'info');
  }, [showToast]);

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        toggleMobileMenu,
        closeMobileMenu,
        isAuthenticated,
        currentUser,
        loginUser,
        registerUser,
        logoutUser,
        language: currentLanguage.name,
        langCode,
        currentLanguage,
        availableLanguages: LANGUAGES,
        setLanguage,
        t,
        isTranslatorOpen,
        setIsTranslatorOpen,
        openTranslator,
        translatorInitialText,
        translateDynamicText: (text, target, src) => translateText(text, target || langCode, src || 'en'),
        farmer,
        setFarmer,
        updateFarmerPreferences,
        addLandParcel,
        products,
        addProduct,
        certifications,
        submitCertificationRequest,
        authorityQueue,
        approveReviewDoc,
        rejectReviewDoc,
        alerts,
        publishAlert,
        markAlertRead,
        markAllAlertsRead,
        news,
        advisories,
        users,
        updateUserRole,
        orders,
        createOrder,
        sales,
        addSale,
        schemes,
        waterRequests,
        weather,
        marketPrices,
        backendConnected,
        refreshWeather,
        predictCrop,
        toast,
        showToast,
        isSpeaking,
        speakingText,
        speakText
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

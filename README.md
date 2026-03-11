# 🌾 Kisan Connect - Smart Agricultural Assistant PWA

A comprehensive Progressive Web App (PWA) designed for Indian farmers, providing AI-powered farming advice, disease detection, weather updates, market prices, and government schemes in multiple languages.

![React](https://img.shields.io/badge/React-18.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.4-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-cyan)
![Firebase](https://img.shields.io/badge/Firebase-12.8-orange)
![PWA](https://img.shields.io/badge/PWA-Ready-green)
![Gemini AI](https://img.shields.io/badge/Gemini-AI-blue)

## 🚀 Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FRuthwik000%2Fkisanconnect&env=VITE_FIREBASE_API_KEY,VITE_FIREBASE_AUTH_DOMAIN,VITE_FIREBASE_PROJECT_ID,VITE_FIREBASE_STORAGE_BUCKET,VITE_FIREBASE_MESSAGING_SENDER_ID,VITE_FIREBASE_APP_ID,VITE_FIREBASE_MEASUREMENT_ID,VITE_OPENWEATHER_API_KEY,VITE_GEMINI_API_KEY&envDescription=Required%20environment%20variables%20for%20Firebase%2C%20OpenWeather%2C%20and%20Gemini%20API&envLink=https%3A%2F%2Fgithub.com%2FRuthwik000%2Fkisanconnect%2Fblob%2Fmain%2F.env.example)

## ✨ Features

### 📱 Progressive Web App (PWA) **[NEW]**
- **Installable on mobile devices** like a native app
- **Offline functionality** with service worker caching
- **Push notifications** for important updates
- **App shortcuts** for quick access to key features
- **Automatic updates** with user consent
- **Native app-like experience** in standalone mode
- **Works offline** with cached content and data

### 🔐 Authentication & Onboarding
- **Multi-method authentication**: Phone OTP, Email/Password, Google Sign-in
- **Progressive 5-step onboarding** with voice guidance
- **Multilingual voice input** for name and phone number
- **Location-based personalization**
- **Secure Firebase Authentication** integration
- **User profile management** with Firestore

### 🤖 AI Assistant & Chat
- **Multilingual chat interface** (English, Hindi, Telugu)
- **Gemini 2.5 Flash AI** for intelligent responses
- **Agricultural advisory** and farming guidance
- **Voice input support** in multiple languages
- **Chat history** with conversation management
- **Suggested questions** for common farming queries
- **Real-time responses** with typing indicators

### 📸 Disease Detection **[AI-Powered]**
- **AI-powered crop disease identification** using **Gemini 3 Flash Preview Vision**
- **Real-time photo analysis** with instant results
- **High accuracy detection** for cotton and other crop diseases
- **Detailed treatment recommendations** with step-by-step guidance
- **Medicine suggestions** with Amazon/Flipkart purchase links
- **Severity indication** (Early, Moderate, Severe)
- **Confidence scores** for reliability assessment
- **Scan history** with detailed records and search functionality
- **Multilingual results** in user's preferred language

### 🌤️ Weather Integration
- **Real-time weather updates** with OpenWeather API
- **Location-based forecasts** using user's farming location
- **Detailed weather metrics**: Temperature, Humidity, Wind Speed, Cloud Cover
- **Weather condition translations** in all supported languages
- **Farming recommendations** based on current weather
- **Visual weather icons** and intuitive display

### 📰 News & Market Intelligence
- **Government schemes** with detailed information
- **Real-time market prices** for agricultural commodities
- **Agricultural news** from trusted sources
- **Trending updates** and important announcements
- **Multilingual content** with proper translations
- **Real-time data synchronization** with Firestore
- **Categorized content** for easy navigation

### 👤 Profile & Settings Management
- **Comprehensive user profiles** with farming details
- **Language preferences** with instant switching
- **Location settings** for personalized content
- **Profile picture** and personal information management
- **Account security** and privacy controls
- **Data export** and account deletion options

### 🌍 Complete Multilingual Support
- **English (English)** 🇬🇧 - Complete interface translation
- **Hindi (हिंदी)** 🇮🇳 - Full native language support
- **Telugu (తెలుగు)** 🇮🇳 - Complete regional language support
- **Dynamic language switching** without app restart
- **Voice input support** in all languages
- **Localized date/time formats** and number formatting
- **Cultural adaptations** for Indian farming context

### 📊 Data Management & History
- **Scan history** with detailed disease detection records
- **Chat history** with conversation search and management
- **Data synchronization** across devices
- **Offline data storage** with automatic sync when online
- **Export functionality** for personal records
- **Privacy controls** for data management

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** and npm
- **Firebase account** with project setup
- **Google Gemini API key** (for AI features)
- **OpenWeather API key** (for weather data)

### Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/Ruthwik000/kisanconnect.git
cd kisanconnect
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add your API credentials:
```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Weather API
VITE_OPENWEATHER_API_KEY=your_openweather_api_key

# Gemini AI API
VITE_GEMINI_API_KEY=your_gemini_api_key
```

4. **Start development server**
```bash
npm run dev
```

Visit `http://localhost:8080`

### PWA Installation

1. **Build for production**
```bash
npm run build
```

2. **Serve the built app**
```bash
npm run preview
```

3. **Install as PWA**
   - Open the app in Chrome/Edge
   - Look for the install prompt in the address bar
   - Click "Install" to add to home screen
   - Enjoy native app-like experience!

## 📁 Project Structure

```
kisan-connect/
├── src/
│   ├── features/              # Feature-based architecture
│   │   ├── auth/             # Authentication & onboarding
│   │   ├── chat/             # AI chat assistant
│   │   ├── dashboard/        # Main dashboard
│   │   ├── disease-detection/ # Disease detection with Gemini Vision
│   │   ├── news/             # News & market prices
│   │   ├── profile/          # User profile management
│   │   ├── voice-agent/      # Voice interaction
│   │   └── weather/          # Weather services
│   ├── shared/               # Shared components & utilities
│   │   ├── components/       # Reusable UI components
│   │   ├── contexts/         # React Context providers
│   │   ├── hooks/            # Custom React hooks
│   │   ├── i18n/             # Internationalization
│   │   ├── services/         # API services
│   │   ├── ui/               # shadcn/ui components
│   │   └── utils/            # Utility functions
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # App entry point
│   └── index.css             # Global styles
├── public/
│   ├── icons/                # PWA app icons
│   ├── manifest.json         # PWA manifest
│   └── _redirects            # SPA routing for deployment
├── .env                      # Environment variables (not in git)
├── .env.example              # Environment template
├── vite.config.ts            # Vite configuration with PWA
├── vercel.json               # Vercel deployment config
└── package.json
```

## 🛠️ Tech Stack

### Frontend
- **React 18.3** - UI framework with hooks
- **Vite 5.4** - Build tool and dev server
- **Tailwind CSS v4** - Utility-first CSS framework
- **JavaScript** - Programming language

### AI & APIs
- **Google Gemini 2.5 Flash** - Chat AI assistant
- **Google Gemini 3 Flash Preview** - Vision AI for disease detection
- **OpenWeather API** - Real-time weather data
- **Web Speech API** - Voice input functionality

### Backend & Database
- **Firebase Authentication** - Multi-method authentication
- **Cloud Firestore** - Real-time NoSQL database
- **Firebase Analytics** - Usage tracking and insights

### PWA & Performance
- **Vite PWA Plugin** - Service worker generation
- **Workbox** - Caching strategies and offline support
- **Web App Manifest** - PWA configuration

### UI Components
- **shadcn/ui** - Modern component library
- **Radix UI** - Headless UI primitives
- **Lucide React** - Beautiful icons
- **Sonner** - Toast notifications
- **Framer Motion** - Smooth animations

### Internationalization
- **i18next** - Translation framework
- **react-i18next** - React integration
- **i18next-browser-languagedetector** - Language detection

### Other Libraries
- **React Router v6** - Client-side routing
- **React Query** - Server state management
- **date-fns** - Date utilities
- **recharts** - Data visualization

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start dev server (port 8080)

# Build
npm run build           # Production build with PWA
npm run build:dev       # Development build

# Preview
npm run preview         # Preview production build

# Linting
npm run lint            # Run ESLint
```

## 🔥 Firebase Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Add a web app to your project

### 2. Enable Authentication

1. Go to Authentication > Sign-in method
2. Enable **Phone**, **Email/Password**, and **Google** authentication
3. Add authorized domains for your deployment

### 3. Create Firestore Database

1. Go to Firestore Database
2. Create database (start in production mode)
3. Set up security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Public collections (read-only for authenticated users)
    match /agricultural_news/{document} {
      allow read: if request.auth != null;
    }
    
    match /market_prices/{document} {
      allow read: if request.auth != null;
    }
    
    match /government_schemes/{document} {
      allow read: if request.auth != null;
    }
    
    // User-specific collections
    match /disease_detections/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    match /chat_conversations/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

### 4. Get Configuration

1. Go to Project Settings
2. Scroll to "Your apps"
3. Copy the Firebase configuration
4. Add to `.env` file

## 🌐 Deployment

### Vercel (Recommended)

1. **Push code to GitHub**
2. **Import project in Vercel**
3. **Add environment variables** from `.env.example`
4. **Deploy** - Automatic PWA optimization included

### Netlify

1. **Connect repository**
2. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **Add environment variables**
4. **Deploy**

The app includes proper PWA configuration and will work offline after first visit.

## 📱 PWA Features

### Installation
- **Install prompt** appears automatically when criteria are met
- **Add to home screen** on mobile devices
- **Desktop installation** via browser
- **App shortcuts** for quick access to key features

### Offline Support
- **Service worker** caches essential resources
- **Offline functionality** for core features
- **Background sync** when connection restored
- **Update notifications** for new versions

### Native Experience
- **Standalone display** removes browser UI
- **Splash screen** with app branding
- **Status bar styling** matches app theme
- **Hardware back button** support on Android

## 🌍 Internationalization

### Supported Languages

- **English** - Complete interface
- **Hindi (हिंदी)** - Full translation including voice
- **Telugu (తెలుగు)** - Complete regional support

### Adding New Language

1. **Create translation file**: `src/shared/i18n/locales/[code].json`
2. **Add language to config**:
```javascript
// src/shared/i18n/index.js
export const languages = [
  // ... existing languages
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
];
```
3. **Import and add to i18n resources**

## 🎤 Voice Input

The app supports voice input for:
- **Name entry** (Onboarding)
- **Phone number** (Onboarding)  
- **Chat messages** (AI Assistant)

**Supported Languages:**
- English (en-IN)
- Hindi (hi-IN)
- Telugu (te-IN)

Uses Web Speech API with fallback for unsupported browsers.

## 📊 Performance

- **Lighthouse Score**: 90+ across all metrics
- **Code splitting** with React.lazy
- **Image optimization** and lazy loading
- **Service worker caching** for instant loading
- **Bundle size**: ~340KB gzipped total

## 🔒 Security

- **Firebase Authentication** for secure login
- **Firestore security rules** for data protection
- **Environment variables** for sensitive data
- **HTTPS only** in production
- **reCAPTCHA** for phone authentication
- **Content Security Policy** headers

## 🐛 Troubleshooting

### Firebase Connection Issues
- Check `.env` file has correct values
- Verify Firebase project is active
- Check authorized domains in Firebase Console

### Voice Input Not Working
- Ensure HTTPS (required for Web Speech API)
- Check browser compatibility
- Allow microphone permissions

### PWA Installation Issues
- Ensure HTTPS deployment
- Check manifest.json is accessible
- Verify service worker registration
- Clear browser cache and try again

### Build Errors
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear cache: `rm -rf dist`
- Check Node.js version: `node --version` (should be 18+)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- **Development Team** - Kisan Connect

## 🙏 Acknowledgments

- **Google Gemini AI** for intelligent chat and vision capabilities
- **Firebase** for authentication and real-time database
- **OpenWeather** for accurate weather data
- **shadcn/ui** for beautiful, accessible components
- **Vercel** for seamless deployment and hosting
- **All farmers** who inspired this project

---

**Made with ❤️ for Indian Farmers**

*Empowering agriculture through technology*
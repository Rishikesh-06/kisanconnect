import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Download, X, Smartphone, Monitor } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    // Check if iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Check if already installed (standalone mode)
    const standalone = window.matchMedia('(display-mode: standalone)').matches || 
                      window.navigator.standalone === true;
    setIsStandalone(standalone);

    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Show the install prompt if not already installed
      if (!standalone) {
        setShowPrompt(true);
      }
    };

    const handleAppInstalled = () => {
      console.log('PWA was installed');
      setShowPrompt(false);
      setDeferredPrompt(null);
      setIsStandalone(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // For iOS, show manual install instructions if not standalone
    if (iOS && !standalone) {
      // Delay showing prompt on iOS
      setTimeout(() => setShowPrompt(true), 3000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();
      
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      
      // Clear the deferredPrompt
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Store dismissal in localStorage to avoid showing again for a while
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };

  // Don't show if dismissed recently (within 3 days for better conversion)
  useEffect(() => {
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed) {
      const dismissedTime = parseInt(dismissed);
      const threeDaysAgo = Date.now() - (3 * 24 * 60 * 60 * 1000);
      if (dismissedTime > threeDaysAgo) {
        setShowPrompt(false);
      }
    }
  }, []);

  // Don't show if already installed
  if (isStandalone || (!showPrompt && !isIOS)) {
    return null;
  }

  return (
    <Card className="fixed bottom-20 left-4 right-4 z-50 shadow-lg border-2 border-primary/20 bg-white">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            {isIOS ? <Smartphone className="w-5 h-5 text-primary" /> : <Download className="w-5 h-5 text-primary" />}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm mb-1">
              {isIOS 
                ? t('pwa.installTitleIOS', 'Install Kisan Connect App')
                : t('pwa.installTitle', 'Download Kisan Connect')
              }
            </h3>
            <p className="text-xs text-muted-foreground mb-3">
              {isIOS 
                ? t('pwa.installDescriptionIOS', 'Tap the Share button below, then select "Add to Home Screen" to install the app.')
                : t('pwa.installDescription', 'Download and install our app for offline access and better performance.')
              }
            </p>
            
            {isIOS ? (
              <div className="text-xs text-muted-foreground mb-3 p-2 bg-blue-50 rounded border-l-2 border-blue-200">
                <div className="font-medium mb-1">📱 Installation Steps:</div>
                <div>1. Tap the Share button (⬆️) at the bottom</div>
                <div>2. Scroll down and tap "Add to Home Screen"</div>
                <div>3. Tap "Add" to install the app</div>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  onClick={handleInstallClick}
                  className="text-xs px-3 py-1 h-7 bg-primary hover:bg-primary/90"
                  disabled={!deferredPrompt}
                >
                  <Download className="w-3 h-3 mr-1" />
                  {t('pwa.install', 'Install App')}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleDismiss}
                  className="text-xs px-3 py-1 h-7"
                >
                  {t('pwa.notNow', 'Not now')}
                </Button>
              </div>
            )}
            
            {isIOS && (
              <div className="flex gap-2 mt-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleDismiss}
                  className="text-xs px-3 py-1 h-7"
                >
                  {t('pwa.gotIt', 'Got it')}
                </Button>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="flex-shrink-0 w-6 h-6 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
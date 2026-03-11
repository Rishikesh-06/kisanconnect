import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Download, Smartphone } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function InstallButton({ variant = "default", size = "default", className = "" }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [canInstall, setCanInstall] = useState(false);
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
      setCanInstall(true);
    };

    const handleAppInstalled = () => {
      console.log('PWA was installed');
      setCanInstall(false);
      setDeferredPrompt(null);
      setIsStandalone(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // For iOS, always show install button
    if (iOS && !standalone) {
      setCanInstall(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt && !isIOS) {
      // Show the native browser install dialog
      deferredPrompt.prompt();
      
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
        setCanInstall(false);
      } else {
        console.log('User dismissed the install prompt');
      }
      
      // Clear the deferredPrompt
      setDeferredPrompt(null);
    } else if (isIOS) {
      // Show iOS install instructions
      alert(`To install Kisan Connect:\n\n1. Tap the Share button (⬆️) at the bottom\n2. Scroll down and tap "Add to Home Screen"\n3. Tap "Add" to install the app`);
    }
  };

  // Don't show if already installed
  if (isStandalone) {
    return null;
  }

  // Show button if can install or is iOS
  if (!canInstall && !isIOS) {
    return null;
  }

  return (
    <Button 
      onClick={handleInstallClick}
      variant={variant}
      size={size}
      className={`${className} flex items-center gap-2`}
    >
      {isIOS ? (
        <Smartphone className="w-4 h-4" />
      ) : (
        <Download className="w-4 h-4" />
      )}
      {isIOS 
        ? t('pwa.installTitleIOS', 'Install App')
        : t('pwa.install', 'Install App')
      }
    </Button>
  );
}
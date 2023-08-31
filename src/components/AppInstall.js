import { useEffect, useState } from "react";

export default function AppInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [appInstalled, setAppInstalled] = useState(false);

  const installApp = async () => {
    if (deferredPrompt !== null) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setAppInstalled(true);
        setDeferredPrompt(null);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      setDeferredPrompt(e);
    });

    if (window.navigator.standalone) {
      setAppInstalled(true);
    } else if (window.matchMedia("(display-mode: standalone)").matches) {
      setAppInstalled(true);
    }
  }, []);

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setAppInstalled(true);
    }
  }, []);

  return (
    <>
      {appInstalled ? null : (
        <button
          className="my-3 pr-7 pl-5 py-3  border border-gray-900 bg-slate-600 rounded-full "
          onClick={installApp}
        >
          Install App
        </button>
      )}
    </>
  );
}

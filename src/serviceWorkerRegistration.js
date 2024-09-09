export default function LocalServiceWorkerRegister() {
    const swPath = `${process.env.PUBLIC_URL}/OneSignalSDKWorker.js`;
    if ('serviceWorker' in navigator ) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register(swPath).then(registration => {
          console.log('Service worker registered');
        });

        navigator.serviceWorker.ready.then(registration => {
            console.log('Service worker ready');
          });

      });

    }
  }
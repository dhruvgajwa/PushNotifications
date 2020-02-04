importScripts('https://www.gstatic.com/firebasejs/7.5.0/firebase-app.js');

importScripts('https://www.gstatic.com/firebasejs/7.5.0/firebase-messaging.js');

firebase.initializeApp({
    messagingSenderId: '980001533855',
});

const messaging = firebase.messaging();
//messaging.usePublicVapidKey('BGwyb-vLKVEJ1lAcyBGMhBb9cR_eHhNIINifWZ095-8qd9lczeJOv8B3a4G2nsJ57mB43nGAgvD3ZO8RJfDbW64');
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../firebase-messaging-sw.js')
    .then(function(registration) {
      console.log('Registration successful, scope is:', registration.scope);
    }).catch(function(err) {
      console.log('Service worker registration failed, error:', err);
    });
  }
  self.addEventListener('notificationclick', function(event) {
    let url = 'https://gmail.com';
    event.notification.close(); // Android needs explicit close.
    event.waitUntil(
        clients.matchAll({type: 'window'}).then( windowClients => {
            // Check if there is already a window/tab open with the target URL
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                // If so, just focus it.
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            // If not, then open the target URL in a new window/tab.
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});
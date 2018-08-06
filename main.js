// check for sw support
if('serviceWorker' in window.navigator){
  window.navigator.serviceWorker
    .register('sw_cached_site.js')
    .then(reg => {
      console.log(`Service Worker registered!`);
    })
    .catch(e => {
      console.log(`Error registering sw: ${e}`);
    });
}

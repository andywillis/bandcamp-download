(function () {

  function getCurrentTab() {
    return browser.tabs.query({ currentWindow: true, active: true });
  }

  function onCreated() {
    if (browser.runtime.lastError) {
      console.log(`Error: ${browser.runtime.lastError}`);
    } else {
      console.log('Item created successfully');
    }
  }

  function downloadMedia(menuInfo) {
    getCurrentTab().then(function (tabInfo) {
      browser.tabs.sendMessage(tabInfo[0].id, { type: menuInfo.menuItemId });
    });
  }

  browser.menus.create({
    id: 'bandcamp',
    title: 'Bandcamp',
    contexts: ['all'],
    documentUrlPatterns: ['*://*.bandcamp.com/*'],
    onclick: downloadMedia
  }, onCreated);

}());

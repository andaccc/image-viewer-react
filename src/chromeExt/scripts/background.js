/**
 *  reference from: 
 * https://github.com/sblask/webextension-enhanced-image-viewer/blob/main/background.js
 * https://blog.logrocket.com/creating-chrome-extension-react-typescript/ 
 * https://github.com/sblask/webextension-enhanced-image-viewer
 * 
 * How to open image with image viwer?
 * - Override image tab?
 *  - how to load image?
 * - add context option to open image?
 * 
*/

chrome.webNavigation.onCommitted.addListener(tabMonitor);

function tabMonitor(details) {
  const IMAGE_REGEX = /\.(jpg|jpeg|png)(?:\?|$)/

  if ( details.url.match(IMAGE_REGEX) ) {
    openImageViewer(details.tabId)

  }
}


function openImageViewer(tabId) {
  console.log(tabId)
  // https://developer.mozilla.org/ja/docs/Mozilla/Add-ons/WebExtensions/API/tabs
  /**
   * TODO:
   * how to override tab
   * and run image viewer + load image to viewer?...
   * 
   * override and inject html content to tab?
   * 
   */


  /* 
  chrome.tabs.executeScript(
    tabId,
    {
      file: "bundle.js",
      runAt: "document_start",
    }
  )*/
  //chrome.tabs.create({url: 'index.html'}) 
  //chrome.tabs.update(tabId, {url: 'index.html'}) 
}
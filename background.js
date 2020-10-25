// chrome.tabs.query(
//  {
//   lastFocusedWindow: true,
//   active: true
//  },
//  function (tabs)
//  {
//   // tabs probably has only one item.
//   console.log(tabs);
//   // Do stuff with tabs.
//  });
chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.active) {
    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    }, function(tabs) {
        // and use that tab to fill in out title and url
        var tab = tabs[0];
        console.log(tab.url);
        // alert(tab.url);
        chrome.tabs.sendMessage(tabId, {parameter: tab});
    });
    $(function() {
      $.getJSON("https://api.ipify.org?format=jsonp&callback=?",
        function(json) {
          console.log("My public IP address is: ", json.ip);
        }
      );
    });
  }
})

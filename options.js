function save_options() {
  var api_key = document.getElementById('apikey').value;

  chrome.storage.sync.set({
    apiKey: api_key,
  }, function() {
    var button = document.getElementById('save');
    button.style.backgroundColor = 'green';
  });
}

function restore_options() {
  chrome.storage.sync.get({
    apiKey: '',

  }, function(items) {
    document.getElementById('apikey').value = items.apiKey;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);

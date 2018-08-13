var spoilers = "";
chrome.storage.sync.get('spoiler_list', function(data){
   spoilers = data.spoiler_list;
   alert(spoilers);
});	


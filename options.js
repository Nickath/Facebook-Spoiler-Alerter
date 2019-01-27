// Saves options to chrome.storage

let default_spoilers = [
     'Stark', 'Khaleesi', 'Targaryen', 'GOT', 'Game Of Thrones', 'Ned Stark', 'Tyrion', 'Lannisters'
]

function save_options() {
  var spoiler_list = document.getElementById('words').value;
   if(spoiler_list != 'undefined'){
	  var spoilers = spoiler_list.split(",");
   }
  chrome.storage.sync.set({
  spoiler_list: spoiler_list,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
  eraseTable();//in every change first erase the table and then add the contents
  createTableOfWords();
}




// Restores the set values stored in chrome.storage.
//if the spoiler_list is not found in the chrome storage, put the default, else, store the one that was previous stored
//if the user submits new data, store them
function restore_options() {

  chrome.storage.sync.get('spoiler_list', function(data){
       if(data == 'undefined' || data.spoiler_list.length == 0 ){
		  chrome.storage.sync.set({
          spoiler_list: default_spoilers,
       }, function(items) {
          document.getElementById('words').value = default_spoilers;

  });
	   }
	   else{
		  chrome.storage.sync.get("spoiler_list", function (data) {  
          document.getElementById('words').value = data.spoiler_list;
});
	   }
  });
  
  createTableOfWords();
  
  
  
}
document.addEventListener('DOMContentLoaded', restore_options);//call the restore_options when the page is rendered which has binded the already set values
document.getElementById('sbmtID').addEventListener('click',
    save_options);//onclick of the submit button call the save_options function

document.getElementById('eraseID').addEventListener('click',
    clearWords);



	

chrome.storage.sync.get('spoiler_list', function(data){
     if (typeof data.spoiler_list === 'undefined') {
         addDefaultOptions();
    }
});	
	

function addDefaultOptions(){
  chrome.storage.sync.set({
  spoiler_list: default_spoilers,
  }, function() {

  });
}



function createTableOfWords(){
	chrome.storage.sync.get('spoiler_list', function(data){
  var words = data.spoiler_list.split(",");
	var table = document.getElementById('wordTable');
	var arrayLength = words.length;
    for (var i = 0; i < arrayLength; i++) {
     var row = table.insertRow((i+1));
		 var cell = row.insertCell(0);
		 cell.innerHTML = (i+1) + ") "+words[i];
    }
});	
}

function eraseTable(){
	 var table = document.getElementById('wordTable');
     for(var i = table.rows.length; i > 1;i--)
     {
      table.deleteRow(i -1);
     }
}


function clearWords(){
  chrome.storage.sync.set({
    spoiler_list: '',
    }, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options cleared.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
    eraseTable();
    clearListLabel();
}

function clearListLabel(){
  document.getElementById('words').value = '';
}

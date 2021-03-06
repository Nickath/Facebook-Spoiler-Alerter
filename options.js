// Saves options to chrome.storage

let default_spoilers = []

function save_options() {
  chrome.storage.sync.get('spoiler_list', function(data){
    if (typeof data.spoiler_list === 'undefined') {
        
    }
    else{
      let isFirst = (data.spoiler_list == "");
      spoiler_list = data.spoiler_list
      if(spoiler_list == undefined || spoiler_list.length == 0){
        spoiler_list = "";
      }
      var spoiler_list_input = document.getElementById('words');
      var children = spoiler_list_input.children;
      var wordsArray = spoiler_list.split(',');
      for (var i = 0; i < children.length; i++) {
        var tableChild = children[i];
        if(wordsArray.includes(tableChild.innerHTML) || tableChild.innerHTML == ''){
          continue;
        }
        if(isFirst){
          if(i == children.length -1 ){
            spoiler_list += tableChild.innerHTML;
          }
          else{
            spoiler_list += tableChild.innerHTML +',';
          }
        }
        else{
          if(spoiler_list.slice(-1) != ','){
            if(i == children.length -1 ){
              spoiler_list += "," + tableChild.innerHTML;
            }
            else{
              spoiler_list += "," + tableChild.innerHTML +',';
            }
          }
          else{
            if(i == children.length -1 ){
              spoiler_list += tableChild.innerHTML;
            }
            else{
              spoiler_list += tableChild.innerHTML +',';
            }
          }
          
        }
      
      }
       // alert(spoiler_list);
      if(spoiler_list != 'undefined'){
        spoilers = spoiler_list.split(",");
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
});	




  

}

function createInputFields(){
  chrome.storage.sync.get('spoiler_list', function(data){
    if (typeof data.spoiler_list === 'undefined') {
        
   }
   else{
      var words = data.spoiler_list.split(",");
      words.forEach(word, i => {
        var inputElement = document.createElement("INPUT");
        inputElement.setAttribute("type", "text");
        inputElement.id = 'words' + i;
        inputElement.className = 'form-control';
        inputElement.placeholder = 'Enter words';
        inputElement.name = 'words';
        document.getElementById('formOfWords').appendChild(inputElement);
      });
   }
});	
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
    save_options);
    
    //onclick of the submit button call the save_options function
// document.getElementById('sbmtID').addEventListener('click',
//     createInputFields);
Array.prototype.forEach.call(
  document.querySelectorAll('[id^=deleteWord_]'), function(e) {
  e.addEventListener('click', removeCell);
});
document.getElementById('eraseID').addEventListener('click',
    clearWords);




	

chrome.storage.sync.get('spoiler_list', function(data){
     if (typeof data.spoiler_list === 'undefined') {
         addDefaultOptions();
    }
});	


function removeCell(){
  alert('removecell');
}
	

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
     row.id = 'row'+words[i];
     var cell = row.insertCell(0);
     var deleteCell = row.insertCell(1);
     deleteCell.id = 'delete'+words[i];
     cell.innerHTML = (i+1) + ") "+words[i];
     deleteCell.innerHTML = '<span id="deleteWord_'+words[i]+'"> delete </span>';
     deleteCell.addEventListener("click", function(){
       let valueToBeDeleted = this.id.substring("delete".length, this.id.length);
       removeWord(valueToBeDeleted);
    });
    }
});	
}

function removeWord(wordName){
  let newList = "";
  chrome.storage.sync.get('spoiler_list', function(data){
    let  words = data.spoiler_list.split(",");
    let  positionOfWordInArray = isInArray(wordName, words);
    if(positionOfWordInArray != -1){
      words.splice(positionOfWordInArray, 1);
      newList = words.join();
      
    }
  });	

  setTimeout(function() {
    status.textContent = '';
    chrome.storage.sync.set({
      spoiler_list: newList,
      }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
          status.textContent = '';
        }, 250);
      });
      eraseTable();//in every change first erase the table and then add the contents
      createTableOfWords();
  }, 250);

  
  

}

function isInArray(value, array) {
  return array.indexOf(value);
}

function eraseTable(){
     var table = document.getElementById('wordTable');
     for(var i = table.rows.length; i > 1; i--)
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
  document.getElementById('words').innerHTML = '';
}

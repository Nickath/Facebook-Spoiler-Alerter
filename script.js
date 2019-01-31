
let spoilers = [
     'μας','Καληνύχτα','Stark', 'Khaleesi', 'Targaryen', 'GOT', 'Game Of Thrones', 'Ned Stark', 'Tyrion', 'Lannisters','smartest','AEK', '1821', 'πρωτάθλημα', 'Offside', 'αγώνας'
]
let spoilersRegex;

//store to the spoilers table the value from chrome.storage
chrome.storage.sync.get('spoiler_list', function(data){
   if(data.spoiler_list != null && data.spoiler_list != ''){
	  spoilers = data.spoiler_list.split(','); //convert the spoiler_list to array and assign it to the 
   }
   else{
	   //else apply the default spoilers in the upper array
   }
});	

function updateSpoilerList(){
	//store to the spoilers table the value from chrome.storage
chrome.storage.sync.get('spoiler_list', function(data){
	if(data.spoiler_list != null && data.spoiler_list != ''){
	   spoilers = data.spoiler_list.split(','); //convert the spoiler_list to array and assign it to the 
	}
	else{
		//else apply the default spoilers in the upper array
	}
 });	
}



  spoilersRegex = new RegExp(spoilers.join('|'),'i') /* creation of incase sensitive regex of the spoilers array */

  /* while the element does not include the classname userContentWrapper 
  assign element to parentNode */
  function closest(element, className){
	  while(!element.className.includes(className)){
		  element = element.parentNode
	  }
	  return element;
  }


  function findEmbeddedLinks(){
	  //var matches = elementsFB.querySelectorAll("A"); //to query by element tag
	 var parentOfLinksCollection = document.getElementsByClassName("_3ekx _29_4");
	 var arrayOfCollectionLinks = Array.from(parentOfLinksCollection);

	 var links = arrayOfCollectionLinks[0].querySelectorAll("A");
	 for (var index = 0; index < links.length; index++) {
		//alert(links[index]);
		console.log(links[index]);
		var linkResponse = httpGet(links[index]);
		alert('Link response is ' + linkResponse);
	}
  }

  function httpGet(theUrl)
  {
	  var xmlHttp = new XMLHttpRequest();
	  xmlHttp.open( "GET", theUrl, true ); // false for synchronous request
	  xmlHttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	  xmlHttp.send( null );
	  xmlHttp.onload = function() {
		console.log(xmlHttp.responseText);
	  };
	  return xmlHttp.responseText;
  }


  
  function blockSpoil() {

	 
	  /* the div class of every facebook post*/
     const elementsFB = ['.userContent']
     /* get all divs containing the class .userContent */
	 const elements = document.querySelectorAll(elementsFB)

	 /* iterate through the elements that contain text from the spoilersRegex*/
     elements.forEach(function(element){
		 if(!element.classList.contains('spoiled') && element.innerText.match(spoilersRegex) !== null) {
			 console.log(element)
			 //var matches = myBox.querySelectorAll("p"); to query by element tag
			
			 /* to close all the div call the closest function*/
			 let parentElement =  closest(element,'userContentWrapper')
			 const originalPost = parentElement;
			 element.classList.add('spoiled') /* adds to the div element the class .spoiled */

			 /*span creation with text and style*/
			 const newElement = document.createElement('span')
			 newElement.innerText = 'Ooops! Game of thrones Spoiler Alert (click here to open)'
			 newElement.style = 'font-size: 30px;'
			 const originalPostWithReHide = parentElement;
			 originalPostWithReHide.innerHTML = parentElement.innerHTML + "<strong> <span style='font-size: 25px;'>      Hide the spoil again</span>       </strong>"
			 /*replace the div of the spoil post with the upper span */
			 parentElement.replaceWith(newElement)

			 /* when the click button is hit on the span, replace the span with the original post*/
			 newElement.addEventListener('click', function(event) {
				 event.target.replaceWith(originalPostWithReHide) //replace the 'Oops div with the original post and a span to re-hide
			 })
			 
			 /* hide again the div and put the newElement (spoil span)*/
			  originalPostWithReHide.addEventListener('click', function(event) {
				 originalPostWithReHide.replaceWith(newElement);
			 })
			 
		
		 }
	 })

}

   /*Execute a JavaScript immediately after a page has been loaded: */
   window.onload = function() {
	   spoilersRegex = new RegExp(spoilers.join('|'),'i') /* creation of incase sensitive regex of the spoilers array */
	   //find spoiled links
	   findEmbeddedLinks();

	   blockSpoil()
	   /* in order to call the function when scrolling event is happening again*/
	   window.addEventListener('scroll',blockSpoil)
   }
   
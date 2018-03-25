

const spoilers = [
     'Καληνύχτα','Stark', 'Khaleesi', 'Targaryen', 'GOT', 'Game Of Thrones', 'Ned Stark', 'Tyrion', 'Lannisters','smartest','AEK', '1821', 'πρωτάθλημα'
]

const spoilersRegex = new RegExp(spoilers.join('|'),'i') /* creation of incase sensitive regex of the spoilers array */
  /* while the element does not include the classname userContentWrapper 
  assign element to parentNode */
  function closest(element, className){
	  while(!element.className.includes(className)){
		  element = element.parentNode
	  }
	  return element;
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
			 
			 /* to close all the div call the closest function*/
			 let parentElement =  closest(element,'userContentWrapper')
			 
			 element.classList.add('spoiled') /* adds to the div element the class .spoiled */

			 /*span creation with text and style*/
			 const newElement = document.createElement('span')
			 newElement.innerText = 'Ooops! Game of thrones Spoiler Alert (clicke here to open)'
			 newElement.style = 'font-size: 30px;'
			 
			 
			 /*replace the div of the spoil with the upper span */
			 parentElement.replaceWith(newElement)
			 const reShow = parentElement /* assign the parentElement to reShow const p*/
			 
			 /* when the click button is hit on the span, replace the span with the original post*/
			 newElement.addEventListener('click', function(event) {
				 reShow.innerHTML += "<strong> <span style='font-size: 25px;'>       Hide the spoil again</span>       </strong>"
				 event.target.replaceWith(reShow)
			 })
			 
			 /* hide again the div and put the newElement (spoil span)*/
			  reShow.addEventListener('click', function(event) {
				 event.target.replaceWith(newElement)
			 })
			 
		
		 }
	 })

}
   /*Execute a JavaScript immediately after a page has been loaded: */
   window.onload = function() {
	   blockSpoil()
	   /* in order to call the function when scrolling event is happening again*/
	   window.addEventListener('scroll',blockSpoil)
   }
   
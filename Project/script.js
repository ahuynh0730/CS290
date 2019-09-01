//Author: Anthony Huynh



//function that will take a string and a list, then the function will add the string to that list
function addToList(list, string){
	var newItem = document.createElement("li");
	var newText = document.createTextNode(string);
	newItem.appendChild(newText);
	list.appendChild(newItem);
}

//function that will describe rules of 8 ball
function describe8Ball(){
	document.getElementById("rulesList").innerHTML = "";
	var list = document.getElementById("rulesList");
	addToList(list, "Eight-ball is played with cue sticks and 16 balls: a cue ball, and 15 object balls consisting of seven striped balls, seven solid-colored balls and the black 8 ball.");
	addToList(list, "After the balls are scattered with a break shot, the players are assigned either the group of solid balls or the stripes once a ball from a particular group is legally pocketed.");
	addToList(list, "The ultimate object of the game is to legally pocket the eight ball in a called pocket, which can only be done after all of the balls from a player's assigned group have been cleared from the table.");
	var link = document.createElement("a");
	var linkText = document.createTextNode("Link to 8-Ball Rules")
	link.appendChild(linkText);
	link.href = "https://en.wikipedia.org/wiki/Eight-ball";
	list.appendChild(link);
}


//function that will display rules of Cut Throat
function describeCutThroat(){
	document.getElementById("rulesList").innerHTML = "";
	var list = document.getElementById("rulesList");
	addToList(list, "Cutthroat or cut-throat is a typically three-player or team pocket billiards game, played on a pool table, with a full standard set of pool balls (15 numbered object balls and a cue ball); the game cannot be played with three or more players with an unnumbered reds-and-yellows ball set, as used in blackball.");
	addToList(list, "Each player is commonly assigned a set of five consecutively numbered object balls, though the number of balls will vary by number of players."); 
	addToList(list, "The object of the game is to be the last player with at least one ball of their group remaining on the table.");
	var link = document.createElement("a");
	var linkText = document.createTextNode("Link to Cutthroat Rules")
	link.appendChild(linkText);
	link.href = "https://en.wikipedia.org/wiki/Cutthroat_(pool)";
	list.appendChild(link);
}

document.getElementById("8BallButton").addEventListener("click", describe8Ball);
document.getElementById("cutThroatButton").addEventListener("click", describeCutThroat);


//code for a carousel obtained from w3schools
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
	showSlides(slideIndex += n);
}

function currentSlide(n) {
	showSlides(slideIndex = n);
}

function showSlides(n) {
	var i;
	var slides = document.getElementsByClassName("mySlides");
	var dots = document.getElementsByClassName("dot");
	if (n > slides.length) {slideIndex = 1}    
	if (n < 1) {slideIndex = slides.length}
	for (i = 0; i < slides.length; i++) {
	  slides[i].style.display = "none";  
	}
	for (i = 0; i < dots.length; i++) {
	  dots[i].className = dots[i].className.replace(" active", "");
	}
	slides[slideIndex-1].style.display = "block";  
	dots[slideIndex-1].className += " active";
}



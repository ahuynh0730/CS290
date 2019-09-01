var apiKey = "(insert personal key here)";

document.addEventListener("DOMContentLoaded", bindButtons);

function bindButtons(){
	//when the submit button for the weather is clicked
	document.getElementById("submitButton").addEventListener("click", function(event){
		
		
		var request = new XMLHttpRequest();
		var linkSuffix;
		//will check for zip code first
		if (document.getElementById("zip").value != ""){
			linkSuffix = "zip=" + document.getElementById("zip").value + ",us";
		}
		else {
			//will alert user if both fields are empty
			if (document.getElementById("city").value == ""){
				alert("Both the zip code and the city were empty!");
				return;
			}
			else{
				linkSuffix = "q=" + document.getElementById("city").value;
			}				
		}
		
		
		request.open("GET", "http://api.openweathermap.org/data/2.5/weather?" + linkSuffix + apiKey + "&units=imperial", true);
		
		request.addEventListener("load", function() {
            if (request.status >= 200 && request.status < 400) {
                var response = JSON.parse(request.responseText);
                console.log(response);
				var output = document.getElementById("output");
				addToPage(output, response);
            }
        });
		
		request.send(null);
		event.preventDefault();
	})
	
	//when the submit button for the post input is clicked
	document.getElementById("postSubmit").addEventListener("click", function(event){
		var request = new XMLHttpRequest();
		var postInputText = document.getElementById("postInput").value;
		request.open("POST", "http://httpbin.org/post", true);
		request.setRequestHeader("Content-Type", "application/json");
		request.send(JSON.stringify(postInputText));
		request.addEventListener("load", function(){
			var response = JSON.parse(request.response);
			document.getElementById("postOutput").textContent = JSON.parse(response.data);
			
		});
		event.preventDefault();
	})
}

//will add a div to html document unless response is an object, then will recursively call itself until it is a string
function addToPage(tagName, response){
	for (x in response){
		if (typeof response[x] == "object"){
			addToPage(tagName, response[x]);
		}
		else{
			var addMe = document.createElement("div");
			var textToAdd = document.createTextNode(x + ": " + response[x]);
			addMe.appendChild(textToAdd);
			tagName.appendChild(addMe);
		}
	}
}


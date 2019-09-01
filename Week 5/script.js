//call function with number of columns and number of rows
function createTable(numberColumns, numberRows){
	
	var body = document.getElementsByTagName("body")[0];
	
	//creates table
	var table = document.createElement("table");
	var tableBody = document.createElement("tbody");

	//creates each row
	for (var i = 0; i < numberRows; i++){
		var row = document.createElement("tr");
		
		//if j is 0, will create header, otherwise create rows
		for (var j = 0; j < numberColumns; j++){
			if (i == 0){
				var cell = document.createElement("th");
				var cellText = document.createTextNode("Header " + (i+1));
			}
			else {
				var cell = document.createElement("td");
				var cellText = document.createTextNode(i + ", " + (j+1));
			}
			cell.appendChild(cellText);
			row.appendChild(cell);
		}
		tableBody.appendChild(row); 
	}
	
	table.appendChild(tableBody);
	table.setAttribute("border", "1");
	body.appendChild(table);
}

//function to create buttons, call with what button will do
function createButton(action){
	var buttonAction = document.createElement("button");
	var buttonText = document.createTextNode(action);
	buttonAction.id = action;
	buttonAction.appendChild(buttonText);
	document.body.appendChild(buttonAction);
	
}

//function that will move up
function moveUp(){
	if (currentPosition >= 0 && currentPosition <= 3){
		return;
	}
	else{
		currentPosition -= 4;
		current.style.borderWidth = "1px";
		current = document.getElementsByTagName("td")[currentPosition];
		current.style.borderWidth = "5px";
	}
}

//function that will move down
function moveDown(){
	if (currentPosition >= 8 && currentPosition <= 11){
		return;
	}
	else{
		currentPosition += 4;
		current.style.borderWidth = "1px";
		current = document.getElementsByTagName("td")[currentPosition];
		current.style.borderWidth = "5px";
	}
}

//function that will move left
function moveLeft(){
	if (currentPosition % 4 == 0){
		return;
	}
	else{
		currentPosition -= 1;
		current.style.borderWidth = "1px";
		current = document.getElementsByTagName("td")[currentPosition];
		current.style.borderWidth = "5px";
	}
}

//function that will move right
function moveRight(){
	if (currentPosition % 4 == 3){
		return;
	}
	else{
		currentPosition += 1;
		current.style.borderWidth = "1px";
		current = document.getElementsByTagName("td")[currentPosition];
		current.style.borderWidth = "5px";
	}
}

//
function markCell(){
	current.style.backgroundColor= "yellow";
}
createTable(4, 4);
createButton("UP");
createButton("DOWN");
createButton("LEFT");
createButton("RIGHT");
createButton("MARK CELL");

var current = document.getElementsByTagName("td")[0];
var currentPosition = 0;
current.style.borderWidth = "5px";
document.getElementById("UP").addEventListener("click", moveUp);
document.getElementById("DOWN").addEventListener("click", moveDown);
document.getElementById("LEFT").addEventListener("click", moveLeft);
document.getElementById("RIGHT").addEventListener("click", moveRight);
document.getElementById("MARK CELL").addEventListener("click", markCell);




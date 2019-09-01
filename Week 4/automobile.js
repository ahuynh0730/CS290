function Automobile( year, make, model, type ){
    this.year = year; //integer (ex. 2001, 1995)
    this.make = make; //string (ex. Honda, Ford)
    this.model = model; //string (ex. Accord, Focus)
    this.type = type; //string (ex. Pickup, SUV)
}

var automobiles = [ 
    new Automobile(1995, "Honda", "Accord", "Sedan"),
    new Automobile(1990, "Ford", "F-150", "Pickup"),
    new Automobile(2000, "GMC", "Tahoe", "SUV"),
    new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
    new Automobile(2005, "Lotus", "Elise", "Roadster"),
    new Automobile(2008, "Subaru", "Outback", "Wagon")
];

/*This function sorts arrays using an arbitrary comparator. You pass it a comparator and an array of objects appropriate for that comparator and it will return a new array which is sorted with the largest object in index 0 and the smallest in the last index*/
function sortArr( comparator, array ){
	for (var i = 0; i<array.length; i++){
		for (var j=0; j<array.length; j++){
			if (comparator(array[i], array[j])){
				var temp = array[i];
				array[i] = array[j];
				array[j] = temp;
			}	
  		}
	}
}


/*This compares two automobiles based on their year. Newer cars are "greater" than older cars.*/
function yearComparator( auto1, auto2){
    if (auto1.year > auto2.year)
    	return true;
    return false;
}

/*This compares two automobiles based on their make. It should be case insensitive and makes which are alphabetically earlier in the alphabet are "greater" than ones that come later.*/
function makeComparator( auto1, auto2){
	if (auto1.make < auto2.make)
  	return true;
  return false;
}

/*This compares two automobiles based on their type. The ordering from "greatest" to "least" is as follows: roadster, pickup, suv, wagon, (types not otherwise listed). It should be case insensitive. If two cars are of equal type then the newest one by model year should be considered "greater".*/
function typeComparator( auto1, auto2){
	var type1;
  var type2;
	//switch statement that will assign type1 and type2 to an integer and compare integers
	switch (auto1.type.toLowerCase()){
		case "roadster":
			type1 = 0;
			break;
		case "pickup":
			type1 = 1;
			break;
		case "suv":
			type1 = 2;
			break;
		case "wagon":
			type1 = 3;
			break;
		default:
			type1 = 4;
			break;
	}

 	switch (auto2.type.toLowerCase()){
    case "roadster":
    	type2 = 0;
      break;
    case "pickup":
    	type2 = 1;
      break;
    case "suv":
    	type2 = 2;
      break;
    case "wagon":
    	type2 = 3;
      break;
    default:
    	type2 = 4;
      break;
  }
  if (type1 < type2)
  	return true;
  else if (type1 == type2)
  	return !yearComparator(auto1.year, auto2.year);
  return false;
}

/*Your program should output the following to the console.log, including the opening and closing 5 stars. All values in parenthesis should be replaced with appropriate values. Each line is a seperate call to console.log.

Each line representing a car should be produced via a logMe function. This function should be added to the Automobile class and accept a single boolean argument. If the argument is 'true' then it prints "year make model type" with the year, make, model and type being the values appropriate for the automobile. If the argument is 'false' then the type is ommited and just the "year make model" is logged.
*/
Automobile.prototype.logMe = function( boolArg){
	var carInfo = this.year + " " + this.make + " " + this.model;
  if (boolArg)
  {
  	carInfo += " " + this.type;
  }
  console.log(carInfo);
};



console.log("*****\n");
console.log("The cars sorted by year are:\n");
sortArr(yearComparator, automobiles);
for (var i = 0; i<automobiles.length; i++){
	automobiles[i].logMe(0);
}

console.log("\n");
console.log("The cars sorted by make are:\n");
sortArr(makeComparator, automobiles);
for (var i = 0; i<automobiles.length; i++){
	automobiles[i].logMe(0);
}

console.log("\n");
console.log("The cars sorted by type are:\n");
sortArr(typeComparator, automobiles);
for (var i = 0; i<automobiles.length; i++){
	automobiles[i].logMe(1);
}

console.log("*****\n");





//Author: Anthony Huynh

var express = require("express");      
var app = express();         
var bodyParser = require("body-parser"); 
var handlebars = require("express-handlebars").create({defaultLayout: "main"});
var mysql = require("mysql");

var pool = mysql.createPool({                   
    host: "classmysql.engr.oregonstate.edu",         
    user: "cs340_huynhant",
    password: "Affton2012",                         
    database: "cs340_huynhant"
});


app.engine("handlebars", handlebars.engine);        
app.set("view engine", "handlebars");
app.set("port", 8201);                             
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static("public"));





//A function that allows us to completely reset the table by visiting the url (given to us)
app.get('/reset-table',function(req,res,next){                  
    var context = {};
    pool.query("DROP TABLE IF EXISTS workouts", function(err){
        var createString = "CREATE TABLE workouts("+
        "id INT PRIMARY KEY AUTO_INCREMENT,"+
        "name VARCHAR(255) NOT NULL,"+
        "reps INT,"+
        "weight INT,"+
        "date DATE,"+
        "lbs BOOLEAN)";
        pool.query(createString, function(err){
            res.render('table',context);
        })
    });
});

//home page that will display table
app.get('/', function(req, res, next){
    var context = {};
    pool.query('SELECT * FROM workouts', function(err, rows, fields){      
    if(err){                                                                  
        next(err);
        return;
    }
    var params = [];                                
    for(var row in rows){
        var addItem = {'name': rows[row].name, 
                    'reps': rows[row].reps, 
                    'weight': rows[row].weight, 
                    'date':rows[row].date, 
                    'id':rows[row].id};
        if(rows[row].lbs){
            addItem.lbs = "lbs";
        }
        else{
            addItem.lbs = "kg";
        }
        params.push(addItem);                   
    }
    context.results = params;
    res.render('table', context);               
    })
});


//to insert new exercise
app.get('/insert',function(req,res,next){
  var context = {};
   pool.query("INSERT INTO `workouts` (`name`, `reps`, `weight`, `date`, `lbs`) VALUES (?, ?, ?, ?, ?)", 
    [req.query.exercise,               
    req.query.reps, 
    req.query.weight, 
    req.query.date, 
    req.query.unitCheck], 
    function(err, result){
        if(err){
          next(err);
          return;
        }         
        context.inserted = result.insertId;
        res.send(JSON.stringify(context));
  });
});

//to delete from table
app.get('/delete', function(req, res, next) {
    var context = {};    
    pool.query("DELETE FROM `workouts` WHERE id = ?",   
        [req.query.id], 
        function(err, result) {
            if(err){
                next(err);
                return;
            }
    });
});


//to update a row
app.get('/updateTable',function(req, res, next){
    var context = {};
    pool.query('SELECT * FROM `workouts` WHERE id=?',   
        [req.query.id], 
        function(err, rows, fields){
            if(err){
                next(err);
                return;
            }
            var param = [];

            for(var row in rows){                           
                var addItem = {'name': rows[row].name, 
                            'reps': rows[row].reps, 
                            'weight': rows[row].weight, 
                            'date':rows[row].date, 
                            'lbs':rows[row].lbs,
                            'id':rows[row].id};

                param.push(addItem);
            }

        context.results = param[0];                     
        res.render('updateTable', context);
    });
});


app.get('/updateReturn', function(req, res, next){
    var context = {};

    pool.query("SELECT * FROM `workouts` WHERE id=?", 
        [req.query.id], 
        function(err, result){
            if(err){
                next(err);
                return;
            }
            if(result.length == 1){                
                var current = result[0];

                
                if(req.query.unitCheck === "on"){
                    req.query.unitCheck = "1";
                }
                else{
                    req.query.unitCheck = "0";
                }

                pool.query('UPDATE `workouts` SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=?',  
                [req.query.exercise || current.name, 
                req.query.reps || current.reps, 
                req.query.weight || current.weight, 
                req.query.date || current.date, 
                req.query.unitCheck, 
                req.query.id],
                function(err, result){
                    if(err){
                        next(err);
                        return;
                    }

                    pool.query('SELECT * FROM `workouts`', function(err, rows, fields){     
                        if(err){
                            next(err);
                            return;
                        }
                        var param = [];

                        for(var row in rows){
                            var addItem = {'name': rows[row].name,      
                            'reps': rows[row].reps,
                            'weight': rows[row].weight, 
                            'date':rows[row].date, 
                            'id':rows[row].id};

                            if(rows[row].lbs){              
                                addItem.lbs = "lbs";
                            }
                            else{
                                addItem.lbs = "kg";
                            }
                            param.push(addItem);            
                        }

                        context.results = param;
                        res.render('table', context);        
                    });
                });
            }
    });
});






app.use(function(req, res){
	res.status(404);
	res.render("404");
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});


app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
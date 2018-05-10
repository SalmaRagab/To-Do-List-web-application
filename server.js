var express = require('express');
var fs = require('fs');
var app = express();
var path = require('path');
var myPort =8081;
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var dummyHTML =""+fs.readFileSync(__dirname + "/" + "2DoList.html")+"";
var tempHTML;
var request2 = require('request');
var data;

// to include all css and script
app.use(express.static(path.join( __dirname)));

// home page 
app.get('/', function (request, response) {
  console.log("\n****************************************\nthis is the home page");
  response.sendFile( __dirname + "/" + "HomePage.html");
  
})


app.post('/save_new_user',urlencodedParser, function (request, response) {
	 var savedData = fs.readFileSync("users.json");
	var objectData = JSON.parse(savedData);
	var counter= objectData.counter;
	var registerEmail = request.body.Email;		     
	var found = false;		     
	var i = 0;		
	while((i < objectData.counter) && (!found)){		
		if (objectData.users[i].email == registerEmail) {		
			console.log("The email already exists.")		
			found = true;	
			var tempHomePage = ""+fs.readFileSync(__dirname + "/" + "HomePage.html")+"";
			response.write("<script>alert('This E-mail already exists in the database, try entering another email!');</script>"+tempHomePage);		
			//response.redirect('http://localhost:8081');	
		}		
		i++;		
	}		
	if (!found) {
  console.log("\n****************************************\nsaving new user...");

	var newUserData = {
      "name":""+request.body.UserName+"",
      "email":""+request.body.Email+"",
      "password":""+request.body.Password+"",
      "html":""+dummyHTML+"",
      "no":""+counter+""
	}

	objectData.users[counter]=newUserData;
	objectData.no=counter;
	counter++;
	objectData.counter=""+counter+"";
	//tempHTML=objectData.users[counter-1].html;
	fs.writeFile(__dirname + "/" + "users.json",JSON.stringify(objectData));
	console.log("registered correctly");
	response.redirect('http://localhost:8081/redirect2DoList');
}

})


app.post('/login',urlencodedParser, function (request, response) {
	console.log("\n****************************************\nlogging in...");
	var savedData = fs.readFileSync("users.json");
	var objectData = JSON.parse(savedData);
	var counter = objectData.counter;
	var loginEmail = request.body.EmailLogin;
	var loginPassword = request.body.PasswordLogin;
	var found = false;
	var i = 0;
	var tempHomePage = ""+fs.readFileSync(__dirname + "/" + "HomePage.html")+"";
	while((i < objectData.counter) && (!found)){
		if (objectData.users[i].email == loginEmail) { //the email is correct
			console.log("The email is corret")
			found = true;
			if(objectData.users[i].password == loginPassword) {
				console.log("The password is correct :D ")
				 objectData.no=i;
				 fs.writeFile(__dirname + "/" + "users.json",JSON.stringify(objectData));
				 console.log("user"+objectData.no);
				 response.redirect('http://localhost:8081/redirect2DoList');
			} else {
				
				response.write("<script>alert('This password doesnot match the one saved in the database!');</script>"+tempHomePage);
			}
		}
		i++;
	}
	if(!found) {
		console.log("The email is incorrect!")
		response.write("<script>alert('The email you entered is not registered check it and try again or register!');</script>"+tempHomePage);

	}

})


app.get('/redirect2DoList', urlencodedParser,function (request, response) {
	var savedData = fs.readFileSync("users.json");
	var objectData = JSON.parse(savedData);
	var no=objectData.no;
	var tempHTML=objectData.users[no].html;
	var stringHomePage=""+tempHTML+""; 
	//response.write(tempHTML);
	fs.writeFile(__dirname + "/" + "tempHTML.html",stringHomePage);
	console.log("loaded 2DoList page ");
	response.sendFile( __dirname + "/" + "tempHTML.html");

})

app.post('/saveAction', urlencodedParser, function (request, response) {
    console.log("saving");
  	var temp ="<!DOCTYPE html><html>"+ request.body.dummy +"</html>";
  	fs.writeFile(__dirname + "/" + "tempHTML.html",temp);
	console.log("got it");
	//console.log(temp);
	var savedData = fs.readFileSync("users.json");
	var objectData = JSON.parse(savedData);
	var no=objectData.no;
	objectData.users[no].html=temp;
	fs.writeFile(__dirname + "/" + "users.json",JSON.stringify(objectData));
	//console.log(temp);
})




app.use(bodyParser.urlencoded({extended : true}));

app.post("/try", function(request, response) {

});













var server = app.listen(myPort, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("2Do list running at %s",port)
})


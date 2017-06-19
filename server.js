var bodyParser = require('body-parser')
var express = require('express')
var middleware = require('./controllers/middleware.js');
var mainCtrl = require('./controllers/mainCtrl.js');
var app = express();

app.use(bodyParser.json())
app.use(middleware.addHeaders)

app.get('/name', mainCtrl.getName)

app.get('/location', mainCtrl.getLocation)

app.get('/occupations', mainCtrl.getOccupations)
app.get('/occupations/latest', mainCtrl.latestOccupation)
app.get('/hobbies', mainCtrl.getHobbies)
app.get('/hobbies/:type', mainCtrl.getHobbyType)
app.get('/family', mainCtrl.getFamily)
app.get('/family/:gender', mainCtrl.getFamilyGender)
app.get('/restaurants', mainCtrl.getRestaurants)
app.get('/restaurants/:name', mainCtrl.getRestaurantName)
app.get('/skills', mainCtrl.getSkills)

app.put('/name', mainCtrl.putNewName)
app.put('/location', mainCtrl.putNewLocation)

app.post('/hobbies', mainCtrl.postNewHobby)
app.post('/occupations', mainCtrl.postNewOccupation)
app.post('/family', mainCtrl.postNewFamilyMember)
app.post('/restaurants', mainCtrl.postNewRestaurant)
app.post('/skills', mainCtrl.addSkillsID, mainCtrl.postSkills)

app.get('/secrets/:username/:pin', mainCtrl.getSecrets)





app.listen(3000, function(){
	console.log('Listening on port 3000')
})



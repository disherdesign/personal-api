var user = require('../user.js')
var skills = require('../skills.js')
var secrets = require('../secrets.js')




module.exports = {
	getName: function(req, res) {
		res.json({name:user.name})

	},
	getLocation: function(req, res) {
		res.json({location:user.name})
	},
	getOccupations: function(req, res) {

		if (req.query.order === "asc") {
			var order = user.occupations.sort();
			res.json(order);
		}
		else if (req.query.order === "desc") {
			var order = user.occupations.reverse();
			res.json(order);
		}
		else {
		res.json({occupations:user.occupations})
		}
	},
	latestOccupation: function(req, res) {
		res.json({latestOccupation:user.occupations.slice(0,1)})
	},
	getHobbies: function(req, res) {
		res.json({hobbies: user.hobbies})
	},
	getHobbyType: function(req, res) {
		var type = req.params.type;
		var filtered = user.hobbies.filter(function(hobbies) {
			return hobbies.type == type;
		});
		res.json(filtered);
	},
	getFamily: function(req,res) {
		res.json(user.family);
	},
	getFamilyGender: function(req, res) {
		var gender = req.params.gender;
		var filtered = user.family.filter(function(family) {
			return family.gender == gender;
		})
		res.json(filtered)
	},
	getRestaurants: function(req, res) {
		res.json(user.restaurants);
	},
	getRestaurantName: function(req, res) {
		var name = req.params.name;
		var filtered = user.restaraunts.filter(function(restaraunts){
			return restaraunts.name == name;
		})
		res.json(filtered);
	},

	putNewName : function (req, res, next) {
      user.name = req.body.name
      res.json(user.name)
    },

    putNewLocation : function(req, res, next) {
      user.location = req.body.location
      res.status(200).json(user.location)
    },

    postNewHobby : function(req, res, next) {
      var hobby = req.body
      user.hobbies.push(hobby)
      res.status(200).json(user.hobbies)
    },

    postNewOccupation : function(req, res, next) {
      var occupation = req.body
      user.occupations.push(occupation)
      res.status(200).json(user.occupations)
    },

    postNewFamilyMember : function(req, res, next) {
      var member = req.body
      user.family.push(member)
      res.status(200).json(user.family)
    },

    postNewRestaurant : function(req, res, next) {
      var restaurant = req.body
      user.restaurants.push(restaurant)
      res.status(200).json(user.restaurants)
    },

    getSkills : function(req, res, next) {
      if(req.query.experience){
        var experience = req.query.experience
        var filtered = skills.filter(function(skill){
          return skill.experience.toLowerCase() == experience
        })
        return res.status(200).json(filtered)
      } else {
        return res.status(200).json(skills)
      }
    },

    postSkills : function(req, res, next) {
      var newSkill = req.body
      skills.push(newSkill)  
      res.status(200).json(skills)
    },

    addSkillsID : function (req, res, next) {
    	var id = skills.length
    	req.body.id = id
    	next()
  	},
     getSecrets : function(req, res, next) {
      var username = req.params.username
      var id = parseInt(req.params.id)
      var filtered = secrets.filter(function(secret){
        return secret.username == username && secret.id == id
      })
      if (!filtered.length) {
        return res.status(401).json("Incorrect Password")
      }
      return res.status(200).json(filtered)
    }



}


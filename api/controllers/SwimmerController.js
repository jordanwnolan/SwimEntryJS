/**
 * SwimmerController
 *
 * @description :: Server-side logic for managing swimmers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  //TODO: override each function so that all queries are based on current coach.
	index: function(req, res) {
    Swimmer.find().exec(function(err, swimmers){
      res.json(swimmers);
    })
  }
};


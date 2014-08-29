/**
 * SwimmerController
 *
 * @description :: Server-side logic for managing swimmers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

 var meetHelper = require('../services/meetHelper');

module.exports = {
  //TODO: override each function so that all queries are based on current coach.
	index: function(req, res) {
    Swimmer.find().exec(function(err, swimmers){
      res.json(swimmers);
    })
  },

  entries: function(req, res) {
    meetHelper.getMeetOrMostRecentMeet(req.query.meetId, function(results){
      SwimEntry.find({meet: results.meet, swimmer: req.params['id']}).exec(function(err, swimmerEntries) {
        if (err) {
          res.json([]);
        } else {
          res.json(swimmerEntries);
        }
      })
    })
  }
};


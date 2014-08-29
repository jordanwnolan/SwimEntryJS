/**
 * SwimEntryController
 *
 * @description :: Server-side logic for managing Swimentries
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var meetHelper = require('../services/meetHelper');

module.exports = {
  //TODO: only get entries for current coach
  index: function(req, res) {
    meetHelper.getMeetOrMostRecentMeet(req.query.meetid, function(results) {
      console.log('results', results.meet);
      SwimEntry.find( { meet: results.meet } ).exec(function(err, entries){
        console.log(entries);
        res.json(entries);
      })
    })
  }
};


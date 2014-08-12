/**
 * CoachController
 *
 * @description :: Server-side logic for managing coaches
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var async = require('async');

function generateCoachAssociations(next) {
  async.auto({
    coach: function(done) {
      Coach.findOne({id: '53e3e5ce7fc5aa384bc4b6c4'}).populate('team').exec(done);
    },

    teamSwimmers: ['coach', function(done, results) {
      Team.findOne({id: results.coach.team.id}).populate('swimmers').exec(done);
    }],

    coachSwimmers: ['teamSwimmers', function(done, results) {
      var coach = results.coach;
      coach.swimmers = results.teamSwimmers.swimmers;
      return done(coach);
    }]
  }, function finished(err, results) {
    return next(results.coach);
  });
}
module.exports = {

  show: function(req, res) {
    generateCoachAssociations(function(coach){
      res.json(coach);
    })
  }
};
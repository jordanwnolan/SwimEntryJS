/**
 * MeetController
 *
 * @description :: Server-side logic for managing Meets
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var async = require('async');



function getMeetEntries(meetId, coachId, done) {

  async.auto({

    meet: function(done) {
      Meet.findOne({id: meetId}).exec(done);
    },

    team: function(done, results) {
      //get the current coach's team
      //TODO: add passport to auth coaches
      Team.findOne({coach: coachId}).populate('coach').populate('swimmers').exec(done);
    },

    entries: ['team', function(done, results){
      //get only the swimmer entires for this meet
      SwimEntry.find({meet: meetId, swimmer: _.pluck(results.team.swimmers, 'id')}).populate('swimEvent').exec(done);
    }],

    swimmerEntries: ['entries', function(done, results) {
      var swimmers = results.team.swimmers;
      var entries = results.entries;
      var mappedSwimmers;

      //iterator function for the mapping, takes a swimmer and puts the entries objects on the swimmer
      var mapSwimmer = function(swimmer, cb) {
        swimmer = swimmer.toObject();
        swimmer.swimEntries = [];
        var swimmerEntries;
        //iterator function for the filter
        var filterEntriesBySwimmer = function(entry, cb) {
          return cb(entry.swimmer === swimmer.id);
        }

        async.filter(entries, filterEntriesBySwimmer, function(filteredEntries) {
          filteredEntries.forEach(function(entry){
            swimmer.swimEntries.push(entry.toObject());
          });
        });

        cb(null, swimmer);
      }
      //map async as there can be a lot of swimmers
      async.map(swimmers, mapSwimmer, function(err, swimmersMapped){
        //reassign the swimmers in the results.team object
        swimmers = swimmersMapped;
        done(null, swimmers);
      })

      results.team.swimmers = swimmers;
      return done(null, swimmers);
    }],

    mappedMeet: ['swimmerEntries', function(done, results){
      //remove uneccesary queries from results object
      results = { meet: results.meet, team: results.team }
      return done(null, results);
    }]

  }, function(err, results){
    return done(results);
  }

  )
}
module.exports = {
  show: function(req, res) {
    Meet.findOne({id: req.params['id']}).populate('teams').exec( function(err, meet) {
      res.json(meet);
    });
  },

  meetEntries: function(req, res) {
    var meetId = req.params['id'];
    var coachId = '53e3e5ce7fc5aa384bc4b6c4';
    getMeetEntries(meetId, coachId, function(meet){
      //get the mapped meet object which has all swimmer entries mapped to a swimer
      res.json(meet.mappedMeet);
    })
  }
};


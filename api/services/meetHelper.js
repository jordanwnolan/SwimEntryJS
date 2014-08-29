var async = require('async');


module.exports = {
  getMeetOrMostRecentMeet: function(meetId, done) {
    async.auto({
      meet: function(done) {
        if (meetId) {
          return done(null, meetId);
        } else {
          Meet.find().sort('meetDate desc').limit(1).exec(function(err, meet){
            return done(null, meet[0].id);
          })
        }
      }
    },function(err, meetId) {
        return done(meetId);
      })
  }
}
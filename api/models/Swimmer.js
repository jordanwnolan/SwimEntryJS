/**
* Swimmer.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    firstName: {
      type: 'string',
      required: 'true'
    },
    lastName: {
      type: 'string',
      required: 'true'
    },
    gender: {
      type: 'integer',
      required: true
    },
    grade: {
      type: 'integer',
      required: true
    },
    birthDate: {
      type: 'date'
    },
    team: {
      model: 'team'
    },
    coach: {
      model: 'coach'
    },

    toJSON: function() {
      var obj = this.toObject();
      obj.gender = (obj.gender === 1 ? 'M' : 'F');
      return obj;
    }
  }
};


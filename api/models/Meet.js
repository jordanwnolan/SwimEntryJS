/**
* Meet.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    meetDate: {
      type: 'date',
      required: true
    },

    teams: {
      collection: 'team',
      via: 'meets',
      dominant: true
    }
  }
};


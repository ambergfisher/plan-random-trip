const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let City = new Schema({
    city: {
      type: String
    },
    city_ascii: {
      type: String
    },
    state_id: {
      type: String
    }
});

module.exports = mongoose.model('City', City);

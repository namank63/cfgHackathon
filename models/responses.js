const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  answers:[String]
});

module.exports = mongoose.model('Question', questionSchema);
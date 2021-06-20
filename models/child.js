const mongoose=require("mongoose");
const Schema = mongoose.Schema;

const childSchema = new Schema({
    name: {
      type:String,
      required:true
    },
    dob: {
      type:Date,
      required:true
    },
    bloodGroup: {
      type:String,
      required:true
    },
    sex: {
      type:String,
      required:true
    },
    relationship: {
      type:String,
      required:true
    },
    responses: [{
        type: Schema.Types.ObjectId,
        ref: 'Question'
    }]
});

module.exports = mongoose.model('Child', childSchema);
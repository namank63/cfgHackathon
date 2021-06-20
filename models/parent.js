const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const ParentSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    children: [{
        type: Schema.Types.ObjectId,
        ref: 'Child'
    }]
});

ParentSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Parent', ParentSchema);
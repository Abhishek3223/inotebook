const mongoose = require('mongoose');
const { Schema } = mongoose;
const notesSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user_obj'
    },
    title: {
        type: String,
        required: true
    }, // String is shorthand for {type: String}
    discription: {
        type: String,
        required: true,
    },
    tags: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },

});

module.exports = mongoose.model('notes_obj', notesSchema)
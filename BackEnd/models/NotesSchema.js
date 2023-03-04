import mongoose from 'mongoose';
const { Schema } = mongoose;
const titleschema = new Schema({
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

export default mongoose.model('notes', titleschema)
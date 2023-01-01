const monogoose = require('mongoose');

const Schema = monogoose.Schema;

const educationschema = new Schema({
    schoolName: {
        type: String,
        required:true
        
    },
    department: {
        type: String,
        required:true
        
    },
    dateFrom: {
        type: Date,
        required:true
        
    },
    dateTo: {
        type: Date,
        required:true
        
        
    }
}, { timestamps: true });

const Education = monogoose.model('Education', educationschema)

module.exports = Education;
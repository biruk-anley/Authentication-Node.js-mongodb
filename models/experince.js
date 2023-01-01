const monogoose = require('mongoose');

const Schema = monogoose.Schema;

const experienceSchema = new Schema({
    companyName: {
        type: String,
        required: true
    },
    jobRole: {
        type: String,
        reuired: true
    },
    dateFrom: {
        type:Date,
        required: true
    },
    dateTo: {
        type: Date,
        required:true
    }
}, { timestamps: true });

const Experience = monogoose.model('Experince', experienceSchema)

module.exports = Experience;
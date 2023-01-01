const monogoose = require('mongoose');

const Schema = monogoose.Schema;

const projectschema = new Schema({
    projectName: {
        type: String,
        required: true
    },
    projectImage: {
        type: String,
        reuired: true
    },
    projectCatagory: {
        type:String,
        required: true
    },
    projectLink: {
        type: String,
       
    }
}, { timestamps: true });

const Project = monogoose.model('Experince', projectschema)

module.exports = Project;
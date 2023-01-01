const monogoose = require('mongoose');

const Schema = monogoose.Schema;

const skillschema = new Schema({
    skillType: {
        type: String,
        required: true
    },
    skillName: {
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

const Skill = monogoose.model('Skill', skillschema)

module.exports = Skill;
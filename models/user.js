// the attribute

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'please enter valid email adress'],
        validate:[isEmail, 'You must enter valid email adress']
    },
    password: {
        type: String,
        required: [true, 'please enter valid password'],
        minlength: [6, 'please enter mininmum 8 character password']
    }

});

// checking login status
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user;
        }
       throw Error('Invalid password')
     }
    else {
        throw Error('Invalid email')
    }
}

// hashing a password using hook
userSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt();
    this.passwrod = await bcrypt.hash(this.password, salt);
    next();
});
const user = mongoose.model("user",userSchema);
module.exports = user;
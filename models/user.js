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
    const User = await this.findOne({ email });
    console.log('userrr',User)
    if (User) {
        console.log(password,User.password)
        const auth = await bcrypt.compare(password, User.password)
        console.log(auth)
        if (auth) {
            console.log('uuuuuser', User)
            return ({User});
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
    this.password = await bcrypt.hash(this.password, salt);
    console.log('nnnnnn',this.password)
    next();

});
const user = mongoose.model("user",userSchema);
module.exports = user;
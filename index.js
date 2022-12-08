const { response } = require('express');
const express = require('express')
// instantiate app
const app = express();

// importing monogoose
const mongoose = require('mongoose');
const user = require('./models/user.js');

// here we need to tell that we use ejs to render express
app.set('view engine', 'ejs');
// the middleware to change in json format
app.use(express.json())
// to know login and other static file by express
app.use(express.static(__dirname + '/public'))


// lets connect a model
const User = require('./models/user.js')
mongoose.connect('mongodb://127.0.0.1:27017/mylib',
    {
        useNewUrlParser: true,
        useUnifiedTopology:true
    }).then((result)=>{console.log('i am connected')}).catch((err)=>{console.error(err)})

app.get('/login', (req, res) => { 
    res.render('login')
});
app.get('/', (req, res) => {
    console.log('/ is running')

    res.render('register')
});

app.get('/register', (req, res) => {
    console.log('/ is registeer')

    res.render('index')
});

// posting a data to mongodb we make async since it takes a time
app.post('/signup', async (req, res) => {

    try {
        const User = await user.create({
        email: req.body.email,
        password: req.body.password
        });
        console.log(User)
         res.status(200).send({ User});
 
    } catch (err) {
        const error = {email:"", password:""}
        Object.values(err.errors).forEach((e) => {
            error[e.properties.path] = e.properties.message;
            
        });
       
        res.status(403).send({err:error})
    }
        
       
});

// handling post method for posting user data
// app.post('/signup', (req, res) => {
//     console.log(req.body)
// });


//////login//////



app.post('/login_post', async (req,res)=>
{
    const { email, password } = req.body;
    
    try {
        const User = await user.login(email, password);
        res.status(200).json(send({User}))
    }
    catch (err) {
        console.log(err.message);
        res.status(403).json(send({err:err.message}))
    }
})



app.listen(5000, () => { })


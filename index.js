const { response } = require('express');
const express = require('express')
// instantiate app
const app = express();


// importing monogoose
const mongoose = require('mongoose');
const user = require('./models/user.js');
const bodyparser = require('body-parser');
const encoding = bodyparser.urlencoded({extended:false})


// here we need to tell that we use ejs to render express
app.set('view engine', 'ejs');
// the middleware to change in json format
app.use(express.json())
// to know login and other static file by express
app.use(express.static(__dirname + '/public'))


// lets connect a model
const User = require('./models/user.js');
const Profile = require('./models/profile');
const Education = require('./models/education');
const Experience = require('./models/experince')
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

app.get('/add/education', (req, res) => {
    console.log('/ education is working')

    res.render('addeducation')
});

app.get('/register', async (req, res) => {
    console.log('/ is registeer')
    let profile = await Profile.find();
    profile=profile[0]
    console.log('meeeeeee', profile)


    res.render('index', { profile })
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
        console.log('password', password)
        const User = await user.login(email, password);
        console.log('login user', User)
        res.status(200).send({User})
    }
    catch (err) {
        console.log(err.message);
        res.status(403).json(send({ err:err.message }));
    }
})

//crud operation
app.post('/store/education',encoding, async(req, res) => {
    const { schoolName, department, dateFrom, dateTo } = req.body;
    try { 
        const educations = await Education.create({
            schoolName: schoolName,
            department: department,
            dateFrom: dateFrom,
            dateTo: dateTo
        });
       res.render('indext', {educations})
        
    }

    
    catch (e){
        console.error(e)
    }
    
})

app.get('/educations', async(req, res) => {
    const educations = await Education.find();
    console.log('oooooooo', educations)
    
    res.render('indext', {educations})
   
    
})

app.get('/edit/education/:id', async (req, res) => {
    const education = await Education.findById(req.params.id);
    res.render('editededucation', {education})
})

app.post('/update/education/:id', async (req, res) => {
    console.log(req.params.id)
    Education.findByIdAndUpdate(
        req.params.id,
        req.body,
        { runValidators: true },
        (err, doc) => {
            if (err) {
                console.log(err);
                res.redirect('back')
            }
            else {
                console.log(doc)
                res.redirect('back')
                res
            }
        }
    )
})



app.listen(5000, () => { })


const express = require('express')
// instantiate app
const app = express();

// importing monogoose
const mongoose = require('mongoose')

// here we need to tell that we use ejs to render express
app.set('view engine', 'ejs');
// to know login and other static file by express

app.use(express.static(__dirname+ '/public'))
mongoose.connect('mongodb://127.0.0.1:27017/mylib',
    {
        useNewUrlParser: true,
        useUnifiedTopology:true
    }).then((result)=>{console.log('i am connected')}).catch((err)=>{console.error(err)})


app.get('/', (req, res) => {
    console.log('/ is running')

    res.render('login')
})

app.listen(5000, () =>{})

const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const path = require('path');
const BodyParser = require('body-parser');
const app = express();
const Config = require('./config.json');
const Lists = require('./models/lists');
mongoose.connect(Config.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('open', ()=>{console.log(`DB connected to: ${mongoose.connection.host}`)});

app.use(helmet())
app.set('views', path.join(__dirname, 'veiws'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}))
app.use(express.json())
// get home page
app.get('/', async (req,res)=>{
    const list = await Lists.find()
    res.render('home',{
        list: list
    })
})
//Post the todo
app.post('/post', async (req,res)=>{
    console.log(req.body)
    const newLists = new Lists({
        task: req.body.task,
        done: false,
    })
    await newLists.save().then(res.redirect('/'));
    console.log('saved')
});
//get a task done
app.get('/donezo/:task', (req,res)=>{
    console.log(req.params.task)
    Lists.findOne({
        task: req.params.task
    }, async (err, todo)=>{
        todo.done = true
        await todo.save()
    })
    res.redirect('/')
})
app.get('/delete/:task', (req,res)=>{
    Lists.findOneAndDelete({
        task: req.params.task
    }, async (err, todo)=>{
        res.redirect('/')
    })
})
const port = 3000
app.listen(port, console.log(`app Started on ${port}`))
const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const Todo = require('./model/todos.js')
const bodyParser = require("body-parser");
const methodOverride = require('method-override'); 

/// middleware
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
app.use(methodOverride('_method'));
mongoose.connect('mongodb://localhost:27017/todos-app', {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: true})


// Index route
app.get('/', (req, res) =>{
    Todo.find({}, (error, allTodos) =>{
        res.render('Index', {
            todos: allTodos
        })
        })
    })

app.post('/', (req, res) =>{
    if(req.body.done === 'on'){
        req.body.done = true
    } else {
        req.body.done = false
    }
    Todo.create(req.body, (error, createdTodo)=>{
        res.redirect('/')
    })
})

// Seed route
app.get('/seed', (req, res) => {
     Todo.create([
         {
             name: 'go shopping',
             done: false
         },
         {
             name: 'do laundary',
             done: false
         }
     ], (error, data) =>{
         res.redirect('/')
     })
})


// delete
app.delete('/:id', (req, res) =>{
    Todo.findByIdAndRemove(req.params.id, (err, data) =>{
        res.redirect('/')
    })
})

app.listen(port, () => {
    console.log('listening on: ' + port);
});
const express =  require('express');
const methodOverride = require('method-override')
const app = express();
const path = require('path');
const { v4:uuid } = require('uuid');// For generating IDs

//To parse form data in POST request body:
app.use(express.urlencoded({ extended: true }))
// To parse incoming JSON in POST request body:
app.use(express.json())
// Views folder and EJS setup:
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(methodOverride('_method'))

// Our fake database:

let comments = [
    {
        id: uuid(),
        username: "dhananjayjaiswal16",
        text: "Me"
    },
    {
        id: uuid(),
        username: "marshneil_13",
        text: "Without a doubt"
    },

    {
        id: uuid(),
        username: "isshhoboii",
        text: "tehee"
    },
    {
        id: uuid(),
        username: "me_owliet",
        text: "meow meow"
    }

]
// **********************************
// INDEX - renders multiple comments
// **********************************
app.get('/comments', (req, res) => {
    res.render('comments/index', { comments });
})
// **********************************
// NEW - renders a form
// **********************************
app.get('/comments/new', (req,res)=>{
    res.render('comments/new',{comments});
})
// **********************************
// CREATE - creates a new comment
// **********************************
app.post('/comments',(req,res)=>{
    console.log(req.body);
    const {username, text} = req.body;
    comments.push({username, text, id:uuid() });
    res.redirect('/comments');
})
// *******************************************
// SHOW - details about one particular comment
// *******************************************
app.get('/comments/:id',(req,res)=>{
    const {id} = req.params;// this is a string
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment });
})
// *******************************************
// EDIT - renders a form to edit a comment
// *******************************************
app.get('/comments/:id/edit', (req,res)=>{
    const {id} = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment });
})
// *******************************************
// UPDATE - updates a particular comment
// *******************************************
app.patch('/comments/:id', (req,res)=>{
    const {id} = req.params;// this is a string
    const foundComment = comments.find(c => c.id === id);
    //get new text from req.body
    const newCommentText = req.body.text;
    //update the comment with the data from req.body:
    foundComment.text = newCommentText;
    //redirect back to index (or wherever you want)
    res.redirect('/comments')
})
// *******************************************
// DELETE/DESTROY- removes a single comment
// *******************************************
app.delete('/comments/:id', (req,res)=>{
    const {id} = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments')
})

app.get('/tacos', (req,res)=>{
    res.send('GET /tacos response');
})

app.post('/tacos', (req,res)=>{
    const {meat, qty} = req.body;
    res.send(`Here are your ${qty} ${meat} tacos`);
})

app.listen(3000, ()=>{
    console.log('LISTENING ON PORT 3000');
})

// GET /comments - list all comments
// POST /comments - create a new comment
// GET /comments/:id - get one comment (using ID)
// PATCH /comments/:id - update one comment
// DELETE /comments/:id - destroy one comment
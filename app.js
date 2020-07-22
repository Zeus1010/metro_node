var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const express = require('express')
const session = require ('express-session')
const bodyParser = require('body-parser')
const comment = require('./models/commentSchema');
const cors = require('cors');
var name
var email


const TWO_HOURS = 1000*60*60*2
const{
    PORT = 3000,
    SESS_LIFETIME = TWO_HOURS,
    SESS_NAME = 'sid',
    SESS_SECRET =  'secret'
} = process.env

const users = [
    {id:1,name:'a',email:'a@gmail.com',password:'s1'},
    {id:2,name:'b',email:'b@gmail.com',password:'s2'},
    {id:3,name:'c',email:'c@gmail.com',password:'s3'},
]

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


const connect = mongoose.connect('mongodb+srv://dbUser:password12345@cluster0.8jiyl.mongodb.net/metro?retryWrites=true&w=majority');

connect.then((db)=>{
  console.log('Connected correctly');
},(err)=>{ console.log(err); });


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
  extended:true 
}))

app.use(session({
    secret: "fd34s@!@dfa453f3DF#$D&W",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: !true }
}))

app.post('/login',(req,res)=>{
  const{email,name} = req.body
      this.name = name
      this.email = email
      res.end('Done')
})
app.get('/login',(req,res)=>{
  console.log(this.email);
  res.end(this.name);
})
app.post('/comments',(req,res)=>{
    const data = new comment ({
      commentTitle:req.body.title,
      content_good:req.body.content_good,
      content_bad:req.body.content_bad,
      author_name:this.name,
      company_name:this.email,
      rating:req.body.rating
    });
    data.save().then(result => {
      console.log(result);
      res.status(201).json({
        message: "Done upload!",
        product_created: {
          _id: result._id,
          name: result.product_name
        }
      })
    }).catch(err => {
      console.log(err),
        res.status(500).json({
          error: err
        });
    })
})
app.get('/comments',(req,res)=>{
  comment.find({})
  .then((result)=>{
      res.statusCode=200;
      console.log("Displayed successfully !!");
      res.setHeader('Content-Type','application/json');
      res.json(result);
  },(err)=>next(err))
  .catch((err)=>next(err))
})

app.post('/logout',(req,res)=>{
  req.session.destroy(err=>{
      if(err){
          return res.redirect('/home')
      }
      res.clearCookie(SESS_NAME)
      res.end('Done!!!')
  })
})

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

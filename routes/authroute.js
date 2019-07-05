var express = require('express');
var router = express.Router();
var User = require('../models/user')
const auth = require('../middleware/auth')

  


/* GET register page*/
  router.get('/register', auth ,(req, res, next)=>{
      res.render('auth/register');
  });
  

/* POST from register page*/
  router.post('/register', async (req, res, next)=> {
    const user = new User(req.body)
    try{
        if(req.body.isAdmin){
          user.isAdmin = true
        }
        await user.save()
        
        req.flash('success_msg', `${user.firstName} ${user.lastName} is saved successfully` )
        res.redirect('/register')
    }catch(e){
        res.status(400).send(e)
    } 
  });


  /* GET login page. */
  router.get('/login', function(req, res, next) {
    res.render('auth/login', { title: 'Express' });
  });

  router.post('/login', async (req, res)=> {
    
    try{

      const user = await User.findByCredentials(req.body.staffID, req.body.password)
      const token = await user.generateAuthToken()
       
      req.session.token = token
      res.redirect('/users')
      
      // ,{
        // firstName: req.query.valid.firstName,
        // lastName: req.query.valid.lastName,
        // token:req.query.valid.token
    
      // })
    }catch(e){
      res.status(400).send(e)
  }
    
  });


module.exports = router;
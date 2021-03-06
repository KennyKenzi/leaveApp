const jwt = require ('jsonwebtoken');
const User = require ('../models/user')

 
const auth = (async(req, res, next)=>{
   
    try{
        //const token = req.header('Authorization').replace('Bearer ', '')
        const token = req.session.token;
        const decoded = jwt.verify(token, 'thisismynewcourse');
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token});

        if(!user){
                throw new Error()         

        }else{
                    console.log('This is a user')
                    req.user = user
                    req.token = token
                    next()
                 
        }
      
    }catch(e){
        res.status(401)
        res.redirect('/login')
    }
    
    
})

const authadmin = (async(req, res, next)=>{
   
    try{
        //const token = req.header('Authorization').replace('Bearer ', '')
        const token = req.session.token;
        const decoded = jwt.verify(token, 'thisismynewcourse');
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token});

        if(!user.isAdmin){
                    
            req.flash('error_msg', `Not authorized` )
            res.status(401).redirect('/login')

        }else{     
                console.log('User is admin')
                req.user = user
                req.token = token
                next()
        }
      
    }catch(e){
        
        req.flash('error_msg', `Not authorized` )
        // res.status(401).send({error: 'Auth required'})
        res.status(401).redirect('/login')
    }
   
})


module.exports = {auth, authadmin}
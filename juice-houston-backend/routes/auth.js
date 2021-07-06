const express = require('express');
const {signup, signin } = require('../controllers/user');
const {getIndex} = require('../controllers/order');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../keys');
const UserController = require('../controllers/user');

router.get('/order', getIndex);

router.post('/signup', (req, res) => {

  User.findOne({email: req.body.email})
  .then(user => {
    if(user){
      return res.status(400).json({email: "email already exists"});
    }
    const newUser = new User({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
      password2: req.body.password2
    });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if(err) throw err;
        newUser.password = hash;
        newUser.save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
      });
    });
  });
});

router.post('/signin', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email})
    .then(user => {
      if(!user){
        return res.status(404).json({emailnotfound: "Email not found"});
       }
       bcrypt.compare(password, user.password)
       .then(isMatch => {
         if(isMatch){
           const payload = {
             user
           };
           jwt.sign(
             payload,
             keys.secretOrKey,
             {
               expiresIn: 31556926
             },
             (err, token) => {
               res.json({
                 success: true,
                 token: "Bearer: " + token
               });
             } 
           );
         } else {
           return res
           .status(400)
           .json({passwordincorrect: "Password incorrect"});
         }
       });
     });
 });

router.patch('/edit/:_id', (req, res) =>{
  console.log(req.params._id)
  User.findOneAndUpdate({_id: req.params._id}, {"$set":{"address": req.body.address,
        "zipcode": req.body.zipcode,
      "phone": req.body.phone}},{ returnNewDocument: true })
        .then(updatedDocument => {
        if(updatedDocument) {
          console.log(`Successfully updated document: ${updatedDocument}.`)
        } else {
          console.log("No document matches the provided query.")
        }
        return updatedDocument
      })
      .catch(err => console.error(`Failed to find and update document: ${err}`))
} )


router.get('/:email', (req, res) =>{
  console.log(req.body.email)
  User.findOne({email: req.body.email}, function(err, data){
    if(err){
       return res.status(500);
    } else {
       return res.status(200).send({user: JSON.stringify(data)})
    }
   });
} )
//UserController.editUser);

module.exports = router;
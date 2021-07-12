const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();

const users = require('./../model/users'); 

 

/**
 * @description This function will save the user
 * @param req{object} request data 
 */
router.post('/', async (req, res) => {  

  const { body:params} = req; 
  const newUser = new users({});


  console.log('--params---',params)

  newUser.firstName = params.firstName;
  newUser.lastName = params.lastName;
  newUser.email = params.email; 
  newUser.phonenumber = params.phonenumber; 
  newUser.subscribe = false;
  if(params.subscribe){
    newUser.subscribe = true;
  }
  

  // Encript the password to save in database
  if(params.password){
    const hashedPassword = bcrypt.hashSync(params.password, 8);    
    newUser.password = hashedPassword;
  } 

  console.log('--newUser---',newUser)
  const userRes = await newUser.save();

  if(!userRes ){
    res.send({
      status:1,
      message :'Unable to create user'
    });
  }

  let message = `Hello ${userRes.firstName} ${userRes.lastName}, Thank you for signing up. Your account is now created`
  if(userRes.subscribe){
    message = `Hello   ${userRes.firstName} ${userRes.lastName}, Thank you for signing up. Your account is now created. You would be receiving our periodic newsletters to your email: ${userRes.email}`;
  }

  res.send(message);
 
});

module.exports = router;

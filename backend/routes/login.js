const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const login = require('../models/student_model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

router.post('/', 
  function(request, response) {
    if(request.body.user_name && request.body.password){
      const user = request.body.user_name;
      const pass = request.body.password;
      
        login.checkPassword(user, function(dbError, dbResult) {
          if(dbError){
            response.json(dbError);
          }
          else{
            if (dbResult.length > 0) {
              bcrypt.compare(pass,dbResult[0].password, function(err,compareResult) {
                if(compareResult) {
                  console.log("succes");
                  const token = generateAccessToken({ user_name: user });
                  response.send(token);
                }
                else {
                    console.log("wrong password");
                    response.send(false);
                }			
              }
              );
            }
            else{
              console.log("user does not exists");
              response.send(false);
            }
          }
          }
        );
      }
    else{
      console.log("user_name or password missing");
      response.send(false);
    }
  }
);

function generateAccessToken(user_name) {
  dotenv.config();
  return jwt.sign(user_name, process.env.MY_TOKEN, { expiresIn: '1800s' });
}

module.exports=router;
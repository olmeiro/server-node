//para recuperar el intellisense
// const express = require('express');
const { response } = require("express");
const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {
  // const { name, email, password } = req.body;

  // if(name.length < 5){
  //   return res.status(400).json({
  //     ok:false,
  //     msg: 'name must have a least five letters'
  //   })
  // } //we used express-validator:

  //dealing errors:
  // const errors = validationResult(req);
  // // console.log(errors)
  // if (!errors.isEmpty()) {
  //   return res.json({
  //     ok: false,
  //     errors: errors.mapped(),
  //   });
  // }

  //using custom middleware:
  
  //now we use our UserSchema:

  const { name, email, password } = req.body;

  try {
    // const user = new User( req.body );

    //recording in DB mongo:
    // await user.save();

    //validations:
    let user = await User.findOne({email: email});
    // console.log(user)
    if (user) {
      return res.status(400).json({
        ok: false,
        msg: 'the user exist yet with that email.'
      })
    }

    user = new User( req.body );

    //encrypt pw:
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync( password, salt );

    await user.save();

    //Generate JWT:
    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
      // msg: "new user",
      // name,
      // email,
      // password,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "please talk with administer"
    })
  }

 
};

const loginUser = async(req, res = response) => {
  const { email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      ok: false,
      errors: errors.mapped(),
    });
  }

  try {
    const user = await User.findOne({ email });  //in BBDD
    if(!user){
      return res.status(400).json({
        ok:false,
        msg: 'The user doesnt exists with that email'
      });
    }

    //confirm passwords:
    const validPassword = bcrypt.compareSync( password, user.password );

    if( !validPassword ){
      return res.status(400).json({
        ok: false,
        msg: 'Incorrect password'
      });
    }

    //generate JwT
    const token = await generateJWT(user.id, user.name);

    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    })

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "please talk with administer"
    })
  }

  // res.status(201).json({
  //   ok: true,
  //   msg: "login",
  //   email,
  //   password,
  // });
};

const renewToken = async(req, res = response) => {

  const uid = req.uid;
  const name = req.name;

   //Generate JWT:
   const token = await generateJWT(uid, name);

  res.json({
    ok: true,
    uid: uid,
    name: name,
    token
  });
};

module.exports = {
  createUser,
  loginUser,
  renewToken,
};

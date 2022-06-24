const { response } =require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req, res= response, next) => {
  
  //x-token header
  const token = req.header('x-token');
  // console.log(token);

  //now validation:
  if(!token){
    return res.status(401).json({
      ok: false,
      msg: 'there is not token in the request'
    })
  }

  try {
    // const payload = jwt.verify(
    const { uid, name } = jwt.verify(
      token,
      process.env.SECRET_JWT_SEED
    );

    // console.log(payload)
    //usamos la info del payload para construir la request
    // req.uid = payload.uid;
    // req.name = payload.name;
    req.uid = uid;
    req.name = name;
    
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Invalid token'
    })
  }


  next();

  
}

module.exports ={
  validateJWT
}
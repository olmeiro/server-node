const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');
// console.log(process.env)
//create server express
const app = express();

//BBDD:
dbConnection();

//CORS
app.use(cors());

//Public directory
//Midleware
app.use( express.static('public'));

app.use(express.json()); //read and parse body

app.use('/api/auth', require('./routes/auth'));
app.use('/api/employees', require('./routes/employees'));


//Listen requets:
app.listen(process.env.PORT, () => {
  console.log("listen in PORT", 4000);
})
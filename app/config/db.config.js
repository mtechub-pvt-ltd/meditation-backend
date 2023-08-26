
const { Pool } = require('pg');
require('dotenv').config();
const fs = require('fs');
const path = require('path');


const sql = new Pool({
  // host: "localhost",
  // user: "postgres",
  // password: "1234",
  // database: "meditation",
  // max: 5,
  host:'postgres-staging-projects.mtechub.com', 
  port :5432 ,
  user :'meditationuser' ,
  password :'mtechub123',
  database :  'meditation',
  max : 10
});


sql.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});


sql.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to database successfully');

    release();
  }
});

const initSql = fs.readFileSync("app/models/init.sql").toString();

sql.query(initSql, (err, result) => {
  if (!err) {
    console.log("All Database tables Initialilzed successfully : ")
  }
  else {
    console.log("Error Occurred While Initializing Database tables");
    console.log(err)
  }
})

module.exports = { sql };



let express = require('express');
let router = express.Router();
var db = require("./db.js");

// creating new user
router.post('/api/user', async function(req, res, next) {
  let userName = req.body.username;
  let userEmail = req.body.email;
  let userPass = req.body.password;
  let userRole = req.body.role;

  let queryUser = `SELECT * FROM public.users t
  WHERE username = '${userName}'`;

  if(queryUser) {
    res.status(403).json({}).end();
  } else {

  let query = `INSERT INTO "public"."users" ("email", "username", "hash", "role", "id") 
VALUES ('${userEmail}', '${userName}', '${userPass}, '${userRole}', DEFAULT)`;

  let status = await db.insert(query) ? 200 : 500;
  res.status(status).json({}).end();
  }
});

// Logging in
router.post('/api/users/auth', async function(req, res, next) {
  let userName = req.body.username;
  let userPass = req.body.pass;

  let query = `SELECT * FROM public.users t
  WHERE username = '${userName}' and hash = '${userPass}'`;

  let user = db.select(query);
  if(user) {
    res.status(200).json(user).end();
    //---store datahere
    console.log("loged in");
  } else {
    res.status(401).json({}).end();
  }
});

module.exports = router;

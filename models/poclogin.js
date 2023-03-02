var db = require("../database/pdconnections");
const joi = require("@hapi/joi");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const schema = joi.object({
  username: joi
    .string()
    .required()
    .max(25)
    .message("length should not exceed 10 characters")
    .min(10)
    .message("length should contain atleast 10 characters")
    .email()
    .message("Please enter email as user name"),
  password: joi
    .string()
    .required(),
});

var data = (req, res) => {
  db.query(
       "SELECT * FROM login WHERE username ='" + req.body.username + "'",
        function (err, results) {
          const result = schema.validate(req.body);
          if (results.length) {
              res.send("Username already exist. Please enter different username");
             
            } 
          else {
            console.log("entering into else blolck")
               bcrypt.hash(req.body.password, 10, (err, hash) => {
               if (result.error) {
                 res.send(result.error.message);
            }   
              else {
                
                console.log(hash)
                 let query =
                  "insert into login (username,password) values('" + req.body.username +"','" + hash + "')"
               console.log(query)
            db.query(query, (err, data) => {
                    if (err) {
                       res.send(err);
                       console.log(err)
                    }
               else {
                     res.send(data);
                     }
            });
          }
            });
          }
          }
  );
};

    var tdata= (req, res, next) => {
        db.query(
          "SELECT * FROM login WHERE username = '"+req.body.username+"'",
          (err, results) => {
                      if (err) {
               return res.status(400).send({
                msg: err,
              });
            }
            if (!results.length) {
              return res.status(401).send({
                msg: "Email or password is incorrect!",
              });
            }
             bcrypt.compare( req.body.password,results[0].password,(err, result) => {
               if (err) {
                  return res.status(401).send({
                    msg: "Email or password is incorrect!",
                  });
                }
                if (result) {
                    const user = {
                        username: req.body.username,
                        password: req.body.password,
                      };
                  const token = jwt.sign(user,"secretkey", { expiresIn: "60s" } );
                    return res.status(200).send({
                    msg: "Logged in!",token,
                  });
                }
                return res.status(401).send({
                  msg: "Username or password is incorrect!",
                });
              }
            );
          }
        );
      };

var vdata = (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.send({
        message: "post created",
        authData,
      });
    }
  });
};

module.exports = { data, tdata, vdata };

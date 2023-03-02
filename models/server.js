const { error } = require("@hapi/joi/lib/annotate");
var db1 = require("../database/databaseconnections");
const joi = require("@hapi/joi");
const schema = joi.object({
  fname: joi.string().required().max(10).message("length should not exceed 10 characters").min(2).message("length should contain atleast 2 characters"),
  lname: joi.string().max(10).required(),

});

// var data = (req, res) => {
//     return new Promise((resolve,reject)=>
//     {
//         const {err,value} = schema.validate(req.body);
        
  
//         if (value.error)
//         { 
            
//             return res.send("invalid");
//         }
//         else 
//         {
//             console.log(value)
//         }
//       let query =
//         "insert into student(fname,lname,email,phoneno) values('" +
//         req.body.fname +
//         "','" +
//         req.body.lname +
//         "','" +
//         req.body.email +
//         "','" +
//         req.body.phoneno +
//         "')";
//       db1.query(query, (err, result) => {
//         if (err) {
//           reject(err);
//         } else {
//             resolve("Success")
//            res.send("Created");
//         }
//       });
//     })
  
// };
var data=(req,res)=>
{
    const result=schema.validate(req.body)
    if(result.error)
    {
        res.send(result.error.message)
    }
    else{
        let query="insert into student(fname,lname,email,phoneno) values('" + req.body.fname + "','" +req.body.lname + "','" + req.body.email + "','" + req.body.phoneno + "')";
        db1.query(query,(err,data)=>
        {
            if(!err)
            {
                res.send(data)
            }
            else{
                console.log("error occured")
            }
        })
    }
 
}
var getdata = (req, res) => {
    return new Promise((resolve,reject)=>
    {
        let query1 = "select * from student";
        db1.query(query1, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve("Success")
            // res.statusMessage("Data")
            
            res.send({
                message:"data fetched sucessfully",
                response:response
            });
          }
        });
    })
  
};

var updatedata = (req, res) => {
    return new Promise((resolve,reject)=>
    {
        let query2 =
        "UPDATE student SET lname='" +
        req.body.lname +
        "',email='" +
        req.body.email +
        "',phoneno='" +
        req.body.phoneno +
        "' WHERE fname='" +
        req.body.fname +
        "'";
      db1.query(query2, (err, response) => {
        if (err) {
          reject(err);
        } else {
            resolve("Success")
          res.send("Updated");
        }
      });
    })
 
};

var deletedata = (req, res) => {
    return new Promise((resolve,reject)=>
    {
        let query3 = "delete from student where fname='" + req.body.fname + "'";
        db1.query(query3, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve("Success")
            res.send("record deleted");
          }
        });
    })
  
};

var deletetable=(req,res)=>
{
    return new Promise((resolve,reject)=>
    {
        let query4="delete from student";
        db1.query(query4, (err,response)=>
        {
            if(err)
            {
                reject(err)
            }
            else{
                resolve("Success")
                res.send("Table deleted")
            }
        })
    })
}

module.exports = { data, getdata, updatedata, deletedata };

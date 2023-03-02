

const {DataTypes} = require("sequelize");
var sequelize = require('../database/sequelconnection');
const { result } = require("@hapi/joi/lib/base");
const values = require("@hapi/joi/lib/values");


 const student = sequelize.define("students", {
    fname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
    }
 });
 
 sequelize.sync().then(() => {
    console.log('Students table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });
 
var postdata=(req,res,next)=>
{
    sequelize.sync().then(() => {
        
        student.create({
            fname: req.body.fname,
            lname: req.body.lname,
            age:   req.body.age
        })
        res.send("Student data Inserted successfully!'")
     
     })
     .catch((error) => {
        console.error('Unable to create table : ', error);
     });
}
 

var getdata=(req,res,next)=>
{
  
    sequelize.sync().then((value) => {
        

        student.findAll()
        
        res.send(value)
    
    })
    .catch((error) => {
        console.error('Unable to create table : ', error);
    });
}
 

var getonedata=()=>
{
    sequelize.sync().then(() => {

            student.findOne({
                where: {
                    id : req.body.id
                }
            }) 
            res.send("Student record Inserted successfully!'")
        
        }).catch((error) => {
            console.error('Unable to create table : ', error);
        });
}

var deletedata=(req,res,next)=>
{
    sequelize.sync().then(() => {

        student.destroy({
            where: {
             fname:req.body.fname
            }
            
        })
        res.send("Data deleted")
      
      }).catch((error) => {
          console.error('Unable to create table : ', error);
      });
}

var updatedata=(req,res)=>
{
    sequelize.sync().then(() =>{
        student.update(
            { fname: req.body.fname ,
             lname: req.body.lname,
             age: req.body.age},
            { where: { age: req.body.age } }
          )
          res.send("Data updated")
    }).catch((error) => {
        console.error('Unable to update : ', error);
    });
    
}

module.exports={postdata,getdata,getonedata,deletedata,updatedata}
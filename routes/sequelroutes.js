var a=require('../models/sequelize')
var express=require('express')
var sequel=express.Router();
sequel.post('/api1',(req,res)=>
{
   a.postdata(req,res,function(postdata)
   {
 res.send("data is inserted")
   })

})
sequel.get('/api1',(req,res)=>
{
    a.getdata(req,res,function(getdata)
    {
console.log("Data is getting")
    })
    
})
sequel.put('/api1',(req,res)=>
{
    a.updatedata(req,res,function(updatedata)
    {

    })
})
sequel.delete('/api1',(req,res)=>
{
     a.deletedata(req,res,function(deletedata)
     {
    
     })
})

module.exports=sequel

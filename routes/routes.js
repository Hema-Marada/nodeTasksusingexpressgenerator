
var a=require('../models/server')
var express=require('express')
var exp=express.Router();
exp.post('/api',(req,res)=>
{
   a.data(req,res,function(data)
   {
  
   })

})
exp.get('/api',(req,res)=>
{
    a.getdata(req,res,function(getdata)
    {

    })
    
})
// exp.put('/api',(req,res)=>
// {
//     a.updatedata(req,res,function(updatedata)
//     {

//     })
// })
exp.delete('/api',(req,res)=>
{
     a.deletedata(req,res,function(deletedata)
     {
    
     })
})

module.exports=exp

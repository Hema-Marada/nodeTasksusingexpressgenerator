
var a=require('../models/poclogin')
var express=require('express')
var exp=express.Router();
exp.post('/register',(req,res)=>
{
   a.data(req,res,function(data)
   {
  
   })

})


exp.post('/login',(req,res)=>
{
    a.tdata(req,res,function(tdata)
   {
  
   })
})

exp.post('/verify',verifyToken,(req,res)=>
{
    a.vdata(req,res,function(vdata)
   {
  
   })
   
})
function verifyToken(req,res,next)
   {
       const bearerHeader=req.headers['authorization']
   
       if(typeof bearerHeader!=='undefined')
       {
   const bearer = bearerHeader.split(' ')
   
   const bearerToken = bearer[1];
   
   req.token=bearerToken;
   
   next();
   
       }
       else{
           res.sendStatus(403)
       }
   }
   



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

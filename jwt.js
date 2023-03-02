var express = require('express');
var jwt = require('jsonwebtoken')

var app = express();

app.get('/jwt',(req,res)=>{
res.json({
text:'my api'
})
});

app.post('/jwt/login',(req,res)=>{
//auth user
const user={id:3};
const token=jwt.sign({user}, 'my_secret_key');
res.json({
token:token
});
});

app.get('/jwt/protect',ensureToken,(req,res)=>{
jwt.verify(req.token,'my_secret_key',(err,data)=>{
if(err){
res.sendStatus(403)
}
else{
res.json({
text:'my api protected',
data:data
});
}
});

});

function ensureToken(req,res,next){
const bearerHeader = req.headers["authorization"];
if(typeof bearerHeader !== 'undefined'){
const bearer = bearerHeader.split(" ");
const bearerToken = bearer[1];
req.token = bearerToken;
next();
}
else{
res.sendStatus(403);
}
}
app.listen(4004,()=>{console.log('Server running at port 4004');})
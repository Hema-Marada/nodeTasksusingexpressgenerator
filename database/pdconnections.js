const mysql = require('mysql')

const connection = mysql.createConnection({
    host : '172.17.15.100',
    user : 'itguser10',
    password : 'miracle@10',
    database : 'poctask'
})
connection.connect((err,data)=>
{
    if(err)
    {
        console.log(err)
    }
    else
    {
        console.log("poc data base Connection established")
    }
})

module.exports = connection;
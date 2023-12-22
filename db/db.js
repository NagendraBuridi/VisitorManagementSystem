import mysql from 'mysql'

const con=mysql.createConnection({
    host:"localhost",
    user:"sqluser",
    database:"visitor",
    password:"password",
})


con.connect(function (err) {
    if(err){
        console.log("connection error");
    }
    else{
        console.log("db connected successfully.....");
    }
    
})


export default con;
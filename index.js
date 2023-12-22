import con from "./db/db.js";
import express from "express";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);
app.use(express.json());

app.listen(5000, () => {
  console.log("server connected");
});

app.post("/signup", async (req, res) => {
  const sql =
    "INSERT INTO `signup`(email,pwd,uname,phone,address,file) values (?,?,?,?,?,?);";
  con.query(
    sql,
    [
      req.body.email,
      req.body.pwd,
      req.body.uname,
      req.body.phno,
      req.body.address,
      req.body.file,
    ],
    (err, result) => {
      if (err) return res.status(500).json(err);
      result.status(200).json(result);
    }
  );
});

// app.get("/login",async (req,res)=>{
//   const sql="SELECT email,pwd from `signup`;";
//   con.query(sql,(err,result)=>{
//     if(err) return res.status(500).json(err)
//     res.status(200).json(result)
//   })
// })
app.post("/login", async (req, res) => {
  const { email, pwd } = req.body;

  const exitUser = "SELECT * From `signup` WHERE email = ?";
  con.query(exitUser, [req.body.email], (err, result) => {
    if (err) return res.status(500).json(err);
    console.log(result);
    if (result.length > 0) {
      // console.log(result[0]);
      if (result[0]?.pwd === pwd) {
        res.status(200).json(result);
      } else {
        res.status(500).json({ message: "password not correct" });
      }
    } else {
      res.status(500).json({ message: "user does't exit" });
    }
  });
});

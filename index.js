require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors"); 
const client = require("./configurations/db");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("hi");
  });

client.connect(() => {
    console.log("connected to DAtabase");
});

let date = new Date();
// ----------------------------------- timeout 1 ------------------------------------------------------
setTimeout(() => {
    let date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth()+1;
    let yyyy = date.getFullYear();
    client.query(`UPDATE movies SET booked = 0 WHERE date = '${yyyy}-${mm}-${dd}'`)
    .then((database_res)=>{
      client.query(`UPDATE available SET date = date + 7 where date = '${yyyy}-${mm}-${dd}'`)
      .then((database_res)=>{
        client.query(`UPDATE movies SET date = date + 7 where date = '${yyyy}-${mm}-${dd}'`)
        .then((database_res)=>{
          client.query(`UPDATE slots SET date = date + 7 where date = '${yyyy}-${mm}-${dd}'`)
          .then((database_res)=>{

          })
        }) 
      })
    })
}, 1626546300000 - date.getTime());
// --------------------------------- timeout 1 end-----------------------------------------------------

// ----------------------------------- timeout 2 ------------------------------------------------------
setTimeout(() => {
  setInterval(() => {
    let date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth()+1;
    let yyyy = date.getFullYear();
    client.query(`UPDATE movies SET booked = 0 WHERE date = '${yyyy}-${mm}-${dd}'`)
    .then((database_res)=>{
      client.query(`UPDATE available SET date = date + 7 where date = '${yyyy}-${mm}-${dd}'`)
      .then((database_res)=>{
        client.query(`UPDATE movies SET date = date + 7 where date = '${yyyy}-${mm}-${dd}'`)
        .then((database_res)=>{
          client.query(`UPDATE slots SET date = date + 7 where date = '${yyyy}-${mm}-${dd}'`)
          .then((database_res)=>{

          })
        }) 
      })
    })

  }, 86400000);
}, 1626546360000 - date.getTime());
// -------------------------------- timeout 2 end ---------------------------------------------------

app.listen(port, () => {
    console.log(`Server is Running on port ${port}`);
});

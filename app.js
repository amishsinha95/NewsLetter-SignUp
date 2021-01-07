  const express = require('express');
  const bodyParser = require('body-parser');
  const request = require('request');
  const https = require('https');

  const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
})

app.post("/",function(req,res){
const firstName=  req.body.firstName;
const lastName =   req.body.LastName;
const email = req.body.email;

const data = {
  members:[
    {
      email_address:email,
      status:"subscribed",
      merge_fields:{
        FNAME:firstName,
        LNAME:lastName
      }
    }
  ]
};

const jsonData = JSON.stringify(data);
const url = "https://us7.api.mailchimp.com//3.0/lists/d36cb2022e";
const options = {
  method:"POST",
  auth:"amish1:9a8bd0107a712cbfdd199bbd8d196f15-us7"
}
const request = https.request(url,options,function(response){
  response.on("data",function(data){
    console.log(response.statusCode);
    if(response.statusCode === 200)
    {
      res.sendFile(__dirname + "/success.html");
    }
    else
    {
      res.sendFile(__dirname + "/failue.html")
    }
  })
})
request.write(jsonData);
request.end();


});

app.post("/failue",function(req,res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000,function(){
  console.log("App is up and running onport 3000");
  })


//Api key -9a8bd0107a712cbfdd199bbd8d196f15-us7
//list-id - d36cb2022e

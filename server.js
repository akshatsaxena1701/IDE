const express=require('express');
const app=express();
const path=require('path');
const bodyParser = require("body-parser");
var request = require('request');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));

app.get("/",(req,res)=>{
    res.render('home');
})

app.post("/code",(req,res)=>{
    

var program = {
    script : req.body.script,
    language: req.body.language,
    versionIndex: "0",
    clientId: "",
    clientSecret:""
};
console.log(program);
request({
    url: 'https://api.jdoodle.com/v1/execute',
    method: "POST",
    json: program
},
function (error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', body);
    res.send(body.output)
});
})



app.listen(3000,()=>{
    console.log("Up and running at 3000");
})

const express=require('express');
const app=express();
const path=require('path');
const bodyParser = require("body-parser");
var request = require('request');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));
app.use(express.json());
var cors = require('cors')

app.use(cors()) ;

app.get("/",(req,res)=>{
    res.render('home');
})

app.post("/code",(req,res)=>{
    
console.log(req.body);

var program = {
    script : req.body.script,
    language: req.body.language,
    versionIndex: "0",
    clientId: "7e753aac2d55bdbfb4ef175c3cb1be26",
    clientSecret:"a91fdcf8ac8edec672e750550e381b8382f2f3625cea272947f311fba818818d"
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

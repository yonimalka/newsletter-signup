const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({ extended: true}));
 
const port = 3000;
 
// app.use(express.static('public'));
app.use(express.static(__dirname));
 
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/signup.html');
});

app.post("/", function(req,res){
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);
    
    const url = "https://us10.api.mailchimp.com/3.0/lists/404b915b92";
    const options = {
        method: "POST",
        auth: "Yoni:7a339968828051b040e156530119f390-us10"
    }
    const request = https.request(url, options, function(response){

        if (response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
         }
        response.on("data", function(data){
            console.log(JSON.parse(data));
            
    })
  })
 request.write(jsonData);
 request.end();
 
});

app.listen(process.env.POST || 3000, function() {
     console.log(`Example app listening at http://localhost:${PORT}`);
});

//
    //
       // 
   // 

//
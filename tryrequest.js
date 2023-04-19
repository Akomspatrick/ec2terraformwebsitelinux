//const { response } = require('express')
var request = require('request')
const url = "https://webhook.site/b86d62de-256e-426d-b8d3-100843a31946"

const postbody = { form: {
    "userName":"Oladeji",
     "userType":"Oladeji"
}}

request.post(url, postbody, function (error, response, body)
       {
         if (!error && response.statusCode == 200) {
           console.log(body) }
});
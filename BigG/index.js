const express = require('express')
const app = express();
app.get("/", (req, res) => {
  res.send('So wan n be')
    
})
app.listen(80, () => {
     console.log('app is running @ 3001')
 })
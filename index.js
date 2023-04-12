// make sure you run chmod +x runscript.sh
const express = require('express')
const app = express();
app.get("/", (req, res) => {
  res.send('God is TOOoo good  wan n be ..')
    
})
app.listen(5001, () => {
     console.log('app is running @ 3001')
 })
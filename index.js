const express = require('express'),
      app = express(),
      router = require('./src/routes/routes'),
      bodyParser = require('body-parser'),
      port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(router)

app.listen(port, () =>{
  console.log(`Service started at port ${port}`)
})

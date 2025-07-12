const express = require('express')
const app = express()
const path = require("path");

app.use(express.urlencoded({extended:true}));

app.set("view engine",'ejs');
app.set("views", path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname, 'public')));


app.use('/',)
app.use('/user',)
app.use('/skills',)
app.use('/swap-request',)
app.use('/swap-request/:id',)
app.use('/my-swaps',)
app.use('/feedback',)
app.use('/notifications',)
app.use('/notifications/:id/read',)


app.listen(8000);
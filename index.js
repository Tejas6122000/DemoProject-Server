const express = require('express')
const app = express();
const routeController = require('./routes/v1/')();
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.json());
require('dotenv').config();
PORT= process.env.PORT;





app.get('/',(req,res)=>{
    res.send("asd");
});

app.use('/api/v1',routeController);


app.listen(PORT,()=> console.log(`Server running at port ${PORT}`))

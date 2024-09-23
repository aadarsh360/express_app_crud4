const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const port = 3000;
const app = express();
const userRoute = require("./routes/userRoute");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.get('/', (req, res)=>{
    res.send("Hello World!!");
})

app.use('/api', userRoute);

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})
const express = require("express")
const bodyParser = require('body-parser')
require("dotenv").config()
const cors = require('cors')
const authRouter = require("./routes/auth")
const vacationsRouter = require("./routes/vacations")
var spawn = require("child_process").spawn,child;


child = spawn("powershell.exe",["./ps/run_images.ps1"]);
child.stdout.on("data",function(data){
    console.log("Powershell Data: " + data);
});
child.stderr.on("data",function(data){
    console.log("Powershell Errors: " + data);
});
child.on("exit",function(){
    console.log("Powershell Script finished");
});
child.stdin.end(); 

const api = express()

api.listen(process.env.PORT, () => {
    console.log("vacition server is up")
})

api.use(cors())

api.use(bodyParser.json())

api.use("/", (req, res, next) => {
    const caller = req.ip
    console.log("connection from : ", caller)
    next()
})

api.use("/auth", authRouter)

api.use("/vacations", vacationsRouter)
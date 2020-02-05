const express = require("express")
require("dotenv").config()


const port = process.env.PORT2

const api = express()

api.listen(port, () => {
    console.log("images server is up")
})

api.use(express.static('../vacation_images_server/public'))



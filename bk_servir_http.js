const path = require('path')
const express = require('express')

const app = express()
//const port = 3000
const port = process.env.PORT || 3000
//const publicDirectory = path.join(__dirname, '../public/')
const publicDirectory = path.join(__dirname, '/public/')

app.use(express.static(publicDirectory))


app.listen(port, () => {
    console.log('App running!')
})

//app.listen(process.env.PORT || 3000);

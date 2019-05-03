const express = require("express")
const app = express()
const { connect, initSchemas } = require('./database/init.js') 
const port = process.env.PORT || 5000
const bodyParser = require("body-parser")
const passport = require("passport")

//路由
const users = require("./routes/api/users.js")
const profile = require("./routes/api/profile.js")

;(async () => {
	await connect()
	initSchemas()
})()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
//passport初始化
app.use(passport.initialize());
require("./config/passport")(passport)

app.get('/', (req, res) => {
	res.send("Hello World!")
})

app.use("/api/users", users)
app.use("/api/profile", profile)


app.listen(port, () => {
	console.log(`Server running on port ${port}`)
})
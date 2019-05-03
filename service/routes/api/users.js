const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const secretOrKey = "shabi"
const passport = require("passport")


router.get("/test", (req, res) => {
	res.json({msg: "logined"})
})
//$route  POST api/users/register
//@desc   返回请求的json数据
//@access public
router.post("/register", (req, res) => {
	const User = mongoose.model('User')
	const { email } = req.body
	User.findOne({email: email})
		.then((user) => {
			if(user){
				// return res.status(400).json({message: '邮箱已被注册'})
				return res.status(400).json({user})
			}else{
				req.body.avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});
				let newUser = new User(req.body)
				newUser.save()
					   .then(user => res.status(200).json({register: user}))
					   .catch(error => console.log(error))
			}
		})
})

//$route  POST api/users/login
//@desc   返回token jwt
//@access public
router.post("/login", (req, res) => {
	const User = mongoose.model('User')
	const { email, passWord } = req.body
	User.findOne({email})
		.then(user =>{
			if(user){
				let newUser = new User(req.body)
				newUser.comparePassword(passWord, user.passWord)
				       .then(isMatch => {
				       		if(isMatch){
				       			const rule = { 
				       				id: user._id, 
				       				name: user.userName, 
				       				avatar: user.avatar, 
				       				identity : user.identity
				       			}
				       			jwt.sign(rule, secretOrKey, {expiresIn: 3600}, (err, token) => {
				       				if(err) throw err
				       				res.status(200).json({
				       					success: true,
				       					token: "Bearer " + token,
				       					user
				       				})
				       			})				    
				       		}else{
				       			res.status(500).json({message: req.body})
				       		}
				       })
			}else{
				return res.status(404).json({message: "用户不存在"})
			}
		})
})

//$route  GET api/users/current
//@desc   返回current user
//@access Private
router.get("/current", passport.authenticate("jwt", {session: false}), (req, res) => {
	const { id, userName, email, identity } = req.user
	res.status(200).json({id, userName, email, identity})
})




module.exports = router 
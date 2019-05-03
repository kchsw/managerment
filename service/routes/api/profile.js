const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
const passport = require("passport")

router.get("/test", (req, res) => {
	res.json({msg: "profile"})
})

//$route  POST api/profile/add 
//@desc   创建信息接口
//@access Private

router.post("/add", passport.authenticate("jwt", {session: false}), (req, res) => {
	const Profile = mongoose.model('Profile')
	let newProfile = new Profile(req.body)
	newProfile.save()
		      .then(profile => res.status(200).json(profile))
		      .catch(error => console.log(error))
})

//$route  GET api/profile/get
//@desc   获取所有信息接口
//@access Private
router.get("/get", passport.authenticate("jwt", {session: false}), (req, res) => {
	const Profile = mongoose.model('Profile')
	Profile.find()
		   .then(profile => {
		   		if(!profile){
		   			return res.status(404).json({message: "无任何内容"})
		   		}
		   		res.status(200).json(profile)
		   })
		   .catch(error => console.log(error))
	
})

//$route  GET api/profile/get/:id
//@desc   获取单个信息接口
//@access Private
router.get("/get/:id", passport.authenticate("jwt", {session: false}), (req, res) => {
	const Profile = mongoose.model('Profile')
	Profile.findOne({_id: req.params.id})
		   .then(profile => {
		   		if(!profile){
		   			return res.status(404).json({message: "无任何内容"})
		   		}
		   		res.status(200).json(profile)
		   })
		   .catch(error => console.log(error))
	
})

//$route  POST api/profile/edit/:id
//@desc   编辑单个信息接口
//@access Private

router.post("/edit/:id", passport.authenticate("jwt", {session: false}), (req, res) => {
	const Profile = mongoose.model('Profile')
	Profile.findOneAndUpdate(
		{_id: req.params.id},
		{$set: req.body},
		{new: true}
	).then(profile => res.status(200).json(profile))
})

//$route  DELETE api/profile/delete/:id
//@desc   删除单个信息接口
//@access Private

router.delete("/delete/:id", passport.authenticate("jwt", {session: false}), (req, res) => {
	const Profile = mongoose.model('Profile')
	Profile.findOneAndRemove({_id: req.params.id})
		   .then(profile => {
		   		profile.save().then(profile => res.status(200).json({message: "删除成功", delete: profile}))
		   })
		   .catch(error => res.status(400).json({message: "删除失败"}))
})



module.exports = router 
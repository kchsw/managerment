const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10
//创建UserSchema

const userSchema = new Schema({
	UserId: { type: ObjectId },
	userName: { unique: true, type: String },
	passWord: String,
    email: String,
    avatar: String,
    identity: String,
	creatAt: { type: Date, default: Date.now() },
	lastLoginAt: { type: Date, default: Date.now() }
})

//加密处理
userSchema.pre('save', function(next){
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if(err) return next(err)
        bcrypt.hash(this.passWord, salt, (err, hash) => {
            if(err) return next(err)
            this.passWord = hash
            next()
        }) 
    })
})

userSchema.methods = {
    //密码比对方法
    comparePassword: (_passWord, passWord) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(_passWord, passWord, (err, isMatch) => {
                if(!err) resolve(isMatch)
                else reject(err)
            }) 
        })
    }
}

//发布模型
mongoose.model('User', userSchema)
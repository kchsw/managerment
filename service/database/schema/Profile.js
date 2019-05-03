const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
//创建ProfileSchema

const ProfileSchema = new Schema({
	ProfileId: { type: ObjectId },
	type: String,
    describe: String,
	income: { type: String, required: true },
    expend: { type: String, required: true },
    cash: { type: String, required: true },
    remark: String,
	creatAt: { type: Date, default: Date.now() },
})


//发布模型
mongoose.model('Profile', ProfileSchema)
const mongoose = require('mongoose')

const db = 'mongodb://localhost/manager-db'

const glob = require('glob')

const { resolve } = require('path')

mongoose.Promise = global.Promise

exports.connect = () => {
	let maxConnectTimes = 0

	mongoose.connect(db) //连接数据库

	return new Promise((resolve, reject) => {

		mongoose.connection.on('disconnected', () => {
			console.log('**********数据库断开***********')
			if(maxConnectTimes < 3){
				maxConnectTimes++
				mongoose.connect(db) //进行重连
			}else{
				reject()
				throw new Error('数据库出现问题，请检查')
			}			
		})

		mongoose.connection.on('error', () => {
			console.log('**********数据库错误***********')
			
			if(maxConnectTimes < 3){
				maxConnectTimes++
				mongoose.connect(db) //进行重连
			}else{
				reject()
				throw new Error('数据库出现问题，请检查')
			}			
		})

		mongoose.connection.once('open', () => {
			console.log('********MongoDB Connected successe********') //连接打开时
			resolve()
		})
	})
	
}

exports.initSchemas = () =>{
    glob.sync(resolve(__dirname,'./schema/','**/*.js')).forEach(require)
}


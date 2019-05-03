import axios from "axios"
import { Loading, Message } from 'element-ui'
import router from './router'

let loading = null
function startLoading(){
	loading = Loading.service({
		lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
	})
}

function endLoading(){
	loading.close()
}

const instance = axios.create()
instance.interceptors.request.use(config => {
	startLoading()
	//设置请求头
	if(sessionStorage.getItem('TOKEN')){
		config.headers.Authorization = sessionStorage.getItem('TOKEN')
	}
	return config
}, error => {
	return Promise.reject(error)
})

instance.interceptors.response.use(res => {
	setTimeout(() => {
		endLoading()
	},200)
	return res
}, error => {
	endLoading()
	Message.error("未知错误")

	//token过期处理
	const { status } = error.response
	if(status == 401){
		Message.error("token已过期，请重新登陆！")
		sessionStorage.removeItem('TOKEN')
		router.push('/login')
	}
	return Promise.reject(error)
})





export default instance
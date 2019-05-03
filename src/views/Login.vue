<template>
	<div class="login">
		<section class="form-container">
			<div class="manager-form">
				<div class="manager-tip">
					<span class="title">
						NMSL在线后台管理系统
					</span>
				</div>
				<el-form :model="loginUser" :rules="rules" label-position="left" status-icon ref="loginForm" label-width="60px">
				<el-form-item label="邮箱" prop="email">
				    <el-input v-model="loginUser.email" placeholder="请输入邮箱"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="passWord">
				    <el-input type="password" placeholder="请输入密码" v-model="loginUser.passWord" autocomplete="off"></el-input>
				</el-form-item>	
				 <el-form-item>
				    <el-button type="primary" @click="submitForm('loginForm')">登陆</el-button>
				    <el-button type="primary" @click="resetForm('loginForm')">重置</el-button>
				  </el-form-item>
				</el-form>
				<div class="link">
					没有账号？现在<router-link to="/register">注册</router-link>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
	import { isEmpty } from "../utils/util.js"
	import jwt_decode from "jwt-decode"
	export default{
		name: "login",
		data(){
			return {
				loginUser: {					
					email: '11245@qq.com.cn',
					passWord: '12345678',				
				},			
				rules: {					
					email: [
						{ required: true, type: "email", message: '邮箱格式不正确', trigger: 'blur' },
					],
					passWord: [
						{ required: true, message: '密码不能为空', trigger: 'blur' },
						{ min: 8, max: 16, message: '长度在 8 到 16 个字符之间', trigger: 'blur' }
					],					
				}
			}
		},
		methods: {
			submitForm(formName){
		        this.$refs[formName].validate((valid) => {
		            if (valid) {
		            	this.$axios.post("/api/users/login", this.loginUser)
		          	    		    .then(res =>{
		          	    		   		console.log(res)
		          	    		   		const { token } = res.data
		          	    		   		sessionStorage.setItem('TOKEN', token)
		          	    		   		this.$router.push('/home')
		          	    		   		const decoded = jwt_decode(token)
		          	    		   		this.$store.dispatch("setAuthenticated", !isEmpty(decoded))
		          	    		   		this.$store.dispatch("setUser", decoded)

		          	    		    })
		          	    		    .catch(error => {
		          	    		    	console.log(error)
		          	    		    })	
		          	} else {		          	          
		          		console.log('error submit!!');
		          		return false;
		          	}
		        })
			},
			resetForm(formName) {
		        this.$refs[formName].resetFields();
		    }
		}
	}
</script>

<style lang="scss" scoped>
	.login{
		position: relative;
		width: 100%;
		height: 100%;
		background-color: #f2f2f2;
		.form-container{
			position: absolute;
			width: 350px;
			top: 16%;
			left: 35%;
			text-align: center;
			// background-color: #fff;
   			.manager-form{
   				overflow: hidden;
   				background-color: #fff;
   				border-radius: 10px;
   				padding: 20px 30px 5px;
   				box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
   				.manager-tip{
   					margin-bottom: 20px;
	   				.title{
	   					font-size: 24px;
	   					color: #666;
	   					font-weight: bold;
	   				}
	   			}
	   			.link{
	   				font-size: 14px;
	   				float: right;
	   			}
   			}
		}
	}
</style>
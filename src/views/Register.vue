<template>
	<div class="register">
		<section class="form-container">
			<!-- <div class="manager-tip">
				<span class="title">
					NMSL在线后台管理系统
				</span>
			</div> -->
			<div class="manager-form">
				<div class="manager-tip">
					<span class="title">
						NMSL在线后台管理系统
					</span>
				</div>
				<el-form :model="registerUser" :rules="rules" label-position="left" status-icon ref="registerForm" label-width="80px">
					<el-form-item label="用户名" prop="userName">
					    <el-input v-model="registerUser.userName" placeholder="请输入用户名"></el-input>
					</el-form-item>
					<el-form-item label="邮箱" prop="email">
					    <el-input v-model="registerUser.email" placeholder="请输入邮箱"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="passWord">
					    <el-input type="password" placeholder="请输入密码" v-model="registerUser.passWord" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="确认密码" prop="repassWord">
					    <el-input type="password" placeholder="请确认密码" v-model="registerUser.repassWord" autocomplete="off"></el-input>
					</el-form-item>
					 <el-form-item label="身份" prop="identity">
					    <el-select v-model="registerUser.identity" placeholder="请选择身份">
					        <el-option label="管理员" value="manager"></el-option>
					        <el-option label="普通会员" value="member"></el-option>
					    </el-select>
					</el-form-item>
					<el-form-item>
					    <el-button type="primary" @click="submitForm('registerForm')">注册</el-button>
					    <el-button type="primary" @click="resetForm('registerForm')">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
		</section>
	</div>
</template>

<script>
	export default{
		name: "register",
		data(){
			var validatePass = (rule, value, callback) => {
		        if (value === '') {
		            callback(new Error('请再次输入密码'));
		        } else if (value !== this.registerUser.passWord) {
		          	callback(new Error('两次输入密码不一致!'));
		        } else {
		          	callback();
		        }
		    }
			return {
				registerUser: {
					userName: '',
					email: '',
					passWord: '12345678',
					repassWord: '12345678',
					identity: ''
				},			
				rules: {
					userName: [ 
						{ required: true, message: '用户名不能为空', trigger: 'blur' },
						{ min: 5, max: 10, message: '长度在 5 到 10 个字符之间', trigger: 'blur' }
					],
					email: [
						{ required: true, type: "email", message: '邮箱格式不正确', trigger: 'blur' },
					],
					passWord: [
						{ required: true, message: '密码不能为空', trigger: 'blur' },
						{ min: 8, max: 16, message: '长度在 8 到 16 个字符之间', trigger: 'blur' }
					],
					repassWord: [
						{ required: true, validator: validatePass, trigger: 'blur' }
					],
					identity: [
						{ required: true, message: '请选择身份', trigger: 'change' }
					]
				}
			}
		},
		methods: {
			submitForm(formName){
		        this.$refs[formName].validate((valid) => {
		            if (valid) {
		            	this.$axios.post("/api/users/register", this.registerUser)
		          	    		    .then(res =>{
		          	    		   		console.log(res)		          	    	
		          	    		   		this.$message({
								            showClose: true,
								            message: '注册成功',
								            type: 'success'
								        })
								        this.$router.push('/login')
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
	.register{
		position: relative;
		width: 100%;
		height: 100%;
		background-color: #f2f2f2;
		.form-container{
			position: absolute;
			width: 400px;
			top: 16%;
			left: 35%;
			text-align: center;
			
   			.manager-form{
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
   			}
		}
	}
</style>
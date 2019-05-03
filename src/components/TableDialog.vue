<template>
	<el-dialog :title="dialog.title" :visible.sync="dialog.show"
	  :close-on-click-modal="false" width="40%"
	>
	  <el-form :model="formData" ref="form" :rules="rules">	 
	    <el-form-item label="收支类型" :label-width="formLabelWidth" prop="type">
	      <el-select v-model="formData.type" placeholder="请选择收支类型">
	      	<template v-for="item in type_list">
	      		<el-option :label="item" :value="item"></el-option>
	      	</template>
	      </el-select>
	    </el-form-item>
	    <el-form-item label="收支描述" :label-width="formLabelWidth" prop="describe">
	      <el-input v-model="formData.describe" autocomplete="off" placeholder="请输入收支描述"></el-input>
	    </el-form-item>
	    <el-form-item label="收入" :label-width="formLabelWidth" prop="income">
	      <el-input v-model="formData.income" autocomplete="off" placeholder="请输入收入"></el-input>
	    </el-form-item>
	    <el-form-item label="支出" :label-width="formLabelWidth" prop="expend">
	      <el-input v-model="formData.expend" autocomplete="off" placeholder="请输入支出"></el-input>
	    </el-form-item>
	    <el-form-item label="账户现金" :label-width="formLabelWidth" prop="cash">
	      <el-input v-model="formData.cash" autocomplete="off" placeholder="请输入账户现金"></el-input>
	    </el-form-item>
	    <el-form-item label="备注" :label-width="formLabelWidth">
	      <el-input v-model="formData.remark" autocomplete="off" type="textarea" :rows="2" placeholder="请输入内容"></el-input>
	    </el-form-item>
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="dialog.show = false">取 消</el-button>
	    <el-button type="primary" @click="submitForm('form')">确 定</el-button>
	  </div>
	</el-dialog>
</template>

<script>
	export default{
		name: 'table-dialog',
		props: {
			formData: {
				type: Object,
				default: {}
			},
			dialog: {
				type: Object,
				default: {}
			}
		},
		data(){
			return {				
		        type_list: [
		        	"优惠券",
		        	"提现",
		        	"充值",		        
		        	"转账",
		        	"返现",
		        	"满减"
		        ],
		        rules: {
		        	type: [ 
						{ required: true, message: '请选择类型', trigger: 'change' }
					],
					describe: [
						{ required: true, message: '请输入描述', trigger: 'blur' },
					],
					income: [
						{ required: true, message: '请输入收入', trigger: 'blur' },			
					],
					expend: [
						{ required: true, message: '请输入支出', trigger: 'blur' }
					],
					cash: [
						{ required: true, message: '请输入账户现金', trigger: 'blur' }
					]
		        },
		        formLabelWidth: '100px'
			}
		},
		methods: {
			showDialog(){
				this.dialogFormVisible = true
			},
			submitForm(formName){
		        this.$refs[formName].validate((valid) => {
		            if (valid) {
		            	const url = this.dialog.option == "add" ? "add" : `edit/${this.formData.id}`
		            	const message = this.dialog.option == "add" ? "数据添加成功" : "数据编辑成功"		            
		            	this.$axios.post(`/api/profile/${url}`, this.formData)
		          	    		    .then(res =>{
		          	    		   		console.log(res)		          	    	
		          	    		   		this.$message({
								            showClose: true,
								            message,
								            type: 'success'
								        })
								        this.dialog.show = false
								        this.$emit("update")
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
		}

	}
</script>

<style lang="scss" scoped>
	
</style>
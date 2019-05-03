<template>
	<div class="fund">
		<div class="container">
			<div class="table-handle">
				<el-form :inline="true" class="demo-form-inline">
					<el-form-item label="时间筛选">
					    <el-date-picker
					      v-model="startTime"
					      type="datetime"
					      placeholder="选择开始时间">
					    </el-date-picker> -
					    <el-date-picker
					      v-model="endTime"
					      type="datetime"
					      placeholder="选择结束时间">
					    </el-date-picker>
					</el-form-item>
					<el-form-item>
					    <el-button type="primary" icon="el-icon-search" @click="handleSerch">筛选</el-button>
					</el-form-item>
					<el-form-item>
					    <el-button v-if="userIdentity" type="primary" icon="el-icon-circle-plus-outline" @click="handleAdd">添加</el-button>
					</el-form-item>
				</el-form>
			</div>
			<el-table
			:default-sort = "{prop: 'date', order: 'descending'}"
			stripe
			v-if="tableData.length"
		    :data="tableData"
		    max-height="450"
		    size="small"
		    style="width: 100%"
		    border>
		     <el-table-column
		      align="center"
		      label="序号"
		      type="index"
		      width="50">
		    </el-table-column>
		    <el-table-column		    
		      align="center"
		      label="创建时间"
		      sortable
		      width="200">
		      <template slot-scope="scope">		    
		      	<i class="el-icon-time"></i>
		        <span style="margin-left: 10px">{{ scope.row.creatAt | formDate}}</span>
		      </template>
		    </el-table-column>
		    <el-table-column
		      align="center"
		      label="收支类型"
		      width="100">
		      <template slot-scope="scope">
		        <span>{{ scope.row.type }}</span>
		      </template>
		    </el-table-column>
		    <el-table-column
		      align="center"
		      label="收支描述"
		      width="100">
		      <template slot-scope="scope">
		        <span>{{ scope.row.describe }}</span>
		      </template>
		    </el-table-column>
		    <el-table-column
		      props="income"
		      align="center"
		      label="收入"
		      width="100">
		      <template slot-scope="scope">
		        <span style="color: #00d053">{{ scope.row.income }}</span>
		      </template>
		    </el-table-column>
		    <el-table-column
		      align="center"
		      label="支出"
		      width="100">
		      <template slot-scope="scope">
		        <span style="color: #f56767">{{ scope.row.expend }}</span>
		      </template>
		    </el-table-column>
		    <el-table-column
		      align="center"
		      label="账户现金"
		      width="100">
		      <template slot-scope="scope">
		        <span style="color: #4db3ff">{{ scope.row.cash }}</span>
		      </template>
		    </el-table-column>
		    <el-table-column
		      align="center"
		      label="备注"
		      width="120">
		      <template slot-scope="scope">
		        <span>{{ scope.row.remark }}</span>
		      </template>
		    </el-table-column>
		    <el-table-column label="操作" align="center">
		      <template slot-scope="scope">
		      	<el-row v-if="userIdentity">
		        <el-button
		          type="warning"
		          size="small"
		          icon="el-icon-edit"
		          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
		        <el-button
		          type="danger"
		          size="small"
		          icon="el-icon-delete"
		          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
		        </el-row>
		        <span v-else>没权限还操作你妈呢</span>
		      </template>
		    </el-table-column>
			</el-table>
		</div>
		<table-dialog :dialog="dialog" :formData="formData" @update="getProfile"></table-dialog>
		<div class="pagination-container">
		    <el-pagination
		      class="pagination"
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page.sync="page_index"
		      :page-sizes="[5, 10, 15, 20]"
		      :page-size="page_size"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="tableDatas.length">
		    </el-pagination>
		</div>
	</div>
</template>

<script>
	import { formatTime } from "@/utils/util"
	import TableDialog from "@/components/TableDialog"
	export default{
		name: "fundlist",
		components: {
			TableDialog,		
		},
		data(){
			return {
				allTableData: {},
				tableDatas: {},
				tableData: {},				
				formData: {
		          	type: '',
		          	describe: '',
		          	income: '',
		          	expend: '',
		          	cash: '',
		          	remark: '',
		          	id: ''
		        },
		        dialog: {
		        	show: false,
		        	title: "添加资金信息",
		        	option: 'add'
		        },
		        page_index: 1,
		        page_size: 5,
		        startTime: "",
		        endTime: ""
			}
		},
		computed: {
			userIdentity(){
				return this.$store.state.user.identity == "manager"
			}
		},
		methods:{
			getProfile(){
				this.$axios.get("/api/profile/get")
					.then(res => {
						if(res.status == 200){
							this.allTableData = res.data
							this.tableDatas = res.data
							this.setpagination()
						}
					})
					.catch(error => {
						console.log(error)
					})
			},
			handleEdit(index, row) {		    
		        this.dialog = {
		        	show: true,
		        	title: "编辑资金信息",
		        	option: 'edit'
		        }
		        this.formData = {
		        	type: row.type,
		          	describe: row.describe,
		          	income: row.income,
		          	expend: row.expend,
		          	cash: row.cash,
		          	remark: row.remark,
		          	id: row._id
		        }
		    },
		    handleDelete(index, row) {
		        this.$axios.delete(`/api/profile/delete/${row._id}`)
					.then(res => {
						if(res.status == 200){
							this.$message({
								showClose: true,
								message: "数据删除成功",
								type: 'success'
							})
							this.getProfile()
						}
					})
					.catch(error => {
						console.log(error)
					})
		    },
		    handleAdd(){
		    	this.dialog = {
		        	show: true,
		        	title: "添加资金信息",
		        	option: 'add'
		        }
		        this.formData = {
		        	type: '优惠券',
		          	describe: '',
		          	income: '',
		          	expend: '',
		          	cash: '',
		          	remark: '',
		          	id: ''
		        }
		    },
		    handleSizeChange(size){
		    	this.page_size = size
		    	this.setpagination()
		    },
		    handleCurrentChange(page){
		    	this.page_index = page
		    	this.setpagination()
		    },
		    setpagination(){
		    	this.tableData = this.tableDatas.slice((this.page_index - 1) * this.page_size, this.page_index * this.page_size)
		    },
		    handleSerch(){
		    	if(!this.startTime || !this.endTime){
		    		this.$message({
						showClose: true,
						message: "请选择时间区间",
						type: 'warning'
					})
					return
		    	}		    
		    	this.tableDatas = this.allTableData.filter(item => {
		    		let time = new Date(item.creatAt).getTime() 
		    		return this.startTime.getTime() <= time && time<= this.endTime.getTime()
		    	})
		    	this.page_index = 1
		    	this.page_size = 5	
		    	this.setpagination()	    	
		    }
		},
		filters:{
			formDate(value){
				return formatTime(value)
			}
		},
		created(){
			this.getProfile()			
		}
	}
</script>

<style lang="scss" scoped>

.fund{
	width: 100%;
	height: 100%;
	.container{
		width: 100%;
		padding: 16px;
		box-sizing: border-box;
	}
	.pagination-container{
		.pagination{
			text-align: right;
			padding-right: 20px;
		}
	}
}
</style>
<template>
	<header class="head-nav">
		<el-row>
		  	<el-col :span="12">
		  		<div class="logo-container">
		  			<span class="title">
		  				NMSL在线后台管理系统
		  			</span>
		  		</div>
		  	</el-col>
		  	<el-col :span="12">
		  		<div class="user-info">
		  			<img class="avatar" :src="user.avatar" alt="">
		  			<span class="welcome">欢迎&nbsp<span class="user-name">{{user.name}}</span></span>
		  			<el-dropdown class="menu" @command="handleCommand">
					  <span class="el-dropdown-link">
					    <i class="el-icon-caret-bottom el-icon--right"></i>
					  </span>
					  <el-dropdown-menu slot="dropdown">
					    <el-dropdown-item command="info">个人信息</el-dropdown-item>
					    <el-dropdown-item command="logout">退出</el-dropdown-item>				    
					  </el-dropdown-menu>
					</el-dropdown>

		  		</div>
		  	</el-col>
		</el-row>
	</header>
</template>

<script>
	import { mapState,mapMutations,mapGetters,mapActions} from "vuex"
	export default{
		name: "headnav",
		computed: {
			...mapState(['user']),
		},
		methods: {
			handleCommand(command){
				switch(command){
					case "info":
					this.showinfo()
					break
					case "logout":
					this.logout()
					break
				}
			},
			showinfo(){
				this.$router.push("/home/userinfo")
			},
			logout(){
				sessionStorage.removeItem('TOKEN')
				this.$store.dispatch("logout")
				this.$router.push("/login")
			}
		}
	}
	
</script>

<style lang="scss" scoped>
	.head-nav{
		width: 100%;
		height: 60px;
		line-height: 50px;
		min-width: 600px;
		padding: 5px;
		box-sizing: border-box;
		background-color: #324057;
		color: #fff;
		border-bottom: 1px solid #1f2d3d;
		.logo-container{
			padding-left: 10px;
			font-size: 22px;
			font-weight: bold;
		}
		.user-info{
			// float: right;
			display: flex;
		    justify-content: flex-end;
		    align-items: center;
		    padding-right: 24px;
			.avatar{
				display: inline-block;
				width: 40px;
				height: 40px;
				vertical-align: middle;
    			border-radius: 50%;
    			margin-right: 10px;
			}
			.welcome{
				.user-name{
					color: #409eff;
					font-weight: bold;
				}
			}
			.menu{
				color: #fff;
			}
		}
	}

</style>

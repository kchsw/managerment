<template>
	<div class="user">
		<div class="user-info">
			<img class="avatar" :src="user.avatar" alt="">
			<div class="user-desc">
	  			<span><i class="el-icon-user"></i>{{user.name}}</span>
	  			<span><i class="el-icon-setting"></i>{{identity}}</span>		
	  		</div>
		</div>			
	</div>
</template>

<script>
	import { mapState,mapMutations,mapGetters,mapActions} from "vuex"
	export default{
		name: "user",
		computed: {
			...mapState(['user']),
			identity(){
				return this.user.identity == "manager" ? "管理员" : "普通会员"
					
			}
		}
	}
</script>

<style lang="scss" scoped> 
	.user{
		width: 100%;
		height: 100%;
		display: flex;
        justify-content: center;
        align-items: center;
		.user-info{
			width: 300px;
			text-align: center;
			.avatar{
				width: 150px;
				height: 150px;
				border-radius: 50%;
				margin-bottom: 20px;
			}
			.user-desc{
				font-size: 24px;
				display: flex;
    			justify-content: space-around;
			}
		}
	}
</style>
<template>
	<el-menu
		class="menu"
        background-color="#324057"
        text-color="#fff"
        :router="true"
        :default-active="$route.path"
        active-text-color="#409eff">
        <el-menu-item index="/home">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-s-finance"></i>
            <span>资金管理</span>
          </template>       
            <el-menu-item index="/home/fundlist">资金流水</el-menu-item>         
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-info"></i>
            <span>信息管理</span>
          </template>       
            <el-menu-item index="/home/userinfo">个人信息</el-menu-item>         
        </el-submenu>
    </el-menu>
</template>

<script>
	export default{
		name: 'leftnav'
	}
</script>

<style lang="scss" scoped>
	.menu{
		border-right: none;
	}
</style>
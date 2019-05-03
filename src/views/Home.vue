<template>
  <div class="home">
  	<!-- <el-button>默认按钮</el-button><el-button type="primary">主要按钮</el-button>
    <img alt="Vue logo" src="../assets/logo.png"><el-link type="primary">主要链接</el-link>
    <HelloWorld msg="Welcome to Your shit Vue.js App"/> -->
    <!-- 我是🐟
    <el-button :plain="true" @click="test">消息</el-button> -->
    <head-nav/>
    <el-container>
      <el-aside class="el-com aside" width="200px">
        <left-nav/>
      </el-aside>
      <el-main class="el-com main">
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import HeadNav from '@/components/HeadNav.vue'
import LeftNav from '@/components/LeftNav.vue'
export default {
  name: 'home',
  components: {
    HeadNav,
    LeftNav
  },
  methods: {
    test(){
      this.$axios.get('api/users/current')
          .then(res => {
            console.log(res)
          })
    }
  }
}
</script>

<style lang="scss" scoped>
  .home{
    .el-com{
      height: calc(100vh - 60px);
    }
    .main{
      padding: 0;
    }
    .aside{
      background-color: #324057;
    }
  }
</style> 

<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Home</h1>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import $ from 'jquery'
console.log($('body').text())
export default {
  name: 'home',
  components: {
    // HelloWorld
  }
}
</script>

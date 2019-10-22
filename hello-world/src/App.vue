<template>
    <div id="app">
        <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
        <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
        <h1>Vue CLI Test</h1>
        <h2>Components</h2>
        <Test name="Ding" age="25"></Test>
        <h2>Data</h2>
        <p>{{ user }}</p>
        <h2>Methods</h2>
        <p>{{ products }}</p>
    </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Test from './components/Test.vue'

export default {
    name: 'app',
    data: function() {
    return {
            user: {
                username: 'ding',
                age: 25
            },
            products: []
        }
    },
    created: function() {
        this.products = this.getProducts();
    },
    methods: {
        getProducts: function() {
            return [
                {
                    name: 'cookie',
                    price: 10
                },
                {
                    name: 'tea',
                    price: 20
                }
            ]
        }
    },
    components: {
        // HelloWorld: HelloWorld,
        Test: Test
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>

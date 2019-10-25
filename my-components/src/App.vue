<template>
    <div id="app">
        <h1>Pagination</h1>
        <Pagination 
        :currentPage="1"
        :pageSize="2"
        :data="pageData"></Pagination>
    </div>
</template>

<script>
import Pagination from './components/Pagination.vue'
// import $ from 'jquery'
import _ from 'lodash'

console.log(_.cloneDeep);

export default {
    name: 'app',
    data: function() {
        return {
            pageData: [
                {
                    id: '1',
                    name: 'name1'
                },
                {
                    id: '2',
                    name: 'name2'
                },
                {
                    id: '3',
                    name: 'name3'
                },
            ]
        }
    },
    components: {
        Pagination
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

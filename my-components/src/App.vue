<template>
    <div id="app">
        <h1>Pagination</h1>
        <Pagination 
        class="page"
        :currentPage="currentPage"
        :pageSize="pageSize"
        :data="pageData"
        @change-page="changePage"></Pagination>

        <table class="table">
            <tr v-for="(d, index) in pageFilter" v-bind:key="index">
                <td>
                    {{ d.id }}
                </td>
                <td>
                    {{ d.name }}
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import Pagination from './components/Pagination.vue'
// import $ from 'jquery'
// import _ from 'lodash'


export default {
    name: 'app',
    data: function() {
        return {
            currentPage: 1,
            pageSize: 2,
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
    },
    computed: {
        pageFilter: function() {
            let startAt = this.pageSize * (this.currentPage - 1);
            let endAt = startAt + this.pageSize;
            return this.pageData.slice(startAt, endAt);
        }
    },
    methods: {
        changePage: function(currentPage) {
            this.currentPage = currentPage;
        }
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
  margin-top: 30px;
}
.page {
    
}
</style>

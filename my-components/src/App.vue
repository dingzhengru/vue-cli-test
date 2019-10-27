<template>
    <div id="app">
        <h1>SearchBy</h1>
        <SearchByKey
        :searchText="searchText"
        :data="pageData"
        :searchBy="searchBy"
        @search="searchByKey"></SearchByKey>

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
        <h1>DropdownSearch</h1>
        <DropdownSearch
        :searchText="searchText"
        :data="pageData"
        @search="dropdownSearch"></DropdownSearch>
    </div>
</template>

<script>
import SearchByKey from './components/SearchByKey.vue'
import Pagination from './components/Pagination.vue'
import DropdownSearch from './components/DropdownSearch.vue'
// import $ from 'jquery'
// import _ from 'lodash'

export default {
    name: 'app',
    components: {
        SearchByKey,
        Pagination,
        DropdownSearch,
    },
    data: function() {
        return {
            currentPage: 1,
            pageSize: 2,
            pageData: [
                {
                    id: '1',
                    name: 'Ding'
                },
                {
                    id: '2',
                    name: 'John'
                },
                {
                    id: '3',
                    name: 'Nigella'
                },
            ],
            searchText: '',
            searchBy: 'name',
        }
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
        },
        searchByKey: function(data) {
            this.pageData = data;
        },
        dropdownSearch: function(data) {
            this.pageData = data;
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

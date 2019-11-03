<template>
<div>   
    <h1>Product</h1>
    <br>
    <div class="form-group">
        <input type="text" v-model="search.text" class="form-control" id="searchInput" placeholder="search...">
    </div>
    <input type="text" v-model="product.name" placeholder="Name">
    <input type="number" v-model="product.price" placeholder="Pirce">
    <button @click="addProduct(product)" class="btn btn-success">addProduct</button>
    
    <button @click="isEdit = !isEdit" class="btn btn-warning">Edit</button>
    <button v-if="isEdit" @click="saveProducts(products)" class="btn btn-primary">Save</button>
    <table v-if="!isEdit" id="prodcut-table" class="table">
        <thead>
            <tr>
                <th scope="col" @click="sortProducts('id')">#</th>
                <th scope="col" @click="sortProducts('name')">Name</th>
                <th scope="col" @click="sortProducts('price')">Price</th>
            </tr>
        </thead>
        <tbody>
            <tr class="products-tr"
                v-for="(p,index) in productsFilter"
                :key="index">
                <td>{{ p.id }}</td>
                <td>{{ p.name }}</td>
                <td>{{ p.price }}</td>
                <td>
                    <button @click="removeProduct(p)" class="btn btn-danger">removeProduct</button>
                </td>
            </tr>
        </tbody>
    </table>
    <!-- Edit mode -->
    <table v-if="isEdit" id="prodcut-table" class="table">
        <thead>
            <tr>
                <th scope="col" @click="sortProducts('id')">#</th>
                <th scope="col" @click="sortProducts('name')">Name</th>
                <th scope="col" @click="sortProducts('price')">Price</th>
            </tr>
        </thead>
        <tbody>
            <tr class="products-tr" 
                v-for="(p,index) in productsFilter"
                :key="index">
                <td><input class="form-control" v-model="p.id" disabled></td>
                <td><input class="form-control" v-model="p.name"></td>
                <td><input type="number" class="form-control" v-model="p.price"></td>
                <td>
                    <button @click="removeProduct(p)" class="btn btn-danger">removeProduct</button>
                </td>
            </tr>
        </tbody>
    </table>

    <!-- Page -->

    <nav id="product-pagination" class="pagination-nav">
        <!-- currentPage <= 1 ? 0 : currentPage-- 前者為true會執行的 後者為false會執行的 -->
        <ul class="pagination">
            <li class="page-item" 
                v-bind:class="{ 'disabled': pagination.currentPage <= 1 }"
                @click="pagination.currentPage <= 1 ? 0 : pagination.currentPage--">
                <a class="page-link">Previous</a>
            </li>
            <li v-for="(p, index) in totalPage()"
                @click="pagination.currentPage = index + 1" class="page-item"
                :key="index">
                <a v-bind:class="{'disabled': pagination.currentPage == index + 1}" class="page-link btn" >{{ index + 1 }}</a>
                <!-- <a class="page-link">{{ index + 1 }}</a> -->
            </li>
            <li class="page-item" 
                v-bind:class="{ 'disabled': pagination.currentPage >= totalPage() }"
                @click="pagination.currentPage >= totalPage() ? 0 : pagination.currentPage++">
                <a class="page-link">Next</a>
            </li>
        </ul>
    </nav>
</div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import _ from 'lodash'

export default {
    name: 'product',
    data: function() {
        return {
            search: {
                text: '',
                field: ''
            },
            pagination :{
                currentPage: 1,
                pageSize: 4
            },
            isEdit: false,
            product: { name: '', price: null }, 
        }
    },
    components: {

    },
    beforeCreate: function(){
        console.log('beforeCreate: Product');
        this.$store.dispatch('product/getDataAction')
        .then((data) => {  })
        .catch((error) => console.log('getData error:', error));
    },
    computed: {
        products: function() {
            return this.$store.state.product.data;
        },
        productsFilter: function () {
            if(_.isEmpty(this.getFilterData())){
                this.$store.commit('product/setPage', this.pagination);
                return;
            }
            else
                return this.getFilterData();
        }
    },
    methods:{
        searchProductsByAll: function() {
            return this.$store.getters['product/getSearchData'];
        },
        getFilterData: function() {
            return this.$store.getters['product/getFilterData'];
        },
        sortProducts: function(field) {
            // set new sort(change asc <=> desc)
            let sort = this.$store.state.product.sort;
            sort.orderByField = field;
            sort.isAsc = !sort.isAsc;
            this.$store.commit('product/setSort', sort);
        },
        addProduct: function(product) {
            this.$store.dispatch('product/addDataAction', product)
            .then((data) => {  })
            .catch((error) => console.log('addProduct error:', error))
        },
        removeProduct: function(product) {
            this.$store.dispatch('product/removeDataAction', product)
            .then((data) => {  })
            .catch((error) => console.log('removeProduct error:', error))
        },
        saveProducts: function(products) {
            // update all Data
            for(let i in products) {
                this.updateProduct(products[i]);
            }
            // update Data
            this.$store.dispatch('product/getDataAction');
        },
        updateProduct: function(product) {
            this.$store.dispatch('product/updateDataAction', product)
            .then((data) => {  })
            .catch((error) => console.log('updateProduct error:', error))
        },
        totalPage: function() {
            // ceil 無條件進位
            return Math.ceil(this.searchProductsByAll(this.searchText).length / this.pagination.pageSize);
        }
    },
    watch: {
        'search.text': function(value, oldValue) {
            this.$store.commit('product/setSearch', this.search);
        }, 
        'search.field': function(value, oldValue) {
            this.$store.commit('product/setSearch', this.search);
        },
        'pagination.currentPage': function(value, oldValue) {
            this.$store.commit('product/setPage', this.pagination);
        },
        'pagination.pageSize': function(value, oldValue) {
            this.$store.commit('product/setPage', this.pagination);
        },
    }
}
</script>


<style scoped>
#prodcut-table {
    margin-top: 20px;
    margin-bottom: 0px;
}

#prodcut-table th:hover {
    cursor: pointer;
    background-color: gray;
}

.products-tr:hover {
    background-color: #F2F2F2;
}

/* page */
.pagination-nav{
    padding-bottom: 10px;
}
.pagination-nav ul{

}
.pagination-nav a {
    cursor: pointer;
}
</style>
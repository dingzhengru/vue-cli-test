# vue-cli test

## import js&css library (ex: lodash , jquery, bootstrap)
### 有兩種方式引入，第一種是在main.js上引入，另一種是傳統在index.html
### 1. main.js (import bootstrap.css & lodash)
```
import 'bootstrap/dist/css/bootstrap.min.css'
window._ = require('lodash')
window._ = require('lodash/core')
```
### .vue
```
<script>
import _ from 'lodash'
</script>
```
### 2. index.html (must use CDN)
#### 缺點是一定要用CDN才行
```
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
```
### .vue (還是要在該vue下引入才能使用)
```
<script>
import $ from 'jquery'
</script>
```
## change props value warn (ex: cuurentPage)
如何解決直接改變props值的警告，複製要改變的props到data上，去改變data的那個值即可
```
props: {currentPage: Number},
data: function () {
    return {
        clonePage: _.cloneDeep(this.currentPage)
    }
}
```
## My Components
### SearchByKey
#### props
```
{
    searchText: String,
    searchBy: String,
    data: Array
}
```
searchText: input text  
searchBy: default object key(預設搜尋的Key)  
#### custom event
```@search```get search data(Array)  
#### example
```
<SearchByKey
    :searchText="searchText"
    :data="pageData"
    :searchBy="searchBy"
    @search="searchByKey"></SearchByKey>

data: function() {
    return {
        searchText: '',
        searchBy: 'name',
        data: [],
    }
},
methods: {
    searchByKey: function(data) {
        this.data = data;
    }
}
```

### Pagination
#### props
```
{
    currentPage: Number,
    pageSize: Number,
    data: Array
}
```
currentPage: current page  
pageSize: 一頁顯示幾個資料  

#### custom event
```@change-page```get current page  
#### example
```
<Pagination 
    :currentPage="currentPage"
    :pageSize="pageSize"
    :data="pageData"
    @change-page="changePage"></Pagination>

data: function() {
    return {
        currentPage: 1,
        pageSize: 2,
        pageData: [],
    }
},
methods: {
    changePage: function(currentPage) {
        this.currentPage = currentPage;
    }
}
```
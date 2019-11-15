# Vue-CLI

*  <a href="#basic">Base</a>
*  <a href="#installation">Installation</a>
*  <a href="#vueserve">vue serve</a>
*  <a href="#vuecreate">vue create</a>
*  <a href="#各檔案的基本樣子">各檔案的基本樣子</a>
*  <a href="#firebase-in-vue-cli">Firebase in vue-cli</a>
*  <a href="#my-components">My Components</a>
*  <a href="#change-props-value-warn">change props value warn</a>
## Base

(vue-router, vuex)  
```
|- /public
|- /dist
|- /src
  |- /assets
  |- /components
    |- HelloWorld.vue
  |- /router
    |- index.js
  |- /store
    |- index.js
  |- /views
    |- Home.vue
  |- App.vue
  |- main.js
|- .eslintrc.js
|- package.json
```

## Installation
```npm install -g @vue/cli```  

## vue serve
**想執行單個.vue時可以使用**  
```npm install -g @vue/cli-service-global```  
```vue serve MyComponent.vue```  

## vue create 
```vue create [project-name]```

```
# 選擇預設或自訂，預設可以自己設定(最下面的問題就是問是否設為預設)
? Please pick a preset:
  default (babel, eslint)
❯ Manually select features

# 選取要安裝的特性
? Check the features needed for your project:
 ◉ Babel
 ◯ TypeScript
 ◯ Progressive Web App (PWA) Support
 ◉ Router
 ◉ Vuex
❯◉ CSS Pre-processors
 ◉ Linter / Formatter
 ◯ Unit Testing
 ◯ E2E Testing

# Vue Router 的 mode (模式) 使用 'history' (另一種 mode 為 'hash'，會在 URL 加上 '#' 符號)
? Use history mode for router? (Requires proper server setup for index fallback in production) (Y/n) Y

# CSS 預處理器
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default):
❯ Sass/SCSS (with dart-sass)
  Sass/SCSS (with node-sass)
  Less
  Stylus

# ESLint 協助讓你寫的程式符合規範的輔助工具，區分嚴謹程度
? Pick a linter / formatter config:
  ESLint with error prevention only
  ESLint + Airbnb config
❯ ESLint + Standard config
  ESLint + Prettier

# 代碼檢查時機
? Pick additional lint features: (Press <space> to select, <a> to toggle all, <i> to invert selection)
❯◉ Lint on save  # 存檔時
 ◯ Lint and fix on commit (requires Git)  # 提交更新時

# 看要統一把設定放在package.json還是都分成各個檔案(ex: .eslintrc.js)
? Where do you prefer placing config for Babel, PostCSS, ESLint, etc.? (Use arrow keys)
❯ In dedicated config files
  In package.json

# 是否將上述配置儲存到 preset 的 default (是否將以上配置設為預設)
? Save this as a preset for future projects? (y/N) N
```
```
cd project-name
npm run serve
```

## 各檔案的基本樣子

**/src/main.js**  
```
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```
**.vue**  
```
<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
// import components
import OtherVue from '../components/OtherVue.vue'

// import library or your js(ex: lodash)
import _ from 'lodash'

// use require
const _ = require('lodash'); // 引入全部
const _ = require('lodash/core'); // 只引入core部分

export default {
    name: '',
    data: function() {
        return {}
    },
    components: {
        
    },
}
</script>
```
**/src/router/index.js**  
```
import Vue from 'vue'
import VueRouter from 'vue-router'

// 在這就引入.vue 或 在下面引入也行
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
```

**/src/store/index.js**  
```
import Vue from 'vue'
import Vuex from 'vuex'

import OtherStore from './product.js'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        product: OtherStore
    }
})
```

## Firebase in vue-cli

創一個/src/firebase.js檔案
```
const firebase = require('firebase/app');
require('firebase/firestore');
require('firebase/auth');

const firebaseConfig = {};

const firestore = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export { firebase, db };
```

其他檔案引入 (ex: /src/store/index.js)
```
import { db } from '../firebase.js'
```


## import js&css library (ex: lodash , jquery, bootstrap)
### 有兩種方式引入，第一種是在main.js上引入，另一種是利用cdn在index.html引入
### 1. main.js (import bootstrap & lodash)
```
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

// 引入全部
var _ = require('lodash');
// 只引入core部分
var _ = require('lodash/core');
```
### .vue
```
<script>
import _ from 'lodash'
import $ form 'jquery'
</script>
```
### 2. index.html (use CDN)
**一定要用CDN才行**  
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


## My Components
### SearchByKey
**props**  
```
{
    searchText: String,
    searchBy: String,
    data: Array
}
```
searchText: input text  
searchBy: default object key(預設搜尋的Key)  
**custom event**  
```@search```get search data(Array)  
**example**  
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
**props**  
```
{
    currentPage: Number,
    pageSize: Number,
    data: Array
}
```
currentPage: current page  
pageSize: 一頁顯示幾個資料  

**custom event**  
```@change-page```get current page  
**example**  
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
### DropdownSearch



## change props value warn
**利用深拷貝複製一份全新的即可(lodash: _.cloneDeep())**  
```
props: {currentPage: Number},
data: function () {
    return {
        clonePage: _.cloneDeep(this.currentPage)
    }
}
```
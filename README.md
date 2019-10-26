# vue-cli test

## import js&css library (ex: lodash , jquery, bootstrap)
### 有兩種方式引入，一種是傳統在index.html，另一種是在main.js上引入
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
        cPage: _.cloneDeep(this.currentPage)
    }
}
```
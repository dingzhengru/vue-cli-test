# vue-cli test


## import js library (ex: lodash)

### main.js 
```
window._ = require('lodash')
window._ = require('lodash/core')
```
### .vue
```
<script>
import _ from 'lodash'
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
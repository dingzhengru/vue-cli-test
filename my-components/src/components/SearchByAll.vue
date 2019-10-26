<template>
    <div>
        <input 
        class="form-control"
        type="text"
        placeholder="SearchByAll" 
        v-model="sText">
    </div>
</template>

<script>
import _ from 'lodash'

export default {
    name: 'SearchByAll',
    props: {
        searchText: String,
        data: Array
    },
    data: function () {
        return {
            cloneData: _.cloneDeep(this.data),
            sText: _.cloneDeep(this.searchText)
        }
    },
    methods: {
        searchByAll: function(data, searchText) {
            return data.filter((d) => {
                for(let x in d) {
                    if(String(d[x]).toLowerCase().includes(searchText.toLowerCase())) return d;
                }
            })
        }
    }, 
    watch: {
        sText: function(text) {
            let data = this.searchByAll(this.cloneData, text);
            this.$emit('search', data);
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

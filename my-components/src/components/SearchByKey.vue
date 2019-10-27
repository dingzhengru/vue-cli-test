<template>
    <div>
        <select v-model="cloneSearchBy">
            <option value="">all</option>
            <option
            v-for="(d, index) in getDataObjectKeys(cloneData)"
            :value="d"
            :key="index">{{ d }}</option>
        </select>
        <input 
        class="form-control"
        type="text"
        placeholder="SearchByKey" 
        v-model="cloneSearchText">
    </div>
</template>

<script>
import _ from 'lodash'

export default {
    name: 'SearchByKey',
    props: {
        searchText: String,
        searchBy: String,
        data: Array
    },
    data: function () {
        return {
            cloneSearchText: _.cloneDeep(this.searchText),
            cloneSearchBy: _.cloneDeep(this.searchBy),
            cloneData: _.cloneDeep(this.data),
        }
    },
    methods: {
        searchByKey: function(data, searchText, key) {
            if(_.isEmpty(key))
                return data.filter((d) => {
                    for(let x in d) {
                        if(String(d[x]).toLowerCase().includes(searchText.toLowerCase())) 
                            return d;
                    }
                })
            else {
                return data.filter((d) => {
                    if(String(d[key]).toLowerCase().includes(searchText.toLowerCase())) 
                        return d;
                })
            }
        },
        getDataObjectKeys: function(data) {
            return Object.keys(data[0]);
        }
    }, 
    watch: {
        cloneSearchText: function(text) {
            let data = this.searchByKey(this.cloneData, text, this.cloneSearchBy);
            this.$emit('search', data);
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

select{
    margin-bottom: 10px;
}


</style>

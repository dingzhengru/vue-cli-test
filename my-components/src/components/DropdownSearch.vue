<template>
    <div>
        <!-- <select v-model="cloneSearchBy">
            <option value="">all</option>
            <option
            v-for="(d, index) in getDataObjectKeys(cloneData)"
            :value="d"
            :key="index">{{ d }}</option>
        </select> -->
        <form>
            <div class="form-group row dropdown-input-row">
                <div class="col-3"></div>
                <div class="col-6 dropdown-input-col">
                    <input 
                    class="form-control"
                    type="text"
                    placeholder="DropdownSearch" 
                    v-model="cloneSearchText">
                </div>
                <div class="col-3"></div>
            </div>
            <div 
            class="form-group row dropdown-row"
            v-for="(d, index) in searchByKey(cloneData, cloneSearchText, '')"
            :key="index">
                <div class="col-3"></div>
                <div class="col-6 dropdown-item" v-if="cloneSearchText != ''">
                    {{ d.id }} {{ d.name }}
                </div>
                <div class="col-3"></div>
            </div>
        </form>
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
.dropdown-input-row {
    margin-bottom: 0px;
}
.dropdown-input-row .dropdown-input-col {
    padding: 0px;
}

.dropdown-row {
    margin-bottom: 0px;
}

.dropdown-row .dropdown-item {
    background-color: gray;
    border-bottom: 1px solid black;
}

</style>

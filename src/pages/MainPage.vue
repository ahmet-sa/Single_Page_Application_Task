<template>
  <header-component ref="header"  @search="search" :form="form"  :dialogTitle="dialogTitle" ></header-component>
  <table-component :search-value="searchValue" :expandable="true"   put="users" delete="users" post="users" get="users"  :columns="columns"
  :form="form"></table-component>
</template>

<script>
import TableComponent from "../components/common/TableComponent.vue";
import {UserColumns} from "../utils/constant.js";
import {getInput} from "../utils/common.js";
import HeaderComponent from "../components/common/HeaderComponent.vue";

export default {
  name: "MainPage",
  components: {HeaderComponent, TableComponent},
  data(){
    return{
      columns:UserColumns,
      dialogTitle:'Add New',
      searchValue:"",
      form: {
        schema: {
          name: getInput('name', true, 12),
          year: getInput('year', true, 12),
          price:getInput('price', false, 12),
        },
        model: {}
      },

    }
  },
  methods: {
    search(val){
      console.log(val)
      this.searchValue=val
    }
  },
};
</script>

}

<style scoped>

</style>
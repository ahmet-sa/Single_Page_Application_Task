<template>
  <table-component :expandable="false"  :search-value="searchValue" put="users" delete="users" post="users" get="users"  :columns="columns"
                    :form="form"></table-component>
</template>

<script>
import TableComponent from "../components/common/TableComponent.vue";
import {UserColumns} from "../utils/constant.js";
import {getInput} from "../utils/common.js";
import HeaderComponent from "../components/common/HeaderComponent.vue";

export default {
  name: "UserPage" ,
  components: {HeaderComponent, TableComponent},
  data(){
    return{
      columns:UserColumns,
      dialogTitle:'Add New',
      form: {
        schema: {
          name: getInput('name', true, 12),
          year: getInput('year', true, 12),
          price:getInput('price', false, 12),
        },
        model: {}
      },
      searchValue:''

    }
  },
  methods: {
  },
};
</script>

}

<style scoped>

</style>
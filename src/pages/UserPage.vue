<template>
  <table-component :expandable="false"  :search-value="searchValue" put="users" delete="users" post="users" get="users"  :columns="columns"
                    :form="form"></table-component>
</template>

<script>
import TableComponent from "../components/common/TableComponent.vue";
import PostColumns from "../utils/constant.js";
import {getInput} from "../utils/common.js";
import HeaderComponent from "../components/common/HeaderComponent.vue";

export default {
  name: "UserPage" ,
  components: {HeaderComponent, TableComponent},
  data(){
    return{
      columns:PostColumns,
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
    async refresh() {
      await this.$refs.table.fetchData()
          .then(() => {
            this.$refs.header.loading = false;
          })
          .catch(error => {
            console.error("Error fetching data:", error);
            this.$refs.header.loading = false;
          });
    },

    search(val){
      this.searchValue=val
    }
  },
};
</script>

}

<style scoped>

</style>
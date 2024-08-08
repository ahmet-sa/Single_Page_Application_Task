<template>
  <header-component ref="header" @search="search"></header-component>
  <table-component :search-value="searchValue" :expandable="true" put="users" delete="users" post="users" get="users"
                   :columns="columns"
  ></table-component>
</template>

<script>
import TableComponent from "../components/common/TableComponent.vue";
import {UserColumns} from "../utils/constant.js";
import HeaderComponent from "../components/common/HeaderComponent.vue";

export default {
  name: "MainPage",
  components: {HeaderComponent, TableComponent},
  data() {
    return {
      columns: UserColumns,
      searchValue: "",
    }
  },
  methods: {
    search(val) {
      this.searchValue = val
    }
  },
};
</script>

}

<style scoped>

</style>
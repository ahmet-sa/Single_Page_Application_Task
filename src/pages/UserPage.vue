<template>
  <table-component :expandable="false"  put="users" delete="users" post="users" get="users"
                   :columns="columns"
  ></table-component>
</template>

<script>
import TableComponent from "../components/common/TableComponent.vue";
import {UserColumns} from "../utils/constant.js";
import HeaderComponent from "../components/common/HeaderComponent.vue";

export default {
  name: "UserPage",
  components: {HeaderComponent, TableComponent},
  data() {
    return {
      columns: UserColumns,
    }
  },
};
</script>

}

<style scoped>

</style>
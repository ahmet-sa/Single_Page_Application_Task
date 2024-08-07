<template>
  <div class="mt-16 mx-4 bg-[#D9D9D9] p-10 rounded-t-[45px]">
    <table class="w-full rounded-t-[20px] font-montserrat border-separate border-spacing-y-[20px]">
      <thead class="h-16 text-[#606060] text-center uppercase bg-red border-l-[10px] border-r-[10px] border-[#000]">
      <tr class="items-center my-2">
        <th v-for="column in columns" :key="column.name" class="text-[#606060] text-center uppercase bg-white">
          {{ column.label }}
        </th>
        <th class="text-center text-[#606060] bg-white"></th> <!-- For expand/collapse -->
      </tr>
      </thead>
      <tbody class="bg-white text-black">
      <!-- Iterate over rows to create table rows -->
      <template v-for="row in paginatedRows" :key="row.id">
        <!-- Table Row -->
        <tr>
          <td  v-for="column in columns" :key="column.name" class="p-5 text-center">
            {{ row[column.field] }}
          </td>

          <td  @click="toggleExpand(row.id)" class="p-5 text-center">
              <span v-if="expandable" class="material-icons cursor-pointer">
                {{ expandedRowId === row.id ? 'expand_less' : 'expand_more' }}
              </span>
          </td>

        </tr>
        <!-- Expanded Row -->
        <tr v-if="expandedRowId === row.id && expandable ">
          <td :colspan="columns.length + 1" class="text-center bg-gray-100">
            <row-detail-component></row-detail-component>
          </td>
        </tr>
      </template>
      </tbody>
    </table>

    <div class="flex justify-end w-full mt-4">
      <div class="h-12 w-52 bg-white rounded-full flex items-center justify-center">
        <div :class="{'opacity-50 cursor-not-allowed': currentPage === 1}" @click="previousPage" class="bg-gray-200 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer">
          <span class="material-icons h-5">arrow_back</span>
        </div>
        <span class="mx-3">Page {{ currentPage }} of {{ totalPages }}</span>
        <div :class="{'opacity-50 cursor-not-allowed': currentPage === totalPages}" @click="nextPage" class="bg-gray-200 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer">
          <span class="material-icons h-5">arrow_forward</span>
        </div>
      </div>
    </div>
  </div>

  <form-dialog
      ref="formDialog"
      v-model="edit"
      :title="title"
      :formSchema="form.schema"
      :formModel="form.model"
      @save="save"
  ></form-dialog>

  <confirmation-dialog
      ref="confirmationDialog"
      @save="deleteItem"
      @cancel="cancelDelete"
  ></confirmation-dialog>
</template>



<script>
import { mapGetters, mapActions } from 'vuex';
import FormDialog from "../dialog/formDialog.vue";
import ConfirmationDialog from "../dialog/confirmationDialog.vue";
import axiosInstance from "../../../axiosConfig.js";
import RowDetailComponent from "./RowDetailComponent.vue";

export default {
  name: 'TableComponent',
  components: {RowDetailComponent, ConfirmationDialog, FormDialog },
  props: {

    form: Object,
    columns: { type: Array, required: true },
    searchValue: String,
    get: { type: String, required: true },
    post: { type: String, required: true },
    delete: { type: String, required: true },
    put: { type: String, required: true },
    initialData: { type: Array, default: () => [] },
    expandable: {
      default:false
    },
  },
  data() {
    return {
      title: 'Edit Item',
      edit: false,
      rows: this.initialData,
      loading: false,
      editItem: null,
      deleteItemObject: null,
      currentPage: 1,
      expandedRowId: null, // Track the expanded row ID
    };
  },
  computed: {
    ...mapGetters(['itemsPerPage']),

    paginatedRows() {
      let start = parseInt((this.currentPage - 1) * this.itemsPerPage, 10);
      let end = parseInt(start + this.itemsPerPage, 10);

      return this.filteredRows.slice(start, end);
    },

    totalPages() {
      return Math.ceil(this.filteredRows.length / this.itemsPerPage);
    },

    filteredRows() {
      if (!this.searchValue) return this.rows;
      const search = this.searchValue.toLowerCase();
      return this.rows.filter(row =>
          Object.values(row).some(value => value?.toString().toLowerCase().includes(search))
      );
    }
  },
  methods: {
    ...mapActions(['updateItemsPerPage']),

    async fetchData() {
      this.loading = true;
      try {
        const response = await axiosInstance.get(this.get);
        this.rows = response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        this.loading = false;
      }
    },

    async addItem(item) {
      try {
        await axiosInstance.post(this.post, item);
        this.fetchData();
      } catch (error) {
        console.error('Error adding item:', error);
      }
    },

    save() {
      this.putItem(this.editItem);
    },

    openDeleteDialog(item) {
      item.loadingDelete = true;
      this.deleteItemObject = item;
      this.$refs.confirmationDialog.dialog = true;
    },

    cancelDelete() {
      this.deleteItemObject.loadingDelete = false;
    },

    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },

    toggleExpand(rowId) {
      this.expandedRowId = this.expandedRowId === rowId ? null : rowId;
    }
  },
  watch: {
    itemsPerPage() {
      this.currentPage = 1;
    }
  },
  mounted() {
    this.fetchData();
  }
}
</script>





<style scoped>
table {
  border-spacing: 0 20px;
}

th,
td {
  padding: 20px;
}

tr {
  border-top: 1px solid transparent;
}
</style>

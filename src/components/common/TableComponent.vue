<template>
  <div class="mt-16 mx-4 bg-[#D9D9D9] p-10 rounded-t-[20px]">
    <table class="w-full rounded-t-[20px] font-montserrat border-separate border-spacing-y-[20px]">
      <thead class="h-16 text-[#606060] text-center uppercase bg-red border-l-[10px] border-r-[10px] border-[#000]">
      <tr class="items-center my-2">
        <th v-for="column in columns" :key="column.name" class="text-[#606060] text-center uppercase bg-white">
          {{ column.label }}
        </th>
      </tr>
      </thead>
      <tbody class="bg-white text-black">
      <tr v-for="row in paginatedRows" :key="row.id">
        <td v-for="column in columns" :key="column.name" class="p-5 text-center">
          {{ row[column?.field] }}
        </td>
      </tr>
      </tbody>
    </table>

    <div class="pagination-controls">
      <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>

  <form-dialogs
      ref="formDialog"
      v-model="edit"
      :title="title"
      :formSchema="form.schema"
      :formModel="form.model"
      @save="save"
  ></form-dialogs>

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

export default {
  name: 'TableComponent',
  components: { ConfirmationDialog, FormDialog },
  props: {
    form: Object,
    columns: { type: Array, required: true },
    searchValue: String,
    get: { type: String, required: true },
    post: { type: String, required: true },
    delete: { type: String, required: true },
    put: { type: String, required: true },
    initialData: { type: Array, default: () => [] }
  },
  data() {
    return {
      title: 'Edit Item',
      edit: false,
      rows: this.initialData,
      loading: false,
      editItem: null,
      deleteItemObject: null,
      currentPage: 1, // Current page number
    };
  },
  computed: {
    ...mapGetters(['itemsPerPage']),

    paginatedRows() {
      let start = parseInt((this.currentPage - 1) * this.itemsPerPage, 10);
      let end = parseInt(start + this.itemsPerPage, 10);

      console.log(start);
      console.log(end);

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
    }
  },
  watch: {
    itemsPerPage() {
      this.currentPage = 1; // Reset to the first page when itemsPerPage changes
    }
  },
  mounted() {
    this.fetchData();
  }
}
</script>

<style>
thead {
  border-left: 10px solid #000;
  border-right: 10px solid #000;
}

table {
  width: 100%;
  border-spacing: 0 20px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

th,
td {
  padding: 20px;
}

tr {
  border-top: 1px solid transparent;
}

thead {
  background-color: black;
  color: white;
}

tbody {
  background-color: white;
  color: black;
}

.pagination-controls {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>

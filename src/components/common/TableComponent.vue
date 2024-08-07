<template>
  <div class="mt-6 mx-4 bg-[#D9D9D9] p-10 rounded-t-[45px]">
    <table class="w-full rounded-t-[20px] font-montserrat border-separate border-spacing-y-[20px]">
      <thead class="h-16 text-[#606060] text-center uppercase bg-red border-l-[10px] border-r-[10px] border-[#000]">
      <tr class="items-center my-2">
        <th class="text-center bg-white">
          <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" />
        </th>
        <th v-for="column in columns" :key="column.field" class="text-[#606060] text-center uppercase bg-white">
          {{ column.label }}
        </th>
        <th class="text-center text-[#606060] bg-white"></th>
      </tr>
      </thead>
      <tbody class="bg-white text-black">
      <template v-for="row in paginatedRows" :key="row.id">
        <tr :class="{ 'bg-[#E3FFE4]': checkSelected(row) }">
          <td class="p-5 text-center">
            <input type="checkbox" :value="row.id" :checked="checkSelected(row)" @change="toggleRowSelection(row)" />
          </td>
          <td v-for="column in columns" :key="column.field" class="p-5 text-center">
            {{ row[column.field] }}
          </td>
          <td @click="toggleExpand(row.id)" class="p-5 text-center">
              <span v-if="expandable" class="material-icons cursor-pointer">
                {{ expandedRowId === row.id ? 'expand_less' : 'expand_more' }}
              </span>
          </td>
        </tr>
        <tr v-if="expandedRowId === row.id && expandable">
          <td :colspan="columns.length+2" class="text-center bg-[#F8F6F6] w-full">
            <row-detail-component :row="row"></row-detail-component>
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
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import axiosInstance from "../../../axiosConfig.js";
import RowDetailComponent from "./RowDetailComponent.vue";

export default {
  name: 'TableComponent',
  components: { RowDetailComponent },
  props: {
    form: Object,
    columns: Array,
    searchValue: String,
    get: { type: String, required: true },
    post: { type: String, required: true },
    delete: { type: String, required: true },
    put: { type: String, required: true },
    initialData: { type: Array, default: () => [] },
    expandable: { default: false },
  },
  data() {
    return {
      rows: this.initialData,
      currentPage: 1,
      expandedRowId: null,
      selectAll: false,
    };
  },
  computed: {
    ...mapGetters(['itemsPerPage', 'selectedRows']),
    paginatedRows() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredRows.slice(start, start + this.itemsPerPage);
    },
    totalPages() {
      return Math.ceil(this.filteredRows.length / this.itemsPerPage);
    },
    filteredRows() {
      if (!this.searchValue) return this.rows;
      const search = this.searchValue.toLowerCase();
      return this.rows.filter(row => Object.values(row).some(value => value?.toString().toLowerCase().includes(search)));
    }
  },
  methods: {
    ...mapActions(['updateItemsPerPage', 'updateSelectedRows']),
    async fetchData() {
      try {
        const response = await axiosInstance.get(this.get);
        this.rows = response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    checkSelected(row) {
      return this.selectedRows.some(selectedRow => selectedRow.id === row.id);
    },
    toggleSelectAll() {
      const allRows = this.filteredRows;
      this.updateSelectedRows(this.selectAll ? allRows : []);
    },
    toggleRowSelection(row) {
      const newSelectedRows = this.selectedRows.some(selectedRow => selectedRow.id === row.id)
          ? this.selectedRows.filter(selectedRow => selectedRow.id !== row.id)
          : [...this.selectedRows, row];
      this.updateSelectedRows(newSelectedRows);
    },
    previousPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    toggleExpand(rowId) {
      this.expandedRowId = this.expandedRowId === rowId ? null : rowId;
    }
  },
  watch: {
    itemsPerPage() {
      this.currentPage = 1;
    },
    selectedRows() {
      this.selectAll = this.filteredRows.length && this.selectedRows.length === this.filteredRows.length;
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
th, td {
  padding: 20px;
}
tr {
  border-top: 1px solid transparent;
}
</style>

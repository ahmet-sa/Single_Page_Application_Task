<template>
  <div class="mt-70px ma-4">
    <table class="custom-table">
      <thead>
      <tr>
        <th v-for="column in columns" :key="column.name">{{ column.label }}</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="row in filteredRows" :key="row.name">
        <td v-for="column in columns" :key="column.name">{{ row[column.name] }}</td>
        <td>
          <button :disabled="row.loadingItem" class="btn primary" @click="editItemGet(row)">
            Edit
            <span class="tooltip">Edit Item</span>
          </button>
          <button :disabled="row.loadingDelete" class="btn primary" @click="openDeleteDialog(row)">
            Delete
            <span class="tooltip">Delete Item</span>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
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

import FormDialog from "@/components/dialog/formDialog.vue";
import ConfirmationDialog from "@/components/dialog/confirmationDialog.vue";

export default {
  name: 'TableComponent',
  components: {ConfirmationDialog, FormDialog},
  props: {
    form: Object,
    columns: { type: Array, required: true },
    apiType: { type: String, required: true, validator: value => ['person', 'order'].includes(value) },
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
    };
  },
  computed: {
    filteredRows() {
      if (!this.searchValue) return this.rows;
      const search = this.searchValue.toLowerCase();
      return this.rows.filter(row =>
          Object.values(row).some(value => value?.toString().toLowerCase().includes(search))
      );
    }
  },
  methods: {
    async fetchData() {
      this.loading = true;
      try {
        const response = await this[`$${this.apiType}`].get(this.get);
        this.rows = response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        this.loading = false;
      }
    },
    async addItem(item) {
      try {
        await this[`$${this.apiType}`].post(this.post, item);
        this.fetchData();
      } catch (error) {
        console.error('Error adding item:', error);
      }
    },
    async editItemGet(item) {
      item.loadingItem = true;
      try {
        const response = await this[`$${this.apiType}`].get(`${this.get}/${item.id}`);
        this.$emit('formModel', response.data);
        this.edit = true;
        this.editItem = item;
      } catch (error) {
        console.error('Error editing item:', error);
      } finally {
        item.loadingItem = false;
      }
    },
    async putItem(item) {
      try {
        const formData = this.$refs.formDialog.$refs.formBuilder.getData();
        await this[`$${this.apiType}`].put(`${this.put}/${item.id}`, formData);
        this.edit = false;
        this.fetchData();
      } catch (error) {
        console.error('Error updating item:', error);
      }
    },
    async deleteItem() {
      this.$refs.confirmationDialog.loading = true;
      try {
        await this[`$${this.apiType}`].delete(`${this.delete}/${this.deleteItemObject.id}`);
        this.fetchData();
      } catch (error) {
        console.error('Error deleting item:', error);
      } finally {
        this.deleteItemObject.loadingDelete = false;
        this.$refs.confirmationDialog.loading = false;
        this.$refs.confirmationDialog.dialog = false;
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
    }
  },
  mounted() {
    this.fetchData();
  }
}
</script>
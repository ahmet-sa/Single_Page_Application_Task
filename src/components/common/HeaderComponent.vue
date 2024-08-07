<template>
  <div class="mt-16 bg-white ma-4">
    <div class="w-full flex justify-between">
      <div class="flex no-wrap">
        <button
            class="ml-4 py-2 px-4 rounded text-white cursor-pointer transition bg-blue-500 hover:bg-blue-600 relative"
            aria-label="Add"
            @click="onAdd"
        >
          Add Item
          <span class="hidden bg-gray-800 text-white p-2 rounded absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 tooltip">Add New</span>
        </button>
        <input
            type="text"
            class="ml-4 py-2 px-4 border rounded"
            placeholder="Search..."
            v-model="searchQuery"
        />
      </div>
      <button
          class="py-2 px-4 rounded text-white cursor-pointer transition bg-blue-500 hover:bg-blue-600 relative"
          :class="{ 'opacity-50 cursor-not-allowed': loading }"
          @click="refresh"
      >
        <span v-if="!loading">Refresh</span>
        <span v-else>Loading...</span>
        <span class="hidden bg-gray-800 text-white p-2 rounded absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 tooltip">Refresh Data</span>
      </button>
    </div>
  </div>

  <form-dialog
      ref="formDialog"
      v-model="addNew"
      :title="dialogTitle"
      :formSchema="form.schema"
      :formModel="form.model"
      @save="save"
  ></form-dialog>
</template>

<script>
import FormDialog from "../dialog/formDialog.vue";

export default {
  name: "HeaderComponent",
  components: { FormDialog },
  props: {
    form: {
      schema: Object,
      model: Object,
    },
    dialogTitle: String,
  },
  data() {
    return {
      loading: false,
      searchQuery: '',
      addNew: false,
    };
  },
  methods: {
    onAdd() {
      this.addNew = true;
      this.$emit('addNew');
    },
    save() {
      this.$emit('postData', this.$refs.formDialog.$refs.formBuilder.getData());
      this.addNew = false;
    },
    refresh() {
      this.loading = true;
      this.$emit('refresh');
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
  },
  watch: {
    searchQuery(newQuery) {
      this.$emit('search', newQuery);
    },
  },
};
</script>

<style scoped>
button:hover .tooltip {
  display: block;
}
</style>

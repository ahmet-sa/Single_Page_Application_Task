<template>
  <div class="mt-60px bg-white ma-4">
    <div class="w-full flex justify-between">
      <div class="flex no-wrap">
        <button
            class="ml-4 pa-2 btn primary"
            aria-label="Add"
            @click="onAdd"
        >
          Add Item
          <span class="tooltip">Add New</span>
        </button>
        <input
            type="text"
            class="ml-4 search-input"
            placeholder="Search..."
            v-model="searchQuery"
        />
      </div>

      <button
          class="btn primary"
          :class="{ loading: loading }"
          @click="refresh"
      >
        <span v-if="!loading">Refresh</span>
        <span v-else>Loading...</span>
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

import FormDialog from "@/components/dialog/formDialog.vue";

export default {
  name: "HeaderComponent",
  components: {FormDialog},
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
      }, 1000); // Simulating loading duration
    },
  },
  watch: {
    searchQuery(newQuery) {
      this.$emit('search', newQuery);
    },
  },
};
</script>

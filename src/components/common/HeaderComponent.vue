<template>
  <div class="mt-16 bg-white ma-4">
    <div class="w-full flex justify-between bg-#F2F2F2">
      <div class="flex no-wrap w-full justify-between">
        <div class="!w-[212px] h-[52px] left-[291px] top-[96px] !border-0">
          <button
              class="!w-[212px] h-[52px] text-black font-montserrat bg-white text-sm leading-5 flex items-center !border-0 justify-center shadow-lg !rounded-tr-2xl !rounded-tl-2xl !rounded-br-2xl rounded-bl-[40px]"
              aria-label="Add"
              @click="onAdd"
          >
            <span class="mr-3">Kullanıcı Ekle</span>
          </button>
        </div>
        <input
            type="text"
            class="ml-4 py-2 px-4 border rounded w-full mr-8 border-0 shadow-lg"
            placeholder="Search..."
            v-model="searchQuery"
        />
        <dropdown class="shadow-lg bg-white !rounded-tr-2xr !rounded-tl-2xr !rounded-br-2xr rounded-br-[40px] bg-white w-[211px] "  :options="[6, 10, 20, 30]"
                   :itemsPerPage="itemsPerPage"
                   @update:itemsPerPage="updateItemsPerPage">
        </dropdown>
      </div>
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
import { mapGetters, mapActions } from 'vuex';
import FormDialog from "../dialog/formDialog.vue";
import Dropdown from "./dropdown.vue";

export default {
  name: "HeaderComponent",
  components: {Dropdown, FormDialog },
  props: {
    form: {
      schema: Object,
      model: Object,
    },
    dialogTitle: String,
  },
  data() {
    return {
      searchQuery: '',
      addNew: false,
      options: [6, 10, 20, 30], // Options for items per page
    };
  },
  computed: {
    ...mapGetters(['itemsPerPage']), // Get itemsPerPage from Vuex store
  },
  methods: {
    ...mapActions(['updateItemsPerPage']), // Map updateItemsPerPage action

    onAdd() {
      this.addNew = true;
      this.$emit('addNew');
    },
    save() {
      this.$emit('postData', this.$refs.formDialog.$refs.formBuilder.getData());
      this.addNew = false;
    },
    handleItemsPerPageChange(event) {
      const val = parseInt(event.target.value, 10);
      this.updateItemsPerPage(val);
    }
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

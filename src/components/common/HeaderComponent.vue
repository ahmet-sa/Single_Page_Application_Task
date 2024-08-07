<template>
  <div class="mt-8 bg-white ma-4">
    <div class="w-full flex justify-between bg-#F2F2F2">
      <button
          class="!w-[212px] h-[52px] text-black font-montserrat bg-white text-sm leading-5 flex items-center !border-0 justify-center shadow-lg !rounded-tr-2xl !rounded-tl-2xl !rounded-br-2xl rounded-bl-[40px]"
          aria-label="Add"
          @click="onAdd"
      >
        <span class="mr-3">Kullanıcı Ekle</span>
      </button>

      <input
          type="text"
          class="ml-4 py-2 px-4 border rounded w-full mr-8 border-0 shadow-lg"
          placeholder="Search..."
          v-model="searchQuery"
      />

      <dropdown
          class="shadow-lg bg-white !rounded-tr-2xr !rounded-tl-2xr !rounded-br-2xr rounded-br-[40px] bg-white w-[211px]"
          :options="[6, 10, 20, 30]"
          :itemsPerPage="itemsPerPage"
          @update:itemsPerPage="updateItemsPerPage"
      ></dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Dropdown from "./dropdown.vue";
import axiosInstance from "../../../axiosConfig.js";

export default {
  name: "HeaderComponent",
  components: { Dropdown },
  props: {
    form: Object,
    dialogTitle: String,
  },
  data() {
    return {
      searchQuery: '',
      addNew: false,
    };
  },
  computed: {
    ...mapGetters(['itemsPerPage', 'selectedRows']),
  },
  methods: {
    ...mapActions(['updateItemsPerPage']),

    async onAdd() {
      this.addNew = true;
      this.$emit('addNew');

      for (const { id, ...rowData } of this.selectedRows) {
        try {
          await axiosInstance.post("users", rowData);
        } catch (error) {
          console.error('Error posting row:', rowData, error);
        }
      }
    },
  },
  watch: {
    searchQuery(newQuery) {
      this.$emit('search', newQuery);
    },
  },
};
</script>


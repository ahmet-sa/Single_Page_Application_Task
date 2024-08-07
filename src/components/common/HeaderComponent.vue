<template>
  <div class="mt-16 bg-white ma-4  ">
    <div class="w-full flex justify-between bg-#F2F2F2">

      <div class="flex no-wrap w-full justify-between">

        <div class=" w-[211px] h-[52px] left-[291px] top-[96px]  !border-0 ">
          <button
              class=" w-full h-full text-black font-montserrat bg-white text-sm leading-5 flex items-center !border-0 justify-center shadow-lg !rounded-tr-2xl !rounded-tl-2xl !rounded-br-2xl rounded-bl-[40px] "
              aria-label="Add"
              @click="onAdd"
          >
            <span class="mr-3">Kullanıcı Ekle</span>

          </button>
        </div>
        <input
            type="text"
            class="ml-4 py-2 px-4 border rounded w-full mr-8  border-0 shadow-lg"
            placeholder="Search..."
            v-model="searchQuery"
        />

        <div class=" w-[211px] h-[52px] left-[291px] top-[96px]  !border-0 ">
          <button
              class=" w-full h-full text-black font-montserrat bg-white text-sm leading-5 flex items-center !border-0 justify-center shadow-lg !rounded-tr-2xl !rounded-tl-2xl !rounded-br-2xl rounded-bl-[40px] "
              aria-label="Add"
              @click="onAdd"
          >
            <span class="mr-3">Kullanıcı Ekle</span>

          </button>
        </div>
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
import FormDialog from "../dialog/formDialog.vue";

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

<template>
  <div v-if="dialog">
    <div>
      <div >Do you want to delete?</div>
      <div >
        <button :disabled="loading" @click="close" >Cancel</button>
        <button :disabled="loading" @click="save" >Save</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "confirmationDialog",
  data() {
    return {
      dialog: false,
      loading: false,
    };
  },
  methods: {
    save() {
      this.loading = true;
      this.$emit('save');
      this.dialog = false;
      this.loading = false;
    },
    close() {
      this.dialog = false;
      this.$emit('cancel');
    },
  },
};
</script>




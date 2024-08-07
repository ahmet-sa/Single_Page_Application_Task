<template>
  <div v-if="dialog" class="dialog-overlay">
    <div class="dialog-card">
      <div class="dialog-header">{{ title }}</div>
      <form-builder ref="formBuilder" class="w-full" :dense="true" :schema="formSchema" :model="formModel"></form-builder>
      <div class="dialog-actions">
        <button @click="save" class="dialog-button">Save</button>
        <button @click="dialog = false" class="dialog-button">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>


import FormBuilder from "../form-builder/form-builder.vue";

export default {
  name: "FormDialog",
  components: {FormBuilder},
  props: {
    title: {
      type: String,
      required: true
    },
    modelValue: {
      type: Boolean,
      required: true
    },
    formSchema: {
      type: Object,
      required: true
    },
    formModel: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dialog: this.modelValue,
      form: {
        schema: this.formSchema,
        model: this.formModel
      }
    };
  },
  watch: {
    modelValue(newVal) {
      this.dialog = newVal;
    },
    dialog(newVal) {
      this.$emit('update:modelValue', newVal);
    }
  },
  methods: {
    save() {
      this.$emit('save', this.form.model);
      this.dialog = false;
    }
  }
};
</script>

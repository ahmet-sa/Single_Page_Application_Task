<template>
  <form ref="formReference" @submit.prevent="submitForm">
    <div>
      <div class="flex">
        <div class="col-12" v-for="(item, name) in schema" :key="name">
          <div class="mx-xs">
            <component
                :is="item.type"
                v-bind="{ ...item }"
                v-model="formData[name]"
                :label="generateLabel(item)"
                lazy-rules
                @changed="handleFieldChange(item, $event, name)"
                :rules="[val => validateFieldRules(val, item)]"
            ></component>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "FormBuilder",
  props: {
    schema: {
      type: Object,
      required: true
    },
    model: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      default: () => ({})
    },
  },
  emits: ['update:model', 'changed'],
  data() {
    return {
      allComponentsReady: false,
      defaultOptions: {
        ...this.options
      },
      formData: { ...this.model }
    };
  },
  methods: {
    updateContentService(ref, listener, data) {
      const targetParam = listener.target.value;
      const newValue = listener.source.value ? data[listener.source.value] : data;

      if (ref.contentService && ref.contentService.params[targetParam] !== newValue) {
        ref.options = null;
        ref.contentService = {
          url: ref.contentService.url,
          params: { [targetParam]: newValue }
        };
        this.formData[listener.target.name] = null;
      }
    },

    processListeners() {
      let allComponentsReady = true;
      for (const [key, field] of Object.entries(this.schema)) {
        if (field?.listeners) {
          field.listeners.forEach(listener => {
            const sourceName = listener.source.name;
            const data = this.formData[sourceName];
            field.disable = listener.source.required && !data;
            if (data) {
              const ref = this.$refs[key]?.[0] || field;
              if (ref.ready === false) {
                allComponentsReady = false;
              }
              if (listener.target.name === 'params' && ref) {
                if (typeof ref.contentService === 'string') {
                  ref.contentService = { url: ref.contentService, params: {} };
                }
                this.updateContentService(ref, listener, data);
              }
            }
          });
        }
      }

      this.allComponentsReady = allComponentsReady;
    },

    collectFormData() {
      return this.formData;
    },

    submitForm() {
      for (let val of Object.keys(this.schema)) {
        if (this.$refs[val]?.length > 0) {
          if (!this.$refs[val][0]?.validate()) return false;
        }
      }
      return true;
    },

    handleFieldChange(item, value, name) {
      this.collectFormData();
      this.processListeners();
      this.callItemChanged(item, value);
      this.emitChangeEvents(value);
    },

    callItemChanged(item, value) {
      if (typeof item.changed === 'function') {
        item.changed(value);
      }
    },

    emitChangeEvents(value) {
      setTimeout(() => {
        if (this.allComponentsReady) {
          this.$emit('changed', value);
          this.$emit('update:model', value);
        }
      });
    },


    validateFieldRules(value, field) {
      if (field.required) {
        if (value === undefined || value === null || (typeof value === 'string' && value.trim() === '') || (Array.isArray(value) && value.length === 0) || (typeof value === 'object' && Object.keys(value).length === 0)) {
          return false;
        }
      }
      return true;
    },


    generateLabel(field) {
      if (!field || !field.label) {
        return '';
      }
      const { label, required } = field;
      return this.formatLabel(label, required);
    },

    formatLabel(text, isRequired) {
      return isRequired ? `${text} ${this.requiredIndicator}` : text;
    },

    get requiredIndicator() {
      return '*';
    }

  },
  created() {
    this.processListeners();
  }
}
</script>


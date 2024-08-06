<template>
  <div>
    <div class="pb-8px" v-if="inputType === 'number'">
      <label v-if="label">{{ label }}</label>
      <input type="number"
             :value="inputValue"
             @input="onInputChange($event)"
             ref="input" />
      <span v-if="icon" class="icon">{{ icon }}</span>
      <div class="text-14px" v-if="appendText">{{ appendText }}</div>
    </div>
    <div v-else>
      <label v-if="label">{{ label }}</label>
      <input :type="inputType ?? 'text'"
             :value="inputValue"
             @input="onInputChange($event)"
             ref="input"
             v-bind="{...$attrs, ...$props}" />
      <span v-if="icon" class="icon">{{ icon }}</span>
      <div class="text-14px" v-if="appendText">{{ appendText }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomInput",
  props: {
    modelValue: [String, Number],
    dataType: {
      type: String,
      default: 'text'
    },
    label: String,
    icon: String,
    appendText: String,
    dense: Boolean,
    outlined: Boolean,
  },
  data() {
    return {
      inputValue: this.modelValue
    }
  },
  watch: {
    modelValue(newValue) {
      this.inputValue = newValue;
    }
  },
  methods: {
    validate() {
    },
    onInputChange(event) {
      const value = event.target.value;
      setTimeout(() => {
        this.$emit('update:modelValue', value);
        this.$emit('inputChanged', value);
      });
    }
  }
}
</script>

<style scoped>
</style>

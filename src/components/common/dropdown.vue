<template>
  <div class="relative inline-block bg-white ">
    <button
        class="w-[211px] bg-white h-[52px] !border-0 shadow-lg flex items-center justify-center rounded-tr-[20px] rounded-tl-[20px] rounded-br-[40px]  "
        @click="toggleDropdown">
      <label class="text-center">1 - {{ selectedOption.label || itemsPerPage }} in 30</label>
      <span class="material-icons cursor-pointer mx-4">
        keyboard_double_arrow_down
              </span>
    </button>
    <div v-if="isDropdownOpen"
         class="absolute top-full left-0 w-full bg-white border border-gray-300 shadow-lg rounded-md z-10 flex flex-col p-2">
      <div v-for="option in options" :key="option" class="p-2 cursor-pointer hover:bg-gray-200"
           @click="selectOption(option)">
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DropdownMenu',
  props: {
    options: {
      type: Array,
      required: true
    },
    itemsPerPage: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      isDropdownOpen: false,
      selectedValue: this.itemsPerPage
    };
  },
  computed: {
    selectedOption() {
      return this.options.find(option => option.value === this.selectedValue) || {};
    }
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    selectOption(option) {
      this.selectedValue = option;
      this.$emit('update:itemsPerPage', this.selectedValue);
      this.isDropdownOpen = false;
    }
  }
};
</script>

<style scoped>
</style>

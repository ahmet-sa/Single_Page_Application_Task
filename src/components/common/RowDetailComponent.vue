<template>
  <div class="flex justify-between w-full  ">
    <div>
      <img class="w-128px h-128px rounded-full" :src="detail.image" ></img>
    </div>
    <div class="flex flex-col ml-26px mr-96px  ">
      <div class="w-210px h-26px bg-white ">
        <div>{{row.firstname}} {{row.lastname}}</div>
      </div>
      <div class="w-210px h-26px bg-white my-2">
        <div>{{row.email}}</div>
      </div>
      <div class="w-210px h-26px bg-white my-2">
        <div>{{row.birthDate}}</div>
      </div>
      <div class="w-210px h-26px bg-white">
        <div>{{row.phone}}</div>
      </div>

    </div>
    <div class="flex flex-col  w-full " >
      <div class="mb-4 bg-white text-bold pa-2 text-14px ">
        {{detail.title}}
      </div>
      <div class="bg-white text-left pa-4 text-14px">
        {{detail.content}}
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from "../../../axiosConfig.js";

export default {
  name: "RowDetailComponent",
  props: {
    row: {
      type: {},
      required: true,

    }
  },
  data() {
    return {
      detail:{},
    };
  },
  methods: {
    async fetchData() {
      try {
        // Use template literals to insert the id into the URL
        const response = await axiosInstance.get(`posts/${this.row.id}`);
        this.detail = response.data;  // Store the fetched data
        console.log(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.fetchData();
  }
}
</script>

<style scoped>
/* Add styles here if needed */
</style>

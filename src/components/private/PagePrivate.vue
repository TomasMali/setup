<template>
  <div>
    <!--   grid -->
    <div class="mt-8 grid lg:grid-cols-2 gap-10 mx-8">
      <div class="card">
        <div class="col-span-1 lg:col-span-6">
          <h4 class="text-3xl text-gray-700 mb-5">Create Event</h4>
          <div class="p-10 rounded-md shadow-md bg-white">
            <div class="mb-6">
              <label class="block mb-3 text-gray-600" for="">Event name</label>
              <input
                type="text"
                class="border border-gray-500 rounded-md inline-block py-2 px-3 w-full text-gray-600 tracking-wider"
              />
            </div>
            <div class="mb-6">
              <label class="block mb-3 text-gray-600" for=""
                >Creation Date</label
              >
              <input
                type="date"
                id="start"
                name="trip-start"
                class="border border-gray-500 rounded-md inline-block py-2 px-3 w-full text-gray-600 tracking-widest"
              />
            </div>

            <div>
              <button
                @click="printw"
                class="w-full text-ceenter px-4 py-3 bg-blue-500 rounded-md shadow-md text-white font-semibold"
              >
                Confirm payment
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="col-span-1 lg:col-span-6 p-6">
          <table class="w3-table-all">
            <thead>
              <tr class="w3-blue">
                <th>Id</th>
                <th>Name</th>
                <th>Date</th>
              </tr>
            </thead>
            <tr class="w3-hover-grey" v-for="item in events" :key="item.id">
              <td > {{item.id}} </td>
              <td>{{item.name}} </td>
              <td>{{item.date}}</td>
            </tr>
      
          </table>
        </div>
      </div>
    </div>

    <!--   Grid -->
  </div>
</template>


<script>
export default {
  data() {
    return {
      events: null
    };
  },
  methods: {
    async printw() {
      try {
        await this.$store.dispatch("getEvents");
         this.events = this.$store.getters.getEvents;
      } catch (error) {
        console.log(error);
      }
    },
  },
    created() {
    this.printw();
     
  },
};
</script>





<style>
</style>




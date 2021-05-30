<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="handleError"
      >{{ error }}</base-dialog
    >

    <base-dialog :show="isLoading" fixed title="Authenticating...">
      <base-spinner></base-spinner>
    </base-dialog>

    <!--   grid -->
    <div class="mt-8 grid lg:grid-cols-2 gap-10 mx-4">
      <div class="mycard">
        <div class="col-span-1 lg:col-span-6">
          <h3 class="text-3xl text-gray-700 mb-5">Create Event</h3>

          <form @submit.prevent="formSubmit" class="w3-container p-3">
            <div class="mx-4 md:mt-10">
              <label class="text-gray-600" for="name">Event name</label>
              <input
                type="text"
                class="w3-input text-gray-600 tracking-wider"
                id="name"
                v-model.trim="name.value"
                @blur="nameValidation"
                :class="{ error: !name.isValid }"
              />
              <p class="alert" v-if="!name.isValid">Please enter your name</p>
            </div>
            <div class="mx-4 mb-4 md:mb-10">
              <input
                type="date"
                id="date"
                name="date"
                class="w3-input text-gray-600 tracking-widest"
                v-model.trim="date.value"
                @blur="dateValidation"
                :class="{ error: !date.isValid }"
              />
              <p class="alert" v-if="!date.isValid">
                Please enter a valid date
              </p>
            </div>
            <button
              @click="loadEvents"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold ml-4 py-1 px-2"
            >
              Create Event
            </button>
          </form>
        </div>
      </div>

      <table class="w3-table-all w3-small mb-4">
        <thead>
          <tr class="w3-blue">
            <th>Name</th>
            <th>Date</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          <tr class="w3-hover-grey" v-for="item in events" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ dateConverter(item.date) }}</td>
            <td>
              <div class="px-4 cursor-pointer" @click="deleteItem(item.name)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!--   Grid -->
  </div>
</template>


<script>
import moment from "moment";
export default {
  data() {
    return {
      events: null,
      name: {
        value: "",
        isValid: true,
      },
      date: {
        value: this.dateConverter(new Date().toISOString()),
        isValid: true,
      },
      isFormValid: true,
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async deleteItem(eventParam) {
      if (
        confirm("Are you sure you want to delete this event from database?")
      ) {
        // do the delete
        try {
          const actionPayload = {
            name: eventParam,
          };
          await this.$store.dispatch("event/deleteEvent", actionPayload);

          this.loadEvents();
        } catch (error) {
          this.error = error.message || "Failed to authenticate";
        }
        this.isLoading = false;
      }
    },

    dateConverter(value) {
      if (value) {
        return moment(String(value)).format("YYYY-MM-DD");
      }
    },

    async formSubmit() {
      this.nameValidation();
      this.dateValidation();
      if (!this.isFormValid) {
        return;
      }

      this.isLoading = true;
      const actionPayload = {
        name: this.name.value,
        date: this.date.value,
      };

      // do the post
      try {
        await this.$store.dispatch("event/addEvent", actionPayload);
        this.isFormValid = true;
        this.name.isValid = true;
        this.date.isValid = true;
        this.name.value = "";
        this.date.value = "";
        this.loadEvents();
      } catch (error) {
        this.error = error.message || "Failed to authenticate";
      }
      this.isLoading = false;
    },
    nameValidation() {
      this.isFormValid = true;
      this.name.isValid = true;
      if (this.name.value === "") {
        this.isFormValid = false;
        this.name.isValid = false;
      }
    },
    dateValidation() {
      this.isFormValid = true;
      this.date.isValid = true;
      if (this.date.value === "") {
        this.isFormValid = false;
        this.date.isValid = false;
      }
    },

    async loadEvents() {
      try {
        await this.$store.dispatch("event/getEvents");
        this.events = this.$store.getters["event/getEvents"];
      } catch (error) {
        //  console.log(error);
      }
    },
    handleError() {
      this.error = null;
    },
  },
  created() {
    this.loadEvents();
  },
};
</script>





<style scoped>
.mycard {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;

  max-width: 40rem;
}

.error {
  border-color: red;
}

.alert {
  color: red;
  font-size: 13px;
}

.but {
  margin: 40px 0px;
}
</style>



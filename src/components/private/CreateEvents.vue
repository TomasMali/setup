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

    <div class="row">
      <div class="col p-4">
        <div class="card text-dark bg-light mb-3">
          <div class="card-body">
            <h5 class="card-title mb-5">Create a new event</h5>

            <form class="row g-3" @submit.prevent="formSubmit">
              <div class="col-md-12 form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  v-model.trim="name.value"
                  placeholder="Event name"
                  @blur="nameValidation"
                  :class="{ error: !name.isValid }"
                />
                <label for="name">Event name</label>
                <p class="alert" v-if="!name.isValid">Please enter your name</p>
              </div>

              <div class="col-md-6 form-floating mb-3">
                <input
                  type="date"
                  id="date"
                  name="date"
                  class="form-control"
                  v-model.trim="date.value"
                  @blur="dateValidation"
                  :class="{ error: !date.isValid }"
                  placeholder="Begin date"
                />
                <label for="date">Begin date</label>
                <p class="alert" v-if="!date.isValid">
                  Please enter a valid date
                </p>
              </div>

              <div class="col-md-6 form-floating mb-3">
                <input
                  type="date"
                  class="form-control"
                  id="floatingInput"
                  placeholder="End date"
                />
                <label for="floatingInput">End date</label>
              </div>

              <div class="col-md-6 form-floating mb-3">
                <input
                  type="date"
                  class="form-control"
                  id="floatingInput"
                  placeholder="Begin date registration"
                />
                <label for="floatingInput">Begin date registration</label>
              </div>

              <div class="col-md-6 form-floating mb-3">
                <input
                  type="date"
                  class="form-control"
                  id="floatingInput"
                  placeholder="End date registration"
                />
                <label for="floatingInput">End date registration</label>
              </div>

              <div class="col-md-12 form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="floatingInput"
                  placeholder="Place"
                />
                <label for="floatingInput">Place</label>
              </div>

              <div class="col-md-4 form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="floatingInput"
                  placeholder="Organizer name"
                />
                <label for="floatingInput">Organizer name</label>
              </div>

              <div class="col-md-4 form-floating mb-3">
                <input
                  type="email"
                  class="form-control"
                  id="floatingInput"
                  placeholder="Organizer email"
                />
                <label for="floatingInput">Organizer email</label>
              </div>

              <div class="col-md-4 form-floating mb-3">
                <input
                  type="tel"
                  class="form-control"
                  id="floatingInput"
                  placeholder="Organizer phone"
                />
                <label for="floatingInput">Organizer phone</label>
              </div>

              <div class="col-md-4 form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="floatingInput"
                  placeholder="Responsible name"
                />
                <label for="floatingInput">Responsible name</label>
              </div>

              <div class="col-md-4 form-floating mb-3">
                <input
                  type="email"
                  class="form-control"
                  id="floatingInput"
                  placeholder="Responsible email"
                />
                <label for="floatingInput">Responsible email</label>
              </div>

              <div class="col-md-4 form-floating mb-3">
                <input
                  type="tel"
                  class="form-control"
                  id="floatingInput"
                  placeholder="Responsible phone"
                />
                <label for="floatingInput">Responsible phone</label>
              </div>

              <div class="d-grid col-md-4 mx-auto">
                <button
                  @click="loadEvents"
                  type="button"
                  class="btn btn-primary"
                >
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="col p-4">
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
    </div>
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
          this.error =
            "Can't delete this event because it's used!" ||
            "Failed to authenticate";
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



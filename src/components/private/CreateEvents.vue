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
                  id="beginDate"
                  name="beginDate"
                  class="form-control"
                  v-model.trim="beginDate.value"
                  @blur="dateValidation"
                  :class="{ error: !beginDate.isValid }"
                  placeholder="Begin date"
                />
                <label for="date">Begin date</label>
                <p class="alert" v-if="!beginDate.isValid">
                  Please enter a valid date
                </p>
              </div>

              <div class="col-md-6 form-floating mb-3">
                <input
                  type="date"
                  name="endDate"
                  class="form-control"
                  id="endDate"
                  v-model.trim="endDate.value"
                  @blur="dateValidation"
                  :class="{ error: !endDate.isValid }"
                  placeholder="End date"
                />
                <label for="endDate">End date</label>
                <p class="alert" v-if="!endDate.isValid">
                  Please enter a valid date
                </p>
              </div>

              <div class="col-md-6 form-floating mb-3">
                <input
                  type="date"
                  name="beginDateRegistration"
                  class="form-control"
                  id="beginDateRegistration"
                  v-model.trim="beginDateRegistration.value"
                  @blur="dateValidation"
                  :class="{ error: !beginDateRegistration.isValid }"
                  placeholder="Begin date registration"
                />
                <label for="beginDateRegistration"
                  >Begin date registration</label
                >
                <p class="alert" v-if="!beginDateRegistration.isValid">
                  Please enter a valid date
                </p>
              </div>

              <div class="col-md-6 form-floating mb-3">
                <input
                  type="date"
                  name="endDateRegistration"
                  class="form-control"
                  id="endDateRegistration"
                  v-model.trim="endDateRegistration.value"
                  @blur="dateValidation"
                  :class="{ error: !endDateRegistration.isValid }"
                  placeholder="End date registration"
                />
                <label for="endDateRegistration">End date registration</label>
                <p class="alert" v-if="!endDateRegistration.isValid">
                  Please enter a valid date
                </p>
              </div>

              <div class="col-md-12 form-floating mb-3">
                <input
                  type="text"
                  id="place"
                  name="place"
                  class="form-control"
                  v-model.trim="place.value"
                  @blur="placeValidation"
                  :class="{ error: !place.isValid }"
                  placeholder="Place"
                />
                <label for="place">Place</label>
                <p class="alert" v-if="!place.isValid">
                  Please enter a valid place
                </p>
              </div>

              <div class="col-md-4 form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  v-model.trim="organizerName.value"
                  name="organizerName"
                  id="organizerName"
                  placeholder="Organizer name"
                />
                <label for="organizerName"
                  >Organizer name
                  <small class="text-muted"> (optional)</small></label
                >
              </div>

              <div class="col-md-4 form-floating mb-3">
                <input
                  type="email"
                  class="form-control"
                  v-model.trim="organizerMail.value"
                  name="organizerMail"
                  id="organizerMail"
                  placeholder="Organizer email"
                />
                <label for="organizerMail"
                  >Organizer email <small class="text-muted"> (optional)</small>
                </label>
              </div>

              <div class="col-md-4 form-floating mb-3">
                <input
                  type="tel"
                  v-model="organizerPhone.value"
                  name="organizerPhone"
                  class="form-control"
                  id="organizerPhone"
                  placeholder="Organizer phone"
                />
                <label for="organizerPhone"
                  >Organizer phone <small class="text-muted"> (optional)</small>
                </label>
              </div>

              <div class="col-md-4 form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  v-model.trim="responsableName.value"
                  name="responsableName"
                  id="responsableName"
                  placeholder="Responsable name"
                />
                <label for="responsableName"
                  >Responsable name
                  <small class="text-muted"> (optional)</small>
                </label>
              </div>

              <div class="col-md-4 form-floating mb-3">
                <input
                  type="email"
                  name="responsableMail"
                  v-model.trim="responsableMail.value"
                  class="form-control"
                  id="responsableMail"
                  placeholder="Responsible email"
                />
                <label for="responsableMail"
                  >Responsible email
                  <small class="text-muted"> (optional)</small>
                </label>
              </div>

              <div class="col-md-4 form-floating mb-3">
                <input
                  type="tel"
                  class="form-control"
                  v-model="responsablePhone.value"
                  name="responsablePhone"
                  id="responsablePhone"
                  placeholder="Responsible phone"
                />
                <label for="responsablePhone"
                  >Responsible phone
                  <small class="text-muted"> (optional)</small>
                </label>
              </div>

              <div class="d-grid col-md-4 mx-auto">
                <button type="submit" class="btn btn-primary">
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
      beginDate: {
        value: "", //this.dateConverter(new Date().toISOString()),
        isValid: true,
      },
      endDate: {
        value: "", //this.dateConverter(new Date().toISOString()),
        isValid: true,
      },
      beginDateRegistration: {
        value: "", //this.dateConverter(new Date().toISOString()),
        isValid: true,
      },
      endDateRegistration: {
        value: "", //this.dateConverter(new Date().toISOString()),
        isValid: true,
      },
      place: {
        value: "",
        isValid: true,
      },
      organizerName: {
        value: "",
        isValid: true,
      },
      organizerMail: {
        value: "",
        isValid: true,
      },
      organizerPhone: {
        value: "",
        isValid: true,
      },
      responsableName: {
        value: "",
        isValid: true,
      },
      responsableMail: {
        value: "",
        isValid: true,
      },
      responsablePhone: {
        value: "",
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
      console.log("formSubmit");
      this.nameValidation();
      this.dateValidation();
      this.placeValidation();
      if (!this.isFormValid) {
        return;
      }

      this.isLoading = true;
      const actionPayload = {
        name: this.name.value,
        beginDate: this.beginDate.value,
      };

      // do the post
      try {
        await this.$store.dispatch("event/addEvent", actionPayload);
        this.isFormValid = true;
        this.name.isValid = true;
        this.beginDate.isValid = true;
        this.endDate.isValid = true;
        this.beginDateRegistration.isValid = true;
        this.endDateRegistration.isValid = true;
        this.place.isValid = true;
        this.organizerName.isValid = true;
        this.organizerMail.isValid = true;
        this.organizerPhone.isValid = true;
        this.responsableName.isValid = true;
        this.responsableMail.isValid = true;
        this.responsablePhone.isValid = true;

        this.name.value = "";
        this.beginDate.value = "";
        this.endDate.value = "";
        this.beginDateRegistration.value = "";
        this.endDateRegistration.value = "";
        this.place.value = "";
        this.organizerName.value = "";
        this.organizerMail.value = "";
        this.organizerPhone.value = "";
        this.responsableName.value = "";
        this.responsableMail.value = "";
        this.responsablePhone.value = "";

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
    placeValidation() {
      this.isFormValid = true;
      this.place.isValid = true;
      if (this.place.value === "") {
        this.isFormValid = false;
        this.place.isValid = false;
      }
    },
    dateValidation() {
      //  this.isFormValid = true;
      this.beginDate.isValid = true;
      this.endDate.isValid = true;
      this.beginDateRegistration.isValid = true;
      this.endDateRegistration.isValid = true;
      if (this.beginDate.value === "") {
        this.isFormValid = false;
        this.beginDate.isValid = false;
        // return;
      }
      if (this.endDate.value === "") {
        this.isFormValid = false;
        this.endDate.isValid = false;
        //  return;
      }
      if (this.beginDateRegistration.value === "") {
        this.isFormValid = false;
        this.beginDateRegistration.isValid = false;
        // return;
      }
      if (this.endDateRegistration.value === "") {
        this.isFormValid = false;
        this.endDateRegistration.isValid = false;
        //  return;
      }
    },

    async loadEvents() {
      console.log("loadEventAutomatic");

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



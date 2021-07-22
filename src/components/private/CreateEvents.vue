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

    <create-dialog
      :show="!!openDialogEventCreation"
      title="Create an event"
      @close="manageDialogEvent"
    >
      <div class="card text-dark bg-light mb-0">
        <div class="card-body">
          <form class="row g-3" @submit.prevent="formSubmit">
            <div class="col-md-12 form-floating">
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
              <span class="alert" v-if="!name.isValid">
                <small>Please enter the event name </small>
              </span>
            </div>

            <div class="col-md-6 form-floating">
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
              <span class="alert" v-if="!beginDate.isValid">
                <small> Please enter a valid date </small>
              </span>
            </div>

            <div class="col-md-6 form-floating">
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
              <span class="alert" v-if="!endDate.isValid">
                <small> Please enter a valid date </small>
              </span>
            </div>

            <div class="col-md-6 form-floating">
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
              <label for="beginDateRegistration">Begin date registration</label>
              <span class="alert" v-if="!beginDateRegistration.isValid">
                <small> Please enter a valid date </small>
              </span>
            </div>

            <div class="col-md-6 form-floating">
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
              <span class="alert" v-if="!endDateRegistration.isValid">
                <small> Please enter a valid date </small>
              </span>
            </div>

            <div class="col-md-12 form-floating">
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
              <span class="alert" v-if="!place.isValid">
                <small> Please enter a valid place </small>
              </span>
            </div>

            <div class="col-md-4 form-floating">
              <input
                type="text"
                class="form-control"
                v-model.trim="organizerName.value"
                name="organizerName"
                id="organizerName"
                placeholder="Organizer name"
              />
              <label for="organizerName">
                <small class="text-muted"> Organizer name *</small></label
              >
            </div>

            <div class="col-md-4 form-floating">
              <input
                type="email"
                class="form-control"
                v-model.trim="organizerMail.value"
                name="organizerMail"
                id="organizerMail"
                placeholder="Organizer email"
              />
              <label for="organizerMail"
                ><small class="text-muted"> Organizer email *</small>
              </label>
            </div>

            <div class="col-md-4 form-floating">
              <input
                type="tel"
                v-model="organizerPhone.value"
                name="organizerPhone"
                class="form-control"
                id="organizerPhone"
                placeholder="Organizer phone"
              />
              <label for="organizerPhone">
                <small class="text-muted"> Organizer phone *</small>
              </label>
            </div>

            <div class="col-md-4 form-floating">
              <input
                type="text"
                class="form-control"
                v-model.trim="responsableName.value"
                name="responsableName"
                id="responsableName"
                placeholder="Responsable name"
              />
              <label for="responsableName">
                <small class="text-muted"> Responsable name *</small>
              </label>
            </div>

            <div class="col-md-4 form-floating">
              <input
                type="email"
                name="responsableMail"
                v-model.trim="responsableMail.value"
                class="form-control"
                id="responsableMail"
                placeholder="Responsible email"
              />
              <label for="responsableMail">
                <small class="text-muted"> Responsible email *</small>
              </label>
            </div>

            <div class="col-md-4 form-floating">
              <input
                type="tel"
                class="form-control"
                v-model="responsablePhone.value"
                name="responsablePhone"
                id="responsablePhone"
                placeholder="Responsible phone"
              />
              <label for="responsablePhone">
                <small class="text-muted"> Responsible phone *</small>
              </label>
            </div>

            <div class="d-grid col-md-4 mx-auto">
              <button type="submit" class="btn btn-primary mt-4">
                Create Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </create-dialog>

    <div class="row p-0 m-0">
      <div class="col col-sm-2 m-4">
        <button
          class="btn btn-md btn-primary no_board"
          @click="openDialogEventCreation = true"
        >
          Create event
        </button>
      </div>

      <div class="col col-sm-10 m-4">
        <table class="w3-table-all w3-small mb-4">
          <thead class="">
            <tr class="w3-blue p-0">
              <th class="">Name</th>
              <th class="">Begin date</th>
              <th class="">End date</th>

              <th v-if="!isMobile">Begin registration</th>
              <th v-if="!isMobile">End registration</th>

              <th class="">Place</th>

              <th v-if="!isMobile" class="">Organizer</th>
              <th v-if="!isMobile" class="">Email</th>
              <th v-if="!isMobile" class="">Phone</th>

              <th class="p-1">Remove</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="w3-hover-grey p-0"
              v-for="item in events"
              :key="item.id"
              @dblclick="openCompetition(item.id)"
            >
              <td class="">{{ item.name }}</td>
              <td class="">{{ dateConverter(item.begin_date) }}</td>
              <td class="">{{ dateConverter(item.end_date) }}</td>

              <td v-if="!isMobile">
                {{ dateConverter(item.begin_date_registration) }}
              </td>
              <td v-if="!isMobile">
                {{ dateConverter(item.end_date_registration) }}
              </td>

              <td class="">{{ item.place }}</td>

              <td v-if="!isMobile" class="">{{ item.organizer_name }}</td>
              <td v-if="!isMobile" class="">{{ item.organizer_mail }}</td>
              <td v-if="!isMobile" class="">{{ item.organizer_phone }}</td>
              <td>
                <div
                  class="px-4 cursor-pointer"
                  @click="deleteItem(item.name, item.id)"
                >
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
      openDialogEventCreation: null,
      isMobile: false,
    };
  },
  methods: {
    isMobileFun() {
      if (typeof window.orientation !== "undefined") {
        this.isMobile = true;
      } else this.isMobile = false;
    },

    async deleteItem(eventParam, idEventParam) {
      if (
        confirm(
          "Are you sure you want to delete this event from database? All the competitions related to this event will be deleted?"
        )
      ) {
        // do the delete
        try {
          const actionPayload = {
            name: eventParam,
            user: this.$store.getters["auth/userId"],
            idEvent: idEventParam,
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
      //  console.log("formSubmit");
      this.nameValidation();
      this.dateValidation();
      this.placeValidation();
      if (!this.isFormValid) {
        return;
      }

      this.isLoading = true;
      const actionPayload = {
        user: this.$store.getters["auth/userId"],
        name: this.name.value,
        beginDate: this.beginDate.value,
        endDate: this.endDate.value,
        beginDateRegistration: this.beginDateRegistration.value,
        endDateRegistration: this.endDateRegistration.value,
        place: this.place.value,
        organizerName: this.organizerName.value,
        organizerMail: this.organizerMail.value,
        organizerPhone:
          this.organizerPhone.value === "" ? 0 : this.organizerPhone.value,
        responsableName: this.responsableName.value,
        responsableMail: this.responsableMail.value,
        responsablePhone:
          this.responsablePhone.value === "" ? 0 : this.responsablePhone.value,
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
        this.manageDialogEvent();
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
      try {
        await this.$store.dispatch("event/getEvents", {
          user: this.$store.getters["auth/userId"],
        });
        this.events = this.$store.getters["event/getEvents"];
      } catch (error) {
        //  console.log(error);
      }
    },
    handleError() {
      this.error = null;
    },
    manageDialogEvent() {
      this.openDialogEventCreation = null;
    },
    openCompetition(eventId) {
      this.$router.push({
        path: "competitions",
        query: { user: this.$store.getters["auth/userId"], eventId: eventId },
      });
    },
  },
  created() {
    this.loadEvents();

    if (screen.width <= 760) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
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

.no_board {
  border-radius: 0px;
}
</style>



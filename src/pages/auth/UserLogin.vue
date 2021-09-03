<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="handleError"
      >{{ error }}</base-dialog
    >

    <base-dialog :show="isLoading" fixed title="Login...">
      <base-spinner></base-spinner>
    </base-dialog>

    <div>
      <v-card :max-width="500" class="mx-auto mt-5 mt-md-16">
        <v-card-title class="text-deep-purple accent-4 mt-4 ml-5">
          Login area
        </v-card-title>
        <v-divider class="bg-grey"> </v-divider>
        <v-card-text>
          <form class="p-4 " @submit.prevent="formSubmit">
            <div class="mb-8">
              <label for="email">E-mail</label>
              <input
                class="w3-input"
                type="text"
                id="email"
                v-model.trim="email.value"
                @blur="emailValidation"
                :class="{ error: !email.isValid }"
              />
            </div>

            <p v-if="!email.isValid" class="w3-text-red">
              Please enter a valid email
            </p>
            <div class="mb-8">
              <label for="password">Password</label>
              <input
                class="w3-input"
                type="password"
                id="password"
                v-model.number="password.value"
                @blur="passwordValidation"
                :class="{ error: !password.isValid }"
              />
            </div>
            <p v-if="!password.isValid" class="w3-text-red">
              Password is required!!
            </p>

            <p class="w3-padding ">
              <button
                class="w3-button w3-block  w3-round-xlarge text-white  bg-deep-purple accent-4 "
              >
                Login
              </button>
            </p>
            <h6 class="w3-padding">
              If not yet,
              <router-link class="text-deep-purple accent-4" to="/register"
                >Register</router-link
              >
              to signup!
            </h6>
            <h6 v-if="wrongPassword > 2" class="w3-text-orange w3-padding">
              Seems like You dont remember your pssword,
              <router-link class="w3-text-blue" :to="linkWithEmail"
                >Reset password</router-link
              >
            </h6>
          </form>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import { useDisplay } from "vuetify/lib/composables/display";

export default {
  setup() {
    // Destructure only the keys we want to use
    const { xs, mdAndUp } = useDisplay();

    return { xs, mdAndUp };
  },
  data() {
    return {
      email: {
        value: "",
        isValid: true,
      },
      password: {
        value: "",
        isValid: true,
      },
      isFormValid: true,
      error: null,
      isLoading: false,
      wrongPassword: 0,
    };
  },
  methods: {
    async formSubmit() {
      this.emailValidation();
      this.passwordValidation();
      if (!this.isFormValid) {
        return;
      }
      this.isLoading = true;

      const actionPayload = {
        email: this.email.value,
        password: this.password.value,
      };

      try {
        await this.$store.dispatch("auth/login", actionPayload);
        // this.$route.query.redirect serve per prendere la query ?redirect=login
        const redirecturl = "/" + (this.$route.query.redirect || "public");
        this.$router.replace(redirecturl);
      } catch (error) {
        this.wrongPassword++;
        this.error = error.message || "Failed to authenticate";
        this.password.value = "";
      }

      this.isLoading = false;
    },
    emailValidation() {
      this.email.isValid = true;
      this.isFormValid = true;
      if (!this.email.value || !this.email.value.includes("@")) {
        this.email.isValid = false;
        this.isFormValid = false;
      }
    },
    passwordValidation() {
      this.isFormValid = true;
      this.password.isValid = true;
      if (!this.password.value || this.password.value.length < 4) {
        this.isFormValid = false;
        this.password.isValid = false;
      }
    },
    handleError() {
      this.error = null;
    },
  },
  computed: {
    linkWithEmail() {
      return (
        "/resetPassword" +
        (this.email.value !== "" ? "?email=" + this.email.value : "")
      );
    },
  },
};
</script>

<style scoped>
@media screen and (min-width: 800px) {
  .max-width {
    max-width: 450px;
    margin-left: 200px;
  }
}

.error {
  border-color: red;
}
</style>

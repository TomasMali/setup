<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="handleError"
      >{{ error }}</base-dialog
    >

    <base-dialog :show="isLoading" fixed title="Checking data...">
      <base-spinner></base-spinner>
    </base-dialog>

    <div>
      <v-card :max-width="500" class="mx-auto mt-5 mt-md-16">
        <v-card-title class="text-deep-purple accent-4 mt-4 ml-5">
          Forgot Password
        </v-card-title>

        <v-divider class="bg-grey"> </v-divider>
        <v-card-text>
          <form class="w3-container p-10" @submit.prevent="submitForm">
            <label for="email">Enter your email:</label>
            <input
              class="w3-input text-blue-600"
              type="mail"
              id="email"
              v-model.trim="email"
              @blur="validateEmail"
            />

            <p v-if="!isValid" class="w3-text-red">
              Please enter a valid email
            </p>
            <p>
              <button
                class="w3-button w3-block  w3-round-xlarge text-white  bg-deep-purple accent-4 mt-10"
              >
                Confirm
              </button>
            </p>
          </form>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      isValid: true,
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async submitForm() {
      this.validateEmail();
      if (!this.isValid) {
        return;
      }

      this.isLoading = true;
      // do the post
      try {
        await this.$store.dispatch("auth/resetPassword", { email: this.email });
        this.isLoading = false;
        alert(
          "We have sent you an email to '" +
            this.email +
            "' with the instructions how to reset the password"
        );

        const redirecturl = "/" + (this.$route.query.redirect || "public");
        this.$router.replace(redirecturl);
      } catch (error) {
        this.error = error.message || "Failed to authenticate";
      }
      this.isLoading = false;
    },
    validateEmail() {
      this.isValid = true;
      if (!this.email || !this.email.includes("@")) {
        this.isValid = false;
      }
    },
    handleError() {
      this.error = null;
    },
  },

  created() {
    this.email = this.$route.query.email;
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
</style>

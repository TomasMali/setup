<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="handleError"
      >{{ error }}</base-dialog
    >

    <base-dialog :show="isLoading" fixed title="Sending data...">
      <base-spinner></base-spinner>
    </base-dialog>

    <div>
      <v-card :max-width="500" class="mx-auto mt-5 mt-md-16">
        <v-card-title class="text-deep-purple accent-4 mt-4 ml-5">
          Change Password
        </v-card-title>
        <v-divider class="bg-grey"> </v-divider>
        <v-card-text>
          <form class="p-4" @submit.prevent="submitForm">
            <p>
              <label for="email">Enter your new password</label>
              <input
                class="w3-input"
                type="password"
                id="password"
                v-model.trim="password"
                @blur="validatePassword"
                :class="{ error: !isValid }"
              />
            </p>
            <p>
              <label for="email">Repeat your password</label>
              <input
                class="w3-input"
                type="password"
                id="passwordConfirm"
                v-model.trim="passwordConfirm"
                @blur="validatePasswordConfirm"
                :class="{ error: !isValidConfirm }"
              />
            </p>

            <p v-if="!isValid" class="w3-text-red">
              Please enter a valid password
            </p>
            <p v-else-if="!isValidConfirm" class="w3-text-red">
              The passwords doesn't match
            </p>
            <p>
              <button
                class="w3-button w3-block  w3-round-xlarge text-white  bg-deep-purple accent-4 mt-10"
              >
                Change
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
      password: "",
      passwordConfirm: "",
      isValid: true,
      isValidConfirm: true,
      isLoading: false,
      error: null,
    };
  },

  methods: {
    async submitForm() {
      this.validatePassword();
      this.validatePasswordConfirm();
      if (!this.isValid || !this.isValidConfirm) {
        return;
      }
      this.isLoading = true;

      // do the post
      try {
        await this.$store.dispatch("auth/changePassword", {
          email: this.$route.query.email,
          password: this.password,
        });
        this.isLoading = false;
        alert("Your password has been reseted successfully!");

        const redirecturl = "/login";
        this.$router.replace(redirecturl);
      } catch (error) {
        this.error = error.message || "Failed to authenticate";
      }

      this.isLoading = false;
    },
    validatePassword() {
      this.isValid = true;
      if (!this.password || this.password.length < 4) {
        this.isValid = false;
      }
    },
    validatePasswordConfirm() {
      this.isValidConfirm = true;
      if (
        !this.passwordConfirm ||
        this.passwordConfirm.length < 4 ||
        this.password !== this.passwordConfirm
      ) {
        this.isValidConfirm = false;
      }
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
.error {
  border-color: red;
}
</style>

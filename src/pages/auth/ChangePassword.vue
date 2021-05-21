

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

    <div class="w3-row">
      <div class="w3-third w3-container"></div>
      <div class="w3-third w3-container">
        <div class="w3-margin w3-card-4">
          <div class="w3-container w3-blue w3-center">
            <h3>Change Password</h3>
          </div>

          <form class="w3-container" @submit.prevent="submitForm">
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
            <p><button class="w3-button w3-block w3-blue">Change</button></p>
          </form>
          
        </div>
      </div>
      <div class="w3-third w3-container"></div>
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
        await this.$store.dispatch("changePassword", {
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
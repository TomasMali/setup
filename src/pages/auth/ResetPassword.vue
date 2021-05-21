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

    <div class="w3-row">
      <div class="w3-third w3-container"></div>
      <div class="w3-third w3-container">
        <div class="w3-margin w3-card-4">
          <div class="w3-container w3-blue w3-center">
            <h3>Forgot Password</h3>
          </div>

          <form class="w3-container" @submit.prevent="submitForm">
            <p>
              <label for="email">Enter your email</label>
              <input
                class="w3-input"
                type="mail"
                id="email"
                v-model.trim="email"
                @blur="validateEmail"
              />
            </p>
            <p v-if="!isValid" class="w3-text-red">
              Please enter a valid email
            </p>
            <p><button class="w3-button w3-block w3-blue">Confirm</button></p>
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
        await this.$store.dispatch("resetPassword", { email: this.email });
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
  
  created(){
    this.email=  this.$route.query.email
  }
};
</script>



<style scoped>
</style>
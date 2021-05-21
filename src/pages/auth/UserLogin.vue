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



    <div class="w3-row margin-all">
      <div class="w3-quarter w3-container"></div>
      <div class="w3-half w3-container">
        <div class="w3-margin w3-card-4">
          <div class="w3-container w3-blue w3-center">
            <h3>Login</h3>
          </div>

          <form class="w3-container w3-margin" @submit.prevent="formSubmit">
            <p>
              <label for="email">Login</label>
              <input
                class="w3-input"
                type="text"
                id="email"
                v-model.trim="email.value"
                @blur="emailValidation"
                :class="{ error: !email.isValid }"
              />
            </p>

            <p v-if="!email.isValid" class="w3-text-red">
              Please enter a valid email
            </p>

            <p>
              <label for="password">Password</label>
              <input
                class="w3-input"
                type="password"
                id="password"
                v-model.number="password.value"
                @blur="passwordValidation"
                :class="{ error: !password.isValid }"
              />
            </p>
            <p v-if="!password.isValid" class="w3-text-red">
              Password is required!!
            </p>

            <p class="w3-padding but"> <button class="w3-button w3-block w3-blue ">Login</button></p>
            <h6 class=" w3-padding">
              If not yet,
              <router-link class="w3-text-blue" to="/register"
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
        </div>
      </div>
      <div class="w3-quarter w3-container"></div>
    </div>
    </div>

</template>





<script>
export default {
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
        await this.$store.dispatch("login", actionPayload);
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

.error {
  border-color: red;
}

.login{
  padding: 10px 154px;
}

.but{
  margin-top: 40px;
}

.margin-all{
  margin-top: 20px;
}



</style>
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

    <div>
      <v-card :max-width="500" class="mx-auto mt-5 mt-md-16">
        <v-card-title class="text-deep-purple accent-4 mt-4 ml-5">
          Signup area
        </v-card-title>

        <v-divider class="bg-grey"> </v-divider>
        <v-card-text>
          <form class="p-4" @submit.prevent="formSubmit">
            <label for="name">Name</label>
            <input
              class="w3-input"
              type="text"
              id="name"
              v-model.trim="name.value"
              @blur="nameValidation"
              :class="{ error: !name.isValid }"
            />
            <p class="alert" v-if="!name.isValid">Please enter your name</p>

            <label for="surname">Surname</label>
            <input
              class="w3-input"
              type="text"
              id="surname"
              v-model.trim="surname.value"
              @blur="surnameValidation"
              :class="{ error: !surname.isValid }"
            />
            <p class="alert" v-if="!surname.isValid">
              Please enter your surname
            </p>

            <label for="email">E-Mail</label>
            <input
              class="w3-input"
              type="email"
              id="email"
              v-model.trim="email.value"
              @blur="emailValidation"
              :class="{ error: !email.isValid }"
            />
            <p class="alert" v-if="!email.isValid">
              Please enter a valid email
            </p>

            <label for="password">Password</label>
            <input
              class="w3-input"
              type="password"
              id="password"
              v-model="password.value"
              @blur="passwordValidation"
              :class="{ error: !password.isValid }"
            />
            <p class="alert" v-if="!password.isValid">
              Please enter a valid password
            </p>

            <label for="confirm">Confirm Password</label>
            <input
              class="w3-input"
              type="password"
              id="confirm"
              v-model="confirm.value"
              @blur="confirmValidation"
              :class="{ error: !confirm.isValid }"
            />
            <p class="alert" v-if="!confirm.isValid">
              The password doesn't match!
            </p>

            <p class="mt-6">
              <button
                class="w3-button w3-block  w3-round-xlarge text-white  bg-deep-purple accent-4 "
              >
                Register
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
      name: {
        value: "",
        isValid: true,
      },
      surname: {
        value: "",
        isValid: true,
      },
      email: {
        value: "",
        isValid: true,
      },
      password: {
        value: "",
        isValid: true,
      },
      confirm: {
        value: "",
        isValid: true,
      },
      isFormValid: true,
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async formSubmit() {
      this.validFields();

      if (!this.isFormValid) {
        return;
      }
      this.isLoading = true;
      const actionPayload = {
        name: this.name.value,
        surname: this.surname.value,
        email: this.email.value,
        password: this.password.value,
      };

      // do the post
      try {
        await this.$store.dispatch("auth/register", actionPayload);
        alert(
          "User " +
            actionPayload.name +
            " " +
            actionPayload.surname +
            " registered successfully. We have sent You an email to " +
            this.email.value
        );
        const redirecturl = "/" + (this.$route.query.redirect || "public");
        this.$router.replace(redirecturl);
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
    surnameValidation() {
      this.isFormValid = true;
      this.surname.isValid = true;
      if (this.surname.value === "") {
        this.isFormValid = false;
        this.surname.isValid = false;
      }
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
    confirmValidation() {
      this.isFormValid = true;
      this.confirm.isValid = true;
      if (
        !this.confirm.value ||
        this.confirm.value < 4 ||
        this.confirm.value !== this.password.value
      ) {
        this.isFormValid = false;
        this.confirm.isValid = false;
      }
    },

    validFields() {
      this.nameValidation();
      this.surnameValidation();
      this.emailValidation();
      this.passwordValidation();
      this.confirmValidation();
    },

    handleError() {
      this.error = null;
    },
  },

  created() {},
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

.alert {
  color: red;
  font-size: 13px;
}
</style>

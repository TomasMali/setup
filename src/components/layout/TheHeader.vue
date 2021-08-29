<template>
  <div>
    <v-list dense nav class="mt-12">
      <v-list-item link>
        <v-list-item-icon class="ml-4 mr-3">
          <v-icon>{{ home.icon }}</v-icon>
        </v-list-item-icon>

        <router-link
          @click="clickSubmit"
          to="/public"
          class="routerLink "
          tag="span"
        >
          <v-list-item-content>
            <v-list-item-title class="text-white">
              {{ home.title }}
            </v-list-item-title>
          </v-list-item-content>
        </router-link>
      </v-list-item>

      <v-list-item link v-if="isLoggedIn">
        <v-list-item-icon class="ml-4 mr-3">
          <v-icon>{{ events.icon }}</v-icon>
        </v-list-item-icon>

        <router-link
          @click="clickSubmit"
          to="/events"
          class="routerLink "
          tag="span"
        >
          <v-list-item-content>
            <v-list-item-title class="text-white">
              {{ events.title }}
            </v-list-item-title>
          </v-list-item-content>
        </router-link>
      </v-list-item>
      <v-list-item link v-if="isLoggedIn">
        <v-list-item-icon class="ml-4 mr-3">
          <v-icon>{{ manage.icon }}</v-icon>
        </v-list-item-icon>

        <router-link
          @click="clickSubmit"
          to="/manage"
          class="routerLink "
          tag="span"
        >
          <v-list-item-content>
            <v-list-item-title class="text-white">
              {{ manage.title }}
            </v-list-item-title>
          </v-list-item-content>
        </router-link>
      </v-list-item>
      <v-list-item link v-if="!isLoggedIn">
        <v-list-item-icon class="ml-4 mr-3">
          <v-icon>{{ login.icon }}</v-icon>
        </v-list-item-icon>

        <router-link
          @click="clickSubmit"
          to="/login"
          class="routerLink "
          tag="span"
        >
          <v-list-item-content>
            <v-list-item-title class="text-white">
              {{ login.title }}
            </v-list-item-title>
          </v-list-item-content>
        </router-link>
      </v-list-item>
      <v-list-item link v-if="isLoggedIn">
        <v-list-item-icon class="ml-4 mr-3">
          <v-icon>{{ logoutRoute.icon }}</v-icon>
        </v-list-item-icon>

        <router-link
          @click="logout"
          to="/public"
          class="routerLink "
          tag="span"
        >
          <v-list-item-content>
            <v-list-item-title class="text-white">
              {{ logoutRoute.title }}
            </v-list-item-title>
          </v-list-item-content>
        </router-link>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  emits: ["triggerMenuMobile", "cleanPic"],
  data() {
    return {
      clicked: false,
      email: null,

      home: {
        title: "Home",
        icon: "mdi-home",
        path: "/public",
      },
      events: {
        title: "Events",
        icon: "mdi-widgets",
        path: "/events",
      },
      manage: {
        title: "Manage",
        icon: "mdi-view-grid-plus-outline",
        path: "/manage",
      },
      login: {
        title: "Login",
        icon: "mdi-login",
        path: "/login",
      },
      logoutRoute: {
        title: "Logout",
        icon: "mdi-login",
        path: "/public",
      },

      right: null,
      drawer: null,
      group: null,
      mobile: null,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters["auth/isAuthenticated"];
    },
    isEmail() {
      return this.$store.getters["auth/email"];
    },
  },
  methods: {
    logout() {
      this.clicked = false;
      this.$store.dispatch("auth/logout");
      this.$router.replace("/public");
      // chiudi il menu se aperto
      this.clickSubmit();
      this.$emit("clearPic");
    },
    clickSubmit() {
      this.clicked = false;

      this.$emit("triggerMenuMobile");
    },
  },
  created() {
    if (localStorage.getItem("email"))
      this.email = String(this.$store.getters["auth/email"]).split("@")[0];
  },
};
</script>

<style scoped>
body {
  font-family: montserrat;
}

* {
  text-decoration: none;
}
</style>

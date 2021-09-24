<template>
  <div>
    <v-list dense nav class="mt-12">
      <router-link
        @click="clickSubmit"
        to="/public"
        class="routerLink "
        tag="span"
      >
        <v-list-item class="hover" link>
          <v-icon class="text-white item-route mr-2">{{ home.icon }}</v-icon>
          <v-list-item-content>
            <v-list-item-title class="text-white">
              {{ home.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>

      <router-link
        v-if="isLoggedIn"
        @click="clickSubmit"
        to="/events"
        class="routerLink "
        tag="span"
      >
        <v-list-item class="hover" link>
          <v-icon class="text-white item-route mr-2">{{ events.icon }}</v-icon>
          <v-list-item-content>
            <v-list-item-title class="text-white">
              {{ events.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>

      <router-link
        v-if="isLoggedIn"
        @click="clickSubmit"
        to="/manage"
        class="routerLink "
        tag="span"
      >
        <v-list-item class="hover" link>
          <v-icon class="text-white item-route mr-2">{{ manage.icon }}</v-icon>
          <v-list-item-content>
            <v-list-item-title class="text-white">
              {{ manage.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>

      <router-link
        v-if="!isLoggedIn"
        @click="clickSubmit"
        to="/login"
        class="routerLink "
        tag="span"
      >
        <v-list-item class="hover" link>
          <v-icon class="text-white item-route mr-2">{{ login.icon }}</v-icon>
          <v-list-item-content>
            <v-list-item-title class="text-white">
              {{ login.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>

      <router-link
        v-if="isLoggedIn"
        @click="logout"
        to="/public"
        class="routerLink "
        tag="span"
      >
        <v-list-item class="hover" link>
          <v-icon class="text-white item-route mr-2">{{
            logoutRoute.icon
          }}</v-icon>
          <v-list-item-content>
            <v-list-item-title class="text-white">
              {{ logoutRoute.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>
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

.item-route {
  margin-left: 65px;
}

.hover:hover {
  background-color: rgb(149, 144, 194);
}

* {
  text-decoration: none;
}
</style>

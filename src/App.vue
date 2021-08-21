//  <base href="/muevelo/">









<template>
  <!-- App.vue -->

  <v-app :theme="theme">

    <!-- Laterale-->
    <v-navigation-drawer
      v-model="drawer"
      app
      dark
      class="text-white"
      color="deep-purple accent-4"
    >
      <v-list-item class="ml-5">
        <v-list-item-content>
          <div class="ml-16 mt-8 mb-5">
            <v-avatar size="large">
              <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
            </v-avatar>
          </div>
          <v-list-item-title class="text-h6 ml-12">
              {{ isEmail ? (isEmail.split("@")[0]) : "No user"}}
          </v-list-item-title>
          <v-list-item-subtitle class="ml-5" v-if="isEmail">
          {{ isEmail }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider class="bg-white">

      </v-divider>


<the-header @triggerMenuMobile="triggerMenuMobile"></the-header>

    </v-navigation-drawer>

    <!-- Header menu -->
    <v-app-bar absolute shrink-on-scroll>
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        class="ml-2"
      ></v-app-bar-nav-icon>

      <v-app-bar-title>Muevelo</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-divider inset vertical></v-divider>
      <v-btn
        @click="toggleTheme"
        class="mr-4 ml-5 text-white"
        color="deep-purple accent-4"
      >
        <v-icon left icon="mdi-theme-light-dark"></v-icon>

        <span>Theme</span>
      </v-btn>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main
      @click.stop="triggerMenuMobile"
      class="bg-grey-lighten-3"
    >
      <v-container fluid>
   

  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>


      </v-container>
    </v-main>

    <v-bottom-navigation>
      <v-btn>
        <span>Recents</span>

        <v-icon>mdi-history</v-icon>
      </v-btn>

      <v-btn>
        <span>Favorites</span>

        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn>
        <span>Nearby</span>

        <v-icon>mdi-map-marker</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>








<script>
import TheHeader from "./components/layout/TheHeader.vue";
import { ref } from "vue";
import { useDisplay } from "vuetify/lib/composables/display";
export default {
  name: "App",
  components: {
    TheHeader,
  },



  data() {
    return {
 
      right: null,
      drawer: null,
      group: null,
      mobile: null,
    };
  },
methods: {
triggerMenuMobile(){
  this.mobile ? (this.drawer = false) : true
}

},

  created() {
    this.$store.dispatch("auth/tryLogin");
  },
  computed: {
    didAutoLogout() {
      return this.$store.getters["auth/didAutoLogout"];
    },
        isEmail() {
      return this.$store.getters["auth/email"];
    },
  },
  watch: {
    didAutoLogout(newValue, oldValue){
      if(newValue && newValue !== oldValue){
        this.$router.replace('/public')
      }
    }
  },
    setup() {
    const theme = ref("light");

    return {
      theme,
      toggleTheme: () =>
        (theme.value = theme.value === "light" ? "dark" : "light"),
    };
  },
    mounted() {
    const display = useDisplay();

    this.mobile = display.mobile.value;
  },
};
</script>





<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.oute-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>

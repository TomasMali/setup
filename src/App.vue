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
                <img @click="$refs.fileInput.click()"
                  :src="pic"
                  :key="rand"
                  style="cursor: pointer"
                >
              </v-avatar>
              <v-list-item-title >
                        <div v-show="getUserLogedIn != null && selectedFile != null">
          <input type="file" style="display:none" name="pic" accept="image/*" @change="onFileSelected" ref="fileInput" />
        
            <v-btn 
              variant="outlined"
               rounded="pill"
           size="x-small"
          @click="onUpload"
          class=""
        >
        SAVE
        </v-btn>

        </div>
              </v-list-item-title>
            </div>
            <v-list-item-title class="text-h6 ml-12">
              {{ isEmail ? "Username" : "No user" }}
            </v-list-item-title>
            <v-list-item-subtitle class="ml-5" v-if="isEmail">
              {{ isEmail }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider class="bg-white"> </v-divider>



        <the-header @triggerMenuMobile="triggerMenuMobile" @clearPic="getPic" @loadPic="getPic"  ></the-header>
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

          <span>Dark</span>
        </v-btn>
      </v-app-bar>

      <!-- Sizes your content based upon application components -->
      <v-main @click.stop="triggerMenuMobile" class="bg-grey-lighten-3">
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
import axios from "axios"
import cred from "/src/store/cred.js";
export default {
  name: "App",
  components: {
    TheHeader,
  },

  data() {
    return {
            rand: 1,
        pic: null,
      selectedFile: null,
      right: null,
      drawer: null,
      group: null,
      mobile: null,
    };
  },
  methods: {
getPic(){
      let url = cred.getLinkType().url_get_pic;
  if(this.$store.getters["auth/userId"]  != null && this.pic !== null){
      console.log(url + "/" +  this.$store.getters["auth/userId"] + '.jpeg')
    this.pic=  url + "/" +  this.$store.getters["auth/userId"] + '.jpeg' + '?' + this.rand
    this.rand = Date.now()
  }
  else {
     this.pic=  url + "/nouser" + '.jpeg' + '?' + this.rand
      console.log("logged in no pic",    this.pic)

  }
},

    onFileSelected(event) {
      this.selectedFile = event.target.files[0]

    },


    onUpload(){

    const data = new FormData()

    data.append('user', this.$store.getters["auth/userId"])
    data.append('pic', this.selectedFile, this.selectedFile.name.trim());

    const profileData = {
            headers: { 'content-type': 'multipart/form-data' }
        }

      console.log("il nome è: ",this.selectedFile.name)
      axios.post("http://localhost:3100/uploadProfilePic", data,profileData )
      .then(res => {
  
        console.log('image upload response > ', res)
       this.getPic()

  });
   this.selectedFile = null
   this.pic = null
    },

    triggerMenuMobile() {
      this.mobile ? (this.drawer = false) : true;
    },
  },

  created() {
    this.$store.dispatch("auth/tryLogin");
    this.getPic()
  },
  computed: {

    getUserLogedIn(){
    return this.$store.getters["auth/userId"] ;
    },

    getImageUrl(){
       return  this.getPic()
    }
,

      
    didAutoLogout() {
      return this.$store.getters["auth/didAutoLogout"];
    },
    isEmail() {
      return this.$store.getters["auth/email"];
    },
  },
  watch: {
    didAutoLogout(newValue, oldValue) {
      if (newValue && newValue !== oldValue) {
        this.$router.replace("/public");
      }
    },
    getImageUrl(newValue, oldValue){
      if(newValue && newValue !== oldValue)
      this.getPic()
    },
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

th {
  background-color: #673ab7 !important;
}
</style>

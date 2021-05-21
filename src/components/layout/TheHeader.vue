


<template>
  <header>
    <nav>
      <input type="checkbox" id="check" v-model="clicked" />
      <label for="check" class="checkbtn">
        <i class="fas fa-bars"></i>
      </label>
      <label class="logo">
        <router-link to="/"> Auth</router-link>
      </label>

      <ul>
        <li>
          <router-link @click="clickSubmit" to="/public">Public</router-link>
        </li>
        <li v-if="isLoggedIn">
          <router-link @click="clickSubmit" to="/private">Private</router-link>
        </li>
        <li v-else>
          <router-link @click="clickSubmit" to="/login">Login</router-link>
        </li>
        <li v-if="isLoggedIn">
          <router-link @click="logout" to="/public">Logout</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>







<script>
export default {
  data() {
    return {
      clicked: false,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    logout() {
      this.clicked = false;
      this.$store.dispatch("logout");
      this.$router.replace("/public");
      // chiudi il menu se aperto
      this.clickSubmit();
    },
    clickSubmit() {
      this.clicked = false;
    },
  },
};
</script>





<style scoped>
* {
  padding: 0;
  margin: 0;
  text-decoration: none;
  list-style: none;
  box-sizing: border-box;
}
body {
  font-family: montserrat;
}
nav {
  background: #0082e6;
  height: 80px;
  width: 100%;
}
label.logo {
  color: white;
  font-size: 35px;
  line-height: 80px;
  padding: 0 100px;
  font-weight: bold;
}
nav ul {
  float: right;
  margin-right: 20px;
}
nav ul li {
  display: inline-block;
  line-height: 80px;
  margin: 0 5px;
}
nav ul li a {
  color: white;
  font-size: 17px;
  padding: 7px 13px;
  border-radius: 3px;
  text-transform: uppercase;
}
a.active,
a:hover {
  background: #1b9bff;
  transition: 0.5s;
}
.checkbtn {
  font-size: 30px;
  color: white;
  float: right;
  line-height: 80px;
  margin-right: 40px;
  cursor: pointer;
  display: none;
}
#check {
  display: none;
}
@media (max-width: 952px) {
  label.logo {
    font-size: 30px;
    padding-left: 50px;
  }
  nav ul li a {
    font-size: 16px;
  }
}
@media (max-width: 858px) {
  .checkbtn {
    display: block;
  }
  ul {
    position: fixed;
    width: 100%;
    height: 100vh;
    background: #2c3e50;
    top: 80px;
    left: -100%;
    text-align: center;
    transition: all 0.5s;
  }
  nav ul li {
    display: block;
    margin: 50px 0;
    line-height: 30px;
  }
  nav ul li a {
    font-size: 20px;
  }
  a:hover,
  a.active {
    background: none;
    color: #0082e6;
  }
  #check:checked ~ ul {
    left: 0;
  }
}

.chiudi #check:checked ~ ul {
  left: 0;
}
</style>
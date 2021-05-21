

<template>
  <div class="text-gray-600">


    <div class="grid md:grid-cols-3">
      <div class="md:col-span-1 md:flex md:justify-end">
        <nav class="text-right">
          <div class="flex justify-between items-center">
            <h1
              class="font-bold uppercase p-4 border-b border-gray-100 "
            >
              <a class="hover:text-red-500" href="/"> Food Ninja </a>
            </h1>

            <div class="px-4 cursor-pointer md:hidden " @click="triggerMenu">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
          </div>
          <ul class="text-sm mt-6 menu-item" v-if="menu">
            <li class="text-gray-900 py-1">
              <a
                href="#"
                class="px-4 flex justify-end border-r-4 border-primary"
              >
                <span>HOME</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </a>
            </li>
        
            <li class="py-1">
              <a href="#" class="px-4 flex justify-end border-r-4 border-white">
                <span>ABOUT</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </a>
            </li>
     
            <li>
              <a href="#" class="px-4 flex justify-end border-r-4 border-white">
                <span>CONTACT</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <main class="px-16 py-6 bg-gray-100 md:col-span-2">
        <div class="flex justify-center md:justify-end">
          <a
            href="#"
            class="text-primary btn border-primary md:border-2 hover:bg-primary hover:text-white transition ease-out duration-500"
            >Log in</a
          >
          <a
            href="#"
            class="text-primary ml-2 btn border-primary md:border-2 hover:bg-primary hover:text-white transition ease-out duration-500"
            >Sign in</a
          >
        </div>

        <header>
          <h2 class="text-gray-700 text-6xl font-semibold">Recipes</h2>
          <h3 class="text-2xl font-semibold">For Ninja</h3>
        </header>

        <div class="">
          <h4 class="font-bold mt-12 pb-2 border-b border-gray-200">
            Latest Recipes
          </h4>

          <!--   grid -->
          <div class="mt-8 grid lg:grid-cols-3 gap-10">
            <div class="card hover:shadow-2xl transform hover:scale-105  transition ease-out duration-100">
              <img
                class="w-full h-32 sm:h-48 object-cover"
                :src="stewImg"
                alt="stew"
              />
              <div class="m-4">
                <span class="font-bold">5 Bean Chili Stew</span>
                <span class="block text-gray-500 text-sm">Recipe by tomas</span>
              </div>
              <div class="badge">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 inline-block"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span> 25 mins </span>
              </div>
            </div>
            <div class="card hover:shadow-2xl transform hover:scale-105  transition ease-out duration-100">
              <img
                class="w-full h-32 sm:h-48 object-cover"
                :src="curryImg"
                alt="stew"
              />
              <div class="m-4">
                <span class="font-bold">5 Bean Chili Stew</span>
                <span class="block text-gray-500 text-sm">Recipe by tomas</span>
              </div>
              <div class="badge">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 inline-block"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span> 25 mins </span>
              </div>
            </div>
            <div class="card hover:shadow-2xl transform hover:scale-105  transition ease-out duration-100">
              <img
                class="w-full h-32 sm:h-48 object-cover"
                :src="noodlesImg"
                alt="stew"
              />
              <div class="m-4">
                <span class="font-bold">5 Bean Chili Stew</span>
                <span class="block text-gray-500 text-sm">Recipe by tomas</span>
              </div>
              <div class="badge">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 inline-block"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span> 25 mins </span>
              </div>
            </div>
          </div>

          <!--   Grid -->
        </div>
      </main>
    </div>

    <h4 class="forn-bold mt-12 pb-2 border-b border-gray-200">Most Popular</h4>

    <div class="mt-8"></div>

    <div class="flex justify-center">
      <div class="bg-secondary-100 text-secondary-200 btn hover:shadow-inner transform hover:scale-125 hover:bg-opacity-50 transition ease-out duration-300">
        Load more
      </div>
    </div>

    <!--   Fine -->
  </div>
</template>


<script>
  import curryImg from "../../assets/img/curry.jpg";
   import noodlesImg from "../../assets/img/noodles.jpg";
    import stewImg from "../../assets/img/stew.jpg";
export default {
  data() {
    return {
      menu: false,
      curryImg,
      noodlesImg,
      stewImg
    };
  },
  methods: {
    triggerMenu() {
      this.menu = !this.menu;
    },
  },
};
</script>

<style scoped>




.menu-item-enter-from,
.menu-item-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.menu-item-enter-active {
  transition: all 0.3s ease-out;
}

.menu-item-leave-active {
  transition: all 0.3s ease-in;
}

.menu-item-enter-to,
.menu-item-leave-from {
  opacity: 1;
  transform: scale(1);
}




.grid-container {
  display: grid;
  grid-template-columns: auto auto auto;
  background-color: #2196f3;
  padding: 10px;
}
.grid-item {
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 20px;
  font-size: 30px;
  text-align: center;
}
</style>


 <template>
  <div>
    <div class="w3-light-grey w3-padding-64 w3-margin-bottom w3-center">
      <h1 class="w3-jumbo">Muevelo Project</h1>
    </div>
    <div class="w3-row-padding w3-content" style="max-width: 1400px">
      <div class="w3-twothird">
        <img
          src="http://avante.biz/wp-content/uploads/Beautiful-Wallpapers/Beautiful-Wallpapers-001.jpg"
          alt="Notebook"
          style="width: 100%"
        />
        <h2>Empty Notebook Found</h2>
        <div class="w3-justify">
          <base-button @click="loadTable('Rounds')">Tab Dances</base-button>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est.
          </p>
        </div>
      </div>
      <div class="w3-third">
        <div class="w3-container w3-light-grey">
          <h2>Very New News!</h2>
          <p class="w3-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <br />
        <div class="w3-container w3-light-grey w3-justify">
          <h2>Very New News!</h2>
          <p class="w3-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <br />
        <div class="w3-container w3-light-grey w3-justify">
          <h2>Very New News!</h2>
          <p class="w3-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </div>

    <div class="w3-bar w3-black">
      <button class="w3-bar-item w3-button" @click="trigerToggle('mine')">
        Competitions
      </button>
      <button class="w3-bar-item w3-button" @click="trigerToggle('fids')">
        From FIDS
      </button>
    </div>

    <div id="London" class="w3-container w3-display-container" v-show="mine">
      <span class="w3-button w3-large w3-display-topright">&times;</span>
      <h2>London</h2>
      <p>London is the capital city of England.</p>
    </div>

    <div id="Paris" class="w3-container w3-display-container" v-show="!mine">
      <span class="w3-button w3-large w3-display-topright">&times;</span>
      <h2>Paris</h2>
      <p>Paris is the capital of France.</p>
    </div>
  </div>
</template>




<script>
export default {
  data() {
    return {
      tab: null,
      mine: true,
    };
  },
  methods: {
    async loadTable(tabName) {
      try {
        await this.$store.dispatch("tab/getTabs", tabName);
        this.tab = this.$store.getters["tab/get" + tabName];

        console.log(this.tab[0]);
      } catch (error) {
        console.log(error);
      }
    },
    trigerToggle(mine) {
      if (mine === "mine") {
        this.mine = true;
      } else {
        this.mine = false;
      }
    },
  },
};
</script>

<style scoped>
</style>
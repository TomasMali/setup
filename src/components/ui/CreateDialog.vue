<template>
  <teleport to="body">
    <div v-if="show" @click="tryClose" class="backdrop"></div>
    <transition name="dialog">
      <dialog open v-if="show">
        <header>
          <slot name="header">
            <h2>{{ title }}</h2>
          </slot>
        </header>
        <section>
          <slot></slot>
        </section>
        <menu :show="!fixed">
          <slot name="actions" v-if="showBottons">
            <!-- :class="{ insertButtonDisabled: insertOff }" -->
            <base-button @click="tryInsert"> Insert</base-button>
            <base-button @click="tryClose">Close</base-button>
          </slot>
        </menu>
      </dialog>
    </transition>
  </teleport>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    fixed: {
      type: Boolean,
      required: false,
      default: false,
    },
    insertOff: {
      type: Boolean,
      required: false,
    },
    showBottons: {
      type: Boolean,
      required: false,
    },
  },
  emits: ["close", "insert"],
  methods: {
    tryClose() {
      if (this.fixed) {
        return;
      }
      this.$emit("close");
    },
    tryInsert() {
      this.$emit("insert");
    },
  },
};
</script>

<style scoped>
.insertButtonDisabled {
  border: 1px solid #1574e0;
  background-color: #cee6f8;
  color: #666666;

  cursor: not-allowed;
  pointer-events: none;
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}

dialog {
  position: fixed;
  top: 6vh;
  left: 2%;
  width: 90%;
  z-index: 100;

  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: white;
}

header {
  /** background-color: #3a0061; */
  background-color: #0082e6;
  color: white;
  width: 100%;
  padding: 1rem;
}

header h2 {
  margin: 0;
}

section {
  padding: 1rem;
  height: 490px;

  /* overflow-y: scroll;   */
}

menu {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  margin: 20;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.dialog-enter-active {
  transition: all 0.3s ease-out;
}

.dialog-leave-active {
  transition: all 0.3s ease-in;
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}

@media (min-width: 768px) {
  dialog {
    left: calc(50% - 30rem);
    width: 60rem;
  }
}
</style>

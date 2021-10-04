import { createApp, defineAsyncComponent } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import App from "./App.vue";
import router from "./router.js";
import store from "./store/index.js";

import BaseCard from "./components/ui/BaseCard.vue";
import BaseButton from "./components/ui/BaseButton.vue";
import BaseBadge from "./components/ui/BaseBadge.vue";
import BaseSpinner from "./components/ui/BaseSpinner.vue";

import Multiselect from "@vueform/multiselect";

// vuetify
import vuetify from "./plugins/vuetify";

import Dialog from "primevue/dialog";

const BaseDialog = defineAsyncComponent(() =>
    import ("./components/ui/BaseDialog.vue")
);

const CreateDialog = defineAsyncComponent(() =>
    import ("./components/ui/CreateDialog.vue")
);

const ErrorDialog = defineAsyncComponent(() =>
    import ("./components/ui/ErrorDialog.vue")
);

const app = createApp(App);

app.use(router);
app.use(store);

app.component("base-card", BaseCard);
app.component("base-button", BaseButton);
app.component("base-badge", BaseBadge);
app.component("base-spinner", BaseSpinner);
app.component("base-dialog", BaseDialog);
app.component("create-dialog", CreateDialog);
app.component("error-dialog", ErrorDialog);
app.component("Dialog", Dialog);
app.component("Multiselect", Multiselect);

app.use(vuetify);
app.mount("#app");
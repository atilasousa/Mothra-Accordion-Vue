import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import "./plugins/fontAwesome";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");

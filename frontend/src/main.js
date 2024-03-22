import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/images/logo.svg";
import "@/assets/styles/tailwind.css";
import "@/assets/styles/global.css";
import { registerGlbalComponent } from "./utils/import";
const app = createApp(App);

// Import thư viện Bootstrap (JS và CSS)
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

// Import thư viện Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fab, fas, far)
app.component('font-awesome-icon', FontAwesomeIcon)

registerGlbalComponent(app);
app.use(router);
app.use(store);
app.mount("#app");

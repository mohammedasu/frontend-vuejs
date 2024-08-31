require("./bootstrap");
require("./jquery.bs4-scrolling-tabs");
window.Vue = require("vue");

import Vuex, { mapGetters } from "vuex";
Vue.use(Vuex);

import VueRouter from "vue-router";
Vue.use(VueRouter);

import infiniteScroll from "vue-infinite-scroll";
Vue.use(infiniteScroll);

import { routes } from "./routes";
import "./filters";
const router = new VueRouter({
    mode: "history",
    routes
});

import storeData from "./store/index";
const store = new Vuex.Store(storeData);

import VueToast from "vue-toast-notification";
import axios from "axios";

import "vue-toast-notification/dist/theme-sugar.css";

import { headerConfig } from "./setHeaders";
import "./validation";
import VueSocialSharing from "vue-social-sharing";
import ReadMore from "vue-read-more";

Vue.use(ReadMore);
Vue.use(VueSocialSharing, {
    networks: {
        linkedin: "https://www.linkedin.com/sharing/share-offsite/?url=@u"
    }
});

Vue.mixin({
    data: function() {
        return {
            headerConfig: headerConfig
        };
    },
    computed: mapGetters(["getUser"])
});

router.beforeEach(async (to, from, next) => {
    store.commit("likeModal", false);
    store.commit("hideSearchBox", false);
    const tokenData = localStorage.getItem("token");
    localStorage.setItem("redirectUrl", window.location.href);
    if (tokenData == "") {
        window.location.href = "/login";
    } else {
        await store
            .dispatch("getUser")
            .then(() => {
                if (
                    store.state.is_registration_completed == 0 ||
                    store.state.user.status == 0
                ) {
                    localStorage.setItem("token", "");
                    window.location.href = "/login";
                } else {
                    localStorage.setItem("redirectUrl", "");
                    next();
                }
            })
            .catch(err => {
                const errData = err.response;
                if (errData.data.response_code == 103) {
                    localStorage.setItem("token", "");
                    window.location.href = "/login";
                }
                return false;
            });
    }
});
axios.interceptors.response.use(
    function(response) {
        return response;
    },
    function(error) {
        if (error.response.data.response_code == 403) {
            store.commit("verifiedLoader", true);
            document.getElementById("close_modal").click();
        } else {
            return Promise.reject(error);
        }
    }
);
if (process.env.MIX_APP_ENV == "local") {
    //axios.defaults.baseURL = "http://localhost/healwell24-dpn/public/api/v1/";
    axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1";
} else if (process.env.MIX_APP_ENV == "development") {
    axios.defaults.baseURL = "https://testapi.docscampus.com/api/v1";
} else {
    axios.defaults.baseURL = "https://api.docscampus.com/api/v1";
}

Vue.use(VueToast, {
    position: "bottom",
    type: "default"
});

Vue.component("app-comp", require("./components/App.vue").default);
import headerComp from "./components/common/Header";
import footerComp from "./components/common/Footer";

import patientComp from "./components/nearby/Patients";
import doctorServiceComp from "./components/services/Doctors";
import appointmentComp from "./components/appointment/appointment";
import Vue from "vue";

const app = new Vue({
    el: "#app",
    store,
    router,
    components: {
        "header-comp": headerComp,
        "footer-comp": footerComp,
        "patient-comp": patientComp,
        "doctor-service-comp": doctorServiceComp,
        "appointment-comp": appointmentComp
    }
});

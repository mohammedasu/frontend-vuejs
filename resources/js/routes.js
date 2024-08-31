import Dashboard from "./components/dashboard/index.vue";
import Network from "./components/network/index.vue";
import NearByDoctors from "./components/nearby/Doctors.vue";
import NotFound from "./components/common/NotFound.vue";
import NearByPatients from "./components/nearby/Patients.vue";
import CrmDashboard from "./components/crm/dashboard/index.vue";
import CrmPatients from "./components/crm/patient/index.vue";
import CrmAppointments from "./components/crm/appointment/index.vue";
import CrmPrescriptions from "./components/crm/prescription/index.vue";
import DoctorList from "./components/services/Doctors.vue";
import BookAppointment from "./components/appointment/appointment.vue";
import Connections from "./components/network/connections.vue";
import Messages from "./components/message/index.vue";
import Profile from "./components/profile/profile.vue";
import searchDoctors from "./components/search/searchdoctors.vue";
import singlePost from "./components/dashboard/singlePost.vue";
import ViewProfile from "./components/profile/viewProfile.vue";
import FindByAlumni from "./components/findbyalumni/Doctors.vue";
import NearByServices from "./components/nearby/Services.vue";

import CreatePage from "./components/createpage/index.vue";
import PageView from "./components/createpage/PageView.vue";
import PageList from "./components/createpage/PageList.vue";

import CreateGroup from "./components/creategroup/index.vue";
import GroupList from "./components/creategroup/GroupList.vue";
import ManageGroup from "./components/creategroup/ManageGroup.vue";
import GroupView from "./components/creategroup/GroupView.vue";

import ComingSoon from "./components/common/ComingSoon.vue";
import Webinar from "./components/webinar/Webinar.vue";
import Journals from "./components/learning/Journals.vue";

import DocsStudio from "./components/docsstudio/Index.vue";
import SeriesView from "./components/docsstudio/SeriesView.vue";
import EpisodeView from "./components/docsstudio/EpisodeView.vue";
import SeasonView from "./components/docsstudio/SeasonView.vue";

import CreateEvent from "./components/events/Create.vue";
import Events from "./components/events/Index.vue";
import EventView from "./components/events/List.vue";
import WebinarView from "./components/events/Webinar.vue";
import ProductView from "./components/createpage/Product.vue";
import ProductDetail from "./components/createpage/ProductDetail.vue";

import UserNotification from "./components/notification/index.vue";

export const routes = [
    { path: "/dashboard", component: Dashboard, name: "dashboard" },
    { path: "/post/:post_ref_no", component: singlePost, name: "singlepost" },
    { path: "/networks", component: Network, name: "networks" },
    { path: "/nearbydoctors", component: NearByDoctors, name: "nearbydoctors" },
    {
        path: "/nearbyservices",
        component: NearByServices,
        name: "nearbyservices"
    },

    { path: "/service/doctorlist", component: DoctorList, name: "doctorlist" },
    {
        path: "/bookappointment",
        component: BookAppointment,
        name: "bookappointment"
    },
    {
        path: "/nearbypatients",
        component: NearByPatients,
        name: "nearbypatients"
    },
    {
        path: "/doctor-crm/dashboard",
        component: CrmDashboard,
        name: "doctor-crm.dashboard"
    },
    {
        path: "/doctor-crm/patient",
        component: CrmPatients,
        name: "doctor-crm.patient"
    },
    {
        path: "/doctor-crm/appointment",
        component: CrmAppointments,
        name: "doctor-crm.appointment"
    },
    {
        path: "/doctor-crm/prescription",
        component: CrmPrescriptions,
        name: "doctor-crm.prescription"
    },
    {
        path: "/connections",
        component: Connections,
        name: "connections"
    },
    {
        path: "/messages",
        component: Messages,
        name: "messages"
    },
    {
        path: "/profile",
        component: Profile,
        name: "profile"
    },
    {
        path: "/searchdoctors",
        component: searchDoctors,
        name: "searchdoctors"
    },
    {
        path: "/basicdetails",
        component: Profile,
        name: "basicdetails"
    },
    {
        path: "/professionaldetails",
        component: Profile,
        name: "professionaldetails"
    },
    {
        path: "/speciality",
        component: Profile,
        name: "speciality"
    },
    {
        path: "/addressdetails",
        component: Profile,
        name: "addressdetails"
    },
    {
        path: "/services",
        component: Profile,
        name: "services"
    },
    {
        path: "/symptoms",
        component: Profile,
        name: "symptoms"
    },
    {
        path: "/viewprofile/:doctor_ref_no",
        component: ViewProfile,
        name: "viewprofile"
    },
    {
        path: "/findbyalumni",
        component: FindByAlumni,
        name: "findbyalumni"
    },

    {
        path: "/createpage",
        component: CreatePage,
        name: "createpage"
    },
    {
        path: "/createpage/:page_ref_no",
        component: CreatePage,
        name: "editpage"
    },
    {
        path: "/page/:page_ref_no",
        component: PageView,
        name: "pageview"
    },
    {
        path: "/allpages",
        component: PageList,
        name: "pagelist"
    },
    {
        path: "/creategroup",
        component: CreateGroup,
        name: "creategroup"
    },
    {
        path: "/creategroup/:group_ref_no",
        component: CreateGroup,
        name: "editgroup"
    },
    {
        path: "/groups",
        component: GroupList,
        name: "grouplist"
    },
    {
        path: "/manage/:group_ref_no",
        component: ManageGroup
    },
    {
        path: "/group/:group_ref_no",
        component: GroupView,
        name: "groupview"
    },
    {
        path: "/comingsoon",
        component: ComingSoon
    },
    {
        path: "/journals",
        component: Journals
    },
    {
        path: "/webinar",
        component: Webinar
    },
    {
        path: "/docsstudio",
        component: DocsStudio,
        name: "docsstudio"
    },
    {
        path: "/series/:series_ref_no",
        component: SeriesView,
        name: "seriesview"
    },
    {
        path: "/episode/:episode_ref_no",
        component: EpisodeView,
        name: "episodeview"
    },
    {
        path: "/season/:season_ref_no",
        component: SeasonView,
        name: "seasonview"
    },
    {
        path: "/events",
        component: Events,
        name: "events"
    },
    {
        path: "/createevent",
        component: CreateEvent,
        name: "createevent",
        beforeEnter: checkDoctorPermission
    },
    {
        path: "/createevent/:event_ref_no",
        component: CreateEvent,
        name: "editevent",
        beforeEnter: checkDoctorPermission
    },
    {
        path: "/event/:event_ref_no",
        component: EventView,
        name: "eventview"
    },
    {
        path: "/webinar/:event_ref_no",
        component: WebinarView,
        name: "webinarview"
    },
    {
        path: "/:type/:page_ref_no",
        component: ProductView,
        name: "productview"
    },
    {
        path: "/product-detail/:page_ref_no/:product_ref_no",
        component: ProductDetail,
        name: "productdetailview"
    },
    {
        path: "/:type/:page_ref_no/:product_ref_no",
        component: ProductView,
        name: "productview"
    },
    {
        path: "/notifications",
        component: UserNotification,
        name: "usernotification"
    },

    { path: "*", component: NotFound }
];

window.Vue = require("vue");
import Vuex from "vuex";
Vue.use(Vuex);
import storeData from "./store/index";

function checkDoctorPermission(to, from, next) {
    if (storeData.state.user.user_type == "doctor") {
        next();
    }
}

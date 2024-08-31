import { headerConfig } from "../setHeaders";
import { userUrl } from "../path";
import appointment from "./appointment";
import crm_patient from "./crm_patient";
import crm_appointment from "./crm_appointment";
import crm_prescription from "./crm_prescription";
import message from "./message";
import post from "./post";
import page from "./page";

export default {
    state: {
        user: {},
        loaderState: false,
        defaultImage: "/assets/img/profile.png",
        imageShow: "/assets/img/uploadimage.png", //placeholder image
        defaultLogo: "/assets/img/logo.png",
        searchData: [],
        searchCompleteData: {},
        verifiedModal: false,
        likeModal: false,
        lightBoxModal: false,
        lightBoxModalProfile: false,
        searchParams: {},
        shareModal: false,
        shareModalData: {},
        searchBox: false,
        is_registration_completed: 0
    },
    getters: {
        getPosts(state) {
            return state.posts;
        },
        getUser(state) {
            return state.user;
        },
        getSearchData(state) {
            return state.searchData;
        },
        getSearchCompleteData(state) {
            return state.searchCompleteData;
        },
        getSearchParams(state) {
            return state.searchParams;
        },
        getShareModalData(state) {
            return state.shareModalData;
        }
    },

    mutations: {
        emptySearchData(state) {
            state.searchData = [];
            state.searchCompleteData = [];
        },
        hideSearchBox(state, payload) {
            state.searchBox = payload;
        },
        setSearchData(state, payload) {
            state.searchData = payload;
        },
        setSearchParams(state, payload) {
            state.searchParams = payload;
        },
        changeUserRequestStatus(state, payload) {
            state.searchData = state.searchData.map(user => {
                if (user.user_ref_no == payload.selected_user_ref_no) {
                    user.connection_status = 1;
                    return user;
                }
                return user;
            });
        },
        setSearchCompleteData(state, payload) {
            state.searchCompleteData = payload;
        },
        setSingleSearchData(state, payload) {
            state.searchData.push(payload);
        },
        updateUser(state, postload) {
            state.user = postload;
        },
        showLoader(state, val) {
            state.loaderState = val;
        },
        verifiedLoader(state, val) {
            state.verifiedModal = val;
        },
        likeModal(state, val) {
            state.likeModal = val;
        },
        lightBoxModal(state, val) {
            state.lightBoxModal = val;
        },
        lightBoxModalProfile(state, val) {
            state.lightBoxModalProfile = val;
        },
        shareModal(state, val) {
            state.shareModal = val;
        },
        setShareModalData(state, payload) {
            state.shareModalData = payload;
        },
        checkRegistrationComplete(state, payload) {
            state.is_registration_completed = payload;
        }
    },
    actions: {
        async getUser(context) {
            await axios.get(userUrl.fetchUserBackendUrl, headerConfig).then(
                response => {
                    let data = response.data;
                    context.commit("updateUser", data.data.user_data);
                    context.commit(
                        "checkRegistrationComplete",
                        data.data.user_data.is_registration_completed
                    );
                },
                err => {
                    const errData = err.response;
                    if (errData.data.response_code == 103) {
                        localStorage.setItem("token", "");
                        window.location.href = "/login";
                    }
                    return false;
                }
            );
        }
    },
    modules: {
        appointment: appointment,
        message: message,
        crm_patient: crm_patient,
        crm_appointment: crm_appointment,
        crm_prescription: crm_prescription,
        post: post,
        page: page
    }
};

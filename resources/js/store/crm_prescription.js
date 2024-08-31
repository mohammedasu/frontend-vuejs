import { headerConfig } from "../setHeaders";
import { crmUrl } from "../path";
export default {
    namespaced: true,
    state: {
        nextPage: "",
        currentPage: 0,
        previousPage: 0,
        loadmore: false,
        loaderState: false,
        defaultImage: "/assets/img/profile.png",
        prescriptions: [],
    },
    getters: {
        getPrescriptions(state) {
            return state.prescriptions;
        },
    },

    mutations: {
        fetchPrescription(state, prescriptions) {
            state.prescriptions = prescriptions;
        },
        setNextPage(state, data) {
            state.nextPage = data.next_page;
            state.currentPage = data.current_page;
        },
        setPreviousPage(state, data) {
            state.previousPage = data.current_page - 1;
            state.loadmore = false;
        },
        loadMore(state) {
            state.loadmore = true;
        },
        updatePrescription(state, prescriptionload) {
            state.prescriptions = state.prescriptions.map(prescription => {
                if (prescription.crm_prescription_ref_no === prescriptionload.crm_prescription_ref_no) {
                    return prescriptionload;
                }
                return prescription;
            });
        },
        MorePrescription(state, prescriptions) {
            const originalState = [...state.prescriptions];
            prescriptions.map(prescription => {
                originalState.push(prescription);
            });
            state.prescriptions = originalState;
            state.prescriptions = [ ...new Set(state.prescriptions) ];
        },
        showLoader(state, val) {
            state.loaderState = val;
        },
        addPrescription(state, prescription) {
            const originalState = [...state.prescriptions];
            originalState.unshift(prescription);
            state.prescriptions = originalState;
        },
        deletePrescription(state,prescription) {
            let index = state.prescriptions.indexOf(prescription);
            state.prescriptions.splice(index, 1);
        }
    },
    actions: {
        addPrescription(context, prescription) {
            context.commit("addPrescription", prescription);
        },
        async getPrescription(context) {
            context.commit("showLoader", true, { root: true });
            await axios.get(crmUrl.fetchCrmPrescriptionBackendUrl, headerConfig).then(
                response => {
                    let data = response.data.data;

                    context.commit("fetchPrescription", data.crm_prescription_data);
                    context.commit("setNextPage", data);
                    context.commit("setPreviousPage", data);
                    context.commit("showLoader", false, { root: true });
                },
                err => {
                    context.commit("showLoader", false, { root: true });
                    return false;
                }
            );
        },
        updatePrescription(context, post) {
            context.commit("updatePrescription", post);
        },
        async loadMore(context) {
            if (
                context.state.nextPage != "" &&
                context.state.nextPage != null &&
                context.state.previousPage != context.state.currentPage &&
                context.state.loadmore == true
            ) {
                context.commit("showLoader", true, { root: true });
                await axios.get(context.state.nextPage, headerConfig).then(
                    response => {
                        let data = response.data.data;
                        context.commit("setNextPage", data);
                        context.commit("setPreviousPage", data);
                        context.commit("MorePrescription", data.crm_prescription_data);
                        context.commit("showLoader", false, { root: true });
                    },
                    err => {
                        context.commit("showLoader", false, { root: true });
                        return false;
                    }
                );
            }
        },
        async deletePrescription(context,prescription) {
            context.commit("deletePrescription", prescription);
        },
    }
};

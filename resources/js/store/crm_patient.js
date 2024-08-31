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
        patients: [],
    },
    getters: {
        getPatients(state) {
            return state.patients;
        },
    },

    mutations: {
        fetchPatient(state, patients) {
            state.patients = patients;
        },
        setNextPost(state, data) {
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
        updatePatient(state, patientload) {
            state.patients = state.patients.map(patient => {
                if (patient.crm_patient_ref_no === patientload.crm_patient_ref_no) {
                    return patientload;
                }
                return patient;
            });
        },
        MorePatient(state, patients) {
            const originalState = [...state.patients];
            patients.map(patient => {
                originalState.push(patient);
            });
            state.patients = originalState;
            state.patients = [ ...new Set(state.patients) ];
        },
        showLoader(state, val) {
            state.loaderState = val;
        },
        addPatient(state, patient) {
            const originalState = [...state.patients];
            originalState.unshift(patient);
            state.patients = originalState;
        },
        deletePatient(state,patient) {
            let index = state.patients.indexOf(patient);
            state.patients.splice(index, 1);
        }
    },
    actions: {
        addPatient(context, patient) {
            context.commit("addPatient", patient);
        },
        async getPatient(context) {
            context.commit("showLoader", true, { root: true });
            await axios.get(crmUrl.fetchCrmPatientBackendUrl, headerConfig).then(
                response => {
                    let data = response.data.data;

                    context.commit("fetchPatient", data.crm_patient_data);
                    context.commit("setNextPost", data);
                    context.commit("setPreviousPage", data);
                    context.commit("showLoader", false, { root: true });
                },
                err => {
                    context.commit("showLoader", false, { root: true });
                    return false;
                }
            );
        },
        updatePatient(context, post) {
            context.commit("updatePatient", post);
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
                        context.commit("setNextPost", data);
                        context.commit("setPreviousPage", data);
                        context.commit("MorePatient", data.crm_patient_data);
                        context.commit("showLoader", false, { root: true });
                    },
                    err => {
                        context.commit("showLoader", false, { root: true });
                        return false;
                    }
                );
            }
        },
        async deletePatient(context,patient) {
            context.commit("deletePatient", patient);
        },
    }
};

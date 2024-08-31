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
        appointments: [],
    },
    getters: {
        getAppointments(state) {
            return state.appointments;
        },
    },

    mutations: {
        fetchAppointment(state, appointments) {
            state.appointments = appointments;
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
        updateAppointment(state, appointmentload) {
            state.appointments = state.appointments.map(appointment => {
                if (appointment.crm_appointment_ref_no === appointmentload.crm_appointment_ref_no) {
                    return appointmentload;
                }
                return appointment;
            });
        },
        MoreAppointment(state, appointments) {
            const originalState = [...state.appointments];
            appointments.map(appointment => {
                originalState.push(appointment);
            });
            state.appointments = originalState;
            state.appointments = [ ...new Set(state.appointments) ];
        },
        showLoader(state, val) {
            state.loaderState = val;
        },
        addAppointment(state, appointment) {
            const originalState = [...state.appointments];
            originalState.unshift(appointment);
            state.appointments = originalState;
        },
        deleteAppointment(state,appointment) {
            let index = state.appointments.indexOf(appointment);
            state.appointments.splice(index, 1);
        }
    },
    actions: {
        addAppointment(context, appointment) {
            context.commit("addAppointment", appointment);
        },
        async getAppointment(context) {
            context.commit("showLoader", true, { root: true });
            await axios.get(crmUrl.fetchCrmAppointmentBackendUrl, headerConfig).then(
                response => {
                    let data = response.data.data;

                    context.commit("fetchAppointment", data.crm_appointment_data);
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
        updateAppointment(context, post) {
            context.commit("updateAppointment", post);
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
                        context.commit("MoreAppointment", data.crm_appointment_data);
                        context.commit("showLoader", false, { root: true });
                    },
                    err => {
                        context.commit("showLoader", false, { root: true });
                        return false;
                    }
                );
            }
        },
        async deleteAppointment(context,appointment) {
            context.commit("deleteAppointment", appointment);
        },
    }
};

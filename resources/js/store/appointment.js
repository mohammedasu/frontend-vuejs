export default {
    namespaced: true,
    state: {
        doctor_ref_no: "",
        doctor_service_ref_no: ""
    },
    getters: {
        getDoctorParams(state){
            console.log(state.doctor_ref_no);
            return state;
        }
    },

    mutations: {
        setDoctorParams(state, payload){
            state.doctor_ref_no = payload.doctor_ref_no;
            state.doctor_service_ref_no = payload.doctor_service_ref_no;
        }
    },
    actions: {
        setDoctorParams(context, payload) {
            context.commit("setDoctorParams", payload);
        },
    }
};

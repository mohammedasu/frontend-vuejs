import { fetchAppointmentTimeSlots, addappointmentBackendUrl } from "../path";
import requestMixin from "./request";
import { mapGetters } from "vuex";

export default {
    mixins: [requestMixin],
    data() {
        return {
            timeslots: [],
            doctordetails: [],
            appointmentDetails: [],
            show_patient_details: false,
        };
    },
    components: {
        mapGetters
    },
    computed: mapGetters({
        doctor: "appointment/getDoctorParams",
    }),
    created() {
        this.fetchAppointmentTimeSlots();
    },
    methods: {
        async fetchAppointmentTimeSlots() {
            const data = await this.getRequest(fetchAppointmentTimeSlots + "?doctor_ref_no=" + this.doctor.doctor_ref_no
                + "&doctor_service_ref_no=" + this.doctor.doctor_service_ref_no, this.headerConfig);
            this.timeslots = data.slots;
            this.doctordetails = data.doctor_details;
        },
        addPatientDetails(time, date) {
            this.show_patient_details = true;
            this.appointmentDetails.date = date;
            this.appointmentDetails.time = time;
        },
        async processForm() {
            let formData = new FormData();
            formData.append("first_name", this.first_name);
            formData.append("last_name", this.last_name);
            formData.append("email", this.email);
            formData.append("mobile", this.mobile);
            formData.append("gender", this.gender);
            formData.append("dob", this.dob);
            formData.append('appointmentDate', this.appointmentDate);
            const data = await this.postRequest(addappointmentBackendUrl, formData);
        }
    },
};

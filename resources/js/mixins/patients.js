import {
    fetchNearByPatientsBackendUrl,
    connectionBackendUrl,
    fetchConnectionBackendUrl
} from "../path";

import requestMixin from "./request";
import patientslist from "../components/common/patientlist";

export default {
    mixins: [requestMixin],
    data() {
        return {
            patients: [],
            data: ""
        };
    },
    components: {
        patientslist
    },
    created() {
        this.fetchNearByPatients();
    },
    methods: {
        async loadMorePatients(data) {
            const url = data.next_page_url;

            if (url) {
                const responseData = await this.getRequest(url);
                const dataArry = responseData.data;
                dataArry.map(item => {
                    this.patients.data.push(item);
                });
                this.patients.next_page_url = responseData.next_page_url;
                this.patients.total = responseData.total;
            }
        },
        async fetchNearByPatients(params = "") {
            let url = fetchNearByPatientsBackendUrl;
            if (params.speciality) {
                url +=
                    "?speciality=" +
                    params.speciality +
                    "&pincode=" +
                    params.pincode;
            }
            const data = await this.getRequest(url);
            this.patients = data;
        },
        filterList(params) {
            this.fetchNearByPatients(params);
        },
        async fetchConnections() {
            const data = await this.getRequest(fetchConnectionBackendUrl);
            this.connections = data.connection_data;
        },
        postConnect(patient) {
            this.postConnectRequest(patient);
        },
        changeRequestStatus(selectedPatient) {
            this.patients.data = this.patients.data.map(patient => {
                if (
                    patient.user_ref_no == selectedPatient.selected_user_ref_no
                ) {
                    patient.connection_status = 1;
                    return patient;
                }
                return patient;
            });
        },
        async postConnectRequest(patient) {
            let formData = new FormData();
            formData.append("selected_user_ref_no", patient.user_ref_no);
            const data = await this.postRequest(connectionBackendUrl, formData);
            this.changeRequestStatus(data.connection_data);
        }
    }
};

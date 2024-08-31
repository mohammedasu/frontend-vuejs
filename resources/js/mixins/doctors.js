import {
    fetchNearByDoctorsBackendUrl,
    connectionBackendUrl,
    fetchOnlineConsultationDoctorsBackendUrl,
    fetchAlumniDoctorList,
    fetchConnectionBackendUrl,
    groupMemberUrl
} from "../path";

import requestMixin from "./request";
import doctorslist from "../components/common/doctorlist";
import mixinLoader from "./loader";

export default {
    mixins: [requestMixin, mixinLoader],
    data() {
        return {
            doctor_data: []
        };
    },
    components: {
        doctorslist
    },
    methods: {
        async loadMoreDoctors(data) {
            const url = data.next_page_url;
            if (url) {
                const responseData = await this.getRequest(url);
                const dataArry = responseData.data;
                dataArry.map(item => {
                    this.doctor_data.data.push(item);
                });
                this.doctor_data.next_page_url = responseData.next_page_url;
                this.doctor_data.total = responseData.total;
            }
        },
        async fetchNearByDoctors() {
            let url = fetchNearByDoctorsBackendUrl;
            const data = await this.getRequest(url);
            this.doctor_data = data;
        },
        async fetchConnections() {
            const data = await this.getRequest(fetchConnectionBackendUrl);
            this.connections = data.connection_data;
        },
        async findByAlumniDoctors(params = "") {
            let url = fetchAlumniDoctorList;
            if (params.institute) {
                url += "?institute_master_ref_no=" + params.institute;
            }
            const data = await this.getRequest(url);
            this.doctor_data = data;
        },
        async filterList(params) {
            this.fetchNearByDoctors(params);
        },
        async fetchOnlineConsultationDoctors() {
            const data = await this.getRequest(
                fetchOnlineConsultationDoctorsBackendUrl
            );
            this.doctors = data.doctor_list;
        },

        postConnect(doctor) {
            this.postConnectRequest(doctor);
        },
        changeRequestStatus(selectedDoctor) {
            this.doctor_data.data = this.doctor_data.data.map(doctor => {
                if (doctor.user_ref_no == selectedDoctor.selected_user_ref_no) {
                    doctor.connection_status = 1;
                    return doctor;
                }
                return doctor;
            });
        },
        async postConnectRequest(doctor) {
            let formData = new FormData();
            this.showProcessLoader(doctor.user_ref_no);
            formData.append("selected_user_ref_no", doctor.user_ref_no);
            const data = await this.postRequest(connectionBackendUrl, formData);
            this.changeRequestStatus(data.connection_data);
            this.hideProcessLoader(doctor.user_ref_no);
        },
        async acceptRequest(connection) {
            this.showProcessLoader(connection.connection_ref_no);

            let index = this.connections.indexOf(connection);
            let formData = new FormData();
            formData.append("_method", "put");

            await this.postRequest(
                connectionBackendUrl + "/" + connection.connection_ref_no,
                formData
            );
            this.hideProcessLoader(connection.connection_ref_no);

            this.connections.splice(index, 1);
            this.$store.dispatch("getUser");
            // call connection api again
            this.fetchConnections();
        },
        async rejectRequest(connection, requestType) {
            this.showProcessLoader(connection.connection_ref_no);
            let index = "";
            if (requestType == "withdraw") {
                index = this.sentConnections.indexOf(connection);
            } else {
                index = this.connections.indexOf(connection);
            }
            let formData = new FormData();
            formData.append("_method", "delete");
            formData.append("type", requestType);
            await this.postRequest(
                connectionBackendUrl + "/" + connection.connection_ref_no,
                formData
            );
            this.hideProcessLoader(connection.connection_ref_no);

            if (requestType == "withdraw") {
                this.sentConnections.splice(index, 1);
            } else {
                this.connections.splice(index, 1);
            }
            this.$store.dispatch("getUser");
            // call connection api again
            this.fetchConnections();
        },
        async fetchGroupJoinedReceivedRequest() {
            const data = await this.getRequest(
                groupMemberUrl.fetchUserReceivedRequested // request received for group join
            );
            this.grouprequests = data.group_member_data;
            this.next_page = data.next_page;
        },

        async fetchGroupJoinedSentRequest() {
            const data = await this.getRequest(
                groupMemberUrl.fetchUserSentRequested // request sent for group join
            );
            this.grouprequests_sent = data.group_member_data;
            this.next_page = data.next_page;
        },
        async acceptRejectGroupJoinRequest(member, request_type) {
            this.showProcessLoader(member.member_ref_no);

            let formData = new FormData();
            formData.append("group_ref_no", member.group_ref_no);
            formData.append("member_ref_no", member.member_ref_no);
            formData.append("type", request_type);

            await this.postRequest(groupMemberUrl.updateUserRequest, formData);
            this.hideProcessLoader(member.member_ref_no);
            if (request_type == "withdraw") {
                let index = this.grouprequests_sent.indexOf(member);
                this.grouprequests_sent.splice(index, 1);
                this.fetchGroupJoinedSentRequest();
            } else {
                let index = this.grouprequests.indexOf(member);
                this.grouprequests.splice(index, 1);
                this.fetchGroupJoinedReceivedRequest();
            }
            // call request api again
        }
    }
};

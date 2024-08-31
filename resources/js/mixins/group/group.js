import mixinLoader from "../../mixins/loader";
import mixinRequest from "../../mixins/request";
import mixinShare from "../../mixins/share";
import { groupUrl, groupMemberUrl } from "../../path";

export default {
    mixins: [mixinRequest, mixinLoader, mixinShare],
    data() {
        return {
            form: {
                name: "",
                group_privacy: "public",
                group_visibility: "",
                group_post_setting: "",
                description: "",
                coverimage: "",
                coverimageUrl: "",
                image: "",
                imageUrl: ""
            },
            edit: null,
            group_data: {},
            loading_group_data: false,
            membertab: false,
            hometab: false,
            invite_modal_show: false
        };
    },
    created() {
        if (this.$route.name == "editgroup") {
            if (this.$route.params.group_ref_no) {
                const group_ref_no = this.$route.params.group_ref_no;
                if (this.$route.name == "editgroup") {
                    this.edit = group_ref_no;
                }
                this.fetchGroupData(group_ref_no);
            }
        }
    },
    methods: {
        async fetchGroupData(group_ref_no) {
            const data = await this.getRequest(
                groupUrl.fetchSingleGroupBackendUrl + "/" + group_ref_no
            );
            if (data.group_data) {
                this.loading_group_data = true;
                this.group_data = data.group_data;
                if (this.edit) {
                    this.form = {
                        name: this.group_data.name,
                        group_privacy: this.group_data.group_privacy,
                        group_visibility: this.group_data.group_visibility,
                        group_post_setting: this.group_data.group_post_setting,
                        description: this.group_data.description,
                        image: "",
                        imageUrl: this.group_data.fullimage,
                        coverimage: "",
                        coverimageUrl: this.group_data.coverimage
                    };
                }
                this.$store.commit("post/changePostAs", {
                    txt: "group",
                    group: this.group_data
                });
            }
        },
        readFile(e, whichimage) {
            if (
                e.target.files[0]["type"] === "image/jpeg" ||
                e.target.files[0]["type"] === "image/jpg" ||
                e.target.files[0]["type"] === "image/png"
            ) {
                if (whichimage == "cover") {
                    this.form.coverimage = e.target.files[0];
                    this.form.coverimageUrl = URL.createObjectURL(
                        this.form.coverimage
                    );
                } else {
                    this.form.image = e.target.files[0];
                    this.form.imageUrl = URL.createObjectURL(this.form.image);
                }
            } else {
                if (whichimage == "cover") {
                    this.form.coverimage = "";
                    this.form.coverimageUrl = "";
                } else {
                    this.form.image = "";
                    this.form.imageUrl = "";
                }
                this.$toast.error("Please select jpeg,jpg,png file !");
            }
        },
        onSubmit() {
            if (this.edit) {
                this.updateData();
            } else {
                this.saveData();
            }
        },
        async saveData() {
            let formData = new FormData(this.$refs.formHTML);
            formData.append("image", this.form.image);
            formData.append("group_cover_image", this.form.coverimage);
            this.showProcessLoader(true);
            const url = this.edit
                ? groupUrl.updateGroupBackendUrl
                : groupUrl.addGroupBackendUrl;
            const data = await this.postRequest(url, formData);
            this.hideProcessLoader(true);
            if (data.group_data) {
                this.$toast.success("Group Successfully Created !");
                this.$router.push("/groups");
            }
        },
        async updateData() {
            let formData = new FormData(this.$refs.formHTML);
            if (this.form.image) {
                formData.append("image", this.form.image);
            }
            if (this.form.coverimage) {
                formData.append("group_cover_image", this.form.coverimage);
            }
            this.showProcessLoader(true);
            formData.append("group_ref_no", this.edit);
            const data = await this.postRequest(
                groupUrl.updateGroupBackendUrl,
                formData
            );
            this.hideProcessLoader(true);
            if (data.group_data) {
                this.$toast.success("Group Successfully Updated !");
                this.$router.push("/groups");
            }
        },
        async fetchGroups() {
            this.loadinggroups = false;
            this.next_page = null;
            const dataAll = await this.getRequest(
                groupUrl.fetchAllGroupBackendUrl
            );
            if (dataAll.group_data) {
                this.allgroups = dataAll.group_data;
                this.next_page = dataAll.next_page;
                this.loadinggroups = true;
            }
        },
        async fetchUserGroups() {
            this.loadinggroups = false;
            this.next_page = null;
            const data_user = await this.getRequest(
                groupUrl.fetchGroupBackendUrl
            );
            if (data_user.group_data) {
                this.usergroups = data_user.group_data;
                this.next_page = data_user.next_page;
                this.loadinggroups = true;
            }
        },
        async fetchUserJoinedGroups() {
            this.loadinggroups = false;
            this.next_page = null;
            const data_joined = await this.getRequest(
                groupUrl.fetchJoinedGroupsBackendUrl
            );
            if (data_joined.group_data) {
                this.joinedgroups = data_joined.group_data;
                this.next_page = data_joined.next_page;
                this.loadinggroups = true;
            }
        },
        async loadMoreGroups(txt) {
            let callUrl = this.next_page;
            const data = await this.getRequest(callUrl);
            if (data.group_data) {
                const moreData = data.group_data;

                if (txt == "all") {
                    moreData.map(item => {
                        this.allgroups.push(item);
                    });
                } else if (txt == "user") {
                    moreData.map(item => {
                        this.usergroups.push(item);
                    });
                } else if (txt == "joined") {
                    moreData.map(item => {
                        this.joinedgroups.push(item);
                    });
                }
            }
            this.next_page = data.next_page;
        },
        async sendJoinRequest(group, request_send_type = "join") {
            this.showProcessLoader(group.group_ref_no);
            let formData = new FormData();
            formData.append("group_ref_no", group.group_ref_no);
            formData.append("request_send_type", request_send_type);
            const data = await this.postRequest(
                groupMemberUrl.addMemberBackendUrl,
                formData
            );
            this.hideProcessLoader(group.group_ref_no);
            if (data.group_member_data) {
                this.allgroups = this.allgroups.map(groupdata => {
                    if (groupdata.group_ref_no == group.group_ref_no) {
                        if (request_send_type == "direct") {
                            groupdata.member_status = 1;
                        } else {
                            groupdata.member_status = 0; // request sent
                        }
                        return groupdata;
                    }
                    return groupdata;
                });
            }
        },
        async sendDirectJoinRequest(group) {
            this.showProcessLoader(group.group_ref_no);
            let formData = new FormData();
            formData.append("group_ref_no", group.group_ref_no);
            if (group.group_privacy == "public") {
                formData.append("request_send_type", "direct");
            } else {
                formData.append("request_send_type", "join");
            }
            const data = await this.postRequest(
                groupMemberUrl.addMemberBackendUrl,
                formData
            );
            this.hideProcessLoader(group.group_ref_no);
            if (data.group_member_data) {
                if (group.group_privacy == "public") {
                    this.group_data_pass.member_status = 1;
                    this.$toast.success("Group joined successfully.");
                } else {
                    this.$toast.success("Request sent successfully.");
                    this.group_data_pass.member_status = 0;
                }
            }
        },
        fetchTabData(txt) {
            this.membertab = false;
            this.hometab = false;
            if (txt == "member") {
                this.membertab = true;
            } else if (txt == "home") {
                this.hometab = true;
            } else {
                this.membertab = false;
            }
        },
        redirectTab(txt) {
            var contenthome = document.getElementById("home");
            var contentabout = document.getElementById("about");
            var contentmembers = document.getElementById("members");

            var memberstab = document.getElementById("nav-members-tab");
            var hometab = document.getElementById("nav-home-tab");
            var abouttab = document.getElementById("nav-about-tab");

            if (txt == "member") {
                contentmembers.classList.add("active", "show");
                contenthome.classList.remove("active", "show");
                contentabout.classList.remove("active", "show");
                memberstab.classList.add("active");
                memberstab.classList.remove("fade");
                hometab.classList.remove("active", "show");
                abouttab.classList.remove("active", "show");
                this.membertab = true;
            } else if (txt == "about") {
                contentabout.classList.add("active", "show");
                contenthome.classList.remove("active", "show");
                contentmembers.classList.remove("active", "show");
                abouttab.classList.add("active");
                abouttab.classList.remove("fade");
                hometab.classList.remove("active", "show");
                memberstab.classList.remove("active", "show");
            }
        },
        async fetchGroupMembers(group) {
            const callUrl =
                groupMemberUrl.fetchMemberBackendUrl + "/" + group.group_ref_no;

            const data = await this.getRequest(callUrl);
            if (data.group_member_data) {
                this.groupmembers = data.group_member_data;
                this.group_member_next_page = data.next_page;
            }
        },
        async fetchInvitationSent(group) {
            const callUrl =
                groupMemberUrl.fetchInvitationSent + "/" + group.group_ref_no;

            const data = await this.getRequest(callUrl);
            if (data.group_member_data) {
                this.sent_invitations = data.group_member_data;
                this.invitation_next_page = data.next_page;
            }
        },

        async fetchGroupMembersInModal(group, txt = "") {
            let callUrl = "";
            if (txt != "") {
                callUrl = this.modal_next_page;
            } else {
                callUrl =
                    groupMemberUrl.fetchMemberBackendUrl +
                    "/" +
                    group.group_ref_no;
            }
            const data = await this.getRequest(callUrl);
            if (data.group_member_data) {
                const data_response = data.group_member_data;
                if (txt == "more") {
                    data_response.map(item => {
                        this.modal_groupmembers.push(item);
                    });
                } else {
                    this.modal_groupmembers = data.group_member_data;
                }
                this.modal_next_page = data.next_page;
                this.totaldisplay = data.total;
            }
        },
        async fetchInvitationSentInModal(group, txt = "") {
            let callUrl = "";
            if (txt != "") {
                callUrl = this.invitation_next_page;
            } else {
                callUrl =
                    groupMemberUrl.fetchInvitationSent +
                    "/" +
                    group.group_ref_no;
            }
            const data = await this.getRequest(callUrl);
            if (data.group_member_data) {
                const data_response = data.group_member_data;
                if (txt == "more") {
                    data_response.map(item => {
                        this.sent_invitations.push(item);
                    });
                } else {
                    this.sent_invitations = data.group_member_data;
                }
                this.invitation_next_page = data.next_page;
            }
        },
        showHideInviteModal(payload) {
            this.invite_modal_show = payload.val;
            this.refreshMemberTab(payload.type);
        },
        refreshMemberTab(type) {
            if (type == "refresh") {
                this.membertab = false;
                this.$nextTick(() => {
                    this.membertab = true;
                });
            }
        },
        async fetchMutualConnections(group, txt = "") {
            let callUrl = "";
            if (txt != "") {
                callUrl = this.mutual_next_page;
            } else {
                callUrl =
                    groupMemberUrl.fetchMutualConnections +
                    "/" +
                    group.group_ref_no;
            }
            const data = await this.getRequest(callUrl);
            if (data.group_member_data) {
                const data_response = data.group_member_data;
                if (txt == "more") {
                    data_response.map(item => {
                        this.mutual_connections.push(item);
                    });
                } else {
                    this.mutual_connections = data.group_member_data;
                }
                this.mutual_next_page = data.next_page;
                this.totaldisplay_connections = data.total;
            }
        },
        async fetchJoiningRequest(group, txt = "") {
            let callUrl = "";
            if (txt != "") {
                callUrl = this.request_next_page;
            } else {
                callUrl =
                    groupMemberUrl.fetchJoiningRequest +
                    "/" +
                    group.group_ref_no;
            }
            const data = await this.getRequest(callUrl);
            if (data.group_member_data) {
                const data_response = data.group_member_data;
                if (txt == "more") {
                    data_response.map(item => {
                        this.joining_requests.push(item);
                    });
                } else {
                    this.joining_requests = data.group_member_data;
                }
                this.request_next_page = data.next_page;
            }
        },
        async cancelInvitation(invitation) {
            console.log(invitation);
            let formData = new FormData();
            formData.append("_method", "delete");
            formData.append("delete_type", "invitation");
            this.showProcessLoader(invitation.member_ref_no);
            const data = await this.postRequest(
                groupMemberUrl.deleteMemberBackendUrl +
                    "/" +
                    invitation.member_ref_no,
                formData
            );
            this.hideProcessLoader(invitation.member_ref_no);
            if (data.group_member_data) {
                const index = this.sent_invitations.indexOf(invitation);
                this.sent_invitations.splice(index, 1);
            }
        },
        //for admin
        async acceptRequest(request) {
            let formData = new FormData();
            formData.append("member_ref_no", request.member_ref_no);
            formData.append("group_ref_no", request.group_ref_no);
            this.showProcessLoader(request.member_ref_no);
            const data = await this.postRequest(
                groupMemberUrl.updateMemberBackendUrl,
                formData
            );
            this.hideProcessLoader(request.member_ref_no);
            if (data.group_member_data) {
                const index = this.joining_requests.indexOf(request);
                this.joining_requests.splice(index, 1);
            }
        }
    }
};

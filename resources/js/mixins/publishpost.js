import mixinRequest from "./request";
import { addPostBackendUrl } from "../path";

export default {
    mixins: [mixinRequest],
    methods: {
        validateForm() {
            if (this.form.desc == "") {
                this.$toast.error("Please enter text");
                return false;
            }
            /*  if (this.$route.name == "dashboard") {
                if (this.$store.state.post.posting_as == "page") {
                    this.$toast.error(
                        "Please select posting as user for home feed! "
                    );
                    return false;
                }
            } */
            if (
                this.$store.state.post.postto != "user" &&
                this.$store.state.post.selected_list_data.length < 1
            ) {
                this.$toast.error("Please select atleast one group/page !");
                return false;
            }
            return true;
        },
        async submitPost() {
            const validateData = this.validateForm();
            if (validateData) {
                const posting_as = this.$store.state.post.posting_as;
                const posting_to = this.$store.state.post.postto;
                const posting_as_ref_no =
                    posting_as == "page"
                        ? this.$store.state.post.posting_as_data.page_ref_no
                        : posting_as == "group"
                        ? this.$store.state.post.posting_as_data.group_ref_no
                        : this.getUser.user_ref_no;

                let formData = new FormData();
                if (this.form.postImage != "") {
                    formData.append("post_image[]", this.form.postImage);
                }
                formData.append("desc", this.form.desc);
                formData.append("posting_as", posting_as);
                formData.append("posting_as_ref_no", posting_as_ref_no);
                formData.append("is_upload_at_multiple_source", 0);
                if (this.$route.name == "dashboard") {
                    formData.append("post_display_option", this.form.visibleto);
                    formData.append("source_ref_no", posting_as_ref_no);
                    if (
                        posting_as == "user" &&
                        (posting_to == "page" || posting_to == "group")
                    ) {
                        formData.append(
                            "source_ref_no",
                            this.$store.state.post.selected_list_data
                        );
                    }
                    formData.append("source", posting_to);
                    if (posting_as == "page") {
                        formData.append("source", posting_as);
                    }
                    if (
                        posting_to != "user" &&
                        this.$route.name == "dashboard"
                    ) {
                        formData.append("is_upload_at_multiple_source", 1);
                    }
                } else {
                    formData.append("post_display_option", "all");
                    if (this.$route.name == "pageview") {
                        formData.append(
                            "source_ref_no",
                            this.$route.params.page_ref_no
                        );
                        formData.append("source", "page");
                    } else if (this.$route.name == "groupview") {
                        formData.append(
                            "source_ref_no",
                            this.$route.params.group_ref_no
                        );
                        formData.append("source", "group");
                    }
                }

                this.loading = true;
                let data = await this.postRequest(addPostBackendUrl, formData);
                this.loading = false;
                if (data.post_data) {
                    this.form.desc = "";
                    this.form.postImage = "";
                    this.form.imageUrl = "";
                    this.$store.dispatch("post/addPost", data.post_data);
                    document.getElementById("close_modal").click();
                }
            }
        },
        openPostModal(txt) {
            this.$store.commit("post/openPostModal", { txt: txt });

            if (this.$route.name == "dashboard") {
                // change post to user whenever click on create post//
                this.$store.commit("post/changePostTo", { txt: "user" });
                this.$store.commit("post/selectedListData", []);
                this.$store.commit("post/changePostAs", {
                    txt: "user"
                });
                this.$store.commit("post/setWantPost", true);
            }
        },
        closePostModal(txt) {
            this.$store.commit("post/closePostModal", { txt: txt });
        },
        changePostto(txt) {
            this.$store.commit("post/changePostTo", { txt: txt });
            if (txt != "user") {
                this.$store.commit("post/selectedListData", []);
                this.$store.commit("post/openListModal", { txt: txt });
            }
        },
        changePostas(txt, page) {
            this.$store.commit("post/changePostAs", {
                txt: txt,
                page: page
            });

            this.$store.commit("post/openPostModal", { txt: "post" });
            if (txt != "user") {
                this.$store.commit("post/setWantPost", false);
            } else {
                this.$store.commit("post/setWantPost", true);
            }
        },
        backToPost(txt) {
            this.$store.commit("post/openPostModal", { txt: txt });
        }
    }
};

import {
    addCommentBackendUrl,
    addCommentLikeBackendUrl,
    deleteCommentLikeBackendUrl
} from "../path";

export default {
    methods: {
        async submitCommentRequest(val, txt) {
            let formData = new FormData();

            if (txt == "reply") {
                formData.append(
                    "parent_comment_ref_no",
                    this.$store.state.post.mainComment
                );
                formData.append(
                    "reply_to",
                    this.$store.state.post.lastCommentUser.user_ref_no
                );
                formData.append("parent_reply_ref_no", val.post_comment_ref_no);
                if (this.replybox == "") {
                    this.$toast.error("Please enter something!");
                    return false;
                }
                formData.append("desc", this.replybox);
            } else {
                if (this.post_comment == "") {
                    this.$toast.error("Please enter something!");
                    return false;
                }
                formData.append("desc", this.post_comment);
            }

            formData.append("post_ref_no", val.post_ref_no);
            //formData.append("mainComment", val.mainComment);
            this.commentloading = true;
            this.replyloading = true;
            return new Promise((resolve, reject) => {
                axios
                    .post(addCommentBackendUrl, formData, this.headerConfig)
                    .then(response => {
                        let data = response.data;
                        this.commentloading = false;
                        resolve(data.data);
                    })
                    .catch(err => {
                        const errData = err.response;
                        this.$toast.error(errData.data.message);
                        this.commentloading = false;
                        this.replyloading = false;
                    });
            });
        },
        async commentLikeRequest(comment) {
            let formData = new FormData();
            formData.append("post_ref_no", comment.post_ref_no);
            formData.append("appendType", comment.appendType);
            formData.append(
                "parent_comment_ref_no",
                comment.post_comment_ref_no
            );
            if (comment.appendType == "reply") {
                formData.append("mainComment", comment.mainComment);
            }
            return new Promise((resolve, reject) => {
                axios
                    .post(addCommentLikeBackendUrl, formData, this.headerConfig)
                    .then(response => {
                        let data = response.data;
                        resolve(data.data);
                    })
                    .catch(err => {
                        const errData = err.response;
                        this.$toast.error(errData.data.message);
                    });
            });
        },
        async commentDisLikeRequest(comment) {
            let formData = new FormData();
            formData.append("post_ref_no", comment.post_ref_no);
            formData.append("appendType", comment.appendType);
            formData.append(
                "parent_comment_ref_no",
                comment.post_comment_ref_no
            );
            if (comment.appendType == "reply") {
                formData.append("mainComment", comment.mainComment);
            }
            return new Promise((resolve, reject) => {
                axios
                    .post(
                        deleteCommentLikeBackendUrl,
                        formData,
                        this.headerConfig
                    )
                    .then(response => {
                        let data = response.data;
                        resolve(data.data);
                    })
                    .catch(err => {
                        const errData = err.response;
                        this.$toast.error(errData.data.message);
                    });
            });
        }
    }
};

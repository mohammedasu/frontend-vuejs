import { addLikeBackendUrl, deleteLikeBackendUrl } from "../path";

export default {
    methods: {
        async postLikeRequest(post) {
            let formData = new FormData();
            return new Promise((resolve, reject) => {
                axios
                    .post(
                        addLikeBackendUrl + "/" + post.post_ref_no + "/like",
                        formData,
                        this.headerConfig
                    )
                    .then(response => {
                        let data = response.data;
                        resolve(data.data.post_data);
                    })
                    .catch(err => {
                        const errData = err.response;
                        this.$toast.error(errData.data.message);
                    });
            });
        },
        async postUnLikeRequest(post) {
            let formData = new FormData();
            formData.append("_method", "delete");
            return new Promise((resolve, reject) => {
                axios
                    .post(
                        deleteLikeBackendUrl +
                            "/" +
                            post.post_ref_no +
                            "/like/" +
                            post.liked_post.post_like_ref_no,
                        formData,
                        this.headerConfig
                    )
                    .then(response => {
                        let data = response.data;
                        resolve(data.data.post_data);
                    })
                    .catch(err => {
                        const errData = err.response;
                        this.$toast.error(errData.data.message);
                    });
            });
        },
        async postLikes(post) {
            return new Promise((resolve, reject) => {
                const url =
                    addLikeBackendUrl + "/" + post.post_ref_no + "/like";
                axios
                    .get(url, this.headerConfig)
                    .then(response => {
                        this.$store.commit("showLoader", false);

                        let data = response.data;
                        resolve(data);
                    })
                    .catch(err => {
                        this.$store.commit("showLoader", false);

                        const errData = err.response;
                        this.$toast.error(errData.data.message);
                    });
            });
        }
    }
};

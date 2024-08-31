import mixinLoader from "../mixins/loader";

export default {
    mixins: [mixinLoader],

    methods: {
        async postRequest(url, formData) {
            return new Promise((resolve, reject) => {
                axios
                    .post(url, formData, this.headerConfig)
                    .then(response => {
                        this.$store.commit("showLoader", false);
                        let responseData = response.data.data;
                        resolve(responseData);
                    })
                    .catch(err => {
                        this.$store.commit("showLoader", false);
                        this.hideProcessLoader(true);

                        const errData = err.response;
                        if (errData) {
                            /* if (errData.data.response_code == "101") {
                                this.$toast.error(errData.data.message);
                            } else {
                                //this.$toast.error("Please try again later!");
                            } */
                            this.$toast.error(errData.data.message);
                        }
                    });
            });
        },
        async postRequestWithCompleteData(url, formData) {
            return new Promise((resolve, reject) => {
                axios
                    .post(url, formData, this.headerConfig)
                    .then(response => {
                        this.$store.commit("showLoader", false);
                        let responseData = response.data;
                        resolve(responseData);
                    })
                    .catch(err => {
                        this.$store.commit("showLoader", false);
                        this.hideProcessLoader(true);

                        const errData = err.response;
                        if (errData) {
                            if (errData.data.response_code == "101") {
                                this.$toast.error(errData.data.message);
                            } else {
                                this.$toast.error("Please try again later!");
                            }
                        }
                    });
            });
        },
        async getRequest(url, showloader = true) {
            return new Promise((resolve, reject) => {
                this.$store.commit("showLoader", showloader);
                axios
                    .get(url, this.headerConfig)
                    .then(response => {
                        this.$store.commit("showLoader", false);
                        const responseData = response.data.data;
                        resolve(responseData);
                    })
                    .catch(err => {
                        this.$store.commit("showLoader", false);
                        const errData = err.response;
                        if (errData) {
                            if (errData.data.response_code == "101") {
                                this.$toast.error(errData.data.message);
                            } else {
                                this.$toast.error("Please try again later!");
                            }
                        }
                    });
            });
        }
    }
};

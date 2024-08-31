import { trackingUrl } from "../path";
export default {
    created() {
        this.callTracking();
    },
    methods: {
        callTracking() {
            let target_category = "";
            let target_ref_no = null;
            let utm_source = localStorage.getItem("utm_source");
            let utm_medium = localStorage.getItem("utm_medium");
            let utm_campaign = localStorage.getItem("utm_campaign");
            if (this.$route.name == "pageview") {
                target_category = "page";
                target_ref_no = this.$route.params.page_ref_no;
            } else if (this.$route.name == "groupview") {
                target_category = "group";
                target_ref_no = this.$route.params.group_ref_no;
            } else if (this.$route.name == "dashboard") {
                const d = new Date();
                const today_date = d.getDate();
                const today_month = d.getMonth() + 1;
                const today_year = d.getFullYear();
                const final_date =
                    today_date + "-" + today_month + "-" + today_year;
                utm_source = "Login" + final_date;
                utm_medium = "DASHBOARD";
                utm_campaign = "TrackLogin";
            } else {
                target_category = this.$route.name;
            }

            if (
                utm_source !== "" &&
                utm_source !== null &&
                utm_source !== undefined &&
                utm_medium !== "" &&
                utm_medium !== null &&
                utm_medium !== undefined &&
                utm_campaign !== "" &&
                utm_campaign !== null &&
                utm_campaign !== undefined
            ) {
                const formData = new FormData();
                formData.append("target_category", target_category);
                formData.append("target_ref_no", target_ref_no);
                formData.append("utm_source", utm_source);
                formData.append("utm_medium", utm_medium);
                formData.append("utm_campaign", utm_campaign);
                axios
                    .post(trackingUrl.addTracking, formData, this.headerConfig)
                    .then(response => {
                        localStorage.removeItem("utm_source");
                        localStorage.removeItem("utm_medium");
                        localStorage.removeItem("utm_campaign");
                    })
                    .catch(err => {
                        const errData = err.response;
                    });
            }
        }
    }
};

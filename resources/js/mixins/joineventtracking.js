import { trackingUrl } from "../path";
export default {
    methods: {
        callJoinTracking() {
            let target_category = "EVENT";
            let target_ref_no = this.$route.params.event_ref_no;
            const utm_source = "EventPage";
            const utm_medium = "JoinEvent";
            const utm_campaign = "DirectEvent";
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
                    .post(
                        trackingUrl.addJoinEventTracking,
                        formData,
                        this.headerConfig
                    )
                    .then(response => {})
                    .catch(err => {
                        const errData = err.response;
                    });
            }
        }
    }
};

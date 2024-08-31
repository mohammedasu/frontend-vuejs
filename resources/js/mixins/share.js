export default {
    methods: {
        openShareModal(ref_no, desc, txt) {
            let regex = /(<([^>]+)>)/gi;
            let descpass = desc.replace(regex, "");
            const user_name =
                this.getUser.first_name + " " + this.getUser.last_name;
            let title = "";
            if (
                this.$route.name == "dashboard" ||
                this.$route.name == "singlepost"
            ) {
                title =
                    user_name +
                    " has shared an interesting post from DocsCampus.";
            } else {
                title = user_name + " has shared an page from DocsCampus.";
            }

            descpass = descpass.substring(0, 10);
            const domainname = window.location.origin;
            const shareurl = domainname + "/" + txt + "/" + ref_no;
            this.$store.commit("setShareModalData", {
                url: shareurl,
                description: descpass,
                title: title
            });
            this.$store.commit("shareModal", true);
        }
    }
};

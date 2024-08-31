import { searchDataBackendUrl } from "../path";

export default {
    methods: {
        async searchDoctors(pageVal) {
            let url = searchDataBackendUrl;
            if (pageVal) {
                url = searchDataBackendUrl + "?page=" + pageVal;
            }
            const searchText = this.$store.state.searchParams.searchText;
            const searchType = this.$store.state.searchParams.searchType;

            if (searchText != "" && searchType != "") {
                let formData = new FormData();
                formData.append("searchText", searchText);
                formData.append("searchType", searchType);
                const data = await this.postRequest(url, formData);
                this.searchData = data.search_data;

                this.$store.commit("emptySearchData");
                this.$store.commit("setSearchData", data.search_data);
                this.$store.commit("setSearchCompleteData", data);
                var checkbutton = document.getElementById("close_id")
                    .offsetLeft;
                if (this.$route.name != "searchdoctors" && checkbutton == 0) {
                    this.$store.commit("hideSearchBox", true);
                }
                if (checkbutton) {
                    this.$store.commit("hideSearchBox", true);
                }
            } else {
                this.$store.commit("emptySearchData");
                this.$store.commit("hideSearchBox", false);
            }
        },
        resetSearch() {
            // this.$store.commit("emptySearchData");
            this.$store.commit("hideSearchBox", false);
        }
    }
};

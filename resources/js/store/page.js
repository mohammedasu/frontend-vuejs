import { fetchIndustryBackendUrl, fetchSinglePageBackendUrl } from "../path";
import { headerConfig } from "../setHeaders";

export default {
    namespaced: true,
    state: {
        form: {
            name: "",
            tagline: "",
            page_visibility: "public",
            image: "",
            coverimage: "",
            imageUrl: "",
            coverimageUrl: "",
            company_industry: "",
            company_size: "",
            company_type: "",
            website: "",
            email: "",
            aboutus: "",
            location: "",
            offerings: []
        },
        showgeneral: true,
        showabout: false,
        industries: [],
        editPage: ""
    },
    getters: {
        getPageData(state) {
            return state.form;
        }
    },
    mutations: {
        setState(state, payload) {
            const whichstate = payload.state;
            if (whichstate == "coverimage") {
                state.form.coverimage = payload.coverimage;
                state.form.coverimageUrl = payload.coverimageUrl;
            } else if (whichstate == "image") {
                state.form.image = payload.image;
                state.form.imageUrl = payload.imageUrl;
            }
        },
        setStateData(state, payload) {
            if (payload.name) {
                state.form.name = payload.name;
            } else if (payload.tagline) {
                state.form.tagline = payload.tagline;
            } else if (payload.page_visibility) {
                state.form.page_visibility = payload.page_visibility;
            } else if (payload.company_type) {
                state.form.company_type = payload.company_type;
            } else if (payload.company_size) {
                state.form.company_size = payload.company_size;
            } else if (payload.website) {
                state.form.website = payload.website;
            } else if (payload.email) {
                state.form.email = payload.email;
            } else if (payload.company_industry) {
                state.form.company_industry = payload.company_industry;
            } else if (payload.aboutus) {
                state.form.aboutus = payload.aboutus;
            } else if (payload.offerings) {
                state.form.offerings = payload.offerings;
            } else if (payload.location) {
                state.form.location = payload.location;
            }
        },
        setTab(state, payload) {
            if (payload.txt == "general") {
                state.showgeneral = true;
                state.showabout = false;
            } else {
                state.showgeneral = false;
                state.showabout = true;
            }
        },
        setIndustry(state, payload) {
            state.industries = payload;
        },
        setEditPage(state, payload) {
            state.editPage = payload;
        }
    },
    actions: {
        setState(context, payload) {
            context.commit("setStateData", { name: payload.name });
            context.commit("setStateData", { tagline: payload.tagline });
            context.commit("setStateData", {
                page_visibility: payload.page_visibility
            });
            context.commit("setStateData", {
                company_industry: payload.company_industry
            });
            context.commit("setStateData", {
                website: payload.website
            });
            context.commit("setStateData", {
                email: payload.email
            });
            context.commit("setStateData", {
                company_size: payload.company_size
            });
            context.commit("setStateData", {
                company_type: payload.company_type
            });
            context.commit("setStateData", {
                aboutus: payload.aboutus
            });
            context.commit("setStateData", {
                offerings: payload.offerings
            });
            context.commit("setStateData", {
                location: payload.location
            });
        },
        async fetchIndustries(context) {
            await axios.get(fetchIndustryBackendUrl, headerConfig).then(
                response => {
                    let data = response.data.data;
                    context.commit("setIndustry", data.industries_data);
                },
                err => {
                    return false;
                }
            );
        },
        async fetchEditPage(context, payload) {
            await axios
                .get(fetchSinglePageBackendUrl + "/" + payload, headerConfig)
                .then(
                    response => {
                        let data = response.data.data;
                        if (data.page_data) {
                            context.dispatch("setState", data.page_data);
                            context.commit("setStateData", {
                                company_industry: data.page_data.industry_ref_no
                            });
                        }
                    },
                    err => {
                        return false;
                    }
                );
        }
    }
};

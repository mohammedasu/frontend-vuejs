export default {
    data() {
        return {
            loader: {
                loading: false,
                loader_ref_no: null
            }
        };
    },
    methods: {
        showProcessLoader(ref_no) {
            this.loader.loading = true;
            this.loader.loader_ref_no = ref_no;
        },
        hideProcessLoader(ref_no) {
            this.loader.loading = false;
            this.loader.loader_ref_no = null;
        }
    }
};

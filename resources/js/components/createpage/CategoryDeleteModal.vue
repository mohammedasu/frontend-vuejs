<template>
    <section>
        <!-- Delete product category start --  -->
        <div class="modal show fade createpostpopup pr-0" id="deleteproductcategory">
            <div class="modal-dialog">
                <div class="modal-content modal-lg">
                    <!-- Modal pageloader -->
                    <div class="pageloader">	<span>Posting...</span>
                        <img src="assets/img/loader.gif" alt="processing..." />
                    </div>
                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title text-left ">{{ is_product ? 'Delete product' : 'Delete product category' }}</h4> 
                        <button type="button" class="close" @click.prevent="closeModal">&times;</button>
                    </div>
                    <!-- Modal body -->
                
                        <div class="modal-body">
                            <form class="form" id="myform">																	
                                <p>{{ is_product ? 'Are you sure you want to delete this product' : 'Are you sure you want to delete this category? This will also delete all the products listed under this category.' }}</p>						
                                <button class="btnfill outline-color float-right border-none mt-4 mb-0" @click.prevent="closeModal">Cancel</button>
                                <div class="btnloader" v-if="loader.loading && loader.loader_ref_no == $route.params.page_ref_no">
                                    <img src="/assets/img/loader-btn.gif" alt="" />
                                </div>
                                <button v-else class="btnfill float-right mt-4 mb-0" @click.prevent="deleteCategoryModal">Delete</button>
                            </form>
                        </div>
            
                </div>
            </div>
        </div>
        <!-- Delete product category end -->
        <div class="modal-backdrop fade show"></div>
    </section>
</template>

<script>
import mixinLoader from "../../mixins/loader";

export default {
    props: ["is_product"],
    mixins: [mixinLoader],
    data() {
        return {
            //is_product: this.$props.is_product,
        };
    },
    methods: {
        deleteCategoryModal() {
            this.showProcessLoader(this.$route.params.page_ref_no);
            this.$emit("deleteCategoryModal");
            setTimeout(() => {
                this.hideProcessLoader(this.$route.params.page_ref_no);
            }, 1000);
        },
        closeModal() {
			this.$emit("closeModal");
		},
    },
}
</script>
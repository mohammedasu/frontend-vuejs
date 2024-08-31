<template>
    <section>   
        <!-- Add a product category start -->
        <div class="modal show fade createpostpopup pr-0" id="addproductcategory">
            <div class="modal-dialog">
                <div class="modal-content modal-lg">
                    <!-- Modal pageloader -->
                    <div class="pageloader">	<span>Posting...</span>
                        <img src="/assets/img/loader.gif" alt="processing..." />
                    </div>
                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title text-left ">{{ is_edit ? 'Edit' : 'Add' }} a category</h4> 
                        <button type="button" class="close" @click.prevent="closeModal">&times;</button>
                    </div>
                    <!-- Modal body -->
                
                        <div class="modal-body">
                            <ValidationObserver v-slot="{ handleSubmit }">
                                <form class="form" @submit.prevent="handleSubmit(submitCategory)" ref="categoryForm">
                                    <label class="labelstyle pt-2">Category Name <span>*</span></label>
                                    <ValidationProvider name="category_name" rules="required">
                                        <div slot-scope="{ errors }" class="position-relative">
                                            <input
                                            type="text"
                                            name="category_name"
                                            maxlength="100"
                                            placeholder="Enter the category name"
                                            v-model="form.category_name"
                                            />
                                            <span class="requireds">{{ errors[0] }}</span>
                                        </div>
                                    </ValidationProvider>
                                                            
                                    <label class="labelstyle pt-2">Description</label>
                                    <ValidationProvider name="category_description" rules="required">
                                        <div slot-scope="{ errors }" class="position-relative">
                                            <textarea v-model="form.category_description"
                                            name="category_description"
                                            maxlength="120"
                                            placeholder="Write a short description of the category" 
                                            col="10">
                                            </textarea>
                                            <span class="requireds">{{ errors[0] }}</span>
                                        </div>
                                    </ValidationProvider>

                                    <div class="btnloader" v-if="loader.loading && loader.loader_ref_no == $route.params.page_ref_no">
                                        <img src="/assets/img/loader-btn.gif" alt="" />
                                    </div>                    
                                    <button v-else class="btnfill float-right mt-4 mb-0">{{ is_edit ? 'Update' : 'Add' }} category</button>
                                </form>
                            </ValidationObserver>
                        </div>
            
                </div>
            </div>
        </div>
        <!-- Add a product category end -->
        <div class="modal-backdrop fade show"></div>
    </section>
</template>

<script>
import mixinLoader from "../../mixins/loader";

export default {
    props: ["editCategory","is_edit"],
	mixins: [mixinLoader],
    data() {
        return {
            form: {
                category_name: this.$props.editCategory.category_name ? this.$props.editCategory.category_name : '',
                category_description: this.$props.editCategory.category_description ? this.$props.editCategory.category_description : '',
            }
        };
    },
    methods: {
        submitCategory() {
            this.showProcessLoader(this.$route.params.page_ref_no);
            this.$emit("submitCategory",this.$refs.categoryForm);
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

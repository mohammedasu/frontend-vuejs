<template>
    <!-- Dashboard sec start -->
	<section class="footerfixbg">
		<div class="container">	
            <div class="d-flex">
                <div class="float-left pt-2 mt-1">
                    <router-link :to="'/page/'+$route.params.page_ref_no">
						<img width="25" src="/assets/img/back-arrow.svg">
					</router-link>
                </div>
                <div>	
                    <ul class="breadcrumb pl-1">
                        <li><router-link to="/dashboard">Home</router-link></li>
                        <li><router-link to="/allpages">Pages</router-link></li>
                        <li><router-link :to="'/page/'+$route.params.page_ref_no+'?type='+$route.query.type">{{ page_detail.name | capitalize }}</router-link></li>
                        <li><router-link :to="'/page/'+$route.params.page_ref_no+'?type='+$route.query.type">{{ category_detail.page_offering | capitalize }}</router-link></li>
                        <li>{{ category_detail.page_offering == 'products' ? productdetail.product_name : (category_detail.page_offering == 'courses' ? productdetail.course_name : productdetail.service_name) | capitalize }}</li>
                    </ul>
                </div>	
            </div>		

            <div class="row">
                <div class="col-lg-12 middlesec px-sm-0">
                    <div class="card p-3">
                        <div class="postionrigt w80" v-if="getUser.user_ref_no == page_detail.user_ref_no">
                            <div class="d-flex justify-content-end pt-3">
                                <!-- <div><a href="#" class="">
                                    <img src="/assets/img/share.svg">
                                </a></div> -->
                                <div class="treedotdrop">
                                    <div class="dropdown ">
                                        <button onclick="toggleBtn()" class="dropbtn">...</button>
                                        <div id="myDropdown" class="dropdown-content w150">
                                            <router-link class="model_alerttbtn" :to="'/'+category_detail.page_offering+'/'+$route.params.page_ref_no+'/'+$route.params.product_ref_no">
                                                <img alt="" width="18" height="18" src="/assets/img/edit.svg">Edit
                                            </router-link>
                                            <a class="model_alerttbtn" @click.prevent="deleteProductModal()">
                                                <img alt="" width="18" height="18" src="/assets/img/delete.svg">Delete</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <h3 class="mr-5 pr-3">{{ category_detail.page_offering == 'products' ? productdetail.product_name : (category_detail.page_offering == 'courses' ? productdetail.course_name : productdetail.service_name) | capitalize }}</h3>
                        <div class="row mb-3">
                            <div class="col-sm-6">
                                <label class="labelstyle pt-2 mb-2 text-uppercase">Category</label>
                                <p class="orange-tags">{{ category_detail.category_name | capitalize }}</p>
                            </div>
                            <div class="col-sm-6">
                                <label class="labelstyle pt-2 mb-2 text-uppercase">{{ category_detail.page_offering == 'products' ? 'Product Composition' : (category_detail.page_offering == 'courses' ? 'Course Duration' : 'Service Type') }}</label>
                                <p class="orange-tags">{{ category_detail.page_offering == 'products' ? productdetail.product_composition : (category_detail.page_offering == 'courses' ? productdetail.course_duration : productdetail.service_type) | capitalize }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12 middlesec px-sm-0">
                    <div class="card p-3">
                        <div class="row">
                            <div class="col-xl-4 col-lg-5 col-md-6 col-sm-12">			 
                                <div class="slider-for">
                                    <VueSlickCarousel
                                        :arrows="false"
                                        ref="c1" 
                                        :asNavFor="$refs.c2" 
                                        :focusOnSelect="true"
                                        >
                                        <div><img :src="productdetail.image_thumbnail" /></div>
                                        <div v-for="image in productdetail.images" :key="image">
                                            <img :src="image" />
                                        </div>
                                    </VueSlickCarousel>
                                </div>
                                <div class="slider-nav">						
                                    <VueSlickCarousel
                                        ref="c2"
                                        :asNavFor="$refs.c1"
                                        :focusOnSelect="true"
                                        :slidesToShow="slidesToShow"
                                        >
                                        <div><img :src="productdetail.image_thumbnail" /></div>
                                        <div v-for="image in productdetail.images" :key="image">
                                            <img :src="image" />
                                        </div>
                                    </VueSlickCarousel>
                                </div>	     
                            </div>
                            <div class="col-xl-8 col-lg-5 col-md-6 col-sm-12">
                                <div class="row mb-3">
                                    <div class="col-sm-6">
                                        <label class="labelstyle pt-2 mb-0 text-uppercase">{{ category_detail.page_offering == 'products' ? 'PRODUCT SKU' : (category_detail.page_offering == 'courses' ? 'NO. OF SEATS' : 'OPERATIONAL TIMING') }}</label>
                                        <p class="pxxxssmall">{{ category_detail.page_offering == 'products' ? productdetail.sku : (category_detail.page_offering == 'courses' ? productdetail.seats : productdetail.timing) }}</p>
                                    </div>
                                    <div class="col-sm-6">
                                        <label class="labelstyle pt-2 mb-0 text-uppercase">{{ category_detail.page_offering == 'products' ? 'PRICE' : (category_detail.page_offering == 'courses' ? 'COURSE FEE' : 'SERVICE COST') }}</label>
                                        <p class="pxxxssmall"><span class="rupee pl-3 top"></span>{{ category_detail.page_offering == 'products' ? productdetail.price_min+ '-' +productdetail.price_max : (category_detail.page_offering == 'courses' ? productdetail.course_fee : productdetail.service_cost_min+ '-' +productdetail.service_cost_max) }}</p>
                                    </div>
                                </div>
                                <label class="labelstyle pt-2 mb-0 text-uppercase">Description</label>
                                
                                <p class="pxxxssmall">{{ productdetail.description }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		</div>

        <categoryDeleteModal v-if="is_delete_modal" :is_product="is_product" @closeModal="closeModal" @deleteCategoryModal="deleteProduct"></categoryDeleteModal>

	</section>
	<!-- Dashboard sec end -->
</template>

<script>
import { productUrl, courseUrl, serviceUrl } from "../../path";
import mixinRequest from "../../mixins/request";
import categoryDeleteModal from "./CategoryDeleteModal.vue";

import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';

export default {
    mixins:[mixinRequest],
    data() {
        return {
            productdetail: {},
            page_detail: {},
            category_detail: {},
            is_delete_modal: false,
            is_product: false,
            slidesToShow: 4,
        };
    },
    created() {
        this.fetchProductDetail();
    },
    components: {
        categoryDeleteModal,
        VueSlickCarousel
    },
    methods: {
        async fetchProductDetail() {
            let formData = new FormData();
            this.$route.query.type == 'products' ? 
            formData.append('product_ref_no',this.$route.params.product_ref_no) : 
            ( 
                this.$route.query.type == 'courses' ? 
                formData.append('course_ref_no',this.$route.params.product_ref_no) : 
                formData.append('service_ref_no',this.$route.params.product_ref_no) 
            )
            //formData.append('product_ref_no', this.$route.params.product_ref_no);
            formData.append('page_ref_no', this.$route.params.page_ref_no);
            let data = {};
            if(this.$route.query.type == 'products'){
                data = await this.postRequest(productUrl.singleproductdetail,formData);
                data = data.product_data;
            } else if(this.$route.query.type == 'services'){
                data = await this.postRequest(serviceUrl.singleproductdetail,formData);
                data = data.service_data;
            } else if(this.$route.query.type == 'courses') {
                data = await this.postRequest(courseUrl.singleproductdetail,formData);
                data = data.course_data;
            }
            //const data = await this.postRequest(productUrl.singleproductdetail, formData);
            this.productdetail = data;
            this.page_detail = data.page_detail;
            this.category_detail = data.category_detail;
        },
        closeModal() {
            this.is_delete_modal = false;
            this.category_ref_no = '';
		},
        async deleteProductModal(){
            this.is_delete_modal = true;
            this.is_product = true;
        },
        async deleteProduct(){
            let formData = new FormData();
            formData.append("_method","DELETE");

            if(this.category_detail.page_offering == 'products'){
                await this.postRequest(productUrl.productdetails+'/'+this.$route.params.product_ref_no,formData);
            } else if(this.category_detail.page_offering == 'services'){
                await this.postRequest(serviceUrl.productdetails+'/'+this.$route.params.product_ref_no,formData);
            } else if(this.category_detail.page_offering == 'courses') {
                await this.postRequest(courseUrl.productdetails+'/'+this.$route.params.product_ref_no,formData);
            }
            
            this.$router.push({
                path: '/page/'+this.$route.params.page_ref_no,
                query: {
                    type: this.category_detail.page_offering,
                },
            }).catch(() => {});

            this.is_delete_modal = false;
            this.is_product = false;
        },
    }
};
</script>

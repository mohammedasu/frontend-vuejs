<template>
    <!-- Dashboard sec start -->
	<section class="footerfixbg">
		<div class="container">
			<div class="row">
				<div class="float-left pt-2 mt-1">
					<router-link :to="'/page/'+$route.params.page_ref_no">
						<img width="25" src="/assets/img/back-arrow.svg">
					</router-link>
				</div>
				<ul class="breadcrumb pl-1">
					<li><router-link to="/dashboard">Home</router-link></li>
					<li><router-link to="/allpages">Pages</router-link></li>
					<!-- <li><a href="">Glover Inc</a></li> -->
					<li><router-link :to="'/page/'+$route.params.page_ref_no+'?type='+$route.params.type">{{ $route.params.type | capitalize}}</router-link>
					</li>
					<li>{{ $route.params.product_ref_no ? 'Edit' : 'Add' }} a {{ $route.params.type == 'products' ? 'product' : ($route.params.type == 'courses' ? 'course' : 'service' ) }}</li>
				</ul>
			</div>
			<div class="row d-flex justify-content-center create-events">
				<div class="col-sm-6 createfrom">
					<h4>{{ $route.params.product_ref_no ? 'Edit' : 'Add' }} a {{ $route.params.type == 'products' ? 'product' : ($route.params.type == 'courses' ? 'course' : 'service' ) }}</h4>
                    <ValidationObserver v-slot="{ handleSubmit }">
					<form class="" @submit.prevent="handleSubmit(addProduct)" ref="productForm">
						<!--<p class="mb-0"><span>Product has variants</span><label class="switch">
                        <input type="checkbox" checked="" value="" id=""><span class="slider round"></span>
                        </label><span class="ml-3">(Feature coming soon) </span></p>-->

						<label class="labelstyle pt-3">Category</label>
						<div class="select-arrow whitebgs">
                            <ValidationProvider name="category_ref_no" rules="required">
                                <div slot-scope="{ errors }" class="position-relative">
                                    <v-select
                                        label="category_name"
                                        :options="categories"
                                        v-model="category_name"
                                        @input="setSelected"
                                        placeholder="Select a category"
                                    >
                                    </v-select>
                                    <span class="requireds" style="top:40px;">{{ errors[0] }}</span>
                                </div>
                            </ValidationProvider>
						</div>

						<label class="labelstyle pt-2">{{ $route.params.type == 'products' ? 'Product Name' : ($route.params.type == 'courses' ? 'Course Name' : 'Service Name' ) }}<span>*</span></label>
                        <ValidationProvider :name="$route.params.type == 'products' ? 'product_name' : ($route.params.type == 'courses' ? 'course_name' : 'service_name' )" rules="required">
                            <div slot-scope="{ errors }" class="position-relative">
                                <input
                                type="text"
                                :name="$route.params.type == 'products' ? 'product_name' : ($route.params.type == 'courses' ? 'course_name' : 'service_name' )"
                                :placeholder="$route.params.type == 'products' ? 'Enter the product name' : ($route.params.type == 'courses' ? 'Enter the course name' : 'Enter the service name' )"
                                class="whitebgs"
                                v-model="form.product_name"
                                />
                                <span class="requireds">{{ errors[0] }}</span>
                            </div>
                        </ValidationProvider>

						<label class="labelstyle pt-2">{{ $route.params.type == 'products' ? 'Product Composition' : ($route.params.type == 'courses' ? 'Course Duration' : 'Service Type' ) }} <span>*</span></label>
                        <ValidationProvider :name="$route.params.type == 'products' ? 'product_composition' : ($route.params.type == 'courses' ? 'course_duration' : 'service_type' )" rules="required">
                            <div slot-scope="{ errors }" class="position-relative">
                                <input
                                type="text"
                                :name="$route.params.type == 'products' ? 'product_composition' : ($route.params.type == 'courses' ? 'course_duration' : 'service_type' )"
                                :placeholder="$route.params.type == 'products' ? 'Write the product composition of the product' : ($route.params.type == 'courses' ? 'Write the course duration of the course' : 'Write the service type' )"
                                class="whitebgs"
                                maxlength="100"
                                v-model="form.product_composition"
                                />
                                <span class="requireds">{{ errors[0] }}</span>
                            </div>
                        </ValidationProvider>

                        <label class="labelstyle pt-2">{{ $route.params.type == 'products' ? 'Stock Keeping Unit (SKU)' : ($route.params.type == 'courses' ? 'Seats' : 'Timing' ) }} <span>*</span></label>
                        <ValidationProvider :name="$route.params.type == 'products' ? 'sku' : ($route.params.type == 'courses' ? 'seats' : 'timing' )" rules="required">
                            <div slot-scope="{ errors }" class="position-relative">
                                <input
                                type="text"
                                :name="$route.params.type == 'products' ? 'sku' : ($route.params.type == 'courses' ? 'seats' : 'timing' )"
                                :placeholder="$route.params.type == 'products' ? 'Enter the Stock Keeping Unit (SKU) of the product' : ($route.params.type == 'courses' ? 'Enter Seats' : 'Enter Timing' )"
                                class="whitebgs"
                                v-model="form.sku"
                                />
                                <span class="requireds">{{ errors[0] }}</span>
                            </div>
                        </ValidationProvider>

                        <label class="labelstyle pt-2">{{ $route.params.type == 'products' ? 'Price Range' : ($route.params.type == 'courses' ? 'Course fees' : 'Service cost' ) }} (in <img width="8" src="/assets/img/rupee.svg" />)</label>
						<input type="text" :name="$route.params.type == 'products' ? 'price_min' : ($route.params.type == 'courses' ? 'course_fee' : 'service_cost_min' )" class="whitebgs" :class="$route.params.type == 'courses' ? '' :  'float-left w200' " v-model="form.price_min" :placeholder="$route.params.type == 'products' ? 'Enter minimum price' : ($route.params.type == 'courses' ? 'Enter course fee' : 'Enter service cost minimum' )">
						<input v-if="$route.params.type == 'products' || $route.params.type == 'services'" type="text" :name="$route.params.type == 'products' ? 'price_max' :  'service_cost_max' " class="whitebgs w200 ml-sm-3" v-model="form.price_max" :placeholder="$route.params.type == 'products' ? 'Enter maximum price' : 'Enter service cost maximum' ">
						
                        <label class="labelstyle pt-3">Description<span>*</span></label>
                        <ValidationProvider name="description" rules="required">
                            <div slot-scope="{ errors }" class="position-relative">
                                <textarea
                                type="text"
                                name="description"
                                placeholder="Description"
                                class="mb-3 whitebgs min-height200"
                                v-model="form.description">
                                </textarea>
                                <span class="requireds">{{ errors[0] }}</span>
                            </div>
                        </ValidationProvider>
						
                        <label class="labelstyle pt-1">Thumbnail Image</label>
						<p class="greytext pxxssmall mb-0">. This is the first image of your product that the users will see.</p>
						<p class="greytext pxxssmall">. We recommend a image ratio of 1:1 for the product images. Otherwise the images will cropped automatically to fit the recommended ratio.</p>
						<div class="create-pages">
							<label class="newbtn ml-0 mr-0">
								<div>
									<img id="blah" src="/assets/img/uploadimage.png">
                                    <input
                                    type="file"
                                    id="pic" 
                                    class="pis"
                                    @input="readFile"
                                    />
									<p class="">Add Image</p>
								</div>
							</label>
							<div class="productedite" v-if="image_thumbnailUrl != ''">
								<img id="blah" :src="image_thumbnailUrl">
								<a class="positionabsolute" title="Remove" href="javacript:;" @click.prevent="deleteSingleImage">
									<img width="18" src="/assets/img/delete.svg">
								</a>
							</div>
						</div>
						<label class="labelstyle pt-1">Other Images</label>
						<p class="greytext pxxssmall mb-0">. These are secondary images of your product and should be added to give a better idea of your product.</p>
						<p class="greytext pxxssmall">. We recommend a image ratio of 1:1 for the product images. Otherwise the images will cropped automatically to fit the recommended ratio.</p>
						<div class="create-pages">
							<div class="d-flex flex-wrap">
								<div class="productedite" v-for="(image, key) in imageUrl" :key="image">
									<img id="blah" :src="image">
									<a class="positionabsolute" title="Remove" @click.prevent="deleteMultipleImage(key)" href="javacript:;">
										<img width="18" src="/assets/img/delete.svg">
									</a>
								</div>
							</div>
							<label class="newbtn ml-0 mr-0">
								<div>
									<img id="blah" src="/assets/img/uploadimage.png">
                                    <input
                                    type="file"
                                    id="pic" 
                                    class="pis"
                                    multiple
                                    @input="readMultipleFile"
                                    />
									<p class="">Add Image</p>
								</div>
							</label>
						</div>

                        <div class="card">
                            <div>
                                <div class="btnloader" v-if="loader.loading && loader.loader_ref_no == $route.params.page_ref_no">
                                    <img src="/assets/img/loader-btn.gif" alt="" />
                                </div>
                                <button v-else class="btnfill my-3 mx-3 float-right">Save {{ $route.params.type == 'products' ? 'product' : ($route.params.type == 'courses' ? 'course' : 'service' ) }}</button>
                            </div>
                        </div>

					</form>
                    </ValidationObserver>
				</div>
			</div>
		</div>
	</section>
	<!-- Dashboard sec end -->
</template>

<script>
import { categoryUrl,productUrl, courseUrl, serviceUrl } from "../../path";
import mixinRequest from "../../mixins/request";
import mixinLoader from "../../mixins/loader";
import vSelect from "vue-select";

export default {
    mixins: [mixinRequest,mixinLoader],
    components: {
        vSelect,
    },
    data(){
        return {
            categories: [],
            category_name: '',
            images: [],
            imageUrl: [],
            image_thumbnail: '',
            image_thumbnailUrl: '',
            form: {
                product_name: '',
                product_composition: '',
                sku: '',
                price_min: '',
                price_max: '',
                description: '',
                category_ref_no: '',
            }
        };
    },
    created(){
        if (this.$route.params.page_ref_no) {
            this.fetchCategory();
        }

        if (this.$route.params.page_ref_no && this.$route.params.product_ref_no) {
            this.fetchProduct();
        }
    },
    methods:{
        async fetchCategory() {
            const data = await this.getRequest(categoryUrl.categorydetails+'?page_ref_no='+this.$route.params.page_ref_no+'&type='+this.$route.params.type)
            this.categories = data.category_data;
        },
        async fetchProduct() {
            let data = {};
            if(this.$route.params.type == 'products'){
                data = await this.getRequest(productUrl.productdetails+'/'+this.$route.params.product_ref_no);
                data = data.product_data;
            } else if(this.$route.params.type == 'services'){
                data = await this.getRequest(serviceUrl.productdetails+'/'+this.$route.params.product_ref_no);
                data = data.service_data;
            } else if(this.$route.params.type == 'courses') {
                data = await this.getRequest(courseUrl.productdetails+'/'+this.$route.params.product_ref_no);
                data = data.course_data;
            }
 
            if(data){
                this.form.product_name = this.$route.params.type == 'products' ? data.product_name : (this.$route.params.type == 'courses' ? data.course_name : data.service_name );
                this.form.product_composition = this.$route.params.type == 'products' ? data.product_composition : (this.$route.params.type == 'courses' ? data.course_duration : data.service_type );
                this.form.sku = this.$route.params.type == 'products' ? data.sku : (this.$route.params.type == 'courses' ? data.seats : data.timing );
                this.form.price_min = this.$route.params.type == 'products' ? data.price_min : (this.$route.params.type == 'courses' ? data.course_fee : data.service_cost_min );
                this.form.price_max = this.$route.params.type == 'products' ? data.price_max : (this.$route.params.type == 'services' ? data.service_cost_max : '' );
                this.form.description = data.description;
                this.form.category_ref_no = data.category_ref_no;
                this.image_thumbnailUrl = data.image_thumbnail;
                for (let index = 0; index < data.images.length; index++) {
                    this.imageUrl.push(data.images[index]); 
                }
                this.categories.map(category => {
                    if(category.category_ref_no === data.category_ref_no){
                        return this.category_name = category.category_name;
                    }
                });
            }
        },
        setSelected(value) {
            if(value){
                $(".vs__selected").html(value.category_name);
                this.form.category_ref_no = value.category_ref_no;    
            }
            
        },
        readFile(e) {
            this.image_thumbnail = e.target.files[0];
            this.image_thumbnailUrl = URL.createObjectURL(this.image_thumbnail);
        },
        readMultipleFile(e){
            let files = e.target.files || e.dataTransfer.files;
            for (let index = 0; index < files.length; index++) {
                this.images.push(files[index]);
                this.imageUrl.push(URL.createObjectURL(files[index]));
            }
        },
        async deleteMultipleImage(index){
            if (this.$route.params.page_ref_no && this.$route.params.product_ref_no) {
                for (let i = 0; i < this.imageUrl.length; i++) {
                    if(this.imageUrl[i] == this.imageUrl[index]){
                        const pieces = this.imageUrl[index].split("/");
                        const last = pieces[pieces.length - 1];
                        let formData = new FormData();
                        formData.append('page_ref_no',this.$route.params.page_ref_no);
                        formData.append('category_ref_no',this.form.category_ref_no);
                        this.$route.params.type == 'products' ? 
                        formData.append('product_ref_no',this.$route.params.product_ref_no) : 
                        ( 
                            this.$route.params.type == 'courses' ? 
                            formData.append('course_ref_no',this.$route.params.product_ref_no) : 
                            formData.append('service_ref_no',this.$route.params.product_ref_no) 
                        )
                        //formData.append('product_ref_no',this.$route.params.product_ref_no);
                        formData.append('images',last);
                        if(this.$route.params.type == 'products'){
                            await this.postRequest(productUrl.destroysingleimage,formData);
                        } else if(this.$route.params.type == 'services'){
                            await this.postRequest(serviceUrl.destroysingleimage,formData);
                        } else if(this.$route.params.type == 'courses') {
                            await this.postRequest(courseUrl.destroysingleimage,formData);
                        }
                        
                    }
                    
                }
            }

            this.images.splice(index,1);
            this.imageUrl.splice(index,1);
        },
        async deleteSingleImage(){
            if (this.$route.params.page_ref_no && this.$route.params.product_ref_no) {
                const pieces = this.image_thumbnailUrl.split("/");
                const last = pieces[pieces.length - 1];
                let formData = new FormData();
                formData.append('page_ref_no',this.$route.params.page_ref_no);
                formData.append('category_ref_no',this.form.category_ref_no);
                this.$route.params.type == 'products' ? 
                formData.append('product_ref_no',this.$route.params.product_ref_no) : 
                ( 
                    this.$route.params.type == 'courses' ? 
                    formData.append('course_ref_no',this.$route.params.product_ref_no) : 
                    formData.append('service_ref_no',this.$route.params.product_ref_no) 
                )
                //formData.append('product_ref_no',this.$route.params.product_ref_no);
                formData.append('image_thumbnail',last);
                if(this.$route.params.type == 'products'){
                    await this.postRequest(productUrl.destroysingleimage,formData);
                } else if(this.$route.params.type == 'services'){
                    await this.postRequest(serviceUrl.destroysingleimage,formData);
                } else if(this.$route.params.type == 'courses') {
                    await this.postRequest(courseUrl.destroysingleimage,formData);
                }
            }

            this.image_thumbnail = "";
            this.image_thumbnailUrl = "";
        },
        async addProduct(){
            this.showProcessLoader(this.$route.params.page_ref_no);

            let formData = new FormData(this.$refs.productForm);
            formData.append('page_ref_no',this.$route.params.page_ref_no);
            formData.append('category_ref_no',this.form.category_ref_no);
            if(this.image_thumbnail != ''){
                formData.append('image_thumbnail',this.image_thumbnail);
            }
            if(this.images.length > 0) {
                for (let index = 0; index < this.images.length; index++) {
                    formData.append('images[]',this.images[index]);              
                }
            }

            if (this.$route.params.page_ref_no && this.$route.params.product_ref_no) {
                formData.append('_method','PUT');
                if(this.$route.params.type == 'products'){
                    await this.postRequest(productUrl.productdetails+'/'+this.$route.params.product_ref_no,formData);
                } else if(this.$route.params.type == 'services'){
                    await this.postRequest(serviceUrl.productdetails+'/'+this.$route.params.product_ref_no,formData);
                } else if(this.$route.params.type == 'courses') {
                    await this.postRequest(courseUrl.productdetails+'/'+this.$route.params.product_ref_no,formData);
                }
                
            } else {
                if(this.$route.params.type == 'products'){
                    await this.postRequest(productUrl.productdetails,formData);
                } else if(this.$route.params.type == 'services'){
                    await this.postRequest(serviceUrl.productdetails,formData);
                } else if(this.$route.params.type == 'courses') {
                    await this.postRequest(courseUrl.productdetails,formData);
                }
                
            }
            
            let offer = this.$route.params.type == 'products' ? 'Product' : (this.$route.params.type == 'courses' ? 'Course' : 'Service');
            if (this.$route.params.page_ref_no && this.$route.params.product_ref_no) {
                this.$toast.success(offer+" Updated Successfully");
            } else {
                this.$toast.success(offer+" Added Successfully");
            }
            
            this.$router.push({
                path: '/page/'+this.$route.params.page_ref_no, 
                query: {
                    type: this.$route.params.type,
                },
            }).catch(() => {});
            this.hideProcessLoader(this.$route.params.page_ref_no);
        }
    },
}
</script>
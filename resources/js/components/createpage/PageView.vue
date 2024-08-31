<template>
  <section class="footerfixbg">
    <div class="container">
      <div class="row compnyvprofl pagehomepublic margin-top-16">
        <div class="col-lg-12 middlesec px-sm-0">
          <div class="card">
            <div class="compnyvprofl-img">
              <img
                :src="
                  page_data.fullcoverimage
                    ? page_data.fullcoverimage
                    : defaultImage
                "
                alt=""
              />
            </div>
            <div class="d-md-flex position-relative">
              <div class="profile">
                <img
                  alt=""
                  :src="
                    page_data.fullimage
                      ? page_data.fullimage
                      : $store.state.imageShow
                  "
                />
              </div>
              <div class="compnyvproflname">
                <h4>{{ page_data.name | capitalize }}</h4>
                <p class="pxxxssmall greytext mb-0">
                  <strong>{{ page_data.tagline | capitalize }}</strong>
                </p>
                <p class="pxxssmall greytext mb-0">
                  {{ industry_name | capitalize }} |
                  {{ page_data.like_count | numberconvert }} Followers
                </p>
              </div>
              <div class="postionrigt" id="CopyLink">
                <div class="d-flex justify-content-end pt-3">
                  <!-- <a href="#" class="">
										<img src="/assets/img/share.svg" />
									</a> -->
                  <div class="treedotdrop">
                    <div class="dropdown">
                      <button onclick="toggleBtn()" class="dropbtn">...</button>
                      <div id="myDropdown" class="dropdown-content">
                        <a
                          class="model_alerttbtn"
                          @click.prevent="
                            openShareModal(
                              page_data.page_ref_no,
                              page_data.aboutus,
                              'page'
                            )
                          "
                        >
                          <img
                            alt=""
                            width="18"
                            height="18"
                            src="/assets/img/share-black.svg"
                          />Share Page
                        </a>

                        <router-link
                          v-if="getUser.user_ref_no == page_data.user_ref_no"
                          :to="'/createpage/' + $route.params.page_ref_no"
                          class="model_alerttbtn"
                        >
                          <img src="/assets/img/edit.svg" alt="" /> Edit Page
                        </router-link>

                        <a
                          href="javascript:;"
                          v-if="getUser.user_ref_no == page_data.user_ref_no"
                          @click.prevent="deletePage"
                          class="model_alerttbtn"
                        >
                          <img src="/assets/img/delete.svg" alt="" /> Delete
                          Page
                        </a>

                        <p ref="mylink" style="display: none">
                          {{ page_data.page_ref_no }}
                        </p>
                        <a class="model_alerttbtn" @click.prevent="copyURL">
                          <img
                            alt=""
                            width="18"
                            height="18"
                            src="/assets/img/link.svg"
                          />Copy Page Link
                        </a>

                        <a
                          class="model_alerttbtn"
                          data-toggle="modal"
                          data-target="#help"
                        >
                          <img
                            alt=""
                            width="18"
                            height="18"
                            src="/assets/img/help.svg"
                          />Help
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="d-flex">
                  <a
                    href="javascript:;"
                    @click.prevent="contactusModal"
                    class="lightbtn mt-3 mr-2"
                    >Contact Us</a
                  >

                  <template
                    v-if="
                      loader.loading &&
                      loader.loader_ref_no == $route.params.page_ref_no
                    "
                  >
                    <img
                      src="/assets/img/loader-btn.gif"
                      width="80"
                      height="30"
                      class="mt-4"
                      alt=""
                    />
                  </template>
                  <template v-else>
                    <a
                      v-if="page_data.user_liked"
                      class="btnfill mt-3"
                      href="javascript:;"
                      @click.prevent="pageUnlike"
                    >
                      Following
                    </a>
                    <a
                      v-else
                      class="btnfill mt-3"
                      href="javascript:;"
                      @click.prevent="pageLike"
                    >
                      Follow
                    </a>
                  </template>
                </div>
              </div>
            </div>
            <div id="nav-tab" role="tablist" class="nav nav-tabs">
              <a
                id="nav-home-tab"
                data-toggle="tab"
                href="#home"
                role="tab"
                aria-controls="nav-home"
                aria-selected="true"
                class="nav-item nav-link"
                :class="
                  $route.query.type != 'products' &&
                  $route.query.type != 'services' &&
                  $route.query.type != 'courses'
                    ? 'active show'
                    : ''
                "
                >Home</a
              >
              <a
                id="nav-about-tab"
                data-toggle="tab"
                href="#about"
                role="tab"
                aria-controls="nav-about"
                aria-selected="false"
                class="nav-item nav-link"
                >About</a
              >
              <a
                v-if="page_offering.includes('products')"
                id="nav-products-tab"
                data-toggle="tab"
                href="#products"
                role="tab"
                aria-controls="nav-products"
                aria-selected="false"
                class="nav-item nav-link"
                :class="$route.query.type == 'products' ? 'active show' : ''"
                @click="getCategory('products')"
                >Products</a
              >
              <a
                v-if="page_offering.includes('services')"
                id="nav-services-tab"
                data-toggle="tab"
                href="#services"
                role="tab"
                aria-controls="nav-services"
                aria-selected="false"
                class="nav-item nav-link"
                :class="$route.query.type == 'services' ? 'active show' : ''"
                @click="getCategory('services')"
                >Services</a
              >
              <a
                v-if="page_offering.includes('courses')"
                id="nav-services-tab"
                data-toggle="tab"
                href="#courses"
                role="tab"
                aria-controls="nav-courses"
                aria-selected="false"
                class="nav-item nav-link"
                :class="$route.query.type == 'courses' ? 'active show' : ''"
                @click="getCategory('courses')"
                >Courses</a
              >
            </div>
          </div>
        </div>
      </div>
      <div id="nav-tabContent" class="tab-content">
        <div
          id="home"
          role="tabpanel"
          aria-labelledby="nav-home-tab"
          class="tab-pane fade"
          :class="
            $route.query.type != 'products' &&
            $route.query.type != 'services' &&
            $route.query.type != 'courses'
              ? 'active show'
              : ''
          "
        >
          <div class="row">
            <div class="col-lg-3 asidesec recently-visited">
              <div class="card p-3">
                <h6>About us</h6>
                <p v-if="!readMoreActivated">{{ aboutus }}</p>
                <a href=""><strong></strong></a>
                <details>
                  <summary>
                    <span
                      v-if="!readMoreActivated && length > 250"
                      @click="activateReadMore"
                      class="py-2"
                      id="open"
                    >
                      Read More</span
                    >
                  </summary>
                  <p v-if="readMoreActivated">{{ page_data.aboutus }}</p>
                </details>
              </div>
            </div>
            <div class="col-lg-6 middlesec">
              <createPost
                v-if="getUser.user_ref_no == page_data.user_ref_no"
              ></createPost>

              <post posttxt="page" :ref_no="$route.params.page_ref_no"></post>
            </div>
            <!--<div class="col-lg-3 asidesec recently-visited pr-sm-0">
							<div class="card sidebarlist recentlyvisited ">
								<h6 class="px-3 pt-3 pb-2">Similar Pages</h6>
								<ul class="profilelist">
									<li>
										<a href="doctors-list.html">
											<div class="profile-xl">
												<img src="assets/img/glover-research.png">
											</div>
											<div>
												<p class="mb-0"><strong>Glover Research</strong>
												</p>
												<p class="pxssmall greytext mb-0">Showcase Page</p>
											</div>
										</a>
									</li>
									<li>
										<a href="doctors-list.html">
											<div class="profile-xl">
												<img src="assets/img/glover-research.png">
											</div>
											<div>
												<p class="mb-0"><strong>Glover Therapeutics</strong>
												</p>
												<p class="pxssmall greytext mb-0">Showcase Page</p>
											</div>
										</a>
									</li>
									<li>
										<a href="doctors-list.html">
											<div class="profile-xl">
												<img src="assets/img/glover-research.png">
											</div>
											<div>
												<p class="mb-0"><strong>Glover Labs</strong>
												</p>
												<p class="pxssmall greytext mb-0">Showcase Page</p>
											</div>
										</a>
									</li>
								</ul>
							</div>
						</div>-->
          </div>
        </div>
        <div
          id="about"
          role="tabpanel"
          aria-labelledby="nav-about-tab"
          class="tab-pane fade"
        >
          <div class="row">
            <div class="col-lg-12 middlesec px-sm-0">
              <div class="card p-3">
                <h4>Overview</h4>
                <div class="row mb-3">
                  <div class="col-sm-6">
                    <label class="labelstyle pt-2">Organization Size</label>
                    <p>
                      {{
                        page_data.company_size
                          ? page_data.company_size
                          : "Not Available"
                      }}
                    </p>
                  </div>
                  <div class="col-sm-6">
                    <label class="labelstyle pt-2">Organization Type</label>
                    <p>
                      {{
                        page_data.company_type
                          ? page_data.company_type
                          : "Not Available" | capitalize
                      }}
                    </p>
                  </div>
                </div>
                <template v-if="page_data.website">
                  <label class="labelstyle pt-2">Website</label>
                  <p class="mb-0">
                    <a href="#" @click.prevent="openLink(page_data.website)">
                      {{
                        page_data.website ? page_data.website : "Not Available"
                      }}
                      <img
                        width="16"
                        src="/assets/img/external-link-icon.svg"
                        alt=""
                      />
                    </a>
                  </p>
                </template>
                <template v-if="page_data.location">
                  <label class="labelstyle pt-2 mb-0">Address</label>
                  <p class="mb-0">
                    {{ page_data.location }}
                  </p>
                </template>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12 middlesec px-sm-0">
              <div class="card p-3">
                <h4>About us</h4>
                {{ page_data.aboutus }}
              </div>
            </div>
          </div>
        </div>

        <div
          id="products"
          v-if="offering == 'products'"
          role="tabpanel"
          aria-labelledby="nav-products-tab"
          class="tab-pane fade"
          :class="$route.query.type == 'products' ? 'active show' : ''"
        >
          <template v-if="category_length > 0">
            <div class="row">
              <div v-if="see_all" class="col-lg-12 middlesec px-sm-0">
                <ul class="breadcrumb">
                  <li>
                    <a href="javascript:;" @click.prevent="allCategoryList">{{
                      offering | capitalize
                    }}</a>
                  </li>
                  <li v-if="search_text == ''">
                    {{ category_name ? category_name : "" }}
                  </li>
                </ul>
                <div
                  class="d-sm-flex justify-content-sm-between mt-sm-2 mb-sm-2"
                >
                  <div>
                    <div class="searchboxs mb-3">
                      <input
                        type="search"
                        placeholder="Search products"
                        v-model="search_text"
                        @keyup.enter="searchProduct()"
                      />
                      <button
                        class="search-btn"
                        @click.prevent="searchProduct()"
                      >
                        <img alt="" src="/assets/img/searchicon.svg" />
                      </button>
                    </div>
                  </div>

                  <div
                    class="d-flex flex-wrap justify-content-center"
                    v-if="getUser.user_ref_no == page_data.user_ref_no"
                  >
                    <router-link
                      class="lightbtn mb-3 mt-0 plusebtn mr-sm-3"
                      :to="'/' + offering + '/' + page_data.page_ref_no"
                      ><span>+</span> Add a product</router-link
                    >
                  </div>
                </div>
                <div class="card p-3">
                  <div class="d-sm-flex">
                    <h4 v-if="search_text == ''">
                      {{
                        categories.category_name ? categories.category_name : ""
                      }}
                    </h4>

                    <div
                      v-if="
                        getUser.user_ref_no == page_data.user_ref_no &&
                        search_text == ''
                      "
                      class="treedotdrop"
                    >
                      <div class="dropdown">
                        <button
                          @click="
                            toggleCategory(
                              categories.category_ref_no
                                ? categories.category_ref_no
                                : ''
                            )
                          "
                          class="dropbtn"
                        >
                          ...
                        </button>
                        <div
                          :id="
                            categories.category_ref_no
                              ? categories.category_ref_no
                              : ''
                          "
                          class="dropdown-content myDropdown"
                        >
                          <a
                            class="model_alerttbtn"
                            @click.prevent="editCategoryModal(categories)"
                          >
                            <img
                              alt=""
                              width="18"
                              height="18"
                              src="/assets/img/edit-pen.svg"
                            />Edit</a
                          >

                          <div
                            class="btnloader"
                            v-if="
                              loader.loading &&
                              loader.loader_ref_no == $route.params.page_ref_no
                            "
                          >
                            <img src="/assets/img/loader-btn.gif" alt="" />
                          </div>
                          <a
                            v-else
                            class="model_alerttbtn"
                            @click.prevent="deleteCategoryModal(categories)"
                          >
                            <img
                              alt=""
                              width="18"
                              height="18"
                              src="/assets/img/delete.svg"
                            />Delete</a
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                  <p class="mt-3" v-if="search_text == ''">
                    {{ categories.category_description }}
                  </p>

                  <div
                    class="events pagediscover products"
                    v-if="product_length > 0"
                  >
                    <ul class="eventslistul">
                      <li
                        v-for="product in products"
                        :key="product.product_ref_no"
                      >
                        <router-link
                          :to="
                            '/product-detail/' +
                            page_data.page_ref_no +
                            '/' +
                            product.product_ref_no +
                            '?type=' +
                            offering
                          "
                        >
                          <div class="d-lg-flex">
                            <div class="product">
                              <img :src="product.image_thumbnail" />
                            </div>
                            <div class="ml-lg-3">
                              <p class="pxxssmall mb-2">
                                <strong>{{ product.product_name }}</strong>
                              </p>
                              <p class="pxssmall mb-0">
                                {{ product.description.slice(0, 100) }}
                              </p>
                            </div>
                          </div>
                        </router-link>
                      </li>
                    </ul>
                  </div>

                  <div class="text-center my-3" v-if="product_length <= 0">
                    <img src="/assets/img/add-product.png" />
                    <p class="greytext mt-3 mb-2">
                      <strong>{{
                        search_text == "" &&
                        getUser.user_ref_no == page_data.user_ref_no
                          ? "Add a Product"
                          : "No Product Found"
                      }}</strong>
                    </p>
                    <p
                      class="greytext pxxssmall"
                      v-if="
                        getUser.user_ref_no == page_data.user_ref_no &&
                        search_text == ''
                      "
                    >
                      Here you can list products which belong to "{{
                        categories.category_name
                          ? categories.category_name
                          : ""
                      }}"
                    </p>
                    <router-link
                      v-if="
                        getUser.user_ref_no == page_data.user_ref_no &&
                        search_text == ''
                      "
                      class="btnfill mb-3 mt-0"
                      :to="'/' + offering + '/' + page_data.page_ref_no"
                      >Add a product</router-link
                    >
                  </div>
                </div>
              </div>

              <div v-else class="col-lg-12 middlesec px-sm-0">
                <div
                  class="d-sm-flex justify-content-sm-between mt-sm-2 mb-sm-2"
                >
                  <div>
                    <div class="searchboxs mb-3">
                      <input
                        type="search"
                        placeholder="Search products"
                        v-model="search_text"
                        @keyup.enter="searchProduct()"
                      />
                      <button
                        class="search-btn"
                        @click.prevent="searchProduct()"
                      >
                        <img alt="" src="/assets/img/searchicon.svg" />
                      </button>
                    </div>
                  </div>

                  <div
                    class="d-flex flex-wrap justify-content-center"
                    v-if="getUser.user_ref_no == page_data.user_ref_no"
                  >
                    <router-link
                      class="lightbtn mb-3 mt-0 plusebtn mr-sm-3"
                      :to="'/' + offering + '/' + page_data.page_ref_no"
                      ><span>+</span> Add a product</router-link
                    >
                    <a
                      class="lightbtn mb-3 mt-0 plusebtn"
                      @click.prevent="addCategoryModal"
                      ><span>+</span> Add a category</a
                    >
                  </div>
                </div>

                <div
                  class="card events pagediscover categories px-sm-3 mx-2 py-1"
                >
                  <ul class="eventslistul">
                    <li
                      v-for="category in categories"
                      :key="
                        category.category_ref_no ? category.category_ref_no : ''
                      "
                    >
                      <a href="javascript:;" @click.prevent="seeAll(category)">
                        <h4 class="mb-1">
                          {{
                            category.category_name ? category.category_name : ""
                          }}
                        </h4>
                        <p class="pxxssmall">
                          {{ category.product_count }} Products
                        </p>
                        <p class="pxxxssmall">
                          {{ category.category_description }}
                        </p>
                      </a>

                      <div
                        v-if="getUser.user_ref_no == page_data.user_ref_no"
                        class="treedotdrop"
                      >
                        <div class="dropdown">
                          <button
                            @click="
                              toggleCategory(
                                category.category_ref_no
                                  ? category.category_ref_no
                                  : ''
                              )
                            "
                            class="dropbtn"
                          >
                            ...
                          </button>
                          <div
                            :id="
                              category.category_ref_no
                                ? category.category_ref_no
                                : ''
                            "
                            class="dropdown-content"
                          >
                            <a
                              class="model_alerttbtn"
                              @click.prevent="editCategoryModal(category)"
                              ><img
                                alt=""
                                width="18"
                                height="18"
                                src="/assets/img/edit.svg"
                              />Edit</a
                            >
                            <div
                              class="btnloader"
                              v-if="
                                loader.loading &&
                                loader.loader_ref_no ==
                                  $route.params.page_ref_no
                              "
                            >
                              <img src="/assets/img/loader-btn.gif" alt="" />
                            </div>
                            <a
                              v-else
                              class="model_alerttbtn"
                              @click.prevent="deleteCategoryModal(category)"
                            >
                              <img
                                alt=""
                                width="18"
                                height="18"
                                src="/assets/img/delete.svg"
                              />Delete
                            </a>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="d-flex justify-content-center">
              <div class="col-lg-4 col-12 pt-sm-4 my-4 px-0">
                <img
                  class="py-3"
                  src="/assets/img/adding-a-product-category.png"
                />
                <p class="greytext mb-0">
                  <strong>Start by adding a Product Category</strong>
                </p>
                <p class="greytext pxxssmall mb-2">
                  You can list all your products under categories like
                </p>
                <p class="greytext pxxssmall ml-2 mb-0">
                  . Specialities (Cardiology, Diabetology, etc.)
                </p>
                <p class="greytext pxxssmall ml-2 mb-0">
                  . Disorders (Diabetes, Arthritis, Cancer, etc.)
                </p>
                <p class="greytext pxxssmall ml-2 mb-0">
                  . Or something of your choice!
                </p>
              </div>
            </div>
            <a
              v-if="getUser.user_ref_no == page_data.user_ref_no"
              class="btnfill mt-2 mx-auto mb-5 plusebtn"
              @click.prevent="addCategoryModal"
              ><span>+</span> Add a category</a
            >
          </template>
        </div>

        <div
          id="services"
          v-if="offering == 'services'"
          role="tabpanel"
          aria-labelledby="nav-services-tab"
          class="tab-pane fade"
          :class="$route.query.type == 'services' ? 'active show' : ''"
        >
          <template v-if="category_length > 0">
            <div class="row">
              <div v-if="see_all" class="col-lg-12 middlesec px-sm-0">
                <ul class="breadcrumb">
                  <li>
                    <a href="javascript:;" @click.prevent="allCategoryList">{{
                      offering | capitalize
                    }}</a>
                  </li>
                  <li v-if="search_text == ''">
                    {{ category_name ? category_name : "" }}
                  </li>
                </ul>
                <div
                  class="d-sm-flex justify-content-sm-between mt-sm-2 mb-sm-2"
                >
                  <div>
                    <div class="searchboxs mb-3">
                      <input
                        type="search"
                        placeholder="Search services"
                        v-model="search_text"
                        @keyup.enter="searchProduct()"
                      />
                      <button
                        class="search-btn"
                        @click.prevent="searchProduct()"
                      >
                        <img alt="" src="/assets/img/searchicon.svg" />
                      </button>
                    </div>
                  </div>

                  <div
                    class="d-flex flex-wrap justify-content-center"
                    v-if="getUser.user_ref_no == page_data.user_ref_no"
                  >
                    <router-link
                      class="lightbtn mb-3 mt-0 plusebtn mr-sm-3"
                      :to="'/' + offering + '/' + page_data.page_ref_no"
                      ><span>+</span> Add a service</router-link
                    >
                  </div>
                </div>
                <div class="card p-3">
                  <div class="d-sm-flex">
                    <h4 v-if="search_text == ''">
                      {{
                        categories.category_name ? categories.category_name : ""
                      }}
                    </h4>

                    <div
                      v-if="getUser.user_ref_no == page_data.user_ref_no"
                      class="treedotdrop"
                    >
                      <div class="dropdown">
                        <button
                          @click="
                            toggleCategory(
                              categories.category_ref_no
                                ? categories.category_ref_no
                                : ''
                            )
                          "
                          class="dropbtn"
                        >
                          ...
                        </button>
                        <div
                          :id="
                            categories.category_ref_no
                              ? categories.category_ref_no
                              : ''
                          "
                          class="dropdown-content myDropdown"
                        >
                          <a
                            class="model_alerttbtn"
                            @click.prevent="editCategoryModal(categories)"
                          >
                            <img
                              alt=""
                              width="18"
                              height="18"
                              src="/assets/img/edit-pen.svg"
                            />Edit</a
                          >

                          <div
                            class="btnloader"
                            v-if="
                              loader.loading &&
                              loader.loader_ref_no == $route.params.page_ref_no
                            "
                          >
                            <img src="/assets/img/loader-btn.gif" alt="" />
                          </div>
                          <a
                            v-else
                            class="model_alerttbtn"
                            @click.prevent="deleteCategoryModal(categories)"
                          >
                            <img
                              alt=""
                              width="18"
                              height="18"
                              src="/assets/img/delete.svg"
                            />Delete</a
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                  <p class="mt-3" v-if="search_text == ''">
                    {{ categories.category_description }}
                  </p>

                  <div
                    class="events pagediscover products"
                    v-if="product_length > 0"
                  >
                    <ul class="eventslistul">
                      <li
                        v-for="product in products"
                        :key="product.service_ref_no"
                      >
                        <router-link
                          :to="
                            '/product-detail/' +
                            page_data.page_ref_no +
                            '/' +
                            product.service_ref_no +
                            '?type=' +
                            offering
                          "
                        >
                          <div class="d-lg-flex">
                            <div class="product">
                              <img :src="product.image_thumbnail" />
                            </div>
                            <div class="ml-lg-3">
                              <p class="pxxssmall mb-2">
                                <strong>{{ product.service_name }}</strong>
                              </p>
                              <p class="pxssmall mb-0">
                                {{ product.description.slice(0, 100) }}
                              </p>
                            </div>
                          </div>
                        </router-link>
                      </li>
                    </ul>
                  </div>

                  <div class="text-center my-3" v-if="product_length <= 0">
                    <img src="/assets/img/add-product.png" />
                    <p class="greytext mt-3 mb-2">
                      <strong>{{
                        search_text == "" &&
                        getUser.user_ref_no == page_data.user_ref_no
                          ? "Add a Service"
                          : "No Service Found"
                      }}</strong>
                    </p>
                    <p
                      class="greytext pxxssmall"
                      v-if="
                        getUser.user_ref_no == page_data.user_ref_no &&
                        search_text == ''
                      "
                    >
                      Here you can list services which belong to "{{
                        categories.category_name
                          ? categories.category_name
                          : ""
                      }}"
                    </p>
                    <router-link
                      v-if="
                        getUser.user_ref_no == page_data.user_ref_no &&
                        search_text == ''
                      "
                      class="btnfill mb-3 mt-0"
                      :to="'/' + offering + '/' + page_data.page_ref_no"
                      >Add a service</router-link
                    >
                  </div>
                </div>
              </div>

              <div v-else class="col-lg-12 middlesec px-sm-0">
                <div
                  class="d-sm-flex justify-content-sm-between mt-sm-2 mb-sm-2"
                >
                  <div>
                    <div class="searchboxs mb-3">
                      <input
                        type="search"
                        placeholder="Search services"
                        v-model="search_text"
                        @keyup.enter="searchProduct()"
                      />
                      <button
                        class="search-btn"
                        @click.prevent="searchProduct()"
                      >
                        <img alt="" src="/assets/img/searchicon.svg" />
                      </button>
                    </div>
                  </div>

                  <div
                    class="d-flex flex-wrap justify-content-center"
                    v-if="getUser.user_ref_no == page_data.user_ref_no"
                  >
                    <router-link
                      class="lightbtn mb-3 mt-0 plusebtn mr-sm-3"
                      :to="'/' + offering + '/' + page_data.page_ref_no"
                      ><span>+</span> Add a service</router-link
                    >
                    <a
                      class="lightbtn mb-3 mt-0 plusebtn"
                      @click.prevent="addCategoryModal"
                      ><span>+</span> Add a category</a
                    >
                  </div>
                </div>

                <div
                  class="card events pagediscover categories px-sm-3 mx-2 py-1"
                >
                  <ul class="eventslistul">
                    <li
                      v-for="category in categories"
                      :key="
                        category.category_ref_no ? category.category_ref_no : ''
                      "
                    >
                      <a href="javascript:;" @click.prevent="seeAll(category)">
                        <h4 class="mb-1">
                          {{
                            category.category_name ? category.category_name : ""
                          }}
                        </h4>
                        <p class="pxxssmall">
                          {{ category.service_count }} Services
                        </p>
                        <p class="pxxxssmall">
                          {{ category.category_description }}
                        </p>
                      </a>

                      <div
                        v-if="getUser.user_ref_no == page_data.user_ref_no"
                        class="treedotdrop"
                      >
                        <div class="dropdown">
                          <button
                            @click="
                              toggleCategory(
                                category.category_ref_no
                                  ? category.category_ref_no
                                  : ''
                              )
                            "
                            class="dropbtn"
                          >
                            ...
                          </button>
                          <div
                            :id="
                              category.category_ref_no
                                ? category.category_ref_no
                                : ''
                            "
                            class="dropdown-content"
                          >
                            <a
                              class="model_alerttbtn"
                              @click.prevent="editCategoryModal(category)"
                              ><img
                                alt=""
                                width="18"
                                height="18"
                                src="/assets/img/edit.svg"
                              />Edit</a
                            >
                            <div
                              class="btnloader"
                              v-if="
                                loader.loading &&
                                loader.loader_ref_no ==
                                  $route.params.page_ref_no
                              "
                            >
                              <img src="/assets/img/loader-btn.gif" alt="" />
                            </div>
                            <a
                              v-else
                              class="model_alerttbtn"
                              @click.prevent="deleteCategoryModal(category)"
                            >
                              <img
                                alt=""
                                width="18"
                                height="18"
                                src="/assets/img/delete.svg"
                              />Delete
                            </a>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="d-flex justify-content-center">
              <div class="col-lg-4 col-12 pt-sm-4 my-4 px-0 text-center">
                <img class="py-3" src="/assets/img/services-category.png" />
                <p class="greytext mb-0">
                  <strong>Start by adding a Service Category</strong>
                </p>
                <p class="greytext pxxssmall mb-0">
                  You can list all your services under specilities like
                </p>
                <p class="greytext pxxssmall ml-2 mb-0">
                  Oncology, Cardiology, Orthopedics, etc.
                </p>
              </div>
            </div>
            <a
              v-if="getUser.user_ref_no == page_data.user_ref_no"
              class="btnfill mt-2 mx-auto mb-5 plusebtn"
              @click.prevent="addCategoryModal"
              ><span>+</span> Add a category</a
            >
          </template>
        </div>

        <div
          id="courses"
          v-if="offering == 'courses'"
          role="tabpanel"
          aria-labelledby="nav-courses-tab"
          class="tab-pane fade"
          :class="$route.query.type == 'courses' ? 'active show' : ''"
        >
          <template v-if="category_length > 0">
            <div class="row">
              <div v-if="see_all" class="col-lg-12 middlesec px-sm-0">
                <ul class="breadcrumb">
                  <li>
                    <a href="javascript:;" @click.prevent="allCategoryList">{{
                      offering | capitalize
                    }}</a>
                  </li>
                  <li v-if="search_text == ''">
                    {{ category_name ? category_name : "" }}
                  </li>
                </ul>
                <div
                  class="d-sm-flex justify-content-sm-between mt-sm-2 mb-sm-2"
                >
                  <div>
                    <div class="searchboxs mb-3">
                      <input
                        type="search"
                        placeholder="Search courses"
                        v-model="search_text"
                        @keyup.enter="searchProduct()"
                      />
                      <button
                        class="search-btn"
                        @click.prevent="searchProduct()"
                      >
                        <img alt="" src="/assets/img/searchicon.svg" />
                      </button>
                    </div>
                  </div>

                  <div
                    class="d-flex flex-wrap justify-content-center"
                    v-if="getUser.user_ref_no == page_data.user_ref_no"
                  >
                    <router-link
                      class="lightbtn mb-3 mt-0 plusebtn mr-sm-3"
                      :to="'/' + offering + '/' + page_data.page_ref_no"
                      ><span>+</span> Add a course</router-link
                    >
                  </div>
                </div>
                <div class="card p-3">
                  <div class="d-sm-flex">
                    <h4 v-if="search_text == ''">
                      {{
                        categories.category_name ? categories.category_name : ""
                      }}
                    </h4>

                    <div
                      v-if="getUser.user_ref_no == page_data.user_ref_no"
                      class="treedotdrop"
                    >
                      <div class="dropdown">
                        <button
                          @click="
                            toggleCategory(
                              categories.category_ref_no
                                ? categories.category_ref_no
                                : ''
                            )
                          "
                          class="dropbtn"
                        >
                          ...
                        </button>
                        <div
                          :id="
                            categories.category_ref_no
                              ? categories.category_ref_no
                              : ''
                          "
                          class="dropdown-content myDropdown"
                        >
                          <a
                            class="model_alerttbtn"
                            @click.prevent="editCategoryModal(categories)"
                          >
                            <img
                              alt=""
                              width="18"
                              height="18"
                              src="/assets/img/edit-pen.svg"
                            />Edit</a
                          >

                          <div
                            class="btnloader"
                            v-if="
                              loader.loading &&
                              loader.loader_ref_no == $route.params.page_ref_no
                            "
                          >
                            <img src="/assets/img/loader-btn.gif" alt="" />
                          </div>
                          <a
                            v-else
                            class="model_alerttbtn"
                            @click.prevent="deleteCategoryModal(categories)"
                          >
                            <img
                              alt=""
                              width="18"
                              height="18"
                              src="/assets/img/delete.svg"
                            />Delete</a
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                  <p class="mt-3" v-if="search_text == ''">
                    {{ categories.category_description }}
                  </p>

                  <div
                    class="events pagediscover products"
                    v-if="product_length > 0"
                  >
                    <ul class="eventslistul">
                      <li
                        v-for="product in products"
                        :key="product.course_ref_no"
                      >
                        <router-link
                          :to="
                            '/product-detail/' +
                            page_data.page_ref_no +
                            '/' +
                            product.course_ref_no +
                            '?type=' +
                            offering
                          "
                        >
                          <div class="d-lg-flex">
                            <div class="product">
                              <img :src="product.image_thumbnail" />
                            </div>
                            <div class="ml-lg-3">
                              <p class="pxxssmall mb-2">
                                <strong>{{ product.course_name }}</strong>
                              </p>
                              <p class="pxssmall mb-0">
                                {{ product.description.slice(0, 100) }}
                              </p>
                            </div>
                          </div>
                        </router-link>
                      </li>
                    </ul>
                  </div>

                  <div class="text-center my-3" v-if="product_length <= 0">
                    <img src="/assets/img/add-product.png" />
                    <p class="greytext mt-3 mb-2">
                      <strong>{{
                        search_text == "" &&
                        getUser.user_ref_no == page_data.user_ref_no
                          ? "Add a Course"
                          : "No Course Found"
                      }}</strong>
                    </p>
                    <p
                      class="greytext pxxssmall"
                      v-if="
                        getUser.user_ref_no == page_data.user_ref_no &&
                        search_text == ''
                      "
                    >
                      Here you can list courses which belong to "{{
                        categories.category_name
                          ? categories.category_name
                          : ""
                      }}"
                    </p>
                    <router-link
                      v-if="
                        getUser.user_ref_no == page_data.user_ref_no &&
                        search_text == ''
                      "
                      class="btnfill mb-3 mt-0"
                      :to="'/' + offering + '/' + page_data.page_ref_no"
                      >Add a course</router-link
                    >
                  </div>
                </div>
              </div>

              <div v-else class="col-lg-12 middlesec px-sm-0">
                <div
                  class="d-sm-flex justify-content-sm-between mt-sm-2 mb-sm-2"
                >
                  <div>
                    <div class="searchboxs mb-3">
                      <input
                        type="search"
                        placeholder="Search courses"
                        v-model="search_text"
                        @keyup.enter="searchProduct()"
                      />
                      <button
                        class="search-btn"
                        @click.prevent="searchProduct()"
                      >
                        <img alt="" src="/assets/img/searchicon.svg" />
                      </button>
                    </div>
                  </div>

                  <div
                    class="d-flex flex-wrap justify-content-center"
                    v-if="getUser.user_ref_no == page_data.user_ref_no"
                  >
                    <router-link
                      class="lightbtn mb-3 mt-0 plusebtn mr-sm-3"
                      :to="'/' + offering + '/' + page_data.page_ref_no"
                      ><span>+</span> Add a course</router-link
                    >
                    <a
                      class="lightbtn mb-3 mt-0 plusebtn"
                      @click.prevent="addCategoryModal"
                      ><span>+</span> Add a category</a
                    >
                  </div>
                </div>

                <div
                  class="card events pagediscover categories px-sm-3 mx-2 py-1"
                >
                  <ul class="eventslistul">
                    <li
                      v-for="category in categories"
                      :key="
                        category.category_ref_no ? category.category_ref_no : ''
                      "
                    >
                      <a href="javascript:;" @click.prevent="seeAll(category)">
                        <h4 class="mb-1">
                          {{
                            category.category_name ? category.category_name : ""
                          }}
                        </h4>
                        <p class="pxxssmall">
                          {{ category.course_count }} Courses
                        </p>
                        <p class="pxxxssmall">
                          {{ category.category_description }}
                        </p>
                      </a>

                      <div
                        v-if="getUser.user_ref_no == page_data.user_ref_no"
                        class="treedotdrop"
                      >
                        <div class="dropdown">
                          <button
                            @click="
                              toggleCategory(
                                category.category_ref_no
                                  ? category.category_ref_no
                                  : ''
                              )
                            "
                            class="dropbtn"
                          >
                            ...
                          </button>
                          <div
                            :id="
                              category.category_ref_no
                                ? category.category_ref_no
                                : ''
                            "
                            class="dropdown-content"
                          >
                            <a
                              class="model_alerttbtn"
                              @click.prevent="editCategoryModal(category)"
                              ><img
                                alt=""
                                width="18"
                                height="18"
                                src="/assets/img/edit.svg"
                              />Edit</a
                            >
                            <div
                              class="btnloader"
                              v-if="
                                loader.loading &&
                                loader.loader_ref_no ==
                                  $route.params.page_ref_no
                              "
                            >
                              <img src="/assets/img/loader-btn.gif" alt="" />
                            </div>
                            <a
                              v-else
                              class="model_alerttbtn"
                              @click.prevent="deleteCategoryModal(category)"
                            >
                              <img
                                alt=""
                                width="18"
                                height="18"
                                src="/assets/img/delete.svg"
                              />Delete
                            </a>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="d-flex justify-content-center">
              <div class="col-lg-6 col-12 pt-sm-4 my-4 px-0 text-center">
                <img class="py-3" src="/assets/img/courses-category.png" />
                <p class="greytext mb-0">
                  <strong>Start by adding a Qualification Category</strong>
                </p>
                <p class="greytext pxxssmall mb-0">
                  You can list all your courses under qualification degrees like
                </p>
                <p class="greytext pxxssmall ml-2 mb-0">MD, MBBS, etc.</p>
              </div>
            </div>
            <a
              v-if="getUser.user_ref_no == page_data.user_ref_no"
              class="btnfill mt-2 mx-auto mb-5 plusebtn"
              @click.prevent="addCategoryModal"
              ><span>+</span> Add a category</a
            >
          </template>
        </div>
      </div>
    </div>

    <helpModal />
    <contactModal
      v-if="is_contact_modal"
      @closeModal="closeModal"
      @contactUs="contactUs"
    />
    <categoryModal
      v-if="is_category_modal"
      :editCategory="editCategory"
      :is_edit="is_edit"
      @closeModal="closeModal"
      @submitCategory="submitCategory"
    ></categoryModal>
    <categoryDeleteModal
      v-if="is_delete_modal"
      @closeModal="closeModal"
      @deleteCategoryModal="deleteCategoryModal"
    ></categoryDeleteModal>
    <postModal
      v-if="$store.state.post.post_popupmodal"
      showCondition="page"
    ></postModal>
  </section>
</template>

<script>
import {
  fetchSinglePageBackendUrl,
  PageLikeBackendUrl,
  categoryUrl,
  productUrl,
  courseUrl,
  serviceUrl,
  contactusBackendUrl,
  deletePageBackendUrl,
} from "../../path";
import mixinRequest from "../../mixins/request";
import mixinShare from "../../mixins/share";
import createPost from "../common/CreatePost";
import postModal from "../common/PostModal.vue";
import categoryModal from "./CategoryModal.vue";
import categoryDeleteModal from "./CategoryDeleteModal.vue";
import contactModal from "./ContactModal.vue";
import helpModal from "./HelpModal.vue";
import post from "../dashboard/Post";
import mixinLoader from "../../mixins/loader";
import mixinTracking from "../../mixins/tracking";

export default {
  mixins: [mixinRequest, mixinShare, mixinLoader, mixinTracking],
  data() {
    return {
      page_data: {},
      readMoreActivated: false,
      aboutus: "",
      length: 0,
      offering: "",
      categories: [],
      products: [],
      category_name: "",
      category_length: 0,
      is_category_modal: false,
      editCategory: {},
      is_edit: false,
      is_delete_modal: false,
      is_contact_modal: false,
      category_ref_no: "",
      see_all: false,
      defaultImage: "/assets/img/page-home-public-banner.jpg",
      industry_name: "",
      page_offering: [],
      product_length: 0,
      search_text: "",
    };
  },
  components: {
    createPost,
    postModal,
    post,
    categoryModal,
    categoryDeleteModal,
    contactModal,
    helpModal,
  },
  created() {
    window.scrollTo(0, 0);
    if (this.$route.params) {
      if (this.$route.params.page_ref_no) {
        const page_ref_no = this.$route.params.page_ref_no;
        this.fetchPageData(page_ref_no);
      }

      if (this.$route.query.type) {
        this.getCategory(this.$route.query.type);
      }
    }
  },
  watch: {
    $route(to, from) {
      this.getCategory(to.query.type);
    },
  },
  methods: {
    seeAll(category) {
      this.see_all = true;
      this.category_name = category.category_name;
      this.search_text = "";
      this.getCategory(this.offering, category);
    },
    searchProduct() {
      this.see_all = true;
      this.getCategory(this.offering);
    },
    allCategoryList() {
      this.see_all = false;
      this.category_name = "";
      this.search_text = "";
      this.getCategory(this.offering);
    },
    async getCategory(type, category = {}) {
      if (Object.keys(category).length == 0 && this.search_text == "") {
        this.see_all = false;
      } else if (this.offering != type) {
        this.see_all = false;
        this.search_text = "";
      }
      this.offering = type;

      if (this.see_all) {
        this.categories = [];
        let products = [];
        if (this.offering == "products") {
          let query = "?category_ref_no=" + category.category_ref_no;
          if (this.search_text != "")
            query = "?search_text=" + this.search_text;

          products = await this.getRequest(productUrl.productdetails + query);
          products = products.product_data;
        } else if (this.offering == "services") {
          let query = "?category_ref_no=" + category.category_ref_no;
          if (this.search_text != "")
            query = "?search_text=" + this.search_text;

          products = await this.getRequest(serviceUrl.productdetails + query);
          products = products.service_data;
        } else if (this.offering == "courses") {
          let query = "?category_ref_no=" + category.category_ref_no;
          if (this.search_text != "")
            query = "?search_text=" + this.search_text;

          products = await this.getRequest(courseUrl.productdetails + query);
          products = products.course_data;
        }

        this.products = products;
        if (this.search_text == "") this.categories = category;
        this.category_length = 1;
        this.product_length = this.products.length;
      } else {
        const data = await this.getRequest(
          categoryUrl.categorydetails +
            "?page_ref_no=" +
            this.$route.params.page_ref_no +
            "&type=" +
            type
        );
        this.categories = data.category_data;
        this.search_text = "";
        this.category_length = this.categories.length;
      }
    },
    addCategoryModal() {
      this.editCategory = {};
      this.is_category_modal = true;
      this.is_edit = false;
      this.search_text = "";

      this.is_delete_modal = false;
      this.is_contact_modal = false;
      this.category_ref_no = "";
    },
    editCategoryModal(category) {
      this.is_category_modal = true;
      this.is_edit = true;
      this.editCategory = category;
      this.search_text = "";

      this.is_delete_modal = false;
      this.is_contact_modal = false;
      this.category_ref_no = "";
    },
    contactusModal() {
      this.is_category_modal = false;
      this.is_edit = false;
      this.search_text = "";

      this.is_delete_modal = false;
      this.is_contact_modal = true;
      this.category_ref_no = "";
    },
    async contactUs(values) {
      let formData = new FormData(values);
      formData.append("page_ref_no", this.$route.params.page_ref_no);
      formData.append(
        "name",
        this.getUser.first_name + " " + this.getUser.last_name
      );

      await this.postRequest(contactusBackendUrl, formData);
      this.is_contact_modal = false;
      this.$toast.success("Thank you, page admin will contact you soon");
    },
    closeModal() {
      this.is_category_modal = false;
      this.is_edit = false;
      this.search_text = "";

      this.is_delete_modal = false;
      this.is_contact_modal = false;
      this.category_ref_no = "";
    },
    async submitCategory(values) {
      let formData = new FormData(values);
      formData.append("page_ref_no", this.$route.params.page_ref_no);
      formData.append("page_offering", this.offering);

      let url = categoryUrl.categorydetails;
      if (this.is_edit) {
        formData.append("_method", "PUT");
        url =
          categoryUrl.categorydetails + "/" + this.editCategory.category_ref_no;
      }

      const categorydata = await this.postRequest(url, formData);

      if (this.is_edit) {
        if (Array.isArray(this.categories)) {
          this.categories = this.categories.map((category) => {
            if (
              category.category_ref_no ===
              categorydata.category_data.category_ref_no
            ) {
              return categorydata.category_data;
            }
            return category;
          });
        } else {
          this.categories = categorydata.category_data;
        }
        this.$toast.success("Category updated successfully");
      } else {
        const originalArray = [...this.categories];
        originalArray.unshift(categorydata.category_data);
        this.$toast.success("Category added successfully");
        this.categories = originalArray;
        this.category_length = this.categories.length;
      }

      this.is_category_modal = false;
      this.search_text = "";
    },
    async deleteCategoryModal(category) {
      this.is_delete_modal = true;
      if (this.category_ref_no !== "") {
        let formData = new FormData();
        formData.append("_method", "DELETE");

        await this.postRequest(
          categoryUrl.categorydetails +
            "/" +
            this.category_ref_no.category_ref_no,
          formData
        );
        if (Array.isArray(this.categories)) {
          this.categories.splice(
            this.categories.indexOf(this.category_ref_no),
            1
          );
        } else {
          this.categories = [];
          this.see_all = false;
          this.getCategory(this.offering);
        }

        this.category_ref_no = "";
        this.is_delete_modal = false;
        this.category_length = this.categories.length;

        return;
      }
      this.category_ref_no = category;
      this.search_text = "";
    },
    toggleCategory(ref_no) {
      document.getElementById(ref_no).classList.toggle("show");
    },
    activateReadMore() {
      this.readMoreActivated = true;
    },
    openLink(link) {
      if (link != "") {
        var pattern = /^((http|https|ftp):\/\/)/;

        if (!pattern.test(link)) {
          link = "http://" + link;
        }
        window.open(link, "_blank");
      }
    },
    async fetchPageData(page_ref_no) {
      const data = await this.getRequest(
        fetchSinglePageBackendUrl + "/" + page_ref_no
      );
      if (data.page_data) {
        this.page_data = data.page_data;
        this.industry_name = data.page_data.industrydata.name;
        this.aboutus = data.page_data.aboutus.slice(0, 250);
        this.length = data.page_data.aboutus.length;
        if (
          data.page_data.offerings != null &&
          data.page_data.offerings != ""
        ) {
          this.page_offering = data.page_data.offerings.split(",");
        }
        this.$store.commit("post/changePostAs", {
          txt: "page",
          page: this.page_data,
        });
      }
    },
    async pageLike() {
      const page_ref_no = this.$route.params.page_ref_no;
      this.showProcessLoader(page_ref_no);
      let formData = new FormData();
      const data = await this.postRequest(
        PageLikeBackendUrl + "/" + page_ref_no + "/like",
        formData
      );
      if (data.page_data) {
        this.hideProcessLoader(page_ref_no);
        this.page_data = data.page_data;
      }
    },
    async pageUnlike() {
      const page_ref_no = this.$route.params.page_ref_no;
      const page_like_ref_no = this.page_data.liked_page.page_like_ref_no;
      this.showProcessLoader(page_ref_no);
      let formData = new FormData();
      formData.append("_method", "delete");
      const data = await this.postRequest(
        PageLikeBackendUrl + "/" + page_ref_no + "/like/" + page_like_ref_no,
        formData
      );
      if (data.page_data) {
        this.hideProcessLoader(page_ref_no);
        this.page_data = data.page_data;
      }
    },
    copyURL() {
      const domainname = window.location.origin + "/page/";
      var Url = this.$refs.mylink;
      var input = document
        .getElementById("CopyLink")
        .appendChild(document.createElement("input"));
      input.value = domainname + Url.innerHTML;
      input.focus();
      input.select();
      document.execCommand("copy");
      input.style.display = "none";
      this.$toast.success("Link copied!");
    },
    async deletePage() {
      this.showProcessLoader(this.page_data.page_ref_no);
      let formData = new FormData();
      formData.append("_method", "DELETE");
      await this.postRequest(
        deletePageBackendUrl + "/" + this.page_data.page_ref_no,
        formData
      );
      this.hideProcessLoader(this.page_data.page_ref_no);

      this.$router.push({ path: "/allpages" });
    },
  },
};
</script>

<style>
</style>
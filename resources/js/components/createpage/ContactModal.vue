<template>
  <section>
    <!-- The Modal Popup Contact Us post start -->
    <div class="modal show fade" id="contactus">
      <div class="modal-dialog">
        <div class="modal-content modal-lg">
          <!-- Modal pageloader -->
          <div class="pageloader">
            <span>Posting...</span>
            <img src="assets/img/loader.gif" alt="processing..." />
          </div>
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title text-left">Contact Us</h4>
            <button type="button" class="close" @click.prevent="closeModal">
              &times;
            </button>
          </div>
          <!-- Modal body -->
          <div class="modal-body">
            <ValidationObserver v-slot="{ handleSubmit }" class="scrollbarpan">
              <form
                class="form"
                @submit.prevent="handleSubmit(contactUs)"
                ref="contactusForm"
              >
                <label class="labelstyle pt-2">Your Name</label>
                <p>
                  {{ getUser.first_name ? getUser.first_name : "" }}
                  {{ getUser.last_name ? getUser.last_name : "" }}
                </p>
                <div class="d-sm-flex justify-content-sm-between">
                  <div>
                    <label class="labelstyle pt-2"
                      >Mobile no<span>*</span></label
                    >
                    <ValidationProvider name="contact_no">
                      <div slot-scope="{ errors }" class="position-relative">
                        <input
                          type="text"
                          name="contact_no"
                          placeholder="Enter Mobile No."
                          v-model="form.contact_no"
                        />
                        <span class="requireds">{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                  </div>
                  <div>
                    <label class="labelstyle pt-2"
                      >Email ID<span>*</span></label
                    >
                    <ValidationProvider name="email" rules="required|email">
                      <div slot-scope="{ errors }" class="position-relative">
                        <input
                          type="email"
                          name="email"
                          placeholder="Enter Email address."
                          v-model="form.email"
                        />
                        <span class="requireds">{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                  </div>
                </div>

                <label class="labelstyle pt-2">Subject<span>*</span></label>
                <ValidationProvider name="subject" rules="required">
                  <div slot-scope="{ errors }" class="position-relative">
                    <input
                      type="text"
                      name="subject"
                      maxlength="100"
                      placeholder="Enter a short subject"
                      v-model="form.subject"
                    />
                    <span class="requireds">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>

                <label class="labelstyle pt-2">Message<span>*</span></label>
                <ValidationProvider name="message" rules="required">
                  <div slot-scope="{ errors }" class="position-relative">
                    <textarea
                      class="mb-3"
                      name="message"
                      placeholder="Write the detailed message here"
                      col="20"
                      v-model="form.message"
                    >
                    </textarea>
                    <span class="requireds">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>

                <div
                  class="btnloader"
                  v-if="
                    loader.loading &&
                    loader.loader_ref_no == $route.params.page_ref_no
                  "
                >
                  <img src="/assets/img/loader-btn.gif" alt="" />
                </div>
                <button v-else class="btnfill float-right mt-0 mb-0">
                  Send Message
                </button>
              </form>
            </ValidationObserver>
          </div>
        </div>
      </div>
    </div>
    <!-- The Modal Popup Contact Us post end -->
    <div class="modal-backdrop fade show"></div>
  </section>
</template>

<script>
import mixinLoader from "../../mixins/loader";

export default {
  mixins: [mixinLoader],
  data() {
    return {
      form: {
        contact_no: "",
        email: "",
        subject: "",
        message: "",
      },
    };
  },
  methods: {
    async contactUs() {
      this.showProcessLoader(this.$route.params.page_ref_no);
      this.$emit("contactUs", this.$refs.contactusForm);
      setTimeout(() => {
        this.hideProcessLoader(this.$route.params.page_ref_no);
      }, 1500);
    },
    closeModal() {
      this.$emit("closeModal");
    },
  },
};
</script>

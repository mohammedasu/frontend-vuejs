import { profile, userUrl } from "../path";
import requestMixin from "./request";
import { mapGetters } from "vuex";

export default {
    mixins: [requestMixin],
    data() {
        return {
            basic_details: [],
            country_codes: [],
            professional_details: [],
            speciality_master_list: [],
            doctor_speciality: [],
            service_master_list: [],
            address_details: [],
            symptom_master_list: [],
            institute_master_list: []
        };
    },
    components: {
        mapGetters
    },
    created() {
        this.fetchCoutryCodes();
        this.fetchBasicDetails();
        this[this.$route.name] = true;
    },
    methods: {
        async fetchBasicDetails() {
            const data = await this.getRequest(userUrl.fetchUserBackendUrl);
            this.basic_details = data.user_data;
        },
        async fetchCoutryCodes() {
            const data = await this.getRequest(profile.fetchCountryCodeList);
            this.country_codes = data.country_data;
        },
        async saveBasicDetails(form_data, user_image) {
            this.$store.commit("showLoader", true);
            let formData = new FormData();
            formData.append("first_name", form_data.first_name.value);
            formData.append("last_name", form_data.last_name.value);
            formData.append("email", form_data.email.value);
            formData.append("mobile_number", form_data.mobile_number.value);
            formData.append("country_code", form_data.country_code.value);
            formData.append("user_name", form_data.user_name.value);
            formData.append("gender", form_data.gender.value);
            formData.append("dob", form_data.dob.value);
            if (user_image !== "" && user_image !== null) {
                formData.append("user_image", user_image);
            }

            const data = await this.postRequest(
                profile.saveuserbasicdetails,
                formData
            );
            this.basic_details = data.user_data;
            this.$store.commit("showLoader", false);
            this.$toast.success("Basic details updated successfully");
        },
        async fetchProfessionalDetails() {
            const data = await this.getRequest(
                profile.fetchDoctorProfessionalDetails
            );
            const institute = await this.getRequest(
                profile.fetchInstituteMasterList
            );
            this.professional_details = data.doctor_professional_data;
            this.institute_master_list = institute.institute_data;
        },
        async saveProfessionalDetails(form_data, institute_master_ref_no) {
            this.$store.commit("showLoader", true);
            let formData = new FormData();
            let other_institute_name = "";
            formData.append("qualification", form_data.qualification.value);
            formData.append("experience", form_data.experience.value);
            formData.append(
                "registration_number",
                form_data.registration_number.value
            );
            formData.append("place_of_work", form_data.place_of_work.value);
            formData.append(
                "institute_master_ref_no",
                form_data.institute_master_ref_no.value
            );

            if (typeof form_data.other_institute_name != "undefined") {
                other_institute_name = form_data.other_institute_name.value;
            }
            formData.append("other_institute_name", other_institute_name);

            const data = await this.postRequest(
                profile.editdoctorProfessionalDetails,
                formData
            );
            this.professional_details = data.doctor_professional_data;
            this.$store.commit("showLoader", false);
            this.$toast.success("Professional details updated successfully");
        },
        async fetchSpecialityMasterList() {
            const data = await this.getRequest(
                profile.fetchSpecialityMasterList
            );
            this.speciality_master_list = data.speciality_data;
            if (this.basic_details.user_type == "doctor") {
                this.fetchDoctorSpeciality();
            } else {
                this.fetchSymptomMasterList();
            }
        },
        async fetchDoctorSpeciality() {
            const data = await this.getRequest(profile.fetchDoctorSpeciality);
            this.doctor_speciality = data.doctor_speciality_data;
        },
        async saveDoctorSpeciality(selected_speciality) {
            this.$store.commit("showLoader", true);

            let formData = new FormData();
            formData.append("speciality_master_ref_no", selected_speciality);

            await this.postRequest(profile.editDoctorSpeciality, formData);
            this.$store.commit("showLoader", false);
            this.$toast.success("Your speciality updated successfully");
        },
        async fetchAddressDetails() {
            const data = await this.getRequest(profile.fetchUserAddress);
            this.address_details = data.user_address_data;
        },
        async saveAddressDetails(form_data, address_details) {
            this.$store.commit("showLoader", true);

            let formData = new FormData();
            formData.append("address_1", form_data.address_1.value);
            formData.append("address_2", form_data.address_2.value);
            formData.append("landmark", form_data.landmark.value);
            formData.append("city", form_data.city.value);
            formData.append("pincode", form_data.pincode.value);
            formData.append("lat", address_details.lat);
            formData.append("lng", address_details.lng);
            formData.append(
                "user_address_ref_no",
                address_details.user_address_ref_no
            );

            const data = await this.postRequest(
                profile.editUserAddress,
                formData
            );
            this.address_details = data.user_address_data;
            this.$store.commit("showLoader", false);
            this.$toast.success("Your address updated successfully");
        },
        async fetchCity(pincode) {
            this.address_details.city = "";
            let form_data = new FormData();
            form_data.append("pincode", pincode);

            this.$store.commit("showLoader", true);

            const data = await this.postRequest(profile.fetchCity, form_data);

            this.address_details.city = data.city_name;
            this.address_details.lat = data.lat;
            this.address_details.lng = data.lng;
            this.address_details.pincode = pincode;

            this.$store.commit("showLoader", false);
        },
        async fetchServiceMasterList() {
            const data = await this.getRequest(profile.fetchServiceMasterList);
            this.service_master_list = data.service_data;
        },
        async fetchSymptomMasterList() {
            const data = await this.getRequest(profile.fetchSymptomMasterList);
            this.symptom_master_list = data.symptom_data;
            if (this.basic_details.user_type == "patient") {
                this.fetchPatientDetails();
            }
            if (this.basic_details.user_type == "medicalstudent") {
                this.fetchMedicalStudentDetails();
            }
        },
        async fetchPatientDetails() {
            const data = await this.getRequest(profile.fetchPatientDetails);
            this.processHealthIssue(data.patient_data);
        },
        async fetchMedicalStudentDetails() {
            const data = await this.getRequest(
                profile.fetchMedicalStudentDetails
            );
            this.processHealthIssue(data.medical_student_data);
        },
        processHealthIssue(data) {
            var _me = this;
            var health_issues = data.health_issues;
            if (typeof health_issues.speciality != "undefined") {
                if (
                    health_issues.speciality != null &&
                    health_issues.speciality != ""
                ) {
                    $.each(health_issues.speciality, function(key, value) {
                        var id = value;
                        $(".speciality_checkbox").prop("checked", true);
                        _me.showhideForm("speciality");
                        $("#" + id).prop("checked", true);
                    });
                }
            }

            if (typeof health_issues.symptoms != "undefined") {
                if (
                    health_issues.symptoms != null &&
                    health_issues.symptoms != ""
                ) {
                    $.each(health_issues.symptoms, function(key, value) {
                        var id = value;
                        $(".symptoms_checkbox").prop("checked", true);
                        _me.showhideForm("symptoms");
                        $("#" + id).prop("checked", true);
                    });
                }
            }
        },
        showhideForm(value) {
            if (value == "symptoms") {
                $("#div1").show();
                $("#div2").hide();
                $(".speciality_checkbox").prop("checked", false);
            }
            if (value == "speciality") {
                $("#div2").show();
                $("#div1").hide();
                $(".symptoms_checkbox").prop("checked", false);
            }
        },
        async savePatientDetails() {
            this.$store.commit("showLoader", true);
            let url = profile.editPatientDetails;
            if (this.basic_details.user_type == "medicalstudent") {
                url = profile.editMedicalStudentDetails;
            }
            var form_data = new FormData();
            var symptoms = $('input[name="chk_symptoms"]:checked');
            if (symptoms.length > 0) {
                symptoms.each(function() {
                    form_data.append(
                        "health_issues[symptoms][]",
                        $(this).val()
                    );
                });
            } else {
                form_data.append("health_issues[symptoms]", "");
            }
            var speciality = $('input[name="chk_speciality"]:checked');
            if (speciality.length > 0) {
                speciality.each(function() {
                    form_data.append(
                        "health_issues[speciality][]",
                        $(this).val()
                    );
                });
            } else {
                form_data.append("health_issues[speciality]", "");
            }

            if (symptoms.length == 0 && speciality.length == 0) {
                this.$store.commit("showLoader", false);
                this.$toast.error(
                    "Please select at least one of the symptoms or speciality"
                );
                return;
            }

            await this.postRequest(url, form_data);
            this.$store.commit("showLoader", false);
            this.$toast.success(
                "Your symptoms/speciality updated successfully"
            );
        }
    }
};

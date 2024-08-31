<template>
  <div class="container">
    <VerificationAlert></VerificationAlert>
    <div class="row">
      <div class="col-lg-12 middlesec view-profile invitations px-sm-0">
        <div class="card">
          <ProfileTabs
            :basic_details="basic_details"
            @enableSection="enableSection"
          ></ProfileTabs>
          <div class="tab-content" id="nav-tabContent">
            <BasicDetails
              v-if="basicdetails"
              :basic_details="basic_details"
              :country_codes="country_codes"
              @saveBasicDetails="saveBasicDetails"
            ></BasicDetails>
            <ProfessionalDetails
              v-if="professionaldetails"
              :professional_details="professional_details"
              :institute_master_list="institute_master_list"
              @saveProfessionalDetails="saveProfessionalDetails"
              @fetchProfessionalDetails="fetchProfessionalDetails"
            ></ProfessionalDetails>
            <Speciality
              v-if="speciality"
              @fetchSpecialityMasterList="fetchSpecialityMasterList"
              @saveDoctorSpeciality="saveDoctorSpeciality"
              :speciality_master_list="speciality_master_list"
              :doctor_speciality="doctor_speciality"
            ></Speciality>
            <!--<Services
              v-if="services"
              @fetchServiceMasterList="fetchServiceMasterList"
              :service_master_list="service_master_list"
            ></Services>-->
            <AddressDetails
              v-if="addressdetails"
              :address_details="address_details"
              @saveAddressDetails="saveAddressDetails"
              @fetchAddressDetails="fetchAddressDetails"
              @fetchCity="fetchCity"
            ></AddressDetails>
            <Symptoms
              v-if="symptoms"
              @fetchSpecialityMasterList="fetchSpecialityMasterList"
              @savePatientDetails="savePatientDetails"
              :speciality_master_list="speciality_master_list"
              :symptom_master_list="symptom_master_list"
            ></Symptoms>
            <EducationalDetails v-if="educationaldetails"></EducationalDetails>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileTabs from "../profile/profileTabs";
import BasicDetails from "../profile/basicDetails";
import ProfessionalDetails from "../profile/professionalDetails";
import Speciality from "../profile/speciality";
import Services from "../profile/services";
import AddressDetails from "../profile/addressDetails";
import Symptoms from "../profile/symptoms";
import EducationalDetails from "../profile/educationDetails";
import VerificationAlert from "../common/Verification";
import mixin from "../../mixins/profile";

export default {
  mixins: [mixin],
  data() {
    return {
      professionaldetails: false,
      speciality: false,
      services: false,
      addressdetails: false,
      symptoms: false,
      basicdetails: true,
      educationaldetails: false,
    };
  },
  components: {
    ProfileTabs,
    BasicDetails,
    ProfessionalDetails,
    Speciality,
    Services,
    AddressDetails,
    Symptoms,
    VerificationAlert,
    EducationalDetails,
  },
  methods: {
    enableSection(section = "") {
      this.basicdetails = section == "basicdetails" ? true : false;
      this.professionaldetails =
        section == "professionaldetails" ? true : false;
      this.speciality = section == "speciality" ? true : false;
      this.addressdetails = section == "addressdetails" ? true : false;
      this.symptoms = section == "symptoms" ? true : false;
      this.services = section == "services" ? true : false;
      this.educationaldetails = section == "educationaldetails" ? true : false;
    },
  },
};
</script>

<style>
</style>
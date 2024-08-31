let ApiUrl = "";
if (window.env == "development") {
    ApiUrl = "https://testapi.docscampus.com/api/v1/";
} else if (window.env == "local") {
    ApiUrl = "http://127.0.0.1:8000/api/v1/";
} else {
    ApiUrl = "https://api.docscampus.com/api/v1/";
}

const firebaseConfig = {
    apiKey: "AIzaSyCI16itH-iHqxQNparx7LaiMDwjZIB4d8A",
    authDomain: "docscampus-48563.firebaseapp.com",
    projectId: "docscampus-48563",
    storageBucket: "docscampus-48563.appspot.com",
    messagingSenderId: "489088175077",
    appId: "1:489088175077:web:e0157b4b8b31519ef8bd0c",
    measurementId: "G-806ZBB3ZEX"
};
const other_institute_ref_no = "OTH45948759799436746";
const api_user = {
    signup: "dpn-user/signup",
    emaillogin: "dpn-user/emaillogin",
    mobileloginwithpassword: "dpn-user/mobileloginwithpassword",
    sendotp: "dpn-user/sendotp",
    sendonlyotp: "dpn-user/sendonlyotp",
    sendresetlink: "dpn-user/sendresetlink",
    verifyemail: "dpn-user/verifyemail",
    verifyotp: "dpn-user/verifyotp",
    generatetoken: "dpn-user/generatetoken",
    verifytoken: "dpn-user/verifytoken",
    refreshtoken: "dpn-user/refreshtoken",
    setpassword: "dpn-user/setpassword",
    saveuserbasicdetails: "dpn-user/saveuserbasicdetails",
    fetchuserbasicdetails: "dpn-user/fetchuserbasicdetails",
    adduseraddress: "dpn-user/adduseraddress",
    edituseraddress: "dpn-user/edituseraddress",
    fetchuseraddress: "dpn-user/fetchuseraddress",
    fetchregistrationstatus: "dpn-user/fetchregistrationstatus",
    updateuserstatus: "dpn-user/updateuserstatus",
    logout: "dpn-user/logout",
    fetchCity: "dpn-user/fetchcity", //this url is in frontend api.php
    resetpassword: "dpn-user/resetpassword"
};

const api_doctor = {
    adddoctorprofessionaldetails: "dpn-doctor/adddoctorprofessionaldetails",
    editdoctorprofessionaldetails: "dpn-doctor/editdoctorprofessionaldetails",
    fetchdoctorprofessionaldetails: "dpn-doctor/fetchdoctorprofessionaldetails",
    savedoctorservicedetails: "dpn-doctor/savedoctorservicedetails",
    fetchdoctorservicelist: "dpn-doctor/fetchdoctorservicelist",
    adddoctorspeciality: "dpn-doctor/adddoctorspeciality",
    editdoctorspeciality: "dpn-doctor/editdoctorspeciality",
    fetchdoctorspeciality: "dpn-doctor/fetchdoctorspeciality"
};

const api_patient = {
    fetchpatientdetails: "dpn-patient/fetchpatientdetails",
    addpatientdetails: "dpn-patient/addpatientdetails",
    editpatientdetails: "dpn-patient/editpatientdetails"
};

const api_student = {
    fetchmedicalstudentdetails:
        "dpn-medical-student/fetchmedicalstudentdetails",
    addmedicalstudentdetails: "dpn-medical-student/addmedicalstudentdetails",
    editmedicalstudentdetails: "dpn-medical-student/editmedicalstudentdetails",
    educationdetails: "dpn-education-details/education-details",
    educationdetailsfirst: "dpn-education-details/education-details-first"
};

const api_master = {
    fetchspecialitymasterlist: "dpn-master/fetchspecialitymasterlist",
    fetchservicemasterlist: "dpn-master/fetchservicemasterlist",
    fetchsymptommasterlist: "dpn-master/fetchsymptommasterlist",
    fetchinstitutemasterlist: "dpn-master/fetchinstitutemasterlist",
    fetchqualificationlevellist: "dpn-master/fetchqualificationlevel",
    fetchcountrycodelist: "dpn-master/fetch_country_codes"
};

let mobile = "";
let country_code = "";
let email_login = "";
let password_login = "";
let role = "";
let timerOn = true;
let token = "";
let is_basic_details_exists = false;
let is_professional_details_exists = false;
let is_user_address_exists = false;
let is_speciality_exists = false;
let is_patient_speciality_exists = false;
let is_student_speciality_exists = false;
let is_education_details_exists = false;
let user_address_ref_no = "";
window.user_type = "";

$(function() {
    $("#otp-sec").hide();
    $("#pick-role-sec").hide();
    $("#basic-details-sec").hide();
    $("#professional-details-sec").hide();
    $("#select-speciality-sec").hide();
    $("#select-services-sec").hide();
    $("#address-details-sec").hide();
    $("#patient-details-sec").hide();
    $("#student-details-sec").hide();
    $(".popupalertbg").hide();
    $("#login-sec").show();

    $("#emailLoginForm").on("submit", function(event) {
        event.preventDefault();
        email_login = $("#emailid").val();
        password_login = $("#password").val();
        if (email_login == "") {
            showErrorMessage("Please enter email.");
            return false;
        } else if (password_login == "") {
            showErrorMessage("Please enter password.");
            return false;
        }

        showLoader("btnLogin");
        var ajax_request = postRequest(api_user.emaillogin, {
            email: email_login,
            password: password_login
        });

        ajax_request.done(function(response) {
            if (response.success) {
                generateToken(response.data.user_data.user_ref_no)
                    .then(data => {
                        getRequest(api_user.fetchregistrationstatus).done(
                            function(result) {
                                if (result.data.user_data.status) {
                                    if (
                                        result.success == true &&
                                        result.data.user_data
                                            .is_registration_completed == 1
                                    ) {
                                        window.user_data =
                                            response.data.user_data;
                                        const redirectUrl = localStorage.getItem(
                                            "redirectUrl"
                                        );

                                        if (
                                            redirectUrl !== "" &&
                                            redirectUrl != null &&
                                            redirectUrl != undefined
                                        ) {
                                            document.location.href = redirectUrl;
                                        } else {
                                            document.location.href =
                                                "/dashboard";
                                        }
                                    } else {
                                        fetchBasicDetails();
                                        $("#login_email_div_id").hide();
                                    }
                                } else {
                                    $("#blocked").modal("show");
                                    hideLoader("btnLogin");
                                }
                            }
                        );
                    })
                    .catch(error => {
                        showErrorMessage(error);
                        hideLoader("btnLogin");
                    });
            } else {
                showErrorMessage(response.message);
            }
            hideLoader("btnLogin");
        });
        ajax_request.fail(function(err) {
            showErrorMessage(err.responseJSON.message);
            hideLoader("btnLogin");
        });
    });

    $("#passwordLoginForm").on("submit", function(event) {
        event.preventDefault();
        const mobile_password = $("#mobile_password").val();
        showLoader("passwordLoginBtn");
        var ajax_request = postRequest(api_user.mobileloginwithpassword, {
            mobile: mobile,
            password: mobile_password
        });

        ajax_request.done(function(response) {
            if (response.success) {
                generateToken(response.data.user_data.user_ref_no)
                    .then(data => {
                        getRequest(api_user.fetchregistrationstatus).done(
                            function(result) {
                                if (result.data.user_data.status) {
                                    if (
                                        result.success == true &&
                                        result.data.user_data
                                            .is_registration_completed == 1
                                    ) {
                                        window.user_data =
                                            response.data.user_data;
                                        const redirectUrl = localStorage.getItem(
                                            "redirectUrl"
                                        );

                                        if (
                                            redirectUrl !== "" &&
                                            redirectUrl != null &&
                                            redirectUrl != undefined
                                        ) {
                                            document.location.href = redirectUrl;
                                        } else {
                                            document.location.href =
                                                "/dashboard";
                                        }
                                    } else {
                                        fetchBasicDetails();
                                        $("#mobilepassword_div_id").hide();
                                    }
                                } else {
                                    $("#blocked").modal("show");
                                    hideLoader("passwordLoginBtn");
                                }
                            }
                        );
                    })
                    .catch(error => {
                        showErrorMessage(error);
                        hideLoader("passwordLoginBtn");
                    });
            } else {
                showErrorMessage(response.message);
            }
            hideLoader("passwordLoginBtn");
        });
        ajax_request.fail(function(err) {
            showErrorMessage(err.responseJSON.message);
            hideLoader("passwordLoginBtn");
        });
    });

    $("#loginForm").on("submit", function(event) {
        event.preventDefault();

        mobile = $("#mobile").val();
        country_code = $("#country_code").val();
        showLoader("btnLogin");
        var ajax_request = postRequest(api_user.sendotp, {
            mobile: mobile,
            country_code: country_code
        });

        ajax_request.done(function(response) {
            if (response.success) {
                const user_data = response.data.user_data;
                $("#login_mobile_div_id").hide();
                $("#editMobilePassword").html(mobile);
                $("#editCountryCodePassword").html(country_code);
                $("#editMobile").html(mobile);
                $("#editCountryCode").html(country_code);
                if (user_data.is_password_set) {
                    $("#mobilepassword_div_id").show();
                } else {
                    $("#otp-sec").show();
                }

                // end here
            } else {
                showErrorMessage(response.message);
            }
            hideLoader("btnLogin");
        });
        ajax_request.fail(function(err) {
            showErrorMessage(err.responseJSON.message);
            hideLoader("btnLogin");
        });
    });

    $("#otpForm").on("submit", function(event) {
        event.preventDefault();

        $("#regenerateOtp").attr("disabled", true);
        showLoader("btnVerifyOtp");

        var otp = $("#otp").val();

        var ajax_request = postRequest(api_user.verifyotp, {
            mobile: mobile,
            otp: otp
        });

        ajax_request.done(function(response) {
            if (response.success == true) {
                generateToken(response.data.user_data.user_ref_no)
                    .then(data => {
                        getRequest(api_user.fetchregistrationstatus).done(
                            function(result) {
                                if (result.data.user_data.status) {
                                    if (
                                        result.success == true &&
                                        result.data.user_data
                                            .is_registration_completed == 1
                                    ) {
                                        window.user_data =
                                            response.data.user_data;
                                        if (
                                            response.data.user_data
                                                .is_password_set
                                        ) {
                                            const redirectUrl = localStorage.getItem(
                                                "redirectUrl"
                                            );

                                            if (
                                                redirectUrl !== "" &&
                                                redirectUrl != null &&
                                                redirectUrl != undefined
                                            ) {
                                                document.location.href = redirectUrl;
                                            } else {
                                                document.location.href =
                                                    "/dashboard";
                                            }
                                        } else {
                                            $("#otp-sec").hide();
                                            $("#password_div_id").show();
                                            hideLoader("btnVerifyOtp");
                                        }
                                    } else {
                                        if (
                                            response.data.user_data
                                                .is_password_set
                                        ) {
                                            fetchBasicDetails();
                                        } else {
                                            $("#otp-sec").hide();
                                            $("#password_div_id").show();
                                        }
                                        hideLoader("btnVerifyOtp");
                                    }
                                } else {
                                    $("#blocked").modal("show");
                                    hideLoader("btnVerifyOtp");
                                }
                            }
                        );
                    })
                    .catch(error => {
                        showErrorMessage(error);
                        hideLoader("btnVerifyOtp");
                        $("#regenerateOtp").attr("disabled", false);
                    });
            } else {
                showErrorMessage(response.message);
                hideLoader("btnVerifyOtp");
                $("#regenerateOtp").attr("disabled", false);
            }
        });

        ajax_request.fail(function(err) {
            showErrorMessage(err.responseJSON.message);
            hideLoader("btnVerifyOtp");
            $("#regenerateOtp").attr("disabled", false);
        });
    });

    $("#regenerateOtp").on("click", function() {
        $("#otp").val("");

        disableResend();
        mobile = $("#mobile").val();
        const countryCode = $("#country_code").val();
        const completeNumber = countryCode + mobile;
        //send otp
        var ajax_request = postRequest(api_user.sendotp, {
            mobile: mobile,
            country_code: countryCode
        });

        ajax_request.done(function(response) {
            if (response.success == true) {
                showSuccessMessage(response.message);
            } else {
                showErrorMessage(response.message);
            }
        });
        ajax_request.fail(function(err) {
            showErrorMessage(err.responseJSON.message);
        });
    });

    $("#professionalDetailsForm").on("submit", function(event) {
        event.preventDefault();

        showLoader("btnSaveProfessionalDetails");

        var api = api_doctor.adddoctorprofessionaldetails;

        if (is_professional_details_exists) {
            api = api_doctor.editdoctorprofessionaldetails;
        }

        var form_data = $("#professionalDetailsForm").serialize();
        var ajax_request = postRequest(api, form_data);

        ajax_request.done(function(response) {
            hideLoader("btnSaveProfessionalDetails");

            if (response.success == true) {
                is_professional_details_exists = true;
                $("#professional-details-sec").hide();
                $("#select-speciality-sec").show();
                fetchSpecialityMasterList();
            } else {
                showErrorMessage(response.message);
            }
        });
        ajax_request.fail(function(err) {
            showErrorMessage(err.responseJSON.message);
            hideLoader("btnSaveProfessionalDetails");
        });
    });

    $("#specialityForm").on("submit", function(event) {
        event.preventDefault();

        var speciality_ref_no = $("input[name='speciality']:checked").val();

        if (speciality_ref_no == undefined) {
            showErrorMessage("Please select speciality");
            return;
        }

        showLoader("btnSaveSpeciality");

        var api = api_doctor.adddoctorspeciality;

        if (is_speciality_exists) {
            api = api_doctor.editdoctorspeciality;
        }

        var ajax_request = postRequest(api, {
            speciality_master_ref_no: speciality_ref_no
        });

        ajax_request.done(function(response) {
            hideLoader("btnSaveSpeciality");

            if (response.success == true) {
                is_speciality_exists = true;
                $("#select-speciality-sec").hide();
                $("#address-details-sec").show();
                fetchUserAddressDetails();
                //$("#select-services-sec").show();
                //fetchServiceMasterList();
            } else {
                showErrorMessage(response.message);
            }
        });
        ajax_request.fail(function(err) {
            showErrorMessage(err.responseJSON.message);
            hideLoader("btnSaveSpeciality");
        });
    });

    $("#addressDetailsForm").on("submit", function(event) {
        event.preventDefault();
        var city = $("#city").val();
        if (city == "") {
            showErrorMessage("Please check pincode!");

            return false;
        }

        showLoader("btnSaveAddress");

        var api = api_user.adduseraddress;

        if (is_user_address_exists) {
            api = api_user.edituseraddress;
        }

        var form_data = $("#addressDetailsForm").serialize();
        form_data += "&user_address_ref_no=" + user_address_ref_no;
        var ajax_request = postRequest(api, form_data);

        ajax_request.done(function(response) {
            hideLoader("btnSaveAddress");

            //Update registration flag
            //postRequest(api_user.updateuserstatus, {});
            if (response.success) {
                //is_user_address_exists = true;
                const redirectUrl = localStorage.getItem("redirectUrl");
                if (
                    redirectUrl !== "" &&
                    redirectUrl != null &&
                    redirectUrl != undefined
                ) {
                    document.location.href = redirectUrl;
                } else {
                    document.location.href = "/dashboard";
                }
            } else {
                //showErrorMessage(response.message);
            }
        });
        ajax_request.fail(function(err) {
            //showErrorMessage(err.responseJSON.message);
            hideLoader("btnSaveAddress");
        });
    });
});

$(document).on("change", "#institute_master_ref_no", function() {
    if ($(this).val() == other_institute_ref_no) {
        $("#other_institute_name").show();
        $("#other").prop("checked", true);
    } else {
        $("#other_institute_name").hide();
        $("#other_institute_name").val("");
        $("#other").prop("checked", false);
    }
});

$(document).on("change", "#other", function() {
    if ($(this).is(":checked")) {
        $("#institute_master_ref_no").val(other_institute_ref_no);
    } else {
        $("#institute_master_ref_no").val("");
    }
    $("#institute_master_ref_no").trigger("change");
});

// for student case
$(document).on("change", "#institute_master_ref_no_student", function() {
    if ($(this).val() == other_institute_ref_no) {
        $("#other_institute_name_student").show();
        $("#other_student").prop("checked", true);
    } else {
        $("#other_institute_name_student").hide();
        $("#other_institute_name_student").val("");
        $("#other_student").prop("checked", false);
    }
});

$(document).on("change", "#other_student", function() {
    if ($(this).is(":checked")) {
        $("#institute_master_ref_no_student").val(other_institute_ref_no);
    } else {
        $("#institute_master_ref_no_student").val("");
    }
    $("#institute_master_ref_no_student").trigger("change");
});

function navigate(hideSection = "", showSection = "") {
    if (hideSection == "address-details-sec") {
        if (role == "doctor") {
            showSection = "select-services-sec";
        } else if (role == "patient") {
            showSection = "patient-details-sec";
        } else {
            showSection = "student-details-sec";
        }
    }

    if (is_basic_details_exists && hideSection == "basic-details-sec") {
        showSection = "otp-sec";
    }

    $("#" + hideSection).hide();
    $("#" + showSection).show();
}

function disableResend() {
    $("#regenerateOtp").attr("disabled", true);
    //timer(60);
    setTimeout(function() {
        // enable click after 1 second
        $("#regenerateOtp").removeAttr("disabled");
        $("#timer").empty();
    }, 60000); // 1 second delay
}

function timer(remaining) {
    var m = Math.floor(remaining / 60);
    var s = remaining % 60;

    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    if (s > 0) {
        $("#timer").html(s);
    }
    remaining -= 1;

    if (remaining >= 0 && timerOn) {
        setTimeout(function() {
            timer(remaining);
        }, 1000);
        return;
    }

    if (!timerOn) {
        $("#timer").empty();
        return;
    }
}
function callMsg91(mobilenummber, countryCode, provider) {
    var ajax_request = postRequest(api_user.sendotp, {
        mobile: mobilenummber,
        country_code: countryCode,
        provider: provider
    });

    ajax_request.done(function(response) {
        if (response.success) {
            $("#otp-sec").show();
            $("#login-sec").hide();
            $("#editMobile").html(mobilenummber);
            $("#editCountryCode").html(countryCode);

            // end here
        } else {
            showErrorMessage(response.message);
        }
        hideLoader("btnLogin");
    });
    ajax_request.fail(function(err) {
        showErrorMessage(err.responseJSON.message);
        hideLoader("btnLogin");
    });
}
function pickrole() {
    role = $("input:radio[name='pickroleradio']:checked").val();
    if (role == undefined) {
        showErrorMessage("Please select user type");
    } else {
        $("#pick-role-sec").hide();
        $("#basic-details-sec").show();
    }
}

function fetchInstituteList() {
    var ajax_request = getRequest(api_master.fetchinstitutemasterlist);

    ajax_request.done(function(response) {
        if (response.success) {
            var id = "institute_master_ref_no";
            if (role == "medicalstudent") {
                id = "institute_master_ref_no_student";
            }
            $("#" + id + "").html(
                '<option value="">Select Name of University or College</option>'
            );
            $.each(response.data.institute_data, function(key, value) {
                $("#" + id + "").append(
                    $("<option>", {
                        value: value.institute_master_ref_no
                    }).text(value.institute_name)
                );
            });

            $("#institute_master_ref_no_student").select2();
        }
    });
}

function fetchQualificationList() {
    var ajax_request = getRequest(api_master.fetchqualificationlevellist);

    ajax_request.done(function(response) {
        if (response.success) {
            var id = "qualification_level_ref_no";
            $("#" + id + "").html(
                '<option value="">Select your level of education</option>'
            );
            $.each(response.data.qualification_level_data, function(
                key,
                value
            ) {
                $("#" + id + "").append(
                    $("<option>", {
                        value: value.qualification_level_ref_no
                    }).text(value.qualification_level_name)
                );
            });

            //$("select").select2();
        }
    });
}

function fetchProfessionalDetails() {
    showPageLoader();

    var ajax_request = getRequest(api_doctor.fetchdoctorprofessionaldetails);

    ajax_request.done(function(response) {
        if (response.success) {
            if (response.data.doctor_professional_data != null) {
                $("#institute_master_ref_no").val(
                    response.data.doctor_professional_data
                        .institute_master_ref_no
                );

                is_professional_details_exists = true;

                // Fill professional details
                $.each(response.data.doctor_professional_data, function(
                    index,
                    value
                ) {
                    id = "#" + index;
                    $(id).val(value);
                    if (value == other_institute_ref_no) {
                        $("#other_institute_name").show();
                        $("#other").prop("checked", true);
                    }
                });
            }

            $("select").select2();
        } else {
            showErrorMessage(response.message);
        }
        hidePageLoader();
    });
    ajax_request.fail(function(err) {
        showErrorMessage(err.responseJSON.message);
        hidePageLoader();
    });
}

function fetchSpecialityDetails() {
    showPageLoader();

    var ajax_request = getRequest(api_doctor.fetchdoctorspeciality);

    ajax_request.done(function(response) {
        if (response.success == true) {
            if (response.data.doctor_speciality_data != null) {
                is_speciality_exists = true;

                // Fill speciality details
                var id =
                    response.data.doctor_speciality_data
                        .speciality_master_ref_no;
                $("#" + id).prop("checked", true);
            }
        } else {
            showErrorMessage(response.message);
        }
        hidePageLoader();
    });
    ajax_request.fail(function(err) {
        showErrorMessage(err.responseJSON.message);
        hidePageLoader();
    });
}

function fetchUserAddressDetails() {
    showPageLoader();
    if (window.user_type == "doctor") {
        $(".change_address_title").html("Clinic Address");
    } else {
        $(".change_address_title").html("Your Address");
    }
    var ajax_request = getRequest(api_user.fetchuseraddress);

    ajax_request.done(function(response) {
        if (response.success == true) {
            if (response.data.user_address_data != null) {
                is_user_address_exists = true;

                // Fill professional details
                user_address_ref_no =
                    response.data.user_address_data.user_address_ref_no;
                $.each(response.data.user_address_data, function(index, value) {
                    id = "#" + index;
                    $(id).val(value);
                });
            }
        } else {
            showErrorMessage(response.message);
        }
        hidePageLoader();
    });
    ajax_request.fail(function(err) {
        showErrorMessage(err.responseJSON.message);
        hidePageLoader();
    });
}

function fetchSpecialityMasterList() {
    showPageLoader();

    var ajax_request = getRequest(api_master.fetchspecialitymasterlist);

    ajax_request.done(function(response) {
        if (response.success == true) {
            var html = "";
            if (role == "doctor") {
                $.each(response.data.speciality_data, function(index, value) {
                    html += '<div class="checkmain">';
                    html +=
                        '<input type = "radio" name = "speciality" class="radioinput" id = "' +
                        value.speciality_master_ref_no +
                        '" value = "' +
                        value.speciality_master_ref_no +
                        '" />';
                    html +=
                        '<label for="' +
                        value.speciality_master_ref_no +
                        '"><img src="' +
                        value.icon +
                        '"> ' +
                        value.speciality_name +
                        "</label>";
                    html += "</div>";
                });

                $("#specialityList").html(html);
                fetchSpecialityDetails();
            } else if (role == "patient") {
                $.each(response.data.speciality_data, function(index, value) {
                    html += '<div class="speciality checkmain">';
                    html +=
                        '<input type = "checkbox" name = "health_issues[speciality][' +
                        index +
                        ']" class="radioinput" id = "' +
                        value.speciality_master_ref_no +
                        '" value = "' +
                        value.speciality_master_ref_no +
                        '" />';
                    html +=
                        '<label for="' +
                        value.speciality_master_ref_no +
                        '"><img src="' +
                        value.icon +
                        '"> ' +
                        value.speciality_name +
                        "</label>";
                    html += "</div>";
                });
                fetchSymptomMasterList();
                //if (role == "patient") {
                $("#patientspecialityList").html(html);
                /* else {
                    $("#studentspecialityList").html(html);
                } */
            } else {
                fetchSymptomMasterList();
            }
            //scrollbar();
        } else {
            showErrorMessage(response.message);
            hidePageLoader();
        }
    });
    ajax_request.fail(function(err) {
        showErrorMessage(err.responseJSON.message);
        hidePageLoader();
    });
}

function fetchSymptomMasterList() {
    showPageLoader();

    var ajax_request = getRequest(api_master.fetchsymptommasterlist);

    ajax_request.done(function(response) {
        if (response.success == true) {
            var html = "";
            if (typeof response.data.symptom_data != "undefined") {
                $.each(response.data.symptom_data, function(index, value) {
                    html += '<div class="speciality checkmain">';
                    html +=
                        '<input type = "checkbox" name = "health_issues[symptoms][' +
                        index +
                        ']" class="radioinput" id = "' +
                        value.symptom_master_ref_no +
                        '" value = "' +
                        value.symptom_master_ref_no +
                        '" />';
                    html +=
                        '<label for="' +
                        value.symptom_master_ref_no +
                        '"><img src="' +
                        value.icon +
                        '"> ' +
                        value.symptom_name +
                        "</label>";
                    html += "</div>";
                });
            }

            if (role == "patient") {
                $("#patientsymptomsList").html(html);
                fetchPatientDetails();
            } else {
                //  $("#studentsymptomsList").html(html);
                fetchStudentDetails();
            }

            //scrollbar();
            hidePageLoader();
        } else {
            showErrorMessage(response.message);
            hidePageLoader();
        }
    });
    ajax_request.fail(function(err) {
        showErrorMessage(err.responseJSON.message);
        hidePageLoader();
    });
}

function fetchPatientDetails() {
    showLoader("btnSavePatientSpeciality");

    var ajax_request = getRequest(api_patient.fetchpatientdetails);

    ajax_request.done(function(response) {
        if (response.success == true) {
            if (response.data.patient_data != null) {
                is_patient_speciality_exists = true;

                // Fill speciality details
                var health_issues = response.data.patient_data.health_issues;
                if (typeof health_issues.speciality != "undefined") {
                    if (
                        health_issues.speciality != null &&
                        health_issues.speciality != ""
                    ) {
                        if (
                            health_issues.symptoms == null ||
                            health_issues.symptoms == ""
                        ) {
                            $(".speciality_checkbox").prop("checked", true);
                            $("#div1").hide();
                            $("#div2").show();
                        }
                        $.each(health_issues.speciality, function(key, value) {
                            var id = value;
                            $("#" + id).prop("checked", true);
                        });
                    }
                }

                if (typeof health_issues.symptoms != "undefined") {
                    if (
                        health_issues.symptoms != null &&
                        health_issues.symptoms != ""
                    ) {
                        $(".symptoms_checkbox").prop("checked", true);
                        $("#div2").hide();
                        $("#div1").show();
                        $.each(health_issues.symptoms, function(key, value) {
                            var id = value;
                            $("#" + id).prop("checked", true);
                        });
                    }
                }
            }
        } else {
            showErrorMessage(response.message);
        }
        hideLoader("btnSavePatientSpeciality");
    });
    ajax_request.fail(function(err) {
        showErrorMessage(err.responseJSON.message);
        hideLoader("btnSavePatientSpeciality");
    });
}

function fetchStudentDetails() {
    showPageLoader();

    var ajax_request = getRequest(api_student.fetchmedicalstudentdetails);

    ajax_request.done(function(response) {
        if (response.success == true) {
            if (response.data.medical_student_data != null) {
                is_student_speciality_exists = true;

                // Fill speciality details
                var health_issues =
                    response.data.medical_student_data.health_issues;
                if (typeof health_issues.speciality != "undefined") {
                    if (
                        health_issues.speciality != null &&
                        health_issues.speciality != ""
                    ) {
                        if (
                            health_issues.symptoms == null ||
                            health_issues.symptoms == ""
                        ) {
                            $(".student_speciality_checkbox").prop(
                                "checked",
                                true
                            );
                            $("#divstudent1").hide();
                            $("#divstudent2").show();
                        }
                        $.each(health_issues.speciality, function(key, value) {
                            var id = value;
                            $("#" + id).prop("checked", true);
                        });
                    }
                }

                if (typeof health_issues.symptoms != "undefined") {
                    if (
                        health_issues.symptoms != null &&
                        health_issues.symptoms != ""
                    ) {
                        $(".student_symptoms_checkbox").prop("checked", true);
                        $("#divstudent2").hide();
                        $("#divstudent1").show();
                        $.each(health_issues.symptoms, function(key, value) {
                            var id = value;
                            $("#" + id).prop("checked", true);
                        });
                    }
                }
                fetchFirstEducation();
            }
            hidePageLoader();
        } else {
            showErrorMessage(response.message);
            hidePageLoader();
        }
    });
    ajax_request.fail(function(err) {
        showErrorMessage(err.responseJSON.message);
        hidePageLoader();
    });
}

function savePatientDetails() {
    showLoader("btnSavePatientSpeciality");

    var api = api_patient.addpatientdetails;

    if (is_patient_speciality_exists) {
        api = api_patient.editpatientdetails;
    }

    var type = $("input[name='showform']:checked").val();
    var form_data = $("#patientspecialityForm").serialize();
    if (type == "no") {
        if ($('.speciality input[type="checkbox"]:checked').length != 0) {
            form_data += "&health_issues[symptoms]=";
        }
    } else if (type == "yes") {
        if ($('.speciality input[type="checkbox"]:checked').length != 0) {
            form_data += "&health_issues[speciality]=";
        }
    }
    var ajax_request = postRequest(api, form_data);

    ajax_request.done(function(response) {
        hideLoader("btnSavePatientSpeciality");

        if (response.success == true) {
            is_patient_speciality_exists = true;
            fetchUserAddressDetails();
            $("#patient-details-sec").hide();
            $("#address-details-sec").show();
        } else {
            showErrorMessage(response.message);
        }
    });
    ajax_request.fail(function(err) {
        hideLoader("btnSavePatientSpeciality");
        showErrorMessage(err.responseJSON.message);
    });
}
function validateEducationData() {
    const qualification_level_ref_no = $("#qualification_level_ref_no").val();
    const qualification = $("#qualification_student").val();
    const start_year = $("#start_year").val();
    const end_year = $("#end_year").val();
    const institute_master_ref_no = $("#institute_master_ref_no_student").val();
    const description = $("#description").val();
    var checkBoxValue = $("#pursuing").is(":checked") ? 1 : 0;
    var response = true;
    if (
        qualification_level_ref_no == "" ||
        qualification == "" ||
        start_year == "" ||
        institute_master_ref_no == "" ||
        description == "" ||
        (checkBoxValue == 0 && end_year == "")
    ) {
        response = false;
    }
    return response;
}
function saveStudentDetails() {
    var responsevalidate = validateEducationData();
    if (responsevalidate) {
        showLoader("btnSaveStudentEducation");
        var api = api_student.addmedicalstudentdetails;

        if (is_student_speciality_exists) {
            api = api_student.editmedicalstudentdetails;
        }
        var form_data = $("#blankform").serialize();
        var ajax_request = postRequest(api, form_data);
        ajax_request.done(function(response) {
            hideLoader("btnSaveStudentEducation");
            if (response.success == true) {
                saveStudentEducation(is_student_speciality_exists);
                is_student_speciality_exists = true;
            } else {
                showErrorMessage(response.message);
            }
        });
        ajax_request.fail(function(err) {
            hideLoader("btnSaveStudentEducation");
            showErrorMessage(err.responseJSON.message);
        });
    } else {
        showErrorMessage("Please fill the form!");
    }
}
function hideEndyear() {
    var checkBoxValue = $("#pursuing").is(":checked") ? 1 : 0;
    if (checkBoxValue) {
        $("#end_year_div").hide();
    } else {
        $("#end_year_div").show();
    }
}
function saveStudentEducation(check_add_edit) {
    showLoader("btnSaveStudentEducation");
    var api = api_student.educationdetails;
    var requestType = "POST";
    if (is_education_details_exists) {
        api = api_student.educationdetails + "/" + window.education_ref_no;
        requestType = "PUT";
    }
    var form_data = $("#studenteducationForm").serialize();
    var checkBoxValue = $("#pursuing").is(":checked") ? 1 : 0;
    form_data += "&pursuing=" + checkBoxValue;

    var ajax_request = postRequest(api, form_data, requestType);
    ajax_request.done(function(response) {
        hideLoader("btnSaveStudentEducation");
        if (response.success == true) {
            is_education_details_exists = true;
            fetchUserAddressDetails();
            $("#student-details-sec").hide();
            $("#address-details-sec").show();
        } else {
            showErrorMessage(response.message);
        }
    });
    ajax_request.fail(function(err) {
        hideLoader("btnSaveStudentEducation");
        showErrorMessage(err.responseJSON.message);
    });
}

function fetchFirstEducation() {
    showPageLoader();

    var ajax_request = getRequest(api_student.educationdetailsfirst);
    ajax_request.done(function(response) {
        hidePageLoader();
        if (response.success == true) {
            if (response.data.education_data != null) {
                const educationData = response.data.education_data;
                $("#institute_master_ref_no_student").val(
                    educationData.institute_master_ref_no
                );
                $("#select2-institute_master_ref_no_student-container").html(
                    educationData.institute_data.institute_name
                );

                is_education_details_exists = true;
                window.education_ref_no = educationData.education_ref_no;
                if (educationData.pursuing) {
                    $("#pursuing").prop("checked", true);
                }
                $("#qualification_student").val(educationData.qualification);

                $.each(educationData, function(index, value) {
                    id = "#" + index;
                    $(id).val(value);
                    if (value == other_institute_ref_no) {
                        $("#other_institute_name_student").show();
                        $("#other_institute_name_student").val(
                            educationData.other_institute_name
                        );
                        $("#other_student").prop("checked", true);
                    }
                });
                hideEndyear();
                // $("select").select2();
            }
        } else {
            showErrorMessage(response.message);
        }
    });
    ajax_request.fail(function(err) {
        showErrorMessage(err.responseJSON.message);
        hidePageLoader();
    });
}

$(document).on("blur", "#pincode", function() {
    showLoader("btnSaveAddress");

    var ajax_request = postRequest(api_user.fetchCity, {
        pincode: $("#pincode").val()
    });

    ajax_request.done(function(response) {
        hideLoader("btnSaveAddress");
        if (response.success) {
            $("#city").val(response.data.city_name);
            $("#lat").val(response.data.lat);
            $("#lng").val(response.data.lng);
        } else {
            showErrorMessage(response.message);
        }
    });
    ajax_request.fail(function(err) {
        $("#city").val("");
        showErrorMessage(err.responseJSON.message);
        hideLoader("btnSaveAddress");
    });
});

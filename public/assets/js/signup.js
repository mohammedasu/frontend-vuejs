let mobile_signup = "";
let country_code_signup = "";
let email_signup = "";
let password_signup = "";
window.user_type = "";
var password_match = "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$";

function validateEmailSignupForm() {
    let check_response = true;
    email_signup = $("#emailid").val();
    password_signup = $("#password").val();
    if (email_signup == "") {
        showErrorMessage("Please enter email.");
        check_response = false;
    } else if (password_signup == "") {
        showErrorMessage("Please enter password.");
        check_response = false;
    } else if (!password_signup.match(password_match)) {
        var msg = "Minimum 8 characters with uppercase,";
        msg += "<br/>";
        msg += "lowercase letters, a number and special characters.";
        msg += "<br/>";
        msg += "Allowed special charaters are (!@#$%^&*) ";
        showErrorMessage(msg);
        check_response = false;
    }

    return check_response;
}
$(function() {
    $(".popupalertbg").hide();
    $("#emailSignUpForm").on("submit", function(event) {
        event.preventDefault();
        email_signup = $("#emailid").val();
        password_signup = $("#password").val();
        showLoader("btnSignup");
        const validate_result = validateEmailSignupForm();
        if (validate_result) {
            var ajax_request = postRequest(api_user.signup, {
                email: email_signup,
                password: password_signup
            });
            ajax_request.done(function(response) {
                if (response.success) {
                    generateToken(response.data.user_data.user_ref_no)
                        .then(data => {
                            getRequest(api_user.fetchregistrationstatus).done(
                                function(result) {
                                    if (result.data.user_data.status) {
                                        window.user_data =
                                            response.data.user_data;
                                        $("#signup_email_div_id").hide();
                                        fetchBasicDetails();
                                    } else {
                                        hideLoader("btnSignup");
                                    }
                                }
                            );
                        })
                        .catch(error => {
                            showErrorMessage(error);
                            hideLoader("btnSignup");
                        });
                } else {
                    showErrorMessage(response.message);
                }
                hideLoader("btnSignup");
            });
            ajax_request.fail(function(err) {
                showErrorMessage(err.responseJSON.message);
                hideLoader("btnSignup");
            });
        } else {
            hideLoader("btnSignup");
        }
    });
    $("#signupMobileForm").on("submit", function(event) {
        event.preventDefault();
        mobile_signup = $("#mobile").val();
        if (mobile_signup == "") {
            showErrorMessage("Please enter mobile number.");
            return false;
        }
        country_code_signup = $("#country_code").val();
        showLoader("btnSignupMobile");
        var ajax_request = postRequest(api_user.signup, {
            mobile: mobile_signup,
            country_code: country_code_signup
        });

        ajax_request.done(function(response) {
            if (response.success) {
                generateToken(response.data.user_data.user_ref_no)
                    .then(data => {
                        getRequest(api_user.fetchregistrationstatus).done(
                            function(result) {
                                if (result.data.user_data.status) {
                                    window.user_data = response.data.user_data;
                                    $("#editMobile").html(mobile_signup);
                                    $("#editCountryCode").html(
                                        country_code_signup
                                    );
                                    $("#signup_mobile_div_id").hide();
                                    $("#otp-sec").show();
                                } else {
                                    hideLoader("btnSignupMobile");
                                }
                            }
                        );
                    })
                    .catch(error => {
                        showErrorMessage(error);
                        hideLoader("btnSignupMobile");
                    });
            } else {
                showErrorMessage(response.message);
            }
            hideLoader("btnSignupMobile");
        });
        ajax_request.fail(function(err) {
            showErrorMessage(err.responseJSON.message);
            hideLoader("btnSignupMobile");
        });
    });
    $("#otpSignupForm").on("submit", function(event) {
        event.preventDefault();

        $("#regenerateOtp").attr("disabled", true);
        showLoader("btnVerifyOtp");

        var otp = $("#otp").val();

        var ajax_request = postRequest(api_user.verifyotp, {
            mobile: mobile_signup,
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

    $("#passwordUpdateForm").on("submit", function(event) {
        event.preventDefault();
        const newpassword = $("#newpassword").val();
        if (newpassword == "") {
            showErrorMessage("Please enter password ");
            return false;
        } else if (!newpassword.match(password_match)) {
            var msg = "Minimum 8 characters with uppercase,";
            msg += "<br/>";
            msg += "lowercase letters, a number and special characters.";
            msg += "<br/>";
            msg += "Allowed special charaters are (!@#$%^&*) ";
            showErrorMessage(msg);
            return false;
        }
        showLoader("passwordBtn");
        var ajax_request = postRequest(api_user.setpassword, {
            password: newpassword
        });

        ajax_request.done(function(response) {
            if (response.success) {
                const user_data = response.data.user_data;
                window.user_data = user_data;
                if (user_data.is_registration_completed) {
                    document.location.href = "/dashboard";
                } else {
                    fetchBasicDetails();
                    $("#password_div_id").hide();
                }
            } else {
                showErrorMessage(response.message);
            }
            hideLoader("passwordBtn");
        });
        ajax_request.fail(function(err) {
            showErrorMessage(err.responseJSON.message);
            hideLoader("passwordBtn");
        });
    });
});

function redirectToPage(txt) {
    if (txt == "email") {
        $("#signup_email_div_id").show();
        $("#signup_mobile_div_id").hide();
        $("#otp-sec").hide();
        $("#password_div_id").hide();
    } else if (txt == "mobile") {
        $("#signup_email_div_id").hide();
        $("#signup_mobile_div_id").show();
        $("#otp-sec").hide();
        $("#password_div_id").hide();
    } else if (txt == "loginmobile") {
        $("#login_email_div_id").hide();
        $("#login_mobile_div_id").show();
        $("#otp-sec").hide();
        $("#password_div_id").hide();
        $("#mobilepassword_div_id").hide();
    } else if (txt == "loginemail") {
        $("#login_email_div_id").show();
        $("#login_mobile_div_id").hide();
        $("#otp-sec").hide();
        $("#password_div_id").hide();
        $("#mobilepassword_div_id").hide();
    }
}

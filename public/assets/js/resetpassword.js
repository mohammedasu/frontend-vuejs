let mobile = "";
let email = "";
let countryCode = "";
let timerOn = true;
let user_ref_no = null;
let otp = "";
var password_match = "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$";

$(function() {
    $(".popupalertbg").hide();
    $("#btnResetPassword,#sendEmailAgain").on("click", function(event) {
        event.preventDefault();
        email = $("#email").val();
        if (email == "") {
            showErrorMessage("Please enter email.");
            hideLoader("btnResetPassword");
            return false;
        }
        showLoader("btnResetPassword");
        var ajax_request = postRequest(api_user.sendresetlink, {
            email: email
        });

        ajax_request.done(function(response) {
            if (response.success) {
                $("#resetpassword_email_div_id").hide();
                $("#emailmessage_div_id").show();
                showSuccessMessage(response.message);
            } else {
                showErrorMessage(response.message);
            }
            hideLoader("btnResetPassword");
        });
        ajax_request.fail(function(err) {
            showErrorMessage(err.responseJSON.message);
            hideLoader("btnResetPassword");
        });
    });
    $("#resetpasswordMobileForm").on("submit", function(event) {
        event.preventDefault();
        mobile = $("#mobile").val();
        if (mobile == "") {
            showErrorMessage("Please enter mobile number.");
            return false;
        }
        countryCode = $("#country_code").val();
        showLoader("btnResetPasswordMobile");
        var ajax_request = postRequest(api_user.sendonlyotp, {
            mobile: mobile,
            country_code: countryCode
        });

        ajax_request.done(function(response) {
            if (response.success) {
                $("#editMobile").html(mobile);
                $("#editCountryCode").html(countryCode);
                $("#resetpassword_mobile_div_id").hide();
                $("#resetpassword_otp_div_id").show();
            } else {
                showErrorMessage(response.message);
            }
            hideLoader("btnResetPasswordMobile");
        });
        ajax_request.fail(function(err) {
            showErrorMessage(err.responseJSON.message);
            hideLoader("btnResetPasswordMobile");
        });
    });

    $("#regenerateOtp").on("click", function() {
        $("#otp").val("");

        $("#regenerateOtp").attr("disabled", true);
        setTimeout(function() {
            // enable click after 1 second
            $("#regenerateOtp").removeAttr("disabled");
            $("#timer").empty();
        }, 60000); // 1 second delay

        mobile = $("#mobile").val();
        countryCode = $("#country_code").html();
        //send otp
        var ajax_request = postRequest(api_user.sendonlyotp, {
            mobile: mobile,
            country_code: countryCode
        });

        ajax_request.done(function(response) {
            if (response.success) {
                showSuccessMessage(response.message);
            } else {
                showErrorMessage(response.message);
            }
        });
        ajax_request.fail(function(err) {
            showErrorMessage(err.responseJSON.message);
        });
    });
    $("#otpResetForm").on("submit", function(event) {
        event.preventDefault();
        $("#regenerateOtp").attr("disabled", true);
        showLoader("btnVerifyOtp");
        otp = $("#otp").val();
        var ajax_request = postRequest(api_user.verifyotp, {
            mobile: mobile,
            otp: otp
        });

        ajax_request.done(function(response) {
            if (response.success) {
                const user_data = response.data.user_data;
                user_ref_no = user_data.user_ref_no;
                $("#resetpassword_otp_div_id").hide();
                $("#setresetpassword_div_id").show();
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

    $("#setPasswordForm").on("submit", function(event) {
        event.preventDefault();
        showLoader("setPasswordBtn");
        var password_value = $("#password").val();
        var confirm_password = $("#confirm_password").val();
        if (password_value == "" || confirm_password == "") {
            showErrorMessage("Please fill password,confirm password!");
            hideLoader("setPasswordBtn");
            return false;
        } else if (password_value != confirm_password) {
            showErrorMessage("Password mismatch with confirm password!");
            hideLoader("setPasswordBtn");
            return false;
        } else if (!password_value.match(password_match)) {
            var msg = "Minimum 8 characters with uppercase,";
            msg += "<br/>";
            msg += "lowercase letters, a number and special characters.";
            msg += "<br/>";
            msg += "Allowed special charaters are (!@#$%^&*) ";
            showErrorMessage(msg);
            hideLoader("setPasswordBtn");
            return false;
        }
        var ajax_request = "";
        var mail_token = $("#mail_token").val();
        if (mail_token) {
            ajax_request = postRequest(api_user.resetpassword, {
                token: mail_token,
                type: "email",
                password: password_value,
                confirm_password: confirm_password
            });
        } else {
            ajax_request = postRequest(api_user.resetpassword, {
                password: password_value,
                confirm_password: confirm_password,
                user_ref_no: user_ref_no,
                otp: otp,
                type: "mobile"
            });
        }
        ajax_request.done(function(response) {
            if (response.success) {
                $("#success_div_id").show();
                $("#setresetpassword_div_id").hide();
            } else {
                showErrorMessage(response.message);
                hideLoader("setPasswordBtn");
            }
        });

        ajax_request.fail(function(err) {
            showErrorMessage(err.responseJSON.message);
            hideLoader("setPasswordBtn");
        });
    });
});

function redirectToPageReset(txt) {
    if (txt == "email") {
        $("#resetpassword_email_div_id").show();
        $("#resetpassword_mobile_div_id").hide();
        $("#resetpassword_otp_div_id").hide();
    } else {
        $("#resetpassword_email_div_id").hide();
        $("#resetpassword_mobile_div_id").show();
        $("#resetpassword_otp_div_id").hide();
    }
}

let user_ref_no = null;
$(function() {
    $(".popupalertbg").hide();
    user_ref_no = $("#user_ref_no").val();
    var ajax_request = postRequest(api_user.verifyemail, {
        user_ref_no: user_ref_no
    });

    ajax_request.done(function(response) {
        if (response.success) {
            $("#success_div_id").show();
            $("#error_div_id").hide();
            showSuccessMessage(response.message);
        } else {
            showErrorMessage(response.message);
        }
    });
    ajax_request.fail(function(err) {
        showErrorMessage(err.responseJSON.message);
        $("#success_div_id").hide();
        $("#error_div_id").show();
    });
});

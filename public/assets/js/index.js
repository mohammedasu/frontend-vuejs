function checkUserToken(checktxt = "login") {
    // Check token exists in local storage
    var token = localStorage.getItem("token");

    // If yes then fetch registration status
    if (token != "" && token != null) {
        var ajax_request = getRequest(api_user.fetchregistrationstatus);
        ajax_request.done(function(data) {
            // If registration status = 1 then refresh token and redirect to dashboard
            if (
                data.success == true &&
                data.data.user_data.is_registration_completed == 1 &&
                data.data.user_data.status == 1
            ) {
                getRequest(api_user.fetchuserbasicdetails).done(function(
                    response
                ) {
                    generateToken(response.data.user_data.user_ref_no).then(
                        () => {
                            window.user_data = response.data.user_data;
                            document.location.href = "/dashboard";
                        }
                    );
                });
            } else {
                // If registration status = 0 then redirect user to login page
                if (checktxt == "signup") {
                    document.location.href = "/signup";
                } else {
                    document.location.href = "/login";
                }
            }
        });
        ajax_request.fail(function() {
            localStorage.setItem("token", "");
            if (checktxt == "signup") {
                document.location.href = "/signup";
            } else {
                document.location.href = "/login";
            }
        });
    } else {
        // If token is not available in local storage then redirect user to login page
        if (checktxt == "signup") {
            document.location.href = "/signup";
        } else {
            document.location.href = "/login";
        }
    }
}

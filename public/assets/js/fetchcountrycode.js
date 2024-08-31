window.onload = function fetchCountryCodes() {
    var ajax_request = getRequest(api_master.fetchcountrycodelist);
    ajax_request.done(function(response) {
        if (response.success) {
            const country_code_data = response.data.country_data;
            $.each(country_code_data, function(key, value) {
                $("#country_code").append(
                    $("<option>", {
                        value: value.country_code
                    }).text(value.name)
                );
                $("#country_code_basic").append(
                    $("<option>", {
                        value: value.country_code
                    }).text(value.name)
                );
            });
        }
    });
};

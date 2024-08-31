function generateToken(user_ref_no, client_id = 1) {
    return new Promise(function(resolve, reject) {
        var url = ApiUrl + api_user.generatetoken;
        var request_id = generateRequestId();

        $.ajax({
            url: url,
            type: "POST",
            async: true,
            cache: false,
            dataType: "json",
            data: { user_ref_no: user_ref_no, client_id: client_id },
            headers: {
                "x-request-id": request_id
            },
            success: function(response) {
                if (response.success == true) {
                    localStorage.setItem("token", response.data.token);
                    resolve(response);
                } else {
                    reject(response.message);
                }
            },
            error: function(error) {
                reject(error);
            }
        });
    });
}

function postImageRequest(url, form_data) {
    url = ApiUrl + url;
    var request_id = generateRequestId();
    var request = $.ajax({
        url: url,
        type: "POST",
        dataType: "json",
        data: form_data,
        contentType: false,
        processData: false,
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "x-request-id": request_id
        }
    });
    return request;
}

function postRequest(url, form_data, requestType = "POST") {
    url = ApiUrl + url;
    var request_id = generateRequestId();
    var request = $.ajax({
        url: url,
        type: requestType,
        dataType: "json",
        data: form_data,
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "x-request-id": request_id
        }
    });
    return request;
}
function getRequest(url, params = {}) {
    url = ApiUrl + url;
    var request_id = generateRequestId();
    var request = $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        data: params,
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "x-request-id": request_id
        }
    });
    return request;
}
function generateRequestId() {
    var timestamp = (Date.now() * 10000).toString();
    timestamp = timestamp.replace("0", "8");
    var number = "123456789";

    var random_string = shuffle(number);
    var unique_code =
        shuffle(timestamp.substr(0, 4)) +
        timestamp.substr(5, 8) +
        random_string.substr(0, 4);

    return unique_code;
}

function shuffle(s) {
    var arr = s.split(""); // Convert String to array
    var n = arr.length; // Length of the array

    for (var i = 0; i < n - 1; ++i) {
        var j = getRandomInt(n); // Get random of [0, n-1]

        var temp = arr[i]; // Swap arr[i] and arr[j]
        arr[i] = arr[j];
        arr[j] = temp;
    }

    s = arr.join(""); // Convert Array to string
    return s; // Return shuffled string
}

function getRandomInt(n) {
    return Math.floor(Math.random() * n);
}

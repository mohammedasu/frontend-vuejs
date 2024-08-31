let photoTaken = false;
let isShotPhoto = false;
let isCameraOpen = false;
let selectedFile = "";
var isInitialized = false;
var cropper = "";
$(function() {
    $("#basicDetailsForm").on("submit", function(event) {
        event.preventDefault();

        showLoader("btnSaveBasicDetails");

        var form_data = new FormData($("#basicDetailsForm")[0]);
        form_data.append("user_type", role);
        if (selectedFile != "") {
            form_data.append("user_image", selectedFile);
        }
        var ajax_request = postImageRequest(
            api_user.saveuserbasicdetails,
            form_data
        );

        ajax_request.done(function(response) {
            hideLoader("btnSaveBasicDetails");
            if (response.success) {
                if (role == "doctor") {
                    $("#basic-details-sec").hide();
                    $("#professional-details-sec").show();
                    fetchInstituteList();
                    fetchProfessionalDetails();
                } else if (role == "patient") {
                    $("#basic-details-sec").hide();
                    $("#patient-details-sec").show();
                    fetchSpecialityMasterList();
                } else {
                    $("#basic-details-sec").hide();
                    $("#student-details-sec").show();
                    fetchQualificationList();
                    fetchInstituteList(); //using same function for fetching institute list
                    fetchStudentDetails();
                }
            } else {
                showErrorMessage(response.message);
            }
        });
        ajax_request.fail(function(err) {
            showErrorMessage(err.responseJSON.message);
            hideLoader("btnSaveBasicDetails");
        });
    });
});

function readURL(event) {
    if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();

        var size = parseFloat(event.target.files[0].size / 1024 / 1024).toFixed(
            2
        );
        if (size > 20) {
            showErrorMessage("Maximum allowed size (20MB) exceeded");
            return;
        }

        reader.onload = function(e) {
            $("#crop_user_image").attr("src", e.target.result);
            if (isInitialized == true) {
                cropper.destroy();
            }
            //$("#user_image").attr("src", e.target.result);
        };
        reader.readAsDataURL(event.target.files[0]);
        setTimeout(initCropper, 500);
        $("#change_photo").modal("hide");
        $("#crop_photo").modal("show");
        //selectedFile = event.target.files[0];
        //this.closeModal(false);
    }
}

function initCropper() {
    var image = document.getElementById("crop_user_image");
    cropper = new Cropper(image, {
        aspectRatio: 16 / 16,
        viewMode: 1,
        dragMode: "move",
        minContainerWidth: 260,
        minContainerHeight: 260,
        responsive: true,
        modal: true
    });
    isInitialized = true;
    // On crop button clicked
    document
        .getElementById("crop_button")
        .addEventListener("click", function() {
            var imgurl = cropper.getCroppedCanvas().toDataURL("image/jpg");
            $("#user_image").attr("src", imgurl);
            $("#crop_photo").modal("hide");
            $("#change_photo").modal("hide");
            selectedFile = imgurl;
        });
}

function openImageUpload() {
    if (this.isCameraOpen) {
        this.stopCameraStream(true);
    }
    $("#div_camera").hide();
    $(".camera-shoot").hide();
    $("#pic").trigger("click");
}
function toggleCamera() {
    this.isCameraOpen = true;
    this.createCameraElement();
}
function createCameraElement() {
    $("#div_loader").show();

    const constraints = (window.constraints = {
        audio: false,
        video: true
    });

    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(stream => {
            $("#div_loader").hide();
            $("#div_camera").show();
            $("#camera").show();
            $(".camera-shoot").show();
            $("#camera").prop("srcObject", stream);
        })
        .catch(error => {
            $("#div_loader").hide();
            alert("May the browser didn't support or there is some errors.");
        });
}
function takePhoto() {
    if (!this.isPhotoTaken) {
        this.isShotPhoto = true;

        const FLASH_TIMEOUT = 50;

        setTimeout(() => {
            this.isShotPhoto = false;
        }, FLASH_TIMEOUT);
    }

    this.isPhotoTaken = !this.isPhotoTaken;
    $("#camera").hide();
    $("#canvas").show();

    const context = $("#canvas")[0].getContext("2d");
    context.drawImage($("#camera")[0], 0, 0, 450, 337.5);
    this.closeModal(true);
    $("#change_photo").modal("hide");
    $("#crop_photo").modal("show");
}
function stopCameraStream(is_captured = false) {
    this.isPhotoTaken = false;
    this.isShotPhoto = false;
    let tracks = $("#camera")
        .prop("srcObject")
        .getTracks();

    tracks.forEach(track => {
        track.stop();
    });
    if (is_captured) {
        this.displayAsImage();
    }
}
function displayAsImage() {
    var imgURL = document.getElementById("canvas").toDataURL("image/jpg");
    $("#crop_user_image").attr("src", imgURL);
    if (isInitialized == true) {
        cropper.destroy();
    }
    setTimeout(initCropper, 500);
    //$("#user_image").attr("src", imgURL);
    //selectedFile = imgURL;
}
function closeModal(is_captured = false) {
    if (this.isCameraOpen) {
        this.stopCameraStream(is_captured);
    }
    $("#div_camera").hide();
    $("#camera").hide();
    $("#timeslotmodal").hide();
    $(".camera-shoot").hide();
    $("#canvas").hide();
    $("#change_photo").modal("hide");
}

function fetchBasicDetails() {
    showLoader("btnVerifyOtp");
    var ajax_request = getRequest(api_user.fetchuserbasicdetails);
    ajax_request.done(function(response) {
        if (response.success == true) {
            if (response.data.user_data) {
                role = response.data.user_data.user_type;

                if (
                    response.data.user_data.first_name != null &&
                    response.data.user_data.first_name != ""
                ) {
                    is_basic_details_exists = true;
                }
                window.user_type = response.data.user_data.user_type;
                // Fill basic details
                $.each(response.data.user_data, function(index, value) {
                    var id = "#" + index;
                    if (index == "dob" && value != null) {
                        var date = value.split("-");
                        value = date[2] + "-" + date[1] + "-" + date[0];
                    } else if (
                        index == "fullimage" &&
                        value != "" &&
                        value != null
                    ) {
                        $("#user_image").attr("src", value);
                    } else if (
                        index == "mobile" &&
                        value != "" &&
                        value != null
                    ) {
                        $("#mobile_number").val(value);
                        $("#mobile_number").attr("readonly", "readonly");
                    } else if (
                        index == "email" &&
                        value != "" &&
                        value != null
                    ) {
                        $("#email").attr("readonly", "readonly");
                    } else if (
                        index == "country_code" &&
                        value != "" &&
                        value != null
                    ) {
                        $("#country_code_basic").val(value);
                    }

                    $(id).val(value);
                });
            }
            $("#otp-sec").hide();
            if (!is_basic_details_exists) {
                $("#pick-role-sec").show();
            } else {
                $("#basic-details-sec").show();
            }
            hideLoader("btnVerifyOtp");
        } else {
            showErrorMessage(response.message);
            hideLoader("btnVerifyOtp");
        }
    });
    ajax_request.fail(function(err) {
        showErrorMessage(err.responseJSON.message);
        hideLoader("btnVerifyOtp");
    });
}

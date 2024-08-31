{{-- <a onclick="navigate('basic-details-sec','pick-role-sec');" href="#" class="backbtn"> Back</a> --}}

<div class="loginrightinner">
    <h3 class="pb-4 text-center">We need a little more information to enable your account </h3>
    <form class="form" id="basicDetailsForm" name="basicDetailsForm">
        <div class="uploadphoto">
            <a href="#" data-toggle="modal" data-target="#change_photo" class="uploadphoto">
                <label class="newbtn">
                    <img id="user_image" alt="" src="/assets/img/profile.png">
                </label>
            </a>
            <label class="labelstyle pt-2">Upload a photo</label>
        </div>
        <div class="row">
            <div class="col-sm-6">
                <label class="labelstyle pt-2">First Name <span>*</span>
                </label>
                <input type="text" name="first_name" id="first_name" placeholder="Enter first name" maxlength="60"
                    required>
            </div>
            <div class="col-sm-6">
                <label class="labelstyle pt-2">Last Name <span>*</span>
                </label>
                <input type="text" name="last_name" id="last_name" placeholder="Enter last name" maxlength="60"
                    required>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <label class="labelstyle pt-2">User Name <span>*</span>
                </label>
                <input type="text" name="user_name" id="user_name" placeholder="Enter user name" maxlength="60"
                    required>
            </div>

        </div>
        <label class="labelstyle pt-2">Email Id 
        </label>
        <input type="email" name="email" id="email" placeholder="Enter your Email Id" maxlength="60">

        <div class="row">
            <div class="col-sm-12">
                <label class="labelstyle pt-2">Mobile No.
                </label>
                <div class="position-relative ">
                    <div class="select-arrow mobilecode">
                        <select class="field-select" id="country_code_basic" name="country_code">

                        </select>
                    </div>
                    <input type="text" name="mobile_number" id="mobile_number" placeholder="Enter mobile no"
                        maxlength="60" onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                        class="mobilecodeinput">
                </div>
            </div>

        </div>
        <div class="row">
            <div class="col-sm-6 gender">
                <label class="labelstyle pt-2">Gender <span>*</span>
                </label>
                <div class="select-arrow">
                    <select name="gender" id="gender" class="field-select" required>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
            </div>
            <div class="col-sm-6">
                <label class="labelstyle pt-2">Dob <span>*</span></label>
                <div class="form-group">
                    <div class='input-group date' id="datetimepicker1">
                        <input type='text' name="dob" id="dob" placeholder="dd-mm-yyyy" autocomplete="off" required />
                        <span class="input-group-addon">
                            <i class="glyphicon glyphicon-calendar"><img width="20" src="assets/img/calendar.svg"></i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <button type="submit" name="btnSaveBasicDetails" id="btnSaveBasicDetails"
            class="loaderbtn btnfill btnfull mt-2">Continue</button>

    </form>
    <!--- Form end l --->

</div>

<!-- The Modal Popup Change photo start -->
<div class="modal fade createpostpopup" id="change_photo">
    <div class="modal-dialog modal-lm">
        <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
                <h5 class="modal-title text-left">Change photo</h5>
                <button type="button" class="close" onclick="closeModal()">
                    &times;
                </button>
            </div>

            <!-- Modal body -->
            <div class="modal-body px-0">
                <div class="d-flex align-items-center justify-content-center text-center py-4 px-3">
                    <div>
                        <h3>Keep your profile fresh!</h3>
                        <p>Take or upload a photo.</p>

                        <!-- Loader -->
                        <div id="div_loader" class="loader" style="position: inherit;display:none;"></div>
                        <!-- Loader end -->

                        <div id="div_camera" style="display:none;">
                            <video id="camera" width="450" height="337.5" autoplay style="display:none;"></video>

                            <canvas id="canvas" width="450" height="337.5" style="display:none;"></canvas>
                        </div>

                        <div class="camera-shoot" style="display:none;">
                            <button type="button" class="button" onclick="takePhoto()">
                                <img alt="Capture" src="assets/img/photo.svg" />
                            </button>
                        </div>
                    </div>
                </div>
                <div class="modal-footer pb-0 d-flex align-items-center justify-content-end">
                    <div>
                        <button type="button" class="btn-rd btnfill m-0 mb-none" onclick="toggleCamera()">
                            Use camera
                        </button>
                        <button type="button" class="btn-rd btnfill m-0" onclick="openImageUpload()">
                            Upload photo
                        </button>
                        <input id="pic" class="pis" onchange="readURL(event)" type="file" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- The Modal Popup Change photo end -->

<!-- The Modal Popup Photo Crop start -->
<div class="modal fade pl-0" id="crop_photo">
    <div class="modal-dialog modal-lm">
        <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
                <h5 class="modal-title text-left">Crop photo</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    &times;
                </button>
            </div>

            <!-- Modal body -->
            <div class="modal-body px-0">
                <div class="d-flex align-items-center justify-content-center text-center px-3">
                    <div id="demo-basic">
                        <img id="crop_user_image" alt="" src="assets/img/profile.png">
                    </div>

                </div>
                <div class="modal-footer pb-0 d-flex align-items-center justify-content-end">
                    <div>
                        <button class="btn-rd btnfill m-0" id="crop_button">
                            Crop
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- The Modal Popup Photo Crop end -->

<script>
    $("#datetimepicker1").datepicker({
        format: "dd-mm-yyyy",
        language: "nl",
        autoclose: true,
        todayHighlight: false,
    });
</script>

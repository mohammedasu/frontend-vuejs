{{-- <a onclick="navigate('pick-role-sec','otp-sec');" href="#" class="backbtn"> Back</a> --}}

<div class="loginrightinner">
    <h3 class="pb-4 text-center">Select the role which best defines you</h3>
    <!--- Form start --->
    <form class="form">
        <div class="checkmain">
            <input type="radio" name="pickroleradio" class="radioinput" value="doctor" id="pickrole0" />
            <label for="pickrole0">
                <img src="/assets/img/doctorsmall.svg" alt="" />Doctor</label>
        </div>
        <div class="checkmain">
            <input type="radio" name="pickroleradio" class="radioinput" value="patient" id="pickrole1" />
            <label for="pickrole1">
                <img src="/assets/img/patientsmall.svg" alt="" />Patient</label>
        </div>
        <div class="checkmain">
            <input type="radio" name="pickroleradio" class="radioinput" value="medicalstudent" id="pickrole2" />
            <label for="pickrole2">
                <img src="/assets/img/studentsmall.svg" alt="" />Medical Student</label>
        </div>
        <a class="btnfill btnfull mt-4" onclick="pickrole();" href="#">Continue</a>
    </form>
    <!--- Form start --->
</div>

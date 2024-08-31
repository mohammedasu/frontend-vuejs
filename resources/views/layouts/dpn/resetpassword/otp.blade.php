<div class="loginrightinner">
    <!--- Form start --->
    <h3 class="font-weight-normal mb-1 text-center"><strong>Enter OTP to reset password</strong></h3>
    <p class="otpsubt text-center pt-4">We have sent you an One Time Password (OTP) to</p>
    <form class="form" id="otpResetForm" name="otpResetForm">
        <p class="font-weight-bold mt-2 p text-center"><span id="editCountryCode"></span> <span id="editMobile"></span>
            <span><a class="anchor otpedit" onclick="redirectToPageReset('mobile')" href="#"> Edit</a></span>
        </p>
        <label class="labelstyle pt-2">Enter OTP</label>
        <input type="text" class="mb-2" id="otp" name="otp" placeholder="Enter OTP">
        <button type="button" id="regenerateOtp" class="resendotp mb-4 labelstyle float-right">Resend OTP</button>
        <span class="" id="timer"></span>
        <button id="btnVerifyOtp" name="btnVerifyOtp" type="submit" class="loaderbtn btnfill btnfull">Verify </button>

    </form>
    <!--- Form end --->
</div>

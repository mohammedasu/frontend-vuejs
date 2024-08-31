<div class="loginrightinner">
    <!--- Form start --->
    <h3 class="text-center">Verify your mobile number before continuing with registration</h3>
    <p class="otpsubt text-center pt-4">We have sent you an One Time Password (OTP) to</p>
    <form class="form" id="otpSignupForm" name="otpSignupForm">
        <p class="font-weight-bold mt-2 p text-center"><span id="editCountryCode"></span> <span id="editMobile"></span>
            <span><a class="anchor otpedit" onclick="redirectToPage('mobile')" href="#"> Edit</a></span>
        </p>
        <label class="labelstyle pt-2">Enter OTP</label>
        <input type="text" class="mb-2" id="otp" name="otp" placeholder="Enter OTP">
        <button type="button" id="regenerateOtp" class="resendotp mb-4 labelstyle float-right">Resend OTP</button>
        <span class="" id="timer"></span>

        <button id="btnVerifyOtp" name="btnVerifyOtp" type="submit" class="loaderbtn btnfill btnfull">Verify mobile
            no.</button>
        <a class="anchor text-center mx-auto d-table pt-2" href="#"
            onclick="redirectToPage('mobile')"><strong>Back</strong></a>
        <p class="termspara text-center pt-3 mx-auto">Already registered?
            <a class="anchor" href="/login"> <strong>Login</strong>
            </a>
        </p>
    </form>
    <!--- Form end --->
</div>

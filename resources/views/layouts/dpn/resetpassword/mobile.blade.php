<div class="loginrightinner">
    <h3 class="font-weight-normal mb-1 text-center"><strong>Forgot your password?</strong></h3>
    <p class="mt-4 pxxxssmall">Verify your mobile number to reset password.</p>
    <!--- Form start --->
    <form class="form" id="resetpasswordMobileForm" name="resetpasswordMobileForm">

        {{ csrf_field() }}
        <label class="labelstyle pt-2">Enter Phone No.</label>
        <div class="position-relative ">
            <div class="select-arrow mobilecode">
                <select class="field-select" id="country_code" name="country_code">

                </select>
            </div>
            <input type="text" name="mobile" id="mobile" placeholder="Enter your phone number"
                onkeypress="return event.charCode >= 48 && event.charCode <= 57" required class="mobilecodeinput">
        </div>
        <button id="btnResetPasswordMobile" name="btnResetPasswordMobile" type="submit"
            class="loaderbtn btnfill btnfull">Get
            OTP</button>
        <div class="signup"><span>or reset with</span></div>
        <a href="#" onclick="redirectToPageReset('email')" class=" googlebtn btnfill btnfull decline mt-4"> <span
                class="ml-1 pxxssmall">Email Id</span></a>
    </form>
    <!--- Form end --->
</div>

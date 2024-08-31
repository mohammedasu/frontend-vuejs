<div class="loginrightinner">
    <h3 class="font-weight-normal mb-1 text-center"><strong>Join the community unified for a healthier ecosystem</strong>
    </h3>
    <!--- Form start --->
    <form class="form" id="signupMobileForm" name="signupMobileForm">

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

        <p class="termspara">By Clicking Agree & Request OTP, you agree to our
            <a class="anchor" target="__blank" href="{{ URL('/terms-of-service') }}">Terms & Conditions</a>
            and <a class="anchor" target="__blank" href="{{ URL('/data-policy') }}">Data Policy.</a>
        </p>
        <button id="btnSignupMobile" name="btnSignupMobile" type="submit" class="loaderbtn btnfill btnfull">Agree & Get
            OTP</button>
        <div class="signup"><span>or signup with</span></div>
       {{--  <a href="" class="googlebtn btnfill btnfull decline mt-3">
            <img src="/assets/img/google-original.png" alt="" /> <span class="ml-1 pxxssmall">Google</span>
        </a> --}}
        <a href="#" onclick="redirectToPage('email')" class="googlebtn btnfill btnfull decline mt-4">
            <img src="/assets/img/emailid.svg" alt="" /> <span class="ml-1 pxxssmall">Email</span>
        </a>
        <p class="termspara text-center pt-2 mx-auto">Already registered?
            <a class="anchor" href="/login">
                <strong>Login</strong></a>
        </p>
    </form>
    <!--- Form end --->
</div>

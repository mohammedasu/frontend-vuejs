<div class="loginrightinner">
    <!--- Form start --->
    <h3 class="font-weight-normal mb-1 text-center"><strong>Join the community unified for a
            healthier ecosystem</strong></h3>
    <form class="form" id="emailSignUpForm" name="emailSignUpForm">
        <label class="labelstyle pt-3">Email ID</label>
        <input id="emailid" name="emailid" placeholder="Enter your email ID" type="text" required>

        <label class="labelstyle pt-3">Password</label>
        <input id="password" name="password" placeholder="Create an unique password" type="password" required>
        <p class="pxssmall mb-4 mt-0" id="error_password_id">Minimum 8 characters with uppercase and lowercase letters, a
            number and special
            characters.
        </p>
        <p class="termspara">By signing up, you agree to our <a class="anchor" href="/terms-of-service">Terms
                & Conditions</a>
            and <a class="anchor" href="/privacy-policy">Data Policy.</a>
        </p>
        <button type="submit" id="btnSignup" name="btnSignup" class="loaderbtn btnfill btnfull mt-3">Signup</button>
        <div class="signup"><span>or signup with</span></div>
        {{-- <a href="" class="googlebtn btnfill btnfull decline mt-3">
            <img src="/assets/img/google-original.png" alt="" /> <span class="ml-1 pxxssmall">Google</span>
        </a> --}}
        <a href="#" onclick="redirectToPage('mobile')" class="googlebtn btnfill btnfull decline mt-4">
            <img src="/assets/img/phone.svg" alt="" /> <span class="ml-1 pxxssmall">Mobile
                number</span>
        </a>
        <p class="termspara text-center pt-2 mx-auto">Already registered?
            <a class="anchor" href="/login">
                <strong>Login</strong></a>
        </p>
    </form>

</div>

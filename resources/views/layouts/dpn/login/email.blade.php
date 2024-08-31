<div class="loginrightinner">
    <!--- Form start --->
    <h3 class="font-weight-normal mb-1 text-center"><strong>Login in your DocsCampus account</strong></h3>
    <form class="form" id="emailLoginForm" name="emailLoginForm">
        <label class="labelstyle pt-3">Email ID</label>
        <input id="emailid" name="emailid" placeholder="Enter your email ID" type="text" required>

        <label class="labelstyle pt-3">Password</label>
        <input id="password" name="password" placeholder="Enter your password" type="password" required>
        <a href="/resetpassword" id="reset_password" class="resendotp mb-4 labelstyle float-right">Reset password</a>
        <button type="submit" id="btnLogin" name="btnLogin" class="loaderbtn btnfill btnfull mt-3">Login</button>

        <div class="signup"><span>or login with</span></div>
        {{-- <a href="" class="googlebtn btnfill btnfull decline mt-3">
            <img src="/assets/img/google-original.png" alt="" /> <span class="ml-1 pxxssmall">Google</span>
        </a> --}}
        <a href="#" onclick="redirectToPage('loginmobile')" class="googlebtn btnfill btnfull decline mt-4">
            <img src="/assets/img/phone.svg" alt="" /> <span class="ml-1 pxxssmall">Mobile
                number</span>
        </a>
        <p class="termspara text-center pt-2 mx-auto">Dont have an account yet?
            <a class="anchor" href="/signup">
                <strong>Join Now</strong></a>
        </p>
    </form>

</div>

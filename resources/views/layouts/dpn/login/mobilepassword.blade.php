<div class="loginrightinner">
    <!--- Form start --->
    <h3 class="text-center">Login in your Docscampush account</h3>
    <form class="form" id="passwordLoginForm" name="passwordLoginForm">
        <p class="font-weight-normal mt-2 p text-center">Enter the password associated with mobile number <strong><span
                    id="editCountryCodePassword"></span> <span id="editMobilePassword"></span></strong>
        </p>
        <label class="labelstyle pt-3">Password</label>
        <input id="mobile_password" name="mobile_password" placeholder="Enter your password" type="password">
        <a href="/resetpassword" id="reset_password" class="resendotp mb-4 labelstyle float-right">Reset password</a>

        <button type="submit" class="loaderbtn btnfill btnfull mt-3" id="passwordLoginBtn"
            name="passwordLoginBtn">Login</button>
        <a class="anchor text-center mx-auto d-table pt-2" href="#"
            onclick="redirectToPage('loginmobile')"><strong>Back</strong></a>
        <p class="termspara text-center pt-2 mx-auto">Dont have an account yet?
            <a class="anchor" href="/signup">
                <strong>Join Now</strong></a>
        </p>

    </form>
</div>

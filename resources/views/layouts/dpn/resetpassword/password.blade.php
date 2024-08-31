<div class="loginrightinner">
    <!--- Form start --->
    <h3 class="text-center">Reset your password</h3>
    <form class="form" id="setPasswordForm" name="setPasswordForm">
        <label class="labelstyle pt-3">Password</label>
        <input id="password" name="password" placeholder="Set a new password" type="password" required>

        <label class="labelstyle pt-3">Confirm Password</label>
        <input id="confirm_password" name="confirm_password" placeholder="Re-enter the new password" type="password"
            required>
        @if (request()->route()->getName() == 'reset.password')
            <input id="mail_token" name="mail_token" type="hidden"
                value="{{ request()->route()->parameters['token'] }}">
        @endif
        <button type="submit" class="loaderbtn btnfill btnfull mt-3" id="setPasswordBtn" name="setPasswordBtn">Set
            Password</button>


    </form>
</div>

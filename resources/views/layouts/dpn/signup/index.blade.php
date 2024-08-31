@extends('layouts.dpn.common.front-app')
@section('content')

    <section class="loginbg ">
        <div>
            <div class="d-flex justify-content-center align-items-center">
                <div class="position-relative">

                    @include('layouts.dpn.common.logo')
                    <div class="d-flex justify-content-center ">
                        <div class="newsingup login-innerbg pl-0 pr-0">
                            <div class="d-flex">
                                <div class="loginright">
                                    <div id="signup_email_div_id">
                                        @include('layouts.dpn.signup.email')
                                    </div>
                                    <div id="signup_mobile_div_id" style="display: none;">
                                        @include('layouts.dpn.signup.mobile')
                                    </div>
                                    <div id="otp-sec" style="display: none;">
                                        @include('layouts.dpn.signup.otp')
                                    </div>
                                    <div id="password_div_id" style="display: none;">
                                        @include('layouts.dpn.signup.password')
                                    </div>
                                    <div id="pick-role-sec" class="loginright" style="display: none;">
                                        @include('layouts.dpn.common.loader')
                                        @include('layouts.dpn.login.pick-role')
                                    </div>
                                    <div id="basic-details-sec" class="loginright" style="display: none;">
                                        @include('layouts.dpn.common.loader')
                                        @include('layouts.dpn.login.basic-details')
                                    </div>
                                    <div id="professional-details-sec" class="loginright" style="display: none;">
                                        @include('layouts.dpn.common.loader')
                                        @include('layouts.dpn.login.professional-details')
                                    </div>

                                    <div id="select-speciality-sec" class="loginright specialitypage"
                                        style="display: none;">
                                        @include('layouts.dpn.common.loader')
                                        @include('layouts.dpn.login.select-speciality')
                                    </div>

                                    <div id="select-services-sec" class="loginright timeslotpage" style="display: none;">
                                        @include('layouts.dpn.common.loader')
                                        @include('layouts.dpn.login.select-services')
                                    </div>

                                    <div id="address-details-sec" class="loginright" style="display: none;">
                                        @include('layouts.dpn.common.loader')
                                        @include('layouts.dpn.login.address-details')
                                    </div>

                                    <div id="patient-details-sec" class="loginright specialitypage" style="display: none;">
                                        @include('layouts.dpn.common.loader')
                                        @include('layouts.dpn.login.patient-details')
                                    </div>

                                    <div id="student-details-sec" class="loginright specialitypage" style="display: none;">
                                        @include('layouts.dpn.common.loader')
                                        @include('layouts.dpn.login.student-details')
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection

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

                                    <div id="setresetpassword_div_id">
                                        @include('layouts.dpn.resetpassword.password')
                                    </div>
                                    <div id="success_div_id" style="display: none;">
                                        @include('layouts.dpn.resetpassword.success')
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
@push('scripts')
    <script type="text/javascript" src="/assets/js/resetpassword.js"></script>
@endpush

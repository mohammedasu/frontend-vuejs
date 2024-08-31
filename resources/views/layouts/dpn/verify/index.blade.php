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
                                @if (request()->route()->getName() == 'email.verify')
                                <input id="user_ref_no" name="user_ref_no" type="hidden" value="{{ request()->route()->parameters['user_ref_no'] }}">
                                @endif
                                <div id="success_div_id" style="display: none;">
                                    @include('layouts.dpn.verify.success')
                                </div>
                                <div id="error_div_id" style="display: none;">
                                    @include('layouts.dpn.verify.error')
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
<script type="text/javascript" src="/assets/js/verify.js"></script>
@endpush
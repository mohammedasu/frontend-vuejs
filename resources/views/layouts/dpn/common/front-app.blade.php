<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>

    @include('layouts.dpn.common.meta')
    <!-- Font CSS -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800&display=swap"
        rel="stylesheet">

    <!-- Bootstrap CSS -->
    <link href="{{ asset('css/app.css') }}" type="text/css" rel="stylesheet" media="all">

    <!-- custom CSS -->
    <link href="{{ asset('assets/css/style.css?v=1') }}" type="text/css" rel="stylesheet" media="all">
    <link href="{{ asset('assets/css/responsive.css') }}" type="text/css" rel="stylesheet" media="all">

    <link href="{{ asset('assets/css/intlTelInput.css') }}" type="text/css" rel="stylesheet">

    <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.7.1/css/bootstrap-datepicker3.css">

    <link href="{{ asset('assets/css/select2.min.css') }}" type="text/css" rel="stylesheet" media="all">


    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css">
    <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.css">

    <script src="https://code.jquery.com/jquery-1.11.1.min.js?v=1"></script>

    <!-- Bootstrap Js -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js?v=1"></script>

    <script type="text/javascript"
        src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.7.1/js/bootstrap-datepicker.min.js?v=1"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.0/js/select2.full.min.js?v=1"></script>

    <script type="text/javascript">
        window.env = "{{ App::environment() }}"
    </script>

    <script src="/assets/js/constants.js?v=1"></script>
    <script src="/assets/js/custom.js?v=1"></script>
    <script src="/assets/js/index.js?v=1"></script>
    @if (Request::path() == 'login' || Request::path() == 'signup')
        <script src="/assets/js/login.js?v=1"></script>
        <script src="/assets/js/signup.js?v=1"></script>
        <script src="/assets/js/fetchcountrycode.js?v=1"></script>
    @endif

    <script src="/assets/js/auth.js?v=1"></script>
    <script src="/assets/js/util.js?v=1"></script>
    <script src="/assets/js/services.js?v=1"></script>
    <script src="/assets/js/basicDetails.js?v=1"></script>

    <link href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/0.8.0/cropper.min.css" rel="stylesheet" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/0.8.0/cropper.min.js?v=1"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.js" defer></script>


    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-PHB3JT5CNT"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());

        gtag('config', 'G-PHB3JT5CNT');
    </script>

    <style>
        .select2 {
            width: 100%;
            margin-bottom: 1rem;
            min-width: 100% !important;
        }

        .select2-selection {
            height: 40px !important;
            padding: 6px 4px !important;
        }

        .select2-selection__arrow {
            height: 40px !important;
        }

    </style>
</head>




<body class="{{ Request::getPathInfo() == '/' ? 'doscamslanding' : 'whitebg' }}">
    @include('layouts.dpn.common.alert')
    <?php
        if(Request::getPathInfo() != '/login' && Request::getPathInfo() != '/signup' && request()->route()->getName() != 'forgot.password' && request()->route()->getName()!='reset.password' && request()->route()->getName()!='email.verify'){
    ?>
    <header class="{{ Request::getPathInfo() == '/' ? 'homebanner' : '' }}">
        <nav class="navbar navbar-expand-lg navbar-light container">
            <a href="{{ URL('/') }}" class="navbar-brand">
                <img class="logo" src="/assets/img/docscampus-logo.png" alt="">
            </a>
            <a href="javascript:void(0);" onClick="checkUserToken();" class="outlinebtn btnfillnone ">Login</a>
        </nav>
    </header>
    <?php
        }
    ?>
    @yield('content')
    @include('layouts.dpn.common.promo')
    @include('layouts.dpn.common.block')

    <?php
        if(Request::getPathInfo() != '/login' && Request::getPathInfo() != '/signup' && request()->route()->getName() != 'forgot.password' && request()->route()->getName()!='reset.password' && request()->route()->getName()!='email.verify'){
    ?>

    <!--- Footer sec start --->
    <footer>
        <div class="container">
            <div class="d-lg-flex justify-content-lg-between align-items-center">
                <div class="order-2 text-center">
                    <a class="ml-3" href="https://bit.ly/3BNbRYs" target="_blank">
                        <img src="assets/img/playstore.png" alt="">
                    </a>
                    <a class="ml-3" target="_blank" href="https://apple.co/3n8voPc">
                        <img src="assets/img/appstore.png" alt="">
                    </a>
                </div>
                <div class="order-1">
                    <ul class="footerlist">
                        <li><a class="ml-0" href="{{ URL('/privacy-policy') }}">Privacy Policy</a></li>
                        <li><a href="{{ URL('/community-standards') }}">Community Standards</a></li>
                        <li><a href="{{ URL('/data-policy') }}">Data Policy</a></li>
                        <li><a href="{{ URL('/terms-of-service') }}">Terms of Service</a></li>
                        <li><a href="{{ '/comingsoon' }}">Blog</a></li>
                    </ul>
                    <div>
                        <p class="copyright text-lg-left">Copyright © 2021 All rights reserved. <span>|</span> by
                            HWell24 Plus Healthcare & Technologies Pvt Ltd.</p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    <?php
        }
    ?>
    <script type="text/javascript" src="/assets/js/intlTelInput.js"></script>
    @stack('scripts')

</body>

</html>

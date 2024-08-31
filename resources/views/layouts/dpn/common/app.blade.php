<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    @include('layouts.dpn.common.meta')

    <!-- Font CSS -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800&display=swap"
        rel="stylesheet">
    <link href="{{ asset('css/app.css') }}" type="text/css" rel="stylesheet" media="all">
    <link href="{{ asset('assets/css/style.css?v=1') }}" type="text/css" rel="stylesheet" media="all">
    <link href="{{ asset('assets/css/responsive.css') }}" type="text/css" rel="stylesheet" media="all">
    <link rel="stylesheet" href="https://unpkg.com/vue-select@3.0.0/dist/vue-select.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/0.8.0/cropper.min.css" rel="stylesheet" />

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css">
    <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.css">

    <script src="{{ asset('js/app.js?v=1') }}" defer></script>
    <!-- custom Js -->
    <script type="text/javascript">
        window.env = "{{ App::environment() }}"
    </script>

    <script type="text/javascript" src="{{ asset('assets/js/util.js?v=1') }}" defer> </script>
    <script type="text/javascript" src="{{ asset('assets/js/constants.js?v=1') }}" defer> </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/0.8.0/cropper.min.js?v=1"></script>
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
    <script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.js" defer></script>

    <script type="text/javascript" src="{{ asset('assets/js/custom.js?v=1') }}" defer> </script>
</head>

<body>
    <div id="app">
        <header-comp></header-comp>
        <main class="">
            @yield('content')

        </main>
        @include('layouts.dpn.common.promo')
        <footer-comp></footer-comp>
    </div>
</body>

</html>

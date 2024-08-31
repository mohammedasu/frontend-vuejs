{{-- <meta name="theme-color" content="#EB3C4D" /> --}}
<!-- Required meta tags -->
<meta charset="utf-8">
<meta name="viewport"
    content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
<!-- CSRF Token -->
<meta name="csrf-token" content="{{ csrf_token() }}">
<?php
if (Request::getPathInfo() == '/privacy-policy') {
    $title = 'DocsCampus Privacy Policy | Doctor Patient Network (DPN)';
    $description = "DocsCampus helps Doctors, Patients, Medical students to find, connect, & collaborate with trusted peers | Doctor Patient Network (DPN) | Doctor's Social Network | Doctor Health Network";
} elseif (Request::getPathInfo() == '/community-standards') {
    $title = 'DocsCampus Community Standard | Doctor Social Network';
    $description = 'DocsCampus is the best Doctor Social Network we help to find best doctor | Doctor Social Network';
} elseif (Request::getPathInfo() == '/data-policy') {
    $title = 'DocsCampus Data Policy | Doctor Learning Network';
    $description = 'DocsCampus helps Doctors, Patients, Medical students to find, connect, & collaborate with trusted peers | Doctor Patient Network (DPN) | Doctor Learning Network';
} elseif (Request::getPathInfo() == '/terms-of-service') {
    $title = 'DocsCampus term of service | Doctor Secure Network';
    $description = 'DocsCampus helps Doctors, Patients, Medical students to find, connect, & collaborate with trusted peers | Doctor Patient Network (DPN) | Doctor Secure Network';
} elseif (Request::getPathInfo() == '/blog') {
    $title = 'DocsCampus Blog | Doctor Healthcare Network';
    $description = 'DocsCampus helps Doctors, Patients, Medical students to find, connect, & collaborate with trusted peers | Doctor Patient Network (DPN) | Doctor Healthcare Network';
} else {
    $title = 'India’s First Healthcare Network | Doctor Patient Network | DPN';
    $description = "DocsCampus helps Doctors, Patients, Medical students to find, connect, & collaborate with trusted peers | Doctor Patient Network | DPN | Doctor's Social Network | Health Network";
}
?>
<title>{{ $title }} </title>
<link rel="icon" href="{{ asset('assets/img/favicon.ico') }}" type="image/x-icon" />
<meta name="url" content="{{ url('/') }}" />
<meta name="description" content="{{ $description }}" />
<meta name="keywords"
    content="Doctor Patient Network,DPN,Doctor's Social Network,Health Network,Doctor Network,Patient to Patient Network,KOL Opinion Online,Doctor to Doctor Second Opinion,Online CME,Medical Education Learning Management,MBBS syllabus,BDS syllabus,Telemedicine and Telehealth,Next One and Next 1,National exit test one and national exit test 2,Neet PG Question Paper.,FMGE and MCI screaning test,foreign Medical Student test,Neet PG Interance Exam,Best Neet Online test,Best Next 1 and Next 2 Online test,Knowledge Bank Online">
<meta property="og:title" name="" content="India’s First Healthcare Network | Doctor Patient Network | DPN " />
<meta property="og:description" name="" content="{{ $description }}" />
<meta property="og:image" name="" content="{{ asset('assets/img/metalogo.png') }}" />
<meta name="twitter:card" content="summary" />
<meta name="twitter:title" content="India’s First Healthcare Network | Doctor Patient Network | DPN " />
<meta name="twitter:creator" content="@Doccampus" />
<meta name="twitter:description" content="{{ $description }}" />
<meta name="twitter:image" content="{{ asset('assets/img/metalogo.png') }}" />

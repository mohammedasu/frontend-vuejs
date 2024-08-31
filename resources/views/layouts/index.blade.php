@extends('layouts.dpn.common.front-app')
@section('content')

    <!-- Header end -->
    <!-- Hero Banner start -->
    <section class="whitebg banner">
        <div class="container">
            <div class="banner-containt">
                <div>
                    <div class="d-md-flex align-items-start">
                        <div class="order-2">
                            <img class="img-fluid bannerdesktop" src="assets/img/landingtop-banner-img.png">
                        </div>
                        <div class="order-1">
                            <h1>India’s First<br> Doctor Patient Network <sup class="tm">TM</sup></h1>
                            <h4 class="subtile mb-4">A new-age healthcare network where doctors, medical students and
                                health seekers come <br><strong>together for a healthier world.</strong></h4>
                            <a onclick="checkUserToken('signup');" class="btnfill mt-0">Join now</a>
                        </div>
                    </div>
                    <h4 class="text-center pb-3 bluetext position-relativez9999">With 10,000+ Users onboard & counting...
                    </h4>
                </div>
            </div>
        </div>
    </section>
    <!-- Hero Banner end -->

    <!-- What you can do sec start -->
    <section class="whatyoucan ptb-90">
        <div class="container">
            <h2 class="text-center py-5">What you can do?</h2>
            <div class="d-lg-flex justify-content-lg-around">
                <ul id="tabs" class="py-2 nav nav-tabs " role="tablist">
                    <li class="nav-item"> <a id="tab-A" href="#pane-A" class="nav-link active" data-toggle="tab"
                            role="tab">
                            Unlimited Conferences <p>Conduct unlimited meetings, calls, CMEs and webinars. Without any
                                charges and time limit.</p></a>
                    </li>
                    <li class="nav-item"> <a id="tab-B" href="#pane-B" class="nav-link" data-toggle="tab"
                            role="tab">
                            Secure Communication <p>A safe space where your medical information remains private.</p></a>
                    </li>
                    <li class="nav-item"> <a id="tab-C" href="#pane-C" class="nav-link" data-toggle="tab"
                            role="tab">
                            Multi-group Posting <p>Allows you to seamlessly post the same content in different groups all at
                                once.</p></a>
                    </li>
                    <li class="nav-item"> <a id="tab-d" href="#pane-d" class="nav-link" data-toggle="tab"
                            role="tab">
                            Network with KOLs <p>Connect with key Opinion Leaders & Understand their perspective towards
                                various trends in healthcare sector.</p></a>
                    </li>
                    <li class="nav-item"> <a id="tab-e" href="#pane-e" class="nav-link" data-toggle="tab"
                            role="tab">
                            Docs Studio <p>Explore specially curated content, interviews with heathcare experts, webinars,
                                CMEs and a lot more.</p></a>
                    </li>
                </ul>
                <div id="content" class="tab-content" role="tablist">
                    <div id="pane-A" class="card tab-pane fade show active" role="tabpanel" aria-labelledby="tab-A">
                        <div class="card-header" role="tab" id="heading-A">
                            <h4 class="mb-0">
                                <a data-toggle="collapse" href="#collapse-A" data-parent="#content" aria-expanded="true"
                                    aria-controls="collapse-A">
                                    Unlimited Conferences <p>Conduct unlimited meetings, calls, CMEs and webinars. Without
                                        any charges and time limit.</p>
                                </a>
                            </h4>
                        </div>
                        <div id="collapse-A" class="collapse show" role="tabpanel" aria-labelledby="heading-A">
                            <div class="card-body">
                                <img src="assets/img/unlimited-conferences.png" alt="">
                            </div>
                        </div>
                    </div>
                    <div id="pane-B" class="card tab-pane fade" role="tabpanel" aria-labelledby="tab-B">
                        <div class="card-header" role="tab" id="heading-B">
                            <h4 class="mb-0">
                                <a class="collapsed" data-toggle="collapse" href="#collapse-B" data-parent="#content"
                                    aria-expanded="false" aria-controls="collapse-B">
                                    Secure Communication <p>A safe space where your medical information remains private.</p>
                                </a>
                            </h4>
                        </div>
                        <div id="collapse-B" class="collapse" role="tabpanel" aria-labelledby="heading-B">
                            <div class="card-body">
                                <img src="assets/img/secure-communication.png" alt="">
                            </div>
                        </div>
                    </div>
                    <div id="pane-C" class="card tab-pane fade" role="tabpanel" aria-labelledby="tab-C">
                        <div class="card-header" role="tab" id="heading-C">
                            <h4 class="mb-0">
                                <a class="collapsed" data-toggle="collapse" href="#collapse-C" data-parent="#content"
                                    aria-expanded="false" aria-controls="collapse-C">
                                    Multi-group Posting <p>Allows you to seamlessly post the same content in different
                                        groups all at once.</p>
                                </a>
                            </h4>
                        </div>
                        <div id="collapse-C" class="collapse" role="tabpanel" aria-labelledby="heading-C">
                            <div class="card-body">
                                <img src="assets/img/multi-group posting.png" alt="">
                            </div>
                        </div>
                    </div>
                    <div id="pane-d" class="card tab-pane fade" role="tabpanel" aria-labelledby="tab-d">
                        <div class="card-header" role="tab" id="heading-d">
                            <h4 class="mb-0">
                                <a class="collapsed" data-toggle="collapse" href="#collapse-d" data-parent="#content"
                                    aria-expanded="false" aria-controls="collapse-d">
                                    Network with KOLs <p>Connect with key Opinion Leaders & Understand their perspective
                                        towards various trends in healthcare sector.</p>
                                </a>
                            </h4>
                        </div>
                        <div id="collapse-d" class="collapse" role="tabpanel" aria-labelledby="heading-d">
                            <div class="card-body">
                                <img src="assets/img/network-kols.png" alt="">
                            </div>
                        </div>
                    </div>
                    <div id="pane-e" class="card tab-pane fade" role="tabpanel" aria-labelledby="tab-e">
                        <div class="card-header" role="tab" id="heading-e">
                            <h4 class="mb-0">
                                <a class="collapsed" data-toggle="collapse" href="#collapse-e" data-parent="#content"
                                    aria-expanded="false" aria-controls="collapse-e">
                                    Docs Studio <p>Explore specially curated content, interviews with heathcare experts,
                                        webinars, CMEs and a lot more.</p>
                                </a>
                            </h4>
                        </div>
                        <div id="collapse-e" class="collapse" role="tabpanel" aria-labelledby="heading-e">
                            <div class="card-body">
                                <img src="assets/img/docs-studios.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- What you can do sec end -->

    <!-- Upcoming Features sec start -->
    <section class="upcomingfeatures ptb-90 pt-5">
        <div class="container">
            <div class="row">
                <div class="col-lg-3">
                    <h2 class="pb-0 mb-0 text-center text-lg-left pt-0">Upcoming Features</h2>
                    <h4 class="subtile text-lg-left text-center mx-auto mt-3">We are shortly coming up with these features
                        to enhance your DocsCampus experience.</h4>
                </div>
                <div class="col-lg-9">
                    <div class="d-sm-flex flex-wrap justify-content-lg-end justify-content-center">
                        <div class="upcoming-featurescol">
                            <img class="mx-auto" src="assets/img/doctors-communication-medium.png" alt="">
                            <h4>Doctor’s Communication Medium</h4>
                            <p class="pxxxssmall mb-2">Physician to physican connection & advice for better patient
                                treatment as well as enrichment of knowledge</p>
                        </div>
                        <div class="upcoming-featurescol">
                            <img class="mx-auto" src="assets/img/expert-panel.png" alt="">
                            <h4>Expert Panel</h4>
                            <p class="pxxxssmall mb-2">Get a better understanding of medical practice with the help of
                                experts from the healthcare ecosystem</p>
                        </div>
                        <div class="upcoming-featurescol">
                            <img class="mx-auto" src="assets/img/patient-management.png" alt="">
                            <h4>Patient Management</h4>
                            <p class="pxxxssmall mb-2">A system that lets you maintain your patient’s EMR, EHR and more</p>
                        </div>
                        <div class="upcoming-featurescol">
                            <img class="mx-auto" src="assets/img/unified-doctor-patient-network.png" alt="">
                            <h4>Unified Doctor Patient Network</h4>
                            <p class="pxxxssmall mb-2">Simplifying doctor and patient interaction</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Upcoming Features sec end -->

    <!-- comingsoon sec start -->
    <section class="comingsoon ptb-90 pb-0 pt-5">
        <div class="container">
            <div class="d-flex text-center justify-content-center">
                <div class="col-xl-8 col-lg-9 col-md-12 col-12">
                    <p class="orange-tags mt-3">Coming Soon</p>
                    <img class="mt-4 mb-5" src="assets/img/docscampus-learning-logo.png" alt="">
                    <h4 class="subtile mx-auto">Specialised learning platform for healthcare professionals and students
                        bringing lectures, test preparation modules, quizzes and a lot more.</h4>
                    <img src="assets/img/docscampus-learning.png" alt="">
                </div>
            </div>
        </div>
    </section>
    <!-- comingsoon sec end -->

    <!-- Our approach sec start -->
    <section class="ourapproach ptb-90">
        <div class="container">
            <h2 class="text-center">Our approach</h2>
            <h4 class="text-center subtile mt-2 mx-auto">These are ideas that define us</h4>
            <div class="d-md-flex text-center justify-content-center">
                <div class="col">
                    <img class="mt-5 mb-md-4" src="assets/img/network.png" alt="">
                    <h3>Network</h3>
                    <p class="pxxxssmall">Healthcare community of verified doctors, medical students and patients</p>
                </div>
                <div class="col">
                    <img class="mt-5 mb-md-4" src="assets/img/symmetry-information.png" alt="">
                    <h3>Symmetry in Information</h3>
                    <p class="pxxxssmall">Bridging the existing gaps in the healthcare ecosystem</p>
                </div>
                <div class="col">
                    <img class="mt-5 mb-md-4" src="assets/img/security.png" alt="">
                    <h3>Security</h3>
                    <p class="pxxxssmall">A safe & private space where your oaths and medical information are secure</p>
                </div>
            </div>
        </div>
    </section>
    <!-- Our approach sec end -->

    <!-- Join the movement sec start -->
    <section class="join-movement pt-5 pb-5">
        <div class="container">
            <h2 class="text-center text-white pt-4">Join the movement.</h2>
            <p class="text-center text-white pxxxssmall ">Join DocsCampus to strenthen the healthcare ecosystem.</p>
            <a class="btnfill mt-0 mx-auto d-table mb-2" href="javascript:void(0);"
                onClick="checkUserToken('signup');">Register
                now</a>
        </div>
    </section>
    <!-- Join the movement sec end -->


@endsection

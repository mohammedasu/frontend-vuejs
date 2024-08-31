export default {
    methods: {
        loadSideBarJqueryCode() {
            jQuery(function() {
                var sidebarlistfix = jQuery(".sidebarlistfix");
                sidebarlistfix.removeClass("fixed");
                window.scrollTo(0, 0);
                jQuery(window).scroll(function() {
                    var scroll = jQuery(window).scrollTop();
                    if (scroll >= 200) {
                        sidebarlistfix.addClass("fixed");
                    } else {
                        sidebarlistfix.removeClass("fixed");
                    }
                });
            });
        },
        loadCarsaul() {
            jQuery(function() {
                jQuery(".bannersliders").owlCarousel({
                    items: 1,
                    slideBy: 1,
                    dots: false,
                    smartSpeed: 200,
                    autoplayTimeout: 4000,
                    nav: false,
                    mouseDrag: true,
                    dotsEach: 4,
                    autoplay: true
                    /*animateOut: 'slideOutUp',*/
                });
            });
        }
    }
};

(function($) {

    "use strict";


    //Hide Loading Box (Preloader)
    const svg = document.getElementById("preloaderSvg");
    const preTl = gsap.timeline({
        onComplete: startAnimationAfterPreloader,
    });
    const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
    const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";
    preTl.to(".preloader-heading .load-text , .preloader-heading .cont", {
        delay: 1.5,
        y: -100,
        opacity: 0,
    });
    preTl
        .to(svg, {
            duration: 0.5,
            attr: {
                d: curve
            },
            ease: "power2.easeIn",
        })
        .to(svg, {
            duration: 0.5,
            attr: {
                d: flat
            },
            ease: "power2.easeOut",
        });
    preTl.to(".preloader", {
        delay: 1.5,
        y: -1500,
    });
    preTl.to(".preloader", {
        zIndex: -1,
        display: "none",
    });
    let svgText = document.querySelector("svg text");

    function startAnimationAfterPreloader() {
        if (svgText) {
            // Add a class or directly apply styles to trigger the stroke animation
            svgText.classList.add("animate-stroke");
        }
    }


    //Update Header Style and Scroll to Top
    function headerStyle() {
        if ($('.main-header').length) {
            var windowpos = $(window).scrollTop();
            var siteHeader = $('.main-header');
            var scrollLink = $('.scroll-to-top');

            var HeaderHight = $('.main-header').height();
            if (windowpos >= HeaderHight) {
                siteHeader.addClass('fixed-header');
                scrollLink.fadeIn(300);
            } else {
                siteHeader.removeClass('fixed-header');
                scrollLink.fadeOut(300);
            }

        }
    }

    headerStyle();


    //Submenu Dropdown Toggle
    if ($('.main-header li').length) {
        $('.main-header li.dropdown').append('<div class="dropdown-btn"><span class="fa fa-angle-down"></span></div>');

        //Dropdown Button
        $('.main-header li.dropdown .dropdown-btn').on('click', function() {
            $(this).prev('ul').slideToggle(500);
        });

        //Disable dropdown parent link
        $('.navigation li.dropdown > a').on('click', function(e) {
            e.preventDefault();
        });

        //Disable dropdown parent link
        $('.main-header .navigation li.dropdown > a,.hidden-bar .side-menu li.dropdown > a').on('click', function(e) {
            e.preventDefault();
        });

        $('.main-menu .navigation > li .mega-menu-bar > .column > ul').addClass('first-ul');
        $('.main-header .main-menu .navigation > li > ul').addClass('last-ul');

        $('.xs-sidebar-group .close-button').on('click', function(e) {
            $('.xs-sidebar-group.info-group').removeClass('isActive');
        });

        $('.about-widget').on('click', function(e) {
            $('.about-sidebar').addClass('active');
        });

        $('.about-sidebar .close-button').on('click', function(e) {
            $('.about-sidebar').removeClass('active');
        });

        $('.about-sidebar .gradient-layer').on('click', function(e) {
            $('.about-sidebar').removeClass('active');
        });

        //Dropdown Button
        $('.pricing-tabs .tab-buttons .yearly').on('click', function() {
            $('.round').addClass('boll-right');
        });

        //Dropdown Button
        $('.pricing-tabs .tab-buttons .monthly').on('click', function() {
            $('.round').removeClass('boll-right');
        });

    }


    //Mobile Nav Hide Show
    if ($('.mobile-menu').length) {
        //$('.mobile-menu .menu-box').mCustomScrollbar();
        var mobileMenuContent = $('.main-header .nav-outer .main-menu').html();
        $('.mobile-menu .menu-box .menu-outer').append(mobileMenuContent);
        $('.sticky-header .main-menu').append(mobileMenuContent);



        //Hide / Show Submenu
        $('.mobile-menu .navigation > li.dropdown > .dropdown-btn').on('click', function(e) {
            console.log('btn clicked');
            e.preventDefault();
            var target = $(this).parent('li').children('ul');
            var target1 = $(this).parent('li').children('div.mega-menu');
            // console.log('target', $(target).is(':visible'));
            console.log('target1', $(target1).is(':visible'));

            if ($(target).is(':visible')) {
                $(this).parent('li').removeClass('open');
                $(target).slideUp(500);
                $(this).parents('.navigation').children('li.dropdown').removeClass('open');
                $(this).parents('.navigation').children('li.dropdown > ul.last-ul').slideUp(500);
                return false;
            } else {
                $(this).parents('.navigation').children('li.dropdown').removeClass('open');
                $(this).parents('.navigation').children('li.dropdown').children('ul.last-ul').slideUp(500);
                $(this).parent('li').toggleClass('open');
                $(this).parent('li').children('ul.last-ul').slideToggle(500);
            }
            if ($(target1).is(':visible')) {
                console.log('Visible');
                $(this).parent('li').removeClass('open');
                $(target1).slideUp(500);
                $(this).parents('.navigation').children('li.dropdown').removeClass('open');
                $(this).parents('.navigation').children('li.dropdown > .mega-menu').slideUp(500);
                // return false;
            } else {
                console.log('Not Visible');
                $(this).parents('.navigation').children('li.dropdown').removeClass('open');
                $(this).parents('.navigation').children('li.dropdown').children('.mega-menu').slideUp(500);
                $('.first-ul').css('display', 'block');
                $(this).parent('li').toggleClass('open');
                $(this).parent('li').children('.mega-menu').slideToggle(500);
            }
        });


        //3rd Level Nav
        $('.mobile-menu .navigation > li.dropdown > ul  > li.dropdown > .dropdown-btn').on('click', function(e) {
            e.preventDefault();
            var targetInner = $(this).parent('li').children('ul');

            if ($(targetInner).is(':visible')) {
                $(this).parent('li').removeClass('open');
                $(targetInner).slideUp(500);
                $(this).parents('.navigation > ul').find('li.dropdown').removeClass('open');
                $(this).parents('.navigation > ul').find('li.dropdown > ul').slideUp(500);
                return false;
            } else {
                $(this).parents('.navigation > ul').find('li.dropdown').removeClass('open');
                $(this).parents('.navigation > ul').find('li.dropdown > ul').slideUp(500);
                $(this).parent('li').toggleClass('open');
                $(this).parent('li').children('ul').slideToggle(500);
            }
        });

        //Menu Toggle Btn
        $('.mobile-nav-toggler').on('click', function() {
            $('body').addClass('mobile-menu-visible');

        });



        //Menu Toggle Btn
        $('.mobile-menu .menu-backdrop,.mobile-menu .close-btn').on('click', function() {
            $('body').removeClass('mobile-menu-visible');
            $('.mobile-menu .navigation > li').removeClass('open');
            $('.mobile-menu .navigation li ul').slideUp(0);
        });

        $(document).keydown(function(e) {
            if (e.keyCode == 27) {
                $('body').removeClass('mobile-menu-visible');
                $('.mobile-menu .navigation > li').removeClass('open');
                $('.mobile-menu .navigation li ul').slideUp(0);
            }
        });

    }



    //Add One Page nav
    if ($('.scroll-nav').length) {
        $('.scroll-nav ul').onePageNav();
    }


    //Custom Scroll Linsk / Sidebar
    if ($('.scroll-nav li a').length) {
        $(".scroll-nav li a").on('click', function(e) {
            e.preventDefault();
            $('body').removeClass('mobile-menu-visible');
        });
    }



    //Header Search
    if ($('.search-box-outer').length) {
        $('.search-box-outer').on('click', function() {
            $('body').addClass('search-active');
        });
        $('.close-search').on('click', function() {
            $('body').removeClass('search-active');
        });
    }



    // Tabs Box
    if ($('.tabs-box').length) {
        $('.tabs-box .tab-buttons .tab-btn').on('click', function(e) {
            e.preventDefault();
            var target = $($(this).attr('data-tab'));

            if ($(target).is(':visible')) {
                return false;
            } else {
                target.parents('.tabs-box').find('.tab-buttons').find('.tab-btn').removeClass('active-btn');
                $(this).addClass('active-btn');
                target.parents('.tabs-box').find('.tabs-content').find('.tab').fadeOut(0);
                target.parents('.tabs-box').find('.tabs-content').find('.tab').removeClass('active-tab');
                $(target).fadeIn(300);
                $(target).addClass('active-tab');
            }
        });
    }




    //Event Countdown Timer
    if ($('.time-countdown').length) {
        $('.time-countdown').each(function() {
            var $this = $(this),
                finalDate = $(this).data('countdown');
            $this.countdown(finalDate, function(event) {
                var $this = $(this).html(event.strftime('' + '<div class="counter-column"><span class="count">%D</span>Days</div> ' + '<div class="counter-column"><span class="count">%H</span>Hours</div>  ' + '<div class="counter-column"><span class="count">%M</span>Minutes</div>  ' + '<div class="counter-column"><span class="count">%S</span>Seconds</div>'));
            });
        });
    }


    if ($('.clock-wrapper').length) {
        (function() {
            //generate clock animations
            var now = new Date(),
                hourDeg = now.getHours() / 12 * 360 + now.getMinutes() / 60 * 30,
                minuteDeg = now.getMinutes() / 60 * 360 + now.getSeconds() / 60 * 6,
                secondDeg = now.getSeconds() / 60 * 360,
                stylesDeg = [
                    "@-webkit-keyframes rotate-hour{from{transform:rotate(" + hourDeg + "deg);}to{transform:rotate(" + (hourDeg + 360) + "deg);}}",
                    "@-webkit-keyframes rotate-minute{from{transform:rotate(" + minuteDeg + "deg);}to{transform:rotate(" + (minuteDeg + 360) + "deg);}}",
                    "@-webkit-keyframes rotate-second{from{transform:rotate(" + secondDeg + "deg);}to{transform:rotate(" + (secondDeg + 360) + "deg);}}",
                    "@-moz-keyframes rotate-hour{from{transform:rotate(" + hourDeg + "deg);}to{transform:rotate(" + (hourDeg + 360) + "deg);}}",
                    "@-moz-keyframes rotate-minute{from{transform:rotate(" + minuteDeg + "deg);}to{transform:rotate(" + (minuteDeg + 360) + "deg);}}",
                    "@-moz-keyframes rotate-second{from{transform:rotate(" + secondDeg + "deg);}to{transform:rotate(" + (secondDeg + 360) + "deg);}}"
                ].join("");
            document.getElementById("clock-animations").innerHTML = stylesDeg;
        })();
    }



    // Testimonial Section Four Carousel
    if ($('.shop-detail').length) {
        var thumbsCarousel = new Swiper('.shop-detail .thumbs-carousel', {
            spaceBetween: 15,
            slidesPerView: 4,
            //direction: 'vertical',
            breakpoints: {
                320: {
                    //direction: 'horizontal',
                    slidesPerView: 3,
                },
                640: {
                    //direction: 'horizontal',
                    slidesPerView: 4,
                },
                1023: {
                    slidesPerView: 4,
                }

            }
        });

        var contentCarousel = new Swiper('.shop-detail .content-carousel', {
            spaceBetween: 0,
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            thumbs: {
                swiper: thumbsCarousel
            },
        });
    }



    //Jquery Spinner / Quantity Spinner
    if ($('.qty-spinner').length) {
        $("input.qty-spinner").TouchSpin({
            verticalbuttons: true
        });
    }


    //Custom Seclect Box
    if ($('.custom-select-box').length) {
        $('.custom-select-box').selectmenu().selectmenu('menuWidget').addClass('overflow');
    }



    // Title Animation
    let splitTitleLines = gsap.utils.toArray(".title-anim");

    splitTitleLines.forEach(splitTextLine => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: splitTextLine,
                start: 'top 90%',
                end: 'bottom 60%',
                scrub: false,
                markers: false,
                toggleActions: 'play none none none'
            }
        });

        const itemSplitted = new SplitText(splitTextLine, {
            type: "words, lines"
        });
        gsap.set(splitTextLine, {
            perspective: 400
        });
        itemSplitted.split({
            type: "lines"
        })
        tl.from(itemSplitted.lines, {
            duration: 1,
            delay: 0.3,
            opacity: 0,
            rotationX: -80,
            force3D: true,
            transformOrigin: "top center -50",
            stagger: 0.1
        });
    });




    // Main Slider
    var slider = new Swiper('.main-slider', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        autoplay: {
            enabled: true,
            delay: 6000,
        },
        // Navigation arrows
        navigation: {
            nextEl: '.main-slider-next',
            prevEl: '.main-slider-prev',
            clickable: true,
        },
        //Pagination
        pagination: {
            el: ".slider-one_pagination",
            clickable: true,
            renderBullet: function(index, className) {
                let formattedIndex = (index + 1).toString().padStart(2, '0'); // Ensures two-digit format
                return '<span class="' + className + '">' + formattedIndex + "</span>";
            },
        },
        speed: 500,
        breakpoints: {
            '1600': {
                slidesPerView: 1,
            },
            '1200': {
                slidesPerView: 1,
            },
            '992': {
                slidesPerView: 1,
            },
            '768': {
                slidesPerView: 1,
            },
            '576': {
                slidesPerView: 1,
            },
            '0': {
                slidesPerView: 1,
            },
        },
    });




    // Single One Slider
    var slider = new Swiper('.single-item_carousel', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        autoplay: {
            enabled: true,
            delay: 6000
        },
        // Navigation arrows
        navigation: {
            nextEl: '.single-item_carousel-next',
            prevEl: '.single-item_carousel-prev',
            clickable: true,
        },
        //Pagination
        pagination: {
            el: ".single-item_carousel-pagination",
            clickable: true,
        },
        speed: 500,
        breakpoints: {
            '1600': {
                slidesPerView: 1,
            },
            '1200': {
                slidesPerView: 1,
            },
            '992': {
                slidesPerView: 1,
            },
            '768': {
                slidesPerView: 1,
            },
            '576': {
                slidesPerView: 1,
            },
            '0': {
                slidesPerView: 1,
            },
        },
    });




    // Two One Slider
    var slider = new Swiper('.two-item_carousel', {
        slidesPerView: 2,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            enabled: true,
            delay: 6000
        },
        // Navigation arrows
        navigation: {
            nextEl: '.two-item_carousel-next',
            prevEl: '.two-item_carousel-prev',
            clickable: true,
        },
        //Pagination
        pagination: {
            el: ".two-item_carousel-pagination",
            clickable: true,
        },
        speed: 500,
        breakpoints: {
            '1600': {
                slidesPerView: 2,
            },
            '1200': {
                slidesPerView: 2,
            },
            '992': {
                slidesPerView: 2,
            },
            '768': {
                slidesPerView: 1,
            },
            '576': {
                slidesPerView: 1,
            },
            '0': {
                slidesPerView: 1,
            },
        },
    });





    // Testimonial Slider
    var slider = new Swiper('.testimonial_carousel', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        autoplay: {
            enabled: true,
            delay: 6000
        },
        // Navigation arrows
        navigation: {
            nextEl: '.testimonial_carousel-next',
            prevEl: '.testimonial_carousel-prev',
            clickable: true,
        },
        //Pagination
        pagination: {
            el: ".testimonial_carousel-pagination",
            clickable: true,
            type: "fraction",
        },
        speed: 500,
        breakpoints: {
            '1600': {
                slidesPerView: 1,
            },
            '1200': {
                slidesPerView: 1,
            },
            '992': {
                slidesPerView: 1,
            },
            '768': {
                slidesPerView: 1,
            },
            '576': {
                slidesPerView: 1,
            },
            '0': {
                slidesPerView: 1,
            },
        },
    });


    // Project Slider
    var slider = new Swiper('.project_carousel', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        autoplay: {
            enabled: true,
            delay: 6000
        },
        // Navigation arrows
        navigation: {
            nextEl: '.project_carousel-next',
            prevEl: '.project_carousel-prev',
            clickable: true,
        },
        //Pagination
        pagination: {
            el: ".project_carousel-pagination",
            clickable: true,
            type: "progressbar",
        },
        speed: 500,
        breakpoints: {
            '1600': {
                slidesPerView: 1,
            },
            '1200': {
                slidesPerView: 1,
            },
            '992': {
                slidesPerView: 1,
            },
            '768': {
                slidesPerView: 1,
            },
            '576': {
                slidesPerView: 1,
            },
            '0': {
                slidesPerView: 1,
            },
        },
    });




    // Project Slider Two
    var slider = new Swiper('.project_carousel-two', {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            enabled: true,
            delay: 6000
        },
        // Navigation arrows
        navigation: {
            nextEl: '.project_carousel-two-next',
            prevEl: '.project_carousel-two-prev',
            clickable: true,
        },
        //Pagination
        pagination: {
            el: ".project_carousel-two-pagination",
            clickable: true,
            type: "progressbar",
        },
        speed: 500,
        breakpoints: {
            '1600': {
                slidesPerView: 3,
            },
            '1200': {
                slidesPerView: 2,
            },
            '992': {
                slidesPerView: 2,
            },
            '768': {
                slidesPerView: 2,
            },
            '576': {
                slidesPerView: 1,
            },
            '0': {
                slidesPerView: 1,
            },
        },
    });




    // Team Slider
    var slider = new Swiper('.team_carousel', {
        slidesPerView: 4,
        spaceBetween: 25,
        loop: false,
        autoplay: {
            enabled: true,
            delay: 6000
        },
        // Navigation arrows
        navigation: {
            nextEl: '.team_carousel-next',
            prevEl: '.team_carousel-prev',
            clickable: true,
        },
        //Pagination
        pagination: {
            el: ".team_carousel-pagination",
            clickable: true,
            type: "progressbar",
        },
        speed: 500,
        breakpoints: {
            '1600': {
                slidesPerView: 4,
            },
            '1200': {
                slidesPerView: 4,
            },
            '992': {
                slidesPerView: 3,
            },
            '768': {
                slidesPerView: 2,
            },
            '576': {
                slidesPerView: 2,
            },
            '0': {
                slidesPerView: 1,
            },
        },
    });




    // Testimonial Slider
    var slider = new Swiper('.instagram_carousel', {
        slidesPerView: 5,
        spaceBetween: 6,
        loop: true,
        autoplay: {
            enabled: true,
            delay: 6000
        },
        // Navigation arrows
        navigation: {
            nextEl: '.instagram_carousel-next',
            prevEl: '.instagram_carousel-prev',
            clickable: true,
        },
        //Pagination
        pagination: {
            el: ".instagram_carousel-pagination",
            clickable: true,
            type: "progressbar",
        },
        speed: 500,
        breakpoints: {
            '1600': {
                slidesPerView: 5,
            },
            '1200': {
                slidesPerView: 5,
            },
            '992': {
                slidesPerView: 4,
            },
            '768': {
                slidesPerView: 3,
            },
            '576': {
                slidesPerView: 2,
            },
            '0': {
                slidesPerView: 2,
            },
        },
    });




    // Clients Slider
    var slider = new Swiper('.clients-one_slider', {
        slidesPerView: 5,
        spaceBetween: 25,
        loop: true,
        autoplay: {
            enabled: true,
            delay: 2000,
        },
        // Navigation arrows
        navigation: {
            nextEl: '.clients-one_slider_button-next',
            prevEl: '.clients-one_slider_button-prev',
            clickable: true,
        },
        //Pagination
        pagination: {
            el: ".clients-one_pagination",
            clickable: true,
        },
        speed: 500,
        breakpoints: {
            '1600': {
                slidesPerView: 5,
            },
            '1200': {
                slidesPerView: 5,
            },
            '992': {
                slidesPerView: 4,
            },
            '768': {
                slidesPerView: 3,
            },
            '576': {
                slidesPerView: 3,
            },
            '300': {
                slidesPerView: 1,
            },
        },
    });





    // Clients Slider
    var slider = new Swiper('.four-item_slider', {
        slidesPerView: 4,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            enabled: true,
            delay: 2000,
        },
        // Navigation arrows
        navigation: {
            nextEl: '.four-item_slider-next',
            prevEl: '.four-item_slider-prev',
            clickable: true,
        },
        //Pagination
        pagination: {
            el: ".four-item_slider_pagination",
            clickable: true,
        },
        speed: 500,
        breakpoints: {
            '1600': {
                slidesPerView: 4,
            },
            '1200': {
                slidesPerView: 3,
            },
            '992': {
                slidesPerView: 3,
            },
            '768': {
                slidesPerView: 2,
            },
            '576': {
                slidesPerView: 2,
            },
            '0': {
                slidesPerView: 1,
            },
        },
    });



    //Accordion Box
    if ($('.accordion-box').length) {
        $(".accordion-box").on('click', '.acc-btn', function() {

            var outerBox = $(this).parents('.accordion-box');
            var target = $(this).parents('.accordion');

            if ($(this).hasClass('active') !== true) {
                $(outerBox).find('.accordion .acc-btn').removeClass('active');
            }

            if ($(this).next('.acc-content').is(':visible')) {
                return false;
            } else {
                $(this).addClass('active');
                $(outerBox).children('.accordion').removeClass('active-block');
                $(outerBox).find('.accordion').children('.acc-content').slideUp(300);
                target.addClass('active-block');
                $(this).next('.acc-content').slideDown(300);
            }
        });
    }



    // Odometer
    if ($(".odometer").length) {
        $('.odometer').appear();
        $('.odometer').appear(function() {
            var odo = $(".odometer");
            odo.each(function() {
                var countNumber = $(this).attr("data-count");
                $(this).html(countNumber);
            });
            window.odometerOptions = {
                format: 'd',
            };
        });
    }




    //Progress Bar
    if ($('.progress-line').length) {
        $('.progress-line').appear(function() {
            var el = $(this);
            var percent = el.data('width');
            $(el).css('width', percent + '%');
        }, {
            accY: 0
        });
    }


    //Fact Counter + Text Count
    if ($('.count-box').length) {
        $('.count-box').appear(function() {

            var $t = $(this),
                n = $t.find(".count-text").attr("data-stop"),
                r = parseInt($t.find(".count-text").attr("data-speed"), 10);

            if (!$t.hasClass("counted")) {
                $t.addClass("counted");
                $({
                    countNum: $t.find(".count-text").text()
                }).animate({
                    countNum: n
                }, {
                    duration: r,
                    easing: "linear",
                    step: function() {
                        $t.find(".count-text").text(Math.floor(this.countNum));
                    },
                    complete: function() {
                        $t.find(".count-text").text(this.countNum);
                    }
                });
            }

        }, {
            accY: 0
        });
    }





    // Image Reveal Animation  used
    let imgs_reveal = document.querySelectorAll(".img-reveal");

    imgs_reveal.forEach((container) => {
        let image = container.querySelector("img");
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                toggleActions: "restart none none reset"
            }
        });

        tl.set(container, {
            autoAlpha: 1
        });
        tl.from(container, 1.5, {
            xPercent: -100,
            ease: Power2.out
        });
        tl.from(image, 1.5, {
            xPercent: 100,
            scale: 1.3,
            delay: -1.5,
            ease: Power2.out
        });
    });



    if ($('.services-two_list li').length && $('.image-layer').length) {
        // Get all list items and image layers
        const listItems = $('.services-two_list li');
        const imageLayers = $('.image-layer');

        // Check if counts match
        if (listItems.length === imageLayers.length) {
            // Add hover event to each list item
            listItems.each(function(index) {
                $(this).hover(
                    function() { // Mouse enter
                        // Remove active class from all images
                        imageLayers.removeClass('active');
                        // Add active class to corresponding image
                        imageLayers.eq(index).addClass('active');
                    },
                    function() { // Mouse leave
                        // Optional: You can add behavior when mouse leaves
                        // For example, revert to first image being active:
                        // imageLayers.removeClass('active');
                        // imageLayers.first().addClass('active');
                    }
                );
            });
        } else {
            console.warn('Number of list items and image layers do not match');
        }
    }



    // Folks animation
    let endTl = gsap.timeline({
        repeat: -1,
        delay: 0.5,
        scrollTrigger: {
            trigger: '.up-down_animation',
            start: 'bottom 100%-=50px'
        }
    });
    gsap.set('.up-down_animation', {
        opacity: 0
    });
    gsap.to('.up-down_animation', {
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.up-down_animation',
            start: 'bottom 100%-=50px',
            once: true
        }
    });
    let mySplitText = new SplitText(".up-down_animation", {
        type: ""
    });
    let chars = mySplitText.chars;
    //let endGradient = chroma.scale(['#F9D371', '#F47340', '#EF2F88', '#8843F2']);
    endTl.to(chars, {
        duration: 0.5,
        scaleY: 0.6,
        ease: "power3.out",
        stagger: 0.04,
        transformOrigin: 'center bottom'
    });
    endTl.to(chars, {
        yPercent: -20,
        ease: "elastic",
        stagger: 0.03,
        duration: 0.8
    }, 0.5);
    endTl.to(chars, {
        scaleY: 1,
        ease: "elastic.out(2.5, 0.2)",
        stagger: 0.03,
        duration: 1.5
    }, 0.5);
    endTl.to(chars, {
        //color: (i, el, arr) => {
        //return endGradient(i / arr.length).hex();
        //},
        ease: "power2.out",
        stagger: 0.03,
        duration: 0.3
    }, 0.5);
    endTl.to(chars, {
        yPercent: 0,
        ease: "back",
        stagger: 0.03,
        duration: 0.8
    }, 0.7);
    endTl.to(chars, {
        color: '#ff5c00',
        duration: 1.4,
        stagger: 0.05
    });
    /////////////////////////////////////////////////////




    if ($(".animation_mode").length) {
        $('.animation_mode').marquee({
            speed: 50,
            gap: 20,
            delayBeforeStart: 0,
            direction: 'left',
            duplicated: true,
            pauseOnHover: true,
            startVisible: true,
        });
    }




    // LightBox Image
    if ($('.lightbox-image').length) {
        $('.lightbox-image').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    }



    // LightBox Video
    if ($('.lightbox-video').length) {
        $('.lightbox-video').magnificPopup({
            // disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            iframe: {
                patterns: {
                    youtube: {
                        index: 'youtube.com',
                        id: 'v=',
                        src: 'https://www.youtube.com/embed/%id%'
                    },
                },
                srcAction: 'iframe_src',
            },
            fixedContentPos: false
        });
    }




    //Contact Form Validation
    if ($('#contact-form').length) {
        $('#contact-form').validate({
            rules: {
                username: {
                    required: true
                },
                lastname: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                services: {
                    required: true
                },
                message: {
                    required: true
                }
            }
        });
    }



    // Scroll to a Specific Div
    if ($('.scroll-to-target').length) {
        $(".scroll-to-target").on('click', function() {
            var target = $(this).attr('data-target');
            // animate
            $('html, body').animate({
                scrollTop: $(target).offset().top
            }, 1500);

        });
    }



    // Elements Animation
    if ($('.wow').length) {
        var wow = new WOW({
            boxClass: 'wow', // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset: 0, // distance to the element when triggering the animation (default is 0)
            mobile: true, // trigger animations on mobile devices (default is true)
            live: true // act on asynchronously loaded content (default is true)
        });
        wow.init();
    }



    /* ==========================================================================
       When document is Scrollig, do
       ========================================================================== */

    $(window).on('scroll', function() {
        headerStyle();
    });

    /* ==========================================================================
       When document is loading, do
       ========================================================================== */

    $(window).on('load', function() {
        //handlePreloader();
    });

})(window.jQuery);
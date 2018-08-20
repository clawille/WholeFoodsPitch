(function ($) {
    $(function () {
        var md = new MobileDetect(window.navigator.userAgent);

        var cookieValue = $.cookie("wfcookiepitch");

        if (cookieValue) {
            $(window).find('#signin').trigger('click');
        }

        $('body').css('overflow', 'hidden');

        $(document).ready(function(){
            $('.li-welcome a').focus();
        })

        $(document).on('scroll', function (e) {
            if ($(window).scrollTop() > 10) {
                $('.nav-background').removeClass('slideOutUp').addClass('animated slideInDown');
                $('nav').addClass('reduce');
            } else {
                $('.nav-background').removeClass('slideInDown').addClass(' animated slideOutUp');
                $('nav').removeClass('reduce');
            }
        });

        $("form.form").on('submit', function (e) {
            e.preventDefault();

            var password = $('#password').val();

            if (password === 'digitas') {
                $.cookie("wfcookiepitch", 1, { expires : 1 });

                $('body').css('overflow-y', 'scroll');

                $('nav').find('li').find('a').find('span').addClass('animated zoomOut');

                $('nav').addClass('animated fadeInDown');
                $('nav').find('li.li-welcome').find('a').find('span').removeClass('zoomOut').addClass('zoomIn');

                $('.login').addClass('animated fadeOutUp');
                $('.welcome').find('.box').addClass('animated fadeInUp delay-3s');

                if (!md.mobile()) {
                    $.scrollify({
                        section: ".section",
                        sectionName: "section-name",
                        before: function (i, els) {
                            $('nav').find('li').find('a').find('span').removeClass('zoomIn').addClass('animated zoomOut');

                            $current = $.scrollify.current();
                            $currentSectionName = $current.data('section-name');

                            $('nav').find('li.li-' + $currentSectionName).find('a').find('span').removeClass('zoomOut').addClass('zoomIn');
                            $('ul li a').removeClass('highlight');
                            $('nav').find('li.li-' + $currentSectionName).find('a').addClass('highlight');

                            $('#changing-logo').attr('src','images/' + $currentSectionName + '.png');
                        },
                        after: function (i, els) {
                        }
                    });
                }
            }
        });

        $links = $('nav').find('a').on('click', function (e) {
            e.preventDefault();

            $('nav').find('li').find('span').addClass('animated zoomOut');
            $(this).find('span').removeClass('zoomOut').addClass('zoomIn');

            $('ul li a').removeClass('highlight');
            $(this).addClass('highlight');

            $current = $.scrollify.current();
            $currentSectionName = $current.data('section-name');

            $('#changing-logo').attr('src','images/' + $currentSectionName + '.png');


            $section = $(this).attr('href');

            if (!md.mobile()) {
                $.scrollify.move($section);
            } else {
                $("html, body").animate({ scrollTop: $($section).offset().top }, 1100);
            }
        });

    });
})(jQuery);











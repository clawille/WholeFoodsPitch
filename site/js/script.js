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

            if (password === '') {
                $.cookie("wfcookiepitch", 1, { expires : 1 });

                $('body').css('overflow-y', 'scroll');

                $('.nav').find('li').find('a').find('span').addClass('animated zoomOut');

                $('nav').addClass('animated fadeInDown');
                $('.nav').find('li.li-welcome').find('a').find('span').removeClass('zoomOut').addClass('zoomIn');

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

                            $('.nav').find('li.li-' + $currentSectionName).find('a').find('span').removeClass('zoomOut').addClass('zoomIn');
                            $('ul li a').removeClass('highlight');
                            $('.nav').find('li.li-' + $currentSectionName).find('a').addClass('highlight');

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

            $('.nav').find('li').find('span').addClass('animated zoomOut');
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

        // Apply boostrap offset for client section
        $('.clients .logo.col-lg-2:nth-child(5n+1)').addClass('col-lg-offset-1');

        $('#team .box.small.mute-btn').on('click', function(){
            $(this).toggleClass('muted');

            if (!$(this).hasClass('muted')) {
                $(this).find('#volume-icon').attr('src','images/unmute-icon.svg');
                $(this).find('#volume-text').text('Volume On');
                $("video").prop('muted', false);
            } else {
                $(this).find('#volume-icon').attr('src','images/mute-icon.svg');
                $(this).find('#volume-text').text('Volume Off');
                $("video").prop('muted', true);
            }
        });

        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            $(".nav.navbar-nav li").click(function(e) {
                e.preventDefault();
                var section = $(this).find("a").attr("href");
                $("html, body").animate({
                    scrollTop: $(section).offset().top + 150
                });
                $('#navbar').removeClass('in');
            });
        }

    });
})(jQuery);

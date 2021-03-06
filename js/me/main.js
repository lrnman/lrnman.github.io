/*
 Big Picture by HTML5 UP
 html5up.net | @ajlkn
 Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
 */

(function ($) {

    skel.breakpoints({
        xxlarge: '(max-width: 1920px)',
        xlarge: '(max-width: 1680px)',
        large: '(max-width: 1280px)',
        medium: '(max-width: 1000px)',
        small: '(max-width: 736px)',
        xsmall: '(max-width: 480px)',
    });

    $(function () {

        var $window = $(window),
            $body = $('body'),
            $header = $('#header'),
            $all = $body.add($header),
            $li = $('#header nav:not(.left) li'),
            $gallery = $('.gallery');

        // Disable animations/transitions until the page has loaded.
        $body.addClass('is-loading');

        $window.on('load', function () {
            window.setTimeout(function () {
                $body.removeClass('is-loading');
            }, 0);
        });

        // Touch mode.
        skel.on('change', function () {

            if (skel.vars.mobile || skel.breakpoint('small').active)
                $body.addClass('is-touch');
            else
                $body.removeClass('is-touch');

        });

        // Fix: Placeholder polyfill.
        $('form').placeholder();

        // Fix: IE flexbox fix.
        if (skel.vars.IEVersion <= 11
            && skel.vars.IEVersion >= 10) {

            var $main = $('.main.fullscreen'),
                IEResizeTimeout;

            $window
                .on('resize.ie-flexbox-fix', function () {

                    clearTimeout(IEResizeTimeout);

                    IEResizeTimeout = setTimeout(function () {

                        var wh = $window.height();

                        $main.each(function () {

                            var $this = $(this);

                            $this.css('height', '');

                            if ($this.height() <= wh)
                                $this.css('height', (wh - 50) + 'px');

                        });

                    });

                })
                .triggerHandler('resize.ie-flexbox-fix');

        }

        // Prioritize "important" elements on small.
        skel.on('+small -small', function () {
            $.prioritize(
                '.important\\28 small\\29',
                skel.breakpoint('small').active
            );
        });

        // Gallery.
        $window.on('load', function () {



            $gallery.poptrox({
                baseZIndex: 10001,
                useBodyOverflow: false,
                usePopupEasyClose: true,
                overlayColor: '#1f2328',
                overlayOpacity: 0.65,
                usePopupDefaultStyling: false,
                usePopupCaption: true,
                popupLoaderText: '',
                windowMargin: 50,
                usePopupNav: true
            });

            // Hack: Adjust margins when 'small' activates.
            skel
                .on('-small', function () {
                    $gallery.each(function () {
                        $(this)[0]._poptrox.windowMargin = 50;
                    });
                })
                .on('+small', function () {
                    $gallery.each(function () {
                        $(this)[0]._poptrox.windowMargin = 5;
                    });
                });

        });

        var oldScrollY = 0;
        var pre = 0;
        //true 下， false 上
        var towards = true;
        var distance = 0;
        $(window).on('scroll', function () {
            var newScrollY = $(window).scrollTop();
            if (oldScrollY - newScrollY > 0) {
                if (towards == false) {
                    distance = Math.abs(pre - newScrollY);
                } else {
                    pre = newScrollY;
                    distance = 0;
                }
                towards = false;
            } else if (oldScrollY - newScrollY < 0) {
                if (towards == true) {
                    distance = Math.abs(pre - newScrollY);
                } else {
                    pre = newScrollY;
                    distance = 0;
                }
                towards = true;
            }
            // console.log(distance);
            oldScrollY = newScrollY;
        });


        // Section transitions.
        if (skel.canUse('transition')) {


            var on = function () {



                // Galleries.
                $('.gallery')
                    .scrollex({
                        top: '30vh',
                        bottom: '30vh',
                        delay: 20,
                        initialize: function () {
                            $(this).addClass('inactive');
                        },
                        terminate: function () {
                            $(this).removeClass('inactive');
                        },
                        enter: function () {
                            $(this).removeClass('inactive');
                        },
                        leave: function () {
                            $(this).addClass('inactive');
                        }
                    });

                // Generic sections.
                $('.main.style1')
                    .scrollex({
                        mode: 'middle',
                        delay: 50,
                        initialize: function () {
                            $(this).addClass('inactive');
                        },
                        terminate: function () {
                            $(this).removeClass('inactive');
                        },
                        enter: function () {
                            $(this).removeClass('inactive');
                            var index = $(this).index('.main');
                            $li.eq(index).addClass('current');
                        },
                        leave: function () {
                            $(this).addClass('inactive');
                            var index = $(this).index('.main');
                            $li.eq(index).removeClass('current');
                        }
                    });

                $('.main.style2')
                    .scrollex({
                        mode: 'middle',
                        delay: 20,
                        initialize: function () {
                            $(this).addClass('inactive');
                        },
                        terminate: function () {
                            $(this).removeClass('inactive');
                        },
                        enter: function () {
                            $(this).removeClass('inactive');
                            var index = $(this).index('.main');
                            $li.eq(index).addClass('current');
                        },
                        leave: function () {
                            $(this).addClass('inactive');
                            var index = $(this).index('.main');
                            $li.eq(index).removeClass('current');
                        }
                    });

                $('#work')
                    .scrollex({
                        mode: 'middle',
                        delay: 20,
                        enter: function () {
                            var index = $(this).index('.main');
                            $li.eq(index).addClass('current');
                        },
                        leave: function () {
                            var index = $(this).index('.main');
                            $li.eq(index).removeClass('current');
                        }
                    });

                // Contact.
                $('#contact')
                    .scrollex({
                        top: '50%',
                        delay: 50,
                        initialize: function () {
                            $(this).addClass('inactive');
                        },
                        terminate: function () {
                            $(this).removeClass('inactive');
                        },
                        enter: function () {
                            $(this).removeClass('inactive');
                            var index = $(this).index('.main');
                            $li.eq(index).addClass('current');
                        },
                        leave: function () {
                            $(this).addClass('inactive');
                            var index = $(this).index('.main');
                            $li.eq(index).removeClass('current');
                        }
                    });

            };

            var off = function () {

                // Galleries.
                $('.gallery')
                    .unscrollex();

                // Generic sections.
                $('.main.style1')
                    .unscrollex();

                $('.main.style2')
                    .unscrollex();

                // Contact.
                $('#contact')
                    .unscrollex();

            };

            skel.on('change', function () {

                if (skel.breakpoint('small').active)
                    (off)();
                else
                    (on)();

            });

        }

        // Events.
        var resizeTimeout, resizeScrollTimeout;

        $window
            .resize(function () {


                // Disable animations/transitions.
                $body.addClass('is-resizing');

                window.clearTimeout(resizeTimeout);

                resizeTimeout = window.setTimeout(function () {

                    // Update scrolly links.
                    $('a[href^="#"]').scrolly({
                        speed: 1000,
                        offset: $header.outerHeight() - 1
                    });

                    // Re-enable animations/transitions.
                    window.setTimeout(function () {
                        $body.removeClass('is-resizing');
                        $window.trigger('scroll');
                    }, 0);

                }, 1);
            })
            .load(function () {
                $window.trigger('resize');
            });

        // 导航条的显示状态
        var isHided = false;
        $(window).on('scroll', function () {
            if (towards && distance > 100 && !isHided) {
                isHided = true;
                $header.stop(true);
                $header.slideUp('slow');
            } else if (!towards && distance > 50 && isHided) {
                isHided = false;
                $header.stop(true);
                $header.slideDown('fast');
            }
        });

    });
})(jQuery);
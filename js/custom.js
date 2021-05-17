
// const { find } = require("core-js/fn/array");



/*================================================
[  Table of contents  ]
================================================

:: Predefined Variables
:: Preloader
:: Mega menu
:: Search Bar
:: Owl carousel
:: Counter
:: Slider range
:: Countdown
:: Tabs
:: Accordion
:: List group item
:: Slick slider
:: Mgnific Popup
:: PHP contact form
:: Placeholder
:: Isotope
:: Scroll to Top
:: POTENZA Window load and functions

======================================
[ End table content ]
======================================*/

//POTENZA var
var POTENZA = {};

(function ($) {
  "use strict";

  /*************************
   Predefined Variables
   *************************/
  var $window = $(window),
    $document = $(document),
    $body = $('body'),
    $countdownTimer = $('.countdown'),
    $counter = $('.counter');

  //Check if function exists
  $.fn.exists = function () {
    return this.length > 0;
  };

  /*************************
   Preloader
   *************************/
  POTENZA.preloader = function () {
    $("#load").fadeOut();
    $('#loading').delay(0).fadeOut('slow');
  };

  /*************************
   Mega menu
   *************************/
  POTENZA.megaMenu = function () {
    if ($('#menu').length) {
      $('#menu').megaMenu({
        // DESKTOP MODE SETTINGS
        logo_align: 'left', // align the logo left or right. options (left) or (right)
        links_align: 'left', // align the links left or right. options (left) or (right)
        socialBar_align: 'left', // align the socialBar left or right. options (left) or (right)
        searchBar_align: 'right', // align the search bar left or right. options (left) or (right)
        trigger: 'hover', // show drop down using click or hover. options (hover) or (click)
        effect: 'fade', // drop down effects. options (fade), (scale), (expand-top), (expand-bottom), (expand-left), (expand-right)
        effect_speed: 400, // drop down show speed in milliseconds
        sibling: true, // hide the others showing drop downs if this option true. this option works on if the trigger option is "click". options (true) or (false)
        outside_click_close: true, // hide the showing drop downs when user click outside the menu. this option works if the trigger option is "click". options (true) or (false)
        top_fixed: false, // fixed the menu top of the screen. options (true) or (false)
        sticky_header: true, // menu fixed on top when scroll down down. options (true) or (false)
        sticky_header_height: 0, // sticky header height top of the screen. activate sticky header when meet the height. option change the height in px value.
        menu_position: 'horizontal', // change the menu position. options (horizontal), (vertical-left) or (vertical-right)
        full_width: false, // make menu full width. options (true) or (false)
        // MOBILE MODE SETTINGS
        mobile_settings: {
          collapse: true, // collapse the menu on click. options (true) or (false)
          sibling: true, // hide the others showing drop downs when click on current drop down. options (true) or (false)
          scrollBar: true, // enable the scroll bar. options (true) or (false)
          scrollBar_height: 400, // scroll bar height in px value. this option works if the scrollBar option true.
          top_fixed: true, // fixed menu top of the screen. options (true) or (false)
          sticky_header: false, // menu fixed on top when scroll down down. options (true) or (false)
          sticky_header_height: 0 // sticky header height top of the screen. activate sticky header when meet the height. option change the height in px value.
        }
      });
    }
  }

  /*************************
   Search Bar
   *************************/
  POTENZA.searchbar = function () {
    if ($(".search-top").exists()) {
      $('.search-btn').on("click", function () {
        $('.search-top').toggleClass("search-top-open");
        return false;
      });
      $("html, body").on('click', function (e) {
        if (!$(e.target).hasClass("not-click")) {}
      });
    }
  }

  /*************************
   owl carousel
   *************************/
  POTENZA.carousel = function () {


    // $(".owl-carousel").each(function () {
    //   var $this = $(this),
    //     $items = ($this.data('items')) ? $this.data('items') : 1,
    //     $loop = ($this.data('loop')) ? $this.data('loop') : true,
    //     $navdots = ($this.data('nav-dots')) ? $this.data('nav-dots') : false,
    //     $navarrow = ($this.data('nav-arrow')) ? $this.data('nav-arrow') : false,
    //     $autoplay = ($this.attr('data-autoplay')) ? $this.data('autoplay') : true,
    //     $space = ($this.attr('data-space')) ? $this.data('space') : 30;
    //   $(this).owlCarousel({
    //     loop: false,
    //     items: $items,
    //     responsive: {
    //       0: {
    //         items: $this.data('xx-items') ? $this.data('xx-items') : 1
    //       },
    //       480: {
    //         items: $this.data('xs-items') ? $this.data('xs-items') : 2
    //       },
    //       768: {
    //         items: $this.data('sm-items') ? $this.data('sm-items') : 3
    //       },
    //       980: {
    //         items: $this.data('md-items') ? $this.data('md-items') : 4
    //       },
    //       1200: {
    //         items: $items
    //       }
    //     },
    //     dots: $navdots,
    //     margin: $space,
    //     nav: $navarrow,
    //     navText: ["<i class='fa fa-angle-left fa-2x'></i>", "<i class='fa fa-angle-right fa-2x'></i>"],
    //     autoplay: false,
    //     autoplayHoverPause: true
    //   });

    // });


  }

  /*************************
   Counter
   *************************/
  POTENZA.counters = function () {
    if ($counter.exists()) {
      $counter.each(function () {
        var $elem = $(this);
        $elem.appear(function () {
          $elem.find('.timer').countTo();
        });
      });
    }
  };

  /*************************
   Slider range
   *************************/
  POTENZA.rangeslider = function () {

    function maskNumber(number) {
      let num = number + "";
      let n = 0;
      let text = "";
      for (let i = num.length - 1; i >= 0; i--) {

        const e = num[i];

        text = e + text;
        if (e === '.') {
          n = 0;
          continue;
        }

        n++;
        if (n === 3) {
          text = " " + text;
          n = 0;
        }
      }

      return text.trim();
    }

    if ($(".slider-range").exists()) {
      $(".slider-range").each(function () {
        let min = $(this).data("min");
        let max = $(this).data("max");

        let dmin = $(this).data("dmin");
        let dmax = $(this).data("dmax");
        let unity = $(this).data("unity");
        let input = $(this).siblings(".range-slider-input");
        let step = $(this).data("step");

        if (!unity) {
          unity = "";
        } else {
          unity = " " + unity;
        }

        if ($(this).siblings(".range-slider-hidden").length) {
          input.val(maskNumber(min) + " - " + maskNumber(max) + unity)
        }

        if (!step) {
          step = 1;
        }

        $(this).slider({
          range: true,
          min: min,
          max: max,
          values: [dmin, dmax],
          step: step,
          slide: function (event, ui) {
            var minV = ui.values[0],
              maxV = ui.values[1];



            // console.log("1: " + minV + " - " + maxV + unity);
            // console.log($(this).siblings(".range-slider-input").val());
            //            input.val(minV + " - " + maxV + unity);
            if ($(this).siblings(".range-slider-hidden").length) {
              $(this).siblings(".range-slider-hidden").val((minV + "-" + maxV).trim());
              // console.log($(this).siblings(".range-slider-hidden").val());

              $(this).prev().val(maskNumber(minV) + " - " + maskNumber(maxV) + unity);
            } else {
              $(this).prev().val(minV + " - " + maxV + unity);
            }
          }
        });
      })

    }

    if ($(".year-slide").exists()) {
      $(".year-range").each(function () {
        let min = $(this).data("min");
        let max = $(this).data("max");
        let dmin = $(this).data("dmin");
        let dmax = $(this).data("dmax");

        let unity = $(this).data("unity");
        if (!unity) {
          unity = "";
        } else {
          unity = " " + unity;
        }

        $(this).slider({
          range: true,
          min: min,
          max: max,
          values: [dmin, dmax],
          slide: function (event, ui) {
            var min = ui.values[0],
              max = ui.values[1];
            $(this).prev().val(min + " - " + max);
          }
        });
      })

    }

    if ($(".slider-range-uni").exists()) {
      $(".slider-range-uni").each(function () {
        let min = $(this).data("min");
        let max = $(this).data("max");
        let dmax = $(this).data("dmax");
        let dmin = $(this).data("dmin");
        let per = (dmax - min) / (max - min) * 100;
        let divPer = $(this).find(".slider-range-uni-val");
        let spanPer = $(this).find(".slider-range-uni-percent");
        divPer.css("width", per + "%");
        if (spanPer.length) {
          spanPer.text(Math.floor(per) + "%");
          spanPer.css("left", per + "%")
        }

        $(this).slider({
          min: min,
          max: max,
          values: [dmax],
          slide: function (event, ui) {
            var val = ui.value;
            let per = (val - min) / (max - min) * 100;
            divPer.css("width", per + "%");
            $(this).parents(".range-slider").find(".range-slider-input").val(val);
            if (spanPer.length) {
              spanPer.text(Math.floor(per) + "%");
              spanPer.css("left", per + "%")
            }
          }
        });
      })
    }
  }

  /*************************
   Countdown
   *************************/
  POTENZA.countdownTimer = function () {
    if ($countdownTimer.exists()) {
      $countdownTimer.downCount({
        date: '10/05/2019 12:00:00',
        offset: 400
      });
    }
  };

  /*************************
   Tabs
   *************************/
  POTENZA.tabs = function () {
    var $tabsdata = $("#tabs li[data-tabs]"),
      $tabscontent = $(".tabcontent"),
      $tabsnav = $(".tabs li");

    $tabsdata.on('click', function () {
      $(this).parent().parent().find('.active').removeClass('active');
      $(this).parent().parent().find('.tabcontent').hide();
      var tab = $(this).data('tabs');
      $(this).addClass('active');
      $('#' + tab).fadeIn().show();
    });

    $tabsnav.on('click', function () {
      var cur = $tabsnav.index(this);
      var elm = $(this).parent().parent().find('.tabcontent:eq(' + cur + ')');
      elm.addClass("pulse");
      setTimeout(function () {
        elm.removeClass("pulse");
      }, 220);
    });
    $("li[data-tabs]").each(function () {
      $(this).parent().parent().find('.tabcontent').hide().filter(':first').show();
    });
  }

  /*************************
   Accordion
   *************************/
  POTENZA.accordion = function () {
    var $acpanel = $(".accordion > .accordion-content"),
      $acsnav = $(".accordion > .accordion-title > a");

    $acpanel.hide().first().slideDown("easeOutExpo");
    $acsnav.first().addClass("active");
    $acsnav.on('click', function () {
      var $this = $(this).parent().next(".accordion-content");
      if (!$(this).parents(".accordion-solo").length) {

        $acsnav.removeClass("active");
        $(this).addClass("active");
        $acpanel.not($this).slideUp("easeInExpo");
        $(this).parent().next().slideDown("easeOutExpo");

      } else {
        $(this).toggleClass("active");
        $(this).parent().next().slideToggle("easeInExpo");
      }
      return false;
    });


  }

  /*************************
   List group item
   *************************/
  POTENZA.featurelist = function () {
    var $featurenav = $(".list-group-item a");
    $featurenav.on('click', function () {
      // if (!($(this).hasClass("current"))) {
      //   $featurenav.removeClass("current").next("ul").slideUp();
      // }
      $(this).toggleClass("current");
      $(this).next("ul").slideToggle("slow");
      return false;
    });
  }

  /*************************
   Slick slider
   *************************/
  POTENZA.slickslider = function () {
    if ($(".slider-slick").exists()) {
      $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        asNavFor: '.slider-nav'
      });
      $('.slider-nav').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots: false,
        centerMode: true,
        focusOnSelect: true
      });
    }
  }

  /*************************
   NiceScroll
   *************************/
  POTENZA.pniceScroll = function () {
    if ($(".scrollbar").exists()) {
      $(".scrollbar").niceScroll({
        scrollspeed: 150,
        mousescrollstep: 38,
        cursorwidth: 5,
        cursorborder: 0,
        cursorcolor: '#2f3742',
        autohidemode: true,
        zindex: 99999,
        horizrailenabled: false,
        cursorborderradius: 0,
      });
    }
  }

  /*************************
   Magnific Popup
   *************************/
  POTENZA.mediaPopups = function () {
    if ($(".popup-gallery").exists()) {
      $('.popup-gallery').magnificPopup({
        delegate: 'a.popup-img',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
          enabled: true,
          navigateByImgClick: true,
          preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
          tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
          titleSrc: function (item) {
            return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
          }
        }
      });
    }
    if ($(".popup-youtube, .popup-vimeo, .popup-gmaps").exists()) {
      $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
      });
    }
  }

  /*************************
   PHP contact form
   *************************/
  POTENZA.contactform = function () {
    $("#contactform").submit(function (event) {
      $("#ajaxloader").show();
      $("#contactform").hide();
      $.ajax({
        url: 'php/contact-form.php',
        data: $(this).serialize(),
        type: 'post',
        success: function (response) {
          $("#ajaxloader").hide();
          $("#contactform").show();

          $("#formmessage").html(response).show().delay(2000).fadeOut('slow');
        }
      });
      event.preventDefault();
    });
  }

  /*************************
   Placeholder
   *************************/
  POTENZA.placeholder = function () {
    /*var $placeholder = $('[placeholder]');
    $placeholder.focus(function () {
      var input = $(this);
      if (input.val() == input.attr('placeholder')) {
        input.val('');
        input.removeClass('placeholder');
      }
    }).blur(function () {
      var input = $(this);
      if (input.val() == '' || input.val() == input.attr('placeholder')) {
        input.addClass('placeholder');
        input.val(input.attr('placeholder'));
      }
    }).blur().parents('form').submit(function () {
      $(this).find('[placeholder]').each(function () {
        var input = $(this);
        if (input.val() == input.attr('placeholder')) {
          input.val('');
        }
      })
    });*/
  }

  /*************************
   Isotope
   *************************/
  POTENZA.Isotope = function () {
    var $isotope = $(".isotope"),
      $itemElement = '.grid-item',
      $filters = $('.isotope-filters');
    if ($isotope.exists()) {
      $isotope.isotope({
        resizable: true,
        itemSelector: $itemElement,
        masonry: {
          gutterWidth: 10
        }
      });
      $filters.on('click', 'button', function () {
        var $val = $(this).attr('data-filter');
        $isotope.isotope({
          filter: $val
        });
        $filters.find('.active').removeClass('active');
        $(this).addClass('active');
      });
    }
  }

  // masonry
  POTENZA.masonry = function () {
    var $masonry = $('.masonry-main .masonry'),
      $itemElement = '.masonry-main .masonry-item';
    if ($masonry.exists()) {
      $masonry.isotope({
        resizable: true,
        itemSelector: $itemElement,
        masonry: {
          gutterWidth: 10
        }
      });
    }
  }

  /*************************
   Scroll to Top
   *************************/
  POTENZA.scrolltotop = function () {
    var $scrolltop = $('.car-top');

    $scrolltop.on('click', function () {
      $('html,body').animate({
        scrollTop: 0
      }, 800);
      // $(this).addClass("car-run");
      // setTimeout(function () {
      //   $scrolltop.removeClass('car-run');
      // }, 1000);
      return false;
    });
    $window.on('scroll', function () {
      if ($window.scrollTop() >= 200) {
        $scrolltop.addClass("show");
        $scrolltop.addClass("car-down");
      } else {
        $scrolltop.removeClass("show");
        setTimeout(function () {
          $scrolltop.removeClass('car-down');
        }, 300);
      }
    });
  }

  /*************************
   Scroll to Top
   *************************/
  POTENZA.sidebarfixed = function () {
    if ($(".listing-sidebar").exists()) {
      (function () {
        var reset_scroll;

        if ($("[data-sticky_column]").length) {
          $(function () {
            return $("[data-sticky_column]").stick_in_parent({
              parent: "[data-sticky_parent]"
            });
          });
        }

        reset_scroll = function () {
          var scroller;
          scroller = $("body,html");
          scroller.stop(true);
          if ($(window).scrollTop() !== 0) {
            scroller.animate({
              scrollTop: 0
            }, "fast");
          }
          return scroller;
        };

        window.scroll_it = function () {
          var max;
          max = $(document).height() - $(window).height();
          return reset_scroll().animate({
            scrollTop: max
          }, max * 3).delay(100).animate({
            scrollTop: 0
          }, max * 3);
        };
        window.scroll_it_wobble = function () {
          var max, third;
          max = $(document).height() - $(window).height();
          third = Math.floor(max / 3);
          return reset_scroll().animate({
            scrollTop: third * 2
          }, max * 3).delay(100).animate({
            scrollTop: third
          }, max * 3).delay(100).animate({
            scrollTop: max
          }, max * 3).delay(100).animate({
            scrollTop: 0
          }, max * 3);
        };

        $(window).on("resize", (function (_this) {
          return function (e) {
            return $(document.body).trigger("sticky_kit:recalc");
          };
        })(this));

      }).call(this);

      (function () {
        var sticky;
        if (window.matchMedia('(min-width: 768px)').matches) {
          $(".listing-sidebar").sticky({
            topSpacing: 0
          });
        }
      });
    }
  }

  /****************************************************
   Main script
   ****************************************************/
  POTENZA.mainScript = function () {

    // $(".form-control[required]").each(function(){
    //   let placeHolder = $(this).attr("placeholder"); 
    //   $(this).attr("placeholder",placeHolder + " *")
    // })


    if ($("[data-sameheight]").length) {
      if ($(window).width() > 991) {
        let elms = $("[data-sameheight]");
        elms.each(function () {
          let elm = $($(this).data("sameheight"));

          let maxHeight = 0;
          elm.each(function () {
            if (maxHeight < elm.height()) {
              maxHeight = elm.height();
            }
          });
          elm.height(maxHeight);

        });
      }

    }


    if ($(".back_to_last_page-btn").length) {
      $(".back_to_last_page-btn").click(function (e) {
        e.preventDefault();
        window.history.back();
      })
    }

    if ($(".pass-visible").length) {
      $(".pass-visible").click(function (e) {
        e.preventDefault();
        let ele = $(this);
        ele.toggleClass("show");
        if (ele.hasClass("show")) {
          ele.siblings(".form-control").attr("type", "text")
        } else {

          ele.siblings(".form-control").attr("type", "password")
        }
      });
    }

    let firstLoad = true;

    $(".simulateur-credit .ifram").on('load', function () {

      if (firstLoad) {
        firstLoad = false;
      } else {
        $(".simulateur-credit .section-title").hide();
      }


      $(window).scrollTop(100);

    });

    // $(".form-check").click(function (e) { 
    //   e.preventDefault();
    //   console.log($(this).attr("class"))
    //   $(this).find(".form-check-label").click();
    // });

    if ($(".select2").length) {
      $(".select2").select2({
        formatNoMatches: function () {
          return "Aucun résultat trouvé";
        }
      });
    }
    if ($('select:not(.select2)').length) {
      $('select:not(.select2)').select2({
        minimumResultsForSearch: -1
      });
    }

    $(window).click(function () {
      $(".drop-down-box").removeClass("open");
      $(".drop-down-box .drop-down-box-body").slideUp();
    });

    $(".drop-down-box").click(function (e) {
      e.preventDefault();
      e.stopPropagation();
      $(this).addClass("open");
      $(this).find(".drop-down-box-body").slideDown();
    });

    $(".drop-down-box .drop-down-box-top").click(function (e) {
      e.preventDefault();
      let parent = $(this).parents(".drop-down-box");
      if (parent.hasClass("open")) {
        parent.removeClass("open");
        $(this).siblings(".drop-down-box-body").slideToggle();
        e.stopPropagation();
      }
    });

    $(".drop-down-box .btn-ok").click(function (e) {
      e.preventDefault();
      let parent = $(this).parents(".drop-down-box");
      parent.removeClass("open");
      parent.find(".drop-down-box-body").slideUp();
      e.stopPropagation();
    });


    $(document).on("click", ".disabled", function (e) {
      return
    });

    $(".disable-change").change(function (e) {
      e.preventDefault();
      let val = $(this).val();
      let dchange = $(this).data("dchange")
      if (val !== "") {
        $("." + dchange).removeClass("disabled")
        $("." + dchange).addClass("disabled-false")
      } else {
        $("." + dchange).addClass("disabled")
        $("." + dchange).removeClass("disabled-false")
      }
    });

    $(".btn-initialis").click(function (e) {
      e.preventDefault();

      $(".search-block select").prop('selectedIndex', 0).change();
      $('.slider-range').each(function () {
        $(this).slider("destroy");

      });
      POTENZA.rangeslider();
    });


    $(".search-block .btn-more").click(function (e) {
      e.preventDefault();
      $(this).toggleClass("open");
      $(this).siblings(".search-more").slideToggle();
    });

    $(".tab-filters .btn-filter").click(function (e) {
      e.preventDefault();

      $(this).parents(".tab-filters").find(".btn-filter").removeClass("active");
      $(this).addClass("active");

      let filterClass = $(this).data("filter");

      if (filterClass === "all") {
        $(".tab-filter").show();
      } else {
        $(".tab-filter").hide();
        $("." + filterClass).show();
        console.log("." + filterClass);

      }
    });


    //footer popup
    function getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
    var footerPopUp = getCookie("footerPopUp");
    if (footerPopUp !== "true") {



      let footerIsShow = false;

      function isOnScreen(element) {
        var curPos = element.offset();
        var curTop = curPos.top - $(window).scrollTop();
        var screenHeight = $(window).height();
        return (curTop > screenHeight) ? false : true;
      }
      if ($('.footer-2').length) {
        $(window).scroll(function () {
          if (!footerIsShow) {
            if (isOnScreen($('.footer-2'))) {
              $(".footer-popup").addClass("show");
              footerIsShow = true;
            }
          }
        });
      }


      window.onscroll = function (ev) {
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
          $(".footer-popup").addClass("show");
        }
      };
      $(".footer-popup-close").click(function (e) {
        e.preventDefault();
        $(".footer-popup").removeClass("show");
        document.cookie = "footerPopUp=true";
        setTimeout(function () {
          $(".footer-popup").remove()
        }, 500)
      });
    } else {
      $(".footer-popup").remove()
    }
    //bookin model
    $("#model-booking .btn-send").click(function (e) {
      e.preventDefault();
      $("#model-booking .btn-send .load-icon").show();

      //inside of appel ajax
      $("#model-booking .booking-form").hide();
      $("#model-booking .success-box").show();
      $("#model-booking .btn-send .load-icon").hide();
      //-------
    });

    // image model

    let goTo = 0;
    let isSlick = false;
    if ($(".vehicul-images-slider").length) {
      $(".btn-view-photo_model").each(function () {
        $(".vehicul-images-slider").append($(this).find("img")[0].outerHTML);
      });


    }

    $(".btn-view-photo_model").click(function (e) {
      e.preventDefault();
      goTo = $(".btn-view-photo_model").index($(this))
      $('.vehicul-images-slider').slick('slickGoTo', goTo);
      // let imgSrc = $(this).data("imgsrc");
      // $("#photo_model .photo_model_img").attr("src", imgSrc);
    });

    $('#photo_model').on('shown.bs.modal', function () {
      if (!isSlick) {
        $(".vehicul-images-slider").slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
        });
        isSlick = true;
      }

    })


    $('#model-booking').on('hidden.bs.modal', function () {
      $("#model-booking .btn-send .load-icon").hide();
      $("#model-booking .booking-form").show();
      $("#model-booking .success-box").hide();
    })

    //tags filter ----------
    $(".tag-remove").click(function (e) {
      e.preventDefault();
      $(this).parents("li").remove()
    });

    //filte side bar
    $(".product-listing .show-more").click(function (e) {
      e.preventDefault();
      $(this).toggleClass("open");
      let items = $(this).parents(".product-listing").find('.list-group-item.more');
      if (items.hasClass("show")) {

        items.removeClass("show")
        items.hide();

      } else {
        items.each(function () {
          $(this).show();
          $(this).addClass("show")
        })

      }

    });

    $(".menu-mobile-collapse-trigger").click(function (e) {
      e.preventDefault();
      $("#header .bg-close").fadeToggle();
    });

    $("#header .bg-close").click(function (e) {
      e.preventDefault();
      $(".menu-mobile-collapse-trigger").click();
    });

    $(".btn-print").click(function (e) {
      e.preventDefault();
      window.print()
    });



    if ($(".detail-big-car-gallery-video").length) {

      let galleryHeith = $(".detail-big-car-gallery .img-fluid").height();
      $(".detail-big-car-gallery-video").height(galleryHeith);
      $(window).resize(function () {
        let galleryHeith = $(".detail-big-car-gallery .img-fluid").height();
        console.log(galleryHeith);

        $(".detail-big-car-gallery-video").height(galleryHeith);
      });
    }

    $(".detail-big-car-gallery-video .btn-play").click(function (e) {
      e.preventDefault();
      let parent = $(this).parents(".detail-big-car-gallery-video");
      parent.addClass("vplay");
      parent.find(".bg").fadeOut();
      let iframe = $(this).parents(".detail-big-car-gallery-video").find("iframe");
      let vSrc = iframe.attr("src");
      iframe.attr("src", vSrc + "?autoplay=1");


    });


    $(".detail-big-car-gallery-video .btn-close").click(function (e) {
      e.preventDefault();
      let parent = $(this).parents(".detail-big-car-gallery-video");
      parent.removeClass("vplay");
      parent.find(".bg").fadeIn();
      let iframe = $(this).parents(".detail-big-car-gallery-video").find("iframe");
      let vSrc = iframe.attr("src").replace('?autoplay=1', '');
      iframe.attr("src", vSrc);
    });


    // toggle visible
    $(".visible-toggle").click(function (e) {
      e.preventDefault();
      let objs = $(this).data("toggle-to");
      $(objs).toggleClass('d-none')
    });
    $(".btn-chevron-more").click(function (e) {
      e.preventDefault();
      $(this).toggleClass("open")
    });

    // fotter drobdown

    $(".footer-2 .usefull-link h2").click(function (e) {
      e.preventDefault();
      let winWidht = $(window).width();
      if (winWidht < 768) {
        $(this).siblings("ul").slideToggle();
        $(this).toggleClass("open")
      }
    });


    // detail view change 
    $(".btn-change-view").click(function (e) {
      e.preventDefault();
      $(".btn-change-view").removeClass("active");
      $(this).addClass("active");
      if ($(this).hasClass("list-view")) {
        $(".list_vehicule").removeClass("list-show")
        $(".list_vehicule > div").removeClass("col-lg-12")
        document.cookie = "vehicules_view=card";
      } else {
        document.cookie = "vehicules_view=list";
        $(".list_vehicule").addClass("list-show")
        $(".list_vehicule > div").addClass("col-lg-12")
      }
    });

    // home car carousel filter

    let tabFilterItems = $(".tab-filters-items .tab-filter");
    if (tabFilterItems.length) {

      let carouselAll = "<div class='tab-filter'> <div class='owl-carousel owl-carouser-filter'>";
      let carouselFlash = "<div class='tab-filter-flash offer-flash' style='display:none'> <div class='owl-carousel owl-carouser-filter'>";

      tabFilterItems.each(function () {
        carouselAll += $(this).html();

        if ($(this).hasClass("offer-flash")) {
          carouselFlash += $(this).html();
        }
      })

      carouselAll += "</div></div>";
      carouselFlash += "</div></div>"

      $(".tab-filters-items-mobile").html(carouselAll + carouselFlash);


      $(".owl-carouser-filter").owlCarousel({
        loop: false,
        items: 3,
        responsive: {
          0: {
            items: 1,
          },
          567: {
            items: 1,
          },
          768: {

            items: 2,
          },
          992: {

            items: 3,
          },
          1200: {
            items: 3,
          }
        },
        dots: true,
        margin: 15,
        nav: true,
        navText: ["<i class='fa fa-angle-left fa-2x'></i>", "<i class='fa fa-angle-right fa-2x'></i>"],
        autoplay: false,
        autoplayHoverPause: true
      });

    }

    if ($(".owl-nos-services,.owl-offres-similaires").length) {
      $(".owl-nos-services,.owl-offres-similaires").owlCarousel({
        loop: false,
        items: 3,
        responsive: {
          0: {
            items: 1,
          },
          567: {
            items: 1,
          },
          768: {

            items: 2,
          },
          992: {

            items: 3,
          },
          1200: {
            items: 4,
            mouseDrag: false
          }
        },
        dots: true,
        margin: 15,
        nav: true,
        navText: ["<i class='fa fa-angle-left fa-2x'></i>", "<i class='fa fa-angle-right fa-2x'></i>"],
        autoplay: false,
        autoplayHoverPause: true
      });
    }

    if ($(".card-vehicul-compar").length) {
      $(".card-vehicul-compar").eq(0).find(".card-vehicul-compar-header").addClass("show");
      $(".card-vehicul-compar").eq(0).find(".card-vehicul-compar-body").show();
      $(".card-vehicul-compar-header").click(function (e) {
        e.preventDefault();
        let body = $(this).siblings(".card-vehicul-compar-body");
        $(".card-vehicul-compar-body").slideUp();
        $(".card-vehicul-compar-header").removeClass("show")
        if (body.is(":visible")) {
          body.slideUp();
          $(this).removeClass("show")
        } else {
          body.slideDown();
          $(this).addClass("show")
        }

      });
    }

    // filter mobile
    $(".filter-box .filter-box-open").click(function (e) {
      e.preventDefault();
      $(".filter-box").toggleClass("show");
      $(".listing-sidebar").toggleClass("show");
      if ($(".listing-sidebar").hasClass("show")) {
        $("body").css("overflow-y", "hidden");
      } else {
        $("body").css("overflow-y", "auto");
      }
      e.stopPropagation();
    });

    $(".filter-box .listing-sidebar,.filter-box .filter-box-mobile-top").click(function (e) {
      // e.preventDefault();
      e.stopPropagation();
    });

    $(".filter-box .filter-box-close, .filter-box").click(function (e) {
      e.preventDefault();
      if ($(".listing-sidebar").hasClass("show")) {
        $(".filter-box").removeClass("show");
        $(".listing-sidebar").removeClass("show");
        $("body").css("overflow-y", "auto");
      }
    });


    function bs_input_file() {
      $(".input-file").before(
        function () {
          if (!$(this).prev().hasClass('input-ghost')) {
            var element = $("<input type='file' class='input-ghost' style='display:none'>");
            element.attr("name", $(this).attr("name"));
            element.change(function () {
              element.next(element).find('input').val((element.val()).split('\\').pop());
            });
            $(this).find("button.btn-choose").click(function () {
              element.click();
            });
            $(this).find("button.btn-reset").click(function () {
              element.val(null);
              $(this).parents(".input-file").find('input').val('');
            });
            $(this).find('input').css("cursor", "pointer");
            $(this).find('input').mousedown(function () {
              $(this).parents('.input-file').prev().click();
              return false;
            });
            return element;
          }
        }
      );
    }

    $(function () {
      bs_input_file();
    });

    //autourMoi
    $("#autourMoi").click(function (e) {
      e.preventDefault();
      $([document.documentElement, document.body]).animate({
        scrollTop: $("#map").offset().top - 100
      }, 500);
    });

    if ($(".avis-slick").length) {
      $(".avis-slick").slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true
      });
    }


    $(".a2a_overlay").html(
                    `<div class="closs-box"><button type="button" class="close">
                      <span aria-hidden="true">×</span>
                    </button></div>`);



  }

  POTENZA.DragFileUpload = function () {
    "use strict"
    if ($("#fileDrag").length) {
      var fileList = []
      var fileDrag = document.getElementById("fileDrag")


      // get file list when user click on Select button

      document.getElementById("file").addEventListener("change", (e) => {
        fileList = e.target.files;

        let fileLenght = $("#list li").length + fileList.length;
        console.log(fileLenght);

        if (fileLenght > 5) {
          alert("Il faut envoyer que 5 photo")
        } else {
          handleFiles(fileList);
        }
      }, false)


      fileDrag.addEventListener("dragenter", (e) => {
        e.stopPropagation()
        e.preventDefault()

        fileDrag.classList.add("dragenter")
      }, false)

      fileDrag.addEventListener("dragover", (e) => {
        e.stopPropagation()
        e.preventDefault()
      }, false)

      fileDrag.addEventListener("dragleave", (e) => {
        e.stopPropagation()
        e.preventDefault()

        fileDrag.classList.remove("dragenter")
      }, false)

      fileDrag.addEventListener("drop", (e) => {
        e.stopPropagation()
        e.preventDefault()
        fileDrag.classList.remove("dragenter")

        fileList = e.dataTransfer.files

        handleFiles(fileList);




      }, false)



      // $(document).on("change", "#file", function (e) {

      //   let val = $(this)[0].files;
      //   console.log(val);


      // })

      // $(document).on("click", "#list > li .btn-remove", function (e) {
      //   e.preventDefault();
      //   let parent = $(this).parents("li");
      //   let imageName = $(this).data("name");
      //   let input = $('#file');
      //   let images = Array.from(input[0].files)
      //   console.log(input[0])
      //   console.log(input[0].files)
      //   console.log(images)

      //   $.each(images, function (index, file) {
      //     if (file && imageName === file.name) {
      //       console.log('hadi', index, file)
      //       images.splice(index, 1);
      //       parent.remove();
      //     } else {
      //       console.log(index, file)
      //     }
      //   })
      //   // remove all files
      //   //input[0].value = "";
      //   console.log(images)
      //   console.log(input[0].files)
      // });


      var handleFiles = (files) => {

        let list = document.getElementById("list")

        let imageType = /^image\//;

        for (let file of files) {

          let li = document.createElement("li")
          let thumbWrapper = document.createElement("div")

          // remove folders
          if (file.type == "") {
            continue
          }
          // check if the file type is image
          else if (imageType.test(file.type)) {

            let img = document.createElement("img")
            img.file = file

            thumbWrapper.appendChild(img)

            // read image content
            let reader = new FileReader()
            reader.readAsDataURL(file)

            reader.onload = ((aImg) => {

              return (e) => {
                aImg.src = e.target.result
              }

            })(img)
          }
          // other file types
          else {
            let divThumb = document.createElement("div")
            divThumb.classList.add("thumb-ext")
            divThumb.innerText = file.name.split('.').pop().toUpperCase();
            thumbWrapper.appendChild(divThumb)
          }

          thumbWrapper.classList.add("thumb-wrapper")
          li.appendChild(thumbWrapper)

          let divInfo = document.createElement("div")
          let divName = document.createElement("div")
          let divSize = document.createElement("div")
          // let divLastModified = document.createElement("div")
          let btnRemove = document.createElement("button")
          btnRemove.setAttribute('class', 'btn-remove');
          btnRemove.setAttribute('type', 'button');
          btnRemove.setAttribute('data-name', file.name);
          btnRemove.textContent = "×";


          divName.innerText = file.name
          divName.setAttribute('class', 'img-title');
          divSize.innerText = `Taille: ${formatBytes(file.size)}`
          // divLastModified.innerText = `Last modified date: ${file.lastModifiedDate}`

          divInfo.classList.add("file-info")
          divInfo.appendChild(divName)
          divInfo.appendChild(divSize)
          // divInfo.appendChild(divLastModified)
          li.appendChild(divInfo)
          li.appendChild(btnRemove);

          list.appendChild(li)


        }

      }

      function formatBytes(a, b = 2) {
        if (0 === a) return "0 Bytes";
        const c = 0 > b ? 0 : b,
          d = Math.floor(Math.log(a) / Math.log(1024));
        return parseFloat((a / Math.pow(1024, d)).toFixed(c)) + " " + ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d]
      }




    }



  }
  POTENZA.FormWizard = function () {

    // register pro form-wizard
    /*var registrationForm = $("#registration-form");

    if (registrationForm.length) {
      let nextText = registrationForm.data("next");
      let prevText = registrationForm.data("prev");
      let finishText = registrationForm.data("finish");

      registrationForm.steps({
        headerTag: ".step-title",
        bodyTag: "section",
        transitionEffect: "fade",
        titleTemplate: '<span class="step"></span> #title#',
        labels: {
          next: nextText,
          previous: prevText,
          finish: finishText
        },
        onStepChanging: function (event, currentIndex, newIndex) {

          if (newIndex == 3) {
            postRegisterForm();
            $('.registration .wizard-content .wizard > .actions > ul').hide();
            $('.registration .nb').hide();
          } else {
            $('.registration .wizard-content .wizard > .actions > ul').show();
            $('.registration .nb').show();
          }

          return true;

        }
      });
    }

    function postRegisterForm() {
      alert("send register form")
    }*/


    // reprise form-wizard
    /*var repriseForm = $("#reprise-form");
    repriseForm.vInfoEtape = 1;
    if (repriseForm.length) {
      let nextText = repriseForm.data("next");
      let prevText = repriseForm.data("prev");
      let finishText = repriseForm.data("finish");
      repriseForm.steps({
        headerTag: ".step-title",
        bodyTag: "section",
        transitionEffect: "fade",
        titleTemplate: '<span class="step"></span> #title#',
        labels: {
          next: nextText,
          previous: prevText,
          finish: finishText
        },
        onStepChanging: function (event, currentIndex, newIndex) {

          let vInfo = $(".vehicule-info");
          if (newIndex == 2) {
            if (repriseForm.vInfoEtape == 1){
              vInfo.hide();
              $(".vehicule-info.vehicule-info-2").fadeIn();
              repriseForm.vInfoEtape = 2;

              return false;
            }
          }
          if(newIndex == 0){
            if (repriseForm.vInfoEtape == 2){
              vInfo.hide();
              $(".vehicule-info.vehicule-info-1").fadeIn();
              repriseForm.vInfoEtape = 1;

              return false;
            }
          }

          if (newIndex == 2) {
            postRepriseForm();
            $('.reprise-wizard .wizard-content .wizard > .actions > ul').hide();
            $('.reprise-wizard .nb').hide();
          } else {
            $('.reprise-wizard .wizard-content .wizard > .actions > ul').show();
            $('.reprise-wizard .nb').show();
          }

          return true;

        }
      });
    }*/

    $(".reprise-wizard .btn-vr-inconu").click(function (e) {
      e.preventDefault();
      $(".wizard-content .wizard > .actions > ul > li > a[href='#next']").click();
    });

    /*function postRepriseForm() {
      alert("send reprise form")
    }*/




    $("#faq-search").keyup(function (e) {
      let val = $(this).val();
      console.log(val);
      $(".accordion .accordion-title a h2").each(function (e) {
        let textH2 = $(this).text();
        console.log(textH2.toLowerCase().indexOf(val.toLowerCase()));

        if (textH2.toLowerCase().indexOf(val.toLowerCase()) == -1) {
          $(this).parents(".accordion-title").addClass("d-none");
          $(this).parents(".accordion-title").next().addClass("d-none");
        } else {
          $(this).parents(".accordion-title").removeClass("d-none");
          $(this).parents(".accordion-title").next().removeClass("d-none");
        }
      })
    });

    if ($('#comparator-sticky').length) {
      $("#comparator-sticky .btn-compare").click(function (e) {
        e.preventDefault();
        $("#comparator-sticky").toggleClass("open")
      });
    }


  }

  POTENZA.FormValidate = function () {


    $.extend($.validator.messages, {
      required: "Ce champ est obligatoire.",
      remote: "Veuillez corriger ce champ.",
      email: "Veuillez saisir un email valide.",
      url: "Veuillez fournir une adresse URL valide.",
      date: "Veuillez fournir une date valide.",
      dateISO: "Veuillez fournir une date valide (ISO).",
      number: "Veuillez fournir un numéro valide.",
      digits: "Veuillez fournir seulement des chiffres.",
      creditcard: "Veuillez fournir un numéro de carte de crédit valide.",
      equalTo: "Veuillez fournir encore la même valeur.",
      notEqualTo: "Veuillez fournir une valeur différente, les valeurs ne doivent pas être identiques.",
      extension: "Veuillez fournir une valeur avec une extension valide.",
      maxlength: $.validator.format("Veuillez fournir au plus {0} caractères."),
      minlength: $.validator.format("Veuillez fournir au moins {0} caractères."),
      rangelength: $.validator.format("Veuillez fournir une valeur qui contient entre {0} et {1} caractères."),
      range: $.validator.format("Veuillez fournir une valeur entre {0} et {1}."),
      max: $.validator.format("Veuillez fournir une valeur inférieure ou égale à {0}."),
      min: $.validator.format("Veuillez fournir une valeur supérieure ou égale à {0}."),
      step: $.validator.format("Veuillez fournir une valeur multiple de {0}."),
      maxWords: $.validator.format("Veuillez fournir au plus {0} mots."),
      minWords: $.validator.format("Veuillez fournir au moins {0} mots."),
      rangeWords: $.validator.format("Veuillez fournir entre {0} et {1} mots."),
      letterswithbasicpunc: "Veuillez fournir seulement des lettres et des signes de ponctuation.",
      alphanumeric: "Veuillez fournir seulement des lettres, nombres, espaces et soulignages.",
      lettersonly: "Veuillez fournir seulement des lettres.",
      nowhitespace: "Veuillez ne pas inscrire d'espaces blancs.",
      ziprange: "Veuillez fournir un code postal entre 902xx-xxxx et 905-xx-xxxx.",
      integer: "Veuillez fournir un nombre non décimal qui est positif ou négatif.",
      vinUS: "Veuillez fournir un numéro d'identification du véhicule (VIN).",
      dateITA: "Veuillez fournir une date valide.",
      time: "Veuillez fournir une heure valide entre 00:00 et 23:59.",
      phoneUS: "Veuillez fournir un numéro de téléphone valide.",
      phoneUK: "Veuillez fournir un numéro de téléphone valide.",
      mobileUK: "Veuillez fournir un numéro de téléphone mobile valide.",
      strippedminlength: $.validator.format("Veuillez fournir au moins {0} caractères."),
      email2: "Veuillez fournir une adresse électronique valide.",
      url2: "Veuillez fournir une adresse URL valide.",
      creditcardtypes: "Veuillez fournir un numéro de carte de crédit valide.",
      ipv4: "Veuillez fournir une adresse IP v4 valide.",
      ipv6: "Veuillez fournir une adresse IP v6 valide.",
      require_from_group: "Veuillez fournir au moins {0} de ces champs.",
      nifES: "Veuillez fournir un numéro NIF valide.",
      nieES: "Veuillez fournir un numéro NIE valide.",
      cifES: "Veuillez fournir un numéro CIF valide.",
      postalCodeCA: "Veuillez fournir un code postal valide."
    });

    jQuery.validator.addMethod("telephoneValid", function (value, element) {
      // allow any non-whitespace characters as the host part
      return this.optional(element) || /^((06)|(07)|(05))[0-9]{8}$/.test(value);
    }, 'Veuillez saisir un N° de téléphone valide. (06xxxxxxxx, 07xxxxxxxx, 05xxxxxxxx)');


    let form = $("form");
    let phoneRules = {
      required: true,
      telephoneValid: true,
      maxlength: 10
    }
    let allPhones = {};
    $("input[name*='phone']").each(function () {
      allPhones[$(this).attr("name")] = phoneRules
    })


    form.each(function () {
      $(this).validate({
        // focusInvalid: false,
        // errorPlacement: function errorPlacement(error, element) {
        //   element.before(error);
        // },
        ignore: false,
        rules: {
          // "password_update[newPassword]": {
          //   minlength: 5
          // },
          // "password_update[confirmPassword]": {
          //   minlength: 5,
          //   equalTo: '#password_update_confirmPassword'
          // },
          confirm: {
            equalTo: "#password"
          },
          ...allPhones
        }
      });
    });



  }
  POTENZA.PasseValidate = function () {

    var password = [];
    var password2 = [];


    password = $('.password_new_password');
    password2 = $('.password_confirm_assword');

    var ruleValidator = function () {
      var pswd = $(this).val();
      //gets what is being input in the field and sets as variable

      if (pswd.length < 8) {
        $('#length').removeClass('valid').addClass('invalid');
      } else {
        $('#length').removeClass('invalid').addClass('valid');
        console.log('length ' + pswd.length);
      }

      // letter
      if (pswd.match(/[a-z]/)) {
        $('#letter').removeClass('invalid').addClass('valid');
      } else {
        $('#letter').removeClass('valid').addClass('invalid');
      }

      // Capital
      if (pswd.match(/[A-Z]/)) {
        $('#capital').removeClass('invalid').addClass('valid');
      } else {
        $('#capital').removeClass('valid').addClass('invalid');

      }

      // number
      if (pswd.match(/\d/)) {
        $('#number').removeClass('invalid').addClass('valid');
      } else {
        $('#number').removeClass('valid').addClass('invalid');
      }

      // character
      if (pswd.match(/[$&+,:;=?@#|'<>.^*()%!-]/)) {
        $('#special').removeClass('invalid').addClass('valid');
        console.log('log: ' + pswd);
      } else {
        $('#special').removeClass('valid').addClass('invalid');
      }
    }

    // password.focus(function () {
    //   // (triggers whenever the password field is selected by the user)
    //   $('.pswd_info').fadeIn('low');
    // });
    // password.blur(function () {
    //   // (triggers whenever the password field is unselected)
    //   $('.pswd_info').fadeOut('low');
    // });
    $('.passwordButton').on('click', function (e) {
      e.preventDefault();
      $('.incorrectMsg').hide();
      var form = $(".update_pass_form");
      if (form.valid()) {
        if (password.val() !== password2.val()) {
          $('.incorrectMsg').show();
          // password2.addClass('shake').addClass('invalidPass');
          password2.blur(function () {
            // (triggers whenever the password field is unselected)
            password2.trigger('reset');
            $('.incorrectMsg').hide();
            // password2.removeClass('shake').removeClass('invalidPass');
          });
        } else {
          $('.incorrectMsg').hide();
          form.submit()
        }
      }

    });
    $('.pswd_show').click(function () {
      console.log('click');
      password2.toggleClass('showPswd');

      if (password2.hasClass('showPswd')) {
        password2.attr('type', 'text');
        console.log("text");
        $('.pswd_show').html('Hide Password');
      } else {
        console.log("pswd");
        password2.attr('type', 'password');
        $('.pswd_show').html('Show Password');
      }
    });


    password.keyup(ruleValidator);

  }

  POTENZA.YoutubeCard = function () {
    if ($(".youtube-card").length) {
      $(".youtube-card").each(function () {
        let $this = $(this);
        let ifram = $this.find(".youtube-card-iframe");
        let src = ifram.attr("src");

        $this.find(".youtube-card-content").click(function (e) {
          e.preventDefault();
          if ($this.hasClass("stop")) {
            ifram.attr("src", src + "?autoplay=1");
            $this.removeClass("stop")
            $this.addClass("play")
            console.log(src);
          }
        });

        $this.find(".youtube-card-btnplayer--stop").click(function (e) {
          e.stopPropagation();
          console.log(src);
          ifram.attr("src", src)
          $this.removeClass("play")
          $this.addClass("stop")
        });

      });

    }
  }
  /****************************************************
   POTENZA Window load and functions
   ****************************************************/

  //Window load functions
  $window.on("load", function () {
    POTENZA.preloader(),
      POTENZA.Isotope(),
      POTENZA.masonry();
  });
  //Document ready functions
  $document.ready(function () {
    POTENZA.megaMenu(),
      POTENZA.searchbar(),
      POTENZA.counters(),
      POTENZA.carousel(),
      POTENZA.rangeslider(),
      POTENZA.tabs(),
      POTENZA.accordion(),
      POTENZA.featurelist(),
      POTENZA.slickslider(),
      POTENZA.pniceScroll(),
      POTENZA.mediaPopups(),
      POTENZA.contactform(),
      POTENZA.placeholder(),
      POTENZA.scrolltotop(),
      POTENZA.sidebarfixed(),
      POTENZA.countdownTimer(),
      POTENZA.mainScript(),
      POTENZA.FormWizard(),
      POTENZA.DragFileUpload(),
      POTENZA.FormValidate(),
      POTENZA.PasseValidate(),
      POTENZA.YoutubeCard()
  });

})(jQuery);
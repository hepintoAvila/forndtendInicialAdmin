(function ($) {
	"use strict";

	/*-------------------------------------
    Theia Side Bar
    -------------------------------------*/
	if (typeof($.fn.theiaStickySidebar) !== "undefined") {
		$('.sticky-coloum-wrap .sticky-coloum-item').theiaStickySidebar({
			additionalMarginTop: 120
		});
	  }

	/*--------------------------------------
  	Isotope initialization
  	--------------------------------------*/
	var $container = $(".isotope-wrap");
	if ($container.length > 0) {
		var $isotope;
		var blogGallerIso = $(".featuredContainer", $container).imagesLoaded(function () {
			var selectero = $container.find('.isotope-classes-tab .nav-item:first-child').data('filter') || '*';

			$isotope = $(".featuredContainer", $container).isotope({
				filter: selectero,
				transitionDuration: "1s",
				hiddenStyle: {
					opacity: 0,
					transform: "scale(0.001)"
				},
				visibleStyle: {
					transform: "scale(1)",
					opacity: 1
				}
			});
		});
		$container.find(".isotope-classes-tab").on("click", "a", function () {
			var $this = $(this);
			$this
				.parent(".isotope-classes-tab")
				.find("a")
				.removeClass("current");
			$this.addClass("current");
			var selector = $this.attr("data-filter");
			$isotope.isotope({
				filter: selector
			});
			return false;
		});
	}

	/*-------------------------------------
  	Jquery Serch Box
  	-------------------------------------*/
	$('a[href="#template-search"]').on("click", function (event) {
		event.preventDefault();
		var target = $("#template-search");
		target.addClass("open");
		setTimeout(function () {
			target.find('input').focus();
		}, 600);
		return false;
	});

	$("#template-search, #template-search button.close").on("click keyup", function (event) {
		if (
			event.target === this ||
			event.target.className === "close" ||
			event.keyCode === 27
		) {
			$(this).removeClass("open");
		}
	});

	/*-------------------------------------
	On click loadmore functionality
	-------------------------------------*/
	$('.loadmore').on('click', 'a', function (e) {
		e.preventDefault();
		var _this = $(this),
			_parent = _this.parents('.menu-list-wrapper'),
			button_wrapper = _parent.find('.loadmore'),
			item = button_wrapper.data('item') || 3,
			sm = button_wrapper.data('sm') || null,
			md = button_wrapper.data('md') || null,
			lg = button_wrapper.data('lg') || null,
			_target = _parent.find('.menu-list'),
			_set = _target.find('.menu-item.d-none').slice(0, item);

		if (sm || md || lg) {
			var wWidth = $(window).width();
			if (lg && wWidth > 991) {
				_set = _target.find('.menu-item.d-none').slice(0, lg);
			} else if (md && wWidth <= 991 && wWidth >= 768) {
				_set = _target.find('.menu-item.d-none').slice(0, md);
			} else if (sm && wWidth < 768) {
				_set = _target.find('.menu-item.d-none').slice(0, sm);
			}
		}

		if (_set.length) {
			_set.animate({
				opacity: 0
			});
			_set.promise().done(function () {
				_set.removeClass('d-none');
				_set.show().animate({
					opacity: 1
				}, 1000);
			});
		} else {
			_this.text('No more item to display');
		}
		return false;
	});

	/*-------------------------------------
	Count Up
	-------------------------------------*/
	var counterContainer = $('.counter');
	if (counterContainer.length) {
		counterContainer.counterUp({
			delay: 50,
			time: 5000
		});
	}

	/*-------------------------------------
  	Offcanvas Menu activation code
  	-------------------------------------*/
	  $('#wrapper').on('click', '.cart-menu-btn', function (e) {
		e.preventDefault();
		var $this = $(this),
			wrapper = $(this).parents('body').find('>#wrapper'),
			wrapMask = $('<div />').addClass('offcanvas-mask'),
			offCancas = $('#cart-wrap'),
			position = offCancas.data('position') || 'left';

		if ($this.hasClass('menu-open-btn')) {
			wrapper.addClass('open').append(wrapMask);
			offCancas.css({
				'transform': 'translateX(0)'
			});
		} else {
			removeOffcanvas();
		}

		function removeOffcanvas() {
			wrapper.removeClass('open').find('> .offcanvas-mask').remove();
			if (position === 'left') {
				offCancas.css({
					'transform': 'translateX(-105%)'
				});
			} else {
				offCancas.css({
					'transform': 'translateX(105%)'
				});
			}
		}
		$(".offcanvas-mask, .offcanvas-close").on('click', function () {
			removeOffcanvas();
		});

		return false;
	});


	/*-------------------------------------
	On Scroll 
	-------------------------------------*/
	$(window).on('scroll', function () {

		// Back Top Button
		if ($(window).scrollTop() > 700) {
			$('.return-to-top').addClass('back-top');
		} else {
			$('.return-to-top').removeClass('back-top');
		}

		// Sticky Menu
		if ($('header').hasClass('sticky-fixed-after')) {
			var stickyPlaceHolder = $("#sticky-placeholder"),
				menu = $("#navbar-wrap"),
				menuH = menu.outerHeight(),
				topbarH = $('#topbar-wrap').outerHeight() || 0,
				targrtScroll = topbarH,
				header = $("header");
			if ($(window).scrollTop() > targrtScroll) {
				header.addClass('sticky');
				$('body').addClass('mobile-sticky');
				stickyPlaceHolder.height(menuH);
			} else {
				header.removeClass('sticky');
				$('body').removeClass('mobile-sticky');
				stickyPlaceHolder.height(0);
			}
		}
	});

	 /* when product quantity changes, update quantity attribute on add-to-cart button */
    $("form.cart").on("change", "input.qty", function () {
        if (this.value === "0")
            this.value = "1";

        $(this.form).find("button[data-quantity]").data("quantity", this.value);
    });

    /* remove old "view cart" text, only need latest one thanks! */
    $(document.body).on("adding_to_cart", function () {
        $("a.added_to_cart").remove();
    });

    /*Quantity Product*/
    $(document).on('click', '.quantity .input-group-btn .quantity-btn', function () {
        var $input = $(this).closest('.quantity').find('.input-text');
        if ($(this).hasClass('quantity-plus')) {
            $input.trigger('stepUp').trigger('change');
        }
        if ($(this).hasClass('quantity-minus')) {
            $input.trigger('stepDown').trigger('change');
        }
    });

    $('.quantity-btn').on('click', function(){
        $("button[name='update_cart']").prop('disabled', false);
    });

	/*---------------------------------------
	On Click Section Switch
	--------------------------------------- */
	$('[data-type="section-switch"]').on('click', function () {
		if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
			var target = $(this.hash);
			if (target.length > 0) {

				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 1000);
				return false;
			}
		}
	});

	/*-------------------------------------
	Window On Load Function
	-------------------------------------*/
	$(window).on('load resize', function () {

		// Page Preloader
		$('#preloader').fadeOut('slow', function () {
			$(this).remove();
		});

		// Popup
		var yPopup = $(".popup-youtube");
		if (yPopup.length) {
			yPopup.magnificPopup({
				disableOn: 700,
				type: 'iframe',
				mainClass: 'mfp-fade',
				removalDelay: 160,
				preloader: false,
				fixedContentPos: false
			});
		}

		//Masonry
		var galleryIsoContainer = $('#no-equal-gallery');
		if (galleryIsoContainer.length) {
			var blogGallerIso = galleryIsoContainer.imagesLoaded(function () {
				blogGallerIso.isotope({
					itemSelector: '.no-equal-item',
					masonry: {
						columnWidth: 270,
						gutter: 30
					}
				});
			});
		}

	});

	/*---------------------------------------
	Background Parallax
	--------------------------------------- */
	if ($('.parallaxie').length) {
		$(".parallaxie").parallaxie({
			speed: 0.5,
			offset: 0,
		});
	}

	/*-------------------------------------
	Price range filter 
	-------------------------------------*/
	var priceSlider = document.getElementById('price-range-filter');
	if (priceSlider) {
		noUiSlider.create(priceSlider, {
			start: [1000, 2100],
			connect: true,
			range: {
				'min': 0,
				'max': 5000
			},
			format: wNumb({
				decimals: 0
			}),
		});
		var marginMin = document.getElementById('price-range-min'),
			marginMax = document.getElementById('price-range-max');
		priceSlider.noUiSlider.on('update', function (values, handle) {
			if (handle) {
				marginMax.innerHTML = "$" + values[handle];
			} else {
				marginMin.innerHTML = "$" + values[handle];
			}
		});
	}

	var priceSlider = document.getElementById('price-range-filter2');
	if (priceSlider) {
		noUiSlider.create(priceSlider, {
			start: [1000, 2100],
			connect: true,
			range: {
				'min': 0,
				'max': 5000
			},
			format: wNumb({
				decimals: 0
			}),
		});
		var marginMin = document.getElementById('price-range-min2'),
			marginMax = document.getElementById('price-range-max2');
		priceSlider.noUiSlider.on('update', function (values, handle) {
			if (handle) {
				marginMax.innerHTML = "$" + values[handle];
			} else {
				marginMin.innerHTML = "$" + values[handle];
			}
		});
	}

	/*-------------------------------------
    Mobile Menu
    -------------------------------------*/

 	var a = $('.offscreen-navigation .menu');

    if (a.length) {
        $(".menu-item-has-children").append("<span></span>");
        $(".page_item_has_children").append("<span></span>");

        a.children("li").addClass("menu-item-parent");

        $('.menu-item-has-children > span').on('click', function () {
            $(this).siblings('a').first().toggleClass('opened');
            var _self = $(this),
                sub_menu = _self.parent().find('>.sub-menu');
            if (_self.hasClass('open')) {
                sub_menu.slideUp();
                _self.removeClass('open');
            } else {
                sub_menu.slideDown();
                _self.addClass('open');
            }
        });
        $('.page_item_has_children > span').on('click', function () {
            var _self = $(this),
                sub_menu = _self.parent().find('>.children');
            if (_self.hasClass('open')) {
                sub_menu.slideUp();
                _self.removeClass('open');
            } else {
                sub_menu.slideDown();
                _self.addClass('open');
            }
        });

        $('.offscreen-navigation .menu-item-parent > a').on('click', function () {
            setTimeout(function() {
                $('.mean-bar .sidebarBtn').trigger('click');
            }, 300)
        });
    }

	$('.mean-bar .sidebarBtn').on('click', function (e) {
	e.preventDefault();
	if ($('.rt-slide-nav').is(":visible")) {
		$('.rt-slide-nav').slideUp();
		$('body').removeClass('slidemenuon');
	} else {
		$('.rt-slide-nav').slideDown();
		$('body').addClass('slidemenuon');
	}

	});

	// Salion function Start
	function salion_content_load_scripts(){

		var wow = new WOW({
			boxClass: 'wow',
			animateClass: 'animated',
			offset: 0,
			mobile: false,
			live: true,
			scrollContainer: null
		});
		wow.init();

		/*-------------------------------------
	    Slick Slider
	    -------------------------------------*/
		if ($.fn.slick) {
			$('.testimonial-carousel1').each(function () {
				let $carousel = $(this);
				$carousel.imagesLoaded(function () {
					var data = $carousel.data('slick'),
						slidesToShow = data.slidesToShow,
						slidesToShowTab = data.slidesToShowTab,
						slidesToShowMobile = data.slidesToShowMobile,
						slidesToShowMobiles = data.slidesToShowMobiles;
					$carousel.not('.slick-initialized').slick({
						slidesToShow: slidesToShow,
						slidesToScroll: 1,
						speed: 1000,
						infinite: true,
						centerMode: false,
						centerPadding: '0px',
						pauseOnHover: true,
						cssEase: 'ease-in-out',
						responsive: [{
								breakpoint: 1024,
								settings: {
									slidesToShow: slidesToShowTab,
									slidesToScroll: 1
								}
							},
							{
								breakpoint: 768,
								settings: {
									slidesToShow: slidesToShowMobile,
									slidesToScroll: 1
								}
							},
							{
								breakpoint: 576,
								settings: {
									slidesToShow: slidesToShowMobiles,
									slidesToScroll: 1
								}
							}
						]
					});
				});
			});
			$('.shop-carousel1').each(function () {
				let $carousel = $(this);
				$carousel.imagesLoaded(function () {
					var data = $carousel.data('slick'),
						slidesToShow = data.slidesToShow,
						slidesToShowTab = data.slidesToShowTab,
						slidesToShowMobile = data.slidesToShowMobile,
						slidesToShowMobiles = data.slidesToShowMobiles;
					$carousel.not('.slick-initialized').slick({
						prevArrow: '<span class="slick-prev slick-navigation"><i class="fa fa-angle-left" aria-hidden="true"></i></span>',
						nextArrow: '<span class="slick-next slick-navigation"><i class="fa fa-angle-right" aria-hidden="true"></i></span>',
						slidesToShow: slidesToShow,
						slidesToScroll: 1,
						speed: 1000,
						infinite: true,
						centerMode: false,
						centerPadding: '0px',
						pauseOnHover: true,
						cssEase: 'ease-in-out',
						responsive: [{
								breakpoint: 1024,
								settings: {
									slidesToShow: slidesToShowTab,
									slidesToScroll: 1
								}
							},
							{
								breakpoint: 768,
								settings: {
									slidesToShow: slidesToShowMobile,
									slidesToScroll: 1
								}
							},
							{
								breakpoint: 576,
								settings: {
									slidesToShow: slidesToShowMobiles,
									slidesToScroll: 1
								}
							}
						]
					});
				});
			});
			$('.brand-carousel1').each(function () {
				let $carousel = $(this);
				$carousel.imagesLoaded(function () {
					var data = $carousel.data('slick'),
						slidesToShow = data.slidesToShow,
						slidesToShowTab = data.slidesToShowTab,
						slidesToShowMobile = data.slidesToShowMobile,
						slidesToShowMobiles = data.slidesToShowMobiles;
					$carousel.not('.slick-initialized').slick({
						slidesToShow: slidesToShow,
						slidesToScroll: 1,
						speed: 1000,
						infinite: true,
						centerMode: false,
						centerPadding: '0px',
						pauseOnHover: true,
						cssEase: 'ease-in-out',
						responsive: [{
								breakpoint: 1024,
								settings: {
									slidesToShow: slidesToShowTab,
									slidesToScroll: 1
								}
							},
							{
								breakpoint: 768,
								settings: {
									slidesToShow: slidesToShowMobile,
									slidesToScroll: 1
								}
							},
							{
								breakpoint: 576,
								settings: {
									slidesToShow: slidesToShowMobiles,
									slidesToScroll: 1
								}
							}
						]
					});
				});
			});
			$('.portfolio-carousel1').each(function () {
				let $carousel = $(this);
				$carousel.imagesLoaded(function () {
					var data = $carousel.data('slick'),
						slidesToShow = data.slidesToShow,
						slidesToShowTab = data.slidesToShowTab,
						slidesToShowMobile = data.slidesToShowMobile,
						slidesToShowMobiles = data.slidesToShowMobiles;
					$carousel.not('.slick-initialized').slick({
						slidesToShow: slidesToShow,
						slidesToScroll: 1,
						speed: 1000,
						infinite: true,
						centerMode: true,
						centerPadding: '0px',
						pauseOnHover: true,
						cssEase: 'ease-in-out',
						responsive: [{
								breakpoint: 1024,
								settings: {
									slidesToShow: slidesToShowTab,
									slidesToScroll: 1
								}
							},
							{
								breakpoint: 768,
								settings: {
									slidesToShow: slidesToShowMobile,
									slidesToScroll: 1
								}
							},
							{
								breakpoint: 576,
								settings: {
									slidesToShow: slidesToShowMobiles,
									slidesToScroll: 1
								}
							}
						]
					});
				});
			});
			$('.more-works-carousel1').each(function () {
				let $carousel = $(this);
				$carousel.imagesLoaded(function () {
					var data = $carousel.data('slick'),
						slidesToShow = data.slidesToShow,
						slidesToShowTab = data.slidesToShowTab,
						slidesToShowMobile = data.slidesToShowMobile,
						slidesToShowMobiles = data.slidesToShowMobiles;
					$carousel.not('.slick-initialized').slick({
						slidesToShow: slidesToShow,
						slidesToScroll: 1,
						speed: 1000,
						infinite: true,
						centerMode: true,
						centerPadding: '0px',
						pauseOnHover: true,
						cssEase: 'ease-in-out',
						responsive: [{
								breakpoint: 1024,
								settings: {
									slidesToShow: slidesToShowTab,
									slidesToScroll: 1
								}
							},
							{
								breakpoint: 768,
								settings: {
									slidesToShow: slidesToShowMobile,
									slidesToScroll: 1
								}
							},
							{
								breakpoint: 576,
								settings: {
									slidesToShow: slidesToShowMobiles,
									slidesToScroll: 1
								}
							}
						]
					});
				});
			});
			$('.related-post-carousel1').each(function () {
				let $carousel = $(this);
				$carousel.imagesLoaded(function () {
					var data = $carousel.data('slick'),
						slidesToShow = data.slidesToShow,
						slidesToShowTab = data.slidesToShowTab,
						slidesToShowMobile = data.slidesToShowMobile,
						slidesToShowMobiles = data.slidesToShowMobiles;
					$carousel.not('.slick-initialized').slick({
						slidesToShow: slidesToShow,
						slidesToScroll: 1,
						speed: 1000,
						infinite: true,
						centerMode: true,
						centerPadding: '0px',
						pauseOnHover: true,
						cssEase: 'ease-in-out',
						responsive: [{
								breakpoint: 1024,
								settings: {
									slidesToShow: slidesToShowTab,
									slidesToScroll: 1
								}
							},
							{
								breakpoint: 768,
								settings: {
									slidesToShow: slidesToShowMobile,
									slidesToScroll: 1
								}
							},
							{
								breakpoint: 576,
								settings: {
									slidesToShow: slidesToShowMobiles,
									slidesToScroll: 1
								}
							}
						]
					});
				});
			});
		}

		/*-------------------------------------
		Section background image 
		-------------------------------------*/
		imageFunction();
		function imageFunction() {
			$('[data-bg-image]').each(function () {
				var img = $(this).data('bg-image');
				$(this).css({
					backgroundImage: 'url(' + img + ')',
				});
			});
		}
		
		/* ---------------------------------------
	    Hoverdir Initialization
	    --------------------------------------- */
		$('.multi-side-hover').each(function () {
			$(this).hoverdir({
				hoverDelay: 5,
			});
		});

		// Ajax Functions
        var page = 2;
        $(document).on( 'click', '#loadMore', function( event ) {
            event.preventDefault();
            jQuery('#loadMore').addClass('loading-lazy');
            var $container = jQuery('.menu-list');
            $.ajax({
              type       : "GET",
              data       : {
                action: 'load_pitems',
                numPosts : 2, 
                pageNumber: page
              },
              dataType   : "html",
              url        : SalionObj.ajaxurl,
              success    : function(html){
                var $data = jQuery(html);
                if ($data.length) {
                  $container.append( html );
                  jQuery('#loadMore').removeClass('loading-lazy');
                } else {
                  jQuery("#loadMore").html("No More Portfolio");
                  jQuery('#loadMore').removeClass('loading-lazy'); 
                }
              } ,
            })
            page++;
        });

        $(document).on( 'click', '#loadMorep2', function( event ) {
            event.preventDefault();
            var $container = jQuery('.menu-list');
            $.ajax({
              type       : "GET",
              data       : {
                action: 'load_pitems2',
                numPosts : 2, 
                pageNumber: page
              },
              dataType   : "html",
              url        : SalionObj.ajaxurl,
              success    : function(html){
                var $data = jQuery(html);
                if ($data.length) {
                  $container.append( html );
                } else {
                  jQuery("#loadMorep2").html("No More Portfolio"); 
                }
              } ,
            })
            page++;
        });
	} 
	// Salion function end

	// Window Load+Resize
	$(window).on('load resize', function () {
		// Elementor Frontend Load
	      $(window).on('elementor/frontend/init', function () {
	          if (elementorFrontend.isEditMode()) {
	              elementorFrontend.hooks.addAction('frontend/element_ready/widget', function () {
	                  salion_content_load_scripts();
	              });
	          }
	      });
      });

	// Window Load
    $(window).on('load', function () {
        salion_content_load_scripts();
    });

})(jQuery);
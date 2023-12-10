var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};

function matchheight() {
    //var max = Math.max.apply(Math, jQuery(".paragraph--type--card-boxes-style-2 .program-box").map(function() { return jQuery(this).outerHeight(); }));
    //jQuery(".paragraph--type--card-boxes-style-2 .program-box").css("min-height", max + 'px');



    if (jQuery(window).width() > 991) {
        if (jQuery('#container').length) {
            var offsets = jQuery('#container').offset();
            var left = offsets.left;
            jQuery('.rib_content_sec').css('padding-left', left);
        }
        if (jQuery('#container1').length) {
            var offsets_sml = jQuery('#container1').offset();
            var left_sml = offsets_sml.left;
            jQuery('.rib_content_sec_sml').css('padding-left', left_sml);
        }
    }
}

if (window.location.pathname == '/' || window.location.pathname == '/index.php') {
    jQuery('body').addClass('home-page');
}
jQuery('a[href$=".pdf"]').addClass('download').attr('target', '_blank');
jQuery('a[href$=".zip"]').addClass('zip-link').attr('target', '_blank');
//jQuery('a[href^="https://"]').not('a[href*=iima]').attr('target','_blank');
jQuery(document.body).on('mouseover', 'a[target!=_blank]:not(.local)', function(evt) {
    var a = jQuery(this);
    var href = a.attr('href');
    var domain = href.match(/^https?:\/\/([^:\/]+)/);
    if (domain && domain[1] && domain[1] !== "iima.ac.in") {
        a.attr('target', '_blank');
    } else {
        a.addClass('local');
    }
});
jQuery('.number-only').on('input', function(event) {
    this.value = this.value.replace(/[^0-9]/g, '');
});
if (jQuery('.page-name').length) {
    jQuery('body').addClass(jQuery('.page-name').attr('data-page-name'));
}
if (jQuery('.staff-list-image').length) {
    jQuery('.faculty-card-box-long').each(function(index) {
        console.log(jQuery(this).find('.staff-list-image').length);
        if (jQuery(this).find('.staff-list-image').length == 66) {
            jQuery(this).find('.staff-list-image').html('<img src="/themes/iima/images/faculty-user-placeholder-new-light.jpg" alt="" />');
        }
    });
}

jQuery('.role-faculty .paragraphs-tabs-wrapper table tbody').hide();
jQuery('.role-faculty .paragraphs-tabs-wrapper table h4.label').prepend('<a href="#" class="iima-btn paragraphs-opne-close-btn open-paragraphs-tab btn-group-vertical">Open</a>');
jQuery(document).on("click", ".close-paragraphs-tab", function(e) {
    e.preventDefault();
    jQuery(this).closest('table').find('tbody').slideUp();
    jQuery(this).removeClass('close-paragraphs-tab').addClass('open-paragraphs-tab');
    jQuery(this).html('Open');
});

jQuery(document).on("click", ".open-paragraphs-tab", function(e) {
    e.preventDefault();
    jQuery('.role-faculty .paragraphs-tabs-wrapper table tbody').slideUp();
    jQuery('.role-faculty .paragraphs-tabs-wrapper a.paragraphs-opne-close-btn').removeClass('close-paragraphs-tab').addClass('open-paragraphs-tab');
    jQuery('.role-faculty .paragraphs-tabs-wrapper a.paragraphs-opne-close-btn').html('Open');
    jQuery(this).closest('table').find('tbody').slideDown();
    jQuery(this).removeClass('open-paragraphs-tab').addClass('close-paragraphs-tab');
    jQuery(this).html('Close');
});

jQuery("#edit-field-authors-wrapper").bind("DOMSubtreeModified", function() {
    jQuery('.role-faculty #edit-field-authors-wrapper .field-add-more-submit ').val('Add Additional Author(s)');
});
jQuery(document).ready(function() {


    jQuery('.role-faculty #field-research-area-add-more-wrapper .field-add-more-submit ').val('Add Research Area');
    jQuery('.role-faculty #edit-field-eca-experience-wrapper .field-add-more-submit ').val('Add Academic Experience');
    jQuery('.role-faculty #edit-field-professional-experience-wrapper .field-add-more-submit ').val('Add Professional Experience');

    jQuery('.role-faculty #edit-field-authors-wrapper .field-add-more-submit ').val('Add Additional Author(s)');
    matchheight();
    /*jQuery(function(){
      jQuery('a[href*="#"]:not([href="#"])').click(function(){
    	if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
    	  var target = jQuery(this.hash);
    	  target = target.length ? target : jQuery('[name=' + this.hash.slice(1) +']');
    	  if (target.length) {
    		jQuery('html, body').animate({
    		  scrollTop: target.offset().top
    		}, 1000);
    		return false;
    	  }
    	}
      });
    }); 

    Wow*/
    wow = new WOW({
        animateClass: 'animated',
        offset: 100,
        callback: function(box) {
            // console.log("WOW: animating <" + box.tagName.toLowerCase() + ">")
        }
    });
    wow.init();

    jQuery('#login-with-credentials').click(function(e) {
        e.preventDefault();
        jQuery('.user-login-btns').slideUp();
        jQuery('#login-with-credentials-box').slideDown();
    });
    jQuery('#nav-open, .academic-home-menu-link, .academics-menu-link').click(function() {
        jQuery("header").removeClass('open-search-box');
        jQuery('#nav-icon3').toggleClass('open');
        jQuery(".menu-sec").toggleClass('open');
        jQuery("header").toggleClass('open-menu-box');
        jQuery('.academic-menu').removeClass('open');
        jQuery('.search-link, .open-search').removeClass('open');
        jQuery(".search-sec").removeClass('open');
        jQuery("#block-iima-main-menu>ul").addClass('main-menu');

        jQuery('.sub-menu, .main-menu-holder .menu--main>ul>li>ul').each(function(index) {
            var menuHolderH = jQuery('.nav-menu').height();
            var submenuH = jQuery(this).height();
            var mainparentdiv = -jQuery(this).closest('li').position().top;
            console.log(jQuery('.nav-menu').position().top + ' - ' + jQuery(this).closest('li').position().top);
            jQuery(this).css('top', mainparentdiv);
        });
    });
    jQuery('.academics-menu-link').click(function(e) {
        e.preventDefault();
        jQuery('#block-iima-main-menu>ul>li.menu-item--active-trail').addClass('active');
    });

    jQuery('.academic-menu-close-btn, #sub-menu-close').click(function(e) {
        e.preventDefault();
        jQuery('.academic-menu').removeClass('open');
        jQuery(".menu-sec").removeClass('open');
        jQuery("header").removeClass('open-menu-box');
    });


    jQuery('.sitemap-menu nav>ul>li>a').click(function(e) {
        e.preventDefault();


        if (jQuery(this).hasClass('active')) {
            jQuery(this).closest('li').find('> ul').slideUp();
            jQuery(this).removeClass('active');
        } else {
            jQuery(this).closest('.region-content').find('nav>ul>li>a').removeClass('active');
            jQuery(this).closest('.region-content').find('nav>ul>li>ul').slideUp();
            jQuery(this).addClass('active');
            jQuery(this).closest('li').find('>ul').slideDown();
        }
    });

    jQuery(document).on('click', function(e) {
        if (jQuery(e.target).hasClass("select-input-value")) {
            console.log('aaa');
            jQuery('.ul-as-option-dev').slideUp();
            jQuery(e.target).closest('.input-as-select').find('.ul-as-option-dev').slideDown();
        } else {
            console.log('bbb');
            jQuery('.input-as-select .ul-as-option-dev').slideUp();
        }
    });

    jQuery('.sitemap-menu nav>ul>li>a').addClass('active');


    jQuery('.header-user-menu-box>a').click(function(e) {
        if (jQuery(this).attr('href') == '#' || jQuery(this).attr('href') == '') {
            e.preventDefault();
        }
        jQuery('.ul-as-option-dev').slideToggle();
    });

    jQuery('.input-as-select ul li a').on('click', function(e) {
        if (jQuery(this).attr('data-link-type') == 'link') {} else {
            e.preventDefault();
        }
        var selectVal = jQuery(this).attr('data-value');

        jQuery(this).closest('.input-as-select').find('.select-input-value').val(selectVal);
        if (jQuery(this).attr('data-value-id') == '') {
            jQuery(this).closest('.input-as-select').find('.select-input-id-value').val('');
        }
        if (jQuery(this).attr('data-value-id')) {
            jQuery(this).closest('.input-as-select').find('.select-input-id-value').val(jQuery(this).attr('data-value-id'));
        }
        if (jQuery(this).closest('.ul-as-option-dev').hasClass('on-select-submit')) {
            jQuery('#rnp-search-submit').trigger('click');
        }
    });

    jQuery('.iima-toggle-title').click(function(e) {
        e.preventDefault();
        if (jQuery(this).closest('.iima-toggle-box').hasClass('open')) {
            jQuery('.iima-toggle-box').removeClass('open');
            jQuery('.iima-toggle-detail').slideUp();
        } else {
            jQuery('.iima-toggle-box').removeClass('open');
            jQuery('.iima-toggle-detail').slideUp();
            jQuery(this).closest('.iima-toggle-box').addClass('open');
            jQuery(this).closest('.iima-toggle-box').find('.iima-toggle-detail').slideDown();
        }
    });
    jQuery('.publication-show-more-less').click(function(e) {
        e.preventDefault();
        if (jQuery(this).hasClass('open')) {
            jQuery(this).removeClass('open');
            jQuery(this).html('Read More');
            jQuery(this).closest('.publications-by-faculty-filter').find('.hide-other-publication').slideUp();
        } else {
            jQuery(this).addClass('open');
            jQuery(this).html('Show Less');
            jQuery(this).closest('.publications-by-faculty-filter').find('.hide-other-publication').slideDown();
        }
    });

    jQuery('.add-more-field').click(function(e) {
        e.preventDefault();
        var field_html = jQuery(this).attr('data-field-html');
        jQuery(this).closest('.add-more-field-box-holder').find('.add-more-field-box').append(field_html);
    });
    jQuery('.read-more-list').click(function(e) {
        e.preventDefault();
        if (jQuery(this).hasClass('list-opened')) {
            jQuery(this).html('View More');
            jQuery(this).removeClass('list-opened');
            jQuery(this).closest('.employee-sec-detail').find('.hode-list-box').slideUp();
        } else {
            jQuery(this).html('View Less');
            jQuery(this).addClass('list-opened');
            jQuery(this).closest('.employee-sec-detail').find('.hode-list-box').slideDown();
        }

    });

    jQuery('.store-filter-title').on('click', function(e) {
        e.preventDefault();
        jQuery(this).toggleClass('close');
        jQuery(this).closest('.filter-toggle-box').find('.filter-toggle-box-detail').slideToggle();
    });

    jQuery('.filter-menu-open').on('click', function(e) {
        e.preventDefault();
        jQuery('.store-filter-holder').toggleClass('open');
    });
    jQuery('.filter-menu-close').on('click', function(e) {
        e.preventDefault();
        jQuery('.store-filter-holder').toggleClass('open');
    });
    jQuery('.show-more-filter').on('click', function(e) {
        e.preventDefault();
        if (jQuery(this).hasClass('open')) {
            var fi = 0;
            jQuery(this).removeClass('open');
            jQuery(this).html('Show more sizes');
            jQuery(jQuery(this).closest('.lp-filter-box-style-2').find("li")).each(function() {
                fi = fi + 1;
                if (fi < 10) {
                    jQuery(this).css("display", "inline-block");
                } else {
                    jQuery(this).css("display", "none");
                }
            });
        } else {

            jQuery(this).addClass('open');
            jQuery(this).html('Hide more sizes');
            jQuery(jQuery(this).closest('.lp-filter-box-style-2').find("li")).each(function() {
                jQuery(this).css("display", "inline-block");
            });
        }
    });


    jQuery('.search-link, .open-search').click(function(e) {
        e.preventDefault();
        if (jQuery(this).hasClass('open')) {
            jQuery(this).removeClass('open');
            jQuery(".search-sec").removeClass('open');
            jQuery("header").removeClass('open-search-box');
        } else {
            jQuery("header").removeClass('open-menu-box');
            jQuery("#nav-icon3, .menu-sec, .academic-menu").removeClass('open');
            jQuery(this).addClass('open');
            jQuery(".search-sec").addClass('open');
            jQuery("header").addClass('open-search-box');
        }
    });

    jQuery('.academic-menu-right-holder>ul>li.menu-item--expanded>a, .academic-menu-right-holder .navigation>ul>li.menu-item--expanded>a').on('click', function(e) {
        e.preventDefault();
        if (jQuery(this).closest('li').find('ul').hasClass('open')) {
            jQuery(this).closest('li').find('ul').removeClass('open');;
            jQuery(this).closest('li').find('ul').slideUp();
        } else {
            jQuery(this).closest('.academic-menu-right').find('.academic-menu-right-holder .navigation>ul>li>ul').slideUp();
            jQuery(this).closest('.academic-menu-right').find('.academic-menu-right-holder .navigation>ul>li>ul').removeClass('open');
            jQuery(this).closest('li').find('ul').addClass('open');;
            jQuery(this).closest('li').find('ul').slideDown();
        }
    });



    if (jQuery(window).width() > 991) {
        jQuery('.main-menu-holder .menu>li').hover(function() {
            if (jQuery(this).hasClass('active')) {
                jQuery(this).removeClass('active');
                jQuery(this).closest('ul').removeClass('open-menu');
            } else {
                jQuery('.main-menu-holder .menu>li').removeClass('active');
                jQuery(this).addClass('active');
                jQuery(this).closest('ul').addClass('open-menu');
            }
        });
    } else {
        jQuery('.main-menu-holder ul.menu>li.menu-item--expanded>a').click(function(w) {
            console.log('asas');
            if (jQuery(this).closest('li').hasClass('active')) {
                jQuery(this).closest('li').removeClass('active');
                jQuery(this).closest('ul').removeClass('open-menu');
            } else {
                //jQuery('.main-menu-holder ul.menu>li.menu-item--expanded').removeClass('active');
                jQuery(this).closest('ul.menu').find('li.menu-item--expanded').removeClass('active');
                jQuery(this).closest('li').addClass('active');
                jQuery(this).closest('ul').addClass('open-menu');
                jQuery(this).closest('ul').parent('li').addClass('active');
            }

        });
    }

    jQuery('.main-menu-holder .menu--main>ul>li>ul li.menu-item--expanded>a').click(function(e) {
        e.preventDefault();
        if (jQuery(this).closest('li').hasClass('open')) {
            jQuery(this).closest('li').removeClass('open');
            jQuery(this).closest('ul').removeClass('open-menu');
        } else {
            jQuery(this).closest('li').addClass('open');
            jQuery(this).closest('ul').addClass('open-menu');
        }
    });

    jQuery(window).bind('beforeunload', function() {
        jQuery(".menu-sec, .academic-menu, .search-sec").removeClass('open');
        jQuery("header").removeClass('open-menu-box');
        jQuery("header").removeClass('open-search-box');
    });

    /*
    var swiper = new Swiper(".qouteSwiper", {
            slidesPerView: 1,
            spaceBetween: 0,
            mousewheel: false,
            allowTouchMove: false,
            loop: false,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
           
    });  
    */

});


jQuery(document).ready(function() {
    jQuery(window).scroll(function() {
        if (jQuery(this).scrollTop() > 100) {
            jQuery('.scroll-to-top').fadeIn();
        } else {
            jQuery('.scroll-to-top').fadeOut();
        }
    });
    jQuery('.scroll-to-top').click(function() {
        console.log('aa');
        jQuery("html, body").animate({
            scrollTop: 0
        }, 100);
        return false;
    });
    matchheight();

    if (jQuery('#faculty-search-filter').length) {
        if (getUrlParameter('field_primary_area_target_id')) {
            var faculty_area_id = getUrlParameter('field_primary_area_target_id');
            jQuery("#area-of-research-target-ids-select-box ul li").each(function(index) {
                var faculties_area_value_id = jQuery(this).find('a').attr('data-value-id');
                if (faculties_area_value_id == faculty_area_id) {
                    var faculty_aelected_area_name = jQuery(this).find('a').attr('data-value');
                    jQuery("#edit-field-area-of-research-target-id").val(faculty_area_id);
                    jQuery("#edit-field-area-of-research-target-name").val(faculty_aelected_area_name);
                    jQuery("#faculty-search-area").html(faculty_aelected_area_name);
                    jQuery("#faculty-search-area-box").fadeIn();
                }
            });
        }


        if (getUrlParameter('title')) {
            jQuery("#faculty-title").val(getUrlParameter('title').replace("+", " "));
            jQuery("#faculty-search-name").html(getUrlParameter('title').replace("+", " "));
            jQuery("#faculty-search-name-box").fadeIn();
        }
        if (getUrlParameter('field_designation_target_id') || getUrlParameter('field_primary_area_target_id') || getUrlParameter('title')) {
            jQuery('html, body').animate({
                scrollTop: jQuery('#faculty-directory-sec').offset().top
            }, 500);
        }

        if (getUrlParameter('field_batch_value') || getUrlParameter('title')) {
            jQuery('html, body').animate({
                scrollTop: jQuery('#alumni-directory-sec').offset().top
            }, 500);
        }

        if (getUrlParameter('field_batch_value')) {
            jQuery("#edit-field-batch-value").val(getUrlParameter('field_batch_value'));
        }
        if (getUrlParameter('title')) {
            jQuery("#edit-title").val(getUrlParameter('title').replace("+", " "));
        }
    }


    if (jQuery('#views-exposed-form-research-publications-filter-block-1').length) {
        var rnp_key_arr = new Array();
        if (getUrlParameter('field_publication_category_target_id')) {
            jQuery("#edit-field-publication-category-target-id").val(getUrlParameter('field_publication_category_target_id'));
            var rnp_category_id = getUrlParameter('field_publication_category_target_id');
            jQuery("#publication_category_select li a").removeClass('active');
            jQuery("#publication_category_select li").each(function(index) {
                var publication_category_select_id = jQuery(this).find('a').attr('data-category');
                if (publication_category_select_id == rnp_category_id) {
                    jQuery(this).find('a').addClass('active');
                }
            });

        }

        if (getUrlParameter('items_per_page')) {
            var rnp_items_per_page = getUrlParameter('items_per_page');
            jQuery("#items-per-page-box ul li").each(function(index) {
                var rnp_items_per_page_value_id = jQuery(this).find('a').attr('data-value');
                if (rnp_items_per_page_value_id == rnp_items_per_page) {
                    jQuery("#edit-items-per-page").val(rnp_items_per_page);
                }
            });
        }
        if (getUrlParameter('field_date_published_value')) {
            var rnp_published_year = getUrlParameter('field_date_published_value');
            jQuery("#date-published-value-box ul li").each(function(index) {
                var rnp_date_published_value = jQuery(this).find('a').attr('data-value');
                if (rnp_date_published_value == rnp_published_year) {
                    jQuery("#edit-field-date-published-value").val(rnp_published_year);
                }
            });
        }
        if (getUrlParameter('keys')) {
            jQuery("#edit-keys").val(getUrlParameter('keys').replace("+", " "));
            rnp_key_arr.push(getUrlParameter('keys').replace("+", " "));
        }
        var rnp_searc_result = rnp_key_arr.join(', ');
        if (rnp_searc_result.length != 0) {
            jQuery("#rnp-search-keywords").html(rnp_searc_result);
            jQuery("#rnp-search-faculty-box").fadeIn();
        }
    }


    if (jQuery('#views-exposed-form-blogs-filter-block-1').length) {
        var rnp_key_arr = new Array();
        if (getUrlParameter('field_category_target_id')) {
            jQuery("#edit-field-category-target-id").val(getUrlParameter('field_category_target_id'));
            var blog_category_id = getUrlParameter('field_category_target_id');
            jQuery("#blog_category_select li a").removeClass('active');
            jQuery("#blog_category_select li").each(function(index) {
                var blog_category_select_id = jQuery(this).find('a').attr('data-category');
                if (blog_category_select_id == blog_category_id) {
                    jQuery(this).find('a').addClass('active');
                }
            });

        }
        if (getUrlParameter('keys')) {
            jQuery("#edit-keys").val(getUrlParameter('keys').replace("+", " "));
            rnp_key_arr.push(getUrlParameter('keys').replace("+", " "));
        }
        var rnp_searc_result = rnp_key_arr.join(', ');
        if (rnp_searc_result.length != 0) {
            jQuery("#rnp-search-keywords").html(rnp_searc_result);
            jQuery("#rnp-search-faculty-box").fadeIn();
        }
    }

    if (jQuery('#views-exposed-form-news-filter-block-1').length) {


        if (getUrlParameter('field_published_year_value')) {
            var news_published_year = getUrlParameter('field_published_year_value');
            console.log(news_published_year);
            jQuery("#year-published-value-box ul li").each(function(index) {
                var news_published_year_value_id = jQuery(this).find('a').attr('data-value-id');
                if (news_published_year == news_published_year_value_id) {
                    var news_value_name = jQuery(this).find('a').attr('data-value');
                    jQuery("#edit-field-published-year-value").val(news_published_year);
                    jQuery("#edit-field-published-year-value-name").val(news_value_name);
                }
            });
        }

        if (getUrlParameter('field_published_month_value')) {
            var news_published_month = getUrlParameter('field_published_month_value');
            console.log(news_published_month);
            jQuery("#month-published-value-box ul li").each(function(index) {
                var news_published_month_value_id = jQuery(this).find('a').attr('data-value-id');
                if (news_published_month == news_published_month_value_id) {
                    var news_month_value_name = jQuery(this).find('a').attr('data-value');
                    jQuery("#edit-field-published-month-value").val(news_published_month);
                    jQuery("#edit-field-published-month-value-name").val(news_month_value_name);
                }
            });
        }
        if (getUrlParameter('title')) {
            jQuery("#edit-title").val(getUrlParameter('title'));
        }
    }


    if (jQuery('#views-exposed-form-student-blog-filter-block-1').length) {
        var student_blog_key_arr = new Array();
        if (getUrlParameter('field_published_year_value')) {
            var news_published_year = getUrlParameter('field_published_year_value');
            console.log(news_published_year);
            jQuery("#year-published-value-box ul li").each(function(index) {
                var news_published_year_value_id = jQuery(this).find('a').attr('data-value-id');
                if (news_published_year == news_published_year_value_id) {
                    var news_value_name = jQuery(this).find('a').attr('data-value');
                    jQuery("#edit-field-published-year-value").val(news_published_year);
                    jQuery("#edit-field-published-year-value-name").val(news_value_name);
                }
            });
        }

        if (getUrlParameter('field_published_month_value')) {
            var news_published_month = getUrlParameter('field_published_month_value');
            console.log(news_published_month);
            jQuery("#month-published-value-box ul li").each(function(index) {
                var news_published_month_value_id = jQuery(this).find('a').attr('data-value-id');
                if (news_published_month == news_published_month_value_id) {
                    var news_month_value_name = jQuery(this).find('a').attr('data-value');
                    jQuery("#edit-field-published-month-value").val(news_published_month);
                    jQuery("#edit-field-published-month-value-name").val(news_month_value_name);
                }
            });
        }
        if (getUrlParameter('keys')) {
            jQuery("#edit-keys").val(getUrlParameter('keys').replace("+", " "));
            student_blog_key_arr.push(getUrlParameter('keys').replace("+", " "));
        }
        var student_blog_searc_result = student_blog_key_arr.join(', ');
        if (student_blog_searc_result.length != 0) {
            jQuery("#rnp-search-keywords").html(student_blog_searc_result);
            jQuery("#rnp-search-faculty-box").fadeIn();
        }
    }

    if (jQuery('#views-exposed-form-student-council-filter-block-1').length) {


        if (getUrlParameter('field_select_year_target_id')) {
            var field_select_year = getUrlParameter('field_select_year_target_id');
            console.log(field_select_year);
            jQuery("#selected-year-value-box ul li").each(function(index) {
                var field_select_year_id = jQuery(this).find('a').attr('data-value-id');
                if (field_select_year == field_select_year_id) {
                    var year_value_name = jQuery(this).find('a').attr('data-value');
                    jQuery("#edit-field-select-year-target-id").val(field_select_year);
                    jQuery("#edit-field-select-year-value-name").val(year_value_name);
                }
            });
        }

        if (getUrlParameter('items_per_page')) {
            var rnp_items_per_page = getUrlParameter('items_per_page');
            jQuery("#items-per-page-box ul li").each(function(index) {
                var rnp_items_per_page_value_id = jQuery(this).find('a').attr('data-value');
                if (rnp_items_per_page_value_id == rnp_items_per_page) {
                    jQuery("#edit-items-per-page").val(rnp_items_per_page);
                }
            });
        }
    }

    /* Rafiq JS Code here*/
    jQuery("#click-to-compare").click(function(e) {
        e.preventDefault();
        var checkedstring = '';
        jQuery('.add-to-compare input:checked').each(function() {
            var checkedarray = jQuery(this).attr('class');
            var checkarrayreplace = checkedarray.replace("addtocompare ", "");
            checkedstring += checkarrayreplace + '+';
            location.href = '/executive-education/compare?q=' + checkedstring;
        });
    });
    jQuery(".ee-custom-submit").hide();
    jQuery(".filter-form .form-checkbox").click(function() {
        jQuery(".ee-custom-submit").trigger("click");
    });
    /* Rafiq JS Code end*/

    /* Kamal code start */
    jQuery('#case-centers-search-form #search_type').change(function() {
        var search_type = jQuery(this).val();
        jQuery('#case-centers-search-form #field_search').attr('name', search_type);
    });

    // jQuery('#case-centers-search-form').on('submit',function(e){
    //     e.preventDefault();
    //     var formData= jQuery(this).serialize();
    //     var fullUrl = window.location.href;
    //     var separator = (fullUrl.indexOf('?') === -1) ? '?' : '&';
    //     var finalUrl = fullUrl+'?'+formData;
    //     window.location.href = finalUrl;
    // });

});



jQuery(window).resize(function() {
    matchheight();
})
jQuery(window).on('load', function() {
    jQuery('#loder-box').fadeOut();
    jQuery('.right-fixed-links').addClass('open');

    if (jQuery(window).width() < 992) {
        jQuery('.main-menu-holder li.menu-item--expanded>a').attr('href', 'javascript:void(0)');
        jQuery('.sub-menu, .main-menu-holder .menu--main>ul>li>ul').prepend('<a href="#back" class="menu-back">Back</a>');
        jQuery('.menu-back').click(function(e) {
            e.preventDefault();
            jQuery('#block-iima-main-menu>ul').removeClass('open-menu');
            jQuery('#block-iima-main-menu>ul li').removeClass('active');
            jQuery('#block-iima-main-menu>ul ul').removeClass('open-menu');
        });
    }
})

var lastScroll = 0;
jQuery(window).scroll(function() {
    var studioxHeader = document.getElementById("fixed-head");
    var headroom = new Headroom(studioxHeader, {
        offset: 100,
        tolerance: {
            up: 0,
            down: 1
        },
        classes: {
            initial: "sticky",
            pinned: "sticky--pinned",
            unpinned: "sticky--unpinned",
            top: "sticky--top",
            notTop: "sticky--not-top",
            bottom: "sticky--bottom",
            notBottom: "sticky--not-bottom"
        }
    });
    headroom.init();
});
jQuery('#fixed-head').css('opacity', 0);
jQuery(document).ready(function() {
    jQuery('#block-iima-main-menu>ul>li.menu-item--active-trail').parent('ul').addClass("open-menu");;
    var scrolltopposition = jQuery(window).scrollTop();
    if (scrolltopposition > 200) {
        jQuery('#fixed-head').addClass('sticky--unpinned');
    }
    jQuery('#fixed-head').css('opacity', 1);
});

jQuery('.edu-menus-box ul').addClass('');
jQuery('.edu-menus-box ul li').addClass();


var swiper = new Swiper('.announcements-container, .research-container, .campus-container, .related-case-container', {
    pagination: '.swiper-pagination',
    slidesPerView: 'auto',
    paginationClickable: true,
    spaceBetween: 0,
    loop: false,
    navigation: {
        nextEl: ".research-swiper-button-next",
        prevEl: ".research-swiper-button-prev"
    },
    breakpoints: {
        767: {
            loop: false,
        },
        768: {
            loop: false,
        },
    },
});
var swiper = new Swiper('.upcoming-academic-event-container', {
    slidesPerView: 2,
    paginationClickable: true,
    spaceBetween: 30,
    loop: false,
    pagination: {
        el: ".upc-pro-swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".upc-pro-swiper-button-next",
        prevEl: ".upc-pro-swiper-button-prev"
    },
    breakpoints: {
        767: {
            slidesPerView: 1,
            loop: false,
        },
        768: {
            loop: false,
        },
    },
});
var swiper = new Swiper('.upcoming-academic-event-container1', {
    slidesPerView: 2,
    paginationClickable: true,
    spaceBetween: 30,
    loop: false,
    pagination: {
        el: ".upc-pro-swiper-pagination1",
        clickable: true,
    },
    navigation: {
        nextEl: ".upc-pro-swiper-button-next1",
        prevEl: ".upc-pro-swiper-button-prev1"
    },
    breakpoints: {
        767: {
            slidesPerView: 1,
            loop: false,
        },
        768: {
            loop: false,
        },
    },
});
var swiper = new Swiper('.upcoming-academic-event-container2', {
    slidesPerView: 2,
    paginationClickable: true,
    spaceBetween: 30,
    loop: false,
    pagination: {
        el: ".upc-pro-swiper-pagination2",
        clickable: true,
    },
    navigation: {
        nextEl: ".upc-pro-swiper-button-next2",
        prevEl: ".upc-pro-swiper-button-prev2"
    },
    breakpoints: {
        767: {
            slidesPerView: 1,
            loop: false,
        },
        768: {
            loop: false,
        },
    },
});
var swiper = new Swiper('.upcoming-academic-event-container3', {
    slidesPerView: 2,
    paginationClickable: true,
    spaceBetween: 30,
    loop: false,
    pagination: {
        el: ".upc-pro-swiper-pagination3",
        clickable: true,
    },
    navigation: {
        nextEl: ".upc-pro-swiper-button-next3",
        prevEl: ".upc-pro-swiper-button-prev3"
    },
    breakpoints: {
        767: {
            slidesPerView: 1,
            loop: false,
        },
        768: {
            loop: false,
        },
    },
});
var swiper = new Swiper('.academics-announcements-container', {
    slidesPerView: 3,
    paginationClickable: true,
    spaceBetween: 0,
    loop: false,
    pagination: {
        el: ".aca-anno-swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".aca-anno-swiper-button-next",
        prevEl: ".aca-anno-swiper-button-prev"
    },
    breakpoints: {
        767: {
            loop: false,
            slidesPerView: 1,
        },
        768: {
            loop: false,
            slidesPerView: 3,
        },
    },
});



var swiper = new Swiper('.new-courses-slider-container', {
    slidesPerView: 1,
    paginationClickable: true,
    spaceBetween: 0,
    loop: false,
    pagination: {
        el: ".new-courses-swiper-pagination",
        clickable: true,
    },
});
var swiper = new Swiper('.iima-campus-slider-container', {
    slidesPerView: 1,
    paginationClickable: true,
    spaceBetween: 0,
    loop: false,
    pagination: {
        el: ".iima-campus-swiper-pagination",
        clickable: true,
    },
});
var swiper = new Swiper('.iima-experience-slider-container', {
    slidesPerView: 1,
    paginationClickable: true,
    spaceBetween: 0,
    loop: false,
    pagination: {
        el: ".iima-experience-swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".iima-experience-swiper-button-next",
        prevEl: ".iima-experience-swiper-button-prev"
    },
});

var swiper = new Swiper(".area-courses-slider-title", {
    slidesPerView: 'auto',
    spaceBetween: 0,
    mousewheel: true,
    allowTouchMove: true,
    loop: false,
    navigation: {
        nextEl: ".area-courses-swiper-button-next",
        prevEl: ".area-courses-swiper-button-prev"
    },
});
var swiper = new Swiper(".related-product-container", {
    slidesPerView: 'auto',
    spaceBetween: 0,
    mousewheel: true,
    allowTouchMove: true,
    loop: false,
    navigation: {
        nextEl: ".related-product-button-next",
        prevEl: ".related-product-button-prev"
    },
});
var hisTitleswiper = new Swiper(".histry-slider-title", {
    slidesPerView: 4,
    spaceBetween: 0,
    mousewheel: true,
    allowTouchMove: true,
    loop: false,
    navigation: {
        nextEl: ".histry-title-swiper-button-next",
        prevEl: ".histry-title-swiper-button-prev"
    },
    breakpoints: {
        600: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        900: {
            slidesPerView: 4,
        },
    },
});
hisTitleswiper.on('slideChange', function() {
    hisDetailswiper.slideTo(hisTitleswiper.realIndex);
    jQuery('.histry-slider-title').find('.swiper-slide').removeClass('active');
    jQuery('.histry-slider-title .swiper-slide').eq(hisTitleswiper.realIndex).addClass('active');
});

var hisDetailswiper = new Swiper(".histry-slider-detail", {
    slidesPerView: 1,
    spaceBetween: 0,
    mousewheel: false,
    allowTouchMove: false,
    spaceBetween: 10,
    loop: false,
    pagination: {
        el: ".histry-slider-detail-swiper-pagination",
        clickable: true,
    },
});

var paernerswiper = new Swiper('.partner-sldier-container', {
    slidesPerView: 5,
    paginationClickable: true,
    spaceBetween: 0,
    loop: false,
    navigation: {
        nextEl: ".partner-button-prev",
        prevEl: ".partner-button-next"
    },
    breakpoints: {
        767: {
            loop: false,
            slidesPerView: 1,
        },
        768: {
            loop: false,
            slidesPerView: 5,
        },
    },
});
if (jQuery('.gallery-image-slider').length) {

    var swipertab = new Swiper(".gallery-image-slider", {
        slidesPerView: 1,
        spaceBetween: 0,
        mousewheel: false,
        allowTouchMove: false,
        loop: false,
        navigation: {
            nextEl: ".gallery-swiper-button-next",
            prevEl: ".gallery-swiper-button-prev"
        }
    });
    swipertab.slideTo(1);
    swipertab.on('slideChange', function() {
        jQuery('#exp_ele_id_' + swipertab.realIndex).trigger('click');
    });


    jQuery('.gallery-image-thumbs .gallery-image-thumb').on('click', function() {
        if (jQuery(this).hasClass('active')) {

        } else {
            jQuery('.gallery-image-thumb').removeClass('active');
            jQuery(this).addClass('active');
            swipertab.slideTo(jQuery(this).attr('data-id'));
        }
    })
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
if (jQuery('.partner-sldier-container').length) {
    var lastpostindex = jQuery(".partner-sldier-container .swiper-slide:last-child").attr('data-swiper-slide-index');
    var slidepostindex = randomIntFromInterval(0, lastpostindex);
    console.log(lastpostindex + ' - ' + slidepostindex);
    paernerswiper.slideTo(slidepostindex);
}
jQuery('.donation-form-tabtitle a').on('click', function(e) {
    e.preventDefault();
    var tabid = jQuery(this).attr('href');
    jQuery('.donation-form-tabtitle a').removeClass('active');
    jQuery('.donation-form-tab-detail').hide();
    jQuery(this).addClass('active');;
    jQuery(tabid).fadeIn();
})


jQuery('.tabholder .tabtitle a').on('click', function(e) {
    e.preventDefault();
    var tabidd = jQuery(this).attr('href');
    if (jQuery(this).hasClass('active')) {} else {
        jQuery(this).closest('.tabholder').find('.tabtitle a').removeClass('active');
        jQuery(this).closest('.tabholder').find('.tabdetail').hide();
        jQuery(this).addClass('active');;
        jQuery(tabidd).fadeIn();
    }
})


jQuery('.histry-slider-title a').on('click', function() {
    if (jQuery(this).closest('.swiper-slide').hasClass('active')) {

    } else {
        jQuery('.histry-slider-title').find('.swiper-slide').removeClass('active');
        jQuery(this).closest('.swiper-slide').addClass('active');
        var sliderID = jQuery(this).attr('data-slider-id');
        hisTitleswiper.slideTo(sliderID);
        hisDetailswiper.slideTo(sliderID);
    }
})


jQuery('.area-courses-slider-title a').on('click', function(e) {
    e.preventDefault();
    var tabid = jQuery(this).attr('href');
    jQuery(this).closest('.area-courses-slider-holder').find('.area-courses-slider-title a').removeClass('active');
    jQuery(this).closest('.area-courses-slider-holder').find('.area-courses-detail-box').hide();
    jQuery(this).addClass('active');;
    jQuery(this).closest('.area-courses-slider-holder').find(tabid).fadeIn();
})

jQuery('.qna-qus a').on('click', function(e) {
    e.preventDefault();
    var tabid = jQuery(this).attr('href');
    if (jQuery(this).closest('.qna-according-box').hasClass('open-qna')) {
        jQuery(this).closest('.qna-according-holder').find('.qna-according-box').removeClass('open-qna');
        jQuery(this).closest('.qna-according-holder').find('.qna-ans').slideUp();
    } else {
        jQuery(this).closest('.qna-according-holder').find('.qna-according-box').removeClass('open-qna');
        jQuery(this).closest('.qna-according-holder').find('.qna-ans').slideUp();

        jQuery(this).closest('.qna-according-box').addClass('open-qna');
        jQuery(this).closest('.qna-according-box').find('.qna-ans').slideDown();
    }

})


jQuery('.show-rnp-detail').on('click', function(e) {
    e.preventDefault();
    if (jQuery(this).closest('.fnp-box-holder').hasClass('open')) {
        jQuery(this).closest('.fnp-box-holder').find('.rnp-detail').removeClass('open');
        jQuery(this).closest('.fnp-box-holder').removeClass('open');
        jQuery(this).text('Read More');
    } else {
        jQuery('.rnp-detail, .fnp-box-holder').removeClass('open');
        jQuery('.show-rnp-detail').text('Read More');
        jQuery(this).closest('.fnp-box-holder').find('.rnp-detail').addClass('open');
        jQuery(this).closest('.fnp-box-holder').addClass('open');
        jQuery(this).text('Read Less');
    }
})

jQuery('#publication_category_select>li>a').on('click', function(e) {
    e.preventDefault();
    var datacategory = jQuery(this).attr('data-category');
    jQuery('#edit-field-publication-category-target-id').val(datacategory);
    jQuery('#rnp-search-submit').trigger('click');
});
jQuery('#blog_category_select>li>a').on('click', function(e) {
    e.preventDefault();
    var datacategory = jQuery(this).attr('data-category');
    jQuery('#edit-field-category-target-id').val(datacategory);
    jQuery('#rnp-search-submit').trigger('click');
});


function processAppended(el) {
    jQuery('.lp-filter-box-close-btn').on('click', function(e) {
        e.preventDefault();
        var d_com_title = jQuery(this).closest('.lp-filter-selection-box').find(".lp_com_filter_title").html();
        jQuery(".addtocompare").each(function() {
            var d_com_title_2 = jQuery(this).val();
            if (d_com_title == d_com_title_2) {
                jQuery(this).prop('checked', false);
            }
        });
        jQuery(this).closest('.lp-filter-selection-box').remove();
    })
}
jQuery("table").each(function() {
    var tableid = jQuery(this).attr('id');
    if (tableid != 'example') {
        var tableHTML = jQuery(this).html();
        jQuery(this).replaceWith('<div class="table-responsive"><table border="0" cellpadding="0" cellspacing="0">' + tableHTML + '</table></div>')
    }
});

var publication_array = ["32"];
jQuery("#edit-field-publication-type option").each(function() {
    var publication_cate_id = jQuery(this).val();
    console.log(publication_array.includes(publication_cate_id));
    if (publication_array.includes(publication_cate_id)) {
        jQuery(this).hide();
    } else {}
});

var comparecount = 0;
jQuery('.addtocompare').change(function() {
    var com_title = jQuery(this).val();
    var com_user = jQuery(this).attr('data-user');
    var com_price_rupee = jQuery(this).attr('data-price-rupee');

    if (jQuery(this).is(":checked")) {
        console.log(com_title);
        comparecount = comparecount + 1;
        if (comparecount == 1) {
            jQuery('.lp-filter-selection-box-section').slideDown();
        }
        if (comparecount == 0) {
            jQuery('.lp-filter-selection-box-section').slideUp();
        }
        if (comparecount > 3) {
            alert('Maximum 3 programmes can be added for compare.');
        } else {
            jQuery('#lp-filter-selection-boxes').append('<div class="lp-filter-selection-box text-start"><a href="#" class="lp-filter-box-close-btn"><img src="/themes/iima/images/filter-close.png" alt="close" class="w-100"></a><p class="fs-24 fw-600 lp_com_filter_title">' + com_title + '</p><ul class="border-0 border-top"><li class="lp-detail-icons lp-detail-user mt-30">' + com_user + '</li><li class="lp-detail-icons lp-detail-price mb-0">' + com_price_rupee + '</li></ul></div>').ready(function() {
                jQuery('.lp-filter-box-close-btn').on('click', function(e) {
                    e.preventDefault();
                    var d_com_title = jQuery(this).closest('.lp-filter-selection-box').find(".lp_com_filter_title").html();
                    jQuery(".addtocompare").each(function() {
                        var d_com_title_2 = jQuery(this).val();
                        if (d_com_title == d_com_title_2) {
                            jQuery(this).prop('checked', false);
                        }
                    });
                    comparecount = comparecount - 1;
                    jQuery(this).closest('.lp-filter-selection-box').remove();
                    if (comparecount == 1) {
                        jQuery('.lp-filter-selection-box-section').slideDown();
                    }
                    if (comparecount == 0) {
                        jQuery('.lp-filter-selection-box-section').slideUp();
                    }
                    if (comparecount > 1) {
                        jQuery('#click-to-compare').removeClass('disabled');
                    } else {
                        jQuery('#click-to-compare').addClass('disabled');
                    }
                });
            });
        }
        if (comparecount > 1) {
            jQuery('#click-to-compare').removeClass('disabled');
        } else {
            jQuery('#click-to-compare').addClass('disabled');
        }
    } else {
        comparecount = comparecount - 1;
        jQuery(".lp-filter-selection-box").each(function() {
            var com_title_2 = jQuery(this).find(".lp_com_filter_title").html();
            if (com_title == com_title_2) {
                jQuery(this).remove();
            }
        });

        if (comparecount > 1) {
            jQuery('#click-to-compare').removeClass('disabled');
        } else {
            jQuery('#click-to-compare').addClass('disabled');
        }
        if (comparecount == 1) {
            jQuery('.lp-filter-selection-box-section').slideDown();
        }
        if (comparecount == 0) {
            jQuery('.lp-filter-selection-box-section').slideUp();
        }
        console.log(com_title);
    }
});

if (jQuery('#edu_exp_graph').length) {
    edu_exp_graph();
}
if (jQuery('#genderChart_box').length) {
    edu_exp_graph_2();
}
if (jQuery('#edu_exp_graph_3_box').length) {
    edu_exp_graph_3();
}

jQuery('.file--mime-application-pdf').each(function() {
    jQuery(this).find('a').attr("target", "_blank");
});
jQuery('.faculty-publication-box .file--application-pdf a').each(function() {
    jQuery(this).html('');
});
jQuery('.menu--main li a').on('click', function() {
    var menulink = jQuery(this).attr('href');
    if (menulink == '' || menulink == '#' || menulink == null || menulink == undefined) {
        return false;
    }
})
jQuery('a.career-read-more').on('click', function(e) {
    e.preventDefault();
    if (jQuery(this).closest('.career-logos-holder').hasClass('show-all-logo')) {
        jQuery(this).closest('.career-logos-holder').removeClass('show-all-logo');
        jQuery(this).find('span').html('More');
    } else {
        jQuery(this).closest('.career-logos-holder').addClass('show-all-logo');
        jQuery(this).find('span').html('Less');
    }
})
jQuery('.open-close-according').on('click', function(e) {
    e.preventDefault();
    if (jQuery(this).hasClass('opend')) {
        jQuery(this).removeClass('opend');
        jQuery(this).addClass('closed');

        jQuery(this).closest('.qna-according-holder').find('.close-according').slideUp();
        jQuery(this).find('span').html('Show More');
    } else {
        jQuery(this).addClass('opend');
        jQuery(this).removeClass('closed');
        jQuery(this).closest('.qna-according-holder').find('.close-according').slideDown();
        jQuery(this).find('span').html('Show Less');
    }
})
jQuery('.video-play-box').on('click', function(e) {
    e.preventDefault();
    if (jQuery(this).hasClass('plaing')) {
        jQuery(this).removeClass('plaing')
        jQuery(this).find('video').get(0).pause();
    } else {
        jQuery(this).addClass('plaing')
        jQuery(this).find('video').get(0).play();
    }
})

jQuery('.section-title-box a').each(function(index) {
    var button_text = jQuery(this).text();
    jQuery(this).html('<span>' + button_text + '</span>')
});

jQuery('.section-title-box a.cv-btn').html('<span>View CV</span>');
jQuery('.remove-filter .view-filters').html('');

// Inline popups
jQuery('.inline-popups').magnificPopup({
    removalDelay: 500, //delay removal by X to allow out-animation
    callbacks: {
        beforeOpen: function() {
            this.st.mainClass = 'mfp-zoom-in';
        }
    },
    midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
});


// Image popups
jQuery('.image-popups').magnificPopup({
    type: 'image',
    removalDelay: 500, //delay removal by X to allow out-animation
    callbacks: {
        beforeOpen: function() {
            // just a hack that adds mfp-anim class to markup 
            this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
            this.st.mainClass = 'mfp-zoom-in';
        }
    },
    closeOnContentClick: true,
    midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
});

jQuery('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false,
    callbacks: {
        beforeOpen: function() {
            this.st.mainClass = 'mfp-zoom-in';
        }
    }
});

if (jQuery('#faculty-banner-img').length) {
    if (jQuery(window).width() > 767) {
        var fac_imgs = jQuery('#faculty-banner-img').attr('data-imgs').split(",");
        var fac_img_count = fac_imgs.length;
        //console.log(fac_img_count);
        var fac_img_random = Math.floor(Math.random() * fac_img_count) //Finds number between 0 - max
        var fac_img_path = fac_imgs[fac_img_random];
        var leftimgurl = jQuery('#left-msg-url').val();
        if (leftimgurl == fac_img_path) {
            jQuery('#employee-banner-text').addClass('right-banner-text');
        } else {
            jQuery('#employee-banner-text').removeClass('right-banner-text');
        }
        jQuery('#faculty-banner-img').attr("src", fac_img_path);
    } else {
        jQuery('#faculty-banner-img').attr("src", jQuery('#faculty-banner-img').attr('data-mbl-image'));
    }
}

var tabhasgVs = window.location.hash;


if (tabhasgVs) {
    jQuery(".tabholder .tabtitle li a").each(function() {
        var tablinkid = jQuery(this).attr("href");
        if (tablinkid == tabhasgVs) {
            jQuery(this).trigger("click");
        }
    });
    jQuery(".area-courses-slider-title .swiper-slide a").each(function() {
        var tablinkid2 = jQuery(this).attr("href");
        if (tablinkid2 == tabhasgVs) {
            jQuery(this).trigger("click");
            setTimeout(function() {
                jQuery('html, body').animate({
                    scrollTop: jQuery(tabhasgVs).offset().top - 300
                }, 500);
            }, 1000);
        }
    });
}

jQuery('.open-tab').on('click', function(e) {
    e.preventDefault();
    var tabhasgVs2 = jQuery(this).attr("href");;
    console.log(tabhasgVs2);
    jQuery(".tabholder .tabtitle li a").each(function() {
        var tablinkidd = jQuery(this).attr("href");
        if (tablinkidd == tabhasgVs2) {
            jQuery(this).trigger("click");
        }
    });
})

jQuery(document).ready(function() {
    if (jQuery('.unauthorized-access-sec').length) {
        jQuery('title').text("Unauthorized Access");
    }
    if (jQuery('#example').length) {
        jQuery('#example').DataTable();
    }

    jQuery("table.table-staff, .content-detail-holder table").each(function(index) {
        var table_id = Math.floor(1000 + Math.random() * 9000);
        var table_class = 'iima-table-id-' + table_id;
        jQuery(this).addClass(table_class);
        jQuery(this).find("tbody tr").each(function() {
            jQuery(this).find("td").each(function(index) {
                var table_head = jQuery("." + table_class + " thead tr th").eq(index).text();
                jQuery(this).attr("data-title", table_head);
            });
        });
    });

    if (jQuery('.view-header').length) {
        jQuery(".view-research-publications-filter .view-header, .view-announcement-filter .view-header, .view-news-filter .view-header, .view-in-media-filter .view-header, .view-events-filter .view-header").html(jQuery(".view-header").html().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    }



});

if (jQuery('.addtoany_list').length) {
    window.a2a_config = window.a2a_config || {};
    a2a_config.callbacks = [];
    a2a_config.overlays = [];
    a2a_config.templates = {};
    (function(d, s, a, b) {
        a = d.createElement(s);
        b = d.getElementsByTagName(s)[0];
        a.async = 1;
        a.src = "https://static.addtoany.com/menu/page.js";
        b.parentNode.insertBefore(a, b);
    })(document, "script");
}

jQuery('body').delegate('.webform-submission-download-brochure-for-all-page-form', 'submit', function(e) {
    e.preventDefault();
    jQuery("[aria-describedby='drupal-modal']").remove();
    jQuery('.ui-dialog-titlebar-close').trigger('click');

    this.submit();
});

function get_font_percent() {
    if (localStorage.getItem("prefix_fontPercent") === null) {
        return 0;
    } else {
        return parseInt(localStorage.getItem("prefix_fontPercent"));

    }
}


function font_size_changes(fsc) {
    var c_font_percent = parseInt(get_font_percent());
    if (fsc == 'plus') {
        if (c_font_percent < 0) {
            var fschangepercent = 111.8;
            var c_new_font_percent = 0;
        } else if (c_font_percent > 0) {
            var fschangepercent = 100;
            var c_new_font_percent = 10;
        } else {
            var fschangepercent = 110;
            var c_new_font_percent = 10;
        }
    } else if (fsc == 'minus') {
        if (c_font_percent < 0) {
            var fschangepercent = 100;
            var c_new_font_percent = -10;
        } else if (c_font_percent > 0) {
            var fschangepercent = 95;
            var c_new_font_percent = 0;
        } else {
            var fschangepercent = 90;
            var c_new_font_percent = -10;
        }
    } else if (fsc == 'load') {
        var c_new_font_percent = c_font_percent;
        var fschangepercent = 100 + c_font_percent;
    } else {
        var c_new_font_percent = 0;
        if (c_font_percent < 0) {
            var fschangepercent = 111.8;
        } else if (c_font_percent > 0) {
            var fschangepercent = 95;
        } else {
            var fschangepercent = 100;
        }
    }
    // var fschangepercent =  parseInt(100 + c_new_font_percent); 
    console.log(c_font_percent + ' == ' + c_new_font_percent + ' == ' + fschangepercent);
    if ((c_font_percent != c_new_font_percent) || (fsc == 'load')) {
        jQuery('*').each(function() {
            //jQuery(this).attr('style', '');
            var k = parseInt(jQuery(this).css('font-size'));
            var lh = parseInt(jQuery(this).css('line-height'));
            var redSize = ((k * fschangepercent) / 100); //here, you can give the percentage( now it is reduced to 90%)
            // var redLHSize = ((lh* fschangepercent)/100) ; //here, you can give the percentage( now it is reduced to 90%)
            // jQuery(this).css({"font-size": redSize, "line-height": redLHSize+'px'});
            jQuery(this).css({
                "font-size": redSize
            });
            localStorage.setItem("prefix_fontPercent", c_new_font_percent);
        });
    }
}

jQuery('a.fontincrease').on('click', function(e) {
    e.preventDefault();
    jQuery('.acessbaolity-menu a').removeClass('active');
    jQuery(this).addClass('active');
    font_size_changes('plus');
})
jQuery('a.fontdecrease').on('click', function(e) {
    e.preventDefault();
    jQuery('.acessbaolity-menu a').removeClass('active');
    jQuery(this).addClass('active');
    font_size_changes('minus');
});
jQuery('a.fontnormal').on('click', function(e) {
    e.preventDefault();
    jQuery('.acessbaolity-menu a').removeClass('active');
    jQuery(this).addClass('active');
    font_size_changes('normal');
});
font_size_changes('load');
if (parseInt(get_font_percent()) < 0) {
    jQuery('a.fontdecrease').addClass('active');
} else if (parseInt(get_font_percent()) > 0) {
    jQuery('a.fontincrease').addClass('active');
} else {
    jQuery('a.fontnormal').addClass('active');
}


jQuery('.map-hover').on('mouseenter click', function(e) {
    e.preventDefault();
    var iconhtml = jQuery(this).attr('data-icon');
    var iconContent = jQuery(this).attr('title');
    var winW = jQuery(window).width();
    if (winW < 767) {
        var toggleCls = 'toggleMobile';
    } else if (e.clientX > (winW - 250)) {
        var toggleCls = 'toggleLeft';
    } else if (e.clientX < 250) {
        var toggleCls = 'toggleRight';
    } else {
        var toggleCls = '';
    }
    jQuery('#map-icon-box').html('');
    jQuery('#map-icon-box').append(iconhtml);
    jQuery('#map-icon-box').append('<div class="toggle-box ' + toggleCls + '"><span class="toggle-close"></span>' + iconContent + '</div>');
    console.log(e.clientX + ' = ' + e.clientY);
    jQuery('#map-icon-box').css({
        "left": (e.clientX - 20) + 'px',
        "top": (e.clientY - 20) + 'px',
        "opacity": 1
    })
})
jQuery(document).on('click', '.toggle-close', function(e) {
    e.preventDefault();
    jQuery('#map-icon-box').html('');
    jQuery('#map-icon-box').css({
        "left": 0 + 'px',
        "top": 0 + 'px',
        "opacity": 0
    })
});

jQuery(window).scroll(function() {
    if (jQuery('#map-icon-box').length) {
        jQuery('#map-icon-box').html('');
    }
});

if (jQuery('#iima_map_box').length) {
    jQuery('img[usemap]').rwdImageMaps();
}
if (jQuery('#edit-select-your-gift-amount').length) {
    jQuery('#edit-select-your-gift-amount-other').on('keyup', function() {
        var donateAmt = jQuery(this).val();
        var donateAmtLenght = this.value.length;
        jQuery('#donateAmtNotic').remove();
        if (donateAmtLenght == 0 || donateAmt == 0) {
            jQuery('#donateAmtNotic').remove();
        } else if (donateAmt < 1000) {
            jQuery('.form-item-select-your-gift-amount-other').append('<div id="donateAmtNotic" class="mt-10">We acknowledge every donation made to IIMA, but donors are encouraged to donate at least INR 1,000 to cover bankingcharges, donor reporting and related expenses borne by the Institute.</div>');
        } else if (donateAmt > 1000000) {
            jQuery('.form-item-select-your-gift-amount-other').append('<div id="donateAmtNotic" class="mt-10">We acknowledge your generous donation to IIMA and would like to get in touch with you to help with your donation. Please leave your contact details and we will get in touch with you shortly.</div>');
        }
    });
}
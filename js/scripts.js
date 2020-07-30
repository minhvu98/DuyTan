
jQuery(document).scroll(function () {
    var position = jQuery(window).scrollTop();
    var windowHeight = jQuery(window).height();
    if (position <= 500) {
        jQuery("a[href='#top']").fadeOut('fast');
    } else {
        jQuery("a[href='#top']").fadeIn('fast');
    }

    if (position >= jQuery('.header .header-menu.thisisfixed').attr("rel")) {
        jQuery('.floatingmainmenu').show();
        jQuery('.floatingmainmenu_b').show();
    } else {
        jQuery('.floatingmainmenu').hide();
        jQuery('.floatingmainmenu_b').hide();
    }
});

var _legatus_slider_timer;

jQuery(document).ready(function () {
    jQuery("body").append("<a href='#top' class='backtopbutton'></a>");

    jQuery("a[href='#top']").click(function () {
        jQuery("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });

    jQuery("a[href=#top]").click(function () {
        jQuery("html, body").animate({ scrollTop: 0 }, "normal");
        return false;
    });

    // For image borders
    jQuery("img.setborder").each(function () {
        jQuery(this).wrap("<span class='set-image-border'>");
        jQuery(this).parent().css("margin", jQuery(this).css("margin")).css("padding", jQuery(this).css("padding")).css("float", jQuery(this).css("float"));
        if (jQuery(this).css("position") == "absolute") {
            jQuery(this).parent().css("position", "absolute");
            jQuery(this).css("position", "relative");
        }
        jQuery(this).css("margin", "0px").css("padding", "0px").css("float", "none").css("position", "relative");
    });

    jQuery('.gallery-preview-control').click(function () {
        var theElement = jQuery(this);
        var theList = theElement.parent().find('.gallery-thumbs > ul > li');
        var theFullsize = theElement.parent().find('ul.full-size > li');
        var theActive = theElement.parent().find('.gallery-thumbs > ul > li.active').index();
        if (theElement.attr("href") == "#gallery-left") {
            if (theActive <= 0) {
                var prevElement = false;
            } else {
                var prevElement = true;
            }

            theList.each(function () {
                if (jQuery(this).index() == theActive) {
                    theFullsize.removeClass('active');
                    jQuery(this).removeClass("active");
                    if (prevElement) {
                        jQuery(this).prev().addClass("active");
                        theFullsize.eq(jQuery(this).index() - 1).addClass('active');
                    } else {
                        theList.eq(theList.size() - 1).addClass("active");
                        theFullsize.eq(theList.size() - 1).addClass('active');
                    }
                }
            });
        } else {
            if (theActive >= theList.size() - 1) {
                var nextElement = false;
            } else {
                var nextElement = true;
            }

            theList.each(function () {
                if (jQuery(this).index() == theActive) {
                    theFullsize.removeClass('active');
                    jQuery(this).removeClass("active");
                    if (nextElement) {
                        jQuery(this).next().addClass("active");
                        theFullsize.eq(jQuery(this).index() + 1).addClass('active');
                    } else {
                        theList.eq(0).addClass("active");
                        theFullsize.eq(0).addClass('active');
                    }
                }
            });
        }
        return false;
    });

    // jQuery('.youtube-video, .youtube-video iframe').click(function(){
    // 	jQuery(this).find("iframe").animate({width: 680, height: 383}, 'slow');
    // });


    // Legatus custom tooltips
    jQuery("body").append("<div id='_legatus-tooltip'></div>");
    jQuery(".legatus-tooltip").mouseenter(function () {
        if (jQuery(this).attr("title")) {
            var offset = jQuery(this).offset();
            jQuery("#_legatus-tooltip").html(jQuery(this).attr("title"));
            jQuery(this).attr("title", "");
            jQuery("#_legatus-tooltip").addClass("active");
            jQuery("#_legatus-tooltip").css("left", offset.left + "px").css("top", offset.top + "px");
            var wii = (parseInt(jQuery(this).css("width")) / 2);
            var wiiii = ((parseInt(jQuery("#_legatus-tooltip").css("width")) + parseInt(jQuery("#_legatus-tooltip").css("padding-right")) + parseInt(jQuery("#_legatus-tooltip").css("padding-left"))) / 2);
            //alert(wii);
            jQuery("#_legatus-tooltip").css("margin-left", ((wiiii - wii) * (-1)) + "px");
        }
    }).mouseleave(function () {
        jQuery("#_legatus-tooltip").removeClass("active");
        jQuery(this).attr("title", jQuery("#_legatus-tooltip").html());
        //jQuery("#_legatus-tooltip").html("");
    });


    // For slider
    if (jQuery(".slider-container")) {
        // Builds slider controls
        var this_count = jQuery(".slider-container .slider-content ul li").size();
        jQuery(".slider-container .slider-content ul li").each(function () {
            if (jQuery(this).index() == 0) { var clss = " active"; } else { var clss = ""; }
            jQuery("ul.slider-controls").append("<li class='slider-control" + clss + "'><a href='#'>" + (jQuery(this).index()) + "</a></li>");
        });

        // Slider controls
        jQuery(".slider-controls a").click(function () {
            stopSlider();
            var this_index = jQuery(this).parent().index();
            var this_height = jQuery(".slider-container .slider-content ul li").height();
            jQuery(this).parent().parent().find("li").removeClass("active");
            jQuery(this).parent().addClass("active");
            jQuery(".slider-container .slider-content ul").css("top", "-" + (this_index * this_height) + "px");
            return false;
        });

        // Slider loading bar
        if (_legatus_slider_autostart) {
            setTimeout("startSlider()", _legatus_slider_interval);
            if (_legatus_slider_loading) {
                jQuery(".slider-container .slider-content").append("<div class='slider-loading'></div>");
                sliderLoading();
            }
        }
    }

    // For slider sub
    if (jQuery(".slider-container-sub")) {
        // Builds slider controls
        var this_count = jQuery(".slider-container-sub .slider-content-sub ul li").size();
        jQuery(".slider-container-sub .slider-content-sub ul li").each(function () {
            if (jQuery(this).index() == 0) { var clss = " active"; } else { var clss = ""; }
            jQuery("ul.slider-controls-sub").append("<li class='slider-control-sub" + clss + "'><a href='#'>" + (jQuery(this).index()) + "</a></li>");
        });

        // Slider controls
        jQuery(".slider-controls-sub a").click(function () {
            stopSliderSub();
            var this_index = jQuery(this).parent().index();
            var this_height = jQuery(".slider-container-sub .slider-content-sub ul li").height();
            jQuery(this).parent().parent().find("li").removeClass("active");
            jQuery(this).parent().addClass("active");
            jQuery(".slider-container-sub .slider-content-sub ul").css("top", "-" + (this_index * this_height) + "px");
            return false;
        });

        // Slider loading bar
        if (_legatus_slider_autostart_sub) {
            setTimeout("startSliderSub()", _legatus_slider_interval_sub);
            if (_legatus_slider_loading_sub) {
                jQuery(".slider-container-sub .slider-content-sub").append("<div class='slider-loading-sub'></div>");
                sliderLoadingSub();
            }
        }
    }


    jQuery(".images-scroll li a").click(function () {
        jQuery(this).parent().parent().find("li").removeClass("active");
        jQuery(this).parent().addClass("active");
        jQuery(this).parent().parent().parent().find(".images-content > li").removeClass("active");
        jQuery(this).parent().parent().parent().find(".images-content > li").eq(jQuery(this).parent().index()).addClass("active");
        var step = ((-250) * (jQuery(this).parent().index() - 1)) - 60;
        //alert(step);
        jQuery(this).parent().parent().css("margin-left", step + "px");
        return false;
    });




    jQuery(".gallery-navi-right").click(function () {
        var thiscount = parseInt(jQuery(this).parent().find("ul li").size()) - 1;
        var thisindex = parseInt(jQuery(this).parent().find("ul li.active").index());
        var thisnext = (thisindex >= thiscount) ? (0) : (thisindex + 1);

        jQuery(this).parent().find("ul li.active").addClass("current");
        jQuery(this).parent().find("ul li.current").removeClass("active");
        jQuery(this).parent().find("ul li").eq(thisnext).addClass("active");
        jQuery(this).parent().find("ul li.current").removeClass("current");
        return false;
    });

    jQuery(".gallery-navi-left").click(function () {
        var thiscount = parseInt(jQuery(this).parent().find("ul li").size()) - 1;
        var thisindex = parseInt(jQuery(this).parent().find("ul li.active").index());
        var thisnext = (thisindex <= 0) ? (thiscount) : (thisindex - 1);

        jQuery(this).parent().find("ul li.active").addClass("current");
        jQuery(this).parent().find("ul li.current").removeClass("active");
        jQuery(this).parent().find("ul li").eq(thisnext).addClass("active");
        jQuery(this).parent().find("ul li.current").removeClass("current");
        return false;
    });



    jQuery("#calendar_wrap tbody td").each(function () {
        var el_this = jQuery(this);
        if (!el_this.hasClass("pad")) {
            el_this.html("<span>" + el_this.html() + "</span>");
        }
    });


    // Breaking News Scroller
    jQuery(".breaking-news .breaking-block").each(function () {
        var thisitem = jQuery(this);
        thisitem.find("ul li").css("width", thisitem.width() + "px");
    });

    jQuery(".breaking-controls a").click(function () {
        var thisitem = jQuery(this);
        var itemul = thisitem.parent().parent().find(".breaking-block ul");
        var items = itemul.find("li");
        var sega = (items.size() - 1) * (items.width() + parseInt(items.css("margin-right")));
        if (thisitem.hasClass("breaking-arrow-left")) {
            if (0 >= Math.abs(parseInt(itemul.css("margin-left")))) {
                itemul.css("margin-left", (sega * (-1)) + "px");
            } else {
                itemul.css("margin-left", (parseInt(itemul.css("margin-left")) + (items.width() + parseInt(items.css("margin-right")))) + "px");
            }
        } else {
            if (sega <= Math.abs(parseInt(itemul.css("margin-left")))) {
                itemul.css("margin-left", "0px");
            } else {
                itemul.css("margin-left", (parseInt(itemul.css("margin-left")) + (items.width() + parseInt(items.css("margin-right"))) * (-1)) + "px");
            }
        }
        return false;
    });


    // Share buttons in article
    if (jQuery(".social-icons-float").length != 0) {
        var boooo = jQuery(".social-icons-float").offset().top - 31;

        jQuery(window).scroll(function () {
            //console.log(jQuery(this).css("top"));
            var position = jQuery(window).scrollTop();
            if (position >= boooo) {
                jQuery(".social-icons-float").css("position", "fixed").css("top", "30px").css("left", "50%").css("margin-left", "-620px");
                jQuery(".logged-in .social-icons-float").css("top", "58px");
            } else {
                jQuery(".social-icons-float").css("position", "absolute").css("top", "70px").css("left", "-115px").css("margin-left", "0px");
            }
        });
    }


    jQuery('.tab-block li a').click(function () {
        var theitem = jQuery(this);
        theitem.parent().parent().find("li").removeClass("active");
        theitem.parent().addClass("active");
        theitem.parent().parent().parent().parent().find(".tab-content > ul > li").removeClass("active");
        theitem.parent().parent().parent().parent().find(".tab-content > ul > li").eq(theitem.parent().index()).addClass("active");
        return false;
    });


    jQuery(".accordion > div > a").click(function () {
        var thiselement = jQuery(this);
        if (thiselement.parent().hasClass("active")) {
            thiselement.parent().toggleClass('active');
            return false;
        }
        thiselement.parent().parent().children().removeClass('active');
        thiselement.parent().toggleClass('active');
        return false;
    });


    jQuery(".alert-box > a.closebutton").click(function () {
        var thiselement = jQuery(this);
        thiselement.parent().hide();
        return false;
    });


    // for toggle
    jQuery(".toggle > a").click(function () {
        var thiselement = jQuery(this);
        thiselement.parent().toggleClass('active');
        return false;
    });


    jQuery(".gallery-box-thumbs").each(function () {
        var thiselement = jQuery(this);
        var newvalue = thiselement.find("ul li").size() * (parseInt(thiselement.find("ul li").css("width")) + parseInt(thiselement.find("ul li").css("margin-right")));
        thiselement.find("ul").css("width", newvalue + "px");
        if (thiselement.find("ul li").size() > 13) {
            thiselement.find(".control-right").addClass("active");
        }
    });



    jQuery(".gallery-box-thumbs .control-right").click(function () {
        var thiselement = jQuery(this);
        var ulwidth = parseInt(thiselement.parent().parent().find("ul").width());
        var thewidth = parseInt(thiselement.parent().parent().width());
        var themargin = parseInt(thiselement.parent().find("ul").css("margin-left"));
        console.log(ulwidth + " <= " + (Math.abs(themargin) + thewidth));
        if (ulwidth <= (Math.abs(themargin) + 72 + thewidth)) {
            thiselement.parent().find("ul").css("margin-left", "-" + (ulwidth - thewidth) + "px");
            thiselement.removeClass("active");
        } else {
            thiselement.parent().find("ul").css("margin-left", (themargin - 72) + "px");
        }
        thiselement.parent().find(".control-left").addClass("active");
        return false;
    });

    jQuery(".gallery-box-thumbs .control-left").click(function () {
        var thiselement = jQuery(this);
        var ulwidth = parseInt(thiselement.parent().parent().find("ul").width());
        var thewidth = parseInt(thiselement.parent().parent().width());
        var themargin = parseInt(thiselement.parent().find("ul").css("margin-left"));
        console.log(themargin + " <= " + (Math.abs(themargin) + thewidth));
        if (themargin + 72 >= 0) {
            thiselement.parent().find("ul").css("margin-left", "0px");
            thiselement.removeClass("active");
        } else {
            thiselement.parent().find("ul").css("margin-left", (themargin + 72) + "px");
        }
        thiselement.parent().find(".control-right").addClass("active");
        return false;
    });

    jQuery(".lightbox").click(function () {
        jQuery(".lightbox").css('overflow', 'hidden');
        jQuery("body").css('overflow', 'auto');
        jQuery(".lightbox .lightcontent").fadeOut('fast');
        jQuery(".lightbox").fadeOut('slow');
    }).children().click(function (e) {
        return false;
    });

    //jQuery(".header .header-menu ul.main-menu > li").click(function () {
    //    if (!$(this.parentNode.parentNode.parentNode).hasClass("thisisfloat")) {
    //        if ($(this).find('ul.sub-menu').css('display') != "block") {
    //            $(this).find('ul.sub-menu').show();
    //        }
    //        else {
    //            $(this).find('ul.sub-menu').hide();
    //        }
    //    }
    //});

    //jQuery(".header .header-menu ul.main-menu > li").mouseleave(function () {
    //    if ($(this).find('ul.sub-menu').css('display') == "block") {
    //        $(this).find('ul.sub-menu').hide();
    //    }
    //});

   
  
    jQuery("body").append("<div class='menu-block'></div>");
    jQuery(".header .header-menu").clone().appendTo(".header").addClass("thisisfloat");
    jQuery(".header .header-menu.thisisfloat .main-menu").prepend(jQuery(".very-top-menu").html());
    jQuery(".header .header-menu.thisisfloat .main-menu").append(jQuery(".header-undermenu .wrapper ul.secondary-menu").html());
    jQuery(".header .header-menu.thisisfloat").append("<a href='#show-menu' class='phone-icon icon-text'><span class='icon-text'><img width='35px' style='padding-top:2px' src='menu.png'/*tpa=http://m.tuyensinh.duytan.edu.vn/jscript/images/menu.png*/ /></span></div>");


    jQuery("a[href='#show-menu']").click(function () {
        jQuery(this).parent().toggleClass("active");
        jQuery(".menu-block").fadeToggle('fast');
        jQuery("body").toggleClass('setscreen');
        return false;
    });

    //jQuery('.header .header-menu.thisisfixed').each(function () {
    //    var thiselement = jQuery(this);
    //    if (!thiselement.hasClass("thisisfloat")) {
    //        thiselement.attr("rel", thiselement.offset().top);
    //        thiselement.clone().appendTo('.header').css("display", "none").css("position", "fixed").css("top", "0px").css("left", "0px").css("width", "100%").css("z-index", "20").addClass("floatingmainmenu");
    //        thiselement.parent().find('.header-undermenu').clone().appendTo('.header').css("display", "none").css("position", "fixed").css("background", "#fff").css("top", "41px").css("left", "0px").css("width", "100%").css("z-index", "20").addClass("floatingmainmenu_b");
    //        jQuery('.social-icons-float').addClass("morespace");
    //    }
    //});

});

function expand(e) {
    
    var thiselement = jQuery(e);
    var a = thiselement.parent().children();

    if ($(e).find('ul.sub-menu').attr('id') == "SubMenu1") {
        thiselement.parent().find('ul#SubMenu2.sub-menu').hide();
        if (thiselement.parent().find('ul#SubMenu1.sub-menu').css('display') != "block") {
            thiselement.parent().find('ul#SubMenu1.sub-menu').show();
        }
        else {
            thiselement.parent().find('ul#SubMenu1.sub-menu').hide();
        }
    }
    else {
        thiselement.parent().find('ul#SubMenu1.sub-menu').hide();
        if (thiselement.parent().find('ul#SubMenu2.sub-menu').css('display') != "block") {
            thiselement.parent().find('ul#SubMenu2.sub-menu').show();
        }
        else {
            thiselement.parent().find('ul#SubMenu2.sub-menu').hide();
        }
    }
    
    //if (jQuery(e).find('ul.sub-menu').css('display') != "block") {
    //    jQuery(e).find('ul.sub-menu').show();
    //}
    //else {
    //    jQuery(".header .header-menu.thisisfixed.active  ul.main-menu > li > ul").hide();
    //}
}

function lightboxclose() {
    jQuery(".lightbox").css('overflow', 'hidden');
    jQuery(".lightbox .lightcontent").fadeOut('fast');
    jQuery(".lightbox").fadeOut('slow');
    jQuery("body").css('overflow', 'auto');
}


function stopSlider() {
    _legatus_slider_autostart = false;
    var _legatus_slider_timer = false;
    if (_legatus_slider_loading) {
        jQuery(".slider-container .slider-content .slider-loading").css("display", "none");
    }
}

function startSlider() {
    if (!_legatus_slider_autostart) return false;
    sliderLoading();
    var this_height = jQuery(".slider-container .slider-content ul li").height();
    var this_index = jQuery(".slider-container .slider-controls .slider-control.active").index();
    var this_count = jQuery(".slider-container .slider-controls .slider-control").size();
    if (this_index + 1 < this_count) { var new_index = this_index + 1; } else { var new_index = 0; }
    jQuery(".slider-container .slider-controls .slider-control").removeClass("active");
    jQuery(".slider-container .slider-controls .slider-control").eq(new_index).addClass("active");
    jQuery(".slider-container .slider-content ul").css("top", "-" + (new_index * this_height) + "px");
    var _legatus_slider_timer = setTimeout("startSlider()", _legatus_slider_interval);
}

function sliderLoading() {
    if (!_legatus_slider_loading) return false;
    jQuery(".slider-container .slider-content .slider-loading").css("width", "0px");
    jQuery(".slider-container .slider-content .slider-loading").animate({ width: '100%' }, (_legatus_slider_interval - 100));
}


//For slide sub
function stopSliderSub() {
    _legatus_slider_autostart_sub = false;
    var _legatus_slider_timer_sub = false;
    if (_legatus_slider_loading_sub) {
        jQuery(".slider-container-sub .slider-content-sub .slider-loading-sub").css("display", "none");
    }
}

function startSliderSub() {
    if (!_legatus_slider_autostart_sub) return false;
    sliderLoadingSub();
    var this_height = jQuery(".slider-container-sub .slider-content-sub ul li").height();
    var this_index = jQuery(".slider-container-sub .slider-controls-sub .slider-control-sub.active").index();
    var this_count = jQuery(".slider-container-sub .slider-controls-sub .slider-control-sub").size();
    if (this_index + 1 < this_count) { var new_index = this_index + 1; } else { var new_index = 0; }
    jQuery(".slider-container-sub .slider-controls-sub .slider-control-sub").removeClass("active");
    jQuery(".slider-container-sub .slider-controls-sub .slider-control-sub").eq(new_index).addClass("active");
    jQuery(".slider-container-sub .slider-content-sub ul").css("top", "-" + (new_index * this_height) + "px");
    var _legatus_slider_timer_sub = setTimeout("startSliderSub()", _legatus_slider_interval_sub);
}

function sliderLoadingSub() {
    if (!_legatus_slider_loading_sub) return false;
    jQuery(".slider-container-sub .slider-content-sub .slider-loading-sub").css("width", "0px");
    jQuery(".slider-container-sub .slider-content-sub .slider-loading-sub").animate({ width: '100%' }, (_legatus_slider_interval_sub - 100));
}


function printArticle() {
    var html = jQuery(".main-article-content .shortcode-content").html();
    var htmltitle = jQuery(".main-article-content h2.article-title").html();
    if (jQuery(".main-article-content .article-photo img").size() > 0) { var htmlphoto = "<img src='" + jQuery(".main-article-content .article-photo img").attr("src") + "' alt='' style='max-width: 600px;'/>"; } else { var htmlphoto = ""; }
    if (jQuery(".logo-image img").size() > 0) { var htmllogo = '<div class="logo-image">' + jQuery(".logo-image").html() + '</div>'; var logotext = false; } else { var htmllogo = '<div class="logo-text">' + jQuery(".logo-text").html() + '</div>'; var logotext = true; }
    var htmlcopy = jQuery(".footer-content .left").html();
    var htmlauthor = jQuery(".right-side div").eq(1).children().eq(0).html();
    var htmldate = jQuery(".date .calendar-date").html();

    top.consoleRef = window.open('', 'articleprint',
		'width=680,height=800'
		+ ',menubar=0'
		+ ',toolbar=1'
		+ ',status=0'
		+ ',scrollbars=1'
		+ ',resizable=1');
    top.consoleRef.document.writeln(
		'<html><head><title>' + jQuery(document).attr('title') + '</title><link type="text/css" rel="stylesheet" href="reset-1.css"/*tpa=http://m.tuyensinh.duytan.edu.vn/jscript/css/reset.css*/ /><link type="text/css" rel="stylesheet" href="css/print.css?' + Date() + '" /><link type="text/css" rel="stylesheet" href="css/shortcode.css?' + Date() + '" /></head>'
		+ '<body onLoad="self.focus()"><div class="wrapper">'
		+ htmllogo
		+ '<h2>' + htmltitle + '</h2>'
		+ '<div class="smallinfo"><strong>' + htmlauthor + '</strong><span>' + htmldate + '</span><a href="' + jQuery(location).attr('href') + '">' + jQuery(location).attr('href') + '</a></div>'
		+ '<div class="article-main-content shortcode-content">' + htmlphoto + '' + html + '</div>'
		+ htmlcopy
		+ '</div></body></html>'
		);
    top.consoleRef.document.close();
}
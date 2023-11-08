$(document).ready(onDocReady);

function onDocReady() {
    gallery();

    responsiveResize();
    responsiveScroll();

    locationAccordion();

    $(".layerBackgroundOverlay").addClass("fadeIn");

    $(window).on("resize", function () {
        responsiveResize();
    });
    $(window).on("scroll", function () {
        responsiveScroll();
    });
}

//###################
function createSliderMenu(a, t, i) {
    function n(a) {
        a.find(".slayer.active").each(function (a) {
            var t = $(this),
                i = t.find("li.active,li.subactive");
            i.length > 0 &&
                (t.addClass("active"),
                t.scrollTop(i.offset().top - t.offset().top - Math.floor(t.height() / 2) + t.scrollTop()));
        });
    }
    !(function (a, t) {
        a.find("ul").each(function (a) {
            var i = 0 == a || $(this).find("> li.active").length > 0;
            $(this).wrap('<div class="slayer' + (i ? " active" : "") + '"></div>'),
                $(this)
                    .parent()
                    .prepend('<div class="stitle">' + (0 == a ? t : '<a href="#" class="sback"></a>') + "</div>");
        });
    })(a, i),
        (function a(t, i, n) {
            var e = t.find("> .slayer");
            e.attr("data-path", n),
                e.attr("data-level", i),
                $(e)
                    .find("> ul > li")
                    .each(function (t) {
                        var e = $(this),
                            s = e.find("> .slayer");
                        if (s.length > 0) {
                            var l = e.find("> a"),
                                c = n + "-" + t;
                            e.attr("data-target", c),
                                l.addClass("slink"),
                                s.find(".sback").text(l.text()),
                                s.attr("data-parent", n),
                                a(e, i + 1, c);
                        }
                    });
        })(a, 0, "0"),
        (function (a, t) {
            t.addClass("smenu"),
                a.find(".slayer").each(function (a) {
                    t.append($(this));
                });
        })(a, t),
        (function (a) {
            a.find("a.slink").each(function () {
                $(this).on("click", function (t) {
                    var i = $(this).closest("li").attr("data-target");
                    a.find(".slayer[data-path='" + i + "']").addClass("active"), t.preventDefault();
                });
            }),
                a.find("a.sback").on("click", function (t) {
                    var i = $(this).closest(".slayer").attr("data-path");
                    a.find(".slayer[data-path='" + i + "']").removeClass("active"), t.preventDefault();
                });
        })(t),
        n(t),
        $(window).on("resize", function () {
            n(t);
        });
}
//###################

function responsiveResize() {
    setBodyOrientationClass();
    setScrollTopClass();
}
function responsiveScroll() {
    setScrollTopClass();
}

var $layerScrollTopMobile = $(".layerScrollTopMobile");
var $navScrollTop = $(".navScrollTop");

function setScrollTopClass() {
    var topScrolled = $(window).scrollTop();
    if (topScrolled > 200) {
        $layerScrollTopMobile.addClass("active");
        $navScrollTop.addClass("active");
    } else {
        $layerScrollTopMobile.removeClass("active");
        $navScrollTop.removeClass("active");
    }
}

function locationAccordion() {
    //close all Level2 accordion-items which are not children of accordion1 clicked button
    $(".accordionButtonLevel1").on("click", function (e) {
        var accordionLevel2Id = $(this).attr("data-level2-accordion");
        //console.log(accordionLevel2Id);
        $(".accordionLevel2:not(#" + accordionLevel2Id + ") .accordion-collapse").removeClass("show");
        $(".accordionLevel2:not(#" + accordionLevel2Id + ") .accordion-button").addClass("collapsed");
    });
}
function gallery() {
    $("[data-gallery]").each(function () {
        $(this).on("click", function (e) {
            var imgTag = '<img class="img-fluid" src="' + $(this).attr("data-gallery") + '" />';
            showGalleryModal(carouselGallery($(this)));
        });
        //.attr("data-gallery"));
    });
}

function setBodyOrientationClass() {
    var classNameLandscape = "windowLandscape";
    var classNamePortrait = "windowPortrait";
    var wWidth = $(window).width();
    var wHeight = $(window).height();
    var $body = $("body");
    if (wWidth > wHeight) {
        $body.removeClass(classNamePortrait);
        $body.addClass(classNameLandscape);
    } else {
        $body.removeClass(classNameLandscape);
        $body.addClass(classNamePortrait);
    }

    if (isBreakpointMediumUp()) {
        //close opened offcanvasNav if breakpoint is >medium (rotate tablett)
        $("#offcanvasNav.offcanvas.show").each(function () {
            var oOffcanvas = bootstrap.Offcanvas.getInstance($("#offcanvasNav")[0]);
            oOffcanvas.hide();
        });
    }

    function isBreakpointMediumUp() {
        var windowWidth = $(window).width();
        return windowWidth >= 992;
    }
}

function carouselGallery(item) {
    var galleryRoot = item.closest(".freiraumGallery");
    //console.log(galleryRoot.html());
    var galleryItems = galleryRoot.find("[data-gallery]");
    var galleryId = galleryRoot.attr("data-gallery-id");
    var galleryName = "carouselGallery" + galleryId;
    var html = [];
    html.push(
        '<div id="' +
            galleryName +
            '" class="carousel slide carousel-fade carouselGallery" data-bs-ride="false" data-bs-interval="false">'
    );
    /*
    html.push('  <div class="carousel-indicators">');
    var iItem=0;
    galleryItems.each(function () {
        var isActive=$(this).attr("data-item-id")==item.attr("data-item-id");
        html.push('    <button type="button" data-bs-target="#'+galleryName+'" data-bs-slide-to="'+iItem+'"'+(isActive?' class="active"':'')+' aria-current="true" aria-label="Slide '+(iItem+1)+'"></button>');
        iItem++;
    });
    html.push('  </div>');
    */

    var iItemindex = 0;
    html.push('  <div class="carousel-inner">');
    galleryItems.each(function () {
        var isActive = $(this).attr("data-item-id") == item.attr("data-item-id");
        var imgAlt = $(this).find("img").attr("alt");
        var imgCaption = $(this).find(".imgCaptionText").html();
        html.push('    <div class="carousel-item' + (isActive ? " active" : "") + '">');
        html.push(
            '      <img class="img-fluid" src="' +
                $(this).attr("data-gallery") +
                '" alt="' +
                $(this).find("img").attr("alt") +
                '" />'
        );
        html.push(
            '      <div class="imgCaption"><span class="imgLegend">' +
                (galleryItems.length > 1 ? iItemindex + 1 + "/" + galleryItems.length : "&nbsp;") +
                "</span></div>"
        );
        html.push("    </div>");
        iItemindex++;
    });
    html.push("  </div>");
    if (galleryItems.length > 1) {
        html.push(
            '  <button class="carousel-control-prev" type="button" data-bs-target="#' +
                galleryName +
                '" data-bs-slide="prev">'
        );
        html.push('    <span class="carousel-control-prev-icon" aria-hidden="true"></span>');
        html.push('    <span class="visually-hidden">Previous</span>');
        html.push("  </button>");
        html.push(
            '  <button class="carousel-control-next" type="button" data-bs-target="#' +
                galleryName +
                '" data-bs-slide="next">'
        );
        html.push('    <span class="carousel-control-next-icon" aria-hidden="true"></span>');
        html.push('    <span class="visually-hidden">Next</span>');
        html.push("  </button>");
    }
    html.push("</div>");
    return html.join("");
}

var modalGalleryWrap = null;
function showGalleryModal(body) {
    if (modalGalleryWrap !== null) {
        modalGalleryWrap.remove();
    }
    var html = [];
    html.push('<div class="modal fade" tabindex="-1">');
    html.push('  <div class="modal-dialog modal-xl modal-dialog-centered">');
    html.push('    <div class="modal-content">');
    html.push('      <div class="modal-body p-2">');
    html.push(body);
    html.push("      </div>");
    html.push("    </div>");
    html.push("  </div>");
    html.push("</div>");

    modalGalleryWrap = document.createElement("div");
    modalGalleryWrap.innerHTML = html.join("");

    document.body.append(modalGalleryWrap);

    var modal = new bootstrap.Modal(modalGalleryWrap.querySelector(".modal"));
    modal.show();
}

///https://github.com/zFunx/Dynamic-BS5-Modal-Box/blob/main/modal-with-custom-action.js
var modalWrap = null;
function showModal(title, body, footer) {
    if (modalWrap !== null) {
        modalWrap.remove();
    }

    var html = [];
    html.push('<div class="modal fade" tabindex="-1">');
    html.push('  <div class="modal-dialog modal-xl">');
    html.push('    <div class="modal-content">');
    html.push('      <div class="modal-header">');
    html.push('        <h5 class="modal-title">' + title + "</h5>");
    html.push('        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>');
    html.push("      </div>");
    html.push('      <div class="modal-body">');
    html.push(body);
    html.push("      </div>");
    html.push("    </div>");
    html.push("  </div>");
    html.push("</div>");

    modalWrap = document.createElement("div");
    modalWrap.innerHTML = html.join("");

    document.body.append(modalWrap);

    var modal = new bootstrap.Modal(modalWrap.querySelector(".modal"));
    modal.show();
}
function hideModal() {
    if (modalWrap !== null) {
        var modal = bootstrap.Modal.getInstance(modalWrap.querySelector(".modal"));
        modal.hide();
    }
}

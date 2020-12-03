$(function() {
    KMA.init();
    $(window).resize(function() {
        KMA.modalRefresh()
    });
    KMA.modalRefresh();
    $(document).on("click", "[modal]", function() {
        var modalWindow = $("div#" + $(this).attr("modal"));
        if (modalWindow.length) {
            KMA.modalShow(modalWindow);
            return false
        }
    }).on("click", ".icon-close, .modal, .button-close", function(event) {
        event.preventDefault();
        if (event.target != this) {
            return false
        } else {
            KMA.modalHide($(this).closest(".modal"))
        }
    }).on("keydown", function(key) {
        if (key.keyCode == 27) {
            KMA.modalHide($(".modal:visible:last"))
        }
    }).on("click", ".modal > *", function(event) {
        event.stopPropagation();
        return true
    });

});

var KMA = function($, $n) {
    return $.extend($n, {
        // initial modal function
        init: function() {},
        // modal hide
        modalHide: function($modal) {
            $modal.fadeOut("fast", function() {
                if (!$(".modal:visible").length) {
                    $("body").removeClass("modal-show");
                    $(document).trigger("kma.modal-hide")
                }
            })
        },
        // modal refresh resize
        modalRefresh: function() {
            if ($(".modal:visible:last").length) {
                var modalBlock = $(".modal:visible:last .modal-block"),
                    width = parseInt(modalBlock.outerWidth()),
                    height = parseInt(modalBlock.outerHeight());
                if ($(window).height() > height + 20) {
                    modalBlock.addClass("modal-top").removeClass("margin-t-b").css("margin-top", -1 * (height / 2))
                } else {
                    modalBlock.addClass("margin-t-b").removeClass("modal-top")
                }
                if ($(window).width() > width) {
                    modalBlock.addClass("modal-left").removeClass("margin-l").css("margin-left", -1 * (width / 2))
                } else {
                    modalBlock.addClass("margin-l").removeClass("modal-left")
                }
            }
        },
        // modal show
        modalShow: function($modal) {
            $modal.fadeIn("fast");
            $("body").addClass("modal-show");
            $(document).trigger("kma.modal-show");
            this.modalRefresh()
        },
        // modal initial callback function
        initCallback: function(timeout) {
            try {
                $("#kmacb > a").on("click", function(event, disableTrigger) {
                    if (disableTrigger == undefined || !disableTrigger) {
                        $(this).trigger("kma.callbackOperator")
                    }
                });
                if (window.kmacb_manager_class != undefined) {
                    $("#kmacb").addClass(window.kmacb_manager_class)
                }
                if (window.kmacb_form_selector != undefined) {

                    $("#kmacb > a").attr("kmacb-custom-form", window.kmacb_form_selector);
                    $("#kmacb > a").on("click", function(event, disableTrigger) {
                        event.preventDefault();
                        event.stopPropagation();
                        $(window.kmacb_form_selector).trigger("click", [true, true])
                    });
                    $(window.kmacb_form_selector).on("click", function(event, disableTrigger) {
                        if (disableTrigger == undefined || !disableTrigger) {
                            $(document).trigger("kma.callbackButton")
                        }
                    })
                }
                setTimeout(function start_kmacb() {
                    $("#kmacb").show()
                }, timeout)
            } catch (e) {}
        },
        // modal show comebacker
        showComebacker: false,
        initComebacker: function(timeout) {
            var current = this;
            current.showComebacker = true;
            try {
                setTimeout(function start_kmacomebacker() {
                    var comebacker = true;
                    $(window).on("mouseout", function(event) {
                        if (event.pageY - $(window).scrollTop() < 1 && comebacker) {
                            if (window.customPopupShowed != undefined && window.customPopupShowed === true) {
                                return
                            }
                            if ($(".modal:visible").length) {
                                return
                            }
                            $(document).trigger("kma.mouseLeave");
                            $("#kmacb > a").trigger("click", [true]);
                            comebacker = false
                        }
                    })
                }, timeout)
            } catch (e) {}
        },
        // modal mobile vibrate on start popup
        initVibrate: function(timeout) {
            setInterval(function() {
                try {
                    if (window.navigator && window.navigator.vibrate) {
                        navigator.vibrate([50, 30, 100, 30, 100, 30, 100, 30, 100, 30, 100, 30, 100, 30, 100, 30, 100, 30, 100, 30])
                    } else {
                        navigator.vibrate(0)
                    }
                } catch (err) {}
            }, timeout)
        }
    })
}(jQuery, KMA || {});
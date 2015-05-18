/*
 * KY Library 2015
 *
 * Thanks to Tolga Arıcan for all the help. (https://github.com/tarican)
 *
 * @author      Kenan Yıldız
 * @website     http://www.kenanyildiz.net
 * @version     1.0.0
 * @start_date  29.03.2015
 * @uptade_date 12.05.2015
 *
 *** Version Log
 *
 *** 1.0.0
 *
 *** - Global Ajax Function added
 *
 */

// Namespace
var KY = {
    init: function () {
        this.general.init();
        this.ajax.init();
        this.loadMore.init();
    }
};


KY.general = {

    init: function () {

        this.preLoader.init();
        this.cantClick.init();
        this.checkbox.init();
        this.radiobutton.init();
        this.countChar.init();
        this.socialShare.init();
        this.deviceDetection.init();
        this.zeroClipboard.init();
        this.generateUUID.init();
        this.modal.init();
        this.popup.init();

    },

    preLoader: {

        init: function () {
            /**
             * <body class="preloader-body">
             *     <span id="preloader"></span>
             * </body>
             * */
            window.onload = this.loader();
        },

        loader: function () {
            $('#preloader').fadeToggle(500, 'linear', function () {
                $('body').toggleClass('preloader-body');
            });
        }
    },

    cantClick: {
        init: function () {
            $('.disabled').on('click', function () {
                return false;
            });
        }
    },

    checkbox: {

        init: function () {

            /**
             * Custom Checkbox
             *
             * Sample usage - HTML:
             *
             * <label for="privacyCheck" class="ky-checkbox">
             *     <input type="checkbox" name="privacyCheck" id="privacyCheck" value="1" checked="checked" />
             *     <span class="ck"></span>
             * </label>
             *
             * Sample usage - CSS:
             *
             * label.ky-checkbox input          { position: absolute; top: 0; left: 0; opacity: 0; cursor: pointer; }
             * label.ky-checkbox span.ck        { cursor:pointer; display: inline-block; width: 16px; height: 16px; background: url("../i/bg-checkbox.png") no-repeat 0 -16px; margin-right: 10px; position: relative; line-height: 25px; }
             * label.ky-checkbox span.ck.active { background-position: 0 0; }
             *
             */

            this.initCheckboxChecked();

            $(document).on({
                click: function () {
                    $(this).siblings("span.ck").toggleClass("active");
                    $.event.trigger('checkboxChanged', [$(this)]);
                }
            }, 'label.ky-checkbox input[type="checkbox"]');

            // Changes runs listener after the event is over.
            $(document).on('checkboxChanged', function (event, self) {
                cl(self);
                if (self.is(':checked')) {
                    cl('checked');
                } else {
                    cl('not checked');
                }
            });

            // Reset Checkbox
            //KY.general.checkbox.resetCheckbox($('#termofuse').parent('.ky-checkbox'))

        },

        initCheckboxChecked: function () {
            $("label.ky-checkbox input[type='checkbox']:checked").siblings("span.ck").addClass("active");
        },

        check: function () {
            $(this).siblings("span.ck").toggleClass("active");
            $.event.trigger('checkbox-change', [$(this)]);
        },

        resetCheckbox: function (checkBox) {
            checkBox.each(function () {
                var th = $(this);
                th.find('span.ck').removeClass('active');
                th.find('input[type="checkbox"]').attr('checked', false);
            });
        }

    },

    radiobutton: {

        init: function () {

            /**
             * Custom Radiobutton
             *
             * Sample usage - HTML:
             *
             * <div class="genderChoose">
             *     <label for="imMan" class="ky-radiobutton">
             *         <span class="ck"></span>
             *         <input type="radio" name="gender" id="imMan" value="Man" checked />
             *         <span>Man</span>
             *     </label>
             *
             *     <label for="imWoman" class="ky-radiobutton">
             *         <span class="ck"></span>
             *         <input type="radio" name="gender" id="imWoman" value="Woman" />
             *         <span>Woman</span>
             *     </label>
             *</div>
             *
             * Sample usage - CSS:
             *
             * label.ky-radiobutton input          { position: absolute; top: 0; left: 0; opacity: 0; cursor: pointer; }
             * label.ky-radiobutton span.ck        { cursor:pointer; display: inline-block; width: 16px; height: 16px; background: url("../i/bg-radiobutton.png") no-repeat 0 -16px; margin-right: 10px; position: relative; line-height: 25px; }
             * label.ky-radiobutton span.ck.active { background-position: 0 0; }
             *
             */

            this.initRadiobuttonChecked();

            $(document).on({
                click: function () {
                    cl($(this).is(':checked'));
                    $(this).parent().siblings('label.ky-radiobutton').find('span.ck').removeClass('active');
                    $(this).siblings("span.ck").addClass("active");
                    $.event.trigger('radiobuttonChanged', [$(this)]);
                }
            }, 'label.ky-radiobutton input[type="radio"]');

            // Changes runs listener after the event is over.
            $(document).on('radiobuttonChanged', function (event, self) {
                cl(self);
                if (self.is(':checked')) {
                    cl('checked');
                } else {
                    cl('not checked');
                }
            });

            // Reset Radiobutton
            //KY.general.radiobutton.resetRadiobutton($('#male').parent('.ky-checkbox'))

        },

        initRadiobuttonChecked: function () {
            $("label.ky-radiobutton input[type='radio']:checked").siblings("span.ck").addClass("active");
        },

        check: function () {
            $(this).siblings("span.ck").toggleClass("active");
            $.event.trigger('radiobuttonChanged', [$(this)]);
        },

        resetRadiobutton: function (radiobuttonBox) {
            radiobuttonBox.each(function () {
                var th = $(this);
                th.find('span.ck').removeClass('active');
                th.find('input[type="radio"]').attr('checked', false);
            });
        }

    },

    countChar: {

        init: function () {

            /**
             * Count Remaining Characters
             *
             * Sample usage - HTML:
             *
             * <textarea data-maxlength="160" class="req-string count-chars"></textarea>
             * <div class="remaining-char">
             *      <span class="count-chars-label-selector"></span>
             * </div>
             *
             */
            var textarea = $('.count-chars');
            textarea.on('keydown keyup', this.count);
            textarea.each(function () {
                var th = $(this),
                    maxLen = th.attr('data-maxlength');
                th.siblings('.remaining-char').find('.count-chars-label-selector').text(maxLen);
            });

        },

        count: function () {

            var th = $(this),
                text_value = th.value,
                text_length = text_value.length,
                limit_num = th.attr('data-maxlength'),
                text_remaining = limit_num - text_length;

            if (text_length >= limit_num) {
                var textValue = text_value.substring(0, limit_num);
                text_remaining = limit_num - textValue.length;
                th.val(textValue);
            }

            th.siblings('.remaining-char').find('.count-chars-label-selector').text(text_remaining);

        }

    },

    socialShare: {

        init: function () {
            $(document).on('click', '.ky-share', this.share);
        },

        share: function () {

            var target = $(this),
                type = target.data('type'),
                link = target.data('link'),
                picture = target.data('picture'),
                name = target.data('name'),
                caption = target.data('caption'),
                text = target.data('description');

            if (type == 'facebook') {

                FB.ui({
                    method: 'feed',
                    link: link,
                    picture: picture,
                    name: name,
                    caption: caption,
                    description: text

                }, function (response) {
                    $.event.trigger('shared', [1, 'Facebook wallpost', response, target]);
                    // if response is true? Its shared.
                });

            } else if (type == 'twitter') {

                text = (typeof link != 'undefined') ? (text + ' ' + link) : text;
                text = encodeURIComponent(text);

                window.open('https://twitter.com/intent/tweet?original_referrer=&url=&text=' + text, 'twitter', 'width=500,height=300,location=0,menubar=0,scrollbars=0,status=0,toolbar=0,resizable=0');

                $.event.trigger('shared', [2, 'Twitter tweet', false, target]);

            } else if (type == 'linkedin') {

                link = encodeURIComponent(link);

                window.open('http://www.linkedin.com/cws/share?url=' + link + '&lang=tr_TR', 'linkedin', 'width=600,height=500,location=0,menubar=0,scrollbars=0,status=0,toolbar=0,resizable=0');

                $.event.trigger('shared', [3, 'Linkedin share', false, target]);

            } else if (type == 'whatsapp') {

                var url = 'whatsapp://send?';
                url += 'text=' + encodeURIComponent(text);
                url += (typeof link != 'undefined') ? encodeURIComponent(' ' + link) : '';

                window.open(url, '_blank');

            }

            return false;

        }

    },

    deviceDetection: {

        init: function () {
            this.detect();
        },

        detect: function () {

            var $html = $('html');

            // iPad detect
            if (navigator.userAgent.match(/iPad/i) != null) $html.addClass('iPad');

            // mobile detect
            else if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

                $html.addClass('Mobile');

                // android detect
                var isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;
                isAndroid ? $html.addClass('Android') : false;

                // iphone detect
                var isiPhone = /iphone/i.test(navigator.userAgent.toLowerCase());
                isiPhone ? $html.addClass('iPhone') : false;

            }
        }

    },

    zeroClipboard: {

        init: function () {
            /**
             *
             *  <a class="copy-btn" id="copy-button" data-clipboard-text="http://www.test.com/adnl/13234"
             *     data-clipboard-target="createdLink" href="#" data-event-value="urlCopied">KOPYALA</a>
             *
             **/
            this.copyLink();
        },

        copyLink: function () {

            var client = new ZeroClipboard(document.getElementById("copy-button"));
            client.on("ready", function (readyEvent) {
                client.on("aftercopy", function (event) {
                    cl("Copied text to clipboard: " + event.data["text/plain"]);
                    //$('.link-area').addClass('copied');
                    //$('.copy-btn').html('COPIED');
                });
            });

            $(document).on('click', '#copy-button', function () {
                return false;
            });

            return false;

        }

    },

    generateUUID: {

        init: function () {
            //console.info('Generated UUID: ' + this.generate());
        },

        generate: function () {
            var d = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uuid;
        }

    },

    datePicker: {

        init: function () {

            $('#datePicker_Ctr input#datepicker').click(function () {
                $(this).datepicker("show");
            });

            $("#datepicker").datepicker({
                showOn: "button",
                buttonImage: "html/i/calender-icon.png",
                buttonImageOnly: true
            });

            /* Turkish initialisation for the jQuery UI date picker plugin. */
            jQuery(function ($) {
                $.datepicker.regional['tr'] = {
                    closeText: 'Kapat',
                    prevText: 'Geri',
                    nextText: 'İleri',
                    currentText: 'bugün',
                    monthNames: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
                    monthNamesShort: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
                    dayNames: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
                    dayNamesShort: ['Pz', 'Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct'],
                    dayNamesMin: ['Pz', 'Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct'],
                    weekHeader: 'Hf',
                    dateFormat: 'dd.mm.yy',
                    firstDay: 1,
                    isRTL: false,
                    showMonthAfterYear: false,
                    yearSuffix: ''
                };
                $.datepicker.setDefaults($.datepicker.regional['tr']);
            });

            // Datepicker Div Move
            $('#ui-datepicker-div').insertAfter('.form-group-row input#datepicker');

        }

    },

    creditCardNoSkip: {

        init: function () {

            $('.creditCardNoBox .small-box .small-input').on('keyup', function (e) {

                var th = $(this);

                // Credit Card Type Control
                if (th.parent('.small-box').attr('id') == "credicardNoPart1Ctr") {

                    var visa;
                    var american;
                    var master;
                    var text = th.val();

                    // Backspace or Delete
                    if (e.keyCode == 8 && text.length == 0 || e.keyCode == 46 && text.length == 0) {
                        $('.credit-card-type-images > img').animate({opacity: 1}, 1);
                    }

                    // VISA
                    text.substring(0, 1) == 4 ? visa = true : visa = false;

                    // AMERICAN
                    text.substring(0, 2) > 33 && text.substring(0, 2) < 38 ? american = true : american = false;

                    // MASTER
                    text.substring(0, 2) > 50 && text.substring(0, 2) < 56 ? master = true : master = false;

                    // Control
                    if (visa) {
                        KY.general.creditCardNoSkip.cardTypeCtr('visa');
                    }
                    else if (american) {
                        KY.general.creditCardNoSkip.cardTypeCtr('american')
                    }
                    else if (master) {
                        KY.general.creditCardNoSkip.cardTypeCtr('master');
                    }

                    if (american) {
                        $('#credicardNoPart4Ctr input').attr('maxlength', '3');
                        $('#credicardNoPart4Ctr input').attr('minlength', '3');
                    } else {
                        $('#credicardNoPart4Ctr input').attr('maxlength', '4');
                        $('#credicardNoPart4Ctr input').attr('minlength', '4');
                    }

                }

                if (th.val().length == 4 && th.attr('data-skip') == "true") {
                    th.parent().next().find('.small-input').focus();
                }

            });

        },

        cardTypeCtr: function (type) {
            $('.credit-card-type-images > img').not('.' + type + '').animate({opacity: 0.3}, 300);
            $('.credit-card-type-images > img.' + type + '').animate({opacity: 1}, 300);
        }

    },

    modal: {

        init: function () {

            $('.mdl-open-btn').on('click', function () {
                var th = $(this);
                var modalID = th.attr('data-modal-id');
                var toOpenID = th.attr('data-to-open-id');
                if (typeof toOpenID !== 'undefined') {
                    var selectedModal = $('#mainModal .modal[data-modal-rel="' + modalID + '"]');
                    selectedModal.find('.mdl-close-btn').attr('data-to-back-id', toOpenID);
                }
                KY.general.modal.open(modalID);
                return false;
            });

            $('.mdl-close-btn, #mainModal .overlay').on('click', function () {
                var toBackID;
                if ($(this).hasClass('mdl-close-btn')) {
                    toBackID = $(this).attr('data-to-back-id');
                } else {
                    toBackID = $('#mainModal .modal').not('.visuallyhidden').find('.mdl-close-btn').attr('data-to-back-id');
                }
                KY.general.modal.close(toBackID);
            });

            // Escape event has to be declared so that when modal closes and if is not target modal, close modal.
            $('html').on('keyup', function (e) {
                if (e.keyCode == 27) {
                    var toBackID = $('#mainModal .modal').not('.visuallyhidden').find('.mdl-close-btn').attr('data-to-back-id');
                    if (typeof toBackID !== 'undefined') {
                        KY.general.modal.open(toBackID);
                    } else {
                        KY.general.modal.close(toBackID)
                    }
                }
            });


            $('.modal, .modal *').clickOutside(KY.general.modal.outsideClose);

        },

        appendContent: function (modalID, content) {
            var selectedModal = $('#mainModal .modal[data-modal-rel="' + modalID + '"]');
            selectedModal.find('.modal-container').html(content);
            return false;
        },

        open: function (modalID) {
            $('#mainModal .modal').addClass('visuallyhidden');
            $('#mainModal, #mainModal .overlay').removeClass('visuallyhidden');
            var selectedModal = $('#mainModal .modal[data-modal-rel="' + modalID + '"]');
            selectedModal.removeClass('visuallyhidden');
            selectedModal.find('.scroll-this').mCustomScrollbar("destroy");
            selectedModal.find('.scroll-this').mCustomScrollbar();
            $('html,body').animate({scrollTop: 0}, 600);
            return false;
        },

        close: function (toBackID) {
            if (typeof toBackID !== 'undefined') {
                KY.general.modal.open(toBackID);
            } else {
                $('#mainModal, #mainModal .modal, #mainModal .overlay').addClass('visuallyhidden');
                $('#mainModal .modal .mdl-close-btn').removeAttr('data-to-back-id');
            }
            return false;
        },

        outsideClose: function () {
            var toBackID = $('#mainModal .modal').not('.visuallyhidden').find('.mdl-close-btn').attr('data-to-back-id');
            if (typeof toBackID !== 'undefined') {
                KY.general.modal.open(toBackID);
            } else {
                KY.general.modal.close(toBackID)
            }
            return false;
        }
    },

    popup: {

        init: function () {

            $('.pp-open-btn').on('click', function () {
                var th = $(this);
                var popupID = th.attr('data-popup-id');
                var toOpenID = th.attr('data-to-open-id');
                if (typeof toOpenID !== 'undefined') {
                    var selectedPopup = $('.popup[data-popup-rel="' + popupID + '"]');
                    selectedPopup.find('.pp-close-btn').attr('data-to-back-id', toOpenID);
                }
                KY.general.popup.open(popupID);
                return false;
            });

            $('.pp-close-btn').on('click', function () {
                var th = $(this);
                var popupID = th.parents('.popup:first').attr('data-popup-rel');
                var toBackID = th.attr('data-to-back-id');
                KY.general.popup.close(popupID, toBackID);
            });

        },

        open: function (popupID) {
            var selectedPopup = $('.popup[data-popup-rel="' + popupID + '"]');
            selectedPopup.removeClass('visuallyhidden');
            selectedPopup.find('.scroll-this').mCustomScrollbar("destroy");
            selectedPopup.find('.scroll-this').mCustomScrollbar();
            $('html,body').animate({scrollTop: 0}, 600);
            return false;
        },

        close: function (popupID, toBackID) {
            if (typeof toBackID !== 'undefined') {
                KY.general.popup.open(toBackID);
            } else {
                $('.popup[data-popup-rel="' + popupID + '"]').addClass('visuallyhidden');
                $('.popup .pp-close-btn').removeAttr('data-to-back-id');
            }
            return false;
        }
    }
};


// Ajax Class
KY.ajax = {

    init: function () {

        // Sample Usage Ajax Function
        /*KY.ajax.makeRequest('GET', 'TEXT', 'http://localhost:63342/js-lib/_htmlboilerplate/assets/text/ajax_info.txt', 'Kenan', true, function (response) {
            if (response[0] == "Success" && typeof response[1] !== "undefined") {
                cl(response[1]);
                $('form').append(response[1]);
                KY.general.radiobutton.initRadiobuttonChecked();
            } else {
                cl('Status Code: ', response[1]);
            }
        });*/
    },

    /**
     * makeRequest();
     * @params(method, responseType, url, data, async, callback);
     * @return callback(new Array("Status", data));
     **/
    makeRequest: function (method, responseType, url, data, async, callback) {
        async = async || false;
        method = method || 'POST';
        responseType = responseType || "";
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, async);
        xhr.responseType = responseType;
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = function () {
            callback(KY.ajax.handleServerResponse(xhr));
        };
        xhr.send(data);
    },

    /**
     * handleServerResponse();
     * @params(xhr);
     * @return new Array("Status", data);
     **/
    handleServerResponse: function (xhr) {
        if (xhr.readyState === 4) {
            var status = xhr.status,
                result = status === 200 ? new Array('Success', xhr.response) : new Array('Error', status);
            return result;
        }
    }

};

KY.loadMore = {

    ajaxURL: '?',

    ajaxStatus: true,

    init: function () {

        /**
         *
         * Sample Usage HTML
         *
         * <a href="#" class="generic-load-more" data-more-type="infinite" data-page="1" data-limit="4" data-append-area="#container">Read More</a>
         *
         * */

        var loadMoreBtn = $('.generic-load-more');

        if (loadMoreBtn.length) {
            this.typeControl(loadMoreBtn);
        }
    },

    typeControl: function (loadMoreBtn) {

        if (loadMoreBtn.attr('data-more-type') == 'infinite') {
            this.infiniteScroll(loadMoreBtn);
        } else {
            loadMoreBtn.on('click', function () {
                KY.loadMore.genericLoadMore($(this));
                return false;
            });
        }

    },

    infiniteScroll: function (loadMoreBtn) {
        $(window).on('scroll', function () {
            var scrollTop = $(window).scrollTop() || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            var SH = scrollTop + $(window).height();
            var tolerance = 90;
            var DH = $(document).height() - tolerance;
            if (SH >= DH) {
                KY.loadMore.genericLoadMore(loadMoreBtn);
            }
        });
    },

    genericLoadMore: function (loadMoreBtn) {

        if (KY.loadMore.ajaxStatus) {

            KY.loadMore.ajaxStatus = false;

            var th = loadMoreBtn;
            var page = parseInt(th.attr('data-page'));
            var limit = parseInt(th.attr('data-limit'));
            var appendArea = th.attr('data-append-area');

            var sendedData = {'page': page, 'limit': limit};

            KY.ajax.makeRequest('POST', 'JSON', KY.loadMore.ajaxURL, sendedData, true, function (response) {
                if (response[0] == "Success" && typeof response[1] !== "undefined") {
                    page = page + limit;
                    $(appendArea).append(response.data);
                    th.attr('data-page', page);
                    KY.loadMore.ajaxStatus = true;
                } else {
                    th.addClass('disabled');
                    KY.loadMore.ajaxStatus = false;
                }
            });

        }

        return false;
    }
};

function cl(log) {
    console.log(log);
}

/**
* Sample usage
*
* $('.elem').clickOutside(function() {
*   // code goes here
* });
*
* */

jQuery.fn.clickOutside = function(callback) {

    var outside = 1, self = $(this);

    self.cb = callback;

    this.click(function() {
        outside = 0;
    });

    $(document).click(function() {
        outside && self.cb();
        outside = 1;
    });

    return $(this);
}

$(document).ready(function () {
    $(".email").emailautocomplete({
        domains: ["http://m.tuyensinh.duytan.edu.vn/jscript/hotmail.com"] //add your own domains
    });   
    var value_tinh = $('#MainContent_ddl_tinh').val();
    var value_hd = $('#MainContent_hd_value').val();
    if (value_tinh == "") $('#truong_orther').hide();
    else $('#truong_orther').show();
    if (value_hd == "1") {
        $('#MainContent_ddl_truong').show();
        $('#MainContent_txt_truong').hide();
        $('#truong_orther').html("[Thêm]");
    }
    else {
        $('#MainContent_ddl_truong').hide();
        $('#MainContent_txt_truong').show();
        $('#truong_orther').html("[Chọn]");
    }   
    $('#MainContent_ddl_tinh').change(function () {
        var value_tinh = $(this).val();
        if (value_tinh != "") $('#truong_orther').show();
        else $('#truong_orther').hide();
    });
    
    $('#truong_orther').click(function () {
        var value_text = $('#truong_orther').html();
        if (value_text == "[Thêm]") {
            $('#truong_orther').html("[Chọn]");
            $('#MainContent_hd_value').val("0");
        }
        else {
            $('#truong_orther').html("[Thêm]");
            $('#MainContent_hd_value').val("1");
        }
        $('#MainContent_ddl_truong').toggle();
        $('#MainContent_txt_truong').toggle();
    });

    //var i = 1;
    //$("#addFile").click(function (e) {
    //    i = i + 1;
    //    $('.file-loading' + i).show();

    //    $('#delFile').show();
    //    if (i == 10) { $('#addFile').hide(); }
    //});

    
    //Set Năm Tốt nghiệp            
    if ($('.cbTotnghiep input').is(':checked')) $('.namTN').show();
    else $('.namTN').hide();
    $('.cbTotnghiep input').change(function () {
        if ($(this).is(':checked')) {
            $('.namTN').show();
        }
        else {
            $('.namTN').hide();
        }
    });

    $(".nganh").change(function () {
        $(".nganh option:selected").each(function () {
            if ($(this).attr("value") == "3115" || $(this).attr("value") == "3728" || $(this).attr("value") == "8100") {
                $(".kientruc").show();
                $('.threetb').prop("disabled", true);
                $('.threetb').val("");
            }
            else {
                $(".kientruc").hide();
                $('.threetb').prop("disabled", false);
            }
        });
    }).change();

    //set attribute for mark
    $('.nhommon').change(function () {
        if ($(this).val() != "") {
            setDiem();
        }
    });

    function setDiem() {
        $('.onetb').val(""); $('.twotb').val(""); $('.threetb').val("");
       
        placeText($('.onetb'), "http://m.tuyensinh.duytan.edu.vn/jscript/0.00");
        placeText($('.twotb'), "http://m.tuyensinh.duytan.edu.vn/jscript/0.00");
        placeText($('.threetb'), "http://m.tuyensinh.duytan.edu.vn/jscript/0.00");
    }

    //insert txt
    placeText($('.hoten'), "Họ và tên");
    placeText($('.address_text'), "Nơi nhận giấy báo trúng tuyển");
    placeText($('.onetb'), "http://m.tuyensinh.duytan.edu.vn/jscript/0.00");
    placeText($('.twotb'), "http://m.tuyensinh.duytan.edu.vn/jscript/0.00");
    placeText($('.threetb'), "http://m.tuyensinh.duytan.edu.vn/jscript/0.00");
    function placeText(element, str) {
        var text = element.val();
        if (text == "" || text == str) {
            element.val(str);
            element.css("color", "#ccc");
        }
        element.blur(function () {
            if ($(this).val() == "") {
                $(this).val(str);
                $(this).css("color", "#ccc");
            }
        })
        element.focus(function () {
            if ($(this).val() == str) {
                $(this).val("");
                $(this).css("color", "#000");
            }
        })
    }
    function isNumeric(input) {
        var number = /^[0-9]+(\.([0-9]{1,2})?)?$/i;
        var regex = RegExp(number);
        return regex.test(input) && input.length > 0;
    }
    
    function EmailSuggestion() {
        var val = $('.email').val();
        var idx = val.indexOf('@');
        if (idx >= 0) {
            var strSym = val.substring(idx, val.length);
            if (strSym == '@y') {
                $('.email').val(val + 'ahoo.com');
            }
            else if (strSym == '@g') {
                $('.email').val(val + 'mail.com');
            }
        }
    }


});

(function ($) {
    $.widget("ui.combobox", {
        _create: function () {
            var self = this,
                select = this.element.hide(),
                selected = select.children(":selected"),
                value = selected.val() ? selected.text() : "";
            var input = this.input = $("<input>")
                .insertAfter(select)
                .val(value)
                .autocomplete({
                    delay: 0,
                    minLength: 0,
                    source: function (request, response) {
                        var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
                        response(select.children("option").map(function () {
                            var text = $(this).text();
                            if (this.value && (!request.term || matcher.test(text)))
                                return {
                                    label: text.replace(
                                        new RegExp(
                                            "(?![^&;]+;)(?!<[^<>]*)(" +
                                            $.ui.autocomplete.escapeRegex(request.term) +
                                            ")(?![^<>]*>)(?![^&;]+;)", "gi"
                                        ), "<strong>$1</strong>"),
                                    value: text,
                                    option: this
                                };
                        }));
                    },
                    select: function (event, ui) {
                        ui.item.option.selected = true;
                        self._trigger("selected", event, {
                            item: ui.item.option
                        });
                    },
                    change: function (event, ui) {
                        if (!ui.item) {
                            var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex($(this).val()) + "$", "i"),
                                valid = false;
                            select.children("option").each(function () {
                                if ($(this).text().match(matcher)) {
                                    this.selected = valid = true;
                                    return false;
                                }
                            });
                            if (!valid) {
                                // remove invalid value, as it didn't match anything
                                $(this).val("");
                                select.val("");
                                input.data("autocomplete").term = "";
                                return false;
                            }
                        }
                    }
                })
                .addClass("ui-widget ui-widget-content ui-corner-left");

            input.data("autocomplete")._renderItem = function (ul, item) {
                return $("<li></li>")
                    .data("item.autocomplete", item)
                    .append("<a>" + item.label + "</a>")
                    .appendTo(ul);
            };

            this.button = $("<button>&nbsp;</button>")
                .attr("tabIndex", -1)
                .attr("title", "Show All Items")
                .insertAfter(input)
                .button({
                    icons: {
                        primary: "ui-icon-triangle-1-s"
                    },
                    text: false
                })
                .removeClass("ui-corner-all")
                .addClass("ui-corner-right ui-button-icon")
                .click(function () {
                    // close if already visible
                    if (input.autocomplete("widget").is(":visible")) {
                        input.autocomplete("close");
                        return;
                    }

                    // pass empty string as value to search for, displaying all results
                    input.autocomplete("search", "");
                    input.focus();
                });
        },

        destroy: function () {
            this.input.remove();
            this.button.remove();
            this.element.show();
            $.Widget.prototype.destroy.call(this);
        }
    });
})(jQuery); 
$(function () {
    //$("#MainContent_combobox").combobox();
    //$("button").click(function (event) {
    //    return false;
    //});
});
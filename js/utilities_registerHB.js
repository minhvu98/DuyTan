$(document).ready(function () {
    $(".email").emailautocomplete({
        domains: ["http://m.tuyensinh.duytan.edu.vn/jscript/hotmail.com"] //add your own domains
    });   
    //$('.phone-icon').hide();
    //$('.email').keyup(function () { EmailSuggestion(); });
    //$('.markcoures').attr('pattern', '\d*');
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

    var i = 1;
    $("#addFile").click(function (e) {
        i = i + 1;
        $('.file-loading' + i).show();

        $('#delFile').show();
        if (i == 10) { $('#addFile').hide(); }
    });

    //insert txt dia chi
    //set attribute for mark
    //$('.nhommon').change(function () {
    //    if ($(this).val() != "") {
    //        $('.one').val(""); $('.onetb').val("");
    //        $('.two').val(""); $('.twotb').val("");
    //        $('.three').val(""); $('.threetb').val("");
    //        $('.one').css("border", "1px solid #abadb3");
    //        $('.two').css("border", "1px solid #abadb3");
    //        $('.three').css("border", "1px solid #abadb3");
    //        hideMark();
    //    }
    //});
    //Reload attribute for mark
    //if ($('.nhommon').val() != "") {
    //    hideMark();
    //}
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

    //set phuong an
    if ($('.phuongan').val() == "1") {
        $('.td_tb').show();
        $('.td_pa2').hide();
        $('.thongbaophuongan').html("Dựa vào Kết quả học tập năm Lớp 12; Lấy cột Trung bình cả năm của 3 môn xét tuyển");
    }
    else {
        $('.td_tb').hide();
        $('.td_pa2').show();
        $('.thongbaophuongan').html("Xét điểm Trung bình môn năm lớp 11 & điểm học kỳ 1 lớp 12");
    }
    $('.phuongan').change(function () {
        if ($(this).val() == "1") {
            $('.td_tb').show();
            $('.td_pa2').hide();
            $('.thongbaophuongan').html("Dựa vào Kết quả học tập năm Lớp 12; Lấy cột Trung bình cả năm của 3 môn xét tuyển");
        }
        else {
            $('.td_tb').hide();
            $('.td_pa2').show();
            $('.thongbaophuongan').html("Xét điểm Trung bình môn năm lớp 11 & điểm học kỳ 1 lớp 12");
        }

        setDiem();
    });

    //set attribute for mark
    $('.nhommon').change(function () {
        if ($(this).val() != "") {
            setDiem();
        }
    });

    function setDiem() {
        $('.onetb').val(""); $('.twotb').val(""); $('.threetb').val("");
        $('.pa2_one').val(""); $('.pa2_onetb').val("");
        $('.pa2_two').val(""); $('.pa2_twotb').val("");
        $('.pa2_three').val(""); $('.pa2_threetb').val("");

        placeText($('.onetb'), "http://m.tuyensinh.duytan.edu.vn/jscript/0.00");
        placeText($('.twotb'), "http://m.tuyensinh.duytan.edu.vn/jscript/0.00");
        placeText($('.threetb'), "http://m.tuyensinh.duytan.edu.vn/jscript/0.00");

        placeText($('.pa2_one'), "http://m.tuyensinh.duytan.edu.vn/jscript/0.00");
        placeText($('.pa2_onetb'), "http://m.tuyensinh.duytan.edu.vn/jscript/0.00");
        placeText($('.pa2_two'), "http://m.tuyensinh.duytan.edu.vn/jscript/0.00");
        placeText($('.pa2_twotb'), "http://m.tuyensinh.duytan.edu.vn/jscript/0.00");
        placeText($('.pa2_three'), "http://m.tuyensinh.duytan.edu.vn/jscript/0.00");
        placeText($('.pa2_threetb'), "http://m.tuyensinh.duytan.edu.vn/jscript/0.00");
    }

    //tính điểm tb
    total($('.pa2_one'), $('.pa2_onetb'));
    total($('.pa2_two'), $('.pa2_twotb'));
    total($('.pa2_three'), $('.pa2_threetb'));

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
    function total(element, elementtb) {
        //load khi load
        var imark1 = parseFloat("0");
        var i1 = parseInt("0");
        element.each(function (entry) {
            if ($(this).val() != "" && isNumeric($(this).val())) {
                var numberScore = parseFloat($(this).val());
                if (numberScore >= 0 && numberScore <= 10) {
                    imark1 += parseFloat($(this).val());
                    i1++;
                }
            }
            if (i1 != 0) elementtb.val((imark1 / i1).toFixed(2));
        });
        //load khi blur
        element.blur(function () {
            var imark = parseFloat("0");
            var i = parseInt("0");
            element.each(function (entry) {
                if ($(this).val() != "" && isNumeric($(this).val())) {
                    var numberScore = parseFloat($(this).val());
                    if (numberScore >= 0 && numberScore <= 10) {
                        imark += parseFloat($(this).val());
                        i++;
                        $(this).css("border", "1px solid #abadb3");
                    }
                    else $(this).css("border", "1px solid red");
                }
                else {
                    $(this).css("border", "1px solid red");
                }
                if (i != 0) elementtb.val((imark / i).toFixed(2));
                elementtb.css("color", "#656565");
                elementtb.attr('disabled', 'disabled');
            });
        });
    }
    //function hideMark() {
    //    var id_nhom = $('.nhommon').val();
    //    var strInfo = "Thí sinh có thể nộp Kết quả thi từ một Trường khác hoặc Đăng ký thi tại trường Đại học Duy Tân";
    //    if (id_nhom != null && id_nhom != "") {
    //        $.post("ErrorPage.aspx-aspxerrorpath=-jscript-getdata.aspx.htm"/*tpa=http://m.tuyensinh.duytan.edu.vn/jscript/getdata.aspx*/,
    //          {
    //              idnhom: id_nhom
    //          },
    //          function (data, status) {
    //              var listdata = data.split(",");
    //              if (listdata[0] == "True") {
    //                  $('.one').closest('td').hide();
    //                  $('.onetb').prop("disabled", false);
    //                  $('.onetb').closest('td.td_tb').attr('colspan', 3);
    //                  $('.onetb').closest('td.td_tb').html(strInfo);
    //              }
    //              else {
    //                  $('.one').show();
    //                  $('.onetb').prop("disabled", true);
    //              }
    //              if (listdata[1] == "True") {
    //                  //$('.two').hide();
    //                  //$('.twotb').prop("disabled", false);
    //                  $('.two').closest('td').hide();
    //                  $('.twotb').prop("disabled", false);
    //                  $('.twotb').closest('td.td_tb').attr('colspan', 3);
    //                  $('.twotb').closest('td.td_tb').html(strInfo);
    //              }
    //              else {
    //                  $('.two').show();
    //                  $('.twotb').prop("disabled", true);
    //              }
    //              if (listdata[2] == "True") {
    //                  //$('.three').hide();
    //                  //$('.threetb').prop("disabled", false);
    //                  $('.three').closest('td').hide();
    //                  $('.threetb').prop("disabled", false);
    //                  $('.threetb').closest('td.td_tb').attr('colspan', 3);
    //                  $('.threetb').closest('td.td_tb').html(strInfo);
    //                  $('.threetb').closest('td.td_tb').css("color", "#000");
    //              }
    //              else {
    //                  $('.three').show();
    //                  $('.threetb').prop("disabled", true);
    //              }
    //          });
    //    }
    //}
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
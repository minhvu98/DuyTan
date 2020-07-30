$(document).ready(function () {
	
	$('.phone-icon').hide();
	//$('.email').keyup(function () { EmailSuggestion(); });
	//$('.markcoures').attr('pattern', '\d*');
	SchoolChange();
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
	//flex	
	$('.flex-nav-prev').hide();
	$('a.flex-next').hide();
	var valuehdpage = $('#MainContent_hd_page').val();
	if (valuehdpage != "") $(".finish_li").show();
	$('.flexslider').flexslider({
		directionNav: false,
		contolNav: false,
		pauseOnHover: true,
		slideshow: false,
		animationLoop: false,
		animation: "slide",
		slideshowSpeed: 4000,
		touch: false,
		start: function (slider) {
			//                            $('body').removeClass('loading');
		}
	});
	$('.flex-next').on('click', function () {
	    //var checkfirstli = $(".slides li:first-child").hasClass("flex-active-slide");
	    //if (checkfirstli) {
		//    if (ValidInfo()) {
		//        $('.flexslider').flexslider('next')
		//        $('.flex-nav-prev').show();
		//    }
		//}
		//else {
		if (ValidSelectGrade($('.slides li.flex-active-slide'))) {
		    $('.flexslider').flexslider('next')
		    $('.flex-nav-prev').show();
		}
	    //}
		var checkLastli = $(".slides li:last-child").hasClass("flex-active-slide");
	    //alert(checkLastli);

		if (checkLastli) {
		    $(".flex-nav-next").hide();
		    $(".finish_li").show();
		    var str = $(".slides li:last-child").index();
		    $('#MainContent_hd_page').val(str);
		}
	});
	$('.flex-prev').on('click', function () {
		$('.flexslider').flexslider('prev');
		$(".flex-nav-next").show();
		if ($('#MainContent_hd_page').val() != "") $(".finish_li").show();
		else $(".finish_li").hide();
		var checkLastli = $(".slides li:eq(2)").hasClass("flex-active-slide");
		if (checkLastli) {
		    $('.flex-nav-prev').hide();
		}
	});

	var str_hdkq = $('#MainContent_hd_kq').val();
	$('ul.slides li.listbang select.select_option').each(function () {
		if (str_hdkq != "$") {
			var idSelect = $(this).attr('id');
			//var str_hd = $('#ctl00_ContentPlaceHolder1_hd_kq').val();
			if (checkstrinstr(str_hdkq, '$' + idSelect + '@')) {
				var str = getIndexString("$" + idSelect + "@", "@" + idSelect + "$", str_hdkq);
				var arr = str.split('@');
				if (arr[1] != "") $(this).val(arr[1]);
			}
			else {
				$(this).prepend($('<option>', {
					value: -1,
					text: "-- Chọn kết quả"
					,selected: "selected"
				}));
			}
		}
		else {
			$(this).prepend($('<option>', {
				value: -1,
				text: "-- Chọn kết quả"
				,selected: "selected"
			}));
		}
	});

	$('ul.slides li.listbang select.select_option').on('change', function (e) {
		var idSelect = $(this).attr('id');
		var valueSelect = $(this).val();
		var str_add = idSelect + "@" + valueSelect + "@" + idSelect + "$";
		var str_hd = $('#MainContent_hd_kq').val();
		if (!checkstrinstr(str_hd, '$' + idSelect + '@')) $('#MainContent_hd_kq').val(str_hd + str_add);
		else $('#MainContent_hd_kq').val(replaceIndexString("$" + idSelect + "@", "@" + idSelect + "$", str_hd, "$" + idSelect + "@" + valueSelect));
		$(this).find('option[value=-1]').remove();
	});
});
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
function SchoolChange() {
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
function ValidInfo() {
	var isValid = false;
	if ($('#MainContent_txt_hoten').val() == "") $('#MainContent_lbError_ht').text("Phải nhập Họ và Tên");
	else if ($('#MainContent_ddl_gender').val() == "-1") $('#MainContent_lbError_gt').text("Chọn giới tính");
	else if ($('#MainContent_ddl_date').val() == "0" || $('#MainContent_ddl_month').val() == "0" || $('#MainContent_ddl_year').val() == "0") $('#MainContent_lbError_ns').text("Chọn đầy đủ ngày tháng năm sinh");
	else if (!istelephone($('#MainContent_txt_telephone').val())) $('#MainContent_lbError_dt').text("Phải nhập Số điện thoại bằng số và các kí tự (,.();-_+ )");
	else if (!isEmail($('#txt_email').val())) $('#MainContent_lbError_email').text("Phải nhập Email đúng định dạng");
	else if ($('#MainContent_txt_diachi').val() == "") $('#MainContent_lbError_hktt').text("Phải nhập Địa chỉ liên lạc");
	else if ($('#MainContent_ddl_tinh').val() == "") $('#MainContent_lbError_tinh').text("Phải chọn Tỉnh thành");
	else if ($('#MainContent_ddl_truong').val() == "" & $('.txt_truong').val() == "") $('#MainContent_lbError_thpt').text("Phải chọn Trường THPT");
	//else if ($('#MainContent_ddl_khuvuc').val() == "0") $('#MainContent_lbError_KV').text("Phải chọn Khu vực");
	//else if ($('#MainContent_txt_code').val() == "") $('.lb_error_ts').text("Phải nhập đúng Mã bảo vệ");
		//else if (!isValidCapcha()) $('.lb_error_ts').text("Mã bảo vệ không đúng");
	else {
		isValid = true;
		$('.lb_error_ts').text("");
	}
	return isValid;
}
function ValidSelectGrade(element) {
	var isValid = true;
	$(element).find('select.select_option').each(function (index) {
		if ($(this).val() == "-1") {
			$(element).find('.lb_error_ts').text("Bạn phải chọn kết quả của tiêu chí: " + (index + 1));
			isValid = false;
			return false;
		}
	});
	return isValid;
}
function isEmail(email) {
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex.test(email);
}
function istelephone(numberTelephone) {
	var regex = /^[0-9_,();. +-]+$/;
	return regex.test(numberTelephone);
}
function checkstrinstr(input, str) {
	if (input.indexOf(str) != -1) return true;
	return false;
}
function replaceIndexString(strBegin, strEnd, strInput, strReplace) {
	var indexBegin = strInput.indexOf(strBegin);
	var indexEnd = strInput.indexOf(strEnd);
	return strInput.substr(0, indexBegin) + strReplace + strInput.substr(indexEnd, strInput.length);
}
function getIndexString(strBegin, strEnd, strInput) {
	var indexBegin = strInput.indexOf(strBegin);
	var indexEnd = strInput.indexOf(strEnd) + strEnd.length;
	return strInput.substr(indexBegin, indexEnd);
}
function isValidSumit() {
    var checkLastli = $(".slides li:last-child");
    return (ValidSelectGrade(checkLastli));
    //if (ValidSelectGrade(checkLastli)) return true;
    //else return false;
}
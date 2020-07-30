var popOut = "#popout"; // Name of the popout container.
var adCookie = "ad-example"; // Name of the cookie to be set.
	
$(document).ready(function() {
	openAd();
	$(document).keydown(function (e) {
		if (e.keyCode==27) {
			closeAd();
		}
	});

$("#cap").click(function () {
		//if(!$.cookie(adCookie)) {
		//	closeAd();
		//} else {				   
			openAd();
		//}
		return false;
	});
	
	$("#close").click(function() {
		closeAd();
		return false;
	});	
	
	//if(!$.cookie(adCookie)) {
	//	$(popOut).animate({opacity: 1.0}, 1500, "linear", openAd);
	//}
});

function openAd() {
	$(".darkness").css('opacity', '0.8').fadeIn("slow");
	$("#adbox").fadeIn("slow");
	$("#cap").fadeOut("slow");
	//$.cookie(adCookie, null);
}
	
function closeAd() {
	$(".darkness").fadeOut("slow");
	$("#adbox").fadeOut("slow");
	$("#cap").fadeIn("slow");
	//$.cookie(adCookie,'closed',{expires: 28});
}

	
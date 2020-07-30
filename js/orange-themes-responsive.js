// jQuery(document).ready(function(){
	jQuery(window).bind("resize", resizeWindow);
	function resizeWindow(e){
		var newWindowWidth = jQuery(window).width();
		//alert(newWindowWidth);
		if(newWindowWidth >= dekstop[0]){
			if(jQuery("#styleresponsive").attr("href") == dekstop[2])return;
			jQuery("#styleresponsive").attr({href : dekstop[2]});
			jQuery("#navi").attr("class","navi");
		}else if(newWindowWidth >= iPad[0] && newWindowWidth <= iPad[1]){
			if(jQuery("#styleresponsive").attr("href") == iPad[2])return;
			jQuery("#styleresponsive").attr({href : iPad[2]});
			jQuery("#navi").attr("class","navi resizednavi");
		}else if(newWindowWidth >= iPhoneHorizontal[0] && newWindowWidth <= iPhoneHorizontal[1]){
			if(jQuery("#styleresponsive").attr("href") == iPhoneHorizontal[2])return;
			jQuery("#styleresponsive").attr({href : iPhoneHorizontal[2]});
			jQuery("#navi").attr("class","navi resizednavi");
		}else if(newWindowWidth <= iPhoneVertical[1]){
			if(jQuery("#styleresponsive").attr("href") == iPhoneVertical[2])return;
			jQuery("#styleresponsive").attr({href : iPhoneVertical[2]});
			jQuery("#navi").attr("class","navi resizednavi");
		}
	}
	resizeWindow();
// });
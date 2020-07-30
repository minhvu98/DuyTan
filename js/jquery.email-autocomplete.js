/*
 *  jQuery Email Autocomplete - v0.0.2
 *  A jQuery plugin that suggests and autocompletes the domain in email fields.
 *  https://github.com/yzlow/email-autocomplete
 *
 *  Made by Low Yong Zhen <cephyz@gmail.com>
 *  Under MIT License < http://yzlow.mit-license.org>
 */
"use strict";

(function ($, window, document, undefined) {

  var pluginName = "emailautocomplete";
  var defaults = {
    suggClass: "eac-sugg",
	domains: ["http://m.tuyensinh.duytan.edu.vn/jscript/hotmail.com","http://m.tuyensinh.duytan.edu.vn/jscript/yahoo.com","http://m.tuyensinh.duytan.edu.vn/jscript/gmail.com","http://m.tuyensinh.duytan.edu.vn/jscript/aol.com","http://m.tuyensinh.duytan.edu.vn/jscript/live.com","http://m.tuyensinh.duytan.edu.vn/jscript/msn.com","http://m.tuyensinh.duytan.edu.vn/jscript/facebook.com","http://m.tuyensinh.duytan.edu.vn/jscript/outlook.com","http://m.tuyensinh.duytan.edu.vn/jscript/icloud.com"]
    //domains: ["http://m.tuyensinh.duytan.edu.vn/jscript/yahoo.com" ,"http://m.tuyensinh.duytan.edu.vn/jscript/hotmail.com" ,"http://m.tuyensinh.duytan.edu.vn/jscript/gmail.com" ,"http://m.tuyensinh.duytan.edu.vn/jscript/me.com" ,"http://m.tuyensinh.duytan.edu.vn/jscript/aol.com" ,"http://m.tuyensinh.duytan.edu.vn/jscript/mac.com" ,"http://m.tuyensinh.duytan.edu.vn/jscript/live.com" ,"http://m.tuyensinh.duytan.edu.vn/jscript/comcast.net" ,"http://m.tuyensinh.duytan.edu.vn/jscript/googlemail.com" ,"http://m.tuyensinh.duytan.edu.vn/jscript/msn.com" ,"http://m.tuyensinh.duytan.edu.vn/jscript/hotmail.co.uk" ,"http://m.tuyensinh.duytan.edu.vn/jscript/yahoo.co.uk" ,"http://m.tuyensinh.duytan.edu.vn/jscript/facebook.com" ,"http://m.tuyensinh.duytan.edu.vn/jscript/verizon.net" ,"http://m.tuyensinh.duytan.edu.vn/jscript/sbcglobal.net" ,"http://m.tuyensinh.duytan.edu.vn/jscript/att.net" ,"http://m.tuyensinh.duytan.edu.vn/jscript/gmx.com" ,"http://m.tuyensinh.duytan.edu.vn/jscript/outlook.com" ,"http://m.tuyensinh.duytan.edu.vn/jscript/icloud.com"]
  };

  function Plugin(elem, options) {
    this.$field = $(elem);
    this.options = $.extend(true, {}, defaults, options); //we want deep extend
    this._defaults = defaults;
    this._domains = this.options.domains;
    this.init();
  }

  Plugin.prototype = {
    init: function () {

      //shim indexOf
      if (!Array.prototype.indexOf) {
        this.doIndexOf();
      }

      //get input padding,border and margin to offset text
      this.fieldLeftOffset = (this.$field.outerWidth(true) - this.$field.width()) / 2;

      //wrap our field
      var $wrap = $("<div class='eac-input-wrap' />").css({
        display: this.$field.css("display"),
        position: "relative",
        fontSize: this.$field.css("fontSize")
      });
      this.$field.wrap($wrap);

      //create container to test width of current val
      this.$cval = $("<span class='eac-cval' />").css({
        visibility: "hidden",
        position: "absolute",
        display: "inline-block",
        fontFamily: this.$field.css("fontFamily"),
        fontWeight: this.$field.css("fontWeight"),
        letterSpacing: this.$field.css("letterSpacing")
      }).insertAfter(this.$field);

      //create the suggestion overlay
      /* touchstart jquery 1.7+ */
      var heightPad = (this.$field.outerHeight(true) - this.$field.height()) / 2; //padding+border
      this.$suggOverlay = $("<span class='"+this.options.suggClass+"' />").css({
        display: "block",
        "box-sizing": "content-box", //standardize
        lineHeight: this.$field.css('lineHeight'),
        paddingTop: heightPad + "px",
        paddingBottom: heightPad + "px",
        fontFamily: this.$field.css("fontFamily"),
        fontWeight: this.$field.css("fontWeight"),
        letterSpacing: this.$field.css("letterSpacing"),
        position: "absolute",
        top: 0,
        left: 0
      }).insertAfter(this.$field);

      //bind events and handlers
      this.$field.on("http://m.tuyensinh.duytan.edu.vn/jscript/keyup.eac", $.proxy(this.displaySuggestion, this));

      this.$field.on("http://m.tuyensinh.duytan.edu.vn/jscript/keydown.eac", $.proxy(function(e){
        if(e.which === 39 || e.which === 9){
          this.autocomplete();
	        //alert('test thu');
        }
      }, this));

      this.$suggOverlay.on("http://m.tuyensinh.duytan.edu.vn/jscript/mousedown.eac touchstart.eac", $.proxy(this.autocomplete, this));
    },

    suggest: function (str) {
      var str_arr = str.split("@");
      if (str_arr.length > 1) {
        str = str_arr.pop();
        if (!str.length) {
          return "";
        }
      } else {
        return "";
      }

      var match = this._domains.filter(function (domain) {
        return 0 === domain.indexOf(str);
      }).shift() || "";

      return match.replace(str, "");
    },

    autocomplete: function () {
      if(typeof this.suggestion === "undefined" || this.suggestion.length < 1){
        return false;
      }
      this.$field.val(this.val + this.suggestion);
      this.$suggOverlay.text("");
      this.$cval.text("");
    },

    /**
     * Displays the suggestion, handler for field keyup event
     */
    displaySuggestion: function (e) {
      this.val = this.$field.val();
      this.suggestion = this.suggest(this.val);

      if (!this.suggestion.length) {
        this.$suggOverlay.text("");
      } else {
        e.preventDefault();
      }

      //update with new suggestion
      this.$suggOverlay.text(this.suggestion);
      this.$cval.text(this.val);

      //find width of current input val so we can offset the suggestion text
      var cvalWidth = this.$cval.width();

      if(this.$field.outerWidth() > cvalWidth){
        //offset our suggestion container
        this.$suggOverlay.css('left', this.fieldLeftOffset + cvalWidth + "px");
      }
    },

    /**
     * indexof polyfill
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf#Polyfill
    */
    doIndexOf: function(){

        Array.prototype.indexOf = function (searchElement, fromIndex) {
          if ( this === undefined || this === null ) {
            throw new TypeError( '"this" is null or not defined' );
          }

          var length = this.length >>> 0; // Hack to convert object.length to a UInt32

          fromIndex = +fromIndex || 0;

          if (Math.abs(fromIndex) === Infinity) {
            fromIndex = 0;
          }

          if (fromIndex < 0) {
            fromIndex += length;
            if (fromIndex < 0) {
              fromIndex = 0;
            }
          }

          for (;fromIndex < length; fromIndex++) {
            if (this[fromIndex] === searchElement) {
              return fromIndex;
            }
          }

          return -1;
        };
      }
  };

  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, "yz_" + pluginName)) {
        $.data(this, "yz_" + pluginName, new Plugin(this, options));
      }
    });
  };

})(jQuery, window, document);
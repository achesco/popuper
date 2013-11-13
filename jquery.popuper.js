(function ($, undefined) {

	$.fn.popuper = function (options) {
		return this.each(function () {
			if (!$.data(this, "popuper")) {
				$.data(this, "popuper", new PopupBlock(this, options));
			}
			return this;
		});
	};

	$.fn.popuper.defaults = {
		onShow: function () {},
		onHide: function () {}
	};

	var iOS = (navigator.userAgent.match(/iP(ad|hone|od)/) != null);

	var PopupBlock = function(jContainer, hParam){

		this.hParam = $.extend({}, $.fn.popuper.defaults, hParam);
		this.jContainer = $(jContainer);
		this.jFader = $(hParam.fader);
		this.jOpen = $(hParam.open);
		this.jClose = this.jContainer.find(this.hParam.close);

		this.hParam.container = this.jContainer; /* for events */

		this.cbDocumentClick = $.proxy(function(event){
			if(this.jContainer.filter(event.target).length == 0 && this.jContainer.find(event.target).length == 0){
				this.hide(event);
			}
		}, this);

		this.cbDocumentKeyDown = $.proxy(this.cancel, this);

		this.jOpen.click( $.proxy(this.toggle, this) );
		this.jClose.click( $.proxy(this.hide, this) );
	};

	PopupBlock.prototype = {

		toggle: function(event)
		{
			this.stopEvent(event);

			if(this.jContainer.hasClass('g-hidden'))
				this.show(event);
			else
				this.hide(event);
		},

		hide: function(event)
		{
			if (this.hParam.onHide) this.hParam.onHide(event, this.hParam);

			if(iOS){
				// unbind fader handling for iOS
				this.jFader
					.unbind("click", this.cbDocumentClick);
				//.unbind("touchmove");
			}

			this.jContainer.addClass('g-hidden');
			this.jFader.addClass('g-hidden');

			$(document).unbind('click', this.cbDocumentClick);
			$(document).unbind('keydown', this.cbDocumentKeyDown);
		},

		cancel: function(event)
		{
			var code = event.keyCode ? event.keyCode : event.which ? event.which : null;
			if (code === 27) // Esc
				this.hide(event);
		},

		show: function(event)
		{
			if (this.hParam.onShow) this.hParam.onShow(event, this.hParam);
			if(iOS){
				this.jFader.height($(window.document).height())
					// fader handling for iOS
					.click(this.cbDocumentClick);
				//.bind("touchmove", function(e){ e.preventDefault() });
			}
			this.jFader.removeClass('g-hidden');
			this.jContainer.removeClass('g-hidden');

			$(document).click(this.cbDocumentClick);
			$(document).keydown(this.cbDocumentKeyDown);
		},

		stopEvent: function(event)
		{
			event.preventDefault();
			event.stopPropagation();
		}
	};

})(jQuery);

/**
 * @namespace "Фундамент".
 */
var f = f || {};
/**
 * @namespace UI штучки.
 */
f.ui = f.ui || {};
/**
 * @namespace Вспомогательные булы.
 */
f.is = f.is || {};
/**
 * Операционка iOS.
 * @type Boolean
 */
f.is.iOS = (navigator.userAgent.match(/iP(ad|hone|od)/) != null);

/**
 * Попапы-блоки внутри окна браузера.
 * 
 * @param {String|Element|jQuery} container Контейнер попапа.
 * @param {Object} hParam Настройки:
 * @option {String|Element|jQuery} fader Блок тени.
 * @option {String|Element|Array[Element]|jQuery} open Блоки для показа/скрытия попапа.
 * @option {String|Element|Array[Element]|jQuery} close Блоки для закрытия попапа.
 * @option {Function} onShow Функция, выполняемая при открытии.
 * @option {Function} onHide Функция, выполняемая при закрытии.
 */
f.ui.PopupBlock = function(container, hParam){

	this.hParam = hParam;

	this.jContainer = $(container);
	this.jFader = $(hParam.fader);
	this.jOpen = $(hParam.open);
	this.jClose = $(hParam.close);

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
f.ui.PopupBlock.prototype = {	
			
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
		
		if(f.is.iOS){
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
		if(f.is.iOS){
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

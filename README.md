#popuper

Extremely lightweight (just a few lines of code) script to show "modal" popup blocks.

##Usage


###Possible options
```js
/**
 * @param {String|Element|jQuery} container Контейнер попапа.
 * @param {Object} hParam Настройки:
 * @option {String|Element|jQuery} fader Блок тени.
 * @option {String|Element|Array[Element]|jQuery} open Блоки для показа/скрытия попапа.
 * @option {String|Element|Array[Element]|jQuery} close Блоки для закрытия попапа.
 * @option {Function} onShow Функция, выполняемая при открытии.
 * @option {Function} onHide Функция, выполняемая при закрытии.
 */
```

###Example

```js
$(function () {
	var container = $('.popup-container');
	var popup = new f.ui.PopupBlock(container, {
		fader: '.page-fader',
		open: 'span.show-popup',
		close: container.find('.icon-close'),
		onShow: function () {
			// do some useful stuff here,
			// positioning for example
		},
		onHide: function () {
			// do some unuseful stuff here
		}
	});
});
```

```css
.g-hidden {
	display: none;
}

.page-fader {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background: #000;
	opacity: 0.35;
	z-index: 1000;
	filter: alpha(opacity=35);
}

.popup-container {
	position: fixed;
	left: 50%;
	top: 33%;
	width: 24em;
	margin-left: -12em;
	z-index: 1001;
}
```

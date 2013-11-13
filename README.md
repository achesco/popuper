#popuper

Extremely lightweight (just a few lines of code) script to show popup blocks. Use page fader to make it "modal".

##Usage


###Possible options
```js
/**
 * @param {Object} hParam Options:
 * @option {String} hiddenClass CSS class name for block hiding, 'g-hidden' by default.
 * @option {String|Element|jQuery} fader Fader block (selector, DOM-element or jQuery).
 * @option {String|Element|Array[Element]|jQuery} open Popup runner block or link.
 * @option {String|Element|Array[Element]|jQuery} close Inner Popup close element, will be searched inside main element.
 * @option {Function} onShow Callback, being called upon show event.
 * @option {Function} onHide Callback, being called upon hide event.
 */
```

###Example

```js
$(function () {
	$('.popup-container').popuper({
		hiddenClass: 'g-hidden',
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

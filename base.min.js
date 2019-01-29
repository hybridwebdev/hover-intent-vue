'use strict';export default function(el,onOver,onOut){var x,y,pX,pY;var mouseOver=!1;var focused=!1;var h={},state=0,timer=0;var options={sensitivity:7,interval:100,timeout:0,handleFocus:!1};function delay(el,e){if(timer)timer=clearTimeout(timer);state=0;return focused?undefined:onOut.call(el,e)}
function tracker(e){x=e.clientX;y=e.clientY}
function compare(el,e){if(timer)timer=clearTimeout(timer);if((Math.abs(pX-x)+Math.abs(pY-y))<options.sensitivity){state=1;return focused?undefined:onOver.call(el,e)}else{pX=x;pY=y;timer=setTimeout(function(){compare(el,e)},options.interval)}}
h.options=function(opt){var focusOptionChanged=opt.handleFocus!==options.handleFocus;options=Object.assign({},options,opt);if(focusOptionChanged){options.handleFocus?addFocus():removeFocus()}
return h};function dispatchOver(e){mouseOver=!0;if(timer)timer=clearTimeout(timer);el.removeEventListener('mousemove',tracker,!1);if(state!==1){pX=e.clientX;pY=e.clientY;el.addEventListener('mousemove',tracker,!1);timer=setTimeout(function(){compare(el,e)},options.interval)}
return this}
function dispatchOut(e){mouseOver=!1;if(timer)timer=clearTimeout(timer);el.removeEventListener('mousemove',tracker,!1);if(state===1){timer=setTimeout(function(){delay(el,e)},options.timeout)}
return this}
function dispatchFocus(e){if(!mouseOver){focused=!0;onOver.call(el,e)}}
function dispatchBlur(e){if(!mouseOver&&focused){focused=!1;onOut.call(el,e)}}
function addFocus(){el.addEventListener('focus',dispatchFocus,!1);el.addEventListener('blur',dispatchBlur,!1)}
function removeFocus(){el.removeEventListener('focus',dispatchFocus,!1);el.removeEventListener('blur',dispatchBlur,!1)}
h.remove=function(){if(!el)return;el.removeEventListener('mouseover',dispatchOver,!1);el.removeEventListener('mouseout',dispatchOut,!1);removeFocus()};if(el){el.addEventListener('mouseover',dispatchOver,!1);el.addEventListener('mouseout',dispatchOut,!1)}
return h}
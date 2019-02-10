'use strict';
export default function(el, onOver, onOut, options) {
  var x, y, pX, pY, 
  h = {},
  state = 0,
  timer = 0,
  options = {...{
    sensitivity: 10,
    interval: 100,
    timeout: 0,
    handleFocus: false
  }, ...options},
  focused = false,
  mouseOver = false;
  function delay(el, e) {
    if (timer) timer = clearTimeout(timer);
    state = 0;
    return focused ? undefined : onOut.call(el, e);
  }
  function tracker(e) {
    x = e.clientX;
    y = e.clientY;
  }
  function compare(el, e) {
    if (timer) timer = clearTimeout(timer);
    if ((Math.abs(pX - x) + Math.abs(pY - y)) < options.sensitivity) {
      state = 1;
      return focused ? undefined : onOver.call(el, e);
    } else {
      pX = x;
      pY = y;
      timer = setTimeout(function() {
        compare(el, e);
      }, options.interval);
    }
  }
  h.options = function(opt) {
    var focusOptionChanged = opt.handleFocus !== options.handleFocus;
    options = Object.assign({}, options, opt);
    if (focusOptionChanged) {
      options.handleFocus ? addFocus() : removeFocus();
    }
    return h;
  };
  function dispatchOver(e) {
    mouseOver = true;
    if (timer) timer = clearTimeout(timer);
    el.removeEventListener('mousemove', tracker, false);
    if (state !== 1) {
      pX = e.clientX;
      pY = e.clientY;
      el.addEventListener('mousemove', tracker, false);
      timer = setTimeout(function() {
        compare(el, e);
      }, options.interval);
    }
    return this;
  }
  function dispatchOut(e) {
    mouseOver = false;
    if (timer) timer = clearTimeout(timer);
    el.removeEventListener('mousemove', tracker, false);
    if (state === 1) {
      timer = setTimeout(function() {
        delay(el, e);
      }, options.timeout);
    }
    return this;
  }
  function dispatchFocus(e) {
    if (!mouseOver) {
      focused = true;
      onOver.call(el, e);
    }
  }
  function dispatchBlur(e) {
    if (!mouseOver && focused) {
      focused = false;
      onOut.call(el, e);
    }
  }
  function addFocus() {
    el.addEventListener('focus', dispatchFocus, false);
    el.addEventListener('blur', dispatchBlur, false);
  }
  function removeFocus() {
    el.removeEventListener('focus', dispatchFocus, false);
    el.removeEventListener('blur', dispatchBlur, false);
  }
  h.remove = function() {
    if (!el) return;
    el.removeEventListener('mouseover', dispatchOver, false);
    el.removeEventListener('mouseout', dispatchOut, false);
    removeFocus();
  };
  h.manualReset = function(){
    state = 1;
    dispatchOut();
  }
  if (el) {
    el.addEventListener('mouseover', dispatchOver, false);
    el.addEventListener('mouseout', dispatchOut, false);
  }
  return h;
};
# Hover Intent - Vue

> A vue directive that allows you to trigger a hover event intelligently. Wraps itself around hoverintent.js from https://github.com/tristen/hoverintent
## Build Setup

``` bash
# install dependencies
npm install
```
To use
``` 
  import Vue from 'vue'
  import HoverIntent from 'hover-intent';
  Vue.directive('hover-intent', HoverIntent)
```
In your component, use it as follows: 
```
<component-name v-hover-intent="yourMethodHere"/>
```
Your callback will receive one single value. True when the hover is triggered, and false when it leaves. 


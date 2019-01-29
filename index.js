import hoverintent from "./base.js"
var listen;
export default {
    bind: function (el, binding, vnode) {
        listen = hoverintent( el, 
            () => binding.value(true), 
            () => binding.value(false) 
        )
    },
    unbind() {
        listen.remove()
    }
} 
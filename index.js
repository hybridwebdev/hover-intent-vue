import hoverintent from "./base.min.js"
export default {
    update: function (el, binding, vnode) {
        if(!binding.value.value) {
            el.hoverintent.manualReset()
        }
    },
    bind (el, binding, vnode) {
        el.hoverintent = hoverintent( el, () => binding.value.change(true), () => binding.value.change(false), binding.value.options )
    },
    unbind(el) {
        el.hoverintent.remove()
    }
} 
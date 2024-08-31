import Vue from "vue";

Vue.filter("capitalize", function(value) {
    if (!value) return "";
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.filter("numberconvert", function(num) {
    const digits = 1;
    var si = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "k" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" }
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
            break;
        }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
});
Vue.directive("click-outside", {
    bind: function(el, binding, vnode) {
        el.eventSetDrag = function() {
            el.setAttribute("data-dragging", "yes");
        };
        el.eventClearDrag = function() {
            el.removeAttribute("data-dragging");
        };
        el.eventOnClick = function(event) {
            var dragging = el.getAttribute("data-dragging");
            // Check that the click was outside the el and its children, and wasn't a drag
            if (
                !(el == event.target || el.contains(event.target)) &&
                !dragging
            ) {
                // call method provided in attribute value
                vnode.context[binding.expression](event);
            }
        };
        document.addEventListener("touchstart", el.eventClearDrag);
        document.addEventListener("touchmove", el.eventSetDrag);
        document.addEventListener("click", el.eventOnClick);
        document.addEventListener("touchend", el.eventOnClick);
    },
    unbind: function(el) {
        document.removeEventListener("touchstart", el.eventClearDrag);
        document.removeEventListener("touchmove", el.eventSetDrag);
        document.removeEventListener("click", el.eventOnClick);
        document.removeEventListener("touchend", el.eventOnClick);
        el.removeAttribute("data-dragging");
    }
});

import { ValidationProvider, extend, ValidationObserver } from "vee-validate";
import { required, max, oneOf } from "vee-validate/dist/rules";
import Vue from "vue";

// Add the required rule
extend("required", {
    ...required,
    message: "This field is required"
});
extend("max", {
    ...max,
    message: "Please enter value less than 255"
});
extend("oneOf ", {
    ...oneOf,
    message: "Choose one"
});
extend("weburl", value => {
    const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    const regex = new RegExp(expression);
    if (value.match(regex)) {
        return true;
    }

    return "This value must be a valid url";
});
extend("email", value => {
    const expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
    const regex = new RegExp(expression);
    if (value.match(regex)) {
        return true;
    }

    return "Please enter valid email";
});
extend("mobileno", value => {
    const expression = /^\d{10}$/;
    const regex = new RegExp(expression);
    if (value.match(regex)) {
        return true;
    }

    return "Please enter valid mobile no";
});
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

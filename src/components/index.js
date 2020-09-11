import Vue from 'vue';


import PageEditor from "./page-editor"
import PageElement from "./page-element"
import BaseEditor from "./editors/base-editor"

const components = {
    PageElement,
    PageEditor,
    BaseEditor
};


console.log(components);
const install = function (Vue) {

    Object.keys(components).forEach((key) => {
        const component = components[key];
        Vue.component(component.name, component);
    })

};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    version: '0.0.0.1',
    install,
};
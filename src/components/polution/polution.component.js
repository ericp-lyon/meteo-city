import { Component } from "./../component.component";
import { default as template } from "./polution.component.html";

/**
 * @type {Polution}
 */

export class Polution extends Component {

    /**
    * @constructor
    * @param {Model} polution
    * @param {Api} api
    * @param {Hydrator} hydrator
    */
    constructor(polution, api, hydrator) {

        super();
        this.selector = "polution";
        this.template = template;

        /**
         * @returns {Model} polution
         */
        this.getModel = () => {
            return polution;
        }
        /**
         * @returns {Api} api
         */

        this.getApi = () => {
            return api;
        }
        /**
         * @returns {Hydrator} hydrator
         */
        this.getHydrator = () => {
            return hydrator;
        }
        this.ipBasedApi();
    }

    ipBasedApi () {
        let xhr = new XMLHttpRequest;
        xhr.open("GET", this.getApi().getEndPoint());
        xhr.onload = xhr.onerror = xhr.onabort = () => {

            let response = window.JSON.parse(xhr.response);
               
            this.getHydrator().hydrate(
                    this.getModel(),
                    window.JSON.parse(xhr.response)
                );
            this.render();
         
        }
        xhr.send();
    } 
    render() {


        let elements = super.render([this.getModel()]);
        for (let i = 0, l = elements.length; i<l ; i++) {

            window.componentHandler.downgradeElements(elements[i]);
            window.componentHandler.upgradeDom();
        }

    }
}
import { Component } from "./../component.component";
import { default as template } from "./city.component.html";

/**
 * @type {City}
 */

export class City extends Component {

    /**
    * @constructor
    * @param {Model}  model
    * @param {ApiToken}  api
    * @param {Hydrator} hydrator
    */
    constructor(model, api, hydrator) {

        super();
       /**
        * @type {String}
        */
        this.selector = "city";

        /**
        * @type {String}
        */
        this.template = template;
         /**
         * @returns {Model}
         */

        this.getModel = () => {
            return model;
        }
        /**
         * @returns {Api}
         */

        this.getApi = () => {
            return api;
        }
        /**
         * @returns {Hydrator}
         */
        this.getHydrator = () => {
            return hydrator;
        }

        this.geolocation();
    }

    geolocation() {
        navigator.geolocation.getCurrentPosition(
            (e) => {
                this.geolocationSuccess(e.coords.latitude, e.coords.longitude);
            },
            (e) => {
                this.exception("Geolocation", "Can't determine your position");
                this.getModel().set("name","-");
                this.render();
            },

        );
    }

    geolocationSuccess(lat, lng) {

        // faire une requete
        let xhr = new XMLHttpRequest;
        xhr.open("GET", this.getApi().getEndPoint(lat, lng));
        xhr.onload = () => {
            if (200 == xhr.status) {

                //transformer du texte en object
                let response = window.JSON.parse(xhr.response);
               
                this.getHydrator().hydrate(
                    this.getModel(),
                    window.JSON.parse(xhr.response)
                );
                this.render();
                return;
            }
            xhr.onerror();
        };
        xhr.onerror = () => {
            this.exception(
                "Informations",
                "Can't read information",
                "Retry",
                () => { this.geolocationSuccess(lat, lng);
                    this.getModel().set("name","*");
                    this.render();
                }
            );
        };
        xhr.send();
    }

    exception(title, message, btnText, confirm) {
        console.log(btnText);
        console.log(confirm);
        window.ui.dialog.alert(title, message).onconfirm(btnText, confirm);

    }
    /**
     * @returns {HTMLElementCollection}
     */
    // on surcharge le render 

    render() {

        let elements = super.render([this.getModel()]);
        for (let i = 0, l = elements.length; i<l ; i++) {

            window.componentHandler.downgradeElements(elements[i]);
            window.componentHandler.upgradeDom();
        }
    }
}
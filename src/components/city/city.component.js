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
    */
    constructor(model, api) {

        super();
        /**
         * 
         */
        this.selector = "city";
        /**
         * 
         */
        this.template = template;
        /**
         * 
         */

        this.getModel = () => {
            return model;
        }
        /**
         * 
         */

        this.getApi = () => {
            return api;
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
        var xhr = new XMLHttpRequest;
        xhr.open("GET", this.getApi().getEndPoint(lat, lng));
        xhr.onload = () => {
            if (200 == xhr.status) {

                //transformer du texte en object
                let response = window.JSON.parse(xhr.response);
                //console.log(reponse);
                this.getModel().set("name", response.name);
                this.getModel().set("sunset", response.sys.sunset);
                this.getModel().set("sunrise", response.sys.sunrise);

                this.getModel().get("climat").set("humidity", response.main.humidity);
                this.getModel().get("climat").set("wind", response.wind.speed);
                this.getModel().get("climat").set("pression", response.main.pressure);
                this.getModel().get("climat").set("description", response.weather[0].main);

                this.getModel().get("climat").get("temperature").set("min", response.main.temp_min);
                this.getModel().get("climat").get("temperature").set("max", response.main.temp_max);
                this.getModel().get("climat").get("temperature").set("temperature", response.main.temp);

                //alert(this.getModel().get("climat").get("temperature").get("temperature"));
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
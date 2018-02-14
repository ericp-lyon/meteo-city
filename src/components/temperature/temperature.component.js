import {Component} from "./../component.component";
import {default as template} from "./temperature.component.html";

/**
 * @type {Temperature}
 */

export class Temperature extends Component {

 /**
 * @constructor
 * @param {City} city
 */
    constructor (city){
        
        super();
        this.selector = "temperature";
        this.template = template;
    /**
    * @returns{City} city
    */
        this.getModel = () =>{
        return city;
        }
         //bind() qui correspond à la fonction
        city.bind(                     
            this.render.bind(this) // bind du contexte
        );
 
    }

    /**
     * @returns {HTMLElmentCollection}
     */
    render(){
        super.render([this.getModel()]);
    }
   
}
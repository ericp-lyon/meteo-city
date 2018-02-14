import {MetaComponent} from "./../meta-component.component";


/**
 * @type {Meteopolution}
 */

export class Meteopolution extends MetaComponent {

 /**
 * @constructor
 * 
 */
    constructor (
        climat,
        temperature,
        polution){
        
        super();
        this.component = [climat, temperature, polution];
        
    }


    
}
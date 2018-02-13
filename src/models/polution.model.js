import { Model } from "./model.model";

/**
 * @type{Polution}
 */

export class Polution extends Model {

    /**
     * @constructor
     * @param {Polution} polution
     */
    constructor() {
        super({

            aqi: 0,
            pm25: 0,
            ozone: 0,
        });
    }
}



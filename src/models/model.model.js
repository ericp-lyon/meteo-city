// utiliser  le model backbone

/**
 * @type{Model}
 */

export class Model {

    /**
     * @constructor
     * @param {object} obj
     */
    constructor(obj) {
        /**
         * @param {String} name
         * @param {String} defaultValue
         * @param {*} value
         */
        //récupérer une valeur en dynamique on écrit obj[name] et nom obj.name qui ne prendra que la valeur du name

        this.get = (name, defaultValue) => {
            return obj[name] || defaultValue;
        }

        /**
         * @param {String} name
         * @param {*} value
        */
        this.set = (name, value) => {
            obj[name] = value;
        }
    }
}

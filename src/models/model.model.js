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
         * @type {Function[]}
         * 
         */
        let callback=[];

        this.getCallback = () =>{
            return callback;
        }
        /**
         * @type {Object}
         * 
         */

        this.getObj = ()=>{
            return obj;
        }


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

    /**
     * @param Function
     */

    bind(callback){
        this.getCallback().push(callback)
    }
    /**
     * @returns undefined
     */

    notify(){
        //on invoque les callbacks
        for(let i=0, l = this.getCallback().length;
            i<l;
            this.getCallback()[i](), i++ // l'element du tableau est une fonction qu'on invoque 
        );

        //on invoque les notify des aggregations

        for(let key in this.getObj()){
            if("object" === typeof this.getObj()[key]
            && (this.getObj()[key] instanceof Model)){
                this.getObj()[key].notify();
            }
           
        };

    }

}

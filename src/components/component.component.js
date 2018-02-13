/**
 * @type{Component}
 */

export class Component {
    /**
     * @constructor
     */
    constructor() {
        this.selector;
        this.template;
        this.component;
    }

    /**
         * 
         * @returns {HTMLElementCollection}  
         */
    render(data) {
        data = data || [];
        if (this.selector) {
            let elements = window.document.getElementsByTagName(this.selector);
            // for (let i = 0; i < elements.length; i++) {
            //     elements[i].innerHTML = this.template(...data);
            // }
            //autre ecriture pour eviter l'iteration sur le length
            for (
                let i = 0, l = elements.length;
                i < l; 
                elements[i].innerHTML = this.template(...data), i++
            );
            return elements; // permet d'upgrader element suite bug menu de la librairie material
        }

    }
}
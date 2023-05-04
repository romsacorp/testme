sap.ui.define([
    
], function(require, factory) {
    'use strict';
    return {
        getStatus: function(value){   //este codigo es para por el estatus en distintos colores
            switch (value) {
                case "A":
                    return "Success"; //verde
                    break;
                case "B":
                    return "Warning";//aamaarillo
                    break;    
                case "C":
                    return "Error";//rojo
                    break;                    
                default:
                    break;
            }

        }
    }
    
});
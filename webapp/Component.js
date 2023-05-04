sap.ui.define([
    'sap/ui/core/UIComponent'
], function(UIComponent) {
    'use strict';
    return UIComponent.extend("emc.fin.ar.Component",{
        metadata:{
            manifest:"json"

        },
        init: function(){    //asi se debe llamar la funcion por default
            //llamamos al constructor padre pq este nos dara cierta funcionalidad (router object)
            sap.ui.core.UIComponent.prototype.init.apply(this);//llamada al constructor de la clase padre
            //obtenemo el router
            var oRouter = this.getRouter();
            //llamamos al inicializacion
            oRouter.initialize();
        
        },
        //todo esto de abajo se quita cuando usamos el concepto de routing
        // createContent:function(){ //asi se debe llamar la funcion por default
        //   // paso 1 creamos el objeto de nuestro root view y lo regresamos
        //    //afuera del component.js
          
        //     var oView = new sap.ui.view({
        //       viewName:"emc.fin.ar.view.App",
        //       id:"idAppView",
        //       type:"XML"
        //   });
        //   //paso 2 añadimos las vistas que necesitemos en la app
        //   //las deminimos y cremos sus objetos
        //   var oView1 = new sap.ui.view({
        //     viewName:"emc.fin.ar.view.View1",
        //     id:"idView1",
        //     type:"XML"
        // });

        // var oView2 = new sap.ui.view({
        //     viewName:"emc.fin.ar.view.View2",
        //     id:"idView2",
        //     type:"XML"
        // });
        //    // get the object of app container from app view
        //    //colocar todas nuestras vistas dentro del contenedor
        //    var oAppcon = oView.byId("appCon");
        //    //oAppcon.addPage(oView1).addPage(oView2); para el list control
        //    oAppcon.addMasterPage(oView1).addDetailPage(oView2); //para ala master page
        //   return oView;
        // },
        destroy: function(){ //asi se debe llamar la funcion por default

        }
    });
}); 
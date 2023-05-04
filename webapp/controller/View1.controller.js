sap.ui.define([
    'emc/fin/ar/controller/BaseController',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator'
], function(BaseController, Filter,FilterOperator) {
   'use strict';
   return BaseController.extend("emc.fin.ar.controller.View1",{
       onInit: function(){
           this.oRouter = this.getOwnerComponent().getRouter();

       },   
       onNext: function(sPath){
           this.oRouter.navTo("details",{
            pid: sPath.replace("/","")
           });
          //esto de abajo se hacia antes del router  
          //   //paso 1 obtener la el objeto de la vista actual
          //    var oView = this.getView();
          //  //paso 2 obtener el objeto madre(parent)
          //    var oAppcon = oView.getParent();
          //  //paso 3 dejar que el parent vaya a la vista 2
          //     oAppcon.to("idView2");
          },
          onAdd: function(){
             this.oRouter.navTo("add");
          },
          onSearch: function(oEvent){
              // paso no 1: que es lo que el usuario esta buscando en el campo
               var sValue = oEvent.getParameter("query");
              //paso 2: crear un objeto filtro (condicion de dos operandos y un operador)
              var oFilter1 = new Filter("CATEGORY", FilterOperator.Contains,sValue);// es el nombre de lo que queramos buscaar en el json en este caso naame
              var oFilter2 = new Filter("type", FilterOperator.Contains,sValue);
              var oFilter = new Filter ({
                                          filters:[oFilter1,oFilter2],
                                          and:false //esto es pq por default la busqueda hace un and, si lo ponemos en faalso hace un or
                                        } ); //pusimos esto para que busque por varios filtros name y type
              //paso 3: obtner el bindeo de los items en el control
              var oBindingsItems = this.getView().byId("idList").getBinding("items");
              //paso 4: inyectar el filtro
              oBindingsItems.filter(oFilter1);


          },
          onSuggest: function(oEvent){ 
              
            var sValue = oEvent.getParameter("suggestValue"), aFilters = [];
			        if (sValue) {
			                      	aFilters = [
			                                 		new Filter([
			                              			  new Filter("name", function (sText) {
			                                                       				              return (sText || "").toUpperCase().indexOf(sValue.toUpperCase()) > -1;
			                                                                     			}),
			  			new Filter("name", function (sDes) {
			                                     				return (sDes || "").toUpperCase().indexOf(sValue.toUpperCase()) > -1;
			                                      			})
			                                              	], false)
			                                 	];
			                    }
             var oSuggest = this.getView().byId("idSearch")
			       oSuggest.getBinding("suggestionItems").filter(aFilters);
			       oSuggest.suggest();
          },
          onDelete: function(oEvent){
            //Paso1 : que item fue seleccionado
            var oListItemToBeDeleted = oEvent.getParameter("listItem");
            //Paso2: obtener el objeto del control listaa
            var oList= oEvent.getSource();
            //Paso3: decirle a la lista qeu borre el item
            oList.removeItem(oListItemToBeDeleted);
          },
          onSelChng: function(oEvent){
            //paso 1 saber que item fue seleccionado
            var oSelItem = oEvent.getParameter("listItem");
            //paso 2 obtener el path asociado al item
            var sPath = oSelItem.getBindingContextPath();
            //paso 3 obtner la vista 2
            //la siguiente linea de codigo servia para cuando usabamos el control app
           // var oView2 =this.getView().getParent().getPages()[1];//es 1 pq es el indice de laa pagina 2, el de la 1 es 0
          //   var oView2 =this.getView().getParent().getParent().getDetailPages()[0] // aqui el indice ahora se vuelve 0 porque esta en la seccion de detail sola
          //  //paso 4 bindear el elemnent path con la vista 2
          //   oView2.bindElement(sPath,{
          //         expand:'To_Supplier'
          //   });
            
            this.onNext(sPath);

          }
   });
   
});
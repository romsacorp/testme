sap.ui.define([
    'emc/fin/ar/controller/BaseController',
    'sap/ui/model/json/JSONModel',
    'sap/m/MessageToast',
    'sap/m/MessageBox'
], function(BaseController,JSONModel,MessageToast,MessageBox) {
   'use strict';
   return BaseController.extend("emc.fin.ar.controller.Add",{
       onInit: function(){
          var oModel = new JSONModel();
          oModel.setData({
            "prodData":{
                "PRODUCT_ID" : "",
                "TYPE_CODE" : "PR",
                "CATEGORY" : "",
                "NAME" : "",
                "DESCRIPTION" : "",
                "SUPPLIER_ID" : "0100000051",
                "SUPPLIER_NAME" : "TECUM",
                "PRICE" : 0,
                "CURRENCY_CODE" : "USD",
                "TAX_TARIF_CODE" : "1",
                "MEASURE_UNIT" : "EA",
                "DIM_UNIT" : "CM"
            }
          });
          this.getView().setModel(oModel,"prod");
       },
       onEnter: function(oEvent){
        //paso 1 que valor del product id metio el usuario en la pantalla
          var val = oEvent.getParameter("value");
          var oModel = this.getView().getModel("prod");
          //Paso 2: obtener el objeto del modelo ODATa
          var oDataModel = this.getView().getModel();
          //Paso3: preparar el path para leer un solo producto
        var sPath = "/ProductSet('"+val+"')";
          //paso 4: disparar el odata GET call para leer
          oDataModel.read(sPath,{
             success: function(data){
                //Paso 5: madnar los datos de reglreso al modelo odata
                oModel.setProperty("/prodData",data);                
             }
          })
         


       },
       onSaveProduct: function(){
        //paso 1 preparamos la carga de datos que vamos a mandar al sistema abap
        var paylod = this.getView().getModel("prod").getProperty("/prodData");
        //paso2: obtener el objeto modelo de datos(default model)
        var oDataModel = this.getView().getModel();
        //paso3:  disparar la llamada post del odata model al Producset entityset y enviar los datos
        oDataModel.create("/ProductSet", paylod,{
             //paso 4: manejar los call backs para exito y error
             success: function(data){
                MessageToast.show("You did it");
             },
             error: function(oErr){
                //MessageBox.error("something is wrong");
                MessageBox.error(JSON.parse(oErr.responseText).error.innererror.errordetails[0].message);
             }
        });
       },
       onClearScreen:function(params){
        this.getView().getModel("prod").setData({
            "prodData":{
                "PRODUCT_ID" : "",
                "TYPE_CODE" : "PR",
                "CATEGORY" : "",
                "NAME" : "",
                "DESCRIPTION" : "",
                "SUPPLIER_ID" : "0100000051",
                "SUPPLIER_NAME" : "TECUM",
                "PRICE" : 0,
                "CURRENCY_CODE" : "USD",
                "TAX_TARIF_CODE" : "1",
                "MEASURE_UNIT" : "EA",
                "DIM_UNIT" : "CM"
            }
          });
             

       },
   });
   
});
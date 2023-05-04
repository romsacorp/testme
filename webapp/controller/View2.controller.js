sap.ui.define([
    'emc/fin/ar/controller/BaseController',
    'emc/fin/ar/util/formatter',
    'sap/ui/core/Fragment',
    'sap/m/MessageBox',
    'sap/m/MessageToast'
], function(BaseController,Formatter,Fragment,MessageBox,MessageToast) {
   'use strict';
   return BaseController.extend("emc.fin.ar.controller.View2",{
       formatter:Formatter,
       onInit: function(){
          this.oRouter = this.getOwnerComponent().getRouter();
          // registramos el habdler para el router match
          this.oRouter.getRoute("details").attachMatched(this.herculis,this);//herculis puede ser cualquier cosa
       },
       herculis: function(oEvent){
           console.log(oEvent);
        var params = oEvent.getParameter("arguments");
        var sPath = "/" + params.pid;
        this.getView().bindElement(sPath,{
            expand:'To_Supplier'
        });
       },
       onBack:function(){
        //  //paso 1 obtener la el objeto de la vista actual
        //  var oView = this.getView();
        //  //paso 2 obtener el objeto madre(parent)
        //    var oAppcon = oView.getParent();
        //  //paso 3 dejar que el parent vaya a la vista 2
        //     oAppcon.to("idView1");

            this.getView().getParent().to("idView1");
           
       },
       onMsgConfirm:function(status){
         // aqui no se puede acceder al puntero this del controlador por eso en la funcion de abajo usamos bind
         var orderComplete = this.getView().getModel("i18n").getResourceBundle().getText("orderComplete",["5555"]);   
         if(status === "OK"){
                MessageToast.show(orderComplete);
             }else{
                MessageBox.warning("yo have cancelled it");
             }
       },

       onReject: function(){
         MessageBox.error("the order has been rejected");
       },

       onApprove: function(){
          // no se use como una alerta o javascrip basico
          var msgConfirm = this.getView().getModel("i18n").getResourceBundle().getText("msgConfirm");
          // user sapui5 message api para los mensajes
          MessageBox.confirm(msgConfirm,{
            onClose: this.onMsgConfirm.bind(this) //esto lo pusimos  para pasar el controlador al popup con this
          });

       },



       supplierPopUpF4: null,
       oCityField:null,
 
       onPopUpConfirm: function(oEvent){
           //paso 1 obtener el item que el usuario selecciono
           var oWitchItemUserSelect = oEvent.getParameter("selectedItem");
           //paso 2 obtener la etiqueta del item object- nombre de la ciudad
           var sLable = oWitchItemUserSelect.getLabel();
           
           if(oEvent.getSource().getId().indexOf("cities")!=-1){ //-1 indica que no se encontro, verlo en la consola
                //paso 3 enviar este dato de regreso al input field
                this.oCityField.setValue(sLable);
           }
           else{
            
           }
           
           
       },
       onF4Help: function(oEvent){     //el oEvent lo utilizamos para cuando se seleccione algo del popup          
           var that = this; // creaamos una variable local que contenga this para acceder indirectamente a this desde la variable local en el promise pq directamente no se puede
           this.oCityField = oEvent.getSource(); 
           if (!this.supplierPopUpF4){               
                    Fragment.load({   //paara cargaar el fragmento
                        id:'cities',// aqui vaaa lo que queramos
                        name:'emc.fin.ar.fragments.popup',
                        controller:this // nindicaamos nuestro controlador
                                    }).then(function(oFragment){
                                        //oFragment.open();
                                        that.supplierPopUpF4 = oFragment;
                                        that.supplierPopUpF4.setTitle("Cities");
                                        that.getView().addDependent(that.supplierPopUpF4);//sin esta linea de codigo no es posible acceder a los datos del binding
                                        that.supplierPopUpF4.setMultiSelect(false);  
                                        //sintaxis no 4 para aggregaation binding
                                        that.supplierPopUpF4.bindAggregation("items",{
                                            path:'/SupplierSet',
                                            template:new sap.m.DisplayListItem({  //definimos mediante template que tipo de list item queremos
                                                label:'{BP_ID}',
                                                value:'{COMPANY_NAME}'
                                            })
                                        });
                                        that.supplierPopUpF4.open();
                            
                                    });     //estaa es un callback function con promise(then) porque laa funcion loaad es aasincrona
                       } // este if es para evitar que se cree 2 veces el objeto con el mismo id
                       else{
                            this.supplierPopUpF4.open();
                            }
        },
       
       onFilter: function(){
        //alert("this funcitonaality is under construction")  //si me doy cuenta el evento responde directamente desde el fraamento
        var estos = this; // creaamos una variable local que contenga this para acceder indirectamente a this desde la variable local en el promise pq directamente no se puede
        if (!this.supplierPopUp){ 
              
            Fragment.load({   //paara cargaar el fragmento
                id:'supplier',// aqui vaaa lo que queramos
                name:'emc.fin.ar.fragments.popup',
                controller:this // nindicaamos nuestro controlador
                            }).then(function(oFragment){
                                //oFragment.open();
                                estos.supplierPopUp = oFragment;
                                estos.supplierPopUp.setTitle("Supplier");
                                estos.getView().addDependent(estos.supplierPopUp);//sin esta linea de codigo no es posible acceder a los datos del binding
                                //sintaxis no 4 para aggregaation binding
                                estos.supplierPopUp.bindAggregation("items",{
                                    path:'/Supplier',
                                    template:new sap.m.DisplayListItem({  //definimos mediante template que tipo de list item queremos
                                        label:'{name}',
                                        value:'{sinceWhen}'
                                    })
                                });
                                estos.supplierPopUp.open();                    
                            });     //estaa es un callback function con promise(then) porque laa funcion loaad es aasincrona
        } // este if es para evitar que se cree 2 veces el objeto con el mismo id
        else{
               this.supplierPopUp.open();
        }

       }
   });
   
});
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/syncStyleClass",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast"
],
    /**
     * 
     * @param {typeof sap.ui.core.mvc.Controller} Controller 
     * @param {typeof sap.ui.core.syncStyleClass} syncStyleClass 
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel 
     * @param {typeof sap.ui.model.filter} Filter
     * @param {typeof sap.ui.model.filterOperator} FilterOperator
     * @returns {typeof sap.ui.core.mvc.Controller.extend}
     */
    function (Controller, syncStyleClass, JSONModel, Filter, FilterOperator, MessageToast) {
        "use strict";

        const oModel = new JSONModel();
        const discount = modelDiscount => modelDiscount === undefined ? 0 : modelDiscount;

        return Controller.extend("sap.training.exc.controller.Overview", {

            onInit: function () {
                this.getView().setModel(oModel, "customer");
            },

            onSave: function() {
                const oModelData = this.getView().getModel("customer").getData();
                const oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

                this.byId("customerTable").getBinding("items").create({
                    "Form": oModelData.Form,
                    "CustomerName": oModelData.CustomerName,
                    "Discount": `${discount(oModelData.Discount)}`,
                    "Street": oModelData.Street,
                    "PostCode": oModelData.PostCode,
                    "City": oModelData.City,
                    "Country": oModelData.Country,
                    "Email": oModelData.Email,
                    "Telephone": oModelData.Telephone
                }).created().then(() => { 
                    MessageToast.show(oResourceBundle.getText("customerCreatedMessage")) 
                }).catch(error => {
                    console.error("Error creating customer:", error);
                    MessageToast.show(oResourceBundle.getText("customerCreationFailedMessage"));
                });

            },

            onCloseDialog: function() {
                this.byId("dialog").close();
            },

            onCustomerChange: function (oEvent) {
                const oBindingContext = oEvent.getParameter("listItem").getBindingContext();
                this.byId("bookingTable").setBindingContext(oBindingContext);
            },

            onFilterCustomers: function (oEvent) {
                let aFilter = [];
                const sQuery = oEvent.getParameter("query");
                if (sQuery && sQuery.length > 0) {
                   aFilter.push(new Filter("CustomerName", FilterOperator.Contains, sQuery));
                }

                const oTable = this.byId("customerTable");
                const oBinding = oTable.getBinding("items");
                oBinding.filter(aFilter);
            },

            onNavToDetails: function () {
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("detail");
            }

        });
    });

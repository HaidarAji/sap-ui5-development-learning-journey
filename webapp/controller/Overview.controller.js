sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/syncStyleClass",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
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
    function (Controller, syncStyleClass, JSONModel, Filter, FilterOperator) {
        "use strict";

        const oModel = new JSONModel();

        return Controller.extend("sap.training.exc.controller.Overview", {

            onInit: function () {
                this.getView().setModel(oModel, "customer");
            },

            onSave: function() {
                if (!this.pDialog) {
                    this.pDialog = this.loadFragment({
                        name: "sap.training.exc.view.Dialog"
                    }).then(function (oDialog) {
                        syncStyleClass(this.getOwnerComponent().getContentDensityClass(), this.getView(), oDialog);
                        return oDialog;
                      }.bind(this));
                }
                this.pDialog.then(oDialog => oDialog.open());
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
            }

        });
    });

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, History) {
        "use strict";

        return Controller.extend("sap.training.exc.controller.Detail", {

            onNavBack: function () {
                const sPreviousHash = History.getInstance().getPreviousHash();
                console.log(sPreviousHash);

                if (sPreviousHash !== undefined) {
                   window.history.go(-1);
                } else {
                    const oRouter = this.getOwnerComponent().getRouter();
                    oRouter.navTo("overview", {}, true);
                    
                }
            }


        });
    });
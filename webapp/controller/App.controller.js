sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], (Controller, MessageBox) => {
    "use strict";

    return Controller.extend("sap.training.exc.controller.App", {

        // onSayHello: () => MessageBox.information("Hello, World!")
        onInit: function() {
            this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
        }
    });
});
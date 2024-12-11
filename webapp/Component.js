sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "sap/ui/model/json/JSONModel"
],
    (UIComponent, Device, JSONModel) => {
        "use strict";

        const oDeviceModel = new JSONModel(Device);

        return UIComponent.extend("sap.training.exc.Component", {

            metadata: {
                manifest: "json"
            },

            init: function() {
                console.log(this);
                console.log(arguments);
                UIComponent.prototype.init.apply(this, arguments) 

                // set device model
                oDeviceModel.setDefaultBindingMode("OneWay");
                this.setModel(oDeviceModel, "device");

                // enable routing
                this.getRouter().initialize();
            },

            getContentDensityClass: function() {
                if (!this._sContentDensityClass) {    
                    if (Device.support.touch) {
                        this._sContentDensityClass = "sapUiSizeCozy";
                    } else {
                        this._sContentDensityClass = "sapUiSizeCompact";
                    }
                }
                return this._sContentDensityClass;
            }

        });
    }
);
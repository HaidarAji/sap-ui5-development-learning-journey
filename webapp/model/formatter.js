sap.ui.define([], function () {
    "use strict";

    return {
        classText: sClass => {
            switch (sClass) {
                case "C":
                    return "Business Class";
                case "Y":
                    return "Economy Class";
                case "F":
                    return "First Class";
                default:
                    return sClass;
            }
        }
    }
});
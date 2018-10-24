sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"c1/IPL/model/models"
], function (UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("c1.IPL.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			this.setModel(new sap.ui.model.json.JSONModel("ipl.json"), "Name");
		}
	});
});
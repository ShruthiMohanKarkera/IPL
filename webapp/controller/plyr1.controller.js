sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function (Controller, History) {
	"use strict";

	return Controller.extend("c1.IPL.controller.plyr1", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf c1.IPL.view.plyr1
		 */
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("RouteView7").attachPatternMatched(this._onObjectMatched, this);
		},
		_onObjectMatched: function (oEvent) {
			var oArg = oEvent.getParameters("arguments");
			var oView = this.getView();
			oView.setModel(this.getOwnerComponent().getModel("jsnModel"));
			oView.bindElement("/player/" + oArg.arguments.index);

			var graph = oEvent.getParameter("arguments").index;
			var g = this.getView().getModel("jsnModel").getProperty("/player")[graph].playerName;
			this.getView().byId("idpGraph").bindData("jsnModel>/pgraph/" + g);

		},
		Graphedit: function (oEvent) {
			var olist1 = oEvent.getParameters().value;
			this.getView().byId("idVizFrame").setVizType(olist1);
		},
		onNavBack: function (oEvent) {
			var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("RouteView1", {}, true /*no history*/ );
			}
		}

	});

});
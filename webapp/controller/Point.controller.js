sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel"
], function (Controller, History, JSONModel) {
	"use strict";

	return Controller.extend("c1.IPL.controller.Point", {

		onInit: function () {
			// this._getModelData();

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("RouteView4").attachPatternMatched(this._onObjectMatched, this);
		},

		_onObjectMatched: function (oEvent) {
			var oModel = this.getView().getModel("jsnModel"),

				points = oModel.oData.Points.twetyeihteen;
			oModel.setProperty("/Eighteen", points);
		},

		sort: function (oEvent) {
			var olist1 = oEvent.getParameters().value;

			var oModel = this.getView().getModel("jsnModel");
			if (olist1 === "2018") {
				oModel.setProperty("/Eighteen", oModel.oData.Points.twetyeihteen);
			} else if (olist1 === "2017") {
				oModel.setProperty("/Eighteen", oModel.oData.Points.twetyseventeen);
			} else if (olist1 === "2016") {
				oModel.setProperty("/Eighteen", oModel.oData.Points.twetysixteen);
			} else if (olist1 === "2015") {
				oModel.setProperty("/Eighteen", oModel.oData.Points.twetyfive);
			}
			// this.getView().byId("table").setpath();

			// oEvent.getSource().getPath();	
		},
		onItemPress: function (oevent) {

			// var oItem = oEvent.getSource();
			var oView = this.getView();
			var oDialog = oView.byId("helloDialog");
			// create dialog lazily
			if (!oDialog) {
				// create dialog via fragment factory
				oDialog = sap.ui.xmlfragment(oView.getId(), "c1.IPL.Fragment.Graph", this);
				oView.addDependent(oDialog);
			}

			var shru = oevent.getParameter("listItem").getBindingContextPath().substr(10);
			var arun = this.getView().getModel("jsnModel").getProperty("/Points").twetyeihteen[shru].name;
			this.getView().byId("idGraph").bindData("jsnModel>/graph/" + arun);

			oDialog.open();
			var obj = {
				title: {
					text: ""
				}
			};
			oDialog.getAggregation('content')[0].getAggregation('content')[0].getAggregation('content').setVizProperties(obj);

		},
		ocClosefrg: function () {
			this.getView().byId("helloDialog").close();

		},
		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("RouteView1", {}, true);
			}
		}
	});

});
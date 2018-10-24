sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, JSONModel, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("c1.IPL.controller.View1", {
	press : function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("RouteView2");
		},	
		press1 : function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("RouteView4",	{
				RouteView4:"team"
			});
		},
			press2 : function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("RouteView5");
		},
			onItemPress: function (oevent) {

			var ob = oevent.getParameters().listItem.getBindingContext("jsnModel").getObject(),
				omodel = this.getView().getModel("jsnModel");
			omodel.setProperty("/Form", ob);
		},
			onSearch: function (event) {
			var olist = this.getView().byId("l1"),
				arr = [],
				bind, filter;
			filter = new Filter("title", FilterOperator.Contains, event.getSource().getValue());
			arr.push(filter);
			bind = olist.getBinding("items");
			bind.filter(arr);

		}
	});
});
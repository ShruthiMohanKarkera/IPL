sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel"
], function (Controller, History, JSONModel) {
	"use strict";

	return Controller.extend("c1.IPL.controller.V2", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf c1.IPL.view.V2
		 */
		//	onInit: function() {
		//
		//	},
		bangalore:function (oevent) {
			// var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			// oRouter.navTo("RouteView3");
			//	var ob = oevent.getParameters().listItem.getBindingContext("jsnModel").getObject();
			var src = oevent.getSource().getId();
			// console.log(src);
			// 	omodel = this.getView().getModel("jModel");
			// omodel.setProperty("/Form", ob);
			var team;
			switch(src){
			 case "__image5" :
                    team = "kolkatha";
                    break;
                case "__image1":
                    team = "bangalore";
                    break;
                case "__image2":
                    team = "csk";
                    break;
                case "__image3":
                    team = "DD";
                    break;
                case "__image4":
                    team = "SH";
                    break;
                case "__image6":
                    team = "mumbai";
                    break;
                     case "__image7":
                    team = "Punjab";
                    break;
                     case "__image8":
                    team = "RR";
                    break;
				// console.log(y);
		
			}
				 //console.log(src);
			var routing = sap.ui.core.UIComponent.getRouterFor(this);
			routing.navTo("RouteView3",
			{
				invoicePath:team
			}
			);
		},
		onNavBack: function (oEvent) {
			var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("RouteView1", {}, true /*no history*/);
			}
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf c1.IPL.view.V2
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf c1.IPL.view.V2
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf c1.IPL.view.V2
		 */
		//	onExit: function() {
		//
		//	}

	});

});
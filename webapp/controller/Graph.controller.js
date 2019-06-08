sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("c1.IPL.controller.Graph", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf c1.IPL.view.Graph
		 */
		onInit: function () {
			// var oVizFrame=this.getView.byId("idVizFrame");
			// var oDataset=new sap.viz.ui5.data.FlattenedDataset({
			// 	dimentiones:[{name:"jsnModel",
			// 		value:"{jsnModel>avg}"
			// 	}],
			// 	measures:[{name:"jsnModel",
			// 		value:"{jsnModel>runs}"}],
			// 	data:{
			// 	path:"{jsnModel>/Teams/0/twetyeihteen/0}"	
			// 	}
			// });
			// oVizFrame.setDataset(oDataset);
			// oVizFrame.setVizType("line");
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf c1.IPL.view.Graph
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf c1.IPL.view.Graph
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf c1.IPL.view.Graph
		 */
		//	onExit: function() {
		//
		//	}

	});

});
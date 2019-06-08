sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, History, JSONModel, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("c1.IPL.controller.V3", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf c1.IPL.view.V3
		 */
		onInit: function () {
			// 	var ob=this.getParameters().listItem.getBindingContext("jsnModel").getObject(),
			// omodel=this.getView().getModel("jsnModel");
			// omodel.setProperty("/Form", ob);
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("RouteView3").attachPatternMatched(this._onObjectMatched, this);

		},
		_onObjectMatched: function (oevent) {
			var name = oevent.getParameters("arguments");
			//	var oView=this.getView();
			this.team = name.arguments.invoicePath;
			var model = this.getView().getModel("jsnModel").getProperty("/Teams"),
				jsonModel = new JSONModel();
			this.getView().setModel(jsonModel, "alias");
			for (var i = 0; i < model.length; i++) {
				if (model[i].name === this.team) {

					this.getView().getModel("alias").setProperty("/Tweenty", model[i]);

				}
			}
		},
		onItemPress: function (oevent) {
			// 	this.getView().setModel(new JSONModel(), "omodel");
			// 	var ob = oevent.getParameters().listItem.getBindingContext("jModel").getObject();
			// 	omodel = this.getView().getModel("jsnModel");
			// omodel.setProperty("/Form", ob);

			var oView = this.getView();
			var oDialog = oView.byId("helloDialog");
			// create dialog lazily
			if (!oDialog) {
				// create dialog via fragment factory
				oDialog = sap.ui.xmlfragment(oView.getId(), "c1.IPL.Fragment.Frag", this);
				oView.addDependent(oDialog);
			}

			oDialog.open();
			// 	var ob = oevent.getParameters().listItem.getBindingContext("jsnModel").getObject(),
			// 	omodel = this.getView().getModel("jsnModel");
			// omodel.setProperty("/Form", ob);

			//oView.bindElement("/Tweenty/2018/" + path);
			//    this.getView().getModel("alias").getProperty("/Tweenty");

			// console.log(oevent.getParameter('listItem').getBindingContextPath());
			var path = oevent.getParameter("listItem").getBindingContextPath().substr(22); //Tweenty/twetyeihteen/0
			this.getView().byId("a1").bindProperty("text", "alias>/Tweenty/twetyeihteen/" + path + "/runs");
			this.getView().byId("helloDialog").bindProperty("icon", "alias>/Tweenty/twetyeihteen/" + path + "/img");
			this.getView().byId("helloDialog").bindProperty("title", "alias>/Tweenty/twetyeihteen/" + path + "/id");
			this.getView().byId("a6").bindProperty("src", "alias>/Tweenty/twetyeihteen/" + path + "/image");
			this.getView().byId("a2").bindProperty("text", "alias>/Tweenty/twetyeihteen/" + path + "/wickets");
			this.getView().byId("a3").bindProperty("text", "alias>/Tweenty/twetyeihteen/" + path + "/avg");
			this.getView().byId("a4").bindProperty("text", "alias>/Tweenty/twetyeihteen/" + path + "/100s");
			this.getView().byId("a5").bindProperty("text", "alias>/Tweenty/twetyeihteen/" + path + "/matches");
			this.getView().byId("a7").bindProperty("text", "alias>/Tweenty/twetyeihteen/" + path + "/playerName");
			//this.getView().byId("a8").bindProperty("text","alias>/Tweenty/twetyeihteen/"+path+"/id");

		},

		Close: function () {
			this.getView().byId("helloDialog").close();
		},
		sort: function (oevent) {
			var oView = this.getView();
			var oTable = oView.byId("list");
			var oBinding = oTable.getBinding("items");
			var sortkey = oevent.getSource().getProperty("selectedKey");
			var Dec = true;
			var aSorter = [];

			aSorter.push(new sap.ui.model.Sorter(sortkey, Dec));
			oBinding.sort(aSorter);

			//this.getView().getModel("jsnModel").oData.Teams[0].twetyeihteen[0].runs

			/*for(var i=0;i<oteams.length;i++){
			var team = this.getView().getModel("jsnModel").oData.Teams[i];
				for(var j= 0 ; j<twetyeihteen.length; j++ ){
					var runs = this.getView().getModel("jsnModel").oData.Teams[i].twetyeihteen[j].runs;
				}
			}*/

			/*var myArray=[];
				for(var i= 0 ; i<twetyeihteen.length; i++ ){
						var runs = this.getView().getModel("jsnModel").oData.Teams[0].twetyeihteen[i].runs;
						myArray.push(runs);
					
					}
					
					myArray.sort(function compareNumbers(a, b) {
						  return a - b;
					});
					*/

			// console.log(olist1);
			// var name = oevent.getParameters("arguments");
			// //	var oView=this.getView();
			// this.team = name.arguments.invoicePath;
			// var model = this.getView().getModel("jsnModel").getProperty("/Teams"),
			// 	jsonModel = new JSONModel();
			// this.getView().setModel(jsonModel, "alias");
			// var oSorter = new sap.ui.model.Sorter(model.twetyeihteen);
			// var oList = sap.ui.getCore().byId("i1");
			// var oBinding = oList.getBinding("runs");
			// oBinding.sort(oSorter);
			// var src = oevent.getSource().getId();
			// if(src=="i1")
			// {
			// sorter: { path: 'runs' }	
			// }
			// if(src=="i2")
			// {

			// }

		},
		onSearch: function (event) {
			var olist = this.getView().byId("list"),
				arr = [],
				bind, filters;
			filters = new Filter({
				filters: [
					new Filter("playerName", FilterOperator.Contains, event.getSource().getValue()),
					new Filter("designation", FilterOperator.Contains, event.getSource().getValue())
				],
				and: false
			});
			arr.push(filters);
			bind = olist.getBinding("items");
			bind.filter(arr);

			// var ob = event.getParameters().listItem.getBindingContext("jsnModel").getObject(),
			// 	omodel = this.getView().getModel("jsnModel");
			// omodel.setProperty("/Form", ob);
		},
		onNavBack: function (oEvent) {
			var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("RouteView1", {}, true);
				// this.getRouter().navTo("RouteView1", {}, true /*no history*/ );
			}
		}

	});

});
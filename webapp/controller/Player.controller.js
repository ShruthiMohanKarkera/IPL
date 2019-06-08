sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/routing/History",
	"sap/ui/export/Spreadsheet",
	"sap/ui/core/util/Export",
	"sap/ui/core/util/ExportTypeCSV",
	'sap/ui/core/Fragment',
	"sap/ui/core/util/ExportType",
	"sap/ui/model/json/JSONModel"
], function (Controller, Filter, FilterOperator, History, Spreadsheet, Export, ExportTypeCSV, ExportType, Fragment,JSONModel) {
	"use strict";

	return Controller.extend("c1.IPL.controller.Player", {

		onInit: function () {
			// this._getModelData();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("RouteView5").attachPatternMatched(this._onObjectMatched, this);
			
			// this.getOwnerComponent().getRouter().getRoute("RouteView1").attachPatternMatched(this._onMasterMatched, this);
			var startupParams = this.getOwnerComponent().getComponentData().startupParameters; // get Startup params from Owner Component
			this.getView().setModel(new JSONModel(), "jmodel");
			this.getView().getModel("jmodel").setProperty("/Cross_App_Value", startupParams.Sematic1ID[0]);
		},

		_onObjectMatched: function (oEvent) {
			var oModel = this.getView().getModel("jsnModel"),
				Teams = oModel.oData.Teams[0].twetyeihteen;
			oModel.setProperty("/Eighteen", Teams);
		},
		_getDialog: function () {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("c1.IPL.Fragment.plyr", this);
				this.getView().addDependent(this._oDialog);
			}
			return this._oDialog;
		},
		handleOpenDialog: function () {
			this._getDialog().open();
		},
		handleOpenDialogFilter: function () {
			this._getDialog().open("plyr");
		},

		Close: function () {
			this.getView().byId("helloDialog").close();
		},

		filter: function (oevent) {
			var oTable = this.getView().byId("idTable"),
				obinding = oTable.getBinding("items"),
				aFilter = [],
				filter;
			filter = new Filter("id", FilterOperator.EQ, oevent.getParameters().value);
			aFilter.push(filter);
			obinding.filter(aFilter);
		},
		filter1: function (oevent) {
			var oTable = this.getView().byId("idTable"),
				obinding = oTable.getBinding("items"),
				aFilter = [],
				filter;
			filter = new Filter("year", FilterOperator.EQ, oevent.getParameters().value);
			aFilter.push(filter);
			obinding.filter(aFilter);
			// aFilter.push(new Filter({path: 'year',
			// 			operator: FilterOperator.EQ,
			// 			value1: oevent.getParameters().value}),
			// 		new Filter({path: 'id',
			// 			operator: FilterOperator.EQ,
			// 			value1: oevent.getParameters().value}));
			// filter = new Filter({
			// 	filters: aFilter,
			// 	or: true
			// });

			// filter.push(new Filter("year", FilterOperator.EQ, oevent.getParameters().value), new Filter("id", FilterOperator.EQ, oevent.getParameters().value));
			// aFilter.push(filter);
			// obinding.filter(aFilter);

		},
		onSortTeam: function (oevent) {
			var oTable = this.getView().byId("idTable"),
				aSort = [],
				SORTKEY = oevent.getSource().getProperty("selectedKey"),
				DESCENDING = false,
				obinding = oTable.getBinding("items");
			aSort.push(new sap.ui.model.Sorter(SORTKEY, DESCENDING));
			obinding.sort(aSort);
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
		},

		onItemPress: function (oEvent) {
			var oItem = oEvent.getSource();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

			oRouter.navTo("RouteView7", {
				index: oEvent.getParameter("listItem").getBindingContextPath().substr(8)
			});
			// var shru=oEvent.getParameter("listItem").getBindingContextPath().substr(8);
			// var arun=oEvent.getParameters().listItem.getBindingContext("jsnModel").getObject().name;
			// this.getView().byId("idGraph").bindData("jsnModel>/graph/"+arun);
		},
		onExport: sap.m.Table.prototype.exportData || function () {

			var oModel = sap.ui.getCore().getModel("jsnModel");
			var oExport = new Export({

				exportType: new ExportTypeCSV({
					fileExtension: "xls",
					separatorChar: "\t",
					charSet: "utf-8",
					mimeType: "application/vnd.ms-excel",
				}),

				models: this.getView().getModel("jsnModel"),

				rows: {
					path: "/player"
				},
				columns: [{
					name: "Name",
					template: {
						content: "{playerName}"
					}
				}, {
					name: "Teams",
					template: {
						content: "{id}"
					}
				}, {
					name: "Mathches",
					template: {
						content: "{matches}"
					}
				}, {
					name: "Avg",
					template: {
						content: "{avg}"
					}
				}, {
					name: "Wickets",
					template: {
						content: "{wickets}"
					}
				}, {
					name: "100s",
					template: {
						content: "{100s}"
					}
				}, {
					name: "Runs",
					template: {
						content: "{runs}"
					}
				}, {
					name: "Year",
					template: {
						content: "{year}"
					}
				}]
			});
			//console.log(oExport);
			oExport.saveFile().catch(function (oError) {
				//MessageBox.error("Error when downloading data. Browser might not be supported!\n\n" + oError);
			}).then(function () {
				oExport.destroy();
			});
			// exportType : ExportType({
			//         fileExtension : "xls"
			//     });
		}
	});

});
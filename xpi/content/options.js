if (typeof classicthemerestorerjs == "undefined") {var classicthemerestorerjs = {};};
if (!classicthemerestorerjs.settings) {classicthemerestorerjs.settings = {};};

classicthemerestorerjs.settings = {

  prefs: Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.classicthemerestorer."),

  /* init css on startup, if corresponding settings are enabled */
  init: function() {

	if (this.prefs.getCharPref("tabs")!="tabs_default"){
		this.loadUnloadCSS(this.prefs.getCharPref("tabs"),true);
	}
	if (this.prefs.getCharPref("tabwidth")!="tabwidth_default"){
		this.loadUnloadCSS(this.prefs.getCharPref("tabwidth"),true);
	}
	if (this.prefs.getCharPref("findbar")!="findbar_default"){
		this.loadUnloadCSS(this.prefs.getCharPref("findbar"),true);
	}
	if (this.prefs.getCharPref("appbutton")!="appbutton_off"){
		this.loadUnloadCSS(this.prefs.getCharPref("appbutton"),true);
	}
	if (this.prefs.getCharPref("appbuttonc")!="off"){
		this.loadUnloadCSS(this.prefs.getCharPref("appbuttonc"),true);
	}
	if (this.prefs.getCharPref("nav_txt_ico")!="icons"){
		this.loadUnloadCSS(this.prefs.getCharPref("nav_txt_ico"),true);
	}

	if (this.prefs.getBoolPref("tabsotoff"))		{ this.loadUnloadCSS("tabsotoff",true); }
	if (this.prefs.getBoolPref("smallnavbut"))		{ this.loadUnloadCSS("smallnavbut",true); }
	if (this.prefs.getBoolPref("hidenavbar"))		{ this.loadUnloadCSS("hidenavbar",true); }
	if (this.prefs.getBoolPref("addonbar"))			{ this.loadUnloadCSS("addonbar",true); }
	if (this.prefs.getBoolPref("extrabar"))			{ this.loadUnloadCSS("extrabar",true); }
	if (this.prefs.getBoolPref("backforward"))		{ this.loadUnloadCSS("backforward",true); }
	
	if (this.prefs.getBoolPref("combrelstop"))		{ this.loadUnloadCSS("combrelstop",true); }
	if (this.prefs.getBoolPref("paneluibtweak"))	{ this.loadUnloadCSS("paneluibtweak",true); }

  },

  /* enable/disable css sheets*/
  loadUnloadCSS: function(which,enable) {
	
	switch (which) {
	
		case "tabs_squared": 		manageCSS("tabs_squared.css");  		break;
		case "tabs_curvedall": 		manageCSS("tabs_curvedall.css");  		break;

		case "tabwidth_150": 		manageCSS("tabwidth_150.css");  		break;
		case "tabwidth_250": 		manageCSS("tabwidth_250.css");  		break;
		
		case "tabsotoff": 			manageCSS("tabsontop_off.css");  		break;
		
		case "smallnavbut":
			
			// no small button mode, if 'icons + text' is used
			if (enable==true && this.prefs.getCharPref("nav_txt_ico")=="iconstxt"){
				enable=false;
			}
			
			// If 'Classic Toolbar Buttons' add-on is used to style nav-bar buttons,
			// CTRs small button option should not be enabled -> prevents glitches.
			// 'Classic Toolbar Buttons' add-on has an own 'small button option'.
			try{
				if(Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService)
						.getBranch("extensions.cstbb-extension.").getCharPref("navbarbuttons")!="nabbuttons_off"){
					
					enable=false;
					
				}
			} catch(e){}
			
			manageCSS("smallnavbut.css");
		break;
		
		case "findbar_top": 		manageCSS("findbar_top.css");  			break;
		case "findbar_bottom": 		manageCSS("findbar_bottom.css");  		break;
		
		case "hidenavbar": 			manageCSS("hidenavbar.css");  			break;
		case "addonbar": 			manageCSS("addonbar.css");  			break;
		case "extrabar": 			manageCSS("extrabar.css");  			break;
		
		case "appbutton_v1":		manageCSS("appbutton.css");				break;
		case "appbutton_v2":		manageCSS("appbutton2.css");			break;
		
		// no 'small button' mode, if 'icons + text' is used
		case "iconstxt":
			if(enable==true && this.prefs.getBoolPref("smallnavbut")==true){
				enable=false;
				manageCSS("smallnavbut.css");
				enable=true;
			}
			if(enable==false && this.prefs.getBoolPref("smallnavbut")==true){
				enable=true;
				manageCSS("smallnavbut.css");
				enable=false;
			}
			manageCSS("mode_icons_and_text.css");
		break;
		
		case "txtonly":				manageCSS("mode_txtonly.css");			break;
		
		case "appbuttonc_orange":	manageCSS("appbutton_orange.css");		break;
		case "appbuttonc_aurora":	manageCSS("appbutton_aurora.css");		break;
		case "appbuttonc_nightly":	manageCSS("appbutton_nightly.css");		break;
		case "appbuttonc_transp":	manageCSS("appbutton_transparent.css");	break;
		case "appbuttonc_palemo":	manageCSS("appbutton_palemoon.css");	break;
		case "appbuttonc_red":		manageCSS("appbutton_red.css");			break;
		case "appbuttonc_green":	manageCSS("appbutton_green.css");		break;
		case "appbuttonc_gray":		manageCSS("appbutton_gray.css");		break;
		
		case "backforward": 		manageCSS("back-forward.css");			break;
		
		case "combrelstop": 		manageCSS("combrelstop.css");			break;
		case "paneluibtweak": 		manageCSS("paneluibutton_tweak.css");	break;
	
	}
	
	// Apply or remove the style sheets
	function manageCSS(file) {

		const sss = Components.classes["@mozilla.org/content/style-sheet-service;1"].getService(Components.interfaces.nsIStyleSheetService);
		const ios = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);

		let uri = ios.newURI("chrome://classic_theme_restorer/content/css/" + file,null,null);
		
		try{
			if (enable) {
				if (!sss.sheetRegistered(uri,sss.AGENT_SHEET))
					sss.loadAndRegisterSheet(uri,sss.AGENT_SHEET);
			} else {
				if (sss.sheetRegistered(uri,sss.AGENT_SHEET))
					sss.unregisterSheet(uri,sss.AGENT_SHEET);
			}
		}catch(e){}
	}
  },

  prefChangeString: function(which,value){
	
	this.loadUnloadCSS(this.prefs.getCharPref(which),false);
	this.loadUnloadCSS(value,true);
  }

}

classicthemerestorerjs.settings.init();
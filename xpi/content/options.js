if (typeof classicthemerestorerjs == "undefined") {var classicthemerestorerjs = {};};
if (!classicthemerestorerjs.settings) {classicthemerestorerjs.settings = {};};

classicthemerestorerjs.settings = {

  prefs: Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.classicthemerestorer."),
  
  ctabsheet: Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  tabtxtcsheet: Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  tabtxtshsheet: Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),

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
	if (this.prefs.getBoolPref("backforward"))		{ this.loadUnloadCSS("backforward",true); }
	if (this.prefs.getBoolPref("wincontrols"))		{ this.loadUnloadCSS("wincontrols",true); }
	if (this.prefs.getBoolPref("hideurelstop"))		{ this.loadUnloadCSS("hideurelstop",true); }
	if (this.prefs.getBoolPref("combrelstop"))		{ this.loadUnloadCSS("combrelstop",true); }

	if (this.prefs.getBoolPref("tnotlfix"))			{ this.loadUnloadCSS("tnotlfix",true); }
	if (this.prefs.getBoolPref("bfurlbarfix"))		{ this.loadUnloadCSS("bfurlbarfix",true); }
	
	if (this.prefs.getBoolPref("alttbappb"))		{ this.loadUnloadCSS("alttbappb",true); }
	if (this.prefs.getBoolPref("paneluibtweak"))	{ this.loadUnloadCSS("paneluibtweak",true); }
	if (this.prefs.getBoolPref("appbuttxt"))		{ this.loadUnloadCSS("appbuttxt",true); }
	if (this.prefs.getBoolPref("notabfog"))			{ this.loadUnloadCSS("notabfog",true); }
	if (this.prefs.getBoolPref("tabmokcolor"))		{ this.loadUnloadCSS("tabmokcolor",true); }
	if (this.prefs.getBoolPref("closeabarbut"))		{ this.loadUnloadCSS("closeabarbut",true); }
	
	if (this.prefs.getBoolPref("customsqtab"))		{ this.loadUnloadCSS("customsqtab",true); }
	if (this.prefs.getBoolPref("tabtextc"))			{ this.loadUnloadCSS("tabtextc",true); }
	if (this.prefs.getBoolPref("tabtextsh"))		{ this.loadUnloadCSS("tabtextsh",true); }

  },
  
  /* enable/disable css sheets*/
  loadUnloadCSS: function(which,enable) {
	
	const ios = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
	
	switch (which) {
	
		case "tabs_squared":

			manageCSS("tabs_squared.css");
		
			var osString = Components.classes["@mozilla.org/xre/app-info;1"].getService(Components.interfaces.nsIXULRuntime).OS;

			// different appearance for 'tabs not on top' on MacOSX
			if (osString=="Darwin"){
		
				// enable 'tabs not on top' sheets already here to prevent glitches
				if (enable==true && this.prefs.getBoolPref("tabsotoff")==true){
					manageCSS("tabsontop_off.css");
					manageCSS("tabs_squared-r-osx.css");
				}
				
				if (enable==true && this.prefs.getBoolPref("tabsotoff")==false){
					manageCSS("tabs_squared-osx.css");
				}
				
				if(enable==false){
					manageCSS("tabs_squared-r-osx.css");
					manageCSS("tabs_squared-osx.css");
				}
			}
		
		break;
		
		case "tabs_squared2":

			manageCSS("tabs_squared2.css");
		
			var osString = Components.classes["@mozilla.org/xre/app-info;1"].getService(Components.interfaces.nsIXULRuntime).OS;

			// different appearance for 'tabs not on top' on MacOSX
			if (osString=="Darwin"){
		
				// enable 'tabs not on top' sheets already here to prevent glitches
				if (enable==true && this.prefs.getBoolPref("tabsotoff")==true){
					manageCSS("tabsontop_off.css");
					manageCSS("tabs_squared-r-osx2.css");
				}
				
				if (enable==true && this.prefs.getBoolPref("tabsotoff")==false){
					manageCSS("tabs_squared-osx2.css");
				}
				
				if(enable==false){
					manageCSS("tabs_squared-r-osx2.css");
					manageCSS("tabs_squared-osx2.css");
				}
			}
		
		break;
		
		case "tabs_curved":
		
			//manageCSS("tabs_curved.css");
			
			var osString = Components.classes["@mozilla.org/xre/app-info;1"].getService(Components.interfaces.nsIXULRuntime).OS;
			
			// different appearance for 'tabs not on top' on MacOSX
			if (osString=="Darwin"){
		
				// enable 'tabs not on top' sheets already here to prevent glitches
				if (enable==true && this.prefs.getBoolPref("tabsotoff")==true){
					manageCSS("tabsontop_off.css");
					manageCSS("tabs_curved-r-osx.css");
				}
				
				if (enable==true && this.prefs.getBoolPref("tabsotoff")==false){
					manageCSS("tabs_curved.css");
				}
			
				if(enable==false){
					manageCSS("tabs_curved-r-osx.css");
					manageCSS("tabs_curved.css");
				}
			}
			else {
			  manageCSS("tabs_curved.css");
			}
		
		break;
		case "tabs_curvedall":		manageCSS("tabs_curvedall.css");		break;

		case "tabwidth_150": 		manageCSS("tabwidth_150.css");  		break;
		case "tabwidth_250": 		manageCSS("tabwidth_250.css");  		break;
		
		case "tabsotoff":
		
			manageCSS("tabsontop_off.css");
		
			var osString = Components.classes["@mozilla.org/xre/app-info;1"].getService(Components.interfaces.nsIXULRuntime).OS;

			// different appearance for 'tabs not on top' on MacOSX
			if (osString=="Darwin"){
			
				if (enable==true && this.prefs.getCharPref("tabs")=="tabs_squared"){
					manageCSS("tabs_squared-r-osx.css");
				}
				if (enable==true && this.prefs.getCharPref("tabs")=="tabs_squared2"){
					manageCSS("tabs_squared-r-osx2.css");
				}
				if (enable==true && this.prefs.getCharPref("tabs")=="tabs_curved"){
					manageCSS("tabs_curved-r-osx.css");
				}
				
				if(enable==false && this.prefs.getCharPref("tabs")=="tabs_squared"){
					manageCSS("tabs_squared-r-osx.css");
					enable=true;
					manageCSS("tabs_squared-osx.css");
				}
				if(enable==false && this.prefs.getCharPref("tabs")=="tabs_squared2"){
					manageCSS("tabs_squared-r-osx2.css");
					enable=true;
					manageCSS("tabs_squared-osx2.css");
				}
				if(enable==false && this.prefs.getCharPref("tabs")=="tabs_curved"){
					manageCSS("tabs_curved-r-osx.css");
					enable=true;
					manageCSS("tabs_curved.css");
				}
			}
		
		break;
		
		case "smallnavbut":
			
			// no small button mode when 'icons + text' mode is used
			if (enable==true && this.prefs.getCharPref("nav_txt_ico")=="iconstxt"){
				enable=false;
			}
			else if (enable==true && this.prefs.getCharPref("nav_txt_ico")=="iconstxt2"){
				enable=false;
			}
			
			// If 'Classic Toolbar Buttons' add-on is used to style nav-bar buttons,
			// CTRs small button option should not be enabled -> prevents glitches.
			// 'Classic Toolbar Buttons' add-on has an own 'small button option',
			// which is not compatible to CTRs option.
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

		case "appbutton_v1":		manageCSS("appbutton.css");				break;
		case "appbutton_v2":		manageCSS("appbutton2.css");			break;
		
		// no 'small button' mode, if 'icons + text' mode is used
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
		
		// no 'small button' mode, if 'icons + text' mode is used
		case "iconstxt2":
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
			manageCSS("mode_icons_and_text2.css");
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
		
		case "hidenavbar": 			manageCSS("hidenavbar.css");  			break;
		case "backforward": 		manageCSS("back-forward.css");			break;
		case "wincontrols": 		manageCSS("windowcontrols.css");		break;
		case "hideurelstop":		manageCSS("hideurlbarrelstop.css");		break;
		case "combrelstop":			manageCSS("combrelstop.css");			break;
		
		case "tnotlfix": 			manageCSS("tabsontop_off_lfix.css");	break;
		case "bfurlbarfix": 		manageCSS("bf_urlbarfix.css");			break;
		
		case "alttbappb": 			manageCSS("alt_appbutton_icons.css");	break;
		case "paneluibtweak": 		manageCSS("paneluibutton_tweak.css");	break;
		case "appbuttxt": 			manageCSS("appbuttxt.css");				break;
		case "notabfog": 			manageCSS("notabfog.css");				break;
		case "tabmokcolor": 		manageCSS("tabmokcolor.css");			break;
		case "closeabarbut": 		manageCSS("closeabarbut.css");			break;
		
		case "customsqtab":

			removeOldSheet(this.ctabsheet);
			
			if(enable==true){
		
				if (this.prefs.getCharPref('tabs')=='tabs_squared') {
				
					this.ctabsheet=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						.tabbrowser-tab[selected="true"]:not(:-moz-lwtheme) {\
						  background-image: linear-gradient('+this.prefs.getCharPref('ctabact1')+','+this.prefs.getCharPref('ctabact2')+') !important;\
						}\
						.tabbrowser-tab:not([selected="true"]):not(:hover):not(:-moz-lwtheme) {\
						  background-image: linear-gradient('+this.prefs.getCharPref('ctab1')+','+this.prefs.getCharPref('ctab2')+') !important;\
						}\
						.tabbrowser-tab:not([selected="true"]):hover:not(:-moz-lwtheme) {\
						  background-image: linear-gradient('+this.prefs.getCharPref('ctabhov1')+','+this.prefs.getCharPref('ctabhov2')+') !important;\
						}\
						.tabs-newtab-button:not(:-moz-lwtheme) {\
						  background-image: linear-gradient('+this.prefs.getCharPref('cntab1')+','+this.prefs.getCharPref('cntab2')+') !important;\
						}\
						.tabs-newtab-button:hover:not(:-moz-lwtheme) {\
						  background-image: linear-gradient('+this.prefs.getCharPref('cntabhov1')+','+this.prefs.getCharPref('cntabhov2')+') !important;\
						}\
					'), null, null);
				
				}
				
				else if (this.prefs.getCharPref('tabs')=='tabs_squared2') {
				
					this.ctabsheet=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						.tabbrowser-tab[selected="true"]:not(:-moz-lwtheme) {\
						  background-image: linear-gradient('+this.prefs.getCharPref('ctabact1')+','+this.prefs.getCharPref('ctabact2')+') !important;\
						}\
					'), null, null);
				
				}
				
				else if (this.prefs.getCharPref('tabs')=='tabs_curved') {
				
					this.ctabsheet=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						.tabbrowser-tab:not(:-moz-lwtheme):not([selected=true]):not(:hover) .tab-stack .tab-background-middle,\
						.tabbrowser-tab:not(:-moz-lwtheme):not([selected=true]):not(:hover) .tab-background-start,\
						.tabbrowser-tab:not(:-moz-lwtheme):not([selected=true]):not(:hover) .tab-background-end {\
						  background-image: linear-gradient(to top, #868d94 0px, transparent 1px),linear-gradient('+this.prefs.getCharPref('ctab1')+','+this.prefs.getCharPref('ctab2')+');\
						}\
						.tabbrowser-tab:not(:-moz-lwtheme):not([selected=true]):hover .tab-stack .tab-background-middle,\
						.tabbrowser-tab:not(:-moz-lwtheme):not([selected=true]):hover .tab-background-start,\
						.tabbrowser-tab:not(:-moz-lwtheme):not([selected=true]):hover .tab-background-end {\
						  background-image: linear-gradient(to top, #868d94 0px, transparent 1px),linear-gradient('+this.prefs.getCharPref('ctabhov1')+','+this.prefs.getCharPref('ctabhov2')+');\
						}\
						.tab-background-start[selected=true]:-moz-locale-dir(ltr):not(:-moz-lwtheme)::before,\
						.tab-background-end[selected=true]:-moz-locale-dir(rtl):not(:-moz-lwtheme)::before {\
						  background-image: url(chrome://browser/skin/tabbrowser/tab-stroke-start.png),linear-gradient('+this.prefs.getCharPref('ctabact1')+','+this.prefs.getCharPref('ctabact2')+') !important;\
						  clip-path: url(chrome://browser/content/browser.xul#tab-curve-clip-path-start) !important;\
						}\
						.tab-background-end[selected=true]:-moz-locale-dir(ltr):not(:-moz-lwtheme)::before,\
						.tab-background-start[selected=true]:-moz-locale-dir(rtl):not(:-moz-lwtheme)::before {\
						  background-image: url(chrome://browser/skin/tabbrowser/tab-stroke-end.png),linear-gradient('+this.prefs.getCharPref('ctabact1')+','+this.prefs.getCharPref('ctabact2')+') !important;\
						  clip-path: url(chrome://browser/content/browser.xul#tab-curve-clip-path-end) !important;\
						}\
						.tab-background-middle[selected=true] {\
						  background-clip: padding-box, padding-box, content-box !important;\
						  background-image: url(chrome://browser/skin/tabbrowser/tab-active-middle.png), linear-gradient(transparent, transparent 2px, '+this.prefs.getCharPref('ctabact1')+' 0px, '+this.prefs.getCharPref('ctabact2')+'), none !important;\
						}\
					'), null, null);
				
				}
				
				else if (this.prefs.getCharPref('tabs')=='tabs_default') {
				
					this.ctabsheet=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						.tab-background-start[selected=true]:-moz-locale-dir(ltr):not(:-moz-lwtheme)::before,\
						.tab-background-end[selected=true]:-moz-locale-dir(rtl):not(:-moz-lwtheme)::before {\
						  background-image: url(chrome://browser/skin/tabbrowser/tab-stroke-start.png),linear-gradient('+this.prefs.getCharPref('ctabact1')+','+this.prefs.getCharPref('ctabact2')+') !important;\
						  clip-path: url(chrome://browser/content/browser.xul#tab-curve-clip-path-start) !important;\
						}\
						.tab-background-end[selected=true]:-moz-locale-dir(ltr):not(:-moz-lwtheme)::before,\
						.tab-background-start[selected=true]:-moz-locale-dir(rtl):not(:-moz-lwtheme)::before {\
						  background-image: url(chrome://browser/skin/tabbrowser/tab-stroke-end.png),linear-gradient('+this.prefs.getCharPref('ctabact1')+','+this.prefs.getCharPref('ctabact2')+') !important;\
						  clip-path: url(chrome://browser/content/browser.xul#tab-curve-clip-path-end) !important;\
						}\
						.tab-background-middle[selected=true] {\
						  background-clip: padding-box, padding-box, content-box !important;\
						  background-image: url(chrome://browser/skin/tabbrowser/tab-active-middle.png), linear-gradient(transparent, transparent 2px, '+this.prefs.getCharPref('ctabact1')+' 0px, '+this.prefs.getCharPref('ctabact2')+'), none !important;\
						}\
					'), null, null);
				
				}

				applyNewSheet(this.ctabsheet);
			}

		break;
		
		case "tabtextc":

			removeOldSheet(this.tabtxtcsheet);
			
			if(enable==true){
	
				this.tabtxtcsheet=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
					.tabbrowser-tab[selected="true"] {\
					  color: '+this.prefs.getCharPref('ctabactt')+' !important;\
					}\
					.tabbrowser-tab:not([selected="true"]):not(:hover) {\
					  color: '+this.prefs.getCharPref('ctabt')+' !important;\
					}\
					.tabbrowser-tab:not([selected="true"]):hover{\
					  color: '+this.prefs.getCharPref('ctabhovt')+' !important;\
					}\
				'), null, null);

				applyNewSheet(this.tabtxtcsheet);
			}

		break;
		
		case "tabtextsh":

			removeOldSheet(this.tabtxtshsheet);
			
			if(enable==true){
				
				this.tabtxtshsheet=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
					.tabbrowser-tab[selected="true"] {\
					  text-shadow: 0px 1px 0px '+this.prefs.getCharPref('ctabacttsh')+',0px 1px 4px '+this.prefs.getCharPref('ctabacttsh')+' !important;\
					}\
					.tabbrowser-tab:not([selected="true"]):not(:hover) {\
					  text-shadow: 0px 1px 0px '+this.prefs.getCharPref('ctabtsh')+',0px 1px 4px '+this.prefs.getCharPref('ctabtsh')+' !important;\
					}\
					.tabbrowser-tab:not([selected="true"]):hover {\
					  text-shadow: 0px 1px 0px '+this.prefs.getCharPref('ctabhovtsh')+',0px 1px 4px '+this.prefs.getCharPref('ctabhovtsh')+' !important;\
					}\
				'), null, null);

				applyNewSheet(this.tabtxtshsheet);
			}

		break;
		
	}
	
	// Apply or remove the style sheet files
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
	
	// remove style sheet
	function removeOldSheet(sheet){

	  const sss = Components.classes["@mozilla.org/content/style-sheet-service;1"].getService(Components.interfaces.nsIStyleSheetService);

		if (sss.sheetRegistered(sheet,sss.AGENT_SHEET)) sss.unregisterSheet(sheet,sss.AGENT_SHEET);
	}

	// apply style sheet
	function applyNewSheet(sheet){

	  const sss = Components.classes["@mozilla.org/content/style-sheet-service;1"].getService(Components.interfaces.nsIStyleSheetService);

		if (!sss.sheetRegistered(sheet,sss.AGENT_SHEET)) sss.loadAndRegisterSheet(sheet,sss.AGENT_SHEET);
	}
  },

  prefChangeString: function(which,value){
	
	this.loadUnloadCSS(this.prefs.getCharPref(which),false);
	this.loadUnloadCSS(value,true);
	
	// make sure custom tab colors get disabled on tab change
	if (which=="tabs"){
		this.loadUnloadCSS('customsqtab',false);
		this.prefs.setBoolPref('customsqtab',false);
	}
  },
  
  colorChange: function(value,which){

	this.prefs.setCharPref(which,value);
	
	if (this.prefs.getBoolPref("customsqtab")){
		this.loadUnloadCSS("customsqtab",true);
	}

	if (this.prefs.getBoolPref("tabtextc")){
		this.loadUnloadCSS("tabtextc",true);
	}

	if (this.prefs.getBoolPref("tabtextsh")==true ){
		this.loadUnloadCSS("tabtextsh",true);
	}
	
  }

}

classicthemerestorerjs.settings.init();
"use strict";
/*
 There are a few "timeouts" on this document. In almost all cases they are needed to
 make sure a 'get' call looks only for items already on DOM.  
*/

Components.utils.import("chrome://classic_theme_restorer/content/ctraddon_toolbars.jsm");
Components.utils.import("resource:///modules/CustomizableUI.jsm");
Components.utils.import("resource://gre/modules/AddonManager.jsm");

if (typeof classicthemerestorerjs == "undefined") {var classicthemerestorerjs = {};};
if (!classicthemerestorerjs.ctr) {classicthemerestorerjs.ctr = {};};

classicthemerestorerjs.ctr = {
 
  // initialize custom sheets for tab color settings
  ctabsheet_def:		Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  ctabsheet_act:		Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  ctabsheet_hov:		Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  ctabsheet_pen:		Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  ctabsheet_unr:		Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  cntabsheet_def:		Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  cntabsheet_hov:		Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  tabtxtcsheet_def:		Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  tabtxtcsheet_act:		Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  tabtxtcsheet_hov:		Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  tabtxtcsheet_pen:		Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  tabtxtcsheet_unr:		Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  tabtxtshsheet_def:	Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  tabtxtshsheet_act:	Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  tabtxtshsheet_hov:	Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  tabtxtshsheet_pen:	Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  tabtxtshsheet_unr:	Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  
  cuiButtonssheet:		Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),

  prefs:				Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.classicthemerestorer."),
  
  fxdefaulttheme:		Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("general.skins.").getCharPref("selectedSkin") == 'classic/1.0',
  appversion:			parseInt(Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.").getCharPref("lastAppVersion")),
  
  init: function() {

	// remove default panel ui button in favour of CTRs movable duplicate
	try{
		document.getElementById("PanelUI-button").removeChild(document.getElementById("PanelUI-menu-button"));
	} catch(e){}

	// adds a new global attribute 'defaultfxtheme' -> better parting css for default and non-default themes
	try{
		if (this.fxdefaulttheme) document.getElementById("main-window").setAttribute('defaultfxtheme',true);
		  else document.getElementById("main-window").removeAttribute('defaultfxtheme');
	} catch(e){}
	
	// add a new global attribute 'fx31'/'fx32' -> better parting css between versions
	try{
		if (this.appversion >= 31) document.getElementById("main-window").setAttribute('fx31',true);
		  else document.getElementById("main-window").removeAttribute('fx31');
	} catch(e){}
	
	// add-on fixes
	this.addonCompatibilityImprovements();

	// star-button in urlbar	
	this.moveStarButtonIntoUrbar();
	
	// handle max/min tab-width for every new window
	window.addEventListener("DOMContentLoaded", function load(event){
		window.removeEventListener("DOMContentLoaded", load, false);
		classicthemerestorerjs.ctr.updateTabWidth();  
	},false);

	// not all CTR features are suitable for third party themes
	this.disableSettingsforThemes();
	
	// style CTRs 'customize-ui' option buttons
	this.loadUnloadCSS('cui_buttons',true);

	// CTR Preferences listener
	function PrefListener(branch_name, callback) {
	  // Keeping a reference to the observed preference branch or it will get
	  // garbage collected.
	  var prefService = Components.classes["@mozilla.org/preferences-service;1"]
		.getService(Components.interfaces.nsIPrefService);
	  this._branch = prefService.getBranch(branch_name);
	  this._branch.QueryInterface(Components.interfaces.nsIPrefBranch2);
	  this._callback = callback;
	}

	PrefListener.prototype.observe = function(subject, topic, data) {
	  if (topic == 'nsPref:changed')
		this._callback(this._branch, data);
	};

	PrefListener.prototype.register = function(trigger) {
	  this._branch.addObserver('', this, false);
	  if (trigger) {
		let that = this;
		this._branch.getChildList('', {}).
		  forEach(function (pref_leaf_name)
			{ that._callback(that._branch, pref_leaf_name); });
	  }
	};

	PrefListener.prototype.unregister = function() {
	  if (this._branch)
		this._branch.removeObserver('', this);
	};

	var ctrSettingsListener = new PrefListener(
	  "extensions.classicthemerestorer.",
	  function(branch, name) {
		switch (name) {

		  // first run/reset
		  case "ctrreset":
			if (branch.getBoolPref("ctrreset") ) {
			
			  try {

				// insert CTRs items on first run / reset into toolbars
				CustomizableUI.addWidgetToArea("ctraddon_back-forward-button", CustomizableUI.AREA_NAVBAR);
				CustomizableUI.addWidgetToArea("ctraddon_appbutton", CustomizableUI.AREA_NAVBAR);
				CustomizableUI.addWidgetToArea("ctraddon_puib_separator", CustomizableUI.AREA_NAVBAR);
				CustomizableUI.addWidgetToArea("ctraddon_panelui-button", CustomizableUI.AREA_NAVBAR);
				CustomizableUI.addWidgetToArea("ctraddon_window-controls", CustomizableUI.AREA_NAVBAR);
				CustomizableUI.addWidgetToArea("ctraddon_bookmarks-menu-toolbar-button", CustomizableUI.AREA_BOOKMARKS);						

				var oswindows = Components.classes["@mozilla.org/xre/app-info;1"]
								  .getService(Components.interfaces.nsIXULRuntime).OS=="WINNT";

				var tabsintitlebar = Components.classes["@mozilla.org/preferences-service;1"]
									  .getService(Components.interfaces.nsIPrefService)
										.getBranch("browser.tabs.").getBoolPref("drawInTitlebar");
										
				// disable TMPs/TUs colors on first run, so users do not see corrupted tabs
				// after first install. Options can be reenabled afterwards
				classicthemerestorerjs.ctr.disableTMPTabColors();
				
				// switch to 'appbutton on titlebar', if using Fx titlebar on Windows
				if (oswindows && tabsintitlebar) {
					branch.setCharPref("appbutton",'appbutton_v2');
				}
					
			  } catch(e){}
			  
			  try{
				  // try to move buttons to nav-bars start
				  setTimeout(function(){
					CustomizableUI.moveWidgetWithinArea("ctraddon_back-forward-button",0);
					CustomizableUI.moveWidgetWithinArea("ctraddon_appbutton",0);
				  },1000);
			  }catch(e){}
			  
			  // TreeStyleTabs add-on works better with tabs not on top, so this is eanbled on reset/first run
			  AddonManager.getAddonByID('treestyletab@piro.sakura.ne.jp', function(addon) {
				if(addon && addon.isActive) { classicthemerestorerjs.ctr.prefs.setCharPref('tabsontop','false'); }
			  });
			  
			  // set 'first run'/'ctrreset' to false
			  setTimeout(function(){
				branch.setBoolPref("ctrreset",false);
			  },3000);
			
			}
		  break;
		  
		  // Tabs
		  case "tabs":
			classicthemerestorerjs.ctr.loadUnloadCSS('tabs_squared',false);
			classicthemerestorerjs.ctr.loadUnloadCSS('tabs_squaredc2',false);
			classicthemerestorerjs.ctr.loadUnloadCSS('tabs_squared2',false);
			classicthemerestorerjs.ctr.loadUnloadCSS('tabs_curved',false);
			classicthemerestorerjs.ctr.loadUnloadCSS('tabs_curvedall',false);
			
			if (branch.getCharPref("tabs")!="tabs_default" && classicthemerestorerjs.ctr.fxdefaulttheme==true){
			  classicthemerestorerjs.ctr.loadUnloadCSS(branch.getCharPref("tabs"),true);
			}
		  break;
		  
		  case "tabsontop":
		    
			var tabsont = branch.getCharPref("tabsontop");
			
			try {
				document.getElementById("main-window").removeAttribute('tabsontop');
				document.getElementById("titlebar").removeAttribute('tabsontop');
				document.getElementById("navigator-toolbox").removeAttribute('tabsontop');
				document.getElementById("toolbar-menubar").removeAttribute('tabsontop');
				document.getElementById("TabsToolbar").removeAttribute('tabsontop');
				document.getElementById("nav-bar").removeAttribute('tabsontop');
				document.getElementById("PersonalToolbar").removeAttribute('tabsontop');
				document.getElementById("ctraddon_extra-bar").removeAttribute('tabsontop');
				document.getElementById("ctraddon_addon-bar").removeAttribute('tabsontop');
			} catch(e){}
			
			try {
				if (tabsont=='true') {
					document.getElementById("main-window").setAttribute('tabsontop','true');
					document.getElementById("titlebar").setAttribute('tabsontop','true');
					document.getElementById("navigator-toolbox").setAttribute('tabsontop','true');
					document.getElementById("toolbar-menubar").setAttribute('tabsontop','true');
					document.getElementById("TabsToolbar").setAttribute('tabsontop','true');
					document.getElementById("nav-bar").setAttribute('tabsontop','true');
					document.getElementById("PersonalToolbar").setAttribute('tabsontop','true');
					document.getElementById("ctraddon_extra-bar").setAttribute('tabsontop','true');
					document.getElementById("ctraddon_addon-bar").setAttribute('tabsontop','true');
					
				} else if (tabsont=='false' || tabsont=='false2') {
					document.getElementById("main-window").setAttribute('tabsontop','false');
					document.getElementById("titlebar").setAttribute('tabsontop','false');
					document.getElementById("navigator-toolbox").setAttribute('tabsontop','false');
					document.getElementById("toolbar-menubar").setAttribute('tabsontop','false');
					document.getElementById("TabsToolbar").setAttribute('tabsontop','false');
					document.getElementById("nav-bar").setAttribute('tabsontop','false');
					document.getElementById("PersonalToolbar").setAttribute('tabsontop','false');
					document.getElementById("ctraddon_extra-bar").setAttribute('tabsontop','false');
					document.getElementById("ctraddon_addon-bar").setAttribute('tabsontop','false');
				}
			} catch(e){}
			
			if (tabsont=='false') {
			  classicthemerestorerjs.ctr.loadUnloadCSS("tabsotoff2",false);
			  classicthemerestorerjs.ctr.loadUnloadCSS("tabsotoff",true);
			} else if (tabsont=='false2') {
			  classicthemerestorerjs.ctr.loadUnloadCSS("tabsotoff",false);
			  classicthemerestorerjs.ctr.loadUnloadCSS("tabsotoff2",true);
			} else {
			  classicthemerestorerjs.ctr.loadUnloadCSS("tabsotoff",false);
			  classicthemerestorerjs.ctr.loadUnloadCSS("tabsotoff2",false);
			}
			
		  break;
		  
		  case "ctabwidth": case "ctabmwidth":
			
			classicthemerestorerjs.ctr.updateTabWidth();
 
		  break;
		  
		  case "closetab":
			classicthemerestorerjs.ctr.loadUnloadCSS('closetab_active',false);
			classicthemerestorerjs.ctr.loadUnloadCSS('closetab_none',false);
			classicthemerestorerjs.ctr.loadUnloadCSS('closetab_tb_end',false);
			classicthemerestorerjs.ctr.loadUnloadCSS('closetab_tb_start',false);
			
			if (branch.getCharPref("closetab")!="closetab_default" && classicthemerestorerjs.ctr.appversion >= 31){
			  classicthemerestorerjs.ctr.loadUnloadCSS(branch.getCharPref("closetab"),true);
			}
		  break;

		  // Appbutton
		  case "appbutton":
			classicthemerestorerjs.ctr.loadUnloadCSS('appbutton_v1',false);
			classicthemerestorerjs.ctr.loadUnloadCSS('appbutton_v1wt',false);
			classicthemerestorerjs.ctr.loadUnloadCSS('appbutton_v2',false);
			classicthemerestorerjs.ctr.loadUnloadCSS('appbutton_v2wt2',false);
			classicthemerestorerjs.ctr.loadUnloadCSS('appbutton_v2io',false);
			classicthemerestorerjs.ctr.loadUnloadCSS('appbutton_v2io2',false);
		
			if (branch.getCharPref("appbutton")!="appbutton_off"){
			  classicthemerestorerjs.ctr.loadUnloadCSS(branch.getCharPref("appbutton"),true);
			  if (branch.getBoolPref("paneluibtweak")==true) branch.setBoolPref("paneluibtweak",false);
			}

		  break;
		  
		  case "appbuttonc":
			classicthemerestorerjs.ctr.loadUnloadCSS('appbuttonc_orange',false);
			classicthemerestorerjs.ctr.loadUnloadCSS('appbuttonc_aurora',false);
			classicthemerestorerjs.ctr.loadUnloadCSS('appbuttonc_nightly',false);
			classicthemerestorerjs.ctr.loadUnloadCSS('appbuttonc_transp',false);
			classicthemerestorerjs.ctr.loadUnloadCSS('appbuttonc_palemo',false);
			classicthemerestorerjs.ctr.loadUnloadCSS('appbuttonc_red',false);
			classicthemerestorerjs.ctr.loadUnloadCSS('appbuttonc_green',false);
			classicthemerestorerjs.ctr.loadUnloadCSS('appbuttonc_gray',false);
			classicthemerestorerjs.ctr.loadUnloadCSS('appbuttonc_purple',false);
			classicthemerestorerjs.ctr.loadUnloadCSS('appbuttonc_white',false);

			if (branch.getCharPref("appbuttonc")!="off"){
			  classicthemerestorerjs.ctr.loadUnloadCSS(branch.getCharPref("appbuttonc"),true);
			}
		  break;
		  
		  case "alttbappb":
			if (branch.getBoolPref("alttbappb")) classicthemerestorerjs.ctr.loadUnloadCSS("alttbappb",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("alttbappb",false);
		  break;
		  
		  case "appbutmhi":
			if (branch.getBoolPref("appbutmhi") && classicthemerestorerjs.ctr.fxdefaulttheme==true) {
			  classicthemerestorerjs.ctr.loadUnloadCSS("appbutmhi",true);
			  branch.setBoolPref("hightabpososx",false);
			}
			else classicthemerestorerjs.ctr.loadUnloadCSS("appbutmhi",false);
		  break;
		  
		  case "appbutbdl":
			if (branch.getBoolPref("appbutbdl")) classicthemerestorerjs.ctr.loadUnloadCSS("appbutbdl",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("appbutbdl",false);
		  break;

		  //General UI options
		  case "nbiconsize":
		  
		    // needs a delay or Firefox will override it on restart
			setTimeout(function(){
		      try {
				document.getElementById("nav-bar").setAttribute('iconsize',classicthemerestorerjs.ctr.prefs.getCharPref("nbiconsize"));
			  } catch(e){}
			},500);
			
			window.addEventListener("DOMContentLoaded", function setCTRnavbariconsize(event){
				window.removeEventListener("DOMContentLoaded", setCTRnavbariconsize, false);

				// needs a delay or Firefox will override it on restart
				setTimeout(function(){
				  try {
					document.getElementById("nav-bar").setAttribute('iconsize',classicthemerestorerjs.ctr.prefs.getCharPref("nbiconsize"));
				  } catch(e){}
				},50);

			},false);

		  break;

		  case "smallnavbut":
			if (branch.getBoolPref("smallnavbut") && classicthemerestorerjs.ctr.fxdefaulttheme==true) {
			
				var activate = true;
				
				try{
					// If 'Classic Toolbar Buttons' add-on is used to style nav-bar buttons,
					// CTRs small button option should stay disabled -> prevents glitches
					// 'Classic Toolbar Buttons' add-on has an own 'small button option',
					// which is not compatible to CTRs option.
					if(Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService)
							.getBranch("extensions.cstbb-extension.").getCharPref("navbarbuttons")!="nabbuttons_off"){
						
						activate=false;
						
					}
				} catch(e){}
				
				classicthemerestorerjs.ctr.loadUnloadCSS("smallnavbut",activate);
			}
			else  classicthemerestorerjs.ctr.loadUnloadCSS("smallnavbut",false);

		  break;
		  
		  case "hidenavbar":	  
			if (branch.getBoolPref("hidenavbar")) classicthemerestorerjs.ctr.loadUnloadCSS("hidenavbar",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("hidenavbar",false);
		  break;
		  
		  case "backforward":
			if (branch.getBoolPref("backforward")) classicthemerestorerjs.ctr.loadUnloadCSS("backforward",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("backforward",false);
		  break;
		  
		  case "wincontrols":
			if (branch.getBoolPref("wincontrols")) classicthemerestorerjs.ctr.loadUnloadCSS("wincontrols",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("wincontrols",false);
		  break;
		  
		  case "statusbar":
	  
			if (branch.getBoolPref("statusbar")) {
				classicthemerestorerjs.ctr.loadUnloadCSS("statusbar",true);
				
				setTimeout(function(){
					try{
						document.getElementById("ctraddon_statusbar").insertBefore(document.getElementById("status-bar"), null);
					} catch(e){}
				},200);
				
				window.addEventListener("DOMContentLoaded", function loadCTRstatusbar(event){
					window.removeEventListener("DOMContentLoaded", loadCTRstatusbar, false);
					
					setTimeout(function(){
					  try{
						  if(CustomizableUI.getPlacementOfWidget("ctraddon_statusbar") == null) {
							CustomizableUI.addWidgetToArea("ctraddon_statusbar", CustomizableUI.AREA_NAVBAR);
						  }
					  } catch(e){}
					},150);
					
					setTimeout(function(){
						try{
							document.getElementById("ctraddon_statusbar").insertBefore(document.getElementById("status-bar"), null);
						} catch(e){}
					},200);
				},false);

			}
			else { 
				classicthemerestorerjs.ctr.loadUnloadCSS("statusbar",false);
				
				window.removeEventListener("DOMContentLoaded", function loadCTRstatusbar(event){},false);
				
				// move status bar back to where it came from
				setTimeout(function(){
					try{
						document.getElementById("addon-bar").insertBefore(document.getElementById("status-bar"), null);
					} catch(e){}
				},100);
			}
		  break;
		  
		  case "hideurelstop":
			if (branch.getBoolPref("hideurelstop")) classicthemerestorerjs.ctr.loadUnloadCSS("hideurelstop",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("hideurelstop",false);
		  break;
		  
		  case "combrelstop":
			if (branch.getBoolPref("combrelstop")) classicthemerestorerjs.ctr.loadUnloadCSS("combrelstop",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("combrelstop",false);
		  break;
		  
		  case "findbar":
			classicthemerestorerjs.ctr.loadUnloadCSS('findbar_top',false);
			classicthemerestorerjs.ctr.loadUnloadCSS('findbar_bottom',false);
			classicthemerestorerjs.ctr.loadUnloadCSS('findbar_topa',false);
			classicthemerestorerjs.ctr.loadUnloadCSS('findbar_bottoma',false);

			if (branch.getCharPref("findbar")!="findbar_default"){
			  classicthemerestorerjs.ctr.loadUnloadCSS(branch.getCharPref("findbar"),true);
			}
		  break;
		  
		  case "nav_txt_ico":
			classicthemerestorerjs.ctr.loadUnloadCSS('iconsbig',false);
			classicthemerestorerjs.ctr.loadUnloadCSS('iconstxt',false);
			classicthemerestorerjs.ctr.loadUnloadCSS('iconstxt2',false);
			classicthemerestorerjs.ctr.loadUnloadCSS('txtonly',false);

			if (branch.getCharPref("nav_txt_ico")!="icons"){
			  classicthemerestorerjs.ctr.loadUnloadCSS(branch.getCharPref("nav_txt_ico"),true);
			}
		  break;


		  // Color settings (checkboxes)
		  
		  case "tabcolor_def":
			if (branch.getBoolPref("tabcolor_def")) classicthemerestorerjs.ctr.loadUnloadCSS("tabcolor_def",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("tabcolor_def",false);
		  break;
		  
		  case "tabcolor_act":
			if (branch.getBoolPref("tabcolor_act")) classicthemerestorerjs.ctr.loadUnloadCSS("tabcolor_act",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("tabcolor_act",false);
		  break;
		  
		  case "tabcolor_hov":
			if (branch.getBoolPref("tabcolor_hov")) classicthemerestorerjs.ctr.loadUnloadCSS("tabcolor_hov",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("tabcolor_hov",false);
		  break;
		  
		  case "tabcolor_pen":
			if (branch.getBoolPref("tabcolor_pen")) classicthemerestorerjs.ctr.loadUnloadCSS("tabcolor_pen",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("tabcolor_pen",false);
		  break;
		  
		  case "tabcolor_unr":
			if (branch.getBoolPref("tabcolor_unr")) classicthemerestorerjs.ctr.loadUnloadCSS("tabcolor_unr",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("tabcolor_unr",false);
		  break;

		  
		  case "ntabcolor_def":
			if (branch.getBoolPref("ntabcolor_def")) classicthemerestorerjs.ctr.loadUnloadCSS("ntabcolor_def",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("ntabcolor_def",false);
		  break;
		  
		  case "ntabcolor_hov":
			if (branch.getBoolPref("ntabcolor_hov")) classicthemerestorerjs.ctr.loadUnloadCSS("ntabcolor_hov",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("ntabcolor_hov",false);
		  break;
		  

		  case "tabtextc_def":
			if (branch.getBoolPref("tabtextc_def")) classicthemerestorerjs.ctr.loadUnloadCSS("tabtextc_def",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("tabtextc_def",false);
		  break;
		  
		  case "tabtextc_act":
			if (branch.getBoolPref("tabtextc_act")) classicthemerestorerjs.ctr.loadUnloadCSS("tabtextc_act",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("tabtextc_act",false);
		  break;
		  
		  case "tabtextc_hov":
			if (branch.getBoolPref("tabtextc_hov")) classicthemerestorerjs.ctr.loadUnloadCSS("tabtextc_hov",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("tabtextc_hov",false);
		  break;
		  
		  case "tabtextc_pen":
			if (branch.getBoolPref("tabtextc_pen")) classicthemerestorerjs.ctr.loadUnloadCSS("tabtextc_pen",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("tabtextc_pen",false);
		  break;
		  
		  case "tabtextc_unr":
			if (branch.getBoolPref("tabtextc_unr")) classicthemerestorerjs.ctr.loadUnloadCSS("tabtextc_unr",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("tabtextc_unr",false);
		  break;
		  
		  case "tabtextsh_def":
			if (branch.getBoolPref("tabtextsh_def")) classicthemerestorerjs.ctr.loadUnloadCSS("tabtextsh_def",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("tabtextsh_def",false);
		  break;
		  
		  case "tabtextsh_act":
			if (branch.getBoolPref("tabtextsh_act")) classicthemerestorerjs.ctr.loadUnloadCSS("tabtextsh_act",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("tabtextsh_act",false);
		  break;
		  
		  case "tabtextsh_hov":
			if (branch.getBoolPref("tabtextsh_hov")) classicthemerestorerjs.ctr.loadUnloadCSS("tabtextsh_hov",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("tabtextsh_hov",false);
		  break;
		  
		  case "tabtextsh_pen":
			if (branch.getBoolPref("tabtextsh_pen")) classicthemerestorerjs.ctr.loadUnloadCSS("tabtextsh_pen",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("tabtextsh_pen",false);
		  break;
		  
		  case "tabtextsh_unr":
			if (branch.getBoolPref("tabtextsh_unr")) classicthemerestorerjs.ctr.loadUnloadCSS("tabtextsh_unr",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("tabtextsh_unr",false);
		  break;
		  
	  
		  // Color settings (colorpickers)
		  
		  case "ctab1": case "ctab2":
			if (branch.getBoolPref("tabcolor_def")) classicthemerestorerjs.ctr.loadUnloadCSS("tabcolor_def",true);
		  break;
		  
		  case "ctabact1": case "ctabact2":
			if (branch.getBoolPref("tabcolor_act")) classicthemerestorerjs.ctr.loadUnloadCSS("tabcolor_act",true);
		  break;
		  
		  case "ctabhov1": case "ctabhov2":
			if (branch.getBoolPref("tabcolor_hov")) classicthemerestorerjs.ctr.loadUnloadCSS("tabcolor_hov",true);
		  break;

		  case "ctabpen1": case "ctabpen2":
			if (branch.getBoolPref("tabcolor_pen")) classicthemerestorerjs.ctr.loadUnloadCSS("tabcolor_pen",true);
		  break;
		  
		  case "ctabunr1": case "ctabunr2":
			if (branch.getBoolPref("tabcolor_unr")) classicthemerestorerjs.ctr.loadUnloadCSS("tabcolor_unr",true);
		  break;

		  case "cntab1": case "cntab2":
			if (branch.getBoolPref("ntabcolor_def")) classicthemerestorerjs.ctr.loadUnloadCSS("ntabcolor_def",true);
		  break;
		  
		  case "cntabhov1": case "cntabhov2":
			if (branch.getBoolPref("ntabcolor_hov")) classicthemerestorerjs.ctr.loadUnloadCSS("ntabcolor_hov",true);
		  break;
		  
		  case "ctabt":
			if (branch.getBoolPref("tabtextc_def")) classicthemerestorerjs.ctr.loadUnloadCSS("tabtextc_def",true);
		  break;
		  
		  case "ctabhovt":
			if (branch.getBoolPref("tabtextc_hov")) classicthemerestorerjs.ctr.loadUnloadCSS("tabtextc_hov",true);
		  break;
		  
		  case "ctabactt":
			if (branch.getBoolPref("tabtextc_act")) classicthemerestorerjs.ctr.loadUnloadCSS("tabtextc_act",true);
		  break;
		  
		  case "ctabpent":
			if (branch.getBoolPref("tabtextc_pen")) classicthemerestorerjs.ctr.loadUnloadCSS("tabtextc_pen",true);
		  break;
		  
		  case "ctabunrt":
			if (branch.getBoolPref("tabtextc_unr")) classicthemerestorerjs.ctr.loadUnloadCSS("tabtextc_unr",true);
		  break;
		  
		  case 'ctabtsh':
			if (branch.getBoolPref("tabtextsh_def")) classicthemerestorerjs.ctr.loadUnloadCSS("tabtextsh_def",true);
		  break;
		  
		  case 'ctabhovtsh':
			if (branch.getBoolPref("tabtextsh_hov")) classicthemerestorerjs.ctr.loadUnloadCSS("tabtextsh_hov",true);
		  break;
		  
		  case 'ctabacttsh':
			if (branch.getBoolPref("tabtextsh_act")) classicthemerestorerjs.ctr.loadUnloadCSS("tabtextsh_act",true);
		  break;
		  
		  case 'ctabpentsh':
			if (branch.getBoolPref("tabtextsh_pen")) classicthemerestorerjs.ctr.loadUnloadCSS("tabtextsh_pen",true);
		  break;
		  
		  case 'ctabunrtsh':
			if (branch.getBoolPref("tabtextsh_unr")) classicthemerestorerjs.ctr.loadUnloadCSS("tabtextsh_unr",true);
		  break;
		  
		  
		  case "tabfbold_def":
			if (branch.getBoolPref("tabfbold_def")) classicthemerestorerjs.ctr.loadUnloadCSS("tabfbold_def",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("tabfbold_def",false);
		  break;
		  
		  case "tabfbold_act":
			if (branch.getBoolPref("tabfbold_act")) classicthemerestorerjs.ctr.loadUnloadCSS("tabfbold_act",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("tabfbold_act",false);
		  break;

		  case "tabfbold_hov":
			if (branch.getBoolPref("tabfbold_hov")) classicthemerestorerjs.ctr.loadUnloadCSS("tabfbold_hov",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("tabfbold_hov",false);
		  break;
		  
		  case "tabfbold_pen":
			if (branch.getBoolPref("tabfbold_pen")) classicthemerestorerjs.ctr.loadUnloadCSS("tabfbold_pen",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("tabfbold_pen",false);
		  break;
		  
		  case "tabfbold_unr":
			if (branch.getBoolPref("tabfbold_unr")) classicthemerestorerjs.ctr.loadUnloadCSS("tabfbold_unr",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("tabfbold_unr",false);
		  break;

		  case "tabfita_def":
			if (branch.getBoolPref("tabfita_def")) classicthemerestorerjs.ctr.loadUnloadCSS("tabfita_def",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("tabfita_def",false);
		  break;
		  
		  case "tabfita_act":
			if (branch.getBoolPref("tabfita_act")) classicthemerestorerjs.ctr.loadUnloadCSS("tabfita_act",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("tabfita_act",false);
		  break;

		  case "tabfita_hov":
			if (branch.getBoolPref("tabfita_hov")) classicthemerestorerjs.ctr.loadUnloadCSS("tabfita_hov",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("tabfita_hov",false);
		  break;
		  
		  case "tabfita_pen":
			if (branch.getBoolPref("tabfita_pen")) classicthemerestorerjs.ctr.loadUnloadCSS("tabfita_pen",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("tabfita_pen",false);
		  break;
		  
		  case "tabfita_unr":
			if (branch.getBoolPref("tabfita_unr")) classicthemerestorerjs.ctr.loadUnloadCSS("tabfita_unr",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("tabfita_unr",false);
		  break;

		  // Special
		  case "paneluibtweak":
			if (branch.getBoolPref("paneluibtweak") && classicthemerestorerjs.ctr.fxdefaulttheme==true) {
			  classicthemerestorerjs.ctr.loadUnloadCSS("paneluibtweak",true);
			  if(branch.getCharPref("appbutton")!="appbutton_off") branch.setCharPref("appbutton","appbutton_off");
			}
			  else classicthemerestorerjs.ctr.loadUnloadCSS("paneluibtweak",false);
		  break;
		  
		  case "altmenubar":
			if (branch.getBoolPref("altmenubar") && classicthemerestorerjs.ctr.fxdefaulttheme==true) classicthemerestorerjs.ctr.loadUnloadCSS("altmenubar",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("altmenubar",false);
		  break;
		  
		  case "menubarnofog":
			if (branch.getBoolPref("menubarnofog") && classicthemerestorerjs.ctr.fxdefaulttheme==true) classicthemerestorerjs.ctr.loadUnloadCSS("menubarnofog",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("menubarnofog",false);
		  break;
		  
		  case "notabfog":
			if (branch.getBoolPref("notabfog")) {
				classicthemerestorerjs.ctr.loadUnloadCSS("notabfog",true);
				branch.setBoolPref("alttabstb",false);
			}
			else classicthemerestorerjs.ctr.loadUnloadCSS("notabfog",false);
		  break;
		  
		  case "notabbg":
			if (branch.getBoolPref("notabbg")) {
				classicthemerestorerjs.ctr.loadUnloadCSS("notabbg",true);
				branch.setBoolPref("alttabstb",false);
			}
			else classicthemerestorerjs.ctr.loadUnloadCSS("notabbg",false);
		  break;
		  
		  case "nobookbarbg":
			if (branch.getBoolPref("nobookbarbg") && classicthemerestorerjs.ctr.fxdefaulttheme==true) classicthemerestorerjs.ctr.loadUnloadCSS("nobookbarbg",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("nobookbarbg",false);
		  break;
		  
		  case "nonavbarbg":
			if (branch.getBoolPref("nonavbarbg") && classicthemerestorerjs.ctr.fxdefaulttheme==true) classicthemerestorerjs.ctr.loadUnloadCSS("nonavbarbg",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("nonavbarbg",false);
		  break;
		  
		  case "nonavborder":
			if (branch.getBoolPref("nonavborder") && classicthemerestorerjs.ctr.fxdefaulttheme==true) classicthemerestorerjs.ctr.loadUnloadCSS("nonavborder",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("nonavborder",false);
		  break;
		  
		  case "nonavtbborder":
			if (branch.getBoolPref("nonavtbborder") && classicthemerestorerjs.ctr.fxdefaulttheme==true) classicthemerestorerjs.ctr.loadUnloadCSS("nonavtbborder",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("nonavtbborder",false);
		  break;
		  
		  case "tabmokcolor":
			if (branch.getBoolPref("tabmokcolor") && classicthemerestorerjs.ctr.fxdefaulttheme==true) classicthemerestorerjs.ctr.loadUnloadCSS("tabmokcolor",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("tabmokcolor",false);
		  break;
		  
		  case "tabmokcolor2":
			if (branch.getBoolPref("tabmokcolor2") && classicthemerestorerjs.ctr.fxdefaulttheme==true) classicthemerestorerjs.ctr.loadUnloadCSS("tabmokcolor2",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("tabmokcolor2",false);
		  break;
		  
		  case "tabmokcolor3":
			if (branch.getBoolPref("tabmokcolor3") && classicthemerestorerjs.ctr.fxdefaulttheme==true) classicthemerestorerjs.ctr.loadUnloadCSS("tabmokcolor3",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("tabmokcolor3",false);
		  break;
		  
		  case "closeabarbut":
			if (branch.getBoolPref("closeabarbut")) classicthemerestorerjs.ctr.loadUnloadCSS("closeabarbut",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("closeabarbut",false);
		  break;
		  
		  case "bfurlbarfix":
			if (branch.getBoolPref("bfurlbarfix") && classicthemerestorerjs.ctr.fxdefaulttheme==true) classicthemerestorerjs.ctr.loadUnloadCSS("bfurlbarfix",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("bfurlbarfix",false);

		  break;

		  case "emptyfavicon":
			if (branch.getBoolPref("emptyfavicon")) classicthemerestorerjs.ctr.loadUnloadCSS("emptyfavicon",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("emptyfavicon",false);
		  break;
		  
		  case "hidezoomres":
			if (branch.getBoolPref("hidezoomres")) classicthemerestorerjs.ctr.loadUnloadCSS("hidezoomres",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("hidezoomres",false);
		  break;

		  case "pmhidelabels":
			if (branch.getBoolPref("pmhidelabels")) classicthemerestorerjs.ctr.loadUnloadCSS("pmhidelabels",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("pmhidelabels",false);
		  break;
		  
		  case "menupopupscr":
			if (branch.getBoolPref("menupopupscr")) classicthemerestorerjs.ctr.loadUnloadCSS("menupopupscr",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("menupopupscr",false);
		  break;
		  
		  case "hideprivmask":
			if (branch.getBoolPref("hideprivmask")) classicthemerestorerjs.ctr.loadUnloadCSS("hideprivmask",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("hideprivmask",false);
		  break;

		  case "highaddonsbar":
			if (branch.getBoolPref("highaddonsbar")) classicthemerestorerjs.ctr.loadUnloadCSS("highaddonsbar",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("highaddonsbar",false);
		  break;


		  case "throbberalt":
			if (branch.getBoolPref("throbberalt")) classicthemerestorerjs.ctr.loadUnloadCSS("throbberalt",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("throbberalt",false);
		  break;
		  
		  // reverse option to match other animation preference labels
		  case "bmanimation":
			if (branch.getBoolPref("bmanimation")) classicthemerestorerjs.ctr.loadUnloadCSS("bmanimation",false);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("bmanimation",true);
		  break;
		  
		  case "pananimation":
			if (branch.getBoolPref("pananimation")) classicthemerestorerjs.ctr.loadUnloadCSS("pananimation",false);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("pananimation",true);
		  break;
		  // end reverse...
		  
		  case "showtabclose":
		  
			var def_tcw = Components.classes["@mozilla.org/preferences-service;1"]
						  .getService(Components.interfaces.nsIPrefService)
							.getBranch("browser.tabs.").getIntPref("tabClipWidth") == 140;
							
			if (branch.getBoolPref("showtabclose")) {
			  // if we allow tabs to have a reduced min-width, browser.tabs.tabClipWidth
			  // requires a smaller value
			  Components.classes["@mozilla.org/preferences-service;1"]
				.getService(Components.interfaces.nsIPrefService)
				  .getBranch("browser.tabs.").setIntPref("tabClipWidth",1);
			}
			else {
				// set browser.tabs.tabClipWidth back to default
				if (def_tcw==false) {
				  Components.classes["@mozilla.org/preferences-service;1"]
					.getService(Components.interfaces.nsIPrefService)
					  .getBranch("browser.tabs.").setIntPref("tabClipWidth",140);
				}
			}
		  break;
		  
		  case "dblclnewtab":
			
			var oswindows = Components.classes["@mozilla.org/xre/app-info;1"]
								  .getService(Components.interfaces.nsIXULRuntime).OS=="WINNT";
			if (branch.getBoolPref("dblclnewtab") && oswindows==true) {
			  
				document.getElementById("TabsToolbar").ondblclick = e=>{
				  // cases where double click should not open a new tab
				  if(e.button==0 && e.target.localName != "tab"
				    && e.target.localName != "toolbarbutton"
					  && e.target.localName != "arrowscrollbox"
						&& e.originalTarget.getAttribute("anonid") != "scrollbutton-up"
						  && e.originalTarget.getAttribute("anonid") != "scrollbutton-down"
							&& e.originalTarget.getAttribute("anonid") != "close-button"){

					BrowserOpenTab();
						
					e.stopPropagation();
					e.preventDefault();
				  }
				  document.getElementById('urlbar').focus();
				}
				
			}
			else if (branch.getBoolPref("dblclnewtab") && oswindows==false) {
			  classicthemerestorerjs.ctr.loadUnloadCSS("dblclnewtab",true);
			}
			else {
			  document.getElementById("TabsToolbar").ondblclick = e=>{};
			  classicthemerestorerjs.ctr.loadUnloadCSS("dblclnewtab",false);
			}
		  break;
		  
		  case "dblclclosefx":
		    try{
				if (branch.getBoolPref("dblclclosefx")) {
				
					setTimeout(function(){
					  try{
						var mWindows = Components.classes["@mozilla.org/embedcomp/window-watcher;1"]  
										.getService(Components.interfaces.nsIWindowWatcher).getWindowEnumerator();
						while (mWindows.hasMoreElements()) {
						  var mNextWindow=mWindows.getNext();
						  mNextWindow.document.getElementById('ctraddon_appbutton2').addEventListener('dblclick',mNextWindow.BrowserTryToCloseWindow, false);
						}
					  } catch(e) { }

					},350);
				}
				else {

					setTimeout(function(){
					  try{
						var mWindows = Components.classes["@mozilla.org/embedcomp/window-watcher;1"]  
										.getService(Components.interfaces.nsIWindowWatcher).getWindowEnumerator();
						while (mWindows.hasMoreElements()) {
						  var mNextWindow=mWindows.getNext();
						  mNextWindow.document.getElementById('ctraddon_appbutton2').removeEventListener('dblclick',mNextWindow.BrowserTryToCloseWindow, false);
						}
					  } catch(e) { }
					
					},350);
				}
		    } catch(e) { }
		  break;
		  
		  case "hightabpososx":
			if (branch.getBoolPref("hightabpososx") && classicthemerestorerjs.ctr.fxdefaulttheme==true){
			  classicthemerestorerjs.ctr.loadUnloadCSS("hightabpososx",true);
			  branch.setBoolPref("appbutmhi",false);
			}
			else classicthemerestorerjs.ctr.loadUnloadCSS("hightabpososx",false);
		  break;
		  
		  case "alttabstb":
			if (branch.getBoolPref("alttabstb") && classicthemerestorerjs.ctr.fxdefaulttheme==true) {
			  classicthemerestorerjs.ctr.loadUnloadCSS("alttabstb",true);
			  branch.setBoolPref("notabfog",false);
			  branch.setBoolPref("notabbg",false);
			}
			else classicthemerestorerjs.ctr.loadUnloadCSS("alttabstb",false);
		  break;

		  case "cpanelmenus":
			if (branch.getBoolPref("cpanelmenus")) classicthemerestorerjs.ctr.loadUnloadCSS("cpanelmenus",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("cpanelmenus",false);
		  break;

		  case "panelmenucol":
			if (branch.getBoolPref("panelmenucol") && classicthemerestorerjs.ctr.fxdefaulttheme==true) classicthemerestorerjs.ctr.loadUnloadCSS("panelmenucol",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("panelmenucol",false);
		  break;
		  
		  //inv icons START
		  case "invicomenubar":
			if (branch.getBoolPref("invicomenubar") && classicthemerestorerjs.ctr.fxdefaulttheme==true) classicthemerestorerjs.ctr.loadUnloadCSS("invicomenubar",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("invicomenubar",false);
		  break;
		  
		  case "invicotabsbar":
			if (branch.getBoolPref("invicotabsbar") && classicthemerestorerjs.ctr.fxdefaulttheme==true) classicthemerestorerjs.ctr.loadUnloadCSS("invicotabsbar",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("invicotabsbar",false);
		  break;
		  
		  case "inviconavbar":
			if (branch.getBoolPref("inviconavbar") && classicthemerestorerjs.ctr.fxdefaulttheme==true) classicthemerestorerjs.ctr.loadUnloadCSS("inviconavbar",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("inviconavbar",false);
		  break;

		  case "invicoextrabar":
			if (branch.getBoolPref("invicoextrabar") && classicthemerestorerjs.ctr.fxdefaulttheme==true) classicthemerestorerjs.ctr.loadUnloadCSS("invicoextrabar",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("invicoextrabar",false);
		  break;
		  
		  case "invicobookbar":
			if (branch.getBoolPref("invicobookbar") && classicthemerestorerjs.ctr.fxdefaulttheme==true) classicthemerestorerjs.ctr.loadUnloadCSS("invicobookbar",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("invicobookbar",false);
		  break;
		  //inv icons END
		  
		  case "toolsitem":
		  
		  	var osString = Components.classes["@mozilla.org/xre/app-info;1"].getService(Components.interfaces.nsIXULRuntime).OS;
			
			// for Windows & Linux
			if (osString!="Darwin"){
				if (branch.getBoolPref("toolsitem")) classicthemerestorerjs.ctr.loadUnloadCSS("toolsitem",false);
				  else classicthemerestorerjs.ctr.loadUnloadCSS("toolsitem",true);
			}
			
			// for MacOSX: hide item using js instead of css or it won't work
			if (osString=="Darwin"){
				if (branch.getBoolPref("toolsitem")) {
					setTimeout(function(){
					  try{
						document.getElementById("ctraddon_tools_menu_entry").collapsed = false;
					  } catch(e){}
					},500);
				}
				else {
				  setTimeout(function(){
					try{
					  document.getElementById("ctraddon_tools_menu_entry").collapsed = true;
					} catch(e){}
				  },500);
				}
			}
		  break;

		  case "appmenuitem":
			if (branch.getBoolPref("appmenuitem")) classicthemerestorerjs.ctr.loadUnloadCSS("appmenuitem",false);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("appmenuitem",true);
		  break;
		  
		  case "cuibuttons":
			if (branch.getBoolPref("cuibuttons")) classicthemerestorerjs.ctr.loadUnloadCSS("cuibuttons",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("cuibuttons",false);
		  break;
		}
	  }
	);

	ctrSettingsListener.register(true);
	
	var ctrSettingsListener_forCTB = new PrefListener(
	  "extensions.cstbb-extension.",
	  function(branch, name) {
		switch (name) {

		  case "navbarbuttons":
			if (branch.getCharPref("navbarbuttons")!="nabbuttons_off") {
				classicthemerestorerjs.ctr.prefs.setBoolPref('smallnavbut',false);
				classicthemerestorerjs.ctr.loadUnloadCSS("hidesmallbuttons",true);
			}
			else {
				classicthemerestorerjs.ctr.loadUnloadCSS("hidesmallbuttons",false);
			}
		  break;
		}
	  }
	);
	
	ctrSettingsListener_forCTB.register(true);

  },

  // 'getElementById' would return wrongly 'null' for items on toolbar palette
  ctrGetId: function(id) {
	return document.getElementById(id) || window.gNavToolbox.palette.querySelector("#" + id);
  },
   
  // show backForwardMenu popup for CTRs back/forward buttons 'mouse hold event'
  ctrBackMenuShow: function(anchorElem) {
  
   if(this.prefs.getBoolPref("hide_bf_popup")==false) {
	var timeoutID;
	
	timeoutID = window.setTimeout(
	  function(){
		document.getElementById("backForwardMenu").openPopupAtScreen(anchorElem.boxObject.screenX, anchorElem.boxObject.screenY+anchorElem.boxObject.height-1, false);
	  }, 600);

	anchorElem.onmouseup = function() {
	  window.clearTimeout(timeoutID);
	}
   }
  },
  
  addonCompatibilityImprovements: function() {
	// 'ThePuzzlePiece' add-on: check to not enable CTRs space/separator styles while add-on is enabled
	var TPPListener = {
	   onEnabled: function(addon) {
		  if(addon.id == 'thePuzzlePiece@quicksaver') { classicthemerestorerjs.ctr.loadUnloadCSS("spaces_extra",false); }
	   },
	   onDisabled: function(addon) {
		  if(addon.id == 'thePuzzlePiece@quicksaver') { classicthemerestorerjs.ctr.loadUnloadCSS("spaces_extra",true); }
	   }
	};
	AddonManager.addAddonListener(TPPListener);
	
	AddonManager.getAddonByID('thePuzzlePiece@quicksaver', function(addon) {
	   if(addon && addon.isActive) { classicthemerestorerjs.ctr.loadUnloadCSS("spaces_extra",false); }
	    else { classicthemerestorerjs.ctr.loadUnloadCSS("spaces_extra",true); }
	});

	// ShowIP add-on fix
	setTimeout(function(){
	  try{
		classicthemerestorerjs.ctr.ctrGetId("status-bar").appendChild(classicthemerestorerjs.ctr.ctrGetId("showip_status_item"));
	  } catch(e){}
	},30);
	// isAdmin add-on fix
	setTimeout(function(){
	  try{
		classicthemerestorerjs.ctr.ctrGetId("status-bar").appendChild(classicthemerestorerjs.ctr.ctrGetId("vdtisadmin_panel"));
	  } catch(e){}
	},50);
	setTimeout(function(){
	  try{
		classicthemerestorerjs.ctr.ctrGetId("ctraddon_addon-bar").appendChild(classicthemerestorerjs.ctr.ctrGetId("vdtisadmin_button"));
	  } catch(e){}
	},50);
	//Aniweather add-on fix
	setTimeout(function(){
	  try{
		classicthemerestorerjs.ctr.ctrGetId("status-bar").appendChild(classicthemerestorerjs.ctr.ctrGetId("aniweather_canvas"));
	  } catch(e){}
	},300);
	
	// remove CTR window controls extra for Linux and MacOSX
	setTimeout(function(){
	  try{
		var osString = Components.classes["@mozilla.org/xre/app-info;1"].getService(Components.interfaces.nsIXULRuntime).OS;
		if(osString!="WINNT")
		  classicthemerestorerjs.ctr.ctrGetId("ctraddon_window-controls")
			.parentNode.removeChild(classicthemerestorerjs.ctr.ctrGetId("ctraddon_window-controls"));
	  } catch(e){}
	},300);

  },
  
  disableTMPTabColors: function(){
	// TMPs/TUs colors for rounded tabs in Fx29+ are not compatible with CTRs (squared) tabs.
	// This just disables TMPs/TUs non-compatible tab color options.
	try{
	  var tmpprefs = Components.classes["@mozilla.org/preferences-service;1"]
						.getService(Components.interfaces.nsIPrefService).getBranch("extensions.tabmix.");
	  if(tmpprefs.getBoolPref("currentTab")) tmpprefs.setBoolPref("currentTab",false);
	  if(tmpprefs.getBoolPref("unloadedTab")) tmpprefs.setBoolPref("unloadedTab",false);
	  if(tmpprefs.getBoolPref("unreadTab")) tmpprefs.setBoolPref("unreadTab",false);
	  if(tmpprefs.getBoolPref("otherTab")) tmpprefs.setBoolPref("otherTab",false);
	} catch(e){}

	try{
	  var tuprefs = Components.classes["@mozilla.org/preferences-service;1"]
						.getService(Components.interfaces.nsIPrefService).getBranch("extensions.tabutils.");
	  if(tuprefs.getBoolPref("highlightCurrent")) tuprefs.setBoolPref("highlightCurrent",false);
	  if(tuprefs.getBoolPref("highlightRead")) tuprefs.setBoolPref("highlightRead",false);
	  if(tuprefs.getBoolPref("highlightSelected")) tuprefs.setBoolPref("highlightSelected",false);
	  if(tuprefs.getBoolPref("highlightUnloaded")) tuprefs.setBoolPref("highlightUnloaded",false);
	  if(tuprefs.getBoolPref("highlightUnread")) tuprefs.setBoolPref("highlightUnread",false);
	} catch(e){}
  },
 
  // attach appmenu to currently used appbutton (on titlebar or on toolbar)
  openCtrAppmenuPopup: function(anchorElem) {
	var app_popup = this.ctrGetId('appmenu-popup');
	  
	app_popup.addEventListener("popupshown",  onCtrAppmenuPopup, false);
	app_popup.addEventListener("popuphidden", onCtrAppmenuPopup, false);

	app_popup.openPopupAtScreen(anchorElem.boxObject.screenX, anchorElem.boxObject.screenY+anchorElem.boxObject.height-1, false);
	  
	function onCtrAppmenuPopup(event){
	
	  var oswindows = Components.classes["@mozilla.org/xre/app-info;1"]
						.getService(Components.interfaces.nsIXULRuntime).OS=="WINNT";
	
	  if (event.target != classicthemerestorerjs.ctr.ctrGetId("appmenu-popup")) return;
	  if(event.type == "popupshown"){
		classicthemerestorerjs.ctr.ctrGetId('ctraddon_appbutton').setAttribute("open", "true");
		if (oswindows) classicthemerestorerjs.ctr.ctrGetId('ctraddon_appbutton2').setAttribute("open", "true");
		 if(classicthemerestorerjs.ctr.ctrGetId('ctraddon_appbutton').parentNode.id=="nav-bar-customization-target"
		      && (classicthemerestorerjs.ctr.prefs.getCharPref("appbutton")=="appbutton_v1"
			    || classicthemerestorerjs.ctr.prefs.getCharPref("appbutton")=="appbutton_v1wt"))
		  document.getElementById('main-window').setAttribute("ctraddon_appbutton_on_navbar", "true");
		 if(classicthemerestorerjs.ctr.ctrGetId('ctraddon_appbutton').parentNode.id=="ctraddon_addon-bar"
		      && (classicthemerestorerjs.ctr.prefs.getCharPref("appbutton")=="appbutton_v1"
			    || classicthemerestorerjs.ctr.prefs.getCharPref("appbutton")=="appbutton_v1wt"))
		  document.getElementById('main-window').setAttribute("ctraddon_appbutton_on_addonbar", "true");
		
	  }else if( event.type == "popuphidden" ){
		classicthemerestorerjs.ctr.ctrGetId('ctraddon_appbutton').removeAttribute("open");
		if (oswindows) classicthemerestorerjs.ctr.ctrGetId('ctraddon_appbutton2').removeAttribute("open");
		if(classicthemerestorerjs.ctr.ctrGetId('ctraddon_appbutton').parentNode.id=="nav-bar-customization-target"
		    && (classicthemerestorerjs.ctr.prefs.getCharPref("appbutton")=="appbutton_v1"
		      || classicthemerestorerjs.ctr.prefs.getCharPref("appbutton")=="appbutton_v1wt"))
		  document.getElementById('main-window').removeAttribute("ctraddon_appbutton_on_navbar");
		 if(classicthemerestorerjs.ctr.ctrGetId('ctraddon_appbutton').parentNode.id=="ctraddon_addon-bar"
		      && (classicthemerestorerjs.ctr.prefs.getCharPref("appbutton")=="appbutton_v1"
			    || classicthemerestorerjs.ctr.prefs.getCharPref("appbutton")=="appbutton_v1wt"))
		  document.getElementById('main-window').removeAttribute("ctraddon_appbutton_on_addonbar");
	  }
	}
  },

  // disable preferences which are not usable with third party themes  
  disableSettingsforThemes: function() {

	if (!this.fxdefaulttheme) {
		this.prefs.setBoolPref('tabcolor_def',false);
		this.prefs.setBoolPref('tabcolor_act',false);
		this.prefs.setBoolPref('tabcolor_unr',false);
		this.prefs.setBoolPref('tabcolor_pen',false);
		this.prefs.setBoolPref('tabcolor_hov',false);
		this.prefs.setBoolPref('ntabcolor_def',false);
		this.prefs.setBoolPref('ntabcolor_hov',false);
		
		if (this.prefs.getCharPref('nav_txt_ico')=='iconsbig') {
			this.prefs.setCharPref('nav_txt_ico','icons');
		}
	}
  },
  
  updateTabWidth: function() {
	// replace tabs min/max-width rules instead of overriding them
	// to improve compatibility and prevent tab resizing bug
	function findCSSRule(selector) {
	  var ruleIndex = -1;
	  var i=0;
	  var theRules = document.styleSheets[0].cssRules;
	   for (i=0; i<theRules.length; i++) {
		 if (theRules[i].selectorText == selector) {
		  ruleIndex = i;
		  break;
		 }
	   }
	  return ruleIndex;
	}
	
	try {
		var theRule = document.styleSheets[0].cssRules[findCSSRule('.tabbrowser-tab:not([pinned])')];
		theRule.style.maxWidth=""+classicthemerestorerjs.ctr.prefs.getIntPref('ctabwidth')+"px";
		theRule.style.minWidth=""+classicthemerestorerjs.ctr.prefs.getIntPref('ctabmwidth')+"px";
	} catch(e){}
	
	/* logging */
	/*try {
		var style_rules = document.styleSheets[0].cssRules;
		console.log(style_rules);
	} catch(e) {}*/
  },

  // star-button in urlbar: move bookmarks button into 'urlbar-icons' container and remove 'dropmarker' menu
  moveStarButtonIntoUrbar: function() {

	if (this.prefs.getBoolPref('starinurl')) {
		
		classicthemerestorerjs.ctr.loadUnloadCSS("starinurl",true);
		
		// needs timeout to prevent issues with add-ons, which insert own (h-)boxes into
		// urlbar instead of using 'urlbar-icons' node (e.g. 'Rss icon in Awesomebar' add-on)
		setTimeout(function(){
			try{
				CustomizableUI.addWidgetToArea("bookmarks-menu-button", CustomizableUI.AREA_NAVBAR);
				CustomizableUI.moveWidgetWithinArea("bookmarks-menu-button",0);
				document.getElementById("urlbar-icons").insertBefore(classicthemerestorerjs.ctr.ctrGetId("bookmarks-menu-button"), null);
			} catch(e){}
		},500);

	}
  },
  
  /* enable/disable css sheets*/
  loadUnloadCSS: function(which,enable) {
	
	const ios = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
	
	switch (which) {
	
		case "tabs_squared":
	
			var osString = Components.classes["@mozilla.org/xre/app-info;1"].getService(Components.interfaces.nsIXULRuntime).OS;

			// different appearance for 'tabs not on top' on MacOSX
			if (osString=="Darwin"){
		
				// enable 'tabs not on top' sheets already here to prevent glitches
				if (enable==true && this.prefs.getCharPref("tabsontop")=='false'){
					manageCSS("tabsontop_off.css");
					manageCSS("tabs_squared-r-osx.css");
				}
				
				if (enable==true && this.prefs.getCharPref("tabsontop")!='false'){
					manageCSS("tabs_squared-osx.css");
				}
		
				if(enable==false){
					manageCSS("tabs_squared-r-osx.css");
					manageCSS("tabs_squared-osx.css");
				}
			} else {
				manageCSS("tabs_squared.css");
			}
		
		break;
		
		case "tabs_squaredc2":
			manageCSS("tabs_squaredc2.css");
		break;
		
		case "tabs_squared2":
	
			var osString = Components.classes["@mozilla.org/xre/app-info;1"].getService(Components.interfaces.nsIXULRuntime).OS;

			// different appearance for 'tabs not on top' on MacOSX
			if (osString=="Darwin"){
		
				// enable 'tabs not on top' sheets already here to prevent glitches
				if (enable==true && this.prefs.getCharPref("tabsontop")=='false'){
					manageCSS("tabsontop_off.css");
					manageCSS("tabs_squared-r-osx2.css");
				}
				
				if (enable==true && this.prefs.getCharPref("tabsontop")!='false'){
					manageCSS("tabs_squared-osx2.css");
				}
				
				if(enable==false){
					manageCSS("tabs_squared-r-osx2.css");
					manageCSS("tabs_squared-osx2.css");
				}
			} else {
				manageCSS("tabs_squared2.css");
			}
		
		break;
		
		case "tabs_curved":
		
			var osString = Components.classes["@mozilla.org/xre/app-info;1"].getService(Components.interfaces.nsIXULRuntime).OS;
			
			// different appearance for 'tabs not on top' on MacOSX
			if (osString=="Darwin"){
		
				// enable 'tabs not on top' sheets already here to prevent glitches
				if (enable==true && this.prefs.getCharPref("tabsontop")=='false'){
					manageCSS("tabsontop_off.css");
					manageCSS("tabs_curved-r-osx.css");
				}
				
				if (enable==true && this.prefs.getCharPref("tabsontop")!='false'){
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
		
		case "tabsotoff2":
		
			manageCSS("tabsontop_off2.css");
			
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
		
		case "closetab_active": 		manageCSS("closetab_active.css");  		break;
		case "closetab_none": 			manageCSS("closetab_none.css");  		break;
		case "closetab_tb_end": 		manageCSS("closetab_tb_end.css");  		break;
		case "closetab_tb_start": 		manageCSS("closetab_tb_start.css");  	break;
		
		case "smallnavbut":
			
			// no small button mode when 'icons + text' mode is used
			if (enable==true && this.prefs.getCharPref("nav_txt_ico")=="iconstxt"){
				enable=false;
			}
			else if (enable==true && this.prefs.getCharPref("nav_txt_ico")=="iconstxt2"){
				enable=false;
			}
	
			manageCSS("smallnavbut.css");
			
			manageCSS("urlbarborderfocus.css");
			
			this.loadUnloadCSS('cui_buttons',true);

		break;
		
		case "findbar_top": 		manageCSS("findbar_top.css");  			break;
		case "findbar_bottom": 		manageCSS("findbar_bottom.css");  		break;
		case "findbar_topa": 		manageCSS("findbar_top_alt.css"); 		break;
		case "findbar_bottoma": 	manageCSS("findbar_bottom_alt.css");	break;

		case "appbutton_v1":		manageCSS("appbutton.css");				break;
		case "appbutton_v1wt":		manageCSS("appbutton_wt.css");			break;
		case "appbutton_v2":		manageCSS("appbutton2wt.css");			break;
		case "appbutton_v2wt2":		manageCSS("appbutton2wt2.css");			break;
		case "appbutton_v2io":		manageCSS("appbutton2io.css");			break;
		case "appbutton_v2io2":		manageCSS("appbutton2io2.css");			break;
		
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
			this.loadUnloadCSS('cui_buttons',true);
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
		
		case "iconsbig":
			
			if(this.fxdefaulttheme) manageCSS("mode_icons_big.css");
		
		break;
		
		case "appbuttonc_orange":	manageCSS("appbutton_orange.css");		break;
		case "appbuttonc_aurora":	manageCSS("appbutton_aurora.css");		break;
		case "appbuttonc_nightly":	manageCSS("appbutton_nightly.css");		break;
		case "appbuttonc_transp":	manageCSS("appbutton_transparent.css");	break;
		case "appbuttonc_palemo":	manageCSS("appbutton_palemoon.css");	break;
		case "appbuttonc_red":		manageCSS("appbutton_red.css");			break;
		case "appbuttonc_green":	manageCSS("appbutton_green.css");		break;
		case "appbuttonc_gray":		manageCSS("appbutton_gray.css");		break;
		case "appbuttonc_purple":	manageCSS("appbutton_purple.css");		break;
		case "appbuttonc_white":	manageCSS("appbutton_white.css");		break;

		case "alttbappb": 			manageCSS("alt_appbutton_icons.css");	break;
		case "appbutmhi": 			manageCSS("appbuthigherposition.css");  break;
		case "appbutbdl": 			manageCSS("appbutton_borderless.css");  break;
		
		case "hidenavbar": 			manageCSS("hidenavbar.css");  			break;
		case "backforward":			manageCSS("back-forward.css");			break;
		case "wincontrols": 		manageCSS("windowcontrols.css");		break;
		case "starinurl":			manageCSS("starinurl.css");				break;
		case "statusbar": 			manageCSS("statusbar.css"); 			break;
		case "hideurelstop": 		manageCSS("hideurlbarrelstop.css"); 	break;
		case "combrelstop":			manageCSS("combrelstop.css");			break;
		case "panelmenucol": 		manageCSS("panelmenucolor.css");		break;
		
		case "tabfbold_def":		manageCSS("tab_font_bold_def.css");		break;
		case "tabfbold_act":		manageCSS("tab_font_bold_act.css");		break;
		case "tabfbold_hov":		manageCSS("tab_font_bold_hov.css");		break;
		case "tabfbold_pen":		manageCSS("tab_font_bold_pen.css");		break;
		case "tabfbold_unr":		manageCSS("tab_font_bold_unr.css");		break;
		case "tabfita_def":			manageCSS("tab_font_italic_def.css");	break;
		case "tabfita_act":			manageCSS("tab_font_italic_act.css");	break;
		case "tabfita_hov":			manageCSS("tab_font_italic_hov.css");	break;
		case "tabfita_pen":			manageCSS("tab_font_italic_pen.css");	break;
		case "tabfita_unr":			manageCSS("tab_font_italic_unr.css");	break;

		case "altmenubar": 			manageCSS("menubar.css");				break;
		case "menubarnofog": 		manageCSS("menubar_nofog.css");			break;
		case "notabfog": 			manageCSS("notabfog.css");				break;
		case "notabbg": 			manageCSS("notabbg.css");				break;
		case "nobookbarbg": 		manageCSS("nobookbarbg.css");			break;
		case "nonavbarbg": 			manageCSS("nonavbarbg.css");			break;
		case "nonavborder": 		manageCSS("nonavborder.css");			break;
		case "nonavtbborder": 		manageCSS("nonavtbborder.css");			break;
		case "highaddonsbar": 		manageCSS("higher_addonsbar.css");		break;
		case "hightabpososx": 		manageCSS("higher_tabs_pos.css");		break;
		case "alttabstb": 			manageCSS("alttabstoolbar.css");		break;
		
		case "emptyfavicon": 		manageCSS("empty_favicon.css");			break;
		case "hidezoomres": 		manageCSS("hide_zoomreset.css");		break;
		case "pmhidelabels": 		manageCSS("panelmenu_nolabels.css");	break;
		case "menupopupscr": 		manageCSS("menupopupscrollbar.css");	break;
		case "hideprivmask": 		manageCSS("hideprivatemask.css");		break;
		case "bfurlbarfix": 		manageCSS("bf_urlbarfix.css");			break;
		
		case "invicomenubar": 		manageCSS("invicons_menubar.css");		break;
		case "invicotabsbar": 		manageCSS("invicons_tabsbar.css");		break;
		case "inviconavbar": 		manageCSS("invicons_navbar.css");		break;
		case "invicoextrabar": 		manageCSS("invicons_extrabar.css");		break;
		case "invicobookbar": 		manageCSS("invicons_bookmarksbar.css");	break;

		case "tabmokcolor": 		manageCSS("tabmokcolor.css");			break;
		case "tabmokcolor2": 		manageCSS("tabmokcolor2.css");			break;
		case "tabmokcolor3": 		manageCSS("tabmokcolor3.css");			break;
		
		case "paneluibtweak": 		manageCSS("paneluibutton_tweak.css");	break;
		case "dblclnewtab": 		manageCSS("dblclnewtab.css");			break;
		
		case "throbberalt": 		manageCSS("throbberalt.css");			break;
		case "bmanimation": 		manageCSS("hidebmanimation.css");		break;
		case "pananimation": 		manageCSS("hidepanelanimation.css");	break;
		case "cpanelmenus": 		manageCSS("compactpanelmenus.css");		break;
		
		case "closeabarbut": 		manageCSS("closeabarbut.css");			break;
		case "appmenuitem": 		manageCSS("ctraddon_appmenuitem.css");	break;
		case "toolsitem": 			manageCSS("ctraddon_toolsitem.css");	break;
		case "cuibuttons":			manageCSS("cuibuttons.css");			break;
		
		case "spaces_extra": 		manageCSS("spaces_extra.css");			break;
		
		case "hidesmallbuttons": 	manageCSS("hidesmallbuttons.css");		break;
		
		case "tabcolor_def":

			removeOldSheet(this.ctabsheet_def);
			
			if(enable==true){
			
				if (this.prefs.getCharPref('tabs')=='tabs_squared') {
				
					this.ctabsheet_def=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab:not([selected="true"]):not(:hover) {\
						  background-image: linear-gradient('+this.prefs.getCharPref('ctab1')+','+this.prefs.getCharPref('ctab2')+') !important;\
						}\
					'), null, null);
				
				}
				
				else if (this.prefs.getCharPref('tabs')=='tabs_squaredc2') {
				
					this.ctabsheet_def=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab .tab-content {\
						  background-image: linear-gradient('+this.prefs.getCharPref('ctab1')+','+this.prefs.getCharPref('ctab2')+') !important;\
						}\
					'), null, null);
				
				}
		
				else if (this.prefs.getCharPref('tabs')=='tabs_curved') {
				
					this.ctabsheet_def=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab:not(:-moz-lwtheme):not([selected=true]):not(:hover) .tab-stack .tab-background-middle,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab:not(:-moz-lwtheme):not([selected=true]):not(:hover) .tab-background-start,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab:not(:-moz-lwtheme):not([selected=true]):not(:hover) .tab-background-end{\
						  background-image: linear-gradient(transparent, transparent 2px, '+this.prefs.getCharPref('ctab1')+' 0px, '+this.prefs.getCharPref('ctab2')+'), none !important;\
						}\
					'), null, null);
				
				}

				applyNewSheet(this.ctabsheet_def);
			}

		break;
		
		case "tabcolor_act":

			removeOldSheet(this.ctabsheet_act);
			
			if(enable==true){
		
				if (this.prefs.getCharPref('tabs')=='tabs_squared') {
				
					this.ctabsheet_act=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[selected="true"] {\
						  background-image: linear-gradient('+this.prefs.getCharPref('ctabact1')+','+this.prefs.getCharPref('ctabact2')+') !important;\
						}\
					'), null, null);
				
				}
				
				else if (this.prefs.getCharPref('tabs')=='tabs_squaredc2') {
				
					this.ctabsheet_act=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[selected] .tab-content {\
						  background-image: linear-gradient('+this.prefs.getCharPref('ctabact1')+','+this.prefs.getCharPref('ctabact2')+') !important;\
						}\
					'), null, null);
				
				}
				
				else if (this.prefs.getCharPref('tabs')=='tabs_squared2') {
				
					this.ctabsheet_act=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[selected="true"] {\
						  background-image: linear-gradient('+this.prefs.getCharPref('ctabact1')+','+this.prefs.getCharPref('ctabact2')+') !important;\
						}\
					'), null, null);
				
				}
				
				else if (this.prefs.getCharPref('tabs')=='tabs_curved') {
				
					this.ctabsheet_act=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar:not(:-moz-lwtheme) .tab-background-start[selected=true]:-moz-locale-dir(ltr)::before,\
						#main-window #navigator-toolbox #TabsToolbar:not(:-moz-lwtheme) .tab-background-end[selected=true]:-moz-locale-dir(rtl)::before {\
						  background-image: url(chrome://browser/skin/tabbrowser/tab-stroke-start.png),linear-gradient(transparent, transparent 2px,'+this.prefs.getCharPref('ctabact1')+' 2px, '+this.prefs.getCharPref('ctabact2')+') !important;\
						  clip-path: url(chrome://browser/content/browser.xul#tab-curve-clip-path-start) !important;\
						}\
						#main-window #navigator-toolbox #TabsToolbar:not(:-moz-lwtheme) .tab-background-end[selected=true]:-moz-locale-dir(ltr)::before,\
						#main-window #navigator-toolbox #TabsToolbar:not(:-moz-lwtheme) .tab-background-start[selected=true]:-moz-locale-dir(rtl)::before {\
						  background-image: url(chrome://browser/skin/tabbrowser/tab-stroke-end.png),linear-gradient(transparent, transparent 2px,'+this.prefs.getCharPref('ctabact1')+' 2px, '+this.prefs.getCharPref('ctabact2')+') !important;\
						  clip-path: url(chrome://browser/content/browser.xul#tab-curve-clip-path-end) !important;\
						}\
						#main-window #navigator-toolbox #TabsToolbar:not(:-moz-lwtheme) .tab-background-middle[selected=true]  {\
						  background-color: transparent !important;\
						  background-image: url(chrome://browser/skin/tabbrowser/tab-active-middle.png),linear-gradient(transparent, transparent 2px,'+this.prefs.getCharPref('ctabact1')+' 2px, '+this.prefs.getCharPref('ctabact2')+'), none !important;\
						}\
					'), null, null);
				
				}
				
				else if (this.prefs.getCharPref('tabs')=='tabs_default') {
				
					this.ctabsheet_act=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar:not(:-moz-lwtheme) .tab-background-start[selected=true]:-moz-locale-dir(ltr)::before,\
						#main-window #navigator-toolbox #TabsToolbar:not(:-moz-lwtheme) .tab-background-end[selected=true]:-moz-locale-dir(rtl)::before {\
						  background-image: url(chrome://browser/skin/tabbrowser/tab-stroke-start.png),linear-gradient(transparent, transparent 2px,'+this.prefs.getCharPref('ctabact1')+' 2px, '+this.prefs.getCharPref('ctabact2')+') !important;\
						  clip-path: url(chrome://browser/content/browser.xul#tab-curve-clip-path-start) !important;\
						}\
						#main-window #navigator-toolbox #TabsToolbar:not(:-moz-lwtheme) .tab-background-end[selected=true]:-moz-locale-dir(ltr)::before,\
						#main-window #navigator-toolbox #TabsToolbar:not(:-moz-lwtheme) .tab-background-start[selected=true]:-moz-locale-dir(rtl)::before {\
						  background-image: url(chrome://browser/skin/tabbrowser/tab-stroke-end.png),linear-gradient(transparent, transparent 2px,'+this.prefs.getCharPref('ctabact1')+' 2px, '+this.prefs.getCharPref('ctabact2')+') !important;\
						  clip-path: url(chrome://browser/content/browser.xul#tab-curve-clip-path-end) !important;\
						}\
						#main-window #navigator-toolbox #TabsToolbar:not(:-moz-lwtheme) .tab-background-middle[selected=true]  {\
						  background-color: transparent !important;\
						  background-image: url(chrome://browser/skin/tabbrowser/tab-active-middle.png),linear-gradient(transparent, transparent 2px,'+this.prefs.getCharPref('ctabact1')+' 2px, '+this.prefs.getCharPref('ctabact2')+'), none !important;\
						}\
					'), null, null);
				
				}
				
				applyNewSheet(this.ctabsheet_act);
			}

		break;

		case "tabcolor_hov":

			removeOldSheet(this.ctabsheet_hov);
			
			if(enable==true){
		
				if (this.prefs.getCharPref('tabs')=='tabs_squared') {
				
					this.ctabsheet_hov=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab:not([selected="true"]):hover {\
						  background-image: linear-gradient('+this.prefs.getCharPref('ctabhov1')+','+this.prefs.getCharPref('ctabhov2')+') !important;\
						}\
					'), null, null);
				
				}
				
				else if (this.prefs.getCharPref('tabs')=='tabs_squaredc2') {
				
					this.ctabsheet_hov=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab:not([selected]):hover .tab-content {\
						  background-image: linear-gradient('+this.prefs.getCharPref('ctabhov1')+','+this.prefs.getCharPref('ctabhov2')+') !important;\
						}\
					'), null, null);
				
				}
							
				else if (this.prefs.getCharPref('tabs')=='tabs_curved') {
				
					this.ctabsheet_hov=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab:not(:-moz-lwtheme):not([selected=true]):hover .tab-stack .tab-background-middle,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab:not(:-moz-lwtheme):not([selected=true]):hover .tab-background-start,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab:not(:-moz-lwtheme):not([selected=true]):hover .tab-background-end {\
						  background-image: linear-gradient(transparent, transparent 2px, '+this.prefs.getCharPref('ctabhov1')+' 0px, '+this.prefs.getCharPref('ctabhov2')+'), none !important;\
						}\
					'), null, null);
				
				}

				applyNewSheet(this.ctabsheet_hov);
			}

		break;
		
		case "tabcolor_pen":

			removeOldSheet(this.ctabsheet_pen);
			
			if(enable==true){
		
				if (this.prefs.getCharPref('tabs')=='tabs_squared') {
				
					this.ctabsheet_pen=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[pending]:not([selected="true"]):not(:hover) {\
						  background-image: linear-gradient('+this.prefs.getCharPref('ctabpen1')+','+this.prefs.getCharPref('ctabpen2')+') !important;\
						}\
					'), null, null);
				
				}
				
				else if (this.prefs.getCharPref('tabs')=='tabs_squaredc2') {
				
					this.ctabsheet_pen=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[pending]:not([selected="true"]):not(:hover) .tab-content {\
						  background-image: linear-gradient('+this.prefs.getCharPref('ctabpen1')+','+this.prefs.getCharPref('ctabpen2')+') !important;\
						}\
					'), null, null);
				
				}
				
				else if (this.prefs.getCharPref('tabs')=='tabs_curved') {
				
					this.ctabsheet_pen=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[pending]:not(:-moz-lwtheme):not([selected=true]):not(:hover) .tab-stack .tab-background-middle,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[pending]:not(:-moz-lwtheme):not([selected=true]):not(:hover) .tab-background-start,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[pending]:not(:-moz-lwtheme):not([selected=true]):not(:hover) .tab-background-end {\
						  background-image: linear-gradient(transparent, transparent 2px, '+this.prefs.getCharPref('ctabpen1')+' 0px, '+this.prefs.getCharPref('ctabpen2')+'), none !important;\
						}\
					'), null, null);
				
				}
				
				applyNewSheet(this.ctabsheet_pen);
			}

		break;

		case "tabcolor_unr":

			removeOldSheet(this.ctabsheet_unr);
			
			if(enable==true){
		
				if (this.prefs.getCharPref('tabs')=='tabs_squared') {
				
					this.ctabsheet_unr=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[unread]:not([selected="true"]):not(:hover) {\
						  background-image: linear-gradient('+this.prefs.getCharPref('ctabunr1')+','+this.prefs.getCharPref('ctabunr2')+') !important;\
						}\
					'), null, null);
				
				}
				
				else if (this.prefs.getCharPref('tabs')=='tabs_squaredc2') {
				
					this.ctabsheet_unr=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[unread]:not([selected="true"]):not(:hover) .tab-content {\
						  background-image: linear-gradient('+this.prefs.getCharPref('ctabunr1')+','+this.prefs.getCharPref('ctabunr2')+') !important;\
						}\
					'), null, null);
				
				}
				
				else if (this.prefs.getCharPref('tabs')=='tabs_curved') {
				
					this.ctabsheet_unr=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[unread]:not(:-moz-lwtheme):not([selected=true]):not(:hover) .tab-stack .tab-background-middle,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[unread]:not(:-moz-lwtheme):not([selected=true]):not(:hover) .tab-background-start,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[unread]:not(:-moz-lwtheme):not([selected=true]):not(:hover) .tab-background-end {\
						  background-image: linear-gradient(transparent, transparent 2px, '+this.prefs.getCharPref('ctabunr1')+' 0px, '+this.prefs.getCharPref('ctabunr2')+'), none !important;\
						}\
					'), null, null);
				
				}
				
				applyNewSheet(this.ctabsheet_unr);
			}

		break;

		case "ntabcolor_def":

			removeOldSheet(this.cntabsheet_def);
			
			if(enable==true){
		
				if (this.prefs.getCharPref('tabs')=='tabs_squared') {
				
					this.cntabsheet_def=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar .tabs-newtab-button {\
						  background-image: linear-gradient('+this.prefs.getCharPref('cntab1')+','+this.prefs.getCharPref('cntab2')+') !important;\
						}\
					'), null, null);
				
				}
				
				else if (this.prefs.getCharPref('tabs')=='tabs_squaredc2') {
				
					this.cntabsheet_def=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar .tabs-newtab-button {\
						  background-image: linear-gradient('+this.prefs.getCharPref('cntab1')+','+this.prefs.getCharPref('cntab2')+') !important;\
						}\
					'), null, null);
				
				}

				applyNewSheet(this.cntabsheet_def);
			}

		break;
		
		case "ntabcolor_hov":

			removeOldSheet(this.cntabsheet_hov);
			
			if(enable==true){
		
				if (this.prefs.getCharPref('tabs')=='tabs_squared') {
				
					this.cntabsheet_hov=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar .tabs-newtab-button:hover {\
						  background-image: linear-gradient('+this.prefs.getCharPref('cntabhov1')+','+this.prefs.getCharPref('cntabhov2')+') !important;\
						}\
					'), null, null);
				
				}
				
				else if (this.prefs.getCharPref('tabs')=='tabs_squaredc2') {
				
					this.cntabsheet_hov=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar .tabs-newtab-button:hover {\
						  background-image: linear-gradient('+this.prefs.getCharPref('cntabhov1')+','+this.prefs.getCharPref('cntabhov2')+') !important;\
						}\
					'), null, null);
				
				}

				applyNewSheet(this.cntabsheet_hov);
			}

		break;
		
		case "tabtextc_def":

			removeOldSheet(this.tabtxtcsheet_def);
			
			if(enable==true){
	
				this.tabtxtcsheet_def=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
					#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab:not([selected="true"]):not(:hover) .tab-text {\
					  color: '+this.prefs.getCharPref('ctabt')+' !important;\
					}\
				'), null, null);

				applyNewSheet(this.tabtxtcsheet_def);
			}

		break;
		
		case "tabtextc_act":

			removeOldSheet(this.tabtxtcsheet_act);
			
			if(enable==true){
	
				this.tabtxtcsheet_act=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
					#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[selected="true"] .tab-text {\
					  color: '+this.prefs.getCharPref('ctabactt')+' !important;\
					}\
				'), null, null);

				applyNewSheet(this.tabtxtcsheet_act);
			}

		break;
		
		case "tabtextc_hov":

			removeOldSheet(this.tabtxtcsheet_hov);
			
			if(enable==true){
	
				this.tabtxtcsheet_hov=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
					#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab:not([selected="true"]):hover .tab-text {\
					  color: '+this.prefs.getCharPref('ctabhovt')+' !important;\
					}\
				'), null, null);

				applyNewSheet(this.tabtxtcsheet_hov);
			}

		break;
		
		case "tabtextc_pen":

			removeOldSheet(this.tabtxtcsheet_pen);
			
			if(enable==true){
	
				this.tabtxtcsheet_pen=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
					#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[pending]:not([selected="true"]):not(:hover) .tab-text {\
					  color: '+this.prefs.getCharPref('ctabpent')+' !important;\
					}\
				'), null, null);

				applyNewSheet(this.tabtxtcsheet_pen);
			}

		break;
		
		case "tabtextc_unr":

			removeOldSheet(this.tabtxtcsheet_unr);
			
			if(enable==true){
	
				this.tabtxtcsheet_unr=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
					#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[unread]:not([selected="true"]):not(:hover) .tab-text {\
					  color: '+this.prefs.getCharPref('ctabunrt')+' !important;\
					}\
				'), null, null);

				applyNewSheet(this.tabtxtcsheet_unr);
			}

		break;
		
		case "tabtextsh_def":

			removeOldSheet(this.tabtxtshsheet_def);
			
			if(enable==true){
				
				this.tabtxtshsheet_def=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
					#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab:not([selected="true"]):not(:hover) .tab-text {\
					  text-shadow: 0px 1px 0px '+this.prefs.getCharPref('ctabtsh')+',0px 1px 4px '+this.prefs.getCharPref('ctabtsh')+' !important;\
					}\
				'), null, null);

				applyNewSheet(this.tabtxtshsheet_def);
			}

		break;
		
		case "tabtextsh_act":

			removeOldSheet(this.tabtxtshsheet_act);
			
			if(enable==true){
				
				this.tabtxtshsheet_act=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
					#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[selected="true"] .tab-text {\
					  text-shadow: 0px 1px 0px '+this.prefs.getCharPref('ctabacttsh')+',0px 1px 4px '+this.prefs.getCharPref('ctabacttsh')+' !important;\
					}\
				'), null, null);

				applyNewSheet(this.tabtxtshsheet_act);
			}

		break;
		
		case "tabtextsh_hov":

			removeOldSheet(this.tabtxtshsheet_hov);
			
			if(enable==true){
				
				this.tabtxtshsheet_hov=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
					#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab:not([selected="true"]):hover .tab-text {\
					  text-shadow: 0px 1px 0px '+this.prefs.getCharPref('ctabhovtsh')+',0px 1px 4px '+this.prefs.getCharPref('ctabhovtsh')+' !important;\
					}\
				'), null, null);

				applyNewSheet(this.tabtxtshsheet_hov);
			}

		break;
		
		case "tabtextsh_pen":

			removeOldSheet(this.tabtxtshsheet_pen);
			
			if(enable==true){
				
				this.tabtxtshsheet_pen=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
					#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[pending]:not([selected="true"]):not(:hover) .tab-text {\
					  text-shadow: 0px 1px 0px '+this.prefs.getCharPref('ctabpentsh')+',0px 1px 4px '+this.prefs.getCharPref('ctabpentsh')+' !important;\
					}\
				'), null, null);

				applyNewSheet(this.tabtxtshsheet_pen);
			}

		break;
		
		case "tabtextsh_unr":

			removeOldSheet(this.tabtxtshsheet_unr);
			
			if(enable==true){
				
				this.tabtxtshsheet_unr=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
					#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[unread]:not([selected="true"]):not(:hover) .tab-text {\
					  text-shadow: 0px 1px 0px '+this.prefs.getCharPref('ctabunrtsh')+',0px 1px 4px '+this.prefs.getCharPref('ctabunrtsh')+' !important;\
					}\
				'), null, null);

				applyNewSheet(this.tabtxtshsheet_unr);
			}

		break;
		
		case "cui_buttons":
		
			removeOldSheet(this.cuiButtonssheet);
			
			if(enable==true){
			
				var cuismallnavbut='';
				var cuiicotextbut='';
			  
				if (this.prefs.getBoolPref("smallnavbut")) {
				  cuismallnavbut='#ctraddon_cui-smallnavbut-button1 {background:#fbfbfb !important;} #ctraddon_cui-smallnavbut-button2 {background:#dadada !important;}';
				} else {
				  cuismallnavbut='#ctraddon_cui-smallnavbut-button1 {background:#dadada !important;} #ctraddon_cui-smallnavbut-button2 {background:#fbfbfb !important;}';
				}
			
				switch (this.prefs.getCharPref("nav_txt_ico")) {
					case "icons":		cuiicotextbut='#ctraddon_cui-icons-button {background:#dadada !important;} #ctraddon_cui-iconstext-button {background:#fbfbfb !important;} #ctraddon_cui-textonly-button {background:#fbfbfb !important;}'; break;
					case "iconsbig":	cuiicotextbut='#ctraddon_cui-icons-button {background:#bdbdbd !important;} #ctraddon_cui-iconstext-button {background:#fbfbfb !important;} #ctraddon_cui-textonly-button {background:#fbfbfb !important;}'; break;
					case "iconstxt":	cuiicotextbut='#ctraddon_cui-icons-button {background:#fbfbfb !important;} #ctraddon_cui-iconstext-button {background:#dadada !important;} #ctraddon_cui-textonly-button {background:#fbfbfb !important;}'; break;
					case "iconstxt2":	cuiicotextbut='#ctraddon_cui-icons-button {background:#fbfbfb !important;} #ctraddon_cui-iconstext-button {background:#bdbdbd !important;} #ctraddon_cui-textonly-button {background:#fbfbfb !important;}'; break;
					case "txtonly":		cuiicotextbut='#ctraddon_cui-icons-button {background:#fbfbfb !important;} #ctraddon_cui-iconstext-button {background:#fbfbfb !important;} #ctraddon_cui-textonly-button {background:#dadada !important;}'; break;
				}
				
				this.cuiButtonssheet=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
					'+cuismallnavbut+'\
					'+cuiicotextbut+'\
				'), null, null);

				applyNewSheet(this.cuiButtonssheet);
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

		try {
			if (!sss.sheetRegistered(sheet,sss.AGENT_SHEET)) sss.loadAndRegisterSheet(sheet,sss.AGENT_SHEET);
		}catch(e){}
	}
	
  },

  // handles two 'options' per button on 'icons' and 'icon+text' buttons
  cuiPrefChangeString: function(which,value){

	if(this.prefs.getCharPref('nav_txt_ico')=='icons' && value=="icons" && this.fxdefaulttheme) {
	  this.prefs.setCharPref(which,'iconsbig');
	} 
	else if(this.prefs.getCharPref('nav_txt_ico')=='iconsbig' && value=="icons") {
	  this.prefs.setCharPref(which,'icons');
	}
	else if(this.prefs.getCharPref('nav_txt_ico')=='iconstxt' && value=="iconstxt") {
	  this.prefs.setCharPref(which,'iconstxt2');
	} 
	else if(this.prefs.getCharPref('nav_txt_ico')=='iconstxt2' && value=="iconstxt") {
	  this.prefs.setCharPref(which,'iconstxt');
	}
	else {
	  this.prefs.setCharPref(which,value);
	}

  },
  
  toggleCtrAddonBar: function() {
    
	let ctrAddonBar = document.getElementById("ctraddon_addon-bar");
    setToolbarVisibility(ctrAddonBar, ctrAddonBar.collapsed);
  
  }
  
};

classicthemerestorerjs.ctr.init();
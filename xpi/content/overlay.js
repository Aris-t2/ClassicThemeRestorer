"use strict";
/*
	There are a few "timeouts" on this document. In almost all cases they are needed to
	make sure a 'get' call looks only for items already in DOM. 
 
	Components.classes: Cc
	Components.interfaces: Ci
	Components.utils: Cu
*/

Cu.import("resource:///modules/CustomizableUI.jsm");
Cu.import("resource://gre/modules/AddonManager.jsm");
Cu.import("resource://gre/modules/Services.jsm");
//Query nsIPrefBranch see: Bug 1125570 | Bug 1083561
Services.prefs.QueryInterface(Ci.nsIPrefBranch);

if (typeof classicthemerestorerjs == "undefined") {var classicthemerestorerjs = {};};
if (!classicthemerestorerjs.ctr) {classicthemerestorerjs.ctr = {};};

classicthemerestorerjs.ctr = {
 
  // initialize custom sheets for tab color settings
  ctabsheet_def:		Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  ctabsheet_act:		Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  ctabsheet_hov:		Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  ctabsheet_pen:		Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  ctabsheet_unr:		Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  cntabsheet_def:		Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  cntabsheet_hov:		Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  tabtxtcsheet_def:		Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  tabtxtcsheet_act:		Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  tabtxtcsheet_hov:		Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  tabtxtcsheet_pen:		Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  tabtxtcsheet_unr:		Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  tabtxtshsheet_def:	Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  tabtxtshsheet_act:	Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  tabtxtshsheet_hov:	Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  tabtxtshsheet_pen:	Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  tabtxtshsheet_unr:	Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  
  tabboldsheet_def:		Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  tabboldsheet_act:		Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  tabboldsheet_hov:		Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  tabboldsheet_pen:		Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  tabboldsheet_unr:		Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  tabitasheet_def:		Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  tabitasheet_act:		Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  tabitasheet_hov:		Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  tabitasheet_pen:		Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  tabitasheet_unr:		Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  
  aerocolors:			Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  
  tabheight:			Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  
  appbutton_color:		Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  
  cuiButtonssheet:		Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),

  prefs:				Services.prefs.getBranch("extensions.classicthemerestorer."),
  
  fxdefaulttheme:		Services.prefs.getBranch("general.skins.").getCharPref("selectedSkin") == 'classic/1.0',
  osstring:				Cc["@mozilla.org/xre/app-info;1"].getService(Ci.nsIXULRuntime).OS,
  appversion:			parseInt(Services.prefs.getBranch("extensions.").getCharPref("lastAppVersion")),
  stringBundle:			Cc["@mozilla.org/intl/stringbundle;1"].getService(Ci.nsIStringBundleService).createBundle("chrome://classic_theme_restorer/locale/messages.file"),
  
  hideTTWithOneTab:		false,
  moveStarIntoUrlbar:	false,
  moveFeedIntoUrlbar:	false,

  init: function() {
  
	// remove default panel ui button in favour of CTRs movable duplicate
	try{
		document.getElementById("PanelUI-button").removeChild(document.getElementById("PanelUI-menu-button"));
	} catch(e){}
	
	// adds a new global attribute 'defaultfxtheme' -> better parting css for default and non-default themes
	try{
		if (this.fxdefaulttheme){
		  document.getElementById("main-window").setAttribute('defaultfxtheme',true);
		}
		else {
		  var thirdpartytheme = Services.prefs.getBranch("general.skins.").getCharPref("selectedSkin");
		  document.getElementById("main-window").setAttribute('currenttheme',thirdpartytheme);
		  classicthemerestorerjs.ctr.loadUnloadCSS("thirdpartythemes",true);
		}
	} catch(e){}
	
	// add a new global attribute 'fx31' -> better parting css between versions
	try{
		if (this.appversion >= 31) document.getElementById("main-window").setAttribute('fx31',true);
	} catch(e){}
	
	// add a new global attribute 'fx32plus' -> better parting css between versions
	try{
		if (this.appversion >= 32) document.getElementById("main-window").setAttribute('fx32plus',true);
	} catch(e){}
	
	// add a new global attribute 'fx34plus' -> better parting css between versions
	try{
		if (this.appversion >= 34) document.getElementById("main-window").setAttribute('fx34plus',true);
	} catch(e){}
	
	// add CTR version number to mainwindow, so other add-ons/theme can better destinguish between versions
	AddonManager.getAddonByID('ClassicThemeRestorer@ArisT2Noia4dev', function(addon) {
	  try{
		document.getElementById("main-window").setAttribute('ctraddon_version',addon.version);
	  } catch(e){}
	});

	// CTRs appbutton for Windows titlebar
	this.createTitlebarButton();
	
	// additional toolbars
	this.createAdditionalToolbars();
	
	// add-on fixes
	this.addonCompatibilityImprovements();
	
	// handle max/min tab-width for every new window
	this.updateTabWidth();
	
	// move menubar to other toolbars
	this.moveMenubarToToolbar();

	// not all CTR features are suitable for third party themes
	this.disableSettingsforThemes();
	
	// style CTRs 'customize-ui' option buttons
	this.loadUnloadCSS('cui_buttons',true);
	
	// CTRs extra add-on bar keys
	this.CTRextraLocationBarKeyset();

	// CTR Preferences listener
	function PrefListener(branch_name, callback) {
	  // Keeping a reference to the observed preference branch or it will get
	  // garbage collected.
	  this._branch = Services.prefs.getBranch(branch_name);
	  this._branch.QueryInterface(Ci.nsIPrefBranch2);
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
	
	var ctrSettingsListener_forDevtheme = new PrefListener(
	  "browser.devedition.theme.",
	  function(branch, name) {
		switch (name) {

		  case "enabled":
			if (branch.getBoolPref("enabled")) {
			  if(classicthemerestorerjs.ctr.prefs.getBoolPref("nodevtheme")) {
				branch.setBoolPref("enabled",false);
			  }
			  else{
				if (classicthemerestorerjs.ctr.fxdefaulttheme){
				  try{
				    document.getElementById("main-window").setAttribute('developertheme',true);
				  } catch(e){}
				}
			  }
			}
			else {
			  if (classicthemerestorerjs.ctr.fxdefaulttheme){
				try{
				  document.getElementById("main-window").setAttribute('developertheme',false);
				} catch(e){}
			  }
			}
			
		  break;
		}
	  }
	);
	
	ctrSettingsListener_forDevtheme.register(true);

	var ctrSettingsListener = new PrefListener(
	  "extensions.classicthemerestorer.",
	  function(branch, name) {
		switch (name) {

		  // first run/reset
		  case "ctrreset":
			if (branch.getBoolPref("ctrreset") ) {
			
			  try {

				// move CTRs items on 'first run' or 'reset' onto toolbars
				CustomizableUI.addWidgetToArea("ctraddon_back-forward-button", CustomizableUI.AREA_NAVBAR);
				CustomizableUI.addWidgetToArea("ctraddon_appbutton", CustomizableUI.AREA_NAVBAR);
				CustomizableUI.addWidgetToArea("ctraddon_puib_separator", CustomizableUI.AREA_NAVBAR);
				CustomizableUI.addWidgetToArea("ctraddon_panelui-button", CustomizableUI.AREA_NAVBAR);
				if (classicthemerestorerjs.ctr.osstring=="WINNT") CustomizableUI.addWidgetToArea("ctraddon_window-controls", CustomizableUI.AREA_NAVBAR);
				CustomizableUI.addWidgetToArea("ctraddon_bookmarks-menu-toolbar-button", CustomizableUI.AREA_BOOKMARKS);						

				var tabsintitlebar = Services.prefs.getBranch("browser.tabs.").getBoolPref("drawInTitlebar");
										
				// TMPs/TUs colors for rounded tabs in Fx29+ are not compatible with CTRs (squared) tabs.
				// This just disables TMPs/TUs non-compatible tab color options on first run (once).
				try{
				  var tmpprefs = Services.prefs.getBranch("extensions.tabmix.");
				  if(tmpprefs.getBoolPref("currentTab")) tmpprefs.setBoolPref("currentTab",false);
				  if(tmpprefs.getBoolPref("unloadedTab")) tmpprefs.setBoolPref("unloadedTab",false);
				  if(tmpprefs.getBoolPref("unreadTab")) tmpprefs.setBoolPref("unreadTab",false);
				  if(tmpprefs.getBoolPref("otherTab")) tmpprefs.setBoolPref("otherTab",false);
				} catch(e){}

				try{
				  var tuprefs = Services.prefs.getBranch("extensions.tabutils.");
				  if(tuprefs.getBoolPref("highlightCurrent")) tuprefs.setBoolPref("highlightCurrent",false);
				  if(tuprefs.getBoolPref("highlightRead")) tuprefs.setBoolPref("highlightRead",false);
				  if(tuprefs.getBoolPref("highlightSelected")) tuprefs.setBoolPref("highlightSelected",false);
				  if(tuprefs.getBoolPref("highlightUnloaded")) tuprefs.setBoolPref("highlightUnloaded",false);
				  if(tuprefs.getBoolPref("highlightUnread")) tuprefs.setBoolPref("highlightUnread",false);
				} catch(e){}
				
				// switch to 'appbutton on titlebar', if using Fx titlebar on Windows
				if (classicthemerestorerjs.ctr.osstring=="WINNT" && tabsintitlebar) {
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
				if(addon && addon.isActive && classicthemerestorerjs.ctr.osstring=="WINNT")
				  classicthemerestorerjs.ctr.prefs.setCharPref('tabsontop','false');
			  });
			  
			  // set 'first run' & 'ctrreset' to false
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

			var devtheme=false;

			try {
			  if(Services.prefs.getBranch("browser.devedition.theme.").getBoolPref('enabled')!=false){
				devtheme=true;
			  }
			} catch(e) {}

			if (branch.getCharPref("tabs")!="tabs_default" && classicthemerestorerjs.ctr.fxdefaulttheme==true && devtheme==false){
			  classicthemerestorerjs.ctr.loadUnloadCSS(branch.getCharPref("tabs"),true);
			}

			if (branch.getBoolPref("aerocolors") && classicthemerestorerjs.ctr.fxdefaulttheme==true && devtheme==false) { 
			  classicthemerestorerjs.ctr.loadUnloadCSS("aerocolors",false);
			  classicthemerestorerjs.ctr.loadUnloadCSS("aerocolors",true);
			}
		  
		  break;
		  
		  case "tabsontop":
		    
			var tabsont = branch.getCharPref("tabsontop");
			
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
			
			// only try to remove attributes, if they exist
			// they are set for many nodes at once by CTR, so if one has it all others have too	
			if (tabsont=='unset') {
			  try {
				if(document.getElementById("main-window").hasAttribute('tabsontop')) {
					document.getElementById("main-window").removeAttribute('tabsontop');
					document.getElementById("navigator-toolbox").removeAttribute('tabsontop');
					document.getElementById("TabsToolbar").removeAttribute('tabsontop');
					document.getElementById("nav-bar").removeAttribute('tabsontop');
					document.getElementById("PersonalToolbar").removeAttribute('tabsontop');
				}
			  } catch(e){}
			}
			else if (tabsont=='true') {
			  try {
				document.getElementById("main-window").setAttribute('tabsontop','true');
				document.getElementById("navigator-toolbox").setAttribute('tabsontop','true');
				document.getElementById("TabsToolbar").setAttribute('tabsontop','true');
				document.getElementById("nav-bar").setAttribute('tabsontop','true');
				document.getElementById("PersonalToolbar").setAttribute('tabsontop','true');
			  } catch(e){}
			}
			else {
			  try {
				document.getElementById("main-window").setAttribute('tabsontop','false');
				document.getElementById("navigator-toolbox").setAttribute('tabsontop','false');
				document.getElementById("TabsToolbar").setAttribute('tabsontop','false');
				document.getElementById("nav-bar").setAttribute('tabsontop','false');
				document.getElementById("PersonalToolbar").setAttribute('tabsontop','false');
			  } catch(e){}
			}
			
			classicthemerestorerjs.ctr.loadUnloadCSS('cui_buttons',true);
			
		  break;

		  case "personanoshadow":
			try {
					if (branch.getBoolPref("personanoshadow")){
							classicthemerestorerjs.ctr.loadUnloadCSS("persona_no_shadow",true);
					} else {
						classicthemerestorerjs.ctr.loadUnloadCSS("persona_no_shadow",false);
					}	
				} catch(e){}		  
		  break;
		  
		  case "ctabheightcb":
			if (branch.getBoolPref("ctabheightcb")) classicthemerestorerjs.ctr.loadUnloadCSS("ctabheight",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("ctabheight",false);
		  break;
		  
		  case "ctabheight":
			if (branch.getBoolPref("ctabheightcb")) classicthemerestorerjs.ctr.loadUnloadCSS("ctabheight",true);
		  break;
		  
		  case "ctabwidth": case "ctabmwidth":
			classicthemerestorerjs.ctr._updateTabWidth();
		  break;

		  case "e10stab_notd":
			if (branch.getBoolPref("e10stab_notd")) classicthemerestorerjs.ctr.loadUnloadCSS("e10stab_notd",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("e10stab_notd",false);
		  break;
		  
		  case "closetab":
		  
			var def_tcw = Services.prefs.getBranch("browser.tabs.").getIntPref("tabClipWidth") == 140;

			classicthemerestorerjs.ctr.loadUnloadCSS('closetab_active',false);
			classicthemerestorerjs.ctr.loadUnloadCSS('closetab_none',false);
			classicthemerestorerjs.ctr.loadUnloadCSS('closetab_tb_end',false);
			classicthemerestorerjs.ctr.loadUnloadCSS('closetab_tb_start',false);
			if (def_tcw==false) {
			  Services.prefs.getBranch("browser.tabs.").setIntPref("tabClipWidth",140);
			}
			
			if (branch.getCharPref("closetab")!="closetab_default"){
			  
			  if (branch.getCharPref("closetab")=="closetab_forced") {
				Services.prefs.getBranch("browser.tabs.").setIntPref("tabClipWidth",1);
			  }
			  else if (classicthemerestorerjs.ctr.appversion >= 31) {
			    classicthemerestorerjs.ctr.loadUnloadCSS(branch.getCharPref("closetab"),true);
			  }

			}

		  break;

		  case "closetabhfl":
			if (branch.getBoolPref("closetabhfl")) classicthemerestorerjs.ctr.loadUnloadCSS("closetabhfl",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("closetabhfl",false);
		  break;

		  case "closealt":
			if (branch.getBoolPref("closealt") && classicthemerestorerjs.ctr.fxdefaulttheme==true) classicthemerestorerjs.ctr.loadUnloadCSS("closealt",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("closealt",false);
		  break;

		  case "closeonleft":
			if (branch.getBoolPref("closeonleft") && classicthemerestorerjs.ctr.fxdefaulttheme==true) classicthemerestorerjs.ctr.loadUnloadCSS("closeonleft",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("closeonleft",false);
		  break;


		  // Appbutton
		  case "appbutton":
			classicthemerestorerjs.ctr.loadUnloadCSS('appbutton_v1',false);
			classicthemerestorerjs.ctr.loadUnloadCSS('appbutton_v1wt',false);
			classicthemerestorerjs.ctr.loadUnloadCSS('appbutton_v2',false);
			classicthemerestorerjs.ctr.loadUnloadCSS('appbutton_v2wt2',false);
			classicthemerestorerjs.ctr.loadUnloadCSS('appbutton_v2io',false);
			classicthemerestorerjs.ctr.loadUnloadCSS('appbutton_v2io2',false);
			classicthemerestorerjs.ctr.loadUnloadCSS('appbutton_v2h',false);
			classicthemerestorerjs.ctr.loadUnloadCSS('appbutton_pm',false);
		
			if (branch.getCharPref("appbutton")!="appbutton_off"){
			  classicthemerestorerjs.ctr.loadUnloadCSS(branch.getCharPref("appbutton"),true);
			  classicthemerestorerjs.ctr.checkAppbuttonOnNavbar();
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
			classicthemerestorerjs.ctr.loadUnloadCSS('appbuttonc_custom',false);

			if (branch.getCharPref("appbuttonc")!="off"){
			  classicthemerestorerjs.ctr.loadUnloadCSS(branch.getCharPref("appbuttonc"),true);
			}
		  break;
		  
		  case "cappbutc1": case "cappbutc2":
			if (branch.getCharPref("appbuttonc")=="appbuttonc_custom") classicthemerestorerjs.ctr.loadUnloadCSS("appbuttonc_custom",true);
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
		  
		  /*Aero Colors*/
		  case "aerocolors":
		 
			var devtheme=false;

			try {
			  if(Services.prefs.getBranch("browser.devedition.theme.").getBoolPref('enabled')!=false){
				devtheme=true;
			  }
			} catch(e) {}
			
			if (branch.getBoolPref("aerocolors") && classicthemerestorerjs.ctr.fxdefaulttheme==true && devtheme==false) {
			  classicthemerestorerjs.ctr.loadUnloadCSS("aerocolors",true);
			  branch.setBoolPref("tabc_act_tb",false);
			  if (branch.getBoolPref("tabcolor_act") && classicthemerestorerjs.ctr.fxdefaulttheme==true) {
				classicthemerestorerjs.ctr.loadUnloadCSS("tabcolor_act",true);
			  }
			}
			else classicthemerestorerjs.ctr.loadUnloadCSS("aerocolors",false);
		  break;

		  //General UI options
		  case "nbiconsize":
		  
		    var currentAttribute = document.getElementById("nav-bar").getAttribute("iconsize");
			var selectedAttribute = classicthemerestorerjs.ctr.prefs.getCharPref("nbiconsize");
			
			// if nav-bar current and CTRs selected attribute are both 'small', CTR does not need to change nav-bars attribute
			if(currentAttribute=="small" && selectedAttribute=="small") {return;}
			else {
				// needs a delay or Firefox may override attribute in some cases
				setTimeout(function(){
				  try {
					document.getElementById("nav-bar").setAttribute('iconsize',classicthemerestorerjs.ctr.prefs.getCharPref("nbiconsize"));
				  } catch(e){}
				},classicthemerestorerjs.ctr.prefs.getIntPref("nbisizedelay"));
				
				window.addEventListener("load", function setCTRnavbariconsize(event){
					window.removeEventListener("load", setCTRnavbariconsize, false);

					// needs a delay or Firefox may override attribute in some cases
					setTimeout(function(){
					  try {
						document.getElementById("nav-bar").setAttribute('iconsize',classicthemerestorerjs.ctr.prefs.getCharPref("nbiconsize"));
					  } catch(e){}
					},classicthemerestorerjs.ctr.prefs.getIntPref("nbisizedelay"));

				},false);
			}

		  break;

		  case "smallnavbut":
		  
			var cstbb = false;
			//if CTB add-on is installed and navbarbuttons option is not off
			try {
			  if(Services.prefs.getBranch("extensions.cstbb-extension.").getCharPref("navbarbuttons")!="nabbuttons_off")
			   cstbb = true;
			} catch(e){}
	
			if (branch.getBoolPref("smallnavbut") && classicthemerestorerjs.ctr.fxdefaulttheme==true && cstbb==false) {			
				classicthemerestorerjs.ctr.loadUnloadCSS("smallnavbut",true);
			}
			else  classicthemerestorerjs.ctr.loadUnloadCSS("smallnavbut",false);
			
			classicthemerestorerjs.ctr.checkAppbuttonOnNavbar();

		  break;
		  
		  case "hidenavbar":	  
			if (branch.getBoolPref("hidenavbar")) classicthemerestorerjs.ctr.loadUnloadCSS("hidenavbar",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("hidenavbar",false);
		  break;
		  
		  case "backforward":
			if (branch.getBoolPref("backforward")) {
			  classicthemerestorerjs.ctr.loadUnloadCSS("backforward",true);
			  
			  if (branch.getBoolPref("nbcompact") && classicthemerestorerjs.ctr.osstring!="Darwin"){
				classicthemerestorerjs.ctr.loadUnloadCSS("nbcompact",true);
			  }
			}
			else { 
			  classicthemerestorerjs.ctr.loadUnloadCSS("backforward",false);
			  
			  if (branch.getBoolPref("nbcompact")){
				classicthemerestorerjs.ctr.loadUnloadCSS("nbcompact",false);
			  }
			}
		  break;
		  
		  case "nbcompact":
			if (branch.getBoolPref("nbcompact") && branch.getBoolPref("backforward") && classicthemerestorerjs.ctr.osstring!="Darwin" && classicthemerestorerjs.ctr.fxdefaulttheme==true)
			  classicthemerestorerjs.ctr.loadUnloadCSS("nbcompact",true);
			else classicthemerestorerjs.ctr.loadUnloadCSS("nbcompact",false);
		  break;

		  case "noconicons":
			if (branch.getBoolPref("noconicons") && classicthemerestorerjs.ctr.fxdefaulttheme==true) classicthemerestorerjs.ctr.loadUnloadCSS("noconicons",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("noconicons",false);
		  break;
		  
		  case "svgfilters":
			if (branch.getBoolPref("svgfilters")) classicthemerestorerjs.ctr.loadUnloadCSS("svgfilters",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("svgfilters",false);
		  break;

		  case "wincontrols":
			if (branch.getBoolPref("wincontrols")) classicthemerestorerjs.ctr.loadUnloadCSS("wincontrols",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("wincontrols",false);
		  break;
		  
		  case "activndicat":
			if (branch.getBoolPref('activndicat')) {
			  setTimeout(function(){
			    classicthemerestorerjs.ctr.restoreActivityThrobber();
			  },100);
			}
			else
			  setTimeout(function(){
				try{
				  classicthemerestorerjs.ctr.ctrGetId("ctraddon_navigator-throbber")
					.parentNode.removeChild(classicthemerestorerjs.ctr.ctrGetId("ctraddon_navigator-throbber"));
				} catch(e){}
			  },300);
		  break;

		  case "hideprbutton":
			if (branch.getBoolPref("hideprbutton")) classicthemerestorerjs.ctr.loadUnloadCSS("hideprbutton",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("hideprbutton",false);
		  break;
		  
		  case "statusbar":
	  
			if (branch.getBoolPref("statusbar")) {
				classicthemerestorerjs.ctr.loadUnloadCSS("statusbar",true);
			
				// add status bar shim to CTRs status bar area
				setTimeout(function(){
				  try{
					  if(document.getElementById("status-bar").parentNode.id=="addon-bar")
						document.getElementById("ctraddon_statusbar").insertBefore(document.getElementById("status-bar"), null);
				  } catch(e){}
				},1100);
				
				// recheck position of CTRs status bar area after DOM content loaded
				window.addEventListener("DOMContentLoaded", function loadCTRstatusbar(event){
					window.removeEventListener("DOMContentLoaded", loadCTRstatusbar, false);
			
					setTimeout(function(){
					  try{
						  if(document.getElementById("status-bar").parentNode.id=="addon-bar")
							document.getElementById("ctraddon_statusbar").insertBefore(document.getElementById("status-bar"), null);
					  } catch(e){}
					},1250);

				},false);

			}
			else { 
				classicthemerestorerjs.ctr.loadUnloadCSS("statusbar",false);
				
				window.removeEventListener("DOMContentLoaded", function loadCTRstatusbar(event){},false);
				
				// move status bar shim back to where it came from, if it is not already there
				setTimeout(function(){
				  try{
					if(document.getElementById("status-bar").parentNode.id=="ctraddon_statusbar")
						document.getElementById("addon-bar").insertBefore(document.getElementById("status-bar"), null);
				  } catch(e){}
				},450);
			}
		  break;
		  
		  case "starinurl":
			if (branch.getBoolPref("starinurl")) {
			
				classicthemerestorerjs.ctr.moveStarIntoUrlbar = true;
				
				classicthemerestorerjs.ctr.loadUnloadCSS("starinurl",true);

				// 'timeout' prevents issues with add-ons, which also insert own (h-)boxes/items into urlbar.
				// If "bookmarks-menu-button" can not be found on ui, it gets added to nav-bar first and
				// moved to urlbar afterwards (workaround because of some Australis UI issues).
				try{
				  setTimeout(function(){
					if (branch.getBoolPref("starinurl")) {
					  try{
						if(CustomizableUI.getPlacementOfWidget("bookmarks-menu-button")==null) {
							CustomizableUI.addWidgetToArea("bookmarks-menu-button", CustomizableUI.AREA_NAVBAR);
							CustomizableUI.moveWidgetWithinArea("bookmarks-menu-button",0);
						} else if(CustomizableUI.getPlacementOfWidget("bookmarks-menu-button").area=="nav-bar") {
							CustomizableUI.moveWidgetWithinArea("bookmarks-menu-button",0);
						} else {
							CustomizableUI.addWidgetToArea("bookmarks-menu-button", CustomizableUI.AREA_NAVBAR);
							CustomizableUI.moveWidgetWithinArea("bookmarks-menu-button",0);
						}

						var urlbaricons = document.getElementById("urlbar-icons");
						
						// keep default order, if star and feed button are both in location bar
						if (branch.getBoolPref("feedinurl") && urlbaricons.firstChild.id=="feed-button")
							urlbaricons.insertBefore(document.getElementById("bookmarks-menu-button"), urlbaricons.firstChild.nextSibling);
						else
							urlbaricons.insertBefore(document.getElementById("bookmarks-menu-button"), urlbaricons.firstChild);
					  } catch(e){}
					}

				  },1000);
				} catch(e){}
			  } else {
			  
			  if (classicthemerestorerjs.ctr.moveStarIntoUrlbar==true) {
			  
			    classicthemerestorerjs.ctr.moveStarIntoUrlbar = false;
				try{
				  setTimeout(function(){
					try{
						if(document.getElementById("bookmarks-menu-button").parentNode.id=="urlbar-icons") {
							CustomizableUI.removeWidgetFromArea("bookmarks-menu-button");
							CustomizableUI.addWidgetToArea("bookmarks-menu-button", CustomizableUI.AREA_NAVBAR);
							
							classicthemerestorerjs.ctr.loadUnloadCSS("starinurl",false);
						}
					} catch(e){}
				  },1000);
				} catch(e){}
			  }

			}
		  break;
		  
		  case "feedinurl":
			if (branch.getBoolPref("feedinurl")) {

				classicthemerestorerjs.ctr.moveFeedIntoUrlbar = true;
				
				classicthemerestorerjs.ctr.loadUnloadCSS("feedinurl",true);
				
				// 'timeout' prevents issues with add-ons, which also insert own (h-)boxes/items into urlbar.
				// If "feed-button" can not be found on ui, it gets added to tabs toolbar first and
				// moved to urlbar afterwards (workaround because of some Australis UI issues).
				try{
				  setTimeout(function(){
					if (branch.getBoolPref("feedinurl")) {
					  try{
						if(CustomizableUI.getPlacementOfWidget("feed-button")==null) {
						  CustomizableUI.addWidgetToArea("feed-button", CustomizableUI.AREA_TABSTRIP);
						} else if(CustomizableUI.getPlacementOfWidget("feed-button").area!="TabsToolbar") {
						  CustomizableUI.addWidgetToArea("feed-button", CustomizableUI.AREA_TABSTRIP);
						} 

						var urlbaricons = document.getElementById("urlbar-icons");
						urlbaricons.insertBefore(document.getElementById("feed-button"), urlbaricons.firstChild);
					  } catch(e){}
					}
				  },1300);
				} catch(e){}

			} else {
			
			  if (classicthemerestorerjs.ctr.moveFeedIntoUrlbar==true) {
			  
			    classicthemerestorerjs.ctr.moveFeedIntoUrlbar = false;
				
				try{
				  setTimeout(function(){
					try{
						if(document.getElementById("feed-button").parentNode.id=="urlbar-icons") {
						  //document.getElementById("nav-bar-customization-target").appendChild(document.getElementById("feed-button"));
						  CustomizableUI.addWidgetToArea("feed-button", CustomizableUI.AREA_NAVBAR);
						  classicthemerestorerjs.ctr.loadUnloadCSS("feedinurl",false);
						}
					} catch(e){}
				  },1300);
				} catch(e){}
			
			  }

			}
		  break;
		  
		  case "hideurelstop":
			if (branch.getBoolPref("hideurelstop")) classicthemerestorerjs.ctr.loadUnloadCSS("hideurelstop",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("hideurelstop",false);
		  break;

		  case "urlbardropm":
			if (branch.getBoolPref("urlbardropm")) classicthemerestorerjs.ctr.loadUnloadCSS("urlbardropm",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("urlbardropm",false);
		  break;
		  
		  case "combrelstop":
			if (branch.getBoolPref("combrelstop")) classicthemerestorerjs.ctr.loadUnloadCSS("combrelstop",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("combrelstop",false);
		  break;
		  
		  case "findbar":
			classicthemerestorerjs.ctr.loadUnloadCSS('findbar_top',false);
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
			classicthemerestorerjs.ctr.loadUnloadCSS('iconstxt3',false);
			classicthemerestorerjs.ctr.loadUnloadCSS('iconstxt4',false);
			classicthemerestorerjs.ctr.loadUnloadCSS('txtonly',false);
			classicthemerestorerjs.ctr.loadUnloadCSS("iat_notf_vt",false);
			classicthemerestorerjs.ctr.loadUnloadCSS("to_notf_vt",false);
			
			classicthemerestorerjs.ctr.setCTRModeAttributes('icons');
			
			switch (branch.getCharPref("nav_txt_ico")) {

			  case "iconsbig":
				classicthemerestorerjs.ctr.loadUnloadCSS('iconsbig',true);
			  break;
			  case "iconstxt":
				classicthemerestorerjs.ctr.loadUnloadCSS('iconstxt',true);
				if (branch.getBoolPref("iat_notf_vt"))
				  classicthemerestorerjs.ctr.loadUnloadCSS("iat_notf_vt",true);
			  break;
			  case "iconstxt2":
				classicthemerestorerjs.ctr.loadUnloadCSS('iconstxt2',true);
				if (branch.getBoolPref("iat_notf_vt"))
				  classicthemerestorerjs.ctr.loadUnloadCSS("iat_notf_vt",true);
			  break;
			  case "iconstxt3":
				classicthemerestorerjs.ctr.loadUnloadCSS('iconstxt3',true);
				if (branch.getBoolPref("iat_notf_vt"))
				  classicthemerestorerjs.ctr.loadUnloadCSS("iat_notf_vt",true);
			  break;
			  case "iconstxt4":
				classicthemerestorerjs.ctr.loadUnloadCSS('iconstxt4',true);
				if (branch.getBoolPref("iat_notf_vt"))
				  classicthemerestorerjs.ctr.loadUnloadCSS("iat_notf_vt",true);
			  break;
			  case "txtonly":
				classicthemerestorerjs.ctr.loadUnloadCSS('txtonly',true);
				if (branch.getBoolPref("iat_notf_vt"))
				  classicthemerestorerjs.ctr.loadUnloadCSS("to_notf_vt",true);
			  break;
			  case "text":
				classicthemerestorerjs.ctr.setCTRModeAttributes('text');
			  break;
			  case "full":
				classicthemerestorerjs.ctr.setCTRModeAttributes('full');
			  break;
			}

		  break;
		  
		  case "iat_notf_vt":
			if (branch.getBoolPref("iat_notf_vt")) {
			  if (branch.getCharPref("nav_txt_ico")=="iconstxt" || branch.getCharPref("nav_txt_ico")=="iconstxt2"
					|| branch.getCharPref("nav_txt_ico")=="iconstxt3" || branch.getCharPref("nav_txt_ico")=="iconstxt4")
			    classicthemerestorerjs.ctr.loadUnloadCSS("iat_notf_vt",true);
			  else if(branch.getCharPref("nav_txt_ico")=="txtonly")
			    classicthemerestorerjs.ctr.loadUnloadCSS("to_notf_vt",true);
			} else {
			  classicthemerestorerjs.ctr.loadUnloadCSS("iat_notf_vt",false);
			  classicthemerestorerjs.ctr.loadUnloadCSS("to_notf_vt",false);
			}
		  break;
		  
		 case "mbarforceleft":
			if (branch.getBoolPref("mbarforceleft")){
			  classicthemerestorerjs.ctr.loadUnloadCSS("mbarforceleft",true);
			  branch.setBoolPref("mbarforceright",false);
			}
			else classicthemerestorerjs.ctr.loadUnloadCSS("mbarforceleft",false);
		  break;
		  
		 case "mbarforceright":
			if (branch.getBoolPref("mbarforceright")){
			  classicthemerestorerjs.ctr.loadUnloadCSS("mbarforceright",true);
			  branch.setBoolPref("mbarforceleft",false);
			}
			else classicthemerestorerjs.ctr.loadUnloadCSS("mbarforceright",false);
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
		  
		  /* exclude hover settings from unloaded/pending tab */
		  case "tabc_hov_unl":
		    if (branch.getBoolPref("tabcolor_pen")) {
			  classicthemerestorerjs.ctr.loadUnloadCSS("tabcolor_pen",false);
			  setTimeout(function(){
				classicthemerestorerjs.ctr.loadUnloadCSS("tabcolor_pen",true);
			  },400);
			} else classicthemerestorerjs.ctr.loadUnloadCSS("tabcolor_pen",false);

		    if (branch.getBoolPref("tabtextc_pen")) {
			  classicthemerestorerjs.ctr.loadUnloadCSS("tabtextc_pen",false);
			  setTimeout(function(){
				classicthemerestorerjs.ctr.loadUnloadCSS("tabtextc_pen",true);
			  },400);
			} else classicthemerestorerjs.ctr.loadUnloadCSS("tabtextc_pen",false);
			
		    if (branch.getBoolPref("tabtextsh_pen")) {
			  classicthemerestorerjs.ctr.loadUnloadCSS("tabtextsh_pen",false);
			  setTimeout(function(){
				classicthemerestorerjs.ctr.loadUnloadCSS("tabtextsh_pen",true);
			  },400);
			} else classicthemerestorerjs.ctr.loadUnloadCSS("tabtextsh_pen",false);
			
		    if (branch.getBoolPref("tabfbold_pen")) {
			  classicthemerestorerjs.ctr.loadUnloadCSS("tabfbold_pen",false);
			  setTimeout(function(){
				classicthemerestorerjs.ctr.loadUnloadCSS("tabfbold_pen",true);
			  },400);
			} else classicthemerestorerjs.ctr.loadUnloadCSS("tabfbold_pen",false);
			
		    if (branch.getBoolPref("tabfita_pen")) {
			  classicthemerestorerjs.ctr.loadUnloadCSS("tabfita_pen",false);
			  setTimeout(function(){
				classicthemerestorerjs.ctr.loadUnloadCSS("tabfita_pen",true);
			  },400);
			} else classicthemerestorerjs.ctr.loadUnloadCSS("tabfita_pen",false);
			
		  break;
		  
		  /* exclude hover settings from unread tab */
		  case "tabc_hov_unr":
		    if (branch.getBoolPref("tabcolor_unr")) {
			  classicthemerestorerjs.ctr.loadUnloadCSS("tabcolor_unr",false);
			  setTimeout(function(){
				classicthemerestorerjs.ctr.loadUnloadCSS("tabcolor_unr",true);
			  },400);
			} else classicthemerestorerjs.ctr.loadUnloadCSS("tabcolor_unr",false);

		    if (branch.getBoolPref("tabtextc_unr")) {
			  classicthemerestorerjs.ctr.loadUnloadCSS("tabtextc_unr",false);
			  setTimeout(function(){
				classicthemerestorerjs.ctr.loadUnloadCSS("tabtextc_unr",true);
			  },400);
			} else classicthemerestorerjs.ctr.loadUnloadCSS("tabtextc_unr",false);
			
		    if (branch.getBoolPref("tabtextsh_unr")) {
			  classicthemerestorerjs.ctr.loadUnloadCSS("tabtextsh_unr",false);
			  setTimeout(function(){
				classicthemerestorerjs.ctr.loadUnloadCSS("tabtextsh_unr",true);
			  },400);
			} else classicthemerestorerjs.ctr.loadUnloadCSS("tabtextsh_unr",false);
			
		    if (branch.getBoolPref("tabfbold_unr")) {
			  classicthemerestorerjs.ctr.loadUnloadCSS("tabfbold_unr",false);
			  setTimeout(function(){
				classicthemerestorerjs.ctr.loadUnloadCSS("tabfbold_unr",true);
			  },400);
			} else classicthemerestorerjs.ctr.loadUnloadCSS("tabfbold_unr",false);
			
		    if (branch.getBoolPref("tabfita_unr")) {
			  classicthemerestorerjs.ctr.loadUnloadCSS("tabfita_unr",false);
			  setTimeout(function(){
				classicthemerestorerjs.ctr.loadUnloadCSS("tabfita_unr",true);
			  },400);
			} else classicthemerestorerjs.ctr.loadUnloadCSS("tabfita_unr",false);

		  break;
		  
		  case "tabc_act_tb":
			if (branch.getBoolPref("tabc_act_tb")) branch.setBoolPref("aerocolors",false);
			
			if (branch.getBoolPref("tabcolor_act")) {
			  classicthemerestorerjs.ctr.loadUnloadCSS("tabcolor_act",true);
			}
			else classicthemerestorerjs.ctr.loadUnloadCSS("tabcolor_act",false);
		  break;

		  // Special	  
		  case "altmenubar":
			if (branch.getBoolPref("altmenubar") && classicthemerestorerjs.ctr.fxdefaulttheme==true) classicthemerestorerjs.ctr.loadUnloadCSS("altmenubar",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("altmenubar",false);
		  break;
		  
		  case "altmenubarpos":
			if (branch.getBoolPref("altmenubarpos")) {
			  classicthemerestorerjs.ctr.loadUnloadCSS("altmenubarpos",true);
			  branch.setBoolPref("altmenubarpos2",false);
			}
			else classicthemerestorerjs.ctr.loadUnloadCSS("altmenubarpos",false);
		  break;
		  
		  case "altmenubarpos2":
			if (branch.getBoolPref("altmenubarpos2")) {
			  classicthemerestorerjs.ctr.loadUnloadCSS("altmenubarpos2",true);
			  branch.setBoolPref("altmenubarpos",false);
			}
			else classicthemerestorerjs.ctr.loadUnloadCSS("altmenubarpos2",false);
		  break;
		  
		  case "menubarnofog":
			if (branch.getBoolPref("menubarnofog") && classicthemerestorerjs.ctr.fxdefaulttheme==true) classicthemerestorerjs.ctr.loadUnloadCSS("menubarnofog",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("menubarnofog",false);
		  break;
		  
		  case "noaddonbarbg":
			if (branch.getBoolPref("noaddonbarbg") && classicthemerestorerjs.ctr.fxdefaulttheme==true) classicthemerestorerjs.ctr.loadUnloadCSS("noaddonbarbg",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("noaddonbarbg",false);
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
		  
		  case "hidesbclose":
			if (branch.getBoolPref("hidesbclose")) classicthemerestorerjs.ctr.loadUnloadCSS("hidesbclose",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("hidesbclose",false);
		  break;
		  
		  case "chevronfix":
			if (branch.getBoolPref("chevronfix")) classicthemerestorerjs.ctr.loadUnloadCSS("chevronfix",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("chevronfix",false);
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

		  case "tabmokcolor4":
			if (branch.getBoolPref("tabmokcolor4") && classicthemerestorerjs.ctr.fxdefaulttheme==true) classicthemerestorerjs.ctr.loadUnloadCSS("tabmokcolor4",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("tabmokcolor4",false);
		  break;

		  case "closeabarbut":
			if (branch.getBoolPref("closeabarbut"))	classicthemerestorerjs.ctr.loadUnloadCSS("closeabarbut",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("closeabarbut",false);
		  break;

		  case "bfurlbarfix":
			if (branch.getBoolPref("bfurlbarfix") && classicthemerestorerjs.ctr.fxdefaulttheme==true) classicthemerestorerjs.ctr.loadUnloadCSS("bfurlbarfix",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("bfurlbarfix",false);
		  break;

		  case "bf_space":
			if (branch.getBoolPref("bf_space") && classicthemerestorerjs.ctr.fxdefaulttheme==true) classicthemerestorerjs.ctr.loadUnloadCSS("bf_space",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("bf_space",false);
		  break;		  

		  case "emptyfavicon":
			if (branch.getBoolPref("emptyfavicon")) classicthemerestorerjs.ctr.loadUnloadCSS("emptyfavicon",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("emptyfavicon",false);
		  break;
		  
		  case "emptyfavicon2":
			if (branch.getBoolPref("emptyfavicon2")) classicthemerestorerjs.ctr.loadUnloadCSS("emptyfavicon2",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("emptyfavicon2",false);
		  break;
		  
		  case "noemptypticon":
			if (branch.getBoolPref("noemptypticon")) classicthemerestorerjs.ctr.loadUnloadCSS("noemptypticon",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("noemptypticon",false);
		  break;
		  
		  case "hidezoomres":
			if (branch.getBoolPref("hidezoomres")) classicthemerestorerjs.ctr.loadUnloadCSS("hidezoomres",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("hidezoomres",false);
		  break;
		  
		  case "alt_newtabp":
			if (branch.getBoolPref("alt_newtabp")) classicthemerestorerjs.ctr.loadUnloadCSS("alt_newtabp",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("alt_newtabp",false);
		  break;
		  
		  case "noresizerxp":
			if (branch.getBoolPref("noresizerxp")) classicthemerestorerjs.ctr.loadUnloadCSS("noresizerxp",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("noresizerxp",false);
		  break;

		  case "pmhidelabels":
			if (branch.getBoolPref("pmhidelabels")) classicthemerestorerjs.ctr.loadUnloadCSS("pmhidelabels",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("pmhidelabels",false);
		  break;
		  
		  case "menupopupscr":
			if (branch.getBoolPref("menupopupscr")) classicthemerestorerjs.ctr.loadUnloadCSS("menupopupscr",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("menupopupscr",false);
		  break;
		  
		  case "verifiedcolors":
			if (branch.getBoolPref("verifiedcolors") && classicthemerestorerjs.ctr.fxdefaulttheme==true) classicthemerestorerjs.ctr.loadUnloadCSS("verifiedcolors",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("verifiedcolors",false);
		  break;

		  
		  case "hideprivmask":
			if (branch.getBoolPref("hideprivmask")) classicthemerestorerjs.ctr.loadUnloadCSS("hideprivmask",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("hideprivmask",false);
		  break;

		  case "highaddonsbar":
			if (branch.getBoolPref("highaddonsbar")) classicthemerestorerjs.ctr.loadUnloadCSS("highaddonsbar",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("highaddonsbar",false);
		  break;
		  
		  case "addonbarfs":
			if (branch.getBoolPref("addonbarfs")) classicthemerestorerjs.ctr.loadUnloadCSS("addonbarfs",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("addonbarfs",false);
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

		  case "dblclnewtab":
			
			if (classicthemerestorerjs.ctr.prefs.getBoolPref("dblclnewtab")==true && classicthemerestorerjs.ctr.osstring=="WINNT") {
			
				document.getElementById("TabsToolbar").addEventListener("dblclick", function openNewTabOnDoubleClick(e) {
				
					// remove listener, if the preference got disabled in-between
					if (classicthemerestorerjs.ctr.prefs.getBoolPref("dblclnewtab")==false) {
						document.getElementById("TabsToolbar").removeEventListener("dblclick", openNewTabOnDoubleClick, false);
						return;
					}
					else if(e.button==0 && e.target.localName != "tab"
						&& e.target.localName != "toolbarbutton"
						  && e.target.localName != "arrowscrollbox"
							&& e.originalTarget.getAttribute("anonid") != "scrollbutton-up"
							  && e.originalTarget.getAttribute("anonid") != "scrollbutton-down"
								&& e.originalTarget.getAttribute("anonid") != "close-button")
					{

						BrowserOpenTab();

						e.stopPropagation();
						e.preventDefault();

						document.getElementById('urlbar').focus();
					}

				}, false);
				
			}

		  break;
		  
		  case "hidetbwot":
			if (classicthemerestorerjs.ctr.prefs.getBoolPref("hidetbwot"))
		      classicthemerestorerjs.ctr.hideTabsToolbarWithOneTab();
		  break;

		  case "faviconurl": case "padlockex":
			if (classicthemerestorerjs.ctr.prefs.getBoolPref("faviconurl"))
		      classicthemerestorerjs.ctr.favIconinUrlbarCTR();
		  break;
		  
		  case "padlock":
			if (classicthemerestorerjs.ctr.prefs.getBoolPref("faviconurl"))
		      classicthemerestorerjs.ctr.favIconinUrlbarCTR();
			else if (classicthemerestorerjs.ctr.prefs.getCharPref("padlock")!="padlock_default"){

				classicthemerestorerjs.ctr.loadUnloadCSS('padlock_default',false);
				classicthemerestorerjs.ctr.loadUnloadCSS('padlock_classic',false);
				classicthemerestorerjs.ctr.loadUnloadCSS('padlock_modern',false);
				classicthemerestorerjs.ctr.loadUnloadCSS('padlock2_none',false);
				classicthemerestorerjs.ctr.loadUnloadCSS('padlock2_classic',false);
				classicthemerestorerjs.ctr.loadUnloadCSS('padlock2_modern',false);

				if (classicthemerestorerjs.ctr.prefs.getCharPref("padlock")=="padlock_none")
					classicthemerestorerjs.ctr.loadUnloadCSS("padlock2_none",true);
				if (classicthemerestorerjs.ctr.prefs.getCharPref("padlock")=="padlock_classic")
					classicthemerestorerjs.ctr.loadUnloadCSS("padlock2_classic",true);
				if (classicthemerestorerjs.ctr.prefs.getCharPref("padlock")=="padlock_modern")
					classicthemerestorerjs.ctr.loadUnloadCSS("padlock2_modern",true);

			} else {
				classicthemerestorerjs.ctr.loadUnloadCSS('padlock_default',false);
				classicthemerestorerjs.ctr.loadUnloadCSS('padlock_classic',false);
				classicthemerestorerjs.ctr.loadUnloadCSS('padlock_modern',false);
				classicthemerestorerjs.ctr.loadUnloadCSS('padlock2_none',false);
				classicthemerestorerjs.ctr.loadUnloadCSS('padlock2_classic',false);
				classicthemerestorerjs.ctr.loadUnloadCSS('padlock2_modern',false);
			}
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
			  if (branch.getBoolPref("alttabstb2"))
				  classicthemerestorerjs.ctr.loadUnloadCSS("alttabstb2",true);
			}
			else {
			  classicthemerestorerjs.ctr.loadUnloadCSS("alttabstb",false);
			  if (branch.getBoolPref("alttabstb2"))
				  classicthemerestorerjs.ctr.loadUnloadCSS("alttabstb2",false);
			}
		  break;
		  
		  case "alttabstb2":
			if (branch.getBoolPref("alttabstb2") && branch.getBoolPref("alttabstb")
				&& classicthemerestorerjs.ctr.fxdefaulttheme==true)
					classicthemerestorerjs.ctr.loadUnloadCSS("alttabstb2",true);
			else classicthemerestorerjs.ctr.loadUnloadCSS("alttabstb2",false);
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
		  
		  case "invicoaddonbar":
			if (branch.getBoolPref("invicoaddonbar") && classicthemerestorerjs.ctr.fxdefaulttheme==true) classicthemerestorerjs.ctr.loadUnloadCSS("invicoaddonbar",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("invicoaddonbar",false);
		  break;
		  //inv icons END
		  
		  case "toolsitem":
			
			// for Windows & Linux
			if (classicthemerestorerjs.ctr.osstring!="Darwin"){
				if (branch.getBoolPref("toolsitem")) classicthemerestorerjs.ctr.loadUnloadCSS("toolsitem",false);
				  else classicthemerestorerjs.ctr.loadUnloadCSS("toolsitem",true);
			}
			
			// for MacOSX: hide item using js instead of css or it won't work
			if (classicthemerestorerjs.ctr.osstring=="Darwin"){
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
		  
		  case "contextitem":
			if (branch.getBoolPref("contextitem")) classicthemerestorerjs.ctr.loadUnloadCSS("contextitem",false);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("contextitem",true);
		  break;
		  
		  case "puictrbutton":
			if (branch.getBoolPref("puictrbutton")) classicthemerestorerjs.ctr.loadUnloadCSS("puictrbutton",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("puictrbutton",false);
		  break;
		  
		  case "cuibuttons":
			if (branch.getBoolPref("cuibuttons")) classicthemerestorerjs.ctr.loadUnloadCSS("cuibuttons",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("cuibuttons",false);
		  break;

		  case "bmarkoinpw":
			if (branch.getBoolPref("bmarkoinpw")) classicthemerestorerjs.ctr.loadUnloadCSS("bmarkoinpw",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("bmarkoinpw",false);
		  break;
		  
		  case "nodevtheme":
			if (branch.getBoolPref("nodevtheme")) {
			  	try{
					if(Services.prefs.getBranch("browser.devedition.theme.").getBoolPref("enabled"))
					  Services.prefs.getBranch("browser.devedition.theme.").setBoolPref("enabled",false)
				} catch(e){}
			}
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
			}
			classicthemerestorerjs.ctr.checkAppbuttonOnNavbar();
			
		  break;
		}
	  }
	);
	
	ctrSettingsListener_forCTB.register(true);
	
	/*
	// SettingSanity add-on uses 'defaultDrawInTitlebar' pref, that breaks the default
	// 'drawInTitlebar' provided by Firefox and required by CTR. Basically it does not
	// switch default pref back when it should. This fixes the problem.
	// fixed in latest SettingSanity version?
	var ctrSettingsListener_forSetSan = new PrefListener(
	  "browser.tabs.",
	  function(branch, name) {
		switch (name) {
		  case "drawInTitlebar":
			if (branch.getBoolPref("drawInTitlebar")) {
			  try {
				if(branch.getBoolPref("defaultDrawInTitlebar")==false)
				  branch.setBoolPref('defaultDrawInTitlebar',true);
			  } catch(e) {}
			}
			else {
			  try {
				if(branch.getBoolPref("defaultDrawInTitlebar"))
				  branch.setBoolPref('defaultDrawInTitlebar',false);
			  } catch(e) {}
			}
		  break;
		}
	  }
	);
	
	ctrSettingsListener_forSetSan.register(true);
	*/

	// MacOSX requires extra checks to not load CTRs tab styles for (complete) themes by accident
	if (classicthemerestorerjs.ctr.osstring=="Darwin") {
		if(this.fxdefaulttheme==false) {
			classicthemerestorerjs.ctr.prefs.setCharPref('tabs','tabs_default');
		} else if(this.fxdefaulttheme==true){
			var devthemeosx=false;
			try {
			  if(Services.prefs.getBranch("browser.devedition.theme.").getBoolPref('enabled')!=false){
			    devthemeosx=true;
			  }
			} catch(e) {}
			  
			if(devthemeosx==true)			
			  classicthemerestorerjs.ctr.prefs.setCharPref('tabs','tabs_default');
		}
	}

  },

  // 'getElementById' would return wrongly 'null' for items in customizing palette
  ctrGetId: function(id) {
	return document.getElementById(id) || window.gNavToolbox.palette.querySelector("#" + id);
  },
   
  // show backForwardMenu popup for CTRs movable back/forward buttons 'mouse hold event'
  ctrBackMenuShow: function(anchorElem) {
  
   if(this.prefs.getBoolPref("hide_bf_popup")==false) {
	var timeoutID;
	
	timeoutID = window.setTimeout(
	  function(){
		document.getElementById("backForwardMenu").openPopupAtScreen(anchorElem.boxObject.screenX, anchorElem.boxObject.screenY+anchorElem.boxObject.height-1, false);
	  }, 700);

	anchorElem.onmouseup = function() {
	  window.clearTimeout(timeoutID);
	}
   }
  },
  
  // Appbutton in titlebar
  createTitlebarButton: function() {
  
	// this button can only be places on Firefox titlebar using Windows OS
	if(classicthemerestorerjs.ctr.osstring == "WINNT"){
	
		var buttontitle = "Firefox"; // init with default title
		var custombuttontitle = classicthemerestorerjs.ctr.prefs.getCharPref('appbuttontxt');
		
		if(custombuttontitle!='') buttontitle = custombuttontitle;
		else {
			try{
			  // make sure appbutton will get correct title
			  buttontitle = document.getElementById("main-window").getAttribute("title_normal");
			  if(buttontitle=="Mozilla Firefox") buttontitle="Firefox";
			  else if(buttontitle=="Firefox Developer Edition") buttontitle="DevFox";
			
			} catch(e){}
		}
  
		// create button
		var ctr_titlebarbutton = document.createElement("toolbarbutton");

		// set button attributes
		ctr_titlebarbutton.setAttribute("id", "ctraddon_appbutton2");
		ctr_titlebarbutton.setAttribute("ordinal", "0");
		ctr_titlebarbutton.setAttribute("removable", "false");
		ctr_titlebarbutton.setAttribute("type", "menu");
		ctr_titlebarbutton.setAttribute("label", buttontitle);
		ctr_titlebarbutton.setAttribute("popup", "appmenu-popup");
		
		// handle 'double click to close current window' option
		ctr_titlebarbutton.addEventListener("dblclick",  function appbuttonCloseCurrentWindow() {

		  if(classicthemerestorerjs.ctr.prefs.getBoolPref("dblclclosefx"))
			BrowserTryToCloseWindow();

		}, false);
		
		// handle mousedown event + popupshown/popuphidden events
		ctr_titlebarbutton.addEventListener("mousedown", function openCtrTitleAppmenuPopup() {

			var app_popup = classicthemerestorerjs.ctr.ctrGetId('appmenu-popup');
			
			//add attribute 'open'
			app_popup.addEventListener("popupshown", function onCtrTitleAppmenuPopupShown(event){
			  if (event.target == classicthemerestorerjs.ctr.ctrGetId("appmenu-popup"))
			    classicthemerestorerjs.ctr.ctrGetId('ctraddon_appbutton2').setAttribute("open", "true");
			}, false);
			
			// remove attribute 'open'
			app_popup.addEventListener("popuphidden", function onCtrTitleAppmenuPopupHidden(event){
			  if (event.target == classicthemerestorerjs.ctr.ctrGetId("appmenu-popup"))
			    classicthemerestorerjs.ctr.ctrGetId('ctraddon_appbutton2').removeAttribute("open");
			}, false);

		}, false);
		
		// add button to titlebar
		document.getElementById("titlebar-content").appendChild(ctr_titlebarbutton);
		
	}

  },
  
  // create 0-20 additional toolbars on startup
  // easier and more accurate compared to adding toolbars manually to overlay.xul
  createAdditionalToolbars: function() {

	// get amount of toolbars user wants to use
	var extrabars_num=classicthemerestorerjs.ctr.prefs.getIntPref('am_extrabars');
	
	// reset unsupported values
	if(extrabars_num<0) {extrabars_num=0; classicthemerestorerjs.ctr.prefs.setIntPref('am_extrabars',extrabars_num);}
	if(extrabars_num>20) {extrabars_num=20; classicthemerestorerjs.ctr.prefs.setIntPref('am_extrabars',extrabars_num);}
	
	// only try to add additional toolbar(s), if user enables at least one toolbar
	if(extrabars_num>0) {
	
	  var i=1;

	  while(i<=extrabars_num) {
		var ctr_tb = document.createElement("toolbar");
		
		if(i==1) {
		  ctr_tb.setAttribute("id", "ctraddon_extra-bar");
		  ctr_tb.setAttribute("toolbarname", ""+classicthemerestorerjs.ctr.stringBundle.GetStringFromName("ctr_extrabar")+"");
		  ctr_tb.setAttribute("collapsed", "true");
		}
		else {
		  ctr_tb.setAttribute("id", "ctraddon_extra-bar"+i+"");
		  ctr_tb.setAttribute("toolbarname", ""+classicthemerestorerjs.ctr.stringBundle.GetStringFromName("ctr_extrabar")+" ("+i+")");
		}
		ctr_tb.setAttribute("class", "toolbar-primary chromeclass-toolbar");
		ctr_tb.setAttribute("customizable", "true");
		ctr_tb.setAttribute("mode", "icons");
		ctr_tb.setAttribute("iconsize", "small");
		ctr_tb.setAttribute("insertafter", "nav-bar");
		ctr_tb.setAttribute("insertbefore", "PersonalToolbar");
		ctr_tb.setAttribute("context", "toolbar-context-menu");
		ctr_tb.setAttribute("lockiconsize", "true");
		ctr_tb.setAttribute("defaultset", "spring");
		
		document.getElementById("navigator-toolbox").insertBefore(ctr_tb, document.getElementById("PersonalToolbar"));
		i++;
	  }
	}
  
  },
  
  addonCompatibilityImprovements: function() {
	// 'ThePuzzlePiece'/'PuzzleToolbars' add-on: check to not enable CTRs space/separator styles while add-on is enabled
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
	// Gmail Manager NG
	setTimeout(function(){
	  try{
		classicthemerestorerjs.ctr.ctrGetId("status-bar").appendChild(classicthemerestorerjs.ctr.ctrGetId("gmanager-toolbar-item"));
	  } catch(e){}
	},300);
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
	
	//ColorfulTabs
	setTimeout(function(){
	  AddonManager.getAddonByID('{0545b830-f0aa-4d7e-8820-50a4629a56fe}', function(addon) {
	   if(addon && addon.isActive) {
	     
	     try{
		   document.getElementById("main-window").setAttribute('colorfultabs',true);
		 } catch(e){}
		 
	   }
	  });
	},300);

  },
  
  openAThrobberUrl: function() {
	var newathrobberurl = classicthemerestorerjs.ctr.prefs.getCharPref("athrobberurl");
	if(newathrobberurl!="") gBrowser.selectedTab = gBrowser.addTab(newathrobberurl);
  },
  
  // attach appmenu to appbutton on toolbar
  openCtrAppmenuPopup: function() {

	var app_popup = classicthemerestorerjs.ctr.ctrGetId('appmenu-popup');
	  
	app_popup.addEventListener("popupshown", function onCtrAppmenuPopupShown(event) {
	  if (event.target == classicthemerestorerjs.ctr.ctrGetId("appmenu-popup"))
	    classicthemerestorerjs.ctr.ctrGetId('ctraddon_appbutton').setAttribute("open", "true");
	}, false);

	app_popup.addEventListener("popuphidden", function onCtrAppmenuPopupHidden(event) {
	  if (event.target == classicthemerestorerjs.ctr.ctrGetId("appmenu-popup"))
	    classicthemerestorerjs.ctr.ctrGetId('ctraddon_appbutton').removeAttribute("open");
	}, false);
  
	classicthemerestorerjs.ctr.checkAppbuttonOnNavbar();
  },
  
  checkAppbuttonOnNavbar: function() {
	
	var appbutton = false;
	try {
	  if (classicthemerestorerjs.ctr.prefs.getCharPref("appbutton")=="appbutton_v1"
		  || classicthemerestorerjs.ctr.prefs.getCharPref("appbutton")=="appbutton_v1wt")
	   appbutton = true
	} catch(e){}
	
	var cstbb = false;
	try {
	  if(Services.prefs.getBranch("extensions.cstbb-extension.").getCharPref("navbarbuttons")!="nabbuttons_off")
	   cstbb = true;
	} catch(e){}


	/* make sure popup position gets adjusted, if appbutton is on nav-bar in normal button mode */
	if (classicthemerestorerjs.ctr.prefs.getBoolPref("smallnavbut")==false && cstbb==false
		&& classicthemerestorerjs.ctr.fxdefaulttheme==true && appbutton==true) {
			setTimeout(function(){
			  try{
			    if(classicthemerestorerjs.ctr.ctrGetId('ctraddon_appbutton').parentNode.parentNode.id=="nav-bar")
				  classicthemerestorerjs.ctr.loadUnloadCSS("appbutton_on_nav",true);
			  } catch(e){}
			},300);
	}
	else classicthemerestorerjs.ctr.loadUnloadCSS("appbutton_on_nav",false);
  },
  
  // hide tabs toolbar, if only one tab is visible
  hideTabsToolbarWithOneTab: function(){

	var observer = new MutationObserver(function(mutations) {
	  mutations.forEach(function(mutation) {
		ctrTabClose();
	  });    
	});

	window.addEventListener("TabClose", ctrTabClose, false);  
	window.addEventListener("TabOpen", ctrTabClose, false);
	window.addEventListener("DOMContentLoaded", ctrTabClose, false);
	observer.observe(document.querySelector('#toolbar-menubar'), { attributes: true, attributeFilter: ['inactive'] });

	function ctrTabClose(event){
	
	  var tabsintitlebar = Services.prefs.getBranch("browser.tabs.").getBoolPref("drawInTitlebar");
					  
	  if(gBrowser.tabContainer.tabbrowser.visibleTabs.length < 2) {
		
		// optianally reduces delay on startup (because it can cause glitches with Windows Classic visual style)
		if(classicthemerestorerjs.ctr.prefs.getBoolPref("hidetbwote"))
		  document.getElementById("TabsToolbar").style.visibility = 'collapse';
		else
		  document.getElementById("TabsToolbar").collapsed = true;
		
		  if(classicthemerestorerjs.ctr.osstring=="WINNT" && tabsintitlebar==true){ // Windows
			  if (classicthemerestorerjs.ctr.prefs.getCharPref("tabs")=="tabs_squared" &&
				document.getElementById("toolbar-menubar").getAttribute("autohide") == "true"
				&& document.getElementById("toolbar-menubar").getAttribute("inactive") == "true") {
				  document.getElementById("toolbar-menubar").style.marginBottom="26px";
			  } else if (classicthemerestorerjs.ctr.prefs.getCharPref("tabs")=="tabs_squaredc2" &&
				document.getElementById("toolbar-menubar").getAttribute("autohide") == "true"
				&& document.getElementById("toolbar-menubar").getAttribute("inactive") == "true") {
				  document.getElementById("toolbar-menubar").style.marginBottom="24px";
			  } else document.getElementById("toolbar-menubar").style.marginBottom="unset";
		  } else if(classicthemerestorerjs.ctr.osstring=="Darwin" && tabsintitlebar==true) { // MacOSX
			  document.getElementById("titlebar").style.paddingBottom="28px";
		  } else {} //Linux does not need special treatment
	  }
	  else {
		
		if(classicthemerestorerjs.ctr.prefs.getBoolPref("hidetbwote"))
		  document.getElementById("TabsToolbar").style.visibility = 'visible';
		else
		  document.getElementById("TabsToolbar").collapsed = false;
		
		document.getElementById("toolbar-menubar").style.marginBottom="unset";
		
		if(classicthemerestorerjs.ctr.osstring=="Darwin") document.getElementById("titlebar").style.paddingBottom="unset";
	  }

	}

  },
  
  // replace default icons with tab-favicons
  favIconinUrlbarCTR: function() {

	window.addEventListener("DOMContentLoaded", faviconInUrlbar, false);
	window.addEventListener("load", faviconInUrlbar, false);
	window.addEventListener("TabAttrModified", faviconInUrlbar, false);
	
	// Using additional 'setInterval' prevents some sites with empty or slow
	// loading tab icons from cheating a blank space into urlbars favicon area.
	setInterval(function() { faviconInUrlbar();	}, 500);
	
	function faviconInUrlbar(){
	 if(gBrowser.selectedTab.image) {
	  try {
		document.getElementById("page-proxy-favicon").removeAttribute("blank");
		document.getElementById("page-proxy-favicon").setAttribute("src", gBrowser.selectedTab.image);
	  } catch(e){}
	 }
	 else if(!gBrowser.selectedTab.image && classicthemerestorerjs.ctr.prefs.getBoolPref("emptyfavicon2")==true) {
	  try {
		document.getElementById("page-proxy-favicon").setAttribute("blank", true);
		document.getElementById("page-proxy-favicon").setAttribute("src", "chrome://classic_theme_restorer/content/images/default_favicon.png");
	  } catch(e){}
	 }
	 else if(!gBrowser.selectedTab.image && classicthemerestorerjs.ctr.prefs.getBoolPref("emptyfavicon")==true) {
	  try {
		document.getElementById("page-proxy-favicon").setAttribute("blank", true);
		document.getElementById("page-proxy-favicon").setAttribute("src", "chrome://classic_theme_restorer/content/images/default_dot_favicon.png");
	  } catch(e){}
	 }
	 else if(!gBrowser.selectedTab.image && classicthemerestorerjs.ctr.prefs.getBoolPref("emptyfavicon2")==false && classicthemerestorerjs.ctr.prefs.getBoolPref("emptyfavicon")==false) {
	  try {
		document.getElementById("page-proxy-favicon").setAttribute("blank", true);
		document.getElementById("page-proxy-favicon").removeAttribute("src");
	  } catch(e){}
	 }
	}

	classicthemerestorerjs.ctr.loadUnloadCSS('padlock_default',false);
	classicthemerestorerjs.ctr.loadUnloadCSS('padlock_classic',false);
	classicthemerestorerjs.ctr.loadUnloadCSS('padlock_modern',false);
	classicthemerestorerjs.ctr.loadUnloadCSS('padlock2_none',false);
	classicthemerestorerjs.ctr.loadUnloadCSS('padlock2_classic',false);
	classicthemerestorerjs.ctr.loadUnloadCSS('padlock2_modern',false);
	
	if (classicthemerestorerjs.ctr.prefs.getCharPref("padlock")!="padlock_none"){
	  classicthemerestorerjs.ctr.loadUnloadCSS(classicthemerestorerjs.ctr.prefs.getCharPref("padlock"),true);
	}
	
	if (classicthemerestorerjs.ctr.prefs.getBoolPref("padlockex")) classicthemerestorerjs.ctr.loadUnloadCSS("padlock_extra",true);
	  else classicthemerestorerjs.ctr.loadUnloadCSS("padlock_extra",false);
  
  },
  
  setCTRModeAttributes: function(which) {
  
	// only set attributes, if needed
	if(which=="icons" && document.getElementById("nav-bar").getAttribute('mode')=="icons") {}
	else {
		// needs a delay or Firefox will override values on restart
		setTimeout(function(){
		  try {
			document.getElementById("toolbar-menubar").setAttribute('mode',which);
			document.getElementById("TabsToolbar").setAttribute('mode',which);
			document.getElementById("nav-bar").setAttribute('mode',which);
			document.getElementById("PersonalToolbar").setAttribute('mode',which);
			document.getElementById("ctraddon_extra-bar").setAttribute('mode',which);
			document.getElementById("ctraddon_addon-bar").setAttribute('mode',which);
			document.getElementById("vertical-toolbar").setAttribute('mode',which);
		  } catch(e){}
		},500);
			
		window.addEventListener("DOMContentLoaded", function setCTRnavbariconsize(event){
			window.removeEventListener("DOMContentLoaded", setCTRnavbariconsize, false);
			
			// needs a delay or Firefox will override values on restart
			setTimeout(function(){
			  try {
				document.getElementById("toolbar-menubar").setAttribute('mode',which);
				document.getElementById("TabsToolbar").setAttribute('mode',which);
				document.getElementById("nav-bar").setAttribute('mode',which);
				document.getElementById("PersonalToolbar").setAttribute('mode',which);
				document.getElementById("ctraddon_extra-bar").setAttribute('mode',which);
				document.getElementById("ctraddon_addon-bar").setAttribute('mode',which);
				document.getElementById("vertical-toolbar").setAttribute('mode',which);
			  } catch(e){}
			},500);
		},false);
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
  
  // CTRs extra add-on bar keys
  CTRextraLocationBarKeyset: function() {
	setTimeout(function(){
	  try{
		if(classicthemerestorerjs.ctr.prefs.getBoolPref('extraurlkeycb')) {
		  document.getElementById("focusURLBar").setAttribute("command",'CtrExtension:ToggleUrlExtraBar');
		}
	  } catch(e){}
	  try{
		if(classicthemerestorerjs.ctr.prefs.getBoolPref('extraurlkeycb')) {
		  document.getElementById("focusURLBar2").setAttribute("command",'CtrExtension:ToggleUrlExtraBar');
		}
	  } catch(e){}
	},1000);
  },
  
  updateTabWidth: function() {
  	window.addEventListener("DOMWindowCreated", function load(event){
		//window.removeEventListener("DOMWindowCreated", load, false);
		classicthemerestorerjs.ctr._updateTabWidth();  
	},false);
  },
  
  _updateTabWidth: function() {
		
	var minWidthValue = classicthemerestorerjs.ctr.prefs.getIntPref('ctabmwidth');
	var maxWidthValue = classicthemerestorerjs.ctr.prefs.getIntPref('ctabwidth');

	//remove the rule, if already inserted at the end of document.styleSheets[1]
	try {
	  if (document.styleSheets[1].cssRules[document.styleSheets[1].cssRules.length-1].selectorText==".tabbrowser-tab:not([pinned])")
		document.styleSheets[1].deleteRule(document.styleSheets[1].cssRules.length-1);
	} catch(e){}
	
	// insert rules only, if non-default values are used
	if(minWidthValue!=100 || maxWidthValue !=210) {
	  try {
		// insert rule at the end of document.styleSheets[1], if non-default values are used
		var ruleEndPosition = document.styleSheets[1].cssRules.length;
		document.styleSheets[1].cssRules[document.styleSheets[1].insertRule('.tabbrowser-tab:not([pinned]){}', ruleEndPosition)];
		document.styleSheets[1].cssRules[ruleEndPosition].style.minWidth=""+minWidthValue+"px";
		document.styleSheets[1].cssRules[ruleEndPosition].style.maxWidth=""+maxWidthValue+"px";
	  } catch(e){}
	}
	
	/* logging */
	/*try {
		var style_rules = document.styleSheets[1].cssRules;
		console.log(style_rules);
	} catch(e) {}*/
  },

  // adds busy attribute to activity throbber
  restoreActivityThrobber: function(){

	// check, if tab attributes got modified
	var activityObserver = new MutationObserver(function(mutations) {
	  mutations.forEach(function(mutation) {
		ctrActivityThrobber();
	  });
	});
	
	// needed once after the option gets enabled
	activityObserver.observe(gBrowser.selectedTab, { attributes: true, attributeFilter: ['busy'] });
	
	// if tab is busy, add 'busy' attribute to 'ctraddon_navigator-throbber'
	function ctrActivityThrobber(){
	  if(gBrowser.selectedTab.hasAttribute('busy')) {
		try{
		  if(document.getElementById('ctraddon_navigator-throbber').hasAttribute('busy')==false)
		    document.getElementById('ctraddon_navigator-throbber').setAttribute('busy','true');
		}catch(e){}
	  }
	  else {
	    try{
		  if(document.getElementById('ctraddon_navigator-throbber').hasAttribute('busy'))
		    document.getElementById('ctraddon_navigator-throbber').removeAttribute('busy');
		}catch(e){}
	  }
	  activityObserver.observe(gBrowser.selectedTab, { attributes: true, attributeFilter: ['busy'] });
	}
	
	// listen to tab changes
	window.addEventListener('TabSelect', ctrActivityThrobber, false);
	window.addEventListener('TabOpen', ctrActivityThrobber, false);
	window.addEventListener('load', ctrActivityThrobber, false);

  },
  
  // check, if menubar can be moved
  moveMenubarToToolbar: function(){
  
	var mbarposition = this.prefs.getCharPref("mbarposition");
	var mbarlastposition = this.prefs.getCharPref("mbarpositionl");
	
	if (classicthemerestorerjs.ctr.osstring!="WINNT") {
	  return;
	} else if(mbarposition=="toolbar-menubar" && mbarlastposition=="toolbar-menubar") {
	  return;
	} else if(mbarposition=="ctraddon_extra-bar" && this.prefs.getIntPref("am_extrabars")<1) {
	  return;
	} else {
	  this.moveMenubar(mbarposition);
	}
  
  },
  
  // move menubar items to start position of a toolbar
  moveMenubar: function(mbarposition){

	switch (mbarposition) {
	  case "toolbar-menubar": _moveMenubar("toolbar-menubar"); classicthemerestorerjs.ctr.prefs.setCharPref("mbarpositionl",'toolbar-menubar'); break;
	  case "TabsToolbar": _moveMenubar("TabsToolbar"); classicthemerestorerjs.ctr.prefs.setCharPref("mbarpositionl",'TabsToolbar'); break;
	  case "nav-bar": _moveMenubar("nav-bar"); classicthemerestorerjs.ctr.prefs.setCharPref("mbarpositionl",'nav-bar'); break;
	  case "ctraddon_extra-bar": _moveMenubar("ctraddon_extra-bar"); classicthemerestorerjs.ctr.prefs.setCharPref("mbarpositionl",'ctraddon_extra-bar'); break;
	  case "PersonalToolbar": _moveMenubar("PersonalToolbar"); classicthemerestorerjs.ctr.prefs.setCharPref("mbarpositionl",'PersonalToolbar'); break;
	  case "ctraddon_addon-bar": _moveMenubar("ctraddon_addon-bar"); classicthemerestorerjs.ctr.prefs.setCharPref("mbarpositionl",'ctraddon_addon-bar'); break;
	  case "ctraddon_toolbar_dummy": _moveMenubar("ctraddon_toolbar_dummy"); classicthemerestorerjs.ctr.prefs.setCharPref("mbarpositionl",'ctraddon_toolbar_dummy'); break;
	}
	
	function _moveMenubar(new_menubar_pos){
	  setTimeout(function(){
		try{
			document.getElementById(''+new_menubar_pos).insertBefore(document.getElementById("menubar-items"), document.getElementById(''+new_menubar_pos).firstChild);
		} catch(e){}
	  },300);
	}
  
  },
  
  /* enable/disable css sheets*/
  loadUnloadCSS: function(which,enable) {
	
	const ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
	
	switch (which) {
	
		case "tabs_squared":
	
			// different appearance for 'tabs not on top' on MacOSX
			if (classicthemerestorerjs.ctr.osstring=="Darwin"){
		
				// enable 'tabs not on top' sheets already here to prevent glitches
				if (enable==true){
				  if(this.prefs.getCharPref("tabsontop")=='false'){
					manageCSS("tabsontop_off.css");
					manageCSS("tabs_squared-r-osx.css");
				  } else if(this.prefs.getCharPref("tabsontop")=='false2'){
					manageCSS("tabsontop_off2.css");
					manageCSS("tabs_squared-r-osx.css");
				  } else {
				    manageCSS("tabs_squared-osx.css");
				  }
				} else if(enable==false){
					manageCSS("tabs_squared-r-osx.css");
					manageCSS("tabs_squared-osx.css");
				}
			} else {
				manageCSS("tabs_squared.css");
			}
		
		break;
		
		case "tabs_squaredc2":		manageCSS("tabs_squaredc2.css"); 		break;
		
		case "tabs_squared2":
	
			// different appearance for 'tabs not on top' on MacOSX
			if (classicthemerestorerjs.ctr.osstring=="Darwin"){
		
				// enable 'tabs not on top' sheets already here to prevent glitches
				if (enable==true){
				  if(this.prefs.getCharPref("tabsontop")=='false'){
					manageCSS("tabsontop_off.css");
					manageCSS("tabs_squared-r-osx2.css");
				  } else if(this.prefs.getCharPref("tabsontop")=='false2'){
					manageCSS("tabsontop_off2.css");
					manageCSS("tabs_squared-r-osx2.css");
				  } else {
				    manageCSS("tabs_squared-osx2.css");
				  }
				} else if(enable==false){
					manageCSS("tabs_squared-r-osx2.css");
					manageCSS("tabs_squared-osx2.css");
				}
			} else {
				manageCSS("tabs_squared2.css");
			}
		
		break;
		
		case "tabs_curved":
	
			// different appearance for 'tabs not on top' on MacOSX
			if (classicthemerestorerjs.ctr.osstring=="Darwin"){
				
				// enable 'tabs not on top' sheets already here to prevent glitches
				if (enable==true){
				  if(this.prefs.getCharPref("tabsontop")=='false'){
					manageCSS("tabsontop_off.css");
					manageCSS("tabs_curved-r-osx.css");
				  } else if(this.prefs.getCharPref("tabsontop")=='false2'){
					manageCSS("tabsontop_off2.css");
					manageCSS("tabs_curved-r-osx.css");
				  } else {
				    manageCSS("tabs_curved.css");
				  }
				} else if(enable==false){
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

			// different appearance for 'tabs not on top' on MacOSX
			if (classicthemerestorerjs.ctr.osstring=="Darwin"){
			
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

			// different appearance for 'tabs not on top' on MacOSX
			if (classicthemerestorerjs.ctr.osstring=="Darwin"){
			
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
		
		case "e10stab_notd": 			manageCSS("e10s_tab_nounderline.css"); 	break;
		
		case "closetab_active": 		manageCSS("closetab_active.css");  		break;
		case "closetab_none": 			manageCSS("closetab_none.css");  		break;
		case "closetab_tb_end": 		manageCSS("closetab_tb_end.css");  		break;
		case "closetab_tb_start": 		manageCSS("closetab_tb_start.css");  	break;

		case "closetabhfl": 			manageCSS("closetab_hideonone.css");  	break;
		case "closealt": 				manageCSS("close_alticon.css");  		break;
		case "closeonleft":
		
			if(this.prefs.getCharPref("tabs")=="tabs_curvedall") manageCSS("close_onleft2.css");
			else manageCSS("close_onleft.css");
			
		break;
		
		case "smallnavbut":
			
			// no small button mode when 'icons + text' mode is used
			if (enable==true) {
				var navtxticomode = this.prefs.getCharPref("nav_txt_ico");
				if(navtxticomode=="iconstxt" || navtxticomode=="iconstxt2"
					|| navtxticomode=="iconstxt3" || navtxticomode=="iconstxt4"){
						enable=false;
				}
			}
	
			manageCSS("smallnavbut.css");
			
			this.loadUnloadCSS('cui_buttons',true);

		break;
		
		case "findbar_top": 		manageCSS("findbar_top.css");  			break;
		case "findbar_topa": 		manageCSS("findbar_top_alt.css"); 		break;
		case "findbar_bottoma": 	manageCSS("findbar_bottom_alt.css");	break;

		case "appbutton_v1":		manageCSS("appbutton.css");				break;
		case "appbutton_v1wt":		manageCSS("appbutton_wt.css");			break;
		case "appbutton_v2":		manageCSS("appbutton2wt.css");			break;
		case "appbutton_v2wt2":		manageCSS("appbutton2wt2.css");			break;
		case "appbutton_v2io":		manageCSS("appbutton2io.css");			break;
		case "appbutton_v2io2":		manageCSS("appbutton2io2.css");			break;
		case "appbutton_v2h":		manageCSS("appbutton2hidden.css");		break;
		case "appbutton_pm": 		manageCSS("paneluibutton_tweak.css");	break;
		
		case "appbutton_on_nav":	manageCSS("appbutton_on_navbar.css");	break;
		
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
		
		// no 'small button' mode, if 'icons + text' mode is used
		case "iconstxt3":
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
			if (classicthemerestorerjs.ctr.osstring=="Darwin") manageCSS("mode_icons_and_text.css");
			else manageCSS("mode_icons_and_text3.css");

		break;
		
		// no 'small button' mode, if 'icons + text' mode is used
		case "iconstxt4":
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
			if (classicthemerestorerjs.ctr.osstring=="Darwin") manageCSS("mode_icons_and_text2.css");
			else manageCSS("mode_icons_and_text4.css");

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
		case "nbcompact":			manageCSS("navbar_compact.css");		break;
		case "noconicons": 			manageCSS("nocontexticons.css");		break;
		case "svgfilters": 			manageCSS("svgfilters.css");			break;
		case "iat_notf_vt": 		manageCSS("mode_iat_no_vt.css");		break;
		case "to_notf_vt": 			manageCSS("mode_to_no_vt.css");			break;
		case "mbarforceleft": 		manageCSS("menuitems_forceleft.css");	break;
		case "mbarforceright": 		manageCSS("menuitems_forceright.css");	break;
		case "wincontrols": 		manageCSS("windowcontrols.css");		break;
		case "hideprbutton": 		manageCSS("hidepagereportbutton.css");	break;
		case "starinurl":			manageCSS("starinurl.css");				break;
		case "feedinurl":			manageCSS("feedinurl.css");				break;
		case "statusbar": 			manageCSS("statusbar.css"); 			break;
		case "hideurelstop": 		manageCSS("hideurlbarrelstop.css"); 	break;
		case "urlbardropm": 		manageCSS("urlbar_dropm.css"); 			break;
		case "combrelstop":			manageCSS("combrelstop.css");			break;
		case "panelmenucol": 		manageCSS("panelmenucolor.css");		break;

		case "altmenubar": 			manageCSS("menubar.css");				break;
		case "altmenubarpos": 		manageCSS("menubar_altpos.css");		break;
		case "altmenubarpos2": 		manageCSS("menubar_altpos2.css");		break;
		case "menubarnofog": 		manageCSS("menubar_nofog.css");			break;
		case "noaddonbarbg": 		manageCSS("noaddonbarbg.css");			break;
		case "notabfog": 			manageCSS("notabfog.css");				break;
		case "notabbg": 			manageCSS("notabbg.css");				break;
		case "nobookbarbg": 		manageCSS("nobookbarbg.css");			break;
		case "nonavbarbg": 			manageCSS("nonavbarbg.css");			break;
		case "nonavborder": 		manageCSS("nonavborder.css");			break;
		case "nonavtbborder": 		manageCSS("nonavtbborder.css");			break;
		case "hidesbclose": 		manageCSS("hidesidebarclose.css");		break;
		case "chevronfix": 			manageCSS("chevronfix.css");			break;
		case "highaddonsbar": 		manageCSS("higher_addonsbar.css");		break;
		case "addonbarfs": 			manageCSS("addonbar_infullscreen.css");	break;
		case "hightabpososx": 		manageCSS("higher_tabs_pos.css");		break;
		case "alttabstb": 			manageCSS("alttabstoolbar.css");		break;
		case "alttabstb2": 			manageCSS("alttabstoolbar2.css");		break;
		
		case "emptyfavicon": 		manageCSS("empty_favicon.css");			break;
		case "emptyfavicon2": 		manageCSS("empty_favicon2.css");		break;
		case "noemptypticon": 		manageCSS("empty_favicon_pt.css");		break;
		case "hidezoomres": 		manageCSS("hide_zoomreset.css");		break;
		case "alt_newtabp": 		manageCSS("alt_newtabpage.css");		break;
		case "noresizerxp": 		manageCSS("no_resizer_xp.css");			break;
		case "pmhidelabels": 		manageCSS("panelmenu_nolabels.css");	break;
		case "menupopupscr": 		manageCSS("menupopupscrollbar.css");	break;
		case "verifiedcolors": 		manageCSS("verifiedcolors.css");		break;
		case "hideprivmask": 		manageCSS("hideprivatemask.css");		break;
		case "bfurlbarfix": 		manageCSS("bf_urlbarfix.css");			break;
		case "bf_space": 			manageCSS("bf_space.css");				break;
	
		case "invicomenubar": 		manageCSS("invicons_menubar.css");		break;
		case "invicotabsbar": 		manageCSS("invicons_tabsbar.css");		break;
		case "inviconavbar": 		manageCSS("invicons_navbar.css");		break;
		case "invicoextrabar": 		manageCSS("invicons_extrabar.css");		break;
		case "invicobookbar": 		manageCSS("invicons_bookmarksbar.css");	break;
		case "invicoaddonbar": 		manageCSS("invicons_addonbar.css");		break;

		case "tabmokcolor": 		manageCSS("tabmokcolor.css");			break;
		case "tabmokcolor2": 		manageCSS("tabmokcolor2.css");			break;
		case "tabmokcolor3": 		manageCSS("tabmokcolor3.css");			break;
		case "tabmokcolor4": 		manageCSS("tabmokcolor4.css");			break;
		
		case "padlock_default": 	manageCSS("padlock_default.css");		break;
		case "padlock_classic": 	manageCSS("padlock_classic.css");		break;
		case "padlock_modern":		manageCSS("padlock_modern.css");		break;
		case "padlock_extra":		manageCSS("padlock_extra.css");			break;
		case "padlock2_classic": 	manageCSS("padlock2_classic.css");		break;
		case "padlock2_modern":		manageCSS("padlock2_modern.css");		break;
		case "padlock2_none":		manageCSS("padlock2_none.css");			break;
		
		case "throbberalt": 		manageCSS("throbberalt.css");			break;
		case "bmanimation": 		manageCSS("hidebmanimation.css");		break;
		case "pananimation": 		manageCSS("hidepanelanimation.css");	break;
		case "cpanelmenus": 		manageCSS("compactpanelmenus.css");		break;
		
		case "closeabarbut": 		manageCSS("closeabarbut.css");			break;
		case "appmenuitem": 		manageCSS("ctraddon_appmenuitem.css");	break;
		case "contextitem": 		manageCSS("ctraddon_contextmitem.css");	break;
		case "puictrbutton": 		manageCSS("ctraddon_puictrbutton.css");	break;
		case "toolsitem": 			manageCSS("ctraddon_toolsitem.css");	break;
		
		case "cuibuttons":			manageCSS("cuibuttons.css");			break;
		case "bmarkoinpw":			manageCSS("ctraddon_bmark_oinpw.css");	break;
		
		case "spaces_extra": 		manageCSS("spaces_extra.css");			break;
		case "persona_no_shadow": 		manageCSS("personanoshadow.css");	break;
		
		case "thirdpartythemes": 	manageCSS("thirdpartythemes.css");		break;
		
		case "aerocolors":
			
			removeOldSheet(this.aerocolors);
			
			if(enable==true) {
			
				var aero_color_tabs = '';
				
				if(this.prefs.getCharPref('tabs')=='tabs_squared'){
					aero_color_tabs  = '\
						#main-window[defaultfxtheme="true"] #tabbrowser-tabs:not(:-moz-lwtheme) .tabbrowser-tab[selected="true"]:not(:-moz-lwtheme) {\
						  background-image: linear-gradient(to top,#eaf2fb,#eef5fc,#fbfdff);\
						}\
						#main-window[defaultfxtheme="true"] #tabbrowser-tabs:not(:-moz-lwtheme) .tabbrowser-tab:not([selected="true"]):not(:hover):not(:-moz-lwtheme) {\
						  background-image: linear-gradient(to top, #868d94 0px, transparent 1px),linear-gradient(to top,#b4c0cc,#c8d4e1,#d1deec);\
						}\
						#main-window[defaultfxtheme="true"] #tabbrowser-tabs:not(:-moz-lwtheme) .tabbrowser-tab:not([selected="true"]):hover:not(:-moz-lwtheme) {\
						  background-image: linear-gradient(to top, #868d94 0px, transparent 1px),linear-gradient(to top,#d0dce8,#dce7f3,#e5effa);\
						}\
						#main-window[defaultfxtheme="true"] #tabbrowser-tabs:not(:-moz-lwtheme) .tabs-newtab-button:not(:-moz-lwtheme) {\
						  background-image: linear-gradient(to top, #868d94 0px, transparent 1px),linear-gradient(to top,#b4c0cc,#c8d4e1,#d1deec) !important;\
						}\
						#main-window[defaultfxtheme="true"] #tabbrowser-tabs:not(:-moz-lwtheme) .tabs-newtab-button:hover:not(:-moz-lwtheme) {\
						  background-image: linear-gradient(to top, #868d94 0px, transparent 1px),linear-gradient(to top,#d0dce8,#dce7f3,#e5effa) !important;\
						}\
					';
				}
				else if(this.prefs.getCharPref('tabs')=='tabs_squaredc2'){
					aero_color_tabs  = '\
						#main-window[defaultfxtheme="true"] .tabs-newtab-button:not(:-moz-lwtheme),\
						#main-window[defaultfxtheme="true"] .tabbrowser-tab:not(:-moz-lwtheme) .tab-content {\
						  background-image: linear-gradient(to top,#b4c0cc,#c8d4e1,#d1deec) !important;\
						}\
						#main-window[defaultfxtheme="true"] .tabs-newtab-button:hover:not(:-moz-lwtheme),\
						#main-window[defaultfxtheme="true"] .tabbrowser-tab:not([selected]):hover:not(:-moz-lwtheme) .tab-content {\
						  background-image: linear-gradient(to top,#d0dce8,#dce7f3,#e5effa) !important;\
						}\
						#main-window[defaultfxtheme="true"] .tabbrowser-tab[selected]:not(:-moz-lwtheme) .tab-content {\
						  background-image: linear-gradient(to top,#eaf2fb,#eef5fc,#fbfdff) !important;\
						}\
					';
				}
				else if(this.prefs.getCharPref('tabs')=='tabs_squared2'){
					aero_color_tabs  = '\
						#main-window[defaultfxtheme="true"] #tabbrowser-tabs:not(:-moz-lwtheme) .tabbrowser-tab[selected="true"]:not(:-moz-lwtheme) {\
						  background-image: linear-gradient(to top,#eaf2fb,#eef5fc,#fbfdff);\
						}\
					';
				}
				else if(this.prefs.getCharPref('tabs')=='tabs_curved'){
					aero_color_tabs  = '\
						#main-window #navigator-toolbox #TabsToolbar:not(:-moz-lwtheme) .tab-background-start[selected=true]:-moz-locale-dir(ltr)::before,\
						#main-window #navigator-toolbox #TabsToolbar:not(:-moz-lwtheme) .tab-background-end[selected=true]:-moz-locale-dir(rtl)::before {\
						  background-image: url(chrome://browser/skin/tabbrowser/tab-stroke-start.svg),linear-gradient(transparent, transparent 2px,#fbfdff 2px, #eaf2fb) !important;\
						  clip-path: url(chrome://browser/content/browser.xul#tab-curve-clip-path-start) !important;\
						}\
						#main-window #navigator-toolbox #TabsToolbar:not(:-moz-lwtheme) .tab-background-end[selected=true]:-moz-locale-dir(ltr)::before,\
						#main-window #navigator-toolbox #TabsToolbar:not(:-moz-lwtheme) .tab-background-start[selected=true]:-moz-locale-dir(rtl)::before {\
						  background-image: url(chrome://browser/skin/tabbrowser/tab-stroke-end.svg),linear-gradient(transparent, transparent 2px,#fbfdff 2px, #eaf2fb) !important;\
						  clip-path: url(chrome://browser/content/browser.xul#tab-curve-clip-path-end) !important;\
						}\
						#main-window #navigator-toolbox #TabsToolbar:-moz-lwtheme .tab-background-start[selected=true]:-moz-locale-dir(ltr)::before,\
						#main-window #navigator-toolbox #TabsToolbar:-moz-lwtheme .tab-background-end[selected=true]:-moz-locale-dir(rtl)::before {\
						  background: url(chrome://browser/skin/tabbrowser/tab-stroke-start.png),linear-gradient(transparent, transparent 2px,#fbfdff 2px, #eaf2fb) !important;\
						  clip-path: url(chrome://browser/content/browser.xul#tab-curve-clip-path-start) !important;\
						}\
						#main-window #navigator-toolbox #TabsToolbar:-moz-lwtheme .tab-background-end[selected=true]:-moz-locale-dir(ltr)::before,\
						#main-window #navigator-toolbox #TabsToolbar:-moz-lwtheme .tab-background-start[selected=true]:-moz-locale-dir(rtl)::before {\
						  background: url(chrome://browser/skin/tabbrowser/tab-stroke-end.png),linear-gradient(transparent, transparent 2px,#fbfdff 2px, #eaf2fb) !important;\
						  clip-path: url(chrome://browser/content/browser.xul#tab-curve-clip-path-end) !important;\
						}\
						#main-window #navigator-toolbox #TabsToolbar:not(:-moz-lwtheme) .tab-background-middle[selected=true],\
						#main-window #navigator-toolbox #TabsToolbar:-moz-lwtheme .tab-background-middle[selected=true] {\
						  background-color: transparent !important;\
						  background-image: url(chrome://browser/skin/tabbrowser/tab-active-middle.png),linear-gradient(transparent, transparent 2px,#fbfdff 2px, #eaf2fb), none !important;\
						}\
						#main-window[defaultfxtheme="true"] .tabbrowser-tab:not(:-moz-lwtheme):not([selected=true]):not(:hover) .tab-stack .tab-background-middle,\
						#main-window[defaultfxtheme="true"] .tabbrowser-tab:not(:-moz-lwtheme):not([selected=true]):not(:hover) .tab-background-start,\
						#main-window[defaultfxtheme="true"] .tabbrowser-tab:not(:-moz-lwtheme):not([selected=true]):not(:hover) .tab-background-end{\
						  background-image: linear-gradient(transparent, transparent 2px, #d1deec 0px, #c8d4e1, #b4c0cc), none !important;\
						}\
						#main-window[defaultfxtheme="true"] .tabbrowser-tab:not(:-moz-lwtheme):not([selected=true]):hover .tab-stack .tab-background-middle,\
						#main-window[defaultfxtheme="true"] .tabbrowser-tab:not(:-moz-lwtheme):not([selected=true]):hover .tab-background-start,\
						#main-window[defaultfxtheme="true"] .tabbrowser-tab:not(:-moz-lwtheme):not([selected=true]):hover .tab-background-end {\
						  background-image: linear-gradient(transparent, transparent 2px, #e5effa 0px, #dce7f3,#d0dce8), none !important;\
						}\
						#main-window[defaultfxtheme="true"] #TabsToolbar .tabs-newtab-button:not(:-moz-lwtheme){\
						  background-image: url(chrome://classic_theme_restorer/content/images/nt_aero_start.png),\
											url(chrome://classic_theme_restorer/content/images/nt_aero_middle.png),\
											url(chrome://classic_theme_restorer/content/images/nt_aero_end.png) !important;\
						}\
						#main-window[defaultfxtheme="true"] #TabsToolbar .tabs-newtab-button:not(:-moz-lwtheme):hover{\
						  background-image: url(chrome://classic_theme_restorer/content/images/nt_aero_start_hov.png),\
											url(chrome://classic_theme_restorer/content/images/nt_aero_middle_hov.png),\
											url(chrome://classic_theme_restorer/content/images/nt_aero_end_hov.png) !important;\
						}\
						.tabbrowser-tab:not([pinned]):not([protected]):not([autoReload]) .tab-close-button {\
						  -moz-appearance: none !important;\
						  -moz-image-region: rect(0, 64px, 16px, 48px) !important;\
						  border: none !important;\
						  padding: 0px !important;\
						  list-style-image: url("chrome://classic_theme_restorer/content/images/close.png") !important;\
						}\
						.tabbrowser-tab:not([pinned]):not([protected]):not([autoReload]) .tab-close-button:hover,\
						.tabbrowser-tab:not([pinned]):not([protected]):not([autoReload]) .tab-close-button:hover[selected="true"] {\
						  -moz-image-region: rect(0, 32px, 16px, 16px) !important;\
						}\
						.tabbrowser-tab:not([pinned]):not([protected]):not([autoReload]) .tab-close-button:hover:active,\
						.tabbrowser-tab:not([pinned]):not([protected]):not([autoReload]) .tab-close-button:hover:active[selected="true"] {\
						  -moz-image-region: rect(0, 48px, 16px, 32px) !important;\
						}\
						.tabbrowser-tab:not([pinned]):not([protected]):not([autoReload]) .tab-close-button[selected="true"] {\
						  -moz-image-region: rect(0, 16px, 16px, 0) !important;\
						}\
					';
				}
				else if(this.prefs.getCharPref('tabs')=='tabs_default'){
					aero_color_tabs  = '\
						#main-window #navigator-toolbox #TabsToolbar:not(:-moz-lwtheme) .tab-background-start[selected=true]:-moz-locale-dir(ltr)::before,\
						#main-window #navigator-toolbox #TabsToolbar:not(:-moz-lwtheme) .tab-background-end[selected=true]:-moz-locale-dir(rtl)::before {\
						  background-image: url(chrome://browser/skin/tabbrowser/tab-stroke-start.svg),linear-gradient(transparent, transparent 2px,#fbfdff 2px, #eaf2fb) !important;\
						  clip-path: url(chrome://browser/content/browser.xul#tab-curve-clip-path-start) !important;\
						}\
						#main-window #navigator-toolbox #TabsToolbar:not(:-moz-lwtheme) .tab-background-end[selected=true]:-moz-locale-dir(ltr)::before,\
						#main-window #navigator-toolbox #TabsToolbar:not(:-moz-lwtheme) .tab-background-start[selected=true]:-moz-locale-dir(rtl)::before {\
						  background-image: url(chrome://browser/skin/tabbrowser/tab-stroke-end.svg),linear-gradient(transparent, transparent 2px,#fbfdff 2px, #eaf2fb) !important;\
						  clip-path: url(chrome://browser/content/browser.xul#tab-curve-clip-path-end) !important;\
						}\
						#main-window #navigator-toolbox #TabsToolbar:-moz-lwtheme .tab-background-start[selected=true]:-moz-locale-dir(ltr)::before,\
						#main-window #navigator-toolbox #TabsToolbar:-moz-lwtheme .tab-background-end[selected=true]:-moz-locale-dir(rtl)::before {\
						  background: url(chrome://browser/skin/tabbrowser/tab-stroke-start.png),linear-gradient(transparent, transparent 2px,#fbfdff 2px, #eaf2fb) !important;\
						  clip-path: url(chrome://browser/content/browser.xul#tab-curve-clip-path-start) !important;\
						}\
						#main-window #navigator-toolbox #TabsToolbar:-moz-lwtheme .tab-background-end[selected=true]:-moz-locale-dir(ltr)::before,\
						#main-window #navigator-toolbox #TabsToolbar:-moz-lwtheme .tab-background-start[selected=true]:-moz-locale-dir(rtl)::before {\
						  background: url(chrome://browser/skin/tabbrowser/tab-stroke-end.png),linear-gradient(transparent, transparent 2px,#fbfdff 2px, #eaf2fb) !important;\
						  clip-path: url(chrome://browser/content/browser.xul#tab-curve-clip-path-end) !important;\
						}\
						#main-window #navigator-toolbox #TabsToolbar:not(:-moz-lwtheme) .tab-background-middle[selected=true],\
						#main-window #navigator-toolbox #TabsToolbar:-moz-lwtheme .tab-background-middle[selected=true] {\
						  background-color: transparent !important;\
						  background-image: url(chrome://browser/skin/tabbrowser/tab-active-middle.png),linear-gradient(transparent, transparent 2px,#fbfdff 2px, #eaf2fb), none !important;\
						}\
					';
				}
			
			
				this.aerocolors=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
					@namespace url(http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul);\
					@-moz-document url(chrome://browser/content/browser.xul) {\
						/* Toolbars */\
						#main-window[defaultfxtheme="true"] #nav-bar:not(:-moz-lwtheme){\
						  background-image: -moz-linear-gradient(#eaf2fb,#dbeaf9) !important;\
						  box-shadow:unset !important;\
						}\
						#main-window[defaultfxtheme="true"][tabsontop="false"] #TabsToolbar:not(:-moz-lwtheme),\
						#main-window[defaultfxtheme="true"] toolbar:not(#toolbar-menubar):not(#TabsToolbar):not(#nav-bar):not(.devtools-tabbar):not(#developer-toolbar):not(#puzzleBars-urlbar-bar),\
						#main-window[defaultfxtheme="true"] #ctraddon_urlextrabar:not(:-moz-lwtheme){\
						  background-image:unset !important;\
						  background-color:#dbeaf9 !important;\
						}\
						/* location bar / search bar borders */\
						#main-window[defaultfxtheme="true"] #urlbar:not(:-moz-lwtheme),\
						#main-window[defaultfxtheme="true"] .searchbar-textbox:not(:-moz-lwtheme) {\
						  border-color: hsla(210,54%,20%,.25) hsla(210,54%,20%,.27) hsla(210,54%,20%,.3) hsla(210,54%,20%,.27) !important;\
						}\
						#main-window[defaultfxtheme="true"] #urlbar:not(:-moz-lwtheme)[focused],\
						#main-window[defaultfxtheme="true"] .searchbar-textbox:not(:-moz-lwtheme)[focused] {\
						  border-color: Highlight !important;\
						}\
						#main-window[defaultfxtheme="true"] #urlbar:not(:-moz-lwtheme):not([focused]):hover,\
						#main-window[defaultfxtheme="true"] .searchbar-textbox:not(:-moz-lwtheme):not([focused]):hover {\
						  border-color: hsla(210,54%,20%,.35) hsla(210,54%,20%,.37) hsla(210,54%,20%,.4) hsla(210,54%,20%,.37) !important;\
						}\
						#main-window[defaultfxtheme="true"] #urlbar:not(:-moz-lwtheme)[focused],\
						#main-window[defaultfxtheme="true"] .searchbar-textbox:not(:-moz-lwtheme)[focused] {\
						  border-color: hsla(206,100%,60%,.65) hsla(206,100%,55%,.65) hsla(206,100%,50%,.65) hsla(206,100%,55%,.65) !important;\
						}\
						@media (-moz-windows-classic), (-moz-windows-default-theme) {\
							/* CTR appmenu */\
							#main-window[defaultfxtheme="true"] #appmenuPrimaryPane {\
							  -moz-border-end: 1px solid #d6e5f5 !important;\
							}\
							#main-window[defaultfxtheme="true"] #appmenu-popup {\
							  -moz-appearance: none !important;\
							  background: white !important;\
							  border: 1px solid ThreeDShadow !important;\
							}\
							#main-window[defaultfxtheme="true"] #appmenuPrimaryPane {\
							  background-color: rgba(255,255,255,0.5) !important;\
							  padding: 2px !important;\
							  -moz-border-end: 1px solid #d6e5f5 !important;\
							}\
							#main-window[defaultfxtheme="true"] #appmenuSecondaryPane {\
							  background-color: #f1f5fb !important;\
							  -moz-padding-start: 3px !important;\
							  -moz-padding-end: 2px !important;\
							  padding-top: 2px !important;\
							  padding-bottom: 2px !important;\
							  -moz-border-start: 0px !important;\
							}\
							#main-window[defaultfxtheme="true"] #appmenuPrimaryPane menupopup {\
							  -moz-appearance: none !important;\
							  background:white !important;\
							  border: 3px solid !important;\
							  -moz-border-top-colors: ThreeDShadow white !important;\
							  -moz-border-bottom-colors: ThreeDShadow white !important;\
							  -moz-border-left-colors: ThreeDShadow white !important;\
							  -moz-border-right-colors: ThreeDShadow white !important;\
							}\
							#main-window[defaultfxtheme="true"] #appmenuSecondaryPane menupopup {\
							  -moz-appearance: none !important;\
							  background: #f1f5fb !important;\
							  border: 3px solid !important;\
							  -moz-border-top-colors: ThreeDShadow #f1f5fb !important;\
							  -moz-border-bottom-colors: ThreeDShadow #f1f5fb !important;\
							  -moz-border-left-colors: ThreeDShadow #f1f5fb !important;\
							  -moz-border-right-colors: ThreeDShadow #f1f5fb !important;\
							}\
							#main-window[defaultfxtheme="true"] #appmenuPrimaryPane > menuseparator {\
							  -moz-appearance: none !important;\
							  margin-top: 3px !important;\
							  margin-bottom: 3px !important;\
							  padding: 0 !important;\
							  border-top: 1px solid #d6e5f5 !important;\
							  border-bottom: none !important;\
							}\
						}\
					}\
					'+aero_color_tabs+'\
				'), null, null);
			
				applyNewSheet(this.aerocolors);
			}
			
		break;
		
		case "appbuttonc_custom":
		
			removeOldSheet(this.appbutton_color);
			
			if(enable==true && this.prefs.getCharPref('appbuttonc')=='appbuttonc_custom') {
			
				this.appbutton_color=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
					@namespace url(http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul);\
					@-moz-document url(chrome://browser/content/browser.xul) {\
						#ctraddon_appbutton2:not(:hover):not(:active):not([open]){\
						  background-image: linear-gradient('+this.prefs.getCharPref('cappbutc1')+', '+this.prefs.getCharPref('cappbutc2')+' 95%) !important;\
						  border-color: hsla(210,59%,13%,.9) !important;\
						  box-shadow: 0 1px 0 hsla(210,48%,90%,.15) inset,\
									  0 0 2px 1px hsla(211,65%,85%,.15) inset !important;\
						}\
						#TabsToolbar #ctraddon_appbutton{\
						  background: linear-gradient('+this.prefs.getCharPref('cappbutc1')+', '+this.prefs.getCharPref('cappbutc2')+' 95%) !important;\
						  border-color: hsla(210,59%,13%,.9) !important;\
						  box-shadow: 0 1px 0 hsla(210,48%,90%,.15) inset,\
									  0 0 2px 1px hsla(211,65%,85%,.15) inset !important;\
						}\
						#TabsToolbar #ctraddon_appbutton:hover:not(:active):not([open]),\
						#ctraddon_appbutton2:hover:not(:active):not([open]){\
						  background-image: radial-gradient(farthest-side at center bottom, hsla(210,48%,90%,.5) 10%, hsla(210,48%,90%,0) 70%),\
											radial-gradient(farthest-side at center bottom, hsla(211,70%,83%,.5), hsla(211,70%,83%,0)),\
											linear-gradient('+this.prefs.getCharPref('cappbutc1')+', '+this.prefs.getCharPref('cappbutc2')+' 95%) !important;\
						  border-color: hsla(210,59%,13%,.9) !important;\
						  box-shadow: 0 1px 0 hsla(210,48%,90%,.15) inset,\
									  0 0 2px 1px hsla(210,48%,90%,.4) inset,\
									  0 -1px 0 hsla(210,48%,90%,.2) inset !important;\
						}\
						#TabsToolbar #ctraddon_appbutton:hover:active,\
						#TabsToolbar #ctraddon_appbutton[open],\
						#ctraddon_appbutton2:hover:active,\
						#ctraddon_appbutton2[open] {\
						  background-image: linear-gradient('+this.prefs.getCharPref('cappbutc1')+', '+this.prefs.getCharPref('cappbutc2')+' 95%) !important;\
						  box-shadow: 0 2px 3px rgba(0,0,0,.4) inset,\
									  0 1px 1px rgba(0,0,0,.2) inset !important;\
						}\
						#main-window[privatebrowsingmode=temporary] #TabsToolbar #ctraddon_appbutton,\
						#main-window[privatebrowsingmode=temporary] #ctraddon_appbutton2{\
						  background-image: linear-gradient(rgb(153,38,211), rgb(105,19,163) 95%) !important;\
						  border-color: rgba(43,8,65,.9) !important;\
						}\
						#main-window[privatebrowsingmode=temporary] #TabsToolbar #ctraddon_appbutton:hover:not(:active):not([open]),\
						#main-window[privatebrowsingmode=temporary] #ctraddon_appbutton2:hover:not(:active):not([open]){\
						  background-image: radial-gradient(farthest-side at center bottom, rgba(240,193,255,.5) 10%, rgba(240,193,255,0) 70%),\
											radial-gradient(farthest-side at center bottom, rgb(192,81,247), rgba(236,172,255,0)),\
											linear-gradient(rgb(144,20,207), rgb(95,0,158) 95%) !important;\
						  border-color: rgba(43,8,65,.9) !important;\
						  box-shadow: 0 1px 0 rgba(255,255,255,.1) inset,\
									  0 0 2px 1px rgba(240,193,255,.7) inset,\
									  0 -1px 0 rgba(240,193,255,.5) inset !important;\
						}\
						#main-window[privatebrowsingmode=temporary] #TabsToolbar #ctraddon_appbutton:hover:active,\
						#main-window[privatebrowsingmode=temporary] #TabsToolbar #ctraddon_appbutton[open],\
						#main-window[privatebrowsingmode=temporary] #ctraddon_appbutton2:hover:active,\
						#main-window[privatebrowsingmode=temporary]  #ctraddon_appbutton2[open] {\
						  background-image: linear-gradient(rgb(144,20,207), rgb(95,0,158) 95%) !important;\
						}\
					}\
				'), null, null);
			
				applyNewSheet(this.appbutton_color);
			
			}
		
		break;
		
		case "ctabheight":
			removeOldSheet(this.tabheight);
			
			if(enable==true && this.prefs.getBoolPref('ctabheightcb')){
			
				var linuxbutton='';
				
				if (classicthemerestorerjs.ctr.osstring!="Darwin" && classicthemerestorerjs.ctr.osstring!="WINNT") {
					linuxbutton='\
						#TabsToolbar toolbarbutton{\
						  padding-top:0 !important;\
						  padding-bottom:0 !important;\
						}\
					';
				}
			
				this.tabheight=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
					.tab-background-start[selected=true]::after,\
					.tab-background-start[selected=true]::before,\
					.tab-background-start,\
					.tab-background-end,\
					.tab-background-end[selected=true]::after,\
					.tab-background-end[selected=true]::before,\
					.tabbrowser-tab .tab-stack .tab-background,\
					.tabs-newtab-button,\
					#tabbrowser-tabs,\
					.tabbrowser-tab,\
					.tabbrowser-tab[pinned],\
					.tabbrowser-tab .tab-stack,\
					.tabbrowser-tab .tab-stack > .tab-content{\
					  min-height:'+this.prefs.getIntPref('ctabheight')+'px !important;\
					}\
					#TabsToolbar .tabbrowser-tab[pinned],\
					#TabsToolbar .tabs-newtab-button,\
					#TabsToolbar .tabbrowser-tab{\
					  height: '+this.prefs.getIntPref('ctabheight')+'px !important;\
					}\
					'+linuxbutton+'\
				'), null, null);
				
				applyNewSheet(this.tabheight);
			
			}
		
		break;

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
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab:not(:-moz-lwtheme):not([selected=true]):not(:hover) .tab-background-end,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab:-moz-lwtheme:not([selected=true]):not(:hover) .tab-stack .tab-background-middle,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab:-moz-lwtheme:not([selected=true]):not(:hover) .tab-background-start,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab:-moz-lwtheme:not([selected=true]):not(:hover) .tab-background-end{\
						  background-image: linear-gradient(transparent, transparent 2px, '+this.prefs.getCharPref('ctab1')+' 0px, '+this.prefs.getCharPref('ctab2')+'), none !important;\
						}\
						.tabbrowser-tab:-moz-lwtheme:not(:hover) > .tab-stack > .tab-background:not([selected=true]) {\
						  background-position: left bottom, 30px bottom, right bottom;\
						  background-repeat: no-repeat;\
						  background-size: 30px 100%, calc(100% - (2 * 30px)) 100%, 30px 100%;\
						}\
						.tabbrowser-tab:-moz-lwtheme:not([selected=true]):not(:hover) .tab-background-start:-moz-locale-dir(ltr),\
						.tabbrowser-tab:-moz-lwtheme:not([selected=true]):not(:hover) .tab-background-end:-moz-locale-dir(rtl) {\
						  clip-path: url(chrome://browser/content/browser.xul#tab-curve-clip-path-start) !important;\
						}\
						.tabbrowser-tab:-moz-lwtheme:not([selected=true]):not(:hover) .tab-background-end:-moz-locale-dir(ltr),\
						.tabbrowser-tab:-moz-lwtheme:not([selected=true]):not(:hover) .tab-background-start:-moz-locale-dir(rtl) {\
						  clip-path: url(chrome://browser/content/browser.xul#tab-curve-clip-path-end) !important;\
						}\
					'), null, null);
				
				}

				applyNewSheet(this.ctabsheet_def);
			}

		break;
		
		case "tabcolor_act":

			removeOldSheet(this.ctabsheet_act);
			
			if(enable==true){
			
				var tabc_act_tb_sheet = '';
				if (this.prefs.getBoolPref('tabc_act_tb')) {
				
					var tb_color = this.prefs.getCharPref('ctabact2');
					
					if(classicthemerestorerjs.ctr.osstring=="Darwin") {
					  if (classicthemerestorerjs.ctr.prefs.getCharPref("tabsontop")=='false'
							|| classicthemerestorerjs.ctr.prefs.getCharPref("tabsontop")=='false2')
						if (this.prefs.getCharPref('tabs')!='tabs_curved')
						  tb_color = this.prefs.getCharPref('ctabact1');
					}
				
					tabc_act_tb_sheet = '\
						#nav-bar{\
						  box-shadow:none !important;\
						  background: none !important;\
						}\
						#navigator-toolbox toolbar:not(#TabsToolbar):not(#toolbar-menubar):not(#puzzleBars-urlbar-bar),\
						#main-window[defaultfxtheme="true"] #ctraddon_urlextrabar:not(:-moz-lwtheme),\
						#browser-bottombox toolbar:not(#developer-toolbar):not(.devtools-tabbar),\
						#main-window[defaultfxtheme="true"] #navigator-toolbox #TabsToolbar[tabsontop=false]:not(:-moz-lwtheme),\
						#main-window[defaultfxtheme="true"][tabsontop=false]:not([tabsintitlebar]):not(:-moz-lwtheme) #toolbar-menubar,\
						#TabsToolbar[tabsontop="false"]{\
						  background-color: '+tb_color+' !important;\
						}\
					';
				}
		
				if (this.prefs.getCharPref('tabs')=='tabs_squared') {
				
					this.ctabsheet_act=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[selected="true"] {\
						  background-image: linear-gradient('+this.prefs.getCharPref('ctabact1')+','+this.prefs.getCharPref('ctabact2')+') !important;\
						}\
						'+tabc_act_tb_sheet+'\
					'), null, null);
				
				}
				
				else if (this.prefs.getCharPref('tabs')=='tabs_squaredc2') {
				
					this.ctabsheet_act=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[selected] .tab-content {\
						  background-image: linear-gradient('+this.prefs.getCharPref('ctabact1')+','+this.prefs.getCharPref('ctabact2')+') !important;\
						}\
						'+tabc_act_tb_sheet+'\
					'), null, null);
				
				}
				
				else if (this.prefs.getCharPref('tabs')=='tabs_squared2') {
				
					this.ctabsheet_act=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[selected="true"] {\
						  background-image: linear-gradient('+this.prefs.getCharPref('ctabact1')+','+this.prefs.getCharPref('ctabact2')+') !important;\
						}\
						'+tabc_act_tb_sheet+'\
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
						#main-window #navigator-toolbox #TabsToolbar:-moz-lwtheme .tab-background-start[selected=true]:-moz-locale-dir(ltr)::before,\
						#main-window #navigator-toolbox #TabsToolbar:-moz-lwtheme .tab-background-end[selected=true]:-moz-locale-dir(rtl)::before {\
						  background: url(chrome://browser/skin/tabbrowser/tab-stroke-start.png),linear-gradient(transparent, transparent 2px,'+this.prefs.getCharPref('ctabact1')+' 2px, '+this.prefs.getCharPref('ctabact2')+') !important;\
						  clip-path: url(chrome://browser/content/browser.xul#tab-curve-clip-path-start) !important;\
						}\
						#main-window #navigator-toolbox #TabsToolbar:-moz-lwtheme .tab-background-end[selected=true]:-moz-locale-dir(ltr)::before,\
						#main-window #navigator-toolbox #TabsToolbar:-moz-lwtheme .tab-background-start[selected=true]:-moz-locale-dir(rtl)::before {\
						  background: url(chrome://browser/skin/tabbrowser/tab-stroke-end.png),linear-gradient(transparent, transparent 2px,'+this.prefs.getCharPref('ctabact1')+' 2px, '+this.prefs.getCharPref('ctabact2')+') !important;\
						  clip-path: url(chrome://browser/content/browser.xul#tab-curve-clip-path-end) !important;\
						}\
						#main-window #navigator-toolbox #TabsToolbar:not(:-moz-lwtheme) .tab-background-middle[selected=true],\
						#main-window #navigator-toolbox #TabsToolbar:-moz-lwtheme .tab-background-middle[selected=true] {\
						  background-color: transparent !important;\
						  background-image: url(chrome://browser/skin/tabbrowser/tab-active-middle.png),linear-gradient(transparent, transparent 2px,'+this.prefs.getCharPref('ctabact1')+' 2px, '+this.prefs.getCharPref('ctabact2')+'), none !important;\
						}\
						'+tabc_act_tb_sheet+'\
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
						#main-window #navigator-toolbox #TabsToolbar:-moz-lwtheme .tab-background-start[selected=true]:-moz-locale-dir(ltr)::before,\
						#main-window #navigator-toolbox #TabsToolbar:-moz-lwtheme .tab-background-end[selected=true]:-moz-locale-dir(rtl)::before {\
						  background: url(chrome://browser/skin/tabbrowser/tab-stroke-start.png),linear-gradient(transparent, transparent 2px,'+this.prefs.getCharPref('ctabact1')+' 2px, '+this.prefs.getCharPref('ctabact2')+') !important;\
						  clip-path: url(chrome://browser/content/browser.xul#tab-curve-clip-path-start) !important;\
						}\
						#main-window #navigator-toolbox #TabsToolbar:-moz-lwtheme .tab-background-end[selected=true]:-moz-locale-dir(ltr)::before,\
						#main-window #navigator-toolbox #TabsToolbar:-moz-lwtheme .tab-background-start[selected=true]:-moz-locale-dir(rtl)::before {\
						  background: url(chrome://browser/skin/tabbrowser/tab-stroke-end.png),linear-gradient(transparent, transparent 2px,'+this.prefs.getCharPref('ctabact1')+' 2px, '+this.prefs.getCharPref('ctabact2')+') !important;\
						  clip-path: url(chrome://browser/content/browser.xul#tab-curve-clip-path-end) !important;\
						}\
						#main-window #navigator-toolbox #TabsToolbar:not(:-moz-lwtheme) .tab-background-middle[selected=true],\
						#main-window #navigator-toolbox #TabsToolbar:-moz-lwtheme .tab-background-middle[selected=true] {\
						  background-color: transparent !important;\
						  background-image: url(chrome://browser/skin/tabbrowser/tab-active-middle.png),linear-gradient(transparent, transparent 2px,'+this.prefs.getCharPref('ctabact1')+' 2px, '+this.prefs.getCharPref('ctabact2')+'), none !important;\
						}\
						'+tabc_act_tb_sheet+'\
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
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab:not(:-moz-lwtheme):not([selected=true]):hover .tab-background-end,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab:-moz-lwtheme:not([selected=true]):hover .tab-stack .tab-background-middle,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab:-moz-lwtheme:not([selected=true]):hover .tab-background-start,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab:-moz-lwtheme:not([selected=true]):hover .tab-background-end{\
						  background-image: linear-gradient(transparent, transparent 2px, '+this.prefs.getCharPref('ctabhov1')+' 0px, '+this.prefs.getCharPref('ctabhov2')+'), none !important;\
						}\
						.tabbrowser-tab:-moz-lwtheme:hover > .tab-stack > .tab-background:not([selected=true]){\
						  background-position: left bottom, 30px bottom, right bottom;\
						  background-repeat: no-repeat;\
						  background-size: 30px 100%, calc(100% - (2 * 30px)) 100%, 30px 100%;\
						}\
						.tabbrowser-tab:-moz-lwtheme:not([selected=true]):hover .tab-background-start:-moz-locale-dir(ltr),\
						.tabbrowser-tab:-moz-lwtheme:not([selected=true]):hover .tab-background-end:-moz-locale-dir(rtl) {\
						  clip-path: url(chrome://browser/content/browser.xul#tab-curve-clip-path-start) !important;\
						}\
						.tabbrowser-tab:-moz-lwtheme:not([selected=true]):hover .tab-background-end:-moz-locale-dir(ltr),\
						.tabbrowser-tab:-moz-lwtheme:not([selected=true]):hover .tab-background-start:-moz-locale-dir(rtl) {\
						  clip-path: url(chrome://browser/content/browser.xul#tab-curve-clip-path-end) !important;\
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
				
				  if(this.prefs.getBoolPref('tabc_hov_unl')){
				
					this.ctabsheet_pen=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[pending]:not([selected="true"]):hover,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[pending]:not([selected="true"]):not(:hover) {\
						  background-image: linear-gradient('+this.prefs.getCharPref('ctabpen1')+','+this.prefs.getCharPref('ctabpen2')+') !important;\
						}\
					'), null, null);
				  } else {
					this.ctabsheet_pen=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[pending]:not([selected="true"]):not(:hover) {\
						  background-image: linear-gradient('+this.prefs.getCharPref('ctabpen1')+','+this.prefs.getCharPref('ctabpen2')+') !important;\
						}\
					'), null, null);
				  }
				
				}
				
				else if (this.prefs.getCharPref('tabs')=='tabs_squaredc2') {
				
				  if(this.prefs.getBoolPref('tabc_hov_unl')){
				
					this.ctabsheet_pen=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[pending]:not([selected="true"]):hover .tab-content,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[pending]:not([selected="true"]):not(:hover) .tab-content {\
						  background-image: linear-gradient('+this.prefs.getCharPref('ctabpen1')+','+this.prefs.getCharPref('ctabpen2')+') !important;\
						}\
					'), null, null);
					
				  } else {
					this.ctabsheet_pen=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[pending]:not([selected="true"]):not(:hover) .tab-content {\
						  background-image: linear-gradient('+this.prefs.getCharPref('ctabpen1')+','+this.prefs.getCharPref('ctabpen2')+') !important;\
						}\
					'), null, null);
				  }
				
				}
				
				else if (this.prefs.getCharPref('tabs')=='tabs_curved') {
				
				  if(this.prefs.getBoolPref('tabc_hov_unl')){
				
					this.ctabsheet_pen=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[pending]:not(:-moz-lwtheme):not([selected=true]):hover .tab-stack .tab-background-middle,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[pending]:not(:-moz-lwtheme):not([selected=true]):hover .tab-background-start,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[pending]:not(:-moz-lwtheme):not([selected=true]):hover .tab-background-end,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[pending]:-moz-lwtheme:not([selected=true]):hover .tab-stack .tab-background-middle,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[pending]:-moz-lwtheme:not([selected=true]):hover .tab-background-start,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[pending]:-moz-lwtheme:not([selected=true]):hover .tab-background-end,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[pending]:not(:-moz-lwtheme):not([selected=true]):not(:hover) .tab-stack .tab-background-middle,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[pending]:not(:-moz-lwtheme):not([selected=true]):not(:hover) .tab-background-start,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[pending]:not(:-moz-lwtheme):not([selected=true]):not(:hover) .tab-background-end,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[pending]:-moz-lwtheme:not([selected=true]):not(:hover) .tab-stack .tab-background-middle,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[pending]:-moz-lwtheme:not([selected=true]):not(:hover) .tab-background-start,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[pending]:-moz-lwtheme:not([selected=true]):not(:hover) .tab-background-end{\
						  background-image: linear-gradient(transparent, transparent 2px, '+this.prefs.getCharPref('ctabpen1')+' 0px, '+this.prefs.getCharPref('ctabpen2')+'), none !important;\
						}\
						.tabbrowser-tab[pending]:not(:-moz-lwtheme):not([selected=true]):hover > .tab-stack > .tab-background:not([selected=true]),\
						.tabbrowser-tab[pending]:not(:-moz-lwtheme):not([selected=true]):not(:hover) > .tab-stack > .tab-background:not([selected=true]){\
						  background-position: left bottom, 30px bottom, right bottom;\
						  background-repeat: no-repeat;\
						  background-size: 30px 100%, calc(100% - (2 * 30px)) 100%, 30px 100%;\
						}\
						.tabbrowser-tab[pending]:not(:-moz-lwtheme):not([selected=true]):hover .tab-background-start:-moz-locale-dir(ltr),\
						.tabbrowser-tab[pending]:not(:-moz-lwtheme):not([selected=true]):hover .tab-background-end:-moz-locale-dir(rtl),\
						.tabbrowser-tab[pending]:not(:-moz-lwtheme):not([selected=true]):not(:hover) .tab-background-start:-moz-locale-dir(ltr),\
						.tabbrowser-tab[pending]:not(:-moz-lwtheme):not([selected=true]):not(:hover) .tab-background-end:-moz-locale-dir(rtl) {\
						  clip-path: url(chrome://browser/content/browser.xul#tab-curve-clip-path-start) !important;\
						}\
						.tabbrowser-tab[pending]:not(:-moz-lwtheme):not([selected=true]):hover .tab-background-end:-moz-locale-dir(ltr),\
						.tabbrowser-tab[pending]:not(:-moz-lwtheme):not([selected=true]):hover .tab-background-start:-moz-locale-dir(rtl),\
						.tabbrowser-tab[pending]:not(:-moz-lwtheme):not([selected=true]):not(:hover) .tab-background-end:-moz-locale-dir(ltr),\
						.tabbrowser-tab[pending]:not(:-moz-lwtheme):not([selected=true]):not(:hover) .tab-background-start:-moz-locale-dir(rtl) {\
						  clip-path: url(chrome://browser/content/browser.xul#tab-curve-clip-path-end) !important;\
						}\
					'), null, null);
					
				  } else {
					this.ctabsheet_pen=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[pending]:not(:-moz-lwtheme):not([selected=true]):not(:hover) .tab-stack .tab-background-middle,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[pending]:not(:-moz-lwtheme):not([selected=true]):not(:hover) .tab-background-start,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[pending]:not(:-moz-lwtheme):not([selected=true]):not(:hover) .tab-background-end,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[pending]:-moz-lwtheme:not([selected=true]):not(:hover) .tab-stack .tab-background-middle,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[pending]:-moz-lwtheme:not([selected=true]):not(:hover) .tab-background-start,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[pending]:-moz-lwtheme:not([selected=true]):not(:hover) .tab-background-end{\
						  background-image: linear-gradient(transparent, transparent 2px, '+this.prefs.getCharPref('ctabpen1')+' 0px, '+this.prefs.getCharPref('ctabpen2')+'), none !important;\
						}\
						.tabbrowser-tab[pending]:not(:-moz-lwtheme):not([selected=true]):not(:hover) > .tab-stack > .tab-background:not([selected=true]){\
						  background-position: left bottom, 30px bottom, right bottom;\
						  background-repeat: no-repeat;\
						  background-size: 30px 100%, calc(100% - (2 * 30px)) 100%, 30px 100%;\
						}\
						.tabbrowser-tab[pending]:not(:-moz-lwtheme):not([selected=true]):not(:hover) .tab-background-start:-moz-locale-dir(ltr),\
						.tabbrowser-tab[pending]:not(:-moz-lwtheme):not([selected=true]):not(:hover) .tab-background-end:-moz-locale-dir(rtl) {\
						  clip-path: url(chrome://browser/content/browser.xul#tab-curve-clip-path-start) !important;\
						}\
						.tabbrowser-tab[pending]:not(:-moz-lwtheme):not([selected=true]):not(:hover) .tab-background-end:-moz-locale-dir(ltr),\
						.tabbrowser-tab[pending]:not(:-moz-lwtheme):not([selected=true]):not(:hover) .tab-background-start:-moz-locale-dir(rtl) {\
						  clip-path: url(chrome://browser/content/browser.xul#tab-curve-clip-path-end) !important;\
						}\
					'), null, null);
				  }
				
				}
				
				applyNewSheet(this.ctabsheet_pen);
			}

		break;

		case "tabcolor_unr":

			removeOldSheet(this.ctabsheet_unr);
			
			if(enable==true){
		
				if (this.prefs.getCharPref('tabs')=='tabs_squared') {
				
				  if(this.prefs.getBoolPref('tabc_hov_unr')){
				
					this.ctabsheet_unr=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[unread]:not([selected="true"]):hover,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[unread]:not([selected="true"]):not(:hover) {\
						  background-image: linear-gradient('+this.prefs.getCharPref('ctabunr1')+','+this.prefs.getCharPref('ctabunr2')+') !important;\
						}\
					'), null, null);
					
				  } else {
				
					this.ctabsheet_unr=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[unread]:not([selected="true"]):not(:hover) {\
						  background-image: linear-gradient('+this.prefs.getCharPref('ctabunr1')+','+this.prefs.getCharPref('ctabunr2')+') !important;\
						}\
					'), null, null);
					
				  }
				
				}
				
				else if (this.prefs.getCharPref('tabs')=='tabs_squaredc2') {
				
				  if(this.prefs.getBoolPref('tabc_hov_unr')){
				
					this.ctabsheet_unr=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[unread]:not([selected="true"]):hover .tab-content,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[unread]:not([selected="true"]):not(:hover) .tab-content {\
						  background-image: linear-gradient('+this.prefs.getCharPref('ctabunr1')+','+this.prefs.getCharPref('ctabunr2')+') !important;\
						}\
					'), null, null);
					
				  } else {
				
					this.ctabsheet_unr=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[unread]:not([selected="true"]):not(:hover) .tab-content {\
						  background-image: linear-gradient('+this.prefs.getCharPref('ctabunr1')+','+this.prefs.getCharPref('ctabunr2')+') !important;\
						}\
					'), null, null);
					
				  }
				
				}
				
				else if (this.prefs.getCharPref('tabs')=='tabs_curved') {
				
				  if(this.prefs.getBoolPref('tabc_hov_unr')){
				
					this.ctabsheet_unr=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[unread]:not(:-moz-lwtheme):not([selected=true]):hover .tab-stack .tab-background-middle,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[unread]:not(:-moz-lwtheme):not([selected=true]):hover .tab-background-start,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[unread]:not(:-moz-lwtheme):not([selected=true]):hover .tab-background-end,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[unread]:-moz-lwtheme:not([selected=true]):hover .tab-stack .tab-background-middle,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[unread]:-moz-lwtheme:not([selected=true]):hover .tab-background-start,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[unread]:-moz-lwtheme:not([selected=true]):hover .tab-background-end,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[unread]:not(:-moz-lwtheme):not([selected=true]):not(:hover) .tab-stack .tab-background-middle,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[unread]:not(:-moz-lwtheme):not([selected=true]):not(:hover) .tab-background-start,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[unread]:not(:-moz-lwtheme):not([selected=true]):not(:hover) .tab-background-end,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[unread]:-moz-lwtheme:not([selected=true]):not(:hover) .tab-stack .tab-background-middle,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[unread]:-moz-lwtheme:not([selected=true]):not(:hover) .tab-background-start,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[unread]:-moz-lwtheme:not([selected=true]):not(:hover) .tab-background-end {\
						  background-image: linear-gradient(transparent, transparent 2px, '+this.prefs.getCharPref('ctabunr1')+' 0px, '+this.prefs.getCharPref('ctabunr2')+'), none !important;\
						}\
						.tabbrowser-tab[unread]:-moz-lwtheme:not([selected=true]):hover > .tab-stack > .tab-background:not([selected=true]),\
						.tabbrowser-tab[unread]:-moz-lwtheme:not([selected=true]):not(:hover) > .tab-stack > .tab-background:not([selected=true]){\
						  background-position: left bottom, 30px bottom, right bottom;\
						  background-repeat: no-repeat;\
						  background-size: 30px 100%, calc(100% - (2 * 30px)) 100%, 30px 100%;\
						}\
						.tabbrowser-tab[unread]:-moz-lwtheme:not([selected=true]):hover .tab-background-start:-moz-locale-dir(ltr),\
						.tabbrowser-tab[unread]:-moz-lwtheme:not([selected=true]):hover .tab-background-end:-moz-locale-dir(rtl),\
						.tabbrowser-tab[unread]:-moz-lwtheme:not([selected=true]):not(:hover) .tab-background-start:-moz-locale-dir(ltr),\
						.tabbrowser-tab[unread]:-moz-lwtheme:not([selected=true]):not(:hover) .tab-background-end:-moz-locale-dir(rtl) {\
						  clip-path: url(chrome://browser/content/browser.xul#tab-curve-clip-path-start) !important;\
						}\
						.tabbrowser-tab[unread]:-moz-lwtheme:not([selected=true]):hover .tab-background-end:-moz-locale-dir(ltr),\
						.tabbrowser-tab[unread]:-moz-lwtheme:not([selected=true]):hover .tab-background-start:-moz-locale-dir(rtl),\
						.tabbrowser-tab[unread]:-moz-lwtheme:not([selected=true]):not(:hover) .tab-background-end:-moz-locale-dir(ltr),\
						.tabbrowser-tab[unread]:-moz-lwtheme:not([selected=true]):not(:hover) .tab-background-start:-moz-locale-dir(rtl) {\
						  clip-path: url(chrome://browser/content/browser.xul#tab-curve-clip-path-end) !important;\
						}\
					'), null, null);
					
				  } else {
				
					this.ctabsheet_unr=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[unread]:not(:-moz-lwtheme):not([selected=true]):not(:hover) .tab-stack .tab-background-middle,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[unread]:not(:-moz-lwtheme):not([selected=true]):not(:hover) .tab-background-start,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[unread]:not(:-moz-lwtheme):not([selected=true]):not(:hover) .tab-background-end,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[unread]:-moz-lwtheme:not([selected=true]):not(:hover) .tab-stack .tab-background-middle,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[unread]:-moz-lwtheme:not([selected=true]):not(:hover) .tab-background-start,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[unread]:-moz-lwtheme:not([selected=true]):not(:hover) .tab-background-end						{\
						  background-image: linear-gradient(transparent, transparent 2px, '+this.prefs.getCharPref('ctabunr1')+' 0px, '+this.prefs.getCharPref('ctabunr2')+'), none !important;\
						}\
						.tabbrowser-tab[unread]:-moz-lwtheme:not([selected=true]):not(:hover) > .tab-stack > .tab-background:not([selected=true]){\
						  background-position: left bottom, 30px bottom, right bottom;\
						  background-repeat: no-repeat;\
						  background-size: 30px 100%, calc(100% - (2 * 30px)) 100%, 30px 100%;\
						}\
						.tabbrowser-tab[unread]:-moz-lwtheme:not([selected=true]):not(:hover) .tab-background-start:-moz-locale-dir(ltr),\
						.tabbrowser-tab[unread]:-moz-lwtheme:not([selected=true]):not(:hover) .tab-background-end:-moz-locale-dir(rtl) {\
						  clip-path: url(chrome://browser/content/browser.xul#tab-curve-clip-path-start) !important;\
						}\
						.tabbrowser-tab[unread]:-moz-lwtheme:not([selected=true]):not(:hover) .tab-background-end:-moz-locale-dir(ltr),\
						.tabbrowser-tab[unread]:-moz-lwtheme:not([selected=true]):not(:hover) .tab-background-start:-moz-locale-dir(rtl) {\
						  clip-path: url(chrome://browser/content/browser.xul#tab-curve-clip-path-end) !important;\
						}\
					'), null, null);
					
				  }
				
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
			
			  if(this.prefs.getBoolPref('tabc_hov_unl')){
	
				this.tabtxtcsheet_pen=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
					#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[pending]:not([selected="true"]):hover .tab-text,\
					#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[pending]:not([selected="true"]):not(:hover) .tab-text {\
					  color: '+this.prefs.getCharPref('ctabpent')+' !important;\
					}\
				'), null, null);
				
			  } else {
				this.tabtxtcsheet_pen=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
					#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[pending]:not([selected="true"]):not(:hover) .tab-text {\
					  color: '+this.prefs.getCharPref('ctabpent')+' !important;\
					}\
				'), null, null);
			  }

			  applyNewSheet(this.tabtxtcsheet_pen);
			}

		break;
		
		case "tabtextc_unr":

			removeOldSheet(this.tabtxtcsheet_unr);
			
			if(enable==true){
			
			  if(this.prefs.getBoolPref('tabc_hov_unr')){
	
				this.tabtxtcsheet_unr=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
					#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[unread]:not([selected="true"]):hover .tab-text,\
					#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[unread]:not([selected="true"]):not(:hover) .tab-text {\
					  color: '+this.prefs.getCharPref('ctabunrt')+' !important;\
					}\
				'), null, null);
				
			  } else {
	
				this.tabtxtcsheet_unr=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
					#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[unread]:not([selected="true"]):not(:hover) .tab-text {\
					  color: '+this.prefs.getCharPref('ctabunrt')+' !important;\
					}\
				'), null, null);
				
			  }

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
			
			  if(this.prefs.getBoolPref('tabc_hov_unl')){
			
				this.tabtxtshsheet_pen=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
					#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[pending]:not([selected="true"]):hover .tab-text,\
					#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[pending]:not([selected="true"]):not(:hover) .tab-text {\
					  text-shadow: 0px 1px 0px '+this.prefs.getCharPref('ctabpentsh')+',0px 1px 4px '+this.prefs.getCharPref('ctabpentsh')+' !important;\
					}\
				'), null, null);
				
			  } else {
			  
				this.tabtxtshsheet_pen=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
					#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[pending]:not([selected="true"]):not(:hover) .tab-text {\
					  text-shadow: 0px 1px 0px '+this.prefs.getCharPref('ctabpentsh')+',0px 1px 4px '+this.prefs.getCharPref('ctabpentsh')+' !important;\
					}\
				'), null, null);
				
			  }

			  applyNewSheet(this.tabtxtshsheet_pen);
			}

		break;
		
		case "tabtextsh_unr":

			removeOldSheet(this.tabtxtshsheet_unr);
			
			if(enable==true){
			
			  if(this.prefs.getBoolPref('tabc_hov_unr')){
				
				this.tabtxtshsheet_unr=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
					#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[unread]:not([selected="true"]):hover .tab-text,\
					#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[unread]:not([selected="true"]):not(:hover) .tab-text {\
					  text-shadow: 0px 1px 0px '+this.prefs.getCharPref('ctabunrtsh')+',0px 1px 4px '+this.prefs.getCharPref('ctabunrtsh')+' !important;\
					}\
				'), null, null);
			
			  } else {
			  
				this.tabtxtshsheet_unr=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
					#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[unread]:not([selected="true"]):not(:hover) .tab-text {\
					  text-shadow: 0px 1px 0px '+this.prefs.getCharPref('ctabunrtsh')+',0px 1px 4px '+this.prefs.getCharPref('ctabunrtsh')+' !important;\
					}\
				'), null, null);
				
			  }

			  applyNewSheet(this.tabtxtshsheet_unr);
			}

		break;
		
		case "tabfbold_def":
		
			removeOldSheet(this.tabboldsheet_def);
			
			if(enable==true){
				
				this.tabboldsheet_def=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
					.tabbrowser-tab:not([selected=true]):not(:hover) .tab-text {\
					  font-weight: bold !important;\
					}\
				'), null, null);

				applyNewSheet(this.tabboldsheet_def);
			}
		
		break;

		case "tabfbold_act":

			removeOldSheet(this.tabboldsheet_act);
			
			if(enable==true){
				
				this.tabboldsheet_act=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
					.tabbrowser-tab[selected=true] .tab-text {\
					  font-weight: bold !important;\
					}\
				'), null, null);

				applyNewSheet(this.tabboldsheet_act);
			}

		break;
		
		case "tabfbold_hov":

			removeOldSheet(this.tabboldsheet_hov);
			
			if(enable==true){
				
				this.tabboldsheet_hov=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
					.tabbrowser-tab:not([selected=true]):hover .tab-text {\
					  font-weight: bold !important;\
					}\
				'), null, null);

				applyNewSheet(this.tabboldsheet_hov);
			}

		break;
		
		case "tabfbold_pen":

			removeOldSheet(this.tabboldsheet_pen);
			
			if(enable==true){
			
			  if(this.prefs.getBoolPref('tabc_hov_unr')){

				this.tabboldsheet_pen=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
					.tabbrowser-tab[pending]:not([selected=true]):hover .tab-text,\
					.tabbrowser-tab[pending]:not([selected=true]):not(:hover) .tab-text {\
					  font-weight: bold !important;\
					}\
				'), null, null);

			  } else {

				this.tabboldsheet_pen=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
					.tabbrowser-tab[pending]:not([selected=true]):not(:hover) .tab-text {\
					  font-weight: bold !important;\
					}\
				'), null, null);

			  }

			  applyNewSheet(this.tabboldsheet_pen);
			}

		break;
		
		case "tabfbold_unr":
	
			removeOldSheet(this.tabboldsheet_unr);
			
			if(enable==true){
			
			  if(this.prefs.getBoolPref('tabc_hov_unr')){

				this.tabboldsheet_unr=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
					.tabbrowser-tab[unread]:not([selected=true]):hover .tab-text,\
					.tabbrowser-tab[unread]:not([selected=true]):not(:hover) .tab-text {\
					  font-weight: bold !important;\
					}\
				'), null, null);

			  } else {

				this.tabboldsheet_unr=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
					.tabbrowser-tab[unread]:not([selected=true]):not(:hover) .tab-text {\
					  font-weight: bold !important;\
					}\
				'), null, null);

			  }

			  applyNewSheet(this.tabboldsheet_unr);
			}

		break;
		
		case "tabfita_def":
		
			removeOldSheet(this.tabitasheet_def);
			
			if(enable==true){
				
				this.tabitasheet_def=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
					.tabbrowser-tab:not([selected=true]):not(:hover) .tab-text {\
					  font-style: italic !important;\
					}\
				'), null, null);

				applyNewSheet(this.tabitasheet_def);
			}
		
		break;

		case "tabfita_act":

			removeOldSheet(this.tabitasheet_act);
			
			if(enable==true){
				
				this.tabitasheet_act=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
					.tabbrowser-tab[selected=true] .tab-text {\
					  font-style: italic !important;\
					}\
				'), null, null);

				applyNewSheet(this.tabitasheet_act);
			}

		break;
		
		case "tabfita_hov":

			removeOldSheet(this.tabitasheet_hov);
			
			if(enable==true){
				
				this.tabitasheet_hov=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
					.tabbrowser-tab:not([selected=true]):hover .tab-text {\
					  font-style: italic !important;\
					}\
				'), null, null);

				applyNewSheet(this.tabitasheet_hov);
			}

		break;
		
		case "tabfita_pen":

			removeOldSheet(this.tabitasheet_pen);
			
			if(enable==true){
			
			  if(this.prefs.getBoolPref('tabc_hov_unr')){

				this.tabitasheet_pen=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
					.tabbrowser-tab[pending]:not([selected=true]):hover .tab-text,\
					.tabbrowser-tab[pending]:not([selected=true]):not(:hover) .tab-text {\
					  font-style: italic !important;\
					}\
				'), null, null);

			  } else {

				this.tabitasheet_pen=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
					.tabbrowser-tab[pending]:not([selected=true]):not(:hover) .tab-text {\
					  font-style: italic !important;\
					}\
				'), null, null);

			  }

			  applyNewSheet(this.tabitasheet_pen);
			}

		break;
		
		case "tabfita_unr":
	
			removeOldSheet(this.tabitasheet_unr);
			
			if(enable==true){
			
			  if(this.prefs.getBoolPref('tabc_hov_unr')){

				this.tabitasheet_unr=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
					.tabbrowser-tab[unread]:not([selected=true]):hover .tab-text,\
					.tabbrowser-tab[unread]:not([selected=true]):not(:hover) .tab-text {\
					  font-style: italic !important;\
					}\
				'), null, null);

			  } else {

				this.tabitasheet_unr=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
					.tabbrowser-tab[unread]:not([selected=true]):not(:hover) .tab-text {\
					  font-style: italic !important;\
					}\
				'), null, null);

			  }

			  applyNewSheet(this.tabitasheet_unr);
			}

		break;
		
		case "cui_buttons":
		
			removeOldSheet(this.cuiButtonssheet);
			
			if(enable==true){
			
				var cuismallnavbut='';
				var cuiicotextbut='';
				var cuitabsnontop='';
			  
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
					case "iconstxt3":	cuiicotextbut='#ctraddon_cui-icons-button {background:#fbfbfb !important;} #ctraddon_cui-iconstext-button {background:#dadada !important;} #ctraddon_cui-textonly-button {background:#fbfbfb !important;} #ctraddon_cui-iconstext-button label { border-bottom: 1px dotted !important; margin-bottom: -1px !important; }'; break;
					case "iconstxt4":	cuiicotextbut='#ctraddon_cui-icons-button {background:#fbfbfb !important;} #ctraddon_cui-iconstext-button {background:#bdbdbd !important;} #ctraddon_cui-textonly-button {background:#fbfbfb !important;} #ctraddon_cui-iconstext-button label { border-bottom: 1px dotted !important; margin-bottom: -1px !important; }'; break;
					case "txtonly":		cuiicotextbut='#ctraddon_cui-icons-button {background:#fbfbfb !important;} #ctraddon_cui-iconstext-button {background:#fbfbfb !important;} #ctraddon_cui-textonly-button {background:#dadada !important;}'; break;
				}
				
				switch (this.prefs.getCharPref("tabsontop")) {
					case "unset":	cuitabsnontop='#ctraddon_cui-tabsnontop {background:#fbfbfb !important;}'; break;
					case "false":	cuitabsnontop='#ctraddon_cui-tabsnontop {background:#dadada !important;}'; break;
					case "false2":	cuitabsnontop='#ctraddon_cui-tabsnontop {background:#bdbdbd !important;}'; break;
				}
				
				this.cuiButtonssheet=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
					'+cuismallnavbut+'\
					'+cuiicotextbut+'\
					'+cuitabsnontop+'\
				'), null, null);

				applyNewSheet(this.cuiButtonssheet);
			}
		
		break;
		
	}
	
	// Apply or remove the style sheet files
	function manageCSS(file) {

		const sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
		const ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);

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

	  const sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);

		if (sss.sheetRegistered(sheet,sss.AGENT_SHEET)) sss.unregisterSheet(sheet,sss.AGENT_SHEET);
	}

	// apply style sheet
	function applyNewSheet(sheet){

	  const sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);

		try {
			if (!sss.sheetRegistered(sheet,sss.AGENT_SHEET)) sss.loadAndRegisterSheet(sheet,sss.AGENT_SHEET);
		}catch(e){}
	}
	
  },

  // handles two 'options' per button for 'icons' and 'icon+text' buttons on customizing area
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
	  this.prefs.setCharPref(which,'iconstxt3');
	}
	else if(this.prefs.getCharPref('nav_txt_ico')=='iconstxt3' && value=="iconstxt") {
	  this.prefs.setCharPref(which,'iconstxt4');
	}
	else if(this.prefs.getCharPref('nav_txt_ico')=='iconstxt4' && value=="iconstxt") {
	  this.prefs.setCharPref(which,'iconstxt');
	}
	else {
	  this.prefs.setCharPref(which,value);
	}

  },
  
  cuiPrefTabsNontop: function(){
	if(this.prefs.getCharPref('tabsontop')=='unset') {
	  this.prefs.setCharPref('tabsontop','false');
	} 
	else if(this.prefs.getCharPref('tabsontop')=='false') {
	  this.prefs.setCharPref('tabsontop','false2');
	}
	else if(this.prefs.getCharPref('tabsontop')=='false2') {
	  this.prefs.setCharPref('tabsontop','unset');
	} 
  },
  
  openCTRPreferences: function(currentWindow) {
	AddonManager.getAddonByID("ClassicThemeRestorer@ArisT2Noia4dev", function(aAddon) {
	  let windows = Services.wm.getEnumerator(null);
		while (windows.hasMoreElements()) {
		  let win = windows.getNext();
		  if (win.document.documentURI == aAddon.optionsURL) {
			win.focus();
			return;
		  }
		}
		window.open(aAddon.optionsURL,'', 'chrome').focus();
	});
  },
	
  // hides/shows CTRs add-on bar
  toggleCtrAddonBar: function() {
    
	let ctrAddonBar = document.getElementById("ctraddon_addon-bar");
    setToolbarVisibility(ctrAddonBar, ctrAddonBar.collapsed);
  
  },
  
  toggleCtrUrlExtraBar: function() {
    
	if(document.getElementById("ctraddon_urlextrabar").getAttribute("collapsed")=="true") {
	  document.getElementById("ctraddon_urlextrabar").setAttribute("collapsed",false);
	  
	  setTimeout(function(){
		document.getElementById('ctraddon_extraurlbar_tb').focus();
	  },100);
	  
	}
	else document.getElementById("ctraddon_urlextrabar").setAttribute("collapsed",true);
  
  }
  
};

classicthemerestorerjs.ctr.init();
Components.utils.import("chrome://classic_theme_restorer/content/ctr_toolbars.jsm");
Components.utils.import("resource:///modules/CustomizableUI.jsm");
Components.utils.import("resource://gre/modules/AddonManager.jsm");

if (typeof classicthemerestorerjs == "undefined") {var classicthemerestorerjs = {};};
if (!classicthemerestorerjs.ctr) {classicthemerestorerjs.ctr = {};};

classicthemerestorerjs.ctr = {
 
  // initialize custom sheets for tab color settings
  ctabsheet_def:		Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  ctabsheet_act:		Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  ctabsheet_hov:		Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  ctabsheet_unr:		Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  cntabsheet_def:		Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  cntabsheet_hov:		Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  tabtxtcsheet_def:		Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  tabtxtcsheet_act:		Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  tabtxtcsheet_hov:		Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  tabtxtcsheet_unr:		Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  tabtxtshsheet_def:	Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  tabtxtshsheet_act:	Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  tabtxtshsheet_hov:	Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  tabtxtshsheet_unr:	Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  
  cuiButtonssheet:		Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),

  prefs:				Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.classicthemerestorer."),
  
  fxdefaulttheme:		Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("general.skins.").getCharPref("selectedSkin") == 'classic/1.0',
 
  
  init: function() {

	// remove default panel ui button in favour of CTRs movable duplicate
	try{
		document.getElementById("PanelUI-button").removeChild(document.getElementById("PanelUI-menu-button"));
	} catch(e){}
	
	// add a new global attribute 'defaultfxtheme' -> better parting css for default and non-default themes
	try{
		if (this.fxdefaulttheme) document.getElementById("main-window").setAttribute('defaultfxtheme',true);
		  else document.getElementById("main-window").removeAttribute('defaultfxtheme');
	} catch(e){}

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

	// extra check to not enable spaces/separators styles while 'ThePuzzlePiece' add-on is enabled
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

		  // first run
		  case "firstrun":
			if (branch.getBoolPref("firstrun")) {
			
			  try {

				// insert CTRs items on first run into toolbars
				CustomizableUI.addWidgetToArea("ctr_back-forward-button", CustomizableUI.AREA_NAVBAR);
				CustomizableUI.addWidgetToArea("ctr_appbutton", CustomizableUI.AREA_NAVBAR);
				CustomizableUI.addWidgetToArea("ctr_puib_separator", CustomizableUI.AREA_NAVBAR);
				CustomizableUI.addWidgetToArea("ctr_panelui-button", CustomizableUI.AREA_NAVBAR);
				CustomizableUI.addWidgetToArea("ctr_window-controls", CustomizableUI.AREA_NAVBAR);
				CustomizableUI.addWidgetToArea("ctr_bookmarks-menu-toolbar-button", CustomizableUI.AREA_BOOKMARKS);						
				
				// switch to 'appbutton on titlebar' on Windows
				if (Components.classes["@mozilla.org/xre/app-info;1"]
					  .getService(Components.interfaces.nsIXULRuntime).OS=="WINNT") {
						branch.setCharPref("appbutton",'appbutton_v2');
				}
					
			  } catch(e){}

			  // set 'first run' to false
			  branch.setBoolPref("firstrun",false);
			
			}
		  break;
		  
		  // Tabs
		  case "tabs":
			classicthemerestorerjs.ctr.loadUnloadCSS('tabs_squared',false);
			classicthemerestorerjs.ctr.loadUnloadCSS('tabs_squaredc2',false);
			classicthemerestorerjs.ctr.loadUnloadCSS('tabs_squared2',false);
			classicthemerestorerjs.ctr.loadUnloadCSS('tabs_curved',false);
			classicthemerestorerjs.ctr.loadUnloadCSS('tabs_curvedall',false);
			
			if (branch.getCharPref("tabs")!="tabs_default"){
			  classicthemerestorerjs.ctr.loadUnloadCSS(branch.getCharPref("tabs"),true);
			}
		  break;
		  
		  case "tabsontop":
		    
			var tabsont = branch.getCharPref("tabsontop");
			
			try {
				
				if (tabsont=='unset') {
					document.getElementById("main-window").removeAttribute('tabsontop');
					document.getElementById("titlebar").removeAttribute('tabsontop');
					document.getElementById("navigator-toolbox").removeAttribute('tabsontop');
					document.getElementById("toolbar-menubar").removeAttribute('tabsontop');
					document.getElementById("TabsToolbar").removeAttribute('tabsontop');
					document.getElementById("nav-bar").removeAttribute('tabsontop');
					document.getElementById("PersonalToolbar").removeAttribute('tabsontop');
					document.getElementById("ctr_extra-bar").removeAttribute('tabsontop');
					document.getElementById("ctr_addon-bar").removeAttribute('tabsontop');
					
				} else {
					document.getElementById("main-window").setAttribute('tabsontop',tabsont);
					document.getElementById("titlebar").setAttribute('tabsontop',tabsont);
					document.getElementById("navigator-toolbox").setAttribute('tabsontop',tabsont);
					document.getElementById("toolbar-menubar").setAttribute('tabsontop',tabsont);
					document.getElementById("TabsToolbar").setAttribute('tabsontop',tabsont);
					document.getElementById("nav-bar").setAttribute('tabsontop',tabsont);
					document.getElementById("PersonalToolbar").setAttribute('tabsontop',tabsont);
					document.getElementById("ctr_extra-bar").setAttribute('tabsontop',tabsont);
					document.getElementById("ctr_addon-bar").setAttribute('tabsontop',tabsont);
				}
			} catch(e){}
			
			if (tabsont=='false') classicthemerestorerjs.ctr.loadUnloadCSS("tabsotoff",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("tabsotoff",false);
			
		  break;
		  
		  case "ctabwidth": case "ctabmwidth":
			
			classicthemerestorerjs.ctr.updateTabWidth();
 
		  break;

		  // Appbutton
		  case "appbutton":
			classicthemerestorerjs.ctr.loadUnloadCSS('appbutton_v1',false);
			classicthemerestorerjs.ctr.loadUnloadCSS('appbutton_v1wt',false);
			classicthemerestorerjs.ctr.loadUnloadCSS('appbutton_v2',false);
			classicthemerestorerjs.ctr.loadUnloadCSS('appbutton_v2io',false);
		
			if (branch.getCharPref("appbutton")!="appbutton_off"){
			  classicthemerestorerjs.ctr.loadUnloadCSS(branch.getCharPref("appbutton"),true);
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

			if (branch.getCharPref("appbuttonc")!="off"){
			  classicthemerestorerjs.ctr.loadUnloadCSS(branch.getCharPref("appbuttonc"),true);
			}
		  break;
		  
		  case "alttbappb":
			if (branch.getBoolPref("alttbappb")) classicthemerestorerjs.ctr.loadUnloadCSS("alttbappb",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("alttbappb",false);
		  break;
		  
		  case "appbutmhi":
			if (branch.getBoolPref("appbutmhi")) classicthemerestorerjs.ctr.loadUnloadCSS("appbutmhi",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("appbutmhi",false);
		  break;
		  
		  case "appbutbdl":
			if (branch.getBoolPref("appbutbdl")) classicthemerestorerjs.ctr.loadUnloadCSS("appbutbdl",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("appbutbdl",false);
		  break;

		  //General UI options
		  case "nbiconsize":
		    try {
				var size = branch.getCharPref("nbiconsize");
				if (size=='unset') {
					document.getElementById("nav-bar").removeAttribute('iconsize');
				} else {
					document.getElementById("nav-bar").setAttribute('iconsize',size);
				}
			} catch(e){}
		  break;

		  case "smallnavbut":
			if (branch.getBoolPref("smallnavbut")) {
			
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
		  
		    function loadCTRstatusbar(event){
				window.removeEventListener("DOMContentLoaded", loadCTRstatusbar, false);
				
				setTimeout(function(){
				  try{
					  if(CustomizableUI.getPlacementOfWidget("ctr_statusbar") == null) {
						CustomizableUI.addWidgetToArea("ctr_statusbar", CustomizableUI.AREA_NAVBAR);
					  }
				  } catch(e){}
				},150);
				
				setTimeout(function(){
					try{
						document.getElementById("ctr_statusbar").insertBefore(document.getElementById("status-bar"), null);
					} catch(e){}
				},200);
			}
		  
			if (branch.getBoolPref("statusbar")) {
				classicthemerestorerjs.ctr.loadUnloadCSS("statusbar",true);
				
				setTimeout(function(){
					try{
						document.getElementById("ctr_statusbar").insertBefore(document.getElementById("status-bar"), null);
					} catch(e){}
				},200);
				
				window.addEventListener("DOMContentLoaded", loadCTRstatusbar ,false);

			}
			else { 
				classicthemerestorerjs.ctr.loadUnloadCSS("statusbar",false);
				
				window.removeEventListener("DOMContentLoaded", loadCTRstatusbar, false);
				
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
		  
		  case "tabfita_unr":
			if (branch.getBoolPref("tabfita_unr")) classicthemerestorerjs.ctr.loadUnloadCSS("tabfita_unr",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("tabfita_unr",false);
		  break;

		  // Special
		  case "paneluibtweak":
			if (branch.getBoolPref("paneluibtweak")) classicthemerestorerjs.ctr.loadUnloadCSS("paneluibtweak",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("paneluibtweak",false);
		  break;
		  
		  case "notabfog":
			if (branch.getBoolPref("notabfog")) classicthemerestorerjs.ctr.loadUnloadCSS("notabfog",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("notabfog",false);
		  break;
		  
		  case "tabmokcolor":
			if (branch.getBoolPref("tabmokcolor")) classicthemerestorerjs.ctr.loadUnloadCSS("tabmokcolor",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("tabmokcolor",false);
		  break;
		  
		  case "tabmokcolor2":
			if (branch.getBoolPref("tabmokcolor2")) classicthemerestorerjs.ctr.loadUnloadCSS("tabmokcolor2",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("tabmokcolor2",false);
		  break;
		  
		  case "closeabarbut":
			if (branch.getBoolPref("closeabarbut")) classicthemerestorerjs.ctr.loadUnloadCSS("closeabarbut",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("closeabarbut",false);
		  break;
		  
		  case "bfurlbarfix":
		    if (classicthemerestorerjs.ctr.fxdefaulttheme) {
			  if (branch.getBoolPref("bfurlbarfix")) classicthemerestorerjs.ctr.loadUnloadCSS("bfurlbarfix",true);
			    else classicthemerestorerjs.ctr.loadUnloadCSS("bfurlbarfix",false);
			}
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
			if (branch.getBoolPref("dblclnewtab")) {
		
				document.getElementById("TabsToolbar").ondblclick = e=>{
					if (e.target.localName != "tab") gBrowser.selectedTab = gBrowser.addTab("about:newtab");
					e.stopPropagation();
					e.preventDefault();
				}
			}
			else document.getElementById("TabsToolbar").ondblclick = e=>{}

		  break;
		  
		  case "hightabpososx":
			if (branch.getBoolPref("hightabpososx")) classicthemerestorerjs.ctr.loadUnloadCSS("hightabpososx",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("hightabpososx",false);
		  break;

		  case "cpanelmenus":
			if (branch.getBoolPref("cpanelmenus")) classicthemerestorerjs.ctr.loadUnloadCSS("cpanelmenus",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("cpanelmenus",false);
		  break;

		  case "panelmenucol":
			if (branch.getBoolPref("panelmenucol")) classicthemerestorerjs.ctr.loadUnloadCSS("panelmenucol",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("panelmenucol",false);
		  break;
		  
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
						document.getElementById("ctr_tools_menu_entry").collapsed = false;
					  } catch(e){}
					},100);
				}
				else {
				  setTimeout(function(){
					try{
					  document.getElementById("ctr_tools_menu_entry").collapsed = true;
					} catch(e){}
				  },100);
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
	var timeoutID;
	
	timeoutID = window.setTimeout(
	  function(){
		document.getElementById("backForwardMenu").openPopupAtScreen(anchorElem.boxObject.screenX, anchorElem.boxObject.screenY+anchorElem.boxObject.height-1, false);
	  }, 600);

	anchorElem.onmouseup = function() {
	  window.clearTimeout(timeoutID);
	}
	
  },
 
  // attach appmenu to currently used appbutton (on titlebar or on toolbar)
  openCtrAppmenuPopup: function(anchorElem) {
	app_popup = this.ctrGetId('appmenu-popup');
	  
	app_popup.addEventListener("popupshown",  onCtrAppmenuPopup, false);
	app_popup.addEventListener("popuphidden", onCtrAppmenuPopup, false);

	app_popup.openPopupAtScreen(anchorElem.boxObject.screenX, anchorElem.boxObject.screenY+anchorElem.boxObject.height-1, false);
	  
	function onCtrAppmenuPopup(event){
	
	  if (event.target != classicthemerestorerjs.ctr.ctrGetId("appmenu-popup")) return;
	  if(event.type == "popupshown"){ 
		classicthemerestorerjs.ctr.ctrGetId('ctr_appbutton').setAttribute("open", "true");
		classicthemerestorerjs.ctr.ctrGetId('ctr_appbutton2').setAttribute("open", "true");
		 if(classicthemerestorerjs.ctr.ctrGetId('ctr_appbutton').parentNode.id=="nav-bar-customization-target"
		      && (classicthemerestorerjs.ctr.prefs.getCharPref("appbutton")=="appbutton_v1"
			    || classicthemerestorerjs.ctr.prefs.getCharPref("appbutton")=="appbutton_v1wt"))
		  document.getElementById('main-window').setAttribute("ctr_appbutton_on_navbar", "true");
		
	  }else if( event.type == "popuphidden" ){
		classicthemerestorerjs.ctr.ctrGetId('ctr_appbutton').removeAttribute("open");
		classicthemerestorerjs.ctr.ctrGetId('ctr_appbutton2').removeAttribute("open");
		if(classicthemerestorerjs.ctr.ctrGetId('ctr_appbutton').parentNode.id=="nav-bar-customization-target"
		    && (classicthemerestorerjs.ctr.prefs.getCharPref("appbutton")=="appbutton_v1"
		      || classicthemerestorerjs.ctr.prefs.getCharPref("appbutton")=="appbutton_v1wt"))
		  document.getElementById('main-window').removeAttribute("ctr_appbutton_on_navbar");

	  }
	}
  },

  // disable preferences which are not usable on third party themes  
  disableSettingsforThemes: function() {

	if (!this.fxdefaulttheme) {
		this.prefs.setCharPref('tabs','tabs_default');
		this.prefs.setBoolPref('appbutmhi',false);
		this.prefs.setBoolPref('smallnavbut',false);
		this.prefs.setBoolPref('tabcolor_def',false);
		this.prefs.setBoolPref('tabcolor_act',false);
		this.prefs.setBoolPref('tabcolor_unr',false);
		this.prefs.setBoolPref('tabcolor_hov',false);
		this.prefs.setBoolPref('ntabcolor_def',false);
		this.prefs.setBoolPref('ntabcolor_hov',false);
		this.prefs.setBoolPref('paneluibtweak',false);
		this.prefs.setBoolPref('tabmokcolor',false);
		this.prefs.setBoolPref('tabmokcolor2',false);
		this.prefs.setBoolPref('bfurlbarfix',false);
		this.prefs.setBoolPref('panelmenucol',false);
		
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
				document.getElementById("urlbar-icons").insertBefore(classicthemerestorerjs.ctr.ctrGetId("bookmarks-menu-button"), null);
			} catch(e){}
		},100);

		setTimeout(function(){
			try{
				// hide star-button, while typing into urlbar
				document.getElementById("urlbar").addEventListener("keypress", function(e){
					document.getElementById('bookmarks-menu-button').style.visibility = 'collapse';
				}, false);
			} catch(e){}
		},200);
		
		setTimeout(function(){
			try{
				// show star-button, after a page/content got loaded
				window.addEventListener("DOMContentLoaded", function(e){
					classicthemerestorerjs.ctr.ctrGetId('bookmarks-menu-button').style.visibility = 'visible';
				}, true);
			} catch(e){}
		},200);
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
			
			//if (this.fxdefaulttheme) manageCSS("tabsontop_offbg.css");
		
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
		case "appbutton_v2io":		manageCSS("appbutton2io.css");			break;
		
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
		
		case "tabfbold_def":		manageCSS("tab_font_bold_def.css");		break;
		case "tabfbold_act":		manageCSS("tab_font_bold_act.css");		break;
		case "tabfbold_hov":		manageCSS("tab_font_bold_hov.css");		break;
		case "tabfbold_unr":		manageCSS("tab_font_bold_unr.css");		break;
		case "tabfita_def":			manageCSS("tab_font_italic_def.css");	break;
		case "tabfita_act":			manageCSS("tab_font_italic_act.css");	break;
		case "tabfita_hov":			manageCSS("tab_font_italic_hov.css");	break;
		case "tabfita_unr":			manageCSS("tab_font_italic_unr.css");	break;

		case "paneluibtweak": 		manageCSS("paneluibutton_tweak.css");	break;
		case "notabfog": 			manageCSS("notabfog.css");				break;
		case "tabmokcolor": 		manageCSS("tabmokcolor.css");			break;
		case "tabmokcolor2": 		manageCSS("tabmokcolor2.css");			break;
		case "bfurlbarfix": 		manageCSS("bf_urlbarfix.css");			break;
		case "closeabarbut": 		manageCSS("closeabarbut.css");			break;
		case "hightabpososx": 		manageCSS("higher_tabs_pos_osx.css");	break;
		case "throbberalt": 		manageCSS("throbberalt.css");			break;
		case "bmanimation": 		manageCSS("hidebmanimation.css");		break;
		case "cpanelmenus": 		manageCSS("compactpanelmenus.css");		break;
		case "panelmenucol": 		manageCSS("panelmenucolor.css");		break;
		case "appmenuitem": 		manageCSS("ctr_appmenuitem.css");		break;
		case "toolsitem": 			manageCSS("ctr_toolsitem.css");			break;
		case "cuibuttons":
			if (this.fxdefaulttheme)
			{
				manageCSS("cuibuttons.css");
			} else {
				manageCSS("cuibuttonst.css");
			}
		break;
		
		case "spaces_extra": 		manageCSS("spaces_extra.css");			break;
		
		case "hidesmallbuttons": 	manageCSS("hidesmallbuttons.css");		break;
		
		case "tabcolor_def":

			removeOldSheet(this.ctabsheet_def);
			
			if(enable==true){
			
				if (this.prefs.getCharPref('tabs')=='tabs_squared') {
				
					this.ctabsheet_def=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab:not([selected="true"]):not(:hover):not(:-moz-lwtheme) {\
						  background-image: linear-gradient('+this.prefs.getCharPref('ctab1')+','+this.prefs.getCharPref('ctab2')+') !important;\
						}\
					'), null, null);
				
				}
				
				else if (this.prefs.getCharPref('tabs')=='tabs_squaredc2') {
				
					this.ctabsheet_def=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab:not(:-moz-lwtheme) .tab-content {\
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
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[selected="true"]:not(:-moz-lwtheme) {\
						  background-image: linear-gradient('+this.prefs.getCharPref('ctabact1')+','+this.prefs.getCharPref('ctabact2')+') !important;\
						}\
					'), null, null);
				
				}
				
				else if (this.prefs.getCharPref('tabs')=='tabs_squaredc2') {
				
					this.ctabsheet_act=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[selected]:not(:-moz-lwtheme) .tab-content {\
						  background-image: linear-gradient('+this.prefs.getCharPref('ctabact1')+','+this.prefs.getCharPref('ctabact2')+') !important;\
						}\
					'), null, null);
				
				}
				
				else if (this.prefs.getCharPref('tabs')=='tabs_squared2') {
				
					this.ctabsheet_act=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[selected="true"]:not(:-moz-lwtheme) {\
						  background-image: linear-gradient('+this.prefs.getCharPref('ctabact1')+','+this.prefs.getCharPref('ctabact2')+') !important;\
						}\
					'), null, null);
				
				}
				
				else if (this.prefs.getCharPref('tabs')=='tabs_curved') {
				
					this.ctabsheet_act=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar .tab-background-start[selected=true]:-moz-locale-dir(ltr)::before,\
						#main-window #navigator-toolbox #TabsToolbar .tab-background-end[selected=true]:-moz-locale-dir(rtl)::before {\
						  background-image: url(chrome://browser/skin/tabbrowser/tab-stroke-start.png),linear-gradient(transparent, transparent 2px,'+this.prefs.getCharPref('ctabact1')+' 2px, '+this.prefs.getCharPref('ctabact2')+') !important;\
						  clip-path: url(chrome://browser/content/browser.xul#tab-curve-clip-path-start) !important;\
						}\
						#main-window #navigator-toolbox #TabsToolbar .tab-background-end[selected=true]:-moz-locale-dir(ltr)::before,\
						#main-window #navigator-toolbox #TabsToolbar .tab-background-start[selected=true]:-moz-locale-dir(rtl)::before {\
						  background-image: url(chrome://browser/skin/tabbrowser/tab-stroke-end.png),linear-gradient(transparent, transparent 2px,'+this.prefs.getCharPref('ctabact1')+' 2px, '+this.prefs.getCharPref('ctabact2')+') !important;\
						  clip-path: url(chrome://browser/content/browser.xul#tab-curve-clip-path-end) !important;\
						}\
						#main-window #navigator-toolbox #TabsToolbar .tab-background-middle[selected=true]  {\
						  background-color: transparent !important;\
						  background-image: url(chrome://browser/skin/tabbrowser/tab-active-middle.png),linear-gradient(transparent, transparent 2px,'+this.prefs.getCharPref('ctabact1')+' 2px, '+this.prefs.getCharPref('ctabact2')+'), none !important;\
						}\
					'), null, null);
				
				}
				
				else if (this.prefs.getCharPref('tabs')=='tabs_default') {
				
					this.ctabsheet_act=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar .tab-background-start[selected=true]:-moz-locale-dir(ltr)::before,\
						#main-window #navigator-toolbox #TabsToolbar .tab-background-end[selected=true]:-moz-locale-dir(rtl)::before {\
						  background-image: url(chrome://browser/skin/tabbrowser/tab-stroke-start.png),linear-gradient(transparent, transparent 2px,'+this.prefs.getCharPref('ctabact1')+' 2px, '+this.prefs.getCharPref('ctabact2')+') !important;\
						  clip-path: url(chrome://browser/content/browser.xul#tab-curve-clip-path-start) !important;\
						}\
						#main-window #navigator-toolbox #TabsToolbar .tab-background-end[selected=true]:-moz-locale-dir(ltr)::before,\
						#main-window #navigator-toolbox #TabsToolbar .tab-background-start[selected=true]:-moz-locale-dir(rtl)::before {\
						  background-image: url(chrome://browser/skin/tabbrowser/tab-stroke-end.png),linear-gradient(transparent, transparent 2px,'+this.prefs.getCharPref('ctabact1')+' 2px, '+this.prefs.getCharPref('ctabact2')+') !important;\
						  clip-path: url(chrome://browser/content/browser.xul#tab-curve-clip-path-end) !important;\
						}\
						#main-window #navigator-toolbox #TabsToolbar .tab-background-middle[selected=true]  {\
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
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab:not([selected="true"]):hover:not(:-moz-lwtheme) {\
						  background-image: linear-gradient('+this.prefs.getCharPref('ctabhov1')+','+this.prefs.getCharPref('ctabhov2')+') !important;\
						}\
					'), null, null);
				
				}
				
				else if (this.prefs.getCharPref('tabs')=='tabs_squaredc2') {
				
					this.ctabsheet_hov=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab:not([selected]):hover:not(:-moz-lwtheme) .tab-content {\
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
		
		case "tabcolor_unr":

			removeOldSheet(this.ctabsheet_unr);
			
			if(enable==true){
		
				if (this.prefs.getCharPref('tabs')=='tabs_squared') {
				
					this.ctabsheet_unr=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[pending]:not([selected="true"]):not(:hover):not(:-moz-lwtheme) {\
						  background-image: linear-gradient('+this.prefs.getCharPref('ctabpen1')+','+this.prefs.getCharPref('ctabpen2')+') !important;\
						}\
					'), null, null);
				
				}
				
				else if (this.prefs.getCharPref('tabs')=='tabs_squaredc2') {
				
					this.ctabsheet_unr=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[pending]:not([selected="true"]):not(:hover):not(:-moz-lwtheme) .tab-content {\
						  background-image: linear-gradient('+this.prefs.getCharPref('ctabpen1')+','+this.prefs.getCharPref('ctabpen2')+') !important;\
						}\
					'), null, null);
				
				}
				
				else if (this.prefs.getCharPref('tabs')=='tabs_curved') {
				
					this.ctabsheet_unr=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[pending]:not(:-moz-lwtheme):not([selected=true]):not(:hover) .tab-stack .tab-background-middle,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[pending]:not(:-moz-lwtheme):not([selected=true]):not(:hover) .tab-background-start,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[pending]:not(:-moz-lwtheme):not([selected=true]):not(:hover) .tab-background-end {\
						  background-image: linear-gradient(transparent, transparent 2px, '+this.prefs.getCharPref('ctabpen1')+' 0px, '+this.prefs.getCharPref('ctabpen2')+'), none !important;\
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
						#main-window #navigator-toolbox #TabsToolbar .tabs-newtab-button:not(:-moz-lwtheme) {\
						  background-image: linear-gradient('+this.prefs.getCharPref('cntab1')+','+this.prefs.getCharPref('cntab2')+') !important;\
						}\
					'), null, null);
				
				}
				
				else if (this.prefs.getCharPref('tabs')=='tabs_squaredc2') {
				
					this.cntabsheet_def=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar .tabs-newtab-button:not(:-moz-lwtheme) {\
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
						#main-window #navigator-toolbox #TabsToolbar .tabs-newtab-button:hover:not(:-moz-lwtheme) {\
						  background-image: linear-gradient('+this.prefs.getCharPref('cntabhov1')+','+this.prefs.getCharPref('cntabhov2')+') !important;\
						}\
					'), null, null);
				
				}
				
				else if (this.prefs.getCharPref('tabs')=='tabs_squaredc2') {
				
					this.cntabsheet_hov=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar .tabs-newtab-button:hover:not(:-moz-lwtheme) {\
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
		
		case "tabtextc_unr":

			removeOldSheet(this.tabtxtcsheet_unr);
			
			if(enable==true){
	
				this.tabtxtcsheet_unr=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
					#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[pending]:not([selected="true"]):not(:hover) .tab-text {\
					  color: '+this.prefs.getCharPref('ctabpent')+' !important;\
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
		
		case "tabtextsh_unr":

			removeOldSheet(this.tabtxtshsheet_unr);
			
			if(enable==true){
				
				this.tabtxtshsheet_unr=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
					#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[pending]:not([selected="true"]):not(:hover) .tab-text {\
					  text-shadow: 0px 1px 0px '+this.prefs.getCharPref('ctabpentsh')+',0px 1px 4px '+this.prefs.getCharPref('ctabpentsh')+' !important;\
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
				  cuismallnavbut='#customization-smallnavbut-button1 {background:#fbfbfb !important;} #customization-smallnavbut-button2 {background:#dadada !important;}';
				} else {
				  cuismallnavbut='#customization-smallnavbut-button1 {background:#dadada !important;} #customization-smallnavbut-button2 {background:#fbfbfb !important;}';
				}
			
				switch (this.prefs.getCharPref("nav_txt_ico")) {
					case "icons":		cuiicotextbut='#customization-icons-button {background:#dadada !important;} #customization-iconstext-button {background:#fbfbfb !important;} #customization-textonly-button {background:#fbfbfb !important;}'; break;
					case "iconsbig":	cuiicotextbut='#customization-icons-button {background:#bdbdbd !important;} #customization-iconstext-button {background:#fbfbfb !important;} #customization-textonly-button {background:#fbfbfb !important;}'; break;
					case "iconstxt":	cuiicotextbut='#customization-icons-button {background:#fbfbfb !important;} #customization-iconstext-button {background:#dadada !important;} #customization-textonly-button {background:#fbfbfb !important;}'; break;
					case "iconstxt2":	cuiicotextbut='#customization-icons-button {background:#fbfbfb !important;} #customization-iconstext-button {background:#bdbdbd !important;} #customization-textonly-button {background:#fbfbfb !important;}'; break;
					case "txtonly":		cuiicotextbut='#customization-icons-button {background:#fbfbfb !important;} #customization-iconstext-button {background:#fbfbfb !important;} #customization-textonly-button {background:#dadada !important;}'; break;
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
    
	let ctrAddonBar = document.getElementById("ctr_addon-bar");
    setToolbarVisibility(ctrAddonBar, ctrAddonBar.collapsed);
  
  }
  
};

classicthemerestorerjs.ctr.init();
Components.utils.import("chrome://classic_theme_restorer/content/ctr_toolbars.jsm");

Components.utils.import("resource://gre/modules/AddonManager.jsm");

if (typeof classicthemerestorerjs == "undefined") {var classicthemerestorerjs = {};};
if (!classicthemerestorerjs.ctr) {classicthemerestorerjs.ctr = {};};

classicthemerestorerjs.ctr = {

  prefs: Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.classicthemerestorer."),
  
  ctabsheet: Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  tabtxtcsheet: Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  tabtxtshsheet: Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),
  
  cuiButtonssheet: Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI("data:text/css;charset=utf-8," + encodeURIComponent(''), null, null),

  fxdefaulttheme: Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("general.skins.").getCharPref("selectedSkin") == 'classic/1.0',

  init: function() {
  
	try{
		document.getElementById("nav-bar").removeChild(document.getElementById("PanelUI-button"));
	} catch(e){}


	// star-button in urlbar
	if (this.prefs.getBoolPref('starinurl')) {
		
		classicthemerestorerjs.ctr.loadUnloadCSS("starinurl",true);
		// needs timeout to prevent issues with other add-ons, that add icons to an own
		// box on urlbar (like 'rss icon in awesomebar' add-on) instead of using 'urlbar-icons'
		setTimeout(function(){
			try{
				document.getElementById("urlbar-icons").insertBefore(document.getElementById("bookmarks-menu-button"), null);
			} catch(e){}
		},100);

	}
	
	// disable preferences which are not usable on third party themes
	if (!this.fxdefaulttheme) {
		this.prefs.setCharPref('tabs','tabs_default');
		this.prefs.setBoolPref('appbutmhi',false);
		this.prefs.setBoolPref('smallnavbut',false);
		this.prefs.setBoolPref('customsqtab',false);
		this.prefs.setBoolPref('paneluibtweak',false);
		this.prefs.setBoolPref('tabmokcolor',false);
		this.prefs.setBoolPref('tabmokcolor2',false);
		this.prefs.setBoolPref('bfurlbarfix',false);
		
		if (this.prefs.getCharPref('nav_txt_ico')=='iconsbig') {
			this.prefs.setCharPref('nav_txt_ico','icons');
		}
	}

	
	// style CTRs 'customize-ui' option buttons on startup
	this.loadUnloadCSS('cui_buttons',true);

	
	// statusbar boolean
	var enableCtrstatusbar = this.prefs.getBoolPref('statusbar');
	
	// extra check to not enable spaces/separators styles or statusbar while 'ThePuzzlePiece' add-on is enabled
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
	   if(addon && addon.isActive) { classicthemerestorerjs.ctr.loadUnloadCSS("spaces_extra",false); enableCtrstatusbar = false; }
	    else { classicthemerestorerjs.ctr.loadUnloadCSS("spaces_extra",true); }
	});
	
	// statusbar in addonbar
	if (enableCtrstatusbar) {
		
		// needs timeout to prevent issues and glitches with other add-ons
		setTimeout(function(){
			try{
				document.getElementById("ctr_addon-bar").insertBefore(document.getElementById("status-bar"), null);
			} catch(e){}
		},100);

	}
	
	
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

				// insert CTRs items on first run into nav-bar
				// since the buttons do not exist without CTR we cannot move them to a specific nav-bar location
				// without breaking ui (randomly)
				try{
			
					document.getElementById("nav-bar").insertItem("ctr_back-forward-button", null, null, true);
					document.getElementById("nav-bar").insertItem("ctr_appbutton", null, null, true);
					document.getElementById("nav-bar").insertItem("ctr_puib_separator", null, null, true);
					document.getElementById("nav-bar").insertItem("ctr_panelui-button", null, null, true);
					document.getElementById("nav-bar").insertItem("ctr_window-controls", null, null, true);

					var osString = Components.classes["@mozilla.org/xre/app-info;1"].getService(Components.interfaces.nsIXULRuntime).OS;
					
					// switch to 'appbutton on titlebar' on Windows
					if (osString=="WINNT") {
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
		  
		  case "tabwidth":
			classicthemerestorerjs.ctr.loadUnloadCSS('tabwidth_150',false);
			classicthemerestorerjs.ctr.loadUnloadCSS('tabwidth_250',false);

			if (branch.getCharPref("tabwidth")!="tabwidth_default"){
			  classicthemerestorerjs.ctr.loadUnloadCSS(branch.getCharPref("tabwidth"),true);
			}
		  break;
		  
		  case "tabmwidth":
			classicthemerestorerjs.ctr.loadUnloadCSS('tabmwidth_150',false);
			classicthemerestorerjs.ctr.loadUnloadCSS('tabmwidth_54',false);

			if (branch.getCharPref("tabmwidth")!="tabmwidth_default"){
			  classicthemerestorerjs.ctr.loadUnloadCSS(branch.getCharPref("tabmwidth"),true);
			}
		  break; 


		  // Appbutton
		  case "appbutton":
			classicthemerestorerjs.ctr.loadUnloadCSS('appbutton_v1',false);
			classicthemerestorerjs.ctr.loadUnloadCSS('appbutton_v2',false);
		
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

			if (branch.getCharPref("appbuttonc")!="off"){
			  classicthemerestorerjs.ctr.loadUnloadCSS(branch.getCharPref("appbuttonc"),true);
			}
		  break;
		  
		  case "alttbappb":
			if (branch.getBoolPref("alttbappb")) classicthemerestorerjs.ctr.loadUnloadCSS("alttbappb",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("alttbappb",false);
		  break;
		  
		  case "appbuttxt":
			if (branch.getBoolPref("appbuttxt")) classicthemerestorerjs.ctr.loadUnloadCSS("appbuttxt",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("appbuttxt",false);
		  break;

		  case "appbutmhi":
			if (branch.getBoolPref("appbutmhi")) classicthemerestorerjs.ctr.loadUnloadCSS("appbutmhi",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("appbutmhi",false);
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
			if (branch.getBoolPref("statusbar")) classicthemerestorerjs.ctr.loadUnloadCSS("statusbar",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("statusbar",false);
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
		  
		  case "customsqtab":
			if (branch.getBoolPref("customsqtab")) classicthemerestorerjs.ctr.loadUnloadCSS("customsqtab",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("customsqtab",false);
		  break;
		  
		  case "tabtextc":
			if (branch.getBoolPref("tabtextc")) classicthemerestorerjs.ctr.loadUnloadCSS("tabtextc",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("tabtextc",false);
		  break;
		  
		  case "tabtextsh":
			if (branch.getBoolPref("tabtextsh")) classicthemerestorerjs.ctr.loadUnloadCSS("tabtextsh",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("tabtextsh",false);
		  break;
		  
		  // Color settings (colorpickers)
		  
		  case "ctab1": case "ctab2": case "ctabhov1": case "ctabhov2": case "ctabact1": case "ctabact2":
		  case "cntab1": case "cntab2": case "cntabhov1": case "cntabhov2":
			if (branch.getBoolPref("customsqtab")) classicthemerestorerjs.ctr.loadUnloadCSS("customsqtab",true);
		  break;
	  
		  case "ctabt": case "ctabhovt": case "ctabactt":
			if (branch.getBoolPref("tabtextc")) classicthemerestorerjs.ctr.loadUnloadCSS("tabtextc",true);
		  break;

	  
		  case 'ctabtsh': case 'ctabhovtsh': case 'ctabacttsh':
			if (branch.getBoolPref("tabtextsh")) classicthemerestorerjs.ctr.loadUnloadCSS("tabtextsh",true);
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

		  case "cpanelmenus":
			if (branch.getBoolPref("cpanelmenus")) classicthemerestorerjs.ctr.loadUnloadCSS("cpanelmenus",true);
			  else classicthemerestorerjs.ctr.loadUnloadCSS("cpanelmenus",false);
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
			}
		
		break;
		
		case "tabs_squaredc2":
			manageCSS("tabs_squaredc2.css");
		break;
		
		case "tabs_squared2":

			manageCSS("tabs_squared2.css");
		
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

		case "tabwidth_150": 		manageCSS("tabwidth_150.css");  		break;
		case "tabwidth_250": 		manageCSS("tabwidth_250.css");  		break;
		
		case "tabmwidth_150": 		manageCSS("tabminwidth_150.css");  		break;
		case "tabmwidth_54": 		manageCSS("tabminwidth_54.css");  		break;
		
		case "tabsotoff":
		
			manageCSS("tabsontop_off.css");
			
			if (this.fxdefaulttheme) manageCSS("tabsontop_offbg.css");
		
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
			
			if(this.fxdefaulttheme) manageCSS("urlbarborderfocus_nt.css");
			  else if(!this.fxdefaulttheme) manageCSS("urlbarborderfocus_t.css");
			
			this.loadUnloadCSS('cui_buttons',true);

		break;
		
		case "findbar_top": 		manageCSS("findbar_top.css");  			break;
		case "findbar_bottom": 		manageCSS("findbar_bottom.css");  		break;
		case "findbar_topa": 		manageCSS("findbar_top_alt.css"); 		break;
		case "findbar_bottoma": 	manageCSS("findbar_bottom_alt.css");	break;

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

		case "alttbappb": 			manageCSS("alt_appbutton_icons.css");	break;
		case "appbuttxt": 			manageCSS("appbuttxt.css");				break;
		case "appbutmhi": 			manageCSS("appbuthigherposition.css");  break;
		
		case "hidenavbar": 			manageCSS("hidenavbar.css");  			break;
		
		case "backforward":
	
			if(this.fxdefaulttheme) manageCSS("back-forward1.css");
			  else if(!this.fxdefaulttheme) manageCSS("back-forward2.css");

		break;
		
		case "wincontrols": 		manageCSS("windowcontrols.css");		break;
		case "starinurl":
			if (this.fxdefaulttheme) manageCSS("starinurl_nt.css");
			  else manageCSS("starinurl_t.css");
		break;
		case "statusbar": 			manageCSS("statusbar.css"); 			break;
		case "hideurelstop": 		manageCSS("hideurlbarrelstop.css"); 	break;
		case "combrelstop":			manageCSS("combrelstop.css");			break;

		case "paneluibtweak": 		manageCSS("paneluibutton_tweak.css");	break;
		case "notabfog": 			manageCSS("notabfog.css");				break;
		case "tabmokcolor": 		manageCSS("tabmokcolor.css");			break;
		case "tabmokcolor2": 		manageCSS("tabmokcolor2.css");			break;
		case "bfurlbarfix": 		manageCSS("bf_urlbarfix.css");			break;
		case "closeabarbut": 		manageCSS("closeabarbut.css");			break;
		case "throbberalt": 		manageCSS("throbberalt.css");			break;
		case "bmanimation": 		manageCSS("hidebmanimation.css");		break;
		case "cpanelmenus": 		manageCSS("compactpanelmenus.css");		break;
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
		
		case "customsqtab":

			removeOldSheet(this.ctabsheet);
			
			if(enable==true){
		
				if (this.prefs.getCharPref('tabs')=='tabs_squared') {
				
					this.ctabsheet=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[selected="true"]:not(:-moz-lwtheme) {\
						  background-image: linear-gradient('+this.prefs.getCharPref('ctabact1')+','+this.prefs.getCharPref('ctabact2')+') !important;\
						}\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab:not([selected="true"]):not(:hover):not(:-moz-lwtheme) {\
						  background-image: linear-gradient('+this.prefs.getCharPref('ctab1')+','+this.prefs.getCharPref('ctab2')+') !important;\
						}\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab:not([selected="true"]):hover:not(:-moz-lwtheme) {\
						  background-image: linear-gradient('+this.prefs.getCharPref('ctabhov1')+','+this.prefs.getCharPref('ctabhov2')+') !important;\
						}\
						#main-window #navigator-toolbox #TabsToolbar .tabs-newtab-button:not(:-moz-lwtheme) {\
						  background-image: linear-gradient('+this.prefs.getCharPref('cntab1')+','+this.prefs.getCharPref('cntab2')+') !important;\
						}\
						#main-window #navigator-toolbox #TabsToolbar .tabs-newtab-button:hover:not(:-moz-lwtheme) {\
						  background-image: linear-gradient('+this.prefs.getCharPref('cntabhov1')+','+this.prefs.getCharPref('cntabhov2')+') !important;\
						}\
					'), null, null);
				
				}
				
				else if (this.prefs.getCharPref('tabs')=='tabs_squaredc2') {
				
					this.ctabsheet=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[selected]:not(:-moz-lwtheme) .tab-content {\
						  background-image: linear-gradient('+this.prefs.getCharPref('ctabact1')+','+this.prefs.getCharPref('ctabact2')+') !important;\
						}\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab:not(:-moz-lwtheme) .tab-content {\
						  background-image: linear-gradient('+this.prefs.getCharPref('ctab1')+','+this.prefs.getCharPref('ctab2')+') !important;\
						}\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab:not([selected]):hover:not(:-moz-lwtheme) .tab-content {\
						  background-image: linear-gradient('+this.prefs.getCharPref('ctabhov1')+','+this.prefs.getCharPref('ctabhov2')+') !important;\
						}\
						#main-window #navigator-toolbox #TabsToolbar .tabs-newtab-button:not(:-moz-lwtheme) {\
						  background-image: linear-gradient('+this.prefs.getCharPref('cntab1')+','+this.prefs.getCharPref('cntab2')+') !important;\
						}\
						#main-window #navigator-toolbox #TabsToolbar .tabs-newtab-button:hover:not(:-moz-lwtheme) {\
						  background-image: linear-gradient('+this.prefs.getCharPref('cntabhov1')+','+this.prefs.getCharPref('cntabhov2')+') !important;\
						}\
					'), null, null);
				
				}
				
				else if (this.prefs.getCharPref('tabs')=='tabs_squared2') {
				
					this.ctabsheet=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[selected="true"]:not(:-moz-lwtheme) {\
						  background-image: linear-gradient('+this.prefs.getCharPref('ctabact1')+','+this.prefs.getCharPref('ctabact2')+') !important;\
						}\
					'), null, null);
				
				}
				
				else if (this.prefs.getCharPref('tabs')=='tabs_curved') {
				
					this.ctabsheet=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab:not(:-moz-lwtheme):not([selected=true]):not(:hover) .tab-stack .tab-background-middle,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab:not(:-moz-lwtheme):not([selected=true]):not(:hover) .tab-background-start,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab:not(:-moz-lwtheme):not([selected=true]):not(:hover) .tab-background-end{\
						  background-image: linear-gradient(transparent, transparent 2px, '+this.prefs.getCharPref('ctab1')+' 0px, '+this.prefs.getCharPref('ctab2')+'), none !important;\
						}\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab:not(:-moz-lwtheme):not([selected=true]):hover .tab-stack .tab-background-middle,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab:not(:-moz-lwtheme):not([selected=true]):hover .tab-background-start,\
						#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab:not(:-moz-lwtheme):not([selected=true]):hover .tab-background-end {\
						  background-image: linear-gradient(transparent, transparent 2px, '+this.prefs.getCharPref('ctabhov1')+' 0px, '+this.prefs.getCharPref('ctabhov2')+'), none !important;\
						}\
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
				
					this.ctabsheet=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
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

				applyNewSheet(this.ctabsheet);
			}

		break;
		
		case "tabtextc":

			removeOldSheet(this.tabtxtcsheet);
			
			if(enable==true){
	
				this.tabtxtcsheet=ios.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
					#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[selected="true"] {\
					  color: '+this.prefs.getCharPref('ctabactt')+' !important;\
					}\
					#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab:not([selected="true"]):not(:hover) {\
					  color: '+this.prefs.getCharPref('ctabt')+' !important;\
					}\
					#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab:not([selected="true"]):hover{\
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
					#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab[selected="true"] {\
					  text-shadow: 0px 1px 0px '+this.prefs.getCharPref('ctabacttsh')+',0px 1px 4px '+this.prefs.getCharPref('ctabacttsh')+' !important;\
					}\
					#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab:not([selected="true"]):not(:hover) {\
					  text-shadow: 0px 1px 0px '+this.prefs.getCharPref('ctabtsh')+',0px 1px 4px '+this.prefs.getCharPref('ctabtsh')+' !important;\
					}\
					#main-window #navigator-toolbox #TabsToolbar .tabbrowser-tab:not([selected="true"]):hover {\
					  text-shadow: 0px 1px 0px '+this.prefs.getCharPref('ctabhovtsh')+',0px 1px 4px '+this.prefs.getCharPref('ctabhovtsh')+' !important;\
					}\
				'), null, null);

				applyNewSheet(this.tabtxtshsheet);
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

		if (!sss.sheetRegistered(sheet,sss.AGENT_SHEET)) sss.loadAndRegisterSheet(sheet,sss.AGENT_SHEET);
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
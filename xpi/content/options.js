"use strict";
if (typeof classicthemerestorerjso == "undefined") {var classicthemerestorerjso = {};};
if (!classicthemerestorerjso.ctr) {classicthemerestorerjso.ctr = {};};

Components.utils.import("resource://gre/modules/AddonManager.jsm");
Components.utils.import("resource:///modules/CustomizableUI.jsm");

classicthemerestorerjso.ctr = {

  prefs:			Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.classicthemerestorer."),
  fxdefaulttheme:	Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("general.skins.").getCharPref("selectedSkin") == 'classic/1.0',
  appversion:		parseInt(Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.").getCharPref("lastAppVersion")),
  oswindows:		Components.classes["@mozilla.org/xre/app-info;1"].getService(Components.interfaces.nsIXULRuntime).OS=="WINNT",
  needsRestart: 	false,
  ctrVersioninWin:  true,

  initprefwindow: function() {
  
	// adds a new global attribute 'defaultfxtheme' -> better parting css for default and non-default themes
	try{
		if (this.fxdefaulttheme) document.getElementById("ClassicTRoptionsPane").setAttribute('defaultfxtheme',true);
		  else document.getElementById("ClassicTRoptionsPane").removeAttribute('defaultfxtheme');
	} catch(e){}
	
	// restore last selected categories/tabs
	document.getElementById("CtrRadioGroup").selectedIndex = this.prefs.getIntPref('pref_actindx');
	document.getElementById("ctraddon_tabcolor_tabs").selectedIndex = this.prefs.getIntPref('pref_actindx2');
	
	// disable and hide items not usable on third party themes
	if (!this.fxdefaulttheme) {
		document.getElementById('ctraddon_pw_tabmenulist').disabled = true;
		document.getElementById('ctraddon_abhigher').disabled = true;
		document.getElementById('ctraddon_pw_smallnavbut').disabled = true;
		document.getElementById('ctraddon_pw_iconsbig').disabled = true;
		document.getElementById('ctraddon_pw_bfurlbarfix').disabled = true;
		document.getElementById('ctraddon_pw_altmenubar').disabled = true;
		document.getElementById('ctraddon_pw_menubarnofog').disabled = true;
		document.getElementById('ctraddon_pw_tabmokcolor').disabled = true;
		document.getElementById('ctraddon_pw_tabmokcolor2').disabled = true;
		document.getElementById('ctraddon_pw_tabmokcolor3').disabled = true;
		document.getElementById('ctraddon_pw_tabmokcolor4').disabled = true;
		document.getElementById('ctraddon_pw_panelmenucolor').disabled = true;
		document.getElementById('ctraddon_pw_nobookbarbg').disabled = true;
		document.getElementById('ctraddon_pw_nonavbarbg').disabled = true;
		document.getElementById('ctraddon_pw_nonavborder').disabled = true;
		document.getElementById('ctraddon_pw_nonavtbborder').disabled = true;
		document.getElementById('ctraddon_pw_alttabstb').disabled = true;
		document.getElementById('ctraddon_pw_alttabstb2').disabled = true;
		document.getElementById('ctraddon_pw_verifiedcolors').disabled = true;
		document.getElementById('ctraddon_pw_colors_ntab_t').disabled = true;
		document.getElementById('ctraddon_pw_notabfog').disabled = true;
		document.getElementById('ctraddon_pw_notabbg').disabled = true;
		document.getElementById('ctraddon_pw_noaddonbarbg').disabled = true;
		document.getElementById('ctraddon_pw_noconicons').disabled = true;
		document.getElementById('ctraddon_pw_closeonleft').disabled = true;
		document.getElementById('ctraddon_pw_closealt').disabled = true;
		document.getElementById('ctraddon_pw_nbcompact').disabled = true;
		document.getElementById('ctraddon_pw_tabc_act_tb').disabled = true;
		document.getElementById('ctraddon_pw_aerocolors').disabled = true;

		document.getElementById('ctraddon_abhigher').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_smallnavbut').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_iconsbig').style.visibility = 'collapse';

		document.getElementById('ctraddon_pw_ccol_act_pref').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_ccol_act_cp1').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_ccol_act_cp2').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_ccol_act_b1').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_ccol_act_b2').style.visibility = 'collapse';

		document.getElementById('ctraddon_pw_bfurlbarfix').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_altmenubar').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_menubarnofog').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_tabmokcolor').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_tabmokcolor2').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_tabmokcolor3').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_tabmokcolor4').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_panelmenucolor').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_mockupoptions').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_invertedicons').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_alttabstb').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_alttabstb2').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_verifiedcolors').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_notabfog').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_notabbg').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_nonavbarbg').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_nonavborder').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_nonavtbborder').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_nobookbarbg').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_noaddonbarbg').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_noconicons').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_closeonleft').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_closealt').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_nbcompact').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_tabc_act_tb').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_aerocolors').style.visibility = 'collapse';
	} else {
		document.getElementById('ctraddon_pw_special_info2').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_special_font').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_tabforminfo').style.visibility = 'collapse';
	};
	
	//pref e10s tabs
	document.getElementById('ctraddon_pw_e10stab_notd').disabled = true;
	document.getElementById('ctraddon_pw_e10stab_notd').style.visibility = 'collapse';
	document.getElementById('ctraddon_pw_e10stabs').disabled = true;
	document.getElementById('ctraddon_pw_e10stabs').style.visibility = 'collapse';
	document.getElementById('ctraddon_pw_e10stabsdescr').style.visibility = 'collapse';

	// radio restart label
	document.getElementById('ctraddon_pw_radiorestart').style.visibility = 'collapse';
	
	// tab height/width
	document.getElementById('ctraddon_pw_tabheightinfo').style.visibility = 'collapse';
	document.getElementById('ctraddon_pw_tabwidthinfo').style.visibility = 'collapse';
	document.getElementById('ctraddon_pw_tabwidthinfo2').style.visibility = 'collapse';
	document.getElementById('ctraddon_pw_tabwidthinfo3').style.visibility = 'collapse';
	
	// extra checks to not enable tab width settings while 'TabMixPlus' or 'TabUtilities' is enabled
	AddonManager.getAddonByID('{dc572301-7619-498c-a57d-39143191b318}', function(addon) {
	  if(addon && addon.isActive) {
	  	document.getElementById('ctraddon_pw_tabMinWidth').disabled = true;
		document.getElementById('ctraddon_pw_tabMaxWidth').disabled = true;
		document.getElementById('ctraddon_pw_tabMinWidth_L1').disabled = true;
		document.getElementById('ctraddon_pw_tabMinWidth_L2').disabled = true;
		document.getElementById('ctraddon_pw_tabMaxWidth_L1').disabled = true;
		document.getElementById('ctraddon_pw_tabMaxWidth_L2').disabled = true;
		document.getElementById('ctraddon_pw_tabwidthinfo').style.visibility = 'visible';
		document.getElementById('ctraddon_pw_tabwidthinfo2').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_tabwidthinfo3').style.visibility = 'collapse';
	  }
	});
	
	AddonManager.getAddonByID('tabutils@ithinc.cn', function(addon) {
	  if(addon && addon.isActive) {
		document.getElementById('ctraddon_pw_tabMinWidth').disabled = true;
		document.getElementById('ctraddon_pw_tabMaxWidth').disabled = true;
		document.getElementById('ctraddon_pw_tabMinWidth_L1').disabled = true;
		document.getElementById('ctraddon_pw_tabMinWidth_L2').disabled = true;
		document.getElementById('ctraddon_pw_tabMaxWidth_L1').disabled = true;
		document.getElementById('ctraddon_pw_tabMaxWidth_L2').disabled = true;
		document.getElementById('ctraddon_pw_tabwidthinfo').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_tabwidthinfo2').style.visibility = 'visible';
		document.getElementById('ctraddon_pw_tabwidthinfo3').style.visibility = 'collapse';
	  }
	});
	
	// Status4Evar, The Puzzle Piece, Puzzle Toolbars and The Addon Bar Restored
	// override CTRs mov. status bar panel, so CTRs option gets disabled 
	document.getElementById('ctraddon_pw_statusbar_s4e_info').style.visibility = 'collapse';
	document.getElementById('ctraddon_pw_statusbar_tpp_info').style.visibility = 'collapse';
	document.getElementById('ctraddon_pw_statusbar_pzt_info').style.visibility = 'collapse';
	document.getElementById('ctraddon_pw_statusbar_abr_info').style.visibility = 'collapse';
	
	AddonManager.getAddonByID('status4evar@caligonstudios.com', function(addon) {
	  if(addon && addon.isActive) {
		document.getElementById('ctraddon_pw_statusbar').disabled = true;
		document.getElementById('ctraddon_pw_statusbar_s4e_info').style.visibility = 'visible';
	  }
	});
	
	AddonManager.getAddonByID('thePuzzlePiece@quicksaver', function(addon) {
	  if(addon && addon.isActive) {
		document.getElementById('ctraddon_pw_statusbar').disabled = true;
		if(addon && addon.isActive && parseInt(addon.version) < 2) {
		  document.getElementById('ctraddon_pw_statusbar_tpp_info').style.visibility = 'visible';
	    } else{
		  document.getElementById('ctraddon_pw_statusbar_pzt_info').style.visibility = 'visible';
	    }
	  }
	});
	
	AddonManager.getAddonByID('thefoxonlybetter@quicksaver', function(addon) {
	  if(addon && addon.isActive) {
		document.getElementById('ctraddon_pw_nonavbarbg2').style.visibility = 'visible';
	  } else{
		document.getElementById('ctraddon_pw_nonavbarbg2').style.visibility = 'collapse';
	  }
	});
	var TFOBListener = {
	   onEnabled: function(addon) {
		  if(addon.id == 'thefoxonlybetter@quicksaver') { document.getElementById('ctraddon_pw_nonavbarbg2').style.visibility = 'visible'; }
	   },
	   onDisabled: function(addon) {
		  if(addon.id == 'thefoxonlybetter@quicksaver') { document.getElementById('ctraddon_pw_nonavbarbg2').style.visibility = 'collapse'; }
	   }
	};
	AddonManager.addAddonListener(TFOBListener);
	
	AddonManager.getAddonByID('the-addon-bar@GeekInTraining-GiT', function(addon) {
	  if(addon && addon.isActive) {
		document.getElementById('ctraddon_pw_statusbar').disabled = true;
		document.getElementById('ctraddon_pw_statusbar_abr_info').style.visibility = 'visible';
	  }
	});
	
	
	AddonManager.getAddonByID('ClassicThemeRestorer@ArisT2Noia4dev', function(addon) {
	
	  if(classicthemerestorerjso.ctr.ctrVersioninWin==true) {
		var currentAttribute = document.getElementById("ClassicTRoptions").getAttribute("title");
		var newAttribute = currentAttribute + ' - ' + addon.version;
		document.getElementById("ClassicTRoptions").setAttribute('title',newAttribute);
		classicthemerestorerjso.ctr.ctrVersioninWin=false;
	  }
	  
	});
	
	
	// disable bookmark animation checkbox, if 'star button in urlbar' is used
	if (this.prefs.getBoolPref('starinurl')) document.getElementById('ctraddon_pw_bmanimation').disabled = true;
	
	// hide settings for unsupported Firefox versions 
	if (this.appversion < 31) {
	  document.getElementById('ctraddon_pw_pananimation').disabled = true;
	  document.getElementById('ctraddon_pw_pananimation').style.visibility = 'collapse';
	  
	  document.getElementById('ctraddon_closetab_pw_act').style.visibility = 'collapse';
	  document.getElementById('ctraddon_closetab_pw_non').style.visibility = 'collapse';
	  document.getElementById('ctraddon_closetab_pw_sta').style.visibility = 'collapse';
	  document.getElementById('ctraddon_closetab_pw_end').style.visibility = 'collapse';
	}
	if (this.appversion < 32) {
	  document.getElementById('ctraddon_pw_noconicons').disabled = true;
	  document.getElementById('ctraddon_pw_noconicons').style.visibility = 'collapse';
	}
	if (this.appversion < 33) {
	  document.getElementById('ctraddon_experttweakstab').style.visibility = 'collapse';
	  
	  document.getElementById('ctraddon_pw_f33layers').disabled = true;
	  document.getElementById('ctraddon_pw_f33layers').style.visibility = 'collapse';
	  document.getElementById('ctraddon_pw_f33layersdescr').disabled = true;
	  document.getElementById('ctraddon_pw_f33layersdescr').style.visibility = 'collapse';
	}
	if (this.appversion < 34) {
	  document.getElementById('ctraddon_pw_oldsearch').disabled = true;
	  document.getElementById('ctraddon_pw_oldsearch').style.visibility = 'collapse';
	  document.getElementById('ctraddon_pw_oldsearchdescr').disabled = true;
	  document.getElementById('ctraddon_pw_oldsearchdescr').style.visibility = 'collapse';
	  document.getElementById('ctraddon_pw_loopcall').disabled = true;
	  document.getElementById('ctraddon_pw_loopcall').style.visibility = 'collapse';
	  document.getElementById('ctraddon_pw_loopcalldescr').disabled = true;
	  document.getElementById('ctraddon_pw_loopcalldescr').style.visibility = 'collapse';
	}
	if (this.appversion < 35) {
	  document.getElementById('ctraddon_pw_devtheme').disabled = true;
	  document.getElementById('ctraddon_pw_devtheme').style.visibility = 'collapse';
	  document.getElementById('ctraddon_pw_devthemeb').disabled = true;
	  document.getElementById('ctraddon_pw_devthemeb').style.visibility = 'collapse';
	  document.getElementById('ctraddon_pw_devthemedescr').style.visibility = 'collapse';
	  document.getElementById('ctraddon_nodevtheme').disabled = true;
	  document.getElementById('ctraddon_nodevtheme').style.visibility = 'collapse';
	}
	if (this.appversion < 36) {
	  document.getElementById('ctraddon_pw_oldprefs').disabled = true;
	  document.getElementById('ctraddon_pw_oldprefs').style.visibility = 'collapse';
	  document.getElementById('ctraddon_pw_oldprefsdescr').disabled = true;
	  document.getElementById('ctraddon_pw_oldprefsdescr').style.visibility = 'collapse';
	}

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
	
	var ctrSettingsListenerW_forCTB = new PrefListener(
	  "extensions.cstbb-extension.",
	  function(branch, name) {
		switch (name) {

		  case "navbarbuttons":
		  
		    var ctbbuttons = false;
			
			try {
			  ctbbuttons = branch.getCharPref("navbarbuttons")!="nabbuttons_off";
			} catch(e){}
		  
			if (ctbbuttons) {
			  document.getElementById('ctraddon_pw_smallnavbut').disabled = true;
			}
			else {
			  document.getElementById('ctraddon_pw_smallnavbut').disabled = false;
			}
			
		  break;

		}
	  }
	);
	
	ctrSettingsListenerW_forCTB.register(true);
	
	var ctrSettingsListenerW_forCTR = new PrefListener(
	  "extensions.classicthemerestorer.",
	  function(branch, name) {
		switch (name) {

		  case "ctabmwidth": case "ctabwidth":
		  
		    if(branch.getIntPref("ctabmwidth")<48 || branch.getIntPref("ctabwidth")<48 )
			  document.getElementById('ctraddon_pw_tabwidthinfo3').style.visibility = 'visible';
			else
			  document.getElementById('ctraddon_pw_tabwidthinfo3').style.visibility = 'collapse';
		  
		  break;
		  
		  case "ctabheightcb":
		  
		    if(branch.getBoolPref("ctabheightcb"))
			  document.getElementById('ctraddon_pw_tabheightinfo').style.visibility = 'visible';
			else
			  document.getElementById('ctraddon_pw_tabheightinfo').style.visibility = 'collapse';
		  
		  break;

		}
	  }
	);
	
	ctrSettingsListenerW_forCTR.register(true);
	
	
	// update sub settings
	this.ctrpwAppbuttonextra(this.prefs.getCharPref("appbutton"),false);
	this.ctrpwAppbuttonColorExtra(this.prefs.getCharPref("appbuttonc"));
	this.ctrpwTabEmptyFavicon(this.prefs.getBoolPref("emptyfavicon2"));
	this.ctrpwFaviconextra(this.prefs.getBoolPref("faviconurl"));
	this.ctrpwBFextra(this.prefs.getBoolPref("backforward"));
	this.ctrpwSNextra(!this.prefs.getBoolPref('smallnavbut'));
	this.ctrpwHidetbwotExtra(this.prefs.getBoolPref("hidetbwot"));
	this.altTabsToolbarBgExtra(this.prefs.getBoolPref("alttabstb"));
	this.ctrpwModeextra(this.prefs.getCharPref("nav_txt_ico"));
	this.ctrpwDisableDevThemePrefsExtra(this.prefs.getBoolPref("nodevtheme"));

	
	var closetab_value = this.prefs.getCharPref("closetab");
  
    if(closetab_value=="closetab_default"
		|| closetab_value=="closetab_forced"
		|| closetab_value=="closetab_active") {
      this.ctrpwTabcloseextra(false);
	} else this.ctrpwTabcloseextra(true);
	
	switch (this.prefs.getCharPref("closetab")) {
	  case "closetab_default": this.ctrpwTabcloseextra(false); this.ctrpwTabcloseextra2(false); break;
	  case "closetab_forced": this.ctrpwTabcloseextra(false); this.ctrpwTabcloseextra2(false); break;
	  case "closetab_active": this.ctrpwTabcloseextra(false); this.ctrpwTabcloseextra2(false); break;
	  case "closetab_none": this.ctrpwTabcloseextra(true); this.ctrpwTabcloseextra2(true); break;
	  case "closetab_tb_start": this.ctrpwTabcloseextra(true); this.ctrpwTabcloseextra2(false); break;
	  case "closetab_tb_end": this.ctrpwTabcloseextra(true); this.ctrpwTabcloseextra2(false); break;
	}

	this.onCtrPanelSelect();
	
	// if e10s is used show CTRs option to disable tab underlining
	try{
	  if (Components.classes["@mozilla.org/preferences-service;1"]
		.getService(Components.interfaces.nsIPrefService)
			.getBranch("browser.tabs.remote.").getBoolPref("autostart") || 
				Components.classes["@mozilla.org/preferences-service;1"]
				.getService(Components.interfaces.nsIPrefService)
					.getBranch("browser.tabs.remote.autostart.").getBoolPref("1")) {
		document.getElementById('ctraddon_pw_e10stab_notd').disabled = false;
		document.getElementById('ctraddon_pw_e10stab_notd').style.visibility = 'visible';
	  }
	} catch(e) {}
	
	try{
	  if (Components.classes["@mozilla.org/preferences-service;1"]
		.getService(Components.interfaces.nsIPrefService)
			.getBranch("app.update.").getCharPref("channel")=='nightly') {
		document.getElementById('ctraddon_pw_e10stabs').disabled = false;
		document.getElementById('ctraddon_pw_e10stabs').style.visibility = 'visible';
		document.getElementById('ctraddon_pw_e10stabsdescr').style.visibility = 'visible';
	  }
	} catch(e) {}
	
	this.hideThemeInfoForTabs();

  },
  
  /* If an option, which requires a restart, was altered, a prompt to restart Fx will appear
     when preference window gets closed */
  unloadprefwindow: function() {

	var app        	 = Components.classes["@mozilla.org/toolkit/app-startup;1"].getService(Components.interfaces.nsIAppStartup);
	var cancelQuit   = Components.classes["@mozilla.org/supports-PRBool;1"].createInstance(Components.interfaces.nsISupportsPRBool);
	var observerSvc  = Components.classes["@mozilla.org/observer-service;1"].getService(Components.interfaces.nsIObserverService);
	var promptSvc  	 = Components.classes["@mozilla.org/embedcomp/prompt-service;1"].getService(Components.interfaces.nsIPromptService);
	var stringBundle = Components.classes["@mozilla.org/intl/stringbundle;1"].getService(Components.interfaces.nsIStringBundleService)
						.createBundle("chrome://classic_theme_restorer/locale/messages.file");

	if (this.needsRestart &&
		promptSvc.confirm(null,
			stringBundle.GetStringFromName("popup.title"),
			stringBundle.GetStringFromName("popup.msg.restart")
		)) {
		observerSvc.notifyObservers(cancelQuit, "quit-application-requested", "restart");
		if(cancelQuit.data) { // The quit request has been cancelled.
			return false;
		};
		app.quit(app.eAttemptQuit | app.eRestart);
	}
	
	// save last selected categories/tabs
	this.prefs.setIntPref('pref_actindx',document.getElementById("CtrRadioGroup").selectedIndex);
	this.prefs.setIntPref('pref_actindx2',document.getElementById("ctraddon_tabcolor_tabs").selectedIndex);

	return true;
  },
  
  needsBrowserRestart: function(){
	this.needsRestart = true;
	document.getElementById('ctraddon_pw_radiorestart').style.visibility = 'visible';
  },
  
  resetPrefsForDevTheme: function(){
	var currenttabs=this.prefs.getCharPref('tabs');
	
	// reset Tab appearance, but keep last knows preference
	setTimeout(function(){
	  classicthemerestorerjso.ctr.prefs.setCharPref('tabs','tabs_default');
	},50);
	setTimeout(function(){
	  classicthemerestorerjso.ctr.prefs.setCharPref('tabs',currenttabs);
	},100);
	
	// disable aeroblue toolbars preference
	if(this.prefs.getBoolPref('aerocolors'))
	  this.prefs.setBoolPref('aerocolors',false);
  
	this.hideThemeInfoForTabs();

  },
  
  hideThemeInfoForTabs: function(){
	setTimeout(function(){
		try {
		  if(Components.classes["@mozilla.org/preferences-service;1"]
			.getService(Components.interfaces.nsIPrefService)
				.getBranch("browser.devedition.theme.").getBoolPref('enabled')!=false){
			document.getElementById('ctraddon_pw_tabforminfo').style.visibility = 'visible';
			document.getElementById('ctraddon_pw_tabmenulist').disabled = true;
		  } else if(classicthemerestorerjso.ctr.fxdefaulttheme) {
			  document.getElementById('ctraddon_pw_tabforminfo').style.visibility = 'collapse';
			  document.getElementById('ctraddon_pw_tabmenulist').disabled = false;
		  }
		} catch(e) {}
	},100);
  },
  
  unsetTabColorsAndMore: function() {
	this.prefs.setBoolPref('tabcolor_def',false);
	this.prefs.setBoolPref('tabcolor_act',false);
	this.prefs.setBoolPref('tabcolor_pen',false);
	this.prefs.setBoolPref('tabcolor_unr',false);
	this.prefs.setBoolPref('tabcolor_hov',false);
	this.prefs.setBoolPref('ntabcolor_def',false);
	this.prefs.setBoolPref('ntabcolor_hov',false);
	
	if(this.prefs.getBoolPref('closeonleft')) {
	  this.prefs.setBoolPref('closeonleft',false);
	  setTimeout(function(){
		classicthemerestorerjso.ctr.prefs.setBoolPref('closeonleft',true);
	  },20);
	}
  },
  
  ctrpwFaviconextra: function(which) {
    if(which==true) which=false; else which=true;
	document.getElementById('ctraddon_padlock_extra').disabled = which;
  },
  
  ctrpwTabEmptyFavicon: function(which) {
	document.getElementById('ctraddon_pw_tab_emptyfavicon').disabled = which;
  },
  
  ctrpwBFextra: function(which) {
    if(which==true) which=false; else which=true;
    document.getElementById('ctraddon_pw_hide_bf_popup').disabled = which;
	document.getElementById('ctraddon_pw_bf_space').disabled = which;
	if(classicthemerestorerjso.ctr.prefs.getBoolPref('smallnavbut')==false){
	  document.getElementById('ctraddon_pw_nbcompact').disabled = which;
	}
  },
  
   ctrpwSNextra: function(which) {
    if(classicthemerestorerjso.ctr.prefs.getBoolPref('backforward')){
      if(which==true) which=false; else which=true;
	  document.getElementById('ctraddon_pw_nbcompact').disabled = which;
	}
  },
  
  ctrpwHidetbwotExtra: function(which) {
    if(which==true) which=false; else which=true;
    document.getElementById('ctraddon_pw_hidetbwote').disabled = which;
  },
  
  ctrpwDisableDevThemePrefsExtra: function(which) {
	if (this.appversion >= 35) {
	  document.getElementById('ctraddon_pw_devtheme').disabled = which;
	  document.getElementById('ctraddon_pw_devthemeb').disabled = which;
	}
  },
  
  altTabsToolbarBgExtra: function(which) {
	if (this.fxdefaulttheme) {
	  if(which==true) which=false; else which=true;
      document.getElementById('ctraddon_pw_alttabstb2').disabled = which;
	}
  },
  
  ctrpwTabcloseextra: function(which) {
	document.getElementById('ctraddon_pw_closetabhfl').disabled = which;
	document.getElementById('ctraddon_pw_closeonleft').disabled = which;
  },
  
  ctrpwTabcloseextra2: function(which) {
	document.getElementById('ctraddon_pw_closealt').disabled = which;
  },
  
  ctrMovStatusextra: function() {
  
	setTimeout(function(){
	  try{
		if(CustomizableUI.getPlacementOfWidget("ctraddon_statusbar")==null)
		  CustomizableUI.addWidgetToArea("ctraddon_statusbar", "ctraddon_addon-bar");

		} catch(e){}
	},1300);
  },
  
  ctrpwModeextra: function(which) {
  
    if (which=="iconstxt" || which=="iconstxt2" || which=="txtonly") {
	  document.getElementById('ctraddon_pw_iat_notf_vt').disabled = false;
	} else document.getElementById('ctraddon_pw_iat_notf_vt').disabled = true;
  
  },
 
  ctrpwAppbuttonextra: function(which,fromprefwindow) {
  
  var tabsintitlebar = Components.classes["@mozilla.org/preferences-service;1"]
						 .getService(Components.interfaces.nsIPrefService)
						   .getBranch("browser.tabs.").getBoolPref("drawInTitlebar");
  
	if (which=="appbutton_v1" && this.fxdefaulttheme){
	  document.getElementById('ctraddon_alt_abicons').disabled = false;
	  document.getElementById('ctraddon_abhigher').disabled = false;
	  document.getElementById('ctraddon_appbutbdl').disabled = false;
	  document.getElementById('ctraddon_appbutcolor_list').disabled = false;
	  document.getElementById('ctraddon_dblclclosefx').disabled = true;
	  document.getElementById('ctraddon_pw_appbutonclab').disabled = true;
	  document.getElementById('ctraddon_pw_appbuttontxt').disabled = true;
	  document.getElementById('ctraddon_appbclmmenus').disabled = false;
	} else if (which=="appbutton_v1wt" && this.fxdefaulttheme){
	  document.getElementById('ctraddon_alt_abicons').disabled = true;
	  document.getElementById('ctraddon_abhigher').disabled = false;
	  document.getElementById('ctraddon_appbutbdl').disabled = false;
	  document.getElementById('ctraddon_appbutcolor_list').disabled = false;
	  document.getElementById('ctraddon_dblclclosefx').disabled = true;
	  document.getElementById('ctraddon_pw_appbutonclab').disabled = true;
	  document.getElementById('ctraddon_pw_appbuttontxt').disabled = true;
	  document.getElementById('ctraddon_appbclmmenus').disabled = false;
	} else if (which=="appbutton_v1" && !this.fxdefaulttheme){
	  document.getElementById('ctraddon_alt_abicons').disabled = false;
	  document.getElementById('ctraddon_abhigher').disabled = true;
	  document.getElementById('ctraddon_appbutbdl').disabled = false;
	  document.getElementById('ctraddon_appbutcolor_list').disabled = false;
	  document.getElementById('ctraddon_dblclclosefx').disabled = true;
	  document.getElementById('ctraddon_pw_appbutonclab').disabled = true;
	  document.getElementById('ctraddon_pw_appbuttontxt').disabled = true;
	  document.getElementById('ctraddon_appbclmmenus').disabled = false;
	} else if (which=="appbutton_v1wt" && !this.fxdefaulttheme){
	  document.getElementById('ctraddon_alt_abicons').disabled = false;
	  document.getElementById('ctraddon_abhigher').disabled = true;
	  document.getElementById('ctraddon_appbutbdl').disabled = false;
	  document.getElementById('ctraddon_appbutcolor_list').disabled = false;
	  document.getElementById('ctraddon_dblclclosefx').disabled = true;
	  document.getElementById('ctraddon_pw_appbutonclab').disabled = true;
	  document.getElementById('ctraddon_pw_appbuttontxt').disabled = true;
	  document.getElementById('ctraddon_appbclmmenus').disabled = false;
	} else if (which=="appbutton_off" || which=="appbutton_pm" || which=="appbutton_v2h"){
	  document.getElementById('ctraddon_alt_abicons').disabled = true;
	  document.getElementById('ctraddon_abhigher').disabled = true;
	  document.getElementById('ctraddon_appbutbdl').disabled = true;
	  document.getElementById('ctraddon_appbutcolor_list').disabled = true;
	  document.getElementById('ctraddon_dblclclosefx').disabled = true;
	  document.getElementById('ctraddon_pw_appbutonclab').disabled = true;
	  document.getElementById('ctraddon_pw_appbuttontxt').disabled = true;
	  document.getElementById('ctraddon_appbclmmenus').disabled = true;
	} else if (which=="appbutton_v2io" || which=="appbutton_v2io2") {
	  document.getElementById('ctraddon_alt_abicons').disabled = true;
	  document.getElementById('ctraddon_abhigher').disabled = true;
	  document.getElementById('ctraddon_appbutbdl').disabled = false;
	  document.getElementById('ctraddon_appbutcolor_list').disabled = false;
	  document.getElementById('ctraddon_dblclclosefx').disabled = false;
	  document.getElementById('ctraddon_pw_appbutonclab').disabled = true;
	  document.getElementById('ctraddon_pw_appbuttontxt').disabled = true;
	  document.getElementById('ctraddon_appbclmmenus').disabled = false;
	  
	  if (tabsintitlebar==false && fromprefwindow==true) {
		Components.classes["@mozilla.org/preferences-service;1"]
		 .getService(Components.interfaces.nsIPrefService)
		   .getBranch("browser.tabs.").setBoolPref("drawInTitlebar", true);
	  }
	} else {
	  document.getElementById('ctraddon_alt_abicons').disabled = true;
	  document.getElementById('ctraddon_abhigher').disabled = true;
	  document.getElementById('ctraddon_appbutbdl').disabled = false;
	  document.getElementById('ctraddon_appbutcolor_list').disabled = false;
	  document.getElementById('ctraddon_dblclclosefx').disabled = false;
	  document.getElementById('ctraddon_pw_appbutonclab').disabled = false;
	  document.getElementById('ctraddon_pw_appbuttontxt').disabled = false;
	  document.getElementById('ctraddon_appbclmmenus').disabled = false;
	  
	  if (tabsintitlebar==false && fromprefwindow==true) {
		Components.classes["@mozilla.org/preferences-service;1"]
		 .getService(Components.interfaces.nsIPrefService)
		   .getBranch("browser.tabs.").setBoolPref("drawInTitlebar", true);
	  }
	}
  },
  
  ctrpwAppbuttonColorExtra: function(which){
  
    if(which=="appbuttonc_custom") {
	  document.getElementById('ctraddon_pw_cappbutc1').disabled = false;
	  document.getElementById('ctraddon_pw_cappbutc1cp').disabled = false;
	  document.getElementById('ctraddon_pw_cappbutc2').disabled = false;
	  document.getElementById('ctraddon_pw_cappbutc2cp').disabled = false;
	} else {
	  document.getElementById('ctraddon_pw_cappbutc1').disabled = true;
	  document.getElementById('ctraddon_pw_cappbutc1cp').disabled = true;
	  document.getElementById('ctraddon_pw_cappbutc2').disabled = true;
	  document.getElementById('ctraddon_pw_cappbutc2cp').disabled = true;
	}
  
  },
  
  ctrpwStarFeedDelay: function(){
	document.getElementById('ctraddon_pw_starinurl').disabled = true;
	document.getElementById('ctraddon_pw_feedinurl').disabled = true;
	document.getElementById("ctraddon_pw_starinurl").style.listStyleImage="url('chrome://classic_theme_restorer/content/images/throbber_loading.png')";
	document.getElementById("ctraddon_pw_feedinurl").style.listStyleImage="url('chrome://classic_theme_restorer/content/images/throbber_loading.png')";
	
	setTimeout(function(){
		document.getElementById('ctraddon_pw_starinurl').disabled = false;
		document.getElementById('ctraddon_pw_feedinurl').disabled = false;
		document.getElementById("ctraddon_pw_starinurl").style.listStyleImage="unset";
		document.getElementById("ctraddon_pw_feedinurl").style.listStyleImage="unset";
	},1350);
  },
  
  resetCTRpreferences: function() {
    var preferences = document.getElementsByTagName("preference");
    for (let preference of preferences) {
      preference.value = preference.defaultValue == null ? undefined : preference.defaultValue;
    }

	var tabsintitlebar = Components.classes["@mozilla.org/preferences-service;1"]
						  .getService(Components.interfaces.nsIPrefService)
						    .getBranch("browser.tabs.").getBoolPref("drawInTitlebar");
										
	if (this.oswindows && tabsintitlebar) {
	  this.prefs.setCharPref("appbutton",'appbutton_v2');
	}
	
	this.initprefwindow();
	
	this.ctrpwStarFeedDelay();
	
	this.needsBrowserRestart();
  },

  // 'classic' preset
  classicCTRpreferences: function() {
	this.resetCTRpreferences();
	
	this.prefs.setIntPref("ctabwidth",250);
	this.prefs.setBoolPref("panelmenucol",true);
	this.prefs.setBoolPref("verifiedcolors",true);
	this.prefs.setCharPref("findbar",'findbar_bottoma');
	this.prefs.setBoolPref("hideprivmask",true);
	this.prefs.setBoolPref("cpanelmenus",true);
	this.prefs.setBoolPref("emptyfavicon",true);
	this.prefs.setBoolPref("hidezoomres",true);
	this.prefs.setBoolPref("faviconurl",true);
	this.prefs.setBoolPref("bmanimation",true);
	this.prefs.setBoolPref("pananimation",true);
	this.prefs.setBoolPref("noconicons",true);
	this.prefs.setBoolPref("alt_newtabp",true);
	
	setTimeout(function(){
		classicthemerestorerjso.ctr.prefs.setBoolPref("starinurl",true);
		classicthemerestorerjso.ctr.prefs.setBoolPref("feedinurl",true);
	},1350);
	
	if (this.oswindows) this.prefs.setBoolPref("dblclnewtab",true);
	
	this.needsBrowserRestart();

  },
  
  australisCTRpreferences: function() {
	this.resetCTRpreferences();
	
	this.prefs.setCharPref("tabs",'tabs_default');
	this.prefs.setCharPref("appbutton",'appbutton_off');
	
	this.prefs.setBoolPref("statusbar",false);
	this.prefs.setBoolPref("activndicat",false);
	this.prefs.setBoolPref("toolsitem",false);
	this.prefs.setBoolPref("cuibuttons",false);
	
	if (this.oswindows) this.prefs.setBoolPref("dblclnewtab",true);
	
	this.needsBrowserRestart();

  },

  /* export CTR settings */
  exportCTRpreferences: function() {

	var patterns = new Array;
	  
	patterns[0]="CTR_Preferences__DO_NOT_EDIT__'='->booleans__':'->strings__'~'->integers";
	patterns[1]="tabs:"+this.prefs.getCharPref("tabs");
	patterns[2]="tabsontop:"+this.prefs.getCharPref("tabsontop");
	patterns[3]="ctabwidth~"+this.prefs.getIntPref("ctabwidth");
	patterns[4]="ctabmwidth~"+this.prefs.getIntPref("ctabmwidth");
	patterns[5]="closetab:"+this.prefs.getCharPref("closetab");
	patterns[6]="appbutton:"+this.prefs.getCharPref("appbutton");
	patterns[7]="appbuttonc:"+this.prefs.getCharPref("appbuttonc");
	
	patterns[8]="alttbappb="+this.prefs.getBoolPref("alttbappb");
	patterns[9]="appbutmhi="+this.prefs.getBoolPref("appbutmhi");
	patterns[10]="appbutbdl="+this.prefs.getBoolPref("appbutbdl");
		
	patterns[11]="nbiconsize:"+this.prefs.getCharPref("nbiconsize");
	patterns[12]="smallnavbut="+this.prefs.getBoolPref("smallnavbut");
	patterns[13]="hidenavbar="+this.prefs.getBoolPref("hidenavbar");
	patterns[14]="backforward="+this.prefs.getBoolPref("backforward");
	patterns[15]="wincontrols="+this.prefs.getBoolPref("wincontrols");
	patterns[16]="starinurl="+this.prefs.getBoolPref("starinurl");
	patterns[17]="statusbar="+this.prefs.getBoolPref("statusbar");
	patterns[18]="hideurelstop="+this.prefs.getBoolPref("hideurelstop");
	patterns[19]="combrelstop="+this.prefs.getBoolPref("combrelstop");
	patterns[20]="panelmenucol="+this.prefs.getBoolPref("panelmenucol");
	patterns[21]="verifiedcolors="+this.prefs.getBoolPref("verifiedcolors");
	patterns[22]="findbar:"+this.prefs.getCharPref("findbar");
	patterns[23]="nav_txt_ico:"+this.prefs.getCharPref("nav_txt_ico");
		
	patterns[24]="ctab1:"+this.prefs.getCharPref("ctab1");
	patterns[25]="ctab2:"+this.prefs.getCharPref("ctab2");
	patterns[26]="ctabhov1:"+this.prefs.getCharPref("ctabhov1");
	patterns[27]="ctabhov2:"+this.prefs.getCharPref("ctabhov2");
	patterns[28]="ctabact1:"+this.prefs.getCharPref("ctabact1");
	patterns[29]="ctabact2:"+this.prefs.getCharPref("ctabact2");
	patterns[30]="ctabpen1:"+this.prefs.getCharPref("ctabpen1");
	patterns[31]="ctabpen2:"+this.prefs.getCharPref("ctabpen2");
	patterns[32]="ctabunr1:"+this.prefs.getCharPref("ctabunr1");
	patterns[33]="ctabunr2:"+this.prefs.getCharPref("ctabunr2");
	patterns[34]="cntab1:"+this.prefs.getCharPref("cntab1");
	patterns[35]="cntab2:"+this.prefs.getCharPref("cntab2");
	patterns[36]="cntabhov1:"+this.prefs.getCharPref("cntabhov1");
	patterns[37]="cntabhov2:"+this.prefs.getCharPref("cntabhov2");
	patterns[38]="ctabt:"+this.prefs.getCharPref("ctabt");
	patterns[39]="ctabhovt:"+this.prefs.getCharPref("ctabhovt");
	patterns[40]="ctabactt:"+this.prefs.getCharPref("ctabactt");
	patterns[41]="ctabpent:"+this.prefs.getCharPref("ctabpent");
	patterns[42]="ctabunrt:"+this.prefs.getCharPref("ctabunrt");
	patterns[43]="ctabtsh:"+this.prefs.getCharPref("ctabtsh");
	patterns[44]="ctabhovtsh:"+this.prefs.getCharPref("ctabhovtsh");
	patterns[45]="ctabacttsh:"+this.prefs.getCharPref("ctabacttsh");
	patterns[46]="ctabpentsh:"+this.prefs.getCharPref("ctabpentsh");
	patterns[47]="ctabunrtsh:"+this.prefs.getCharPref("ctabunrtsh");
		
	patterns[48]="tabcolor_def="+this.prefs.getBoolPref("tabcolor_def");
	patterns[49]="tabtextc_def="+this.prefs.getBoolPref("tabtextc_def");
	patterns[50]="tabtextsh_def="+this.prefs.getBoolPref("tabtextsh_def");
	patterns[51]="tabcolor_act="+this.prefs.getBoolPref("tabcolor_act");
	patterns[52]="tabtextc_act="+this.prefs.getBoolPref("tabtextc_act");
	patterns[53]="tabtextsh_act="+this.prefs.getBoolPref("tabtextsh_act");
	patterns[54]="tabcolor_hov="+this.prefs.getBoolPref("tabcolor_hov");
	patterns[55]="tabtextc_hov="+this.prefs.getBoolPref("tabtextc_hov");
	patterns[56]="tabtextsh_hov="+this.prefs.getBoolPref("tabtextsh_hov");
	patterns[57]="tabcolor_pen="+this.prefs.getBoolPref("tabcolor_pen");
	patterns[58]="tabtextc_pen="+this.prefs.getBoolPref("tabtextc_pen");
	patterns[59]="tabtextsh_pen="+this.prefs.getBoolPref("tabtextsh_pen");
	patterns[60]="tabcolor_unr="+this.prefs.getBoolPref("tabcolor_unr");
	patterns[61]="tabtextc_unr="+this.prefs.getBoolPref("tabtextc_unr");
	patterns[62]="tabtextsh_unr="+this.prefs.getBoolPref("tabtextsh_unr");
	patterns[63]="ntabcolor_def="+this.prefs.getBoolPref("ntabcolor_def");
	patterns[64]="ntabcolor_hov="+this.prefs.getBoolPref("ntabcolor_hov");
		
	patterns[65]="tabfbold_def="+this.prefs.getBoolPref("tabfbold_def");
	patterns[66]="tabfbold_act="+this.prefs.getBoolPref("tabfbold_act");
	patterns[67]="tabfbold_pen="+this.prefs.getBoolPref("tabfbold_pen");
	patterns[68]="tabfbold_unr="+this.prefs.getBoolPref("tabfbold_unr");
	patterns[69]="tabfbold_hov="+this.prefs.getBoolPref("tabfbold_hov");
	patterns[70]="tabfita_def="+this.prefs.getBoolPref("tabfita_def");
	patterns[71]="tabfita_act="+this.prefs.getBoolPref("tabfita_act");
	patterns[72]="tabfita_pen="+this.prefs.getBoolPref("tabfita_pen");
	patterns[73]="tabfita_unr="+this.prefs.getBoolPref("tabfita_unr");
	patterns[74]="tabfita_hov="+this.prefs.getBoolPref("tabfita_hov");
		
	patterns[75]="highaddonsbar="+this.prefs.getBoolPref("highaddonsbar");
	patterns[76]="hightabpososx="+this.prefs.getBoolPref("hightabpososx");
	patterns[77]="altmenubar="+this.prefs.getBoolPref("altmenubar");
	patterns[78]="altmenubarpos="+this.prefs.getBoolPref("altmenubarpos");
	patterns[79]="altmenubarpos2="+this.prefs.getBoolPref("altmenubarpos2");
	patterns[80]="menubarnofog="+this.prefs.getBoolPref("menubarnofog");
	patterns[81]="noaddonbarbg="+this.prefs.getBoolPref("noaddonbarbg");
	patterns[82]="notabfog="+this.prefs.getBoolPref("notabfog");
	patterns[83]="notabbg="+this.prefs.getBoolPref("notabbg");
	patterns[84]="nobookbarbg="+this.prefs.getBoolPref("nobookbarbg");
	patterns[85]="nonavbarbg="+this.prefs.getBoolPref("nonavbarbg");
	patterns[86]="nonavborder="+this.prefs.getBoolPref("nonavborder");
	patterns[87]="nonavtbborder="+this.prefs.getBoolPref("nonavtbborder");
	patterns[88]="alttabstb="+this.prefs.getBoolPref("alttabstb");

	patterns[89]="cpanelmenus="+this.prefs.getBoolPref("cpanelmenus");
	patterns[90]="bfurlbarfix="+this.prefs.getBoolPref("bfurlbarfix");
	patterns[91]="emptyfavicon="+this.prefs.getBoolPref("emptyfavicon");
	patterns[92]="emptyfavicon2="+this.prefs.getBoolPref("emptyfavicon2");
	patterns[93]="hidezoomres="+this.prefs.getBoolPref("hidezoomres");
	patterns[94]="pmhidelabels="+this.prefs.getBoolPref("pmhidelabels");
	patterns[95]="menupopupscr="+this.prefs.getBoolPref("menupopupscr");
	patterns[96]="hideprivmask="+this.prefs.getBoolPref("hideprivmask");
		
	patterns[97]="invicomenubar="+this.prefs.getBoolPref("invicomenubar");
	patterns[98]="invicotabsbar="+this.prefs.getBoolPref("invicotabsbar");
	patterns[99]="inviconavbar="+this.prefs.getBoolPref("inviconavbar");
	patterns[100]="invicoextrabar="+this.prefs.getBoolPref("invicoextrabar");
	patterns[101]="invicobookbar="+this.prefs.getBoolPref("invicobookbar");
	patterns[102]="invicoaddonbar="+this.prefs.getBoolPref("invicoaddonbar");
		
	patterns[103]="tabmokcolor="+this.prefs.getBoolPref("tabmokcolor");
	patterns[104]="tabmokcolor2="+this.prefs.getBoolPref("tabmokcolor2");
	patterns[105]="tabmokcolor3="+this.prefs.getBoolPref("tabmokcolor3");

	patterns[106]="dblclnewtab="+this.prefs.getBoolPref("dblclnewtab");
	patterns[107]="hidetbwot="+this.prefs.getBoolPref("hidetbwot");
	patterns[108]="faviconurl="+this.prefs.getBoolPref("faviconurl");
	patterns[109]="padlock:"+this.prefs.getCharPref("padlock");
	patterns[110]="dblclclosefx="+this.prefs.getBoolPref("dblclclosefx");
	patterns[111]="hide_bf_popup="+this.prefs.getBoolPref("hide_bf_popup");
		
	patterns[112]="throbberalt="+this.prefs.getBoolPref("throbberalt");
	patterns[113]="bmanimation="+this.prefs.getBoolPref("bmanimation");
	patterns[114]="pananimation="+this.prefs.getBoolPref("pananimation");
		
	patterns[115]="closeabarbut="+this.prefs.getBoolPref("closeabarbut");
	patterns[116]="toolsitem="+this.prefs.getBoolPref("toolsitem");
	patterns[117]="appmenuitem="+this.prefs.getBoolPref("appmenuitem");
	patterns[118]="contextitem="+this.prefs.getBoolPref("contextitem");
	patterns[119]="cuibuttons="+this.prefs.getBoolPref("cuibuttons");
	
	patterns[120]="padlockex="+this.prefs.getBoolPref("padlockex");
	patterns[121]="closetabhfl="+this.prefs.getBoolPref("closetabhfl");
	patterns[122]="noemptypticon="+this.prefs.getBoolPref("noemptypticon");
	patterns[123]="feedinurl="+this.prefs.getBoolPref("feedinurl");
	patterns[124]="noconicons="+this.prefs.getBoolPref("noconicons");
	patterns[125]="closealt="+this.prefs.getBoolPref("closealt");
	patterns[126]="closeonleft="+this.prefs.getBoolPref("closeonleft");
	patterns[127]="hidetbwote="+this.prefs.getBoolPref("hidetbwote");
	patterns[128]="puictrbutton="+this.prefs.getBoolPref("puictrbutton");
	patterns[129]="hideprbutton="+this.prefs.getBoolPref("hideprbutton");
	patterns[130]="hidesbclose="+this.prefs.getBoolPref("hidesbclose");
	patterns[131]="athrobberurl:"+this.prefs.getCharPref("athrobberurl");
	patterns[132]="bmarkoinpw="+this.prefs.getBoolPref("bmarkoinpw");
	patterns[133]="appbclmmenus="+this.prefs.getBoolPref("appbclmmenus");
	patterns[134]="chevronfix="+this.prefs.getBoolPref("chevronfix");
	patterns[135]="bf_space="+this.prefs.getBoolPref("bf_space");
	patterns[136]="tabc_hov_unr="+this.prefs.getBoolPref("tabc_hov_unr");
	patterns[137]="tabc_hov_unl="+this.prefs.getBoolPref("tabc_hov_unl");
	patterns[138]="iat_notf_vt="+this.prefs.getBoolPref("iat_notf_vt");
	patterns[139]="tabmokcolor4="+this.prefs.getBoolPref("tabmokcolor4");
	patterns[140]="am_extrabars~"+this.prefs.getIntPref("am_extrabars");
	patterns[141]="activndicat="+this.prefs.getBoolPref("activndicat");
	patterns[142]="urlbardropm="+this.prefs.getBoolPref("urlbardropm");
	patterns[143]="mbarposition:"+this.prefs.getCharPref("mbarposition");
	patterns[144]="nbisizedelay~"+this.prefs.getIntPref("nbisizedelay");
	patterns[145]="appbuttontxt:"+this.prefs.getCharPref("appbuttontxt");
	patterns[146]="alt_newtabp="+this.prefs.getBoolPref("alt_newtabp");
	patterns[147]="mbarforceleft="+this.prefs.getBoolPref("mbarforceleft");
	patterns[148]="mbarforceright="+this.prefs.getBoolPref("mbarforceright");
	patterns[149]="ctabheight~"+this.prefs.getIntPref("ctabheight");
	patterns[150]="ctabheightcb="+this.prefs.getBoolPref("ctabheightcb");
	patterns[151]="tabc_act_tb="+this.prefs.getBoolPref("tabc_act_tb");
	patterns[152]="cappbutc1:"+this.prefs.getCharPref("cappbutc1");
	patterns[153]="cappbutc2:"+this.prefs.getCharPref("cappbutc2");
	patterns[154]="svgfilters="+this.prefs.getBoolPref("svgfilters");
	patterns[155]="aerocolors="+this.prefs.getBoolPref("aerocolors");
	patterns[156]="addonbarfs="+this.prefs.getBoolPref("addonbarfs");
	patterns[157]="alttabstb2="+this.prefs.getBoolPref("alttabstb2");
	patterns[158]="nodevtheme="+this.prefs.getBoolPref("nodevtheme");
	

	saveToFile(patterns);
	  
	function saveToFile(patterns) {

	  const nsIFilePicker = Components.interfaces.nsIFilePicker;
	  var fp = Components.classes["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
	  var stream = Components.classes["@mozilla.org/network/file-output-stream;1"].createInstance(Components.interfaces.nsIFileOutputStream);

	  fp.init(window, null, nsIFilePicker.modeSave);
	  fp.defaultExtension = "txt";
	  fp.defaultString = "CTRpreferences.txt";
	  fp.appendFilters(nsIFilePicker.filterText);

	  if (fp.show() != nsIFilePicker.returnCancel) {
		let file = fp.file;
		if (!/\.txt$/.test(file.leafName.toLowerCase()))
		  file.leafName += ".txt";
		if (file.exists())
		  file.remove(true);
		file.create(file.NORMAL_FILE_TYPE, parseInt("0666", 8));
		stream.init(file, 0x02, 0x200, null);

		for (var i = 0; i < patterns.length ; i++) {
		  patterns[i]=patterns[i]+"\n";
		  stream.write(patterns[i], patterns[i].length);
		}
		stream.close();
	  }
	}
	  
	return true;
  },
  
  /* import CTR settings */
 importCTRpreferences: function() {
 
	var stringBundle = Components.classes["@mozilla.org/intl/stringbundle;1"].getService(Components.interfaces.nsIStringBundleService)
	                    .createBundle("chrome://classic_theme_restorer/locale/messages.file");
  
	var pattern = loadFromFile();

	if (!pattern) return false;
	   
	if(pattern[0]!="CTR_Preferences__DO_NOT_EDIT__'='->booleans__':'->strings__'~'->integers") {
	  alert(stringBundle.GetStringFromName("import.error"));
	  return false;
	}

	var i, prefName, prefValue;
	   
	for (i=1; i<pattern.length; i++){
	  var index1 = pattern[i].indexOf("="); // for finding booleans
	  var index2 = pattern[i].indexOf(":"); // for finding strings
	  var index3 = pattern[i].indexOf("~"); // for finding integers

	  if (index2 > 0){ // find string
		 prefName  = pattern[i].substring(0,index2);
		 prefValue = pattern[i].substring(index2+1,pattern[i].length);
		 
		 this.prefs.setCharPref(''+prefName+'',''+prefValue+'');
	  }
	  else if (index1 > 0){ // find boolean
		 prefName  = pattern[i].substring(0,index1);
		 prefValue = pattern[i].substring(index1+1,pattern[i].length);
		 
		 // if prefValue string is "true" -> true, else -> false
		 this.prefs.setBoolPref(''+prefName+'',(prefValue === 'true'));
	  }
	  else if (index3 > 0){ // find integer
		 prefName  = pattern[i].substring(0,index3);
		 prefValue = pattern[i].substring(index3+1,pattern[i].length);
		 
		 this.prefs.setIntPref(''+prefName+'',prefValue);
	  }
	}
	   
	function loadFromFile() {

	   const nsIFilePicker = Components.interfaces.nsIFilePicker;
	   var fp = Components.classes["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
	   var stream = Components.classes["@mozilla.org/network/file-input-stream;1"].createInstance(Components.interfaces.nsIFileInputStream);
	   var streamIO = Components.classes["@mozilla.org/scriptableinputstream;1"].createInstance(Components.interfaces.nsIScriptableInputStream);

	   fp.defaultExtension = "txt";
	   fp.defaultString = "CTRpreferences.txt";
	   fp.init(window, null, nsIFilePicker.modeOpen);
	   fp.appendFilters(nsIFilePicker.filterText);

	   if (fp.show() != nsIFilePicker.returnCancel) {
		  stream.init(fp.file, 0x01, parseInt("0444", 8), null);
		  streamIO.init(stream);
		  var input = streamIO.read(stream.available());
		  streamIO.close();
		  stream.close();

		  var linebreak = input.match(/(((\n+)|(\r+))+)/m)[1];
		  return input.split(linebreak);
	   }
	   return null;
	}
	
	this.needsBrowserRestart();
	
	return true;
  },
  
    /* import CTR settings JSON*/
 importCTRpreferencesJSON: function() {
 
 	var prefService = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
	var stringBundle = Components.classes["@mozilla.org/intl/stringbundle;1"].getService(Components.interfaces.nsIStringBundleService)
	                    .createBundle("chrome://classic_theme_restorer/locale/messages.file");
  
	var parjson = loadFromFile();

	if (!parjson) return false;
	
		function setPrefValue(pref, val){

		switch (prefService.getPrefType(pref)){
						
				case 32:
					return prefService.setCharPref(pref, val);						
				break;
								
				case 64:
					return prefService.setIntPref(pref, val);
				break;
								
				case 128:
					return prefService.setBoolPref(pref, val);		
				break;	
			
			}

		}
			
			for (var i = 0; i < parjson.length ; i++) {						  
				  try {	

						if(parjson[i].preference.match(/extensions.classicthemerestorer./g)){
							setPrefValue(parjson[i].preference, parjson[i].value);
						}
						
				  } catch(e) {
						//Catch any nasty errors and output to dialogue
						Components.utils.reportError(e);
				  }
			}		
	
   
	function loadFromFile() {

	   const nsIFilePicker = Components.interfaces.nsIFilePicker;
	   var fp = Components.classes["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
	   var stream = Components.classes["@mozilla.org/network/file-input-stream;1"].createInstance(Components.interfaces.nsIFileInputStream);
	   var streamIO = Components.classes["@mozilla.org/scriptableinputstream;1"].createInstance(Components.interfaces.nsIScriptableInputStream);

	   fp.defaultExtension = "json";
	   fp.defaultString = "CTRpreferences.json";
	   fp.init(window, null, nsIFilePicker.modeOpen);
	   fp.appendFilters(nsIFilePicker.filterAll);

	   if (fp.show() != nsIFilePicker.returnCancel) {
		  stream.init(fp.file, 0x01, parseInt("0444", 8), null);
		  streamIO.init(stream);
		  var input = streamIO.read(stream.available());
		  streamIO.close();
		  stream.close();
		  return JSON.parse(input);
	   }
	   return null;
	}
	
	this.needsBrowserRestart();
	
	return true;
  },
  
  /* export CTR settings JSON */
  exportCTRpreferencesJSON: function() {

	var prefService = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);                             
	var preflist = prefService.getChildList("extensions.classicthemerestorer.");

		let preferenceArray = {
			preference: [],
			value: []
		};
		
		//Preference Filter all preferences we don't want to export\import..
		let blacklist = [
		"extensions.classicthemerestorer.e10stab_notd",
		"extensions.classicthemerestorer.nbcompact",
		"extensions.classicthemerestorer.icopageinfo",
		"extensions.classicthemerestorer.mbarpositionl",
		"extensions.classicthemerestorer.pref_actindx",
		"extensions.classicthemerestorer.pref_actindx2",
		"extensions.classicthemerestorer.ctrreset"
		];
		
		function prefValue(pref){

		switch (prefService.getPrefType(pref)){
						
				case 32:
					return prefService.getCharPref(pref);
				break;
								
				case 64:
					return prefService.getIntPref(pref);
				break;
								
				case 128:
					return prefService.getBoolPref(pref);		
				break;
				
			}

		}	
			
			for (var i = 0; i < preflist.length ; i++) {
						  
				  try {	
				  
						//Run Blacklist filter, Here we filter out all preferences we don't want exported|imported.
						var index = preflist.indexOf(blacklist[i]);
							
						if (index > -1) {
							preflist.splice(index, 1);
						}
							
						preferenceArray.preference.push({
							"preference" : preflist[i],
							"value" : prefValue(preflist[i])
						});
														
				  } catch(e) {
						//Catch any nasty errors and output to dialogue
						Components.utils.reportError(e);
				  }
			}
				
				
	saveToFile(preferenceArray);
	  
	function saveToFile(patterns) {

	  const nsIFilePicker = Components.interfaces.nsIFilePicker;
	  var fp = Components.classes["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
	  var stream = Components.classes["@mozilla.org/network/file-output-stream;1"].createInstance(Components.interfaces.nsIFileOutputStream);

	  fp.init(window, null, nsIFilePicker.modeSave);
	  fp.defaultExtension = "json";
	  fp.defaultString = "CTRpreferences.json";
	  fp.appendFilters(nsIFilePicker.filterAll);

	  if (fp.show() != nsIFilePicker.returnCancel) {
		let file = fp.file;
		if (!/\.json$/.test(file.leafName.toLowerCase()))
		  file.leafName += ".json";
		if (file.exists())
		  file.remove(true);
		file.create(file.NORMAL_FILE_TYPE, parseInt("0666", 8));
		stream.init(file, 0x02, 0x200, null);

		var patternItems = JSON.stringify(patterns.preference);
	
			stream.write(patternItems, patternItems.length)

		stream.close();
	  }
	}
	  
	return true;			
	  
  }, 
 
  onCtrPanelSelect: function() {
    let ctrAddonPrefBoxTab = document.getElementById("CtrRadioGroup");
    let selectedPanel = document.getElementById(ctrAddonPrefBoxTab.value);
    selectedPanel.parentNode.selectedPanel = selectedPanel;

    for (let i = 0; i < ctrAddonPrefBoxTab.itemCount; i++) {
      let radioItem = ctrAddonPrefBoxTab.getItemAtIndex(i);
      let pane = document.getElementById(radioItem.value);
      pane.setAttribute("selected", (radioItem.selected)? "true" : "false");
    }
  }
  
};

"use strict";
(function(global) {
if (typeof classicthemerestorerjso == "undefined") {var classicthemerestorerjso = {};};
if (!classicthemerestorerjso.ctr) {classicthemerestorerjso.ctr = {};};

var Cc = Components.classes, Ci = Components.interfaces, Cu = Components.utils;

var {CustomizableUI} = Cu.import("resource:///modules/CustomizableUI.jsm", {});
var {AddonManager} = Cu.import("resource://gre/modules/AddonManager.jsm", {});

//Import services use one service for preferences.
var {Services} = Cu.import("resource://gre/modules/Services.jsm", {});

classicthemerestorerjso.ctr = {

  prefs:			Services.prefs.getBranch("extensions.classicthemerestorer."),
  fxdefaulttheme:	Services.prefs.getBranch("general.skins.").getCharPref("selectedSkin") == 'classic/1.0',
  appversion:		parseInt(Services.appinfo.version),
  oswindows:		Services.appinfo.OS=="WINNT",
  needsRestart: 	false,
  ctrVersioninWin:  true,
  tmp_tu_active:	false,
  // Exclude all preferences we don't want to sync, export or import.
  blacklist: [
	"extensions.classicthemerestorer.pw_actidx_c",
	"extensions.classicthemerestorer.pw_actidx_t",
	"extensions.classicthemerestorer.pw_actidx_tc",
	"extensions.classicthemerestorer.pw_actidx_g",
	"extensions.classicthemerestorer.pw_actidx_tb",
	"extensions.classicthemerestorer.pw_actidx_lb",
	"extensions.classicthemerestorer.pw_actidx_sb",
	"extensions.classicthemerestorer.ctrreset"
	],

  initprefwindow: function() {
  
	// adds a new global attribute 'defaultfxtheme' -> better parting css for default and non-default themes
	try{
		if (this.fxdefaulttheme) document.getElementById("ClassicTRoptionsPane").setAttribute('defaultfxtheme',true);
		  else {
			var thirdpartytheme = Services.prefs.getBranch("general.skins.").getCharPref("selectedSkin");
			if(thirdpartytheme=="Tangerinefox" || thirdpartytheme=="Tangofox") {
			  this.fxdefaulttheme=true;
			  document.getElementById("ClassicTRoptionsPane").setAttribute('defaultfxtheme',true);
			}
		  
		  }
	} catch(e){}
	
	try{
		if(Services.prefs.getBranch("lightweightThemes.").getCharPref('selectedThemeID')=='firefox-devedition@mozilla.org'
			|| Services.prefs.getBranch("lightweightThemes.").getCharPref('selectedThemeID')=='firefox-compact-dark@mozilla.org'
			|| Services.prefs.getBranch("lightweightThemes.").getCharPref('selectedThemeID')=='firefox-compact-light@mozilla.org'
		  )
		{
		  this.fxdefaulttheme=false;
		}
	} catch(e){}
	
	// restore last selected categories/tabs
	document.getElementById("CtrRadioGroup").selectedIndex = this.prefs.getIntPref('pw_actidx_c');
	document.getElementById("ctraddon_pw_tabs_tabs").selectedIndex = this.prefs.getIntPref('pw_actidx_t');
	document.getElementById("ctraddon_tabcolor_tabs").selectedIndex = this.prefs.getIntPref('pw_actidx_tc');
	document.getElementById("ctraddon_pw_generalui_tabs").selectedIndex = this.prefs.getIntPref('pw_actidx_g');
	document.getElementById("ctraddon_pw_toolbars_tabs").selectedIndex = this.prefs.getIntPref('pw_actidx_tb');
	document.getElementById("ctraddon_pw_locationbar_tabs").selectedIndex = this.prefs.getIntPref('pw_actidx_lb');
	document.getElementById("ctraddon_pw_searchbar_tabs").selectedIndex = this.prefs.getIntPref('pw_actidx_sb');
	
	// disable and hide items not usable on third party themes
	if (!this.fxdefaulttheme) {
		document.getElementById('ctraddon_pw_tabmenulist').disabled = true;
		document.getElementById('ctraddon_pw_colors_ntab_t').disabled = true;

		document.getElementById('ctraddon_abhigher').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_smallnavbut').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_iconsbig').style.visibility = 'collapse';

		document.getElementById('ctraddon_pw_ccol_act_pref').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_ccol_act_cp1').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_ccol_act_cp2').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_ccol_act_b1').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_ccol_act_b2').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_altmenubar').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_menubarnofog').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_tabmokcolor').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_tabmokcolor2').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_tabmokcolor4').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_panelmenucolor').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_mockupoptions').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_invertedicons').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_alttabstb').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_alttabstb2').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_ib_graycolor').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_verifiedcolors').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_notabfog').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_notabbg').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_nonavbarbg').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_nonavbarbg1').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_nonavborder').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_nonavtbborder').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_nobookbarbg').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_noaddonbarbg').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_noconicons').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_closeonleft').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_nbcompact').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_nbcompact2').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_tabc_act_tb').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_aerocolors').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_tbsep_winc').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_transpttbw10').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_transpttbew10').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_locsearchbw10').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_bookmarksbargroup2').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_tabstoolbargroup').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_menubargroup2').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_hightabpososx').style.visibility = 'collapse';	
		document.getElementById('ctraddon_pw_tttitlebar').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_am_compact').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_am_compact2').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_ib_nohovcolor').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_altreaderico').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_alt_addonsm').style.visibility = 'collapse';
		document.getElementById('ctraddon_altoptions_list').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_urlbardark').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_searchbardark').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_altdlprogbar').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_altalertbox').style.visibility = 'collapse';
	} else {
		document.getElementById('ctraddon_pw_themes_note').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_special_font').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_tabforminfo').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_dblclnewtabdes').style.visibility = 'collapse';
		document.getElementById('ctraddon_altoptions_list2').style.visibility = 'collapse';
	};
	
	if(Services.prefs.getBranch("lightweightThemes.").getCharPref('selectedThemeID')=='firefox-devedition@mozilla.org'
		|| Services.prefs.getBranch("lightweightThemes.").getCharPref('selectedThemeID')=='firefox-compact-dark@mozilla.org'
		|| Services.prefs.getBranch("lightweightThemes.").getCharPref('selectedThemeID')=='firefox-compact-light@mozilla.org'
	  ) {
	  document.getElementById('ctraddon_altoptions_list').style.visibility = 'visible';
	  document.getElementById('ctraddon_pw_alt_addonsm').style.visibility = 'visible';
	  document.getElementById('ctraddon_altoptions_list2').style.visibility = 'collapse';
	  document.getElementById('ctraddon_pw_ib_graycolor').style.visibility = 'visible';
	  document.getElementById('ctraddon_pw_ib_nohovcolor').style.visibility = 'visible';
	  document.getElementById('ctraddon_pw_verifiedcolors').style.visibility = 'visible';
	  document.getElementById('ctraddon_pw_altdlprogbar').style.visibility = 'visible';
	  document.getElementById('ctraddon_pw_altalertbox').style.visibility = 'visible';
	}
	
	// ColorfulTabs info label
	document.getElementById('ctraddon_coltabsinfo').style.visibility = 'collapse';

	// radio restart label
	document.getElementById('ctraddon_pw_radiorestart').style.visibility = 'collapse';
	
	// tab height/width
	document.getElementById('ctraddon_pw_tabheightinfo').style.visibility = 'collapse';
	document.getElementById('ctraddon_pw_tabwidthinfo').style.visibility = 'collapse';
	document.getElementById('ctraddon_pw_tabwidthinfo2').style.visibility = 'collapse';
	document.getElementById('ctraddon_pw_tabwidthinfo3').style.visibility = 'collapse';
	
	// HCTP add-on extra labels
	document.getElementById('ctraddon_hctpinfotab').style.visibility = 'collapse';
	document.getElementById('ctraddon_hctpinfoab').style.visibility = 'collapse';
	
	// 'Tabs on bottom' add-ons
	document.getElementById('ctraddon_tobinfotab').style.visibility = 'collapse';
	
	// Add-on comaptibiliy reporter note
	document.getElementById('ctraddon_pw_acr_note').style.visibility = 'collapse';
	
	// restore prefwindows "OK" button on MacOS; x on titlebar is not enough
	if (Services.appinfo.OS=="Darwin") {
		document.getElementById('ctraddon_pw_okbutton').style.display = 'block';
		document.getElementById('ctraddon_pw_okbutton').disabled = false;
	}
	
	// extra checks to not enable tab width settings while 'TabMixPlus' or 'TabUtilities' is enabled
	AddonManager.getAddonByID('{dc572301-7619-498c-a57d-39143191b318}', function(addon) {
	  if(addon && addon.isActive) {
		  
		classicthemerestorerjso.ctr.tmp_tu_active = true;
		
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

		classicthemerestorerjso.ctr.tmp_tu_active = true;

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
	
	//Colorful Tabs add-on extra info
	AddonManager.getAddonByID('{0545b830-f0aa-4d7e-8820-50a4629a56fe}', function(addon) {
	  if(addon && addon.isActive) {
		document.getElementById('ctraddon_coltabsinfo').style.visibility = 'visible';
	  }
	});
	
	// 'Status4Evar', 'Puzzle Bars' and 'The Addon Bar Restored'
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
	
	// NoiaButtons
	var NBOListener = {
	   onEnabled: function(addon) {
		  if(addon.id == 'NoiaButtons@ArisT2_Noia4dev') { 
		    document.getElementById('ctraddon_pw_smallnavbut').disabled = true;
		  }
	   },
	   onDisabled: function(addon) {
		  document.getElementById('ctraddon_pw_smallnavbut').disabled = false;
	   }
	};
	AddonManager.addAddonListener(NBOListener);
	
	AddonManager.getAddonByID('NoiaButtons@ArisT2_Noia4dev', function(addon) {
	  if(addon && addon.isActive) {
		document.getElementById('ctraddon_pw_smallnavbut').disabled = true;
	  } else{
		document.getElementById('ctraddon_pw_smallnavbut').disabled = false;
	  }
	});
	
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
	
	//HCTP add-on extra info
	AddonManager.getAddonByID('hidecaptionplus-dp@dummy.addons.mozilla.org', function(addon) {
	  if(addon && addon.isActive) {
		document.getElementById('ctraddon_hctpinfotab').style.visibility = 'visible';
		document.getElementById('ctraddon_hctpinfoab').style.visibility = 'visible';
	  }
	});
	var HCTPListener = {
	   onEnabled: function(addon) {
		  if(addon.id == 'hidecaptionplus-dp@dummy.addons.mozilla.org') {
			document.getElementById('ctraddon_hctpinfotab').style.visibility = 'visible';
			document.getElementById('ctraddon_hctpinfoab').style.visibility = 'visible';
		  }
	   },
	   onDisabled: function(addon) {
		  if(addon.id == 'hidecaptionplus-dp@dummy.addons.mozilla.org') {
			document.getElementById('ctraddon_hctpinfotab').style.visibility = 'collapse';
			document.getElementById('ctraddon_hctpinfoab').style.visibility = 'collapse';
		  }
	   }
	};
	AddonManager.addAddonListener(HCTPListener);
	
	// 'Tabs on bottom' add-on extra info
	AddonManager.getAddonByID('tabsonbottom@piro.sakura.ne.jp', function(addon) {
	  if(addon && addon.isActive) {
		document.getElementById('ctraddon_tobinfotab').style.visibility = 'visible';
	  }
	});
	var TOB1Listener = {
	   onEnabled: function(addon) {
		  if(addon.id == 'tabsonbottom@piro.sakura.ne.jp') {
			document.getElementById('ctraddon_tobinfotab').style.visibility = 'visible';
		  }
	   },
	   onDisabled: function(addon) {
		  if(addon.id == 'tabsonbottom@piro.sakura.ne.jp') {
			document.getElementById('ctraddon_tobinfotab').style.visibility = 'collapse';
		  }
	   }
	};
	AddonManager.addAddonListener(TOB1Listener);
	
	// 'Tabs on bottom (Australis)' add-on extra info
	AddonManager.getAddonByID('jid1-OesGFwaQGIBASw@jetpack', function(addon) {
	  if(addon && addon.isActive) {
		document.getElementById('ctraddon_tobinfotab').style.visibility = 'visible';
	  }
	});
	var TOB2Listener = {
	   onEnabled: function(addon) {
		  if(addon.id == 'jid1-OesGFwaQGIBASw@jetpack') {
			document.getElementById('ctraddon_tobinfotab').style.visibility = 'visible';
		  }
	   },
	   onDisabled: function(addon) {
		  if(addon.id == 'jid1-OesGFwaQGIBASw@jetpack') {
			document.getElementById('ctraddon_tobinfotab').style.visibility = 'collapse';
		  }
	   }
	};
	AddonManager.addAddonListener(TOB2Listener);
	
	// 'Add-on comaptibiliy reporter' note
	AddonManager.getAddonByID('compatibility@addons.mozilla.org', function(addon) {
	  if(addon && addon.isActive) {
		document.getElementById('ctraddon_pw_acr_note').style.visibility = 'visible';
	  }
	});
	var ACRListener = {
	   onEnabled: function(addon) {
		  if(addon.id == 'compatibility@addons.mozilla.org') {
			document.getElementById('ctraddon_pw_acr_note').style.visibility = 'visible';
		  }
	   },
	   onDisabled: function(addon) {
		  if(addon.id == 'compatibility@addons.mozilla.org') {
			document.getElementById('ctraddon_pw_acr_note').style.visibility = 'collapse';
		  }
	   }
	};
	AddonManager.addAddonListener(ACRListener);

	// disable bookmark animation checkbox, if 'star button in urlbar' is used
	if (this.prefs.getBoolPref('starinurl')) document.getElementById('ctraddon_pw_bmanimation').disabled = true;
	
	// hide settings, if unsupported by Firefox version
	if (this.appversion < 46) {
	  document.getElementById('ctraddon_pw_pocket2').style.visibility = 'collapse';
	}

	if (this.appversion >= 46) {
	  document.getElementById('ctraddon_pw_pocket_descr').style.visibility = 'collapse';
	  document.getElementById('ctraddon_pw_pocket').style.visibility = 'collapse';
	}

	if (this.appversion < 47) {
	  document.getElementById('ctraddon_pw_hideeditbm').style.visibility = 'collapse';
	  document.getElementById('ctraddon_pw_dblclnewtabdes').style.visibility = 'collapse';
	}
	
	if (this.appversion >= 47) {
	  document.getElementById('ctraddon_pw_hidetbwote').style.visibility = 'collapse';
	}
	
	if (this.appversion < 48) {
	  document.getElementById('ctraddon_pw_altautocompl').style.visibility = 'collapse';
	  document.getElementById('ctraddon_pw_autocompl_it').style.visibility = 'collapse';
	  document.getElementById('ctraddon_pw_autocompl_rhl').style.visibility = 'collapse';
	  document.getElementById('ctraddon_pw_anewtaburlpcb').style.visibility = 'collapse';
	  document.getElementById('ctraddon_pw_anewtaburlpurlbox').style.visibility = 'collapse';
	  document.getElementById('ctraddon_pw_cresultshbox').style.visibility = 'collapse';
	  document.getElementById('ctraddon_pw_aboutpages').style.visibility = 'collapse';
	  document.getElementById('ctraddon_pw_ctrltabprev').style.visibility = 'collapse';
	  document.getElementById('ctraddon_pw_autocompl_not').style.visibility = 'collapse';
	}

	if (this.appversion >= 48) {
	  document.getElementById('ctraddon_pw_urlbar_uc').style.visibility = 'collapse';
	  document.getElementById('ctraddon_pw_urlbar_uc_desc').style.visibility = 'collapse';
	}
	
	if (this.appversion < 49) {
	  document.getElementById('ctraddon_pw_hiderecentbm').style.visibility = 'collapse';
	  document.getElementById('ctraddon_pw_hiderecentbmdes').style.visibility = 'collapse';
	}
	
	if (this.appversion >= 49) {
	  document.getElementById('ctraddon_pw_loopcallgb').style.visibility = 'collapse';
	}
	
	if (this.appversion < 50) {
	  document.getElementById('ctraddon_pw_containertabgb').style.visibility = 'collapse';
	  document.getElementById('ctraddon_pw_findbarhlgb').style.visibility = 'collapse';
	  document.getElementById('ctraddon_pw_flywebgb').style.visibility = 'collapse';
	  document.getElementById('ctraddon_pw_autocompl_it2').style.visibility = 'collapse';
	  document.getElementById('ctraddon_pw_oldplacesbut').style.visibility = 'collapse';
	}
	
	if (this.appversion >= 50) {
	  document.getElementById('ctraddon_pw_autocompl_it').style.visibility = 'collapse';
	}

	if (this.appversion < 51) {
	  document.getElementById('ctraddon_pw_oneoffsearch').style.visibility = 'collapse';
	  document.getElementById('ctraddon_pw_oneoffsearch_desc').style.visibility = 'collapse';
	  document.getElementById('ctraddon_pw_hideurlzoom').style.visibility = 'collapse';
	  document.getElementById('ctraddon_pw_dl_pm_drop').style.visibility = 'collapse';
	  document.getElementById('ctraddon_pw_dl_pm_dropdes').style.visibility = 'collapse';
	  document.getElementById('ctraddon_pw_toptb_oldpad').style.visibility = 'collapse';
	}
	
	if (!this.oswindows) {
	  document.getElementById('ctraddon_pw_oldfontgfxg').style.visibility = 'collapse';
	}
	
	if (this.appversion < 52) {
	  document.getElementById('ctraddon_pw_oldfontgfxg').style.visibility = 'collapse';
	  document.getElementById('ctraddon_pw_altdlprogbar').style.visibility = 'collapse';
	}
	
	if (this.appversion < 53) {
	  document.getElementById('ctraddon_pw_ttoverflow').style.visibility = 'collapse';
	}
	
	if (this.appversion < 54) {
	  document.getElementById('ctraddon_pw_nbcompact2').style.visibility = 'collapse';
	}
	
	if (this.appversion >= 54) {
	  document.getElementById('ctraddon_pw_nbcompact').style.visibility = 'collapse';
	}
	
	
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
		var that = this;
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
			
		  case "tttitlebar":
		    if(branch.getBoolPref("tttitlebar"))
			  document.getElementById('ctraddon_pw_tttitlebar_c').disabled = false;
			else
			  document.getElementById('ctraddon_pw_tttitlebar_c').disabled = true;
		  break;

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
		  
		  case "altautocompl":
		    if(branch.getBoolPref("altautocompl")) {
			  document.getElementById('ctraddon_pw_cresultshcb').disabled = false;
			  document.getElementById('ctraddon_pw_cresultsh').disabled = false;
			} else {
			  document.getElementById('ctraddon_pw_cresultshcb').disabled = true;
			  document.getElementById('ctraddon_pw_cresultsh').disabled = true;
			}
		  break;
		  
		  case "ctroldsearchc":
		    if(branch.getBoolPref("ctroldsearchc"))
			  document.getElementById('ctraddon_pw_ctroldsearchcdelay').disabled = false;
			else
			  document.getElementById('ctraddon_pw_ctroldsearchcdelay').disabled = true;
		  break;
		  
		  case "ctroldsearchr":
		    if(branch.getBoolPref("ctroldsearchr"))
			  document.getElementById('ctraddon_pw_ctroldsearchrdelay').disabled = false;
			else
			  document.getElementById('ctraddon_pw_ctroldsearchrdelay').disabled = true;
		  break;
		  
		  case "osearch_cwidth":
		    if(branch.getBoolPref("osearch_cwidth")) {
			  document.getElementById('ctraddon_os_spsize_minw').disabled = false;
			  document.getElementById('ctraddon_os_spsize_maxw').disabled = false;
			} else {
			  document.getElementById('ctraddon_os_spsize_minw').disabled = true;
			  document.getElementById('ctraddon_os_spsize_maxw').disabled = true;
			}
		  break;
		  
		  case "appbuttonc":
			if(branch.getCharPref("appbuttonc")=="appbuttonc_custom") {
			  document.getElementById('ctraddon_cappbutcbox_n').style.visibility = 'visible';
			  document.getElementById('ctraddon_cappbutcbox_p').style.visibility = 'visible';
			  document.getElementById('ctraddon_cappbutcbox_desc').style.visibility = 'visible';
			
			  if(branch.getCharPref("appbutton")=="appbutton_v1" || branch.getCharPref("appbutton")=="appbutton_v1wt")
				document.getElementById('ctraddon_pw_appbuttonct').disabled = false;
			  else document.getElementById('ctraddon_pw_appbuttonct').disabled = true;
			} else {
			  document.getElementById('ctraddon_cappbutcbox_n').style.visibility = 'collapse';
			  document.getElementById('ctraddon_cappbutcbox_p').style.visibility = 'collapse';
			  document.getElementById('ctraddon_cappbutcbox_desc').style.visibility = 'collapse';
			}
		  break;

		}
	  }
	);
	
	ctrSettingsListenerW_forCTR.register(true);
	
	
	var ctrSettingsListenerW_forWTitlebar = new PrefListener(
	  "browser.tabs.",
	  function(branch, name) {
		switch (name) {

		  case "drawInTitlebar":
		  
		    if (classicthemerestorerjso.ctr.appversion >= 47 && branch.getBoolPref("drawInTitlebar")==false
			  && (classicthemerestorerjso.ctr.fxdefaulttheme
			      || Services.prefs.getBranch("lightweightThemes.").getCharPref('selectedThemeID')=='firefox-devedition@mozilla.org'
				  || Services.prefs.getBranch("lightweightThemes.").getCharPref('selectedThemeID')=='firefox-compact-dark@mozilla.org'
				  || Services.prefs.getBranch("lightweightThemes.").getCharPref('selectedThemeID')=='firefox-compact-light@mozilla.org'
				 )
			   ) {
			  document.getElementById('ctraddon_pw_dblclnewtab').disabled = true;
			  document.getElementById('ctraddon_pw_dblclnewtabdes').style.visibility = 'collapse';
			} else {
			  document.getElementById('ctraddon_pw_dblclnewtab').disabled = false;
			}
		  break;
		}
	  }
	);
	
	// double click option is only available for Windows
	if (this.oswindows)
	  ctrSettingsListenerW_forWTitlebar.register(true);
	
	// update sub settings
	this.ctrpwAppbuttonextra(this.prefs.getCharPref("appbutton"),false);
	this.ctrpwCtrOldSearch(this.prefs.getBoolPref("ctroldsearch"));
	this.ctrpwFaviconextra(this.prefs.getBoolPref("faviconurl"));
	this.ctrpwBFextra(this.prefs.getBoolPref("backforward"));
	this.ctrpwSNextra(!this.prefs.getBoolPref('smallnavbut'));
	this.ctrpwHidetbwotExtra(this.prefs.getBoolPref("hidetbwot"));
	this.altTabsToolbarBgExtra(this.prefs.getBoolPref("alttabstb"));
	this.ctrpwModeextra(this.prefs.getCharPref("nav_txt_ico"));
	this.currentAboutPrefs(this.prefs.getCharPref("altoptions"));
	this.ctrpwTranspTbW10(this.prefs.getBoolPref("transpttbw10"));
	this.ctrpwNavBarPadding(this.prefs.getBoolPref("navbarpad"));
	this.ctrpwLocationbarSize(this.prefs.getBoolPref("lb_width"));
	this.ctrpwSearchbarSize(this.prefs.getBoolPref("sb_width"));
	this.ctrpwLocationbarRadius(this.prefs.getBoolPref("lb_roundness"));
	this.ctrpwSearchbarRadius(this.prefs.getBoolPref("sb_roundness"));
	if (this.fxdefaulttheme) this.ctrpwCompactAddonList(this.prefs.getBoolPref("am_compact"));
	this.ctrpwUnsortBM(this.prefs.getBoolPref("bmbunsortbm"));
	this.ctrpwHideUrlStopRel(this.prefs.getBoolPref("hideurelstop"));
	this.ctrpwExtraUrlbar(this.prefs.getBoolPref("extraurlkeycb"));
	this.ctrpwAeroColors(this.prefs.getBoolPref("aerocolors"));
	this.ctrpwOldTopLevelImg(this.prefs.getBoolPref("oldtoplevimg"));
	this.ctrpwAutoCompleteHeight(this.prefs.getBoolPref("urlresults"));
	
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
	
	this.hideThemeInfoForTabs();

  },
  
  /* If an option, which requires a restart, was altered, a prompt to restart Fx will appear
     when preference window gets closed */
  unloadprefwindow: function() {

	var cancelQuit   = Cc["@mozilla.org/supports-PRBool;1"].createInstance(Ci.nsISupportsPRBool);
	var observerSvc  = Cc["@mozilla.org/observer-service;1"].getService(Ci.nsIObserverService);
	var stringBundle = Services.strings.createBundle("chrome://classic_theme_restorer/locale/messages.file");
						
	var brandName	 = '';

	try {
	  brandName = Services.strings.createBundle("chrome://branding/locale/brand.properties").GetStringFromName("brandShortName");
	} catch(e) {}

	if (this.needsRestart &&
		Services.prompt.confirm(null,
			stringBundle.GetStringFromName("popup.title"),
			stringBundle.formatStringFromName("popup.msg.restart", [brandName], 1)
		)) {
		observerSvc.notifyObservers(cancelQuit, "quit-application-requested", "restart");
		if(cancelQuit.data) { // The quit request has been cancelled.
			return false;
		};
		Services.startup.quit(Services.startup.eRestart | Services.startup.eAttemptQuit);
	}
	
	// save last selected categories/tabs
	this.prefs.setIntPref('pw_actidx_c',document.getElementById("CtrRadioGroup").selectedIndex);
	this.prefs.setIntPref('pw_actidx_t',document.getElementById("ctraddon_pw_tabs_tabs").selectedIndex);
	this.prefs.setIntPref('pw_actidx_tc',document.getElementById("ctraddon_tabcolor_tabs").selectedIndex);
	this.prefs.setIntPref('pw_actidx_g',document.getElementById("ctraddon_pw_generalui_tabs").selectedIndex);
	this.prefs.setIntPref('pw_actidx_tb',document.getElementById("ctraddon_pw_toolbars_tabs").selectedIndex);
	this.prefs.setIntPref('pw_actidx_lb',document.getElementById("ctraddon_pw_locationbar_tabs").selectedIndex);
	this.prefs.setIntPref('pw_actidx_sb',document.getElementById("ctraddon_pw_searchbar_tabs").selectedIndex);

	return true;
  },
  
  needsBrowserRestart: function(){
	this.needsRestart = true;
	document.getElementById('ctraddon_pw_radiorestart').style.visibility = 'visible';
  },
  
  resetPrefsForDevTheme: function(){
	
	// reset Tab appearance, but keep last knows preference
	setTimeout(function(){
	  Services.prefs.getBranch("extensions.classicthemerestorer.").setCharPref('tabs','tabs_default');
	},50);
	setTimeout(function(){
	  Services.prefs.getBranch("extensions.classicthemerestorer.").setCharPref('tabs','tabs_squared');
	},100);
	
	// disable Aero (blue) toolbars preference
	if(this.prefs.getBoolPref('aerocolors'))
	  this.prefs.setBoolPref('aerocolors',false);
 
	this.hideThemeInfoForTabs();

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
		Services.prefs.getBranch("extensions.classicthemerestorer.").setBoolPref('closeonleft',true);
	  },20);
	}

  },
 
  hideThemeInfoForTabs: function(){
	setTimeout(function(){

	  try {
		if(Services.prefs.getBranch("lightweightThemes.").getCharPref('selectedThemeID')=='firefox-devedition@mozilla.org'
			|| Services.prefs.getBranch("lightweightThemes.").getCharPref('selectedThemeID')=='firefox-compact-dark@mozilla.org'
			|| Services.prefs.getBranch("lightweightThemes.").getCharPref('selectedThemeID')=='firefox-compact-light@mozilla.org'
		  )
		{
		  document.getElementById('ctraddon_pw_tabforminfo').style.visibility = 'visible';
		  document.getElementById('ctraddon_pw_tabmenulist').disabled = true;
		} else if(classicthemerestorerjso.ctr.fxdefaulttheme) {
		  document.getElementById('ctraddon_pw_tabforminfo').style.visibility = 'collapse';
		  document.getElementById('ctraddon_pw_tabmenulist').disabled = false;
		}
	  } catch(e) {}

	},100);
  },

  ctrpwFaviconextra: function(which) {
	if(which==true) which=false; else which=true;
	document.getElementById('ctraddon_padlock_extra').disabled = which;
	document.getElementById('ctraddon_pw_ibinfoico2').disabled = !which;
  },
  
  ctrpwBFextra: function(which) {
	var itemvis = 'collapse';
	
    if(which==true) {
	  which=false; itemvis = 'visible';
	} else {
	  which=true; itemvis = 'collapse';
	}
	
    document.getElementById('ctraddon_pw_hide_bf_popup').disabled = which;
	document.getElementById('ctraddon_pw_bf_space').disabled = which;
	document.getElementById('ctraddon_pw_hide_bf_popup').style.visibility = itemvis;
	document.getElementById('ctraddon_pw_bf_space').style.visibility = itemvis;
	if(Services.prefs.getBranch("extensions.classicthemerestorer.").getBoolPref('smallnavbut')==false){
	  if (this.appversion < 54) document.getElementById('ctraddon_pw_nbcompact').disabled = which;
	  if (this.appversion < 54) document.getElementById('ctraddon_pw_nbcompact').style.visibility = itemvis;
	  if (this.appversion >= 54) document.getElementById('ctraddon_pw_nbcompact2').disabled = which;
	  if (this.appversion >= 54) document.getElementById('ctraddon_pw_nbcompact2').style.visibility = itemvis;
	}
  },
  
   ctrpwSNextra: function(which) {
    if(Services.prefs.getBranch("extensions.classicthemerestorer.").getBoolPref('backforward')){
	  var itemvis = 'collapse';
	
      if(which==true) {
		which=false; itemvis = 'visible';
	  } else {
		which=true; itemvis = 'collapse';
	  }
	  if (this.appversion < 54) document.getElementById('ctraddon_pw_nbcompact').disabled = which;
	  if (this.appversion < 54) document.getElementById('ctraddon_pw_nbcompact').style.visibility = itemvis;
	  if (this.appversion >= 54) document.getElementById('ctraddon_pw_nbcompact2').disabled = which;
	  if (this.appversion >= 54) document.getElementById('ctraddon_pw_nbcompact2').style.visibility = itemvis;
	}
  },
  
  ctrpwHidetbwotExtra: function(which) {
	var itemvis = 'collapse';
	
    if(which==true) {
	  which=false; itemvis = 'visible';
	} else {
	  which=true; itemvis = 'collapse';
	}
	
    if (this.appversion < 47) {
	  document.getElementById('ctraddon_pw_hidetbwote').disabled = which;
	  document.getElementById('ctraddon_pw_hidetbwote').style.visibility = itemvis;
	}
	
	document.getElementById('ctraddon_pw_hidetbwote2').disabled = which;
	document.getElementById('ctraddon_pw_hidetbwote_winc').style.visibility = itemvis;
	document.getElementById('ctraddon_pw_hidetbwote2').style.visibility = itemvis;
  },
  
  ctrpwTranspTbW10: function(which) {
	var itemvis = 'collapse';
	
    if(which) itemvis = 'visible';
	
	document.getElementById('ctraddon_pw_transptcw10').style.visibility = itemvis;
	document.getElementById('ctraddon_pw_transpttbew10').style.visibility = itemvis;

  },
  
  ctrpwNavBarPadding: function(which) {
	var itemvis = 'collapse';
	
    if(which) itemvis = 'visible';
	
	document.getElementById('ctraddon_pw_navbarpad_lr').style.visibility = itemvis;
	document.getElementById('ctraddon_pw_navbarmar_lr').style.visibility = itemvis;
  },
  
  ctrpwLocationbarSize: function(which) {
	
    if(which==true) which=false;
	else which=true;
	
    document.getElementById('ctraddon_pw_lb_width').disabled = which;
	document.getElementById('ctraddon_lbsize_minw').disabled = which;
	document.getElementById('ctraddon_lbsize_maxw').disabled = which;
  },
  
  ctrpwSearchbarSize: function(which) {
	
    if(which==true) which=false;
	else which=true;
	
    document.getElementById('ctraddon_pw_sb_width').disabled = which;
	document.getElementById('ctraddon_sbsize_minw').disabled = which;
	document.getElementById('ctraddon_sbsize_maxw').disabled = which;
  },
  
  ctrpwLocationbarRadius: function(which) {
	
    if(which==true) which=false;
	else which=true;
	
    document.getElementById('ctraddon_pw_lbsbradius_lb').disabled = which;
	document.getElementById('ctraddon_lbradius_left').disabled = which;
	document.getElementById('ctraddon_lbradius_right').disabled = which;
  },
  
  ctrpwSearchbarRadius: function(which) {
	
    if(which==true) which=false;
	else which=true;
	
    document.getElementById('ctraddon_pw_lbsbradius_sb').disabled = which;
	document.getElementById('ctraddon_sbradius_left').disabled = which;
	document.getElementById('ctraddon_sbradius_right').disabled = which;
  },
  
  ctrpwCompactAddonList: function(which) {
	var itemvis = 'collapse';
	
    if(which) itemvis = 'visible';

	document.getElementById('ctraddon_pw_am_compact2').style.visibility = itemvis;
  },
  
  ctrpwUnsortBM: function(which) {
	var itemvis = 'collapse';
	
    if(which) itemvis = 'visible';
	
	document.getElementById('ctraddon_pw_bmbunsortbm2').style.visibility = itemvis;
  },
  
  ctrpwHideUrlStopRel: function(which) {
	var itemvis = 'collapse';
	
    if(which) itemvis = 'visible';
	
	document.getElementById('ctraddon_pw_hideurelstop2').style.visibility = itemvis;
  },
  
  ctrpwExtraUrlbar: function(which) {

    if(which==true) which=false;
	else which=true;
	
    document.getElementById('ctraddon_extraurltarget_list').disabled = which;
  },

  ctrpwAeroColors: function(which) {
	var itemvis = 'collapse';
	
    if(which) itemvis = 'visible';
	
	document.getElementById('ctraddon_pw_aerocolorsg').style.visibility = itemvis;
  },
  
  ctrpwOldTopLevelImg:function(which) {
	var itemvis = 'collapse';
	
    if(which) itemvis = 'visible';
	
	document.getElementById('ctraddon_pw_oldtoplevimg2').style.visibility = itemvis;
  },
  
  ctrpwAutoCompleteHeight: function(which) {
	
    if(which==true) which=false;
	else which=true;
	
    document.getElementById('ctraddon_pw_autocompl_it').disabled = which;

  },
  
  ctrpwCtrOldSearch: function(which) {
	
    if(which==true) which=false;
	else which=true;
	
    document.getElementById('ctraddon_pw_ctroldsearchc').disabled = which;
	document.getElementById('ctraddon_pw_ctroldsearchr').disabled = which;
    document.getElementById('ctraddon_pw_osearch_dm').disabled = which;
    document.getElementById('ctraddon_pw_osearch_iwidth').disabled = which;
    document.getElementById('ctraddon_pw_osearch_meoit').disabled = which;
	document.getElementById('ctraddon_pw_osearch_meoit2').disabled = which;
	document.getElementById('ctraddon_pw_osearch_cwidth').disabled = which;
	document.getElementById('ctraddon_pw_search_ant').disabled = which;
	document.getElementById('ctraddon_pw_search_abl').disabled = which;
	document.getElementById('ctraddon_pw_search_aho').disabled = which;
	
	if(this.prefs.getBoolPref("osearch_cwidth") && which == false) {
	  document.getElementById('ctraddon_os_spsize_minw').disabled = false;
	  document.getElementById('ctraddon_os_spsize_maxw').disabled = false;
	} else {
	  document.getElementById('ctraddon_os_spsize_minw').disabled = true;
	  document.getElementById('ctraddon_os_spsize_maxw').disabled = true;
	}
	if(this.prefs.getBoolPref("ctroldsearchc") && which == false) {
	  document.getElementById('ctraddon_pw_ctroldsearchcdelay').disabled = false;
	} else {
	  document.getElementById('ctraddon_pw_ctroldsearchcdelay').disabled = true;
	}
	if(this.prefs.getBoolPref("ctroldsearchr") && which == false) {
	  document.getElementById('ctraddon_pw_ctroldsearchrdelay').disabled = false;
	} else {
	  document.getElementById('ctraddon_pw_ctroldsearchrdelay').disabled = true;
	}
	
  },
 
  altTabsToolbarBgExtra: function(which) {
	if (this.fxdefaulttheme) {
	
	  var itemvis = 'collapse';
      
	  if(which) itemvis = 'visible';

	  document.getElementById('ctraddon_pw_alttabstb2').style.visibility = itemvis;
	}
  },
  
  ctrpwTabcloseextra: function(which) {
	document.getElementById('ctraddon_pw_closetabhfl').disabled = which;
	document.getElementById('ctraddon_pw_closeonleft').disabled = which;
  },
  
  ctrpwTabcloseextra2: function(which) {
	document.getElementById('ctraddon_pw_closeicon').disabled = which;
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

  var tabsintitlebar = Services.prefs.getBranch("browser.tabs.").getBoolPref("drawInTitlebar");

	if (which=="appbutton_v1" && this.fxdefaulttheme){
	  document.getElementById('ctraddon_altabico_list').disabled = false;
	  document.getElementById('ctraddon_abhigher').disabled = false;
	  document.getElementById('ctraddon_appbutbdl').disabled = false;
	  document.getElementById('ctraddon_appbutcolor_list').disabled = false;
	  document.getElementById('ctraddon_dblclclosefx').disabled = true;
	  document.getElementById('ctraddon_pw_appbutonclab').disabled = true;
	  document.getElementById('ctraddon_pw_appbuttontxt').disabled = true;
	  document.getElementById('ctraddon_appbclmmenus').disabled = false;
	  document.getElementById('ctraddon_pw_appbautocol').disabled = false;
	  if(this.prefs.getCharPref("appbuttonc")=="appbuttonc_custom") document.getElementById('ctraddon_pw_appbuttonct').disabled = false;
	    else document.getElementById('ctraddon_pw_appbuttonct').disabled = true;
	} else if (which=="appbutton_v1wt" && this.fxdefaulttheme){
	  document.getElementById('ctraddon_altabico_list').disabled = true;
	  document.getElementById('ctraddon_abhigher').disabled = false;
	  document.getElementById('ctraddon_appbutbdl').disabled = false;
	  document.getElementById('ctraddon_appbutcolor_list').disabled = false;
	  document.getElementById('ctraddon_dblclclosefx').disabled = true;
	  document.getElementById('ctraddon_pw_appbutonclab').disabled = true;
	  document.getElementById('ctraddon_pw_appbuttontxt').disabled = false;
	  document.getElementById('ctraddon_appbclmmenus').disabled = false;
	  document.getElementById('ctraddon_pw_appbautocol').disabled = false;
	  if(this.prefs.getCharPref("appbuttonc")=="appbuttonc_custom") document.getElementById('ctraddon_pw_appbuttonct').disabled = false;
	    else document.getElementById('ctraddon_pw_appbuttonct').disabled = true;
	} else if (which=="appbutton_v1" && !this.fxdefaulttheme){
	  document.getElementById('ctraddon_altabico_list').disabled = false;
	  document.getElementById('ctraddon_abhigher').disabled = true;
	  document.getElementById('ctraddon_appbutbdl').disabled = false;
	  document.getElementById('ctraddon_appbutcolor_list').disabled = false;
	  document.getElementById('ctraddon_dblclclosefx').disabled = true;
	  document.getElementById('ctraddon_pw_appbutonclab').disabled = true;
	  document.getElementById('ctraddon_pw_appbuttontxt').disabled = true;
	  document.getElementById('ctraddon_appbclmmenus').disabled = false;
	  document.getElementById('ctraddon_pw_appbautocol').disabled = false;
	  if(this.prefs.getCharPref("appbuttonc")=="appbuttonc_custom") document.getElementById('ctraddon_pw_appbuttonct').disabled = false;
	    else document.getElementById('ctraddon_pw_appbuttonct').disabled = true;
	} else if (which=="appbutton_v1wt" && !this.fxdefaulttheme){
	  document.getElementById('ctraddon_altabico_list').disabled = false;
	  document.getElementById('ctraddon_abhigher').disabled = true;
	  document.getElementById('ctraddon_appbutbdl').disabled = false;
	  document.getElementById('ctraddon_appbutcolor_list').disabled = false;
	  document.getElementById('ctraddon_dblclclosefx').disabled = true;
	  document.getElementById('ctraddon_pw_appbutonclab').disabled = true;
	  document.getElementById('ctraddon_pw_appbuttontxt').disabled = false;
	  document.getElementById('ctraddon_appbclmmenus').disabled = false;
	  document.getElementById('ctraddon_pw_appbautocol').disabled = false;
	  if(this.prefs.getCharPref("appbuttonc")=="appbuttonc_custom") document.getElementById('ctraddon_pw_appbuttonct').disabled = false;
	    else document.getElementById('ctraddon_pw_appbuttonct').disabled = true;
	} else if (which=="appbutton_off" || which=="appbutton_v2h"){
	  document.getElementById('ctraddon_altabico_list').disabled = true;
	  document.getElementById('ctraddon_abhigher').disabled = true;
	  document.getElementById('ctraddon_appbutbdl').disabled = true;
	  document.getElementById('ctraddon_appbutcolor_list').disabled = true;
	  document.getElementById('ctraddon_dblclclosefx').disabled = true;
	  document.getElementById('ctraddon_pw_appbutonclab').disabled = true;
	  document.getElementById('ctraddon_pw_appbuttontxt').disabled = true;
	  document.getElementById('ctraddon_appbclmmenus').disabled = true;
	  document.getElementById('ctraddon_pw_appbautocol').disabled = true;
	  document.getElementById('ctraddon_pw_appbuttonct').disabled = true;
	} else if (which=="appbutton_pm"){
	  document.getElementById('ctraddon_altabico_list').disabled = true;
	  document.getElementById('ctraddon_abhigher').disabled = true;
	  document.getElementById('ctraddon_appbutbdl').disabled = true;
	  document.getElementById('ctraddon_appbutcolor_list').disabled = false;
	  document.getElementById('ctraddon_dblclclosefx').disabled = true;
	  document.getElementById('ctraddon_pw_appbutonclab').disabled = true;
	  document.getElementById('ctraddon_pw_appbuttontxt').disabled = true;
	  document.getElementById('ctraddon_appbclmmenus').disabled = true;
	  document.getElementById('ctraddon_pw_appbautocol').disabled = true;
	  document.getElementById('ctraddon_pw_appbuttonct').disabled = true;
	} else if (which=="appbutton_pm2"){
	  document.getElementById('ctraddon_altabico_list').disabled = true;
	  document.getElementById('ctraddon_abhigher').disabled = true;
	  document.getElementById('ctraddon_appbutbdl').disabled = true;
	  document.getElementById('ctraddon_appbutcolor_list').disabled = false;
	  document.getElementById('ctraddon_dblclclosefx').disabled = true;
	  document.getElementById('ctraddon_pw_appbutonclab').disabled = true;
	  document.getElementById('ctraddon_pw_appbuttontxt').disabled = true;
	  document.getElementById('ctraddon_appbclmmenus').disabled = true;
	  document.getElementById('ctraddon_pw_appbautocol').disabled = true;
	  document.getElementById('ctraddon_pw_appbuttonct').disabled = true;
	} else if (which=="appbutton_v2io" || which=="appbutton_v2io2") {
	  document.getElementById('ctraddon_altabico_list').disabled = true;
	  document.getElementById('ctraddon_abhigher').disabled = true;
	  document.getElementById('ctraddon_appbutbdl').disabled = false;
	  document.getElementById('ctraddon_appbutcolor_list').disabled = false;
	  document.getElementById('ctraddon_dblclclosefx').disabled = false;
	  document.getElementById('ctraddon_pw_appbutonclab').disabled = true;
	  document.getElementById('ctraddon_pw_appbuttontxt').disabled = true;
	  document.getElementById('ctraddon_appbclmmenus').disabled = false;
	  document.getElementById('ctraddon_pw_appbautocol').disabled = false;
	  document.getElementById('ctraddon_pw_appbuttonct').disabled = true;

	  if (tabsintitlebar==false && fromprefwindow==true) {
		Services.prefs.getBranch("browser.tabs.").setBoolPref("drawInTitlebar", true);
	  }

	} else {
	  document.getElementById('ctraddon_altabico_list').disabled = true;
	  document.getElementById('ctraddon_abhigher').disabled = true;
	  document.getElementById('ctraddon_appbutbdl').disabled = false;
	  document.getElementById('ctraddon_appbutcolor_list').disabled = false;
	  document.getElementById('ctraddon_dblclclosefx').disabled = false;
	  document.getElementById('ctraddon_pw_appbutonclab').disabled = false;
	  document.getElementById('ctraddon_pw_appbuttontxt').disabled = false;
	  document.getElementById('ctraddon_appbclmmenus').disabled = false;
	  document.getElementById('ctraddon_pw_appbautocol').disabled = false;
	  document.getElementById('ctraddon_pw_appbuttonct').disabled = true;

	  if (tabsintitlebar==false && fromprefwindow==true) {
		Services.prefs.getBranch("browser.tabs.").setBoolPref("drawInTitlebar", true);
	  }

	}
  },

  currentAboutPrefs: function(which) {
	
	if(which=="options_win" || which=="options_win_alt") {
	  document.getElementById('ctraddon_pw_aboutprefswsizew').disabled = false;
	  document.getElementById('ctraddon_pw_aboutprefswsizeh').disabled = false;
	} else {
	  document.getElementById('ctraddon_pw_aboutprefswsizew').disabled = true;
	  document.getElementById('ctraddon_pw_aboutprefswsizeh').disabled = true;
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
		
		if (Services.prefs.getBranch("extensions.classicthemerestorer.").getBoolPref('starinurl'))
		  document.getElementById('ctraddon_pw_bmanimation').disabled = true;
		else document.getElementById('ctraddon_pw_bmanimation').disabled = false;
	},1350);
  },
  
  resetCTRpreferences: function() {
    var preferences = document.getElementsByTagName("preference");
    for (var preference of preferences) {
      if(preference.name.indexOf("extensions.classicthemerestorer.")!=-1)
		preference.value = preference.defaultValue == null ? undefined : preference.defaultValue;
    }
	
	this.initprefwindow();
	
	this.ctrpwStarFeedDelay();
	
	var tabsintitlebar = Services.prefs.getBranch("browser.tabs.").getBoolPref("drawInTitlebar");
	if (this.oswindows && tabsintitlebar) {
	  this.prefs.setCharPref("appbutton",'appbutton_v2');
	}
	
	this.needsBrowserRestart();
  },

  // 'classic' preset
  classicCTRpreferences: function() {
	this.resetCTRpreferences();
	
	if(classicthemerestorerjso.ctr.tmp_tu_active==false) Services.prefs.getBranch("extensions.classicthemerestorer.").setIntPref("ctabwidth",250);
	this.prefs.setBoolPref("panelmenucol",true);
	this.prefs.setBoolPref("verifiedcolors",true);
	this.prefs.setCharPref("findbar",'findbar_bottoma');
	this.prefs.setBoolPref("hideprivmask",true);
	this.prefs.setBoolPref("cpanelmenus",true);
	this.prefs.setCharPref("emptyfavico_t",'emptyfavico_t_dot');
	this.prefs.setBoolPref("hidezoomres",true);
	this.prefs.setBoolPref("faviconurl",true);
	this.prefs.setBoolPref("bmanimation",true);
	this.prefs.setBoolPref("pananimation",true);
	this.prefs.setBoolPref("noconicons",true);
	this.prefs.setBoolPref("alt_newtabp",true);
	this.prefs.setBoolPref("skipprintpr",true);
	this.prefs.setBoolPref("tbconmenu",true);
	this.prefs.setBoolPref("activndicat",true);
	this.prefs.setBoolPref("tbconmenu",true);

	this.prefs.setCharPref("altoptions",'options_win_alt');

	this.prefs.setBoolPref("alt_addonsm",true);
	this.prefs.setBoolPref("addonversion",true);

	this.prefs.setBoolPref("hideurlsrg",true);

	this.prefs.setBoolPref("oldsearch",true);

	if(this.appversion >= 48) {
	  this.prefs.setBoolPref("altautocompl",true);
	  this.prefs.setBoolPref("aboutpages",true);
	}
	
	if(this.appversion >= 50)
	  this.prefs.setBoolPref("oldplacesbut",true);
  
	setTimeout(function(){
		Services.prefs.getBranch("extensions.classicthemerestorer.").setBoolPref("starinurl",true);
		Services.prefs.getBranch("extensions.classicthemerestorer.").setBoolPref("feedinurl",true);
	},1350);
	
	if (this.oswindows && classicthemerestorerjso.ctr.tmp_tu_active==false)
		Services.prefs.getBranch("extensions.classicthemerestorer.").setBoolPref("dblclnewtab",true);
	
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
	this.prefs.setBoolPref("addonversion",false);
	this.prefs.setCharPref("altoptions",'options_default');
	this.prefs.setBoolPref("alt_addonsm",false);
	this.prefs.setBoolPref("am_highlight",false);
	this.prefs.setCharPref("ttoverflow",'default');
	
	this.needsBrowserRestart();

  },
  
  enableSyncCTRprefs: function() {
	
	var preflist = Services.prefs.getChildList("extensions.classicthemerestorer.");
	
	try {
	  for (var i=0; i < preflist.length; i++) {
		var index = preflist.indexOf(this.blacklist[i]);

		if (index > -1) {
		  preflist.splice(index, 1);
		}
		Services.prefs.getBranch("services.sync.prefs.sync.").setBoolPref(preflist[i],'true');
	  }
	} catch(e) {}
  },
  
  disableSyncCTRprefs: function() {
	try {
	  Services.prefs.getBranch("services.sync.prefs.sync.extensions.classicthemerestorer.").deleteBranch("");
	} catch(e) {}
  },
  
  openNewTabLinkFromPW: function(url) {
	var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"]
					   .getService(Components.interfaces.nsIWindowMediator);
	var mainWindow = wm.getMostRecentWindow("navigator:browser");
	mainWindow.gBrowser.selectedTab = mainWindow.gBrowser.addTab(url);
  },

	// Need to check if json is valid. If json not valid. don't continue and show error.
	IsJsonValid: function(aData) {
        try {
            JSON.parse(aData);
        } catch (e) {
            return false;
        }
        return true;
    },

	/* Export CTR preferences Text|Json */
    ExportPreferences: function(aPattern) {
			
			if (!aPattern == "txt" || !aPattern == "json") return false;
		
        var preferenceList = Services.prefs.getChildList("extensions.classicthemerestorer.");
        var preferenceArray = null;

        if (aPattern == "txt") {
            preferenceArray = [];
            // Add filter header.
            preferenceArray.push("CTR_Preferences__DO_NOT_EDIT__'='->booleans__':'->strings__'~'->integers");
        }

        if (aPattern == "json") {
            preferenceArray = {
                preference: [],
                value: []
            };
        }
        // Filter preference type and return its value.
        function _prefValue(pref) {
            switch (Services.prefs.getPrefType(pref)) {
                case 32:return Services.prefs.getCharPref(pref);break;
                case 64:return Services.prefs.getIntPref(pref);break;
                case 128:return Services.prefs.getBoolPref(pref);break;
            }
        }

        // Filter preference type and return its filter value.	
        function _prefType(pref) {
            switch (Services.prefs.getPrefType(pref)) {
                case 32:return ":";break;
                case 64:return "~";break;
                case 128:return "=";break;
            }
        }



        for (var i = 0; i < preferenceList.length; i++) {
            try {
                // Run Blacklist filter. Exclude all preferences we don't want to export/import.
                var index = preferenceList.indexOf(this.blacklist[i]);

                if (index > -1) {
                    preferenceList.splice(index, 1);
                }

                if (aPattern == "txt") {
                    // Filter extensions.classicthemerestorer.*
                    var sliceNdice = preferenceList[i].replace("extensions.classicthemerestorer.", "");

                    // Populate array	
                    preferenceArray.push(
                        sliceNdice + _prefType(preferenceList[i]) + _prefValue(preferenceList[i])
                    );
                }

                if (aPattern == "json") {
					// Populate array
                    preferenceArray.preference.push({
                        "preference": preferenceList[i].replace("extensions.classicthemerestorer.", ""),
                        "value": _prefValue(preferenceList[i])
                    });
                }

            } catch (e) {
                // Report errors to console
                Cu.reportError(e);
            }
        }
        // Use new less bulky export for text.
        classicthemerestorerjso.ctr.saveToFile(preferenceArray, aPattern);
        // Clear preferenceArray after export.
        preferenceArray = [];
        return true;
    },
	
	/* Import CTR preferences Text|Json */
	ImportPreferences: function(aPattern) {
		
		if (!aPattern == "txt" || !aPattern == "json") return false;
		
		var stringBundle = Services.strings.createBundle("chrome://classic_theme_restorer/locale/messages.file");
		var pattern = null;
		
		if (aPattern == "txt") {
			pattern = classicthemerestorerjso.ctr.loadFromFile("txt");
		}
		
		if (aPattern == "json") {
			pattern = classicthemerestorerjso.ctr.loadFromFile("json");
		}		
		
		if (!pattern) return false;
		   
		if(pattern[0]!="CTR_Preferences__DO_NOT_EDIT__'='->booleans__':'->strings__'~'->integers" && aPattern == "txt") {
		  alert(stringBundle.GetStringFromName("import.error"));
		  return false;
		}

		function _setPrefValue(pref, val){

		  switch (Services.prefs.getPrefType(pref)){
			case 32:	return Services.prefs.setCharPref(pref, val);	break;
			case 64:	return Services.prefs.setIntPref(pref, val);	break;
			case 128:	return Services.prefs.setBoolPref(pref, val);	break;	
		  }


		}
		
		if (aPattern == "txt") {
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
		}
		
		if (aPattern == "json") {
			for (var i=0; i<pattern.length; i++) {					  
			  try {

				if(pattern[i].preference.match(/extensions.classicthemerestorer./g)){
					// To import previously generated preference export.
					_setPrefValue(pattern[i].preference, pattern[i].value);
				} else{
					_setPrefValue('extensions.classicthemerestorer.' + pattern[i].preference, pattern[i].value);
				}

			  } catch(e) {
				// Report errors to console
				Cu.reportError(e);
			  }
			}
		}
		
		this.needsBrowserRestart();		
		return true;
	},
	
	saveToFile: function(aPattern, aType) {
		try{
			
			if (!aType === "txt" || !aType === "json" || aPattern.length === 0) return false;

			const nsIFilePicker = Ci.nsIFilePicker;
			var fp = Cc["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
			var stream = Cc["@mozilla.org/network/file-output-stream;1"].createInstance(Ci.nsIFileOutputStream);

			fp.init(window, null, nsIFilePicker.modeSave);
			fp.defaultExtension = aType;
			fp.defaultString = "CTRpreferences." + aType;

			if (aType === "txt") {
			  fp.appendFilters(nsIFilePicker.filterText);
			} else if (aType === "json") {
			  fp.appendFilters(nsIFilePicker.filterAll);
			}

			if (fp.show() != nsIFilePicker.returnCancel) {
			  var file = fp.file;
			  if (aType === "txt") {
				if (!/\.txt$/.test(file.leafName.toLowerCase()))
				  file.leafName += ".txt";
			  } else if (aType === "json") {
				if (!/\.json$/.test(file.leafName.toLowerCase()))
				  file.leafName += ".json";
			  }
			  if (file.exists())
				file.remove(true);
			  file.create(file.NORMAL_FILE_TYPE, parseInt("0666", 8));
			  stream.init(file, 0x02, 0x200, null);

			  switch (aType) {
				case "txt":
				  for (var i = 0; i < aPattern.length; i++) {
					aPattern[i] = aPattern[i] + "\n";
					stream.write(aPattern[i], aPattern[i].length);
				  }
				  break;
				case "json":
				  var patternItems = JSON.stringify(aPattern.preference);
				  stream.write(patternItems, patternItems.length)
				  break;
			  }
			  stream.close();
			}
			return true;
		  } catch(e) {
			Cu.reportError(e);
		  }
	  },

	  loadFromFile: function(aType) {
		  try{
			if (aType === "txt" || aType === "json") {} else {
			  return false;
			}
			
			var stringBundle = Services.strings.createBundle("chrome://classic_theme_restorer/locale/messages.file");
			const nsIFilePicker = Ci.nsIFilePicker;
			var fp = Cc["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
			var stream = Cc["@mozilla.org/network/file-input-stream;1"].createInstance(Ci.nsIFileInputStream);
			var streamIO = Cc["@mozilla.org/scriptableinputstream;1"].createInstance(Ci.nsIScriptableInputStream);

			fp.defaultExtension = aType;
			fp.defaultString = "CTRpreferences." + aType;
			fp.init(window, null, nsIFilePicker.modeOpen);
			if (aType === "txt") {
			  fp.appendFilters(nsIFilePicker.filterText);
			} else if (aType === "json") {
			  fp.appendFilters(nsIFilePicker.filterAll);
			}

			if (fp.show() != nsIFilePicker.returnCancel) {
			  stream.init(fp.file, 0x01, parseInt("0444", 8), null);
			  streamIO.init(stream);
			  var input = streamIO.read(stream.available());
			  streamIO.close();
			  stream.close();

			  switch (aType) {
				case "txt":
				  var linebreak = input.match(/(((\n+)|(\r+))+)/m)[1];
				  return input.split(linebreak);
				  break;
				case "json":
				  var text = input;
				  if (!classicthemerestorerjso.ctr.IsJsonValid(text)) {
					alert(stringBundle.GetStringFromName("import.error"));
					return false;
				  } else {
					return JSON.parse(input);
				  }
				  break;
			  }

			}
			return null;
		  } catch(e) {
			Cu.reportError(e);
		  }
	  },
 
  onCtrPanelSelect: function() {
    var ctrAddonPrefBoxTab = document.getElementById("CtrRadioGroup");
    var selectedPanel = document.getElementById(ctrAddonPrefBoxTab.value);
    selectedPanel.parentNode.selectedPanel = selectedPanel;

    for (var i=0; i < ctrAddonPrefBoxTab.itemCount; i++) {
      var radioItem = ctrAddonPrefBoxTab.getItemAtIndex(i);
      var pane = document.getElementById(radioItem.value);
      pane.setAttribute("selected", (radioItem.selected)? "true" : "false");
    }
  }
  
};


  // Make classicthemerestorerjso a global variable
  global.classicthemerestorerjso = classicthemerestorerjso;
}(this));
"use strict";
if (typeof classicthemerestorerjso == "undefined") {var classicthemerestorerjso = {};};
if (!classicthemerestorerjso.ctr) {classicthemerestorerjso.ctr = {};};

Components.utils.import("resource://gre/modules/AddonManager.jsm");

classicthemerestorerjso.ctr = {

  prefs: Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.classicthemerestorer."),
  fxdefaulttheme: Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("general.skins.").getCharPref("selectedSkin") == 'classic/1.0',
  appversion: parseInt(Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.").getCharPref("lastAppVersion")),

  initprefwindow: function() {
  
	// disable and hide items not usable on third party themes
	if (!this.fxdefaulttheme) {
		document.getElementById('ctraddon_pw_tabmenulist').disabled = true;
		document.getElementById('ctraddon_abhigher').disabled = true;
		document.getElementById('ctraddon_pw_smallnavbut').disabled = true;
		document.getElementById('ctraddon_pw_iconsbig').disabled = true;
		document.getElementById('ctraddon_pw_bfurlbarfix').disabled = true;
		document.getElementById('ctraddon_pw_paneluibtweak').disabled = true;
		document.getElementById('ctraddon_pw_altmenubar').disabled = true;
		document.getElementById('ctraddon_pw_menubarnofog').disabled = true;
		document.getElementById('ctraddon_pw_tabmokcolor').disabled = true;
		document.getElementById('ctraddon_pw_tabmokcolor2').disabled = true;
		document.getElementById('ctraddon_pw_tabmokcolor3').disabled = true;
		document.getElementById('ctraddon_pw_panelmenucolor').disabled = true;
		document.getElementById('ctraddon_pw_nobookbarbg').disabled = true;
		document.getElementById('ctraddon_pw_nonavbarbg').disabled = true;
		document.getElementById('ctraddon_pw_nonavborder').disabled = true;
		document.getElementById('ctraddon_pw_nonavtbborder').disabled = true;
		document.getElementById('ctraddon_pw_alttabstb').disabled = true;

		document.getElementById('ctraddon_pw_tabmenulist').style.visibility = 'collapse';
		document.getElementById('ctraddon_abhigher').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_smallnavbut').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_iconsbig').style.visibility = 'collapse';

		document.getElementById('ctraddon_pw_ccol_act_pref').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_ccol_act_cp1').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_ccol_act_cp2').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_ccol_act_b1').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_ccol_act_b2').style.visibility = 'collapse';

		document.getElementById('ctraddon_pw_bfurlbarfix').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_paneluibtweak').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_altmenubar').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_menubarnofog').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_tabmokcolor').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_tabmokcolor2').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_tabmokcolor3').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_panelmenucolor').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_mockupoptions').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_toolbartweaks').style.visibility = 'collapse';
	} else {
		document.getElementById('ctraddon_pw_special_info2').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_special_font').style.visibility = 'collapse';
	};
	
	// extra checks to not enable tab width setting while 'TabMixPlus'/'TabUtilities' is enabled
	AddonManager.getAddonByID('{dc572301-7619-498c-a57d-39143191b318}', function(addon) {
	  if(addon && addon.isActive) {
		document.getElementById('ctraddon_pw_tabmaxwidth').disabled = true;
		document.getElementById('ctraddon_pw_tabminwidth').disabled = true;
	  }
	});
	
	AddonManager.getAddonByID('tabutils@ithinc.cn', function(addon) {
	  if(addon && addon.isActive) {
		document.getElementById('ctraddon_pw_tabmaxwidth').disabled = true;
		document.getElementById('ctraddon_pw_tabminwidth').disabled = true;
	  }
	});
	
	// disable bookmark animation option, if 'star button in urlbar' is used
	if (this.prefs.getBoolPref('starinurl')) document.getElementById('ctraddon_pw_bmanimation').disabled = true;
	
	// hide settings for unsupported Fx versions 
	if (this.appversion < 31) {
	  document.getElementById('ctraddon_pw_pananimation').disabled = true;
	  document.getElementById('ctraddon_pw_pananimation').style.visibility = 'collapse';
	  
	  document.getElementById('ctraddon_pw_closetab').disabled = true;
	  document.getElementById('ctraddon_pw_closetab').style.visibility = 'collapse';
	}
	if (this.appversion >= 31) {
	  document.getElementById('ctraddon_pw_alw_tabclose').disabled = true;
	  document.getElementById('ctraddon_pw_alw_tabclose').style.visibility = 'collapse';
	}
	
	// update appbutton extra settings
	this.ctrpwAppbuttonextra(this.prefs.getCharPref("appbutton"),false);

  },
  
  unsetCustomTabcolors: function() {
	this.prefs.setBoolPref('tabcolor_def',false);
	this.prefs.setBoolPref('tabcolor_act',false);
	this.prefs.setBoolPref('tabcolor_unr',false);
	this.prefs.setBoolPref('tabcolor_hov',false);
	this.prefs.setBoolPref('ntabcolor_def',false);
	this.prefs.setBoolPref('ntabcolor_hov',false);
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
	} else if (which=="appbutton_v1wt" && this.fxdefaulttheme){
	  document.getElementById('ctraddon_alt_abicons').disabled = true;
	  document.getElementById('ctraddon_abhigher').disabled = false;
	  document.getElementById('ctraddon_appbutbdl').disabled = false;
	  document.getElementById('ctraddon_appbutcolor_list').disabled = false;
	} else if (which=="appbutton_v1" && !this.fxdefaulttheme){
	  document.getElementById('ctraddon_alt_abicons').disabled = false;
	  document.getElementById('ctraddon_abhigher').disabled = true;
	  document.getElementById('ctraddon_appbutbdl').disabled = false;
	  document.getElementById('ctraddon_appbutcolor_list').disabled = false;
	} else if (which=="appbutton_v1wt" && !this.fxdefaulttheme){
	  document.getElementById('ctraddon_alt_abicons').disabled = false;
	  document.getElementById('ctraddon_abhigher').disabled = true;
	  document.getElementById('ctraddon_appbutbdl').disabled = false;
	  document.getElementById('ctraddon_appbutcolor_list').disabled = false;
	} else if (which=="appbutton_off"){
	  document.getElementById('ctraddon_alt_abicons').disabled = true;
	  document.getElementById('ctraddon_abhigher').disabled = true;
	  document.getElementById('ctraddon_appbutbdl').disabled = true;
	  document.getElementById('ctraddon_appbutcolor_list').disabled = true;
	} else {
	  document.getElementById('ctraddon_alt_abicons').disabled = true;
	  document.getElementById('ctraddon_abhigher').disabled = true;
	  document.getElementById('ctraddon_appbutbdl').disabled = false;
	  document.getElementById('ctraddon_appbutcolor_list').disabled = false;
	  if (tabsintitlebar==false && fromprefwindow==true) {
		Components.classes["@mozilla.org/preferences-service;1"]
		 .getService(Components.interfaces.nsIPrefService)
		   .getBranch("browser.tabs.").setBoolPref("drawInTitlebar", true);
	  }
	}
  }
  
};
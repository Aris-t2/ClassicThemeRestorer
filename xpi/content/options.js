if (typeof classicthemerestorerjso == "undefined") {var classicthemerestorerjso = {};};
if (!classicthemerestorerjso.ctr) {classicthemerestorerjso.ctr = {};};

Components.utils.import("resource://gre/modules/AddonManager.jsm");

classicthemerestorerjso.ctr = {

  prefs: Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.classicthemerestorer."),
  fxdefaulttheme: Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("general.skins.").getCharPref("selectedSkin") == 'classic/1.0',

  initprefwindow: function() {
  
	// disable and hide items not usable on third party themes
	if (!this.fxdefaulttheme) {
		document.getElementById('ctr_pw_tabmenulist').disabled = true;
		document.getElementById('ctr_abhigher').disabled = true;
		document.getElementById('ctr_pw_smallnavbut').disabled = true;
		document.getElementById('ctr_pw_iconsbig').disabled = true;
		document.getElementById('ctr_pw_bfurlbarfix').disabled = true;
		document.getElementById('ctr_pw_paneluibtweak').disabled = true;
		document.getElementById('ctr_pw_tabmokcolor').disabled = true;
		document.getElementById('ctr_pw_tabmokcolor2').disabled = true;
		document.getElementById('ctr_pw_panelmenucolor').disabled = true;

		document.getElementById('ctr_pw_tabmenulist').style.visibility = 'collapse';
		document.getElementById('ctr_abhigher').style.visibility = 'collapse';
		document.getElementById('ctr_pw_smallnavbut').style.visibility = 'collapse';
		document.getElementById('ctr_pw_iconsbig').style.visibility = 'collapse';

		document.getElementById('ctr_pw_ccol_act_pref').style.visibility = 'collapse';
		document.getElementById('ctr_pw_ccol_act_cp1').style.visibility = 'collapse';
		document.getElementById('ctr_pw_ccol_act_cp2').style.visibility = 'collapse';
		document.getElementById('ctr_pw_ccol_act_b1').style.visibility = 'collapse';
		document.getElementById('ctr_pw_ccol_act_b2').style.visibility = 'collapse';

		document.getElementById('ctr_pw_bfurlbarfix').style.visibility = 'collapse';
		document.getElementById('ctr_pw_paneluibtweak').style.visibility = 'collapse';
		document.getElementById('ctr_pw_tabmokcolor').style.visibility = 'collapse';
		document.getElementById('ctr_pw_tabmokcolor2').style.visibility = 'collapse';
		document.getElementById('ctr_pw_panelmenucolor').style.visibility = 'collapse';
	};
	
	// extra checks to not enable tab widht setting while 'TabMixPlus'/'TabUtilities' is enabled
	AddonManager.getAddonByID('{dc572301-7619-498c-a57d-39143191b318}', function(addon) {
	  if(addon && addon.isActive) {
		document.getElementById('ctr_pw_tabmaxwidth').disabled = true;
		document.getElementById('ctr_pw_tabminwidth').disabled = true;
	  }
	});
	
	AddonManager.getAddonByID('tabutils@ithinc.cn', function(addon) {
	  if(addon && addon.isActive) {
		document.getElementById('ctr_pw_tabmaxwidth').disabled = true;
		document.getElementById('ctr_pw_tabminwidth').disabled = true;
	  }
	});
	
	// disable bookmark animation option, if star button in urlbar is used
	if (this.prefs.getBoolPref('starinurl')) document.getElementById('ctr_pw_bmanimation').disabled = true;
	
	// update appbutton extra settings
	this.ctrpwAppbuttonextra(this.prefs.getCharPref("appbutton"));

  },
  
  unsetCustomTabcolors: function() {
	this.prefs.setBoolPref('tabcolor_def',false);
	this.prefs.setBoolPref('tabcolor_act',false);
	this.prefs.setBoolPref('tabcolor_unr',false);
	this.prefs.setBoolPref('tabcolor_hov',false);
	this.prefs.setBoolPref('ntabcolor_def',false);
	this.prefs.setBoolPref('ntabcolor_hov',false);
  },
  
  ctrpwAppbuttonextra: function(which) {
  
	if (which=="appbutton_v1" && this.fxdefaulttheme){
	  document.getElementById('ctr_alt_abicons').disabled = false;
	  document.getElementById('ctr_abhigher').disabled = false;
	} else if (which=="appbutton_v1wt" && this.fxdefaulttheme){
	  document.getElementById('ctr_alt_abicons').disabled = true;
	  document.getElementById('ctr_abhigher').disabled = false;
	} else if (which=="appbutton_v1" && !this.fxdefaulttheme){
	  document.getElementById('ctr_alt_abicons').disabled = false;
	  document.getElementById('ctr_abhigher').disabled = true;
	} else if (which=="appbutton_v1wt" && !this.fxdefaulttheme){
	  document.getElementById('ctr_alt_abicons').disabled = false;
	  document.getElementById('ctr_abhigher').disabled = true;
	} else {
	  document.getElementById('ctr_alt_abicons').disabled = true;
	  document.getElementById('ctr_abhigher').disabled = true;
	}
  }
  
};
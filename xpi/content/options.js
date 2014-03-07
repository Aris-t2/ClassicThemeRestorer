if (typeof classicthemerestorerjso == "undefined") {var classicthemerestorerjso = {};};
if (!classicthemerestorerjso.ctr) {classicthemerestorerjso.ctr = {};};

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
		document.getElementById('ctr_customsqtab_cb').disabled = true;
		document.getElementById('ctr_pw_cp_actt1').disabled = true;
		document.getElementById('ctr_pw_cp_actt2').disabled = true;
		document.getElementById('ctr_pw_bfurlbarfix').disabled = true;
		document.getElementById('ctr_pw_paneluibtweak').disabled = true;
		document.getElementById('ctr_pw_tabmokcolor').disabled = true;
		document.getElementById('ctr_pw_tabmokcolor2').disabled = true;

		document.getElementById('ctr_pw_tabmenulist').style.visibility = 'collapse';
		document.getElementById('ctr_abhigher').style.visibility = 'collapse';
		document.getElementById('ctr_pw_smallnavbut').style.visibility = 'collapse';
		document.getElementById('ctr_pw_iconsbig').style.visibility = 'collapse';
		document.getElementById('ctr_customsqtab_cb').style.visibility = 'collapse';
		
		document.getElementById('ctr_pw_cp_deft1').style.visibility = 'collapse';
		document.getElementById('ctr_pw_cp_deft2').style.visibility = 'collapse';
		document.getElementById('ctr_pw_cp_deftl1').style.visibility = 'collapse';
		document.getElementById('ctr_pw_cp_deftl2').style.visibility = 'collapse';
		document.getElementById('ctr_pw_cp_hovt1').style.visibility = 'collapse';
		document.getElementById('ctr_pw_cp_hovt2').style.visibility = 'collapse';
		document.getElementById('ctr_pw_cp_hovtl1').style.visibility = 'collapse';
		document.getElementById('ctr_pw_cp_hovtl2').style.visibility = 'collapse';
		document.getElementById('ctr_pw_cp_actt1').style.visibility = 'collapse';
		document.getElementById('ctr_pw_cp_actt2').style.visibility = 'collapse';
		document.getElementById('ctr_pw_cp_acttl1').style.visibility = 'collapse';
		document.getElementById('ctr_pw_cp_acttl2').style.visibility = 'collapse';
		
		document.getElementById('ctr_pw_ctablabel').style.visibility = 'collapse';
		document.getElementById('ctr_pw_bfurlbarfix').style.visibility = 'collapse';
		document.getElementById('ctr_pw_paneluibtweak').style.visibility = 'collapse';
		document.getElementById('ctr_pw_tabmokcolor').style.visibility = 'collapse';
		document.getElementById('ctr_pw_tabmokcolor2').style.visibility = 'collapse';
	};
	
	this.ctrpwAppbuttonextra(this.prefs.getCharPref("appbutton"));

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
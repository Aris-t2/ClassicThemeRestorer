"use strict";

Cu.import("resource://gre/modules/Services.jsm");

if(Services.prefs.getBranch('extensions.classicthemerestorer.').getBoolPref('alt_newtabp')) {
  try{
	if(parseInt(Services.prefs.getBranch("extensions.").getCharPref("lastAppVersion")) >= 40)
	  document.getElementById("newtab-window").setAttribute('fx40plus',true);
  } catch(e){}
}
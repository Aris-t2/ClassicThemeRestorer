"use strict";
(function(global) {
var Cu = Components.utils;

var {Services} = Cu.import("resource://gre/modules/Services.jsm", {});

if (typeof ctrAboutNewTab  == "undefined") {
    var ctrAboutNewTab  = {};
};
if (!ctrAboutNewTab ) {
    ctrAboutNewTab  = {};
};
 
ctrAboutNewTab = {
	init : function(){		
		if(Services.prefs.getBranch('extensions.classicthemerestorer.').getBoolPref('alt_newtabp')) {
		  try{
			if(parseInt(Services.prefs.getBranch("extensions.").getCharPref("lastAppVersion")) >= 40)
			  document.getElementById("newtab-window").setAttribute('fx40plus',true);
		  } catch(e){}
		}		
	}
}
  // Make ctrAboutNewTab a global variable
  global.ctrAboutNewTab = ctrAboutNewTab;
}(this));
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
	init: function(){
		var appversion = parseInt(Services.appinfo.version);
		if(Services.prefs.getBranch('extensions.classicthemerestorer.').getBoolPref('alt_newtabp')) {
		  try{
			if(appversion == 40 || appversion == 41)
			  document.getElementById("newtab-window").setAttribute('fx40plus',true);
		  } catch(e){}
		}		
	}
}
  // Make ctrAboutNewTab a global variable
  try{
	global.ctrAboutNewTab = ctrAboutNewTab.init();
  } catch(e){}
}(this));
"use strict";

(function(global) {
var Cu = Components.utils;

var {Services} = Cu.import("resource://gre/modules/Services.jsm", {});

if (typeof ctrAboutAddons  == "undefined") {
    var ctrAboutAddons  = {};
};
if (!ctrAboutAddons ) {
    ctrAboutAddons  = {};
};
 
ctrAboutAddons = {
	init: function(){

	  window.addEventListener("DOMContentLoaded", function addAddonAttributes(event){
		  window.removeEventListener("DOMContentLoaded", addAddonAttributes, false);
		  setTimeout(function(){
		
		  try{
			if(parseInt(Services.appinfo.version) >=56)
			  document.querySelector('#addons-page').setAttribute('fx56plus',true);
		  } catch(e){}

		  },100);
	  },false);


	}
}
  // Make ctrAboutAddons a global variable
  try{
	global.ctrAboutAddons = ctrAboutAddons.init();
  } catch(e){}
}(this));
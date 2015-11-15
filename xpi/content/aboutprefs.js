"use strict";

(function(global) {
var Cu = Components.utils;

var {Services} = Cu.import("resource://gre/modules/Services.jsm", {});

if (typeof ctrAboutPrefs  == "undefined") {
    var ctrAboutPrefs  = {};
};
if (!ctrAboutPrefs ) {
    ctrAboutPrefs  = {};
};
 
ctrAboutPrefs = {
  init: function(){
	
	if(Services.prefs.getBranch('extensions.classicthemerestorer.').getBoolPref('saveprefslocation')) {
	
	  var prefslocation = 'about:preferences';
	  
	  switch (Services.prefs.getBranch('extensions.classicthemerestorer.').getCharPref('aboutprefs')) {

		case "category-general": prefslocation = 'about:preferences#general'; break;
		case "category-search": prefslocation = 'about:preferences#search'; break;
		case "category-content": prefslocation = 'about:preferences#content'; break;
		case "category-application": prefslocation = 'about:preferences#applications'; break;
		case "category-privacy": prefslocation = 'about:preferences#privacy'; break;
		case "category-security": prefslocation = 'about:preferences#security'; break;
		case "category-sync": prefslocation = 'about:preferences#sync'; break;
		case "category-advanced": prefslocation = 'about:preferences#advanced'; break;

	  }
		
	  window.location.href = prefslocation;
	  
	  try{
	    document.getElementById("advancedPrefs").selectedIndex = Services.prefs.getBranch('extensions.classicthemerestorer.').getIntPref('aboutprefsInd');
	  } catch(e) {}
		
	  var observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {

		   try{ 
		     Services.prefs.getBranch('extensions.classicthemerestorer.').setCharPref('aboutprefs',document.getElementById("categories").getAttribute("last-selected"));
		   } catch(e) {}
			
		});    
	  });

	  observer.observe(document.querySelector('#categories'), { attributes: true, attributeFilter: ['last-selected'] });
	  
	  var observer2 = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {

		   try{ 
		     Services.prefs.getBranch('extensions.classicthemerestorer.').setIntPref('aboutprefsInd',document.getElementById("advancedPrefs").getAttribute("selectedIndex"));
		   } catch(e) {}
			
		});    
	  });

	  observer2.observe(document.querySelector('#advancedPrefs'), { attributes: true, attributeFilter: ['selectedIndex'] });
	  
	  try{
		  var thirdpartytheme = Services.prefs.getBranch("general.skins.").getCharPref("selectedSkin");
		  document.querySelector('#categories').setAttribute('currenttheme',thirdpartytheme);
	  } catch(e){}
	  
	}
  }
}
  // Make ctrAboutPrefs a global variable
  try{
	global.ctrAboutPrefs = ctrAboutPrefs.init();
  } catch(e){}
}(this));
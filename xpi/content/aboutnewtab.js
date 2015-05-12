"use strict";
/*
	Clicking 'newtab customize button' simulates toggling newtab page visibility like in Fx28.
	- If newtab page is active, deactivate it.
	- If newtab page is deactivated, activate it.
	- Always make sure 'enhanced' newtab page stays disabled.
	- Remove buttons 'active' attribute: not needed in this mode.
	All this only happens, if the corresponding 'alternative new tab page' option
	is enabled on CTRs options window. It is disabled by default and does not interfere
	with newtab page.  
*/
Cu.import("resource://gre/modules/Services.jsm");
    
function ctraddon_toggle_newtab_page(){
  if(Services.prefs.getBranch('extensions.classicthemerestorer.').getBoolPref('alt_newtabp')) {
    try{
	  Services.prefs.getBranch('browser.newtabpage.').setBoolPref('enhanced',false);
 
	  if(!Services.prefs.getBranch('browser.newtabpage.').getBoolPref('enabled')==false)
		Services.prefs.getBranch('browser.newtabpage.').setBoolPref('enabled',false);
	  else
		Services.prefs.getBranch('browser.newtabpage.').setBoolPref('enabled',true);
	} catch(e){}
  }
  
  setTimeout(function(){
	try{
	  if(document.getElementById("newtab-customize-button").hasAttribute('active'))
		document.getElementById("newtab-customize-button").removeAttribute('active');
	}catch(e){}
	try{
	  if(parseInt(Services.prefs.getBranch("extensions.").getCharPref("lastAppVersion")) >= 40)
		document.getElementById("newtab-window").setAttribute('fx40plus',true);
	} catch(e){}
  },200);

}
	
if(Services.prefs.getBranch('extensions.classicthemerestorer.').getBoolPref('alt_newtabp')) {
  try{
	if(parseInt(Services.prefs.getBranch("extensions.").getCharPref("lastAppVersion")) >= 40)
	  document.getElementById("newtab-window").setAttribute('fx40plus',true);
  } catch(e){}
}
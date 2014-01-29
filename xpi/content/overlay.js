Components.utils.import("chrome://classic_theme_restorer/content/ctr_toolbars.jsm");

if (typeof classicthemerestorer == "undefined") {var classicthemerestorer = {};};
if (!classicthemerestorer.ctr) {classicthemerestorer.ctr = {};};

if (!classicthemerestorer.relstop) {classicthemerestorer.relstop = {};};

classicthemerestorer.ctr = {

  init: function() {

	// force enable/disable 'tabs in titlebar' (not needed yet)
	/*
	if (Components.classes["@mozilla.org/preferences-service;1"]
		.getService(Components.interfaces.nsIPrefService)
			.getBranch("extensions.classicthemerestorer.")
				.getBoolPref("tabsintitlebar")==true)
	{
		TabsInTitlebar.allowedBy("ctr_addon", true);
	}
	else {
		TabsInTitlebar.allowedBy("ctr_addon", false);
		}
	*/
	
	// We already use an own movable #PanelUI-menu-button. To prevent glitches
	// the default one with fixed nav-bar position has to be removed on startup.
	document.getElementById("nav-bar").removeChild(document.getElementById("PanelUI-button"));
	
	// insert buttons on first run or on setting reset
	if (Components.classes["@mozilla.org/preferences-service;1"]
		.getService(Components.interfaces.nsIPrefService)
			.getBranch("extensions.classicthemerestorer.")
				.getBoolPref("firstrun")==true)
	{
		// insert custom appmenu button, custom back-forward button, custom
		// panel ui button and custom wincontrols on first run into nav-bar
		try{
			
			document.getElementById("nav-bar").insertItem("ctr_appbutton", null, null, true);
			document.getElementById("nav-bar").insertItem("ctr_back-forward-button", null, null, true);
			document.getElementById("nav-bar").insertItem("ctr_panelui-button", null, null, true);
			document.getElementById("nav-bar").insertItem("ctr_window-controls", null, null, true);

			var osString = Components.classes["@mozilla.org/xre/app-info;1"].getService(Components.interfaces.nsIXULRuntime).OS;
			
			// switch to appbutton on title, if on Windows
			if (osString=="WINNT") {
				Components.classes["@mozilla.org/preferences-service;1"]
					.getService(Components.interfaces.nsIPrefService)
						.getBranch("extensions.classicthemerestorer.")
							.setCharPref("appbutton",'appbutton_v2');
			}
			
		} catch(e){}

		// set 'first run' to false
		Components.classes["@mozilla.org/preferences-service;1"]
			.getService(Components.interfaces.nsIPrefService)
				.getBranch("extensions.classicthemerestorer.")
					.setBoolPref("firstrun",false);
	}

  },
  
  toggleCtrAddonBar: function() {
    
	let ctrAddonBar = document.getElementById("ctr_addon-bar");
    setToolbarVisibility(ctrAddonBar, ctrAddonBar.collapsed);
  
  }
  
};

classicthemerestorer.ctr.init();
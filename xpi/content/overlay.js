Components.utils.import("chrome://classic_theme_restorer/content/addonbar.jsm");

if (typeof classicthemerestorer == "undefined") {var classicthemerestorer = {};};
if (!classicthemerestorer.buttoninsert) {classicthemerestorer.buttoninsert = {};};

classicthemerestorer.buttoninsert = {

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

		// do things on first run
		if (Components.classes["@mozilla.org/preferences-service;1"]
			.getService(Components.interfaces.nsIPrefService)
				.getBranch("extensions.classicthemerestorer.")
					.getBoolPref("firstrun")==true)
		{
			// insert custom appmenu buton, custom back-forward button and
			// custom panelui button at nav-bars end on first run
			try{
				var nbar = document.getElementById("nav-bar");
				var target = document.getElementById("urlbar-container");
				var elem = nbar.firstChild;
				while (elem) {
					if (elem == target) {
						break;    
					}
					elem = elem.nextSibling;
				}

				nbar.insertItem("ctr_appbutton", elem, null, false);
				nbar.insertItem("ctr_back-forward-button", elem, null, false);
				nbar.insertItem("ctr_panelui-button", elem, null, false);
				document.persist("nav-bar", "currentset");
				
				var osString = Components.classes["@mozilla.org/xre/app-info;1"].getService(Components.interfaces.nsIXULRuntime).OS;

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
	}
};

classicthemerestorer.buttoninsert.init();
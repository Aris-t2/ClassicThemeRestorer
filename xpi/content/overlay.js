Components.utils.import("chrome://classic_theme_restorer/content/addonbar.jsm");

if (typeof classicthemerestorer == "undefined") {var classicthemerestorer = {};};
if (!classicthemerestorer.buttoninsert) {classicthemerestorer.buttoninsert = {};};

if (!classicthemerestorer.relstop) {classicthemerestorer.relstop = {};};

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

		// insert buttons on first run or on setting reset
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

	}
};

classicthemerestorer.buttoninsert.init();

// make sure nothing happens if corresponding option is disabled
if (Components.classes["@mozilla.org/preferences-service;1"]
	.getService(Components.interfaces.nsIPrefService)
		.getBranch("extensions.classicthemerestorer.")
			.getBoolPref("combrelstop")==true) {

	/* overlays default CombinedStopReload in browser.js */
	/* that-fore it has to be 'global' */
	var CombinedStopReload = {
	  init: function () {

		if (this._initialized)
		  return;
		let reload = document.getElementById("ctr_reload-button");
		let stop = document.getElementById("ctr_stop-button");
		if (!stop || !reload || reload.nextSibling != stop)
		  return;
		this._initialized = true;
		if (XULBrowserWindow.stopCommand.getAttribute("disabled") != "true")
		  reload.setAttribute("displaystop", "true");
		stop.addEventListener("click", this, false);
		this.reload = reload;
		this.stop = stop;
	  },

	  uninit: function () {
		if (!this._initialized)
		  return;

		this._cancelTransition();
		this._initialized = false;
		this.stop.removeEventListener("click", this, false);
		this.reload = null;
		this.stop = null;
	  },

	  handleEvent: function (event) {
		if (event.button == 0 &&
			!this.stop.disabled)
		  this._stopClicked = true;
	  },

	  switchToStop: function () {
		if (!this._initialized)
		  return;

		this._cancelTransition();
		this.reload.setAttribute("displaystop", "true");
	  },

	  switchToReload: function (aDelay) {
		if (!this._initialized)
		  return;

		this.reload.removeAttribute("displaystop");

		if (!aDelay || this._stopClicked) {
		  this._stopClicked = false;
		  this._cancelTransition();
		  this.reload.disabled = XULBrowserWindow.reloadCommand
												 .getAttribute("disabled") == "true";
		  return;
		}

		if (this._timer)
		  return;

		this.reload.disabled = true;
		this._timer = setTimeout(function (self) {
		  self._timer = 0;
		  self.reload.disabled = XULBrowserWindow.reloadCommand
												 .getAttribute("disabled") == "true";
		}, 650, this);
	  },

	  _cancelTransition: function () {
		if (this._timer) {
		  clearTimeout(this._timer);
		  this._timer = 0;
		}
	  }
	};

}
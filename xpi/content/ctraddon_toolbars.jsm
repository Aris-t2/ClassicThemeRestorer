const EXPORTED_SYMBOLS = [];

Components.utils.import("resource:///modules/CustomizableUI.jsm");

CustomizableUI.registerArea("ctraddon_addon-bar", {
  type: CustomizableUI.TYPE_TOOLBAR,
  legacy: true,
  defaultPlacements: ["ctraddon_addonbar-close","spring","ctraddon_statusbar"]
});

CustomizableUI.registerArea("ctraddon_extra-bar", {
  type: CustomizableUI.TYPE_TOOLBAR,
  legacy: true,
  defaultPlacements: ["spring"]
});

CustomizableUI.registerArea("ctraddon_extra-bar2", {
  type: CustomizableUI.TYPE_TOOLBAR,
  legacy: true,
  defaultPlacements: ["spring"]
});

CustomizableUI.registerArea("ctraddon_extra-bar3", {
  type: CustomizableUI.TYPE_TOOLBAR,
  legacy: true,
  defaultPlacements: ["spring"]
});
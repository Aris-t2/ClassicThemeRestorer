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
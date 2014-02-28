const EXPORTED_SYMBOLS = [];

Components.utils.import("resource:///modules/CustomizableUI.jsm");
CustomizableUI.registerArea("ctr_addon-bar", {
  type: CustomizableUI.TYPE_TOOLBAR,
  legacy: true,
  defaultPlacements: ["ctr_addonbar-close","spring"]
});

CustomizableUI.registerArea("ctr_extra-bar", {
  type: CustomizableUI.TYPE_TOOLBAR,
  legacy: true,
  defaultPlacements: ["spring"]
});
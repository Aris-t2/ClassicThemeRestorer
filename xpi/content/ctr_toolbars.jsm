const EXPORTED_SYMBOLS = [];

Components.utils.import("resource:///modules/CustomizableUI.jsm");
CustomizableUI.registerArea("ctr_addon-bar", {
  type: CustomizableUI.TYPE_TOOLBAR,
  legacy: true,
  defaultPlacements: ["ctr_addonbar-close","ctr_flexible_space_ab"]
});

CustomizableUI.registerArea("ctr_extra-bar", {
  type: CustomizableUI.TYPE_TOOLBAR,
  legacy: true,
  defaultPlacements: ["ctr_flexible_space_eb"]
});
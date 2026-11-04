// Populate from the actual business operator before public launch.
export const legal = {
  controller: "Davide Tonello", address: "", vatNumber: "", email: "assistenza@nexora-automation.it", dpoEmail: "",
  version: "draft-2026-11-04-multisector-v2", updatedAt: "4 novembre 2026",
  // Require a documented review of processor agreements, transfers and retention.
  processingReviewed: false,
};
export const legalReady = Boolean(legal.controller && legal.address && legal.email && legal.processingReviewed);

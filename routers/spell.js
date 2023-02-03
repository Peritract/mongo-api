const { Router } = require("express");

const spellController = require("../controllers/spell");

const spellRouter = Router();

spellRouter.get("/", spellController.index);
spellRouter.post("/", spellController.create);
spellRouter.get("/:id", spellController.show);
spellRouter.delete("/:id", spellController.destroy);

module.exports = spellRouter;
const express = require("express");
const router = express.Router();

const publication_controller = require("../controllers/publications.controller");

router.post("/create", publication_controller.publication_create);
router.get("/", publication_controller.publications_list);
router.get("/:id", publication_controller.publications_details);
router.put("/:id/update", publication_controller.publication_update);
router.delete("/:id/delete", publication_controller.publication_delete);

module.exports = router;

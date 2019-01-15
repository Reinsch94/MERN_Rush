const express = require("express");
const router = express.Router();

const comment_controller = require("../controllers/comments.controller");

router.post("/create", comment_controller.comment_create);
router.get("/", comment_controller.comments_list);
router.get("/:id", comment_controller.comment_details);
router.put("/:id/update", comment_controller.comment_update);
router.delete("/:id/delete", comment_controller.comment_delete);

module.exports = router;

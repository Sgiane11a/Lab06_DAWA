import express from "express";
import postController from "../controllers/postController.js";

const router = express.Router();

router.get("/", postController.getAll);
router.get("/new", postController.createForm);
router.post("/", postController.create);
router.get("/:id/edit", postController.editForm);
router.put("/:id", postController.update);
router.delete("/:id", postController.delete);

export default router;

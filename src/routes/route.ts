import { Router } from "express";
import * as handler from "./handlers";
import { Model } from "../models/Model";
import { ParamsWithId } from "../interface";
import { validateRequest } from "../middlewares/middlewares";

const router = Router();

router.get("/", handler.findAll);
router.get(
  "/:id",
  validateRequest({
    params: ParamsWithId,
  }),
  handler.findOne
);

router.post("/", validateRequest({
    body: Model,
  }),handler.create);
router.put("/:id", validateRequest({
    params: ParamsWithId,
    body: Model,
  }),
  handler.update);

router.delete("/:id", validateRequest({
    params: ParamsWithId,
  }),
  handler.deleteOne);

  export default router;
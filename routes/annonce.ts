
import { Router } from "express";
import { annonceControllers } from "../controllers/annonceControllers.ts";

const routerAnnonce = Router();

routerAnnonce.get("/", (request, response) => {
  const controller = new annonceControllers(request, response);
  controller.list();
});

routerAnnonce.get("/create/new", (request, response) => {
  const controller = new annonceControllers(request, response);
  controller.createForm();
});

routerAnnonce.post("/create", (request, response) => {
  const controller = new annonceControllers(request, response);
  controller.create();
});

routerAnnonce.get("/:id", (request, response) => {
  const controller = new annonceControllers(request, response);
  controller.show();
});

routerAnnonce.get("/:id/edit", (request, response) => {
  const controller = new annonceControllers(request, response);
  controller.editForm();
});

routerAnnonce.post("/:id/edit", (request, response) => {
  const controller = new annonceControllers(request, response);
  controller.update();
});

routerAnnonce.get("/:id/delete", (request, response) => {
  const controller = new annonceControllers(request, response);
  controller.deleteForm();
});

routerAnnonce.post("/:id/delete", (request, response) => {
  const controller = new annonceControllers(request, response);
  controller.delete();
});

export default routerAnnonce;
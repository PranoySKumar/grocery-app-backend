import { RequestHandler, Router } from "express";
import { CategoryController } from "../../Controllers";
import { isAuth } from "../../Middleware";

const categoryRouter = Router();
categoryRouter.get(
  "/category",
  isAuth,
  CategoryController.findAllCategories as RequestHandler<any, any, any, any>
);
categoryRouter.patch(
  "/category/:_id",
  isAuth,
  CategoryController.editCategory as RequestHandler<any>
);
categoryRouter.put("/category", isAuth, CategoryController.addNewCategory as RequestHandler);
categoryRouter.delete(
  "/category/:_id",
  isAuth,
  CategoryController.deleteCategory as RequestHandler<any>
);
categoryRouter.get("/category/:_id", isAuth, CategoryController.getCategory as RequestHandler<any>);

export default categoryRouter;

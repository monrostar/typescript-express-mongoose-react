import express = require("express");
import { Request, Response, NextFunction } from "express";
import UserRoutes = require("../api/user-routes");
import * as passport from "passport";
import AuthRoutes = require("../api/auth-routes");
import ApiRoutes = require("./api-routes");
class BaseRoutes {

  get routes(): express.Application {
    let app = express();
    let router = express.Router();

    app.use(router.get("/", (req, res, next) => {
      res.render("index");
    }));

    app.use("/api", new ApiRoutes().routes);

    return app;
  }
}
export = BaseRoutes;
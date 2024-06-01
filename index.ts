import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import { authenticate } from "./auth/jwt";
import { renderPedigree } from "./services/renderer.service";
import { errorNotify } from "./notify/line";
import cors from "cors";

const port = 4444;

const app = express();
app.use(
  cors({
    // origin: "http://localhost:3000",
    origin: "https://jaothui.com",
  })
);
app.get(
  "/certificate/:microchip",
  authenticate,
  async (req: Request, res: Response) => {
    if (req.params.microchip == undefined) {
      res.status(400).json({
        result: "error",
        message: "no microchip provided",
        data: null,
      });
    }
    try {
      const certificate = await renderPedigree(req.params.microchip);

      if (certificate == undefined) {
        await errorNotify(`/certificate/:microchip`);
        res.status(400).json({
          result: "error",
          message: "not found",
          data: null,
        });
        return;
      }

      res.status(200).json({
        result: "ok",
        data: certificate,
        message: null,
      });
    } catch (error: any) {
      await errorNotify(`/certificate/:microchip`);
      res.status(400).json({
        result: "error",
        message: error.message,
        data: null,
      });
    }
  }
);

app.listen(port, () => {
  console.log("jaothui render is now online");
});

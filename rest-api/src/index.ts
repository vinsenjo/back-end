import express, { Request, Response, Application } from "express";
import router from "./router";
const PORT = 8000;
const app: Application = express();
app.use(express.json());

app.get("/api", (req: Request, res: Response) => {
  res.status(200).send({
    message: "Welcome to my api",
    status: "OK",
  });
});
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`[Server API] : http://localhost:${PORT}/api`);
});
